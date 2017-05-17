function doInit()
{
    exposeElms(['_runBtn']);

    runBtn.onclick = handleRunButton;
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
        runBtn.disabled = true;
        location.href = '/page/config_nav.html';
        top.frames["helpFrame"].location.href = getHelpPage('/page/config_nav.html');
    }
    else
    {

    }
}

/******************************************************************************
 *
 *  handleRunButton
 *
 *   Called when the run button is pressed. Allows user to back-out of setting defaults.
 *
 *  Arguments: None
 *
 *  Return Value: None
 *
 ******************************************************************************/
function handleRunButton()
{
    if (true == confirm(eLang.getString("set_defaults","STR_DEFAULTS_CONFIRMATION")))
    {
        // User confirmed the action.
        runBtn.disabled = true;
        xmit.get({url:'/rpc/setBMCdefaults.asp', onrcv:handleRestore, status:''});
        return;
    }
    else
    {
        // User didn't confirm.
        return;
    }
}

function handleRestore()
{
    var RestoreCompCode = WEBVAR_JSONVAR_BMCDEFAULTS.WEBVAR_STRUCTNAME_BMCDEFAULTS[0]['RestoreCompletionCode'];
    var ResetCompCode = WEBVAR_JSONVAR_BMCDEFAULTS.WEBVAR_STRUCTNAME_BMCDEFAULTS[0]['ResetCompletionCode'];
    if (0x00 != RestoreCompCode)
    {
        alert(eLang.getString("set_defaults", "STR_DEFAULTS_ERROR"));
    }

    if (0x00 != ResetCompCode)
    {
        alert(eLang.getString("set_defaults", "STR_RESET_ERROR"));
    }

    if ((0x00 == RestoreCompCode)&&(0x00 == ResetCompCode))
    {
        top.onbeforeunload = function(){};
        top.unload = function(){};
        top.location = "/page/login.html";
    }
    else
    {
        runBtn.disabled = false;
    }
    return;
}

function getHelpPage(page)
{
    //change normal html file to hlp html file
    //change directory page to str/selectedLanguage
    return page.replace('.html','_hlp.html').replace('/page','/help/'+top.gLangSetting);
}
