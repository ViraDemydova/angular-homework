function onPageLoad()
{
var oTB = document.all("RevenuesCtrl");
oTB.bstrIssueDetails = document.frmMain.hidIssueDetailsXml.value;
oTB.bstrTrancheDetails = document.frmMain.hidTrancheDetailsXml.value;
oTB.bstrProductDetail = document.frmMain.hidProductDetailsXml.value;
oTB.bstrSyndMemByIssue = document.frmMain.hidSyndicateMembersXml.value;
oTB.bstrCurrencies = document.frmMain.hidCurrencyXml.value;
oTB.bstrRevenuesByIssue = document.frmMain.hidRevenuesByIssueXml.value;
oTB.bstrMiscRevTypes = document.frmMain.hidMiscRevTypesXml.value;
oTB.bstrFeeProduct = document.frmMain.hidFeeProductXml.value;
oTB.bstrGlobalCoordinators = document.frmMain.hidGlobalCoordinatorsXml.value;
oTB.bstrPositionCalc = document.frmMain.hidPositionCal.value;
oTB.bstrSignOffUpId = document.frmMain.hidUpId.value;
oTB.bstrUserName = document.frmMain.hidUserName.value;
oTB.bDealReadOnly = (document.frmMain.hidReadOnly.value == "True");
oTB.bFinalProcessingRole = (document.frmMain.hidFinalProcessingRole.value == "True");
oTB.bDirShrProg = (document.frmMain.hidDirShrProg.value == "true");
oTB.bIntDistribution = (document.frmMain.hidIntDistribution.value == "true");
oTB.bIsLehman = (document.frmMain.hidIsLehman.value == "true");
oTB.Refresh();
ResizeActiveXControl();
}
function CheckConditionallyRequiredFields( frm, arrFieldsInError )
{
} 
function submitPage( frm , action )
{
switch (action)
{
case "SaveChanges" :
break;
case "RevertToSaved" :
window.location.reload();
break;
case "Cancel" :
break;
case "AddReg" :
break;
}
}
function ResizeActiveXControl()
{
var oMB = document.all("RevenuesCtrl");
var oElement=oMB;
var lOffsetX=0;
var lOffsetY=0;
while(oElement)
{
lOffsetX+=oElement.offsetLeft;
lOffsetY+=oElement.offsetTop;
oElement=oElement.offsetParent
}
oMB.OnFrameSize(document.body.offsetWidth-lOffsetX, document.body.offsetHeight-lOffsetY-200);
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
function openCEFMFCalculationPage(iss_id)
{
var sUrl = "tranche_economics_cef_mgmtfee_calc_popup.asp?hidIssueId="+iss_id;
var sStyle = "width=650,height=450,scrollbars=1,resizable=1";
_openGeneralPopup( sUrl, '', sStyle );	
}
function openInternalDistributionAmountPage(iss_id)
{
var frm = document.frmMain;
var sUrl = "/aspx/UI/TrancheEconomics/InternalDistributionAmount.aspx?iss_id=" + iss_id;
openGeneralPopup(sUrl, "", "width=670, height=520, scrollbars=1, resizable=1");
}
function openWiresInstructionLetter()
{
var sUrl = "/aspx/UI/Reports/WiresInstructionLetter.aspx"; 
window.location = sUrl;
}
