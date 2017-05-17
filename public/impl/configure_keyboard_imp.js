function doInit() {
	 // TODO: add page initialization code
	 exposeElms(['_m0_value', '_m0_name',
	 			 '_m1_value', '_m1_name',
	 			 '_m2_value', '_m2_name',
	 			 '_m3_value', '_m3_name',
	 			 '_m4_value', '_m4_name',
	 			 '_m5_value', '_m5_name',
	 			 '_m6_value', '_m6_name',
	 			 '_m7_value', '_m7_name',
	 			 '_m8_value', '_m8_name',
	 			 '_m9_value', '_m9_name',
	 			'_saveBtn']);
	 			
 	CheckRole();
	saveBtn.onclick = doSetKeyboardCfg;
	showWait(true);
	xmit.get({url:"/rpc/getkeyboardconfig.asp",onrcv:ProcessGetKeyboardCfg, status:''});
	 
}


var g_isadmin = 0;
function CheckRole()
{
	xmit.get({url:'/rpc/getrole.asp', onrcv:OnCheckRole, status:''});
}

function OnCheckRole()
{
	if(WEBVAR_JSONVAR_GET_ROLE.WEBVAR_STRUCTNAME_GET_ROLE[0]['CURPRIV'] != 4)
	{
		g_isadmin = 0;
		//alert(eLang.getString('common','STR_APP_STR_100'));
		saveBtn.disabled = true;
	}
	else
	{
		g_isadmin = 1;
	}
}


function ProcessGetKeyboardCfg (arg)
{
	showWait(false);

	var CmdStatus = WEBVAR_JSONVAR_HL_GETKEYBOARDCONFIG.HAPI_STATUS;
	if (CmdStatus != 0)
	{
		errstr = eLang.getString('common','STR_CONFIG_KEYBOARD_GETVAL');
//		errstr +=(eLang.getString('common','STR_IPMI_ERROR') + GET_ERROR_CODE(CmdStatus));
		alert(errstr);
		return;
	} 
	else 
	{
		KEYBOARDCFG_DATA = WEBVAR_JSONVAR_HL_GETKEYBOARDCONFIG.WEBVAR_STRUCTNAME_HL_GETKEYBOARDCONFIG;
		if (KEYBOARDCFG_DATA.length > 0)
		{
			m0_value.value = KEYBOARDCFG_DATA [0].M0_VALUE;  m0_name.value = KEYBOARDCFG_DATA [0].M0_NAME;
			m1_value.value = KEYBOARDCFG_DATA [0].M1_VALUE;  m1_name.value = KEYBOARDCFG_DATA [0].M1_NAME;
			m2_value.value = KEYBOARDCFG_DATA [0].M2_VALUE;  m2_name.value = KEYBOARDCFG_DATA [0].M2_NAME;
			m3_value.value = KEYBOARDCFG_DATA [0].M3_VALUE;  m3_name.value = KEYBOARDCFG_DATA [0].M3_NAME;
			m4_value.value = KEYBOARDCFG_DATA [0].M4_VALUE;  m4_name.value = KEYBOARDCFG_DATA [0].M4_NAME;
			m5_value.value = KEYBOARDCFG_DATA [0].M5_VALUE;  m5_name.value = KEYBOARDCFG_DATA [0].M5_NAME;
			m6_value.value = KEYBOARDCFG_DATA [0].M6_VALUE;  m6_name.value = KEYBOARDCFG_DATA [0].M6_NAME;
			m7_value.value = KEYBOARDCFG_DATA [0].M7_VALUE;  m7_name.value = KEYBOARDCFG_DATA [0].M7_NAME;
			m8_value.value = KEYBOARDCFG_DATA [0].M8_VALUE;  m8_name.value = KEYBOARDCFG_DATA [0].M8_NAME;
			m9_value.value = KEYBOARDCFG_DATA [0].M9_VALUE;  m9_name.value = KEYBOARDCFG_DATA [0].M9_NAME;
		}
		else
			alert (eLang.getString('common','STR_CONFIG_KEYBOARD_GETVAL'));
	}
}

function doSetKeyboardCfg()
{
	if (!g_isadmin)
	{
		alert(eLang.getString('common',"STR_CONFIG_KEYBOARD_PRIV"));
		return;
	}

	var p = new xmit.getset({url:'/rpc/setkeyboardconfig.asp', onrcv:SetKeyboardCfg_Res});

	p.add("M0_VALUE", m0_value.value); p.add("M0_NAME", m0_name.value);
	p.add("M1_VALUE", m1_value.value); p.add("M1_NAME", m1_name.value);
	p.add("M2_VALUE", m2_value.value); p.add("M2_NAME", m2_name.value);
	p.add("M3_VALUE", m3_value.value); p.add("M3_NAME", m3_name.value);
	p.add("M4_VALUE", m4_value.value); p.add("M4_NAME", m4_name.value);
	p.add("M5_VALUE", m5_value.value); p.add("M5_NAME", m5_name.value);
	p.add("M6_VALUE", m6_value.value); p.add("M6_NAME", m6_name.value);
	p.add("M7_VALUE", m7_value.value); p.add("M7_NAME", m7_name.value);
	p.add("M8_VALUE", m8_value.value); p.add("M8_NAME", m8_name.value);
	p.add("M9_VALUE", m9_value.value); p.add("M9_NAME", m9_name.value);
		
	p.send();
	delete p;
}

SetKeyboardCfg_Res = function()
{
	var CmdStatus = WEBVAR_JSONVAR_HL_SETKEYBOARDCONFIG.HAPI_STATUS;
	if(CmdStatus)
	{
		//Display the error code and proper message here...
		KEYBOARDCFG_DATA = WEBVAR_JSONVAR_HL_SETKEYBOARDCONFIG.WEBVAR_STRUCTNAME_HL_SETKEYBOARDCONFIG;
		if (KEYBOARDCFG_DATA.length > 0)
			alert(KEYBOARDCFG_DATA[0].ERR_MSG);
	}
	else
	{
		alert(eLang.getString('common','STR_CONFIG_KEYBOARD_SAVED'));
	}
}

