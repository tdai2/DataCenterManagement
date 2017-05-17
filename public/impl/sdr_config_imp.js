var isIE = ((navigator.appName.indexOf('Microsoft')>=0)?true:false);

function doInit() {
    exposeElms(['_curSDR',
                '_curCFG',
                '_fileForm',
                '_fileSel',
                '_FileBrowse',
                '_uploadBtn',
                '_parseBtn',
                '_enableSelect',
                '_enableControl',
                '_inputControls',
                '_inputControlsMessage',
                '_EnableAutoCfgRadio',
                '_DisableAutoCfgRadio',
                '_sendEnableDisableBtn',
                '_tagListDesc',
                '_tagTable']);

    CheckRole();

    document.getElementById("_parseBtn").onclick = handleParseClick;

    // Populate drop-down.
    optid = 0;
    document.getElementById("_fileSel").add(new Option(eLang.getString('sdr_config',"SDR_CONFIG_FILETYPE"),0),isIE?optid++:null);
    document.getElementById("_fileSel").add(new Option(eLang.getString('sdr_config',"SDR_CONFIG_NEWSDR"),1),isIE?optid++:null);
    document.getElementById("_fileSel").add(new Option(eLang.getString('sdr_config',"SDR_CONFIG_NEWCFG"),2),isIE?optid++:null);
    document.getElementById("_fileSel").selectedIndex = 0;
    document.getElementById("_fileSel").onchange = handleFileSelect;
    handleFileSelect();

    document.getElementById("_EnableAutoCfgRadio").checked = true;
    document.getElementById("_DisableAutoCfgRadio").checked = false;
    document.getElementById("_sendEnableDisableBtn").onclick = handleEnableDisableClick;

    // Check to see if we've just submitted a file.
    var status = eExt.parseURLvars ('commit');

    // Set-up our submission aciton.
    document.getElementById("_fileForm").onsubmit = function () {
        // Check for a valid file.
        if(handleUploadClick())
        {
            // Only set our URL variable if it isn't already set.
            if (status != 'true')
            {
                this.action = document.location+'?commit=true';
            }
        }
        else
        {
            // No file found.
            return false;
        }
    }

    if (status == 'true')
    {
        // If a file submission just happened, commit it.
        commitFiles();
    }
    else
    {
        // Fresh load; just get status and tags.
        getCurrentSDRCFG();
        getParseStatus();
    }
}

function CheckRole()
{
    xmit.get({url:'/rpc/getrole.asp', onrcv:OnCheckRole, status:''});
}

function OnCheckRole()
{
    switch (WEBVAR_JSONVAR_GET_ROLE.WEBVAR_STRUCTNAME_GET_ROLE[0]['CURPRIV'])
    {
        case 4: // Admins may set. Admins may also enable/disable the feature.
        {
            displayEnableDisable();
            // Fallthrough
        }
        case 3: // Fallthrough. Operators may also set.
        {
            enableButtons();
            handleFileSelect();
            break;
        }
        case 2:     // Fallthrough.
        default:    // All others jump out.
        {
            location.href = '/page/config_nav.html';
            top.frames["helpFrame"].location.href = getHelpPage('/page/config_nav.html');
            break;
        }
    }
    return;
}

function getCurrentSDRCFG()
{
    showWait(true);
    xmit.get({url:"/rpc/getCurrentSDRCFG.asp", onrcv:handleCurrentSDRCFGrsp, status:''});
    return;
}

function handleCurrentSDRCFGrsp()
{
    showWait(false);
    var CmdStatus = WEBVAR_JSONVAR_SDRCFGRSP.HAPI_STATUS;
    var CurCfg = WEBVAR_JSONVAR_SDRCFGRSP.WEBVAR_STRUCTNAME_SDRCFGRSP[0];
    var uploadTime = new Date(CurCfg.u32UploadTime * 1000);
    var SDRVersion = "";
    var CFGVersion = "";
    
    SDRVersion = (CurCfg.sSDRVers == "") ? (eLang.getString('sdr_config',"SDR_CONFIG_UNKNOWN")) : (CurCfg.sSDRVers);
    CFGVersion = (CurCfg.sCFGVers == "") ? (eLang.getString('sdr_config',"SDR_CONFIG_UNKNOWN")) : (CurCfg.sCFGVers);

    if (CmdStatus == 0)
    {
        document.getElementById("_curSDR").innerHTML = (CurCfg.u32SDRSize > 0) ? (SDRVersion + " (" + CurCfg.u32SDRSize + " bytes)") : (eLang.getString('sdr_config',"SDR_CONFIG_NOFILE"));
        document.getElementById("_curCFG").innerHTML = (CurCfg.u32CFGSize > 0) ? (CFGVersion + " (" + CurCfg.u32CFGSize + " bytes)") : (eLang.getString('sdr_config',"SDR_CONFIG_NOFILE"));
        document.getElementById("_curTS").innerHTML  = uploadTime.toUTCString();
    }

    return;
}

function getCurrentTags()
{
    showWait(true);
    xmit.get({url:"/rpc/getCurrentSDRtags.asp", onrcv:handleCurrentSDRtagsrsp, status:''});
    return;
}

function handleCurrentSDRtagsrsp()
{
    showWait(false);
    var CmdStatus = WEBVAR_JSONVAR_TAGRSP.HAPI_STATUS;

    var tagtable = document.getElementById("_tagTable");

    tagtable.cellPadding = "0";
    tagtable.cellSpacing = "0";

    if (0 == WEBVAR_JSONVAR_TAGRSP.WEBVAR_STRUCTNAME_TAGRSP.length)
    {
        // Parse output isn't ready yet. Try again.
        setTimeout(getCurrentTags, 1000);
        return;
    }
    
    setTimeout(getCurrentSDRCFG, 1000);

    document.getElementById("_tagListDesc").innerHTML = eLang.getString('sdr_config',"SDR_CONFIG_TAGDESC");

    document.getElementById("_tagListDesc").style.display = "none";

    // Create table header if it doesn't already exist and we have time codes to list.
    if (tagtable.rows.length == 0)
    {
        var table1HeadRow = tagtable.insertRow(0);
        table1HeadRow.insertCell(-1).innerHTML = eLang.getString('sdr_config',"SDR_CONFIG_TAGS").bold();
        table1HeadRow.cells[0].style.textAlign = "center";
    }

    // Clear any existing table values, but save the header.
    for(var i = tagtable.rows.length - 1; i > 0; i--)
    {
        tagtable.deleteRow(i);
    }

    var numRows = WEBVAR_JSONVAR_TAGRSP.WEBVAR_STRUCTNAME_TAGRSP.length;

    for(i=0; i<numRows; i++)
    {
        thisRow = tagtable.insertRow(-1);
        thisRow.insertCell(0).innerHTML = WEBVAR_JSONVAR_TAGRSP.WEBVAR_STRUCTNAME_TAGRSP[i].sTAGNAME;
        thisRow.cells[0].style.textAlign = "center";
    }

    return;
}

function handleUploadClick()
{
    if (document.getElementById("_FileBrowse").value == "")
    {
        alert(eLang.getString('sdr_config',"SDR_CONFIG_ERR_VALIDFILE"));
        return false;
    }
    showWait(true);
    disableButtons();
    return true;
}

function commitFiles()
{
    xmit.get({url:"/rpc/commitSDRCFG.asp", onrcv:handleCommitSDRCFGrsp, status:''});
    return;
}

function handleCommitSDRCFGrsp()
{
    var CmdStatus = WEBVAR_JSONVAR_COMMITRSP.HAPI_STATUS;
    var CommitRsp = WEBVAR_JSONVAR_COMMITRSP.WEBVAR_STRUCTNAME_COMMITRSP[0];

    if (1 == CommitRsp.u8SDRstat)
    {
        alert(eLang.getString('sdr_config',"SDR_CONFIG_SDRCOMMIT_SUCCESS"));
    }
    else if (0xFF == CommitRsp.u8SDRstat)
    {
        alert(eLang.getString('sdr_config',"SDR_CONFIG_SDRCOMMIT_FAIL"));
    }

    if (1 == CommitRsp.u8CFGstat)
    {
        alert(eLang.getString('sdr_config',"SDR_CONFIG_CFGCOMMIT_SUCCESS"));
    }
    else if (0xFF == CommitRsp.u8CFGstat)
    {
        alert(eLang.getString('sdr_config',"SDR_CONFIG_CFGCOMMIT_FAIL"));
    }

    getCurrentSDRCFG();
    getParseStatus();
    return;
}

function handleParseClick()
{
    showWait(true);
    disableButtons();
    
    clearTagTable();
    
    
    xmit.get({url:"/rpc/startSDRparse.asp", onrcv:handlestartSDRparsersp, status:''});
    return;
}

function handlestartSDRparsersp()
{
    var CmdStatus = WEBVAR_JSONVAR_PARSERSP.HAPI_STATUS;
    var ParseRsp = WEBVAR_JSONVAR_PARSERSP.WEBVAR_STRUCTNAME_PARSERSP[0];

    enableButtons();
    handleFileSelect();
    showWait(false);
    
    if (0x00 == ParseRsp.u8Result)
    {
        document.getElementById("_tagListDesc").style.display = "inline";
        document.getElementById("_tagListDesc").innerHTML = eLang.getString('sdr_config',"SDR_CONFIG_PRASEINPROGRESS");
        setTimeout(getParseStatus, 1000);
    }
    
    return;
}

function getParseStatus()
{
    showWait(true);
    disableButtons();
    
    clearTagTable();
    
    xmit.get({url:"/rpc/getCurrentSDRParseStatus.asp", onrcv:handlParseStatusRsp, status:''});
    return;   
}

function handlParseStatusRsp()
{
    var CmdStatus = WEBVAR_JSONVAR_PARSESTAT.HAPI_STATUS;
    var ParseStat = WEBVAR_JSONVAR_PARSESTAT.WEBVAR_STRUCTNAME_PARSESTAT[0];

    enableButtons();
    handleFileSelect();
    showWait(false);
    
    if ((0x00 == ParseStat.u8Result) && (ParseStat.sErr == ""))
    {
        // Parse was good. Load the tags.
        getCurrentTags();
        return;
    }
    else if (ParseStat.sErr != "")
    {
        document.getElementById("_tagListDesc").style.display = "inline";
        document.getElementById("_tagListDesc").innerHTML = ParseStat.sErr;
        return;
    }
    else if (0x81 == ParseStat.u8Result)
    {
        alert(eLang.getString('sdr_config',"SDR_CONFIG_LOCKERR"));   
        disableButtons();
        document.getElementById("_tagListDesc").style.display = "inline";
        document.getElementById("_tagListDesc").innerHTML = eLang.getString('sdr_config',"SDR_CONFIG_LOCKERR");
        clearTagTable();
    }
    else if (0x82 == ParseStat.u8Result)
    {
        alert(eLang.getString('sdr_config',"SDR_CONFIG_CFGERR"));   
        disableButtons();
        clearTagTable();
    }
    else if (0x83 == ParseStat.u8Result)
    {
        alert(eLang.getString('sdr_config',"SDR_CONFIG_AUTOERR"));   
        disableButtons();
        document.getElementById("_tagListDesc").style.display = "inline";
        document.getElementById("_tagListDesc").innerHTML = eLang.getString('sdr_config',"SDR_CONFIG_AUTOERR");
        clearTagTable();
    }
    else if (0x84 == ParseStat.u8Result)
    {
        disableButtons();
        document.getElementById("_inputControls").style.display = "none";
        document.getElementById("_inputControlsMessage").style.display = "inline";
        document.getElementById("_inputControlsMessage").innerHTML = eLang.getString('sdr_config',"SDR_CONFIG_DISABLED");
        document.getElementById("_fileSel").disabled = true;
        document.getElementById("_tagListDesc").style.display = "inline";
        document.getElementById("_tagListDesc").innerHTML = eLang.getString('sdr_config',"SDR_CONFIG_DISABLED");
        document.getElementById("_EnableAutoCfgRadio").checked = false;
        document.getElementById("_DisableAutoCfgRadio").checked = true;
        clearTagTable();
    }
    else if (0x85 == ParseStat.u8Result)
    {
        alert(eLang.getString('sdr_config',"SDR_CONFIG_SDRERR"));   
        disableButtons();
        clearTagTable();
    }
    else if (0x86 == ParseStat.u8Result)
    {
        alert(eLang.getString('sdr_config',"SDR_CONFIG_MISMATCH"));   
        disableButtons();
        document.getElementById("_tagListDesc").style.display = "inline";
        document.getElementById("_tagListDesc").innerHTML = eLang.getString('sdr_config',"SDR_CONFIG_MISMATCH");
        clearTagTable();
    }
    else
    {
        alert(eLang.getString('sdr_config',"SDR_CONFIG_UNKNOWNERR"));   
        disableButtons();
        document.getElementById("_tagListDesc").style.display = "inline";
        document.getElementById("_tagListDesc").innerHTML = eLang.getString('sdr_config',"SDR_CONFIG_UNKNOWNERR");
        clearTagTable();
    }
    return;
}

function handleFileSelect()
{
    switch(document.getElementById("_fileSel").selectedIndex)
    {
        case 1:
        {
            document.getElementById("_uploadBtn").disabled = false;
            document.getElementById("_FileBrowse").name = "/tmp/sdrfile.sdr.web";
            document.getElementById("_FileBrowse").disabled = false;
            break;
        }
        case 2:
        {
            document.getElementById("_uploadBtn").disabled = false;
            document.getElementById("_FileBrowse").name = "/tmp/cfgfile.cfg.web";
            document.getElementById("_FileBrowse").disabled = false;
            break;
        }
        case 0:
        default:
        {
            document.getElementById("_FileBrowse").name = "none.txt";
            document.getElementById("_FileBrowse").disabled = true;
            document.getElementById("_uploadBtn").disabled = true;
            break;
        }
    }
}

function disableButtons()
{
    document.getElementById("_uploadBtn").disabled = true;
    document.getElementById("_parseBtn").disabled = true;
    return;
}

function enableButtons()
{
    document.getElementById("_uploadBtn").disabled = false;
    document.getElementById("_parseBtn").disabled = false;
    return;
}

function getHelpPage(page)
{
    //change normal html file to hlp html file
    //change directory page to str/selectedLanguage
    return page.replace('.html','_hlp.html').replace('/page','/help/'+top.gLangSetting);
}

function clearTagTable()
{
    var tagtable = document.getElementById("_tagTable");

    // Clear the existing table.
    for(var i = tagtable.rows.length - 1; i >= 0; i--)
    {
        tagtable.deleteRow(i);
    }
    
}

function handleEnableDisableClick()
{
    document.getElementById("_sendEnableDisableBtn").disabled=true;

    var p = new xmit.getset({url:'/rpc/setautocfgenable.asp', onrcv:setautocfgenable_Res});

    p.add("ENABLEAUTOCFG", document.getElementById("_EnableAutoCfgRadio").checked ? 1 : 0);
    p.send();
    delete p;
}

function setautocfgenable_Res()
{
    var CmdStatus = WEBVAR_JSONVAR_AUTOCFGENABLERSP.HAPI_STATUS;
    var msg;

    if (CmdStatus == 0)
    {
        msg = eLang.getString('sdr_config',"SDR_CONFIG_FEATURE");
        msg += " ";
        msg += document.getElementById("_EnableAutoCfgRadio").checked ? eLang.getString("common", "eLanguage_Strings9E") : eLang.getString("common", "eLanguage_Strings9D");
        msg += ".";
        alert(msg);
    }
    else
    {
        msg = eLang.getString('sdr_config',"SDR_CONFIG_UNABLE");
        msg += " ";
        msg += document.getElementById("_EnableAutoCfgRadio").checked ? eLang.getString("common", "STR_ENABLE") : eLang.getString("common", "STR_DISABLE");
        msg += " ";
        msg += eLang.getString('sdr_config',"SDR_CONFIG_FEATURE");
        msg += ".";
        alert(msg);
    }
    location.href = document.location;
}

function displayEnableDisable()
{
    document.getElementById("_enableControl").style.display = "inline";
}
