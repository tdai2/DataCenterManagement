var priv_admin=0;
function doInit()
{
//	exposeElms(['_launchActivex',
//				'_launchJava']);
	exposeElms(['_launchJava']);

	
//	launchActivex.onclick = doLaunchOCX;
	launchJava.onclick = doLaunchJava;
	launchJava.disabled=true;       // enable only if RMM3/4 present

    CheckRmmPresent();
	
	return;
}


function CheckRmmPresent()
{
	xmit.get({url:'/rpc/getrmm3status.asp', onrcv:OnCheckRmmPresent, status:''});
}

function OnCheckRmmPresent()
{
	var CmdStatus = WEBVAR_JSONVAR_RMM3STATUS.HAPI_STATUS;

	if (CmdStatus != 0)
	{
		errstr = eLang.getString('common','STR_SYS_RMM3STATUS');
		errstr += (eLang.getString('common','STR_IPMI_ERROR') + GET_ERROR_CODE(CmdStatus));
		alert (errstr);
		return;
	}
	else
	{
		var rmm3Status = WEBVAR_JSONVAR_RMM3STATUS.WEBVAR_STRUCTNAME_RMM3STATUS[0].STATE;
        if (rmm3Status > 0)
            launchJava.disabled=false;
    }
	getBMCServices();
}


function CheckRole()
{
	xmit.get({url:'/rpc/getrole.asp', onrcv:OnCheckRole, status:''});
}

function OnCheckRole()
{
	priv_admin  = WEBVAR_JSONVAR_GET_ROLE.WEBVAR_STRUCTNAME_GET_ROLE[0]['CURPRIV'];
	if(WEBVAR_JSONVAR_GET_ROLE.WEBVAR_STRUCTNAME_GET_ROLE[0]['CURPRIV'] != 4)
	{
		g_isadmin = 0;
		//alert(eLang.getString('common',"STR_APP_STR_251"));
//		saveBtn.disabled = true;
		location.href = '/page/config_nav.html';
		top.frames["helpFrame"].location.href = getHelpPage('/page/config_nav.html');
		launchJava.disabled=true;
	}
	else
	{
		g_isadmin = 1;
	}
}

//doLaunchOCX = function()
//{
//	window.open('/rpc/AVIATORRCOCX.asp','RemoteConsole','toolbar=0,width=400,height=110,left=350,top=300')
//}

doLaunchJava = function()
{
	if(priv_admin == 4)
	{
		xmit.get({url:"/rpc/WEBSES/validate.asp",onrcv:function(arg)
		{
			if(arg.HAPI_STATUS==0)
			{
				if (g_isadmin)
					window.open('/page/jnlp_launcher.html','RemoteConsole','toolbar=0,resizable=yes,width=400,height=110,left=350,top=300')
				else
					alert(eLang.getString('common',"STR_APP_STR_251"));
			}
			else
			{
				top.gLogout=1;
				top.location.href="/sessionexpired.asp";
			}
		},evalit:false});
	}
	else
	{
		alert("You do not have sufficient privileges to perform this operation");
	}
}

function getHelpPage(page)
{
	//change normal html file to hlp html file 
	//change directory page to str/selectedLanguage
	return page.replace('.html','_hlp.html').replace('/page','/help/'+top.gLangSetting);
}

function getBMCServices()
{
	xmit.get({url:'/rpc/getbmcservices.asp', onrcv:HandleBMCServices, status:''});
}

function HandleBMCServices()
{
	var CmdStatus = WEBVAR_JSONVAR_GETBMCSERVICES.HAPI_STATUS;

	if (CmdStatus == 0)
	{
		var BMCServices = WEBVAR_JSONVAR_GETBMCSERVICES.WEBVAR_STRUCTNAME_GETBMCSERVICES[0];
        if (!(BMCServices.OEMServices & 0x80))
        {
            launchJava.disabled=true;
        }
    }
	CheckRole();
}

