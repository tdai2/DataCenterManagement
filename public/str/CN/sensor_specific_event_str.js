/*************************************** Sensor specific event codes ******************************************/
//eLang.sensor_specific_event_strings[SENSOR TYPE CODE][SENSOR-SPECIFIC OFFSET] = "EVENT DESCRIPTION";
/*********************************************************************************************************************/
eLang.sensor_specific_event_strings = new Array();
eLang.sensor_specific_event_strings[0] = "保留";
eLang.sensor_specific_event_strings[1] = "温度";
eLang.sensor_specific_event_strings[2] = "电压";
eLang.sensor_specific_event_strings[3] = "电流";
eLang.sensor_specific_event_strings[4] = "风扇";

eLang.sensor_specific_event_strings[5] = new Array();
eLang.sensor_specific_event_strings[5][0] =      "报告检测到机箱被非法开启";
eLang.sensor_specific_event_strings[5][1] =      "报告检测到驱动器托架被非法开启";
eLang.sensor_specific_event_strings[5][2] =      "报告I/O卡区域被非法开启";
eLang.sensor_specific_event_strings[5][3] =      "报告处理器区域被非法开启";
eLang.sensor_specific_event_strings[5][4] =      "报告网线连接丢失";
eLang.sensor_specific_event_strings[5][5] =      "报告存在非法安装或弹出扩展座";
eLang.sensor_specific_event_strings[5][6] =      "报告风扇区域被非法开启";


eLang.sensor_specific_event_strings[6] = new Array();
eLang.sensor_specific_event_strings[6][0] =      "报告存在安全模式（前面板加锁）违规尝试";
eLang.sensor_specific_event_strings[6][1] =      "报告存在启动前用户密码违规尝试";
eLang.sensor_specific_event_strings[6][2] =      "报告存在启动前设置密码违规尝试";
eLang.sensor_specific_event_strings[6][3] =      "报告存在启动前网络启动密码违规尝试";
eLang.sensor_specific_event_strings[6][4] =      "报告存在启动前密码违规尝试";
eLang.sensor_specific_event_strings[6][5] =      "报告存在带外访问密码违规尝试";

eLang.sensor_specific_event_strings[7] = new Array();
eLang.sensor_specific_event_strings[7][0] =      "报告CATERR已发生";
eLang.sensor_specific_event_strings[7][1] =      "报告处理器发生热断路保护";
eLang.sensor_specific_event_strings["THERMTRIP"] = "报告处理器发生热断路保护";

eLang.sensor_specific_event_strings["FIVR"] = "报告处理器发生FIVR启动错误";
eLang.sensor_specific_event_strings[7][2] =      "报告发生FRB1/BIST错误";eLang.sensor_specific_event_strings[7][3] =      "报告发生FRB2/上电自检期间系统停止错误";
eLang.sensor_specific_event_strings[7][4] =      "报告FRB3/处理器启动/初始化错误";
eLang.sensor_specific_event_strings[7][5] =      "报告存在一个配置错误";
eLang.sensor_specific_event_strings[7][6] =      "报告SM BIOS '不可纠正的CPU-Complex错误";
eLang.sensor_specific_event_strings[7][7] =      "报告检测到处理器存在";
eLang.sensor_specific_event_strings[7][8] =      "报告处理器已禁用";
eLang.sensor_specific_event_strings[7][9] =      "报告检测到终止器";
eLang.sensor_specific_event_strings[7][10] =     "报告处理器已自动降频";

eLang.sensor_specific_event_strings[8] = new Array();
eLang.sensor_specific_event_strings[8][0] =      "报告检测到电源存在";
eLang.sensor_specific_event_strings[8][1] =      "报告电源遇到一个错误";
eLang.sensor_specific_event_strings[8][2] =      "报告检测到一个电源的可预知错误";
eLang.sensor_specific_event_strings[8][3] =      "报告电源输入（直流/交流）丢失";
eLang.sensor_specific_event_strings[8][4] =      "报告电源输入已丢失或超过范围";
eLang.sensor_specific_event_strings[8][5] =      "报告电源输入超过范围，但电源存在";
eLang.sensor_specific_event_strings[8][6] =      "报告存在配置错误";

eLang.sensor_specific_event_strings[9] = new Array();
eLang.sensor_specific_event_strings[9][0] =      "报告供电单元电源已关闭或正在关闭。";
eLang.sensor_specific_event_strings[9][1] =      "报告供电单元正处于关闭再开启过程中";
eLang.sensor_specific_event_strings[9][2] =      "报告240伏安电源已关闭";
eLang.sensor_specific_event_strings[9][3] =      "报告联锁（interlock）电源已关闭";
eLang.sensor_specific_event_strings[9][4] =      "报告供电单元交流电丢失";
eLang.sensor_specific_event_strings[9][5] =      "报告发生一个软电源控制错误";
eLang.sensor_specific_event_strings[9][6] =      "报告供电单元遇到一个错误";
eLang.sensor_specific_event_strings[9][7] =      "报告检测到一个供电单元的可预知错误";

eLang.sensor_specific_event_strings[12] = new Array();
eLang.sensor_specific_event_strings[12][0] =      "可纠正的ECC";
eLang.sensor_specific_event_strings[12][1] =      "不可纠正的ECC";
eLang.sensor_specific_event_strings[12][2] =      "奇偶校验";
eLang.sensor_specific_event_strings[12][3] =      "内存清除错误";
eLang.sensor_specific_event_strings[12][4] =      "内存设备被禁用";
eLang.sensor_specific_event_strings[12][5] =      "达到可纠正ECC日志上限";
eLang.sensor_specific_event_strings[12][6] =      "已检测到存在性";
eLang.sensor_specific_event_strings[12][7] =      "配置错误";
eLang.sensor_specific_event_strings[12][8] =      "备份";
eLang.sensor_specific_event_strings[12][9] =      "内存自动降频";
eLang.sensor_specific_event_strings[12][10] =     "严重超过温度";

eLang.sensor_specific_event_strings[13] = new Array();
eLang.sensor_specific_event_strings[13][0] =      "驱动器存在";
eLang.sensor_specific_event_strings[13][1] =      "驱动器错误";
eLang.sensor_specific_event_strings[13][2] =      "可预知的错误";
eLang.sensor_specific_event_strings[13][3] =      "热备份";
eLang.sensor_specific_event_strings[13][4] =      "正在进行一致性校验/奇偶校验";
eLang.sensor_specific_event_strings[13][5] =      "在关键阵列中";
eLang.sensor_specific_event_strings[13][6] =      "在失败阵列中";
eLang.sensor_specific_event_strings[13][7] =      "正在进行重建/重映射";
eLang.sensor_specific_event_strings[13][8] =      "放弃重建/重映射 (没有正常完成)";

eLang.sensor_specific_event_strings[15] = new Array();
eLang.sensor_specific_event_strings[15][0] =      "错误";
eLang.sensor_specific_event_strings[15][1] =      "中止";
eLang.sensor_specific_event_strings[15][2] =      "进展";



eLang.sensor_specific_event_strings[16] = new Array();
eLang.sensor_specific_event_strings[16][0] =      "报告可纠正内存错误日志已被禁用";
eLang.sensor_specific_event_strings[16][1] =      "报告事件日志已被禁用";
eLang.sensor_specific_event_strings[16][2] =      "报告日志区域已被清空";
eLang.sensor_specific_event_strings[16][3] =      "报告所有事件日志已被禁用";
eLang.sensor_specific_event_strings[16][4] =      "报告系统事件日志(SEL)已满";
eLang.sensor_specific_event_strings[16][5] =      "报告系统事件日志(SEL)即将填满";

eLang.sensor_specific_event_strings[17] = new Array();
eLang.sensor_specific_event_strings[17][0] =      "报告BIOS监视控制器(Watchdog)触发了一次重启";
eLang.sensor_specific_event_strings[17][1] =      "报告操作系统监视控制器(Watchdog)触发了一次重启";
eLang.sensor_specific_event_strings[17][2] =      "报告操作系统监视控制器(Watchdog)触发了关机";
eLang.sensor_specific_event_strings[17][3] =      "报告操作系统监视控制器(Watchdog)触发了电源关闭";
eLang.sensor_specific_event_strings[17][4] =      "报告操作系统监视控制器(Watchdog)触发了电源关闭再开启事件";
eLang.sensor_specific_event_strings[17][5] =      "报告操作系统监视控制器(Watchdog)触发了一个非屏蔽中断（NMI）/诊断性中断";
eLang.sensor_specific_event_strings[17][6] =      "报告操作系统监视控制器(Watchdog)已过期";
eLang.sensor_specific_event_strings[17][7] =      "报告操作系统监视控制器(Watchdog)触发了预超时中断";

eLang.sensor_specific_event_strings[18] = new Array();
eLang.sensor_specific_event_strings[18][0] =      "报告系统已被重新配置";
eLang.sensor_specific_event_strings[18][1] =      "报告OEM系统启动事件";
eLang.sensor_specific_event_strings[18][2] =      "报告存在未知系统硬件错误";
eLang.sensor_specific_event_strings[18][3] =      "报告辅助日志增加了新条目";
eLang.sensor_specific_event_strings[18][4] =      "报告一个PEF操作已被触发";
eLang.sensor_specific_event_strings[18][5] =      "报告时间戳时钟同步。该事件为BIOS每次启动时产生的两个期望事件之一。";

eLang.sensor_specific_event_strings[19] = new Array();
eLang.sensor_specific_event_strings[19][0] =      "报告检测到前面板触发非屏蔽中断（NMI）/诊断性中断";
eLang.sensor_specific_event_strings[19][1] =      "报告总线超时";
eLang.sensor_specific_event_strings[19][2] =      "报告检测到I/O通道检查触发NMI";
eLang.sensor_specific_event_strings[19][3] =      "报告检测到由软件触发的NMI";
eLang.sensor_specific_event_strings[19][4] =      "报告检测到PCI PERR";
eLang.sensor_specific_event_strings[19][5] =      "报告检测到PCI SERR";
eLang.sensor_specific_event_strings[19][6] =      "报告检测到EISA故障无害化超时";
eLang.sensor_specific_event_strings[19][7] =      "报告检测到可纠正总线错误";
eLang.sensor_specific_event_strings[19][8] =      "报告检测到不可纠正总线错误";
eLang.sensor_specific_event_strings[19][9] =      "报告检测到致命NMI";
eLang.sensor_specific_event_strings[19][10] =    "报告检测到致命总线错误";

eLang.sensor_specific_event_strings[20] = new Array();
eLang.sensor_specific_event_strings[20][0] =      "报告电源按钮已被按下";
eLang.sensor_specific_event_strings[20][1] =      "报告睡眠按钮已被按下";
eLang.sensor_specific_event_strings[20][2] =      "报告重启按钮已被按下";
eLang.sensor_specific_event_strings[20][3] =      "报告FRU锁扣已被打开";
eLang.sensor_specific_event_strings[20][4] =      "报告FRU服务请求按钮已被按下";

eLang.sensor_specific_event_strings[25] = new Array();
eLang.sensor_specific_event_strings[25][0] =      "报告软电源控制错误";

eLang.sensor_specific_event_strings[29] = new Array();
eLang.sensor_specific_event_strings[29][0] =      "报告因电源开启，系统开始启动";
eLang.sensor_specific_event_strings[29][1] =      "报告因硬重启，系统开始启动";
eLang.sensor_specific_event_strings[29][2] =      "报告因热重启，系统开始启动";
eLang.sensor_specific_event_strings[29][3] =      "报告因用户请求PXE启动，系统开始启动";
eLang.sensor_specific_event_strings[29][4] =      "报告因自动诊断性启动，系统开始启动";

eLang.sensor_specific_event_strings[30] = new Array();
eLang.sensor_specific_event_strings[30][0] =      "报告不存在可启动的存储设备";
eLang.sensor_specific_event_strings[30][1] =      "报告驱动器中为不可启动的磁盘";
eLang.sensor_specific_event_strings[30][2] =      "报告不能找到PXE服务器";
eLang.sensor_specific_event_strings[30][3] =      "报告启动扇区不可用";
eLang.sensor_specific_event_strings[30][4] =      "报告用户选择启动源超时";

eLang.sensor_specific_event_strings[31] = new Array();
eLang.sensor_specific_event_strings[31][0] =      "报告从驱动器A启动完成";
eLang.sensor_specific_event_strings[31][1] =      "报告从驱动器C启动完成";
eLang.sensor_specific_event_strings[31][2] =      "报告从PXE服务器启动完成";
eLang.sensor_specific_event_strings[31][3] =      "报告诊断性启动完成";
eLang.sensor_specific_event_strings[31][4] =      "报告从CD-ROM启动完成";
eLang.sensor_specific_event_strings[31][5] =      "报告从ROM启动完成";
eLang.sensor_specific_event_strings[31][6] =      "报告从未知设备启动完成";

eLang.sensor_specific_event_strings[32] = new Array();
eLang.sensor_specific_event_strings[32][0] =      "报告操作系统装载或初始化期间发生一个严重停止错误";
eLang.sensor_specific_event_strings[32][1] =      "报告发生一次运行时严重停止事件";
eLang.sensor_specific_event_strings[32][2] =      "报告发生一次操作系统正常停止事件";
eLang.sensor_specific_event_strings[32][3] =      "报告发生一次操作系统正常关机事件";
eLang.sensor_specific_event_strings[32][4] =      "报告发生一次PEF触发的软关机事件";
eLang.sensor_specific_event_strings[32][5] =      "报告代理无法响应";

eLang.sensor_specific_event_strings[33] = new Array();
eLang.sensor_specific_event_strings[33][0] =      "报告进入错误状态";
eLang.sensor_specific_event_strings[33][1] =      "报告进入识别状态";
eLang.sensor_specific_event_strings[33][2] =      "报告一个插槽或接口设备已被安装或连接";
eLang.sensor_specific_event_strings[33][3] =      "报告一个插槽或接口设备已准备就绪可安装";
eLang.sensor_specific_event_strings[33][4] =      "报告一个插槽或接口设备已准备就绪可移除";
eLang.sensor_specific_event_strings[33][5] =      "报告该插槽电源关闭";
eLang.sensor_specific_event_strings[33][6] =      "报告一个插槽或接口设备被请求移除";
eLang.sensor_specific_event_strings[33][7] =      "报告进入联锁状态";
eLang.sensor_specific_event_strings[33][8] =      "报告该插槽被禁用";
eLang.sensor_specific_event_strings[33][9] =      "报告该插槽插有闲置设备";

eLang.sensor_specific_event_strings[34] = new Array();
eLang.sensor_specific_event_strings[34][0] =      "报告 (S0) 该系统在正常工作";
eLang.sensor_specific_event_strings[34][1] =      "报告 (S1) 该系统在睡眠状态";
eLang.sensor_specific_event_strings[34][2] =      "报告 (S2) 该系统处于CPU睡眠状态";
eLang.sensor_specific_event_strings[34][3] =      "报告 (S3) 该系统当前处于电源键关闭模式";
eLang.sensor_specific_event_strings[34][4] =      "报告 (S4) 该系统当前处于挂起到磁盘模式";
eLang.sensor_specific_event_strings[34][5] =      "报告 (S5/G2) 该系统当前处于软关闭模式";
eLang.sensor_specific_event_strings[34][6] =      "报告 (S4/S5) 该系统当前处于软关闭模式，具体状态未知";
eLang.sensor_specific_event_strings[34][7] =      "报告 (G3) 该系统当前处于机械关闭模式";
eLang.sensor_specific_event_strings[34][8] =      "报告 (S1/S2/S3) 具体状态未知";
eLang.sensor_specific_event_strings[34][9] =      "报告 (G1; S1-S4) 状态未知";
eLang.sensor_specific_event_strings[34][10] =      "报告 (S5) 由覆盖进入";
eLang.sensor_specific_event_strings[34][11] =      "报告 传统电源开启状态";
eLang.sensor_specific_event_strings[34][12] =      "报告 传统电源关闭状态";
eLang.sensor_specific_event_strings[34][13] =      "报告 未知的ACPI电源模式";

eLang.sensor_specific_event_strings[35] = new Array();
eLang.sensor_specific_event_strings[35][0] =      "报告监视定时器（watchdog）已过期";
eLang.sensor_specific_event_strings[35][1] =      "报告监视定时器（watchdog）发起了一次硬重启";
eLang.sensor_specific_event_strings[35][2] =      "报告监视定时器（watchdog）发起了一次电源关闭";
eLang.sensor_specific_event_strings[35][3] =      "报告监视定时器（watchdog）发起了一次电源关闭再开启事件";
eLang.sensor_specific_event_strings[35][4] =      "保留";
eLang.sensor_specific_event_strings[35][5] =      "保留";
eLang.sensor_specific_event_strings[35][6] =      "保留";
eLang.sensor_specific_event_strings[35][7] =      "保留";
eLang.sensor_specific_event_strings[35][8] =      "报告时钟中断";

eLang.sensor_specific_event_strings[36] = new Array();
eLang.sensor_specific_event_strings[36][0] =      "报告平台管理子系统产生了一个平台页";
eLang.sensor_specific_event_strings[36][1] =      "报告平台管理子系统产生了一个平台网络警报";
eLang.sensor_specific_event_strings[36][2] =      "报告平台管理子系统产生了一个平台事件陷阱(PET)";
eLang.sensor_specific_event_strings[36][3] =      "报告平台管理子系统产生了一个平台OEM格式SNMP警报";

eLang.sensor_specific_event_strings[37] = new Array();
eLang.sensor_specific_event_strings[37][0] =      "报告实体存在";
eLang.sensor_specific_event_strings[37][1] =      "报告实体不存在";
eLang.sensor_specific_event_strings[37][2] =      "报告该实体已禁用";

eLang.sensor_specific_event_strings[39] = new Array();
eLang.sensor_specific_event_strings[39][0] =      "报告网络心跳已丢失";
eLang.sensor_specific_event_strings[39][1] =      "报告检测到网络心跳";

eLang.sensor_specific_event_strings[40] = new Array();
eLang.sensor_specific_event_strings[40][0] =      "报告传感器访问已降级或不可访问";
eLang.sensor_specific_event_strings[40][1] =      "报告控制器访问已变为降级或不可访问";
eLang.sensor_specific_event_strings[40][2] =      "报告管理控制器离线";
eLang.sensor_specific_event_strings[40][3] =      "报告管理控制器不可用";
eLang.sensor_specific_event_strings[40][4] =      "传感器已失效，可能不能提供有效的读值";

eLang.sensor_specific_event_strings[41] = new Array();
eLang.sensor_specific_event_strings[41][0] =      "报告电池电量低";
eLang.sensor_specific_event_strings[41][1] =      "报告电池已失效";
eLang.sensor_specific_event_strings[41][2] =      "报告已检测到电池存在";

eLang.sensor_specific_event_strings[42] = new Array();
eLang.sensor_specific_event_strings[42][0] =      "报告会话激活";
eLang.sensor_specific_event_strings[42][1] =      "报告会话停用";

eLang.sensor_specific_event_strings[43] = new Array();
eLang.sensor_specific_event_strings[43][0] =      "报告检测到相关实体硬件变更";
eLang.sensor_specific_event_strings[43][1] =      "报告检测到相关实体固件或软件变更";
eLang.sensor_specific_event_strings[43][2] =      "报告检测到相关实体硬件不兼容";
eLang.sensor_specific_event_strings[43][3] =      "报告检测到相关实体固件或软件不兼容";
eLang.sensor_specific_event_strings[43][4] =      "报告检测到相关实体无效或不支持的硬件版本";
eLang.sensor_specific_event_strings[43][5] =      "报告检测到相关实体包含一个无效或不支持的固件或软件版本";
eLang.sensor_specific_event_strings[43][6] =      "报告检测到相关实体硬件变更已成功";
eLang.sensor_specific_event_strings[43][7] =      "报告检测到相关实体固件或软件变更已成功";

eLang.sensor_specific_event_strings[44] = new Array();
eLang.sensor_specific_event_strings[44][0] =      "报告FRU未安装。状态变更的原因。";
eLang.sensor_specific_event_strings[44][1] =      "报告FRU不可用。 状态变更的原因。";
eLang.sensor_specific_event_strings[44][2] =      "报告已请求FRU激活";
eLang.sensor_specific_event_strings[44][3] =      "报告FRU正在激活";
eLang.sensor_specific_event_strings[44][4] =      "报告FRU已激活";
eLang.sensor_specific_event_strings[44][5] =      "报告已请求FRU停用";
eLang.sensor_specific_event_strings[44][6] =      "报告正在停用FRU";
eLang.sensor_specific_event_strings[44][7] =      "报告与FRU的通信已丢失";
