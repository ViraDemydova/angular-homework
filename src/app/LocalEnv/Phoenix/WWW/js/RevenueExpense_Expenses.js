<!-- 
function onPageLoad()
{
var oEx = document.all("ExpensesCtrl");
oEx.bstrIssueDetails = document.frmMain.hidIssueDetailsXml.value;
oEx.bstrTrancheDetails = document.frmMain.hidTrancheDetailsXml.value;
oEx.bstrSyndMemByIssue = document.frmMain.hidSyndicateMembersXml.value;
oEx.bstrCurrencies = document.frmMain.hidCurrencyXml.value;
oEx.bstrIssueExpenses = document.frmMain.hidIssueExpenses.value;
oEx.bstrTrancheExpenses = document.frmMain.hidTrancheExpenses.value;
oEx.bstrExpenseControlFlags = document.frmMain.hidExpenseControlFlags.value;
oEx.bstrTotalRevenues = document.frmMain.hidTotalRevenues.value;
oEx.bstrRevenues = document.frmMain.hidRevenuesByIssueXml.value;
oEx.bstrProductDetail = document.frmMain.hidProductDetailsXml.value;
oEx.bstrMiscRevenueTypes = document.frmMain.hidMiscRevenueTypes.value;
oEx.bstrMiscRevenues = document.frmMain.hidMiscRevenues.value;
oEx.bstrSyndMemPcts = document.frmMain.hidSyndMemPcts.value;
oEx.bstrCustomExpenseTypes = document.frmMain.hidCustomExpenseTypes.value;
oEx.bstrPositionCalc = document.frmMain.hidPositionCal.value;
oEx.bstrSignOffUpId = document.frmMain.hidUpId.value;
oEx.bstrUserName = document.frmMain.hidUserName.value;
oEx.bManualFlipPenalty = (document.frmMain.hidManualFlipPenalty.value == "1");
oEx.bReadOnly = (document.frmMain.hidReadOnly.value == "True");
oEx.bDirShrProg = (document.frmMain.hidDirShrProg.value == "true");
oEx.bNonLead = (document.frmMain.hidNonLeadInd.value == "True");
oEx.Refresh();
ResizeActiveXControl();
}
function ResizeActiveXControl()
{
var oEx = document.all("ExpensesCtrl");
var oElement=oEx;
var lOffsetX=0;
var lOffsetY=110;
while(oElement)
{
lOffsetX+=oElement.offsetLeft;
lOffsetY+=oElement.offsetTop;
oElement=oElement.offsetParent
}
oEx.OnFrameSize(document.body.offsetWidth-lOffsetX, document.body.offsetHeight-lOffsetY);
}
function _openGeneralPopup( url, html, style )
{
try { 
openGeneralPopup( url, html, style ); 
} 
catch(e) {
}
}
function openIssueCommentsPage( iss_id, type )
{
var sUrl = "IssueMaint_comments_popup.asp?iss_id="+iss_id+"&type="+type;
var sStyle = "width=700,height=380,scrollbars=1,resizable=1";
_openGeneralPopup( sUrl, '', sStyle );	
}
