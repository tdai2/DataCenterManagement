var DIMMListTable;
var tblJSON;
var str = '';
var level = 0;
var g_loggedin_user_delerror = 0x846;

function doInit() {
	 // TODO: add page initialization code
	 
	 exposeElms(['_DIMMListHolder',
	 			'_lblHeader']);
	 			
	 vhref=top.document.getElementsByTagName('frameset')[1];
	 vcolsa=vhref.cols.split(",");
	 
	 loadCustomPageElements();
	 IPMICMD_HL_GetDIMMInfo();
	 
}

function loadCustomPageElements()
{
/*	DIMMListTable = domapi.Listgrid({
	  x				  : 0,
	  y				  : 0,
	  w				  : (parseInt(document.body.clientWidth)-20), //+parseInt(vcolsa[2])
	  h				  : (parseInt(document.body.clientHeight)-180),
	  headerH		  : 25,
	  doLedgerMode    : false,
	  doColMove       : false,
	  doColSort       : true,
	  doDepress       : true,
	  gridlines       : "both",
	  doAllowEdit     : false,
	  doColResize     : true,
	  linesPerRow     : 1,
	  minColWidth     : 150,
	  doShowHeader    : true,
	  doShowRowbar    : false,
	  doMultiSelect   : false,
	  doVirtualMode   : false,
	  doAllowNoSelect : true,
	  doShowSelection : true 
	});
	
	DIMMListTable.style.position = 'relative';
	//DIMMListTable.style.width = (parseInt(document.body.clientWidth)-20+parseInt(top.helpFrame.document.body.offsetWidth))+'px';
	
	DIMMListTable.style.background = 'transparent';
	*/
	
	DIMMListTable = listgrid({
		w				: '100%',
		h				: '',
		doAllowNoSelect : true
	});
	DIMMListHolder.appendChild(DIMMListTable.table);
	
/* If there is a listgrid embed in the page,
** please don't use resize event directly
** Use only via lGrid.onpageresize event 
*/
	DIMMListTable.onpageresize = function()
	{
		this.table.style.width = '100%';
		this.table.style.width = this.container.header.offsetWidth+'px';
	}
	
	try{
	
	tblJSON = {
				cols:[
			{text:eLang.getString('common',"STR_ASSET_DIMMs1"), fieldName:'slot_number',    w:'10%', textAlign:'left'},
			{text:eLang.getString('common',"STR_ASSET_DIMMs2"), fieldName:'size',                w:'10%', textAlign:'left'},
			{text:eLang.getString('common',"STR_ASSET_DIMMs3"), fieldName:'type',                w:'10%', textAlign:'left'},
			{text:eLang.getString('common',"STR_ASSET_DIMMs4"), fieldName:'speed',              w:'10%', textAlign:'left'},
			{text:eLang.getString('common',"STR_ASSET_DIMMs5"), fieldName:'manufacturer',     w:'10%', textAlign:'left'},
			{text:eLang.getString('common',"STR_ASSET_DIMMs7"), fieldName:'asset_tag',           w:'10%', textAlign:'left'},
			{text:eLang.getString('common',"STR_ASSET_DIMMs6"), fieldName:'serial_number',    w:'20%', textAlign:'left'},
			{text:eLang.getString('common',"STR_ASSET_DIMMs8"), fieldName:'part_number',      w:'20%', textAlign:'left'}
				]
				};
				
	DIMMListTable.loadFromJson(tblJSON);
	}catch(e)
	{
		alert(e);
	}

}


function IPMICMD_HL_GetDIMMInfo()
{
	showWait(true);
	xmit.get({url:"/rpc/getdimminfo.asp",onrcv:IPMICMD_GetDIMMInfo_Res, status:''});
}

function IPMICMD_GetDIMMInfo_Res (arg)
{
	var JSONRows = new Array();
	
	showWait(false);
	
	DIMMINFO_DATA = WEBVAR_JSONVAR_HL_GETDIMMINFO.WEBVAR_STRUCTNAME_HL_GETDIMMINFO;
	
	var CmdStatus = WEBVAR_JSONVAR_HL_GETDIMMINFO.HAPI_STATUS;
	if (GET_ERROR_CODE(CmdStatus) == 0xD4)	//Insufficient privilege level
	{
		// alert (eLang.getString('common',"STR_USER_PRIVILEGE"));
		location.href = 'config_nav.html';
	}
	else if (CmdStatus != 0)
	{
		errstr =  eLang.getString('common','STR_ASSET_DIMM_GETINFO');
		errstr += (eLang.getString('common','STR_IPMI_ERROR') + GET_ERROR_CODE(CmdStatus));
		alert(errstr);
	}
	else if(DIMMINFO_DATA.length == 0)
	{
               errstr =  eLang.getString('common','STR_ASSET_DIMM_GETINFO');
	        alert(errstr);
	}
	else
	{
		DIMMListTable.clear();
		
		tDIMMCnt = 0;
		
		for (i=0;i<DIMMINFO_DATA.length;i++) 
		{
		       tDIMMCnt++; 		
			   
				try{
				JSONRows.push({cells:[
						{text:DIMMINFO_DATA[i].SlotNumber, value:DIMMINFO_DATA[i].SlotNumber},
						{text:DIMMINFO_DATA[i].DIMMSize, value:DIMMINFO_DATA[i].DIMMSize},
						{text:DIMMINFO_DATA[i].DIMMType, value:DIMMINFO_DATA[i].DIMMType},
						{text:DIMMINFO_DATA[i].DIMMSpeed, value:DIMMINFO_DATA[i].DIMMSpeed},
						{text:DIMMINFO_DATA[i].DIMMManufacture, value:DIMMINFO_DATA[i].DIMMManufacture},
						{text:DIMMINFO_DATA[i].AssetTag, value:DIMMINFO_DATA[i].AssetTag},
						{text:DIMMINFO_DATA[i].SerialNumber, value:DIMMINFO_DATA[i].SerialNumber},
						{text:DIMMINFO_DATA[i].PartNumber, value:DIMMINFO_DATA[i].PartNumber} 
						]});
				}catch(e)
				{
					alert(e);		
				}
		
			tblJSON.rows = JSONRows;
		
			DIMMListTable.loadFromJson(tblJSON);

		}

		lblHeader.innerHTML = eLang.getString('common','STR_ASSET_DIMM_CNT')+tDIMMCnt+eLang.getString('common','STR_USR_MGMT_SFX');
	}
	
}

