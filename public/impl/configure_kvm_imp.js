var g_isadmin = 0;

function doInit() {
    exposeElms(['_kvmEncrpytion',
                '_hidEncryption',
                '_mediaEncy',
                '_usbEmulationType',
                '_kvm_port',
                '_cd_port',
                '_fd_port',
                '_kvm_sport',
                '_cd_sport',
                '_fd_sport',
                '_saveKVMBtn',
                '_absMod',
                '_relMod',
                '_otherMod',
                '_MouseModeSaveBtn',
                '_m0_value', '_m0_name',
                '_m1_value', '_m1_name',
                '_m2_value', '_m2_name',
                '_m3_value', '_m3_name',
                '_m4_value', '_m4_name',
                '_m5_value', '_m5_name',
                '_m6_value', '_m6_name',
                '_m7_value', '_m7_name',
                '_m8_value', '_m8_name',
                '_m9_value', '_m9_name',
                '_saveKeysBtn']);

    CheckRole();

    // Set up the drop downs.
    var optind = 0;
    kvmEncrpytion.add(new Option('None',0),window.ActiveXObject?optind++:null);
    kvmEncrpytion.add(new Option('Stunnel',1),window.ActiveXObject?optind++:null);
    kvmEncrpytion.add(new Option('RC4',2),window.ActiveXObject?optind++:null);
    kvmEncrpytion.add(new Option('AES',3),window.ActiveXObject?optind++:null);

    optind = 0;
    usbEmulationType.add(new Option('Hard disk',0),window.ActiveXObject?optind++:null);
    usbEmulationType.add(new Option('Floppy',1),window.ActiveXObject?optind++:null);

    showHIDEncryption();
    kvmEncrpytion.onchange = showHIDEncryption;

    saveKVMBtn.onclick = saveAdviserSettings;

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

    MouseModeSaveBtn.onclick = doMouseMode;

    getAdviserSecuritySettings();
    GetMouseMode();
    getVMediaSecuritySettings();
    getUSBEmulationType();
    getAdviserSecuritySettings();
    getPortSettings();
    saveKeysBtn.onclick = doSetKeyboardCfg;
    xmit.get({url:"/rpc/getkeyboardconfig.asp",onrcv:ProcessGetKeyboardCfg, status:''});
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
        saveKVMBtn.disabled = true;
        MouseModeSaveBtn.disabled = true;
        saveKeysBtn.disabled = true;
    }
    else
    {
        g_isadmin = 1;
    }
}

function LockButtons()
{
    saveKVMBtn.disabled = true;
    MouseModeSaveBtn.disabled = true;
    saveKeysBtn.disabled = true;
}

function UnlockButtons()
{
    saveKVMBtn.disabled = false;
    MouseModeSaveBtn.disabled = false;
    saveKeysBtn.disabled = false;
}


// Start: Remote Session
function getAdviserSecuritySettings()
{
    xmit.get({url:'/rpc/getadvisersecure.asp',status:'',onrcv:updateAdvSecSettings});
}

function updateAdvSecSettings(arg)
{
    if(arg.HAPI_STATUS==0)
    {
        var getAdviser = WEBVAR_JSONVAR_GETADVISERSECURESTATUS.WEBVAR_STRUCTNAME_GETADVISERSECURESTATUS[0];
        kvmEncrpytion.value = getAdviser.V_STR_SECURE_CHANNEL;
        hidEncryption.checked = (getAdviser.HID_ENCRYPTION == 1) ? true : false;
        showHIDEncryption();
    }
    else
    {
        errstr =  eLang.getString('common','STR_CONFIG_REMOTE_UPDATEADVSET');
        errstr += (eLang.getString('common','STR_IPMI_ERROR') + GET_ERROR_CODE(arg.HAPI_STATUS));
        alert(errstr);
    }
}

function getVMediaSecuritySettings()
{
    xmit.get({url:'/rpc/getvmediasecure.asp',status:'',onrcv:updateVMedSecSettings});
}

function updateVMedSecSettings(arg)
{
    if(arg.HAPI_STATUS == 0)
    {
        var getVMedia = WEBVAR_JSONVAR_GETVMEDIASECURESTATUS.WEBVAR_STRUCTNAME_GETVMEDIASECURESTATUS[0];
        mediaEncy.checked = getVMedia.V_STR_SECURE_CHANNEL ? true : false;
    }
    else
    {
        errstr =  eLang.getString('common','STR_CONFIG_REMOTE_UPDATEVMEDSET');
        errstr += (eLang.getString('common','STR_IPMI_ERROR')+ GET_ERROR_CODE(arg.HAPI_STATUS));
        alert(errstr);
    }
}

function getUSBEmulationType()
{
    xmit.get({url:'/rpc/getfloppyemulation.asp',status:'',onrcv:updateUSBSettings});
}

function updateUSBSettings(arg)
{
    if(arg.HAPI_STATUS==0)
    {
        usbEmulationType.value = WEBVAR_JSONVAR_GETFLOPPYEMULATION.WEBVAR_STRUCTNAME_GETFLOPPYEMULATION[0].V_STR_ATTACH_MODE;
    }else
    {
        errstr =  eLang.getString('common','STR_CONFIG_REMOTE_UPDATEATTSET');
        errstr +=(eLang.getString('common','STR_IPMI_ERROR')+ GET_ERROR_CODE(arg.HAPI_STATUS));
        alert(errstr);
    }
}

function saveAdviserSettings()
{
    if (g_isadmin)
    {
        LockButtons();

        var req = new xmit.getset({url:'/rpc/setadvisersecure.asp',status:'',onrcv:saveVMediaSettings});
        req.add('V_STR_SECURE_CHANNEL',kvmEncrpytion.value);
        if (kvmEncrpytion.value == 0)
            req.add('HID_ENCRYPTION', hidEncryption.checked ? 1 : 0);
        else
            req.add('HID_ENCRYPTION', 0);
        req.send();
        delete req;
    }
    else
        alert(eLang.getString('common','STR_APP_STR_413'));
}

function saveVMediaSettings(arg)
{
    if(arg.HAPI_STATUS == 0)
    {
        var req = new xmit.getset({url:'/rpc/setvmediasecure.asp',status:'',onrcv:saveVMedAtchSettings});
        req.add('V_STR_SECURE_CHANNEL', mediaEncy.checked ? 1 : 0);
        req.send();
        delete req;
    }
    else if(arg.HAPI_STATUS == -3)
    {
        alert(eLang.getString('common','STR_ENCRYPT_UPDATE'));
        UnlockButtons();
    }
    else
    {
        alert(eLang.getString('common','STR_SECURE_SAVE_FAILURE'));
        UnlockButtons();
    }
}

function saveVMedAtchSettings(arg)
{
    if(arg.HAPI_STATUS == 0)
    {
        var req = new xmit.getset({url:'/rpc/setfloppyemulation.asp',status:'',onrcv:HandleVMediaResponse});
        req.add('V_STR_FLOPPY_EMULATION',usbEmulationType.value);
        req.send();
        delete req;
    }
    else
    {
        alert(eLang.getString('common','STR_SECURE_SAVE_FAILURE'));
        UnlockButtons();
    }
}

function saveVMediaAttach()
{
var CmdStatus = WEBVAR_JSONVAR_SETVMEDIAATTACHMODE.HAPI_STATUS;
    if(CmdStatus!=0)
    {
        errstr = eLang.getString('common','STR_SECURE_SAVE_FAILURE');
        alert(errstr);
        UnlockButtons();
    }else
    {
        var setUSB = xmit.getset({url:'/rpc/setfloppyemulation.asp',status:'',onrcv:HandleVMediaResponse});
        setUSB.add('V_STR_FLOPPY_EMULATION',usbEmulationType.value);
        setUSB.send();
    }
}

function HandleVMediaResponse(arg)
{
    if(arg.HAPI_STATUS!=0)
    {
        alert(eLang.getString('common','STR_SECURE_SAVE_FAILURE'));
        UnlockButtons();
    }
    else
    {
        var setPorts = xmit.getset({url:'/rpc/setports.asp',status:'',onrcv:HandleSavePortsResponse});
        setPorts.add('KVM_PORT',kvm_port.value);
        setPorts.add('CD_PORT',cd_port.value);
        setPorts.add('FD_PORT',fd_port.value);
        setPorts.add('KVM_SPORT',kvm_sport.value);
        setPorts.add('CD_SPORT',cd_sport.value);
        setPorts.add('FD_SPORT',fd_sport.value);
        setPorts.send();
        delete setPorts;
    }
}

function HandleSavePortsResponse(arg)
{
    if(arg.HAPI_STATUS!=0)
    {
        if (-4 == arg.HAPI_STATUS)
        {
            alert(eLang.getString('common','STR_APP_STR_104A') + ".");
        }
        else
        {
            alert(eLang.getString('common','STR_SECURE_SAVE_FAILURE'));
        }
    }
    else
    {
        alert(eLang.getString('configure_remotesession','STR_CNFG_RMT_SESS_KVMSAVEGOOD'));
    }
    UnlockButtons();
}

function showHIDEncryption()
{
    if (kvmEncrpytion.value == 0)
    {
        hidEncryption.disabled = false;
    }
    else
    {
        hidEncryption.checked = false;
        hidEncryption.disabled = true;
    }
}

function getPortSettings()
{
    var getPorts = xmit.getset({url:'/rpc/getports.asp',status:'',onrcv:handleGetPortSettings});
    getPorts.send();
    delete getPorts;
    return;
}

function handleGetPortSettings()
{
    var CmdStatus = WEBVAR_JSONVAR_KVMRM_PORTS.HAPI_STATUS;
    var PortValues = WEBVAR_JSONVAR_KVMRM_PORTS.WEBVAR_STRUCTNAME_KVMRM_PORTS[0];

    kvm_port.value = PortValues.u16KVMPort;
    cd_port.value = PortValues.u16CDPort;
    fd_port.value = PortValues.u16FDPort;
    kvm_sport.value = PortValues.u16KVMSPort;
    cd_sport.value = PortValues.u16CDSPort;
    fd_sport.value = PortValues.u16FDSPort;
    return;
}
// End: Remote Session

// Start: Mouse Mode
function GetMouseMode()
{
    xmit.get({url:"/rpc/getmousemode.asp",onrcv:GetMouseMode_Res, status:''});
}

function GetMouseMode_Res(arg)
{
    if(arg.HAPI_STATUS != 0)
    {
        alert(eLang.getString('common','STR_APP_STR_245'));
        return;
    }

    KVMmouseMode = WEBVAR_JSONVAR_GETMOUSEMODE.WEBVAR_STRUCTNAME_GETMOUSEMODE[0].GET_MOUSE_MODE;
    if (KVMmouseMode == 0) {
        absMod.checked = true;
        absMod.onclick();
    } else if (KVMmouseMode == 1) {
        relMod.checked = true;
        relMod.onclick();
    } else if (KVMmouseMode == 2) {
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
        LockButtons();
        if (!absMod.checked && !relMod.checked && !otherMod.checked) {
            alert(eLang.getString('common','STR_APP_STR_414'));
            return;
        }
        if (gmousemode == KVMmouseMode) {
            alert(eLang.getString('common','STR_APP_STR_415'));
            return;
        }
        if (confirm(eLang.getString('common','STR_APP_STR_249'))) {
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
    if (arg.HAPI_STATUS != 0) {
        alert(eLang.getString('common','STR_APP_STR_250'));
    } else {
        alert(eLang.getString('common','STR_APP_STR_250a'));
        GetMouseMode();
    }
    UnlockButtons();
}
// End: Mouse Mode


// Start: Keyboard Macros
function ProcessGetKeyboardCfg (arg)
{
    var CmdStatus = WEBVAR_JSONVAR_HL_GETKEYBOARDCONFIG.HAPI_STATUS;
    if (CmdStatus != 0)
    {
        errstr = eLang.getString('common','STR_CONFIG_KEYBOARD_GETVAL');
//      errstr +=(eLang.getString('common','STR_IPMI_ERROR') + GET_ERROR_CODE(CmdStatus));
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
    LockButtons();
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
    UnlockButtons();
}
// End: Keyboard Macros


