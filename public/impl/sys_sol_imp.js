var g_isadmin = 0;
var solRefreshTimer = 0;   // Refresh timer while log file is "in progress."
var solInitialTimer = 0;   // Delay timer before polling log status after an initial run.

function doInit() {
    exposeElms(['_lastTestTime',
                '_lastTestLink',
                '_runBtn']);

    document.getElementById("_lastTestTime").innerHTML = eLang.getString("sys_sol", "STR_SYS_SOL_GETEXIST");
    document.getElementById("_lastTestLink").innerHTML = eLang.getString("sys_sol", "STR_SYS_SOL_NULL");

    CheckRole();
    runBtn.onclick = RunSysSol;
    GetSolFileStatus();
	GetSysSOLConfig();
}

function RunSysSol()
{
	if(g_isadmin)
	{
		runBtn.disabled = true;
		document.getElementById("_lastTestTime").innerHTML = eLang.getString("sys_sol", "STR_SYS_SOL_STARTING");
		document.getElementById("_lastTestLink").innerHTML = eLang.getString("sys_sol", "STR_SYS_SOL_NULL");
		document.getElementById("_lastTestLink").href = eLang.getString("sys_sol", "STR_SYS_SOL_NULL");
		var u8SolType = 0;

		var p = new xmit.getset({ url: '/rpc/runsyssol.asp', onrcv: postRunSysSol, status: '' });
		p.add("WEBVAR_SOLTYPE", u8SolType);
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

function GetSolFileStatus()
{
		clearTimeout(solRefreshTimer); // Stop refreshing temporarily.
		var u8SolType = 0;
		var p = new xmit.getset({ url: '/rpc/getsyssolinfo.asp', onrcv: onRcvStatus, status: '' });
		p.add("WEBVAR_SOLTYPE", u8SolType);
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
    }
    else
        g_isadmin = 1;

}

function postRunSysSol ()
{
    if(WEBVAR_JSONVAR_TESTSTATUS.HAPI_STATUS == 0)
    {
        solInitialTimer = setTimeout("GetSolFileStatus()",1500); // Wait 1.5 seconds before checking on status.
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
        document.getElementById("_lastTestLink").innerHTML = "Old System SOL Log (" + test_size + ")";
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
            clearTimeout(solRefreshTimer);     // Stop the standard polling refresh timer.
            clearTimeout(solInitialTimer);     // Stop the initial post-run refresh timer.
            runBtn.disabled = false;
            // Build the date.
            test_info = WEBVAR_JSONVAR_TESTSTATUS.WEBVAR_STRUCTNAME_TESTSTATUS[0]['TEST_INFO'];
            document.getElementById("_lastTestTime").innerHTML = new Date(test_info).toString();

            // Build the link using the size of the file.
            test_link = new String(WEBVAR_JSONVAR_TESTSTATUS.WEBVAR_STRUCTNAME_TESTSTATUS[0]['TEST_LINK']);
			test_size = new String(WEBVAR_JSONVAR_TESTSTATUS.WEBVAR_STRUCTNAME_TESTSTATUS[0]['TEST_SIZE']);
			var randomnumber=Math.floor(Math.random()*10000);
            document.getElementById("_lastTestLink").href = test_link + "?"+ randomnumber;
            document.getElementById("_lastTestLink").innerHTML = "System SOL Log (" + test_size + ")";

            // Get the new/old test status using the age in seconds.
            checkResultsAge(WEBVAR_JSONVAR_TESTSTATUS.WEBVAR_STRUCTNAME_TESTSTATUS[0]['TEST_AGE']);
        }
        else if (WEBVAR_JSONVAR_TESTSTATUS.WEBVAR_STRUCTNAME_TESTSTATUS[0]['TEST_EXISTS'] == 1)
        {
            // Test in progress.
            document.getElementById("_lastTestTime").innerHTML = eLang.getString("sys_sol", "STR_SYS_SOL_RUNNING_WAIT");
            document.getElementById("_lastTestLink").innerHTML = eLang.getString("sys_sol", "STR_SYS_SOL_NULL");
            document.getElementById("_lastTestLink").href = eLang.getString("sys_sol", "STR_SYS_SOL_NULL");
            solRefreshTimer = setTimeout("GetSolFileStatus()",1000);  // Test in progress, check again in 1 second.
            runBtn.disabled = true;
        }
        else
        {
            // Test not ready.
            document.getElementById("_lastTestTime").innerHTML = eLang.getString("sys_sol", "STR_SYS_SOL_NONETXT");
            document.getElementById("_lastTestLink").innerHTML = eLang.getString("sys_sol", "STR_SYS_SOL_NULL");
            document.getElementById("_lastTestLink").href = eLang.getString("sys_sol", "STR_SYS_SOL_NULL");
            runBtn.disabled = false;
        }
    }
}


function GetSysSOLConfig()
{
	var p = new xmit.getset({ url: '/rpc/setorgetsyssolconfig.asp', onrcv: getSysSOLConfigRsp, status: '' });
	p.add("WEBVAR_SOLLOGGLOBALENABLE",0 );
	p.add("WEBVAR_SOLLOGSETORGET",1);//get sys sol log config.
	p.send();
	delete p;
}

function getSysSOLConfigRsp()
{
    var GetStatus =WEBVAR_JSONVAR_SETORGETSYSSOLCONFIG.HAPI_STATUS;
	if(GetStatus != 0)
	{
		alert("can't get system sol log config.");
		return;
	}
	var SYSSOLLOGCONFIG = WEBVAR_JSONVAR_SETORGETSYSSOLCONFIG.WEBVAR_STRUCTNAME_SETORGETSYSSOLCONFIG;	
	if(SYSSOLLOGCONFIG.length > 0)
	{
		if(SYSSOLLOGCONFIG[0].SysSOLEnable != 0)
		{
		    runBtn.disabled = false;
		}
		else
		{
            document.getElementById("_lastTestTime").innerHTML = eLang.getString("sys_sol", "STR_SYS_SOL_NONETXT");
            document.getElementById("_lastTestLink").innerHTML = eLang.getString("sys_sol", "STR_SYS_SOL_NULL");
            document.getElementById("_lastTestLink").href = eLang.getString("sys_sol", "STR_SYS_SOL_NULL");
		    runBtn.disabled = true;
		}
	}
}


