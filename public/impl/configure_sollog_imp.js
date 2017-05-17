var g_isadmin = 0;
function doInit() {
    exposeElms(['_globalEnable',
				'_globalDisable',
				'_saveBtn']);
    CheckRole();
    saveBtn.onclick = SaveConfig;
	GetSysSOLConfig();	
}

function SaveConfig()
{
	var p = new xmit.getset({ url: '/rpc/setorgetsyssolconfig.asp', onrcv: saveSysSOLConfigRsp, status: '' });
	p.add("WEBVAR_SOLLOGGLOBALENABLE", _globalEnable.checked ? 1 : 0);
	p.add("WEBVAR_SOLLOGSETORGET",0);//set sys sol log config.
    p.send();
    delete p;

}

function GetSysSOLConfig()
{
	var p = new xmit.getset({ url: '/rpc/setorgetsyssolconfig.asp', onrcv: getSysSOLConfigRsp, status: '' });
	p.add("WEBVAR_SOLLOGGLOBALENABLE",0 );
	p.add("WEBVAR_SOLLOGSETORGET",1);//get sys sol log config.
	p.send();
    delete p;
}

function saveSysSOLConfigRsp()
{
    var SaveStatus =WEBVAR_JSONVAR_SETORGETSYSSOLCONFIG.HAPI_STATUS;
	if (SaveStatus == 0)
		alert("The SOL log configuration has been successfully saved.");
	else
		alert("The configuration has been saved unsuccessfully.");		
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
			_globalEnable.checked =	true;
			_globalDisable.checked = false;
		}
		else
		{
			_globalEnable.checked =	false;
			_globalDisable.checked = true;
		}
	}
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
	     _saveBtn.disabled = true;
    }
    else
	{
	   _saveBtn.disabled = false;
       g_isadmin = 1;
	}
}


