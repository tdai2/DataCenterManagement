/*************************************** Sensor specific event codes ******************************************/
//eLang.sensor_specific_event_strings[SENSOR TYPE CODE][SENSOR-SPECIFIC OFFSET] = "EVENT DESCRIPTION";
/*********************************************************************************************************************/
eLang.sensor_specific_event_strings = new Array();
eLang.sensor_specific_event_strings[0] = "reserved";
eLang.sensor_specific_event_strings[1] = "Temperature";
eLang.sensor_specific_event_strings[2] = "Voltage";
eLang.sensor_specific_event_strings[3] = "Current";
eLang.sensor_specific_event_strings[4] = "Fan";

eLang.sensor_specific_event_strings[5] = new Array();
eLang.sensor_specific_event_strings[5][0] =      "reports there has been a chassis intrusion";
eLang.sensor_specific_event_strings[5][1] =      "reports there has been a drive bay intrusion";
eLang.sensor_specific_event_strings[5][2] =      "reports there has been an intrusion in the I/O card area";
eLang.sensor_specific_event_strings[5][3] =      "reports there has been an intrusion in the processor area";
eLang.sensor_specific_event_strings[5][4] =      "reports LAN Leash has been lost";
eLang.sensor_specific_event_strings[5][5] =      "reports there has been an unauthorized dock or undock";
eLang.sensor_specific_event_strings[5][6] =      "reports there has been an intrusion in the fan area";


eLang.sensor_specific_event_strings[6] = new Array();
eLang.sensor_specific_event_strings[6][0] =      "reports there has been a Secure Mode (Front Panel Lockout) violation attempt";
eLang.sensor_specific_event_strings[6][1] =      "reports there has been a pre-boot user password violation attempt";
eLang.sensor_specific_event_strings[6][2] =      "reports there has been a pre-boot setup password violation attempt";
eLang.sensor_specific_event_strings[6][3] =      "reports there has been a pre-boot network boot password violation attempt";
eLang.sensor_specific_event_strings[6][4] =      "reports there has been a pre-boot password violation attemp";
eLang.sensor_specific_event_strings[6][5] =      "reports there has been an out-of-band access password violation attempt";

eLang.sensor_specific_event_strings[7] = new Array();
eLang.sensor_specific_event_strings[7][0] =      "reports CATERR has occurred";
eLang.sensor_specific_event_strings[7][1] =      "reports the processor has encountered a Thermal Trip";
eLang.sensor_specific_event_strings["THERMTRIP"] = "reports the processor has encountered a Thermal Trip";
eLang.sensor_specific_event_strings["FIVR"] = "reports the processor has encountered a boot FIVR fault";
eLang.sensor_specific_event_strings[7][2] =      "reports FRB1/BIST Failure";
eLang.sensor_specific_event_strings[7][3] =      "reports FRB2/Hang in POST Failure";
eLang.sensor_specific_event_strings[7][4] =      "reports FRB3/Processor Startup/Initialization Failure";
eLang.sensor_specific_event_strings[7][5] =      "reports there is a configuration error";
eLang.sensor_specific_event_strings[7][6] =      "reports SM BIOS 'Uncorrectable CPU-Complex Error";
eLang.sensor_specific_event_strings[7][7] =      "reports the processor's presence has been detected";
eLang.sensor_specific_event_strings[7][8] =      "reports the processor has been disabled";
eLang.sensor_specific_event_strings[7][9] =      "reports the terminator's presence has been detected";
eLang.sensor_specific_event_strings[7][10] =    "reports the processor has been automatically throttled";

eLang.sensor_specific_event_strings[8] = new Array();
eLang.sensor_specific_event_strings[8][0] =      "reports the power supply's presence has been detected";
eLang.sensor_specific_event_strings[8][1] =      "reports the power supply has suffered a failure";
eLang.sensor_specific_event_strings[8][2] =      "reports a predictive failure has been detected for the power supply";
eLang.sensor_specific_event_strings[8][3] =      "reports the power supply's input (AC/DC) has been lost";
eLang.sensor_specific_event_strings[8][4] =      "reports the power supply's input has been lost or is out-of-range";
eLang.sensor_specific_event_strings[8][5] =      "reports the power supply's input is out-of-range, but present";
eLang.sensor_specific_event_strings[8][6] =      "reports there is a configuration error";

eLang.sensor_specific_event_strings[9] = new Array();
eLang.sensor_specific_event_strings[9][0] =      "reports the power unit is powered off or being powered down";
eLang.sensor_specific_event_strings[9][1] =      "reports the power unit is undergoing a power cycle";
eLang.sensor_specific_event_strings[9][2] =      "reports 240VA is powered down";
eLang.sensor_specific_event_strings[9][3] =      "reports the interlock is powered down";
eLang.sensor_specific_event_strings[9][4] =      "reports the power unit's AC is lost";
eLang.sensor_specific_event_strings[9][5] =      "reports there has been a soft power control failure";
eLang.sensor_specific_event_strings[9][6] =      "reports the power unit has suffered a failure";
eLang.sensor_specific_event_strings[9][7] =      "reports a predictive failure has been detected for the power unit";

eLang.sensor_specific_event_strings[12] = new Array();
eLang.sensor_specific_event_strings[12][0] =      "Correctable ECC";
eLang.sensor_specific_event_strings[12][1] =      "Uncorrectable ECC";
eLang.sensor_specific_event_strings[12][2] =      "Parity";
eLang.sensor_specific_event_strings[12][3] =      "Memory Scrub Failure";
eLang.sensor_specific_event_strings[12][4] =      "Memory Device Disabled";
eLang.sensor_specific_event_strings[12][5] =      "Correctable ECC Logging Limit Reached";
eLang.sensor_specific_event_strings[12][6] =      "Presence Detected";
eLang.sensor_specific_event_strings[12][7] =      "Configuration Error";
eLang.sensor_specific_event_strings[12][8] =      "Spare";
eLang.sensor_specific_event_strings[12][9] =      "Memory Auto Throttled";
eLang.sensor_specific_event_strings[12][10] =     "Critical Overtemperature";

eLang.sensor_specific_event_strings[13] = new Array();
eLang.sensor_specific_event_strings[13][0] =      "Drive Presence";
eLang.sensor_specific_event_strings[13][1] =      "Drive Fault";
eLang.sensor_specific_event_strings[13][2] =      "Predictive Failure";
eLang.sensor_specific_event_strings[13][3] =      "Hot Spare";
eLang.sensor_specific_event_strings[13][4] =      "Consistency Check/Parity Check in progress";
eLang.sensor_specific_event_strings[13][5] =      "In Critical Array";
eLang.sensor_specific_event_strings[13][6] =      "In Failed Array";
eLang.sensor_specific_event_strings[13][7] =      "Rebuild/Remap in progress";
eLang.sensor_specific_event_strings[13][8] =      "Rebuild/Remap Aborted (was not completed normally)";

eLang.sensor_specific_event_strings[15] = new Array();
eLang.sensor_specific_event_strings[15][0] =      "Error";
eLang.sensor_specific_event_strings[15][1] =      "Hang";
eLang.sensor_specific_event_strings[15][2] =      "Progress";



eLang.sensor_specific_event_strings[16] = new Array();
eLang.sensor_specific_event_strings[16][0] =      "reports the correctable memory error logging has been disabled";
eLang.sensor_specific_event_strings[16][1] =      "reports the event logging has been disabled";
eLang.sensor_specific_event_strings[16][2] =      "reports the log area has been cleared";
eLang.sensor_specific_event_strings[16][3] =      "reports all event logging has been disabled";
eLang.sensor_specific_event_strings[16][4] =      "reports the System Event Log (SEL) is full";
eLang.sensor_specific_event_strings[16][5] =      "reports the System Event Log (SEL) is almost full";

eLang.sensor_specific_event_strings[17] = new Array();
eLang.sensor_specific_event_strings[17][0] =      "reports the BIOS Watchdog has initiated a reset";
eLang.sensor_specific_event_strings[17][1] =      "reports the OS Watchdog has initiated a reset";
eLang.sensor_specific_event_strings[17][2] =      "reports the OS Watchdog has initiated a shutdown";
eLang.sensor_specific_event_strings[17][3] =      "reports the OS Watchdog has initiated a power down";
eLang.sensor_specific_event_strings[17][4] =      "reports the OS Watchdog has initiated a power cycle";
eLang.sensor_specific_event_strings[17][5] =      "reports the OS Watchdog has initiated an NMI / diagnostic interrupt";
eLang.sensor_specific_event_strings[17][6] =      "reports the OS Watchdog has expired";
eLang.sensor_specific_event_strings[17][7] =      "reports the OS Watchdog has initiated a pre-timeout interrupt";

eLang.sensor_specific_event_strings[18] = new Array();
eLang.sensor_specific_event_strings[18][0] =      "reports the system has been reconfigured";
eLang.sensor_specific_event_strings[18][1] =      "reports OEM System Boot Event";
eLang.sensor_specific_event_strings[18][2] =      "reports there has been an undetermined system hardware failure";
eLang.sensor_specific_event_strings[18][3] =      "reports entry Added to Auxiliary Log";
eLang.sensor_specific_event_strings[18][4] =      "reports a PEF action has occurred";
eLang.sensor_specific_event_strings[18][5] =      "reports Timestamp Clock Sync. Event is one of two expected events from BIOS on every power on.";

eLang.sensor_specific_event_strings[19] = new Array();
eLang.sensor_specific_event_strings[19][0] =      "reports front panel NMI / diagnostic interrupt";
eLang.sensor_specific_event_strings[19][1] =      "reports bus timeout";
eLang.sensor_specific_event_strings[19][2] =      "reports I/O channel check NMI";
eLang.sensor_specific_event_strings[19][3] =      "reports software-induced NMI";
eLang.sensor_specific_event_strings[19][4] =      "reports PCI PERR";
eLang.sensor_specific_event_strings[19][5] =      "reports PCI SERR";
eLang.sensor_specific_event_strings[19][6] =      "reports EISA fail-safe timeout";
eLang.sensor_specific_event_strings[19][7] =      "reports correctable bus error";
eLang.sensor_specific_event_strings[19][8] =      "reports uncorrectable bus error";
eLang.sensor_specific_event_strings[19][9] =      "reports fatal NMI";
eLang.sensor_specific_event_strings[19][10] =    "reports fatal bus error";

eLang.sensor_specific_event_strings[20] = new Array();
eLang.sensor_specific_event_strings[20][0] =      "reports the power button has been pressed";
eLang.sensor_specific_event_strings[20][1] =      "reports the sleep button has been pressed";
eLang.sensor_specific_event_strings[20][2] =      "reports the reset button has been pressed";
eLang.sensor_specific_event_strings[20][3] =      "reports the FRU latch is open";
eLang.sensor_specific_event_strings[20][4] =      "reports the FRU service request button has been pressed";

eLang.sensor_specific_event_strings[25] = new Array();
eLang.sensor_specific_event_strings[25][0] =      "reports Soft Power Control Failure";

eLang.sensor_specific_event_strings[29] = new Array();
eLang.sensor_specific_event_strings[29][0] =      "reports a system boot has been initiated due to a power up";
eLang.sensor_specific_event_strings[29][1] =      "reports a system boot has been initiated due to a hard reset";
eLang.sensor_specific_event_strings[29][2] =      "reports a system boot has been initiated due to a warm reset";
eLang.sensor_specific_event_strings[29][3] =      "reports a system boot has been initiated due to a user-requested PXE boot";
eLang.sensor_specific_event_strings[29][4] =      "reports a system boot has been initiated due to an automatic diagnostic boot";

eLang.sensor_specific_event_strings[30] = new Array();
eLang.sensor_specific_event_strings[30][0] =      "reports there is no bootable media";
eLang.sensor_specific_event_strings[30][1] =      "reports a non-bootable diskette has been left in the drive";
eLang.sensor_specific_event_strings[30][2] =      "reports the PXE Server can't be found";
eLang.sensor_specific_event_strings[30][3] =      "reports the boot sector is invalid";
eLang.sensor_specific_event_strings[30][4] =      "reports the timer for the user's selection of the boot source has expired";

eLang.sensor_specific_event_strings[31] = new Array();
eLang.sensor_specific_event_strings[31][0] =      "reports the boot from drive A has been completed";
eLang.sensor_specific_event_strings[31][1] =      "reports the boot from drive C has been completed";
eLang.sensor_specific_event_strings[31][2] =      "reports the boot from the PXE Server has been completed";
eLang.sensor_specific_event_strings[31][3] =      "reports the diagnostic boot has been completed";
eLang.sensor_specific_event_strings[31][4] =      "reports the boot from the CD-ROM has been completed";
eLang.sensor_specific_event_strings[31][5] =      "reports the boot from the ROM has been completed";
eLang.sensor_specific_event_strings[31][6] =      "reports the boot has been completed, but the device the system booted from is unknown";

eLang.sensor_specific_event_strings[32] = new Array();
eLang.sensor_specific_event_strings[32][0] =      "reports a critical stop during OS load or initialization";
eLang.sensor_specific_event_strings[32][1] =      "reports a runtime critical stop";
eLang.sensor_specific_event_strings[32][2] =      "reports a OS Graceful stop";
eLang.sensor_specific_event_strings[32][3] =      "reports a OS Graceful shutdown";
eLang.sensor_specific_event_strings[32][4] =      "reports a soft shutdown initiated by PEF";
eLang.sensor_specific_event_strings[32][5] =      "reports agent not responding";

eLang.sensor_specific_event_strings[33] = new Array();
eLang.sensor_specific_event_strings[33][0] =      "reports a fault status has been asserted";
eLang.sensor_specific_event_strings[33][1] =      "reports an identify status has been asserted";
eLang.sensor_specific_event_strings[33][2] =      "reports a slot or connector device has been installed or attached";
eLang.sensor_specific_event_strings[33][3] =      "reports a slot or connector device is ready for installation";
eLang.sensor_specific_event_strings[33][4] =      "reports a slot or connector device is ready for removal";
eLang.sensor_specific_event_strings[33][5] =      "reports the slot power is off";
eLang.sensor_specific_event_strings[33][6] =      "reports a slot or connector device has been requested to be removed";
eLang.sensor_specific_event_strings[33][7] =      "reports the Interlock has been asserted";
eLang.sensor_specific_event_strings[33][8] =      "reports the slot is disabled";
eLang.sensor_specific_event_strings[33][9] =      "reports the slot holds a spare device";

eLang.sensor_specific_event_strings[34] = new Array();
eLang.sensor_specific_event_strings[34][0] =      "reports (S0) the system is working normally";
eLang.sensor_specific_event_strings[34][1] =      "reports (S1) the system is currently in sleep mode";
eLang.sensor_specific_event_strings[34][2] =      "reports (S2) the system is currently in CPU sleep mode";
eLang.sensor_specific_event_strings[34][3] =      "reports (S3) the system is currently in power button off mode";
eLang.sensor_specific_event_strings[34][4] =      "reports (S4) the system is currently in suspend to disk mode";
eLang.sensor_specific_event_strings[34][5] =      "reports (S5/G2) the system is currently in soft off mode";
eLang.sensor_specific_event_strings[34][6] =      "reports (S4/S5) the system is currently in soft off mode, Particular State Undetermined";
eLang.sensor_specific_event_strings[34][7] =      "reports (G3) the system is currently in mechanical off mode";
eLang.sensor_specific_event_strings[34][8] =      "reports (S1/S2/S3) Particular State Undetermined";
eLang.sensor_specific_event_strings[34][9] =      "reports (G1; S1-S4) State Undetermined";
eLang.sensor_specific_event_strings[34][10] =      "reports (S5) Entered By Override";
eLang.sensor_specific_event_strings[34][11] =      "reports Legacy ON State";
eLang.sensor_specific_event_strings[34][12] =      "reports Legacy OFF State";
eLang.sensor_specific_event_strings[34][13] =      "reports Unknown ACPI power state";

eLang.sensor_specific_event_strings[35] = new Array();
eLang.sensor_specific_event_strings[35][0] =      "reports the watchdog timer has expired";
eLang.sensor_specific_event_strings[35][1] =      "reports the watchdog initiated a hard reset";
eLang.sensor_specific_event_strings[35][2] =      "reports the watchdog initiated a power down";
eLang.sensor_specific_event_strings[35][3] =      "reports the watchdog initiated a power cycle";
eLang.sensor_specific_event_strings[35][4] =      "Reserved";
eLang.sensor_specific_event_strings[35][5] =      "Reserved";
eLang.sensor_specific_event_strings[35][6] =      "Reserved";
eLang.sensor_specific_event_strings[35][7] =      "Reserved";
eLang.sensor_specific_event_strings[35][8] =      "reports Timer Interrupt";

eLang.sensor_specific_event_strings[36] = new Array();
eLang.sensor_specific_event_strings[36][0] =      "reports the platform management subsystem has generated a platform page";
eLang.sensor_specific_event_strings[36][1] =      "reports the platform management subsystem has generated a platform LAN alert";
eLang.sensor_specific_event_strings[36][2] =      "reports the platform management subsystem has generated a Platform Event Trap (PET)";
eLang.sensor_specific_event_strings[36][3] =      "reports the platform management subsystem has generated a platform SNMP trap in OEM format";

eLang.sensor_specific_event_strings[37] = new Array();
eLang.sensor_specific_event_strings[37][0] =      "report Entity is Present";
eLang.sensor_specific_event_strings[37][1] =      "report Entity is Absent";
eLang.sensor_specific_event_strings[37][2] =      "report Entity is Disabled";

eLang.sensor_specific_event_strings[39] = new Array();
eLang.sensor_specific_event_strings[39][0] =      "reports the LAN heartbeat has been lost";
eLang.sensor_specific_event_strings[39][1] =      "reports the LAN heartbeat has been detected";

eLang.sensor_specific_event_strings[40] = new Array();
eLang.sensor_specific_event_strings[40][0] =      "reports sensor access has become degraded or unavailable";
eLang.sensor_specific_event_strings[40][1] =      "reports controller access has become degraded or unavailable";
eLang.sensor_specific_event_strings[40][2] =      "reports the management controller is offline";
eLang.sensor_specific_event_strings[40][3] =      "reports the management controller is unavailable";
eLang.sensor_specific_event_strings[40][4] =      "sensor has failed and may not be providing a valid reading";

eLang.sensor_specific_event_strings[41] = new Array();
eLang.sensor_specific_event_strings[41][0] =      "reports the battery is low";
eLang.sensor_specific_event_strings[41][1] =      "reports the battery has failed";
eLang.sensor_specific_event_strings[41][2] =      "reports the battery's presence has been detected";

eLang.sensor_specific_event_strings[42] = new Array();
eLang.sensor_specific_event_strings[42][0] =      "reports Session Activated";
eLang.sensor_specific_event_strings[42][1] =      "reports Session Deactivated";

eLang.sensor_specific_event_strings[43] = new Array();
eLang.sensor_specific_event_strings[43][0] =      "reports Hardware change detected with associated Entity";
eLang.sensor_specific_event_strings[43][1] =      "reports Firmware or software change detected with associated Entity";
eLang.sensor_specific_event_strings[43][2] =      "reports Hardware incompatibility detected with associated Entity";
eLang.sensor_specific_event_strings[43][3] =      "reports Firmware or software incompatibility detected with associated Entity";
eLang.sensor_specific_event_strings[43][4] =      "reports Entity is of an invalid or unsupported hardware version";
eLang.sensor_specific_event_strings[43][5] =      "reports Entity contains an invalid or unsupported firmware or software version";
eLang.sensor_specific_event_strings[43][6] =      "reports Hardware Change detected with associated Entity was successful";
eLang.sensor_specific_event_strings[43][7] =      "reports Software or F/W Change detected with associated Entity was successful";

eLang.sensor_specific_event_strings[44] = new Array();
eLang.sensor_specific_event_strings[44][0] =      "reports the FRU is not installed. Cause of State change";
eLang.sensor_specific_event_strings[44][1] =      "reports the FRU is inactive. Cause of State change";
eLang.sensor_specific_event_strings[44][2] =      "reports the FRU's activation has been requested";
eLang.sensor_specific_event_strings[44][3] =      "reports the FRU's activation is in progress";
eLang.sensor_specific_event_strings[44][4] =      "reports the FRU is active";
eLang.sensor_specific_event_strings[44][5] =      "reports the FRU's deactivation has been requested";
eLang.sensor_specific_event_strings[44][6] =      "reports the FRU's deactivation is in progress";
eLang.sensor_specific_event_strings[44][7] =      "reports communication has been lost with the FRU";
