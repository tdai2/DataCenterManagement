var g_isadmin = 0;
var failoverEnabled = 0;

function doInit() {
	 // TODO: add page initialization code
	 exposeElms([
				'_lanchannel',
				'_smtpserver',
//				'_username',
//				'_password',
				'_senderaddr',
				'_machinename',
	 			'_saveBtn']);

	lanchannel.onchange = RefreshSMTPInfo;

	IPMICMD_HL_GetLanFailover();

	CheckRole();
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
		//alert(eLang.getString('common',"STR_APP_STR_217"));
		saveBtn.disabled = true;
	}
	else
	{
		g_isadmin = 1;
	}
	doSMTP();
}

function doSMTP()
{
	getSMTPCfg();
	saveBtn.onclick = function()
	{
		if (g_isadmin)
		{
			setSMTPCfg();
		}
		else
			alert(eLang.getString('common',"STR_APP_STR_217"));
	}
}

function getSMTPCfg()
{
	showWait(true);
	RPC_GetSMTP = new xmit.getset({url:"/rpc/getsmtpcfg.asp",onrcv:getSMTPCfg_Res,timeout:10000});
	RPC_GetSMTP.send();
}

function getSMTPCfg_Res()
{
	showWait(false);
	var CmdStatus = WEBVAR_JSONVAR_GETSMTPCFG.HAPI_STATUS;
	if (CmdStatus != 0)
	{
		errstr = eLang.getString('common',"STR_CONFIG_SMTP_GETVAL");
		errstr +=(eLang.getString('common','STR_IPMI_ERROR') + GET_ERROR_CODE(CmdStatus));
		alert(errstr);
		return;
	}
	else
	{
		SMTPCFG_DATA = WEBVAR_JSONVAR_GETSMTPCFG.WEBVAR_STRUCTNAME_GETSMTPCFG;
		RefreshSMTPInfo();
	}
}

function RefreshSMTPInfo()
{
	var channelnum;
	var i;
	channelnum=lanchannel.value;
	for (i=0;i<SMTPCFG_DATA.length;i++)
	{
		if ((!SMTPCFG_DATA[i].CHANNEL_NUM)||(SMTPCFG_DATA[i].CHANNEL_NUM!=channelnum))
			continue;
		else
		{	
			smtpserver.value=SMTPCFG_DATA[i].SMTPSERVER;
//			username.value=SMTPCFG_DATA[i].USERNAME;
//			password.value=SMTPCFG_DATA[i].PASSWORD;
			senderaddr.value=SMTPCFG_DATA[i].SENDERADDR;
			machinename.value=SMTPCFG_DATA[i].MACHINENAME;
		}
	}
}

function setSMTPCfg()
{
	var IPaddr;
	showWait(true, eLang.getString('common',"STR_PROCESSINGWAIT"));
	if (!eVal.ip(smtpserver.value))
	{
		alert(eLang.getString('common',"STR_APP_STR_ERRIP")+eLang.getString('common','STR_APP_STR_HELP'));
		showWait(false);
		return;
	}
//    if (!eVal.username(username.value))
//    {
//        alert(eLang.getString('err',0x01)+eLang.getString('common','STR_APP_STR_HELP'));
//        showWait(false);
//        return;
//    }
//    if (!eVal.password(password.value))
//    {
//        alert(eLang.getString('err',0x03)+ eLang.getString('common','STR_APP_STR_412'));
//        showWait(false);
//        return;
//    }
	if (!eVal.email(senderaddr.value))
	{
		alert(eLang.getString('common',"STR_ALERT_MOD_ERRSENDERADDR"));
		showWait(false);
		return;
	}
	if (!eVal.str(machinename.value))
	{
		alert(eLang.getString('common',"STR_ALERT_MOD_ERRMACHINENAME"));
		showWait(false);
		return;
	}
	
	var p = new xmit.getset({url:'/rpc/setsmtpcfg.asp', onrcv:setSMTPCfg_Res, timeout:10000});
	p.add("CHANNEL_NUM",lanchannel.value);
	p.add("SMTPSERVER",smtpserver.value);
//	p.add("USERNAME",username.value);
//	p.add("PASSWORD",password.value);
	p.add("SENDERADDR",senderaddr.value);
	p.add("MACHINENAME",machinename.value);
	p.send();
	delete p;
}


function IPMICMD_HL_GetLanFailover()
{
	showWait(true);
	var lanchannellist = xmit.getset({url:'/rpc/getlanfailover.asp',onrcv:IPMICMD_GetLanFailoverRes,status:''});
	lanchannellist.send();
}

function IPMICMD_GetLanFailoverRes()
{
    var CmdStatus = WEBVAR_JSONVAR_GETLANFAILOVER.HAPI_STATUS;
    if(CmdStatus != 0)
    {
        errstr = eLang.getString('common','STR_APP_STR_101');
        errstr += GET_ERROR_CODE_STR(CmdStatus);
        alert(errstr);
    }
    else
    {
        FAILOVER_DATA = WEBVAR_JSONVAR_GETLANFAILOVER.WEBVAR_STRUCTNAME_GETLANFAILOVER;
        if (FAILOVER_DATA.length > 0)
        {
            if( 0 == FAILOVER_DATA[0].FAILOVER_MODE )
            {
                failoverEnabled = false;
            }
            else
            {
                failoverEnabled = true;
            }
        }
        else
        {
            errstr = eLang.getString('common','STR_APP_STR_101');
            errstr += 'invalid response';
            alert(errstr);
        }
    }

    IPMICMD_HL_GetLanChannel ();
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

            if( failoverEnabled && (optval != LAN_RMCP_CHANNEL) )
                continue;
			
			if (optval == LAN_RMCP_CHANNEL)
			{
			    optlbl = eLang.getString('common','LAN_RMCP_CHANNEL');
			    sortorder = 0;
			}
			if (optval == LAN_RMCP_CHANNEL1)
			{
			    optlbl = eLang.getString('common','LAN_RMCP_CHANNEL1');
			    sortorder = 2;
			}
			if (optval == LAN_RMCP_CHANNEL2)
			{
			    optlbl = eLang.getString('common','LAN_RMCP_CHANNEL2');
			    sortorder = 1;
			}

			lanchannel.add(new Option(optlbl, optval), window.ActiveXObject?sortorder:lanchannel.options[sortorder]);
		}
	}
}


function setSMTPCfg_Res()
{
	showWait(false);
	var CmdStatus = WEBVAR_JSONVAR_SETSMTPCFG.HAPI_STATUS;
	if (CmdStatus != 0)
	{
		errstr = eLang.getString('common',"STR_CONFIG_SMTP_SETVAL");
		errstr += (eLang.getString('common','STR_IPMI_ERROR') +GET_ERROR_CODE(CmdStatus));
		alert(errstr);
		return;
	}
	else
	{
		alert(eLang.getString('common',"STR_APP_STR_218"));
	}
    getSMTPCfg();
}
