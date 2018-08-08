<!-- 
var g_IncludePublic;
function CheckConditionallyRequiredFields( frm, arrFieldsInError )
{
var arrMoreErrors = new Array();
return (arrMoreErrors);
} 
function CustomValidation( frm, arrFieldsInError )
{
var arrMoreErrors = new Array();
if (frm.hidAction.value == "Add" || frm.hidAction.value == "Update")
{
if (frm.sName.value.length == 0)
{
var arrError = FieldErrorInfo("", "", "", "sName", "Please Enter a Name!");
arrError[2] = '';
arrMoreErrors[0] = arrError;	
return (arrMoreErrors);
}
if (frm.hidIPSSymbol.value=="1")
{
if (frm.sShortCode.value.length == 0)
{
var arrError = FieldErrorInfo("", "", "", "sShortCode", "Please Enter a Code!");
arrError[2] = '';
arrMoreErrors[0] = arrError;	
return (arrMoreErrors);
}
}
if ((frm.hidAction.value == "Add") && (frm.sExtKeyNum != null) && (frm.sExtKeyNum.value.length == 0))
{
var arrError = FieldErrorInfo("", "", "", "sExtKeyNum", "Please Enter the External Investor ID!");
arrError[2] = '';
arrMoreErrors[0] = arrError;	
return (arrMoreErrors);
}
}
if ( frm.hidAction.value == "findcontacts" )
{
if ( (frm.contactLastName.value == null) || (frm.contactLastName.value == "") )
{
var sMsg = ""
sMsg = "Please enter atlease one character to search. If you do not know the last " ;
sMsg = sMsg + " name of the contact, or would like to see all contacts associated to this " ;
sMsg = sMsg + "Institutional investor, please click on Show all Contacts. "
var arrError = FieldErrorInfo("", "", "", "contactLastName", sMsg);
arrError[2] = '';
arrMoreErrors[0] = arrError;	
return (arrMoreErrors);
}
}
return (arrMoreErrors);
} 
function submitPage( frm , action )
{
switch (action)
{
case "savechanges" :
frm.method = "POST";
if (frm.hidInstInvID.value == "")
frm.hidAction.value = "Add";
else
frm.hidAction.value = "Update";
frm.action = "/asp/util_submit_action.asp";
if (frm.hid2790RestrDirty.value == "1" && frm.sel2790Restr.options[frm.sel2790Restr.selectedIndex].value == "" && frm.hidAction.value == 'Update')
{
alert("Please select valid 2790 Restriction");
return;
}
if (frm.hidODRestrDirty.value == "1" && frm.selODRestr.options[frm.selODRestr.selectedIndex].value == "" && frm.hidAction.value == "Update")
{
alert("Please select valid O & D Restriction");
return;
}
if (frm.hid2790RestrDirty.value == "1" && frm.sel2790Restr.options[frm.sel2790Restr.selectedIndex].value != "")
{
var bRet = confirm("Are you sure, 2790 restriction expiry date setting is correct?");
if (!bRet)
return;
}
if (frm.hidODRestrDirty.value == "1" && frm.selODRestr.options[frm.selODRestr.selectedIndex].value != "")
{
var bRet = confirm("Are you sure, O & D restriction expiry date setting is correct?");
if (!bRet)
return;
}
if(ValidateForm( frm )) 
frm.submit();
break; 
case "reverttosaved" :
frm.reset();
break;
case "cancel" :
frm.action = "mastertables.asp";
frm.submit();
break;
case "addreg" :
frm.action = "mastertables.asp";
frm.submit();
break;
case	"find" :
frm.method = "POST";
frm.hidAction.value = action;
frm.action = "/asp/mastertables_inst_investors.asp";
if(ValidateForm( frm )) 
frm.submit();	
break;
case	"create" :
frm.method = "POST"; 
frm.hidAction.value = action;
frm.action = "/asp/mastertables_inst_investors.asp";
frm.submit();	
break; 
case	"edit" :
frm.method = "POST";
frm.hidAction.value = "edit";
frm.action = "/asp/mastertables_inst_investors.asp";
frm.submit();	
break; 
case	"delete" : 
frm.method = "POST";
frm.hidAction.value = "Delete";
frm.action = "/asp/util_submit_action.asp";
if(ValidateForm( frm )) 
frm.submit();
break; 
case	"findcontacts" :
frm.hidAction.value = "findcontacts";
if(ValidateForm( frm )) 
{
if (frm.hidInstInvID.value == null || frm.hidInstInvID.value == "") 
frm.hidInstInvID.value = "0" ;
if (frm.hidMasterId.value == null || frm.hidMasterId.value == "") 
frm.hidMasterId.value = "0" ;
frm.method = "POST";
frm.hidAction.value = "edit";
frm.hidContactAction.value = "1" ;
frm.action = "/asp/mastertables_inst_investors.asp";
frm.submit();	
}
break; 
case	"findallcontacts" :
if (frm.hidInstInvID.value == null || frm.hidInstInvID.value == "") 
frm.hidInstInvID.value = "0" ;
if (frm.hidMasterId.value == null || frm.hidMasterId.value == "") 
frm.hidMasterId.value = "0" ;
frm.method = "POST";
frm.hidAction.value = "edit";
frm.hidContactAction.value = "1" ;
frm.hidShowAllContacts.value = "1" ;
frm.action = "/asp/mastertables_inst_investors.asp";
frm.submit();	
break; 
}
}
function setIssuerID(iInstInvId, iMstrId, bPublic, frm , action) 
{
frm.hidInstInvID.value = iInstInvId;
frm.hidMasterId.value = iMstrId;
frm.hidPublic.value = bPublic;
submitPage( frm , action );
}
function onEnter()
{
if(document.frmSearch.rsInstInvName.value == ""){
submitPage(document.frmSearch, "create");
}
else{
submitPage(document.frmSearch, "find");
}	
}
function onChangeClientType()
{
var frm = document.frmMain;
var frms = document.frmSearch;
hidePartialQIB(!(frm.rsSelClientType.value == "QIB") || frms.hidEnableQIBFeature.value == "0");
} 
function hidePartialQIB(bHide)
{
var elthis = eval('PartialQIBArea');
if (bHide == true)
elthis.style.display = 'none';
else
elthis.style.display = '';
}
function onPageLoad()
{
menuShow('mastertables', 'tophide');
var frm = document.frmSearch;
if (frm.hidCurrentAction.value == "create" || frm.hidCurrentAction.value == "edit")
{
onChangeClientType();
if(frm.hidCurrentAction.value == "edit")
Initialize2790andODOldValues(); 
}
if (document.frmMain && document.frmMain.hid2790ind && document.frmMain.hid2790ind)
{
if (document.frmMain.hid2790ind.value == 2)
document.getElementById("2790expiration").style.display = "none";
if (document.frmMain.hidODind.value == 2)
document.getElementById("ODexpiration").style.display = "none";
}
}
function SearchByExtID()
{
g_IncludePublic = document.frmSearch.chkIncludePublic.checked;
document.frmSearch.chkIncludePublic.checked = false;
document.frmSearch.chkIncludePublic.disabled = true;
ClickIncludePublic();
}
function SearchByName()
{
document.frmSearch.chkIncludePublic.checked = g_IncludePublic;
document.frmSearch.chkIncludePublic.disabled = false;
ClickIncludePublic();
}
function ShowContactDetails(contactID)
{
var sURL, sAcctName, sRequestorName;
sInvName = document.frmMain.sName.value ;
sRequestorName = document.frmMain.hidUserName.value ;
sURL = "inst_inv_acct_contact_details.asp?" ;
sURL = sURL + "CONTACTID=" ;
sURL = sURL + contactID ;
sURL = sURL + "&INVESTORNAME=" ;
sURL = sURL + escape(sInvName) ;
sURL = sURL + "&REQUESTORNAME=" ;
sURL = sURL + escape(sRequestorName) ;
var sStyle = "width=400,height=500,scrollbars=0,resizable=1,left=5,top=5";
openGeneralPopup( sURL, '', sStyle ); 
}
function ClickIncludePublic()
{
if (document.frmSearch.chkIncludePublic)
{
if (document.frmSearch.chkIncludePublic.checked)
{
document.frmSearch.chkInactive.checked = true;
document.frmSearch.chkInactive.disabled = true;
}
else
{
document.frmSearch.chkInactive.disabled = false;
}
}
}
function onChange2790Restr(val2790)
{
var frm = document.frmMain;
frm.hid2790RestrDirty.value = "1";
frm.hid2790RestrNew.value = frm.sel2790Restr.options[frm.sel2790Restr.selectedIndex].text;
var elthis = eval('Expire2790Area');
var sysCode = eval('SystemCode');
var sysCodeO = eval('SystemCodeOverride');
if (frm.sel2790Restr.options[frm.sel2790Restr.selectedIndex].value == val2790)
{
if (document.frmMain.hid2790ind.value == "2")
frm.hid2790RestrDirty.value = "0";
if (document.frmMain.hid2790ind.value != "1")
{
sysCode.style.display = 'inline';
sysCodeO.style.display = 'none';
}
}
else
{
sysCode.style.display = 'none';
sysCodeO.style.display = 'inline';
}
if (frm.sel2790Restr.options[frm.sel2790Restr.selectedIndex].value != "")
{
elthis.style.display = 'inline';
if (frm.dt2790Expire.value == "" && frm.hidFeedClientInd.value == "1")
{
var dt = new Date();
dt.setDate(dt.getDate() + 10);
var sdt = dt.getFullYear() + "-" + (dt.getMonth() + 1) + "-" + dt.getDate();
frm.dt2790Expire.value = FormatDate(sdt, "YYYY-MM-DD", UserSettings.dateMask);
} 
}
else
elthis.style.display = 'none';
var elt = eval('div2790Partial');
if (frm.sel2790Restr.options[frm.sel2790Restr.selectedIndex].value == "P")
elt.style.display = 'inline';
else
elt.style.display = 'none';
if (frm.sel2790Restr.options[frm.sel2790Restr.selectedIndex].value == val2790 && sysCodeO.style.display == 'none')
elthis.style.display = 'none';
if (document.frmMain.dt2790Expire)
{
if (document.frmMain.dt2790Expire.value != "")
document.getElementById("2790expiration").style.display = "block";
}
}
function onChangeODRestr(valOD)
{
var frm = document.frmMain;
frm.hidODRestrDirty.value = "1";
frm.hidODRestrNew.value = frm.selODRestr.options[frm.selODRestr.selectedIndex].text;
var elthis = eval('ExpireODArea');
var sysCode = eval('ODSystemCode');
var sysCodeO = eval('ODSystemCodeOverride');
if (frm.selODRestr.options[frm.selODRestr.selectedIndex].value == valOD)
{
if (document.frmMain.hidODind.value == "0")
frm.hidODRestrDirty.value = "0";
if (document.frmMain.hidODind.value != "1")
{
sysCode.style.display = 'inline';
sysCodeO.style.display = 'none';
}
}
else
{
sysCode.style.display = 'none';
sysCodeO.style.display = 'inline';
}
if (frm.selODRestr.options[frm.selODRestr.selectedIndex].value != "")
{
elthis.style.display = 'inline';
if (frm.dtODExpire.value == "" && frm.hidFeedClientInd.value == "1")
{
var dt = new Date();
dt.setDate(dt.getDate() + 10);
var sdt = dt.getFullYear() + "-" + (dt.getMonth() + 1) + "-" + dt.getDate();
frm.dtODExpire.value = FormatDate(sdt, "YYYY-MM-DD", UserSettings.dateMask);
}
}
else
elthis.style.display = 'none';
var elt = eval('divODPartial');
if (frm.selODRestr.options[frm.selODRestr.selectedIndex].value == "P")
elt.style.display = 'inline';
else
elt.style.display = 'none';
if (frm.selODRestr.options[frm.selODRestr.selectedIndex].value == valOD && sysCodeO.style.display == 'none')
elthis.style.display = 'none';
if (document.frmMain.dtODExpire)
{
if (document.frmMain.dtODExpire.value != "")
document.getElementById("ODexpiration").style.display = "block";
}
}
function setDirty(elem)
{
if (elem)
elem.value = "1";
}
function Initialize2790andODOldValues()
{
var frm = document.frmMain;
if (document.all("sel2790Restr"))
{
frm.hid2790RestrOld.value	= frm.sel2790Restr.options[frm.sel2790Restr.selectedIndex].text;
frm.hid2790RestrNew.value	= frm.sel2790Restr.options[frm.sel2790Restr.selectedIndex].text;
frm.hid2790ExpireOld.value	= frm.dt2790Expire.value;
}
if (document.all("selODRestr"))
{
frm.hidODRestrOld.value = frm.selODRestr.options[frm.selODRestr.selectedIndex].text;
frm.hidODRestrNew.value = frm.selODRestr.options[frm.selODRestr.selectedIndex].text;
frm.hidODExpireOld.value	= frm.dtODExpire.value;
}
}
