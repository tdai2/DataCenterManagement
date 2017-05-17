function doInit() {
	exposeElms(['_bmcFwRev',
		    '_buildTime',
		    '_bootFwRev',
 		    '_HSC1Version',
 	 	    '_HSC2Version',
 	 	    '_MEVersion',
		    '_MEbldPatch',
		    '_LCPVersion']);

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
		var bldtime = WEBVAR_JSONVAR_BUILD_TIME.WEBVAR_STRUCTNAME_BUILD_TIME[0]['DATE'] + " " + WEBVAR_JSONVAR_BUILD_TIME.WEBVAR_STRUCTNAME_BUILD_TIME[0]['TIME'];
		buildTime.innerHTML = bldtime;
//		alert ("BuildTime = " + bldtime);
	}
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

		var bmcfwrev = ""
			       + ((_sa.FirmwareRevision1>>4) & 0x07)  /* FW major Rev, BCD, tens */
			       + getbits(_sa.FirmwareRevision1,3,0)   /* FW major Rev, BCD, ones */
			       + "."
			       + ((_sa.FirmwareRevision2>>4) & 0x0F)  /* FW minor Rev, BCD, tens */
			       + getbits(_sa.FirmwareRevision2,3,0)   /* FW minor Rev, BCD, ones */
			       ;
		bmcFwRev.innerHTML = bmcfwrev;
//		alert ("BMC FW Ver = " + bmcfwrev);

		var bootfwrev = ""
				+ ((_sa.AuxFirmwareRevision>>4)  & 0x0F) /* Boot FW Rev, minor, BCD, tens */
				+ ((_sa.AuxFirmwareRevision)     & 0x0F) /* Boot FW Rev, minor, BCD, ones */
				+ "."
				+ ((_sa.AuxFirmwareRevision>>12) & 0x0F) /* Boot FW Rev, major, BCD, tens */
				+ ((_sa.AuxFirmwareRevision>>8)  & 0x0F) /* Boot FW Rev, major, BCD, ones */
				;
		bootFwRev.innerHTML = bootfwrev;
//		alert ("Boot FW Ver = " + bootfwrev);
	}
	showWait(true);
	xmit.get({url:"/rpc/hoststatus.asp",onrcv:ProcessHostPowerStatus, status:''});	
}

function ProcessHostPowerStatus(arg)
{
	showWait(false);
	var CmdStatus = WEBVAR_JSONVAR_HL_SYSTEM_STATE.HAPI_STATUS;

	if(CmdStatus != 0)
	{
		errstr = eLang.getString('common','STR_APP_STR_406');
		alert (errstr);
		return;
	}
	else
	{
		var current_state = WEBVAR_JSONVAR_HL_SYSTEM_STATE.WEBVAR_STRUCTNAME_HL_SYSTEM_STATE[0].JF_STATE;
		
		if (current_state == 0)
		{
			/* Host power is OFF, so we cannot query HSC1 FW version */
			var hsc1_version = eLang.getString('common','STR_APP_STR_414jco');
			HSC1Version.innerHTML = hsc1_version;

			/* Host power is OFF, so we cannot query HSC2 FW version */
			var hsc2_version = eLang.getString('common','STR_APP_STR_414jco');
			HSC2Version.innerHTML = hsc2_version;

			/* Host power is OFF, so we cannot query ME FW version */
			var me_version = eLang.getString('common','STR_APP_STR_414jco');
			MEVersion.innerHTML = me_version;

			/* Host power is OFF, so we cannot query LCP FW version */
			var lcp_version = eLang.getString('common','STR_APP_STR_414jco');
			LCPVersion.innerHTML = lcp_version;

			return;
		}
		else
		{
			/* Host power is ON, so query HSC1 FW version */
			showWait(true);
			xmit.get({url:"/rpc/gethscversion.asp",onrcv:ProcessHSC1Version, status:''});	
		}
	}
}

function ProcessHSC1Version(arg)
{
	var hsc1_version = eLang.getString('common','STR_APP_STR_415jco'); // "(not present)"
	showWait(false);
	var CmdStatus = WEBVAR_JSONVAR_GETHSCDEVICEID.HAPI_STATUS;

	if (CmdStatus == 0) // GetDeviceID succeeded; extract the Firmware version
	{	
		var _hsc1 = WEBVAR_JSONVAR_GETHSCDEVICEID.WEBVAR_STRUCTNAME_GETHSCDEVICEID[0];

		hsc1_version= ""
				 + ((_hsc1.FirmwareRevision1>>4) & 0x07)  /* FW major Rev, BCD, tens */
				 + getbits(_hsc1.FirmwareRevision1,3,0)   /* FW major Rev, BCD, ones */
				 + "."
				 + ((_hsc1.FirmwareRevision2>>4) & 0x0F)  /* FW minor Rev, BCD, tens */
				 + getbits(_hsc1.FirmwareRevision2,3,0)   /* FW minor Rev, BCD, ones */
				 ;
	}	
		HSC1Version.innerHTML = hsc1_version;

		/* Host power is ON, so query HSC2 FW version */
		showWait(true);
		xmit.get({url:"/rpc/gethsc2version.asp",onrcv:ProcessHSC2Version, status:''});	
}	

function ProcessHSC2Version(arg)
{
	var hsc2_version = eLang.getString('common','STR_APP_STR_415jco'); // "(not present)"
	showWait(false);
	var CmdStatus = WEBVAR_JSONVAR_GETHSC2DEVICEID.HAPI_STATUS;

	if (CmdStatus == 0) // GetDeviceID succeeded; extract the Firmware version
	{	
		var _hsc2 = WEBVAR_JSONVAR_GETHSC2DEVICEID.WEBVAR_STRUCTNAME_GETHSC2DEVICEID[0];

		hsc2_version= ""
				 + ((_hsc2.FirmwareRevision1>>4) & 0x07)  /* FW major Rev, BCD, tens */
				 + getbits(_hsc2.FirmwareRevision1,3,0)   /* FW major Rev, BCD, ones */
				 + "."
				 + ((_hsc2.FirmwareRevision2>>4) & 0x0F)  /* FW minor Rev, BCD, tens */
				 + getbits(_hsc2.FirmwareRevision2,3,0)   /* FW minor Rev, BCD, ones */
				 ;
	}	
		HSC2Version.innerHTML = hsc2_version;

		/* Host power is ON, so query ME FW version */
		showWait(true);
		xmit.get({url:"/rpc/getmeversion.asp",onrcv:ProcessMEVersion, status:''});	
}

function ProcessMEVersion(arg)
{
	var me_version = eLang.getString('common','STR_APP_STR_415jco'); // "(not present)"
	var me_bld_patch = "";
	showWait(false);
	var CmdStatus = WEBVAR_JSONVAR_GETMEDEVICEID.HAPI_STATUS;

	if (CmdStatus == 0) // GetDeviceID succeeded; extract the Firmware version
	{	
		var _me = WEBVAR_JSONVAR_GETMEDEVICEID.WEBVAR_STRUCTNAME_GETMEDEVICEID[0];

		me_version= ""
			    + ((_me.FirmwareRevision1>>4) & 0x07)  /* FW major Rev, BCD, tens */
			    + getbits(_me.FirmwareRevision1,3,0)   /* FW major Rev, BCD, ones */
			    + "."
			    + ((_me.FirmwareRevision2>>4) & 0x0F)  /* FW minor Rev, BCD, tens */
			    + getbits(_me.FirmwareRevision2,3,0)   /* FW minor Rev, BCD, ones */
			    ;

		// put the build & patch number on the page in white so
		// it can be seen only by highlighting the area specifically.
		me_bld_patch = "."
			    + ((_me.AuxFirmwareRevision>>12) & 0x0F) /* SPS FW Build, 'A' (BCD) */
			    + ((_me.AuxFirmwareRevision>>8)  & 0x0F) /* SPS FW Build, 'B' (BCD) */
			    + ((_me.AuxFirmwareRevision>>20) & 0x0F) /* SPS FW Build, 'C' (BCD) */
			    + "."
			    + ((_me.AuxFirmwareRevision>>16) & 0x0F) /* SPS FW Patch, (BCD) */
			    ;
	}
		MEVersion.innerHTML = me_version;
		MEbldPatch.innerHTML = me_bld_patch;
		MEbldPatch.style.color = '#FFFFFF'; // white to hide

		/* Host power is ON, so query LCP FW version */
		showWait(true);
		xmit.get({url:"/rpc/getlcpversion.asp",onrcv:ProcessLCPVersion, status:''});	
}

function ProcessLCPVersion(arg)
{
	var lcp_version = eLang.getString('common','STR_APP_STR_415jco'); // "(not present)"
	showWait(false);
	var CmdStatus = WEBVAR_JSONVAR_GETLCPDEVICEID.HAPI_STATUS;

	if (CmdStatus == 0) // GetDeviceID succeeded; extract the Firmware version
	{	
		var _lcp = WEBVAR_JSONVAR_GETLCPDEVICEID.WEBVAR_STRUCTNAME_GETLCPDEVICEID[0];

		lcp_version= ""
				 + ((_lcp.FirmwareRevision1>>4) & 0x07)  /* FW major Rev, BCD, tens */
				 + getbits(_lcp.FirmwareRevision1,3,0)   /* FW major Rev, BCD, ones */
				 + "."
				 + ((_lcp.FirmwareRevision2>>4) & 0x0F)  /* FW minor Rev, BCD, tens */
				 + getbits(_lcp.FirmwareRevision2,3,0)   /* FW minor Rev, BCD, ones */
				 ;
	}	
		LCPVersion.innerHTML = lcp_version;
}
