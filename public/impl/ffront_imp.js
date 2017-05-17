var current_state,ID_state,LOCK_state;
var action;
var state_to_expect = 0xF; // 0xF is don't care
var MaxRetries = 3;
var UseExternalBMC = 0;
var hoststatus_rpc_name = "../rpc/hoststatus.asp";
var hostctl_rpc_name    = "../rpc/hostctl.asp";
var hostLEDStatus_rpc_name = "../rpc/hostLEDStatus.asp";
var hostIDLed_rpc_name = "../rpc/hostIDLed.asp";
var msgCableChkBMC     = eLang.getString('common','STR_APP_STR_404')
var msgCableChkFeature = eLang.getString('common','STR_APP_STR_405')
var t,nmit,rt,BlinkID,tt,ht,lt;
var buttonState = 0;
var IDbuttonState = 0;
var button_State = 0;
var PwrBtn_status =false;
var ResetBtn_status =false;
var clear_setinterval = 0;
var power_setinterval =0;
var ID_setinterval =0;
function doInit()
{
    exposeElms( ['_Message',
		'_ResetBtn1',
		'_ResetBtn',
		'_StatusledDiv',
		'_IDLed',
		'_IDledDiv',
		'_IDBtn'
                ]
              );

    CheckRole();
     PwrBtn_status =false;
     ResetBtn_status =false;
    IPMICMD_GetHostStatus();
    IPMICMD_GetLEDStatus();
    ResetBtn1.onclick = IPMICMD_DoPowerAction;
    IDBtn.onclick = IPMICMD_IDLED;
    ResetBtn.onclick = IPMICMD_DoResetAction;
}

IPMICMD_GetPowerStatus_Res = function()
{

    var CmdStatus = WEBVAR_JSONVAR_HL_SYSTEM_STATE.HAPI_STATUS;
    if(CmdStatus != 0)
    {
        alert(eLang.getString('common','STR_APP_STR_406'));
    }

	
     clearInterval(power_setinterval);

    current_state = WEBVAR_JSONVAR_HL_SYSTEM_STATE.WEBVAR_STRUCTNAME_HL_SYSTEM_STATE[0].JF_STATE;
    
    if(PwrBtn_status == false && ResetBtn_status == false )
        {
	if(current_state == 0)
	{
	// host power is OFF
	
	var PowerledDivElem = document.getElementById("_PowerledDiv1");
	PowerledDivElem.innerHTML = "<img class=\"comp-alert-i statusled\" src=\"\/res\/grey.png\" id=\"_Power\" \/>";
	
	}
	else if(current_state == 1)
	{
		// host power is ON

	var PowerledDivElem = document.getElementById("_PowerledDiv1");
	PowerledDivElem.innerHTML = "<div><img class=\"comp-alert-i statusled\" src=\"\/res\/green.png\" id=\"_Power\" \/></div>";

	}else if(current_state == 2)
	{
		current_state =0;
		power_setinterval = setInterval("BlinkPowerLED()",500);
	}
    }
	 clearTimeout(ht);
	 ht = setTimeout("IPMICMD_GetHostStatus()",6000);
    
  
}

setOK= function()
{
	
	showWait(false);
	PwrBtn_status = false;
	IPMICMD_GetHostStatus();
	clearTimeout(t);

}

IPMICMD_GetPowerAction_Res = function()
{
       t = setTimeout("setOK()",9000);
       
}

IPMICMD_GetHostStatus = function()
{
    xmit.get({url:hoststatus_rpc_name,onrcv:IPMICMD_GetPowerStatus_Res, status:''});
}

IPMICMD_DoPowerAction = function()
{
   
    
    showWait(true);
    if(g_isadmin )
    {
    	if(false == PwrBtn_status && false == ResetBtn_status)
    	{
		PwrBtn_status = true;
		switch(current_state)
		{
		    case 0: // power OFF
			 showWait(true,eLang.getString('common','STR_APP_STR_205_power-on_start'));
			 action = 1;
			break;
		    default: // power ON
			showWait(true,eLang.getString('common','STR_APP_STR_205_power-off_start'));
			action = 5;
			break;
		}
		RPC_PowerAction = new xmit.getset({url:hostctl_rpc_name,onrcv:IPMICMD_GetPowerAction_Res});
		RPC_PowerAction.add("WEBVAR_POWER_CMD",action);
        RPC_PowerAction.add("WEBVAR_FORCE_BIOS", 0);
        RPC_PowerAction.add("WEBVAR_FORCE_BIOSPWRON", 0);
		RPC_PowerAction.send();
		}
    }
    else
    {
        alert(eLang.getString('common','STR_APP_STR_316'));
	    showWait(false);

    }
   }




function CheckRole()
{
    xmit.get({url:'/rpc/getrole.asp', onrcv:OnCheckRole, status:''});
}

function OnCheckRole()
{
	var curPriv = WEBVAR_JSONVAR_GET_ROLE.WEBVAR_STRUCTNAME_GET_ROLE[0]['CURPRIV'];
	if((curPriv != 3) && (curPriv != 4))
	{
		g_isadmin = 0;
	}
	else
	{
		g_isadmin = 1;
	}
}

  IPMICMD_GetLEDStatus = function()
  {
    xmit.get({url:hostLEDStatus_rpc_name,onrcv:IPMICMD_GetLEDStatus_Res, status:''});
  }


 IPMICMD_GetLEDStatus_Res = function()
  {
  	var CmdStatus = WEBVAR_JSONVAR_HL_LEDSTATUS.HAPI_STATUS;
	var SysState  = WEBVAR_JSONVAR_HL_LEDSTATUS.WEBVAR_STRUCTNAME_HL_LEDSTATUS[0].SystemCritState;
	var ThermState = WEBVAR_JSONVAR_HL_LEDSTATUS.WEBVAR_STRUCTNAME_HL_LEDSTATUS[0].ThermalCritState;
	var VolState = WEBVAR_JSONVAR_HL_LEDSTATUS.WEBVAR_STRUCTNAME_HL_LEDSTATUS[0].VoltageCritState;
	var PowState = WEBVAR_JSONVAR_HL_LEDSTATUS.WEBVAR_STRUCTNAME_HL_LEDSTATUS[0].PowerCritState;
	var FanState = WEBVAR_JSONVAR_HL_LEDSTATUS.WEBVAR_STRUCTNAME_HL_LEDSTATUS[0].FanCritState;
	var DrivState = WEBVAR_JSONVAR_HL_LEDSTATUS.WEBVAR_STRUCTNAME_HL_LEDSTATUS[0].DriveCritState;
	var SecState = WEBVAR_JSONVAR_HL_LEDSTATUS.WEBVAR_STRUCTNAME_HL_LEDSTATUS[0].SecurityCritState;
	var FaultState = WEBVAR_JSONVAR_HL_LEDSTATUS.WEBVAR_STRUCTNAME_HL_LEDSTATUS[0].FaultCritState;
	var IDState = WEBVAR_JSONVAR_HL_LEDSTATUS.WEBVAR_STRUCTNAME_HL_LEDSTATUS[0].IDstate;
	var currentstate=0;

	clearInterval(clear_setinterval);
	clearInterval(ID_setinterval);
	Message.innerHTML = "";
	if(CmdStatus != 0)
	{
		alert(eLang.getString('common','STR_APP_STR_406'));
	}

    	switch(SysState)
    	{
    	case 3:
		currentstate=3;
		var StatusledDivElem = document.getElementById("_StatusledDiv1");
		StatusledDivElem.innerHTML = "<img class=\"comp-alert-i statusled\" src=\"\/res\/green.png\" id=\"_Statusled\" />";
		break;
    	case 4:
		currentstate=4;
		
		Message.innerHTML = eLang.getString('common','STR_APP_STR_420_VFP');
		Message.style.color = '#00ff00';
		Message.style.width = '180px';
	break;
	case 5:
		currentstate=5;
		
		Message.innerHTML = eLang.getString('common','STR_APP_STR_421');
		Message.style.color = '#FF6600';
		Message.style.width = '180px';
		break;
	case 6:
		currentstate=6;
		Message.innerHTML = eLang.getString('common','STR_SYS_NON_RECV');
		Message.style.color = '#FF6600';
		Message.style.width = '180px';
		var StatusledDivElem = document.getElementById("_StatusledDiv1");
		StatusledDivElem.innerHTML = "<img class=\"comp-alert-i statusled\" src=\"\/res\/red.png\" id=\"_Statusled\" />";
	break;
      	}
    	
    	switch(ThermState)
		{
			case 3:
			if(currentstate < ThermState)
			{
			currentstate=3;
			var StatusledDivElem = document.getElementById("_StatusledDiv1");
			StatusledDivElem.innerHTML = "<img class=\"comp-alert-i statusled\" src=\"\/res\/green.png\" id=\"_Statusled\" />";
			}
			break;

	    	case 4:
	    	if(currentstate < ThermState)
	    	{
			currentstate=4;
			
			Message.innerHTML = eLang.getString('common','STR_APP_STR_422');
			Message.style.color = '#00ff00';
			Message.style.width = '180px';
		}
		break;
		case 5:
		if(currentstate < ThermState)
		{
			currentstate = 5;
			
			Message.innerHTML = eLang.getString('common','STR_APP_STR_423');
			Message.style.color = '#FF6600';
			Message.style.width = '180px';
		}
		break;
		case 6:
		if(currentstate < ThermState)
	    	{
	    	currentstate=6;
		Message.innerHTML = eLang.getString('common','STR_THERMAL_NON_RECV');
		Message.style.color = '#FF6600';
		Message.style.width = '180px';
		var StatusledDivElem = document.getElementById("_StatusledDiv1");
		StatusledDivElem.innerHTML = "<img class=\"comp-alert-i statusled\" src=\"\/res\/red.png\" id=\"_Statusled\" />";	    	
		}
	    	break;
    	}
    	
    	
    	
	switch(VolState)
	{
		case 3:
		if(currentstate < VolState)
		{
		currentstate=3;
		var StatusledDivElem = document.getElementById("_StatusledDiv1");
		StatusledDivElem.innerHTML = "<img class=\"comp-alert-i statusled\" src=\"\/res\/green.png\" id=\"_Statusled\" />";
		}
		break;

		case 4:
		if(currentstate < VolState)
		{
			currentstate=4;
			
			Message.innerHTML = eLang.getString('common','STR_APP_STR_424');
			Message.style.color = '#00FF00';
			Message.style.width = '180px';
		}
		break;
		case 5:
		if(currentstate < VolState)
		{
			currentstate = 5;
			
			Message.innerHTML = eLang.getString('common','STR_APP_STR_425');
			Message.style.color = '#FF6600';
			Message.style.width = '180px';
		}
		break;
		case 6:
		if(currentstate < VolState)
		{
		
		currentstate=6;

		Message.innerHTML = eLang.getString('common','STR_VOLT_NON_RECV');
		Message.style.color = '#FF6600';
		Message.style.width = '180px';
		var StatusledDivElem = document.getElementById("_StatusledDiv1");
		StatusledDivElem.innerHTML = "<img class=\"comp-alert-i statusled\" src=\"\/res\/red.png\" id=\"_Statusled\" />";
		}
		break;
	}
    	switch(PowState)
		{
		case 3:
		if(currentstate < PowState)
		{
			currentstate=3;
			var StatusledDivElem = document.getElementById("_StatusledDiv1");
			StatusledDivElem.innerHTML = "<img class=\"comp-alert-i statusled\" src=\"\/res\/green.png\" id=\"_Statusled\" />";
		}
		break;
		

		case 4:
		if(currentstate < PowState)
		{
			currentstate=4;
			
			Message.innerHTML = eLang.getString('common','STR_APP_STR_426');
			Message.style.color = '#00FF00';
			Message.style.width = '180px';
		}
		break;
		case 5:
		if(currentstate < PowState)
		{
			currentstate = 5;
			
			Message.innerHTML = eLang.getString('common','STR_APP_STR_427');
			Message.style.color = '#FF6600';
			Message.style.width = '180px';
		}
		break;
		case 6:
		if(currentstate < PowState)
		{
		currentstate=6;

		Message.innerHTML = eLang.getString('common','STR_POWER_NON_RECV');
		Message.style.color = '#FF6600';
		Message.style.width = '180px';
		var StatusledDivElem = document.getElementById("_StatusledDiv1");
		StatusledDivElem.innerHTML = "<img class=\"comp-alert-i statusled\" src=\"\/res\/red.png\" id=\"_Statusled\" />";
		}
		break;
	}
	switch(FanState)
	{
		case 3:
		if(currentstate < FanState)
		{
		var StatusledDivElem = document.getElementById("_StatusledDiv1");
		StatusledDivElem.innerHTML = "<img class=\"comp-alert-i statusled\" src=\"\/res\/green.png\" id=\"_Statusled\" />";
		}
		break;
		case 4:
		if(currentstate < FanState)
		{
			currentstate=4;
			
			//alert(FanState);
			Message.innerHTML = eLang.getString('common','STR_APP_STR_428');
			Message.style.color = '#00FF00';
			Message.style.width = '180px';
		}
		break;
		case 5:
		if(currentstate < FanState)
		{
			currentstate = 5;
			
			Message.innerHTML = eLang.getString('common','STR_APP_STR_429');
			Message.style.color = '#FF6600';
			Message.style.width = '180px';
		}
		break;
		case 6:
		if(currentstate < FanState)
		{
		currentstate=6;

		//alert("5Fanstate ",FanState);
		Message.innerHTML = eLang.getString('common','STR_FAN_NON_RECV');
		Message.style.color = '#FF6600';
		Message.style.width = '180px';
		var StatusledDivElem = document.getElementById("_StatusledDiv1");
		StatusledDivElem.innerHTML = "<img class=\"comp-alert-i statusled\" src=\"\/res\/red.png\" id=\"_Statusled\" />";
		}
		break;
	}

	
	switch(FaultState)
	{
		case 1:
		var StatusledDivElem = document.getElementById("_StatusledDiv1");
		StatusledDivElem.innerHTML = "<img class=\"comp-alert-i statusled\" src=\"\/res\/green.png\" id=\"_Statusled\" />";
		Message.innerHTML = "";
		currentstate=1;
		break;
		case 4:
		clear_setinterval = setInterval("BlinkGreen()",500);
		break;
		case 5:
		clear_setinterval = setInterval("BlinkAmber()",500);
		break;
		case 6:
		var StatusledDivElem = document.getElementById("_StatusledDiv1");
		StatusledDivElem.innerHTML = "<img class=\"comp-alert-i statusled\" src=\"\/res\/red.png\" id=\"_Statusled\" />";
		break;
		default:
		currentstate = 1;
		var StatusledDivElem = document.getElementById("_StatusledDiv1");
		StatusledDivElem.innerHTML = "<img class=\"comp-alert-i statusled\" src=\"\/res\/grey.png\" id=\"_Statusled\" />";
		Message.innerHTML = "";
		
	}
	
		if( 0 == currentstate)
		{
			Message.innerHTML = eLang.getString('common','STR_CHECK_EVENT_LOG');
			Message.style.color = '#FF6600';
			Message.style.width = '180px';

		}
		if(0 == IDState)
		{
			var StatusledDivElem = document.getElementById("_IDledDiv1");
			StatusledDivElem.innerHTML = "<img class=\"comp-alert-i statusled\" src=\"\/res\/blue.png\" id=\"_IDLed\" />";

		}else if(1== IDState)
		{
			var StatusledDivElem = document.getElementById("_IDledDiv1");
			StatusledDivElem.innerHTML = "<img class=\"comp-alert-i statusled\" src=\"\/res\/grey.png\" id=\"_IDLed\" />";

		}else
		{
		ID_setinterval = setInterval("BlinkID()",500);
		}
		clearTimeout(lt);
		lt = setTimeout("IPMICMD_GetLEDStatus()",6000);
  }
 BlinkID = function()
	{ 
		if(buttonState == 0)
		{
			var StatusledDivElem = document.getElementById("_IDledDiv1");
			StatusledDivElem.innerHTML = "<img class=\"comp-alert-i statusled\" src=\"\/res\/blue.png\" id=\"_IDLed\" />";
			buttonState = 1;
		} else {
			var StatusledDivElem = document.getElementById("_IDledDiv1");
			StatusledDivElem.innerHTML = "<img class=\"comp-alert-i statusled\" src=\"\/res\/grey.png\" id=\"_IDLed\" />";
			buttonState = 0;
		}
	}

  BlinkPowerLED = function()
	{ 
		if(buttonState == 0)
		{
			var PowerledDivElem = document.getElementById("_PowerledDiv1");
			PowerledDivElem.innerHTML = "<img class=\"comp-alert-i statusled\" src=\"\/res\/grey.png\" id=\"_Power\" \/>";
			buttonState = 1;
		} else {
			var PowerledDivElem = document.getElementById("_PowerledDiv1");
			PowerledDivElem.innerHTML = "<div><img class=\"comp-alert-i statusled\" src=\"\/res\/green.png\" id=\"_Power\" \/></div>";
			buttonState = 0;
		}
	}
  

  
 BlinkGreen = function()
	{ 

	if(buttonState == 0)
	{
	var StatusledDivElem = document.getElementById("_StatusledDiv1");
	StatusledDivElem.innerHTML = "<img class=\"comp-alert-i statusled\" src=\"\/res\/green.png\" id=\"_Statusled\" />";
	buttonState = 1;
	} else {
	var StatusledDivElem = document.getElementById("_StatusledDiv1");
	StatusledDivElem.innerHTML = "<img class=\"comp-alert-i statusled\" src=\"\/res\/grey.png\" id=\"_Statusled\" />";
	buttonState = 0;
	}
	}

 BlinkAmber = function()
	{
	if(button_State == 0)
	{
	var StatusledDivElem = document.getElementById("_StatusledDiv1");
	StatusledDivElem.innerHTML = "<img class=\"comp-alert-i statusled\" src=\"\/res\/red.png\" id=\"_Statusled\" />";
	button_State = 1;
	} else {
	var StatusledDivElem = document.getElementById("_StatusledDiv1");
	StatusledDivElem.innerHTML = "<img class=\"comp-alert-i statusled\" src=\"\/res\/grey.png\" id=\"_Statusled\" />";	 
	button_State = 0;
	}
	}

 
  IPMICMD_IDLED = function()
  {
  	 	IDBtn.disabled = true;
		RPC_PowerAction = new xmit.getset({url:hostIDLed_rpc_name,onrcv: IPMICMD_IDLed_Res });
		RPC_PowerAction.add("WEBVAR_IDLED_CMD",0);
		RPC_PowerAction.send();
  }
  
  IPMICMD_IDLed_Res = function()
{


	var CmdStatus = WEBVAR_JSONVAR_HL_CHASSIS_ID.HAPI_STATUS;
	var IDState = WEBVAR_JSONVAR_HL_CHASSIS_ID.WEBVAR_STRUCTNAME_HL_CHASSIS_ID[0].ID_STATE;
	if(CmdStatus != 0)
	{
		alert(eLang.getString('common','STR_APP_STR_406'));
	}
	
	if(1 == IDState)
	{
		var StatusledDivElem = document.getElementById("_IDledDiv1");
		StatusledDivElem.innerHTML = "<img class=\"comp-alert-i statusled\" src=\"\/res\/blue.png\" id=\"_IDLed\" />";

	}else
	{
		var StatusledDivElem = document.getElementById("_IDledDiv1");
		StatusledDivElem.innerHTML = "<img class=\"comp-alert-i statusled\" src=\"\/res\/grey.png\" id=\"_IDLed\" />";

	} 
	IDBtn.disabled = false;
}

  
    
IPMICMD_DoResetAction = function()
{
  
	if(g_isadmin)
	{
		if(current_state!=0 && false == ResetBtn_status && false == PwrBtn_status)
		{

		ResetBtn_status = true;
		showWait(true);

		action = 3;
		RPC_PowerAction = new xmit.getset({url:hostctl_rpc_name,onrcv:IPMICMD_GetResetAction_Res});
		RPC_PowerAction.add("WEBVAR_POWER_CMD",action);
		RPC_PowerAction.add("WEBVAR_FORCE_BIOS",0);

		RPC_PowerAction.send();

		}
	} 
	else
	{
		alert(eLang.getString('common','STR_APP_STR_316'));
		showWait(false);
	}

  
   
   }

IPMICMD_GetResetAction_Res = function()
{
	showWait(true,eLang.getString('common','STR_APP_STR_205_reset_start'));
       rt = setTimeout("setResetOK()",9000);
       
}

setResetOK= function()
{
	showWait(false);
	ResetBtn_status = false;
	clearTimeout(rt);
}

IPMICMD_NMI = function()
{
	if (g_isadmin)
	{
		state_to_expect = 1;
		NMIBtn.disabled= false;
		RPC_PowerAction = new xmit.getset({url:hostctl_rpc_name,onrcv:IPMICMD_GetNMIAction_Res});
		RPC_PowerAction.add("WEBVAR_POWER_CMD",4);
		RPC_PowerAction.send();
	}
	else
	{
		alert(eLang.getString('common','STR_APP_STR_316'));
	}
}

IPMICMD_GetNMIAction_Res = function()
{
       nmit = setTimeout("setNMIOK()",15000);
       
}

setNMIOK= function()
{
	var Actionstatus = document.getElementById("_NMIBtn");
	showWait(false);
	//NMIBtn.disabled = false;
	clearTimeout(nmit);
}
