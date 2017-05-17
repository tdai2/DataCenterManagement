/*************************************** Event / Reading type codes *******************************************/
//eLang.event_strings[EVENT / READING TYPE CODE][GENERIC OFFSET] = "DESCRIPTION";
/*********************************************************************************************************************/
eLang.event_strings = new Array();
/******* Threshold Event Type Codes *********/
eLang.event_strings[1] = new Array();
eLang.event_strings[1][0] =      "报告该传感器处于非临界低值，且读值有变低趋势的状态";
eLang.event_strings[1][1] =      "报告该传感器处于非临界低值，且读值有变高趋势的状态";
eLang.event_strings[1][2] =      "报告该传感器处于临界低值，且读值有变低趋势的状态";
eLang.event_strings[1][3] =  	 "报告该传感器处于临界低值，且读值有变高趋势的状态";
eLang.event_strings[1][4] =      "报告该传感器处于非不可恢复低值，且读值有变低趋势的状态";
eLang.event_strings[1][5] =      "报告该传感器处于非不可恢复低值，且读值有变高趋势的状态";
eLang.event_strings[1][6] =      "报告该传感器处于非临界高值，且读值有变低趋势的状态";
eLang.event_strings[1][7] =      "报告该传感器处于非临界高值，且读值有变高趋势的状态";
eLang.event_strings[1][8] =      "报告该传感器处于临界高值，且读值有变低趋势的状态";
eLang.event_strings[1][9] =      "报告该传感器处于临界高值，且读值有变高趋势的状态";
eLang.event_strings[1][10] =    "报告该传感器处于不可恢复高值，且读值有变低趋势的状态";
eLang.event_strings[1][11] =    "报告该传感器处于不可恢复高值，且读值有变高趋势的状态";

/******* Generic Discrete Event Type Codes *********/
eLang.event_strings[2] = new Array();
eLang.event_strings[2][0] =      "报告该传感器切换到闲置状态";
eLang.event_strings[2][1] =      "报告该传感器切换到活跃状态";
eLang.event_strings[2][2] =      "报告该传感器切换到繁忙状态";

/******* Digital Discrete Event Type Codes *********/
eLang.event_strings[3] = new Array();
eLang.event_strings[3][0] =      "报告该状态已解除";
eLang.event_strings[3][1] =      "报告该状态已起效";

eLang.event_strings[4] = new Array();
eLang.event_strings[4][0] =      "报告一个预期错误已解除";
eLang.event_strings[4][1] =      "报告一个预期错误已发生";

eLang.event_strings[5] = new Array();
eLang.event_strings[5][0] =      "报告超出限制事件已解除";
eLang.event_strings[5][1] =      "报告限制已被超出";

eLang.event_strings[6] = new Array();
eLang.event_strings[6][0] =      "报告已符合预期性能要求";
eLang.event_strings[6][1] =      "报告还未符合预期性能要求";

eLang.event_strings[7] = new Array();
eLang.event_strings[7][0] =      "报告已进入良好状态";
eLang.event_strings[7][1] =      "报告已从良好状态进入非临界状态";
eLang.event_strings[7][2] =      "报告已从非临界状态进入临界状态";
eLang.event_strings[7][3] =  	 "报告已从非临界状态进入不可恢复状态";
eLang.event_strings[7][4] =      "报告已从临界状态进入非临界状态";
eLang.event_strings[7][5] =      "报告已从不可恢复状态进入临界状态";
eLang.event_strings[7][6] =      "报告已进入不可恢复状态";
eLang.event_strings[7][7] =      "报告该事件应被监控";
eLang.event_strings[7][8] =      "报告该事件纯粹为用于告之的消息";

eLang.event_strings[8] = new Array();
eLang.event_strings[8][0] =      "报告该设备已被移除或不存在";
eLang.event_strings[8][1] =      "报告该设备已被安装或存在";

eLang.event_strings[9] = new Array();
eLang.event_strings[9][0] =      "报告该设备被禁用";
eLang.event_strings[9][1] =      "报告该设备被启用";

eLang.event_strings[10] = new Array();
eLang.event_strings[10][0] =      "报告该设备进入运行状态";
eLang.event_strings[10][1] =      "报告该设备进入测试状态";
eLang.event_strings[10][2] =      "报告该设备进入关闭状态";
eLang.event_strings[10][3] =      "报告该设备进入开启状态";
eLang.event_strings[10][4] =      "报告该设备进入离线状态";
eLang.event_strings[10][5] =      "报告该设备进入休息状态";
eLang.event_strings[10][6] =      "报告该设备进入降档状态";
eLang.event_strings[10][7] =      "报告该设备进入节能状态";
eLang.event_strings[10][8] =      "报告该设备安装发现错误";

eLang.event_strings[11] = new Array();
eLang.event_strings[11][0] =	     "报告完整冗余已恢复";
eLang.event_strings[11][1] =	     "报告冗余已失效";
eLang.event_strings[11][2] =	     "报告一个或多个冗余设备已失效";
eLang.event_strings[11][3] =	     "报告该设备单元仍然可以在拥有正常操作最低要求的资源下工作";
eLang.event_strings[11][4] =	     "报告该单元设备重新获得正常操作最低要求的资源";
eLang.event_strings[11][5] =	     "报告资源已不足以维持正常操作";
eLang.event_strings[11][6] =	     "报告一个或多个冗余设备已失效";
eLang.event_strings[11][7] =	     "报告该单元设备重新获得部分冗余资源，但冗余不完整";

eLang.event_strings[12] = new Array();
eLang.event_strings[12][0] =	     "报告D0电源状态";
eLang.event_strings[12][1] =	     "报告D1电源状态";
eLang.event_strings[12][2] =	     "报告D2电源状态";
eLang.event_strings[12][3] =	     "报告D3电源状态";


