var IPMIListTable;
var JSONRows = new Array();

function doInit() {
    exposeElms([
                '_IPMIListHolder'
                ]);
    CheckRole();
}

function CheckRole()
{
	xmit.get({url:'/rpc/getrole.asp', onrcv:OnCheckRole, status:''});
}

function OnCheckRole()
{
var curPriv = WEBVAR_JSONVAR_GET_ROLE.WEBVAR_STRUCTNAME_GET_ROLE[0]['CURPRIV'];
	// user must have ADMINISTRATOR(4) privilege to see this page
	if((curPriv != 4))
	{
		location.href = '/page/config_nav.html';
		top.frames["helpFrame"].location.href = getHelpPage('/page/config_nav.html');
	}
	else
	{
	    LoadIPMITable();
	    GetIPMIInfo();	// Cascades into GetWebInfo() after getting IPMI info.
	}
}

function LoadIPMITable()
{
	IPMIListTable = new listgrid({
        w               : '100%',
        h               : '',
        doAllowNoSelect : true
    });
	IPMIListHolder.appendChild(IPMIListTable.table);

    /* If there is a listgrid embed in the page,
     ** please don't use resize event directly
     ** Use only via lGrid.onpageresize event
     */
	IPMIListTable.onpageresize = function()
    {
        this.table.style.width = '600px';
        this.table.style.width = this.container.header.offsetWidth+'px';
    }

    try{

    	IPMIListtblJSON = {
                cols:[
                      {text:eLang.getString("cur_users","STR_USERS_USERNAME"), fieldName:'name',                w:'20%', textAlign:'center'},
                      {text:eLang.getString("cur_users","STR_USERS_TYPE"),     fieldName:'type',                w:'20%', textAlign:'center'},
                      {text:eLang.getString("cur_users","STR_USERS_CHANNEL"),  fieldName:'channel',             w:'25%', textAlign:'center'},
                      {text:eLang.getString('cur_users',"STR_USERS_IPADDR"),   fieldName:'ipaddr',              w:'35%', textAlign:'center'}
                      ]
        };

        IPMIListTable.loadFromJson(IPMIListtblJSON);
    }catch(e)
    {
        alert(e);
    }
}

function GetIPMIInfo()
{
    showWait(true);
    xmit.get({url:"/rpc/getIPMIsessions.asp",onrcv:GetIPMIInfoRes, status:''});
}


function GetIPMIInfoRes (arg)
{
	JSONRows.length = 0;
	
    showWait(false);

    if(WEBVAR_JSONVAR_SESSIONS.HAPI_STATUS != 0)
    {
        // Call failed for some reason.
    }
    else
    {
    	IPMIListTable.clear();
    	
    	SESSIONS = WEBVAR_JSONVAR_SESSIONS.WEBVAR_STRUCTNAME_SESSIONS;
    	
        for (i=0; i<SESSIONS.length; i++)
        {
        	var_name = SESSIONS[i].UserName;
        	var_channel = GetChannelName(SESSIONS[i].u8channelTypeNum & 0x0F);
        	var_type = ((SESSIONS[i].u8channelTypeNum & 0xF0) >> 4) ? eLang.getString("cur_users","STR_USERS_2_0") : eLang.getString("cur_users","STR_USERS_1_5");
        	var_ip = SESSIONS[i].IPAddr;

	        try{
	            JSONRows.push({cells:[
	                                  /* name */        {text:var_name,        value:var_name},
	                                  /* type */        {text:var_type,        value:var_type},
	                                  /* channel */     {text:var_channel,     value:var_channel},
	                                  /* IP */          {text:var_ip,          value:var_ip}
	                                  ]});
	        }catch(e)
	        {
	            alert(e);
	        }
        }
    	// We'll load the data into the table after we check web sessions.
    }
    GetWebInfo();
}

function GetWebInfo()
{
    showWait(true);
    xmit.get({url:"/rpc/users.asp",onrcv:GetWebInfoRes, status:''});
}


function GetWebInfoRes (arg)
{
	
    showWait(false);

    if(WEBVAR_JSONVAR_WEB_USERS.HAPI_STATUS != 0)
    {
        // Call failed for some reason.
    }
    else
    {

    	WEB_USERS = WEBVAR_JSONVAR_WEB_USERS.WEBVAR_STRUCTNAME_WEB_USERS;
    	
        for (i=0; i<WEB_USERS.length; i++)
        {
        	var_name 	= WEB_USERS[i].USERNAME;
        	var_channel = GetChannelName(WEB_USERS[i].CHANNEL);
        	
        	if (WEB_USERS[i].SECURE == 1)
        	{
        		var_type = eLang.getString("cur_users","STR_USERS_WEB") + "(" + eLang.getString("cur_users","STR_USERS_SECURE") + ")";
        	}
        	else
        	{
        		var_type    = eLang.getString("cur_users","STR_USERS_WEB");
        	}
        	
        	if (WEB_USERS[i].KVMSESSIONS > 0)
        	{
        		var_type = var_type + " + " + eLang.getString("cur_users","STR_USERS_KVM") + "(" +WEB_USERS[i].KVMSESSIONS + ")";
        	}
        	
        	if (WEB_USERS[i].MEDIASESSIONS > 0)
        	{
        		var_type = var_type + " + " + eLang.getString("cur_users","STR_USERS_MEDIA");
        	}

        	var_ip 		= WEB_USERS[i].IPADDR;

	        try{
	            JSONRows.push({cells:[
	                                  /* name */        {text:var_name,        value:var_name},
	                                  /* type */        {text:var_type,        value:var_type},
	                                  /* channel */     {text:var_channel,     value:var_channel},
	                                  /* IP */          {text:var_ip,          value:var_ip}
	                                  ]});
	        }catch(e)
	        {
	            alert(e);
	        }
        }
    	
        IPMIListtblJSON.rows = JSONRows;
    	IPMIListTable.loadFromJson(IPMIListtblJSON);
    }
}

function GetChannelName(u8Channel)
{
	var LAN_RMCP_CHANNEL  = 0x01;
	var LAN_RMCP_CHANNEL1 = 0x03;
    var LAN_RMCP_CHANNEL2 = 0x02;
    
	if (u8Channel == LAN_RMCP_CHANNEL)
	{
	    return eLang.getString('common','LAN_RMCP_CHANNEL');
	}
	else if (u8Channel == LAN_RMCP_CHANNEL1)
	{
		return eLang.getString('common','LAN_RMCP_CHANNEL1');
	}
	else if (u8Channel == LAN_RMCP_CHANNEL2)
	{
		return eLang.getString('common','LAN_RMCP_CHANNEL2');
	}
	else
	{
		return eLang.getString('common','STR_APP_STR_185');
	}
}

function getHelpPage(page)
{
	//change normal html file to hlp html file 
	//change directory page to str/selectedLanguage
	return page.replace('.html','_hlp.html').replace('/page','/help/'+top.gLangSetting);
}