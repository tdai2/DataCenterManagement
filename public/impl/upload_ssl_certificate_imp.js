var g_isadmin = 0;
function doInit() {
	 // TODO: add page initialization code
	 exposeElms(['_defCert',
	 			'_defPrivKey',
	 			'_sslFileBrowse',
	 			'_uploadBtn',
	 			'_upldType']);
	 			
		CheckRole();
		var status = eExt.parseURLvars ('status');
		if (status == 'uploadcomplete')
		{
		showWait(true);
			xmit.get({url:'/rpc/validatesslcert.asp', onrcv:ValidateSSLCertificate, status:''});
			return;
		}
	
		var key = eExt.parseURLvars('name');
		if(key=='privkeyupload')
		{
			sslFileBrowse.setAttribute('NAME', '/etc/actualprivkey.pem?16384');
			sslFileBrowse.name = "/etc/actualprivkey.pem?16384";
			upldType.innerHTML = eLang.getString('common',"STR_APP_STR_268");

		document.forms[0].onsubmit = function()
		{
			this.action = document.location+'&status=uploadcomplete';
			return validate();
		}
		}
		else
		{
			sslFileBrowse.setAttribute('NAME', '/etc/actualcert.pem?16384');
			sslFileBrowse.name = "/etc/actualcert.pem?16384";
			upldType.innerHTML = eLang.getString('common',"STR_APP_STR_269");

		document.forms[0].onsubmit = function()
		{	
			this.action = document.location+'?name=privkeyupload';
			return onUpload();
		}
		}
		
	sslFileBrowse.onkeydown = function(e)
	{
		if(!e) e = window.event;

		if(e.keyCode!=13 && e.keyCode!=9)
		{
			return false;
		}
	}
				
		xmit.get({url:'/rpc/getsslcertstatus.asp', onrcv:onRcvStatus, status:''});
}

var certificate_status = eLang.getString('common','STR_APP_STR_270');
var certificate_info = eLang.getString('common','STR_APP_STR_271');
var privatekey_status = eLang.getString('common','STR_APP_STR_272');
var privatekey_info = eLang.getString('common','STR_APP_STR_271');
var certexists = false;



/***********************Role Checking functions*********************/
function CheckRole()
{
	xmit.get({url:'/rpc/getrole.asp', onrcv:OnCheckRole, status:''});
}

function OnCheckRole()
{
	if(WEBVAR_JSONVAR_GET_ROLE.WEBVAR_STRUCTNAME_GET_ROLE[0]['CURPRIV'] != 4)
	{
		g_isadmin = 0;
		//alert(eLang.getString('common','STR_APP_STR_267'));
		uploadBtn.disabled = true;
	}
	else
		g_isadmin = 1;
}



/***********************Role Checking functions*********************/

/*
 * function endsWith
 * Checks whether the string 'str' ends with the string 'lookfor'
 */

function endsWith(str, lookfor)
{
        var strlen = str.length;
        var lookforlen = lookfor.length;
                                                                                                                             
        var lookforptr = lookforlen;
        while( lookforptr > 0 )
        {
                if( str.charAt(strlen-lookforptr) != lookfor.charAt(lookforlen-lookforptr) )
                        return false;
                lookforptr--;
        }
        return true;
}

function convertToLocale(dateString)
{
	var CardDate = new Date(dateString + " GMT");

	return ( CardDate.toLocaleString() );

}

function validate()
{
	var fprivatekeypath = sslFileBrowse.value;
	if(fprivatekeypath.length == 0)
	{
		alert(eLang.getString('common','STR_APP_STR_299'));
		return false;
	}
	else
	{
		/*	check file name	*/
		if( !endsWith(fprivatekeypath, ".pem") )
		{
			alert(eLang.getString('common','STR_APP_STR_300'));
			return false;
		}
	}

	uploadBtn.disabled = true;
	//eSys.elm('message').value = 'Uploading ..Please wait';

	return true;
}




function ValidateSSLCertificate (arg)
{
	var certValid = 0;
	var privkeyValid = 0;

	showWait(false);
	if(WEBVAR_JSONVAR_VALIDATESSLCERT.HAPI_STATUS == 0)
	{
                certValid=WEBVAR_JSONVAR_VALIDATESSLCERT.WEBVAR_STRUCTNAME_VALIDATESSLCERT[0]['CERT_VALID'];
                privkeyValid=WEBVAR_JSONVAR_VALIDATESSLCERT.WEBVAR_STRUCTNAME_VALIDATESSLCERT[0]['PRIVKEY_VALID'];
                                                                                                                                                            
                if(privkeyValid == 2)
                {

			alert(eLang.getString('common','STR_APP_STR_301'));
			location.href = "upload_ssl_certificate.html";
			return;
                }
		if(1 == certValid  && 1 == privkeyValid)	//Valid SSL Certificate
		{
			if(confirm(eLang.getString('common','STR_CERT_UPLOADED')))
			{
				location.href = "restart_webserver.html";
				return;
			}
		}
		else		//Return values 0,2,3 for Invalid SSL Certificate
		{
			alert(eLang.getString('common','STR_APP_STR_303'));			
		}
	}
	else
	{
		alert(eLang.getString('common','STR_APP_STR_303'));
	}
	location.href = "upload_ssl_certificate.html";
}



function rebootCard()
{
	location.href = "/UI_resetonload.html";
}


onreboot = function()
{
	//shouldnt come here at all
}


function onUpload()
{
	if (g_isadmin)
	{
	        var fcertpath = new String(sslFileBrowse.value);
	        if(fcertpath.length == 0)
	        {
	                alert(eLang.getString('common','STR_APP_STR_305'));
			
			return false;
	        }
	        else
	        {
	                /*      check file name */
	                if( !endsWith(fcertpath, ".pem") )
	                {
	                        alert(eLang.getString('common','STR_APP_STR_306'));
				return false;
	                }
	        }
		if(certexists)
		{
			if (!confirm(eLang.getString('common','STR_APP_STR_307')))
				return false;
		}
		
		uploadBtn.disabled = true;
		return true;
	}
	else
	{
		alert(eLang.getString('common',"STR_APP_STR_267"));
		return false;
	}
}







function formatstr(formstr)
{
	var cstr = new String(formstr);

	cstr = cstr.replace(/\r/g, "");
	cstr = cstr.replace(/\n/g, " "); /* can also be replaced with <BR>*/
	cstr = cstr.replace(/"/g, '\\'+'"');
	cstr = cstr.replace(/'/g, "\\"+"'");

	return cstr;
}




function onRcvStatus (arg)
{
	if(WEBVAR_JSONVAR_SSLCERTSTATUS.HAPI_STATUS == 0)
	{

		if(WEBVAR_JSONVAR_SSLCERTSTATUS.WEBVAR_STRUCTNAME_SSLCERTSTATUS[0]['CERT_EXISTS'] != 0)
		{
			certexists = true;
		}

		if(WEBVAR_JSONVAR_SSLCERTSTATUS.WEBVAR_STRUCTNAME_SSLCERTSTATUS[0]['CERT_INFO'] != "Not Available")
		{
			certificate_status = eLang.getString('common','STR_APP_STR_410');
			certificate_info = new String(WEBVAR_JSONVAR_SSLCERTSTATUS.WEBVAR_STRUCTNAME_SSLCERTSTATUS[0]['CERT_INFO']);
			certificate_info = convertToLocale(certificate_info);
		}


		if(WEBVAR_JSONVAR_SSLCERTSTATUS.WEBVAR_STRUCTNAME_SSLCERTSTATUS[0]['PRIVKEY_INFO'] != "Not Available")
		{
			privatekey_status = eLang.getString('common','STR_APP_STR_410');
			privatekey_info = new String(WEBVAR_JSONVAR_SSLCERTSTATUS.WEBVAR_STRUCTNAME_SSLCERTSTATUS[0]['PRIVKEY_INFO']);
			privatekey_info = convertToLocale(privatekey_info);
		}

	}
	defCert.innerHTML = certificate_info; //certificate_status + ' ' + certificate_info;
	defPrivKey.innerHTML = privatekey_info; //privatekey_status + ' ' + privatekey_info;
}



