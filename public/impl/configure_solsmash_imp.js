var g_isadmin = 0;
var failoverEnabled = 0;

function doInit() {
    exposeElms(['_enableSOL1',
                '_enableSOL2',
                '_enableSOL3',
                '_enableSOL1name',
                '_enableSOL2name',
                '_enableSOL3name',
                '_smash_port',
                '_saveSOLBtn',
                '_saveSMASHBtn']);

    CheckRole();

    saveSOLBtn.onclick = saveSOLSettings;
    saveSMASHBtn.onclick = saveSMASHSettings;
    IPMICMD_HL_GetLanFailover();
    IPMICMD_HL_GetLanChannel();
    GetSMASHPort();
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

        LockButtons();
    }
    else
    {
        g_isadmin = 1;
    }
}

function LockButtons()
{
    saveSOLBtn.disabled = true;
    saveSMASHBtn.disabled = true;
}

function UnlockButtons()
{
    saveSOLBtn.disabled = false;
    saveSMASHBtn.disabled = false;
}

function FailoverIsEnabled()
{
    enableSOL1.disabled = false;
    enableSOL2.checked = false;
    enableSOL3.checked = false;
    enableSOL2.disabled = true;
    enableSOL3.disabled = true;
}

function FailoverIsDisabled()
{
    enableSOL1.disabled = false;
    enableSOL2.disabled = false;
    enableSOL3.disabled = false;
}


function IPMICMD_HL_GetLanChannel()
{
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
            if (optval == LAN_RMCP_CHANNEL)
            {
                optlbl = eLang.getString('configure_solsmash','STR_CFG_ENABLESOLFOR') + " " + eLang.getString('common','LAN_RMCP_CHANNEL');
                document.getElementById("_enableSOL1name").innerHTML = optlbl;
                document.getElementById("_enableSOL1cell").style.display = "table-cell";
            }
            if (optval == LAN_RMCP_CHANNEL1)
            {
                optlbl = eLang.getString('configure_solsmash','STR_CFG_ENABLESOLFOR') + " " + eLang.getString('common','LAN_RMCP_CHANNEL1');
                document.getElementById("_enableSOL3name").innerHTML = optlbl;
                document.getElementById("_enableSOL3row").style.display = "table-row";
            }
            if (optval == LAN_RMCP_CHANNEL2)
            {
                optlbl = eLang.getString('configure_solsmash','STR_CFG_ENABLESOLFOR') + " " + eLang.getString('common','LAN_RMCP_CHANNEL2');
                document.getElementById("_enableSOL2name").innerHTML = optlbl;
                document.getElementById("_enableSOL2row").style.display = "table-row";
            }
        }
        getSOLenable();
    }
}


function getSOLenable()
{
    xmit.get({url:'/rpc/getsolenable.asp',status:'',onrcv:updateSOLenable});
}

function updateSOLenable(arg)
{
    // these are the same as '#define's in /development/oem/common/include/ipmi_inc_oem/Channel.h
    var LAN_RMCP_CHANNEL  = 0x01;
    var LAN_RMCP_CHANNEL1 = 0x03;
    var LAN_RMCP_CHANNEL2 = 0x02;

    var CmdStatus = WEBVAR_JSONVAR_GETSOLENABLE.HAPI_STATUS;
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

function GetSMASHPort()
{
    xmit.get({url:'/rpc/getsmashport.asp',status:'',onrcv:handleGetSMASHPort});
}

function handleGetSMASHPort()
{
    var CmdStatus = WEBVAR_JSONVAR_SMASHPORT.HAPI_STATUS;
    if(CmdStatus != 0)
    {
        // Error
    }
    else
    {
        SMASHINFO = WEBVAR_JSONVAR_SMASHPORT.WEBVAR_STRUCTNAME_SMASHPORT[0];
        smash_port.value = SMASHINFO.u16SMASHPort;
    }
}



function saveSOLSettings(arg)
{
    LockButtons();
    var setSOL = xmit.getset({url:'/rpc/setsolenable.asp',status:'',onrcv:handleSaveSOLSettings});
    var SOL1Enabled = (document.getElementById("_enableSOL1").checked)? 1:0;
    var SOL2Enabled = (document.getElementById("_enableSOL2").checked)? 1:0;
    var SOL3Enabled = (document.getElementById("_enableSOL3").checked)? 1:0;
    setSOL.add('SOL_LAN1',SOL1Enabled);
    setSOL.add('SOL_LAN2',SOL2Enabled);
    setSOL.add('SOL_LAN3',SOL3Enabled);
    setSOL.send();
    delete setSOL;
}

function handleSaveSOLSettings(arg)
{
    if(arg.HAPI_STATUS==0)
    {
        alert(eLang.getString('common','STR_SECURE_SAVE_SUCCESS'));

    }else
    {
        alert(eLang.getString('common','STR_SECURE_SAVE_FAILURE'));
    }
    UnlockButtons();
}


function saveSMASHSettings(arg)
{
    LockButtons();
    var setSMASH = xmit.getset({url:'/rpc/setsmashport.asp',status:'',onrcv:handleSetSMASHPort});
    if (smash_port.value != "")
    {
        setSMASH.add('SMASH_PORT', (smash_port.value == "") ? 0 : smash_port.value);
        setSMASH.send();
    }
    else
    {
        alert(eLang.getString('configure_solsmash','STR_CFG_SMASHINVALID'));
        UnlockButtons();
    }
    delete setSMASH;
}

function handleSetSMASHPort(arg)
{
    if(arg.HAPI_STATUS==0)
    {
        alert(eLang.getString('configure_solsmash','STR_CFG_SMASHGOOD'));
    }else
    {
        if (-4 == arg.HAPI_STATUS)
        {
            alert(eLang.getString('common','STR_APP_STR_104A') + ".");
        }
        else
        {
            alert(eLang.getString('configure_solsmash','STR_CFG_SMASHFAIL'));
        }
    }
    UnlockButtons();
}

function IPMICMD_HL_GetLanFailover()
{
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
                FailoverIsDisabled();
            }
            else
            {
                failoverEnabled = true;
                FailoverIsEnabled();
            }
        }
        else
        {
            errstr = eLang.getString('common','STR_APP_STR_101');
            errstr += 'invalid response';
            alert(errstr);
        }
    }

}
