var gLang = "EN"

TOPNAV={
	items:[
		{label:"STR_TOPNAV_SYSTEM_INFORMATION", level:0, func:"", page:"sys_info.html", nav:"SYSINFO_LEFTNAV", enabled:1, userprops:{}},
		{label:"STR_TOPNAV_SERVER_HEALTH", level:0, func:"", page:"welcome_serverhealth.html", nav:"SRVR_HEALTH_LEFTNAV", enabled:1, userprops:{}},
		{label:"STR_TOPNAV_CONFIGURATION", level:0, func:"", page:"welcome_configuration.html", nav:"CONFIG_LEFTNAV", enabled:1, userprops:{}},
		{label:"STR_TOPNAV_SVRDIAG", level:0, func:"", page:"welcome_serverdiag.html", nav:"SVR_DIAG_LEFTNAV", enabled:1, userprops:{}},
		{label:"STR_TOPNAV_REMOTE_CONTROL", level:0, func:"", page:"welcome_remotecontrol.html", nav:"RMCNTRL_LEFTNAV", enabled:1, userprops:{}}
	]
};

SYSINFO_LEFTNAV={
	items:[
		{label:"STR_SYSINFO_LEFTNAV_SYSTEM_INFORMATION", level:0, func:"", page:"/page/sys_info.html", nav:"", enabled:1, userprops:{"icon":'/res/icons/sysinfo.jpg', "ptitle":'STR_SI_SYSTEM_INFO_PTITLE', "pdesc":'STR_SI_SYSTEM_INFO_PDESC', "level":1, "id":'SYS_INFO', "pid":null}},
	       {label:"STR_SYSINFO_LEFTNAV_FRU_INFORMATION", level:0, func:"", page:"/page/fru_info.html", nav:"", enabled:1, userprops:{"icon":'/res/icons/sysinfo.jpg', "ptitle":'STR_SI_FRU_INFO_PTITLE', "pdesc":'STR_SI_FRU_INFO_PDESC', "level":1, "id":'FRU_INFO', "pid":null}},
		{label:"STR_SYSINFO_LEFTNAV_CPU_SMBIOS", level:0, func:"", page:"/page/CPU_SMBIOS.html", nav:"", enabled:1, userprops:{"icon":'/res/icons/sysinfo.jpg', "ptitle":'STR_ASSET_CPU_PTITLE', "pdesc":'STR_ASSET_CPU_PDESC', "level":1, "id":'SYS_CPU', "pid":null}},
		{label:"STR_SYSINFO_LEFTNAV_DIMM_INFORMATION", level:0, func:"", page:"/page/Asset_DIMM.html", nav:"", enabled:1, userprops:{"icon":'/res/icons/sysinfo.jpg', "ptitle":'STR_ASSET_DIMM_PTITLE', "pdesc":'STR_ASSET_DIMM_PDESC', "level":1, "id":'SYS_DIMM', "pid":null}},
		{label:"STR_SYSINFO_LEFTNAV_USER_INFORMATION", level:0, func:"", page:"/page/current_users.html", nav:"", enabled:1, userprops:{"icon":'/res/icons/sysinfo.jpg', "ptitle":'STR_ASSET_USER_PTITLE', "pdesc":'STR_ASSET_USER_PDESC', "level":1, "id":'SYS_USER', "pid":null}}
	//  ,
	//	{label:"STR_SYSINFO_LEFTNAV_FIRMWARE_INFORMATION", level:0, func:"", page:"/page/firmware_info.html", nav:"", enabled:1, userprops:{"icon":'/res/icons/sysinfo.jpg', "ptitle":'STR_SI_FW_INFO_PTITLE', "pdesc":'STR_SI_FW_INFO_PDESC', "level":1, "id":'FW_INFO', "pid":null}}
	]
};
SRVR_HEALTH_LEFTNAV={
	items:[
		{label:"STR_SRVR_HEALTH_LEFTNAV_SENSOR_READINGS", level:0, func:"", page:"/page/sensor_reading.html", nav:"", enabled:1, userprops:{"icon":'/res/icons/monitor.jpg', "ptitle":'STR_SH_SENSOR_READING_PTITLE', "pdesc":'STR_SH_SENSOR_READING_PDESC', "level":1, "id":'SNSR_RDNG', "pid":'SRVR_HLTH'}},
		{label:"STR_SRVR_HEALTH_LEFTNAV_EVENT_LOG", level:0, func:"", page:"/page/monitoring_events.html", nav:"", enabled:1, userprops:{"icon":'/res/icons/monitor.jpg', "ptitle":'STR_SH_EVENT_LOG_PTITLE', "pdesc":'STR_SH_EVENT_LOG_PDESC', "level":1, "id":'EVNT_LOG', "pid":'SRVR_HLTH'}},
		{label:"STR_SRVR_HEALTH_LEFTNAV_POWER_STATS", level:0, func:"", page:"/page/power_stats.html", nav:"", enabled:1, userprops:{"icon":'/res/icons/monitor.jpg', "ptitle":'STR_POWER_STATS_PTITLE', "pdesc":'STR_POWER_STATS_PDESC', "level":1, "id":'POWER_STATS', "pid":'SRVR_HLTH'}}		
	]
};
CONFIG_LEFTNAV={
	items:[
		{label:"STR_CONFIG_LEFTNAV_IPV4_NETWORK", level:0, func:"", page:"/page/configure_IPv4_network.html", nav:"", enabled:1, userprops:{"icon":'/res/icons/config.jpg', "ptitle":'STR_CFG_CONF_NW_PTITLE', "pdesc":'STR_CFG_CONF_NW_PDESC', "level":1, "id":'NETWORK', "pid":'CONFIGURE'}},
		{label:"STR_CONFIG_LEFTNAV_IPV6_NETWORK", level:0, func:"", page:"/page/configure_IPv6_network.html", nav:"", enabled:1, userprops:{"icon":'/res/icons/config.jpg', "ptitle":'STR_CFG_CONF_NW_PTITLE', "pdesc":'STR_CFG_CONF_NW_PDESC', "level":1, "id":'NETWORK', "pid":'CONFIGURE'}},
		{label:"STR_CONFIG_LEFTNAV_USERS", level:0, func:"", page:"/page/configure_user.html", nav:"", enabled:1, userprops:{"icon":'/res/icons/users.jpg', "ptitle":'STR_CFG_CONF_USER_PTITLE', "pdesc":'STR_CFG_CONF_USER_PDESC', "level":1, "id":'USERS', "pid":'CONFIGURE'}},
		{label:"STR_LEFTNAV_WEB_SETTINGS", level:0, func:"", page:"/page/configure_web.html", nav:"", enabled:1, userprops:{"icon":'/res/icons/config.jpg', "ptitle":'STR_CFG_CONF_WEBSET_PITITLE', "pdesc":'STR_CFG_CONF_WEBSET_PDESC', "level":1, "id":'WEBSET', "pid":'CONFIGURE'}},
		{label:"STR_CONFIG_LEFTNAV_KVM_SETTINGS", level:0, func:"", page:"/page/configure_kvm.html", nav:"", enabled:1, userprops:{"icon":'/res/icons/config.jpg', "ptitle":'STR_CFG_CONF_KVMSET_PITITLE', "pdesc":'STR_CFG_CONF_KVMSET_PDESC', "level":1, "id":'KVMSET', "pid":'CONFIGURE'}},
		{label:"STR_CONFIG_LEFTNAV_SOL_SMASH", level:0, func:"", page:"/page/configure_solsmash.html", nav:"", enabled:1, userprops:{"icon":'/res/icons/config.jpg', "ptitle":'STR_CFG_CONF_SOLSET_PITITLE', "pdesc":'STR_CFG_CONF_SOLSET_PDESC', "level":1, "id":'SOLSET', "pid":'CONFIGURE'}},
		{label:"STR_CONFIG_LEFTNAV_LDAP", level:0, func:"", page:"/page/configure_ldap.html", nav:"", enabled:1, userprops:{"icon":'/res/icons/alerts.jpg', "ptitle":'STR_CFG_LDAP_PTITLE', "pdesc":'STR_CFG_LDAP_PDESC', "level":1, "id":'LDAP', "pid":'CONFIGURE'}},
		{label:"STR_CONFIG_LEFTNAV_VLAN", level:0, func:"", page:"/page/configure_vlan.html", nav:"", enabled:1, userprops:{"icon":'/res/icons/alerts.jpg', "ptitle":'STR_CFG_VLAN_PTITLE', "pdesc":'STR_CFG_VLAN_PDESC', "level":1, "id":'VLAN', "pid":'CONFIGURE'}},
		{label:"STR_CONFIG_LEFTNAV_SSL", level:0, func:"", page:"/page/upload_ssl_certificate.html", nav:"", enabled:1, userprops:{"icon":'/res/icons/config.jpg', "ptitle":'STR_CFG_UPLOAD_SSL_PTITLE', "pdesc":'STR_CFG_UPLOAD_SSL_PDESC', "level":1, "id":'SSL', "pid":'CONFIGURE'}},
		{label:"STR_CONFIG_LEFTNAV_ALERTS", level:0, func:"", page:"/page/configure_alerts.html", nav:"", enabled:1, userprops:{"icon":'/res/icons/alerts.jpg', "ptitle":'STR_CFG_CONF_ALERT_PTITLE', "pdesc":'STR_CFG_CONF_ALERT_PDESC', "level":1, "id":'ALERTS', "pid":'CONFIGURE'}},
		{label:"STR_CONFIG_LEFTNAV_SMTP", level:0, func:"", page:"/page/configure_smtp.html", nav:"", enabled:1, userprops:{"icon":'/res/icons/alerts.jpg', "ptitle":'STR_CFG_CONF_SMTP_PTITLE', "pdesc":'STR_CFG_CONF_SMTP_PDESC', "level":1, "id":'SMTP', "pid":'CONFIGURE'}},
		{label:"STR_CONFIG_LEFTNAV_NODEMANAGER", level:0, func:"", page:"/page/configure_nodemanager.html", nav:"", enabled:1, userprops:{"icon":'/res/icons/config.jpg', "ptitle":'STR_CFG_CONF_NM_PTITLE', "pdesc":'STR_CFG_CONF_NM_PDESC', "level":1, "id":'NODEMANAGER', "pid":'CONFIGURE'}},
        {label:"STR_LEFTNAV_SDR_CONFIG", level:0, func:"", page:"/page/sdr_config.html", nav:"", enabled:1, userprops:{"icon":'/res/icons/sysinfo.jpg', "ptitle":'STR_SYS_DIAG_PTITLE', "pdesc":'STR_SYS_DIAG_PDESC', "level":1, "id":'DEFAULTS', "pid":null}},
        {label:"STR_LEFTNAV_SOLLOG_CONFIG", level:0, func:"", page:"/page/configure_sollog.html", nav:"", enabled:1, userprops:{"icon":'/res/icons/sysinfo.jpg', "ptitle":'STR_CFG_SOLLOG_PTITLE', "pdesc":'STR_CFG_SOLLOG_PDESC', "level":1, "id":'SYS_SOL_CONFIG', "pid":null}}
	]
};
SVR_DIAG_LEFTNAV={
    items:[
        {label:"STR_LEFTNAV_SVRDIAG_SYSDIAG", level:0, func:"", page:"/page/sys_diag.html", nav:"", enabled:1, userprops:{"icon":'/res/icons/sysinfo.jpg', "ptitle":'STR_SYS_DIAG_PTITLE', "pdesc":'STR_SYS_DIAG_PDESC', "level":1, "id":'SYS_DIAG', "pid":null}},
        {label:"STR_LEFTNAV_SVRDIAG_SOLLOG", level:0, func:"", page:"/page/sys_sol.html", nav:"", enabled:1, userprops:{"icon":'/res/icons/sysinfo.jpg', "ptitle":'STR_SYS_DIAG_PTITLE', "pdesc":'STR_SYS_DIAG_PDESC', "level":1, "id":'SYS_SOL', "pid":null}},
		{label:"STR_LEFTNAV_SVRDIAG_POSTCODES", level:0, func:"", page:"/page/postcodes.html", nav:"", enabled:1, userprops:{"icon":'/res/icons/sysinfo.jpg', "ptitle":'STR_SYS_DIAG_PTITLE', "pdesc":'STR_SYS_DIAG_PDESC', "level":1, "id":'POSTCODES', "pid":null}},
        {label:"STR_LEFTNAV_SVRDIAG_DEFAULTS", level:0, func:"", page:"/page/set_defaults.html", nav:"", enabled:1, userprops:{"icon":'/res/icons/sysinfo.jpg', "ptitle":'STR_SYS_DIAG_PTITLE', "pdesc":'STR_SYS_DIAG_PDESC', "level":1, "id":'DEFAULTS', "pid":null}}
    ]
};

RMCNTRL_LEFTNAV={
	items:[
		{label:"STR_RMCNTRL_LEFTNAV_CONSOLE_REDIRECTION", level:0, func:"", page:"/page/launch_redirection.html", nav:"", enabled:1, userprops:{"icon":'/res/icons/monitor.jpg', "ptitle":'STR_RMCNTRL_REDIRECT_PTITLE', "pdesc":'STR_RMCNTRL_REDIRECT_PDESC', "level":1, "id":'LAUNCH_REDIR', "pid":'RMMGMT'}},
		{label:"STR_RMCNTRL_LEFTNAV_SERVER_POWER_CONTROL", level:0, func:"", page:"/page/server_power_control.html", nav:"", enabled:1, userprops:{"icon":'/res/icons/config.jpg', "ptitle":'STR_RMCNTRL_POWER_CNTRL_PTITLE', "pdesc":'STR_RMCNTRL_POWER_CNTRL_PDESC', "level":1, "id":'PWRCTRL', "pid":'RMMGMT'}},
		{label:"STR_RMCNTRL_LEFTNAV_FRONTPANELINFO_REDIRECTION", level:0, func:"", page:"/page/front_info.html", nav:"", enabled:1, userprops:{"icon":'/res/icons/sysinfo.jpg', "ptitle":'STR_RMCNTRL_FP_PTITLE', "pdesc":'STR_CFG_CONF_USER_PDESC', "level":1, "id":'USERS', "pid":'CONFIGURE'}}
	]
};

