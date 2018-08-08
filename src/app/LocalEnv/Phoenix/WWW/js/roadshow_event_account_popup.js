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
co = RSExecute('rs_roadshow_server.asp', 'js_RemoteScriptingEnabled', RSShowResult, RSShowError, context);
}
function CheckConditionallyRequiredFields( frm, arrFieldsInError )
{
var arrMoreErrors = new Array();
return (arrMoreErrors);
} 
function CustomValidation( frm, arrFieldsInError )
{
var arrMoreErrors = new Array();
return (arrMoreErrors);
} 
function submitPage( frm , action )
{
switch (action)
{
case "search" :
{
frm.hidShowAccInfo.value = 0;
frm.method = "post";
frm.action = "roadshow_event_account_popup.asp";
frm.submit(); 
}
break; 
case "close" :
{
window.close(); 
}
break; 
case "cancel" :
{
window.location.reload(true);
} 
break; 
case "back" :
{
if (window.history.length > 0)
window.history.go(-1);
} 
break; 
}
}
function onSelectAccount(instInvId)
{
document.frmMain.hidInstInvId.value = instInvId;
document.frmMain.hidShowAccInfo.value = 1;
document.frmMain.method = "post";
document.frmMain.action = "roadshow_event_account_popup.asp";
document.frmMain.submit();	
} 
function onAddAccount()
{
var sTemp, aTemp;
window.opener.document.frmMain.sName.value = document.frmMain.hidInstInvNm.value;
window.opener.document.frmMain.sAddress1.value = document.frmMain.hidAddr1.value;
window.opener.document.frmMain.sAddress2.value = document.frmMain.hidAddr2.value;
window.opener.document.frmMain.sAddress3.value = document.frmMain.hidCity.value + ' ' + document.frmMain.hidState.value + ' ' + document.frmMain.hidZip.value;
var oElem = document.getElementById("txtAccountContact");
if ((oElem.innerText == "") && (confirm("Account contact has not been selected. Continue?") == false))
{
return;
}
window.opener.document.frmMain.sContactName.value = oElem.innerText ;
window.opener.document.frmMain.sPhone.value = document.frmMain.sPhone.value;
window.opener.document.frmMain.hidInstInvId.value = document.frmMain.hidInstInvId.value;
window.opener.document.frmMain.hidRequestId.value = "";
if ((document.frmMain.selSales.options.length > 0) && (Number(document.frmMain.selSales.options[document.frmMain.selSales.selectedIndex].value) != -1))
{
window.opener.document.frmMain.sSalesperson.value = document.frmMain.selSales.options[document.frmMain.selSales.selectedIndex].text;
sTemp = document.frmMain.selSales.options[document.frmMain.selSales.selectedIndex].value;
aTemp = sTemp.split("~");
window.opener.document.frmMain.sAEPhone.value = aTemp[0] ;
}
else
{
window.opener.document.frmMain.sSalesperson.value = '';
window.opener.document.frmMain.sAEPhone.value = '';	
}
window.opener.document.frmMain.sFax.value = '';
window.opener.document.frmMain.sCallIn.value = '';
window.opener.document.frmMain.sConfirmation.value = '';	
window.opener.document.frmMain.sModerator.value = '';
window.opener.document.frmMain.hidRequestId.value = '';	
window.opener.document.frmMain.hidVenueId.value = '0';	
window.opener.document.frmMain.hidAccountContactID.value = document.frmMain.hidAccountContactID.value ;
window.opener.document.frmMain.hidAccountContactName.value = document.frmMain.hidAccountContactName.value ;
window.opener.document.frmMain.sEmail.value = document.frmMain.sEmail.value ;
window.opener.document.frmMain.hidAccountContactID.value = document.frmMain.hidAccountContactID.value ;
window.opener.document.frmMain.hidAccountContactName.value = document.frmMain.hidAccountContactName.value ;
window.close();
}
function RSShowResult(co)
{
var frm = document.frmMain;
var sRet = co.return_value
switch (co.context)
{
case "Confirm":
if (! sRet)
alert("Remote scripting not enabled");
break;
case "ListAccountContacts":
populateAcctContactSearchResultCombo(frm, sRet);
break;
case "ListAccountContactDetail":
populateAcctContactDetails(frm, sRet) ;
break;
case "SendEmail":
alert("Contact administrator has been notified.") ;
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
function OnAccountContactSearch(frm)
{
var bShowInactive, bShowAll, sUserID, sLName
bShowInactive = false ;
bShowAll = false ;
sUserID = "";
sLName = "";
sLName = frm.sContact.value;
if (sLName == null || sLName == "")
{
alert("Please enter atleast one character") ;
return ;
}
var iAccID = frm.hidInstInvId.value;
if (iAccID != null && iAccID > 0)
{
context = "ListAccountContacts";
co= RSExecute ('rs_inst_account_contacts.asp', 'js_ListAccountContactsByInvestorID', sUserID, iAccID, sLName, 0, bShowInactive, bShowAll, RSShowResult, RSShowError, context);
}
}
function populateAcctContactDetails(frm, strData)
{
var cbElement, sName
cbElement = frm.elements["selAccountContacts"]
if (strData && strData != "")
{
aryRecords = strData.split("\t");
if ( aryRecords.length > 0 )
{
aryData = aryRecords[0].split("\b");
cbElement = frm.elements["hidAddr1"]
if(cbElement) cbElement.value = aryData[0] ;
cbElement = frm.elements["hidAddr2"]
if(cbElement) cbElement.value = aryData[1] ;
cbElement = frm.elements["hidCity"]
if(cbElement) cbElement.value = aryData[3] ;
cbElement = frm.elements["hidState"]
if(cbElement) cbElement.value = aryData[4] ;
cbElement = frm.elements["hidZip"]
if(cbElement) cbElement.value = aryData[5] ;
cbElement = frm.elements["sEmail"]
if(cbElement) cbElement.value = aryData[6] ;
cbElement = frm.elements["sPhone"]
if(cbElement) frm.elements["sPhone"].value = aryData[7] ;
}
} 
else
{
}
}
function populateAcctContactSearchResultCombo(frm, strData)
{
var cbElement, sName
cbElement = frm.elements["selAccountContacts"]
if(cbElement)
cbElement.options.length = 0;
if (strData && strData != "")
{
aryRecords = strData.split("\t");
for (i=0; i < aryRecords.length-1; i++)
{
aryData = aryRecords[i].split("\b");
sName = aryData[2] + ", " ;
sName = sName + aryData[1] ;
cbElement.options[cbElement.options.length]= new Option(sName, aryData[0]);
}
cbElement.disabled = false;
} 
else
{
cbElement.options[cbElement.options.length]= new Option("None", "0");
cbElement.disabled = true;
}
}
function OnNewAccountContact(frm)
{
var sName, sSubject, sBody ;
sName = ""
sName = frm.sContact.value ;
if (sName == null || sName == "")
{
alert("Please enter a name for the new contact.") ;
return;
}
var oElem = document.getElementById("txtAccountContact");
oElem.innerText = sName + "*" ;
frm.hidAccountContactID.value = "-1" ;
frm.hidAccountContactName.value = sName;
cbElement = frm.elements["hidAddr1"]
if(cbElement) cbElement.value = "" ;
cbElement = frm.elements["hidAddr2"]
if(cbElement) cbElement.value = "" ;
cbElement = frm.elements["hidCity"]
if(cbElement) cbElement.value = "" ;
cbElement = frm.elements["hidState"]
if(cbElement) cbElement.value = "" ;
cbElement = frm.elements["hidZip"]
if(cbElement) cbElement.value = "" ;
cbElement = frm.elements["sEmail"]
if(cbElement) cbElement.value = "" ;
cbElement = frm.elements["sPhone"]
if(cbElement) frm.elements["sPhone"].value = "" ;
var iAccID = frm.hidInstInvId.value;
sSubject = "New Contact Request" ;
sBody = "Contact:" + sName + "\n" ;
sBody = sBody + "Account:" + frm.sFirm.value + "\n" ;
sBody = sBody + "Requestor:" + frm.hidUserName.value + "\n" ;
context = "SendEmail";
co= RSExecute ('rs_inst_account_contacts.asp', 'js_SendEmailContactAdmin', "", sSubject, sBody, RSShowResult, RSShowError, context);
}
function OnSelAccountContactDblClick(frm)
{
if (frm.selAccountContacts.selectedIndex != -1)
{
var iContactID = frm.selAccountContacts.options[frm.selAccountContacts.selectedIndex].value;
var iContactName = frm.selAccountContacts.options[frm.selAccountContacts.selectedIndex].text;
var oElem ;
oElem = document.getElementById("txtAccountContact") ;
if(oElem) oElem.innerText = iContactName ;
frm.hidAccountContactID.value = iContactID ;
frm.hidAccountContactName.value = "";
var sUserID ;
sUserID = ""
context = "ListAccountContactDetail";
co= RSExecute ('rs_inst_account_contacts.asp', 'js_ListAccountContactInfo', sUserID, iContactID, RSShowResult, RSShowError, context);
}	
}
function rewriteLayer (idOrPath, html) {
if (document.layers) {
var l = idOrPath.indexOf('.') != -1 ? eval(idOrPath) 
: document[idOrPath];
if (!l)
{
var theForm = document.forms["frmMain"];
var l = theForm.elements[idOrPath];
}
if (!l)
return;
if(l.type=="text")
{
l.value=html; 
return;
}
if (!l.ol) {
var ol = l.ol = new Layer (l.clip.width, l);
ol.clip.width = l.clip.width;
ol.left = l.left;
ol.top = l.top;
ol.clip.height = l.clip.height;
ol.bgColor = l.bgColor;
l.visibility = 'hide';
ol.visibility = 'show';
}
var ol = l.ol;
html="<div class='txtBold'>" + html + "</div>"
ol.document.open();
ol.document.write("");
ol.document.close();
}
else if (document.all || document.getElementById) {
var p = idOrPath.indexOf('.');
var id = p != -1 ? 
idOrPath.substring(idOrPath.lastIndexOf('.') + 1) 
: idOrPath;
if (document.all)
{
if (document.all[id])
{
document.all[id].innerHTML = html;
}
}
else {
var l = document.getElementById(id);
var r = document.createRange();
r.setStartAfter(l);
var docFrag = r.createContextualFragment(html);
while (l.hasChildNodes())
l.removeChild(l.firstChild);
l.appendChild(docFrag);
}
}
}
function OnSalesSelected(frm)
{
var iSalesID ;
var sTemp, aTemp ;
sTemp = frm.selSales.options[frm.selSales.selectedIndex].value;
aTemp = sTemp.split("~");
iSalesID = aTemp[1] ;
if(iSalesID > 0)
{
var iAccID = frm.hidInstInvId.value;
var context, bShowInactive, bShowAll, iSalesID
bShowInactive = false ;
bShowAll = false ;
if (iAccID != null && iAccID > 0)
{
context = "ListAccountContacts";
co= RSExecute ('rs_inst_account_contacts.asp', 'js_ListAccountContactsByInvestorID', "", iAccID, "", iSalesID, bShowInactive, bShowAll, RSShowResult, RSShowError, context);
}
}	
}
