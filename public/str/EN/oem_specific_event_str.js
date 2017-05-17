eLang.oem_VRD_Hot_event_map_strings = new Array();

eLang.oem_VRD_Hot_event_map_strings[0] = new Array();
eLang.oem_VRD_Hot_event_map_strings[0][0] = "CPU1";
eLang.oem_VRD_Hot_event_map_strings[0][1] = "CPU2";
eLang.oem_VRD_Hot_event_map_strings[0][2] = "CPU3";
eLang.oem_VRD_Hot_event_map_strings[0][3] = "CPU4";

eLang.oem_VRD_Hot_event_map_strings[1] = new Array();
eLang.oem_VRD_Hot_event_map_strings[1][0] = "CPU1 DIMM Channel1/2";
eLang.oem_VRD_Hot_event_map_strings[1][1] = "CPU1 DIMM Channel3/4";
eLang.oem_VRD_Hot_event_map_strings[1][2] = "CPU2 DIMM Channel1/2";
eLang.oem_VRD_Hot_event_map_strings[1][3] = "CPU2 DIMM Channel3/4";
eLang.oem_VRD_Hot_event_map_strings[1][4] = "CPU3 DIMM Channel1/2";
eLang.oem_VRD_Hot_event_map_strings[1][5] = "CPU3 DIMM Channel3/4";
eLang.oem_VRD_Hot_event_map_strings[1][6] = "CPU4 DIMM Channel1/2";
eLang.oem_VRD_Hot_event_map_strings[1][7] = "CPU4 DIMM Channel3/4";

eLang.oem_power_failure_detection_map_strings = new Array();
eLang.oem_power_failure_detection_map_strings[0] = "240VA protection";
eLang.oem_power_failure_detection_map_strings[1] = "Memory power system fault";
eLang.oem_power_failure_detection_map_strings[2] = "CPU Subsystem fault";
eLang.oem_power_failure_detection_map_strings[3] = "PCH Active Sleep Power failure";
eLang.oem_power_failure_detection_map_strings[4] = "PCH Main Power failure";
eLang.oem_power_failure_detection_map_strings[5] = "On-board 5V and 3V3 Power failure";
eLang.oem_power_failure_detection_map_strings[6] = "Power Supply failure";
eLang.oem_power_failure_detection_map_strings[7] = "On-board NIC Power failure";
eLang.oem_power_failure_detection_map_strings[8] = "infiniband Power failure";
eLang.oem_power_failure_detection_map_strings[9] = "On-board SAS Module Power failure";

eLang.oem_specific_event_strings = new Array();
eLang.oem_specific_event_strings[43] = new Array();
eLang.oem_specific_event_strings[43][0] =      "Update started. ";
eLang.oem_specific_event_strings[43][1] =      "Update completed successfully. ";
eLang.oem_specific_event_strings[43][2] =      "Update failure. ";
eLang.oem_specific_event_strings[43][3] =      "reserve. ";
eLang.oem_specific_event_strings[43][4] =      "reserve. ";
eLang.oem_specific_event_strings[43][5] =      "BMC ";
eLang.oem_specific_event_strings[43][6] =      "BIOS ";
eLang.oem_specific_event_strings[43][7] =      "ME ";
eLang.oem_specific_event_strings[43][8] =      "SDR repository ";
eLang.oem_specific_event_strings[43][9] =      "reserve ";
eLang.oem_specific_event_strings[43][10] =     "Severity OK. ";
eLang.oem_specific_event_strings[43][11] =     "Severity Degraded. ";
eLang.oem_specific_event_strings[43][12] =     "Severity Non-fatal. ";
eLang.oem_specific_event_strings[43][13] =      "Severity Fatal. ";
eLang.oem_specific_event_strings[43][14] =      "reserve. ";
eLang.oem_specific_event_strings[43][15] =      "Major rev ";
eLang.oem_specific_event_strings[43][16] =      " Minor rev ";
eLang.oem_specific_event_strings[43][17] =      " Build ID ";

// PCIe Fatal Errors (SN: 0x04, Offsets 0x00 - 0x0F)
eLang.oem_specific_event_strings[0x04] = new Array();
eLang.oem_specific_event_strings[0x04][0x00] = "Data Link Layer Protocol Error ";
eLang.oem_specific_event_strings[0x04][0x01] = "Surprise Link Down Error ";
eLang.oem_specific_event_strings[0x04][0x02] = "Completer Abort ";
eLang.oem_specific_event_strings[0x04][0x03] = "Unsupported Request ";
eLang.oem_specific_event_strings[0x04][0x04] = "Poisoned TLP ";
eLang.oem_specific_event_strings[0x04][0x05] = "Flow Control Protocol ";
eLang.oem_specific_event_strings[0x04][0x06] = "Completion Timeout ";
eLang.oem_specific_event_strings[0x04][0x07] = "Receiver Buffer Overflow ";
eLang.oem_specific_event_strings[0x04][0x08] = "ACS Violation ";
eLang.oem_specific_event_strings[0x04][0x09] = "Malformed TLP ";
eLang.oem_specific_event_strings[0x04][0x0A] = "ECRC Error ";
eLang.oem_specific_event_strings[0x04][0x0B] = "Received Fatal Message From Downstream ";
eLang.oem_specific_event_strings[0x04][0x0C] = "Unexpected Completion ";
eLang.oem_specific_event_strings[0x04][0x0D] = "Received ERR_NONFATAL Message ";
eLang.oem_specific_event_strings[0x04][0x0E] = "Uncorrectable Internal ";
eLang.oem_specific_event_strings[0x04][0x0F] = "MC Blocked TLP ";

// PCIe Correctable Errors (SN: 0x05, Offsets 0x00 - 0x08)
eLang.oem_specific_event_strings[0x05] = new Array();
eLang.oem_specific_event_strings[0x05][0x00] = "Receiver Error ";
eLang.oem_specific_event_strings[0x05][0x01] = "Bad DLLP ";
eLang.oem_specific_event_strings[0x05][0x02] = "Bad TLLP ";
eLang.oem_specific_event_strings[0x05][0x03] = "Replay Num Rollover ";
eLang.oem_specific_event_strings[0x05][0x04] = "Replay Timer timeout ";
eLang.oem_specific_event_strings[0x05][0x05] = "Advisory Non-fatal ";
eLang.oem_specific_event_strings[0x05][0x06] = "Link BW Changed ";
eLang.oem_specific_event_strings[0x05][0x07] = "Correctable Internal ";
eLang.oem_specific_event_strings[0x05][0x08] = "Header Log Overflow ";

eLang.oem_specific_event_strings[0x1A] = new Array();
eLang.oem_specific_event_strings[0x1A][0x00] = "Authentication failure of the active BMC FW image detected during BMC boot";
eLang.oem_specific_event_strings[0x1A][0x01] = "Invalid security revision of active BMC FW detected during BMC boot";
eLang.oem_specific_event_strings[0x1A][0x02] = "Authentication failure of the BMC FW image detected during BMC update";
eLang.oem_specific_event_strings[0x1A][0x03] = "Invalid security revision of BMC FW detected during FW update";
eLang.oem_specific_event_strings[0x1A][0x04] = "Authentication failure of any signed data region detected during update of that data region, if that data region is not part of the main FW image";
eLang.oem_specific_event_strings[0x1A][0x05] = "Authentication failure of any signed data region detected during BMC boot or runtime if that data region is not part of the main FW image";
eLang.oem_specific_event_strings[0x1A][0x06] = "Invalid security revision of any signed data region detected during update of the region, if that data region is not part of the main FW image";
eLang.oem_specific_event_strings[0x1A][0x07] = "Invalid security revision of any signed data region detected during boot or runtime, if that data region is not part of the main FW image";

// BIOS Recovery Mode Status (SN: 0x15, Offsets 0x00 -- 0x01)
eLang.oem_specific_event_strings[0x15] = new Array();
//eLang.oem_specific_event_strings[0x15][0x00] = "";
eLang.oem_specific_event_strings[0x15][0x01] = "BIOS Recovery Start";
eLang.oem_specific_event_strings[0x15][0x02] = "BIOS Recovery Complete";

// SPS Firmware Health (SN: 0x17, Event Data 2: 0x00 - 0x0A). Note that this is based on Event Data 2, not sensor offset.
eLang.oem_specific_event_strings[0x17] = new Array();
eLang.oem_specific_event_strings[0x17][0x00] = "INFORMATIONAL Event: Encountered a forced GPIO recovery. Recovery Image loaded.";
eLang.oem_specific_event_strings[0x17][0x01] = "CRITICAL Event: Image execution failed. Recovery Image loaded. Either Flash Device must be replaced or the upgrade procedure must be started again.";
eLang.oem_specific_event_strings[0x17][0x02] = "CRITICAL Event: Flash corrupted. Error during Flash erases procedure. Flash device must be replaced.";
eLang.oem_specific_event_strings[0x17][0x03] = "";	// Full description for offset 0x03 is in monitoring_events_str.js
eLang.oem_specific_event_strings[0x17][0x04] = "CRITICAL Event: Internal error during firmware execution. Image shall be updated to other version or hardware board repair is needed (if error is persistent).";
eLang.oem_specific_event_strings[0x17][0x05] = "CRITICAL Event: BMC did not respond to cold reset request and ME rebooted the platform. Verify the Node Manager configuration.";
eLang.oem_specific_event_strings[0x17][0x06] = "INFORMATIONAL Event: Direct Flash update requested by the BIOS. ME Firmware will switch to recovery mode to perform full update from BIOS. This is a transient state. ME Firmware should return to operational mode after successful image update performed by the BIOS.";
eLang.oem_specific_event_strings[0x17][0x07] = "CRITICAL Event: Manufacturing error. Wrong manufacturing configuration detected by ME Firmware. The Flash device must be replaced (if error is persistent).";
eLang.oem_specific_event_strings[0x17][0x08] = "CRITICAL Event: Persistent storage integrity error. Flash file system error detected. If error is persistent restore factory presets by using Force ME Recovery IPMI command or by cycling AC power with ME_FORCE_UPDATE jumper asserted.";
eLang.oem_specific_event_strings[0x17][0x09] = "CRITICAL Event: Internal error during firmware execution. Image shall be updated to other version or hardware board repair is needed (if error is persistent).";
eLang.oem_specific_event_strings[0x17][0x0A] = "WARNING Event: Recovery Image was loaded using Force ME Recovery IPMI command or by other cause.";

// AutoCfg Events (SN: 0x87, ED3: 0x00 - 0x05)
eLang.oem_specific_event_strings[0x87] = new Array();
eLang.oem_specific_event_strings[0x87][0x00] = "Configuration file syntax error";
eLang.oem_specific_event_strings[0x87][0x01] = "Chassis auto-detection error";
eLang.oem_specific_event_strings[0x87][0x02] = "SDR/CFG file mismatch";
eLang.oem_specific_event_strings[0x87][0x03] = "SDR or CFG file corrupted";
eLang.oem_specific_event_strings[0x87][0x04] = "SDR file syntax error";

// NM SmaRT & CLST (SN: 0xB2, ED2 bits 7:4 0x00-0x08)
eLang.oem_specific_event_strings[0xB2] = new Array();
eLang.oem_specific_event_strings[0xB2][0x00] = "transition to OK";
eLang.oem_specific_event_strings[0xB2][0x01] = "transition to non-critical from OK";
eLang.oem_specific_event_strings[0xB2][0x02] = "transition to critical from less severe";
eLang.oem_specific_event_strings[0xB2][0x03] = "transition to unrecoverable from less severe";
eLang.oem_specific_event_strings[0xB2][0x04] = "transition to non-critical from more severe";
eLang.oem_specific_event_strings[0xB2][0x05] = "transition to critical from unrecoverable";
eLang.oem_specific_event_strings[0xB2][0x06] = "transition to unrecoverable";
eLang.oem_specific_event_strings[0xB2][0x07] = "monitor";
eLang.oem_specific_event_strings[0xB2][0x08] = "informational";


//Caterr recovery info sensor(SN: 0x7D)
eLang.oem_specific_event_strings[0x7D] = new Array();
eLang.oem_specific_event_strings[0x7D][0x00] = "Dump successfully.";
eLang.oem_specific_event_strings[0x7D][0x01] = "Dump fail.";
eLang.oem_specific_event_strings[0x7D][0x02] = "Uncore MSR register dump fail";
eLang.oem_specific_event_strings[0x7D][0x03] = "Core MSR register dump fail";
eLang.oem_specific_event_strings[0x7D][0x04] = "IIO register dump fail";
eLang.oem_specific_event_strings[0x7D][0x05] = "PCI config space dump fail";
eLang.oem_specific_event_strings[0x7D][0x06] = "MCA error source register dump fail";
