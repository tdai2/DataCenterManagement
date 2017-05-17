var addrSrc = 0;

function doInit()
{
	 // TODO: add page initialization code
	 
	 exposeElms(['_enableIPv6',
                '_enableLanFailover',
	            '_lanChannel',
	 			'_macAddress',
	 			'_optIPv6AUTO',
	 			'_optDHCP',
	 			'_optStatic',
	 			'_ipAddress',
	 			'_optIPv6Prefix',
	 			'_gateway',
//	 			'_primaryDNS',
//	 			'_secondDNS',
	 			'_save']);
	
	CheckRole();		
    enableLanFailover.onclick = onLanFailover;
	enableIPv6.onclick = onEnableIPv6;
	optIPv6AUTO.onclick = onIPv6Auto;
	optDHCP.onclick = onDHCP;
	optStatic.onclick = onStatic;
	save.onclick = GetWebInfo; // This will cascade into doSetLANCfg6.

	showWait(true);
	lanChannel.onchange =	IPMICMD_HL_GetIPv6NetworkInfo;
    IPMICMD_HL_GetLanFailover();
}

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
        top.frames["helpFrame"].location.href = getHelpPage('/page/config_nav.html');
	}
	if(curPriv != 4)
	{
		g_isadmin = 0;
		//alert(eLang.getString('common','STR_APP_STR_137'));
		save.disabled = true;
	}
	else
	{
		g_isadmin = 1;
	}
}

function ProcessNWFunctioncall6 (arg)
{
	onDisableControls ();

	var CmdStatus = WEBVAR_JSONVAR_HL_GETIPV6LANCONFIG.HAPI_STATUS;
	if (GET_ERROR_CODE(CmdStatus) == 0xD4)	//Insufficient privilege level
	{
		// alert (eLang.getString('common',"STR_USER_PRIVILEGE"));
		location.href = 'config_nav.html';
	}
	else if (CmdStatus != 0)
	{
		errstr = eLang.getString('common','STR_CONFIG_NW_GETVAL');
		errstr += (eLang.getString('common','STR_IPMI_ERROR') + GET_ERROR_CODE(CmdStatus));
		alert(errstr);
		return;
	}
	else
	{
		LANCFG_DATA = WEBVAR_JSONVAR_HL_GETIPV6LANCONFIG.WEBVAR_STRUCTNAME_HL_GETIPV6LANCONFIG;
		if (LANCFG_DATA.length > 0)
		{
			macAddress.value = LANCFG_DATA [0].MAC;
			ipAddress.value = LANCFG_DATA [0].IPv6Addr;
			optIPv6Prefix.value = LANCFG_DATA [0].IPv6Prefix;
			gateway.value = LANCFG_DATA [0].IPv6Gateway;
//			primaryDNS.value = LANCFG_DATA [0].IPv6PrimaryDNS;
//			secondDNS.value = LANCFG_DATA [0].IPv6SecondaryDNS;

            addrSrc = LANCFG_DATA[0].IPv6AddrSrc
            onAddrSrc();

            enableIPv6.disabled = false;
			enableIPv6.checked = LANCFG_DATA[0].IPv6Enable;
            if (enableIPv6.checked)
                onEnableIPv6();
		}
		else
			alert (eLang.getString('common','STR_APP_STR_138'));
	}
	showWait(false);
}



IPMICMD_SetIPv6LANCfg_Res = function()
{
	var CmdStatus = WEBVAR_JSONVAR_HL_SETIPV6LANCONFIG.HAPI_STATUS;
	if(CmdStatus==0xDE)
	{
		alert(eLang.getString('common','STR_CONF_NETWORK_INVALID_GATEWAY'));
		save.disabled=false;
		return;
	}
    else if (CmdStatus == -2)
    {
        alert(eLang.getString('configure_network', 'CONF_NW_STR_KVMOPEN'));
        save.disabled=false;
        return;
    }

    if(CmdStatus)
    {
		//Display the error code and proper message here...
		//eLang.ErrorAlert(WEBVAR_JSONVAR_HL_SETLANCONFIG.HAPI_STATUS,eLang.getString('common','STR_APP_STR_164_nw'));
		errstr =  eLang.getString('common','STR_CONFIG_NW_GETVAL');
		errstr += (eLang.getString('common','STR_IPMI_ERROR') + GET_ERROR_CODE(CmdStatus));
		alert(errstr);
    }
    else
    {
       	parent.frames['header'].enabledisableNavBar(0);
		parent.frames['sidebar'].clearMenus();
		top.onbeforeunload=function(){};
		top.unload=function(){};
        alert(eLang.getString('common','STR_APP_STR_139'));
		return;
    }
	save.disabled = false;
}

function Timedout() {
	alert(eLang.getString('common','STR_APP_STR_140'));
	save.disabled = false;
}

function doSetLANCfg6()
{
	if (g_isadmin)
	{
		var err = 0;
		var str = '';
        var prefix = 64;
		/* Disable the button here till the request is served */
		save.disabled=true;
		//Check validity of all the fields
		if (optDHCP.checked == false) {
			if (!eVal.ipv6(ipAddress.value)) {
				err = 1; str += '\n- '+eLang.getString('common','STR_APP_STR_143');
			}
            prefix = parseInt(optIPv6Prefix.value);
			if (isNaN(prefix)  ||  prefix < 0  ||  prefix > 128) {
				err = 1; str += '\n- '+eLang.getString('common','STR_APP_STR_144a');
			}
            if (!eVal.ipv6_is_zero(gateway.value))
			{
				if (!eVal.ipv6(gateway.value)) {
					err = 1; str += '\n- '+eLang.getString('common','STR_APP_STR_145');
				}
			}
//			if ((primaryDNS.value != "" ) && (!eVal.ipv6(primaryDNS.value)))
//			{
//				err = 1; 
//				str += '\n- '+eLang.getString('common','STR_APP_STR_145a');
//			}
//			if ((secondDNS.value != "" ) && (!eVal.ipv6(secondDNS.value)))
//			{
//				err = 1; 
//				str += '\n- '+eLang.getString('common','STR_APP_STR_145b');
//			}
			if (err) {
				alert(eLang.getString('common','STR_APP_STR_141')+str+'\n'+eLang.getString('common','STR_APP_STR_HELP'));
				save.disabled = false;
				return;
			}
		}
		if ((enableIPv6.checked == true)  &&
                (((ipAddress.value != LANCFG_DATA[0].IPv6Addr)  &&  (optStatic.checked == true))  ||  (optStatic.checked != true))) {
			if (confirm(eLang.getString('common','STR_APP_STR_400'))==false) {
				
				save.disabled = false;
				return;
			}
		}

		var p = new xmit.getset({url:'/rpc/setipv6nwconfig.asp', onrcv:IPMICMD_SetIPv6LANCfg_Res, ontimeout:Timedout});
		p.add("Channel",        lanChannel.value);
        p.add("IPv6Enable",     enableIPv6.checked ? 1 : 0);
		p.add("IPv6AddrSrc",    optIPv6AUTO.checked ? 5 : optDHCP.checked ? 2 : 1);
		p.add("IPv6Addr",       ipAddress.value);
		p.add("IPv6Prefix",     prefix);
		p.add("IPv6Gateway",    gateway.value);
//		p.add("PrimaryDNS",     primaryDNS.value);
//		p.add("SecondaryDNS",   secondDNS.value);
        if( false == enableLanFailover.checked )
        {
            p.add("FailoverEn", 0);
        }
        else
        {
            p.add("FailoverEn", 1);
        }
		p.send();
		delete p;
	}
	else
		alert(eLang.getString('common','STR_APP_STR_137'));
}

function onAddrSrc ()
{
    if (addrSrc == 0x05)
        onIPv6Auto();
    else if (addrSrc == 0x02)
        onDHCP();
    else
        onStatic();
}

function onIPv6Auto ()
{
    addrSrc = 0x05;

    optIPv6AUTO.checked = true;
    optDHCP.checked = false;
    optStatic.checked = false;

    ipAddress.disabled = true;
    optIPv6Prefix.disabled = true;	
    gateway.disabled = true;
//    primaryDNS.disabled = true;
//    secondDNS.disabled = true;
}

function onLanFailover()
{
    if( enableLanFailover.checked )
    {
        // Failover has been disabled, display all channels
        while(lanChannel.options.length)
            lanChannel.remove(0);
        IPMICMD_HL_GetIPv6LanChannel ();
    }
    else
    {
        // Failover has been disabled, display only baseboard configuration
        while(lanChannel.options.length)
            lanChannel.remove(0);
        IPMICMD_HL_GetIPv6LanChannel ();
    }
}

function onDHCP()
{
    addrSrc = 0x02;

    optIPv6AUTO.checked = false;
    optDHCP.checked = true;
    optStatic.checked = false;

    ipAddress.disabled = true;
    optIPv6Prefix.disabled = true;
    gateway.disabled = true;
//    primaryDNS.disabled = true;
//    secondDNS.disabled = true;
}

function onStatic()
{
    addrSrc = 0x01;

    optIPv6AUTO.checked = false;
    optDHCP.checked = false;
    optStatic.checked = true;

    ipAddress.disabled = false;
    optIPv6Prefix.disabled = false;
    gateway.disabled = false;
//    primaryDNS.disabled = false;
//    secondDNS.disabled = false;

    ipAddress.focus();
}

function onDisableControls ()
{
    enableIPv6.disabled = true;
    optIPv6AUTO.disabled = true;
    optDHCP.disabled = true;
    optStatic.disabled = true;
	
    ipAddress.disabled = true;
    optIPv6Prefix.disabled = true;
    gateway.disabled = true;
//    primaryDNS.disabled = true;
//    secondDNS.disabled = true;
}

function onEnableIPv6 ()
{
    if (enableIPv6.checked)
    {
        optIPv6AUTO.disabled = false;
        optDHCP.disabled = false;
        optStatic.disabled = false;

        onAddrSrc();
    }
    else
    {
        onDisableControls();
        enableIPv6.disabled = false;
    }
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
                enableLanFailover.checked = false;
            }
            else
            {
                enableLanFailover.checked = true;
            }
        }
        else
        {
            errstr = eLang.getString('common','STR_APP_STR_101');
            errstr += 'invalid response';
            alert(errstr);
        }
    }

    IPMICMD_HL_GetIPv6LanChannel ();
}

function IPMICMD_HL_GetIPv6LanChannel()
{
	showWait(true);
	var lanchannellist = xmit.getset({url:'/rpc/getlanchannelinfo.asp',onrcv:IPMICMD_GetIPv6LanChannelRes,status:''});
	lanchannellist.send();
}

function IPMICMD_GetIPv6LanChannelRes()
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
            if( enableLanFailover.checked && (optval != LAN_RMCP_CHANNEL) )
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

            lanChannel.add(new Option(optlbl, optval), window.ActiveXObject?sortorder:lanChannel.options[sortorder]);
		}
		IPMICMD_HL_GetIPv6NetworkInfo();
	}
}

function IPMICMD_HL_GetIPv6NetworkInfo()
{
	showWait(true);
	RPC_GetNetworkInfo = new xmit.getset({url:"/rpc/getipv6nwconfig.asp",onrcv:ProcessNWFunctioncall6});
	RPC_GetNetworkInfo.add("CHANNEL_NUM",lanChannel.value);
	RPC_GetNetworkInfo.send();
	delete RPC_GetNetworkInfo;
}

function getHelpPage(page)
{
    //change normal html file to hlp html file
    //change directory page to str/selectedLanguage
    return page.replace('.html','_hlp.html').replace('/page','/help/'+top.gLangSetting);
}

function GetWebInfo()
{
    if (g_isadmin)
    {
        showWait(true);
        xmit.get({url:"/rpc/users.asp",onrcv:GetWebInfoRes, status:''});
    }
    else
    {
        alert(eLang.getString('common','STR_APP_STR_137'));
    }
}

function GetWebInfoRes (arg)
{

    showWait(false);
    var KVMisOpen = 0;

    if(WEBVAR_JSONVAR_WEB_USERS.HAPI_STATUS != 0)
    {
        // Call failed for some reason. Allow the operation just in case.
        KVMisOpen = 0;
    }
    else
    {
        WEB_USERS = WEBVAR_JSONVAR_WEB_USERS.WEBVAR_STRUCTNAME_WEB_USERS;

        for (i=0; i<WEB_USERS.length; i++)
        {
            if (WEB_USERS[i].KVMSESSIONS > 0)
            {
                KVMisOpen = 1;
            }

            if (WEB_USERS[i].MEDIASESSIONS > 0)
            {
                KVMisOpen = 1;
            }
        }
    }
    // If KVM is open, don't allow changing anything.
    if (KVMisOpen == 1)
    {
        alert(eLang.getString('configure_network', 'CONF_NW_STR_KVMOPEN'));
    }
    else
    {
        doSetLANCfg6();
    }
}

