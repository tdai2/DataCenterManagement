//------------------------------------------------------------//
// monitoring_events page string table
//------------------------------------------------------------//

eLang.monitoring_events_strings = {};

eLang.monitoring_events_strings["STR_EVENT_LOGTXT"] = "事件日志：";
eLang.monitoring_events_strings["STR_EVENT_CLEARBTN"] = "清除事件日志";
eLang.monitoring_events_strings["STR_EVENT_SAVEBTN"] = "保存事件日志";
eLang.monitoring_events_strings["STR_EVENT_DESCRIPTION"] = "以下是系统事件日志中的事件列表。您可以从下拉框中选择一个类别来过滤事件,通过点击列表主题对事件进行排序。";
eLang.monitoring_events_strings["STR_EVENT_LOG_DESC"] = "选择一个事件类别：";
eLang.monitoring_events_strings["STR_EVENT_LOG_TITLE"] = "监控事件";
eLang.monitoring_events_strings["STR_EVENTS_HEADING"] = "事件日志";
eLang.monitoring_events_strings["STR_EVENTS_SELFULL"] = "事件日志存储空间已满，请清除以保证新的事件可以记录下来。";
eLang.monitoring_events_strings["STR_EVENTS_SELFULL_CIRCULAR"] = "提示: 事件日志存储空间已满，新的事件正在覆盖旧的事件。";
eLang.monitoring_events_strings["STR_EVENTS_FULLPERCENT1"] = "事件日志已使用 ";
eLang.monitoring_events_strings["STR_EVENTS_FULLPERCENT2"] = "% 存储空间。";

// NM Specific strings.

//(u8HealthEventType) EVD2 == ??
eLang.monitoring_events_strings["STR_NM_FW_HEALTH"]                 = "SPS FW status"; 
eLang.monitoring_events_strings["STR_NM_EVD2_00"] = "由于Recovery GPIO 被置有效，恢复镜像被加载。";
eLang.monitoring_events_strings["STR_NM_EVD2_01"] = "镜像运行失败。恢复镜像或备份镜像被加载。可能原因：闪存器异常或者执行升级时失败。";
eLang.monitoring_events_strings["STR_NM_EVD2_02"] = "闪存器擦除错误。闪存擦除过程中可能出现闪存部分坏块。";
eLang.monitoring_events_strings["STR_NM_EVD2_03"] = "闪存器状态信息。"; 
eLang.monitoring_events_strings["STR_NM_EVD2_04"] = "内部错误。发生固件看门狗超时错误。";
eLang.monitoring_events_strings["STR_NM_EVD2_05"] = "BMC对冷启动请求无回应，ME执行系统重启。"; 
eLang.monitoring_events_strings["STR_NM_EVD2_06"] = "闪存器件检测到BIOS更新请求。英特尔ME固件将切换到恢复模式来执行BIOS完整更新。";
eLang.monitoring_events_strings["STR_NM_EVD2_07"] = "英特尔ME固件检测到出厂配置错误。";
eLang.monitoring_events_strings["STR_NM_EVD2_08"] = "存储完整性错误。检测到Flash文件系统错误。";
eLang.monitoring_events_strings["STR_NM_EVD2_09"] = "警告事件：固件异常，请将异常信息提供给英特尔。";
eLang.monitoring_events_strings["STR_NM_EVD2_0a"] = "警告事件：闪存器件擦除操作保护。";
eLang.monitoring_events_strings["STR_NM_EVD2_0a1"] = "警告事件：闪存器件擦除操作保护。芯片操作达到 ";
eLang.monitoring_events_strings["STR_NM_EVD2_0a2"] = " % 。";
eLang.monitoring_events_strings["STR_NM_EVD2_0d"] = "消息事件：PECI 与 DMI 通信错误。";
eLang.monitoring_events_strings["STR_NM_EVD2_0e"] = "消息事件：MCTP 接口出现错误。";
eLang.monitoring_events_strings["STR_NM_EVD2_0f"] = "自动配置完成。";
eLang.monitoring_events_strings["STR_NM_EVD2_10"] = "Intel ME 检测到不支持的段定义特性。";
eLang.monitoring_events_strings["STR_NM_EVD2_11_FF"] = "保留。";

// (u8HealthEventType) EVD2 == 0x03  EVD == ?? 
eLang.monitoring_events_strings["STR_NM_FLASH_PARTITION_TABLE"] = "消息事件:  闪存器件分区表，恢复镜像或出厂镜像损坏。";
eLang.monitoring_events_strings["STR_NM_FLASH_ERASE_LIMIT_REACHED"] = "警告事件: 闪存器件擦除次数达到极限，请等待直到磨损保护过期。若错误持续出现，请更换闪存器件。";
eLang.monitoring_events_strings["STR_NM_FLASH_WRITE_LIMIT_REACHED"] = "警告事件: 闪存器件写次数达到极限，写操作被禁用，请等待直到磨损保护过期。若错误持续出现，请更换闪存器件 。";
eLang.monitoring_events_strings["STR_NM_FLASH_WRITE_ENABLED"]       = "消息事件: 闪存器件写操作已启用。";

//(u8HealthEventType) EVD2 == 0x07
eLang.monitoring_events_strings["STR_NM_CONFIG_GENERIC"] = "通用性错误。"
eLang.monitoring_events_strings["STR_NM_CONFIG_MISSING_VSCC"]       = "丢失VSCC表。";
eLang.monitoring_events_strings["STR_NM_CONFIG_SENSOR_SCAN"]       = "PIA中传感器扫描时间间隔错误。";
eLang.monitoring_events_strings["STR_NM_CONFIG_DEVICE"]       = "PIA中设备定义错误。";
eLang.monitoring_events_strings["STR_NM_CONFIG_SMART"]       = "SMART/CLST 配置错误。";
eLang.monitoring_events_strings["STR_NM_CONFIG_INCONSISTENT"]       = "ME固件配置不一致或者超出范围。";
eLang.monitoring_events_strings["STR_NM_CONFIG_FLASH_WRITE"]       = "芯片写操作百分比";

//(u8HealthEventType) EVD2 == 0x0D 
eLang.monitoring_events_strings["STR_NM_EVD2_0d_01"] = "- DRAM 初始化完成";
eLang.monitoring_events_strings["STR_NM_EVD2_0d_02"] = "- MCTP SAD 寄存器未正确被BIOS配置.";
eLang.monitoring_events_strings["STR_NM_EVD2_0d_03"] = "- DMI 对PECI请求超时"; 

//(u8HealthEventType) EVD2 == 0x10

eLang.monitoring_events_strings["STR_NM_EVD2_10_00"] = "- 其他段定义特性。";
eLang.monitoring_events_strings["STR_NM_EVD2_10_01"] = "- 快速功耗限制";
eLang.monitoring_events_strings["STR_NM_EVD2_10_02"] = "- 气流出口温度";
eLang.monitoring_events_strings["STR_NM_EVD2_10_03"] = "- CUPS";
eLang.monitoring_events_strings["STR_NM_EVD2_10_04"] = "- 散热政策和入口温度";
eLang.monitoring_events_strings["STR_NM_EVD2_10_05"] = "- 平台受限于MICs";
eLang.monitoring_events_strings["STR_NM_EVD2_10_07"] = "- 电源共享";
eLang.monitoring_events_strings["STR_NM_EVD2_10_08"] = "- MIC 代理";
eLang.monitoring_events_strings["STR_NM_EVD2_10_09"] = "- 重置警告";
eLang.monitoring_events_strings["STR_NM_EVD2_10_0a"] = "- PMBus 代理";
eLang.monitoring_events_strings["STR_NM_EVD2_10_0b"] = "- 保持不变";
eLang.monitoring_events_strings["STR_NM_EVD2_10_0c"] = "- IPMI ME 固件更新";
eLang.monitoring_events_strings["STR_NM_EVD2_10_0d"] = "- MCTP 总线控制器";
eLang.monitoring_events_strings["STR_NM_EVD2_10_0e"] = "- MCTP 总线控制器代理";
eLang.monitoring_events_strings["STR_NM_EVD2_10_0f"] = "- 两个 BIOS";
eLang.monitoring_events_strings["STR_NM_EVD2_10_10"] = "- 电池缺失";


eLang.monitoring_events_strings["STR_NM_POLICYCORRECTIONTIME"]      = "策略修正超时，";
eLang.monitoring_events_strings["STR_NM_DOMAIN_PLAT"]    = "范围为整个系统。 ";
eLang.monitoring_events_strings["STR_NM_DOMAIN_CPU"]     = "范围为CPU子系统。 ";
eLang.monitoring_events_strings["STR_NM_DOMAIN_MEM"]     = "范围为内存子系统。 ";
eLang.monitoring_events_strings["STR_NM_DOMAIN_UNKNOWN"] = "范围为未知子系统。 ";
eLang.monitoring_events_strings["STR_NM_POLICY"]      	 = "策略号: ";
eLang.monitoring_events_strings["STR_NM_POLICY_UNKNOWN"] = "未知策略号。";
eLang.monitoring_events_strings["STR_NM_SMCLST"] = "SmaRT - CLST";
eLang.monitoring_events_strings["STR_NM_SMCLST_FROMPSU"] = "从电源传感器";
eLang.monitoring_events_strings["STR_NM_SMCLST_FROMEXT"] = "从外部装置";

eLang.monitoring_events_strings["STR_EVENT_PREV"] = "<"; //"Previous";
eLang.monitoring_events_strings["STR_EVENT_NEXT"] = ">"; //"Next";
eLang.monitoring_events_strings["STR_EVENT_ALL"] = "全部";
eLang.monitoring_events_strings["STR_EVENT_FIRST"] = "首页";
eLang.monitoring_events_strings["STR_EVENT_LAST"] = "末页";
eLang.monitoring_events_strings["STR_EVENT_ALLWARN"] = "警告：一次性查看大量时间可能会影响浏览器性能。";
eLang.monitoring_events_strings["STR_EVENT_PERPAGE"] = "每页事件: ";

// Other event specific strings.
eLang.monitoring_events_strings["STR_OSEVENT"] = "OS事件";
eLang.monitoring_events_strings["STR_BIOSREC"] = "BIOS恢复";
eLang.monitoring_events_strings["STR_OTHER"] = "其他未知事件";
