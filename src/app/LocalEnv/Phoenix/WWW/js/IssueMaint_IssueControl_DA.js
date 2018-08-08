<!-- 
RSEnableRemoteScripting("/_ScriptLibrary");
function onPageLoad()
{
on_select_add_status();
initializeInternal();
initializeExternal();
enableDealCode();
}
function initializeInternal() 
{
if(
(document.frmMain.chkCapMkts.checked == true) &&
(document.frmMain.chkBanking.checked == true) &&
(document.frmMain.chkFinance.checked == true) &&
(document.frmMain.chkResearch.checked == true) &&
(document.frmMain.radInstitution[0].checked == true) &&
(document.frmMain.radMiddleMarkets[0].checked == true) &&
(!document.frmMain.chkRetailSyndicateManager || document.frmMain.chkRetailSyndicateManager.checked == true) &&
(!document.frmMain.chkRetailUS || document.frmMain.chkRetailUS.checked == true) &&
(!document.frmMain.chkRetailInternational || document.frmMain.chkRetailInternational.checked == true) 
)
{
document.frmMain.radAllInternal.checked = true;
for( var i=0; i<document.frmMain.chkInternal.length; i++)
{
document.frmMain.chkInternal[i].disabled = true;
}
for( var i=0; i<document.frmMain.radInstitution.length; i++)
{
document.frmMain.radInstitution[i].disabled = true;
}
for( var i=0; i<document.frmMain.radMiddleMarkets.length; i++)
{
document.frmMain.radMiddleMarkets[i].disabled = true;
}
EnableCheckBox("chkRetail", false) ; 
EnableCheckBox("chkRetailSyndicateManager", false) ; 
EnableCheckBox("chkRetailUS", false) ; 
EnableCheckBox("chkRetailInternational", false) ; 
}
else
{
document.frmMain.radSelectedInternal.checked = true;
}
}
function initializeExternal() {
var count = 0;
for( var i=0; i<frmMain.chkExternal.length; i++)
{
if (frmMain.chkExternal[i].checked == true)
++count;
}
if ((count == frmMain.chkExternal.length) && (frmMain.radAllInternal.checked == true)) {
frmMain.radAllExternal.checked = true;
for( var i=0; i<frmMain.chkExternal.length; i++)
{
frmMain.chkExternal[i].disabled = true;
}
}
else
document.frmMain.radSelectedExternal.checked = true;
}
function CheckConditionallyRequiredFields( frm, arrFieldsInError )
{
var arrMoreErrors = new Array();
var count = 0;
var iDealState = new Number(frm.selStates.value.replace(/(\,)/g, ""));
if(frm.hidShowTMCDealInvolvement.value == "1")
{	
var iDealInvolvement = new Number(frm.selDealInvolvement.value.replace(/(\,)/g, ""));
if (iDealState == 10 && iDealInvolvement > 0){
var arrError = FieldErrorInfo("selDealInvolvement", 'A Deal can not be sent to TMC in the Confidential state.', "", "selDealInvolvement", "TheMarkets.com Deal Involvement");
arrMoreErrors[count] = arrError;	
count++;
}
}
if ((iDealState == 10) && (frm.hidIsBookOpen.value == "True")) {
var arrError = FieldErrorInfo("selStates", 'A Deal cannot be set to confidential when the books are open.', "", "selStates", "Deal State");
arrMoreErrors[count] = arrError;	
count++;
}
if (g_checkStatusDate && frm.dtTxtAddStatusDt.value.length == 0)
{
var arrError = FieldErrorInfo("dtTxtAddStatusDt", 'Please enter a Status Date.', "", "dtTxtAddStatusDt", "Status Date");
arrMoreErrors[count] = arrError;	
count++; 
}
return (arrMoreErrors);
} 
function submitPage(frm, action)
{
switch (action)
{
case "update" :
if (ValidateForm(frm))
if( ValidateShowToSyndicate() )
{
populateHidden( frm );
var iDealState = new Number(frm.selStates.value.replace(/(\,)/g, ""));
if(frmMain.hidClosedEndFundInd.value == "True")
{
if (iDealState == 30 && iDealState != frm.hidPreviousStateID.value && frm.hidIsBookOpen.value == "True") 
{
var ret = confirm("You have changed the deal state to Priced. Do you want to close the book?");
if (ret == true)
frm.hidBookClose.value = "1";
}
}
frm.action = "util_submit_action.asp";
frm.hidAction.value = "Update";
if(frm.hidShowTMCDealInvolvement.value == "1")
frm.txtMarketsDealCd.disabled = false;
frm.hidResend.value = "False"; 
if(isValidTMCDeal(document.frmMain))
{
if (frm.hidPreviousStateID.value != '30' && frm.selStates.options[frm.selStates.options.selectedIndex].value == '30' && frm.hidShowWarningMsgFRQ.value > 0)
{
var co = RSExecute('rs_IssueMaint_server.asp', 'js_DoesOrderExistWithoutFRQ', frm.hidIssueID.value);
var ret = co.return_value.toString().toLowerCase();
if (ret == 'true')
{
alert('Warning: Orders exist that do not have proper Rule 2790 documentation. Please see the IOI Free Riding Questionnaire Report for the list of investors.');
}
}
frm.submit();
return true;
} 
}
break;
case "resend":
if (ValidateForm(frm))
if( ValidateShowToSyndicate() )
{	
populateHidden( frm );
frm.action = "util_submit_action.asp";
frm.hidResend.value = "True";
if(frm.hidShowTMCDealInvolvement.value == "1")
frm.txtMarketsDealCd.disabled = false;
frm.hidAction.value = "Update";
for( var i=0; i<document.frmMain.all.length; i++)
document.frmMain.all[i].disabled = false;
if(isValidTMCDeal(document.frmMain))
{
frm.submit();
return true;
} 
}
break;
case "reverttosave" :
window.location.reload();
break;
case "cancel" :
window.history.back(1);
break; 
case "sendtoretail" :
frm.action = "SendToRetail.asp?issue_id=" + document.frmMain.hidIssueID.value;
frm.submit();
break ;
}
}
function populateHidden( frm )
{
var sStatus = new Array();
var s = frm.selAddStatus.options[frm.selAddStatus.selectedIndex].value;
if (s.indexOf(",") != -1) {
sStatus = s.split(',');
if (sStatus[0] != "") 
frm.hidStatusID.value = sStatus[0];
else
frm.hidStatusID.value = 0;
frm.hidActiveInd.value = sStatus[1];
}
if(frm.hidShowTMCDealInvolvement.value == "1")
{
var newOwnerIntent = frm.selDealInvolvement.value;
var prevOwnerIntent = frm.hidPrevOwnerIntent.value;
if(newOwnerIntent == 4 || newOwnerIntent == 5)
newOnwerIntent = 1;
if(newOwnerIntent == prevOwnerIntent)
frm.hidIntentChange.value = "False";
else
frm.hidIntentChange.value = "True";
}
}
var g_checkStatusDate = null;
function on_select_add_status()
{
var sStatusID = new Array();
var s = document.frmMain.selAddStatus.options[document.frmMain.selAddStatus.selectedIndex].value;
sStatus = s.split(',');
if (sStatus[0] == 22 || sStatus[0] == 23 || sStatus[0] == 122 || sStatus[0] == 121) {
document.frmMain.dtTxtAddStatusDt.style.visibility = 'visible';
txtStatusDate.style.visibility = 'visible';
calendarLink.style.visibility='visible';
g_checkStatusDate = true;
}
else {
document.frmMain.dtTxtAddStatusDt.style.visibility = 'hidden';
document.frmMain.dtTxtAddStatusDt.value='';
calendarLink.style.visibility='hidden';
txtStatusDate.style.visibility = 'hidden';
g_checkStatusDate = false;
}
}
function on_select_tranche ( frm )
{
frm.action = self.window.location;
frm.submit();
}
function onAllSelected( chkbox )
{
for( var i=0; i<chkbox.length; i++)
{
chkbox[i].checked=true;
chkbox[i].disabled=true;
}
}
function onAllSelectedSalesRadio( radSales )
{
for( var i=0; i<radSales.length; i++)
{
radSales[i].disabled=true;
}
radSales[0].checked=true;
document.all.item("Lnk_radInstitution").style.display = "none"
document.all.item("Lnk_radMiddleMarkets").style.display = "none"
CheckAndDisableCheckBox("chkRetail") ; 
CheckAndDisableCheckBox("chkRetailSyndicateManager") ; 
CheckAndDisableCheckBox("chkRetailUS") ; 
CheckAndDisableCheckBox("chkRetailInternational") ; 
}
function onChooseSelected( chkbox )
{
for( var i=0; i<chkbox.length; i++)
{
chkbox[i].disabled=false;
}
if (document.frmMain.radSelectedInternal.checked == true)
document.frmMain.radSelectedExternal.checked = true;
EnableCheckBox("chkRetail", true) ; 
EnableCheckBox("chkRetailSyndicateManager", true) ; 
EnableCheckBox("chkRetailUS", true) ; 
EnableCheckBox("chkRetailInternational", true) ; 
}
function onChooseSelectedSalesRadio( radSales )
{
for( var i=0; i<radSales.length; i++)
{
radSales[i].disabled=false;
}
}
function onChangeState( frm )
{
frm.hidSaveData.value = 'True';
frm.action = self.window.location;
frm.submit();
}
function enableDealCode()
{
if(document.frmMain.hidShowTMCDealInvolvement.value == "1")
{
var Involvement = document.frmMain.selDealInvolvement.value;
if (Involvement == 2)
document.frmMain.txtMarketsDealCd.disabled = false;
else
document.frmMain.txtMarketsDealCd.disabled = true;
}
}
function setInvolveToNonApplicable()
{
var SelIndex = document.frmMain.selAddStatus.selectedIndex;
var status11 = document.frmMain.selAddStatus.options[SelIndex].text; 
if(document.frmMain.hidShowTMCDealInvolvement.value == "1")
{
var Sellen = document.frmMain.selDealInvolvement.length;
if ( status11.indexOf("Inactive")!= -1 ) 
{	
for(var i=0; i< Sellen; i++) {
if (document.frmMain.selDealInvolvement.options[i].value == 0){
document.frmMain.selDealInvolvement.options[i].selected=true;
}
}
}
}
}
function fillStatusTypeDropDown(arrStatusTypes, debtEquityFlag){
document.frmMain.selAddStatus.length = 0;
var stateID = document.frmMain.selStates.value;
var counter = 0;
for(var i=0; i< arrStatusTypes.length; i++) {
if(arrStatusTypes[i][1] == debtEquityFlag && arrStatusTypes[i][2] == stateID){
var selVal = arrStatusTypes[i][0] + ',' + arrStatusTypes[i][3];
var opt = new Option(arrStatusTypes[i][4], selVal);
var sel = document.frmMain.selAddStatus;
sel.options[counter++] = opt;
}
}
}
function fillStatesTypeDropDown(arrStatesTypes){
var stateID = document.frmMain.selStates.value;
document.frmMain.selStates.length = 0;
var counter = 0;
var settledVal = 40;
for(var i=1; i< arrStatesTypes.length; i++) {
var stateNum = parseInt(arrStatesTypes[i][0], 10);
if((stateNum == stateID) || ((stateNum - 10) == stateID) || ((stateNum + 10) == stateID)){
if( stateNum != settledVal || (stateNum == settledVal && stateNum == stateID)){
var opt = new Option(arrStatesTypes[i][1], arrStatesTypes[i][0]);
var sel = document.frmMain.selStates;
sel.options[counter++] = opt; 
if(sel.options[counter-1].value == stateID)
sel.options[counter-1].selected = true;
} 
}
}
}
function isValidTMCDeal(frm)
{
if(frm.hidShowTMCDealInvolvement.value == "1")
{
if(frm.hidResend.value == "True" || frm.hidIntentChange.value == "True")
{
if(frm.hidBlkTrdInd.value == "True" && frm.selStates.value != 30)
{
var sUrl = "issuemaint_issuecontroleq_da_warning_popup.asp";
var sStyle = "width=480,height=160,scrollbars=1,resizable=1";
openGeneralPopup( sUrl, '', sStyle );	
return false;
}
else
{
return true;
}
}
else
{
return true;
}
}
return true;
}
function ValidateShowToSyndicate()
{
if(document.frmMain.chkCapMkts.checked == true)
return true;
else if(isAnyExternalEnable() == false)
return true;
else
return confirm(document.frmMain.hidShowToExternalConfirmation.value);
}
function isNotSalesPermissioned()
{
return (document.frmMain.radInstitution[1].checked &&	
document.frmMain.radMiddleMarkets[1].checked);	
}
function onInvestorChanged(strChkBoxName)
{
if(isNotSalesPermissioned() &&
document.frmMain.item(strChkBoxName).checked)
{
alert(document.frmMain.hidPermissionSalesAlert.value);
}
}
function AlertNoneSelected()
{
if(isNotSalesPermissioned() &&
(document.frmMain.chkInstitutionalInv.checked == true ||
document.frmMain.chkInstitutionalInvIOI.checked == true))
{
alert(document.frmMain.hidPermissionSalesAlert.value);
}
}
function onExternalChanged()
{
if(isAnyExternalEnable())
document.frmMain.chkCapMkts.checked = true;
}
function isAnyExternalEnable()
{
return (document.frmMain.chkBrokerDealer.checked == true ||
document.frmMain.chkIssuer.checked == true ||
document.frmMain.chkInstitutionalInv.checked == true ||
document.frmMain.chkInstitutionalInvIOI.checked == true ||
document.frmMain.chkMidMktsInv.checked == true);
}
function ShowEditLink( strLinkName, bShow )
{ 
document.all.item(strLinkName).style.display = (bShow==0) ? "none" : "block";
}
function checkCurrentlyMarketed()
{
var stateID = document.frmMain.selStates.value;
var announcedVal = 20;
var pricedVal = 30;
if(stateID == announcedVal)
{
document.frmMain.chkCurrentlyMarketed.disabled = false;
if (document.frmMain.hidIgnoreCurMktedFlag.value == 0)
document.frmMain.chkCurrentlyMarketed.checked = true;
}
else if(stateID >= pricedVal)
{
document.frmMain.chkCurrentlyMarketed.disabled = true;
document.frmMain.chkCurrentlyMarketed.checked = false;
}
}
function FeedToSDC(sPar)
{
var sURL, sStyle ;
if (sPar == "FEEDSEND")
{
sUrl = "tf_sdc_feedsend.asp";
sStyle = "width=800,height=700,scrollbars=1,resizable=1";
openGeneralPopup( sUrl, '', sStyle );	
}
else if (sPar == "FEEDSUMMARY")
{
sUrl = "tf_sdc_feedsend.asp?FEEDSUMMARY=Y";
sStyle = "width=800,height=700,scrollbars=1,resizable=1";
openGeneralPopup( sUrl, '', sStyle );	
}
else if (sPar == "FEEDHISTORY")
{
sUrl = "tf_sdc_feedhistory.asp";
sStyle = "width=800,height=700,scrollbars=1,resizable=1";
openGeneralPopup( sUrl, '', sStyle );	
}
}
function OnClickRetailCheckBox()
{
var oElem ;
oElem = document.getElementById("chkRetail") ;
if(oElem && oElem.checked == true)
{
oElem = document.getElementById("chkRetailSyndicateManager") ;
if(oElem) oElem.checked = true ;
oElem = document.getElementById("chkRetailUS") ;
if(oElem) oElem.checked = true ;
oElem = document.getElementById("chkRetailInternational") ;
if(oElem) oElem.checked = true ;
}
else if (oElem)
{
oElem = document.getElementById("chkRetailSyndicateManager") ;
if(oElem) oElem.checked = false ;
oElem = document.getElementById("chkRetailUS") ;
if(oElem) oElem.checked = false ;
oElem = document.getElementById("chkRetailInternational") ;
if(oElem) oElem.checked = false ;
}
}
function OnClickRetailSubCheckBox()
{
var oElem1, oElem2, oElem3, oElem;
var bChecked1, bChecked2, bChecked3, bChecked;
bChecked1 = true ;
bChecked2 = true ;
bChecked3 = true ;
oElem1 = document.getElementById("chkRetailSyndicateManager") ;
if(oElem1 && oElem1.checked == false) bChecked1 = false ;
oElem2 = document.getElementById("chkRetailUS") ;
if(oElem2 && oElem2.checked == false) bChecked2 = false ;
oElem3 = document.getElementById("chkRetailInternational") ;
if(oElem3 && oElem3.checked == false) bChecked3 = false ;
if(bChecked1 == false && bChecked2 == false && bChecked3 == false)
{
bChecked = false ;
}
if(bChecked1 == true && bChecked2 == true && bChecked3 == true)
{
bChecked = true ;
}
oElem = document.getElementById("chkRetail") ;
if(oElem) oElem.checked = bChecked;
}
function CheckAndDisableCheckBox(sCheckBoxName)
{
var oElem ;
oElem = document.getElementById(sCheckBoxName) ;
if(oElem) 
{
oElem.checked = true ;
oElem.disabled = true;
}
}
function EnableCheckBox(sCheckBoxName, bEnable)
{
var oElem ;
oElem = document.getElementById(sCheckBoxName) ;
if(oElem) 
{
oElem.disabled = !bEnable;
}
}
