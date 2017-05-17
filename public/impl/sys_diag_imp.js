var g_isadmin = 0;
var diagRefreshTimer = 0;   // Refresh timer while log file is "in progress."
var diagInitialTimer = 0;   // Delay timer before polling log status after an initial run.
var diagClickTimes=1;
function doInit() {
    exposeElms(['_lastTestTime',
                '_lastTestLink',
                '_runBtn']);

    document.getElementById("_lastTestTime").innerHTML = eLang.getString("sys_diag", "STR_SYS_DIAG_GETEXIST");
    document.getElementById("_lastTestLink").innerHTML = eLang.getString("sys_diag", "STR_SYS_DIAG_NULL");

    CheckRole();

    runBtn.onclick = RunSysDiag;

    GetDiagFileStatus();
}

function RunSysDiag()
{
    if (g_isadmin)
    {
        runBtn.disabled = true;
        document.getElementById("_lastTestTime").innerHTML = eLang.getString("sys_diag", "STR_SYS_DIAG_STARTING");
        document.getElementById("_lastTestLink").innerHTML = eLang.getString("sys_diag", "STR_SYS_DIAG_NULL");
        document.getElementById("_lastTestLink").href = eLang.getString("sys_diag", "STR_SYS_DIAG_NULL");
	   diagClickTimes++;
        var u8DiagType = 0;

        var p = new xmit.getset({ url: '/rpc/runsysdiag.asp', onrcv: postRunSysDiag, status: '' });
        p.add("WEBVAR_DIAGTYPE", u8DiagType);
        p.send();
        delete p;
    }
    else
    {
        alert(eLang.getString('common',"STR_APP_STR_316"));
    }
}

function convertToLocale(dateString)
{
    var CardDate = new Date(dateString);

    return ( CardDate.toLocaleString() );

}

function GetDiagFileStatus()
{
    clearTimeout(diagRefreshTimer); // Stop refreshing temporarily.

    var u8DiagType = 0;

    var p = new xmit.getset({ url: '/rpc/getsysdiaginfo.asp', onrcv: onRcvStatus, status: '' });
    p.add("WEBVAR_DIAGTYPE", u8DiagType);
    p.send();
    delete p;
}

/***********************Role Checking functions*********************/
function CheckRole()
{
    xmit.get({url:'/rpc/getrole.asp', onrcv:OnCheckRole, status:''});
}

function OnCheckRole()
{
    if(WEBVAR_JSONVAR_GET_ROLE.WEBVAR_STRUCTNAME_GET_ROLE[0]['CURPRIV'] < 3)
    {
        g_isadmin = 0;
        //alert(eLang.getString('common','STR_APP_STR_267'));
        runBtn.disabled = true;
    }
    else
        g_isadmin = 1;
}

function postRunSysDiag ()
{
    if(WEBVAR_JSONVAR_TESTSTATUS.HAPI_STATUS == 0)
    {
        diagInitialTimer = setTimeout("GetDiagFileStatus()",1500); // Wait 1.5 seconds before checking on status.
    }
    return;
}

function checkResultsAge (age_in_seconds)
{
    // Check the age of the test results
    var DiffMins = age_in_seconds / 60;

    if (DiffMins > 3)
    {
        // The file is old.
        // alert("This result is more than three minutes old. Please click the \"Run\" button to refresh the data.");
        document.getElementById("_lastTestTime").innerHTML = new Date(test_info).toString();
        document.getElementById("_lastTestLink").innerHTML = "Old System Debug Log (" + test_size + ")";
    }

    return;
}

function onRcvStatus (arg)
{
    if(WEBVAR_JSONVAR_TESTSTATUS.HAPI_STATUS == 0)
    {

        if(WEBVAR_JSONVAR_TESTSTATUS.WEBVAR_STRUCTNAME_TESTSTATUS[0]['TEST_EXISTS'] == 2)
        {
            // Test is ready.
            testexists = true;
            clearTimeout(diagRefreshTimer);     // Stop the standard polling refresh timer.
            clearTimeout(diagInitialTimer);     // Stop the initial post-run refresh timer.
            runBtn.disabled = false;

            // Build the date.
            test_info = WEBVAR_JSONVAR_TESTSTATUS.WEBVAR_STRUCTNAME_TESTSTATUS[0]['TEST_INFO'];
            document.getElementById("_lastTestTime").innerHTML = new Date(test_info).toString();

            // Build the link using the size of the file.
            test_link = new String(WEBVAR_JSONVAR_TESTSTATUS.WEBVAR_STRUCTNAME_TESTSTATUS[0]['TEST_LINK']);
            test_size = new String(WEBVAR_JSONVAR_TESTSTATUS.WEBVAR_STRUCTNAME_TESTSTATUS[0]['TEST_SIZE']);
            document.getElementById("_lastTestLink").href = test_link;

            document.getElementById("_lastTestLink").innerHTML = "System Debug Log (" + test_size + ")";

            // Get the new/old test status using the age in seconds.
            checkResultsAge(WEBVAR_JSONVAR_TESTSTATUS.WEBVAR_STRUCTNAME_TESTSTATUS[0]['TEST_AGE']);
        }
        else if (WEBVAR_JSONVAR_TESTSTATUS.WEBVAR_STRUCTNAME_TESTSTATUS[0]['TEST_EXISTS'] == 1)
        {
            // Test in progress.
            document.getElementById("_lastTestTime").innerHTML = eLang.getString("sys_diag", "STR_SYS_DIAG_RUNNING_WAIT");
            document.getElementById("_lastTestLink").innerHTML = eLang.getString("sys_diag", "STR_SYS_DIAG_NULL");
            document.getElementById("_lastTestLink").href = eLang.getString("sys_diag", "STR_SYS_DIAG_NULL");
            diagRefreshTimer = setTimeout("GetDiagFileStatus()",5000);  // Test in progress, check again in 5 second.
            runBtn.disabled = true;
        }
        else
        {
             
			if(diagClickTimes == 1){
				document.getElementById("_lastTestTime").innerHTML = eLang.getString("sys_diag", "STR_SYS_DIAG_NONETXT");
           		document.getElementById("_lastTestLink").innerHTML = eLang.getString("sys_diag", "STR_SYS_DIAG_NULL");
           		document.getElementById("_lastTestLink").href = eLang.getString("sys_diag", "STR_SYS_DIAG_NULL");
           		runBtn.disabled = false;
       		}else{
				diagRefreshTimer = setTimeout("GetDiagFileStatus()",5000);
				document.getElementById("_lastTestTime").innerHTML = eLang.getString("sys_diag", "STR_SYS_DIAG_RUNNING_WAIT");
				document.getElementById("_lastTestLink").innerHTML = eLang.getString("sys_diag", "STR_SYS_DIAG_NULL");
           		document.getElementById("_lastTestLink").href = eLang.getString("sys_diag", "STR_SYS_DIAG_NULL");
				runBtn.disabled=true;
			}
        }
    }
}
