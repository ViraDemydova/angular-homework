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
function submitPage( frm ,action)
{
switch (action)
{
case "Add":
if (ValidateForm(frm))
{
ProcessForm(frm);
frm.action = "/asp/util_submit_action.asp";
frm.submit();
}	
break;
case "Update":
if (ValidateForm(frm))
{
frm.hidTableRows.value = frm.hidRows.value;
ProcessForm(frm);
frm.hidAction.value = "Update3";
frm.action = "/asp/util_submit_action.asp";
frm.submit();
}	
break;
}
}
function ProcessForm(frm)
{
if(frm.selLocTeamDate)
{
var sDate = frm.selLocTeamDate.value
var lIndex = sDate.indexOf(",");
var lIndex2 = sDate.indexOf("T");
var sDaySetupId = sDate.substring(0,lIndex);
var sRSDate = sDate.substring(lIndex+1, lIndex2);
frm.hidDaySetup1.value = sDaySetupId;
var sStartHr = frm.iStartHr.value;
if (sStartHr == "") sStartHr = "00";
var sStartMin = frm.iStartMin.value;
if(sStartMin == "") sStartMin = "00";
if(sStartHr =="00" && sStartMin =="00")
var sStartDate = sRSDate + " " + sStartHr + ":" + sStartMin + " " + "AM";
else
var sStartDate = sRSDate + " " + sStartHr + ":" + sStartMin + " " + frm.selStartAMPM.value;
frm.hidStartDttm1.value = sStartDate;
var sEndHr = frm.iEndHr.value;
if (sEndHr == "") sEndHr = "00";
var sEndMin = frm.iEndMin.value;
if(sEndMin == "") sEndMin = "00";
if(sEndHr =="00" && sEndMin =="00")
var sEndDate = sRSDate + " " + sEndHr + ":" + sEndMin + " " + "AM";
else
var sEndDate = sRSDate + " " + sEndHr + ":" + sEndMin + " " + frm.selEndAMPM.value;
frm.hidEndDttm1.value = sEndDate;
}
if(frm.hidRows)
{
var i;
var elt
for(i=1;i<=frm.hidRows.value;i++)
{
var sDate = eval("frm.selLocTeamDate1" + i+".value");
var lIndex = sDate.indexOf(",");
var lIndex2 = sDate.indexOf("T");
var sDaySetupId = sDate.substring(0,lIndex);
var sRSDate = sDate.substring(lIndex+1, lIndex2);
elt = eval("frm.hidDaySetup1" + i );
elt.value = sDaySetupId;
var sStartHr = eval("frm.iStartHr" + i+".value");
if (sStartHr == "") sStartHr = "00";
var sStartMin = eval("frm.iStartMin" + i+".value");
if(sStartMin == "") sStartMin = "00";
if(sStartHr =="00" && sStartMin =="00")
var sStartDate = sRSDate + " " + sStartHr + ":" + sStartMin + " " + "AM";
else
var sStartDate = sRSDate + " " + sStartHr + ":" + sStartMin + " " + eval("frm.selStartAMPM" + i+".value");
elt = eval("frm.hidStartDttm1" + i);
elt.value = sStartDate;
var sEndHr = eval("frm.iEndHr" + i+".value");
if (sEndHr == "") sEndHr = "00";
var sEndMin = eval("frm.iEndMin" + i+".value");
if(sEndMin == "") sEndMin = "00";
if(sEndHr =="00" && sEndMin =="00")
var sEndDate = sRSDate + " " + sEndHr + ":" + sEndMin + " " + "AM";
else
var sEndDate = sRSDate + " " + sEndHr + ":" + sEndMin + " " + eval("frm.selEndAMPM"+i+".value");
elt = eval("frm.hidEndDttm1" + i);	
elt.value = sEndDate;
}
}
}
function SetDirty(Requestid)
{
var elt = eval("document.frmMain.hidDirty_" + Requestid );
elt.value = 1;
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
case "SendEmail":
alert("Sent email to the contact administrator.") ;
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
function OnAccountContactSearch(frm, sSearchTextBox, sListBoxName)
{
var bShowInactive, bShowAll, sUserID, sLName, oElem
bShowInactive = false ;
bShowAll = false ;
sUserID = "";
sLName = "";
oElem = document.getElementById(sSearchTextBox) 
if(oElem) sLName = oElem.value ;
if (sLName == null || sLName == "")
{
alert("Please enter atleast one character") ;
return ;
}
var iAccID = frm.hidAccountID.value;
if (iAccID != null && iAccID > 0)
{
co= RSExecute ('rs_inst_account_contacts.asp', 'js_ListAccountContactsByInvestorID', sUserID, iAccID, sLName, 0, bShowInactive, bShowAll);
var sRet;
sRet = co.return_value;
populateAcctContactSearchResultCombo(frm, sRet, sListBoxName);
}
else
{
alert("Please select an Institutional investor");
}
}
function populateAcctContactSearchResultCombo(frm, strData, sListBoxName)
{
var cbElement, sName
cbElement = document.getElementById(sListBoxName) ;
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
} 
else
{
cbElement.options[cbElement.options.length]= new Option("None", "0");
}
}
function OnNewAccountContact(frm, sTextBoxName, sRegionName, hidContactIDFld, hidContactNameFld, Requestid)
{
var sName, context, sTemp, oElem, sSubject, sBody ;
sName = "" ;
oElem = document.getElementById(sTextBoxName) ;
if(oElem) sName = oElem.value ;
if (sName == null || sName == "")
{
alert("Please enter a name for the new contact.") ;
return;
}
var iAccID = frm.hidAccountID.value;
if (iAccID == null || iAccID == 0)
{
alert("Please select an investor to add a contact") ;
return;
}
if( Requestid != null && Requestid != "") SetDirty(Requestid);
oElem = document.getElementById(hidContactIDFld) ;
oElem.value = "-1" ;
oElem = document.getElementById(hidContactNameFld) ;
oElem.value = sName ;
sTemp = sName ;
sTemp = sTemp + "*" ;
oElem = document.getElementById(sRegionName);
oElem.innerText = sTemp ;
sSubject = "New Contact Request" ;
sBody = "Contact:" + sName + "\n" ;
sBody = sBody + "Account:" + frm.hidFirmName.value + "\n" ;
sBody = sBody + "Requestor:" + frm.hidUserName.value + "\n" ;
context = "SendEmail";
co= RSExecute ('rs_inst_account_contacts.asp', 'js_SendEmailContactAdmin', "", sSubject, sBody, RSShowResult, RSShowError, context);
}
function OnSelAccountContactDblClick(frm, sListBoxName, sRegionName, hidContactIDFld, hidContactNameFld, Requestid )
{
var oElem;
oElem = document.getElementById(sListBoxName) ;
if (oElem.selectedIndex != -1)
{
var iContactID = oElem.options[oElem.selectedIndex].value;
var iContactName = oElem.options[oElem.selectedIndex].text;
oElem = document.getElementById(sRegionName);
oElem.innerText = iContactName ;
oElem = document.getElementById(hidContactIDFld) ;
oElem.value = iContactID;
oElem = document.getElementById(hidContactNameFld) ;
oElem.value = "" ;
if( Requestid != null && Requestid != "") SetDirty(Requestid);
}	
return;
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
