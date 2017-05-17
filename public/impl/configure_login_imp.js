function doInit() {
	 // TODO: add page initialization code
	 exposeElms(['_failedAttempts',
	 			'_lockoutTime',
	 			'_forceHttps',
	 			'_webSessionTimeout',
	 			'_httpPort',
	 			'_httpsPort',
	 			'_sshService',
	 			'_httpService',
	 			'_rmcpService',
	 			'_saveBtn']);
	 			
 	CheckRole();
	saveBtn.onclick = doSetLoginCfg;
	showWait(true);
	xmit.get({url:"/rpc/getloginconfig.asp",onrcv:ProcessGetLoginCfg, status:''});
	 
}


var g_isadmin = 0;
var org_webtimeout = 0;
var org_httpport = 0;
var org_httpsport = 0;

function CheckRole()
{
	xmit.get({url:'/rpc/getrole.asp', onrcv:OnCheckRole, status:''});
}

function OnCheckRole()
{
var curPriv = WEBVAR_JSONVAR_GET_ROLE.WEBVAR_STRUCTNAME_GET_ROLE[0]['CURPRIV'];
	// user must have OPERATOR(3) or ADMINISTRATOR(4) privilege to see this page
	if((curPriv != 3) && (curPriv != 4))
	{
		location.href = 'config_nav.html';
	}
	if(curPriv != 4)
	{
		g_isadmin = 0;
		//alert(eLang.getString('common','STR_APP_STR_100'));
		saveBtn.disabled = true;
	}
	else
	{
		g_isadmin = 1;
	}
}


function ProcessGetLoginCfg (arg)
{
	showWait(false);

	var CmdStatus = WEBVAR_JSONVAR_HL_GETLOGINCONFIG.HAPI_STATUS;
	if (CmdStatus != 0)
	{
		errstr = eLang.getString('common','STR_CONFIG_LOGIN_GETVAL');
//		errstr +=(eLang.getString('common','STR_IPMI_ERROR') + GET_ERROR_CODE(CmdStatus));
		alert(errstr);
		return;
	} 
	else 
	{
		LOGINCFG_DATA = WEBVAR_JSONVAR_HL_GETLOGINCONFIG.WEBVAR_STRUCTNAME_HL_GETLOGINCONFIG;
		if (LOGINCFG_DATA.length > 0)
		{
			failedAttempts.value = LOGINCFG_DATA [0].FAILEDATTEMPTS;
			lockoutTime.value = LOGINCFG_DATA [0].LOCKOUTTIME;
			forceHttps.checked = LOGINCFG_DATA [0].FORCEHTTPS ? true : false;
			webSessionTimeout.value = LOGINCFG_DATA [0].WEBSESSION_TIMEOUT;
			org_webtimeout = webSessionTimeout.value;
			httpPort.value = LOGINCFG_DATA [0].HTTP_PORT;
			httpsPort.value = LOGINCFG_DATA [0].HTTPS_PORT;

			org_httpport = httpPort.value;
			org_httpsport = httpsPort.value

			sshService.checked = LOGINCFG_DATA [0].SSHSERVICE ? true : false;
			httpService.checked = LOGINCFG_DATA [0].HTTPSERVICE ? true : false;
			rmcpService.checked = LOGINCFG_DATA [0].RMCPSERVICE ? true : false;
		}
		else
			alert (eLang.getString('common','STR_CONFIG_LOGIN_GETVAL'));
	}
}		

SetLoginCfg_Res = function()
{
    var CmdStatus = 0;
	CmdStatus = WEBVAR_JSONVAR_HL_SETLOGINCONFIG.HAPI_STATUS;
	if(CmdStatus)
	{
	    if (CmdStatus == -2)
	    {
            errstr =  eLang.getString('common','STR_CONFIG_LOGIN_SETVAL');
            errstr += ": " + eLang.getString('common','STR_APP_STR_104A') + ".";
            alert(errstr);
	    }
	    else
	    {
            //Display the error code and proper message here...
            errstr =  eLang.getString('common','STR_CONFIG_LOGIN_SETVAL');
            alert(errstr);
	    }
	}
	else
	{
		if(org_webtimeout != webSessionTimeout.value)
		{
			alert(eLang.getString('common','STR_CONFIG_WEBSESSION_TIMEOUT_SUC'));
		}
		else
			alert(eLang.getString('common','STR_CONFIG_LOGIN_SAVED'));
		
		location.href = 'configure_web.html';
	}
	WEBVAR_JSONVAR_HL_SETLOGINCONFIG.HAPI_STATUS = 0;
}

function doSetLoginCfg()
{
	if (!g_isadmin)
	{
		alert(eLang.getString('common',"STR_CONFIG_LOGIN_PRIV"));
		return;
	}

	//Check validity of all the fields
	if(failedAttempts.value.length == 0 || !(/^\d+$/.test(failedAttempts.value)) || ((failedAttempts.value < 0) || (failedAttempts.value > 2447483647)))
	{
		alert(eLang.getString('common','STR_CONFIG_LOGIN_INVALID_ATTEMPTS'));
		return;
	}
	if(lockoutTime.value.length == 0 || !(/^\d+$/.test(lockoutTime.value)) || ((lockoutTime.value < 0) || (lockoutTime.value > 2447483647)))
	{
		alert(eLang.getString('common','STR_CONFIG_LOGIN_INVALID_LOCKOUT'));
		return;
	}

	if(!(/^\d+$/.test(webSessionTimeout.value)) || ((webSessionTimeout.value < 60) || (webSessionTimeout.value > 10800)))
	{
		alert(eLang.getString('common','STR_CONFIG_WEBSESSION_TIMEOUT'));
		return;
	}

    if(     !(/^\d+$/.test(httpPort.value)) ||
            (httpPort.value  < 1) || (httpPort.value  >= 65535) ||
            (httpsPort.value < 1) || (httpsPort.value >= 65535) ||
            (httpPort.value == httpsPort.value)
        )
    {
        alert(eLang.getString('configure_login','CONF_LOGIN_ERR_HTTP'));
        return;
    }

    if ( (httpPort.value != org_httpport) || (httpsPort.value != org_httpsport) )
    {
        if (true == confirm(eLang.getString("configure_login","CONF_LOGIN_PORT_WARN")))
        {
            // User confirmed the action.
        }
        else
        {
            // User didn't confirm.
            return;
        }
    }

	if (httpService.checked == false)
	{
		if (confirm(eLang.getString('common','STR_CONFIG_LOGIN_DISABLING_HTTP')) == false)
		{
			httpService.checked = true;
			return;
		}
	}

	var p = new xmit.getset({url:'/rpc/setloginconfig.asp', onrcv:SetLoginCfg_Res});

	p.add("FAILEDATTEMPTS", failedAttempts.value);
	p.add("LOCKOUTTIME", lockoutTime.value);
	p.add("FORCEHTTPS",forceHttps.checked ? 1 : 0);
	p.add("WEBSESSION_TIMEOUT",webSessionTimeout.value);
	p.add("HTTP_PORT", httpPort.value);
	p.add("HTTPS_PORT", httpsPort.value);
	p.add("SSHSERVICE", sshService.checked ? 1 : 0);
	p.add("HTTPSERVICE", httpService.checked ? 1 : 0);
	p.add("RMCPSERVICE", rmcpService.checked ? 1 : 0);
	p.send();
	delete p;
}

