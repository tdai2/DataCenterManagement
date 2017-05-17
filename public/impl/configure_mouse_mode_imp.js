var g_isadmin = 0;
var mouseMode;
var gmousemode = -1;

function doInit()
{
	exposeElms(['_absMod',
				'_relMod',
				'_otherMod',
				'_applyBtn']);
	CheckRole();

	absMod.onclick = function ()
	{
		gmousemode = 0;
	};
	relMod.onclick = function ()
	{
		gmousemode = 1;
	};

	otherMod.onclick = function ()
	{
		gmousemode = 2;
	};

	applyBtn.onclick = doMouseMode;
	GetMouseMode();
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
		applyBtn.disabled = true;
	}
	else
	{
		g_isadmin = 1;
	}
}

function GetMouseMode()
{
	showWait(true);
	xmit.get({url:"/rpc/getmousemode.asp",onrcv:GetMouseMode_Res, status:''});
}

function GetMouseMode_Res(arg)
{
	showWait(false);
	if(arg.HAPI_STATUS != 0)
	{
		alert(eLang.getString('common','STR_APP_STR_245'));
		return;
	}

	mouseMode = WEBVAR_JSONVAR_GETMOUSEMODE.WEBVAR_STRUCTNAME_GETMOUSEMODE[0].GET_MOUSE_MODE;
	if (mouseMode == 0) {
		absMod.checked = true;
		absMod.onclick();
	} else if (mouseMode == 1) {
		relMod.checked = true;
		relMod.onclick();
	} else if (mouseMode == 2) {
		otherMod.checked = true;
		otherMod.onclick();
	} else {
		alert(eLang.getString('common','STR_APP_STR_248'));
		absMod.checked = true;
		absMod.onclick();
	}
}


function doMouseMode()
{
	if (g_isadmin) {
		if (!absMod.checked && !relMod.checked && !otherMod.checked) {
			alert(eLang.getString('common','STR_APP_STR_414'));
			return;
		}
		if (gmousemode == mouseMode) {
			alert(eLang.getString('common','STR_APP_STR_415'));
			return;
		}
		if (confirm(eLang.getString('common','STR_APP_STR_249'))) {
			showWait(true);
			RPC_MouseAction = new xmit.getset({url:"/rpc/setmousemode.asp", onrcv:doMouseMode_Res});
			RPC_MouseAction.add("SET_MOUSE_MODE", gmousemode);
			RPC_MouseAction.send();
		}
	} else {
		alert(eLang.getString('common','STR_APP_STR_244'));
	}
}

function doMouseMode_Res(arg)
{
	showWait(false);
	if (arg.HAPI_STATUS != 0) {
		alert(eLang.getString('common','STR_APP_STR_250'));
	} else {
		alert(eLang.getString('common','STR_APP_STR_250a'));
		GetMouseMode();
	}
}
