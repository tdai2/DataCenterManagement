var PSU_available = 1;

function doInit()
{
	exposeElms(['_MinPwr',
				'_CurrPwr',
				'_MaxPwr',
				'_AvgPwr',
				'_Period']);

	CheckRole();
}

function CheckRole()
{
	xmit.get({url:'/rpc/getrole.asp', onrcv:OnCheckRole, status:''});
}

function OnCheckRole()
{
var curPriv = WEBVAR_JSONVAR_GET_ROLE.WEBVAR_STRUCTNAME_GET_ROLE[0]['CURPRIV'];
	// user must have ADMINISTRATOR(4) privilege to see this page
	if((curPriv != 4))
	{
		location.href = '/page/config_nav.html';
		top.frames["helpFrame"].location.href = getHelpPage('/page/config_nav.html');
	}
	else
	{
		IPMICMD_HL_SelfTest();
	}
}

function IPMICMD_HL_SelfTest()
{
	showWait(true);
	xmit.get({url:"/rpc/nmselftest.asp", onrcv:IPMICMD_CheckPSU, status:''});
}

function IPMICMD_CheckPSU()
{
	showWait(false);

	var CmdStatus = WEBVAR_JSONVAR_GETNMSELFTEST.HAPI_STATUS;

	// If Get Self Test Results command to Node Manager FW successful
	if (CmdStatus == 0)
	{
		var _GetSelfTest = WEBVAR_JSONVAR_GETNMSELFTEST.WEBVAR_STRUCTNAME_GETNMSELFTEST[0];

		// If NM firware is indicating a PSU monitoriing service error
		if ( _GetSelfTest.GST_Byte1 == 0x80)
		{
			// If NM firmware is indicating both power supplies have communication problems then flag power supply communication issue
			if (_GetSelfTest.GST_Byte2 == 0x03)
			{
				PSU_available = 0;
			//	alert(eLang.getString('common',"STR_APP_STR_417"));		
			}
		}
	}
	else
	{
		alert(eLang.getString('common',"STR_APP_STR_418"));		
		// Unable to determine if PSU is available so go ahead and flag that it is not
		PSU_available = 0;
	}

	IPMICMD_HL_GetPowerStats();
}


function IPMICMD_HL_GetPowerStats()
{
	showWait(true);
	xmit.get({url:"/rpc/getpowerstat.asp", onrcv:IPMICMD_GetPowerStat_Res, status:''});
}


function IPMICMD_GetPowerStat_Res(arg)
{
	showWait(false);

	var CmdStatus = WEBVAR_JSONVAR_GETNMSTATISTICS.HAPI_STATUS;
	var	minium_power =	"N/A";
	var	current_power = "N/A";
	var	maximum_power =	"N/A";
	var	average_power =	"N/A";
	var 	period = "N/A"

	if(PSU_available == 1)
	{
		if (CmdStatus == 0) // Get Node Manager Statistics succeeded; extract the power usage data
		{
			var _Statistics = WEBVAR_JSONVAR_GETNMSTATISTICS.WEBVAR_STRUCTNAME_GETNMSTATISTICS[0];
		if( _Statistics.CompletionCode == 0)
           {

			minium_power =	((_Statistics.MSB_MIN << 8) + _Statistics.LSB_MIN) + "W";
			current_power = ((_Statistics.MSB_CURR << 8) + _Statistics.LSB_CURR) + "W";
			maximum_power = ((_Statistics.MSB_MAX << 8) + _Statistics.LSB_MAX) + "W";
			average_power = ((_Statistics.MSB_AVG << 8) + _Statistics.LSB_AVG) + "W";
				period = _Statistics.StatPeriod;
				period = period /3600; 				
				period = period.toFixed(2) + " Hours  ";
			}
		}
		// Get Node Manager Statistics command failed; throw up an error dialog box to notify the user
		else
		{
			alert(eLang.getString('common',"STR_APP_STR_418"));	
		}
	}

	MinPwr.innerHTML =	minium_power;
	CurrPwr.innerHTML = current_power;
	MaxPwr.innerHTML =	maximum_power;
	AvgPwr.innerHTML =	average_power;
	Period.innerHTML =      period;
}

function getHelpPage(page)
{
	//change normal html file to hlp html file 
	//change directory page to str/selectedLanguage
	return page.replace('.html','_hlp.html').replace('/page','/help/'+top.gLangSetting);
}
