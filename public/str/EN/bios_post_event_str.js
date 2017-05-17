/*********************************BIOS POST EVENT STRINGS***********************************/
eLang.bios_post_event_strings = new Array();

eLang.bios_post_event_strings[0] = new Array();
eLang.bios_post_event_strings[1] = new Array();
eLang.bios_post_event_strings[2] =  eLang.bios_post_event_strings[1];

eLang.bios_post_event_strings[0][0] =  "Unspecified."
eLang.bios_post_event_strings[0][1] =  "No system memory is physically installed in the system."
eLang.bios_post_event_strings[0][2] =  "No usable system memory, all installed memory has experienced an unrecoverable failure."
eLang.bios_post_event_strings[0][3] =  "Unrecoverable hard-disk/ATAPI/IDE device failure."
eLang.bios_post_event_strings[0][4] =  "Unrecoverable system-board failure."
eLang.bios_post_event_strings[0][5] =  "Unrecoverable diskette subsystem failure."
eLang.bios_post_event_strings[0][6] =  "Unrecoverable hard-disk controller failure."
eLang.bios_post_event_strings[0][7] =  "Unrecoverable PS/2 or USB keyboard failure."
eLang.bios_post_event_strings[0][8] =  "Removable boot media not found."
eLang.bios_post_event_strings[0][9] =  "Unrecoverable video controller failure."
eLang.bios_post_event_strings[0][10] = "No video device detected."
eLang.bios_post_event_strings[0][11] = "Firmware (BIOS) ROM corruption detected."
eLang.bios_post_event_strings[0][12] = "CPU voltage mismatch (processors that share same supply have mismatched voltage requirements)."
eLang.bios_post_event_strings[0][13] = "CPU speed matching failure."

eLang.bios_post_event_strings[1][0] =  "Unspecified."
eLang.bios_post_event_strings[1][1] =  "Memory initialization."
eLang.bios_post_event_strings[1][2] =  "Hard-disk initialization."
eLang.bios_post_event_strings[1][3] =  "Secondary processor(s) initialization."
eLang.bios_post_event_strings[1][4] =  "User authentication."
eLang.bios_post_event_strings[1][5] =  "User-initiated system setup."
eLang.bios_post_event_strings[1][6] =  "USB resource configuration."
eLang.bios_post_event_strings[1][7] =  "PCI resource configuration."
eLang.bios_post_event_strings[1][8] =  "Option ROM initialization."
eLang.bios_post_event_strings[1][9] = "Video initialization."
eLang.bios_post_event_strings[1][10] = "Cache initialization."
eLang.bios_post_event_strings[1][11] = "SM Bus initialization."
eLang.bios_post_event_strings[1][12] = "Keyboard controller initialization."
eLang.bios_post_event_strings[1][13] = "Embedded controller/management controller initialization."
eLang.bios_post_event_strings[1][14] = "Docking station attachment."
eLang.bios_post_event_strings[1][15] = "Enabling docking station."
eLang.bios_post_event_strings[1][16] = "Docking station ejection."
eLang.bios_post_event_strings[1][17] = "Disabling docking station."
eLang.bios_post_event_strings[1][18] = "Calling operating system wake-up vector."
eLang.bios_post_event_strings[1][19] = "Starting operating system boot process."
eLang.bios_post_event_strings[1][20] = "Baseboard or motherboard initialization."
eLang.bios_post_event_strings[1][21] = "reserved."
eLang.bios_post_event_strings[1][22] = "Floppy initialization."
eLang.bios_post_event_strings[1][23] = "Keyboard test."
eLang.bios_post_event_strings[1][24] = "Pointing device test."
eLang.bios_post_event_strings[1][25] = "Primary processor initialization."


//The following are taken from BIOS EPS added by Palan to fix the tracker: EPSD100224377 - BMC Web Console SEL Viewer is not decoding BIOS Post Error Descriptions.

eLang.bios_post_event_strings[0x00][0x12] = "System RTC date/time not set -Major "
eLang.bios_post_event_strings[0x00][0x48] = "Password check failed -Major "

eLang.bios_post_event_strings[0x01][0x40] = "PCI component encountered a PERR error -Major "
eLang.bios_post_event_strings[0x01][0x41] = "PCI resource conflict -Major "
eLang.bios_post_event_strings[0x01][0x46] = "PCI out of resources error -Major "
eLang.bios_post_event_strings[0x01][0x91] = "Processor core/thread count mismatch detected -Fatal "
eLang.bios_post_event_strings[0x01][0x92] = "Processor cache size mismatch detected -Fatal "
eLang.bios_post_event_strings[0x01][0x94] = "Processor family mismatch detected -Fatal "
eLang.bios_post_event_strings[0x01][0x95] = "Processor Intel&reg; QPI link frequencies unable to synchronize -Fatal "
eLang.bios_post_event_strings[0x01][0x96] = "	Processor model mismatch detected -Fatal "
eLang.bios_post_event_strings[0x01][0x97] = "Processor frequencies unable to synchronize -Fatal"

eLang.bios_post_event_strings[0x52] = new Array();
eLang.bios_post_event_strings[0x52][0x20] = "BIOS Settings reset to default settings -Major "
eLang.bios_post_event_strings[0x52][0x21] = "Passwords cleared by jumper -Major " 
eLang.bios_post_event_strings[0x52][0x24] = "Password clear jumper is Set -Major "

eLang.bios_post_event_strings[0x81] = new Array();
eLang.bios_post_event_strings[0x81][0x30] = "Processor 01 disabled -Major "
eLang.bios_post_event_strings[0x81][0x31] = "Processor 02 disabled -Major "
eLang.bios_post_event_strings[0x81][0x32] = "Processor 03 disabled -Major "
eLang.bios_post_event_strings[0x81][0x33] = "Processor 04 disabled -Major "
eLang.bios_post_event_strings[0x81][0x60] = "Processor 01 unable to apply microcode update -Major "
eLang.bios_post_event_strings[0x81][0x61] = "Processor 02 unable to apply microcode update -Major "
eLang.bios_post_event_strings[0x81][0x62] = "Processor 03 unable to apply microcode update -Major "
eLang.bios_post_event_strings[0x81][0x63] = "Processor 04 unable to apply microcode update -Major "
eLang.bios_post_event_strings[0x81][0x70] = "Processor 01 failed Self Test (BIST) -Major "
eLang.bios_post_event_strings[0x81][0x71] = "Processor 02 failed Self Test (BIST) -Major "
eLang.bios_post_event_strings[0x81][0x72] = "Processor 03 failed Self Test (BIST) -Major "
eLang.bios_post_event_strings[0x81][0x73] = "Processor 04 failed Self Test (BIST) -Major "
eLang.bios_post_event_strings[0x81][0x80] = "Processor 01 microcode update not found -Major "
eLang.bios_post_event_strings[0x81][0x81] = "Processor 02 microcode update not found -Major "
eLang.bios_post_event_strings[0x81][0x82] = "Processor 03 microcode update not found -Major "
eLang.bios_post_event_strings[0x81][0x83] = "Processor 04 microcode update not found -Major "
eLang.bios_post_event_strings[0x81][0x90] = "Watchdog timer failed on last boot -Major "
eLang.bios_post_event_strings[0x81][0x98] = "OS boot watchdog timer failure -Major "

eLang.bios_post_event_strings[0x83] = new Array();
eLang.bios_post_event_strings[0x83][0x00] = "Baseboard management controller failed self-test -Major "
eLang.bios_post_event_strings[0x83][0x05] = "Hot Swap Controller failure -Major "
eLang.bios_post_event_strings[0x83][0xA0] = "Management Engine (ME) failed Selftest -Major "
eLang.bios_post_event_strings[0x83][0xA1] = "Management Engine (ME) Failed to respond -Major "

eLang.bios_post_event_strings[0x84] = new Array();
eLang.bios_post_event_strings[0x84][0xF2] = "Baseboard management controller failed to respond -Major "
eLang.bios_post_event_strings[0x84][0xF3] = "Baseboard management controller in update mode -Major "
eLang.bios_post_event_strings[0x84][0xF4] = "Sensor data record empty -Major "
eLang.bios_post_event_strings[0x84][0xFF] = "System event log full -Major "

eLang.bios_post_event_strings[0x85] = new Array();
eLang.bios_post_event_strings[0x85][0x00] = "Memory component could not be configured in the selected RAS mode -Major "
eLang.bios_post_event_strings[0x85][0x01] = "DIMM Population Error -Major "
eLang.bios_post_event_strings[0x85][0x20] = "DIMM_A1 failed test/initialization -Major "
eLang.bios_post_event_strings[0x85][0x21] = "DIMM_A2 failed test/initialization -Major "
eLang.bios_post_event_strings[0x85][0x22] = "DIMM_A3 failed test/initialization -Major "
eLang.bios_post_event_strings[0x85][0x23] = "DIMM_B1 failed test/initialization -Major "
eLang.bios_post_event_strings[0x85][0x24] = "DIMM_B2 failed test/initialization -Major "
eLang.bios_post_event_strings[0x85][0x25] = "DIMM_B3 failed test/initialization -Major "
eLang.bios_post_event_strings[0x85][0x26] = "DIMM_C1 failed test/initialization -Major "
eLang.bios_post_event_strings[0x85][0x27] = "DIMM_C2 failed test/initialization -Major "
eLang.bios_post_event_strings[0x85][0x28] = "DIMM_C3 failed test/initialization -Major "
eLang.bios_post_event_strings[0x85][0x29] = "DIMM_D1 failed test/initialization -Major "
eLang.bios_post_event_strings[0x85][0x2A] = "DIMM_D2 failed test/initialization -Major "
eLang.bios_post_event_strings[0x85][0x2B] = "DIMM_D3 failed test/initialization -Major "
eLang.bios_post_event_strings[0x85][0x2C] = "DIMM_E1 failed test/initialization -Major "
eLang.bios_post_event_strings[0x85][0x2D] = "DIMM_E2 failed test/initialization -Major "
eLang.bios_post_event_strings[0x85][0x2E] = "DIMM_E3 failed test/initialization -Major "
eLang.bios_post_event_strings[0x85][0x2F] = "DIMM_F1 failed test/initialization -Major "
eLang.bios_post_event_strings[0x85][0x30] = "DIMM_F2 failed test/initialization -Major "
eLang.bios_post_event_strings[0x85][0x31] = "DIMM_F3 failed test/initialization -Major "
eLang.bios_post_event_strings[0x85][0x32] = "DIMM_G1 failed test/initialization -Major "
eLang.bios_post_event_strings[0x85][0x33] = "DIMM_G2 failed test/initialization -Major "
eLang.bios_post_event_strings[0x85][0x34] = "DIMM_G3 failed test/initialization -Major "
eLang.bios_post_event_strings[0x85][0x35] = "DIMM_H1 failed test/initialization -Major "
eLang.bios_post_event_strings[0x85][0x36] = "DIMM_H2 failed test/initialization -Major "
eLang.bios_post_event_strings[0x85][0x37] = "DIMM_H3 failed test/initialization -Major "
eLang.bios_post_event_strings[0x85][0x38] = "DIMM_J1 failed test/initialization -Major "
eLang.bios_post_event_strings[0x85][0x39] = "DIMM_J2 failed test/initialization -Major "
eLang.bios_post_event_strings[0x85][0x3A] = "DIMM_J3 failed test/initialization -Major "
eLang.bios_post_event_strings[0x85][0x3B] = "DIMM_K1 failed test/initialization -Major "
eLang.bios_post_event_strings[0x85][0x3C] = "DIMM_K2 failed test/initialization -Major "
eLang.bios_post_event_strings[0x85][0x3D] = "DIMM_K3 failed test/initialization -Major "
eLang.bios_post_event_strings[0x85][0x3E] = "DIMM_L1 failed test/initialization -Major "
eLang.bios_post_event_strings[0x85][0x3F] = "DIMM_L2 failed test/initialization -Major "
eLang.bios_post_event_strings[0x85][0x40] = "DIMM_A1 disabled -Major "
eLang.bios_post_event_strings[0x85][0x41] = "DIMM_A2 disabled -Major "
eLang.bios_post_event_strings[0x85][0x42] = "DIMM_A3 disabled -Major "
eLang.bios_post_event_strings[0x85][0x43] = "DIMM_B1 disabled -Major "
eLang.bios_post_event_strings[0x85][0x44] = "DIMM_B2 disabled -Major "
eLang.bios_post_event_strings[0x85][0x45] = "DIMM_B3 disabled -Major "
eLang.bios_post_event_strings[0x85][0x46] = "DIMM_C1 disabled -Major "
eLang.bios_post_event_strings[0x85][0x47] = "DIMM_C2 disabled -Major "
eLang.bios_post_event_strings[0x85][0x48] = "DIMM_C3 disabled -Major "
eLang.bios_post_event_strings[0x85][0x49] = "DIMM_D1 disabled -Major "
eLang.bios_post_event_strings[0x85][0x4A] = "DIMM_D2 disabled -Major "
eLang.bios_post_event_strings[0x85][0x4B] = "DIMM_D3 disabled -Major "
eLang.bios_post_event_strings[0x85][0x4C] = "DIMM_E1 disabled -Major "
eLang.bios_post_event_strings[0x85][0x4D] = "DIMM_E2 disabled -Major "
eLang.bios_post_event_strings[0x85][0x4E] = "DIMM_E3 disabled -Major "
eLang.bios_post_event_strings[0x85][0x4F] = "DIMM_F1 disabled -Major "
eLang.bios_post_event_strings[0x85][0x50] = "DIMM_F2 disabled -Major "
eLang.bios_post_event_strings[0x85][0x51] = "DIMM_F3 disabled -Major "
eLang.bios_post_event_strings[0x85][0x52] = "DIMM_G1 disabled -Major "
eLang.bios_post_event_strings[0x85][0x53] = "DIMM_G2 disabled -Major "
eLang.bios_post_event_strings[0x85][0x54] = "DIMM_G3 disabled -Major "
eLang.bios_post_event_strings[0x85][0x55] = "DIMM_H1 disabled -Major "
eLang.bios_post_event_strings[0x85][0x56] = "DIMM_H2 disabled -Major " 
eLang.bios_post_event_strings[0x85][0x57] = "DIMM_H3 disabled -Major "
eLang.bios_post_event_strings[0x85][0x58] = "DIMM_J1 disabled -Major "
eLang.bios_post_event_strings[0x85][0x59] = "DIMM_J2 disabled -Major "
eLang.bios_post_event_strings[0x85][0x5A] = "DIMM_J3 disabled -Major "
eLang.bios_post_event_strings[0x85][0x5B] = "DIMM_K1 disabled -Major "
eLang.bios_post_event_strings[0x85][0x5C] = "DIMM_K2 disabled -Major "
eLang.bios_post_event_strings[0x85][0x5D] = "DIMM_K3 disabled -Major "
eLang.bios_post_event_strings[0x85][0x5E] = "DIMM_L1 disabled -Major "
eLang.bios_post_event_strings[0x85][0x5F] = "DIMM_L2 disabled -Major "
eLang.bios_post_event_strings[0x85][0x60] = "DIMM_A1 encountered a Serial Presence Detection (SPD) failure -Major "
eLang.bios_post_event_strings[0x85][0x61] = "DIMM_A2 encountered a Serial Presence Detection (SPD) failure -Major "
eLang.bios_post_event_strings[0x85][0x62] = "DIMM_A3 encountered a Serial Presence Detection (SPD) failure -Major "
eLang.bios_post_event_strings[0x85][0x63] = "DIMM_B1 encountered a Serial Presence Detection (SPD) failure -Major "
eLang.bios_post_event_strings[0x85][0x64] = "DIMM_B2 encountered a Serial Presence Detection (SPD) failure -Major "
eLang.bios_post_event_strings[0x85][0x65] = "DIMM_B3 encountered a Serial Presence Detection (SPD) failure -Major "
eLang.bios_post_event_strings[0x85][0x66] = "DIMM_C1 encountered a Serial Presence Detection (SPD) failure -Major "
eLang.bios_post_event_strings[0x85][0x67] = "DIMM_C2 encountered a Serial Presence Detection (SPD) failure -Major "
eLang.bios_post_event_strings[0x85][0x68] = "DIMM_C3 encountered a Serial Presence Detection (SPD) failure -Major "
eLang.bios_post_event_strings[0x85][0x69] = "DIMM_D1 encountered a Serial Presence Detection (SPD) failure -Major "
eLang.bios_post_event_strings[0x85][0x6A] = "DIMM_D2 encountered a Serial Presence Detection (SPD) failure -Major "
eLang.bios_post_event_strings[0x85][0x6B] = "DIMM_D3 encountered a Serial Presence Detection (SPD) failure -Major "
eLang.bios_post_event_strings[0x85][0x6C] = "DIMM_E1 encountered a Serial Presence Detection (SPD) failure -Major "
eLang.bios_post_event_strings[0x85][0x6D] = "DIMM_E2 encountered a Serial Presence Detection (SPD) failure -Major "
eLang.bios_post_event_strings[0x85][0x6E] = "DIMM_E3 encountered a Serial Presence Detection (SPD) failure -Major "
eLang.bios_post_event_strings[0x85][0x6F] = "DIMM_F1 encountered a Serial Presence Detection (SPD) failure -Major "
eLang.bios_post_event_strings[0x85][0x70] = "DIMM_F2 encountered a Serial Presence Detection (SPD) failure -Major "
eLang.bios_post_event_strings[0x85][0x71] = "DIMM_F3 encountered a Serial Presence Detection (SPD) failure -Major "
eLang.bios_post_event_strings[0x85][0x72] = "DIMM_G1 encountered a Serial Presence Detection (SPD) failure -Major "
eLang.bios_post_event_strings[0x85][0x73] = "DIMM_G2 encountered a Serial Presence Detection (SPD) failure -Major "
eLang.bios_post_event_strings[0x85][0x74] = "DIMM_G3 encountered a Serial Presence Detection (SPD) failure -Major "
eLang.bios_post_event_strings[0x85][0x75] = "DIMM_H1 encountered a Serial Presence Detection (SPD) failure -Major "
eLang.bios_post_event_strings[0x85][0x76] = "DIMM_H2 encountered a Serial Presence Detection (SPD) failure -Major "
eLang.bios_post_event_strings[0x85][0x77] = "DIMM_H3 encountered a Serial Presence Detection (SPD) failure -Major "
eLang.bios_post_event_strings[0x85][0x78] = "DIMM_J1 encountered a Serial Presence Detection (SPD) failure -Major "
eLang.bios_post_event_strings[0x85][0x79] = "DIMM_J2 encountered a Serial Presence Detection (SPD) failure -Major "
eLang.bios_post_event_strings[0x85][0x7A] = "DIMM_J3 encountered a Serial Presence Detection (SPD) failure -Major "
eLang.bios_post_event_strings[0x85][0x7B] = "DIMM_K1 encountered a Serial Presence Detection (SPD) failure -Major "
eLang.bios_post_event_strings[0x85][0x7C] = "DIMM_K2 encountered a Serial Presence Detection (SPD) failure -Major "
eLang.bios_post_event_strings[0x85][0x7D] = "DIMM_K3 encountered a Serial Presence Detection (SPD) failure -Major "
eLang.bios_post_event_strings[0x85][0x7E] = "DIMM_L1 encountered a Serial Presence Detection (SPD) failure -Major "
eLang.bios_post_event_strings[0x85][0x7F] = "DIMM_L2 encountered a Serial Presence Detection (SPD) failure -Major "
eLang.bios_post_event_strings[0x85][0xC0] = "DIMM_L3 failed test/initialization -Major "
eLang.bios_post_event_strings[0x85][0xC1] = "DIMM_M1 failed test/initialization -Major "
eLang.bios_post_event_strings[0x85][0xC2] = "DIMM_M2 failed test/initialization -Major "
eLang.bios_post_event_strings[0x85][0xC3] = "DIMM_M3 failed test/initialization -Major "
eLang.bios_post_event_strings[0x85][0xC4] = "DIMM_N1 failed test/initialization -Major "
eLang.bios_post_event_strings[0x85][0xC5] = "DIMM_N2 failed test/initialization -Major "
eLang.bios_post_event_strings[0x85][0xC6] = "DIMM_N3 failed test/initialization -Major "
eLang.bios_post_event_strings[0x85][0xC7] = "DIMM_P1 failed test/initialization -Major "
eLang.bios_post_event_strings[0x85][0xC8] = "DIMM_P2 failed test/initialization -Major "
eLang.bios_post_event_strings[0x85][0xC9] = "DIMM_P3 failed test/initialization -Major "
eLang.bios_post_event_strings[0x85][0xCA] = "DIMM_R1 failed test/initialization -Major "
eLang.bios_post_event_strings[0x85][0xCB] = "DIMM_R2 failed test/initialization -Major "
eLang.bios_post_event_strings[0x85][0xCC] = "DIMM_R3 failed test/initialization -Major "
eLang.bios_post_event_strings[0x85][0xCD] = "DIMM_T1 failed test/initialization -Major "
eLang.bios_post_event_strings[0x85][0xCE] = "DIMM_T2 failed test/initialization -Major "
eLang.bios_post_event_strings[0x85][0xCF] = "DIMM_T3 failed test/initialization -Major "
eLang.bios_post_event_strings[0x85][0xD0] = "DIMM_L3 disabled -Major "
eLang.bios_post_event_strings[0x85][0xD1] = "DIMM_M1 disabled -Major "
eLang.bios_post_event_strings[0x85][0xD2] = "DIMM_M2 disabled -Major "
eLang.bios_post_event_strings[0x85][0xD3] = "DIMM_M3 disabled -Major "
eLang.bios_post_event_strings[0x85][0xD4] = "DIMM_N1 disabled -Major "
eLang.bios_post_event_strings[0x85][0xD5] = "DIMM_N2 disabled -Major "
eLang.bios_post_event_strings[0x85][0xD6] = "DIMM_N3 disabled -Major "
eLang.bios_post_event_strings[0x85][0xD7] = "DIMM_P1 disabled -Major "
eLang.bios_post_event_strings[0x85][0xD8] = "DIMM_P2 disabled -Major "
eLang.bios_post_event_strings[0x85][0xD9] = "DIMM_P3 disabled -Major "
eLang.bios_post_event_strings[0x85][0xDA] = "DIMM_R1 disabled -Major "
eLang.bios_post_event_strings[0x85][0xDB] = "DIMM_R2 disabled -Major "
eLang.bios_post_event_strings[0x85][0xDC] = "DIMM_R3 disabled -Major "
eLang.bios_post_event_strings[0x85][0xDD] = "DIMM_T1 disabled -Major "
eLang.bios_post_event_strings[0x85][0xDE] = "DIMM_T2 disabled -Major "
eLang.bios_post_event_strings[0x85][0xDF] = "DIMM_T3 disabled -Major "
eLang.bios_post_event_strings[0x85][0xE0] = "DIMM_L3 encountered a Serial Presence Detection (SPD) failure -Major "
eLang.bios_post_event_strings[0x85][0xE1] = "DIMM_M1 encountered a Serial Presence Detection (SPD) failure -Major "
eLang.bios_post_event_strings[0x85][0xE2] = "DIMM_M2 encountered a Serial Presence Detection (SPD) failure -Major "
eLang.bios_post_event_strings[0x85][0xE3] = "DIMM_M3 encountered a Serial Presence Detection (SPD) failure -Major "
eLang.bios_post_event_strings[0x85][0xE4] = "DIMM_N1 encountered a Serial Presence Detection (SPD) failure -Major "
eLang.bios_post_event_strings[0x85][0xE5] = "DIMM_N2 encountered a Serial Presence Detection (SPD) failure -Major "
eLang.bios_post_event_strings[0x85][0xE6] = "DIMM_N3 encountered a Serial Presence Detection (SPD) failure -Major "
eLang.bios_post_event_strings[0x85][0xE7] = "DIMM_P1 encountered a Serial Presence Detection (SPD) failure -Major "
eLang.bios_post_event_strings[0x85][0xE8] = "DIMM_P2 encountered a Serial Presence Detection (SPD) failure -Major "
eLang.bios_post_event_strings[0x85][0xE9] = "DIMM_P3 encountered a Serial Presence Detection (SPD) failure -Major "
eLang.bios_post_event_strings[0x85][0xEA] = "DIMM_R1 encountered a Serial Presence Detection (SPD) failure -Major "
eLang.bios_post_event_strings[0x85][0xEB] = "DIMM_R2 encountered a Serial Presence Detection (SPD) failure -Major "
eLang.bios_post_event_strings[0x85][0xEC] = "DIMM_R3 encountered a Serial Presence Detection (SPD) failure -Major "
eLang.bios_post_event_strings[0x85][0xED] = "DIMM_T1 encountered a Serial Presence Detection (SPD) failure -Major "
eLang.bios_post_event_strings[0x85][0xEE] = "DIMM_T2 encountered a Serial Presence Detection (SPD) failure -Major "
eLang.bios_post_event_strings[0x85][0xEF] = "DIMM_T3 encountered a Serial Presence Detection (SPD) failure -Major "

eLang.bios_post_event_strings[0x86] = new Array();
eLang.bios_post_event_strings[0x86][0x04] = "POST Reclaim of non-critical NVRAM variables -Minor "
eLang.bios_post_event_strings[0x86][0x05] = "BIOS Settings are corrupted -Major "
eLang.bios_post_event_strings[0x86][0x06] = "NVRAM variable space was corrupted and has been reinitialized -Major "
eLang.bios_post_event_strings[0x86][0x07] = "Recovery boot has been initiated -Fatal "

eLang.bios_post_event_strings[0x92] = new Array();
eLang.bios_post_event_strings[0x92][0xA3] = "Serial port component was not detected -Major "
eLang.bios_post_event_strings[0x92][0xA9] = "Serial port component encountered a resource conflict error -Major "

eLang.bios_post_event_strings[0xA0] = new Array();
eLang.bios_post_event_strings[0xA0][0x00] = "TPM device not detected -Minor "
eLang.bios_post_event_strings[0xA0][0x01] = "TPM device missing or not responding -Minor "
eLang.bios_post_event_strings[0xA0][0x02] = "TPM device failure -Minor "
eLang.bios_post_event_strings[0xA0][0x03] = "TPM device failed self test -Minor "

eLang.bios_post_event_strings[0xA1] = new Array();
eLang.bios_post_event_strings[0xA1][0x00] = "BIOS ACM Error -Major "

eLang.bios_post_event_strings[0xA4] = new Array();
eLang.bios_post_event_strings[0xA4][0x21] = "PCI component encountered a SERR error -Fatal "

eLang.bios_post_event_strings[0xA5] = new Array();
eLang.bios_post_event_strings[0xA5][0xA0] = "PCI Express component encountered a PERR error -Minor"
eLang.bios_post_event_strings[0xA5][0xA1] = "PCI Express component encountered an SERR error -Fatal"

eLang.bios_post_event_strings[0xA6] = new Array();
eLang.bios_post_event_strings[0xA6][0xA0] = "DXE Boot Services driver: Not enough memory available to shadow a Legacy Option ROM. - Minor"

/*******************************************************************************************/