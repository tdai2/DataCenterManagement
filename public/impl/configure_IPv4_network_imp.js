function doInit() {
	 // TODO: add page initialization code
	 
	 exposeElms(['_lanChannel',
                '_enableLanFailover',
	 			'_macAddress',
	 			'_optDHCP',
	 			'_optStatic',
	 			'_optDisable',
	 			'_ipAddress',
	 			'_subnetMask',
	 			'_gateway',
	 			'_primaryDNS',
	 			'_secondDNS',
	 			'_save']);
	 			
	CheckRole();		
    enableLanFailover.onclick = onLanFailover;
	optDHCP.onclick = onDHCP;
	optStatic.onclick = onStatic;
	optDisable.onclick = onDisable;
	save.onclick = GetWebInfo; // This will cascade into doSetLANCfg.

	showWait(true);
	lanChannel.onchange =	IPMICMD_HL_GetNetworkInfo;
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

function ProcessNWFunctioncall (arg)
{
	onDisableControls ();

	var CmdStatus = WEBVAR_JSONVAR_HL_GETLANCONFIG.HAPI_STATUS;
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
		LANCFG_DATA = WEBVAR_JSONVAR_HL_GETLANCONFIG.WEBVAR_STRUCTNAME_HL_GETLANCONFIG;
		if (LANCFG_DATA.length > 0)
		{
			macAddress.value = LANCFG_DATA [0].MAC;
			ipAddress.value = LANCFG_DATA [0].IP;
			subnetMask.value = LANCFG_DATA [0].Mask;
			gateway.value = LANCFG_DATA [0].Gateway;
			primaryDNS.value = LANCFG_DATA [0].PrimaryDNS;
			secondDNS.value = LANCFG_DATA [0].SecondaryDNS;

			if (getbits (LANCFG_DATA[0].IPAddrSource,3,0) == 0x01) {
				// Static
				onStatic();
			} else if (getbits (LANCFG_DATA[0].IPAddrSource,3,0) == 0x02) {
				// DHCP
				onDHCP();
			}
		}
		else
			alert (eLang.getString('common','STR_APP_STR_138'));
/*
		if (lancfg.m_elm1.radio().checked == true) {
			onDHCP();
		} else {
			onStatic();
		}
*/
	}
	showWait(false);
}



IPMICMD_SetLANCfg_Res = function()
{
	var CmdStatus = WEBVAR_JSONVAR_HL_SETLANCONFIG.HAPI_STATUS;
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

function doSetLANCfg()
{
	if (g_isadmin)
	{
		var err = 0;
		var str = '';
		/* Disable the button here till the request is served */
		save.disabled=true;
		//Check validity of all the fields
		if (optStatic.checked == true) {
			if (!eVal.ip(ipAddress.value)) {
				err = 1; str += '\n- '+eLang.getString('common','STR_APP_STR_143');
			}
			if (!eVal.ip(subnetMask.value)) {
				err = 1; str += '\n- '+eLang.getString('common','STR_APP_STR_144');
			}
			var ipv = (new String(gateway.value)).split(".");
			if (!((ipv.length == 4)&&(ipv[0]==0)&&(ipv[1]==0)&&(ipv[2]==0)&&(ipv[3]==0)))
			{
				if (!eVal.ip(gateway.value)) {
					err = 1; str += '\n- '+eLang.getString('common','STR_APP_STR_145');
				}
			}
			if ((primaryDNS.value != "" ) && (!eVal.ip(primaryDNS.value)))
			{
				err = 1; 
				str += '\n- '+eLang.getString('common','STR_APP_STR_145a');
			}
			if ((secondDNS.value != "" ) && (!eVal.ip(secondDNS.value)))
			{
				err = 1; 
				str += '\n- '+eLang.getString('common','STR_APP_STR_145b');
			}
			if (err) {
				alert(eLang.getString('common','STR_APP_STR_141')+str+'\n'+eLang.getString('common','STR_APP_STR_HELP'));
				save.disabled = false;
				return;
			}
		}
		if (((ipAddress.value != LANCFG_DATA[0].IP)&&(optDHCP.checked == false))||(optDHCP.checked == true)) {
			if (confirm(eLang.getString('common','STR_APP_STR_400'))==false) {
				
				save.disabled = false;
				return;
			}
		}

		var p = new xmit.getset({url:'/rpc/setnwconfig.asp', onrcv:IPMICMD_SetLANCfg_Res, ontimeout:Timedout});
		p.add("Channel", lanChannel.value);

        if( false == enableLanFailover.checked )
        {
            p.add("FailoverEn", 0);
        }
        else
        {
            p.add("FailoverEn", 1);
        }
        
		if (optDHCP.checked == true) {
			// DHCP
			p.add("IPAddrSource", 0x02);
		} else if (optStatic.checked == true) {
			// Static
			p.add("IPAddrSource", 0x01);
			p.add("IP", ipAddress.value);
			p.add("Mask", subnetMask.value);
			p.add("Gateway", gateway.value);
			p.add("PrimaryDNS",primaryDNS.value);
			p.add("SecondaryDNS",secondDNS.value);
		} else if (optDisable.checked == true) {
		    // Disabled
            p.add("IPAddrSource", 0x01);
            p.add("IP", "0.0.0.0");
            p.add("Mask", "0.0.0.0");
            p.add("Gateway", "0.0.0.0");
            p.add("PrimaryDNS","0.0.0.0");
            p.add("SecondaryDNS", "0.0.0.0");
            var confirmDisable = confirm(eLang.getString('configure_network', 'CONF_NW_STR_WARNDISABLE'));
            if (false == confirmDisable)
            {
                delete p;
                save.disabled = false;
                return;
            }
		}
		p.send();
		delete p;
	}
	else
		alert(eLang.getString('common','STR_APP_STR_137'));
}

function onLanFailover()
{
    if( enableLanFailover.checked )
    {
        // Failover has been disabled, display all channels
        while(lanChannel.options.length)
            lanChannel.remove(0);
        IPMICMD_HL_GetLanChannel ();
    }
    else
    {
        // Failover has been disabled, display only baseboard configuration
        while(lanChannel.options.length)
            lanChannel.remove(0);
        IPMICMD_HL_GetLanChannel ();
    }
}

function onDHCP()
{
	optDHCP.checked = true;
	optStatic.checked = false;
	optDisable.checked = false;

	ipAddress.disabled = true;
	subnetMask.disabled = true;
	gateway.disabled = true;
	primaryDNS.disabled = true;
	secondDNS.disabled = true;
	ipAddress.enabled = false;
	subnetMask.enabled = false;
	gateway.enabled = false;

}

function onStatic()
{
	optDHCP.checked = false;
	optStatic.checked = true;
	optDisable.checked = false;

	ipAddress.disabled = false;
	subnetMask.disabled = false;
	gateway.disabled = false;
	primaryDNS.disabled = false;
	secondDNS.disabled = false;
	ipAddress.enabled = true;
	subnetMask.enabled = true;
	gateway.enabled = true;

	ipAddress.focus();
}

function onDisable()
{
    optDHCP.checked = false;
    optStatic.checked = false;
    optDisable.checked = true;

    ipAddress.disabled = true;
    subnetMask.disabled = true;
    gateway.disabled = true;
    primaryDNS.disabled = true;
    secondDNS.disabled = true;
    ipAddress.enabled = false;
    subnetMask.enabled = false;
    gateway.enabled = false;

}

function onDisableControls ()
{
	optDHCP.checked = true;
	optStatic.checked = false;
	optDisable.checked = false;

	optDHCP.disabled = true;
	optStatic.disabled = false;
	optDisable.disabled = false;
	ipAddress.disabled = true;
	subnetMask.disabled = true;
	gateway.disabled = true;
	primaryDNS.disabled = true;
	secondDNS.disabled = true;

	optDHCP.disabled = false;
	optStatic.disabled = false;
	optDisable.disabled = false;
	ipAddress.enabled = false;
	subnetMask.enabled = false;
	gateway.enabled = false;
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
		IPMICMD_HL_GetNetworkInfo();
	}
}

function IPMICMD_HL_GetNetworkInfo()
{
	showWait(true);
	RPC_GetNetworkInfo = new xmit.getset({url:"/rpc/getnwconfig.asp",onrcv:ProcessNWFunctioncall});
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
        doSetLANCfg();
    }
}
