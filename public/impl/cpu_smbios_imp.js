
function doInit() {
    exposeElms(['_mainbox0',
                '_mainbox1',
                '_mainbox2',
                '_mainbox3'
                ]);

    GetCPUInfo();

}


function GetCPUInfo()
{
    showWait(true);;
    xmit.get({url:"/rpc/getcpusmbios.asp",onrcv:GetCPUInfoRes, status:''});
}


function GetCPUInfoRes (arg)
{
    showWait(false);

    if(WEBVAR_JSONVAR_CPUSMBIOSDATA.HAPI_STATUS != 0)
    {
        // Call failed for some reason.
        document.getElementById("_mainbox0").innerHTML = eLang.getString("cpu_smbios", "STR_ASSET_WAITINGONMDR");
    }
    else
    {
        CPUINFO_DATA = WEBVAR_JSONVAR_CPUSMBIOSDATA.WEBVAR_STRUCTNAME_CPUSMBIOSDATA;

        // Build our HTML using JS variables. Not the easiest thing to do, but effective.
        // The intent is to dynamically create and populate the "_mainboxX" areas, where
        // "X" is the current CPU table, 0-3.
        for (i=0; i<CPUINFO_DATA.length; i++)
        {
            document.getElementById("_mainbox" + i).innerHTML =
                    // Start of table/headings.
                    "<div align=\"left\" id=\"_CPU\"" +
                    i +
                    "\">" +
                    "<fieldset class=\"group\">" +
                    "<legend class=\"groupCaption\">" +
                    eLang.getString("cpu_smbios", "STR_ASSET_CPUINFO") +
                    "</legend>" +
                    "<table cellspacing=\"0\" cellpadding=\"3\" border=\"0\" width=\"100%\">" +

                    // Start of dynamic table data.

                    // Socket Designation
                    "<tr>" +
                    "<td class=\"settings_fieldname bold\"><strong>" +
                    eLang.getString("cpu_smbios", "STR_ASSET_CPU_SOCKET") +
                    "</strong></td>" +
                    "<td>" +
                    "<div id=\"_SocketNum" +
                    i +
                    "\">" +
                    eLang.getString("cpu_smbios", "STR_ASSET_NODATA") +
                    "</div>" +
                    "</td>" +
                    "</tr>" +

                    // Manufacturer
                    "<tr>" +
                    "<td class=\"settings_fieldname bold\"><strong>" +
                    eLang.getString("cpu_smbios", "STR_ASSET_PROCMANUF") +
                    "</strong></td>" +
                    "<td>" +
                    "<div id=\"_Manuf" +
                    i +
                    "\">" +
                    eLang.getString("cpu_smbios", "STR_ASSET_NODATA") +
                    "</div>" +
                    "</td>" +
                    "</tr>" +

                    // Version
                    "<tr>" +
                    "<td class=\"settings_fieldname bold\"><strong>" +
                    eLang.getString("cpu_smbios", "STR_ASSET_PROCVERSION") +
                    "</strong></td>" +
                    "<td>" +
                    "<div id=\"_Version" +
                    i +
                    "\">" +
                    eLang.getString("cpu_smbios", "STR_ASSET_NODATA") +
                    "</div>" +
                    "</td>" +
                    "</tr>" +
                    
                    // Processor Signature
                    "<tr>" +
                    "<td class=\"settings_fieldname bold\"><strong>" +
                    eLang.getString("cpu_smbios", "STR_ASSET_PROCSIG") +
                    "</strong></td>" +
                    "<td>" +
                    "<div id=\"_ProcSig" +
                    i +
                    "\">" +
                    eLang.getString("cpu_smbios", "STR_ASSET_NODATA") +
                    "</div>" +
                    "</td>" +
                    "</tr>" +

                    // Processor Type
                    "<tr>" +
                    "<td class=\"settings_fieldname bold\"><strong>" +
                    eLang.getString("cpu_smbios", "STR_ASSET_PROCTYPE") +
                    "</strong></td>" +
                    "<td>" +
                    "<div id=\"_ProcType" +
                    i +
                    "\">" +
                    eLang.getString("cpu_smbios", "STR_ASSET_NODATA") +
                    "</div>" +
                    "</td>" +
                    "</tr>" +

                    // Processor Family
                    "<tr>" +
                    "<td class=\"settings_fieldname bold\"><strong>" +
                    eLang.getString("cpu_smbios", "STR_ASSET_PROCFAMILY") +
                    "</strong></td>" +
                    "<td>" +
                    "<div id=\"_ProcFamily" +
                    i +
                    "\">" +
                    eLang.getString("cpu_smbios", "STR_ASSET_NODATA") +
                    "</div>" +
                    "</td>" +
                    "</tr>" +

                    // Speed
                    "<tr>" +
                    "<td class=\"settings_fieldname bold\"><strong>" +
                    eLang.getString("cpu_smbios", "STR_ASSET_SPEED") +
                    "</strong></td>" +
                    "<td>" +
                    "<div id=\"_Speed" +
                    i +
                    "\">" +
                    eLang.getString("cpu_smbios", "STR_ASSET_NODATA") +
                    "</div>" +
                    "</td>" +
                    "</tr>" +

                    // Cores
                    "<tr>" +
                    "<td class=\"settings_fieldname bold\"><strong>" +
                    eLang.getString("cpu_smbios", "STR_ASSET_CORES") +
                    "</strong></td>" +
                    "<td>" +
                    "<div id=\"_Cores" +
                    i +
                    "\">" +
                    eLang.getString("cpu_smbios", "STR_ASSET_NODATA") +
                    "</div>" +
                    "</td>" +
                    "</tr>" +

                    // Voltage
                    "<tr>" +
                    "<td class=\"settings_fieldname bold\"><strong>" +
                    eLang.getString("cpu_smbios", "STR_ASSET_VOLTAGE") +
                    "</strong></td>" +
                    "<td>" +
                    "<div id=\"_Voltage" +
                    i +
                    "\">" +
                    eLang.getString("cpu_smbios", "STR_ASSET_NODATA") +
                    "</div>" +
                    "</td>" +
                    "</tr>" +

                    // Upgrade (Socket Type)
                    "<tr>" +
                    "<td class=\"settings_fieldname bold\"><strong>" +
                    eLang.getString("cpu_smbios", "STR_ASSET_UPGRADE") +
                    "</strong></td>" +
                    "<td>" +
                    "<div id=\"_Upgrade" +
                    i +
                    "\">" +
                    eLang.getString("cpu_smbios", "STR_ASSET_NODATA") +
                    "</div>" +
                    "</td>" +
                    "</tr>" +

                    // Status
                    "<tr>" +
                    "<td class=\"settings_fieldname bold\"><strong>" +
                    eLang.getString("cpu_smbios", "STR_ASSET_STATUS") +
                    "</strong></td>" +
                    "<td>" +
                    "<div id=\"_Status" +
                    i +
                    "\">" +
                    eLang.getString("cpu_smbios", "STR_ASSET_NODATA") +
                    "</div>" +
                    "</td>" +
                    "</tr>" +

                    // Serial Number
                    "<tr>" +
                    "<td class=\"settings_fieldname bold\"><strong>" +
                    eLang.getString("cpu_smbios", "STR_ASSET_SERIALNUM") +
                    "</strong></td>" +
                    "<td>" +
                    "<div id=\"_SerialNum" +
                    i +
                    "\">" +
                    eLang.getString("cpu_smbios", "STR_ASSET_NODATA") +
                    "</div>" +
                    "</td>" +
                    "</tr>" +

                    // Asset Tag
                    "<tr>" +
                    "<td class=\"settings_fieldname bold\"><strong>" +
                    eLang.getString("cpu_smbios", "STR_ASSET_ASSETTAG") +
                    "</strong></td>" +
                    "<td>" +
                    "<div id=\"_AssetTag" +
                    i +
                    "\">" +
                    eLang.getString("cpu_smbios", "STR_ASSET_NODATA") +
                    "</div>" +
                    "</td>" +
                    "</tr>" +

                    // Part Number
                    "<tr>" +
                    "<td class=\"settings_fieldname bold\"><strong>" +
                    eLang.getString("cpu_smbios", "STR_ASSET_PARTNUM") +
                    "</strong></td>" +
                    "<td>" +
                    "<div id=\"_PartNum" +
                    i +
                    "\">" +
                    eLang.getString("cpu_smbios", "STR_ASSET_NODATA") +
                    "</div>" +
                    "</td>" +
                    "</tr>" +

                    // End of table
                    "</table>" +
                    "</fieldset>" +
                    "</div>";
        }

        for (i=0; i<CPUINFO_DATA.length; i++)
        {
            document.getElementById("_SocketNum" + i).innerHTML = CPUINFO_DATA[i].SocketDesignation;
            document.getElementById("_Manuf" + i).innerHTML = CPUINFO_DATA[i].ProcManufacturer;
            document.getElementById("_Version" + i).innerHTML = CPUINFO_DATA[i].ProcVersion;
            document.getElementById("_SerialNum" + i).innerHTML = CPUINFO_DATA[i].SerialNum;
            document.getElementById("_AssetTag" + i).innerHTML = CPUINFO_DATA[i].AssetTag;
            document.getElementById("_PartNum" + i).innerHTML = CPUINFO_DATA[i].PartNum;
            document.getElementById("_ProcType" + i).innerHTML = CPUINFO_DATA[i].ProcType;
            document.getElementById("_ProcFamily" + i).innerHTML = CPUINFO_DATA[i].ProcFamily;
            document.getElementById("_Voltage" + i).innerHTML = CPUINFO_DATA[i].Voltage;
            document.getElementById("_Status" + i).innerHTML = CPUINFO_DATA[i].Status1 + ", " + CPUINFO_DATA[i].Status2;
            document.getElementById("_Upgrade" + i).innerHTML = CPUINFO_DATA[i].Upgrade;
            document.getElementById("_Speed" + i).innerHTML = CPUINFO_DATA[i].Speed;
            document.getElementById("_Cores" + i).innerHTML = CPUINFO_DATA[i].Cores;
            document.getElementById("_ProcSig" + i).innerHTML = "0x" + CPUINFO_DATA[i].Signature.toString(16).toUpperCase();
        }
    }
}
