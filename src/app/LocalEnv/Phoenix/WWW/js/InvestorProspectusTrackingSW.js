<!-- 
RSEnableRemoteScripting("/_ScriptLibrary");
function onPageLoad()
{
ConfirmRemoteScripting();
RSCallObject_wait(); 
}
function ConfirmRemoteScripting()
{ 
var enabled = false;
context = "Confirm";
co = RSExecute('rs_prospectus_contacts_send.asp', 'js_RemoteScriptingEnabled', RSShowResult, RSShowError, context);
}
function RSShowResult(co)
{
var frm = document.frmCMAddDocument;
var sRet = co.return_value
switch (co.context)
{
case "Confirm":
if (!sRet)
alert("Remote scripting not enabled");
break;
}
}
function RSShowError(co)
{
msg = "The following error occurred during the " 
msg = msg + co.context
msg = msg + " remote scripting call:\n"
msg = msg + co.message
alert(msg);
}
function CloseWindow()
{
window.close() ;
}
function sortColumns(sColName)
{
var frm = document.frmMain;
if (frm.hidSortColumn.value != sColName)
{
frm.hidSortColumn.value = sColName;
frm.hidSortOrder.value = 'ascending';	
}
else
{
if (frm.hidSortOrder.value == 'ascending')
{
frm.hidSortOrder.value = 'descending';
}
else{
frm.hidSortOrder.value = 'ascending';
} 
}
frm.action = "InvestorProspectusTrackingSW.asp" ;
frm.submit();
}
function excelExport()
{
var frm = document.frmMain;
frm.hidExcelExport.value = "1";
frm.action = "InvestorProspectusTrackingSW.asp" ;
frm.submit();
frm.reset();
}
function Save()
{
var frm = document.frmMain;
frm.action = "util_submit_action.asp" ;
frm.hidAction.value = "UpdateProspectusEnabledOrderPT" ;
frm.submit() ;
}
function SendProspectusHC()
{
var sUrl, sSubject, sBody, sEmailTo ;
var sCRLf, nCount ;
var sDealName, sRequestorName, oElem, sEmailAddresses, nIssId, nInvId ;
nCount = 0 ;
sCRLf = "%0D%0A" ;
sEmailTo = "" ;
oElem = document.getElementById("hidProspectusEmailAddressHC") ;
if(oElem) sEmailTo = oElem.value;
sSubject = "Hard Copy Prospectus Request" ;
oElem = document.getElementById("hidIssId") ;
nIssId = oElem.value ;
oElem = document.getElementById("hidInvId") ;
nInvId = oElem.value ;
oElem = document.getElementById("hidIssName") ;
sDealName = oElem.value ;
sEmailAddresses = "" ;
sRequestorName = "" ;
oElem = document.getElementById("hidUserFirstName") ;
if(oElem) sRequestorName = sRequestorName + oElem.value ;
oElem = document.getElementById("hidUserLastName") ;
if(oElem) sRequestorName = sRequestorName + oElem.value ;
sBody = sRequestorName + " requests that the following contact(s) be sent a hard copy of the prospectus for " + sDealName + " deal" ;
sBody = sBody + sCRLf;
sBody = sBody + sCRLf;
var arrCheck = document.getElementsByName("chkSendProspectusHC");
var arrCheckFirstClass = document.getElementsByName("chkFirstClass");
var arrCheckOvernight = document.getElementsByName("chkOvernight");
if(arrCheck)
{
for(var i = 0; i < arrCheck.length; i++)
{
if(arrCheck[i].checked)
{
var bMode = "" ;
var sEmail = arrCheck[i].email ;
var sInvestor = arrCheck[i].investor_name
var sFirstName = arrCheck[i].contact_first_nm ;
var sLastName = arrCheck[i].contact_last_nm ;
var sStreet = arrCheck[i].str_nm ;
var sStreet2 = arrCheck[i].str_nm2 ;
var sStreet3 = arrCheck[i].str_nm3 ;
var sCity = arrCheck[i].city_nm ;
var sState = arrCheck[i].state_cd ;
var sZip = arrCheck[i].zip_cd ;
nCount = nCount + 1 ;
sBody = sBody + escape(sFirstName) + " " + escape(sLastName) ;
sBody = sBody + sCRLf;
if(sEmail != "")
{
sEmailAddresses = sEmailAddresses + sEmail + ";" ;
}
if(sInvestor != "")
{
sBody = sBody + escape(sInvestor) ;
sBody = sBody + sCRLf;
}
if(sStreet != "")
{
sBody = sBody + escape(sStreet) ;
sBody = sBody + sCRLf;
}
if(sStreet2 != "")
{
sBody = sBody + escape(sStreet2) ;
sBody = sBody + sCRLf;
}
if(sStreet3 != "")
{
sBody = sBody + escape(sStreet3) ;
sBody = sBody + sCRLf;
}
if(sCity != "" || sState != "" || sZip != "")
{
sBody = sBody + escape(sCity) + ", " + escape(sState) + " " + escape(sZip);
sBody = sBody + sCRLf;
}
sBody = sBody + "Delivery Method:" ;
if(arrCheckFirstClass)
{
if(arrCheckFirstClass[i].checked)
{
bMode = "1" ;
sBody = sBody + "FirstClass" ;
}
}
if(arrCheckOvernight)
{
if(arrCheckOvernight[i].checked)
{
if(bMode == "1") sBody = sBody + ", " ;
sBody = sBody + "Overnight" ;
bMode = "2" ;
}
}
if(bMode == "")
{
alert("You must choose a Delivery Method before you can send a hard copy.") ;
return ;
}
sBody = sBody + sCRLf + sCRLf;
}
}
}
if(nCount == 0) 
{
alert("Please select a contact to send the hardcopy.") ;
return ;
}
sUrl = "mailto:" + sEmailTo + "?subject=" + sSubject + "&body=" + sBody ;
window.open(sUrl) ;
var co; 
co = RSExecute('rs_prospectus_contacts_send.asp', 'js_SendProsectusHardCopy', nIssId, sEmailAddresses, nInvId);
var strData = co.return_value;
}
function SendProspectus()
{
var nCount = 0 ;
var oElem1 = document.getElementById("hidProspectusEmailAddr") ;
var oElem2 = document.getElementById("hidProspectusContactId") ;
var oElem3 = document.getElementById("hidProspectusContactFirstNm") ;
var oElem4 = document.getElementById("hidProspectusContactLastNm") ;
oElem1.value = oElem2.value = oElem3.value = oElem4.value ="";
var arrCheck = document.getElementsByName("chkSendProspectus");
if(arrCheck)
{
for(var i = 0; i < arrCheck.length; i++)
{
if(arrCheck[i].checked == true)
{
nCount = nCount + 1 ;
var sEmail = arrCheck[i].email ;
var sContactId = arrCheck[i].contactId;
var sContactFirstNm = arrCheck[i].contact_first_nm;
var sContactLastNm = arrCheck[i].contact_last_nm;
if(oElem1) oElem1.value = oElem1.value + sEmail + ";" ;
if(oElem2) oElem2.value = oElem2.value + sContactId + ";" ;
if(oElem3) oElem3.value = oElem3.value + sContactFirstNm + ";" ;
if(oElem4) oElem4.value = oElem4.value + sContactLastNm + ";" ;
}
}
}
if(nCount == 0)
{
alert("Please select a contact.") ;
return ;
}
var sUserEmail = document.getElementById("hidEnableProspEmailCloak").value;
if (sUserEmail == "1")
{
var sUserEmailAddr = document.getElementById("hidUserEmailAddr").value;
if (sUserEmailAddr == "")
{
if (!confirm("Sender email address is empty.\r\nDo you want contitue by using default email address?"))
return false;
}
}
var frm = document.frmMain;
frm.btnSendeProspectus.disabled=true;
frm.action = "util_submit_action.asp" ;
frm.hidAction.value = "SendToProspectusFromPT" ;
frm.submit() ;
}
function chkSelectAllClicked()
{
var oChkSelectAll ;
oChkSelectAll = document.getElementById("chkSelectAll") ;
if(oChkSelectAll)
{
var bChecked = oChkSelectAll.checked ;
var arrCheck = document.getElementsByName("chkSendProspectus");
if(arrCheck)
{
for(var i = 0; i < arrCheck.length; i++)
{
if(arrCheck[i].disabled == false)
{
arrCheck[i].checked = bChecked;
}
else
{
arrCheck[i].checked = false;
}
}
}
}
}
function chkSelectAllClickedHC()
{
var oChkSelectAll ;
oChkSelectAll = document.getElementById("chkSelectAllHC") ;
if(oChkSelectAll)
{
var bChecked = oChkSelectAll.checked ;
var arrCheck = document.getElementsByName("chkSendProspectusHC");
if(arrCheck)
{
for(var i = 0; i < arrCheck.length; i++)
{
if(arrCheck[i].disabled == false)
{
arrCheck[i].checked = bChecked;
}
else
{
arrCheck[i].checked = false;
}
}
}
}
}
function chkSelectAllFirstClassClicked()
{
var oChkSelectAll ;
oChkSelectAll = document.getElementById("chkSelectAllFirstClass") ;
if(oChkSelectAll)
{
var bChecked = oChkSelectAll.checked ;
var arrCheck = document.getElementsByName("chkFirstClass");
if(arrCheck)
{
for(var i = 0; i < arrCheck.length; i++)
{
if(arrCheck[i].disabled == false)
{
arrCheck[i].checked = bChecked;
}
else
{
arrCheck[i].checked = false;
}
}
}
}
oChkSelectAll = document.getElementById("chkSelectAllOvernight") ;
oChkSelectAll.checked = false ;
if(oChkSelectAll)
{
var bChecked = oChkSelectAll.checked ;
var arrCheck = document.getElementsByName("chkOvernight");
if(arrCheck)
{
for(var i = 0; i < arrCheck.length; i++)
{
arrCheck[i].checked = bChecked;
}
}
}
}
function chkSelectAllOvernightClicked()
{
var oChkSelectAll ;
oChkSelectAll = document.getElementById("chkSelectAllOvernight") ;
if(oChkSelectAll)
{
var bChecked = oChkSelectAll.checked ;
var arrCheck = document.getElementsByName("chkOvernight");
if(arrCheck)
{
for(var i = 0; i < arrCheck.length; i++)
{
if(arrCheck[i].disabled == false)
{
arrCheck[i].checked = bChecked;
}
else
{
arrCheck[i].checked = false;
}
}
}
}
oChkSelectAll = document.getElementById("chkSelectAllFirstClass") ;
oChkSelectAll.checked = false ;
if(oChkSelectAll)
{
var bChecked = oChkSelectAll.checked ;
var arrCheck = document.getElementsByName("chkFirstClass");
if(arrCheck)
{
for(var i = 0; i < arrCheck.length; i++)
{
arrCheck[i].checked = bChecked;
}
}
}
}
function ShowiProsContactDetails(contactID)
{
var sURL, sInstInvID;
sInstInvID = document.frmMain.hidInvId.value ;
sURL = "inst_inv_ipros_acct_contact_details.asp?" ;
sURL = sURL + "CONTACTID=" ;
sURL = sURL + contactID ;
sURL = sURL + "&INSTINVID=" ;
sURL = sURL + escape(sInstInvID) ;
sURL = sURL + "&ONEOFFCONTACT=1" ;
var sStyle = "width=500,height=700,scrollbars=0,resizable=1,left=5,top=5";
var winPopup = window.open( sURL, '', sStyle);
}
function chkFirstClassClicked(nPos)
{
var sElem ;
sElem = "chkOvernight" + nPos ;
var oElem = document.getElementById(sElem) ;
if(oElem) oElem.checked = false ;
}
function chkOvernightClicked(nPos)
{
var sElem ;
sElem = "chkFirstClass" + nPos ;
var oElem = document.getElementById(sElem) ;
if(oElem) oElem.checked = false ;
}
