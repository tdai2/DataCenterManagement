var isIE = ((navigator.appName.indexOf('Microsoft')>=0)?true:false);
var g_isadmin = 0;
var PolicyListTable;
var PolicyDomainTable = new Array();
var PolicyTriggerTable = new Array();
var PolicyTriggerLimitTable = new Array();
var PolicyCPUaggressiveTable = new Array();
var PolicyPeriodTable = new Array();
var PolicyCorrectionTable = new Array();
var TimerViewType = "suspend";

function doInit() {
    exposeElms([
                '_PolicyListHolder',
                '_saveBtn', '_deleteBtn', '_cancelBtn',
                '_inputPolicy', '_inputEnabled', '_inputShutdown',  '_inputAlert',
                '_inputPowerLimit',
                '_powerUnits',
                '_useSuspendYes', '_useSuspendNo', '_SuspendView', '_viewSuspendTimes', '_viewEnableTimes', '_suspendPoliciesOuter',
                '_SuspendType','_SuspendTypeExpanation',
                '_inputUseSus1', '_inputSusStartHrs1', '_inputSusStartMins1', '_inputSusEndHrs1', '_inputSusEndMins1', '_inputSusMon1', '_inputSusTue1', '_inputSusWed1', '_inputSusThu1', '_inputSusFri1', '_inputSusSat1', '_inputSusSun1',
                '_inputUseSus2', '_inputSusStartHrs2', '_inputSusStartMins2', '_inputSusEndHrs2', '_inputSusEndMins2', '_inputSusMon2', '_inputSusTue2', '_inputSusWed2', '_inputSusThu2', '_inputSusFri2', '_inputSusSat2', '_inputSusSun2',
                '_inputUseSus3', '_inputSusStartHrs3', '_inputSusStartMins3', '_inputSusEndHrs3', '_inputSusEndMins3', '_inputSusMon3', '_inputSusTue3', '_inputSusWed3', '_inputSusThu3', '_inputSusFri3', '_inputSusSat3', '_inputSusSun3',
                '_inputUseSus4', '_inputSusStartHrs4', '_inputSusStartMins4', '_inputSusEndHrs4', '_inputSusEndMins4', '_inputSusMon4', '_inputSusTue4', '_inputSusWed4', '_inputSusThu4', '_inputSusFri4', '_inputSusSat4', '_inputSusSun4',
                '_inputUseSus5', '_inputSusStartHrs5', '_inputSusStartMins5', '_inputSusEndHrs5', '_inputSusEndMins5', '_inputSusMon5', '_inputSusTue5', '_inputSusWed5', '_inputSusThu5', '_inputSusFri5', '_inputSusSat5', '_inputSusSun5'
                ]);

    saveBtn.value = eLang.getString("configure_nodemanager", "STR_CONF_NM_SAVE");
    deleteBtn.value = eLang.getString("configure_nodemanager", "STR_CONF_NM_DELETE");
    cancelBtn.value = eLang.getString("configure_nodemanager", "STR_CONF_NM_CANCEL");

    checkRole();

    saveBtn.onclick = setNMpolicy;
    deleteBtn.onclick = deletePolicy;
    cancelBtn.onclick = handleCancel;
    PolicyListHolder.onclick = readTableClick;

    document.getElementById("_SuspendView").style.display = "none";
    document.getElementById("_SuspendType").style.display = "none";
    document.getElementById("_inputUseSus1").onclick = toggleSuspendTimer;
    document.getElementById("_inputUseSus2").onclick = toggleSuspendTimer;
    document.getElementById("_inputUseSus3").onclick = toggleSuspendTimer;
    document.getElementById("_inputUseSus4").onclick = toggleSuspendTimer;
    document.getElementById("_inputUseSus5").onclick = toggleSuspendTimer;
    useSuspendYes.onclick = showSuspendTables;
    useSuspendYes.checked = false;
    useSuspendNo.onclick = hideSuspendTables;
    useSuspendNo.checked = true;
    viewSuspendTimes.onclick = translateAllEnableToSuspend;
    viewSuspendTimes.checked = true;
    viewEnableTimes.onclick = translateAllSuspendToEnable;
    viewEnableTimes.checked = false;
    document.getElementById("_inputSusEndHrs1").onchange = function(){limitTimeRange(1)};
    document.getElementById("_inputSusEndHrs2").onchange = function(){limitTimeRange(2)};
    document.getElementById("_inputSusEndHrs3").onchange = function(){limitTimeRange(3)};
    document.getElementById("_inputSusEndHrs4").onchange = function(){limitTimeRange(4)};
    document.getElementById("_inputSusEndHrs5").onchange = function(){limitTimeRange(5)};

    populateTimes();
    hideSuspendTables();
}

function checkRole()
{
    xmit.get({url:'/rpc/getrole.asp', onrcv:onCheckRole, status:''});
}

function onCheckRole()
{
    if(WEBVAR_JSONVAR_GET_ROLE.WEBVAR_STRUCTNAME_GET_ROLE[0]['CURPRIV'] != 4)
    {
        // User is not an administrator. Disallow any and all actions.
        g_isadmin = 0;
        disableAllInputs();

		location.href = 'config_nav.html';
		return;

    }
    else
    {
        // User is an administrator. Continue as normal.
        g_isadmin = 1;
        getNMCfg();
        loadtable();
    }
}

/******************************************************************************
 *
 *  disableAllInputs
 *
 *   Disables (greys-out) all input boxes and buttons.
 *
 *  Arguments: None
 *
 *  Return Value: None
 *
 ******************************************************************************/
function disableAllInputs()
{
    saveBtn.disabled = true;
    deleteBtn.disabled = true;
    cancelBtn.disabled = true;
    inputPowerLimit.disabled = true;
    inputPolicy.disabled = true;
    inputEnabled.disabled = true;
    inputShutdown.disabled = true;
    inputAlert.disabled = true;
    useSuspendYes.disabled = true;
    useSuspendNo.disabled = true;
}

/******************************************************************************
 *
 *  getNMCfg
 *
 *   Reads all available node manager policies.
 *
 *  Arguments: None
 *
 *  Return Value: None
 *
 ******************************************************************************/
function getNMCfg()
{
    showWait(true);
    xmit.get({url:"/rpc/getnmconfig.asp",onrcv:processNMCfg, status:''});
}

/******************************************************************************
 *
 *  processNMCfg
 *
 *   Takes response from getNMCfg and displays the policies in a table.
 *
 *  Arguments: JSON response (array).
 *
 *  Return Value: None
 *
 ******************************************************************************/
function processNMCfg()
{
    var JSONRows = new Array();
    var CmdStatus = WEBVAR_JSONVAR_GETNMPOLICY.HAPI_STATUS;

    if ((0x0000 != CmdStatus) &&
        (0x0180 != CmdStatus) &&
        (0x0181 != CmdStatus) )
    {
        // Communications or other error.
        alert(eLang.getString('common',"STR_APP_STR_418"));
        PolicyListTable.clear();
        clearEditFields();
        hideSuspendTables();
        clearSuspendBoxes();
        showWait(false);
        return;
    }

    NMPOLICYDATA = WEBVAR_JSONVAR_GETNMPOLICY.WEBVAR_STRUCTNAME_GETNMPOLICY;

    // Clear the table, otherwise we'll end up adding stuff onto the end on every refresh.
    PolicyListTable.clear();

    for (i=0; i<NMPOLICYDATA.length; i++)
    {
        // Translate the return from the RPC into something human-readable.
        var_policy =    NMPOLICYDATA[i].u8policyNum;                    // Just a number

        PolicyDomainTable[var_policy] = NMPOLICYDATA[i].u8domainNum;    // Store (potentially) externally-set Domain.

        if ( 0x00 != PolicyDomainTable[var_policy] )
        {
            // Indicate an externally-set policy.
            var_policy += "*";
        }

        var_enabled =   (NMPOLICYDATA[i].bEnabled == 1)?"Y":"N";        // bool

        PolicyTriggerTable[var_policy] = NMPOLICYDATA[i].u8trigger;     // Store (potentially) externally-set Trigger.

        var_type = (NMPOLICYDATA[i].bType == 1)?"PWR":"N";              // bool

        PolicyCPUaggressiveTable[var_policy] = NMPOLICYDATA[i].u8aggressive;  // Store (potentially) externally-set CPU Aggressive Throttling.

        var_shutdown =     (NMPOLICYDATA[i].bShutdown == 1)?"Y":"N";          // bool
        var_alert =        (NMPOLICYDATA[i].bAlert == 1)?"Y":"N";             // bool
        var_powerlimit =    NMPOLICYDATA[i].u16powerlimit;                    // Just a number
        PolicyTriggerLimitTable[var_policy] = NMPOLICYDATA[i].u16triggerlimit;// Store (potentially) externally-set Trigger Limit.
        var_numSuspendPeriods = NMPOLICYDATA[i].u8numPeriods;                 // Just a number
        PolicyPeriodTable[var_policy] = NMPOLICYDATA[i].u16period;            // Store (potentially) externally-set Reporting Period.
        PolicyCorrectionTable[var_policy] = NMPOLICYDATA[i].u32correction;    // Store (potentially) externally-set Correction Period.

        // Populate our faux-table. The order here must match the order we set-up in the loadtable function.
        try{
            JSONRows.push({cells:[
                                  /* policy */        {text:var_policy,           value:var_policy},
                                  /* time */          {text:var_numSuspendPeriods,value:var_numSuspendPeriods},
                                  /* enabled */       {text:var_enabled,          value:var_enabled},
                                  /* shutdown */      {text:var_shutdown,         value:var_shutdown},
                                  /* alert */         {text:var_alert,            value:var_alert},
                                  /* powerlimit */    {text:var_powerlimit,       value:var_powerlimit}
                                  ]});
        }catch(e)
        {
            alert(e);
        }
    }

    // Drop our faux-table into the real table on the page.
    tblJSON.rows = JSONRows;
    PolicyListTable.loadFromJson(tblJSON);

    // Done processing.
    clearEditFields();
    hideSuspendTables();
    clearSuspendBoxes();
    showWait(false);
}

/******************************************************************************
 *
 *  handleCancel
 *
 *   Called when the "cancel" button is pressed. Clears input fields on confirm.
 *
 *  Arguments: None
 *
 *  Return Value: None
 *
 ******************************************************************************/
function handleCancel()
{
    if (true == confirm(eLang.getString("configure_nodemanager","STR_CONF_NM_CONFIRM_CANCEL")))
    {
        // User confirmed the action.
        getNMCfg();
        clearEditFields();
        hideSuspendTables();
        clearSuspendBoxes();
    }
    else
    {
        // User didn't confirm.
        return;
    }
}

/******************************************************************************
 *
 *  setNMpolicy
 *
 *   Reads all input data, does basic sanity checking, and passes settings down
 *   to the BMC to be formatted and sent to the node manager. Called when the
 *   "save" button is pressed.
 *
 *  Arguments: None
 *
 *  Return Value: None
 *
 ******************************************************************************/
function setNMpolicy()
{
    if(TimerViewType != "suspend")
    {
    	if (-1 == translateAllEnableToSuspend())
    	{
    		alert(eLang.getString("configure_nodemanager","STR_CONF_NM_SUS_SUSPENDED_SAVE_ERROR"));
    		return;
    	}
    }
    if (true == confirm(eLang.getString("configure_nodemanager","STR_CONF_NM_CONFIRM_SET")))
    {
        // User confirmed the action.
        showWait(true);

        // Make sure the policy value from the user is within bounds.
        if( (isNaN(inputPolicy.value)) ||
                (inputPolicy.value == "")  ||
                (inputPolicy.value < 0)    ||
                (inputPolicy.value > 255)   )
        {
            alert(eLang.getString("configure_nodemanager","STR_CONF_NM_ERROR_POLICY"));
            showWait(false);
            return;
        }
        else
        {
            u8policy = inputPolicy.value;
        }

        // Checkboxes are naturally bound-checked.
        bEnabled = (true == inputEnabled.checked)? 1:0;
        bShutdown = (true == inputShutdown.checked)? 1:0;
        bAlert = (true == inputAlert.checked)? 1:0;

        // Handle externally-set Domain values.
        if (undefined != PolicyDomainTable[u8policy])
        {
            u8domain = PolicyDomainTable[u8policy];
        }
        else
        {
            u8domain = 0;
        }

        // Handle externally-set Trigger values.
        if (undefined != PolicyTriggerTable[u8policy])
        {
            u8TrigType = PolicyTriggerTable[u8policy];
        }
        else
        {
            u8TrigType = 0;
        }

        // Handle externally-set CPU Aggressive Throttling values.
        if (undefined != PolicyCPUaggressiveTable[u8policy])
        {
            u8Aggressive = PolicyCPUaggressiveTable[u8policy];
        }
        else
        {
            u8Aggressive = 0;
        }

        // Bound check power limit.
        if( (isNaN(inputPowerLimit.value)) ||
                (inputPowerLimit.value == "")    )
        {
            alert(eLang.getString("configure_nodemanager","STR_CONF_NM_ERROR_PWRLIMIT"));
            showWait(false);
            return;
        }
        else
        {
            u16powerLimit = inputPowerLimit.value;
        }

        // Handle externally-set Trigger Limit values.
        if (undefined != PolicyTriggerLimitTable[u8policy])
        {
            u16triggerLimit = PolicyTriggerLimitTable[u8policy];
        }
        else
        {
            u16triggerLimit = 0;
        }

        // Handle externally-set Reporting Period values.
        if (undefined != PolicyPeriodTable[u8policy])
        {
            u16period = PolicyPeriodTable[u8policy];
        }
        else
        {
            u16period = 10;  // Safe default from ASC.
        }

        // Handle externally-set Correction Time values.
        if (undefined != PolicyCorrectionTable[u8policy])
        {
            u32correction = PolicyCorrectionTable[u8policy];
        }
        else
        {
            u32correction = 22555; // Safe default from ASC.
        }

        // Read-in values from the user's fields, and pass it downstream.
        var p = new xmit.getset({url:'/rpc/setsinglenmpolicy.asp', onrcv:handleSaveResponse});
        p.add("WEBVAR_POLICY", u8policy);
        p.add("WEBVAR_ENABLED", bEnabled);
        p.add("WEBVAR_SHUTDOWN", bShutdown);
        p.add("WEBVAR_ALERT", bAlert);
        p.add("WEBVAR_DOMAIN", u8domain);
        p.add("WEBVAR_TRIGGER", u8TrigType);
        p.add("WEBVAR_AGGRESSIVE", u8Aggressive);
        p.add("WEBVAR_POWERLIMIT", u16powerLimit);
        p.add("WEBVAR_TRIGGERLIMIT", u16triggerLimit);
        p.add("WEBVAR_PERIOD", u16period);
        p.add("WEBVAR_CORRECTION", u32correction);

        // Handle suspend periods
        var i = 0;
        var j = 0;
        var u8numSuspendPeriods = 0;
        var u8dayMask = 0;
        var u8startTime = 0;
        var u8endTime = 0;
        for (i=0; i<5; i++)
        {
            var useSuspend = "_inputUseSus" + (i+1);
            var startTimeHrs = "_inputSusStartHrs" + (i + 1);
            var startTimeMins = "_inputSusStartMins" + (i + 1);
            var endTimeHrs = "_inputSusEndHrs" + (i + 1);
            var endTimeMins = "_inputSusEndMins" + (i + 1);
            var monday = "_inputSusMon" + (i + 1);
            var tuesday = "_inputSusTue" + (i + 1);
            var wednesday = "_inputSusWed" + (i + 1);
            var thursday = "_inputSusThu" + (i + 1);
            var friday = "_inputSusFri" + (i + 1);
            var saturday = "_inputSusSat" + (i + 1);
            var sunday = "_inputSusSun" + (i + 1);

            if(document.getElementById(useSuspend).checked == true)
            {
                u8numSuspendPeriods++;
                u8startTime = getRawTimeVal(startTimeHrs, startTimeMins);
                u8endTime = getRawTimeVal(endTimeHrs, endTimeMins);

                if (u8endTime <= u8startTime)
                {
                    alert(eLang.getString("configure_nodemanager","STR_CONF_NM_ERROR_FIXPERIODS"));
                    delete p;
                    showWait(false);
                    p.onrcv = nullFunction;
                    return;
                }

                u8dayMask = getRawDayMask(i + 1);

                var rpcStartTime = "WEBVAR_NUM_SUSPEND_START" + (j + 1);
                var rpcEndTime = "WEBVAR_NUM_SUSPEND_END" + (j + 1);
                var rpcDays = "WEBVAR_NUM_SUSPEND_DAYS" + (j + 1);

                p.add(rpcStartTime, u8startTime);
                p.add(rpcEndTime, u8endTime);
                p.add(rpcDays, u8dayMask);
                j++;
            }
        }
        p.add("WEBVAR_NUM_SUSPEND_PERIODS", u8numSuspendPeriods);

        p.send();
        delete p;
        showWait(false);
    }
    else
    {
        // User didn't confirm.
        return;
    }
}

/******************************************************************************
 *
 *  handleSaveResponse
 *
 *   Confirms to the user that a specific policy has been saved. Also calls
 *   to reload table.
 *
 *  Arguments: JSON response.
 *
 *  Return Value: None
 *
 ******************************************************************************/
function handleSaveResponse()
{
    RESPONSE = WEBVAR_JSONVAR_SAVENMPOLICYRESPONSE.WEBVAR_STRUCTNAME_SAVENMPOLICYRESPONSE;

    switch(RESPONSE[0].CompletionCode)
    {
        case 0x00:
        {
            // Success.
            alert(eLang.getString("configure_nodemanager","STR_CONF_NM_SET_SUCCESS") + " " + RESPONSE[0].u8policy);
            break;
        }
        case 0x80:
        {
            // Invalid policy number.
            alert(eLang.getString("configure_nodemanager","STR_CONF_NM_ERROR_POLICY"));
            break;
        }
        case 0x81:
        {
            // Invalid domain.
            alert(eLang.getString("configure_nodemanager","STR_CONF_NM_ERROR_DOMAIN"));
            break;
        }
        case 0x82:
        {
            // Invalid trigger.
            alert(eLang.getString("configure_nodemanager","STR_CONF_NM_ERROR_TRIGGER"));
            break;
        }
        case 0x83:
        {
            // Invalid policy type.
            alert(eLang.getString("configure_nodemanager","STR_CONF_NM_ERROR_POLICYTYPE"));
            break;
        }
        case 0x84:
        {
            // Invalid power limit.
            alert(eLang.getString("configure_nodemanager","STR_CONF_NM_ERROR_PWRLIMIT"));
            break;
        }
        case 0x85:
        {
            // Invalid correction time.
            alert(eLang.getString("configure_nodemanager","STR_CONF_NM_ERROR_CORRTIME"));
            break;
        }
        case 0x86:
        {
            // Invalid policy trigger limit.
            alert(eLang.getString("configure_nodemanager","STR_CONF_NM_ERROR_TRIGLIMIT"));
            break;
        }
        case 0x89:
        {
            // Invalid stat reporting period.
            alert(eLang.getString("configure_nodemanager","STR_CONF_NM_ERROR_REPORTPERIOD"));
            break;
        }
        case 0x8B:
        {
            // Invalid aggressive CPU type.
            alert(eLang.getString("configure_nodemanager","STR_CONF_NM_ERROR_AGGRESSIVE"));
            break;
        }
        case 0xC4:
        {
            // Out of space.
            alert(eLang.getString("configure_nodemanager","STR_CONF_NM_ERROR_NOSPACE"));
            break;
        }
        case 0xD5:
        {
            // Policy already enabled.
            alert(eLang.getString("configure_nodemanager","STR_CONF_NM_ERROR_ALREADYENABLED"));
            break;
        }
        default:
        {
            // General failure.
            alert(eLang.getString("configure_nodemanager","STR_CONF_NM_SET_FAILURE"));
            break;
        }
    }

    switch(RESPONSE[0].SuspendCompletionCode)
    {
        case 0x00:
        {
            // Success.
            // Don't display a message just for setting a suspend period.
            break;
        }
        case 0x85:
        {
            // Table inconsistent.
            alert(eLang.getString("configure_nodemanager","STR_CONF_NM_ERROR_SUSPENDINCONSISTENT"));
            break;
        }
        case 0x87:
        {
            // Number of suspend periods invalid.
            alert(eLang.getString("configure_nodemanager","STR_CONF_NM_ERROR_NUMSUSPENDINVALID"));
            break;
        }
        default:
        {
            // General failure.
            break;
        }
    }


    getNMCfg();
}

/******************************************************************************
 *
 *  deletePolicy
 *
 *   Deletes the specified policy. Called when the "delete" button is pressed.
 *
 *  Arguments: None
 *
 *  Return Value: None
 *
 ******************************************************************************/
function deletePolicy()
{
    if (true == confirm(eLang.getString("configure_nodemanager","STR_CONF_NM_CONFIRM_DELETE")))
    {
        // User confirmed the action.
        showWait(true);
        var p = new xmit.getset({url:'/rpc/deletesinglenmpolicy.asp', onrcv:handleDeleteResponse});

        // Make sure the policy value from the user is within bounds and not blank.
        if ((inputPolicy.value >= 0) && (inputPolicy.value <= 255) &&
                (inputPolicy.value != "")                                )
        {
            u8policy = inputPolicy.value;
        }
        else
        {
            alert(eLang.getString("configure_nodemanager","STR_CONF_NM_ERROR_POLICY"));
            delete p;
            return;
        }

        u8domain = 0;

        p.add("WEBVAR_POLICY", u8policy);
        p.add("WEBVAR_DOMAIN", PolicyDomainTable[u8policy]);
        p.send();
        delete p;
    }
    else
    {
        // User didn't confirm.
        return;
    }
}

/******************************************************************************
 *
 *  handleDeleteResponse
 *
 *   Confirms to the user that a specific policy has been deleted. Also calls
 *   to reload table.
 *
 *  Arguments: JSON response.
 *
 *  Return Value: None
 *
 ******************************************************************************/
function handleDeleteResponse()
{
    RESPONSE = WEBVAR_JSONVAR_DELETENMPOLICYRESPONSE.WEBVAR_STRUCTNAME_DELETENMPOLICYRESPONSE;

    switch(RESPONSE[0].CompletionCode)
    {
        case 0x00:
        {
            // Success.
            alert(eLang.getString("configure_nodemanager","STR_CONF_NM_DELETE_SUCCESS") + " " + RESPONSE[0].u8policy);
            break;
        }
        case 0x80:
        {
            // Invalid policy number.
            alert(eLang.getString("configure_nodemanager","STR_CONF_NM_ERROR_POLICY"));
            break;
        }
        default:
        {
            // General failure.
            alert(eLang.getString("configure_nodemanager","STR_CONF_NM_DELETE_FAILURE"));
            break;
        }
    }

    getNMCfg();
}

/******************************************************************************
 *
 *  loadtable
 *
 *   Table functions.
 *
 *  Arguments: None
 *
 *  Return Value: None
 *
 ******************************************************************************/
function loadtable()
{
    PolicyListTable = listgrid({
        w               : '75%',
        h               : '',
        doAllowNoSelect : false
    });
    PolicyListHolder.appendChild(PolicyListTable.table);

    /* If there is a listgrid embed in the page,
     ** please don't use resize event directly
     ** Use only via lGrid.onpageresize event
     */
    PolicyListTable.onpageresize = function()
            {
        this.table.style.width = '600px';
        this.table.style.width = this.container.header.offsetWidth+'px';
            }

    try{

        tblJSON = {
                cols:[
                      {text:eLang.getString("configure_nodemanager","STR_CONF_NM_POLICY"),     fieldName:'policy', fieldType:2, w:'15%', textAlign:'center'},
                      {text:eLang.getString("configure_nodemanager","STR_CONF_NM_TIMER"),      fieldName:'timer',               w:'15%', textAlign:'center'},
                      {text:eLang.getString('configure_nodemanager',"STR_CONF_NM_ENABLED"),    fieldName:'enabled',             w:'15%', textAlign:'center'},
                      {text:eLang.getString('configure_nodemanager',"STR_CONF_NM_SHUTDOWN"),   fieldName:'shutdown',            w:'15%', textAlign:'center'},
                      {text:eLang.getString('configure_nodemanager',"STR_CONF_NM_ALERT"),      fieldName:'alert',               w:'15%', textAlign:'center'},
                      {text:eLang.getString('configure_nodemanager',"STR_CONF_NM_PWRLIMIT"),   fieldName:'powerlimit',          w:'25%', textAlign:'right'}
                      ]
        };

        PolicyListTable.loadFromJson(tblJSON);
    }catch(e)
    {
        alert(e);
    }

}

/******************************************************************************
 *
 *  clearEditFields
 *
 *   Clears all editable fields.
 *
 *  Arguments: None
 *
 *  Return Value: None
 *
 ******************************************************************************/
function clearEditFields()
{
    inputPolicy.value = "";
    inputEnabled.checked = false;
    inputShutdown.checked = false;
    inputAlert.checked = false;
    inputPowerLimit.value = "";
    useSuspendYes.checked = false;
    useSuspendNo.checked = true;
    viewSuspendTimes.checked = true;
    viewEnableTimes.checked = false;
}

/******************************************************************************
 *
 *  readTableClick
 *
 *   Handles table clicks.
 *
 *  Arguments: None
 *
 *  Return Value: None
 *
 ******************************************************************************/
function readTableClick()
{
    if (PolicyListTable.selected.length != 1)
    {
        return;
    }
    else if (isNaN(parseInt(PolicyListTable.getRow(PolicyListTable.selected[0]).cells[0].innerHTML)))
    {
        // Table header was clicked (likely to re-order it). Do nothing.
        return;
    }
    else
    {
        // A valid row was selected. Populate some of the edit boxes.
        inputPolicy.value = parseInt(PolicyListTable.getRow(PolicyListTable.selected[0]).cells[0].innerHTML);

        if (undefined != PolicyDomainTable[inputPolicy.value])
        {
            getSpecifiedNMPolicy(inputPolicy.value, PolicyDomainTable[inputPolicy.value]);
        }
    }
}

/******************************************************************************
 *
 *  getSpecifiedNMPolicy
 *
 *   Reads a specific policy from the node manager. This is generally a result
 *   of clicking on a table row.
 *
 *  Arguments: u8policy - the policy number to query
 *             u8domain - the domain number to query
 *
 *  Return Value: None
 *
 ******************************************************************************/
function getSpecifiedNMPolicy(u8policy, u8domain)
{
    var p = new xmit.getset({url:'/rpc/getspecificnmpolicy.asp', onrcv:populateEditBoxes});

    p.add("WEBVAR_POLICY", u8policy);
    p.add("WEBVAR_DOMAIN", u8domain);
    p.send();
    delete p;
}

/******************************************************************************
 *
 *  getNMSuspendPeriods
 *
 *   Reads a specific policy's suspend periods from the node manager. This is
 *   generally a result of clicking on a table row.
 *
 *  Arguments: u8policy - the policy number to query
 *             u8domain - the domain number to query
 *
 *  Return Value: None
 *
 ******************************************************************************/
function getNMSuspendPeriods(u8policy, u8domain)
{
    var p = new xmit.getset({url:'/rpc/getnmsuspendperiods.asp', onrcv:populateSuspendBoxes});

    p.add("WEBVAR_POLICY", u8policy);
    p.add("WEBVAR_DOMAIN", u8domain);
    p.send();
    delete p;
}

/******************************************************************************
 *
 *  populateEditBoxes
 *
 *   Takes a single NM policy and populates the editable boxes with the data.
 *   Called upon return of getSpecifiedNMPolicy.
 *
 *  Arguments: JSON response.
 *
 *  Return Value: None
 *
 ******************************************************************************/
function populateEditBoxes()
{
    // Received policy data; translate it into our edit boxes.
    SINGLENMPOLICY = WEBVAR_JSONVAR_GETSINGLENMPOLICY.WEBVAR_STRUCTNAME_GETSINGLENMPOLICY;

    inputPolicy.value = SINGLENMPOLICY[0].u8policyNum;
    inputEnabled.checked = (1 == SINGLENMPOLICY[0].bEnabled)?true:false;
    inputShutdown.checked = (1 == SINGLENMPOLICY[0].bShutdown)?true:false;
    inputAlert.checked = (1 == SINGLENMPOLICY[0].bAlert)?true:false;

    inputPowerLimit.value = SINGLENMPOLICY[0].u16powerlimit;

    if((SINGLENMPOLICY[0].u8numPeriods > 0) && (SINGLENMPOLICY[0].u8numPeriods < 6))
    {
        clearSuspendBoxes();
        getNMSuspendPeriods(SINGLENMPOLICY[0].u8policyNum, SINGLENMPOLICY[0].u8domainNum);
    }
    else
    {
        clearSuspendBoxes();
        hideSuspendTables();
        toggleSuspendTimer();
    }
}

/******************************************************************************
 *
 *  populateSuspendBoxes
 *
 *   Takes a single NM policy's suspend periods and populates the editable boxes
 *   with the data. Called when getSpecifiedNMPolicy finds suspend periods.
 *
 *  Arguments: JSON response.
 *
 *  Return Value: None
 *
 ******************************************************************************/
function populateSuspendBoxes()
{
    var i;
    SUSPENDPERIODS = WEBVAR_JSONVAR_GETSUSPENDPERIODS.WEBVAR_STRUCTNAME_GETSUSPENDPERIODS;

    for (i=0; i< SUSPENDPERIODS[0].u8numPeriods; i++)
    {
        var useSuspend = "_inputUseSus" + (i+1);
        var startTimeHrs = "_inputSusStartHrs" + (i + 1);
        var startTimeMins = "_inputSusStartMins" + (i + 1);
        var endTimeHrs = "_inputSusEndHrs" + (i + 1);
        var endTimeMins = "_inputSusEndMins" + (i + 1);
        var monday = "_inputSusMon" + (i + 1);
        var tuesday = "_inputSusTue" + (i + 1);
        var wednesday = "_inputSusWed" + (i + 1);
        var thursday = "_inputSusThu" + (i + 1);
        var friday = "_inputSusFri" + (i + 1);
        var saturday = "_inputSusSat" + (i + 1);
        var sunday = "_inputSusSun" + (i + 1);
        enableIndividualSuspend(i + 1);
        document.getElementById(useSuspend).checked= true;
        document.getElementById(monday).checked    = (SUSPENDPERIODS[i].u8dayMask & 0x01) ? true:false;
        document.getElementById(tuesday).checked   = (SUSPENDPERIODS[i].u8dayMask & 0x02) ? true:false;
        document.getElementById(wednesday).checked = (SUSPENDPERIODS[i].u8dayMask & 0x04) ? true:false;
        document.getElementById(thursday).checked  = (SUSPENDPERIODS[i].u8dayMask & 0x08) ? true:false;
        document.getElementById(friday).checked    = (SUSPENDPERIODS[i].u8dayMask & 0x10) ? true:false;
        document.getElementById(saturday).checked  = (SUSPENDPERIODS[i].u8dayMask & 0x20) ? true:false;
        document.getElementById(sunday).checked    = (SUSPENDPERIODS[i].u8dayMask & 0x40) ? true:false;
        setTimeVal(SUSPENDPERIODS[i].u8start, startTimeHrs, startTimeMins);
        setTimeVal(SUSPENDPERIODS[i].u8end, endTimeHrs, endTimeMins);
        limitTimeRange(i+1);
    }
    for (i=SUSPENDPERIODS[0].u8numPeriods; i<5; i++)
    {
        var useSuspend = "_inputUseSus" + (i+1);
        document.getElementById(useSuspend).checked= false;
        disableIndividualSuspend(i + 1);
    }
    showSuspendTables();
    TimerViewType = "suspend";
    translateAllSuspendToEnable();
}

/******************************************************************************
 *
 *  clearSuspendBoxes
 *
 *   Clears all policy suspend timer input boxes.
 *
 *  Arguments: None
 *
 *  Return Value: None
 *
 ******************************************************************************/
function clearSuspendBoxes()
{
    var i;
    for (i=1; i <= 5; i++)
    {
        var useSuspend = "_inputUseSus" + (i);
        var startTimeHrs = "_inputSusStartHrs" + (i);
        var startTimeMins = "_inputSusStartMins" + (i);
        var endTimeHrs = "_inputSusEndHrs" + (i);
        var endTimeMins = "_inputSusEndMins" + (i);
        var monday = "_inputSusMon" + (i);
        var tuesday = "_inputSusTue" + (i);
        var wednesday = "_inputSusWed" + (i);
        var thursday = "_inputSusThu" + (i);
        var friday = "_inputSusFri" + (i);
        var saturday = "_inputSusSat" + (i);
        var sunday = "_inputSusSun" + (i);
        document.getElementById(useSuspend).checked= false;
        document.getElementById(monday).checked    = false;
        document.getElementById(tuesday).checked   = false;
        document.getElementById(wednesday).checked = false;
        document.getElementById(thursday).checked  = false;
        document.getElementById(friday).checked    = false;
        document.getElementById(saturday).checked  = false;
        document.getElementById(sunday).checked    = false;
        document.getElementById(startTimeHrs).value = 0;
        document.getElementById(startTimeMins).value = 0;
        document.getElementById(endTimeHrs).value     = 0;
        document.getElementById(endTimeMins).value = 0;
    }

}

function showSuspendTables()
{
    useSuspendYes.checked = true;
    useSuspendNo.checked = false;
    document.getElementById("_SuspendView").style.display = "";
    document.getElementById("_suspendPoliciesOuter").style.display = "";
    document.getElementById("_SuspendType").style.display = "";
}

function hideSuspendTables()
{
    var i = 0;
    useSuspendYes.checked = false;
    useSuspendNo.checked = true;
    document.getElementById("_SuspendView").style.display = "none";
    document.getElementById("_suspendPoliciesOuter").style.display = "none";
    document.getElementById("_SuspendType").style.display = "none";
    for (i=1; i<=5; i++)
    {
        var useSuspend = "_inputUseSus" + (i);
        document.getElementById(useSuspend).checked = false;
    }
    toggleSuspendTimer();
}

function populateTimes()
{
    var i,j;
    var time_hrs_start = new Array("00","01","02","03","04","05","06","07","08","09","10","11","12","13","14","15","16","17","18","19","20","21","22","23");
    var time_hrs_end = new Array("00","01","02","03","04","05","06","07","08","09","10","11","12","13","14","15","16","17","18","19","20","21","22","23","24");
    var time_mins = new Array("00","06","12","18","24","30","36","42","48","54");
    var optind = 0;

    for (i=1; i<=5; i++)
    {
        var startTimeHrs = "_inputSusStartHrs" + (i);
        var startTimeMins = "_inputSusStartMins" + (i);
        var endTimeHrs = "_inputSusEndHrs" + (i);
        var endTimeMins = "_inputSusEndMins" + (i);
        for (j=0; j < time_hrs_start.length; j++)
        {
            document.getElementById(startTimeHrs).add(new Option(time_hrs_start[j], j), isIE?optind++:null);
        }
        for (j=0; j < time_hrs_end.length; j++)
        {
            document.getElementById(endTimeHrs).add(new Option(time_hrs_end[j], j), isIE?optind++:null);
        }
        for (j=0; j < time_mins.length; j++)
        {
            document.getElementById(startTimeMins).add(new Option(time_mins[j], j), isIE?optind++:null);
            document.getElementById(endTimeMins).add(new Option(time_mins[j], j), isIE?optind++:null);
        }
    }
}

function setTimeVal(u8RawTime, HourElement, MinuteElement)
{
    document.getElementById(HourElement).value = Math.floor((u8RawTime * 6) / 60);
    document.getElementById(MinuteElement).value = (u8RawTime % 10);
}

function getRawTimeVal(HourElement, MinuteElement)
{
    var u8RawTime;
    var u8RawHours = Number(document.getElementById(HourElement).value);
    var u8RawMins  = Number(document.getElementById(MinuteElement).value);

    u8RawTime = ((u8RawHours * 60) / 6) + u8RawMins;
    return u8RawTime;
}

function getRawDayMask(u8SuspendNumber)
{
    var monday = "_inputSusMon" + (u8SuspendNumber);
    var tuesday = "_inputSusTue" + (u8SuspendNumber);
    var wednesday = "_inputSusWed" + (u8SuspendNumber);
    var thursday = "_inputSusThu" + (u8SuspendNumber);
    var friday = "_inputSusFri" + (u8SuspendNumber);
    var saturday = "_inputSusSat" + (u8SuspendNumber);
    var sunday = "_inputSusSun" + (u8SuspendNumber);
    var u8rawDayMask = 0;

    if (document.getElementById(monday).checked == true)    u8rawDayMask |= 0x01;
    if (document.getElementById(tuesday).checked == true)   u8rawDayMask |= 0x02;
    if (document.getElementById(wednesday).checked == true) u8rawDayMask |= 0x04;
    if (document.getElementById(thursday).checked == true)  u8rawDayMask |= 0x08;
    if (document.getElementById(friday).checked == true)    u8rawDayMask |= 0x10;
    if (document.getElementById(saturday).checked == true)  u8rawDayMask |= 0x20;
    if (document.getElementById(sunday).checked == true)    u8rawDayMask |= 0x40;

    return u8rawDayMask;
}

function clearIndividualSuspend(u8SuspendNumber)
{
    var startTimeHrs = "_inputSusStartHrs" + (u8SuspendNumber);
    var startTimeMins = "_inputSusStartMins" + (u8SuspendNumber);
    var endTimeHrs = "_inputSusEndHrs" + (u8SuspendNumber);
    var endTimeMins = "_inputSusEndMins" + (u8SuspendNumber);
    var monday = "_inputSusMon" + (u8SuspendNumber);
    var tuesday = "_inputSusTue" + (u8SuspendNumber);
    var wednesday = "_inputSusWed" + (u8SuspendNumber);
    var thursday = "_inputSusThu" + (u8SuspendNumber);
    var friday = "_inputSusFri" + (u8SuspendNumber);
    var saturday = "_inputSusSat" + (u8SuspendNumber);
    var sunday = "_inputSusSun" + (u8SuspendNumber);

    if ((u8SuspendNumber > 0)&&(u8SuspendNumber <= 5))
    {
        document.getElementById(monday).checked    = false;
        document.getElementById(tuesday).checked    = false;
        document.getElementById(wednesday).checked    = false;
        document.getElementById(thursday).checked    = false;
        document.getElementById(friday).checked    = false;
        document.getElementById(saturday).checked    = false;
        document.getElementById(sunday).checked    = false;
        setTimeVal(0, startTimeHrs, startTimeMins);
        setTimeVal(0, endTimeHrs, endTimeMins);
    }
}

function disableIndividualSuspend(u8SuspendNumber)
{
    var startTimeHrs = "_inputSusStartHrs" + (u8SuspendNumber);
    var startTimeMins = "_inputSusStartMins" + (u8SuspendNumber);
    var endTimeHrs = "_inputSusEndHrs" + (u8SuspendNumber);
    var endTimeMins = "_inputSusEndMins" + (u8SuspendNumber);
    var monday = "_inputSusMon" + (u8SuspendNumber);
    var tuesday = "_inputSusTue" + (u8SuspendNumber);
    var wednesday = "_inputSusWed" + (u8SuspendNumber);
    var thursday = "_inputSusThu" + (u8SuspendNumber);
    var friday = "_inputSusFri" + (u8SuspendNumber);
    var saturday = "_inputSusSat" + (u8SuspendNumber);
    var sunday = "_inputSusSun" + (u8SuspendNumber);

    if ((u8SuspendNumber > 0)&&(u8SuspendNumber <= 5))
    {
        document.getElementById(monday).disabled    = true;
        document.getElementById(tuesday).disabled   = true;
        document.getElementById(wednesday).disabled = true;
        document.getElementById(thursday).disabled  = true;
        document.getElementById(friday).disabled    = true;
        document.getElementById(saturday).disabled  = true;
        document.getElementById(sunday).disabled    = true;
        document.getElementById(startTimeHrs).disabled = true;
        document.getElementById(startTimeMins).disabled = true;
        document.getElementById(endTimeHrs).disabled = true;
        document.getElementById(endTimeMins).disabled = true;
    }
}

function enableIndividualSuspend(u8SuspendNumber)
{
    var startTimeHrs = "_inputSusStartHrs" + (u8SuspendNumber);
    var startTimeMins = "_inputSusStartMins" + (u8SuspendNumber);
    var endTimeHrs = "_inputSusEndHrs" + (u8SuspendNumber);
    var endTimeMins = "_inputSusEndMins" + (u8SuspendNumber);
    var monday = "_inputSusMon" + (u8SuspendNumber);
    var tuesday = "_inputSusTue" + (u8SuspendNumber);
    var wednesday = "_inputSusWed" + (u8SuspendNumber);
    var thursday = "_inputSusThu" + (u8SuspendNumber);
    var friday = "_inputSusFri" + (u8SuspendNumber);
    var saturday = "_inputSusSat" + (u8SuspendNumber);
    var sunday = "_inputSusSun" + (u8SuspendNumber);

    if ((u8SuspendNumber > 0)&&(u8SuspendNumber <= 5))
    {
        document.getElementById(monday).disabled    = false;
        document.getElementById(tuesday).disabled   = false;
        document.getElementById(wednesday).disabled = false;
        document.getElementById(thursday).disabled  = false;
        document.getElementById(friday).disabled    = false;
        document.getElementById(saturday).disabled  = false;
        document.getElementById(sunday).disabled    = false;
        document.getElementById(startTimeHrs).disabled = false;
        document.getElementById(startTimeMins).disabled = false;
        document.getElementById(endTimeHrs).disabled = false;
        document.getElementById(endTimeMins).disabled = false;
    }
}

function toggleSuspendTimer()
{
    var i;

    for (i=1; i<=5; i++)
    {
        var useSuspend = "_inputUseSus" + (i);

        if (document.getElementById(useSuspend).checked == true)
        {
            enableIndividualSuspend(i);
        }
        else
        {
            disableIndividualSuspend(i);
        }
    }
}

function limitTimeRange(u8ElementNumber)
{
    var endTimeHrs = "_inputSusEndHrs" + (u8ElementNumber);
    var endTimeMins = "_inputSusEndMins" + (u8ElementNumber);
    if (document.getElementById(endTimeHrs).value == 24)
    {
        document.getElementById(endTimeMins).value = 0;
        document.getElementById(endTimeMins).disabled = true;
    }
    else
    {
        document.getElementById(endTimeMins).disabled = false;
    }
}

function invertTimers()
{
    var i;
    var j;
    var k;
    var u8numPeriods = 0;
    var u8timerDayMask = new Array();
    var u8timerStartTime = new Array();
    var u8timerEndTime = new Array();
    
    var u8numNewPeriods = 0;
    var u8timerNewDayMask = new Array();
    var u8timerNewStartTime = new Array();
    var u8timerNewEndTime = new Array();
    
    var u8complimentIndexes = new Array();
    
	// Read-in the current suspend timers.
    for (i=0; i<5; i++)
    {
        var useSuspend = "_inputUseSus" + (i+1);
        if(document.getElementById(useSuspend).checked == true)
        {
            var useSuspend = "_inputUseSus" + (i+1);
            var startTimeHrs = "_inputSusStartHrs" + (i+1);
            var startTimeMins = "_inputSusStartMins" + (i+1);
            var endTimeHrs = "_inputSusEndHrs" + (i+1);
            var endTimeMins = "_inputSusEndMins" + (i+1);
            var monday = "_inputSusMon" + (i+1);
            var tuesday = "_inputSusTue" + (i+1);
            var wednesday = "_inputSusWed" + (i+1);
            var thursday = "_inputSusThu" + (i+1);
            var friday = "_inputSusFri" + (i+1);
            var saturday = "_inputSusSat" + (i+1);
            var sunday = "_inputSusSun" + (i+1);
            
            u8timerDayMask[u8numPeriods] = 0;
            if(document.getElementById(monday).checked)		{u8timerDayMask[u8numPeriods] |= 0x01;}
            if(document.getElementById(tuesday).checked)	{u8timerDayMask[u8numPeriods] |= 0x02;}
            if(document.getElementById(wednesday).checked)	{u8timerDayMask[u8numPeriods] |= 0x04;}
            if(document.getElementById(thursday).checked)	{u8timerDayMask[u8numPeriods] |= 0x08;}
            if(document.getElementById(friday).checked)		{u8timerDayMask[u8numPeriods] |= 0x10;}
            if(document.getElementById(saturday).checked)	{u8timerDayMask[u8numPeriods] |= 0x20;}
            if(document.getElementById(sunday).checked)		{u8timerDayMask[u8numPeriods] |= 0x40;}
            
            u8timerStartTime[u8numPeriods] = getRawTimeVal(startTimeHrs, startTimeMins);
            u8timerEndTime[u8numPeriods] = getRawTimeVal(endTimeHrs, endTimeMins);
            u8numPeriods++;
        }
    }
    // Since timers are stored as disable time (per NM 2.0 spec), we should attempt to  shrink the list 
	// when doing this translation. This means going from 1-3 timers down to 1 timer. But, if the list 
	// isn't shrinkable, it might actually grow in the same manner (1 becomes 1-3). This is a very 
	// complicated operation.
	//
	// To reduce:
	// 1. Find and remove duplicates.
    for (i=0; i<u8numPeriods; i++)
    {
    	for (j=i+1; j<u8numPeriods; j++)
    	{
	    	if ((u8timerDayMask[i] == u8timerDayMask[j])     && 
	    	    (u8timerStartTime[i] == u8timerStartTime[j]) && 
	    	    (u8timerEndTime[i] == u8timerEndTime[j])     )
	    	{
	    		// Index j is a duplicate. Splice it away, and run the outer loop again.
	    		u8timerDayMask.splice(j,1);
	    		u8timerStartTime.splice(j,1);
	    		u8timerEndTime.splice(j,1);
	    		i--;
	    		u8numPeriods--;
	    		break;
	    	}
    	}
    }
	// 2. Find and merge all overlaps on same day/days. (Deprecated)


    // We've got the processed old arrays. Use those to build new ones.
    u8numNewPeriods = 0;
    for (i=0; (i<u8numPeriods && u8timerDayMask.length != 0x00); i++)
    {
    	// 3. Find any 00:00 to 24:00 intervals (these become bases).
    	if ( ( (u8timerStartTime[i] == 0x00) &&
    		   (u8timerEndTime[i] == 0xF0) ) ||
    		   (u8timerDayMask[i] == 0x7F)   )	// Special case for a timer on all days.
    	{
    		// 4. Using bases, find all complimentary timers by days.
    		u8complimentIndexes = [];
    		for (j=0; j<u8numPeriods; j++)
    		{
        		//    4a. Take base xor sample, if result is 0x7F, compliment was found.
    			if (((u8timerDayMask[i] ^ u8timerDayMask[j]) == 0x7F) ||
    			    ((u8timerDayMask[j] == 0x7F) && (i!=j))) // Special case for a timer on all days.
    			{
    				u8complimentIndexes.push(j);
    			}
    		}
    		// 4b. If no compliments were found, do a straight invert, whole day (1:1).
    		if (u8complimentIndexes.length == 0x00)
    		{
        		if (0x00 != ((~u8timerDayMask[i]) & 0x7F))
        		{
    	    		u8timerNewDayMask[u8numNewPeriods] = (~u8timerDayMask[i]) & 0x7F;
    	    		u8timerNewStartTime[u8numNewPeriods] = 0x00;
    	    		u8timerNewEndTime[u8numNewPeriods] = 0xF0;
    	    		u8numNewPeriods++;
    	    		
    	    		// Remove the existing timer from the list, and process again.
    	    		u8timerDayMask.splice(i,1);
    	    		u8timerStartTime.splice(i,1);
    	    		u8timerEndTime.splice(i,1);
    	    		u8numPeriods--;
    	    		i=-1;
        		}
    		}
    		// 5. Base + compliments can be reduced by at least 1.
    		else if (u8complimentIndexes.length == 0x01)
    		{
    			// Only one compliment found. 
    			// 5a. Ignore base at i.
    			// 5b. Use either 0x00->Start, or End->0xF0.
    			if((u8timerStartTime[i] != 0x00) || (u8timerEndTime[i] != 0xF0)) // Special case for a non-full-day compliment pair.
    			{
    				if((u8timerStartTime[i] == 0x00) && (u8timerEndTime[u8complimentIndexes[0]] == 0xF0))
    				{
        				// Use Base End -> Compliment Start
        				u8timerNewDayMask[u8numNewPeriods] = u8timerDayMask[u8complimentIndexes[0]];
        				u8timerNewStartTime[u8numNewPeriods] = u8timerEndTime[i];
        				u8timerNewEndTime[u8numNewPeriods] = u8timerStartTime[u8complimentIndexes[0]];
        				u8numNewPeriods++;
    				}
    				else if ((u8timerStartTime[u8complimentIndexes[0]] == 0x00) && (u8timerEndTime[i] == 0xF0))
    				{
    					// Use Compliment End -> Base Start
        				u8timerNewDayMask[u8numNewPeriods] = u8timerDayMask[u8complimentIndexes[0]];
        				u8timerNewStartTime[u8numNewPeriods] = u8timerEndTime[u8complimentIndexes[0]];
        				u8timerNewEndTime[u8numNewPeriods] = u8timerStartTime[i];
        				u8numNewPeriods++;
    				}
    				else 
    				{
    					// Not an actual compliment. Handle it (and base) as a regular timer later.
    					continue;
    				}	
    			}
    			else if (u8timerStartTime[u8complimentIndexes[0]] == 0x00)
    			{
    				// Use End -> Midnight
    				u8timerNewDayMask[u8numNewPeriods] = u8timerDayMask[u8complimentIndexes[0]];
    				u8timerNewStartTime[u8numNewPeriods] = u8timerEndTime[u8complimentIndexes[0]];
    				u8timerNewEndTime[u8numNewPeriods] = 0xF0;
    				u8numNewPeriods++;
    			}
    			else if (u8timerEndTime[u8complimentIndexes[0]] == 0xF0)
    			{
    				// Use Midnight -> Start
    				u8timerNewDayMask[u8numNewPeriods] = u8timerDayMask[u8complimentIndexes[0]];
    				u8timerNewStartTime[u8numNewPeriods] = 0x00;
    				u8timerNewEndTime[u8numNewPeriods] = u8timerStartTime[u8complimentIndexes[0]];
    				u8numNewPeriods++;
    			}
    			else
    			{
    				// 2:2 conversion. Use 0x00 -> Compliment Start
    				u8timerNewDayMask[u8numNewPeriods] = u8timerDayMask[u8complimentIndexes[0]];
    				u8timerNewStartTime[u8numNewPeriods] = 0x00;
    				u8timerNewEndTime[u8numNewPeriods] = u8timerStartTime[u8complimentIndexes[0]];
    				u8numNewPeriods++;
    				
    				// Use Compliment End -> 0xF0
    				u8timerNewDayMask[u8numNewPeriods] = u8timerDayMask[u8complimentIndexes[0]];
    				u8timerNewStartTime[u8numNewPeriods] = u8timerEndTime[u8complimentIndexes[0]];
    				u8timerNewEndTime[u8numNewPeriods] = 0xF0;
    				u8numNewPeriods++;
    			}
	    		// Remove the items we handled, and start again.
    			// Base at i.
	    		u8timerDayMask.splice(i,1);
	    		u8timerStartTime.splice(i,1);
	    		u8timerEndTime.splice(i,1);
	    		u8numPeriods--;
	    		// Compliment.
	    		if (i < u8complimentIndexes[0])
	    		{
	    			u8complimentIndexes[0]--;	// Compensate because we removed an array item before this one.
	    		}
	    		u8timerDayMask.splice(u8complimentIndexes[0],1);
	    		u8timerStartTime.splice(u8complimentIndexes[0],1);
	    		u8timerEndTime.splice(u8complimentIndexes[0],1);
	    		u8numPeriods--;
	    		i=-1;
    		}
    		else
    		{
    			// 5a. Ignore base at i.
    			// 5b. Reduce two compliments, and loop again. Base gets removed if we did 1 or 0 compliments.
    			for(k=0; k<u8complimentIndexes.length; k++)
    			{
    				// Locate a compliment starting at 0x00, and another ending at 0xF0. These two will be used.
    				if (u8timerStartTime[u8complimentIndexes[k]] == 0x00)
    				{
    					var u8complimentStartIndex = u8complimentIndexes[k];
    				}
    				if (u8timerEndTime[u8complimentIndexes[k]] == 0xF0)
    				{
    					var u8complimentEndIndex = u8complimentIndexes[k];
    				}
    			}
    			if ((u8complimentStartIndex != undefined) && (u8complimentEndIndex != undefined))
    			{
    				// Found a pair; store them.
					u8timerNewDayMask[u8numNewPeriods] = u8timerDayMask[u8complimentStartIndex];
					u8timerNewStartTime[u8numNewPeriods] = u8timerEndTime[u8complimentStartIndex];
					u8timerNewEndTime[u8numNewPeriods] = u8timerStartTime[u8complimentEndIndex];
					u8numNewPeriods++;
					// Remove the two that we just reduced, and start over.
		    		u8timerDayMask.splice(u8complimentStartIndex,1);
		    		u8timerStartTime.splice(u8complimentStartIndex,1);
		    		u8timerEndTime.splice(u8complimentStartIndex,1);
		    		u8numPeriods--;
		    		if (u8complimentStartIndex < u8complimentEndIndex)
		    		{
		    			u8complimentEndIndex--;	// Compensate because we removed an array item before this one.
		    		}
		    		u8timerDayMask.splice(u8complimentEndIndex,1);
		    		u8timerStartTime.splice(u8complimentEndIndex,1);
		    		u8timerEndTime.splice(u8complimentEndIndex,1);
		    		u8numPeriods--;
		    		if (u8complimentIndexes.length == 0x02)
		    		{
		    			// If there were only two compliments, remove the base.
			    		u8timerDayMask.splice(i,1);
			    		u8timerStartTime.splice(i,1);
			    		u8timerEndTime.splice(i,1);
			    		u8numPeriods--;
		    		}
		    		i=-1;
    			}
    		}
    	}
    }
	// 6. All others, use original algorithm:
	//    If the time starts at 00:00 and ends at 24:00 (i.e. all day on one or more days), we:
	//       Simply invert days (whole day). (1:1)
	//    If the time starts at 00:00 or ends at 24:00 (i.e. starts or ends on midnight), we:
	//       Invert the days (whole day), and subtract-out the hours on the day or days of the original. (1:2)
	//    Else, we:
	//       Invert the days (whole day), day-of from 00:00 to original start, and day-of from original end to 24:00. (1:3)
    for (i=0; (i<u8numPeriods && u8timerDayMask.length != 0x00); i++)
    {
		if ((u8timerStartTime[i] == 0x00) && (u8timerEndTime[i] == 0xF0))
		{
			// Simply invert days (whole day). (1:1)
    		u8timerNewDayMask[u8numNewPeriods] = (~u8timerDayMask[i]) & 0x7F;
    		u8timerNewStartTime[u8numNewPeriods] = 0x00;
    		u8timerNewEndTime[u8numNewPeriods] = 0xF0;
    		u8numNewPeriods++;
		}
		else if (u8timerStartTime[i] == 0x00)
		{
			// Invert the days (whole day), and subtract-out the hours on the day or days of the original. (1:2)
			if (0x00 != ((~u8timerDayMask[i]) & 0x7F))
			{
	    		u8timerNewDayMask[u8numNewPeriods] = (~u8timerDayMask[i]) & 0x7F;
	    		u8timerNewStartTime[u8numNewPeriods] = 0x00;
	    		u8timerNewEndTime[u8numNewPeriods] = 0xF0;
	    		u8numNewPeriods++;
			}
			
			u8timerNewDayMask[u8numNewPeriods] = u8timerDayMask[i];
			u8timerNewStartTime[u8numNewPeriods] = u8timerEndTime[i];
			u8timerNewEndTime[u8numNewPeriods] = 0xF0;
			u8numNewPeriods++;
		}
		else if (u8timerEndTime[i] == 0xF0)
		{
			// Invert the days (whole day), and subtract-out the hours on the day or days of the original. (1:2)
			if (0x00 != ((~u8timerDayMask[i]) & 0x7F))
			{
	    		u8timerNewDayMask[u8numNewPeriods] = (~u8timerDayMask[i]) & 0x7F;
	    		u8timerNewStartTime[u8numNewPeriods] = 0x00;
	    		u8timerNewEndTime[u8numNewPeriods] = 0xF0;
	    		u8numNewPeriods++;
			}
			
			u8timerNewDayMask[u8numNewPeriods] = u8timerDayMask[i];
			u8timerNewStartTime[u8numNewPeriods] = 0x00;
			u8timerNewEndTime[u8numNewPeriods] = u8timerStartTime[i];
			u8numNewPeriods++;
		}
		else
		{
			// Invert the days (whole day), day-of from 00:00 to original start, and day-of from original end to 24:00. (1:3)
			if (0x00 != ((~u8timerDayMask[i]) & 0x7F))
			{
	    		u8timerNewDayMask[u8numNewPeriods] = (~u8timerDayMask[i]) & 0x7F;
	    		u8timerNewStartTime[u8numNewPeriods] = 0x00;
	    		u8timerNewEndTime[u8numNewPeriods] = 0xF0;
	    		u8numNewPeriods++;
			}
			
			u8timerNewDayMask[u8numNewPeriods] = u8timerDayMask[i];
			u8timerNewStartTime[u8numNewPeriods] = 0x00;
			u8timerNewEndTime[u8numNewPeriods] = u8timerStartTime[i];
			u8numNewPeriods++;
			
			u8timerNewDayMask[u8numNewPeriods] = u8timerDayMask[i];
			u8timerNewStartTime[u8numNewPeriods] = u8timerEndTime[i];
			u8timerNewEndTime[u8numNewPeriods] = 0xF0;
			u8numNewPeriods++;
		}
    }
    // Step 6 might create duplicates, so find and remove them.
    for (i=0; i<u8numNewPeriods; i++)
    {
    	for (j=i+1; j<u8numNewPeriods; j++)
    	{
	    	if ((u8timerNewDayMask[i] == u8timerNewDayMask[j])     && 
	    	    (u8timerNewStartTime[i] == u8timerNewStartTime[j]) && 
	    	    (u8timerNewEndTime[i] == u8timerNewEndTime[j])     )
	    	{
	    		// Index j is a duplicate. Splice it away, and run the outer loop again.
	    		u8timerNewDayMask.splice(j,1);
	    		u8timerNewStartTime.splice(j,1);
	    		u8timerNewEndTime.splice(j,1);
	    		i--;
	    		u8numNewPeriods--;
	    		break;
	    	}
    	}
    }
    
    // Note that this conversion can sometimes result in more timers than allowed.
    // Bounds check. We might have gone beyond 5 allowed timers.
    if (u8numNewPeriods > 5)
    {
    	return -1;
    }
	
    if (u8numNewPeriods == 0)
    {
    	return;	// Nothing new.
    }
    
    // Display the translated values.
    for (i=0; i < u8numNewPeriods; i++)
    {
        var useSuspend = "_inputUseSus" + (i+1);
        var startTimeHrs = "_inputSusStartHrs" + (i+1);
        var startTimeMins = "_inputSusStartMins" + (i+1);
        var endTimeHrs = "_inputSusEndHrs" + (i+1);
        var endTimeMins = "_inputSusEndMins" + (i+1);
        var monday = "_inputSusMon" + (i+1);
        var tuesday = "_inputSusTue" + (i+1);
        var wednesday = "_inputSusWed" + (i+1);
        var thursday = "_inputSusThu" + (i+1);
        var friday = "_inputSusFri" + (i+1);
        var saturday = "_inputSusSat" + (i+1);
        var sunday = "_inputSusSun" + (i+1);
        enableIndividualSuspend(i+1);
        document.getElementById(useSuspend).checked= true;
        document.getElementById(monday).checked    = (u8timerNewDayMask[i] & 0x01) ? true:false;
        document.getElementById(tuesday).checked   = (u8timerNewDayMask[i] & 0x02) ? true:false;
        document.getElementById(wednesday).checked = (u8timerNewDayMask[i] & 0x04) ? true:false;
        document.getElementById(thursday).checked  = (u8timerNewDayMask[i] & 0x08) ? true:false;
        document.getElementById(friday).checked    = (u8timerNewDayMask[i] & 0x10) ? true:false;
        document.getElementById(saturday).checked  = (u8timerNewDayMask[i] & 0x20) ? true:false;
        document.getElementById(sunday).checked    = (u8timerNewDayMask[i] & 0x40) ? true:false;
        setTimeVal(u8timerNewStartTime[i], startTimeHrs, startTimeMins);
        setTimeVal(u8timerNewEndTime[i], endTimeHrs, endTimeMins);
        limitTimeRange(i+1);
    }
    
    // Uncheck/disable any unused timers.
    for (i=u8numNewPeriods; i<5; i++)
    {
        var useSuspend = "_inputUseSus" + (i+1);
        document.getElementById(useSuspend).checked = false;
        disableIndividualSuspend(i+1);
        clearIndividualSuspend(i+1);
    }
    
	return;
}

function translateAllEnableToSuspend()
{
	if (TimerViewType == "suspend")
	{
		return;
	}
	if (-1 == invertTimers())
	{
		// Unable to translate
		viewSuspendTimes.checked = false;
		viewEnableTimes.checked = true;
		document.getElementById("_SuspendTypeExpanation").innerHTML = eLang.getString("configure_nodemanager", "STR_CONF_NM_SUS_SUSPENDED_ERROR").fontcolor("red");;
		return -1;
	}
	TimerViewType = "suspend";
	document.getElementById("_SuspendTypeExpanation").innerHTML = eLang.getString("configure_nodemanager", "STR_CONF_NM_SUS_SUSPENDED").fontcolor("black");	
	viewSuspendTimes.checked = true;
	viewEnableTimes.checked = false;
}

function translateAllSuspendToEnable()
{
	if (TimerViewType == "enable")
	{
		return;
	}
	if(-1 == invertTimers())
	{
		// Unable to translate
		viewSuspendTimes.checked = true;
		viewEnableTimes.checked = false;
		document.getElementById("_SuspendTypeExpanation").innerHTML = eLang.getString("configure_nodemanager", "STR_CONF_NM_SUS_ENABLED_ERROR").fontcolor("red");
		return -1;
	}
	TimerViewType = "enable";
	document.getElementById("_SuspendTypeExpanation").innerHTML = eLang.getString("configure_nodemanager", "STR_CONF_NM_SUS_ENABLED").fontcolor("black");
	viewSuspendTimes.checked = false;
	viewEnableTimes.checked = true;
}

function nullFunction()
{
    return;
}
