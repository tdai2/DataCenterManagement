function doInit()
{
     // TODO: add page initialization code
     
     exposeElms(['_lanChannel',
                '_vlanEnable',
                '_vlanId',
                '_vlanPriority',
                '_save']);
    
    CheckRole();        
    save.onclick = doSetVlan;
    save.disabled = true;
    vlanEnable.onclick = doVlanEnable;

    showWait(true);
    lanChannel.onchange = GetVlanInfo;
    GetVlanChannel();
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
    }
    if(curPriv != 4)
    {
        g_isadmin = 0;
        //alert(eLang.getString('common','STR_APP_STR_137'));
    }
    else
    {
        g_isadmin = 1;
        save.disabled = false;
    }
}


function GetVlanChannel()
{
    showWait(true);
    var lanchannellist = xmit.getset({url:'/rpc/getlanchannelinfo.asp',onrcv:GetVlanChannelRes,status:''});
    lanchannellist.send();
}

function GetVlanChannelRes()
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
        GetVlanInfo();
    }
}


function GetVlanInfo()
{
    showWait(true);
    RPC_GetVlanInfo = new xmit.getset({url:"/rpc/getvlanconfig.asp",onrcv:GetVlanInfo_Res});
    RPC_GetVlanInfo.add("CHANNEL_NUM",lanChannel.value);
    RPC_GetVlanInfo.send();
    delete RPC_GetVlanInfo;
}

function GetVlanInfo_Res(arg)
{
    var CmdStatus = WEBVAR_JSONVAR_HL_GETVLANCONFIG.HAPI_STATUS;
    if (GET_ERROR_CODE(CmdStatus) == 0xD4)  //Insufficient privilege level
    {
        // alert (eLang.getString('common',"STR_USER_PRIVILEGE"));
        location.href = 'config_nav.html';
    }
    else if (CmdStatus != 0)
    {
        errstr = eLang.getString('common','STR_CONFIG_VLAN_GETVAL');
        errstr += (eLang.getString('common','STR_IPMI_ERROR') + GET_ERROR_CODE(CmdStatus));
        alert(errstr);
        return;
    }
    else
    {
        VLAN_DATA = WEBVAR_JSONVAR_HL_GETVLANCONFIG.WEBVAR_STRUCTNAME_HL_GETVLANCONFIG;
        if (VLAN_DATA.length > 0)
        {
            vlanEnable.checked  = (VLAN_DATA[0].VlanEnable) ? true : false;
            vlanId.value        = VLAN_DATA[0].VlanId;
            vlanPriority.value  = VLAN_DATA[0].VlanPriority;
            if (vlanId.value == 0)
            {
                vlanId.value        = "";
                vlanPriority.value  = "";
            }

            doVlanEnable();
        }
        else
            alert (eLang.getString('common','STR_APP_STR_138'));
    }
    showWait(false);
}



function doSetVlan()
{
    if (g_isadmin)
    {
        var err = 0;
        var str = '';
        var prefix = 64;
        /* Disable the button here till the request is served */
        save.disabled=true;

        //Check validity of all the fields
        if (vlanEnable.checked) {
            if (isNaN(vlanId.value)  ||  vlanId.value < 1  ||  vlanId.value > 4094) {
                err = 1; str += '\n- '+eLang.getString('common','STR_CONFIG_VLAN_INVALID_ID');
            }
            if (isNaN(vlanPriority.value)  ||  vlanPriority.value < 0  ||  vlanPriority.value > 7) {
                err = 1; str += '\n- '+eLang.getString('common','STR_CONFIG_VLAN_INVALID_PRIORITY');
            }
            if (err) {
                alert(eLang.getString('common','STR_APP_STR_141')+str+'\n'+eLang.getString('common','STR_APP_STR_HELP'));
                save.disabled = false;
                return;
            }
        }

        var p = new xmit.getset({url:'/rpc/setvlanconfig.asp', onrcv:doSetVlan_Res, ontimeout:Timedout});
        p.add("Channel",        lanChannel.value);
        p.add("VlanEnable",     vlanEnable.checked ? 1 : 0);
        p.add("VlanId",         vlanId.value);
        p.add("VlanPriority",   vlanPriority.value);
        p.send();
        showWait(true);
        delete p;
    }
    else
        alert(eLang.getString('common','STR_APP_STR_137'));
}

doSetVlan_Res = function()
{
    showWait(false);
    var CmdStatus = WEBVAR_JSONVAR_HL_SETVLANCONFIG.HAPI_STATUS;
	if (GET_ERROR_CODE(CmdStatus) == 0xD5)
	{
		alert (eLang.getString('common',"STR_CONFIG_VLAN_NOT_NOW"));
	}
	else if (CmdStatus != 0)
    {
        //Display the error code and proper message here...
        //eLang.ErrorAlert(WEBVAR_JSONVAR_HL_SETVLANCONFIG.HAPI_STATUS, eLang.getString('common','STR_APP_STR_164_nw'));
        errstr =  eLang.getString('common','STR_CONFIG_VLAN_SETVAL');
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

function Timedout()
{
    alert(eLang.getString('common','STR_APP_STR_140'));
    save.disabled = false;
}


function doVlanEnable()
{
    vlanId.disabled         = !vlanEnable.checked;
    vlanPriority.disabled   = !vlanEnable.checked;
}
