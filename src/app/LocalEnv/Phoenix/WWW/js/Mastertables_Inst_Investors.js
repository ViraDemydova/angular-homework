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
if (( frm.hid2790RestrDirty.value == "1" && frm.hidAction.value == "Update" && (frm.sel2790Restr.options[frm.sel2790Restr.selectedIndex].value == "" || frm.sel2790Restr.options[frm.sel2790Restr.selectedIndex].value == "E")) ||
( frm.hid2790RestrDirty.value == "1" && frm.hidAction.value == "Add" && frm.sel2790Restr.options[frm.sel2790Restr.selectedIndex].value == "E") )
{
alert("Please select valid 2790 Restriction");
return;
}
if (( frm.hidODRestrDirty.value == "1" && frm.hidAction.value == "Update" && (frm.selODRestr.options[frm.selODRestr.selectedIndex].value == "" || frm.selODRestr.options[frm.selODRestr.selectedIndex].value == "E")) ||
( frm.hidODRestrDirty.value == "1" && frm.hidAction.value == "Add" && frm.selODRestr.options[frm.selODRestr.selectedIndex].value == "E"))
{
alert("Please select valid O & D Restriction");
return;
}
if ( frm.hidQIBRestrDirty.value == "1" && (frm.rsSelClientType.options[frm.rsSelClientType.selectedIndex].value == "Expired") )
{
alert("Please select valid QIB Restriction");
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
var frm = document.frmMain;
frm.hid2790RestrDirty.value = "0";
frm.hidODRestrDirty.value = "0";
frm.hidQIBRestrDirty.value = "0";
try
{
var elthis = eval('Expire2790Area');
var sysCode = eval('SystemCode');
var sysCodeO = eval('SystemCodeOverride');
}
catch(err){}
try
{
var elthisOD = eval('ExpireODArea');
var sysCodeOD = eval('ODSystemCode');
var sysCodeOOD = eval('ODSystemCodeOverride');
}
catch(err){}
try
{	
var elthisQIB = eval('ExpireQIBArea');
var sysCodeQIB = eval('QIBSystemCode');
var sysCodeOQIB = eval('QIBSystemCodeOverride');
}
catch(err)
{}
if (sysCode)
sysCode.style.display = 'inline';
if (sysCodeO)
sysCodeO.style.display = 'none';
if (sysCodeOD)
sysCodeOD.style.display = 'inline';
if (sysCodeOOD)
sysCodeOOD.style.display = 'none';
if (sysCodeQIB)
sysCodeQIB.style.display = 'inline';
if (sysCodeOQIB)
sysCodeOQIB.style.display = 'none';
if(frm.sel2790Restr)
{
if (
(frm.sel2790Restr.options[frm.sel2790Restr.selectedIndex].value == "") ||
(frm.sel2790Restr.options[frm.sel2790Restr.selectedIndex].value == "E") 
)
{
elthis.style.display = 'none';
}
else
{
elthis.style.display = 'inline'; 
}
var elt = eval('div2790Partial');
if (frm.sel2790Restr.options[frm.sel2790Restr.selectedIndex].value == "P")
elt.style.display = 'inline';
else
elt.style.display = 'none';
if(document.getElementById("ExpirationInfoArea") && frm.sel2790Restr.options[frm.sel2790Restr.selectedIndex].value == "E")
{
document.getElementById("ExpirationInfoArea").style.display ="inline";
}
}
if (frm.selODRestr)
{
if (
(frm.selODRestr.options[frm.selODRestr.selectedIndex].value == "") ||
(frm.selODRestr.options[frm.selODRestr.selectedIndex].value == "E") 
)
{
elthisOD.style.display = 'none';
}
else
{
elthisOD.style.display = 'inline';
}
var eltOD = eval('divODPartial');
if (frm.selODRestr.options[frm.selODRestr.selectedIndex].value == "P")
eltOD.style.display = 'inline';
else
eltOD.style.display = 'none';
if(document.getElementById("ExpirationODInfoArea") && frm.selODRestr.options[frm.selODRestr.selectedIndex].value == "E")
{
document.getElementById("ExpirationODInfoArea").style.display ="inline";
}
}
var vChkPartialQIBInd = document.getElementById("chkPartialQIBInd");
var elt = eval('PartialQIBArea');
var frms = document.frmSearch;	
if (vChkPartialQIBInd && elt)
hidePartialQIB(!(frm.rsSelClientType.value == "QIB" || frm.rsSelClientType.value == "Expired") || frms.hidEnableQIBFeature.value == "0");
else
elt.style.display = 'none';
break;
case "cancel" :
frm.action = "/asp/mastertables_inst_investors.asp";
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
case	"findiproscontacts" :
if(ValidateForm( frm )) 
{
if (frm.hidInstInvID.value == null || frm.hidInstInvID.value == "") 
frm.hidInstInvID.value = "0" ;
if (frm.hidMasterId.value == null || frm.hidMasterId.value == "") 
frm.hidMasterId.value = "0" ;
frm.method = "POST";
frm.hidAction.value = "edit";
frm.hidiProsContactAction.value = "1" ;
frm.action = "/asp/mastertables_inst_investors.asp";
frm.submit();	
}
break; 
case	"findalliproscontacts" :
if (frm.hidInstInvID.value == null || frm.hidInstInvID.value == "") 
frm.hidInstInvID.value = "0" ;
if (frm.hidMasterId.value == null || frm.hidMasterId.value == "") 
frm.hidMasterId.value = "0" ;
frm.method = "POST";
frm.hidAction.value = "edit";
frm.hidiProsContactAction.value = "1" ;
frm.hidiProsShowAllContacts.value = "1" ;
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
function onPageLoad()
{
menuShow('mastertables', 'tophide');
var frm = document.frmSearch;
if (frm.hidCurrentAction.value == "create" || frm.hidCurrentAction.value == "edit")
{
try
{
var elthis = eval('PartialQIBArea');
}catch(err){}
if(elthis)
{
if (!(document.frmMain.rsSelClientType.value == "QIB" || document.frmMain.rsSelClientType.value == "Expired") || frm.hidEnableQIBFeature.value == "0")
elthis.style.display = 'none';
else
elthis.style.display = '';
}	
if(frm.hidCurrentAction.value == "edit")
Initialize2790andODOldValues(); 
}
if (document.frmMain && document.frmMain.hid2790ind)
{
if(document.getElementById("2790expiration"))
{
if (document.frmMain.hid2790ind.value == "" || document.frmMain.hid2790ind.value == 2 || document.frmMain.hid2790ind.value == 3)
document.getElementById("2790expiration").style.display = "none";
}
if(document.getElementById("ODexpiration"))
{
if (document.frmMain.hidODind.value == "" || document.frmMain.hidODind.value == 2 || document.frmMain.hidODind.value == 3 )
document.getElementById("ODexpiration").style.display = "none";
}	
if(document.getElementById("ExpirationInfoArea"))
{
if(document.frmMain.hid2790ind.value == 0 ) 
document.getElementById("ExpirationInfoArea").style.display ="none";
else
document.getElementById("ExpirationInfoArea").style.display ="inline";
}
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
function addRoyalBlueCodes(iInstInvId)
{
var sURL = "/aspx/UI/SubInvestor/RBVCDetails.aspx?";
sURL += "inst_inv_id=" + iInstInvId;
var sStyle = "width=400,height=355,scrollbars=1,resizable=1,left=0,top=0";
openGeneralPopup( sURL, '', sStyle ); 
}
function ShowContactDetails(contactID)
{
var sURL, sAcctName, sRequestorName;
sInvName = document.frmMain.sName.value;
sRequestorName = document.frmMain.hidUserName.value;
sURL = "inst_inv_acct_contact_details.asp?";
sURL = sURL + "CONTACTID=";
sURL = sURL + contactID;
sURL = sURL + "&INVESTORNAME=";
sURL = sURL + escape(sInvName);
sURL = sURL + "&REQUESTORNAME=";
sURL = sURL + escape(sRequestorName);
var sStyle = "width=400,height=500,scrollbars=0,resizable=1,left=5,top=5";
openGeneralPopup( sURL, '', sStyle ); 
}
function ShowRoyalBlueCodeDetails(iInstInvId, iSubInstInvId)
{
var sURL = "/aspx/UI/SubInvestor/RBVCDetails.aspx?";
sURL += "inst_inv_id=" + iInstInvId;
sURL += "&sub_inst_inv_id=" + iSubInstInvId;
var sStyle = "width=400,height=355,scrollbars=1,resizable=1,left=05,top=0";
openGeneralPopup( sURL, '', sStyle ); 
}
function ShowiProsContactDetails(contactID)
{
var sURL, sAcctName, sRequestorName;
sInvName = document.frmMain.sName.value ;
sRequestorName = document.frmMain.hidUserName.value ;
sInstInvID = document.frmMain.hidInstInvID.value ;
sExtKeyNum = "";
if(document.frmMain.sExtKeyNum != null)
sExtKeyNum = document.frmMain.sExtKeyNum.value;
sURL = "inst_inv_ipros_acct_contact_details.asp?" ;
sURL = sURL + "CONTACTID=" ;
sURL = sURL + contactID ;
sURL = sURL + "&INSTINVID=" ;
sURL = sURL + escape(sInstInvID) ;
var sStyle = "width=500,height=700,scrollbars=0,resizable=1,left=5,top=5";
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
function onChangeClientType()
{
var frm = document.frmMain;
frm.hidQIBRestrDirty.value = "1";
hidePartialQIB(!(frm.rsSelClientType.value == "QIB" || frm.rsSelClientType.value == "Expired") || document.frmSearch.hidEnableQIBFeature.value == "0");
} 
function hidePartialQIB(bHide)
{
var frm = document.frmMain;
try
{
var elthis = eval('PartialQIBArea');
var sysCode = eval('QIBSystemCode');
var sysCodeO = eval('QIBSystemCodeOverride');
}catch(err){}
if (bHide == true)
elthis.style.display = 'none';
else
elthis.style.display = '';
if(document.frmMain.rsSelClientType.value == "None Selected" || document.frmMain.rsSelClientType.value == "Expired")
{
if (sysCode)
sysCode.style.display = 'inline';
if (sysCodeO)
sysCodeO.style.display = 'none';
}
else
{
if (sysCode)
sysCode.style.display = 'none';
if (sysCodeO)
sysCodeO.style.display = 'inline';
}
}
function onChange2790Restr(val2790)
{
var frm = document.frmMain;
frm.hid2790RestrDirty.value = "1";
frm.hid2790RestrNew.value = frm.sel2790Restr.options[frm.sel2790Restr.selectedIndex].text;
try
{
var elthis = eval('Expire2790Area');
var sysCode = eval('SystemCode');
var sysCodeO = eval('SystemCodeOverride');
}
catch(err)
{}
{
if (sysCode)
sysCode.style.display = 'none';
if (sysCodeO)
sysCodeO.style.display = 'inline';
}
if(document.getElementById("ExpirationInfoArea"))
{
document.getElementById("ExpirationInfoArea").style.display ="none";
}
if ((frm.sel2790Restr.options[frm.sel2790Restr.selectedIndex].value == "") ||
(frm.sel2790Restr.options[frm.sel2790Restr.selectedIndex].value == "E"))
{
elthis.style.display = 'none';
}
else
{
elthis.style.display = 'inline'; 
if (frm.dt2790Expire.value == "" )
{
var dt = new Date();
dt.setDate(dt.getDate() + 10);
var sdt = dt.getFullYear() + "-" + (dt.getMonth() + 1) + "-" + dt.getDate();
frm.dt2790Expire.value = FormatDate(sdt, "YYYY-MM-DD", UserSettings.dateMask);
} 
}
var elt = eval('div2790Partial');
if (frm.sel2790Restr.options[frm.sel2790Restr.selectedIndex].value == "P")
elt.style.display = 'inline';
else
elt.style.display = 'none';
if ((frm.sel2790Restr.options[frm.sel2790Restr.selectedIndex].value == val2790) && (sysCodeO) && (sysCodeO.style.display == 'none'))
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
{
sysCode.style.display = 'none';
sysCodeO.style.display = 'inline';
}
if(document.getElementById("ExpirationODInfoArea"))
{
document.getElementById("ExpirationODInfoArea").style.display ="none";
}
if ((frm.selODRestr.options[frm.selODRestr.selectedIndex].value == "") ||
(frm.selODRestr.options[frm.selODRestr.selectedIndex].value == "E"))
{
elthis.style.display = 'none';
}
else
{
elthis.style.display = 'inline';
if (frm.dtODExpire.value == "" )
{
var dt = new Date();
dt.setDate(dt.getDate() + 10);
var sdt = dt.getFullYear() + "-" + (dt.getMonth() + 1) + "-" + dt.getDate();
frm.dtODExpire.value = FormatDate(sdt, "YYYY-MM-DD", UserSettings.dateMask);
}
}
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
function openClientCoverage(inst_inv_id, inv_nm, ext_key_num) 
{
sUrl = "/aspx/UI/Coverage/ClientCoverage.aspx?inst_inv_id=" + inst_inv_id + "&inv_nm=" + inv_nm + "&ext_key_num=" + ext_key_num;
var sStyle = "width=750,height=660,toolbar=no,menubar=no,location=no,directories=no,resizable=yes,scrollbars=yes,left=100,top=50,dependent=yes" ;
openGeneralPopup(sUrl, "", sStyle); 
} 
function OpenInvestorProfilePopupWindow(inv_ext_vendor_cd)
{
var strURL = "/aspx/UI/External/InvestorProfile.aspx?ext_vendor_cd=" + escape(inv_ext_vendor_cd);	
openGeneralPopup(strURL, '', 'width=750,height=500,toolbar=no,scrollbars=yes,menubar=no,resizable=yes');
}
