<!-- 
RSEnableRemoteScripting("/_ScriptLibrary");
var blnEnterKey = true;
function onPageLoad()
{
ConfirmRemoteScripting();
RSCallObject_wait(); 
var frm = document.frmMain;
var sSearch = frm.hidSearchName.value;
var sUserRole = frm.hidUserRole.value;
if ((sSearch != "") && (frm.txtAccountInvestorName))
{
frm.txtAccountInvestorName.value = sSearch;
OnAccountInvestorName(frm);
}
if (sUserRole != "NonSales")
{
if (document.all["selSalesRegion"].tagName == "DIV")
{
if (document.all["selSalesRegion"].value > 0)
frm.hidRegionID.value = document.all["selSalesRegion"].value;	
}
if (document.all["selSales"].tagName == "DIV")
{
if (document.all["selSales"].value > 0)
frm.hidSalesID.value = document.all["selSales"].value;	
}
else
{
OnSalesAsstSelected(frm);
}
}
}
function CustomValidation( frm, arrFieldsInError )
{
var arrMoreErrors = new Array();
var iAccountResult
if(frm.selAccountResults)
iAccountResult = frm.selAccountResults.selectedIndex;
else
{
iAccountResult = frm.hidAccountID.value;
}
var nErrInd = 0;
var bHasLoc = CheckLocation(frm);
if (iAccountResult < 0)
{
var arrError = FieldErrorInfo("selAccountResults","Must select an investor from search result","","selAccountResults","Investor search result");
arrMoreErrors[nErrInd] = arrError;
nErrInd++;
}
else
{
if(frm.selAccountResults)
var iAccountVal = frm.selAccountResults[frm.selAccountResults.selectedIndex].value;
else 
var iAccountVal = frm.hidAccountID.value;
if (iAccountVal == 0)
{
var arrError = FieldErrorInfo("selAccountResults","Must select an investor from search result","","selAccountResults","Investor search result");
arrMoreErrors[nErrInd] = arrError;
nErrInd++;
}
}
if (bHasLoc == false)
{
var arrError = FieldErrorInfo("","Must select a location","","","Location");
arrMoreErrors[nErrInd] = arrError;
nErrInd++;
}
return (arrMoreErrors);
} 
function submitPage( frm, action, sID, sName )
{
blnEnterKey = false;
switch (action)
{
case "Delete":
frm.hidAction.value = "Delete"; 
case "Add":
case "Update2":
if (ValidateForm(frm))
{
ProcessTable(frm);
frm.action = "/asp/util_submit_action.asp";
frm.submit();
}	
break;
case "cancel" :
window.location.reload(true);
break; 
case "back" :
if (window.history.length > 0)
window.history.go(-1);
break;
}
}
function popUpLocationreturn()
{
var frm = document.frmMain;
var sSearch = "";
if (Number(frm.hidRequestID1.value) > 0)
{
frm.hidAction.value = "DeleteAdd";
if (frm.txtAccountInvestorName) sSearch = frm.txtAccountInvestorName.value;
var iAccID = frm.hidAccountID.value;
var iRegID = frm.hidRegionID.value;
var iSaleID = frm.hidSalesID.value;
frm.action = "/asp/Roadshow_1On1_Add.asp?iRequestID=" + frm.hidRequestID1.value + "&sSearch=" + sSearch + "&iAccID=" + iAccID + "&iRegID=" + iRegID + "&iSaleID=" + iSaleID;
frm.submit();
}
else
{
frm.hidAction.value = "Add";
if (frm.txtAccountInvestorName) sSearch = frm.txtAccountInvestorName.value;
var iAccID = frm.hidAccountID.value;
var iRegID = frm.hidRegionID.value;
var iSaleID = frm.hidSalesID.value;
frm.action = "/asp/Roadshow_1On1_Add.asp?sSearch=" + sSearch + "&iAccID=" + iAccID + "&iRegID=" + iRegID + "&iSaleID=" + iSaleID;
frm.submit();
}
}
function popUpLocation()
{
var frm = document.frmMain;
var sSearch = "";
if (frm.txtAccountInvestorName) sSearch = frm.txtAccountInvestorName.value;
var iAccID = frm.hidAccountID.value;
var iRegID = frm.hidRegionID.value;
var iSaleID = frm.hidSalesID.value;
var iRequestID = frm.hidRequestID1.value;
var sUrl = "Roadshow_1On1_loc_popup.asp?sSearch=" + sSearch + "&iAccID=" + iAccID + "&iRegID=" + iRegID + "&iSaleID=" + iSaleID +"&iRequestID=" + iRequestID;
var sStyle = "width=600, height=400, scrollbars=1";
openGeneralPopup( sUrl, '', sStyle );
}
function populateGenericResult (frm, strData, cbElement,bAllowDuplicate,bAllowNone)
{
if(typeof(bAllowDuplicate) == "undefined") bAllowDuplicate = 1
if(typeof(bAllowNone) == "undefined") bAllowNone = 0
var bDuplicate ,j;
if(cbElement)
cbElement.options.length = 0;
if (strData && strData != "")
{
if(bAllowNone == 1 && cbElement)
cbElement.options[cbElement.options.length]= new Option("None Selected", "0");
aryRecords = strData.split("\t");
for (i=0; i < aryRecords.length-1; i++)
{
bDuplicate = 0;
aryData = aryRecords[i].split("\b");
for(j=0;j< i;j++)
{
tmparyData = aryRecords[j].split("\b");
if(tmparyData[1] == aryData[1])
{
bDuplicate = 1;
}
}
if(bAllowDuplicate == 1 || (bAllowDuplicate == 0 && bDuplicate == 0))
{
if(cbElement) cbElement.options[cbElement.options.length]= new Option(aryData[1], aryData[0]);
}
}
} 
else
{
if(cbElement) cbElement.options[cbElement.options.length]= new Option("None", "0");
}
}
function populateInvestorNames (frm, strData, cbElement)
{
if(cbElement)
cbElement.options.length = 0;
var bShowExt = frm.hidShowExtInvNumInd.value;
if (strData && strData != "")
{
aryRecords = strData.split("\t");
for (i=0; i < aryRecords.length-1; i++)
{
aryData = aryRecords[i].split("\b");
if((Number(bShowExt)) && (aryData[2] != ""))
cbElement.options[cbElement.options.length]= new Option(aryData[1] + " - " + aryData[2], aryData[0]);
else
cbElement.options[cbElement.options.length]= new Option(aryData[1], aryData[0]);
}
} 
else
{
cbElement.options[cbElement.options.length]= new Option("None", "0");
}
}
function populateInvestorSearchResultList(frm, strData)
{
return populateInvestorNames(frm, strData, frm.elements["selAccountResults"]);
}
function populateRegionSearchResultCombo(frm, strData,bAllowNone)
{
if(typeof(bAllowNone) == "undefined") bAllowNone = 0
return populateGenericResult(frm, strData, frm.elements["selSalesRegion"],0,bAllowNone);
}
function populateSalesSearchResultList(frm, sRet)
{
return populateGenericResult(frm, sRet, frm.elements["selSales"],0);
}
function MatchID(objSel, iID)
{
for (var i=0; i < objSel.length; i++)
if (objSel.options[i].value == iID)
objSel.options[i].selected = true;
}
function ConfirmRemoteScripting()
{ 
var enabled = false;
context = "Confirm";
co = RSExecute('rs_roadshow_server.asp', 'js_RemoteScriptingEnabled', RSShowResult, RSShowError, context);
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
case "InvestorName":
populateInvestorSearchResultList(frm, sRet);
var iAccID = frm.hidAccountID.value;
if (iAccID > 0)
{
MatchID(frm.selAccountResults, iAccID);
}
var iRegID = frm.hidRegionID.value;
if (iRegID > 0)
MatchID(frm.selSalesRegion, iRegID);
var iSaleID = frm.hidSalesID.value;
if (iSaleID > 0)
{
rs_GetSalesPerson(iRegID);
MatchID(frm.selSales, iSaleID);
}
if (iRegID > 0)
MatchID(frm.selSalesRegion, iRegID);
break;
case "AccountSelected":
populateRegionSearchResultCombo(frm, sRet,1);
break;
case "ListSales":
populateSalesSearchResultList(frm,sRet);
break;
case "RegionSelected":
populateSalesSearchResultList(frm, sRet);
var iSaleID = frm.hidSalesID.value;
if (iSaleID > 0)
MatchID(frm.selSales, iSaleID);
break;
case "SalesSelected":
populateRegionSearchResultCombo(frm, sRet);
frm.hidRegionID.value = document.all["selSalesRegion"].value;
var iRegID = frm.hidRegionID.value;
if (iRegID > 0)
MatchID(frm.selSalesRegion, iRegID);
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
function OnAccountInvestorName(frm)
{
var sSearch = frm.txtAccountInvestorName.value;
if (sSearch == "")
{
alert("Please enter at least one letter to search");
return;
}
context = "InvestorName";
co= RSExecute ('rs_roadshow_server.asp', 'js_ListInvestorByName', frm.txtAccountInvestorName.value, RSShowResult, RSShowError, context);
}
function OnAccountSelected(frm)
{
if (frm.selAccountResults.selectedIndex != -1)
{
frm.hidAccountID.value = frm.selAccountResults.options[frm.selAccountResults.selectedIndex].value;
var iAccID = frm.hidAccountID.value;
if (iAccID > 0)
{
co= RSExecute ('rs_roadshow_server.asp', 'js_ListRegionsByInstInvID', iAccID );
populateRegionSearchResultCombo(frm, co.return_value,1);
co= RSExecute ('rs_roadshow_server.asp', 'js_ListSalesByInvestorID', iAccID );
populateSalesSearchResultList(frm,co.return_value); 
OnAccountContactSearch(frm, 2)
}
}
}
function rs_GetSalesPerson(iRegID)
{
if(iRegID > 0)
{
context = "RegionSelected";
co= RSExecute ('rs_roadshow_server.asp', 'js_ListSalesByRegionIDFromCatAccess', iRegID, RSShowResult, RSShowError, context);
}
}
function OnRegionSelected(frm)
{
frm.hidRegionID.value = frm.selSalesRegion.options[frm.selSalesRegion.selectedIndex].value;
var iAccID = frm.hidAccountID.value;
var iRegID = frm.hidRegionID.value;
if (iRegID > 0 && iAccID > 0)
{
rs_GetSalesPerson(iRegID);
}
else
{
OnAccountSelected(frm);
}
}
function OnSalesSelected(frm)
{
if (frm.selSales.selectedIndex != -1)
{
frm.hidSalesID.value = frm.selSales.options[frm.selSales.selectedIndex].value;
if(frm.hidSalesID.value > 0)
{
var iAccID = frm.hidAccountID.value;
context = "SalesSelected";
co= RSExecute ('rs_roadshow_server.asp', 'js_ListCategoryBySalesIDAndInvestorID', frm.hidSalesID.value, iAccID );
populateRegionSearchResultCombo(frm, co.return_value);
frm.hidRegionID.value = document.all["selSalesRegion"].value;
var iRegID = frm.hidRegionID.value;
if (iRegID > 0)
MatchID(frm.selSalesRegion, iRegID);
var context, bShowInactive, bShowAll, iSalesID
bShowInactive = false ;
bShowAll = false ;
var iAccID = frm.selAccountResults.options[frm.selAccountResults.selectedIndex].value;
if (iAccID != null && iAccID > 0)
{
context = "ListAccountContacts";
co= RSExecute ('rs_inst_account_contacts.asp', 'js_ListAccountContactsByInvestorID', "", iAccID, "", frm.hidSalesID.value, bShowInactive, bShowAll, RSShowResult, RSShowError, context);
}
}
}	
}
function CheckLocation(frm)
{
var oDivLoc = getDocumentElement("divLoation");
var oTable = getDocumentElement("tblLoc");
var bRet = false;
if (typeof(oDivLoc) != "undefined" && typeof(oTable) != "undefined")
{
var oDaySetUp = eval("frm.hidDaySetup" + 1);
if (typeof(oDaySetUp) != "undefined")
bRet = true;
}
return bRet;
}
function ProcessTable(frm)
{
var oDivLoc = getDocumentElement("divLoation");
var oTable = getDocumentElement("tblLoc");
if (typeof(oDivLoc) != "undefined" && typeof(oTable) != "undefined")
{
frm.hidTableRows.value = oTable.rows.length;
frm.hidTableCols.value = oTable.rows(1).cells.length;
//var rExp = /\
var sMsg = oTable.rows.length + " x " + oTable.rows(1).cells.length + " table";
for (var i=1; i < oTable.rows.length; i++)
{
var oDaySetUp = eval("frm.hidDaySetup" + i);
if (typeof(oDaySetUp) == "undefined")
continue;
var sDaySetUpID = oDaySetUp.value;
var sDate = eval("frm.hidDate" + i).value;
var sLoc = oTable.rows(i).cells(1).innerText;
var sHr = eval("frm.hr_" + sDaySetUpID).value;
if (sHr == "") sHr = "00";
var sMin = eval("frm.min_" + sDaySetUpID).value;
if (sMin == "") sMin = "00";
var oAMPM = eval("frm.amPm_" + sDaySetUpID);
var sAMPM = oAMPM.options[oAMPM.selectedIndex].text;
var iNumHr = new Number(sHr);
if (iNumHr > 12)
sAMPM = oAMPM.options[1].text;
oTable.rows(i).cells(2).innerText = sHr + ":" + sMin + sAMPM;
eval("frm.hidStartDttm" + i).value = sDate + " " + oTable.rows(i).cells(2).innerText;
var sHr2 = eval("frm.hr2_" + sDaySetUpID).value;
if (sHr2 == "") sHr2 = "00";
var sMin2 = eval("frm.min2_" + sDaySetUpID).value;
if (sMin2 == "") sMin2 = "00";
var oAMPM2 = eval("frm.amPm2_" + sDaySetUpID);
var sAMPM2 = oAMPM2.options[oAMPM2.selectedIndex].text;
var iNumHr2 = new Number(sHr2);
if (iNumHr2 > 12)
sAMPM2 = oAMPM2.options[1].text;
oTable.rows(i).cells(3).innerText = sHr2 + ":" + sMin2 + sAMPM2;
eval("frm.hidEndDttm" + i).value = sDate + " " + oTable.rows(i).cells(3).innerText;
}
}
}
function OnSalesAccountSelected(frm)
{
var inv_id = frm.selAccountResults.options[frm.selAccountResults.selectedIndex].value;
frm.hidAccountID.value = inv_id;
var rgnInfo = getRegionInfobyInvId(inv_id);
var rgnInfoAry = rgnInfo.split("\t");
frm.hidRegionID.value = rgnInfoAry[0];
var oRegion = document.all["selSalesRegion"];
if (oRegion.tagName == "DIV")
oRegion.innerText = rgnInfoAry[1];
var sUserRole, sSalesUID;
sUserRole = frm.hidUserRole.value ;
if (sUserRole == "SalesPerson")
{
sSalesUID = frm.hidSalesID.value ;
var iAccID = frm.selAccountResults.options[frm.selAccountResults.selectedIndex].value;
if (iAccID != null && iAccID > 0)
{
context = "ListAccountContacts";
co= RSExecute ('rs_inst_account_contacts.asp', 'js_ListAccountContactsByInvestorID', "", iAccID, "", sSalesUID, false, false, RSShowResult, RSShowError, context);
}
}
}
function getRegionInfobyInvId(invId)
{
var RgnId = 0;
var RgnName = "NA";
for (var i=0; i<SCCoverageAry.length; i++)
{
if (SCCoverageAry[i][2] == invId)
{
RgnId = SCCoverageAry[i][1];
RgnName = getRegionNamebyId(RgnId);
break; 
}
}
return (RgnId + "\t" + RgnName);
}
function OnSalesAsstSelected(frm)
{
var ae_id = frm.selSales.options[frm.selSales.selectedIndex].value;
frm.hidSalesID.value = ae_id;
if (ae_id > 0)
LoadInvestorCoverageBySaleId(frm, ae_id);
}
function LoadInvestorCoverageBySaleId(frm, aeId)
{
cbElement = frm.elements["selAccountResults"];
if(cbElement) cbElement.options.length = 0;
CoveredInvAry = new Array();
for (var i=0; i<SCCoverageAry.length; i++)
{
if (SCCoverageAry[i][0] == aeId)
{ 
var invId = SCCoverageAry[i][2];
var InvAry = new Array(2);
InvAry[0] = invId;
InvAry[1] = getInvestorNamebyId(invId);
CoveredInvAry.push(InvAry);
}
} 
var selInvId = frm.hidAccountID.value; 
if (CoveredInvAry.length > 1)
{
cbElement.options[cbElement.options.length]= new Option("None", 0);
if (selInvId <= 0)
cbElement.selectedIndex = 0;
}
for (var inv=0; inv<CoveredInvAry.length; inv++)
{
cbElement.options[cbElement.options.length]= new Option(CoveredInvAry[inv][1].replace(/&amp;/g,"&"), CoveredInvAry[inv][0]);
if (selInvId == CoveredInvAry[inv][0])
cbElement.selectedIndex = inv+1;
}
if (selInvId > 0)
OnSalesAccountSelected(frm);
}
function getInvestorNamebyId(theId)
{
for (var i=0; i<SCInvestorAry.length; i++)
{
if (SCInvestorAry[i][0] == theId)
return SCInvestorAry[i][1];
}
return "NA";
}
function getRegionNamebyId(theId)
{
for (var i=0; i<SCRegionAry.length; i++)
{
if (SCRegionAry[i][0] == theId)
return SCRegionAry[i][1];
}
return "NA";
}
function getSaleNamebyId(theId)
{
for (var i=0; i<SCSaleAry.length; i++)
{
if (SCSaleAry[i][0] == theId)
return (SCSaleAry[i][1] + ", " + SCSaleAry[i][2]);
}
return "NA";
}
function OnChange(frm)
{	
if(event.keyCode == 13)
{
blnEnterKey = true;
var sSearch = frm.txtAccountInvestorName.value;
if (sSearch == "")
{
alert("Please enter at least one letter to search");
return false;
}
context = "InvestorName";
co= RSExecute ('rs_roadshow_server.asp', 'js_ListInvestorByName', frm.txtAccountInvestorName.value, RSShowResult, RSShowError, context);
return false;
}
}
function OnAccountContactSearch(frm, nMode)
{
var bShowInactive, bShowAll, sUserID, sLName, iSalesID
bShowInactive = false ;
bShowAll = false ;
sUserID = "";
sLName = "";
if (nMode == 1)
{
sLName = frm.txtSearchAccountContact.value;
iSalesID = 0 ;
}
else
{
iSalesID = 0 ;
}
if(frm.selAccountResults.selectedIndex > -1 )
{
var iAccID = frm.selAccountResults.options[frm.selAccountResults.selectedIndex].value;
if (iAccID != null ) 
{
context = "ListAccountContacts";
co= RSExecute ('rs_inst_account_contacts.asp', 'js_ListAccountContactsByInvestorID', sUserID, iAccID, sLName, iSalesID, bShowInactive, bShowAll, RSShowResult, RSShowError, context);
}
}
else
{
context = "ListAccountContacts";
co= RSExecute ('rs_inst_account_contacts.asp', 'js_ListAccountContactsByInvestorID', sUserID, 0, sLName, iSalesID, bShowInactive, bShowAll, RSShowResult, RSShowError, context);
}
}
function populateAcctContactSearchResultCombo(frm, strData)
{
var cbElement, sName
cbElement = frm.elements["selAccountContacts"]
if(cbElement)
{
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
cbElement.options[cbElement.options.length] = oOption;
}
} 
else
{
cbElement.options[cbElement.options.length]= new Option("None", "0");
}
}
}
function OnNewAccountContact(frm)
{
var sName, sSubject, sBody ;
sName = ""
sName = frm.txtSearchAccountContact.value;
if (sName == null || sName == "")
{
alert("Please enter a name for the new contact.") ;
return;
}
if(frm.selAccountResults.selectedIndex == -1 )
{
alert("Please choose an Account/Investor Name") ;
return;
}
frm.hidAccountContactID.value = "-1" ;
frm.hidAccountContactName.value = sName;
var iAccID = frm.selAccountResults.options[frm.selAccountResults.selectedIndex].value;
if (iAccID == null || iAccID == 0)
{
alert("Please select an investor to add a contact") ;
return;
}
var oElem = document.getElementById("txtAccountContact");
oElem.innerText = sName + "*" ;
sSubject = "New Contact Request" ;
sBody = "Contact:" + sName + "\n" ;
sBody = sBody + "Account:" + frm.selAccountResults.options[frm.selAccountResults.selectedIndex].text + "\n" ;
sBody = sBody + "Requestor:" + frm.hidUserName.value + "\n" ;
context = "SendEmail";
co= RSExecute ('rs_inst_account_contacts.asp', 'js_SendEmailContactAdmin', "", sSubject, sBody, RSShowResult, RSShowError, context);
}
function OnSelAccountContactDblClick(frm)
{
if(frm.selAccountContacts.options.length > 0 && frm.selAccountContacts.selectedIndex != -1)
{
var iContactID = frm.selAccountContacts.options[frm.selAccountContacts.selectedIndex].value;
var iContactName = frm.selAccountContacts.options[frm.selAccountContacts.selectedIndex].text;
rewriteLayer("txtAccountContact", iContactName);
frm.hidAccountContactID.value = iContactID ;
frm.hidAccountContactName.value = "" ;
var oOption, bInvestorExists;
bInvestorExists = false ;
oOption = frm.selAccountContacts.options[frm.selAccountContacts.selectedIndex] ;
for(i = 0 ; i < frm.selAccountResults.options.length ; i++)
{
if(oOption.inst_inv_id == frm.selAccountResults.options[i].value )
{
bInvestorExists = true ;
if(frm.selAccountResults.selectedIndex != i )
{
frm.selAccountResults.selectedIndex = i ;
OnAccountSelected(document.frmMain) ;
}
}
}
if(bInvestorExists == false)
{
frm.selAccountResults.options[frm.selAccountResults.options.length] = new Option(oOption.inst_name + " - " + oOption.ext_key_num, oOption.inst_inv_id) ;
frm.selAccountResults.selectedIndex = frm.selAccountResults.options.length - 1 ;
OnAccountSelected(document.frmMain) ;
}
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
