<!-- 
function onPageLoad()
{
menuShow('accounting_recap', 'show');
var oAcct = document.all("AccountingRecapCtrl");
if (document.frmMain.hidReadOnly.value == "True")
oAcct.bDealReadOnly = true;
else
oAcct.bDealReadOnly = false; 
if (document.frmMain.hidUseQtyInd.value == "True")
oAcct.bUseQty = true;
else
oAcct.bUseQty = false; 
if (document.frmMain.hidOverallotmentExist.value == "True")
oAcct.bOverallotmentExist = true;
else
oAcct.bOverallotmentExist = false; 
oAcct.bstrIssueID = document.frmMain.hidIssueId.value;
oAcct.bstrTrancheDetails = document.frmMain.hidTrancheDetailsXml.value;
oAcct.bstrIssueDetails = document.frmMain.hidIssueDetailsXml.value;
oAcct.bstrSyndicateMembers = document.frmMain.hidSyndicateMembersXml.value;
oAcct.bstrProductDetails = document.frmMain.hidProductDetailsXml.value;
oAcct.bstrFeeProduct = document.frmMain.hidFeeProductXml.value;
oAcct.bstrCurrencies = document.frmMain.hidCurrencyXml.value;
oAcct.bstrRevenueTypes = document.frmMain.hidRevenueTypesXml.value;
oAcct.bstrRevenues = document.frmMain.hidRevenues.value;
oAcct.bstrBrackets = document.frmMain.hidBrackets.value;
oAcct.bstrSyndicateRoles = document.frmMain.hidSyndicateRoles.value;
oAcct.bstrBrokers = document.frmMain.hidBrokers.value;
oAcct.bEditDesignations = (document.frmMain.hidEnterNLDesigFromRecap.value == 1);
oAcct.bstrIssueExpenses = document.frmMain.hidIssueExpenses.value;
oAcct.bstrTrancheExpenses = document.frmMain.hidTrancheExpenses.value;
oAcct.Refresh();
ResizeActiveXControl();
}
function CheckConditionallyRequiredFields( frm, arrFieldsInError )
{
}
function submitPage( frm , action )
{
}
function ResizeActiveXControl()
{
var oAcct = document.all("AccountingRecapCtrl");
var oElement=oAcct;
var lOffsetX=0;
var lOffsetY=0;
while(oElement)
{
lOffsetX+=oElement.offsetLeft;
lOffsetY+=oElement.offsetTop;
oElement=oElement.offsetParent
}
oAcct.OnFrameSize(document.body.offsetWidth-lOffsetX, document.body.offsetHeight-lOffsetY-90);
}
function getDate()
{
showCalendar('frmMain.dtDate')
}
function onCalendarChanged(elementName)
{
var oAcct = document.all("AccountingRecapCtrl");
oAcct.bstrInputDate = document.frmMain.dtDate.value;
}
function OpenSyndicateCommentPopupWindow( sIssId, sTrnId, sSmId )
{
var strURL = "AccountingRecap_SyndicateComment_popup.asp?iss_id=" + sIssId + "&trn_id=" + sTrnId + "&sm_id=" + sSmId;
openGeneralPopup(strURL, '', 'width=450,height=200,toolbar=no,scrollbars=yes,menubar=no,resizable=yes');
}
function ChangeParticipantSortOrder( sIssueId, sTrnId )
{
var sUrl = "syndpart_sort_order_popup.asp?IssueId="+sIssueId+"&TrancheId="+sTrnId+"&Referer=AccRecap";
var sStyle = "width=400,height=400,scrollbars=1,resizable=1";
openGeneralPopup( sUrl, '', sStyle );	
}
function ReplaceBroker( sIssueId )
{
var sUrl = "syndpart_replace_broker.asp?IssueId=" + sIssueId + "&CalledFrom=accounting_recap&replace=broker";
var sStyle = "width=700,height=600,scrollbars=1,resizable=1";
openGeneralPopup( sUrl, '', sStyle );	
}
function ReplaceSubsidiary( sIssueId )
{
var sUrl = "syndpart_replace_broker.asp?IssueId=" + sIssueId + "&CalledFrom=accounting_recap&replace=subsidiary";
var sStyle = "width=700,height=600,scrollbars=1,resizable=1";
openGeneralPopup( sUrl, '', sStyle );	
}
