
var host_power_state = 0;
var   me_available = 0;

function doInit() {
	exposeElms(['_deviceAvailable',
		    '_statusMsg',
		    '_bmcFwRev',
		    '_BIOSStr',
		    '_bootFwRev',
 		    '_buildTime',
 		    '_sdrVersion',
		    '_RMM3Status',
		    '_MEVersion',
		    '_MEbldPatch',
		    '_brdserial',
		    '_LEDHealthGreen',
		    '_LEDFaultAmber',
		    '_LEDIDBlue'
		    ]);

	getBuildTime();
	getSystemHealth();
	getBIOSVersion();
	getBoardSerial();
	sendGetDeviceID();
	getRMM3Status();
	getMEVersion();
	getPowerStatus();
	getSDRVersion();
	getManufacturerName();
}

function getBuildTime()
{
	showWait(true);
	xmit.get({url:"/rpc/getbldtime.asp",onrcv:ProcessBldTime, status:''});
}

function ProcessBldTime(arg)
{
	showWait(false);
	var CmdStatus = WEBVAR_JSONVAR_BUILD_TIME.HAPI_STATUS;

	if (CmdStatus != 0)
	{
		errstr = eLang.getString('common','STR_APP_STR_220');
		errstr +=  (eLang.getString('common','STR_IPMI_ERROR') + GET_ERROR_CODE(CmdStatus));
		alert (errstr);
		return;
	}
	else
	{	
		var bldtime = WEBVAR_JSONVAR_BUILD_TIME.WEBVAR_STRUCTNAME_BUILD_TIME[0]['DATE']
	              + " " + WEBVAR_JSONVAR_BUILD_TIME.WEBVAR_STRUCTNAME_BUILD_TIME[0]['TIME'];
		buildTime.innerHTML = bldtime;
	}
}

function getPowerStatus()
{
	showWait(true);
	xmit.get({url:"/rpc/hoststatus.asp",onrcv:ProcessHostPowerStatus, status:''});	
}

function ProcessHostPowerStatus(arg)
{
	showWait(false);
	var CmdStatus = WEBVAR_JSONVAR_HL_SYSTEM_STATE.HAPI_STATUS;
	var BMCprodID = WEBVAR_JSONVAR_HL_SYSTEM_STATE.WEBVAR_STRUCTNAME_HL_SYSTEM_STATE[0].BMCproductID;

	if(CmdStatus != 0)
	{
		errstr = eLang.getString('common','STR_APP_STR_406');
		alert (errstr);
		return;
	}
	else
	{
		host_power_state = WEBVAR_JSONVAR_HL_SYSTEM_STATE.WEBVAR_STRUCTNAME_HL_SYSTEM_STATE[0].JF_STATE;

		if (0 == host_power_state)
		{
			/* Host power is OFF */
			statusMsg.innerHTML = eLang.getString('common','STR_APP_STR_204');
			statusMsg.style.color = '#990000';
		}
		else
		{
			/* Host power is ON */
			statusMsg.innerHTML = eLang.getString('common','STR_APP_STR_205');
			statusMsg.style.color = '#009900';
		}
	}
}

function getSDRVersion()
{
	showWait(true);
	xmit.get({url:"/rpc/getsdrreposinfo.asp",onrcv:ProcessSDRReposInfo, status:''});		
}

function ProcessSDRReposInfo(arg)
{
	showWait(false);
	var CmdStatus = WEBVAR_JSONVAR_GETSDRREPOSINFO.HAPI_STATUS;

	if (CmdStatus != 0)
	{
		errstr = eLang.getString('common','STR_APP_STR_416jco');
		errstr +=  (eLang.getString('common','STR_IPMI_ERROR') + GET_ERROR_CODE(CmdStatus));
		alert (errstr);
		return;
	}
	else
	{	
		sdrVersion.innerHTML = WEBVAR_JSONVAR_GETSDRREPOSINFO.WEBVAR_STRUCTNAME_GETSDRREPOSINFO[0].Version;
	}
}

function sendGetDeviceID()
{
	showWait(true);
	xmit.get({url:"/rpc/getdeviceid.asp",onrcv:ProcessDIDFunctioncall, status:''});	
}

function ProcessDIDFunctioncall(arg)
{
	showWait(false);
	var CmdStatus = WEBVAR_JSONVAR_GETDEVICEIDRES.HAPI_STATUS;

	if (CmdStatus != 0)
	{
		errstr = eLang.getString('common','STR_SYS_INFO_DIVID');
		errstr += (eLang.getString('common','STR_IPMI_ERROR') + GET_ERROR_CODE(CmdStatus));
		alert (errstr);
		return;
	}
	else
	{
		var _sa = WEBVAR_JSONVAR_GETDEVICEIDRES.WEBVAR_STRUCTNAME_GETDEVICEIDRES[0];

		var device_available = (((_sa.FirmwareRevision1&&0x80) || (_sa.FirmwareRevision2&&0x80))
					? eLang.getString('common','STR_YES') : eLang.getString('common','STR_NO'));
		deviceAvailable.innerHTML = device_available;

		var bmcfwrev = ""
			       + (_sa.FirmwareRevision1 & 0x7F)  /* FW major Rev, Binary Encoded per IPMI 2.0 */
			       + "."
			       + ((_sa.FirmwareRevision2>>4) & 0x0F)  /* FW minor Rev, BCD, tens */
			       + getbits(_sa.FirmwareRevision2,3,0)   /* FW minor Rev, BCD, ones */
			       + "."
			       + ((_sa.AuxFirmwareRevision >> 16) & 0xFFFF)
			       ;
		if (_sa.FirmwareRevision1 & 0x80)
		{
			bmcFwRev.innerHTML = "FW Update in progress";
			bootFwRev.innerHTML = bmcfwrev;	 // When in update mode, bmc fw version is the boot version
		}else
		{
			bmcFwRev.innerHTML = bmcfwrev;

			var bootfwrev = ""
					+ (_sa.AuxFirmwareRevision  & 0xFF) /* Boot FW Rev, major, BCD, Binary Encoded */
					+ "."
					+ ((_sa.AuxFirmwareRevision>>12) & 0x0F) /* Boot FW Rev, major, BCD, tens */
					+ ((_sa.AuxFirmwareRevision>>8)  & 0x0F) /* Boot FW Rev, major, BCD, ones */
					;
			bootFwRev.innerHTML = bootfwrev;
		}
	}
}

function getRMM3Status()
{
	showWait(true);
	xmit.get({url:'/rpc/getrmm3status.asp',onrcv:OnRmm3Status,status:''});
}

function OnRmm3Status()
{
	showWait(false);
	var CmdStatus = WEBVAR_JSONVAR_RMM3STATUS.HAPI_STATUS;

	if (CmdStatus != 0)
	{
		errstr = eLang.getString('common','STR_SYS_RMM3STATUS');
		errstr += (eLang.getString('common','STR_IPMI_ERROR') + GET_ERROR_CODE(CmdStatus));
		alert (errstr);
		return;
	}
	else
	{
		var rmm3Status = WEBVAR_JSONVAR_RMM3STATUS.WEBVAR_STRUCTNAME_RMM3STATUS[0].STATE;
		var rmm3StatusMsg = "";
		switch (rmm3Status)
		{
			case  0: rmm3StatusMsg = eLang.getString('common', 'STR_SYS_RMM3STATUS_NOT_INSTALLED');
				 break;
			case  1: rmm3StatusMsg = eLang.getString('common', 'STR_SYS_RMM3STATUS_INSTALLED');
				 break;
			case  2: rmm3StatusMsg = eLang.getString('common', 'STR_SYS_RMM3STATUS_FW_MISMATCH');
				 break;
			default: rmm3StatusMsg = eLang.getString('common', 'STR_SYS_RMM3STATUS_UNKNOWN') + rmm3Status + ">";
		}
		//rmm3StatusMsg = "Present";
		RMM3Status.innerHTML = rmm3StatusMsg;
	}
}

function getMEVersion()
{
	// ME Version is cached. We should have this data regardless of power state.
	showWait(true);
	xmit.get({url:"/rpc/getmeversion.asp",onrcv:ProcessMEVersion, status:''});	
}

function ProcessBIOSVersion(arg)
{
	showWait(false);
	var CmdStatus = WEBVAR_JSONVAR_GETBIOSVER.HAPI_STATUS;
	if (CmdStatus == 0) // GetDeviceID succeeded; extract the Firmware version
	{
		var _biostr = WEBVAR_JSONVAR_GETBIOSVER.WEBVAR_STRUCTNAME_GETBIOSVER[0];
		BIOSStr.innerHTML = _biostr.Str;

	}else
	{
		var _biostr = eLang.getString('common','STR_APP_STR_415jco');
		BIOSStr.innerHTML = _biostr;
	}
}

function ProcessMEVersion(arg)
{
	var me_bld_patch = "";
	showWait(false);
	var bitFlag=127;
	var CmdStatus = WEBVAR_JSONVAR_GETMEDEVICEID.HAPI_STATUS;

	if (CmdStatus == 0) // GetDeviceID succeeded; extract the Firmware version
		{
		var _me = WEBVAR_JSONVAR_GETMEDEVICEID.WEBVAR_STRUCTNAME_GETMEDEVICEID[0];
		_me.FirmwareRevision1 = _me.FirmwareRevision1 & bitFlag;
		me_version = (_me.FirmwareRevision1<10)?(" 0"+_me.FirmwareRevision1):(""+_me.FirmwareRevision1); /* FW major Rev */
		me_version = me_version
			    + ".0"
				+ ((_me.FirmwareRevision2>>4) & 0x0F) /* FW minor Rev, BCD, tens */
				+ ".0"
				+ getbits(_me.FirmwareRevision2,3,0) /* FW minor Rev, BCD, ones */
				;

		// put the build & patch number on the page in white so
		// it can be seen only by highlighting the area specifically.
		me_bld_patch = "."
			       + ((_me.AuxFirmwareRevision>>12) & 0x0F) /* SPS FW Build, 'A' (BCD) */
			       + ((_me.AuxFirmwareRevision>>8)  & 0x0F) /* SPS FW Build, 'B' (BCD) */
			       + ((_me.AuxFirmwareRevision>>20) & 0x0F) /* SPS FW Build, 'C' (BCD) */
			       ;
		}
	MEVersion.innerHTML = me_version;
	MEbldPatch.innerHTML = me_bld_patch;
	//MEbldPatch.style.color = '#FFFFFF'; // white to hide
}

function getSystemHealth()
{
	xmit.get({url:"/rpc/getledstatus.asp",onrcv:ProcessSystemHealth, status:''});
}

function getBIOSVersion()
{
	
	xmit.get({url:"/rpc/getBIOSVersion.asp",onrcv:ProcessBIOSVersion, status:''});
	
	
}
function ProcessSystemHealth(arg)
{
	var pattern;
	if(arg.HAPI_STATUS)
	{
	}
	else
	{
		var _led = WEBVAR_JSONVAR_GET_SYSTEMHEALTH.WEBVAR_STRUCTNAME_GET_SYSTEMHEALTH;
		pattern = _led[0].LED_PATTERN.toString(16);	//LED_NUM_HEALTH_GREEN	0
		LEDHealthGreen.innerHTML = "<img src='../res/green_" + pattern + ".gif' title='LED Health Green' width='25' height='24' border='0'/>";

		pattern = _led[1].LED_PATTERN.toString(16);	//LED_NUM_HEALTH_AMBER	1
		LEDFaultAmber.innerHTML = "<img src='../res/amber_" + pattern + ".gif' title='LED Fault Amber' width='25' height='24' border='0'/>";

		pattern = _led[2].LED_PATTERN.toString(16);	//LED_NUM_ID_BLUE		2
		LEDIDBlue.innerHTML = "<img src='../res/blue_" + pattern + ".gif' title='LED ID Blue' width='25' height='24' border='0'/>";
	}
	setTimeout(getSystemHealth, 60 * 1000);	//Time Interval in milliseconds to refresh the System Health Status
}

function getBoardSerial()
{
	xmit.get({url:"/rpc/getbaseboardfru.asp",onrcv:HandleBoardSerial, status:''});
}

function HandleBoardSerial()
{
	var board_serialNumber = "";
	var CmdStatus = WEBVAR_JSONVAR_GETBBFRU.HAPI_STATUS;
	
	if (CmdStatus == 0)
	{	
		var _fruinfo = WEBVAR_JSONVAR_GETBBFRU.WEBVAR_STRUCTNAME_GETBBFRU[0];

		board_serialNumber = _fruinfo.BI_BoardSerialNum;
	}
	
	for (var i=0; i < board_serialNumber.length; i++)
	{
		if ((0xFFFD != board_serialNumber.charCodeAt(i)) &&	// Firefox does weird things with "-1".
			(0xFFFF != board_serialNumber.charCodeAt(i)))	// Internet Explorer handles "-1" properly.
		{
			brdserial.innerHTML = board_serialNumber;
			return;
		}
	}

	brdserial.innerHTML = eLang.getString('common','STR_APP_STR_185');
	return;
}

function getManufacturerName()
{
    xmit.get({url:'/rpc/getmanufacturer.asp', onrcv:handleManufacturerName, status:''});
    return;
}

function handleManufacturerName()
{
    var CmdStatus = WEBVAR_JSONVAR_MANUFACTURER.HAPI_STATUS;
    if (CmdStatus == 0)
    {
        top.gManufacturerName = WEBVAR_JSONVAR_MANUFACTURER.WEBVAR_STRUCTNAME_MANUFACTURER[0].name;
        top.gManufacturerNameShort = WEBVAR_JSONVAR_MANUFACTURER.WEBVAR_STRUCTNAME_MANUFACTURER[0].shortName;
    }
    else
    {
        top.gManufacturerName = "";
        top.gManufacturerNameShort = "";
    }

    return;
}

