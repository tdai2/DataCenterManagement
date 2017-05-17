/*************************************** Event / Reading type codes *******************************************/
//eLang.event_strings[EVENT / READING TYPE CODE][GENERIC OFFSET] = "DESCRIPTION";
/*********************************************************************************************************************/
eLang.event_strings = new Array();
/******* Threshold Event Type Codes *********/
eLang.event_strings[1] = new Array();
eLang.event_strings[1][0] =      "reports the sensor is in a low, but non-critical, and going lower state";
eLang.event_strings[1][1] =      "reports the sensor is in a low, but non-critical, and going higher state";
eLang.event_strings[1][2] =      "reports the sensor is in a low, critical, and going lower state";
eLang.event_strings[1][3] =  	 "reports the sensor is in a low, critical, and going higher state";
eLang.event_strings[1][4] =      "reports the sensor is in a low, non-recoverable, and going lower state";
eLang.event_strings[1][5] =      "reports the sensor is in a low, non-recoverable, and going higher state";
eLang.event_strings[1][6] =      "reports the sensor is in a high, but non-critical, and going lower state";
eLang.event_strings[1][7] =      "reports the sensor is in a high, but non-critical, and going higher state";
eLang.event_strings[1][8] =      "reports the sensor is high, critical, but going lower state";
eLang.event_strings[1][9] =      "reports the sensor is high, critical, and going higher state";
eLang.event_strings[1][10] =    "reports the sensor is high, non-recoverable, and going lower state";
eLang.event_strings[1][11] =    "reports the sensor is high, non-recoverable, and going higher state";

/******* Generic Discrete Event Type Codes *********/
eLang.event_strings[2] = new Array();
eLang.event_strings[2][0] =      "reports it has transitioned to an idle state";
eLang.event_strings[2][1] =      "reports it has transitioned to an active state";
eLang.event_strings[2][2] =      "reports it has transitioned to a busy state";

/******* Digital Discrete Event Type Codes *********/
eLang.event_strings[3] = new Array();
eLang.event_strings[3][0] =      "reports it has been deasserted";
eLang.event_strings[3][1] =      "reports it has been asserted";

eLang.event_strings[4] = new Array();
eLang.event_strings[4][0] =      "reports a predictive failure has been deasserted";
eLang.event_strings[4][1] =      "reports a predictive failure has been asserted";

eLang.event_strings[5] = new Array();
eLang.event_strings[5][0] =      "reports its limit has no longer been exceeded";
eLang.event_strings[5][1] =      "reports its limit has been exceeded";

eLang.event_strings[6] = new Array();
eLang.event_strings[6][0] =      "reports the required performance has been met";
eLang.event_strings[6][1] =      "reports the required performance is lagging";

eLang.event_strings[7] = new Array();
eLang.event_strings[7][0] =      "reports it has transitioned to an OK state";
eLang.event_strings[7][1] =      "reports it has transitioned to a non-critical state from an OK state";
eLang.event_strings[7][2] =      "reports it has transitioned to a critical state from a non-critical state";
eLang.event_strings[7][3] =  	  "reports it has transitioned to a non-recoverable state from a non-critical state";
eLang.event_strings[7][4] =      "reports it has transitioned to a non-critical state from a critical state";
eLang.event_strings[7][5] =      "reports it has transitioned to a critical state from a non-recoverable state";
eLang.event_strings[7][6] =      "reports it has transitioned to a non-recoverable state";
eLang.event_strings[7][7] =      "reports it should be monitored";
eLang.event_strings[7][8] =      "reports the event is purely informational";

eLang.event_strings[8] = new Array();
eLang.event_strings[8][0] =      "reports the device has been removed or is absent";
eLang.event_strings[8][1] =      "reports the device has been inserted or is present";

eLang.event_strings[9] = new Array();
eLang.event_strings[9][0] =      "reports the device is disabled";
eLang.event_strings[9][1] =      "reports the device is enabled";

eLang.event_strings[10] = new Array();
eLang.event_strings[10][0] =      "reports it has transitioned to a running state";
eLang.event_strings[10][1] =      "reports it has transitioned to a testing state";
eLang.event_strings[10][2] =      "reports it has transitioned to an off state";
eLang.event_strings[10][3] =      "reports it has transitioned to an on state";
eLang.event_strings[10][4] =      "reports it has transitioned to an offline state";
eLang.event_strings[10][5] =      "reports it has transitioned to an off-duty state";
eLang.event_strings[10][6] =      "reports it has transitioned to a degraded state";
eLang.event_strings[10][7] =      "reports it has transitioned to a power-saving state";
eLang.event_strings[10][8] =      "reports there has been an error in installation";

eLang.event_strings[11] = new Array();
eLang.event_strings[11][0] =	     "reports full redundancy has been regained";
eLang.event_strings[11][1] =	     "reports redundancy has been lost";
eLang.event_strings[11][2] =	     "reports one or more redundant devices have failed";
eLang.event_strings[11][3] =	     "reports the unit is still functioning with the minimum amount of resources needed for normal operation";
eLang.event_strings[11][4] =	     "reports the unit has regained the minimum amount of resources needed for normal operation";
eLang.event_strings[11][5] =	     "reports there are insufficient resources to maintain normal operation";
eLang.event_strings[11][6] =	     "reports one or more redundant devices have failed";
eLang.event_strings[11][7] =	     "reports the unit has regained some resources and is redundant, but not fully redundant";

eLang.event_strings[12] = new Array();
eLang.event_strings[12][0] =	     "reports D0 Power State";
eLang.event_strings[12][1] =	     "reports D1 Power State";
eLang.event_strings[12][2] =	     "reports D2 Power State";
eLang.event_strings[12][3] =	     "reports D3 Power State";


