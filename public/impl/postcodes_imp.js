var isIE = ((navigator.appName.indexOf('Microsoft')>=0)?true:false);
var CurrTimestamps = new Array();
var PrevTimestamps = new Array();
var CurrPOST = new Array();
var PrevPOST = new Array();
var RowHilightPersist = new Array();

var TIMECOL = 0;
var CODECOL = 1;
var DESCCOL = 2;

var UNHILIGHT_COLOR = "white";
var HILIGHT_COLOR = "yellow";
var PERSIST_COLOR = "#FFFF66";

function doInit()
{
    exposeElms(['_POSTBox',
                '_timeSelect',
                '_CurrPOST',
                '_PrevPOST',
                '_CurrPOSTTable',
                '_PrevPOSTTable']);

    optid = 0;

    // Populate the drop-down.
    timeSelect.add(new Option(eLang.getString('postcodes',"STR_POST_TIMEFROMSTART"),0),isIE?optid++:null);
    timeSelect.add(new Option(eLang.getString('postcodes',"STR_POST_TIMERELATIVE"),1),isIE?optid++:null);
    timeSelect.options.selectedIndex = 0;
    timeSelect.onchange = setTimeBase;

    RowHilightPersist["_CurrPOSTTable"] = 0;
    RowHilightPersist["_PrevPOSTTable"] = 0;

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
    if((curPriv < 3))
    {
        location.href = '/page/config_nav.html';
        top.frames["helpFrame"].location.href = getHelpPage('/page/config_nav.html');
    }
    else
    {
        GetCurrentPOSTCodes();
        GetPreviousPOSTCodes();
    }
}

function GetCurrentPOSTCodes()
{
    showWait(true);
    xmit.get({url:"/rpc/getCurrentPOSTcodes.asp", onrcv:HandleCurrentPOSTcodes, status:''});
}

function HandleCurrentPOSTcodes()
{
    CurrTimestamps = new Array();
    CurrPOST = new Array();

    showWait(false);
    document.getElementById('_CurrPOST').innerHTML = "";
    var CmdStatus = WEBVAR_JSONVAR_POSTCODES.HAPI_STATUS;
    var StartTime = new Date(WEBVAR_JSONVAR_FIRSTTIMESTAMP.WEBVAR_STRUCTNAME_FIRSTTIMESTAMP[0].u32startTime * 1000);

    if (CmdStatus == 0)
    {
        POST_DATA = WEBVAR_JSONVAR_POSTCODES.WEBVAR_STRUCTNAME_POSTCODES;
        if (!POST_DATA.length)
        {
            document.getElementById('_CurrPOST').innerHTML = eLang.getString('postcodes',"STR_POST_NOCODES");
            return;
        }
        document.getElementById('_CurrPOST').innerHTML = eLang.getString('postcodes',"STR_POST_STARTED") + StartTime.toUTCString();

        for (i=0; i<POST_DATA.length; i++)
        {
            CurrTimestamps[i] = POST_DATA[i].u16timestamp;
            CurrPOST[i] = POST_DATA[i].u8POSTcode;
        }
    }
    else
    {
        alert(eLang.getString('postcodes',"STR_POST_ERROR"));
    }

    drawTables('_CurrPOSTTable', CurrTimestamps, CurrPOST);
    return;
}

function GetPreviousPOSTCodes()
{
    showWait(true);
    xmit.get({url:"/rpc/getPreviousPOSTcodes.asp", onrcv:HandlePreviousPOSTcodes, status:''});
}

function HandlePreviousPOSTcodes()
{
    showWait(false);
    document.getElementById('_PrevPOST').innerHTML = "";
    var CmdStatus = WEBVAR_JSONVAR_POSTCODES.HAPI_STATUS;
    var StartTime = new Date(WEBVAR_JSONVAR_FIRSTTIMESTAMP.WEBVAR_STRUCTNAME_FIRSTTIMESTAMP[0].u32startTime * 1000);

    if (CmdStatus == 0)
    {
        POST_DATA = WEBVAR_JSONVAR_POSTCODES.WEBVAR_STRUCTNAME_POSTCODES;
        if (!POST_DATA.length)
        {
            document.getElementById('_PrevPOST').innerHTML = eLang.getString('postcodes',"STR_POST_NOCODES");
            return;
        }

        document.getElementById('_PrevPOST').innerHTML = eLang.getString('postcodes',"STR_POST_STARTED") + StartTime.toUTCString();

        for (i=0; i<POST_DATA.length; i++)
        {
            PrevTimestamps[i] = POST_DATA[i].u16timestamp;
            PrevPOST[i] = POST_DATA[i].u8POSTcode;
        }
    }
    else
    {
        alert(eLang.getString('postcodes',"STR_POST_ERROR"));
    }

    drawTables('_PrevPOSTTable', PrevTimestamps, PrevPOST);
    return;
}

function setTimeBase()
{
    RowHilightPersist["_CurrPOSTTable"] = 0;
    RowHilightPersist["_PrevPOSTTable"] = 0;
    drawTables('_CurrPOSTTable', CurrTimestamps, CurrPOST);
    drawTables('_PrevPOSTTable', PrevTimestamps, PrevPOST);
    return;
}

function drawTables(tableName, timeCodes, postCodes)
{
    var table=document.getElementById(tableName);
    var thisRow;

    table.cellPadding = "0";
    table.cellSpacing = "0";

    if (0 == timeCodes.length)
    {
        return;
    }

    // Create table header if it doesn't already exist and we have time codes to list.
    if (table.rows.length == 0)
    {
        var table1HeadRow = table.insertRow(0);
        table1HeadRow.insertCell(TIMECOL).innerHTML = eLang.getString('postcodes',"STR_POST_THEAD_TIME").bold();
        table1HeadRow.insertCell(CODECOL).innerHTML = eLang.getString('postcodes',"STR_POST_THEAD_CODE").bold();
        table1HeadRow.cells[CODECOL].colSpan = "2";
        table1HeadRow.cells[TIMECOL].style.textAlign = "right";
        table1HeadRow.cells[CODECOL].style.textAlign = "center";
    }

    // Clear any existing table values, but save the header.
    for(var i = table.rows.length - 1; i > 0; i--)
    {
        table.deleteRow(i);
    }

    var numRows = timeCodes.length;

    for(i=0; i<numRows; i++)
    {
        thisRow = table.insertRow(-1);
        thisRow.insertCell(TIMECOL);
        thisRow.insertCell(CODECOL).innerHTML = ("0x" + makeHexAndPad(postCodes[i])).bold();
        thisRow.insertCell(DESCCOL).innerHTML = parseCode(postCodes[i]);
        thisRow.cells[TIMECOL].style.textAlign = "right";
        thisRow.cells[CODECOL].style.textAlign = "center";
        thisRow.onmouseover = rowHilight;
        thisRow.onmouseout = rowClearhilight;
        thisRow.onclick = function()
            {
                // Persistence hilighting
                RowHilightPersist[tableName] = RowHilightPersist[tableName]?0:1;
                if(!RowHilightPersist[tableName])
                    rowClearAllHilight(table);
                else
                    setPersistRowHilight(table, this, PERSIST_COLOR);
            };

        // Handle the dropdown selector for timebase.
        switch(timeSelect.options.selectedIndex)
        {
            case 0: // Fall through
            default:
            {
                // Time from start of POST.
                thisRow.cells[TIMECOL].innerHTML = mstosec(timeCodes[i]);
                break;
            }

            case 1:
            {
                // Time from last POST event.
                if(i>0)
                {
                    thisRow.cells[TIMECOL].innerHTML = "+" + mstosec(timeCodes[i] - timeCodes[i-1]);
                }
                else
                {
                    thisRow.cells[TIMECOL].innerHTML = "+" + mstosec(timeCodes[i]);
                }
            }
            break;
        }
    }
    return;
}

function getHelpPage(page)
{
    //change normal html file to hlp html file
    //change directory page to str/selectedLanguage
    return page.replace('.html','_hlp.html').replace('/page','/help/'+top.gLangSetting);
}

function makeHexAndPad(inputDec)
{
    if (inputDec < 10)
    {
        return "0" + inputDec.toString(16).toUpperCase();
    }
    else
    {
        return inputDec.toString(16).toUpperCase();
    }
}

function parseCode(inputCodeDec)
{
    if ((inputCodeDec > 0) && (inputCodeDec <= 0xFF))
    {
        return eLang.getString('postcodes_val',inputCodeDec);
    }
    else
    {
        return eLang.getString('postcodes_val',0x00);
    }
}

function mstosec(inputms)
{
    var outputFull = new String();
    var outputMs  = inputms % 1000;
    var outputSec = Math.floor(inputms / 1000) % 60;
    var outputMin = Math.floor(inputms / (60*1000));

    if (outputMs < 10)
    {
        outputMs = "00" + outputMs.toString(10);
    }
    else if (outputMs < 100)
    {
        outputMs = "0" + outputMs.toString(10);
    }
    else
    {
        outputMs = outputMs.toString(10);
    }

    if (outputSec < 10)
    {
        outputSec = "0" + outputSec.toString(10);
    }
    else
    {
        outputSec = outputSec.toString(10);
    }

    if (outputMin < 10)
    {
        outputMin = "0" + outputMin.toString(10);
    }
    else
    {
        outputMin = outputMin.toString(10);
    }

    outputFull = outputMin + ":" + outputSec + "." + outputMs;

    return outputFull;
}

// Should only be called as a table row mouseover.
function rowHilight()
{
    if (RowHilightPersist[this.parentElement.parentElement.id])
    {
        return;
    }

    this.style.backgroundColor = HILIGHT_COLOR;
    // Find all rows with the same POST code and hilight them.
    var numRows = this.parentElement.parentElement.rows.length;
    var rowSet = this.parentElement.parentElement.rows;

    for(i=0; i<numRows; i++)
    {
        if (rowSet[i].cells[CODECOL].innerHTML == this.cells[CODECOL].innerHTML)
        {
            rowSet[i].style.backgroundColor = HILIGHT_COLOR;
        }
    }

    return;
}

// Should only be called as a table row mouseout.
function rowClearhilight()
{
    if (RowHilightPersist[this.parentElement.parentElement.id])
        return;

    this.style.backgroundColor = UNHILIGHT_COLOR;
    // Find all rows with the same POST code and clear the hilights.
    var numRows = this.parentElement.parentElement.rows.length;
    var rowSet = this.parentElement.parentElement.rows;

    for(i=0; i<numRows; i++)
    {
        if (rowSet[i].cells[CODECOL].innerHTML == this.cells[CODECOL].innerHTML)
        {
            rowSet[i].style.backgroundColor = UNHILIGHT_COLOR;
        }
    }

    return;
}

// Clears hilighting from all rows in the table.
function rowClearAllHilight(tableName)
{
    // Find all rows with the same POST code and hilight them.
    var numRows = tableName.rows.length;
    var rowSet = tableName.rows;

    for(i=0; i<numRows; i++)
    {
        rowSet[i].style.backgroundColor = UNHILIGHT_COLOR;
    }

    return;
}

// Sets persistent row hilighting color.
function setPersistRowHilight(tableName, tableRow, rowColor)
{
    tableRow.style.backgroundColor = rowColor ? rowColor:HILIGHT_COLOR;
    // Find all rows with the same POST code and hilight them.
    var numRows = tableName.rows.length;//timeCodes.length;
    var rowSet = tableName.rows;

    for(i=0; i<numRows; i++)
    {
        if (rowSet[i].cells[CODECOL].innerHTML == tableRow.cells[CODECOL].innerHTML)
        {
            rowSet[i].style.backgroundColor = rowColor ? rowColor:HILIGHT_COLOR;
        }
    }

    return;
}
