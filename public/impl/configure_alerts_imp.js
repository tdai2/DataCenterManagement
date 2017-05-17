var g_isadmin = 0;
var destChecked = [];
var failoverEnabled = 0;

function doInit() {
	 // TODO: add page initialization code
	 exposeElms(['_globalEnable', '_globalDisable', '_Enabledtxt', '_Disabledtxt', '_eventLogEnable', '_eventLogDisable',
	            '_tempEvent', '_restartEvent', '_fanEvent', '_powersupplyEvent', '_postEvent', '_nodemanagerEvent',
                '_watchdogEvent', '_voltageEvent', '_intrusionEvent', '_memoryEvent', '_frbEvent', '_harddriveEvent',
                '_checkAllBtn',
                '_clearAllBtn',
                '_lanchannel',
                '_snmpEnable1', '_snmpAddress1',
                '_emailEnable1', '_emailAddress1',
                '_snmpEnable2', '_snmpAddress2',
                '_emailEnable2', '_emailAddress2',
                '_saveBtn',
                '_testBtn']);


	
    checkAllBtn.onclick = checkAllEvents;
    clearAllBtn.onclick = clearAllEvents;
    
   	lanchannel.onchange = showNewAlertDests;

    snmpEnable1.onclick = onSnmpEnable1;
    emailEnable1.onclick = onEmailEnable1;
    snmpEnable2.onclick = onSnmpEnable2;
    emailEnable2.onclick = onEmailEnable2;

    saveBtn.onclick = saveAlerts;
    testBtn.onclick = sendTestAlerts;

	IPMICMD_HL_GetLanFailover();
    checkRole();

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


function checkRole()
{
	xmit.get({url:'/rpc/getrole.asp', onrcv:onCheckRole, status:''});
}

function onCheckRole()
{
    if(WEBVAR_JSONVAR_GET_ROLE.WEBVAR_STRUCTNAME_GET_ROLE[0]['CURPRIV'] == 2)
    {
        saveBtn.disabled = true;
        testBtn.disabled = true;
        checkAllBtn.disabled = true;
        clearAllBtn.disabled = true;
        location.href = 'config_nav.html';
        return;
    }
    else if (WEBVAR_JSONVAR_GET_ROLE.WEBVAR_STRUCTNAME_GET_ROLE[0]['CURPRIV'] == 3)
	{
		g_isadmin = 0;
		saveBtn.disabled = true;
        testBtn.disabled = true;
        checkAllBtn.disabled = true;
        clearAllBtn.disabled = true;
        globalEnable.disabled = true;
        globalDisable.disabled = true;
        snmpEnable1.disabled = true;
        emailEnable1.disabled = true;
        snmpEnable2.disabled = true;
        emailEnable2.disabled = true;
        snmpAddress1.disabled = true;
        emailAddress1.disabled = true;
        snmpAddress2.disabled = true;
        emailAddress2.disabled = true;
        eventLogEnable.disabled = true;
        eventLogDisable.disabled = true;
        disableAllEventCheckboxes();
	}
	else
	{
		g_isadmin = 1;
	}
	getAlertCfg();
}


function getAlertCfg()
{
	showWait(true);
 	xmit.get({url:"/rpc/getpefenables.asp",onrcv:processGetPEFEnables, status:''});
}

function processGetPEFEnables()
{
	var CmdStatus = WEBVAR_JSONVAR_HL_GETPEFENABLES.HAPI_STATUS;
	if (CmdStatus != 0)
	{
        showWait(false);
		errstr = eLang.getString('common','STR_CONFIG_ALERTS_GETVAL');
		errstr +=(eLang.getString('common','STR_IPMI_ERROR') + GET_ERROR_CODE(CmdStatus));
		alert(errstr);
		return;
	} 
	else 
	{
		PEFENABLES_DATA = WEBVAR_JSONVAR_HL_GETPEFENABLES.WEBVAR_STRUCTNAME_HL_GETPEFENABLES;
		if (PEFENABLES_DATA.length > 0)
		{
            tempEvent.checked = PEFENABLES_DATA[0].TEMP_EVENT;
            restartEvent.checked = PEFENABLES_DATA[0].RESTART_EVENT;
            fanEvent.checked = PEFENABLES_DATA[0].FAN_EVENT;
            powersupplyEvent.checked = PEFENABLES_DATA[0].POWERSUPPLY_EVENT;
            postEvent.checked = PEFENABLES_DATA[0].POST_EVENT;
            nodemanagerEvent.checked = PEFENABLES_DATA[0].NODEMANAGER_EVENT;
            watchdogEvent.checked = PEFENABLES_DATA[0].WATCHDOG_EVENT;
            voltageEvent.checked = PEFENABLES_DATA[0].VOLTAGE_EVENT;
            intrusionEvent.checked = PEFENABLES_DATA[0].INTRUSION_EVENT;
            memoryEvent.checked = PEFENABLES_DATA[0].MEMORY_EVENT;
            frbEvent.checked = PEFENABLES_DATA[0].FRB_EVENT;
            harddriveEvent.checked = PEFENABLES_DATA[0].HARDDRIVE_EVENT;
            if (PEFENABLES_DATA[0].PEF_GLOBAL_ENABLE)
            {
                globalEnable.checked = true;
                globalDisable.checked = false;
                Disabledtxt.innerHTML = eLang.getString("configure_alerts", "STR_CONF_ALERT_GLOBAL_ENABLE_DISABLED").fontcolor("black");
            }
            else
            {
                globalEnable.checked = false;
                globalDisable.checked = true;
                Disabledtxt.innerHTML = eLang.getString("configure_alerts", "STR_CONF_ALERT_GLOBAL_ENABLE_DISABLED").fontcolor("red");
            }
            if (PEFENABLES_DATA[0].PEF_LOG_EVENT_ENABLE)
            {
                eventLogEnable.checked = true;
                eventLogDisable.checked = false;
            }
            else
            {
                eventLogEnable.checked = false;
                eventLogDisable.checked = true;
            }
            xmit.get({url:"/rpc/getalertdests.asp",onrcv:processGetAlertDests, status:''});
		}
		else
        {
            showWait(false);
			alert(eLang.getString('common','STR_CONFIG_ALERTS_GETVAL'));
        }
	}
}

function processGetAlertDests()
{
	var CmdStatus = WEBVAR_JSONVAR_HL_GETALERTDESTS.HAPI_STATUS;
	if (CmdStatus != 0)
	{
        showWait(false);
		errstr = eLang.getString('common','STR_CONFIG_ALERTS_GETVAL');
		errstr +=(eLang.getString('common','STR_IPMI_ERROR') + GET_ERROR_CODE(CmdStatus));
		alert(errstr);
		return;
	} 
	else 
	{
        ALERTDESTS_DATA = WEBVAR_JSONVAR_HL_GETALERTDESTS.WEBVAR_STRUCTNAME_HL_GETALERTDESTS;
        showNewAlertDests();
	}

    showWait(false);
}

function checkAllEvents()
{
    tempEvent.checked = true;
    restartEvent.checked = true;
    fanEvent.checked = true;
    powersupplyEvent.checked = true;
    postEvent.checked = true;
    nodemanagerEvent.checked = true;
    watchdogEvent.checked = true;
    voltageEvent.checked = true;
    intrusionEvent.checked = true;
    memoryEvent.checked = true;
    frbEvent.checked = true;
    harddriveEvent.checked = true;
}

function clearAllEvents()
{
    tempEvent.checked = false;
    restartEvent.checked = false;
    fanEvent.checked = false;
    powersupplyEvent.checked = false;
    postEvent.checked = false;
    nodemanagerEvent.checked = false;
    watchdogEvent.checked = false;
    voltageEvent.checked = false;
    intrusionEvent.checked = false;
    memoryEvent.checked = false;
    frbEvent.checked = false;
    harddriveEvent.checked = false;
}

function disableAllEventCheckboxes()
{
    tempEvent.disabled = true;
    restartEvent.disabled = true;
    fanEvent.disabled = true;
    powersupplyEvent.disabled = true;
    postEvent.disabled = true;
    nodemanagerEvent.disabled = true;
    watchdogEvent.disabled = true;
    voltageEvent.disabled = true;
    intrusionEvent.disabled = true;
    memoryEvent.disabled = true;
    frbEvent.disabled = true;
    harddriveEvent.disabled = true;
}

function showNewAlertDests()
{
    var Channel = lanchannel.value;
	for (i=0; i< ALERTDESTS_DATA.length; ++i)
	{
		if (ALERTDESTS_DATA[i].Channel == Channel)
		{
			if (ALERTDESTS_DATA[i].destSel == 1)
			{
				snmpEnable1.checked = (ALERTDESTS_DATA[i].SnmpEnable) ? true : false;
			    emailEnable1.checked = (ALERTDESTS_DATA[i].EmailEnable) ? true : false;
				snmpAddress1.value = ALERTDESTS_DATA[i].SnmpAddr;
    			emailAddress1.value = ALERTDESTS_DATA[i].EmailAddr;			
			}else if (ALERTDESTS_DATA[i].destSel == 2)
			{
	    		snmpEnable2.checked = (ALERTDESTS_DATA[i].SnmpEnable) ? true : false;
			    emailEnable2.checked = (ALERTDESTS_DATA[i].EmailEnable) ? true : false;
			    snmpAddress2.value = ALERTDESTS_DATA[i].SnmpAddr;
	    		emailAddress2.value = ALERTDESTS_DATA[i].EmailAddr;
			}
		}
	}
    showAlertDests();
}


function showAlertDests()
{
    destChecked[0] = snmpEnable1.checked;
    destChecked[1] = emailEnable1.checked;
    destChecked[2] = snmpEnable2.checked;
    destChecked[3] = emailEnable2.checked;

    if (g_isadmin == 1)
    {
    snmpAddress1.disabled = !snmpEnable1.checked;
    emailAddress1.disabled = !emailEnable1.checked;
    snmpAddress2.disabled = !snmpEnable2.checked;
    emailAddress2.disabled = !emailEnable2.checked;
    }
}


function onSnmpEnable1()
{
    if (destChecked[0])
        snmpEnable1.checked = false;

    if (snmpEnable1.checked  &&  emailEnable1.checked)
        emailEnable1.checked = false;

    showAlertDests();
}

function onEmailEnable1()
{
    if (destChecked[1])
        emailEnable1.checked = false;

    if (snmpEnable1.checked  &&  emailEnable1.checked)
        snmpEnable1.checked = false;

    showAlertDests();
}

function onSnmpEnable2()
{
    if (destChecked[2])
        snmpEnable2.checked = false;

    if (snmpEnable2.checked  &&  emailEnable2.checked)
        emailEnable2.checked = false;

    showAlertDests();
}

function onEmailEnable2()
{
    if (destChecked[3])
        emailEnable2.checked = false;

    if (snmpEnable2.checked  &&  emailEnable2.checked)
        snmpEnable2.checked = false;

    showAlertDests();
}


function validateDestinations()
{
	if (!g_isadmin)
	{
		alert(eLang.getString('common',"STR_CONFIG_ALERTS_PRIV"));
		return 0;
	}

	//Check validity of all the fields
	var err = 0;
	var str = '';
	if (snmpEnable1.checked  &&  !eVal.ip(snmpAddress1.value))
    {
		err = 1; str += '\n- '+eLang.getString('configure_alerts','STR_CONF_ALERT_INVALID_SNMP1');
    }
	if (emailEnable1.checked  &&  !eVal.email(emailAddress1.value))
    {
		err = 1; str += '\n- '+eLang.getString('configure_alerts','STR_CONF_ALERT_INVALID_EMAIL1');
    }
	if (snmpEnable2.checked  &&  !eVal.ip(snmpAddress2.value))
    {
		err = 1; str += '\n- '+eLang.getString('configure_alerts','STR_CONF_ALERT_INVALID_SNMP2');
    }
	if (emailEnable2.checked  &&  !eVal.email(emailAddress2.value))
    {
		err = 1; str += '\n- '+eLang.getString('configure_alerts','STR_CONF_ALERT_INVALID_EMAIL2');
    }

    if (err) {
        alert(eLang.getString('common','STR_APP_STR_141')+str+'\n'+eLang.getString('common','STR_APP_STR_HELP'));
        return 0;
    }
    
    return 1;
}

function saveAlerts()
{
	/* Disable the button here till the request is served */
	saveBtn.disabled=true;

    if (!validateDestinations())
    {
        saveBtn.disabled=false;
        return;
    }

	var p = new xmit.getset({url:'/rpc/setpefenables.asp', onrcv:setPefEnables_Res});

    p.add("WEBVAR_TEMP_EVENT", tempEvent.checked ? 1 : 0);
    p.add("WEBVAR_RESTART_EVENT", restartEvent.checked ? 1 : 0);
    p.add("WEBVAR_FAN_EVENT", fanEvent.checked ? 1 : 0);
    p.add("WEBVAR_POWERSUPPLY_EVENT", powersupplyEvent.checked ? 1 : 0);
    p.add("WEBVAR_POST_EVENT", postEvent.checked ? 1 : 0);
    p.add("WEBVAR_NODEMANAGER_EVENT", nodemanagerEvent.checked ? 1 : 0);
    p.add("WEBVAR_WATCHDOG_EVENT", watchdogEvent.checked ? 1 : 0);
    p.add("WEBVAR_VOLTAGE_EVENT", voltageEvent.checked ? 1 : 0);
    p.add("WEBVAR_INTRUSION_EVENT", intrusionEvent.checked ? 1 : 0);
    p.add("WEBVAR_MEMORY_EVENT", memoryEvent.checked ? 1 : 0);
    p.add("WEBVAR_FRB_EVENT", frbEvent.checked ? 1 : 0);
    p.add("WEBVAR_HARDDRIVE_EVENT", harddriveEvent.checked ? 1 : 0);

    p.add("WEBVAR_LANCHANNEL", lanchannel.value);

    p.add("WEBVAR_DEST_SNMP1", snmpEnable1.checked ? 1 : 0);
    p.add("WEBVAR_DEST_SNMP1_ADDRESS", snmpAddress1.value);
    p.add("WEBVAR_DEST_EMAIL1", emailEnable1.checked ? 1 : 0);
    p.add("WEBVAR_DEST_EMAIL1_ADDRESS", emailAddress1.value);

    p.add("WEBVAR_DEST_SNMP2", snmpEnable2.checked ? 1 : 0);
    p.add("WEBVAR_DEST_SNMP2_ADDRESS", snmpAddress2.value);
    p.add("WEBVAR_DEST_EMAIL2", emailEnable2.checked ? 1 : 0);
    p.add("WEBVAR_DEST_EMAIL2_ADDRESS", emailAddress2.value);

    p.add("WEBVAR_PEF_GLOBAL_ENABLE", globalEnable.checked ? 1 : 0);
    p.add("WEBVAR_PEF_LOG_EVENT_ENABLE", eventLogEnable.checked ? 1 : 0);

	p.send();
	delete p;
}

function setPefEnables_Res()
{
	var CmdStatus = WEBVAR_JSONVAR_HL_SETPEFENABLES.HAPI_STATUS;
	if(CmdStatus)
	{
		errstr = eLang.getString('common','STR_CONFIG_ALERTS_SETVAL');
		errstr +=(eLang.getString('common','STR_IPMI_ERROR') + GET_ERROR_CODE(CmdStatus));
		alert(errstr);
	}
	else
	{
		alert(eLang.getString('common','STR_CONFIG_ALERTS_SAVED'));
	}
	saveBtn.disabled=false;

    getAlertCfg();
}


var Dest1Sent;
var Dest2Sent;

function sendTestAlerts()
{
	/* Disable the button here till the request is served */
	testBtn.disabled=true;

    if (!validateDestinations())
    {
        testBtn.disabled=false;
        return;
    }

    Dest1Sent = false;
    Dest2Sent = false;
    if (snmpEnable1.checked  ||  emailEnable1.checked)
    {
		p = new xmit.getset({url:"/rpc/testalert.asp",onrcv:sendTestAlerts_Res});
        p.add("WEBVAR_LANCHANNEL", lanchannel.value);
        p.add("WEBVAR_DEST_TYPE", (snmpEnable1.checked) ? 0 : 1);
        p.add("WEBVAR_DEST_ADDRESS", (snmpEnable1.checked) ? snmpAddress1.value : emailAddress1.value);
        p.send();
        delete p;

        Dest1Sent = true;
    }
    else
        sendTestAlert2();
}

function sendTestAlerts_Res()
{
	var CmdStatus = WEBVAR_JSONVAR_IPMICMD_ALERTIMMEDIATE.HAPI_STATUS;
	if(CmdStatus)
	{
		errstr = eLang.getString('configure_alerts','STR_CONF_ALERT_TEST_FAILED');
		errstr +=(eLang.getString('common','STR_IPMI_ERROR') + GET_ERROR_CODE(CmdStatus));
		alert(errstr);

        testBtn.disabled = false;
        return;
	}

    sendTestAlert2();
}

function sendTestAlert2()
{
    if (snmpEnable2.checked  || emailEnable2.checked)
    {
		p = new xmit.getset({url:"/rpc/testalert.asp",onrcv:sendTestAlert2_Res});
        p.add("WEBVAR_LANCHANNEL", lanchannel.value);
        p.add("WEBVAR_DEST_TYPE", (snmpEnable2.checked) ? 0 : 1);
        p.add("WEBVAR_DEST_ADDRESS", (snmpEnable2.checked) ? snmpAddress2.value : emailAddress2.value);
        p.send();
        delete p;

        Dest2Sent = true;
    }
    else
        sendTestAlertsDone();
}

function sendTestAlert2_Res()
{
	var CmdStatus = WEBVAR_JSONVAR_IPMICMD_ALERTIMMEDIATE.HAPI_STATUS;
	if(CmdStatus)
	{
		errstr = eLang.getString('configure_alerts','STR_CONF_ALERT_TEST_FAILED');
		errstr +=(eLang.getString('common','STR_IPMI_ERROR') + GET_ERROR_CODE(CmdStatus));
		alert(errstr);

        testBtn.disabled = false;
        return;
	}

    sendTestAlertsDone();
}

function sendTestAlertsDone()
{
    var str;
    if (Dest1Sent  &&  Dest2Sent)
        str = eLang.getString('configure_alerts', "STR_CONF_ALERT_TEST_DEST_BOTH");
    else if (Dest1Sent)
        str = eLang.getString('configure_alerts', "STR_CONF_ALERT_TEST_DEST1");
    else if (Dest2Sent)
        str = eLang.getString('configure_alerts', "STR_CONF_ALERT_TEST_DEST2");
    else
        str = eLang.getString('configure_alerts', "STR_CONF_ALERT_TEST_DEST_NONE");

    alert(str);
    testBtn.disabled = false;
}
