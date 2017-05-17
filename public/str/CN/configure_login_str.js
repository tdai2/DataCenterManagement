//------------------------------------------------------------//
// configure_login page string table
//------------------------------------------------------------//

eLang.configure_login_strings = {};

eLang.configure_login_strings["CONF_LOGIN_STR_TITLE"] = "配置登录";
eLang.configure_login_strings["CONF_LOGIN_STR_SAVE"] = "保存";
eLang.configure_login_strings["CONF_LOGIN_PAGE_TITLE"] = "安全设置";
eLang.configure_login_strings["CONF_LOGIN_PAGE_DESC"] = "您可以在本页面查看和修改登录安全设置。选择用户在几次登录失败后被锁定和被锁定时间长度。";
eLang.configure_login_strings["CONF_LOGIN_STR_FAILED_ATTEMPTS"] = "登录尝试失败次数";
eLang.configure_login_strings["CONF_LOGIN_STR_LOCKOUT_TIME"] = "该用户名被禁止登录的锁定时间（分钟）";
eLang.configure_login_strings["CONF_LOGIN_STR_FORCE_HTTPS"] = "强制使用HTTPS";
eLang.configure_login_strings["CONF_LOGIN_STR_ENABLE"] = "启用";
eLang.configure_login_strings["CONF_LOGIN_STR_WEB_TIMEOUT"] = "网页会话超时";
eLang.configure_login_strings["CONF_LOGIN_STR_WEB_TIME_SEC"] = "秒";

eLang.configure_login_strings["CONF_LOGIN_STR_HTTP_PORT"] = "HTTP端口";
eLang.configure_login_strings["CONF_LOGIN_STR_HTTP_SEC_PORT"] = "HTTPS(安全)端口";

eLang.configure_login_strings["CONF_LOGIN_ERR_HTTP"] = "HTTP 和 HTTPS 端口必须是1到65535之间,而且必须彼此不相等";
eLang.configure_login_strings["CONF_LOGIN_PORT_WARN"] = "警报: 更改端口值将导致Web服务器对当前端口停止响应。完成更改动作后，您将需要重新开启连接。";

eLang.configure_login_strings["CONF_LOGIN_STR_SERVICES"] = "可选的网络服务:";
eLang.configure_login_strings["CONF_LOGIN_STR_SSH_SERVICE"]  = "SSH";
eLang.configure_login_strings["CONF_LOGIN_STR_HTTP_SERVICE"] = "HTTP/HTTPS";
eLang.configure_login_strings["CONF_LOGIN_STR_RMCP_SERVICE"] = "IPMI over LAN";
