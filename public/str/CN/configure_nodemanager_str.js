//------------------------------------------------------------//
// configure_nodemanager page string table
//------------------------------------------------------------//

eLang.configure_nodemanager_strings = {};

// General strings
eLang.configure_nodemanager_strings["STR_CONF_NM_PAGE_TITLE"] = "节点管理器功耗策略";
eLang.configure_nodemanager_strings["STR_CONF_NM_PAGE_DESC"] = "使用本页设置节点管理器功耗策略。";
eLang.configure_nodemanager_strings["STR_CONF_NM_SAVE"] = "保存";
eLang.configure_nodemanager_strings["STR_CONF_NM_DELETE"] = "删除";
eLang.configure_nodemanager_strings["STR_CONF_NM_CANCEL"] = "取消";
eLang.configure_nodemanager_strings["STR_CONF_NM_PRIVLVL"] = "只有管理员能配置这些功能。";
eLang.configure_nodemanager_strings["STR_CONF_NM_ERROR"] = "试图与节点管理器通信时发生错误。";
eLang.configure_nodemanager_strings["STR_CONF_NM_NODATA"] = "当前没有设置节点管理器功耗策略。";
eLang.configure_nodemanager_strings["STR_CONF_NM_ADDEDIT"] = "添加/编辑 节点管理器策略.";

// Table strings
eLang.configure_nodemanager_strings["STR_CONF_NM_POLICY"] = "策略";         // A number (0->N)
eLang.configure_nodemanager_strings["STR_CONF_NM_TIMER"] = "计时器";          // A number (0->5), suspend periods
eLang.configure_nodemanager_strings["STR_CONF_NM_DOMAIN"] = "域";         // SYS, CPU, MEM
eLang.configure_nodemanager_strings["STR_CONF_NM_ENABLED"] = "启用";       // Yes, No
eLang.configure_nodemanager_strings["STR_CONF_NM_TRIGGER"] = "触发";       // None, Temp, Host Reset, Boot time
eLang.configure_nodemanager_strings["STR_CONF_NM_TYPE"] = "类型";             // Power, None
eLang.configure_nodemanager_strings["STR_CONF_NM_AGGRESSIVE"] = "加强策略"; // Auto, yes, no, N/A
eLang.configure_nodemanager_strings["STR_CONF_NM_SHUTDOWN"] = "关机";     // Yes, No
eLang.configure_nodemanager_strings["STR_CONF_NM_ALERT"] = "报警";           // Yes, No
eLang.configure_nodemanager_strings["STR_CONF_NM_PWRLIMIT"] = "功耗限制";  // A number (0->N)
eLang.configure_nodemanager_strings["STR_CONF_NM_THROTTLE"] = "降频等级";  // A percent (0->100)
eLang.configure_nodemanager_strings["STR_CONF_NM_PWRPROFILE"] = "电源配置";  // A number (0->X)
eLang.configure_nodemanager_strings["STR_CONF_NM_TRIGLIMIT"] = "触发限制"; // A number (0->N)
eLang.configure_nodemanager_strings["STR_CONF_NM_PERIOD"] = "报告间隔"; // A number (0->N)
eLang.configure_nodemanager_strings["STR_CONF_NM_CORRECTION"] = "更正超时"; // A number (0->N)
eLang.configure_nodemanager_strings["STR_CONF_NM_TRIGGER_NA"] = "无";

// Trigger strings
eLang.configure_nodemanager_strings["STR_CONF_NM_TRIGGER_NONE"] = "无";
eLang.configure_nodemanager_strings["STR_CONF_NM_TRIGGER_TEMP"] = "温度";
eLang.configure_nodemanager_strings["STR_CONF_NM_TRIGGER_RDTO"] = "Rd超时";
eLang.configure_nodemanager_strings["STR_CONF_NM_TRIGGER_READTIMEOUT"] = "读取超时";
eLang.configure_nodemanager_strings["STR_CONF_NM_TRIGGER_RESET"] = "重启";
eLang.configure_nodemanager_strings["STR_CONF_NM_TRIGGER_BOOT"] = "启动";
eLang.configure_nodemanager_strings["STR_CONF_NM_UNDEF"] = "未定义";

// Agressive strings
eLang.configure_nodemanager_strings["STR_CONF_NM_AGGRESSIVE_AUTO"] = "自动";
eLang.configure_nodemanager_strings["STR_CONF_NM_AGGRESSIVE_YES"] = "是";
eLang.configure_nodemanager_strings["STR_CONF_NM_AGGRESSIVE_NO"] = "否";

// Domain strings
eLang.configure_nodemanager_strings["STR_CONF_NM_DOMAIN_PLAT"] = "平台";
eLang.configure_nodemanager_strings["STR_CONF_NM_DOMAIN_CPU"] = "CPU";
eLang.configure_nodemanager_strings["STR_CONF_NM_DOMAIN_MEM"] = "内存";
eLang.configure_nodemanager_strings["STR_CONF_NM_DOMAIN_PLAT_SHORT"] = "平台";
eLang.configure_nodemanager_strings["STR_CONF_NM_DOMAIN_CPU_SHORT"] = "CPU";
eLang.configure_nodemanager_strings["STR_CONF_NM_DOMAIN_MEM_SHORT"] = "内存";

// Header strings (for help text)
eLang.configure_nodemanager_strings["STR_CONF_NM_SETHEAD_POLICY"] = "策略号";
eLang.configure_nodemanager_strings["STR_CONF_NM_SETHEAD_DOMAIN"] = "域类型";
eLang.configure_nodemanager_strings["STR_CONF_NM_SETHEAD_TRIGGERTYPE"] = "触发类型";
eLang.configure_nodemanager_strings["STR_CONF_NM_SETHEAD_POLICYTYPE"] = "策略类型";
eLang.configure_nodemanager_strings["STR_CONF_NM_SETHEAD_AGGRESSIVE"] = "加强的CPU功耗修正";
eLang.configure_nodemanager_strings["STR_CONF_NM_SETHEAD_SHUTDOWN"] = "强制关机";
eLang.configure_nodemanager_strings["STR_CONF_NM_SETHEAD_ALERT"] = "发送报警";

// Error strings
eLang.configure_nodemanager_strings["STR_CONF_NM_ERROR_POLICY"] = "无效的策略号。";
eLang.configure_nodemanager_strings["STR_CONF_NM_ERROR_DOMAIN"] = "无效的域。";
eLang.configure_nodemanager_strings["STR_CONF_NM_ERROR_TRIGGER"] = "无效的触发。";
eLang.configure_nodemanager_strings["STR_CONF_NM_ERROR_POLICYTYPE"] = "无效的策略类型。";
eLang.configure_nodemanager_strings["STR_CONF_NM_ERROR_AGGRESSIVE"] = "无效的CPU加强设置。";
eLang.configure_nodemanager_strings["STR_CONF_NM_ERROR_PWRLIMIT"] = "功耗限制超出正常范围。";
eLang.configure_nodemanager_strings["STR_CONF_NM_ERROR_TRIGLIMIT"] = "触发限制超出正常范围。";
eLang.configure_nodemanager_strings["STR_CONF_NM_ERROR_CORRTIME"] = "修正时间超出正常范围";
eLang.configure_nodemanager_strings["STR_CONF_NM_ERROR_REPORTPERIOD"] = "统计报告间隔超出正常范围。";
eLang.configure_nodemanager_strings["STR_CONF_NM_ERROR_NOSPACE"] = "没有更多可用的策略，或者不能再为这个域/触发器设置更多的策略。";
eLang.configure_nodemanager_strings["STR_CONF_NM_ERROR_ALREADYENABLED"] = "策略已被启用，请禁用后进行编辑。";
eLang.configure_nodemanager_strings["STR_CONF_NM_ERROR_SUSPENDINCONSISTENT"] = "间隔周期无效。间隔周期长度不能超过一天。";
eLang.configure_nodemanager_strings["STR_CONF_NM_ERROR_NUMSUSPENDINVALID"] = "无效的间隔周期数。";
eLang.configure_nodemanager_strings["STR_CONF_NM_ERROR_FIXPERIODS"] = "间隔周期配置错误。请检查所有结束时间早于开始时间的设置。";

// Action strings
eLang.configure_nodemanager_strings["STR_CONF_NM_SET_SUCCESS"] = "保存策略成功";
eLang.configure_nodemanager_strings["STR_CONF_NM_SET_FAILURE"] = "设置策略失败.";
eLang.configure_nodemanager_strings["STR_CONF_NM_DELETE_SUCCESS"] = "删除策略成功";
eLang.configure_nodemanager_strings["STR_CONF_NM_DELETE_FAILURE"] = "删除策略失败.";
eLang.configure_nodemanager_strings["STR_CONF_NM_CONFIRM_SET"] = "您确定要添加/修改策略吗?";
eLang.configure_nodemanager_strings["STR_CONF_NM_CONFIRM_DELETE"] = "您确定要删除这个策略吗?";
eLang.configure_nodemanager_strings["STR_CONF_NM_CONFIRM_CANCEL"] = "取消将会清除当前的设置值.";

// Unit strings
eLang.configure_nodemanager_strings["STR_CONF_NM_UNIT_WATTS"] = "(瓦特)";
eLang.configure_nodemanager_strings["STR_CONF_NM_UNIT_CELSIUS"] = "(摄氏度)";
eLang.configure_nodemanager_strings["STR_CONF_NM_UNIT_PERCENT"] = "(百分比)";
eLang.configure_nodemanager_strings["STR_CONF_NM_UNIT_MS"] = "(微秒)";
eLang.configure_nodemanager_strings["STR_CONF_NM_UNIT_100MS"] = "(以100毫秒递增)";
eLang.configure_nodemanager_strings["STR_CONF_NM_UNIT_SECONDS"] = "(秒)";

// Suspend Period strings
eLang.configure_nodemanager_strings["STR_CONF_NM_SUS_TITLE"] = "使用策略计时器: ";
eLang.configure_nodemanager_strings["STR_CONF_NM_SUS_VIEW"] = "查看次数: ";
eLang.configure_nodemanager_strings["STR_CONF_NM_SUS_SUSPEND"] = "间隔";
eLang.configure_nodemanager_strings["STR_CONF_NM_SUS_ENABLE"] = "启用";
eLang.configure_nodemanager_strings["STR_CONF_NM_SUS_1"] = "定时器 1";
eLang.configure_nodemanager_strings["STR_CONF_NM_SUS_2"] = "定时器 2";
eLang.configure_nodemanager_strings["STR_CONF_NM_SUS_3"] = "定时器 3";
eLang.configure_nodemanager_strings["STR_CONF_NM_SUS_4"] = "定时器 4";
eLang.configure_nodemanager_strings["STR_CONF_NM_SUS_5"] = "定时器 5";
eLang.configure_nodemanager_strings["STR_CONF_NM_SUS_SUSPENDED"] = "策略将被挂起。";
eLang.configure_nodemanager_strings["STR_CONF_NM_SUS_ENABLED"] = "策略将被启用。";
eLang.configure_nodemanager_strings["STR_CONF_NM_SUS_SUSPENDED_ERROR"] = "找不到匹配的间隔周期，请调整定时器后再尝试。";
eLang.configure_nodemanager_strings["STR_CONF_NM_SUS_ENABLED_ERROR"] = "找不到匹配的启用周期，将定时器看作间隔周期。";
eLang.configure_nodemanager_strings["STR_CONF_NM_SUS_SUSPENDED_SAVE_ERROR"] = "定时器设置过于复杂，BMC不能保存。请重新设置后再做尝试，或者将定时器设置分为多个策略进行设置。";

// Suspend Period Setting strings
eLang.configure_nodemanager_strings["STR_CONF_NM_SUS_MON"] = "星期一";
eLang.configure_nodemanager_strings["STR_CONF_NM_SUS_TUE"] = "星期二";
eLang.configure_nodemanager_strings["STR_CONF_NM_SUS_WED"] = "星期三";
eLang.configure_nodemanager_strings["STR_CONF_NM_SUS_THU"] = "星期四";
eLang.configure_nodemanager_strings["STR_CONF_NM_SUS_FRI"] = "星期五";
eLang.configure_nodemanager_strings["STR_CONF_NM_SUS_SAT"] = "星期六";
eLang.configure_nodemanager_strings["STR_CONF_NM_SUS_SUN"] = "星期日";
eLang.configure_nodemanager_strings["STR_CONF_NM_SUS_START"] = "起始时间";
eLang.configure_nodemanager_strings["STR_CONF_NM_SUS_END"] = "结束时间";




