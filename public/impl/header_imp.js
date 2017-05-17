var gCurUserName="";
var gCurServer="";
var gHelpOpen = false;
var helpDefWidth = 225;

//______________________________________________________________________________
//==============================================================================
//                                  doInit
//------------------------------------------------------------------------------
//
//
// Input
// -----
//   None
//
// Output
// ------
//    -
//
//____________________________________________________________________Author:BMB
//==============================================================================
// Jump Tag 1185518779484 [  PROC - "doInit()" ]


function doInit() {
	 // TODO: add page initialization code
	 //domapi.loadUnit('button');
	 exposeElms([
	 		"_headerleft",
	 		"_headermiddle",
	 		"_headerright",
	 		"_bannerleftimg",
	 		"_bannerrightimg",
	 		"_navbar",

	 		"_navbarlogoutlink",
	 		"_navbarlogoutimg",
	 		"_navbarlogouttxt",

	 		"_navbaraboutlink",
	 		"_navbaraboutimg",
	 		"_navbarabouttxt",

	 		"_navbarrefreshlink",
	 		"_navbarrefreshimg",
	 		"_navbarrefreshtxt",

	 		"_navbarhelplink",
	 		"_navbarhelpimg",
	 		"_navbarhelptxt",

	 		"_sidebaricon",
	 		"_titlecell",
	 		"_username",
	 		"_descriptioncell",
	 		"_servernameip",
	 		"_fntwcanvas",
	 		"_menudiv"]);
	 		
	 updateNavigator();
	 
	 
	 //for refresh to keep in same frames;
	 firstNav = TOPNAV.items[0].nav;
	 
	 lastNav = fnCookie.read('lastNav');
	 
	 
	 lastPage = fnCookie.read('lastPage');
	 
	 lItem = fnCookie.read('lItem');
	 
	 lastHiLit = fnCookie.read('lastHiLit');
	 
	 if(lastHiLit!=null)
	 	hilight($(lastHiLit));
	 
	 
	 if(lastNav!=null && lItem!=null)
	 {
	 	loadSection(eval(lastNav), lItem);
	 }
	 else if(lastPage!=null)
	 {
	 	var varTitle = eLang.getString('common',TOPNAV.items[lItem].userprops.ptitle);
		var varDesc = eLang.getString('common',TOPNAV.items[lItem].userprops.pdesc);
		
		sideBarIcon(TOPNAV.items[lItem].userprops.icon);
/*
		// now load the page information and the iconic image
		// sidebaricon.src = '..'+TOPNAV.items[lItem].userprops.icon;
		// IE6 reliable image src change bug fix
		// sidebaricon.style.background = "url("+TOPNAV.items[lItem].userprops.icon+") no-repeat center center";
*/				
		
		try
		{
		top.frames['sidebar'].optioncontainer.innerHTML = '';
		}catch(e)
		{
			setTimeout(delayedSidebar,200);
		}
		top.frames['mainFrame'].location.href = lastPage;
		top.frames['header'].titlecell.innerHTML = varTitle;
		top.frames['header'].descriptioncell.innerHTML = varDesc;
		
	 }
	 else
	 {
	 	 loadSection(eval(firstNav));
	 }

	 navbarhelplink.onselectstart = function()
	 { return false; }
	 
	 navbarhelplink.onclick = toggleHelp;

	 navbaraboutlink.onclick = showAbout;

	var nodeObj;
	var nodeImg;
// HELP
	 navbarhelplink.onmouseover = function()
	 {
		nodeObj = document.getElementById('_navbarhelptxt');
		nodeObj.style.fontWeight = 'normal';
		nodeObj.style.textDecoration = 'underline';
		nodeObj.style.color = '#0860A8';
        nodeImg = document.getElementById('_navbarhelpimg');
		nodeImg.src = '../res/help_over.png';
	 }
	 navbarhelplink.onmouseout = function()
	 {
		nodeObj = document.getElementById('_navbarhelptxt');
		nodeObj.style.fontWeight = 'normal';
		nodeObj.style.textDecoration = 'none';
		nodeObj.style.color = '#0860A8';
        nodeImg = document.getElementById('_navbarhelpimg');
		nodeImg.src = '../res/help.png';
	 }
// REFRESH
	 navbarrefreshlink.onmouseover = function()
	 {
		nodeObj = document.getElementById('_navbarrefreshtxt');
		nodeObj.style.fontWeight = 'normal';
		nodeObj.style.textDecoration = 'underline';
		nodeObj.style.color = '#0860A8';
        nodeImg = document.getElementById('_navbarrefreshimg');
		nodeImg.src = '../res/refresh_over.png';
	 }
	 navbarrefreshlink.onmouseout = function()
	 {
		nodeObj = document.getElementById('_navbarrefreshtxt');
		nodeObj.style.fontWeight = 'normal';
		nodeObj.style.textDecoration = 'none';
		nodeObj.style.color = '#0860A8';
        nodeImg = document.getElementById('_navbarrefreshimg');
		nodeImg.src = '../res/refresh.png';
	 }
// LOGOUT
	 navbarlogoutlink.onmouseover = function()
	 {
		nodeObj = document.getElementById('_navbarlogouttxt');
		nodeObj.style.fontWeight = 'normal';
		nodeObj.style.textDecoration = 'underline';
		nodeObj.style.color = '#0860A8';
        nodeImg = document.getElementById('_navbarlogoutimg');
		nodeImg.src = '../res/logout_over.png';
	 }
	 navbarlogoutlink.onmouseout = function()
	 {
		nodeObj = document.getElementById('_navbarlogouttxt');
		nodeObj.style.fontWeight = 'normal';
		nodeObj.style.textDecoration = 'none';
		nodeObj.style.color = '#0860A8';
        nodeImg = document.getElementById('_navbarlogoutimg');
		nodeImg.src = '../res/logout.png';
	 }
	 
// ABOUT
	 navbaraboutlink.onmouseover = function()
	 {
		nodeObj = document.getElementById('_navbarabouttxt');
		nodeObj.style.fontWeight = 'normal';
		nodeObj.style.textDecoration = 'underline';
		nodeObj.style.color = '#0860A8';
        nodeImg = document.getElementById('_navbaraboutimg');
		nodeImg.src = '../res/about_over.png';
	 }
	 navbaraboutlink.onmouseout = function()
	 {
		nodeObj = document.getElementById('_navbarabouttxt');
		nodeObj.style.fontWeight = 'normal';
		nodeObj.style.textDecoration = 'none';
		nodeObj.style.color = '#0860A8';
        nodeImg = document.getElementById('_navbaraboutimg');
		nodeImg.src = '../res/about.png';
	 }
}

function roll_over(img_name, img_src)
   {
        var nodeImg = document.getElementById(img_name);
        nodeImg.src = img_src;
   }

function toggleHelp()
{
	if(gHelpOpen)
	{
		closeHelp();
	}else
	{
		openHelp();
	}
}

function openHelp()
{
	var href = top.document.getElementsByTagName('frameset')[1];
	var colsa = href.cols.split(",");
	href.cols = (colsa[0]+","+colsa[1]+","+helpDefWidth);
	top.frames['helpFrame'].disabled = false;	//
	
	/*var hlpChk = xmit.getset({url:getHelpPage(top.frames["mainFrame"].location.href),
	 onrcv:function(arg)
	 {
	 	if(arg.status!=404)
	 	{*/
			top.frames["helpFrame"].location.href = getHelpPage(top.frames["mainFrame"].location.href);
			top.frames["helpFrame"].document.body.onload = function()
				{
					showWait(false);
				}		
			/*enableHelpButton(true);	 		
		 	}else
		 	{
		 		closeHelp();
		 		enableHelpButton(false);
		 	}
		 },
		 status:''});
	*/
	gHelpOpen = true;
	
	var lGrid = top.mainFrame.lGrid;
	//manually trigger listgrid resize event only in IE
	if(window.ActiveXObject)
	{
		if(lGrid!=undefined)
		{
			if(lGrid.onpageresize)
			{
				lGrid.onpageresize();
			}
		}
	}
}

function closeHelp()
{
	var href = top.document.getElementsByTagName('frameset')[1];
	var colsa = href.cols.split(",");
	href.cols = (colsa[0]+","+colsa[1]+",0");
	top.frames['helpFrame'].disabled = true;	// Keep any links from getting tab focus while closed
	gHelpOpen = false;
	
	var lGrid = top.mainFrame.lGrid;
	//manually trigger listgrid resize event only in IE
	if(window.ActiveXObject)
	{
		if(lGrid!=undefined)
		{
			if(lGrid.onpageresize)
			{
				lGrid.onpageresize();
			}
		}
	}
}
//==============================================================================
//==============================================================================
//==============================================================================


//______________________________________________________________________________
//==============================================================================
//                               setUserName
//------------------------------------------------------------------------------
//
//
// Input
// -----
//   text -
//
// Output
// ------
//    -
//
//____________________________________________________________________Author:BMB
//==============================================================================
// Jump Tag 1130524661 [  PROC - "setUserName()" ]

function setUserName(text)
{
	username.innerHTML=text;
}
//______________________________________________________________________________
//==============================================================================
//                                setServer
//------------------------------------------------------------------------------
//
//
// Input
// -----
//   text -
//
// Output
// ------
//    -
//
//____________________________________________________________________Author:BMB
//==============================================================================
// Jump Tag 1130522896 [  PROC - "setServer()" ]

function setServer(text)
{
	servernameip.innerHTML=text;
}
//______________________________________________________________________________
//==============================================================================
//                             updateNavigator
//------------------------------------------------------------------------------
//
//
// Input
// -----
//    -
//
// Output
// ------
//    -
//
//____________________________________________________________________Author:BMB
//==============================================================================
// Jump Tag 1130524694 [  PROC - "updateNavigator()" ]

/* Since we already have navobj built, Should we use that instead of this?
// So the whole function should be different? [by  Chandru]
// Note: navigatorBarOptions comes from app_UI.js (old style)
//       Use navobj instead (TOPNAV);

*/
function updateNavigator()
{
	for(var nItem = 0; nItem < TOPNAV.items.length; nItem++)
	{
		if(TOPNAV.items[nItem].enabled!=1) continue;
	
		//load the top navigation menu
		var hAnc = document.createElement('a');
		hAnc.className = 'buttons';
		hAnc.href = 'javascript:void(0)';
		hAnc.id = TOPNAV.items[nItem].label;
		hAnc.innerHTML = eLang.getString('navobj',TOPNAV.items[nItem].label);
		
		if(TOPNAV.items[nItem].nav!=''){
			var custAttr = document.createAttribute('lNavObj');
			custAttr.nodeValue = TOPNAV.items[nItem].nav;
			hAnc.setAttributeNode(custAttr);
			
			hAnc.onclick = function()
			{
				fnCookie.erase('lastPage');
				fnCookie.create('lastNav',this.getAttribute('lNavObj'));
				fnCookie.create('lastHiLit',this.id);
				loadSection(eval(this.getAttribute('lNavObj')));
				hilight(this);
			}
		}else if(TOPNAV.items[nItem].page!='')
		{
			var custAttr = document.createAttribute('nItem');
			custAttr.nodeValue = nItem;
			hAnc.setAttributeNode(custAttr);
			hAnc.onclick = function(){
				
				var _nItem = this.getAttribute('nItem');

				var curPage = TOPNAV.items[_nItem].page;
				
				fnCookie.erase('lastNav');
				fnCookie.create('lastPage',curPage);
				fnCookie.create('lItem', _nItem);
				fnCookie.create('lastHiLit',this.id);
				
				var varTitle = eLang.getString('common',TOPNAV.items[_nItem].userprops.ptitle);
				var varDesc = eLang.getString('common',TOPNAV.items[_nItem].userprops.pdesc);

				sideBarIcon(TOPNAV.items[_nItem].userprops.icon);
				//now load the page information and the iconic image
				//sidebaricon.src = '..'+TOPNAV.items[_nItem].userprops.icon;
				//IE6 reliable image src change bug fix
				//sidebaricon.style.background = "url("+TOPNAV.items[_nItem].userprops.icon+") no-repeat center center";
				
				top.frames['sidebar'].optioncontainer.innerHTML = '';
				top.frames['mainFrame'].location.href = curPage;
				top.frames['header'].titlecell.innerHTML = varTitle;
				top.frames['header'].descriptioncell.innerHTML = varDesc;
				hilight(this);
			}
		}
		
		var seperator = document.createTextNode('|');
		navbar.appendChild(hAnc);
		if(nItem<TOPNAV.items.length-1)
			navbar.appendChild(seperator);
	}
}


//______________________________________________________________________________
//==============================================================================
//                             loadSection
//------------------------------------------------------------------------------
//
//
// Input
// -----
//   Left Navigation Object -
//	 nIndex - (Optional, default=0)
//
// Output
// ------
//    -
//
//____________________________________________________________________Author:BMB
//==============================================================================
// Jump Tag 1130524694 [  PROC - "loadSection()" ]


function loadSection(oLeftNav, nIndex)
{
	//Purpose: This function loads the left navigation and updates the first child page in the mainframe
	//moreover it loads the image and description of the corresponding section to headerframe
	//whatmore is needed? Well, if nething just add it here.
	
	//if nIndex is not there load the first page
	if(nIndex==undefined || nIndex==null) nIndex = 0;
	
	//check if the item is enabled
	if(!oLeftNav.items[nIndex].enabled) return;
	
	
	//clear sidebar
	var frmSidebar = top.frames['sidebar'];
	
	if(frmSidebar.optioncontainer)
	{	
		frmSidebar.optioncontainer.innerHTML = '';
	}else
	{
		setTimeout(function(){
			loadSection(oLeftNav, nIndex);
		},100);
		return;
	}
	
	
	try{
	//first load the page so that the page loading time can be used to process the following tasks
		top.frames['mainFrame'].location.href = '..'+oLeftNav.items[nIndex].page;
		//top.frames['helpFrame'].location.href = '..'+getHelpPage(oLeftNav.items[nIndex].page);
		
		fnCookie.create('lItem',nIndex);
	}catch(e)
	{
		alert('Page not found');
	}
	
	sideBarIcon(oLeftNav.items[nIndex].userprops.icon);
	//now load the page information and the iconic image
	//sidebaricon.src = '..'+oLeftNav.items[nIndex].userprops.icon;
	//IE6 reliable image src change bug fix
	//sidebaricon.style.background = "url("+oLeftNav.items[nIndex].userprops.icon+") no-repeat center center";
	titlecell.innerHTML = eLang.getString('common',oLeftNav.items[0].userprops.ptitle);
	descriptioncell.innerHTML = eLang.getString('common',oLeftNav.items[0].userprops.pdesc);

	//now load the rest of the left nav
	
	var _tDiv = document.createElement('div');
	
	for(var nItem = 0; nItem < oLeftNav.items.length; nItem++ ){
	
		if(!oLeftNav.items[nItem].enabled) continue;
	
		var nAnc = document.createElement('a');
		nAnc.href = 'javascript:top.frames["mainFrame"].location.href="..'+oLeftNav.items[nItem].page+'"; fnCookie.create("lItem",'+ nItem +'); top.header.hiliteSub(); top.header.sideBarIcon("'+oLeftNav.items[nItem].userprops.icon+'"); void(0);';
		nAnc.innerHTML = eLang.getString('navobj',oLeftNav.items[nItem].label);	
		
		nAnc.className = 'navBtnsLvl'+oLeftNav.items[nItem].userprops.level;
		
		_tDiv.appendChild(nAnc); 
	}
	
	//IE 7 workaround
	frmSidebar.optioncontainer.innerHTML = _tDiv.innerHTML;
	
	//Events are lost when innerHTML is moved .. so a new loop adds the event now
	/*
	** Actually why do we need a onclick event? We can assign it to href directly.. (assign - page :) );
	** Page obviously will load faster 
	var eleLeftNav = frmSidebar.optioncontainer.getElementsByTagName('a');
	
	for(var nItem = 0; nItem < eleLeftNav.length; nItem++){
		eleLeftNav[nItem].onclick = function()
		{
			top.frames["mainFrame"].location.href="'+oLeftNav.items[nItem].page+'"; void(0);';
			//alert(nItem);
			//loadSection(oLeftNav, nItem); //recursive call to the function
		}
	}
	*/
	
	delete _tDiv;
	
}


function getHelpPage(page)
{
	//change normal html file to hlp html file 
	//change directory page to str/selectedLanguage
	return page.replace('.html','_hlp.html').replace('/page','/help/'+top.gLangSetting);
}


//______________________________________________________________________________
//==============================================================================
//                           hilight
//------------------------------------------------------------------------------
// Called on button click event of header navigation
//
//
// Input
// -----
//   button object -
//
// Output
// ------
//    -
//
//==============================================================================
// Jump Tag 1130524701 [  PROC - "hilight()" ]


function hilight(oBtn)
{
	var tNavBtns = navbar.getElementsByTagName('a');
	for(btn in tNavBtns)
	{
		// both button are same label then highlight it
		// assuming that navigation wont have same name twice :)
		if(tNavBtns[btn].innerHTML==oBtn.innerHTML) 
		{
			tNavBtns[btn].className = 'hiLightBtn';
		}else
		{
		// this is for repaint of all other buttons
			tNavBtns[btn].className = 'buttons';
		}
	}
}

function hiliteSub()
{
	setTimeout(function(){
		var tOptBtns = top.sidebar.optioncontainer.getElementsByTagName('a');
		for(btn=0; btn<tOptBtns.length; btn++){
			
			if(tOptBtns[btn].href.indexOf(top.mainFrame.location.pathname)==-1 && tOptBtns[btn].className!='navBtnsLvl0')
			{
				tOptBtns[btn].style.fontWeight = 'normal';
			}else
			{
				tOptBtns[btn].style.fontWeight = 'bold';
			}
		}
	},300);
}

function sideBarIcon(img)
{
	sidebaricon.src = '..'+img;
	//IE6 reliable image src change bug fix
	sidebaricon.style.background = "url("+img+") no-repeat center center";
}

//______________________________________________________________________________
//==============================================================================
//                           enabledisableNavBar
//------------------------------------------------------------------------------
// Called on startup or after log out.  Disables all buttons
//
//
// Input
// -----
//   enable -
//
// Output
// ------
//    -
//
//==============================================================================
// Jump Tag 1130524701 [  PROC - "enabledisableNavBar()" ]

function enabledisableNavBar(enable)
{
	if(!enable){
	var navbarBtns = navbar.getElementsByTagName('a');
	if(navbarBtns.length==0)
	{
		updateNavigator();
		enabledisableNavBar(enable);
		return;
	}
	for (var i=0;i<navbarBtns.length;i++)
		{
		navbarBtns[i].className = 'disabledBtns';
		navbarBtns[i].onclick = function(){ return false; }
		navbarBtns[i].href = '#'; 
		}
	}else
	{
		updateNavigator();
	}
}



//______________________________________________________________________________
//==============================================================================
//                              drawBannerArea
//------------------------------------------------------------------------------
//
//
// Input
// -----
//   configarea - reference to configuration area of UI JSON struc
//
// Output
// ------
//    -
//
//____________________________________________________________________Author:BMB
//==============================================================================
// Jump Tag 1130524715 [  PROC - "drawBannerArea()" ]

function drawBannerArea(configarea)
{
	eExt.debugCP("HEADER - drawing banner...",1);
	/* 
	
	already drawn.. Thanks [by Chandru]
	
	*/
	var nbh=document.getElementById("navbarhelplink");
	nbh.onclick=function()
		{
		parent.frames.helpFrame.openHelp();
		}
	eExt.debugCP("HEADER - drawing banner done...",1);
}



//______________________________________________________________________________
//==============================================================================
//                           setHeaderMiddleText
//------------------------------------------------------------------------------
//
//
// Input
// -----
//   content - content to write to middle header area
//
// Output
// ------
//    -
//
//____________________________________________________________________Author:BMB
//==============================================================================
// Jump Tag 1130524719 [  PROC - "setHeaderMiddleText()" ]

function setHeaderMiddleText(content)
{
	document.getElementById("headermiddle").innerHTML=content;
}

//______________________________________________________________________________
//==============================================================================
//                             enableHelpButton
//------------------------------------------------------------------------------
//
//
// Input
// -----
//   boolEnable -
//
// Output
// ------
//    -
//
//____________________________________________________________________Author:BMB
//==============================================================================
// Jump Tag 1130524725 [  PROC - "enableHelpButton()" ]

function enableHelpButton(boolEnable)
{
	navbarhelplink.disabled = !boolEnable;
	navbarhelplink.style.visibility = boolEnable?'visible':'hidden';
//    document.getElementById("navbarhelpimg").disabled=!boolEnable;
//    document.getElementById("navbarhelpimg").style.visibility=boolEnable?'visible':'hidden';
}

function showAbout()
{
    if (top.gManufacturerName != "")
    {
        alert(eLang.getString('common','STR_LEGAL_NOTICES1') + "\n" +
                eLang.getString('common','STR_LEGAL_NOTICES2A') + top.gManufacturerName + eLang.getString('common','STR_LEGAL_NOTICES2B') + "\n" +
                eLang.getString('common','STR_LEGAL_NOTICES3') );
    }
    else
    {
        alert(eLang.getString('common','STR_LEGAL_NOTICES1') + "\n" +
                eLang.getString('common','STR_LEGAL_NOTICES3') );
    }
}
