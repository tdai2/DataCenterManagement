//------------------------------------------------------------//
// monitoring_events page string table
//------------------------------------------------------------//

eLang.monitoring_events_strings = {};

eLang.monitoring_events_strings["STR_EVENT_LOGTXT"] = "Event Log:";
eLang.monitoring_events_strings["STR_EVENT_CLEARBTN"] = "Clear Event Log";
eLang.monitoring_events_strings["STR_EVENT_SAVEBTN"] = "Save Event Log";
eLang.monitoring_events_strings["STR_EVENT_DESCRIPTION"] = "Below is a table of the events from the system's event log. You can choose a category from the pull-down box to filter the events, and also sort them by clicking on a column header.";
eLang.monitoring_events_strings["STR_EVENT_LOG_DESC"] = "Select an event log category:";
eLang.monitoring_events_strings["STR_EVENT_LOG_TITLE"] = "Monitoring Events";
eLang.monitoring_events_strings["STR_EVENTS_HEADING"] = "Event Log";
eLang.monitoring_events_strings["STR_EVENTS_SELFULL"] = "The system event log is full, please empty it to ensure new events are logged.";
eLang.monitoring_events_strings["STR_EVENTS_SELFULL_CIRCULAR"] = "Warning: SEL is at capacity. New events are now over-writing old events.";
eLang.monitoring_events_strings["STR_EVENTS_FULLPERCENT1"] = "Event Log is ";
eLang.monitoring_events_strings["STR_EVENTS_FULLPERCENT2"] = "% full.";


// NM Specific strings.

//(u8HealthEventType) EVD2 == ??

eLang.monitoring_events_strings["STR_NM_FW_HEALTH"]                 = "SPS FW Health"; 
eLang.monitoring_events_strings["STR_NM_EVD2_00"] = "Recovery GPIO forced. Recovery Image loaded due to recovery MGPIO pin.";
eLang.monitoring_events_strings["STR_NM_EVD2_01"] = "Image execution failed. Recovery Image or backup operational image loaded because operational image is corrupted. This may be either caused by Flash device corruption or failed upgrade procedure.";
eLang.monitoring_events_strings["STR_NM_EVD2_02"] = "Flash erase error. Error during Flash erasure procedure probably due to Flash part corruption.";
eLang.monitoring_events_strings["STR_NM_EVD2_03"] = "Flash state information."; 
eLang.monitoring_events_strings["STR_NM_EVD2_04"] = "Internal error. Error during firmware execution - FW Watchdog Timeout.";
eLang.monitoring_events_strings["STR_NM_EVD2_05"] = "BMC did not respond to cold reset request and Intel ME rebooted the platform."; 
eLang.monitoring_events_strings["STR_NM_EVD2_06"] = "Direct Flash update requested by the BIOS. Intel ME Firmware will switch to recovery mode to perform full update from BIOS.";
eLang.monitoring_events_strings["STR_NM_EVD2_07"] = "Manufacturing error. Wrong manufacturing configuration detected by Intel ME Firmware.";
eLang.monitoring_events_strings["STR_NM_EVD2_08"] = "Persistent storage integrity error. Flash file system error detected.";
eLang.monitoring_events_strings["STR_NM_EVD2_09"] = "Firmware Exception. Provide the content of Event Data 3 to Intel support team for interpretation. ";
eLang.monitoring_events_strings["STR_NM_EVD2_0a1"] = "Flash Wear-Out Protection Warning. Warning threshold for ";
eLang.monitoring_events_strings["STR_NM_EVD2_0a2"] = " % of flash operations has been exceeded.";
eLang.monitoring_events_strings["STR_NM_EVD2_0d"] = "PECI over DMI interface error. This is a notification that PECI over DMI interface failure was detected and it is not functional any more. ";
eLang.monitoring_events_strings["STR_NM_EVD2_0e"] = "MCTP interface error. This is a notification that MCTP interface failure was detected and it is not functional any more.";
eLang.monitoring_events_strings["STR_NM_EVD2_0f"] = "Auto-configuration finished. Operational image finished power source auto-configuration.";
eLang.monitoring_events_strings["STR_NM_EVD2_10"] = "Unsupported Segment Defined Feature. Feature not supported in current segment detected by Intel ME Firmware."
eLang.monitoring_events_strings["STR_NM_EVD2_11_FF"] = "Reserved";
// (u8HealthEventType) EVD2 == 0x03  EVD == ?? 
eLang.monitoring_events_strings["STR_NM_FLASH_PARTITION_TABLE"] = "INFORMATIONAL Event:  flash partition table, recovery image or factory presets image corrupted";
eLang.monitoring_events_strings["STR_NM_FLASH_ERASE_LIMIT_REACHED"] = "WARNING Event: Flash erase limit has been reached - wait until wear-out protection expires. Flash device must be replaced if the error is persistent.";
eLang.monitoring_events_strings["STR_NM_FLASH_WRITE_LIMIT_REACHED"] = "WARNING Event: Flash write limit has been reached, writing to flash has been disabled - wait until wear-out protection expires. Flash device must be replaced if the error is persistent.";
eLang.monitoring_events_strings["STR_NM_FLASH_WRITE_ENABLED"]       = "INFORMATIONAL Event: Writing to flash has been enabled - wear-out protection expired.";

//(u8HealthEventType) EVD2 == 0x07

eLang.monitoring_events_strings["STR_NM_CONFIG_GENERIC"] = "Gerneric error."
eLang.monitoring_events_strings["STR_NM_CONFIG_MISSING_VSCC"]       = "Wrong or missing VSCC table";
eLang.monitoring_events_strings["STR_NM_CONFIG_SENSOR_SCAN"]       = "Wrong sensor scanning period in PIA";
eLang.monitoring_events_strings["STR_NM_CONFIG_DEVICE"]       = "Wrong device definition in PIA";
eLang.monitoring_events_strings["STR_NM_CONFIG_SMART"]       = "Wrong SMART/CLST configuration";
eLang.monitoring_events_strings["STR_NM_CONFIG_INCONSISTENT"]       = "Intel ME FW configuration is inconsistent or out of range.";
eLang.monitoring_events_strings["STR_NM_CONFIG_FLASH_WRITE"]       = "percentage of flash write operations which have been conducted";

//(u8HealthEventType) EVD2 == 0x0D 
eLang.monitoring_events_strings["STR_NM_EVD2_0d_01"] = "- DRAM Init Done event not received";
eLang.monitoring_events_strings["STR_NM_EVD2_0d_02"] = "- MCTP SAD Register not correctly configured by BIOS.";
eLang.monitoring_events_strings["STR_NM_EVD2_0d_03"] = "- DMI timeout of PECI request."; 

// (u8HealthEventType) EVD2 == 10h
eLang.monitoring_events_strings["STR_NM_EVD2_10_00"] = "- Other Segment Defined Feature ";
eLang.monitoring_events_strings["STR_NM_EVD2_10_01"] = "- Fast NM limiting ";
eLang.monitoring_events_strings["STR_NM_EVD2_10_02"] = "- Volumetric Airflow and Outlet Temperature";
eLang.monitoring_events_strings["STR_NM_EVD2_10_03"] = "- CUPS ";
eLang.monitoring_events_strings["STR_NM_EVD2_10_04"] = "- Thermal policies and Inlet Temperature ";
eLang.monitoring_events_strings["STR_NM_EVD2_10_05"] = "- Platform limiting with MICs";
eLang.monitoring_events_strings["STR_NM_EVD2_10_07"] = "- Shared power supplies ";
eLang.monitoring_events_strings["STR_NM_EVD2_10_08"] = "- MIC Proxy ";
eLang.monitoring_events_strings["STR_NM_EVD2_10_09"] = "- Reset warning ";
eLang.monitoring_events_strings["STR_NM_EVD2_10_0a"] = "- PMBus Proxy ";
eLang.monitoring_events_strings["STR_NM_EVD2_10_0b"] = "- Always on ";
eLang.monitoring_events_strings["STR_NM_EVD2_10_0c"] = "- IPMI ME FW update ";
eLang.monitoring_events_strings["STR_NM_EVD2_10_0d"] = "- MCTP bus owner ";
eLang.monitoring_events_strings["STR_NM_EVD2_10_0e"] = "- MCTP bus owner proxy ";
eLang.monitoring_events_strings["STR_NM_EVD2_10_0f"] = "- Dual BIOS ";
eLang.monitoring_events_strings["STR_NM_EVD2_10_10"] = "- Battery less ";



//----------------add  SPS (ME) Firmware Health
//  

eLang.monitoring_events_strings["STR_NM_POLICYCORRECTIONTIME"]      = "Policy correction time exceeded ";
eLang.monitoring_events_strings["STR_NM_DOMAIN_PLAT"]    = "for entire platform. ";
eLang.monitoring_events_strings["STR_NM_DOMAIN_CPU"]     = "for CPU subsystem. ";
eLang.monitoring_events_strings["STR_NM_DOMAIN_MEM"]     = "for memory subsystem. ";
eLang.monitoring_events_strings["STR_NM_DOMAIN_UNKNOWN"] = "for unknown subsystem. ";
eLang.monitoring_events_strings["STR_NM_POLICY"]      	 = "Policy ID: ";
eLang.monitoring_events_strings["STR_NM_POLICY_UNKNOWN"] = "Unknown policy ID."
eLang.monitoring_events_strings["STR_NM_SMCLST"] = "SmaRT - CLST";
eLang.monitoring_events_strings["STR_NM_SMCLST_FROMPSU"] = "from PSU sensor";
eLang.monitoring_events_strings["STR_NM_SMCLST_FROMEXT"] = "from external device";

eLang.monitoring_events_strings["STR_EVENT_PREV"] = "<"; //"Previous";
eLang.monitoring_events_strings["STR_EVENT_NEXT"] = ">"; //"Next";
eLang.monitoring_events_strings["STR_EVENT_ALL"] = "All";
eLang.monitoring_events_strings["STR_EVENT_FIRST"] = "First";
eLang.monitoring_events_strings["STR_EVENT_LAST"] = "Last";
eLang.monitoring_events_strings["STR_EVENT_ALLWARN"] = "Warning: Viewing a large number of events at one time may have detrimental effects on browser performance.";
eLang.monitoring_events_strings["STR_EVENT_PERPAGE"] = "Events per page: ";

// Other event specific strings.
eLang.monitoring_events_strings["STR_OSEVENT"] = "OS Event";
eLang.monitoring_events_strings["STR_BIOSREC"] = "BIOS Recovery";
eLang.monitoring_events_strings["STR_OTHER"] = "Other Unknown Event";

