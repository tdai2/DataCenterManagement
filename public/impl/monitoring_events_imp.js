var isIE = ((navigator.appName.indexOf('Microsoft')>=0)?true:false);

var eventLogTable=null;
var winHeight = 0;
var tblJSON;
var g_isadmin = 0;
var g_isuser = 0;
var productID = 0;

var tblStart = 0;
var numShow = 25;
var globlTBL;
var useLocalTBL = 1;	// Override table sort functions from listgrid.js.
var MAXPAGEMARKERS = 2;	// Number of viewable pages before/after current.
var VOLTAGENAMEINFO_DATA;
var getvoltagenamecomplete = 0;

function doInit() {

	exposeElms(['_eventTypeSel',
	            '_eventLogHolder',
	            '_clearLog',
	            '_eventLogCount',
	            '_saveLog',
	            '_eventLogFull',
	            '_eventLogMeter',
	            '_perPageDropDown',
	            '_ranges',
	            '_fullNotice']);

	vhref=top.document.getElementsByTagName('frameset')[1];
	vcolsa=vhref.cols.split(",");

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

	optind = 0;
	eventTypeSel.add(new Option(eLang.getString('common',"STR_APP_STR_195_all"),4),isIE?optind++:null);
	eventTypeSel.add(new Option(eLang.getString('common',"STR_APP_STR_195"),1),isIE?optind++:null);
	eventTypeSel.add(new Option(eLang.getString('common',"STR_APP_STR_196"),2),isIE?optind++:null);
	eventTypeSel.add(new Option(eLang.getString('common',"STR_APP_STR_197"),3),isIE?optind++:null);
	
	optind = 0;
	perPageDropDown.add(new Option("15",15),isIE?optind++:null);
	perPageDropDown.add(new Option("25",25),isIE?optind++:null);
	perPageDropDown.add(new Option("50",50),isIE?optind++:null);
	perPageDropDown.add(new Option("100",100),isIE?optind++:null);
	perPageDropDown.add(new Option(eLang.getString("monitoring_events", "STR_EVENT_ALL"),eLang.getString("monitoring_events", "STR_EVENT_ALL")),isIE?optind++:null);
	perPageDropDown.options.selectedIndex = 1;

	ranges.innerHTML = "";
	fullNotice.style.display = "none";

	IPMICMD_HL_GetVoltageName();
	GetProductID();
	CheckRole();
	CheckSELFull();
}


function loadCustomPageElements()
{
	//Initialize ListGrid	 
	/* eventLogTable = domapi.Listgrid({
	  x				  : 0,
	  y				  : 0,
	  w				  : (parseInt(document.body.clientWidth)-20), //+parseInt(vcolsa[2])),
	  h				  : (parseInt(document.body.clientHeight)-187),
	  headerH		  : 25,
	  doLedgerMode    : false,
	  doColMove       : false,
	  doColSort       : true,
	  doDepress       : false,
	  gridlines       : "both",
	  doAllowEdit     : false,
	  doColResize     : true,
	  linesPerRow     : 2,
	  minColWidth     : 20,
	  doShowHeader    : true,
	  doShowRowbar    : false,
	  doMultiSelect   : false,
	  doVirtualMode   : false,
	  doAllowNoSelect : true,
	  doShowSelection : false 
	});


	eventLogTable.style.position = 'relative';
	eventLogTable.style.width = (parseInt(document.body.scrollWidth)-20), //+parseInt(top.helpFrame.document.body.offsetWidth))+'px';

	eventLogTable.style.background = 'transparent';
	 */

	eventLogTable = listgrid({
		w				: '100%',
		h				: '',
		doAllowNoSelect : true
	});

	//add the list grid to the body division
	eventLogHolder.appendChild(eventLogTable.table);

	/* If there is a listgrid embed in the page,
	 ** please don't use resize event directly
	 ** Use only via lGrid.onpageresize event 
	 */
	eventLogTable.onpageresize = function()
	{
		this.table.style.width = '100%';
		this.table.style.width = this.container.header.offsetWidth+'px';
	}

	tblJSON = {
			cols:[
			      {text:eLang.getString('common',"STR_APP_STR_190"), fieldName:'event_id', fieldType:2, w:"7%"},
			      {text:eLang.getString('common',"STR_APP_STR_191"), fieldName:'timestamp',fieldType:1, w:"18%"},
			      {text:eLang.getString('common',"STR_APP_STR_192"), fieldName:'sensorname', w:"21%"},
			      {text:eLang.getString('common',"STR_APP_STR_193"), fieldName:'sensortype', w:"15%"},
			      {text:eLang.getString('common',"STR_APP_STR_194"), fieldName:'description', w:"35%"}
			      ]
	};

	eventLogTable.loadFromJson(tblJSON);

}


function CheckRole()
{
	xmit.get({url:'/rpc/getrole.asp', onrcv:OnCheckRole, status:''});
}


function OnCheckRole()
{
	var curPriv = WEBVAR_JSONVAR_GET_ROLE.WEBVAR_STRUCTNAME_GET_ROLE[0]['CURPRIV'];
	// user must have OPERATOR(3) or ADMINISTRATOR(4) privilege to clear the event log.
	if((curPriv != 3) && (curPriv != 4))
	{
		g_isadmin = 0;
		//alert(eLang.getString('common',"STR_APP_STR_184"));
		clearLog.disabled = true;
		if(curPriv == 2)
		{
			g_isuser = 1;
		}
		else
		{
			g_isuser = 0;
		}
	}
	else
	{
		g_isadmin = 1;
		clearLog.disabled = false;
	}
	doInit2();
}

function GetProductID()
{
	xmit.get({url:'/rpc/getbmcprodID.asp', onrcv:OnProdID, status:''});
}

function OnProdID()
{
	var CmdStatus = WEBVAR_JSONVAR_BMCPRODUCTID.HAPI_STATUS

	if (CmdStatus == 0)
	{
		productID = WEBVAR_JSONVAR_BMCPRODUCTID.WEBVAR_STRUCTNAME_BMCPRODUCTID[0].u8ProductID;
	}
}

function IPMICMD_HL_GetVoltageName()
{
	showWait(true);
	xmit.get({url:'/rpc/getVoltageName.asp', onrcv:IPMICMD_GetVoltageName_Res, status:''});
}

function IPMICMD_GetVoltageName_Res()
{
	var CmdStatus = WEBVAR_JSONVAR_GETVOLTAGENAMEINFO.HAPI_STATUS;

	if (CmdStatus == 0)
	{
		VOLTAGENAMEINFO_DATA = WEBVAR_JSONVAR_GETVOLTAGENAMEINFO.WEBVAR_STRUCTNAME_GETVOLTAGENAMEINFO;
		getvoltagenamecomplete = 1;
	}
}

function doInit2()
{

	eventTypeSel.onchange = comborefresh;
	clearLog.onclick = ClearSel;
	clearLog.disabled = false;
	saveLog.onclick = SaveSel;
	saveLog.disabled = false;
	perPageDropDown.onchange = setPerPage;
	IPMICMD_HL_GetSELInfo();
}


function IPMICMD_HL_GetSELInfo()
{
	showWait(true);
	xmit.get({url:"/rpc/getsel.asp",onrcv:IPMICMD_GetSEL_Res,status:'',status:''});
}


function IPMICMD_GetSEL_Res(arg)
{

	var CmdStatus = WEBVAR_JSONVAR_HL_GETALLSELENTRIES.HAPI_STATUS;
	if (CmdStatus == 0)
	{
		SELINFO_DATA = WEBVAR_JSONVAR_HL_GETALLSELENTRIES.WEBVAR_STRUCTNAME_HL_GETALLSELENTRIES;
		if (!SELINFO_DATA.length)
		{
			alert(eLang.getString('common',"NO_SEL_STRING"));
			//return;
		}
		
		RefreshEvents();

	}
	else if (GET_ERROR_CODE(CmdStatus) == 255)
	{
	    errstr = eLang.getString('common',"STR_MONIT_EVENTLOG");
	    errstr += ". " + eLang.getString('common',"STR_TRY_AGAIN");
        showWait(false);
        alert(errstr);
	}
	else
	{
		errstr = eLang.getString('common',"STR_MONIT_EVENTLOG");
		errstr +=  (eLang.getString('common','STR_IPMI_ERROR') + GET_ERROR_CODE(CmdStatus));
		showWait(false);
        alert(errstr);
	}
}


function RefreshEvents()
{
	var count = 0;
	var str;
	var type;
	var offset;
	var timestamp;
	var CPUSlot, ChannelNo, DIMMNo, Mirror, Rank;
	var JSONRows = new Array();
	var m_Max_allowed_OemSpecific_offset = new Array();
	var m_Max_allowed_offset= new Array();
	var m_Max_allowed_SensorSpecific_offset =new Array();

	// Please refer the spec . This array contain max allowed offet for particular generic Event /Reading Type for 0x1 to 0x0c


	m_Max_allowed_offset[0]  = 0x0;
	m_Max_allowed_offset[1]  = 0x0b;
	m_Max_allowed_offset[2]  = 0x2;  // jco subtracted 1 from previous value
	m_Max_allowed_offset[3]  = 0x1;  // jco subtracted 1 from previous value
	m_Max_allowed_offset[4]  = 0x1;  // jco subtracted 1 from previous value
	m_Max_allowed_offset[5]  = 0x1;  // jco subtracted 1 from previous value
	m_Max_allowed_offset[6]  = 0x1;  // jco subtracted 1 from previous value
	m_Max_allowed_offset[7]  = 0x8;
	m_Max_allowed_offset[8]  = 0x1;  // jco subtracted 1 from previous value
	m_Max_allowed_offset[9]  = 0x1;  // jco subtracted 1 from previous value
	m_Max_allowed_offset[10] = 0x8;
	m_Max_allowed_offset[11] = 0x7;
	m_Max_allowed_offset[12] = 0x3;



//	Please refer the spec . This array contain max allowed offet for particular generic Event /Reading Type for 0x6f
	m_Max_allowed_SensorSpecific_offset[5]= 6;
	m_Max_allowed_SensorSpecific_offset[6]= 5;
	m_Max_allowed_SensorSpecific_offset[7]= 10;
	m_Max_allowed_SensorSpecific_offset[8]= 6;
	m_Max_allowed_SensorSpecific_offset[9]= 7;
	m_Max_allowed_SensorSpecific_offset[12]= 10;
	m_Max_allowed_SensorSpecific_offset[13]= 8; // jco added to match sensor_specific_event_str.js
	m_Max_allowed_SensorSpecific_offset[15]= 2;
	m_Max_allowed_SensorSpecific_offset[16]= 5;
	m_Max_allowed_SensorSpecific_offset[17]= 7;
	m_Max_allowed_SensorSpecific_offset[18]= 5;
	m_Max_allowed_SensorSpecific_offset[19]= 10;
	m_Max_allowed_SensorSpecific_offset[20]= 4;
	m_Max_allowed_SensorSpecific_offset[25]= 0;
	m_Max_allowed_SensorSpecific_offset[29]= 4;
	m_Max_allowed_SensorSpecific_offset[30]= 4;
	m_Max_allowed_SensorSpecific_offset[31]= 6;
	m_Max_allowed_SensorSpecific_offset[32]= 5;
	m_Max_allowed_SensorSpecific_offset[33]= 9 ;
	m_Max_allowed_SensorSpecific_offset[34]= 13;
	m_Max_allowed_SensorSpecific_offset[35]= 8;
	m_Max_allowed_SensorSpecific_offset[36]= 3;
	m_Max_allowed_SensorSpecific_offset[37]= 2;
	m_Max_allowed_SensorSpecific_offset[39]= 1;
	m_Max_allowed_SensorSpecific_offset[40]=4 ;
	m_Max_allowed_SensorSpecific_offset[41]=2 ;
	m_Max_allowed_SensorSpecific_offset[42]= 1;
	m_Max_allowed_SensorSpecific_offset[43]= 7 ;
	m_Max_allowed_SensorSpecific_offset[44]= 7 ;


//	Please refer the spec . This array contain max allowed offet for particular generic Event /Reading Type for 0x70
	m_Max_allowed_OemSpecific_offset[43] = 17;
	m_Max_allowed_OemSpecific_offset[0x70] = 0x0F;
	m_Max_allowed_OemSpecific_offset[0x71] = 0x08;
	m_Max_allowed_OemSpecific_offset[0x15] = 2;
	
	m_Max_allowed_OemSpecific_offset[0xD1] = 0x01;
	// SPS Firmware Health sensor max offset
	m_Max_allowed_SPS_FW_Health_offset = 0x11;
	m_Max_allowed_SMCLST_offset = 0x08;
	eventLogTable.clear();



	for (j=0;j<SELINFO_DATA.length;j++)
	{
		str="";
		/* Check GeneratorID */
		// all events?
		if ((SELINFO_DATA[j].RecordType == 0x02)  || (SELINFO_DATA[j].RecordType == 0x03))
		{
			if ((eventTypeSel.options[eventTypeSel.options.selectedIndex].value == 4)  ||

					//sensor specific events
					((getbits(SELINFO_DATA[j].GenID1,0,0) == 0x00) &&
							(eventTypeSel.options[eventTypeSel.options.selectedIndex].value == 1)) ||

							//bios generated events
							(( (SELINFO_DATA[j].GenID1 >= 0x01) &&
									(SELINFO_DATA[j].GenID1 <= 0x1F)) &&
									(eventTypeSel.options[eventTypeSel.options.selectedIndex].value == 2)) ||

									//BIOS SMI Handler generated events
									((SELINFO_DATA[j].GenID1 == 0x33) &&
											(eventTypeSel.options[eventTypeSel.options.selectedIndex].value == 2)) ||

											//system software generated events
											(( (SELINFO_DATA[j].GenID1 >= 0x41) &&
													(SELINFO_DATA[j].GenID1 <= 0x5F)) &&
													(eventTypeSel.options[eventTypeSel.options.selectedIndex].value == 3))  )
			{

				type = getbits(SELINFO_DATA[j].EventDirType,6,0);

				// If event type is 0x70 then read from oem-specific table
				// If event type is 0x6F then read from sensor-specific table
				// else, read from event_strings table
				if ( type == 0)
				{

					/* Unspecified */
				}
				else if ( type == 0x70 )
				{
					if (SELINFO_DATA[j].SensorType == 0x13)
					{
						// PCI Uncorrectable Errors are Sensor Type 0x13, Event Type 0x70
						if ((SELINFO_DATA[j].EventData1 & 0x0F) <= m_Max_allowed_OemSpecific_offset[0x70])
						{
							str = eLang.getString('oem_specific_event', SELINFO_DATA[j].SensorNum, (SELINFO_DATA[j].EventData1 & 0x0F));
							if (0xA0 == (SELINFO_DATA[j].EventData1 & 0xF0))
							{
								str += "on bus: " + SELINFO_DATA[j].EventData2 + ", device: " + getbitsval(SELINFO_DATA[j].EventData3, 7, 3) + ", function: " + getbitsval(SELINFO_DATA[j].EventData3, 2, 0) + ".";
							}
							else
							{
								str += ", unknown bus, function, or device.";
							}
						}
						else
						{
							str=eLang.getString("common","INVALID_OFFSET");	
						}	
					}
					//BIOS Recovery Mode detection, Sensor Type 0x0F, Event Type 0x0F
					else if(SELINFO_DATA[j].SensorType == 0x0F)
					{
						if ((SELINFO_DATA[j].EventData1 & 0x0F) <= m_Max_allowed_OemSpecific_offset[0x15])
						{		
							str = eLang.getString('oem_specific_event', SELINFO_DATA[j].SensorNum, (SELINFO_DATA[j].EventData1 & 0x0F) << (SELINFO_DATA[j].EventDirType >> 7));
						}
						else
						{
							str = eLang.getString("common","INVALID_OFFSET");	
						}	
						SELINFO_DATA[j].SensorName = eLang.getString("monitoring_events", "STR_BIOSREC");
					}
					else if(SELINFO_DATA[j].SensorType == 0xD1 )
					{
						if( ((SELINFO_DATA[j].EventData1 & 0x0F) <= m_Max_allowed_OemSpecific_offset[0xD1]) )
						{		
							str = eLang.getString('oem_specific_event', SELINFO_DATA[j].SensorNum, (SELINFO_DATA[j].EventData1 & 0x0F))
								if ((SELINFO_DATA[j].EventData1 & 0x01) != 0x00)
								{
									for(i=0;i<5;i++)
									{
										if( ( (SELINFO_DATA[j].EventData2 >> i ) & 0x01 ) != 0x00 )
										{
											str += eLang.getString('oem_specific_event', SELINFO_DATA[j].SensorNum, (i+2));
											str += ",";
										}
									}
								}

						}
						else
						{
							str = eLang.getString("common","INVALID_OFFSET");	
						}	
					}
					else
					{
						var MajorNum;
						var MinorNum;

						if(getbits(SELINFO_DATA[j].EventData2,7,4)==0x10)
						{
							MajorNum = ((SELINFO_DATA[j].ExtData2>>4)*10)+(SELINFO_DATA[j].ExtData2%16);
						}
						else
						{
							MajorNum = SELINFO_DATA[j].ExtData2;	
						}
						MinorNum = ((SELINFO_DATA[j].ExtData3>>4)*10)+(SELINFO_DATA[j].ExtData3%16);

						var sensor_type = m_Max_allowed_OemSpecific_offset[SELINFO_DATA[j].SensorType];
						var offset_1 = (getbits(SELINFO_DATA[j].EventData2,7,4) >> 4) + 5;
						var offset_2 = getbits(SELINFO_DATA[j].EventData1,3,0);
						var offset_3 = getbits(SELINFO_DATA[j].ExtData1,1,0) + 10; 
						var BuildID1;
						var BuildID2;
						var BuildID3;
						var BuildID4;
						var target;
						if((sensor_type >= offset_1) && (sensor_type >= offset_2) && (sensor_type >= offset_3))
						{
							str=eLang.getString('oem_specific_event',SELINFO_DATA[j].SensorType,offset_1);
							str+=eLang.getString('oem_specific_event',SELINFO_DATA[j].SensorType,offset_2);
							str+=eLang.getString('oem_specific_event',SELINFO_DATA[j].SensorType,offset_3);
							target = getbits(SELINFO_DATA[j].EventData2,7,4);
							if((target==0x10)    // BIOS 
									&& (getbits(SELINFO_DATA[j].ExtData1,7,4) >> 4 == 6)) // Extended bytes for build id is also present
							{
								asciiTable=' !"#$%&'+"'"+'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ['+'\\'+']^_`abcdefghijklmnopqrstuvwxyz{|}';
								BuildID1 = asciiTable.charAt(SELINFO_DATA[j].ExtData4 - 32);
								BuildID2 = asciiTable.charAt(SELINFO_DATA[j].ExtData5 - 32);
								BuildID3 = asciiTable.charAt(SELINFO_DATA[j].ExtData6 - 32);
								BuildID4 = asciiTable.charAt(SELINFO_DATA[j].ExtData7 - 32);								
								str+=eLang.getString('oem_specific_event',SELINFO_DATA[j].SensorType,15);
								str+=(""+MajorNum);
								str+=eLang.getString('oem_specific_event',SELINFO_DATA[j].SensorType,16);
								str+=(""+MinorNum);
								str+=eLang.getString('oem_specific_event',SELINFO_DATA[j].SensorType,17);
								str+=(""+BuildID1);
								str+=(""+BuildID2);
								str+=(""+BuildID3);
								str+=(""+BuildID4);
							}  // BMC
							else if ((target == 0x00) && (getbits(SELINFO_DATA[j].ExtData1,7,4) >> 4 == 6)) // Extended bytes for build id is also present
							{
								BuildID1 = SELINFO_DATA[j].ExtData4 | (SELINFO_DATA[j].ExtData5 << 8) | (SELINFO_DATA[j].ExtData6 << 16)
								| (SELINFO_DATA[j].ExtData7 << 24) ;
								str+=eLang.getString('oem_specific_event',SELINFO_DATA[j].SensorType,15);
								str+=(""+MajorNum);
								str+=eLang.getString('oem_specific_event',SELINFO_DATA[j].SensorType,16);
								str+=(""+MinorNum);
								str+=eLang.getString('oem_specific_event',SELINFO_DATA[j].SensorType,17);
								str+=(""+BuildID1);
							}
							else if (target == 0x20) 
							{ // ME
								str+=eLang.getString('oem_specific_event',SELINFO_DATA[j].SensorType,15);
								str+=(""+MajorNum);
								str+=eLang.getString('oem_specific_event',SELINFO_DATA[j].SensorType,16);
								str+=""+SELINFO_DATA[j].ExtData3+"."+SELINFO_DATA[j].ExtData4;
								if((SELINFO_DATA[j].ExtData6 & 0xF0) == 0){
									BuildID1 = ((SELINFO_DATA[j].ExtData5 >>4)  * 100) + ((SELINFO_DATA[j].ExtData5 &0x0F)*10) + (SELINFO_DATA[j].ExtData6);
								}else{
									BuildID1 = ((SELINFO_DATA[j].ExtData5 >>4)  * 1000) + ((SELINFO_DATA[j].ExtData5 &0x0F)*100) + ((SELINFO_DATA[j].ExtData6 >>4)*10)+(SELINFO_DATA[j].ExtData6 &0x0F);
								}
								str+=eLang.getString('oem_specific_event',SELINFO_DATA[j].SensorType,17);
								str+=(""+BuildID1);
							}
							else
							{
								str+=eLang.getString('oem_specific_event',SELINFO_DATA[j].SensorType,15);
								str+=(""+MajorNum);
								str+=eLang.getString('oem_specific_event',SELINFO_DATA[j].SensorType,16);
								str+=(""+MinorNum);
							}
						}
						else
						{ 
							str=eLang.getString("common","INVALID_OFFSET"); 
						}
					}
				}
				else if ( type == 0x71 )
				{
					if (SELINFO_DATA[j].SensorType == 0x13)
					{
						// PCI Correctable Errors are Sensor Type 0x13, Event Type 0x70
						if ((SELINFO_DATA[j].EventData1 & 0x0F) <= m_Max_allowed_OemSpecific_offset[0x71])
						{
							str = eLang.getString('oem_specific_event', SELINFO_DATA[j].SensorNum, (SELINFO_DATA[j].EventData1 & 0x0F));
							if (0xA0 == (SELINFO_DATA[j].EventData1 & 0xF0))
							{
								str += "on bus: " + SELINFO_DATA[j].EventData2 + ", device: " + getbitsval(SELINFO_DATA[j].EventData3, 7, 3) + ", function: " + getbitsval(SELINFO_DATA[j].EventData3, 2, 0) + ".";
							}
							else
							{
								str += ", unknown bus, function, or device.";
							}
						}
						else
						{
							str=eLang.getString("common","INVALID_OFFSET");	
						}	
					}
					else if(SELINFO_DATA[j].SensorType == 0xC3)
					{
						//console.log(SELINFO_DATA[j].SensorNum);
						//console.log(SELINFO_DATA[j].EventData1);
						if ((SELINFO_DATA[j].EventData1 & 0x0F) <= m_Max_allowed_OemSpecific_offset[0x70])
						{		
							str = eLang.getString('oem_specific_event', SELINFO_DATA[j].SensorNum, (SELINFO_DATA[j].EventData1 & 0x0F));
						}
						else
						{
							str = eLang.getString("common","INVALID_OFFSET");	
						}	
					}
				}
				else if ( type == 0x6F )
				{

					// Sensor Specific event
					offset = getbits(SELINFO_DATA[j].EventData1,3,0);
					if(m_Max_allowed_SensorSpecific_offset[SELINFO_DATA[j].SensorType] >= offset)
					{
						if ( (SELINFO_DATA[j].SensorType == 40) && // Management Subsystem Health Sensor Failure.
								( (SELINFO_DATA[j].EventData1 & 0xF) == 4) )
						{
							str = "\'" + SELINFO_DATA[j].MiscDesc + "\' ";
							str += eLang.getString('sensor_specific_event',SELINFO_DATA[j].SensorType,offset);	
						} // Handle AutoCfg sensor (old type 0x6F)
                        else if ( (SELINFO_DATA[j].SensorType == 40)          &&     // Sensor Type 0x28 (Management Subsystem Health)
                                  (SELINFO_DATA[j].SensorNum == 0x87)          )     // Sensor number 0x87
                        {
                            str = eLang.getString('oem_specific_event',SELINFO_DATA[j].SensorNum, getbits(SELINFO_DATA[j].EventData3,3,0));
                        }
                        else if ( (SELINFO_DATA[j].SensorType == 0x07) && (offset == 0x01) )    // Special case for Processor Type, Thermal Trip offset - handle FIVR
                        {
                            // Handle FIVR based on ED2.
                            if (SELINFO_DATA[j].EventData2 == 0x00)
                            {
                                str = eLang.getString('sensor_specific_event',"THERMTRIP");
                            }
                            else if (SELINFO_DATA[j].EventData2 == 0x01)
                            {
                                str = eLang.getString('sensor_specific_event',"FIVR");
                            }
                            else
                            {
                                str = eLang.getString("common","INVALID_OFFSET");
                            }
                        }
						else
						{
							str = eLang.getString('sensor_specific_event',SELINFO_DATA[j].SensorType,offset);
							//Give the details of the false DIMM
							if (0x0C == SELINFO_DATA[j].SensorType ) 
							{
								if (0x20 == (SELINFO_DATA[j].EventData1 & 0x30))   // if OEM Code in Byte 3, decode as per OEM definition Refer BIOS EPS
								{
									CPUSlot = getbitsval(SELINFO_DATA[j].EventData3, 7, 5) + 1;	// 1-based CPU numbering.

									//For Grantley the BMC only has to isolate the DIMM thermtrip to the CPU level (i.e. the memory that is attached to a given CPU slot).
									// This does not apply to memory events generated by the BIOS.
									if (SELINFO_DATA[j].GenID1 != 0x20)
									{
									    ChannelNo = String.fromCharCode(getFirstDIMMchannel(CPUSlot).charCodeAt(0) + getbitsval(SELINFO_DATA[j].EventData3, 4, 3));

									    if (ChannelNo == "@")
									    {
									        ChannelNo = "Invalid";
									        DIMMNo = "";
									    }
									    else
									    {
									        DIMMNo = getbitsval(SELINFO_DATA[j].EventData3, 2, 0) + 1;	// 1-based DIMM numbering.
									    }

	                                    // Output format is: "CPU: 1, DIMM: A1."
	                                    //                   "CPU: 1, DIMM: A2."
	                                    //                   ...
	                                    //                   "CPU: 2, DIMM: F2."
	                                    str += ". " + "CPU: " + CPUSlot + ", DIMM: " + ChannelNo + DIMMNo + ".";
									}
									else
									{
									    // Output format is: "DIMM on CPU: 1."
									    //                   "DIMM on CPU: 2."
									    str += ". " + "DIMM on CPU: " + CPUSlot + ".";
									}
								}
								else
								{
									str += ". Unspecified DIMM number.";
								}
							}
							else if (0x20 == SELINFO_DATA[j].SensorType )
							{
							    // Override the sensor name. This is an OS event.
							    SELINFO_DATA[j].SensorName = eLang.getString("monitoring_events", "STR_OSEVENT");
							}

							//Give the details of the false PCI slot.
							if ((0x13 == SELINFO_DATA[j].SensorType) && (0x00 != offset))
							{
								str += " on bus number " + SELINFO_DATA[j].EventData2 + "." + " Device number is " + getbitsval(SELINFO_DATA[j].EventData3, 7, 3) + " and the Function number is " + getbitsval(SELINFO_DATA[j].EventData3, 2, 0) + "."; 
							}
	                        if((SELINFO_DATA[j].SensorNum==0x1E) && (0x08 == SELINFO_DATA[j].SensorType))
                            {
                                offset = getbits(SELINFO_DATA[j].EventData2,4,0);
                                str += " - ";
                                str += eLang.getString('node_hsc_event',0,offset);
                            }

                            //Advanced Power Failure Detection
                            if ((0x01 == SELINFO_DATA[j].SensorNum) && (0x09 == SELINFO_DATA[j].SensorType) && (0x06 == offset) && (0xA0 == (SELINFO_DATA[j].EventData1 & 0xF0)))
                            {
                                var PwrFltIdx = 0;
                                var PwrFltEvt = (SELINFO_DATA[j].EventData2) | (SELINFO_DATA[j].EventData3 << 8);

                                str += " - ";

                                while (PwrFltEvt != 0)
                                {
                                    if ((PwrFltEvt & 0x01) != 0 && PwrFltIdx < 10)
                                    {
                                        str += eLang.getString('oem_power_failure_detection_map', PwrFltIdx);
                                        str += ", ";
                                    }

                                    PwrFltIdx++;
                                    PwrFltEvt >>>= 1;
                                }
                            }
						}

					}
					else
					{
						str =eLang.getString("common","INVALID_OFFSET");	

					}
				}
				else if (( type >= 0x01) && ( type <= 0x0C))
				{
					offset = getbits(SELINFO_DATA[j].EventData1,3,0);

					if(m_Max_allowed_offset[type]  >= offset)
					{
						if ((type == 0x0B) && ((SELINFO_DATA[j].GenID1 == 0x33) && (SELINFO_DATA[j].GenID2 == 0x00)))
						{
							// Mirroring Redundancy Event
							str = eLang.getString('event',type,offset);

							if (0xA0 == (SELINFO_DATA[j].EventData1 & 0xF0))
							{
								CPUSlot = getbitsval(SELINFO_DATA[j].EventData3, 7, 5) + 1;	// 1-based CPU numbering.

								ChannelNo = String.fromCharCode(getFirstDIMMchannel(CPUSlot).charCodeAt(0) + getbitsval(SELINFO_DATA[j].EventData3, 4, 3)); 

								if (ChannelNo == "@")
								{
									ChannelNo = "Invalid";
									DIMMNo = "";
								}
								else
								{
									DIMMNo = getbitsval(SELINFO_DATA[j].EventData3, 2, 0) + 1;	// 1-based DIMM numbering.
								}

								Mirror = getbitsval(SELINFO_DATA[j].EventData2, 7, 4);

								Rank = getbitsval(SELINFO_DATA[j].EventData2, 1, 0);

								// Output format is: "CPU: 1, DIMM: A1."
								//                   "CPU: 1, DIMM: A2."
								//                   ...
								//                   "CPU: 2, DIMM: F2."
								str += ". Mirror: " + Mirror + ", Rank: " + Rank + ", CPU: " + CPUSlot + ", DIMM: " + ChannelNo + DIMMNo + ".";
							}
							else
							{
								str += ". Unspecified DIMM number.";
							}
						}
						 // Handle DIMM Margin OEM bytes.
						else if ( (SELINFO_DATA[j].SensorType == 0x01)          &&     // Sensor Type 0x01 (Temperature)
						          (type == 0x01)                                &&     // Event Type 0x01 (Threshold)
						          ((SELINFO_DATA[j].ExtData1 & 0xF0) == 0x30)    )     // OEM Data 1 [7:4] == 0b0011 (3 bytes OEM data)
						{
						    for (i=0; i<4; i++)
						    {
						        if ( SELINFO_DATA[j].ExtData4 & (1<<i) )
						            CPUSlot = i+1; // CPU is 1-based, ExtData4 is a bitmask.
						    }

						    // Channel and DIMM# mapping is a little more complicated.
						    if (SELINFO_DATA[j].ExtData2 & 0x0F)
						    {
						        ChannelNo = 0;
	                            for (i=0; i<4; i++) { if ( SELINFO_DATA[j].ExtData2 & (1<<i) ) DIMMNo = i; }
						    }
						    else if (SELINFO_DATA[j].ExtData2 & 0xF0)
						    {
						        ChannelNo = 1;
						        for (i=4; i<8; i++) { if ( SELINFO_DATA[j].ExtData2 & (1<<i) ) DIMMNo = i-4; }
						    }
                            else if (SELINFO_DATA[j].ExtData3 & 0x0F)
                            {
                                ChannelNo = 2;
                                for (i=0; i<4; i++) { if ( SELINFO_DATA[j].ExtData3 & (1<<i) ) DIMMNo = i; }
                            }
                            else if (SELINFO_DATA[j].ExtData3 & 0xF0)
                            {
                                ChannelNo = 3;
                                for (i=4; i<8; i++) { if ( SELINFO_DATA[j].ExtData3 & (1<<i) ) DIMMNo = i-4; }
                            }
                            else
                            {
                                ChannelNo = "Unknown";
                            }

						    // Get the standard string, since this is technically a standard event. Then, add the OEM data.
						    str = eLang.getString('event',type,offset);
						    str += ". CPU " + CPUSlot + ", Channel " + ChannelNo + ", DIMM " + DIMMNo + ".";
						}
						else if ( (SELINFO_DATA[j].SensorType == 0x28)        &&     // Management Subsystem Health
                                  (type == 0x03)                              &&     // Digital Discrete
                                  (SELINFO_DATA[j].SensorNum == 0x81)            )   // MTM
						{
						    // MTM
						    str = eLang.getString('common', "STR_LEVEL");
						    str += " " + SELINFO_DATA[j].EventData2 + ",";
						    str += " " + eLang.getString('event',type,offset);
						}
						else if ( (SELINFO_DATA[j].SensorType == 0x01)        &&     // Sensor Type 0x01 (Temperature)
						          (type == 0x05)                              &&     // Event Type 0x05 (Discrete)
						          (SELINFO_DATA[j].SensorNum == 0x90)            )   // VRD Hot
						{
						    // VRD Hot
						    str = eLang.getString('event',type,offset);

						    if (0xA0 == (SELINFO_DATA[j].EventData1 & 0xF0))
						    {
						        var CPUIdx   = 0;
						        var DIMMIdx  = 0;
						        var CPUMaps  = SELINFO_DATA[j].EventData2;
						        var DIMMMaps = SELINFO_DATA[j].EventData3;

						        str += ". "

						        while (CPUMaps != 0)
						        {
						            if ((CPUMaps & 0x01) != 0 && CPUIdx < 4)
						            {
						                str += eLang.getString('oem_VRD_Hot_event_map',0,CPUIdx);
						                str += ", ";
						            }

						            CPUIdx++;
						            CPUMaps >>>= 1;
						        }

						        while (DIMMMaps != 0)
						        {
						            if ((DIMMMaps & 0x01) != 0 && DIMMIdx < 8)
						            {
						                str += eLang.getString('oem_VRD_Hot_event_map',1,DIMMIdx);
						                str += ", ";
						            }

						            DIMMIdx++;
						            DIMMMaps >>>= 1;
						        }
						    }
						}
						else if ( (SELINFO_DATA[j].SensorType == 0x28)        &&     // Sensor Type 0x28 (Management Subsystem Health)
                                  (type == 0x03)                              &&     // Event Type 0x03 (Discrete)
                                  (SELINFO_DATA[j].SensorNum == 0x87)            )   // Autoconfig Sensor
						{
						    str = eLang.getString('oem_specific_event',SELINFO_DATA[j].SensorNum, getbits(SELINFO_DATA[j].EventData3,3,0));
						}
						else if ( (SELINFO_DATA[j].SensorType == 02)        &&     // Voltage
                                  (type == 0x03)                              &&     // Digital Discrete
                                  (SELINFO_DATA[j].SensorNum == 0xD1)            &&	// Voltage Fault
                                  (getvoltagenamecomplete  == 1)				)   
						{
							var datamap0 = SELINFO_DATA[j].EventData2;
							var datamap1 = SELINFO_DATA[j].EventData3;
							var datamap2 = SELINFO_DATA[j].ExtData2;
							var datamap3 = SELINFO_DATA[j].ExtData3;
							var AssertMap = 0;
							var MapCount = 0;

							AssertMap = (datamap0 << 0) + (datamap1 << 8) + (datamap2 << 16) + (datamap3 << 24);
						
							// Normal handling for generic events.
							str = eLang.getString('event',type,offset);
							
							str += ". voltage fault source: ";

							for (i=0; i<32; i++)
							{
							    if ( AssertMap & (1<<i) )
						    	{
									if(1 == VOLTAGENAMEINFO_DATA[i].Enable)
									{
								    		MapCount++;
										if ( MapCount >= 2 )
										{
											str += ", ";
										}
										str += VOLTAGENAMEINFO_DATA[i].VoltageName;
									}
						    	}	
							}												
						}						
						else
						{
							// Normal handling for generic events.
							str = eLang.getString('event',type,offset);
						}
					}else
					{
						str =eLang.getString("common","INVALID_OFFSET");	
					}
				}
				else
				{
					/* specific */
				}



				//if it is a BIOS  Post event then
				if ( (SELINFO_DATA[j].GenID1 >= 0x01) && (SELINFO_DATA[j].GenID1 <= 0x1F) && ( SELINFO_DATA[j].SensorType == 0xf) )
				{
					//look up bios_post_String using offset and evtdata2
					//we are clean..event data 2 should be seen only if this bits indicate evtdata2 has something


					//Only 0 and 1 table are in Bios_post_event_str.js  //
					if (getbits(SELINFO_DATA[j].EventData1,7,6) == 0xC0  &&( (offset >=0 ) && (offset <= 2)))
					{
						/* Since SensorType 0xf ,Offset 1 and 2 use the same table Entry  */
						if(2 == offset) offset =1;

						str += "-" + eLang.getString('bios_post_event',offset,getbits(SELINFO_DATA[j].EventData2,3,0));
					}
					//Give the details of BIOS POST Error Code, if offset is 0 and EventData2 and EventData3 contains data.
					if (SELINFO_DATA[j].EventData1 == 0xA0)
					{
					    if ("Unknown" != eLang.getString('bios_post_event', SELINFO_DATA[j].EventData3, SELINFO_DATA[j].EventData2))
					    {
					        str += ". " + eLang.getString('bios_post_event', SELINFO_DATA[j].EventData3, SELINFO_DATA[j].EventData2);
					    }
					    else
					    {
					        str += ". BIOS POST Error: 0x" + SELINFO_DATA[j].EventData3.toString(16).toUpperCase() + SELINFO_DATA[j].EventData2.toString(16).toUpperCase();
					    }
					}
					else
					{
						str += "-" + eLang.getString('common',"STR_APP_STR_185");
					}
				}

				if ( (SELINFO_DATA[j].GenID1     == 0x2C) &&
					 (SELINFO_DATA[j].SensorType == 0xDC) &&
					 (type                       == 0x72)  )
				{
					// NM Exception
					str = eLang.getString("monitoring_events", "STR_NM_POLICYCORRECTIONTIME");
					
					if (0x80 != getbits(SELINFO_DATA[j].EventData1,7,6))
					{
						str += eLang.getString("monitoring_events", "STR_NM_DOMAIN_UNKNOWN");
					}
					else
					{
						switch(SELINFO_DATA[j].EventData2)
						{
							case 0x00:
								str += eLang.getString("monitoring_events", "STR_NM_DOMAIN_PLAT");
								break;
							case 0x01:
								str += eLang.getString("monitoring_events", "STR_NM_DOMAIN_CPU");
								break;
							case 0x02:
								str += eLang.getString("monitoring_events", "STR_NM_DOMAIN_MEM");
								break;
							default:
								str += eLang.getString("monitoring_events", "STR_NM_DOMAIN_UNKNOWN");
								break;
						}
					}
					
					if (0x20 != getbits(SELINFO_DATA[j].EventData1,5,4))
					{
						str += eLang.getString("monitoring_events", "STR_NM_POLICY_UNKNOWN");
					}
					else
					{
						str += eLang.getString("monitoring_events", "STR_NM_POLICY") + SELINFO_DATA[j].EventData3;
					}
				}
				else if ( (SELINFO_DATA[j].GenID1     == 0x2C) &&
				          (SELINFO_DATA[j].SensorType == 0xDC) &&
				          (SELINFO_DATA[j].SensorNum  == 0xB2) )
				{
				    // Smart CLST
				    // Override the sensor name.
				    SELINFO_DATA[j].SensorName = eLang.getString("monitoring_events", "STR_NM_SMCLST");

				    var u8SMCLSToperationalOffset = getbits(SELINFO_DATA[j].EventData2,7,4) >> 4;
				    if (u8SMCLSToperationalOffset > m_Max_allowed_SMCLST_offset)
				    {
				        str = eLang.getString("common","INVALID_OFFSET");
				    }
				    else
				    {
				        str = eLang.getString('oem_specific_event', SELINFO_DATA[j].SensorNum, u8SMCLSToperationalOffset);
				        if (0x00 != SELINFO_DATA[j].EventData3)
				        {
				            str += " " + eLang.getString("monitoring_events", "STR_NM_SMCLST_FROMPSU") + " " + SELINFO_DATA[j].EventData3 + ".";
				        }
				        else
				        {
				            str += " " + eLang.getString("monitoring_events", "STR_NM_SMCLST_FROMEXT") + ".";
				        }

				        // Sensor uses standard digital discrete assertion/deassertion states.
				        str += " " + eLang.getString("event", type, offset) + ".";

				    }
				}
				else if ( (SELINFO_DATA[j].GenID1     == 0x2C) &&
					 (SELINFO_DATA[j].SensorType == 0xDC) &&
                     (SELINFO_DATA[j].SensorNum == 0x17) )
				{
					// SPS (ME) Firmware Health
					var u8HealthEventType = SELINFO_DATA[j].EventData2;
					var u8ExtendedByte = SELINFO_DATA[j].EventData3;
                    SELINFO_DATA[j].SensorName = eLang.getString("monitoring_events", "STR_NM_FW_HEALTH");

					if (0x00 != getbits(SELINFO_DATA[j].EventData1,3,0))
					{
						str = eLang.getString("common","INVALID_OFFSET");
					}
					else
					{
					//	str = eLang.getString('oem_specific_event', SELINFO_DATA[j].SensorNum, u8HealthEventType);

						if (u8HealthEventType == 0x00)
						{
							str += " " + eLang.getString("monitoring_events", "STR_NM_EVD2_00");
						}
						else if (u8HealthEventType == 0x01)
						{
							str += " " + eLang.getString("monitoring_events", "STR_NM_EVD2_01");
						}
						else if (u8HealthEventType == 0x02)
						{
							str += " " + eLang.getString("monitoring_events", "STR_NM_EVD2_02");
						}
						else if (u8HealthEventType == 0x03)
						{
							switch (u8ExtendedByte)
							{
                                case 0x00:
                                    str += " " + eLang.getString("monitoring_events", "STR_NM_FLASH_PARTITION_TABLE")
                                    break;
								case 0x01:
									str += " " + eLang.getString("monitoring_events", "STR_NM_FLASH_ERASE_LIMIT_REACHED");
									break;
								case 0x02:
									str += " " + eLang.getString("monitoring_events", "STR_NM_FLASH_WRITE_LIMIT_REACHED");
									break;
								case 0x03:
									str += " " + eLang.getString("monitoring_events", "STR_NM_FLASH_WRITE_ENABLED");
									break;
								default:
									str = eLang.getString("common","INVALID_OFFSET");
									break;
							}
						}
						else if (u8HealthEventType == 0x04)
						{
						
							str += " " + eLang.getString("monitoring_events", "STR_NM_EVD2_04");
						}
						else if (u8HealthEventType == 0x05)
						{
						
							str += " " + eLang.getString("monitoring_events", "STR_NM_EVD2_05");
						}
						else if (u8HealthEventType == 0x06)
						{
						
							str += " " + eLang.getString("monitoring_events", "STR_NM_EVD2_06");
						}
						else if (u8HealthEventType == 0x07)
						{
							switch (u8ExtendedByte)
							{
                                case 0x00:
									str += " " + eLang.getString("monitoring_events", "STR_NM_CONFIG_GENERIC");
                                    break;
                                case 0x01:
									str += " " + eLang.getString("monitoring_events", "STR_NM_CONFIG_MISSING_VSCC");
                                    break;
                                case 0x02:
									str += " " + eLang.getString("monitoring_events", "STR_NM_CONFIG_SENSOR_SCAN");
                                    break;
                                case 0x03:
									str += " " + eLang.getString("monitoring_events", "STR_NM_CONFIG_DEVICE");
                                    break;
                                case 0x04:
									str += " " + eLang.getString("monitoring_events", "STR_NM_CONFIG_SMART");
                                    break;
								case 0x05:
									str += " " + eLang.getString("monitoring_events", "STR_NM_CONFIG_INCONSISTENT");
									break;
								default:
                                    str = eLang.getString("common","INVALID_OFFSET");
									// Do nothing. No extended data string, or invalid extended data byte.
									break;
							}
						}
						else if (u8HealthEventType == 0x08)
						{
						
							str += " " + eLang.getString("monitoring_events", "STR_NM_EVD2_08");
						}
						else if (u8HealthEventType == 0x09)
						{
						
							str += " " + eLang.getString("monitoring_events", "STR_NM_EVD2_09");
						}
						else if (u8HealthEventType == 0x0a)
						{
						
							str += " " + eLang.getString("monitoring_events", "STR_NM_EVD2_0a1") + u8ExtendedByte;
							str += eLang.getString("monitoring_events", "STR_NM_EVD2_0a2");
						}
						else if (u8HealthEventType == 0x0D)
						{
							str += " " + eLang.getString("monitoring_events", "STR_NM_EVD2_0d");
							switch (u8ExtendedByte)
							{
                                case 0x01:
							    str += " " + eLang.getString("monitoring_events", "STR_NM_EVD2_0d_01");
                                break;
                                case 0x02:
							    str += " " + eLang.getString("monitoring_events", "STR_NM_EVD2_0d_02");
                                break;
                                case 0x03:
							    str += " " + eLang.getString("monitoring_events", "STR_NM_EVD2_0d_03");
                                break;
                                default:
									str = eLang.getString("common","INVALID_OFFSET");
                                break;
                            }
						
						}
						else if (u8HealthEventType == 0x0E)
						{
						
							str += " " + eLang.getString("monitoring_events", "STR_NM_EVD2_0e");
						}
						else if (u8HealthEventType == 0x0F)
						{
						
							str += " " + eLang.getString("monitoring_events", "STR_NM_EVD2_0f");
						}else if (u8HealthEventType == 0x10)
                        {
							str +=  eLang.getString("monitoring_events", "STR_NM_EVD2_10");
                            switch (u8ExtendedByte)
                            {
                                case 0x00:
                                    str +=  eLang.getString("monitoring_events", "STR_NM_EVD2_10_00");
                                    break;
                                case 0x01:
                                    str +=  eLang.getString("monitoring_events", "STR_NM_EVD2_10_01");
                                    break;
                                case 0x02:
                                    str +=  eLang.getString("monitoring_events", "STR_NM_EVD2_10_02");
                                    break;
                                case 0x03:
                                    str += " " + eLang.getString("monitoring_events", "STR_NM_EVD2_10_03");
                                    break;
                                case 0x04:
                                    str += " " + eLang.getString("monitoring_events", "STR_NM_EVD2_10_04");
                                    break;
                                case 0x05:
                                    str += " " + eLang.getString("monitoring_events", "STR_NM_EVD2_10_05");
                                    break;
                                case 0x07:
                                    str += " " + eLang.getString("monitoring_events", "STR_NM_EVD2_10_07");
                                    break;
                                case 0x08:
                                    str += " " + eLang.getString("monitoring_events", "STR_NM_EVD2_10_08");
                                    break;
                                case 0x09:
                                    str += " " + eLang.getString("monitoring_events", "STR_NM_EVD2_10_09");
                                    break;
                                case 0x0a:
                                    str += " " + eLang.getString("monitoring_events", "STR_NM_EVD2_10_0a");
                                    break;
                                case 0x0b:
                                    str += " " + eLang.getString("monitoring_events", "STR_NM_EVD2_10_0b");
                                    break;
                                case 0x0c:
                                    str += " " + eLang.getString("monitoring_events", "STR_NM_EVD2_10_0c");
                                    break;
                                case 0x0d:
                                    str += " " + eLang.getString("monitoring_events", "STR_NM_EVD2_10_0d");
                                    break;
                                case 0x0e:
                                    str += " " + eLang.getString("monitoring_events", "STR_NM_EVD2_10_0e");
                                    break;
                                case 0x0f:
                                    str += " " + eLang.getString("monitoring_events", "STR_NM_EVD2_10_0f");
                                    break;
                                case 0x10:
                                    str += " " + eLang.getString("monitoring_events", "STR_NM_EVD2_10_10");
                                    break;
                                default:
                                    str = eLang.getString("common","INVALID_OFFSET");
                                    break;
                            }
                            
                        }
                        else
                        {
                            str += " " + eLang.getString("monitoring_events","STR_NM_EVD2_11_FF");
                        }
					}
				}

				if (getbits(SELINFO_DATA[j].EventDirType,7,7) == 0)
					str += " - "+eLang.getString('common',"STR_APP_STR_186");
				else
					str += " - "+eLang.getString('common',"STR_APP_STR_187");



				var ts = SELINFO_DATA[j].TimeStamp;
				//var ts = ((((Val & 0xff) << 24)+((Val & 0xff00) << 8)+((Val & 0xff0000) >> 8) +((Val & 0xff000000) >> 24)));

				var EvtDate = new Date(ts*1000);
				var disp_month=EvtDate.getUTCMonth()+1;
				disp_month =((disp_month < 10)?"0":"") + disp_month;
				var disp_date = EvtDate.getUTCDate();
				disp_date=((disp_date < 10)?"0":"") + disp_date;
				timestamp = disp_month+'/'+disp_date+'/'+EvtDate.getUTCFullYear();
				var disp_hours =EvtDate.getUTCHours();
				disp_hours =((disp_hours < 10)?"0":"") + disp_hours;
				var disp_mins = EvtDate.getUTCMinutes();
				disp_mins =((disp_mins < 10)?"0":"") + disp_mins;
				var disp_secs = EvtDate.getUTCSeconds();
				disp_secs =((disp_secs < 10)?"0":"") + disp_secs;
				timestamp += '  '+disp_hours+':'+disp_mins+':'+disp_secs;

				JSONRows.push({cells:[
				                      {text:parseInt(SELINFO_DATA[j].RecordID), value:parseInt(SELINFO_DATA[j].RecordID)},
				                      {text:timestamp, value:timestamp},
				                      {text:SELINFO_DATA[j].SensorName, value:SELINFO_DATA[j].SensorName},
				                      {text:eLang.getString('sensortype',SELINFO_DATA[j].SensorType), value:eLang.getString('sensortype',SELINFO_DATA[j].SensorType)},
				                      {text:str, value:str}
				                      ]})

				                      count++;
			}
		}else if ((SELINFO_DATA[j].RecordType >= 0xC0) && (SELINFO_DATA[j].RecordType <= 0xDF)
				&& (eventTypeSel.options[eventTypeSel.options.selectedIndex].value == 4) )
		{
			var ts = SELINFO_DATA[j].TimeStamp;
			var EvtDate = new Date(ts*1000);
			var disp_month=EvtDate.getUTCMonth()+1;
			disp_month =((disp_month < 10)?"0":"") + disp_month;
			var disp_date = EvtDate.getUTCDate();
			disp_date=((disp_date < 10)?"0":"") + disp_date;
			timestamp = disp_month+'/'+disp_date+'/'+EvtDate.getUTCFullYear();
			var disp_hours =EvtDate.getUTCHours();
			disp_hours =((disp_hours < 10)?"0":"") + disp_hours;
			var disp_mins = EvtDate.getUTCMinutes();
			disp_mins =((disp_mins < 10)?"0":"") + disp_mins;
			var disp_secs = EvtDate.getUTCSeconds();
			disp_secs =((disp_secs < 10)?"0":"") + disp_secs;
			timestamp += '  '+disp_hours+':'+disp_mins+':'+disp_secs;

			str = eLang.getString('common', "STR_OEM_TIMESTAMPEVENT");

			if ((SELINFO_DATA[j].RecordType >= 0xDC) && (SELINFO_DATA[j].RecordType <= 0xDE))
			{
				str += " - " + eLang.getString('common', "STR_OEM_SEL_RECORD_TYPE", (SELINFO_DATA[j].RecordType - 0xDC));
			}
			else
			{
				str += " - Data: " + SELINFO_DATA[j].GenID1.toString(16).toUpperCase() + " " + SELINFO_DATA[j].GenID2.toString(16).toUpperCase() + " " + SELINFO_DATA[j].EvmRev.toString(16).toUpperCase() + " "
				+ SELINFO_DATA[j].SensorType.toString(16).toUpperCase() + " " + SELINFO_DATA[j].SensorNum.toString(16).toUpperCase() + " " + SELINFO_DATA[j].EventDirType.toString(16).toUpperCase() + " "
				+ SELINFO_DATA[j].EventData1.toString(16).toUpperCase() + " " + SELINFO_DATA[j].EventData2.toString(16).toUpperCase() + " " + SELINFO_DATA[j].EventData3.toString(16).toUpperCase() + " ";
			}

			JSONRows.push({cells:[
			                      {text:parseInt(SELINFO_DATA[j].RecordID), value:parseInt(SELINFO_DATA[j].RecordID)},
			                      {text:timestamp, value:timestamp},
			                      {text:eLang.getString('common',"STR_NOT_APPLICABLE"), value:eLang.getString('common',"STR_NOT_APPLICABLE")},
			                      {text:eLang.getString('common',"STR_NOT_APPLICABLE"), value:eLang.getString('common',"STR_NOT_APPLICABLE")},
			                      {text:str, value:str}
			                      ]})

			                      count++;			
		}else if ((SELINFO_DATA[j].RecordType >= 0xE0) && (SELINFO_DATA[j].RecordType <= 0xFF)
				&& (eventTypeSel.options[eventTypeSel.options.selectedIndex].value == 4)){
			str = eLang.getString('common', "STR_OEM_NONTIMESTAMPEVENT");

			str += " - Data: " + ((SELINFO_DATA[j].TimeStamp >>  0) & 0xFF).toString(16).toUpperCase() + " " + ((SELINFO_DATA[j].TimeStamp >>  8) & 0xFF).toString(16).toUpperCase() + " "
			+ ((SELINFO_DATA[j].TimeStamp >> 16) & 0xFF).toString(16).toUpperCase() + " " + ((SELINFO_DATA[j].TimeStamp >> 24) & 0xFF).toString(16).toUpperCase() + " "
			+ SELINFO_DATA[j].GenID1.toString(16).toUpperCase() + " " + SELINFO_DATA[j].GenID2.toString(16).toUpperCase() + " " + SELINFO_DATA[j].EvmRev.toString(16).toUpperCase() + " "
			+ SELINFO_DATA[j].SensorType.toString(16).toUpperCase() + " " + SELINFO_DATA[j].SensorNum.toString(16).toUpperCase() + " " + SELINFO_DATA[j].EventDirType.toString(16).toUpperCase() + " "
			+ SELINFO_DATA[j].EventData1.toString(16).toUpperCase() + " " + SELINFO_DATA[j].EventData2.toString(16).toUpperCase() + " " + SELINFO_DATA[j].EventData3.toString(16).toUpperCase() + " ";
			JSONRows.push({cells:[
			                      {text:parseInt(SELINFO_DATA[j].RecordID), value:parseInt(SELINFO_DATA[j].RecordID)},
			                      {text:eLang.getString('common',"STR_NOT_APPLICABLE"), value:eLang.getString('common',"STR_NOT_APPLICABLE")},
			                      {text:eLang.getString('common',"STR_NOT_APPLICABLE"), value:eLang.getString('common',"STR_NOT_APPLICABLE")},
			                      {text:eLang.getString('common',"STR_NOT_APPLICABLE"), value:eLang.getString('common',"STR_NOT_APPLICABLE")},
			                      {text:str, value:str}
			                      ]})

			                      count++;
		}
		else
		{
		    // Unknown, possibly NULL SEL. Treat it as raw data.
		    str = eLang.getString('monitoring_events', "STR_OTHER");

		                str += " - Data: " + ((SELINFO_DATA[j].TimeStamp >>  0) & 0xFF).toString(16).toUpperCase() + " " + ((SELINFO_DATA[j].TimeStamp >>  8) & 0xFF).toString(16).toUpperCase() + " "
		                + ((SELINFO_DATA[j].TimeStamp >> 16) & 0xFF).toString(16).toUpperCase() + " " + ((SELINFO_DATA[j].TimeStamp >> 24) & 0xFF).toString(16).toUpperCase() + " "
		                + SELINFO_DATA[j].GenID1.toString(16).toUpperCase() + " " + SELINFO_DATA[j].GenID2.toString(16).toUpperCase() + " " + SELINFO_DATA[j].EvmRev.toString(16).toUpperCase() + " "
		                + SELINFO_DATA[j].SensorType.toString(16).toUpperCase() + " " + SELINFO_DATA[j].SensorNum.toString(16).toUpperCase() + " " + SELINFO_DATA[j].EventDirType.toString(16).toUpperCase() + " "
		                + SELINFO_DATA[j].EventData1.toString(16).toUpperCase() + " " + SELINFO_DATA[j].EventData2.toString(16).toUpperCase() + " " + SELINFO_DATA[j].EventData3.toString(16).toUpperCase() + " ";
            JSONRows.push({cells:[
                                  {text:parseInt(SELINFO_DATA[j].RecordID), value:parseInt(SELINFO_DATA[j].RecordID)},
                                  {text:eLang.getString('common',"STR_NOT_APPLICABLE"), value:eLang.getString('common',"STR_NOT_APPLICABLE")},
                                  {text:eLang.getString('common',"STR_NOT_APPLICABLE"), value:eLang.getString('common',"STR_NOT_APPLICABLE")},
                                  {text:eLang.getString('common',"STR_NOT_APPLICABLE"), value:eLang.getString('common',"STR_NOT_APPLICABLE")},
                                  {text:str, value:str}
                                  ]})

                                  count++;
		}
	}
	
	globlTBL = JSONRows;

	// Cut-up the table to speed-up load times.
	var tempTBL = JSONRows.slice(tblStart,tblStart + numShow);
	
	tblJSON.rows = tempTBL;
	deriveRanges();
//	tblJSON.rows = JSONRows;

	eventLogTable.loadFromJson(tblJSON);

	if (eventTypeSel.options[eventTypeSel.options.selectedIndex].value == 4)
		eventLogCount.innerHTML = SELINFO_DATA.length+eLang.getString('common',"STR_APP_STR_189");
	else
		eventLogCount.innerHTML = count+eLang.getString('common',"STR_APP_STR_189");

	if(!SELINFO_DATA.length)
		clearLog.disabled = true;
	else
		clearLog.disabled = false;

	//	selui.m_elm3.sortCol(0,0); /* (Column number, Direction) */

	showWait(false);
	delete tempTBL;

}


function comborefresh()
{
	showWait(true, eLang.getString('common',"STR_SORTING"));
	setTimeout("RefreshEvents()",1000);
}


function IPMICMD_ClearSEL_Res()
{
	alert(eLang.getString('common',"STR_APP_STR_198"));
	clearLog.disabled = false;
    CheckSELFull();
	IPMICMD_HL_GetSELInfo();
}





function IPMICMD_SaveSEL_Res() 
{
	var randomnumber=Math.floor(Math.random()*10000);
	document.location = "/sel/SELLOG.zip?rnd="+randomnumber;
	saveLog.disabled = false;
}




function SaveSel()
{
	if((g_isadmin == 1)||(g_isuser == 1))
	{
		RPC_SaveSEL = new xmit.getset({url:"/rpc/savesel.asp",onrcv:IPMICMD_SaveSEL_Res,status:'',timeout:60});
		RPC_SaveSEL.send();
		saveLog.disabled = true;
	}

}




function ClearSel()
{
	if (g_isadmin)
	{
		if (!SELINFO_DATA.length)
		{
			alert(eLang.getString('common',"NO_SEL_STRING"));
			clearLog.disabled = true;
			saveLog.disabled = true;
			return;
		}

		if (confirm(eLang.getString('common',"STR_APP_STR_199")))
		{
			RPC_ClearSEL = new xmit.getset({url:"/rpc/clearsel.asp",onrcv:IPMICMD_ClearSEL_Res,status:'',timeout:60});
			RPC_ClearSEL.send();
			clearLog.disabled = true;
		}
		else
		{
			return;
		}
	}
	else
		alert(eLang.getString('common',"STR_APP_STR_184"));
}


function getFirstDIMMchannel(u8CPUNum_onebased)
{
	var ChannelNo;

	if (u8CPUNum_onebased == 1)
	{
		switch(productID)
		{
		case 0x4A:
		case 0x49:
		case 0x4E:
		case 0x55:
		case 0x56:
		case 0x4D:
		case 0x5D:
		case 0x54:
		case 0x65:
		case 0x6F:
		case 0x70:
		case 0x71:
		case 0x73:
		{
			// S1600/S2600, start with "A".
			ChannelNo = "A";
			break;
		}

		case 0x59:
		case 0x57:
		case 0x53:
		case 0x52:
		case 0x51:
		case 0x50:
		case 0x4F:
		case 0x48:
		{
			// S1400/S2400, channel 0 doesn't exist, so 1->A. Use "@" to provide the proper ASCII "A" for channel 1.
			ChannelNo = "@";
			break;
		}

		case 0x00:
		case 0xFF:
		default:
		{
			// Unknown or other, start with "A".
			ChannelNo = "A";
			break;
		}
		} 
	}
	else if (u8CPUNum_onebased == 2)
	{
		// Channel numbering for other sockets varies by product.
		switch (productID)
		{
		case 0x4A:
		case 0x49:
		case 0x4E:
		case 0x55:
		case 0x56:
		case 0x4D:
		case 0x5D:
		case 0x54:
		case 0x65:
        case 0x6F:
        case 0x70:
        case 0x71:
        case 0x73:
		{
			// S1600/S2600, start with "E".
			ChannelNo = "E";
			break;
		}

		case 0x59:
		case 0x57:
		case 0x53:
		case 0x52:
		case 0x51:
		case 0x50:
		case 0x4F:
		case 0x48:
		{
			// S1400/S2400, CPU1/2 channel 0 doesn't exist, so CPU2 1->D. Use "C" to provide the proper ASCII "D" for CPU2 channel 1.
			ChannelNo = "C";
			break;
		}

		case 0x00:
		case 0xFF:
		default:
		{
			// Unknown or other, start with "E".
			ChannelNo = "E";
			break;
		}
		} 
	}
	else if (u8CPUNum_onebased == 3)
	{
		// S4600
		ChannelNo = "I";
	}
	else // if (u8CPUNum_onebased >= 4)
	{
		// S4600
		ChannelNo = "M";
	}	

	return ChannelNo;
}

function CheckSELFull()
{
	xmit.get({url:'/rpc/getSELallocation.asp', onrcv:OnSELAllocation, status:''});
}

function OnSELAllocation()
{
	var CmdStatus = WEBVAR_JSONVAR_SELALLOC.HAPI_STATUS

	if (CmdStatus == 0)
	{
		var u8CompCode 		= WEBVAR_JSONVAR_SELALLOC.WEBVAR_STRUCTNAME_SELALLOC[0].u8CompCode;
		var u16totalUnits 	= WEBVAR_JSONVAR_SELALLOC.WEBVAR_STRUCTNAME_SELALLOC[0].u16numTotalUnits;
		var u16freeUnits 	= WEBVAR_JSONVAR_SELALLOC.WEBVAR_STRUCTNAME_SELALLOC[0].u16numFreeUnits;
		
		var u16usedUnits = u16totalUnits - u16freeUnits;
		
		var usedPct = Math.floor(100 * (u16usedUnits / u16totalUnits));
		
		eventLogFull.innerHTML = eLang.getString('monitoring_events',"STR_EVENTS_FULLPERCENT1") + usedPct + eLang.getString('monitoring_events',"STR_EVENTS_FULLPERCENT2");
		
		if (usedPct <  75)
		{
		    eventLogFull.style.color = "black";
		}
		if (usedPct >= 75)
		{
			eventLogFull.style.color = "red";
		}
		if (usedPct == 100)
		{
            fullNotice.innerHTML = eLang.getString("monitoring_events", "STR_EVENTS_SELFULL_CIRCULAR");
            fullNotice.style.color = "red";
            fullNotice.style.fontWeight="bold";
		    fullNotice.style.display = "inline";
		}
		else
		{
		    fullNotice.style.display = "none";
		}
		
		var meterString = new String();
		for(var i=1; i<=100; i++)
		{
			if (i <= usedPct)
			{
				meterString += "<div style=\"width:2px;height:10px;background-color:red;float:left\"></div>";
			}
			else
			{
				meterString += "<div style=\"width:2px;height:10px;background-color:white;float:left\"></div>";
			}
		}
		eventLogMeter.style.border="thin solid black";
		eventLogMeter.innerHTML = meterString;
	}
	else
	{
		eventLogFull.innerHTML = "";
		eventLogMeter.innerHTML = "";
	}
}

function showNext()
{
	if (tblStart + numShow >=  globlTBL.length)
	{
		return;
	}
	tblStart += numShow;
	
	// Cut-up the table to speed-up load times.
	var tempTBL = globlTBL.slice(tblStart,tblStart + numShow);
	
	tblJSON.rows = tempTBL;

	eventLogTable.loadFromJsonDataOnly(tblJSON);
	deriveRanges();

	delete tempTBL;
}

function showPrevious()
{
	tblStart -= numShow;
	if (tblStart < 0)
	{
		tblStart = 0;
	}
	
	// Cut-up the table to speed-up load times.
	var tempTBL = globlTBL.slice(tblStart,tblStart + numShow);
	
	tblJSON.rows = tempTBL;

	eventLogTable.loadFromJsonDataOnly(tblJSON);
	deriveRanges();
	
	delete tempTBL;
}

function deriveRanges()
{
	var rangeMarkers = new Array();
	var rangeStrings = new Array();
	var i = 0;
	var j = 0;
	var currentPage = 0;
	var maxPage = 0;
	var numPrePages = 0;
	var numPostPages = 0;
	var numExtra = 0;
	var tempNum = 0;
	var rangeStr = new String();
	
	if (numShow >= globlTBL.length)
	{
		// We're showing everything already, just clear the range field.
		ranges.innerHTML = "";
		return;
		
	}
	// We'll list pages around the current one: two before, two after.
	// The current page won't be clickable to indicate that we're on that page.
	
	// The elipses should be added after all five, to give us a big jump (50%).
	
	// Some baselines:
	currentPage = Math.ceil(tblStart / numShow) + 1;	// Pages shall be 1-based.
	maxPage = Math.ceil(globlTBL.length / numShow);
	
	// Create an array of all range markers. We'll pick out the ones we want later.
	for (i=1; i<=maxPage; i++)
	{
		rangeMarkers[i] = i;
	}
	
	// Figure out how many pages before and after the current:
	numPrePages = currentPage - 1;
	if (numPrePages < 0) 
		numPrePages = 0;
	if (numPrePages > MAXPAGEMARKERS)
	{
		numPrePages = MAXPAGEMARKERS;
	}
	
	numPostPages = maxPage - currentPage;
	if (numPostPages < 0) 
		numPostPages = 0;
	if (numPostPages > MAXPAGEMARKERS)
	{
		numPostPages = MAXPAGEMARKERS;
	}
	
	// Get any pre-pages.
	for (i=0; ((i<numPrePages)&&(i<MAXPAGEMARKERS)); i++)
	{
		tempNum = rangeMarkers[currentPage - numPrePages + i];
		rangeStrings[i] = "<a href=\"javascript:void(0)\" onclick=\"goRange(" + tempNum + ");\">" + tempNum.toString() + "</a>" + ", ";
	}
	// Current page
	rangeStrings[i++] = "<b>" + currentPage.toString() + "</b>, ";
	
	// Get any post-pages.
	for (j=1; ((j<=numPostPages)&&(j<=MAXPAGEMARKERS)); j++)
	{
		tempNum = rangeMarkers[currentPage + j];
		rangeStrings[i] = "<a href=\"javascript:void(0)\" onclick=\"goRange(" + tempNum + ");\">" + tempNum.toString() + "</a>" + ", ";
		i++;
	}
	
	// Get anything in the elipses. Elipses should jump to a spot 1/2 way between the edge and the nearest visible marker.
	// Pre-elipses
	numPrePages = currentPage - 1;
	if(numPrePages > MAXPAGEMARKERS)
	{
		tempNum = Math.floor(numPrePages / 2);
		if (tempNum > MAXPAGEMARKERS)
		{
			rangeStrings.unshift("<a href=\"javascript:void(0)\" onclick=\"goRange(" + tempNum + ");\">" + "..." + "</a>" + ", ");
		}
		else
		{
			// Can't get a good average jump to the start, so just add a jump directly to the start.
			rangeStrings.unshift("<a href=\"javascript:void(0)\" onclick=\"goRange(" + 1 + ");\">" + "..." + "</a>" + ", ");
		}
	}
	
	// Post-elipses
	numPostPages = maxPage - currentPage;
	if(numPostPages > MAXPAGEMARKERS)
	{
		tempNum = Math.ceil(numPostPages / 2);
		if ((tempNum > MAXPAGEMARKERS) && ((tempNum + currentPage) <= maxPage))
		{
			rangeStrings.push("<a href=\"javascript:void(0)\" onclick=\"goRange(" + (currentPage + tempNum) + ");\">" + "..." + "</a>" + ", ");
		}
		else
		{
			// Can't get a good average jump to the end, so just add a jump directly to the end.
			rangeStrings.push("<a href=\"javascript:void(0)\" onclick=\"goRange(" + maxPage + ");\">" + "..." + "</a>" + ", ");
		}
	}

	if(1 != currentPage)
	{
		rangeStr += "<a href=\"javascript:void(0)\" onclick=\"goRange(1)\">" + eLang.getString("monitoring_events", "STR_EVENT_FIRST") + "</a> ";
		rangeStr += "<a href=\"javascript:void(0)\" onclick=\"showPrevious()\">" + eLang.getString("monitoring_events", "STR_EVENT_PREV") + "</a> ";
	}
	
	for (i=0; i<rangeStrings.length; i++)
	{
		rangeStr += rangeStrings[i];	
	}
	// Remove the extra ", "
	rangeStr = rangeStr.slice(0,-2);
	
	if (maxPage != currentPage)
	{
		rangeStr += " <a href=\"javascript:void(0)\" onclick=\"showNext()\">" + eLang.getString("monitoring_events", "STR_EVENT_NEXT") + "</a> ";
		rangeStr += "<a href=\"javascript:void(0)\" onclick=\"goRange(" + maxPage + ")\">" + eLang.getString("monitoring_events", "STR_EVENT_LAST") + "</a> ";
	}
	
	// If there's only one range marker in our list, don't display anything (only one page available).
	if (1 == rangeStrings.length)
	{
		ranges.innerHTML = "";
	}
	else
	{
		ranges.innerHTML = rangeStr;
	}
}

function goRange(startPage)
{
	if ((startPage - 1) < 0)
	{
		return;
	}
	
	if (((startPage - 1) * numShow) >=  globlTBL.length)
	{
		return;
	}
	
	var tempTBL = globlTBL.slice((startPage - 1) * numShow,((startPage - 1) * numShow) + numShow);
	
	tblJSON.rows = tempTBL;

	tblStart = (startPage - 1) * numShow;
	
	eventLogTable.loadFromJsonDataOnly(tblJSON);
	deriveRanges();
	
	delete tempTBL;
}

function localSort(columnID, type, sortup)
{
	var sortColumn = new Array();
	var sortedTable = new Array();

	// Grab a current copy of our target sort column.
    for(i=0, tableLen = globlTBL.length; i<tableLen; i++)
    {
    	sortColumn[i] = globlTBL[i].cells[columnID].value;
    }
    
    // Sort it based on the type (2 == numeric, else assume alpha).
    if (2 == type)
    {
    	sortColumn = sortColumn.sort(sortNumeric);
    }
    else
    {
    	sortColumn = sortColumn.sort();
    }
    
    if (1 != sortup)
    {
    	sortColumn = sortColumn.reverse();
    }
    
    for(i=0, tableLen = sortColumn.length; i<tableLen; i++)
    {
    	//check which row the element was resided
    	for(curRow = 0, rowLen = globlTBL.length; curRow < rowLen; curRow++)
    	{
    		if(sortColumn[i] == globlTBL[curRow].cells[columnID].value)
    		{
    			sortedTable[i] = globlTBL[curRow];
    			//remove the cell entry
    			//globlTbl[curRow].cells[columnID].value = '';
    			globlTBL.splice(curRow, 1);
    			break;
    		}
    	}
    }
    
    globlTBL = sortedTable;

	// Cut-up the table to speed-up load times.
	var tempTBL = globlTBL.slice(tblStart,tblStart + numShow);
	
	tblJSON.rows = tempTBL;

	eventLogTable.loadFromJsonDataOnly(tblJSON);
	deriveRanges();
	
	delete tempTBL;
	delete sortColumn;
	delete sortedTable;
	
	return;
}

function sortNumeric(a,b)
{
	return (a-b);
}

function setPerPage()
{
	if (perPageDropDown.options[perPageDropDown.options.selectedIndex].value == eLang.getString("monitoring_events", "STR_EVENT_ALL"))
	{
		if (globlTBL.length > 750)
		{
			var confresult=confirm(eLang.getString("monitoring_events", "STR_EVENT_ALLWARN"))
			if (true == confresult)
			{
				// Fall through - set to all.
			}
			else
			{
				perPageDropDown.options.selectedIndex = 0;
				numShow = parseInt(perPageDropDown.options[perPageDropDown.options.selectedIndex].value, 10);
				var tempTBL = globlTBL.slice(tblStart,tblStart + numShow);
				
				tblJSON.rows = tempTBL;

				eventLogTable.loadFromJsonDataOnly(tblJSON);
				deriveRanges();
				
				delete tempTBL;
				return;
			}
		}
		numShow = globlTBL.length;
		tblStart = 0;
		tblJSON.rows = globlTBL;
		eventLogTable.loadFromJsonDataOnly(tblJSON);
		deriveRanges();
	}
	else
	{
		numShow = parseInt(perPageDropDown.options[perPageDropDown.options.selectedIndex].value, 10);
		var tempTBL = globlTBL.slice(tblStart,tblStart + numShow);
		
		tblJSON.rows = tempTBL;

		eventLogTable.loadFromJsonDataOnly(tblJSON);
		deriveRanges();
		
		delete tempTBL;
	}
}


