var ChassisElements = new Array();
var BoardElements = new Array();
var ProductElements = new Array();
var FRUAreas = new Array();

function doInit() {
	exposeElms(['_chassisType',
				'_chassisModelNumber',
				'_chassisSerialNumber',
				
				'_boardManufactureDate',
				'_boardManufacturer',
				'_boardProductName',
				'_boardSerialNumber',
				'_boardModelNumber',
				'_boardFruFileID',

				'_productManufacturer',
				'_productProductName',
				'_productModelNumber',
				'_productVersion',
				'_productSerialNumber',
				'_productAssetTag',
				'_productFruFileID',

				'_fruLocatorName',
				'_FRUSelector',
				'_ChassisArea',
				'_BoardArea',
				'_ProdArea',
				'_mainFRUMessage']);

	ChassisElements = ['_chassisType',
	                   '_chassisModelNumber',
	                   '_chassisSerialNumber'];

	BoardElements = ['_boardManufactureDate',
	                 '_boardManufacturer',
	                 '_boardProductName',
	                 '_boardSerialNumber',
	                 '_boardModelNumber',
	                 '_boardFruFileID'];

	ProductElements = ['_productManufacturer',
	                   '_productProductName',
	                   '_productModelNumber',
	                   '_productVersion',
	                   '_productSerialNumber',
	                   '_productAssetTag',
	                   '_productFruFileID'];

	FRUAreas = ['_ChassisArea',
                '_BoardArea',
                '_ProdArea'];

	FRUSelector.onchange = ProcessFruInfo;
	FRUSelector.disabled = true;
	showWait(true);
	xmit.get({url:"/rpc/getallfruinfo_bmc.asp",onrcv:ProcessFruInfo, status:''});	
}

function ProcessFruInfo(arg)
{
    showWait(false);
    FRUSelector.disabled = false;

	var CmdStatus = WEBVAR_JSONVAR_HL_GETALLFRUINFO.HAPI_STATUS;
	if (CmdStatus != 0)
	{
		errstr = eLang.getString('common','STR_APP_STR_220');
		errstr +=  (eLang.getString('common','STR_IPMI_ERROR') + GET_ERROR_CODE(CmdStatus));
		alert (errstr);
	}
	else
	{	

		var frunames = WEBVAR_JSONVAR_HL_GETALLFRUINFO.WEBVAR_STRUCTNAME_HL_GETALLFRUINFO;

	    // Populate the drop-down if it isn't populated already.
		if (FRUSelector.length == 0)
		{
            for (i=0; i<frunames.length; i++)
            {
                FRUSelector.add(new Option(frunames[i].FRUDeviceName, i), window.ActiveXObject?i:i);
            }
		}

		var _fruinfo = WEBVAR_JSONVAR_HL_GETALLFRUINFO.WEBVAR_STRUCTNAME_HL_GETALLFRUINFO[FRUSelector.selectedIndex];
        var chassis_type = _fruinfo.CI_ChassisType;
        var chassis_modelNumber= _fruinfo.CI_ChassisPartNum;
        var chassis_serialNumber= _fruinfo.CI_ChassisSerialNum;


        // Build the date field(s) only if the date isn't 0 or -1.
        if ( ( ( _fruinfo.BI_MfgDateTime0 != 0)  && (_fruinfo.BI_MfgDateTime1 != 0)  && (_fruinfo.BI_MfgDateTime2 != 0)  ) &&
             ( ( _fruinfo.BI_MfgDateTime0 != 255) && (_fruinfo.BI_MfgDateTime1 != 255) && (_fruinfo.BI_MfgDateTime2 != 255) ) )
        {
            /* 3-byte field value represents minutes since 00:00 01/01/1996; show date & time properly !*/
            var MfgYear = '0000';
            var MfgMon  = '00';
            var MfgDay  = '00';
            var MfgHour = '00';
            var MfgMins = '00';
            var BdMfgDateTime = (_fruinfo.BI_MfgDateTime0) + (_fruinfo.BI_MfgDateTime1<<8) + (_fruinfo.BI_MfgDateTime2<<16);
            var DaysSince1996 = Math.floor(BdMfgDateTime / (24 * 60));

            var msMfgDate = new Date(1996,0,1,0,0,0,0); /* Jan 01,1996 at 00:00:00.000 */
            msMfgDate.setMinutes(msMfgDate.getMinutes() + BdMfgDateTime);

            MfgYear = msMfgDate.getFullYear();
            MfgMon  = (msMfgDate.getMonth() < 9 ? '0' : '') + (msMfgDate.getMonth() + 1);
            MfgDay  = (msMfgDate.getDate() < 10 ? '0' : '') + msMfgDate.getDate();

            var minMfgTime = BdMfgDateTime - (DaysSince1996 * 24 * 60);
            MfgHour = Math.floor(minMfgTime / 60);
            MfgHour = (MfgHour < 10 ? '0' : '') + (MfgHour);
            MfgMins = minMfgTime - (MfgHour * 60);
            MfgMins = (MfgMins < 10 ? '0' : '') + (MfgMins);


            var board_manufactureDate = MfgYear + "-" + MfgMon + "-" + MfgDay + " &nbsp; " + MfgHour + ":" + MfgMins;
        }
        else
        {
            var board_manufactureDate = "Unknown";
        }
		var board_manufacturer= _fruinfo.BI_BoardMfr;
		var board_productName= _fruinfo.BI_BoardProductName;
		var board_serialNumber= _fruinfo.BI_BoardSerialNum;
		var board_modelNumber= _fruinfo.BI_BoardPartNum;
		var board_fruFileID= _fruinfo.BI_FRUFileID;
 
		var product_manufacturer= _fruinfo.PI_MfrName;
		var product_productName= _fruinfo.PI_ProductName;
		var product_modelNumber= _fruinfo.PI_ProductPartNum;
		var product_version= _fruinfo.PI_ProductVersion;
		var product_serialNumber= _fruinfo.PI_ProductSerialNum;
		var product_assetTag= _fruinfo.PI_AssetTag;
		var product_fruFileID= _fruinfo.PI_FRUFileID;
	}	
	chassisType.innerHTML = eLang.chassistype_strings[chassis_type];
	chassisModelNumber.innerHTML = chassis_modelNumber;
	chassisSerialNumber.innerHTML = chassis_serialNumber;
	
	boardManufactureDate.innerHTML = board_manufactureDate;
	boardManufacturer.innerHTML = board_manufacturer;
	boardProductName.innerHTML = board_productName;
	boardSerialNumber.innerHTML = board_serialNumber;
	boardModelNumber.innerHTML = board_modelNumber;
	boardFruFileID.innerHTML = board_fruFileID;

	productManufacturer.innerHTML = product_manufacturer;
	productProductName.innerHTML = product_productName;
	productModelNumber.innerHTML = product_modelNumber;
	productVersion.innerHTML = product_version;
	productSerialNumber.innerHTML = product_serialNumber;
	productAssetTag.innerHTML = product_assetTag;
	productFruFileID.innerHTML = product_fruFileID;

	hideAreas();
}

function hideAreas()
{
    var numHidden = 0;
    // Check and hide chassis elements if necessary.
    for (i=0; i<ChassisElements.length; i++)
    {
        if ((document.getElementById(ChassisElements[i]).innerHTML == "(null)")             ||
            (document.getElementById(ChassisElements[i]).innerHTML == "Unknown")            ||
            (document.getElementById(ChassisElements[i]).innerHTML == "")                   ||
            (document.getElementById(ChassisElements[i]).innerHTML.charCodeAt(0) == 0xFFFF) ||
            (document.getElementById(ChassisElements[i]).innerHTML.charCodeAt(0) == 0xFFFD) ||
            (document.getElementById(ChassisElements[i]).innerHTML == "undefined")          )
        {
            document.getElementById(ChassisElements[i] + "Row").style.display = "none";
            numHidden++;
        }
        else
        {
            document.getElementById(ChassisElements[i] + "Row").style.display = "table-row";
        }
    }
    if (numHidden >= ChassisElements.length)
    {
        document.getElementById("_ChassisArea").style.display = "none";
    }
    else
    {
        document.getElementById("_ChassisArea").style.display = "";
    }

    // Check and hide board elements if necessary.
    numHidden = 0;
    for (i=0; i<BoardElements.length; i++)
    {
        if ((document.getElementById(BoardElements[i]).innerHTML == "(null)")             ||
            (document.getElementById(BoardElements[i]).innerHTML == "Unknown")            ||
            (document.getElementById(BoardElements[i]).innerHTML == "")                   ||
            (document.getElementById(BoardElements[i]).innerHTML.charCodeAt(0) == 0xFFFF) ||
            (document.getElementById(BoardElements[i]).innerHTML.charCodeAt(0) == 0xFFFD) ||
            (document.getElementById(BoardElements[i]).innerHTML == "undefined")           )
        {
            document.getElementById(BoardElements[i] + "Row").style.display = "none";
            numHidden++;
        }
        else
        {
            document.getElementById(BoardElements[i] + "Row").style.display = "table-row";
        }
    }
    if (numHidden >= BoardElements.length)
    {
        document.getElementById("_BoardArea").style.display = "none";
    }
    else
    {
        document.getElementById("_BoardArea").style.display = "";
    }

    // Check and hide product elements if necessary.
    numHidden = 0;
    for (i=0; i<ProductElements.length; i++)
    {
        if ((document.getElementById(ProductElements[i]).innerHTML == "(null)")             ||
            (document.getElementById(ProductElements[i]).innerHTML == "Unknown")            ||
            (document.getElementById(ProductElements[i]).innerHTML == "")                   ||
            (document.getElementById(ProductElements[i]).innerHTML.charCodeAt(0) == 0xFFFF) ||
            (document.getElementById(ProductElements[i]).innerHTML.charCodeAt(0) == 0xFFFD) ||
            (document.getElementById(ProductElements[i]).innerHTML == "undefined")           )
        {
            document.getElementById(ProductElements[i] + "Row").style.display = "none";
            numHidden++;
        }
        else
        {
            document.getElementById(ProductElements[i] + "Row").style.display = "table-row";
        }
    }
    if (numHidden >= ProductElements.length)
    {
        document.getElementById("_ProdArea").style.display = "none";
    }
    else
    {
        document.getElementById("_ProdArea").style.display = "";
    }

    // Now check to see if all areas are hidden. This means the FRU was inaccessible, or had no valid data.
    for (i=0; i<FRUAreas.length; i++)
    {
        if (document.getElementById(FRUAreas[i]).style.display != "none")
        {
            break;
        }
    }
    if (i >= FRUAreas.length)
    {
        // All areas are hidden. Display an error.
        document.getElementById("_mainFRUMessage").innerHTML = eLang.getString('fru_info','STR_FRU_INFO_NODATA');
        document.getElementById("_mainFRUMessage").display = "";
    }
    else
    {
        document.getElementById("_mainFRUMessage").innerHTML = "";
        document.getElementById("_mainFRUMessage").display = "none";
    }

    return;
}
