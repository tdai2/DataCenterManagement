//initialize the global variables
var isIE = ((navigator.appName.indexOf('Microsoft')>=0)?true:false);
var winHeight = 0;
var sensorResultsTable;
var showThresholds;
var SENSORINFO_DATA;
var tblJSON;
var gCurSensor = 0x00;
var sensorRefreshRate;
var sensorRefreshRateDefault = 60000; // 60 seconds
var sensorRefreshTimer;

function doInit() 
{
	exposeElms(['_sensorType',
 				'_sensorDisplay',
 				'_lblHeader',
 				'_refreshView',
 				'_thresholds',
 				'_setAutoRefresh',
 				'_autoRefreshSeconds',
 				'_refTime']);
 	
//	TODO: add page initialization code

//	determine the available height of the main page
    winHeight = 599;

    if( typeof( window.innerHeight ) == 'number' )
    {
    // non-IE
    winHeight = window.innerHeight - 200;
    } else if( document.documentElement && document.documentElement.clientHeight )
    {
    // IE 6+
      winHeight = document.documentElement.clientHeight - 190;
    } else if( document.body && document.body.clientHeight )
    {
    // IE 4
      winHeight = document.body.clientHeight - 200;
    }
    if(winHeight < 75) winHeight = 600;

	loadCustomPageElements();

	sensorRefreshRate = sensorRefreshRateDefault;
	sensorRefreshTimer=this.setInterval("IPMICMD_HL_GetSensorsInfo()",sensorRefreshRate);
        setAutoRefresh.onclick = setAutoRefreshInterval;
        var refreshSeconds = sensorRefreshRate/1000;
        refTime.innerHTML = eLang.getString('sensor_reading',"STR_SRVR_HLTH_REFSTRING")+refreshSeconds+eLang.getString('sensor_reading',"STR_SRVR_HLTH_SECONDS");
}


function loadCustomPageElements()
{
	 //Initialize ListGrid
	sensorResultsTable = listgrid({
		w				: '100%',
		h				: '',
		doAllowNoSelect : true
	});
	

	sensorDisplay.appendChild(sensorResultsTable.table);
	
	//check the urlvars
	var sensorView=eExt.parseURLvars('view');
	if (sensorView==null)
		{
		sensorView='normal'
		};

/* If there is a listgrid embed in the page,
** please don't use resize event directly
** Use only via lGrid.onpageresize event 
*/
	sensorResultsTable.onpageresize = function()
	{
		this.table.style.width = '100%';
		this.table.style.width = this.container.header.offsetWidth+'px';
	}


	
	doSensors(sensorView);
	
}

function doTable(n)
{
	sensorResultsTable.clear();
	
	if(n==1)
	{
		/* Trackers 34603 & 188978: suppress Low/High NR threshhold info */
		tblJSON = {
					cols:[
						{text:eLang.getString('common',"STR_APP_STR_171"), fieldName:'name', w:'20%'},
						{text:eLang.getString('common',"STR_APP_STR_172"), fieldName:'status', w:'15%'},
						{text:eLang.getString('common',"STR_APP_STR_419"), fieldName:'health', w:'5%'},
						{text:eLang.getString('common',"STR_APP_STR_173"), fieldName:'reading', w:'20%'},
					//	{text:eLang.getString('common',"STR_APP_STR_174"), fieldName:'lowNR', w:'10%'},
						{text:eLang.getString('common',"STR_APP_STR_175"), fieldName:'lowCT', w:'10%'},
						{text:eLang.getString('common',"STR_APP_STR_176"), fieldName:'lowNC', w:'10%'},
						{text:eLang.getString('common',"STR_APP_STR_177"), fieldName:'highNC', w:'10%'},
						{text:eLang.getString('common',"STR_APP_STR_178"), fieldName:'highCT', w:'10%'}
					//	{text:eLang.getString('common',"STR_APP_STR_179"), fieldName:'highNR', w:'10%'}
						]
						};
		
		sensorResultsTable.loadFromJson(tblJSON);
		
		setTimeout(function(){
				var vhref=top.document.getElementsByTagName('frameset')[1];
				var	vcolsa=vhref.cols.split(",");
				sensorResultsTable.table.style.width = (document.body.scrollWidth+parseInt(vcolsa[2])-10)+'px';
			}, 30);
		
		showThresholds = 1;
		/* Change button title to hide thresholds */
		thresholds.value = eLang.getString('common',"STR_APP_STR_165");
	}else
	{
	
		
		tblJSON = {
					cols:[
						{text:eLang.getString('common',"STR_APP_STR_171"), fieldName:'name', w:'25%'},
						{text:eLang.getString('common',"STR_APP_STR_172"), fieldName:'status', w:'20%'},
						{text:eLang.getString('common',"STR_APP_STR_419"), fieldName:'health', w:'5%'},
						{text:eLang.getString('common',"STR_APP_STR_173"), fieldName:'reading', w:'49%'}
						]
						};
		
		sensorResultsTable.loadFromJson(tblJSON);
		
		sensorResultsTable.table.style.width = "100%";
		
		showThresholds = 0;
		/* Change button title back to show thresholds */
		thresholds.value = eLang.getString('common',"STR_APP_STR_166");
	}
	
}


function doSensors(showTH)
{
	showThresholds = showTH;
	doTable(showThresholds);
	
	sensorType.onchange = function()
	{
		gCurSensor = sensorType.options.selectedIndex;
		RefreshSensors();
	}
	
	refreshView.onclick = handleRefreshClick;
	thresholds.onclick = IPMICMD_HL_ShowThresholds;
	
	setTimeout(IPMICMD_HL_GetSensorsInfo, 750);
}

function handleRefreshClick()
{
    sensorResultsTable.clear();
    refreshView.disabled = true;
    IPMICMD_HL_GetSensorsInfo();
}


function ConvertDiscreteReading(SensorReading)
{
	if (isNaN(SensorReading))
		return SensorReading;

	var converted = "0x";
	var i;
	for (i = 0; i < 4; i++)
	{
		var hexChars = "0123456789ABCDEF";
		var n = (SensorReading >> 12) & 0xf;
		SensorReading = SensorReading << 4;

		converted += hexChars.charAt(n);
	}

	return converted;
}

function AddSemToString(DiscreteSensorReading,state)
{
	
	if(DiscreteSensorReading & 0xfe)
	{
		state += "; ";
	}
	else
	{
	   state += " ";
	}
	return state;
}


function IPMICMD_HL_ShowThresholds()
	{
	if (showThresholds == 0)
		{
		doTable(1);
		RefreshSensors();
		
		
		}
	else
		{
		doTable(0);
		RefreshSensors();
		
		}
	}
	
function RefreshSensors()
{
	var count = 0;
	var j = 0;
	var unitstr;
	var state;
	var SensorReading;
	var SensorSeverity;
	
	var JSONRows = new Array();
	tblJSON.rows = new Array();

	sensorResultsTable.clear();
	for(j=0;j<SENSORINFO_DATA.length;j++)
	{
		if((SENSORINFO_DATA[j].SensorType == sensorType.value) || (sensorType.value == 0))
		{
			if(SENSORINFO_DATA[j].SensorAccessibleFlags == 0xD5)
			{
				unitstr = "";
				SensorReading = eLang.getString('common',"STR_APP_STR_167");
			}
			else
			{
				unitstr = eLang.getString('unittype',SENSORINFO_DATA[j].SensorUnit2);
				SensorReading = (SENSORINFO_DATA[j].SensorReading)/1000;
			}

			if(SENSORINFO_DATA[j].SensorState)
			{
				state = "";
				for (whichbit = 0; whichbit <= 7; ++whichbit)
				{

					if (SENSORINFO_DATA[j].SensorState & (0x01 << whichbit))
					{
						state = state + eLang.getString('threshstate',(0x01 << whichbit)) + " ";
					}
				}
			}
			else
			{
				state = "";
				DiscreteSensorReading = SensorReading;
				if ((SENSORINFO_DATA[j].DiscreteState >= 0x02) && (SENSORINFO_DATA[j].DiscreteState <= 0x0C))
				{
					for(whichbit = 0;whichbit <= 7 && DiscreteSensorReading;whichbit++)		
					{
						if(DiscreteSensorReading & 0x01)
						{
							state = state + eLang.getString('event',SENSORINFO_DATA[j].DiscreteState,whichbit);
							state = AddSemToString(DiscreteSensorReading,state);
						}
						DiscreteSensorReading = DiscreteSensorReading >> 1;
					}

				}
				else if (0x6F == SENSORINFO_DATA[j].DiscreteState)
				{
					for(whichbit = 0;whichbit <= 7 && DiscreteSensorReading;whichbit++)		
					{
						if(DiscreteSensorReading & 0x01)
						{
							state = state + eLang.getString('sensor_specific_event',SENSORINFO_DATA[j].SensorType,whichbit);
							state = AddSemToString(DiscreteSensorReading,state);
						}
						DiscreteSensorReading = DiscreteSensorReading >> 1;
					}
				}
				
				SensorReading = ConvertDiscreteReading(SensorReading);
				unitstr = "";
				if (!state)
					state = eLang.getString('common',"STR_APP_STR_ALL_DEASSERTED");
			}

			if(SENSORINFO_DATA[j].SensorAccessibleFlags == 0xD5)
			{
				unitstr = "";
				SensorReading = eLang.getString('common',"STR_APP_STR_167");
				SensorSeverity = eLang.getString('common',"STR_APP_STR_185");
					state = eLang.getString('common',"STR_APP_STR_167");
			}
			else
			{
				if(!state)
				{
					state = eLang.getString('common',"STR_APP_STR_167");
					SensorSeverity = eLang.getString('common',"STR_APP_STR_185");
				}					 
	
				if (SENSORINFO_DATA[j].SensorSeverity == 0x00)
				{
					SensorSeverity = eLang.getString('common',"STR_APP_STR_420"); 
				}
				else if (SENSORINFO_DATA[j].SensorSeverity == 0x01)
				{
					SensorSeverity = eLang.getString('common',"STR_APP_STR_131"); 
				}
				else if ((SENSORINFO_DATA[j].SensorSeverity == 0x02) || (SENSORINFO_DATA[j].SensorSeverity == 0x03))
				{
					SensorSeverity = eLang.getString('common',"STR_APP_STR_132");
				}
				else if (SENSORINFO_DATA[j].SensorSeverity == 0x04)
				{
					SensorSeverity = eLang.getString('common',"STR_APP_STR_185");
				}
			}
			


			if(showThresholds == 1)
			{
				if (SENSORINFO_DATA[j].SensorState)
				{
                    if (SENSORINFO_DATA[j].ReadableThresholds & 0x10)
                    {
                        UC_ThreshString = new String((SENSORINFO_DATA[j].HighCTThresh/1000)+" "+unitstr);
                    }
                    else
                    {
                        UC_ThreshString = eLang.getString('common',"STR_NOT_APPLICABLE");
                    }

                    if (SENSORINFO_DATA[j].ReadableThresholds & 0x08)
                    {
                        UNC_ThreshString = new String((SENSORINFO_DATA[j].HighNCThresh/1000)+" "+unitstr);
                    }
                    else
                    {
                        UNC_ThreshString = eLang.getString('common',"STR_NOT_APPLICABLE");
                    }

                    if (SENSORINFO_DATA[j].ReadableThresholds & 0x02)
                    {
                        LC_ThreshString = new String((SENSORINFO_DATA[j].LowCTThresh/1000)+" "+unitstr);
                    }
                    else
                    {
                        LC_ThreshString = eLang.getString('common',"STR_NOT_APPLICABLE");
                    }

                    if (SENSORINFO_DATA[j].ReadableThresholds & 0x01)
                    {
                        LNC_ThreshString = new String((SENSORINFO_DATA[j].LowNCThresh/1000)+" "+unitstr);
                    }
                    else
                    {
                        LNC_ThreshString = eLang.getString('common',"STR_NOT_APPLICABLE");
                    }
				JSONRows.push({cells:[
							{text:SENSORINFO_DATA[j].SensorName, value:SENSORINFO_DATA[j].SensorName},
							{text:state, value:state},
							{text:SensorSeverity, value:SensorSeverity},
							{text:((SensorReading))+" "+unitstr, value:((SensorReading))+" "+unitstr},
							{text:LC_ThreshString, value:LC_ThreshString},
							{text:LNC_ThreshString, value:LNC_ThreshString},
							{text:UNC_ThreshString, value:UNC_ThreshString},
							{text:UC_ThreshString, value:UC_ThreshString}
							]});
				}
				else
				{
				    NA_ThreshString = eLang.getString('common',"STR_NOT_APPLICABLE");
					JSONRows.push({cells:[
							{text:SENSORINFO_DATA[j].SensorName, value:SENSORINFO_DATA[j].SensorName},
							{text:state, value:state},
							{text:SensorSeverity, value:SensorSeverity},
							{text:((SensorReading))+" "+unitstr, value:((SensorReading))+" "+unitstr},
							{text:NA_ThreshString, value:NA_ThreshString},
							{text:NA_ThreshString, value:NA_ThreshString},
							{text:NA_ThreshString, value:NA_ThreshString},
							{text:NA_ThreshString, value:NA_ThreshString}
							 ]});
				}
			}
			else
			{
				
				 JSONRows.push({cells:[
				 		{text:SENSORINFO_DATA[j].SensorName, value:SENSORINFO_DATA[j].SensorName},
						{text:state, value:state},
						{text:SensorSeverity, value:SensorSeverity},
						{text:(SensorReading)+" "+unitstr, value:(SensorReading)+" "+unitstr}
						]
						});

			}

			count++;
		}
	}

	tblJSON.rows = JSONRows;
	
	sensorResultsTable.loadFromJson(tblJSON);

	lblHeader.innerHTML = eLang.getString('common',"STR_APP_STR_168")+count+eLang.getString('common',"STR_APP_STR_169");

	refreshView.onclick = handleRefreshClick;

	thresholds.onclick = IPMICMD_HL_ShowThresholds;

}



function IPMICMD_GetSensors_Res(arg)
{
	showWait(false);
	refreshView.disabled = false;

	var CmdStatus = WEBVAR_JSONVAR_HL_GETALLSENSORS.HAPI_STATUS;
	if (CmdStatus == 0)
	{
		SENSORINFO_DATA = WEBVAR_JSONVAR_HL_GETALLSENSORS.WEBVAR_STRUCTNAME_HL_GETALLSENSORS;
		if (!SENSORINFO_DATA.length)
		{
			alert(eLang.getString('common',"NO_SENSOR_STRING"));
			lblHeader.innerHTML = eLang.getString('common',"STR_APP_STR_168")+(SENSORINFO_DATA.length)+eLang.getString('common',"STR_APP_STR_169");
			return;
		}

		optind = 0;
		
		sensorType.innerHTML = '';
		
	   	for(i in gSensorTypeCodes)
    	{
	     if(sensorExists(i) || i==0x00)
	     sensorType.add(new Option(gSensorTypeCodes[i],i),isIE?optind++:null);
	    }


		sensorType.options[gCurSensor].selected = true;

		RefreshSensors();
	}
	else
	{
		errstr = eLang.getString('common',"STR_SENSOR_GETVAL")
		errstr +=  (eLang.getString('common','STR_IPMI_ERROR')+GET_ERROR_CODE(CmdStatus));
		alert(errstr);
	}
}


function IPMICMD_HL_GetSensorsInfo()
	{

	showWait(true);
	xmit.get({url:"/rpc/getsensors.asp",onrcv:IPMICMD_GetSensors_Res, status:'',timeout:120,ontimeout:TimedOut});
	}

function TimedOut()
{
	alert(eLang.getString('common', "STR_APP_STR_170"));
	showWait(false);
	refreshView.disabled = false;
}


function dosort(i,dir)
	{
	sensorResultsTable.sortCol(i,dir);
	showWait(false);
	refreshView.disabled = false;

	}

function SortWithWaitMsg(i,dir)
	{

	document.getElementById("wait").style.visibility='visible';
	showWait(true, eLang.getString('common',"STR_SORTING"));


	setTimeout("dosort("+i+","+dir+")",1000);
	}
	
function sensorExists(i)
{
  for(_ex=0; _ex<SENSORINFO_DATA.length; _ex++)
  {
    if(SENSORINFO_DATA[_ex].SensorType == i)
      return true;
  }
  return false;
}

gSensorTypeCodes = eLang.getString('common',"STR_SENSOR_TYPES");
	
function setAutoRefreshInterval()
{
    var inputRefRateSeconds = document.getElementById("_autoRefreshSeconds").value;
    //alert(document.getElementById("_autoRefreshSeconds").value);
    if ( inputRefRateSeconds == "" )
    {
        alert(eLang.getString('sensor_reading',"STR_SRVR_HLTH_SETREF_ERROR"));
        return;
    }
    else if (isNaN(inputRefRateSeconds))
    {
        alert(eLang.getString('sensor_reading',"STR_SRVR_HLTH_SETREF_ERROR"));
        return;
    }
    else if (inputRefRateSeconds == 0)
    {
        clearInterval(sensorRefreshTimer);
        refTime.innerHTML = eLang.getString('sensor_reading',"STR_SRVR_HLTH_DISABLED");
    }
    else if (inputRefRateSeconds<60||inputRefRateSeconds>300)
    {
        alert(eLang.getString('sensor_reading',"STR_SRVR_HLTH_SETREF_ERROR"));
        return;
    }
    else
    {
        clearInterval(sensorRefreshTimer);
        var inputRefRateMS = inputRefRateSeconds * 1000;
        sensorRefreshTimer = setInterval("IPMICMD_HL_GetSensorsInfo()",inputRefRateMS);
        refTime.innerHTML = eLang.getString('sensor_reading',"STR_SRVR_HLTH_REFSTRING")+inputRefRateSeconds+eLang.getString('sensor_reading',"STR_SRVR_HLTH_SECONDS");
        return;
    }
}

//if more add here

