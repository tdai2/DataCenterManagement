var glogout = 0;
var g_userpressedF5 = false;
var gloggedout=0;
var gConsoleOpen=false;
var gFlashMode=false;
var gManufacturerName = "";
var gManufacturerNameShort = "";

function doInit() {
	// TODO: add site initialization code
	loadFrames();
	getManufacturerName();
}


function application_disconnect(immediatedisconnect)
{

	var stat;
	if (immediatedisconnect==true)
	{
		frames.header.setServer(eLang.getString('common',"STR_GENERAL_NOTCONNECTED"));
		gConnected=false;
		closeConnection();
	}
	else
	{
		stat=confirm(((gConsoleOpen)?eLang.getString('common',"STR_CONSOLE_CONNECTED"):"")+eLang.getString('common',"STR_GENERAL_LOGOUT")+"?");
		if (stat==true)
		{
			frames.header.setServer(eLang.getString('common',"STR_GENERAL_NOTCONNECTED"));
			gConnected=false;
			closeConnection();

		}
	}
	
	function closeConnection()
	{
		//note that we have to give the full path for the RPC page here since we are still not initialized fully
		 xmit.get({url:"/rpc/WEBSES/logout.asp",onrcv:logout_resp, status:''});
//		var logout_rpc = 
//		logout_rpc.send();
		
	}

	function logout_resp()
	{
		glogout = 1;
		logout_retval = WEBVAR_JSONVAR_WEB_SESSION_LOGOUT.HAPI_STATUS;
		
		if(logout_retval == 0)
		{
//			alert(eLang.getString('common',"STR_GENERAL_LOGOUTSUCCESS"));
			document.cookie = "SessionCookie="+"LOGGED_OUT"+";path=/";
			document.location = "/login.asp";
		}
		
		
	}


}

function getMethod()
{
	var req;
	if(window.XMLHttpRequest)
	{
		req = new XMLHttpRequest();
	}else
	{
		if(window.ActiveXObject)
		{
			req = new ActiveXObject('Microsoft.XMLHTTP');
		}else
		{
			req = null;
		}
	}
	return req;
}

var greq = getMethod();

if(greq)
{
	greq.open('get','/rpc/WEBSES/logout.asp');
	greq.setRequestHeader('Content-type','x-www-form-urlencoded');
	greq.onreadystatechange = unload_resp;
}

window.onbeforeunload = function()
{
	if(!glogout && !g_userpressedF5)
	{
		if(confirm(eLang.getString('common',"STR_GENERAL_REFRESH_LOGOUT")))
		{
			greq.send(null);
//			alert("You have been logged out successfully");
		}else
		{
			return "To refresh the page, press 'Cancel' in this box and use F5 instead of the browser's refresh button\n\n"+" Please note: Navigating away without logging out from current web session would cause orphan web sessions and KVM sessions";
		}
	}
}

if(navigator.appVersion.indexOf("MSIE 6") !=-1)
{
	window.onunload = function()
	{
		if(!glogout && !gloggedout && !g_userpressedF5)
		{
			greq.open('get','/rpc/WEBSES/logout.asp');
			greq.setRequestHeader('Content-type','x-www-form-urlencoded');
			greq.onreadystatechange = unload_resp;
			if(confirm(eLang.getString('common',"STR_GENERAL_REFRESH_LOGOUT")))
			{
				greq.send(null);
//				alert("You have been logged out successfully");
			}else
			{
				return "To refresh the page, press cancel in this box and use F5 instead of the browser's refresh button\n\n"+" Please note: Navigating away without logging out from current web session would cause orphan web sessions and KVM sessions";
			}		
		}
	}
}

function unload_resp()
{
	gloggedout = 1;
}

function getManufacturerName()
{
    xmit.get({url:'/rpc/getmanufacturer.asp', onrcv:handleManufacturerName, status:''});
    return;
}

function handleManufacturerName()
{
    var CmdStatus = WEBVAR_JSONVAR_MANUFACTURER.HAPI_STATUS;
    if (CmdStatus == 0)
    {
        gManufacturerName = WEBVAR_JSONVAR_MANUFACTURER.WEBVAR_STRUCTNAME_MANUFACTURER[0].name;
        gManufacturerNameShort = WEBVAR_JSONVAR_MANUFACTURER.WEBVAR_STRUCTNAME_MANUFACTURER[0].shortName;
    }
    else
    {
        gManufacturerName = "";
        gManufacturerNameShort = "";
    }

    return;
}

