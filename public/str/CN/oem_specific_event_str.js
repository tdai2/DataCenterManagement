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
eLang.oem_power_failure_detection_map_strings[0] = "240VA保护";
eLang.oem_power_failure_detection_map_strings[1] = "内存供电系统失效";
eLang.oem_power_failure_detection_map_strings[2] = "处理器子系统失效";
eLang.oem_power_failure_detection_map_strings[3] = "PCH休眠电源激活失效";
eLang.oem_power_failure_detection_map_strings[4] = "PCH主电源失效";
eLang.oem_power_failure_detection_map_strings[5] = "板载5V和3.3V电源失效";
eLang.oem_power_failure_detection_map_strings[6] = "电源单元失效";
eLang.oem_power_failure_detection_map_strings[7] = "板载网络芯片电源失效";
eLang.oem_power_failure_detection_map_strings[8] = "IB电源失效";
eLang.oem_power_failure_detection_map_strings[9] = "板载SAS模块电源失效";

eLang.oem_specific_event_strings = new Array();
eLang.oem_specific_event_strings[43] = new Array();
eLang.oem_specific_event_strings[43][0] =      "更新开始。 ";
eLang.oem_specific_event_strings[43][1] =      "更新成功。 ";
eLang.oem_specific_event_strings[43][2] =      "更新失败。 ";
eLang.oem_specific_event_strings[43][3] =      "保留。 ";
eLang.oem_specific_event_strings[43][4] =      "保留。 ";
eLang.oem_specific_event_strings[43][5] =      "IBMC ";
eLang.oem_specific_event_strings[43][6] =      "BIOS ";
eLang.oem_specific_event_strings[43][7] =      "ME ";
eLang.oem_specific_event_strings[43][8] =      "SDR 存储";
eLang.oem_specific_event_strings[43][9] =      "保留 ";
eLang.oem_specific_event_strings[43][10] =     "严重性： 良好。";
eLang.oem_specific_event_strings[43][11] =     "严重性： 降级。";
eLang.oem_specific_event_strings[43][12] =     "严重性： 非致命 ";
eLang.oem_specific_event_strings[43][13] =     "严重性： 致命 ";
eLang.oem_specific_event_strings[43][14] =      "保留。 ";
eLang.oem_specific_event_strings[43][15] =      "主版本 ";
eLang.oem_specific_event_strings[43][16] =      "次版本 ";
eLang.oem_specific_event_strings[43][17] =      " 创建版本号 ";

// PCIe Fatal Errors (SN: 0x04, Offsets 0x00 - 0x0F)
eLang.oem_specific_event_strings[0x04] = new Array();
eLang.oem_specific_event_strings[0x04][0x00] = "数据链路层协议错误 ";
eLang.oem_specific_event_strings[0x04][0x01] = "突发链路丢失错误";
eLang.oem_specific_event_strings[0x04][0x02] = "完成符放弃 ";
eLang.oem_specific_event_strings[0x04][0x03] = "不支持的请求 ";
eLang.oem_specific_event_strings[0x04][0x04] = "Poisoned TLP ";
eLang.oem_specific_event_strings[0x04][0x05] = "流量控制协议 ";
eLang.oem_specific_event_strings[0x04][0x06] = "完成超时 ";
eLang.oem_specific_event_strings[0x04][0x07] = "接收器缓存溢出 ";
eLang.oem_specific_event_strings[0x04][0x08] = "ACS违规 ";
eLang.oem_specific_event_strings[0x04][0x09] = "Malformed TLP ";
eLang.oem_specific_event_strings[0x04][0x0A] = "ECRC错误 ";
eLang.oem_specific_event_strings[0x04][0x0B] = "从下行数据中接收到关键消息";
eLang.oem_specific_event_strings[0x04][0x0C] = "异常完成 ";
eLang.oem_specific_event_strings[0x04][0x0D] = "接收到ERR_NONFATAL信息 ";
eLang.oem_specific_event_strings[0x04][0x0E] = "无法纠正的内部 ";
eLang.oem_specific_event_strings[0x04][0x0F] = "MC Blocked TLP ";

// PCIe Correctable Errors (SN: 0x05, Offsets 0x00 - 0x08)
eLang.oem_specific_event_strings[0x05] = new Array();
eLang.oem_specific_event_strings[0x05][0x00] = "接收器错误 ";
eLang.oem_specific_event_strings[0x05][0x01] = "损坏的DLLP ";
eLang.oem_specific_event_strings[0x05][0x02] = "损坏的TLLP ";
eLang.oem_specific_event_strings[0x05][0x03] = "重播数字翻转 ";
eLang.oem_specific_event_strings[0x05][0x04] = "重放计时器超时 ";
eLang.oem_specific_event_strings[0x05][0x05] = "报告非致命 ";
eLang.oem_specific_event_strings[0x05][0x06] = "链接带宽更改 ";
eLang.oem_specific_event_strings[0x05][0x07] = "可纠正的内部 ";
eLang.oem_specific_event_strings[0x05][0x08] = "首部日志溢出 ";
eLang.oem_specific_event_strings[0x1A] = new Array();
eLang.oem_specific_event_strings[0x1A][0x00] = "在BMC启动时检测到的BMC映像文件认证失败";
eLang.oem_specific_event_strings[0x1A][0x01] = "在BMC启动时检测到无效的BMC安全版本号";
eLang.oem_specific_event_strings[0x1A][0x02] = "在BMC更新时检测到BMC映像文件验证失败";
eLang.oem_specific_event_strings[0x1A][0x03] = "在BMC更新时检测到无效的BMC安全版本号";
eLang.oem_specific_event_strings[0x1A][0x04] = "在非固件映像的数据块升级时，针对该签名数据块的验证失败。";
eLang.oem_specific_event_strings[0x1A][0x05] = "在BMC启动或运行时， 针对非固件映像的签名数据块验证失败。";
eLang.oem_specific_event_strings[0x1A][0x06] = "在非固件映像的签名数据块升级时，检测到无效的安全版本号。";
eLang.oem_specific_event_strings[0x1A][0x07] = "在非固件映像的签名数据块启动或运行时，检测到无效的安全版本号。";

// BIOS Recovery Mode Status (SN: 0x15, Offsets 0x00 -- 0x01)
eLang.oem_specific_event_strings[0x15] = new Array();
//eLang.oem_specific_event_strings[0x15][0x00] = "";
eLang.oem_specific_event_strings[0x15][0x01] = "BIOS恢复开始";
eLang.oem_specific_event_strings[0x15][0x02] = "BIOS恢复完成";
// SPS Firmware Health (SN: 0x17, Event Data 2: 0x00 - 0x0A). Note that this is based on Event Data 2, not sensor offset.
eLang.oem_specific_event_strings[0x17] = new Array();
eLang.oem_specific_event_strings[0x17][0x00] = "消息事件: 遇到一次强制GPIO恢复事件。恢复镜像已装载。";
eLang.oem_specific_event_strings[0x17][0x01] = "严重事件: 执行镜像失败。已装载镜像。必须更换闪存设备，或者升级操作必须重新开始。";
eLang.oem_specific_event_strings[0x17][0x02] = "严重事件： 闪存崩溃。擦除闪存操作时发生错误。闪存设备必须更换。";
eLang.oem_specific_event_strings[0x17][0x03] = "";	// Full description for offset 0x03 is in monitoring_events_str.js
eLang.oem_specific_event_strings[0x17][0x04] = "严重事件： 固件执行期间发生内部错误。镜像需要更新为另一版本或者硬件主板需要维修（如果该错误持续出现）。";
eLang.oem_specific_event_strings[0x17][0x05] = "严重事件： BMC未响应冷启动请求，且ME将平台重启。 请确认节点管理器配置。";
eLang.oem_specific_event_strings[0x17][0x06] = "消息事件: BIOS要求直接闪存更新。ME固件将切换到恢复模式以从BIOS执行全面更新。 该状态为过渡状态。ME固件将在BIOS执行镜像更新成功后回到操作状态。";
eLang.oem_specific_event_strings[0x17][0x07] = "严重事件： 工厂生产错误。ME检测到错误的工厂生产配置。该闪存设备必须被替换（如果该错误持续出现）。";
eLang.oem_specific_event_strings[0x17][0x08] = "严重事件： 持续出现的存储完整性错误。检测到闪存文件系统错误。如果错误持续出现，使用IPMI命令Force ME Recovery或者置起ME_FORCE_UPDATE跳线并执行AC电源关闭再开启操作恢复工厂预设值";
eLang.oem_specific_event_strings[0x17][0x09] = "严重事件： 固件执行期间发生内部错误。镜像需要更新为另一版本或者硬件主板需要维修（如果该错误持续出现）。";
eLang.oem_specific_event_strings[0x17][0x0A] = "警告事件： 恢复镜像已使用IPMI命令Force ME Recovery或者其它方式装载。";

// AutoCfg Events (SN: 0x87, ED3: 0x00 - 0x05)
eLang.oem_specific_event_strings[0x87] = new Array();
eLang.oem_specific_event_strings[0x87][0x00] ="配置文件的语法错误";
eLang.oem_specific_event_strings[0x87][0x01] ="机箱自动检测错误";
eLang.oem_specific_event_strings[0x87][0x02] ="SDR/CFG文件不匹配";
eLang.oem_specific_event_strings[0x87][0x03] ="SDR或CFG文件损坏";
eLang.oem_specific_event_strings[0x87][0x04] ="SDR文件的语法错误";

// NM SmaRT & CLST (SN: 0xB2, ED2 bits 7:4 0x00-0x08)
eLang.oem_specific_event_strings[0xB2] = new Array();
eLang.oem_specific_event_strings[0xB2][0x00] = "转换为OK";
eLang.oem_specific_event_strings[0xB2][0x01] = "从OK转换到非临界";
eLang.oem_specific_event_strings[0xB2][0x02] = "从不太严重转换到临界";
eLang.oem_specific_event_strings[0xB2][0x03] = "从不太严重转换到不可恢复";
eLang.oem_specific_event_strings[0xB2][0x04] = "从更严重转换到非临界";
eLang.oem_specific_event_strings[0xB2][0x05] = "从不可恢复转换到临界";
eLang.oem_specific_event_strings[0xB2][0x06] = "转换到不可恢复";
eLang.oem_specific_event_strings[0xB2][0x07] = "监控";
eLang.oem_specific_event_strings[0xB2][0x08] = "信息";

//Caterr recovery info sensor(SN: 0x7D)
eLang.oem_specific_event_strings[0x7D] = new Array();
eLang.oem_specific_event_strings[0x7D][0x00] = "转存成功；";
eLang.oem_specific_event_strings[0x7D][0x01] = "转存失败；";
eLang.oem_specific_event_strings[0x7D][0x02] = "转存非核心MSR寄存器失败";
eLang.oem_specific_event_strings[0x7D][0x03] = "转存核心MSR寄存器失败";
eLang.oem_specific_event_strings[0x7D][0x04] = "转存CPU IIO错误寄存器失败";
eLang.oem_specific_event_strings[0x7D][0x05] = "转存PCI配置空间失败";
eLang.oem_specific_event_strings[0x7D][0x06] = "转存MCA错误源寄存器失败";
