<!-- 
RSEnableRemoteScripting("/_ScriptLibrary");
function ConfirmRemoteScripting()
{ 
var enabled = false;
context = "Confirm";
co = RSExecute('rs_roadshow_server.asp', 'js_RemoteScriptingEnabled', RSShowResult, RSShowError, context);
}
var PopupHandle;
window.onunload = closePopups;
var nSelectedAttendee=0;
var AddAttendees="";
var AddIssuerAttendee = '';
var AddBankerAttendee = '';
var AddInvestorAttendee = '';
var AddOtherAttendee = '';
var RemoveAttendees="";
var bSelectChanged = false;
var bClickedAdd = false ;
function onPageLoad()
{
if(window.parent.opener.document.frmMain.hidAddAttendees)
{
blnChanged = false;
var sSelectAttendees,sRemoveAttendees;
var arrSelectAttendees,i,arrRemoveAttendees;
sSelectAttendees = window.parent.opener.document.frmMain.hidAddAttendees.value;
sRemoveAttendees = window.parent.opener.document.frmMain.hidRemoveAttendees.value;
arrSelectAttendees = sSelectAttendees.split("~");
arrRemoveAttendees = sRemoveAttendees.split("~");
if(document.frmMain.cbSelect)
{ 
if(document.frmMain.cbSelect.length)
{
for(i=0;i< arrSelectAttendees.length ;i++)
{
for(j=0;j<document.frmMain.cbSelect.length;j++)
{
if(document.frmMain.cbSelect[j].value == arrSelectAttendees[i])
{
document.frmMain.cbSelect[j].checked = true;
bSelectChanged = true;
}
}
}
for(i=0;i< arrRemoveAttendees.length ;i++)
{
for(j=0;j<document.frmMain.cbSelect.length;j++)
{
if(document.frmMain.cbSelect[j].value == arrRemoveAttendees[i])
{
document.frmMain.cbSelect[j].checked = false;
bSelectChanged = true;
}
}
}
}
else
{
for(i=0;i< arrSelectAttendees.length ;i= i+ 2)
{
if(document.frmMain.cbSelect.value == arrSelectAttendees[i])
{
document.frmMain.cbSelect.checked = true;
bSelectChanged = true;
}
}
for(i=0;i< arrRemoveAttendees.length ;i++)
{
if(document.frmMain.cbSelect.value == arrRemoveAttendees[i])
{
document.frmMain.cbSelect.checked = false;
bSelectChanged = true;
}
}
}
}
AddAttendees = window.parent.opener.document.frmMain.hidAddAttendees.value;
RemoveAttendees = window.parent.opener.document.frmMain.hidRemoveAttendees.value;
AttendeeList = window.parent.opener.document.frmMain.hidAttendeeList.value;
switch(document.frmMain.hidType.value)
{
case "ISSUER":
AddIssuerAttendee = window.parent.opener.document.frmMain.hidIssuerAttendee.value;
break;
case "BANKER":
AddBankerAttendee = window.parent.opener.document.frmMain.hidBankerAttendee.value;
break;
case "INVESTOR":
AddInvestorAttendee = window.parent.opener.document.frmMain.hidInvestorAttendee.value;
break;
case "OTHER":
AddOtherAttendee = window.parent.opener.document.frmMain.hidOtherAttendee.value;
break; 
} 
ConfirmRemoteScripting();
RSCallObject_wait(); 
}
}
function CustomValidation( frm, arrFieldsInError )
{
var arrMoreErrors = new Array();
var errCount = 0;
if (frm.hidType.value != "OTHER")
{	
if(typeof(frm.txtFirmName) != "undefined")
frm.hidFirmName.value = frm.txtFirmName.value;
if(frm.hidFirmName.value.length ==0)
{
if(typeof(frm.txtFirmName) != "undefined")
var arrError = FieldErrorInfo("txtFirmName", "Firm Name - Value is required", "", "txtFirmName", "");
else
var arrError = FieldErrorInfo("", "Firm Name - Value is required", "", "", "");
arrMoreErrors[errCount++] = arrError;
}
}
if (frm.hidType.value == "INVESTOR" && frm.hidEnableCMS.value == 1)
{
var oElem1, sName ;
sName = "" ;
oElem1 = document.getElementById("txtAccountContact") ;
sName = oElem1.innerText ;
if (sName != "")
{
var arrName = sName.split(",")
if (arrName.length != 2)
{
var arrError = FieldErrorInfo("sContact", "First Name and Last Name Required (Last name, First name)", "", "sContact", "Contact");
arrMoreErrors[errCount++] = arrError;
}
}
else
{
var arrError = FieldErrorInfo("sContact", "First Name and Last Name Required (Last name, First name)", "", "sContact", "Contact");
arrMoreErrors[errCount++] = arrError;
}
}
return (arrMoreErrors);
} 
function submitPage( frm, action )
{
switch (action)
{
case "Add":
bClickedAdd = true ;
if (ValidateForm(frm))
{
window.parent.opener.SetDirtyFlag();
if(typeof(frm.txtFirmName) != "undefined")
frm.hidFirmName.value = frm.txtFirmName.value;
if(frm.hidFirmId.value =="") frm.hidFirmId.value = 0;
var AttendeeInfo;
var nTotalCnt;
if (frm.hidType.value == "INVESTOR" && frm.hidEnableCMS.value == 1)
{
AttendeeInfo = frm.hidType.value +"~"+ frm.txtFirstName.value +"~";
AttendeeInfo = AttendeeInfo + frm.txtLastName.value +"~"+ frm.hidFirmName.value + "~" + frm.hidFirmId.value ;
}
else
{
AttendeeInfo = frm.hidType.value +"~"+ frm.rtxtFirstName.value +"~";
AttendeeInfo = AttendeeInfo + frm.rtxtLastName.value +"~"+ frm.hidFirmName.value + "~" + frm.hidFirmId.value ;
}
if(frm.hidAccountContactID.value =="") frm.hidAccountContactID.value = 0;
AttendeeInfo = AttendeeInfo + "~" + frm.hidAccountContactID.value ;
if(frm.selSales.value =="") frm.selSales.value = 0;
AttendeeInfo = AttendeeInfo + "~" + frm.selSales.value ;
if(frm.sPhone.value == "") frm.sPhone.value = " " ;
AttendeeInfo = AttendeeInfo + "~" + frm.sPhone.value ;
if(frm.sEmail.value == "") frm.sEmail.value = " " ;
AttendeeInfo = AttendeeInfo + "~"+ frm.sEmail.value ;
var strAttendeelist = window.parent.opener.document.frmMain.hidAttendeeList.value
var bad = (strAttendeelist.indexOf(AttendeeInfo) > -1) ? 1 : 0;
if(bad)
{
alert("Duplicate Attendee.Please enter another one");
return;
}
window.parent.opener.document.frmMain.hidAttendeeList.value = window.parent.opener.document.frmMain.hidAttendeeList.value + "~" + AttendeeInfo;
window.parent.opener.document.frmMain.hidAttendeeAction.value ="Add"
switch(frm.hidType.value)
{
case "ISSUER":
window.parent.opener.document.frmMain.hidIssuerCnt.value = Number(window.parent.opener.document.frmMain.hidIssuerCnt.value) + 1;
window.parent.opener.document.all.spanIssuerCnt.innerText = Number(window.parent.opener.document.frmMain.hidIssuerCnt.value) ;
break;
case "BANKER":
window.parent.opener.document.frmMain.hidBankerCnt.value = Number(window.parent.opener.document.frmMain.hidBankerCnt.value) + 1;
window.parent.opener.document.all.spanBankerCnt.innerText = Number(window.parent.opener.document.frmMain.hidBankerCnt.value);
break;
case "INVESTOR":
case "Investor":
window.parent.opener.document.frmMain.hidInvestorCnt.value = Number(window.parent.opener.document.frmMain.hidInvestorCnt.value) + 1;
window.parent.opener.document.all.spanInvestorCnt.innerText = window.parent.opener.document.frmMain.hidInvestorCnt.value;
break;
case "OTHER":
window.parent.opener.document.frmMain.hidOtherCnt.value = Number(window.parent.opener.document.frmMain.hidOtherCnt.value) + 1;
window.parent.opener.document.all.spanOtherCnt.innerText = window.parent.opener.document.frmMain.hidOtherCnt.value;
break;
}
nTotalCnt = Number(window.parent.opener.document.all.spanIssuerCnt.innerText) + Number(window.parent.opener.document.all.spanBankerCnt.innerText);
nTotalCnt = nTotalCnt + Number(window.parent.opener.document.all.spanInvestorCnt.innerText);
nTotalCnt = nTotalCnt + Number(window.parent.opener.document.all.spanOtherCnt.innerText);
window.parent.opener.document.all.spanTotalCnt.innerText = nTotalCnt;
window.parent.opener.document.frmMain.hidIssuerCnt.value = window.parent.opener.document.all.spanIssuerCnt.innerText
window.parent.opener.document.frmMain.hidBankerCnt.value = window.parent.opener.document.all.spanBankerCnt.innerText
window.parent.opener.document.frmMain.hidInvestorCnt.value = window.parent.opener.document.all.spanInvestorCnt.innerText
window.parent.opener.document.frmMain.hidOtherCnt.value = window.parent.opener.document.all.spanOtherCnt.innerText
window.close();
}
break;
case "Delete":
if (confirm("Are you sure you want to delete the user?") == true)
{
frm.hidAction.value ="Delete"
frm.action = "/asp/util_submit_action.asp";
frm.submit();
}
break;
case "Update":
if (ValidateForm(frm))
{
if(typeof(frm.txtFirmName) != "undefined")
frm.hidFirmName.value = frm.txtFirmName.value;
frm.hidAction.value = "Update";
frm.action = "/asp/util_submit_action.asp";
frm.submit();
}
break;
case "Select":
var i;
var nAttendee=0;
window.parent.opener.SetDirtyFlag();
switch(frm.hidType.value)
{
case "ISSUER":
window.parent.opener.document.all.spanIssuerCnt.innerText = Number(window.parent.opener.document.frmMain.hidIssuerCnt.value) + Number(nSelectedAttendee);
window.parent.opener.document.frmMain.hidSelectIssuerCnt.value = Number(nSelectedAttendee);
break;
case "BANKER":
window.parent.opener.document.all.spanBankerCnt.innerText = Number(window.parent.opener.document.frmMain.hidBankerCnt.value)+ Number(nSelectedAttendee);
window.parent.opener.document.frmMain.hidSelectBankerCnt.value = Number(nSelectedAttendee);
break;
}
nTotalCnt = Number(window.parent.opener.document.all.spanIssuerCnt.innerText) + Number(window.parent.opener.document.all.spanBankerCnt.innerText);
nTotalCnt = nTotalCnt + Number(window.parent.opener.document.all.spanInvestorCnt.innerText);
nTotalCnt = nTotalCnt + Number(window.parent.opener.document.all.spanOtherCnt.innerText);
window.parent.opener.document.all.spanTotalCnt.innerText = nTotalCnt;
window.parent.opener.document.frmMain.hidAttendeeAction.value ="Select"
window.parent.opener.document.frmMain.hidAddAttendees.value = AddAttendees;
window.parent.opener.document.frmMain.hidRemoveAttendees.value = RemoveAttendees;
window.parent.opener.document.frmMain.hidAttendeeType.value = frm.hidType.value;
window.parent.opener.document.frmMain.hidIssuerCnt.value = window.parent.opener.document.all.spanIssuerCnt.innerText;
window.parent.opener.document.frmMain.hidBankerCnt.value = window.parent.opener.document.all.spanBankerCnt.innerText;
window.parent.opener.document.frmMain.hidOtherCnt.value = window.parent.opener.document.all.spanOtherCnt.innerText;
window.parent.opener.document.frmMain.hidInvestorCnt.value = window.parent.opener.document.all.spanInvestorCnt.innerText;
switch(frm.hidType.value)
{
case "ISSUER":
window.parent.opener.document.frmMain.hidIssuerAttendee.value = AddIssuerAttendee;
break;
case "BANKER":
window.parent.opener.document.frmMain.hidBankerAttendee.value = AddBankerAttendee;
break;
case "INVESTOR":
window.parent.opener.document.frmMain.hidInvestorAttendee.value = AddInvestorAttendee;
break;
case "OTHER":
window.parent.opener.document.frmMain.hidOtherAttendee.value = AddOtherAttendee;
break; 
}
window.close();
break;
}
}
function OnSelectFirm()
{
var lEventID = document.frmMain.hidEventID.value;
sType="INVESTOR";
url="roadshow_firm_search_popup.asp?EventID="+ lEventID+"&Type="+sType;
PopupHandle = window.open(url, '', 'width=600,height=400,toolbar=no,scrollbars=yes,menubar=no,resizable=yes');
}
function OnQuickAdd()
{
var url;
var lEventID = document.frmMain.hidEventID.value;
url="roadshow_addattendee_popup.asp?EventID="+ lEventID+"&Type=Investor";
openGeneralPopup(url, '', 'width=600,height=400,toolbar=no,scrollbars=yes,menubar=no,resizable=yes');
}
function closePopups()
{
if(PopupHandle != null)
PopupHandle.close();
}
function UpdateAttendees(elt)
{
var rExp = eval("/" + elt.value+ "/gi");
if(elt.checked == true)
{
nSelectedAttendee = Number(nSelectedAttendee) + 1
AddAttendees = AddAttendees + elt.value +"~";
RemoveAttendees = RemoveAttendees.replace(rExp,"");
switch(document.frmMain.hidType.value)
{
case "ISSUER":
AddIssuerAttendee = AddIssuerAttendee + elt.value +"~"; 
break;
case "BANKER":
AddBankerAttendee = AddBankerAttendee + elt.value +"~"; 
break;
case "INVESTOR":
AddInvestorAttendee = AddInvestorAttendee + elt.value +"~"; 
break;
case "OTHER":
AddOtherAttendee = AddOtherAttendee + elt.value +"~"; 
break; 
} 
}
else
{
nSelectedAttendee = Number(nSelectedAttendee) - 1
RemoveAttendees = RemoveAttendees + elt.value +"~";
AddAttendees = AddAttendees.replace(rExp,"");
switch(document.frmMain.hidType.value)
{
case "ISSUER":
AddIssuerAttendee = AddIssuerAttendee.replace(rExp,"");
break;
case "BANKER":
AddBankerAttendee = AddBankerAttendee.replace(rExp,"");
break;
case "INVESTOR":
AddInvestorAttendee = AddInvestorAttendee.replace(rExp,"");
break;
case "OTHER":
AddOtherAttendee = AddOtherAttendee.replace(rExp,""); 
break; 
} 
}
}
function GetSelected()
{
var i =0;
if(document.frmMain.cbSelect)
{
if(document.frmMain.cbSelect.length)
{
nSelectedAttendee = nSelectedAttendee + document.frmMain.cbSelect.length;
}
else
{
nSelectedAttendee = nSelectedAttendee + 1;
}
}
else
nSelectedAttendee = nSelectedAttendee;
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
alert("Sent email to the contact administrator.") ;
break;
case "ListSales":
populateSalesCombo(frm, sRet) ;
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
var iAccID = document.frmMain.hidFirmId.value;
if (iAccID != null && iAccID > 0)
{
context = "ListAccountContacts";
co= RSExecute ('rs_inst_account_contacts.asp', 'js_ListAccountContactsByInvestorID', sUserID, iAccID, sLName, 0, bShowInactive, bShowAll, RSShowResult, RSShowError, context);
}
else
{
context = "ListAccountContacts";
co= RSExecute ('rs_inst_account_contacts.asp', 'js_ListAccountContactsByInvestorID', sUserID, 0, sLName, 0, bShowInactive, bShowAll, RSShowResult, RSShowError, context);
}
}
function populateAcctContactDetails(frm, strData)
{
var cbElement, sName
if (strData && strData != "")
{
aryRecords = strData.split("\t");
if ( aryRecords.length > 0 )
{
aryData = aryRecords[0].split("\b");
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
sName = sName + " (" + aryData[4] + ")"
var oOption ;
oOption = new Option(sName, aryData[0]) ;
oOption.inst_inv_id = aryData[3] ;
oOption.inst_name = aryData[4] ;
oOption.ext_key_num = aryData[5] ;
oOption.contact_name = aryData[2] + ", " + aryData[1] ;
cbElement.options[cbElement.options.length] = oOption;
}
cbElement.disabled = false;
} 
else
{
cbElement.options[cbElement.options.length]= new Option("None", "0");
cbElement.disabled = true;
}
}
function populateSalesCombo(frm, strData)
{
var cbElement, sName
cbElement = frm.elements["selSales"]
if(cbElement && frm.hidType.value == "INVESTOR" && frm.hidEnableCMS.value == 1)
{
cbElement.options.length = 0;
if (strData && strData != "")
{
cbElement.options[cbElement.options.length]= new Option("None Selected", "-1");
aryRecords = strData.split("\t");
for (i=0; i < aryRecords.length-1; i++)
{
aryData = aryRecords[i].split("\b");
sName = aryData[1] ;
if( AlreadyExists(cbElement, aryData[0] ) == false)
{
cbElement.options[cbElement.options.length]= new Option(sName, aryData[0]);
}
}
} 
else
{
cbElement.options[cbElement.options.length]= new Option("None", "0");
}
}
}
function AlreadyExists(cbBox, sVal)
{
var i, bRet = false;
for(i = 0 ; i < cbBox.options.length ; i++)
{
if(sVal == cbBox.options[i].value)
{
bRet = true ;
}
}
return bRet ;
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
frm.txtFirstName.value = "" ;
frm.txtLastName.value = "" ;
if ( sName != "")
{
var arrName ;
arrName = sName.split(",")
if ( ( arrName[0] != undefined ) && ( arrName[0] != null ) ) frm.txtLastName.value = arrName[0] ;
if ( ( arrName[1] != undefined ) && ( arrName[1] != null ) ) frm.txtFirstName.value = arrName[1] ;
}
frm.hidAccountContactID.value = -1;
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
var iAccID ;
iAccID = frm.hidFirmId.value;
sSubject = "New Contact Request" ;
sBody = "Contact:" + sName + "\n" ;
sBody = sBody + "Account:" + frm.hidFirmName.value + "\n" ;
sBody = sBody + "Requestor:" + frm.hidUserName.value + "\n" ;
context = "SendEmail";
co= RSExecute ('rs_inst_account_contacts.asp', 'js_SendEmailContactAdmin', "", sSubject, sBody, RSShowResult, RSShowError, context);
}
function OnSelAccountContactDblClick(frm)
{
if (frm.selAccountContacts.selectedIndex != -1)
{
var oOption = frm.selAccountContacts.options[frm.selAccountContacts.selectedIndex] ;
var iContactID = frm.selAccountContacts.options[frm.selAccountContacts.selectedIndex].value;
var iContactName = oOption.contact_name ;
rewriteLayer("txtAccountContact", iContactName );
frm.hidAccountContactID.value = iContactID ;
frm.txtFirstName.value = "" ;
frm.txtLastName.value = "" ;
if ( iContactName != "")
{
var arrName ;
arrName = iContactName.split(",")
frm.txtLastName.value = arrName[0] ;
frm.txtFirstName.value = arrName[1] ;
}
var oSpan = document.getElementById("spanFirm") ;
if (oSpan) oSpan.innerText = oOption.inst_name;
frm.hidFirmName.value = oOption.inst_name;
frm.hidFirmId.value = oOption.inst_inv_id;
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
function InvestorPopulated()
{
if (bClickedAdd == false && window.event.propertyName == "value")
{
var iAccID = document.frmMain.hidFirmId.value;
var bShowInactive = false;
var bShowAll = true ;
if (iAccID != null && iAccID > 0)
{
var sUserRole = "";
sUserRole = document.frmMain.hidUserRole.value ;
if (sUserRole != "SalesPerson")
{
context = "ListSales";
co= RSExecute ('rs_roadshow_server.asp', 'js_ListSalesByInvestorID', iAccID, RSShowResult, RSShowError, context);
}
else
{	
OnSalesSelected(document.frmMain)
}
}
}
}
function OnSalesSelected(frm)
{
cbElement = frm.elements["selSales"]
if(cbElement && frm.hidType.value == "INVESTOR" && frm.hidEnableCMS.value == 1)
{
var iSalesID ;
iSalesID = frm.selSales.options[frm.selSales.selectedIndex].value;
if((iSalesID > 0) || (iSalesID == -1))
{
var iAccID = document.frmMain.hidFirmId.value;
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
}
