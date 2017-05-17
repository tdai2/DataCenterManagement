//------------------------------------------------------------//
// configure_nodemanager page string table
//------------------------------------------------------------//

eLang.configure_nodemanager_strings = {};

// General strings
eLang.configure_nodemanager_strings["STR_CONF_NM_PAGE_TITLE"] = "Node Manager Power Policies";
eLang.configure_nodemanager_strings["STR_CONF_NM_PAGE_DESC"] = "Use this page to set Node Manager Power Policies.";
eLang.configure_nodemanager_strings["STR_CONF_NM_SAVE"] = "Save";
eLang.configure_nodemanager_strings["STR_CONF_NM_DELETE"] = "Delete";
eLang.configure_nodemanager_strings["STR_CONF_NM_CANCEL"] = "Cancel";
eLang.configure_nodemanager_strings["STR_CONF_NM_PRIVLVL"] = "You must be an administrator to access these functions.";
eLang.configure_nodemanager_strings["STR_CONF_NM_ERROR"] = "There was an error attempting to communicate with the Node Manager.";
eLang.configure_nodemanager_strings["STR_CONF_NM_NODATA"] = "There are currently no Node Manager Power Policies set.";
eLang.configure_nodemanager_strings["STR_CONF_NM_ADDEDIT"] = "Add/Edit Node Manager Policies.";

// Table strings
eLang.configure_nodemanager_strings["STR_CONF_NM_POLICY"] = "Policy";         // A number (0->N)
eLang.configure_nodemanager_strings["STR_CONF_NM_TIMER"] = "Timers";          // A number (0->5), suspend periods
eLang.configure_nodemanager_strings["STR_CONF_NM_DOMAIN"] = "Domain";         // SYS, CPU, MEM
eLang.configure_nodemanager_strings["STR_CONF_NM_ENABLED"] = "Enabled";       // Yes, No
eLang.configure_nodemanager_strings["STR_CONF_NM_TRIGGER"] = "Trigger";       // None, Temp, Host Reset, Boot time
eLang.configure_nodemanager_strings["STR_CONF_NM_TYPE"] = "Type";             // Power, None
eLang.configure_nodemanager_strings["STR_CONF_NM_AGGRESSIVE"] = "Aggressive"; // Auto, yes, no, N/A
eLang.configure_nodemanager_strings["STR_CONF_NM_SHUTDOWN"] = "Shutdown";     // Yes, No
eLang.configure_nodemanager_strings["STR_CONF_NM_ALERT"] = "Alert";           // Yes, No
eLang.configure_nodemanager_strings["STR_CONF_NM_PWRLIMIT"] = "Power Limit";  // A number (0->N)
eLang.configure_nodemanager_strings["STR_CONF_NM_THROTTLE"] = "Throttling Level";  // A percent (0->100)
eLang.configure_nodemanager_strings["STR_CONF_NM_PWRPROFILE"] = "Power Profile";  // A number (0->X)
eLang.configure_nodemanager_strings["STR_CONF_NM_TRIGLIMIT"] = "Trigger Limit"; // A number (0->N)
eLang.configure_nodemanager_strings["STR_CONF_NM_PERIOD"] = "Reporting Period"; // A number (0->N)
eLang.configure_nodemanager_strings["STR_CONF_NM_CORRECTION"] = "Correction Timeout"; // A number (0->N)
eLang.configure_nodemanager_strings["STR_CONF_NM_TRIGGER_NA"] = "N/A";

// Trigger strings
eLang.configure_nodemanager_strings["STR_CONF_NM_TRIGGER_NONE"] = "None";
eLang.configure_nodemanager_strings["STR_CONF_NM_TRIGGER_TEMP"] = "Temp";
eLang.configure_nodemanager_strings["STR_CONF_NM_TRIGGER_RDTO"] = "Rd Timeout";
eLang.configure_nodemanager_strings["STR_CONF_NM_TRIGGER_READTIMEOUT"] = "Reading Timeout";
eLang.configure_nodemanager_strings["STR_CONF_NM_TRIGGER_RESET"] = "Reset";
eLang.configure_nodemanager_strings["STR_CONF_NM_TRIGGER_BOOT"] = "Boot";
eLang.configure_nodemanager_strings["STR_CONF_NM_UNDEF"] = "Undef";

// Agressive strings
eLang.configure_nodemanager_strings["STR_CONF_NM_AGGRESSIVE_AUTO"] = "AUTO";
eLang.configure_nodemanager_strings["STR_CONF_NM_AGGRESSIVE_YES"] = "YES";
eLang.configure_nodemanager_strings["STR_CONF_NM_AGGRESSIVE_NO"] = "NO";

// Domain strings
eLang.configure_nodemanager_strings["STR_CONF_NM_DOMAIN_PLAT"] = "PLAT";
eLang.configure_nodemanager_strings["STR_CONF_NM_DOMAIN_CPU"] = "CPU";
eLang.configure_nodemanager_strings["STR_CONF_NM_DOMAIN_MEM"] = "MEM";
eLang.configure_nodemanager_strings["STR_CONF_NM_DOMAIN_PLAT_SHORT"] = "Platform";
eLang.configure_nodemanager_strings["STR_CONF_NM_DOMAIN_CPU_SHORT"] = "CPU";
eLang.configure_nodemanager_strings["STR_CONF_NM_DOMAIN_MEM_SHORT"] = "Memory";

// Header strings (for help text)
eLang.configure_nodemanager_strings["STR_CONF_NM_SETHEAD_POLICY"] = "Policy Number";
eLang.configure_nodemanager_strings["STR_CONF_NM_SETHEAD_DOMAIN"] = "Domain Type";
eLang.configure_nodemanager_strings["STR_CONF_NM_SETHEAD_TRIGGERTYPE"] = "Trigger Type";
eLang.configure_nodemanager_strings["STR_CONF_NM_SETHEAD_POLICYTYPE"] = "Policy Type";
eLang.configure_nodemanager_strings["STR_CONF_NM_SETHEAD_AGGRESSIVE"] = "Aggressive CPU Power Correction";
eLang.configure_nodemanager_strings["STR_CONF_NM_SETHEAD_SHUTDOWN"] = "System Shutdown";
eLang.configure_nodemanager_strings["STR_CONF_NM_SETHEAD_ALERT"] = "Log Event";

// Error strings
eLang.configure_nodemanager_strings["STR_CONF_NM_ERROR_POLICY"] = "Invalid policy number.";
eLang.configure_nodemanager_strings["STR_CONF_NM_ERROR_DOMAIN"] = "Invalid domain.";
eLang.configure_nodemanager_strings["STR_CONF_NM_ERROR_TRIGGER"] = "Invalid trigger.";
eLang.configure_nodemanager_strings["STR_CONF_NM_ERROR_POLICYTYPE"] = "Invalid policy type.";
eLang.configure_nodemanager_strings["STR_CONF_NM_ERROR_AGGRESSIVE"] = "Invalid aggressive CPU setting.";
eLang.configure_nodemanager_strings["STR_CONF_NM_ERROR_PWRLIMIT"] = "Power limit out of range.";
eLang.configure_nodemanager_strings["STR_CONF_NM_ERROR_TRIGLIMIT"] = "Trigger limit out of range.";
eLang.configure_nodemanager_strings["STR_CONF_NM_ERROR_CORRTIME"] = "Correction Time out of range";
eLang.configure_nodemanager_strings["STR_CONF_NM_ERROR_REPORTPERIOD"] = "Statistics Reporting Period out of range.";
eLang.configure_nodemanager_strings["STR_CONF_NM_ERROR_NOSPACE"] = "There are no more available policies, or no more policies may be set for this domain/trigger.";
eLang.configure_nodemanager_strings["STR_CONF_NM_ERROR_ALREADYENABLED"] = "Policy is already enabled, and must be disabled before editing.";
eLang.configure_nodemanager_strings["STR_CONF_NM_ERROR_SUSPENDINCONSISTENT"] = "One or more suspend time periods is invalid. Suspend periods cannot exceed one day in length.";
eLang.configure_nodemanager_strings["STR_CONF_NM_ERROR_NUMSUSPENDINVALID"] = "Invalid number of suspend periods.";
eLang.configure_nodemanager_strings["STR_CONF_NM_ERROR_FIXPERIODS"] = "One or more suspend periods are incorrectly configured. Please check that all end times are later than start times.";

// Action strings
eLang.configure_nodemanager_strings["STR_CONF_NM_SET_SUCCESS"] = "Successfully saved policy";
eLang.configure_nodemanager_strings["STR_CONF_NM_SET_FAILURE"] = "Failed to set policy.";
eLang.configure_nodemanager_strings["STR_CONF_NM_DELETE_SUCCESS"] = "Successfully deleted policy";
eLang.configure_nodemanager_strings["STR_CONF_NM_DELETE_FAILURE"] = "Failed to delete policy.";
eLang.configure_nodemanager_strings["STR_CONF_NM_CONFIRM_SET"] = "Are you sure you want to add/modify this policy?";
eLang.configure_nodemanager_strings["STR_CONF_NM_CONFIRM_DELETE"] = "Are you sure you want to delete this policy?";
eLang.configure_nodemanager_strings["STR_CONF_NM_CONFIRM_CANCEL"] = "Canceling will clear the currently set values.";

// Unit strings
eLang.configure_nodemanager_strings["STR_CONF_NM_UNIT_WATTS"] = "(Watts)";
eLang.configure_nodemanager_strings["STR_CONF_NM_UNIT_CELSIUS"] = "(Celsius)";
eLang.configure_nodemanager_strings["STR_CONF_NM_UNIT_PERCENT"] = "(Percent)";
eLang.configure_nodemanager_strings["STR_CONF_NM_UNIT_MS"] = "(Milliseconds)";
eLang.configure_nodemanager_strings["STR_CONF_NM_UNIT_100MS"] = "(100 Millisecond Increments)";
eLang.configure_nodemanager_strings["STR_CONF_NM_UNIT_SECONDS"] = "(Seconds)";

// Suspend Period strings
eLang.configure_nodemanager_strings["STR_CONF_NM_SUS_TITLE"] = "Use Policy Timers: ";
eLang.configure_nodemanager_strings["STR_CONF_NM_SUS_VIEW"] = "View times as: ";
eLang.configure_nodemanager_strings["STR_CONF_NM_SUS_SUSPEND"] = "Suspended";
eLang.configure_nodemanager_strings["STR_CONF_NM_SUS_ENABLE"] = "Enabled";
eLang.configure_nodemanager_strings["STR_CONF_NM_SUS_1"] = "Timer 1";
eLang.configure_nodemanager_strings["STR_CONF_NM_SUS_2"] = "Timer 2";
eLang.configure_nodemanager_strings["STR_CONF_NM_SUS_3"] = "Timer 3";
eLang.configure_nodemanager_strings["STR_CONF_NM_SUS_4"] = "Timer 4";
eLang.configure_nodemanager_strings["STR_CONF_NM_SUS_5"] = "Timer 5";
eLang.configure_nodemanager_strings["STR_CONF_NM_SUS_SUSPENDED"] = "Policy will be suspended during these times.";
eLang.configure_nodemanager_strings["STR_CONF_NM_SUS_ENABLED"] = "Policy will be enabled during these times.";
eLang.configure_nodemanager_strings["STR_CONF_NM_SUS_SUSPENDED_ERROR"] = "Unable to find equivalent suspend periods. Please adjust your timers and try again.";
eLang.configure_nodemanager_strings["STR_CONF_NM_SUS_ENABLED_ERROR"] = "Unable to find equivalent enable periods. Viewing timers as suspended instead.";
eLang.configure_nodemanager_strings["STR_CONF_NM_SUS_SUSPENDED_SAVE_ERROR"] = "The BMC is unable to save your currently enabled timers because they are too complicated. Please reduce their complexity and try again, or split your timers into multiple policies.";


// Suspend Period Setting strings
eLang.configure_nodemanager_strings["STR_CONF_NM_SUS_MON"] = "Monday";
eLang.configure_nodemanager_strings["STR_CONF_NM_SUS_TUE"] = "Tuesday";
eLang.configure_nodemanager_strings["STR_CONF_NM_SUS_WED"] = "Wednesday";
eLang.configure_nodemanager_strings["STR_CONF_NM_SUS_THU"] = "Thursday";
eLang.configure_nodemanager_strings["STR_CONF_NM_SUS_FRI"] = "Friday";
eLang.configure_nodemanager_strings["STR_CONF_NM_SUS_SAT"] = "Saturday";
eLang.configure_nodemanager_strings["STR_CONF_NM_SUS_SUN"] = "Sunday";
eLang.configure_nodemanager_strings["STR_CONF_NM_SUS_START"] = "Start Time";
eLang.configure_nodemanager_strings["STR_CONF_NM_SUS_END"] = "End Time";




