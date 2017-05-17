function doInit() {
	 // TODO: add page initialization code
	 exposeElms(['_kvmEncrpytion',
	 			'_hidEncryption',
	 			 '_mediaEncy',
//	 			 '_vmattach',
	 			 '_usbEmulationType',
	 			 '_enableSOL1',
	 			 '_enableSOL2',
	 			 '_enableSOL3',
	 			 '_enableSOL1name',
	 			 '_enableSOL2name',
	 			 '_enableSOL3name',
	 			 '_saveBtn']);
	 
	 CheckRole();	

	 //Authentication type
	 //vmattach.add(new Option('Attach',0),window.ActiveXObject?optind++:null);
	 //vmattach.add(new Option('Auto Attach',1),window.ActiveXObject?optind++:null);			 
	 
	var optind = 0;
	kvmEncrpytion.add(new Option('None',0),window.ActiveXObject?optind++:null);
	kvmEncrpytion.add(new Option('Stunnel',1),window.ActiveXObject?optind++:null);
	kvmEncrpytion.add(new Option('RC4',2),window.ActiveXObject?optind++:null);
	kvmEncrpytion.add(new Option('AES',3),window.ActiveXObject?optind++:null);

	showHIDEncryption();
	kvmEncrpytion.onchange = showHIDEncryption;

	optind = 0;
	 usbEmulationType.add(new Option('Hard disk',0),window.ActiveXObject?optind++:null);	 
	 usbEmulationType.add(new Option('Floppy',1),window.ActiveXObject?optind++:null);

	 saveBtn.onclick = saveAdviserSettings;
	 getAdviserSecuritySettings();
}

function getAdviserSecuritySettings()
{
	showWait(true);
	xmit.get({url:'/rpc/getadvisersecure.asp',status:'',onrcv:updateAdvSecSettings});
}

function updateAdvSecSettings(arg)
{
	showWait(false);
	if(arg.HAPI_STATUS==0)
	{
		var getAdviser = WEBVAR_JSONVAR_GETADVISERSECURESTATUS.WEBVAR_STRUCTNAME_GETADVISERSECURESTATUS[0];
		kvmEncrpytion.value = getAdviser.V_STR_SECURE_CHANNEL;
		hidEncryption.checked = (getAdviser.HID_ENCRYPTION == 1) ? true : false;
		showHIDEncryption();
	}
	else
	{
		errstr =  eLang.getString('common','STR_CONFIG_REMOTE_UPDATEADVSET');
		errstr += (eLang.getString('common','STR_IPMI_ERROR') + GET_ERROR_CODE(arg.HAPI_STATUS));
		alert(errstr);
	}
	getVMediaSecuritySettings();
}

function getVMediaSecuritySettings()
{
	showWait(true);
	xmit.get({url:'/rpc/getvmediasecure.asp',status:'',onrcv:updateVMedSecSettings});
}

function updateVMedSecSettings(arg)
{
	showWait(false);
	if(arg.HAPI_STATUS == 0)
	{
		var getVMedia = WEBVAR_JSONVAR_GETVMEDIASECURESTATUS.WEBVAR_STRUCTNAME_GETVMEDIASECURESTATUS[0];
		mediaEncy.checked = getVMedia.V_STR_SECURE_CHANNEL ? true : false;
	}
	else
	{
		showWait(false);
		errstr =  eLang.getString('common','STR_CONFIG_REMOTE_UPDATEVMEDSET');
		errstr += (eLang.getString('common','STR_IPMI_ERROR')+ GET_ERROR_CODE(arg.HAPI_STATUS));
		alert(errstr);
	}
	getUSBEmulationType();
}

/*
function getVMediaAttachModeSettings()
{
	var getvmattach=xmit.getset({url:'/rpc/getvmediaattachmode.asp',status:'',onrcv:updateVMedAtchSettings});
	getvmattach.send();
}

function updateVMedAtchSettings()
{
	var getVMediaAtch= WEBVAR_JSONVAR_GETVMEDIAATTACHMODE.WEBVAR_STRUCTNAME_GETVMEDIAATTACHMODE;
	
	if(WEBVAR_JSONVAR_GETVMEDIAATTACHMODE.HAPI_STATUS==0)
	{
		vmattach.value=getVMediaAtch[0].V_STR_ATTACH_MODE;		
	}
	else
	{
		errstr =  eLang.getString('common','STR_CONFIG_REMOTE_UPDATEATTSET');
		errstr +=(eLang.getString('common','STR_IPMI_ERROR')+ GET_ERROR_CODE(CmdStatus));
		alert(errstr);
	}
	
	getUSBEmulationType();
}
*/
function getUSBEmulationType()
{
	showWait(true);
	xmit.get({url:'/rpc/getfloppyemulation.asp',status:'',onrcv:updateUSBSettings});
}

function updateUSBSettings(arg)
{
	showWait(false);
	if(arg.HAPI_STATUS==0)
	{
		usbEmulationType.value = WEBVAR_JSONVAR_GETFLOPPYEMULATION.WEBVAR_STRUCTNAME_GETFLOPPYEMULATION[0].V_STR_ATTACH_MODE;
	}else
	{
		errstr =  eLang.getString('common','STR_CONFIG_REMOTE_UPDATEATTSET');
		errstr +=(eLang.getString('common','STR_IPMI_ERROR')+ GET_ERROR_CODE(arg.HAPI_STATUS));
		alert(errstr);
	}
	IPMICMD_HL_GetLanChannel();
}


function IPMICMD_HL_GetLanChannel()
{
	showWait(true);
	var lanchannellist = xmit.getset({url:'/rpc/getlanchannelinfo.asp',onrcv:IPMICMD_GetLanChannelRes,status:''});
	lanchannellist.send();
}

function IPMICMD_GetLanChannelRes()
{
// these are the same as '#define's in /development/oem/common/include/ipmi_inc_oem/Channel.h
	var LAN_RMCP_CHANNEL  = 0x01;
	var LAN_RMCP_CHANNEL1 = 0x03;
    var LAN_RMCP_CHANNEL2 = 0x02;

	var CmdStatus = WEBVAR_JSONVAR_GETLANCHANNELINFO.HAPI_STATUS;
	showWait(false);
	if(CmdStatus != 0)
	{
		errstr = eLang.getString('common','STR_APP_STR_101');
		errstr += GET_ERROR_CODE_STR(CmdStatus);
		alert(errstr);
	}
	else
	{
		LANCHANNELINFO = WEBVAR_JSONVAR_GETLANCHANNELINFO.WEBVAR_STRUCTNAME_GETLANCHANNELINFO;

		var optind=0;
		var sortorder=0;

		for (i=0;i<LANCHANNELINFO.length;i++)
		{
			if(!LANCHANNELINFO[i].CHANNEL_NUM)
				continue;
			var optval = LANCHANNELINFO[i].CHANNEL_NUM;
			var optlbl = "BMC Mgmt Channel " + optval;
			if (optval == LAN_RMCP_CHANNEL)
			{
			    optlbl = eLang.getString('configure_remotesession','STR_CNFG_RMT_SESS_ENABLESOLFOR') + " " + eLang.getString('common','LAN_RMCP_CHANNEL');
			    document.getElementById("_enableSOL1name").innerHTML = optlbl;
			    document.getElementById("_enableSOL1cell").style.display = "table-cell";
			}
			if (optval == LAN_RMCP_CHANNEL1)
			{
			    optlbl = eLang.getString('configure_remotesession','STR_CNFG_RMT_SESS_ENABLESOLFOR') + " " + eLang.getString('common','LAN_RMCP_CHANNEL1');
			    document.getElementById("_enableSOL3name").innerHTML = optlbl;
			    document.getElementById("_enableSOL3row").style.display = "table-row";
			}
			if (optval == LAN_RMCP_CHANNEL2)
			{
			    optlbl = eLang.getString('configure_remotesession','STR_CNFG_RMT_SESS_ENABLESOLFOR') + " " + eLang.getString('common','LAN_RMCP_CHANNEL2');
			    document.getElementById("_enableSOL2name").innerHTML = optlbl;
			    document.getElementById("_enableSOL2row").style.display = "table-row";
			}
			
		}
		getSOLenable();
	}	
}


function getSOLenable()
{
	showWait(true);
	xmit.get({url:'/rpc/getsolenable.asp',status:'',onrcv:updateSOLenable});
}

function updateSOLenable(arg)
{
	// these are the same as '#define's in /development/oem/common/include/ipmi_inc_oem/Channel.h
	var LAN_RMCP_CHANNEL  = 0x01;
	var LAN_RMCP_CHANNEL1 = 0x03;
    var LAN_RMCP_CHANNEL2 = 0x02;
    
	var CmdStatus = WEBVAR_JSONVAR_GETSOLENABLE.HAPI_STATUS;
	showWait(false);
	if(CmdStatus != 0)
	{
		// Error
	}
	else
	{
		SOLINFO = WEBVAR_JSONVAR_GETSOLENABLE.WEBVAR_STRUCTNAME_GETSOLENABLE;
		for (i=0;i<SOLINFO.length;i++)
		{
			if(!SOLINFO[i].u8channel)
				continue;
			var optval = SOLINFO[i].u8channel;
			if (optval == LAN_RMCP_CHANNEL)
			{
			    document.getElementById("_enableSOL1").checked = (SOLINFO[i].solEnabled) ? true:false;
			}
			if (optval == LAN_RMCP_CHANNEL1)
			{
			    document.getElementById("_enableSOL3").checked = (SOLINFO[i].solEnabled) ? true:false;
			}
			if (optval == LAN_RMCP_CHANNEL2)
			{
			    document.getElementById("_enableSOL2").checked = (SOLINFO[i].solEnabled) ? true:false;
			}
		}
	}
}

function saveAdviserSettings()
{
	if (g_isadmin)
	{
		showWait(true);
		var req = new xmit.getset({url:'/rpc/setadvisersecure.asp',status:'',onrcv:saveVMediaSettings});
		req.add('V_STR_SECURE_CHANNEL',kvmEncrpytion.value);
		if (kvmEncrpytion.value == 0)
			req.add('HID_ENCRYPTION', hidEncryption.checked ? 1 : 0);
		else
			req.add('HID_ENCRYPTION', 0);
		req.send();
		delete req;
	}
	else
		alert(eLang.getString('common','STR_APP_STR_413'));
}

function saveVMediaSettings(arg)
{
	if(arg.HAPI_STATUS == 0)
	{
		var req = new xmit.getset({url:'/rpc/setvmediasecure.asp',status:'',onrcv:saveVMedAtchSettings});
		req.add('V_STR_SECURE_CHANNEL', mediaEncy.checked ? 1 : 0);
		req.send();
		delete req;
	}
	else if(arg.HAPI_STATUS == -3)
	{
		showWait(false);
		alert(eLang.getString('common','STR_ENCRYPT_UPDATE'));
	}
	else
	{
		showWait(false);
		alert(eLang.getString('common','STR_SECURE_SAVE_FAILURE'));
	}
}

function saveVMedAtchSettings(arg)
{
	if(arg.HAPI_STATUS == 0)
	{
	//var setVMAtch =xmit.getset({url:'/rpc/setvmediaattachmode.asp',status:'',onrcv:saveVMediaAttach});
	//var Attach = vmattach.value;
	//setVMAtch.add('V_STR_ATTACH_MODE',Attach);
	//setVMAtch.send();
		var req = new xmit.getset({url:'/rpc/setfloppyemulation.asp',status:'',onrcv:saveUSBSettings});
		req.add('V_STR_FLOPPY_EMULATION',usbEmulationType.value);
		req.send();
		delete req;
	}
	else
	{
		showWait(false);
		alert(eLang.getString('common','STR_SECURE_SAVE_FAILURE'));
	}
}

function saveVMediaAttach()
{
var CmdStatus = WEBVAR_JSONVAR_SETVMEDIAATTACHMODE.HAPI_STATUS;
	if(CmdStatus!=0)
	{
		showWait(false);
		errstr = eLang.getString('common','STR_SECURE_SAVE_FAILURE');
		alert(errstr);
	}else
	{	
		var setUSB = xmit.getset({url:'/rpc/setfloppyemulation.asp',status:'',onrcv:saveUSBSettings});
		setUSB.add('V_STR_FLOPPY_EMULATION',usbEmulationType.value);
		setUSB.send();
		
	}
}

function saveUSBSettings(arg)
{
	if(arg.HAPI_STATUS==0)
	{
		showWait(false);
		var setSOL = xmit.getset({url:'/rpc/setsolenable.asp',status:'',onrcv:saveSOLSettings});
		var SOL1Enabled = (document.getElementById("_enableSOL1").checked)? 1:0;
		var SOL2Enabled = (document.getElementById("_enableSOL2").checked)? 1:0;
		var SOL3Enabled = (document.getElementById("_enableSOL3").checked)? 1:0;
		setSOL.add('SOL_LAN1',SOL1Enabled);
		setSOL.add('SOL_LAN2',SOL2Enabled);
		setSOL.add('SOL_LAN3',SOL3Enabled);
		setSOL.send();
		delete setSOL;
	}else
	{
		showWait(false);
		alert(eLang.getString('common','STR_SECURE_SAVE_FAILURE'));
	}
	
}

function saveSOLSettings(arg)
{
	if(arg.HAPI_STATUS==0)
	{
		showWait(false);
		alert(eLang.getString('common','STR_SECURE_SAVE_SUCCESS'));
		getAdviserSecuritySettings();
	}else
	{
		showWait(false);
		alert(eLang.getString('common','STR_SECURE_SAVE_FAILURE'));
	}
}

function CheckRole()
{
	xmit.get({url:'/rpc/getrole.asp', onrcv:OnCheckRole, status:''});
}

function OnCheckRole()
{
	if(WEBVAR_JSONVAR_GET_ROLE.WEBVAR_STRUCTNAME_GET_ROLE[0]['CURPRIV'] != 4)
	{
		g_isadmin = 0;
		//alert(eLang.getString('common','STR_APP_STR_137'));
		saveBtn.disabled = true;
	}
	else
	{
		g_isadmin = 1;
	}
}

function showHIDEncryption()
{
	if (kvmEncrpytion.value == 0)
	{
		hidEncryption.disabled = false;
	}
	else
	{
		hidEncryption.checked = false;
		hidEncryption.disabled = true;
	}
}
