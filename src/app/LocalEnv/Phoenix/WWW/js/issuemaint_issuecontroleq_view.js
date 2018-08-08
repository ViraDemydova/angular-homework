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
if (!document.frmMain.chkCapMkts)
return; 
if(
(document.frmMain.chkCapMkts.checked == true) &&
(document.frmMain.chkBanking.checked == true) &&
(document.frmMain.chkFinance.checked == true) &&
(document.frmMain.chkSalesInst.checked == true) && (document.frmMain.hidselSalesInstitution.value == "0") &&
(document.frmMain.chkSalesMM.checked == true) && (document.frmMain.hidselMiddleMarkets.value == "0") &&
(!document.frmMain.chkRetailSyndicateManager || document.frmMain.chkRetailSyndicateManager.checked == true) &&
(!document.frmMain.chkRetailUS || document.frmMain.chkRetailUS.checked == true) &&
(!document.frmMain.chkRetailInternational || document.frmMain.chkRetailInternational.checked == true) 
)
{
document.frmMain.chkAllInternal.checked = true;
onAllSelected(document.frmMain.chkAllInternal, document.frmMain.chkInternal);
onAllSelectedSalesDropdown(document.frmMain.selSalesInstitution);
onAllSelectedSalesDropdown(document.frmMain.selMiddleMarkets);
EnableCheckBox("chkRetail", false) ; 
EnableCheckBox("chkRetailSyndicateManager", false) ; 
EnableCheckBox("chkRetailUS", false) ; 
EnableCheckBox("chkRetailInternational", false) ; 
}
}
function initializeExternal() 
{
if (!frmMain.chkExternal)
return; 
var count = 0;
for( var i=0; i<frmMain.chkExternal.length; i++)
{
if (frmMain.chkExternal[i].checked == true)
++count;
}
if (count == frmMain.chkExternal.length) 
{
if(frmMain.chkBigdoughIssuer.checked)
frmMain.chkAllExternal.checked = true;
onAllSelected(document.frmMain.chkAllExternal, document.frmMain.chkExternal);
}
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
function checkCurrentlyMarketedAndECCEnabled()
{
var EccRequiredInd = document.frmMain.hidEccRequiredInd.value;	
var EccApprovedInd = document.frmMain.hidEccApprovedInd.value;	
var stateID = document.frmMain.selStates.value;
var announcedVal = 20;	
if(stateID == announcedVal && EccRequiredInd == true && EccApprovedInd == "False")
{	
return confirm("ECC Approved checkbox in Deal Edit page is unchecked. \nDo you wish to proceed with launching the deal?");	
}	
return true;
}
function submitPage( frm , action )
{
switch (action)
{ 
case "update" :
var frm = document.frmMain;
if (!ValidateForm(frm)) 
return;
if (!ValidateShowToSyndicate())
return;
if (!checkCurrentlyMarketedAndECCEnabled())
return;
var oTrnID = eval("document.frmMain.hidTrnID");
var iTrancheCount = document.frmMain.hidTrancheCount.value;
var i = 0;
while(i < iTrancheCount)
{
var sTrnId;
if (iTrancheCount > 1)
sTrnId = oTrnID[i].value;
else
sTrnId = oTrnID.value;
var oRadIOIButtns = eval("document.frmMain.radTakeIOIStatus" + sTrnId);
if((oRadIOIButtns[0].checked || oRadIOIButtns[2].checked)
&& frm.chkCapMkts.checked 
&& frm.selStates.value == 20
&& !frm.chkSalesInst.checked
&& !frm.chkSalesMM.checked
)
{
var ret = confirm("You have opened the books but the deal is not announced to Sales. Do you wish to proceed?");
if (ret == false)
return;
else
break;
}
i++;
}
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
if(frm.hidShowTMCDealInvolvement.value == "1")
frm.txtMarketsDealCd.disabled = false;
frm.hidResend.value = "False"; 
if(!isValidTMCDeal(document.frmMain))
return;
if (frm.hidPreviousStateID.value != '30' && frm.selStates.options[frm.selStates.options.selectedIndex].value == '30' && frm.hidShowWarningMsgFRQ.value > 0)
{
var co = RSExecute('rs_IssueMaint_server.asp', 'js_DoesOrderExistWithoutFRQ', frm.hidIssueId.value);
var ret = co.return_value.toString().toLowerCase();
if (ret == 'true')
{
alert('Warning: Orders exist that do not have proper Rule 2790 documentation. Please see the IOI Free Riding Questionnaire Report for the list of investors.');
}
}
var iTrancheCount = document.frmMain.hidTrancheCount.value;
if(iTrancheCount > 0)
{
if(iTrancheCount == 1)
{
var oTrnID = eval("document.frmMain.hidTrnID");
if((oTrnID != null) && (oTrnID.value != ""))
{
var oRadButtns = eval("document.frmMain.radPreviewAllocation" + oTrnID.value);
oRadButtns[0].disabled = false;
var oChkAllowPricePercOfPar = eval("document.frmMain.chkAllowPricePercOfPar" + oTrnID.value);
var oHidAllowPricePercOfPar = eval("document.frmMain.hidAllowPricePercOfPar" + oTrnID.value);
if (oChkAllowPricePercOfPar != null)
{
if (oChkAllowPricePercOfPar.checked==false && oHidAllowPricePercOfPar.value=="True")
{
if (confirm("Manually generated % of par demand columns will also be deleted. Do you wish to continue?") == false)
{
oChkAllowPricePercOfPar.checked = true;
return;
}
}
}
}
}
else
{
var i = 0;
while(i < iTrancheCount)
{
var oTrnID = eval("document.frmMain.hidTrnID[" + i + "]");
if((oTrnID != null) && (oTrnID.value != ""))
{
var oRadButtns = eval("document.frmMain.radPreviewAllocation" + oTrnID.value);
oRadButtns[0].disabled = false;
var oHidAllowPricePercOfPar = eval("document.frmMain.hidAllowPricePercOfPar" + oTrnID.value);
var oChkAllowPricePercOfPar = eval("document.frmMain.chkAllowPricePercOfPar" + oTrnID.value);
if (oChkAllowPricePercOfPar != null)
{
if (oChkAllowPricePercOfPar.checked==false && oHidAllowPricePercOfPar.value=="True")
{
if (confirm("Manually generated % of par demand columns will also be deleted. Do you wish to continue?") == false)
{
oChkAllowPricePercOfPar.checked = true;
return;
}
}
}
}
else
break;
i++;
}
}
}
frm.method = "POST";
frm.action = "util_submit_action2.asp";
frm.hidSuppressRedirect.value = "1" ;
frm.submit();
break;
case "reverttosave" :
window.location.reload();
break;
case "sendtoretail" :
var oElem1, oElem2, oElem3, oElem;
var bChecked1, bChecked2, bChecked3, bChecked; 
bChecked1 = false;
bChecked2 = false;
bChecked3 = false;
oElem1 = document.getElementById("chkRetailSyndicateManager") ;
oElem2 = document.getElementById("chkRetailUS") ; 
oElem3 = document.getElementById("chkRetailInternational") ; 
if(oElem1)
bChecked1 = oElem1.checked;
if(oElem2)
bChecked2 = oElem2.checked;
if(oElem3)
bChecked3 = oElem3.checked;
if (bChecked1 || bChecked2 || bChecked3)
{ 
frm.action = "SendToRetail.asp?issue_id=" + document.frmMain.hidIssueId.value;
frm.submit();
}
else 
{
alert('Deal not sent. Calendar access control for retail is unchecked.');
}
break ;
}
}
function submitPage2( frm, action, TrnID )
{
switch (action)
{ 
case "ops_verify_save" :
frm.hidOpsTrnID.value = TrnID;
frm.hidAction.value = "VerifyUnverifyTrancheFromOpsCtrlPage";
frm.action = "util_submit_action.asp";
frm.submit();
break;
case "ops_lock_save" :
frm.hidOpsTrnID.value = TrnID;
frm.hidAction.value = "LockUnlockTrancheFromOpsCtrlPage";
frm.action = "util_submit_action.asp";
frm.submit();
break;
case "ops_allowtradesplit_save" :
frm.hidOpsTrnID.value = TrnID;
frm.hidAction.value = "EnableDisableTradeSplitForSales";
frm.action = "util_submit_action.asp";
frm.submit(); 
break;
case "ops_allowtradeprocessing_save":
frm.hidOpsTrnID.value = TrnID;
frm.hidAction.value = "AllowTradeProcessing";
frm.action = "util_submit_action.asp";
frm.submit(); 
break;
case "ops_resendtrades_save":
frm.hidOpsTrnID.value = TrnID;
frm.hidAction.value = "ResendTradesForReprocessing";
frm.action = "util_submit_action.asp";
frm.submit(); 
break;
}
}
function ToggleSection(strElem) 
{
var strWhichEl = eval("Section" + strElem + "Child");
var strWhichIm = eval("Section" + strElem + "Parent.document.images['ImEx" + strElem + "']");
if (strWhichEl.style.display == 'none') {
strWhichEl.style.display = 'block';
strWhichIm.src = "../images/collapse.gif";
}
else {
strWhichEl.style.display = 'none';
strWhichIm.src = "../images/expand.gif";
}
}
function ToggleOpsSection(strElem) 
{
var strWhichEl = eval("Section" + strElem + "Child");
var strWhichIm = eval("Section" + strElem + "Parent.document.images['ImOpsEx" + strElem + "']");
if (strWhichEl.style.display == 'none') {
strWhichEl.style.display = 'block';
strWhichIm.src = "../images/collapse.gif";
}
else {
strWhichEl.style.display = 'none';
strWhichIm.src = "../images/expand.gif";
}
}
function AllowTradeSplitChanged( lTrnId )
{
var oElem, sBDAcctNum = "", sSecurityNumber = "" ;
oElem = document.getElementById("hidBDAcctNum") ;
if(oElem) sBDAcctNum = oElem.value ;
oElem = document.getElementById("hidSecurityNum_" + lTrnId) ;
if(oElem) sSecurityNumber = oElem.value ;
oElem = document.getElementById("chkAllowTradeSplit" + lTrnId) ;
if(oElem && oElem.checked)
{
if(sBDAcctNum == "" || sSecurityNumber == "")
{
alert("Please enter the Security Number and the Bill and Delivery number in order to allow Designations and TradeSplit") ;
oElem.checked = false ;
return ;
}
}
SetTrnChanged(lTrnId);
}
function ConfirmAllowPrice(checkbox)
{
if ((checkbox != null) && (checkbox.checked == false))
{
if (confirm("Manually generated % of par demand columns will also be deleted. Do you wish to continue?") == false)
{
checkbox.checked = false;
return false;
}
}	
return true;
}
function SetTrnChanged( lTrnId )
{
document.all.item("hidTrancheChanged"+lTrnId).value = "1";
}
function SetOpsTrnChanged( lTrnId )
{
document.all.item("hidOpsTrancheChanged"+lTrnId).value = "1";
}
function isNotSalesPermissioned()
{
return (document.all.item("selSalesInstitution").selectedIndex==1 &&
document.all.item("selMiddleMarkets").selectedIndex==1)	
}
function ToggleEuroAsiaProcess( type, trnID )
{
var frm = document.frmMain;
var chkEuroProcess = document.all.item("chkEuroProcess"+trnID);
var chkAsiaProcess = document.all.item("chkAsiaProcess"+trnID);
if(chkEuroProcess != null && chkAsiaProcess != null)
{
if (type == 'asia')
{
chkEuroProcess.checked = false;
}
if (type == 'euro')
{
chkAsiaProcess.checked = false;
} 
}
}
function onInvestorChanged(strChkBoxName)
{
if(isNotSalesPermissioned() &&
document.frmMain.item(strChkBoxName).checked)
{
alert(document.frmMain.hidPermissionSalesAlert.value);
}
}
function AlertFlagChanged( strchkboxName, lTrnId )
{
if (isNotSalesPermissioned() &&
document.all.item(strchkboxName+lTrnId).checked)
{
alert(document.frmMain.hidPermissionSalesAlert.value);
}
}
function HistoryPopup()
{
openGeneralPopup('issuemaint_dealstatehistory_popup.asp', '', 'width=600,height=300,resizable,toolbar=no,scrollbars,menubar=no'); 
} 
function ShowEditLink( strLinkName, bShow )
{ 
document.all.item(strLinkName).style.display = (bShow==0) ? "none" : "block";
}
function openALV( frm, sTrnID )
{
var frm = document.frmMain;
var sUrl = "/aspx/UI/TradeSplit/ALVResults.aspx?TrnId="+sTrnID;
var sStyle = "width=800,height=400,toolbar=no,menubar=no,location=no,directories=no,resizable=yes,scrollbars=yes,left=100,top=50";
var popupGeneral = window.open( sUrl, 'idealALV', sStyle );
popupGeneral.focus();
}
function openProductionCreditReport( frm, sIssID, sTrnID )
{
var frm = document.frmMain;
var sUrl = "/aspx/UI/TradeSplit/ProductionCreditReport.aspx?IssId=" + sIssID + "&TrnId=" + sTrnID;
var sStyle = "width=800,height=400,toolbar=no,menubar=no,location=no,directories=no,resizable=yes,scrollbars=yes,left=100,top=50";
var popupGeneral = window.open( sUrl, 'idealProductionCreditReport', sStyle );
popupGeneral.focus();
}
function tradeVerification( frm, sTrnID )
{
var sUrl = "/asp/trade_verification_popup.asp?TrancheId="+sTrnID;
var sStyle = "width=800,height=400,toolbar=no,menubar=no,location=no,directories=no,resizable=yes,scrollbars=yes,left=100,top=50";
var popupGeneral = window.open( sUrl, 'idealTradeVerification', sStyle );
popupGeneral.focus();
}
function SendPotAllocation(sTrnId, sTrnNm)
{
var ret = confirm("Allocations will be sent to the Syndicate Connect brokers on the " + sTrnNm + " tranche. Are you sure?");
if (ret)
{
window.open('', 'syndcon_submit','height=600,width=800');
window.setTimeout('_SendPotAllocation("'+sTrnId+'")', 400); 
}
}
function SalesCreditsDesignation(sTrnId)
{
var sUrl = "/aspx/UI/TradeSplit/SalesCreditsDesignation.aspx?trn_id=" + sTrnId + "&credit_calculation_type=1";
var sStyle = "width=950,height=700,toolbar=no,menubar=no,location=no,directories=no,resizable=yes,scrollbars=yes,left=50,top=50";
var popupGeneral = window.open( sUrl, 'idealSalesCreditsDesignation', sStyle );
popupGeneral.focus();
}
function ManagementFeeProcessing(sTrnId)
{
var sUrl = "/aspx/UI/TradeSplit/SalesCreditsDesignation.aspx?trn_id=" + sTrnId + "&credit_calculation_type=2";
var sStyle = "width=950,height=700,toolbar=no,menubar=no,location=no,directories=no,resizable=yes,scrollbars=yes,left=50,top=50";
var popupGeneral = window.open( sUrl, 'idealManagementFeeProcessing', sStyle );
popupGeneral.focus();
}
function IncentiveFeeProcessing(sTrnId)
{
var sUrl = "/aspx/UI/TradeSplit/SalesCreditsDesignation.aspx?trn_id=" + sTrnId + "&credit_calculation_type=3";
var sStyle = "width=950,height=700,toolbar=no,menubar=no,location=no,directories=no,resizable=yes,scrollbars=yes,left=50,top=50";
var popupGeneral = window.open( sUrl, 'idealIncentiveFeeProcessing', sStyle );
popupGeneral.focus();
}
function _SendPotAllocation(sTrnId)
{
var frm = document.frmMain;
var old_target = frm.target;
var old_action = frm.action;
var old_hidSCTrancheId = frm.hidSCTrancheId.value;
var old_hidAction = frm.hidAction.value;
var old_hidProgID = frm.hidProgID.value;
frm.target = "syndcon_submit";
frm.hidSCTrancheId.value = sTrnId;
frm.hidAction.value = "PublishAlloc";
frm.hidProgID.value = "SyndCon_usr.SyndCon";
frm.action = "util_submit_action.asp";
frm.submit();
frm.target = old_target;
frm.action = old_action;
frm.hidSCTrancheId.value = old_hidSCTrancheId;
frm.hidAction.value = old_hidAction;
frm.hidProgID.value = old_hidProgID;
}
function ShowEditLinkForSelect( strSelName, strLinkName, bShow )
{ 
document.all.item(strLinkName).style.display = (document.all.item(strSelName).selectedIndex==2) ? "block" : "none";
var hidSel = "hid" + strSelName;	
var selbox = document.all.item(strSelName);
document.all.item(hidSel).value = selbox.options.selectedIndex;
if(strSelName == "selSalesInstitution")
document.all.item("chkSalesInst").checked = (selbox.options.selectedIndex == 1) ? false:true;
else
document.all.item("chkSalesMM").checked = (selbox.options.selectedIndex == 1) ? false:true;
if(selbox.options.selectedIndex == 1)
AlertNoneSelected(); 
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
function fillStatesTypeDropDown(arrStatesTypes)
{
var stateID = document.frmMain.selStates.value;
document.frmMain.selStates.length = 0;
var counter = 0;
var settledVal = 40;
for(var i=1; i< arrStatesTypes.length; i++) 
{
var stateNum = parseInt(arrStatesTypes[i][0], 10);
if ((stateNum == stateID) || ((stateNum - 10) == stateID) || ((stateNum + 10) == stateID))
{
if ( stateNum != settledVal || (stateNum == settledVal && stateNum == stateID))
{
var opt = new Option(arrStatesTypes[i][1], arrStatesTypes[i][0]);
var sel = document.frmMain.selStates;
sel.options[counter++] = opt; 
if(sel.options[counter-1].value == stateID)
sel.options[counter-1].selected = true;
} 
}
}
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
var g_checkStatusDate = null;
function on_select_add_status()
{
if (!document.frmMain.selAddStatus)
return; 
var sStatusID = new Array();
var s = document.frmMain.selAddStatus.options[document.frmMain.selAddStatus.selectedIndex].value;
sStatus = s.split(',');
if (sStatus[0] == 22 || sStatus[0] == 23 || sStatus[0] == 122 || sStatus[0] == 121) {
document.frmMain.dtTxtAddStatusDt.disabled = false;
calendarLink.style.visibility='visible';
g_checkStatusDate = true;
}
else {
document.frmMain.dtTxtAddStatusDt.disabled = true;
calendarLink.style.visibility='hidden';
g_checkStatusDate = false;
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
function enableDealCode()
{
if (!document.frmMain.selDealInvolvement)
return; 
if(document.frmMain.hidShowTMCDealInvolvement.value == "1")
{
var Involvement = document.frmMain.selDealInvolvement.value;
if (Involvement == 2)
document.frmMain.txtMarketsDealCd.disabled = false;
else
document.frmMain.txtMarketsDealCd.disabled = true;
}
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
function populateHidden( frm )
{
var sStatus = new Array();
var s = frm.selAddStatus.options[frm.selAddStatus.selectedIndex].value;
if (s.indexOf(",") != -1) 
{
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
function onAllSelected( chkAll, chkbox )
{
for( var i=0; i<chkbox.length; i++)
{
if(chkAll.checked == true)
{
chkbox[i].checked=	chkAll.checked;
chkAll.value = "all"; 
}
chkbox[i].disabled=	chkAll.checked;
}
if(chkAll.checked == true && chkAll.name == "chkAllExternal")
document.frmMain.chkBigdoughIssuer.checked = true;
if(chkAll.checked == false)
{
chkAll.value = "";
EnableCheckBox("chkRetail", true) ; 
EnableCheckBox("chkRetailSyndicateManager", true) ; 
EnableCheckBox("chkRetailUS", true) ; 
EnableCheckBox("chkRetailInternational", true) ;
}
}
function onAllSelectedSalesDropdown(selDDown)
{
if (document.frmMain.chkAllInternal.checked == false)
{
selDDown.disabled = false;
return;
}
selDDown.selectedIndex = 0;
selDDown.disabled = true;
document.all.item("Lnk_selSalesInstitution").style.display = "none"
document.all.item("Lnk_selMiddleMarkets").style.display = "none"
var hidSel = "hid" + selDDown.name;
OnSelectSalesDropDown(selDDown,document.getElementById(hidSel)) ; 
CheckAndDisableCheckBox("chkRetail") ; 
CheckAndDisableCheckBox("chkRetailSyndicateManager") ; 
CheckAndDisableCheckBox("chkRetailUS") ; 
CheckAndDisableCheckBox("chkRetailInternational") ; 
}
function CheckAndDisableCheckBox(sCheckBoxName)
{
var oElem = document.getElementById(sCheckBoxName) ;
if(oElem) 
{
oElem.checked = true ;
oElem.disabled = true;
}
}
function EnableCheckBox(sCheckBoxName, bEnable)
{
var oElem = document.getElementById(sCheckBoxName) ;
if(oElem) 
{
oElem.disabled = !bEnable;
}
}
function OnChangeDealState()
{
var stateIDPrev = document.frmMain.hidPreviousStateID.value;
var stateID = document.frmMain.selStates.value;
var buttonName1 = "";
var buttonName2 = "";
var buttonName3 = "";
var buttonName4 = "";
var buttonName5 = "";
var disStatus = true;
if( stateID == 10)
{
buttonName1 = "document.frmMain.radTakeIOIStatus";
buttonName2 = "document.frmMain.radPreviewAllocation";
buttonName3 = "document.frmMain.radConfirmAllocation";
buttonName4 = "document.frmMain.radShowAllocation";	
buttonName5 = "Lnk_radTakeIOIStatus";
disStatus = true; 
}
if(stateID == 20)
{
buttonName1 = "document.frmMain.radTakeIOIStatus";
buttonName2 = "document.frmMain.radPreviewAllocation";
buttonName3 = "document.frmMain.radConfirmAllocation";
buttonName4 = "document.frmMain.radShowAllocation";
buttonName5 = "Lnk_radTakeIOIStatus";
disStatus = false; 
}
if(stateID >= 30)
{
buttonName1 = "document.frmMain.radTakeIOIStatus";
buttonName2 = "document.frmMain.radPreviewAllocation";
buttonName3 = "document.frmMain.radConfirmAllocation";
buttonName4 = "document.frmMain.radShowAllocation";
buttonName5 = "Lnk_radTakeIOIStatus";
disStatus = false; 
}
var iTrancheCount = document.frmMain.hidTrancheCount.value;
if(iTrancheCount > 0)
{
if(iTrancheCount == 1)
{
var oTrnID = eval("document.frmMain.hidTrnID");
if((oTrnID != null) && (oTrnID.value != ""))
{
if(buttonName1 != "")
{
disableRadioButtons(buttonName1, oTrnID.value, "1", disStatus);
if (stateID == 10 )
{
var elem = eval(buttonName1 + oTrnID.value);
elem[1].checked = true;
SetTrnChanged( oTrnID.value );
ShowEditLink(buttonName5 + oTrnID.value,0);
}
}
if(buttonName2 != "")
disableRadioButtons(buttonName2, oTrnID.value, "0", disStatus);
if(buttonName3 != "")
if( stateID <= 20)
disableRadioButtons(buttonName3, oTrnID.value, "1", true);
else
disableRadioButtons(buttonName3, oTrnID.value, "1", disStatus);
if(buttonName4 != "")
if( stateID <= 20)
disableRadioButtons(buttonName4, oTrnID.value, "1", true);
else
disableRadioButtons(buttonName4, oTrnID.value, "1", disStatus);
}
}
else
{
var i = 0;
while(i < iTrancheCount)
{
var oTrnID = eval("document.frmMain.hidTrnID[" + i + "]");
if((oTrnID != null) && (oTrnID.value != ""))
{
if(buttonName1 != "")
{
disableRadioButtons(buttonName1, oTrnID.value, "1", disStatus);
if (stateID == 10 )
{
var elem = eval(buttonName1 + oTrnID.value);
elem[1].checked = true;
SetTrnChanged( oTrnID.value );
ShowEditLink(buttonName5 + oTrnID.value,0);
}
}
if(buttonName2 != "")
disableRadioButtons(buttonName2, oTrnID.value, "0", disStatus);
if(buttonName3 != "")
{
if( stateID <= 20)
disableRadioButtons(buttonName3, oTrnID.value, "1", true);
else 
disableRadioButtons(buttonName3, oTrnID.value, "1", disStatus);
}
if(buttonName4 != "")
{
if( stateID <= 20)
disableRadioButtons(buttonName4, oTrnID.value, "1", true);
else 
disableRadioButtons(buttonName4, oTrnID.value, "1", disStatus);
}
}
else
break;
i++;
}
}
}
}
function disableRadioButtons(buttonName, TrnID, vAll, disStatus)
{
var oRadButtns = eval(buttonName + TrnID);
if(vAll == "1")
oRadButtns[0].disabled = disStatus;
oRadButtns[1].disabled = disStatus;
oRadButtns[2].disabled = disStatus;
}
function OnClickRetailCheckBox()
{
var oElem = document.getElementById("chkRetail") ;
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
function OnClickInternalSales(chkSales, selDDown)
{
if(chkSales.checked != true)
{
selDDown.selectedIndex = 1;	
}
else
{
selDDown.selectedIndex = 0;
}
var hidSel = "hid" + selDDown.name;
OnSelectSalesDropDown(selDDown,document.getElementById(hidSel)) ;
ShowEditLinkForSelect(selDDown.name, 'Lnk_' + selDDown.name,0)
}
function OnSelectSalesDropDown(selDDown, hidSel)
{
hidSel.value = selDDown.selectedIndex	
}
function onAllExternalSelected()
{
var frm = document.frmMain;
if (frm.chkAllExternal.checked == true)
frm.chkCapMkts.checked = true;
}
function resendTrades(sTrnId, sConfirm)
{
var chkSendTradeForReprocess = 'chkSendTradeForReProcessing' + sTrnId;
if(document.getElementById(chkSendTradeForReprocess) != null &&
document.getElementById(chkSendTradeForReprocess).checked == true) 
{
if ( confirm(sConfirm)) 
submitPage2(frmMain, 'ops_resendtrades_save', sTrnId);
}
else
alert("Select Send Trades for reprocessing checkbox.");
}
