var current_state;
var action;
var state_to_expect = 0xF; // 0xF is don't care
var MaxRetries = 3;

var UseExternalBMC = 0;
// the rpc name becomes hostctl_bmc
// for host status we always rely on our PCI 5V detection for now for onload.
// once the user changes it we switch to the appropriate source for now
// later this will become an auotmatic setting
var hoststatus_rpc_name = "/rpc/hoststatus.asp";
var hostctl_rpc_name    = "/rpc/hostctl.asp";

var msgCableChkBMC     = eLang.getString('common','STR_APP_STR_404')
        var msgCableChkFeature = eLang.getString('common','STR_APP_STR_405')

        var action;

function doInit()
{
    exposeElms( ['_statusMsg',
                 '_statusMsg2',
                 '_resetSrvr',
                 '_forceBIOS',
                 '_forceBIOSpwron',
                 '_iPwrOffSrvr',
                 '_oPwrOffSrvr',
                 '_pwrOnSrvr',
                 '_pwrCycleSrvr',
                 '_prfmAction'
                 ]);

    CheckRole();

    resetSrvr.checked = false;
    iPwrOffSrvr.checked = false;
    oPwrOffSrvr.checked = false;
    pwrOnSrvr.checked = false;
    pwrCycleSrvr.checked = false;

    // first get host power status
    IPMICMD_GetHostStatus();

    resetSrvr.onclick = onreset;
    iPwrOffSrvr.onclick = onpoweroff;
    oPwrOffSrvr.onclick = onsoftpower;
    pwrOnSrvr.onclick = onpoweron;
    pwrCycleSrvr.onclick = onpowercycle;

    prfmAction.onclick = IPMICMD_DoPowerAction;
}

IPMICMD_GetPowerStatus_Res = function()
        {
    showWait(false);

    forceBIOS.checked = false;
    forceBIOSpwron.checked = false;
    var CmdStatus = WEBVAR_JSONVAR_HL_SYSTEM_STATE.HAPI_STATUS;
    if(CmdStatus != 0)
    {
        alert(eLang.getString('common','STR_APP_STR_406'));
    }

    current_state = WEBVAR_JSONVAR_HL_SYSTEM_STATE.WEBVAR_STRUCTNAME_HL_SYSTEM_STATE[0].JF_STATE;

    if(state_to_expect != 0xF)
    {
        if(current_state != state_to_expect)
        {
            MaxRetries--;
            showWait(true,eLang.getString('common','STR_APP_STR_201') + MaxRetries);
            if(MaxRetries == 0)
            {
                showWait(false);
                if(action == 5)
                {
                    alert(eLang.getString('common','STR_APP_STR_202') + "\n" + eLang.getString('common','STR_APP_STR_202_extended'));
                    prfmAction.disabled = false;
                    location.href = 'server_power_control.html';
                    location.reload();
                }
                else
                {
                    alert(eLang.getString('common','STR_APP_STR_203'));
                    prfmAction.disabled = false;
                    location.href = 'server_power_control.html';
                    location.reload();
                }
                return;
            }
            if(action == 5)
            {
                setTimeout("IPMICMD_GetHostStatus()",10000);
            }
            else
            {
                setTimeout("IPMICMD_GetHostStatus()",5000);
            }
            return;
        }
    }

    statusMsg2.innerHTML = "";
    if((WEBVAR_JSONVAR_HL_SYSTEM_STATE.WEBVAR_STRUCTNAME_HL_SYSTEM_STATE[0].JF_STATE==0) || (WEBVAR_JSONVAR_HL_SYSTEM_STATE.WEBVAR_STRUCTNAME_HL_SYSTEM_STATE[0].JF_STATE==2))
    {
        // host power is OFF or S1
        statusMsg.innerHTML = eLang.getString('common','STR_APP_STR_204');
        statusMsg.style.color = '#990000';

        resetSrvr.checked = false;
        resetSrvr.disabled = true;
        forceBIOS.disabled = true;

        iPwrOffSrvr.checked = false;
        iPwrOffSrvr.disabled = true;

        oPwrOffSrvr.checked = false;
        oPwrOffSrvr.disabled = true;

        pwrCycleSrvr.checked = false;
        pwrCycleSrvr.disabled = true;

        pwrOnSrvr.checked = true;
        action = 1; // power ON
        pwrOnSrvr.disabled = false;
        forceBIOSpwron.disabled = false;
        
		prfmAction.disabled = false;
		
        MaxRetries = 3;
    }
    else
    {
        if(action == 2) // power cycle
        {
            statusMsg2.innerHTML = eLang.getString('common','STR_APP_STR_205_cycle');
            statusMsg2.style.color = '#000099';
        }

        if(action == 3) // hard reset
        {
            statusMsg2.innerHTML = eLang.getString('common','STR_APP_STR_205_reset');
            statusMsg2.style.color = '#000099';
        }

        // host power is ON
        statusMsg.innerHTML = eLang.getString('common','STR_APP_STR_205');
        statusMsg.style.color = '#009900';

        resetSrvr.checked = true;
        action = 3; // hard reset
        resetSrvr.disabled = false;
        forceBIOS.disabled = false;

        iPwrOffSrvr.checked = false;
        iPwrOffSrvr.disabled = false;

        oPwrOffSrvr.checked = false;
        oPwrOffSrvr.disabled = false;

        pwrCycleSrvr.checked = false;
        pwrCycleSrvr.disabled = false;

        pwrOnSrvr.checked = false;
        pwrOnSrvr.disabled = true;
        forceBIOSpwron.disabled = true;

		prfmAction.disabled = false;

        MaxRetries = 3;
    }
        }

IPMICMD_GetPowerAction_Res = function()
        {
    var CmdStatus = WEBVAR_JSONVAR_HL_POWERSTATUS.HAPI_STATUS;
    if(CmdStatus != 0)
    {
        if(action == 5 && CmdStatus == 463)
        {
            alert(eLang.getString('common','STR_APP_STR_205_graceful_shutdown_error'));
            prfmAction.disabled = false;
            location.href = "server_power_control.html";
            location.reload();
        }
        else
        {
            alert(eLang.getString('common','STR_APP_STR_206'));
            prfmAction.disabled = false;
            location.href = "server_power_control.html";
        }
    }
    else
    {
        showWait(true,eLang.getString('common','STR_APP_STR_207'));
        if(action == 2) // power cycle
        {
            inittmout = 20000; //for power cycle we check if host is powered on again after 10 secs
        }
        else if(action == 5) // soft OFF (OS-mediated)
        {
            inittmout = 30000;
        }
        else
        {
            inittmout = 10000;
        }
        MaxRetries = 3;

        setTimeout("IPMICMD_GetHostStatus()",inittmout);
    }
        }

IPMICMD_GetHostStatus = function()
        {
    xmit.get({url:hoststatus_rpc_name,onrcv:IPMICMD_GetPowerStatus_Res, status:''});
        }

IPMICMD_DoPowerAction = function()
        {
    if (g_isadmin)
    {
        switch(action)
        {
            case 0: // power OFF
                state_to_expect = 0;
                statusMsg.innerHTML = eLang.getString('common','STR_APP_STR_205_power-off_start');
                statusMsg.style.color = '#990000';
                statusMsg2.innerHTML = " ";
			prfmAction.disabled = true;
                break;
            case 1: // power ON
                state_to_expect = 1;
                statusMsg.innerHTML = eLang.getString('common','STR_APP_STR_205_power-on_start');
                statusMsg.style.color = '#009900';
                statusMsg2.innerHTML = " ";
			prfmAction.disabled = true;
                break;
            case 2: // power cycle
                state_to_expect = 1; //power on after some time I suppose
                statusMsg2.innerHTML = eLang.getString('common','STR_APP_STR_205_cycle_start');
                statusMsg2.style.color = '#000099';
			prfmAction.disabled = true;
                break;
            case 3: // hard reset
                state_to_expect = 1;
                statusMsg2.innerHTML = eLang.getString('common','STR_APP_STR_205_reset_start');
                statusMsg2.style.color = '#000099';
			prfmAction.disabled = true;
                break;
            case 5://Soft power off host
                state_to_expect = 0;
                statusMsg.innerHTML = eLang.getString('common','STR_APP_STR_205_graceful_shutdown');
                statusMsg.style.color = '#000099';
                statusMsg2.innerHTML = " ";
                prfmAction.disabled = true;
                resetSrvr.disabled = true;
                forceBIOS.disabled = true;
                forceBIOSpwron.disabled = true;
                iPwrOffSrvr.disabled = true;
                oPwrOffSrvr.disabled = true;
                pwrCycleSrvr.disabled = true;

                break;
        }
        RPC_PowerAction = new xmit.getset({url:hostctl_rpc_name,onrcv:IPMICMD_GetPowerAction_Res});
        RPC_PowerAction.add("WEBVAR_POWER_CMD",action);
        RPC_PowerAction.add("WEBVAR_FORCE_BIOS",forceBIOS.checked ? 1 : 0);
        RPC_PowerAction.add("WEBVAR_FORCE_BIOSPWRON",forceBIOSpwron.checked ? 1 : 0);
        RPC_PowerAction.send();
    }
    else
    {
        alert(eLang.getString('common','STR_APP_STR_316'));
    }
        }


onreset=function()
        {
    //	statusMsg2.innerHTML = "3: onreset";
    action = 3;
    /*  resetSrvr.checked = true;
    hostctlui.m_elm10.radio().checked = false;
    hostctlui.m_elm3.radio().checked = false;
    hostctlui.m_elm8.radio().checked = false;
    hostctlui.m_elm9.radio().checked = false;
     */
        }

onpoweroff = function()
        {
    //	statusMsg2.innerHTML = "0: onpoweroff";
    action = 0;
    /*  resetSrvr.checked = false;
    hostctlui.m_elm10.radio().checked = true;
    hostctlui.m_elm3.radio().checked = false;
    hostctlui.m_elm8.radio().checked = false;
    hostctlui.m_elm9.radio().checked = false;
     */

        }

onsoftpower = function()
        {
    //	statusMsg2.innerHTML = "5: onsoftpower";
    action = 5;
    /*  resetSrvr.checked = false;
    hostctlui.m_elm10.radio().checked = false;
    hostctlui.m_elm3.radio().checked = true;
    hostctlui.m_elm8.radio().checked = false;
    hostctlui.m_elm9.radio().checked = false;
     */
        }

onpoweron =function()
        {
    //	statusMsg2.innerHTML = "1: onpoweron";
    action = 1;
    /*  resetSrvr.checked = false;
    hostctlui.m_elm10.radio().checked = false;
    hostctlui.m_elm3.radio().checked = false;
    hostctlui.m_elm8.radio().checked = true;
    hostctlui.m_elm9.radio().checked = false;
     */
        }

onpowercycle = function()
        {
    //	statusMsg2.innerHTML = "2: onpowercycle";
    action = 2;
    /*  resetSrvr.checked = false;
    hostctlui.m_elm10.radio().checked = false;
    hostctlui.m_elm3.radio().checked = false;
    hostctlui.m_elm8.radio().checked = false;
    hostctlui.m_elm9.radio().checked = true;
     */
        }






function CheckRole()
{
    xmit.get({url:'/rpc/getrole.asp', onrcv:OnCheckRole, status:''});
}

function OnCheckRole()
{
    var curPriv = WEBVAR_JSONVAR_GET_ROLE.WEBVAR_STRUCTNAME_GET_ROLE[0]['CURPRIV'];
    // user must have OPERATOR(3) or ADMINISTRATOR(4) privilege to perform remote power operations.	
    if((curPriv != 3) && (curPriv != 4))
    {
        g_isadmin = 0;
        //  alert(eLang.getString('common','STR_APP_STR_315'));
        prfmAction.disabled = true;
    }
    else
    {
        g_isadmin = 1;
        prfmAction.disabled = false;
    }
}
