<!-- 
RSEnableRemoteScripting("/_ScriptLibrary");
function CheckConditionallyRequiredFields( frm, arrFieldsInError )
{
var arrMoreErrors = new Array();
arrMoreErrors = validateFilePriceLo(frm, arrFieldsInError);
var iFileAmt = frm.iTxtFileAmt.value;
if (document.frmMain.iTxtInitFileSize)
var txtFileSize = document.frmMain.iTxtInitFileSize.value;
else
var txtFileSize = document.frmMain.iTxtFileSize.value;
var iFileSize = new Number(txtFileSize.replace(/(\,)/g, "")); 
if (iFileAmt.length > 25) {
var arrError = FieldErrorInfo("iTxtFileAmt", 'File Amount exceeds the maximum amount allowed.', "", "", "File Amount");
arrMoreErrors[arrMoreErrors.length] = arrError;
}
var CapMktsTeam = frm.sTxtCapMktsTeam.value.length; 
var CapMktsTeamMaxLength = 64;
if ( CapMktsTeam > CapMktsTeamMaxLength ) {
var arrError = FieldErrorInfo("sTxtCapMktsTeam", 'The Capital Markets Team Field exceeds the maximum length allowed', "", "", "Capital Mkts. Team");
arrMoreErrors[arrMoreErrors.length] = arrError;
}
var Comments = frm.sTxtComments.value.length;
var CommentsMaxLength = 300;
if (Comments > CommentsMaxLength) {
var arrError = FieldErrorInfo("sTxtComments", 'The Comments Field exceeds the maximum length allowed', "", "", "Comments");
arrMoreErrors[arrMoreErrors.length] = arrError; 
}
var PricingComments = frm.txtPricingBasisComments.value.length;
var PricingCommentsMaxLength = 200;
if (PricingComments > PricingCommentsMaxLength) {
var arrError = FieldErrorInfo("txtPricingBasisComments", 'The Pricing Basis Comments Field exceeds the maximum length allowed', "", "", "Pricing Basis Comments");
arrMoreErrors[arrMoreErrors.length] = arrError; 
}
var Description = frm.sTxtDescription.value.length;
var DescriptionMaxLength = 4000;
if ( Description > DescriptionMaxLength ) {
var arrError = FieldErrorInfo("sTxtDescription", 'The Description exceeds the maximum length allowed', "", "", "Description");
arrMoreErrors[arrMoreErrors.length] = arrError;
}
if (frm.sTxtSalesDesc)
{
var SalesDescription = frm.sTxtSalesDesc.value.length;
var SalesDescriptionMaxLength = 200;
if ( SalesDescription > SalesDescriptionMaxLength ) {
var arrError = FieldErrorInfo("sTxtSalesDesc", 'The Note to Sales desk exceeds the maximum length allowed ('+SalesDescriptionMaxLength +" characters)", "", "", "Sales Description");
arrMoreErrors[arrMoreErrors.length] = arrError;
}
}
return (arrMoreErrors);
} 
function CustomValidation( frm, arrFieldsInError )
{
var errCount = 0;
var arrMoreErrors = new Array();
if (frm.selIndustry && frm.selIndustry.value == "-1")
{
var arrError = FieldErrorInfo("selIndustry", "Please select one.", "", "selIndustry", "Industry Sector");
arrMoreErrors[errCount] = arrError;
errCount++;
}	
return (arrMoreErrors);
} 
function ValidateFileSize(frm)
{
var IssueTypeCode = frm.hidIssueTypeCode.value;
if(IssueTypeCode == "C" || IssueTypeCode == "EU")
{
var iFileSize = new Number(frm.iTxtFileSize.value.replace(/(\,)/g, ""));
var iPrimarySize = new Number(frm.iTxtPrimarySize.value.replace(/(\,)/g, ""));
var iSecondarySize = new Number(frm.iTxtSecondarySize.value.replace(/(\,)/g, ""));
if( (iPrimarySize + iSecondarySize) != iFileSize)
{
return confirm(frm.hidFileSizeSaveConfirm.value);
}
return true;
}
return true;
}
function ValidateInteropDB(frm)
{
if(frm.selDLDatabase == null)
return true;
if(frm.chkDLEligible.checked != true)
return true;
var selDLDatabase = frm.selDLDatabase.value;
if( selDLDatabase <= 0)
{
alert("A DL Database has not been selected and must be selected in order to save the deal as DL Eligible.");
return false;
}
return true;
}
function submitPage( frm , action, brokerID )
{
switch (action)
{
case "savechanges" :
setIndustry(frm);
setExchangeTradedNotes(frm);
if(ValidateForm( frm ))
if(ValidateInteropDB(frm))
if(ValidateFileSize(frm))
{ 
frm.action = "/asp/specialutil_submit_action.asp";
frm.hidAction.value = "Update";
frm.submit();
}
break;
case "reverttosaved" :
window.location.reload();
break;
case "cancel" :
frm.action = "/asp/specialIssueMaint_DealDetails.asp";
frm.submit();
break;
case "deleteDeal" :
frm.action = "/asp/specialutil_submit_action.asp";
frm.hidAction.value = "Delete"
frm.submit();
break;
}
}
function deleteBookRunner(issID, brkID)
{
var result = RSExecute('rs_DealDetails.asp', 'js_DeleteBookRunner', issID, brkID);
if (result.return_value != 'Success')
{
alert(result.return_value);
return;
}
var oElem = document.getElementById(brkID);
oElem.style.display = "none";
}
function deleteGlobalCoordinator(issID, brkID)
{
var result = RSExecute('rs_DealDetails.asp', 'js_DeleteGlobalCoordinator', issID, brkID);
if (result.return_value != 'Success')
{
alert(result.return_value);
return;
}
var oElem = document.getElementById("gc"+brkID);
oElem.style.display = "none";
}
function submitToEditPage()
{
document.frmMain.hidSetEditAsNextPage.value = "Edit";
updateCurrAmount();
if(ValidateForm( document.frmMain ))
{ 
document.frmMain.action = "/asp/specialutil_submit_action.asp";
document.frmMain.hidAction.value = "Update";
document.frmMain.submit();
}
}
function updateConvertibleOfferPx()
{
if (document.frmMain.curTxtEstiOfferPx.value == "")
{	document.frmMain.curTxtEstiOfferPx.value = document.frmMain.fltParValue.value;
updateConvertibleProceeds();
}
}
function updateConvertibleFaceAmt()
{if (document.frmMain.iTxtFileSize.value !="" && document.frmMain.fltParValue.value !="")
{ var txtConvCurrFileSize = document.frmMain.iTxtFileSize.value;
var txtConvParValue = document.frmMain.fltParValue.value;
var itxtConvCurrFileSize = new Number(txtConvCurrFileSize .replace(/(\,)/g, ""));
var itxtConvParValue = new Number(txtConvParValue .replace(/(\,)/g, ""));
var iFileAmt = Math.round(itxtConvCurrFileSize * itxtConvParValue); 
document.frmMain.iTxtFileAmt.value = formatAmountString(iFileAmt.toString());
}
else{
document.frmMain.iTxtFileAmt.value = "";
return;
}
}
function updateConvertibleProceeds()
{if (document.frmMain.iTxtFileSize.value !="" && document.frmMain.curTxtEstiOfferPx.value !="")
{ var txtConvCurrFileSize = document.frmMain.iTxtFileSize.value;
var txtConvProceeds = document.frmMain.curTxtEstiOfferPx.value;
var itxtConvCurrFileSize = new Number(txtConvCurrFileSize .replace(/(\,)/g, ""));
var itxtConvProceeds = new Number(txtConvProceeds.replace(/(\,)/g, ""));
var iProceed = Math.round(itxtConvCurrFileSize * itxtConvProceeds); 
document.frmMain.curTxtProceeds.value = formatAmountString(iProceed.toString());
}
else{
document.frmMain.curTxtProceeds.value = "";
return;
}
}
function updateCurrAmount()
{
if (document.frmMain.iTxtFileSize.value == "")
var txtFileSize = document.frmMain.iTxtInitFileSize.value;
else
var txtFileSize = document.frmMain.iTxtFileSize.value;
if (document.frmMain.curTxtFilePrice) {
var curTxtFilePrice = document.frmMain.curTxtFilePrice.value;
var curTxtLaunchPrice = document.frmMain.curTxtLaunchPrice.value;
if (txtFileSize == "" || (curTxtFilePrice == "" && curTxtLaunchPrice == "")) {
document.frmMain.iTxtFileAmt.value = "";
return;
}
if (txtFileSize != "" && (curTxtFilePrice != "" || curTxtLaunchPrice != "")) {
var iTxtFileSize = new Number(txtFileSize.replace(/(\,)/g, ""));
var icurTxtFilePrice = new Number(curTxtFilePrice.replace(/(\,)/g, ""));
var icurTxtLaunchPrice = new Number(curTxtLaunchPrice.replace(/(\,)/g, ""));
var iFileAmt;
if (icurTxtLaunchPrice > 0)
iFileAmt = Math.round(icurTxtLaunchPrice * iTxtFileSize); 
else
iFileAmt = Math.round(icurTxtFilePrice * iTxtFileSize); 
document.frmMain.iTxtFileAmt.value = formatAmountString(iFileAmt.toString());
} 
}
else { 
var currentPriceLo = document.frmMain.curTxtFilePriceLo.value;
var currentPriceHi = document.frmMain.curTxtFilePriceHi.value;
var initialPriceLo = document.frmMain.curTxtInitFilePriceLo.value;
var initialPriceHi = document.frmMain.curTxtInitFilePriceHi.value;
if (txtFileSize == "") {
document.frmMain.iTxtFileAmt.value = "";
return;
}
if (currentPriceLo != "" && currentPriceHi != "") {
var fltFilePriceLo = currentPriceLo;
var fltFilePriceHi = currentPriceHi;
}
else if (initialPriceLo != "" && initialPriceHi != "") {
var fltFilePriceLo = initialPriceLo;
var fltFilePriceHi = initialPriceHi;
}
else {
document.frmMain.iTxtFileAmt.value = "";
return;
}
if (txtFileSize != "") {
var iTxtFileSize = new Number(txtFileSize.replace(/(\,)/g, ""));
var icurTxtFilePriceLo = new Number(fltFilePriceLo.replace(/(\,)/g, "")); 
var iCurTxtFilePriceHi = new Number(fltFilePriceHi.replace(/(\,)/g, ""));
var iFileAmt = Math.round(iTxtFileSize * ((icurTxtFilePriceLo + iCurTxtFilePriceHi) / 2));
document.frmMain.iTxtFileAmt.value = formatAmountString(iFileAmt.toString());
}
} 
}
function updateCurrentSize() {
document.frmMain.iTxtFileSize.value = document.frmMain.iTxtInitFileSize.value;
}
function updateInitAmount()
{
if (document.frmMain.iTxtFileSize.value != "")
return;
if (document.frmMain.curTxtFilePrice) {
var txtInitFileSize = document.frmMain.iTxtInitFileSize.value;
var curTxtFilePrice = document.frmMain.curTxtFilePrice.value;
if (txtInitFileSize != "" && curTxtFilePrice != "") {
var iTxtInitFileSize = new Number(txtInitFileSize.replace(/(\,)/g, ""));
var icurTxtFilePrice = new Number(curTxtFilePrice.replace(/(\,)/g, ""));
var iFileAmt = Math.round(iTxtInitFileSize * icurTxtFilePrice);
document.frmMain.iTxtFileAmt.value = formatAmountString(iFileAmt.toString());
} 
}
else {
var txtInitFileSize = document.frmMain.iTxtInitFileSize.value;
var curTxtInitFilePriceLo = document.frmMain.curTxtInitFilePriceLo.value;
var curTxtInitFilePriceHi = document.frmMain.curTxtInitFilePriceHi.value;
if (txtInitFileSize != "" && curTxtInitFilePriceLo != "" && curTxtInitFilePriceHi != "") {
var iTxtInitFileSize = new Number(txtInitFileSize.replace(/(\,)/g, ""));
var iCurTxtInitFilePriceLo = new Number(curTxtInitFilePriceLo.replace(/(\,)/g, "")); 
var iCurTxtInitFilePriceHi = new Number(curTxtInitFilePriceHi.replace(/(\,)/g, ""));
var iFileAmt = Math.round(iTxtInitFileSize * ((iCurTxtInitFilePriceLo + iCurTxtInitFilePriceHi) / 2));
document.frmMain.iTxtFileAmt.value = formatAmountString(iFileAmt.toString());
}
} 
}
function validateFilePriceLo( frm, arrFieldsInError )
{
var arrMoreErrors = new Array();
if (frm.iCurTxtInitFilePriceLo) {
var curTxtInitFilePriceLo = frm.curTxtInitFilePriceLo.value;
var curTxtInitFilePriceHi = frm.curTxtInitFilePriceHi.value;
if (curTxtInitFilePriceLo != "" && curTxtInitFilePriceHi != "") {
var n1 = new Number(curTxtInitFilePriceLo.replace(/(\,)/g, ""));
var n2 = new Number(curTxtInitFilePriceHi.replace(/(\,)/g, ""));
if ( n1 > n2 ) {
var arrError = FieldErrorInfo("curTxtFilePriceLo", 'The File Price Low value exceeds the File Price High value', "", "", "File Price");
arrMoreErrors[arrMoreErrors.length] = arrError;
}
}
}
else if(frm.curTxtFilePriceLo){
var curTxtFilePriceLo = frm.curTxtFilePriceLo.value;
var curTxtFilePriceHi = frm.curTxtFilePriceHi.value;
if (curTxtFilePriceLo != "" && curTxtFilePriceHi != "") {
var n1 = new Number(curTxtFilePriceLo.replace(/(\,)/g, ""));
var n2 = new Number(curTxtFilePriceHi.replace(/(\,)/g, ""));
if ( n1 > n2 ) {
var arrError = FieldErrorInfo("curTxtFilePriceLo", 'The File Price Low value exceeds the File Price High value', "", "", "File Price");
arrMoreErrors[arrMoreErrors.length] = arrError;
}
}
} 
return (arrMoreErrors);
} 
function popupWindow(page){
window.name = "main";
var cfg="toolbar=0, scrollbars, width=300, height=300, dependent=yes";
win = window.open(page,"",cfg);
}
function popBlockIOI(){
var sUrl = "IssueMaint_editBlockIOI_Region_popup.asp";
var sStyle = "width=500,height=250,scrollbars=1,resizable=1";
openGeneralPopup( sUrl, '', sStyle );
}
function popSlf(){
sUrl = "IssueMaint_FxRates.asp";
sStyle = "width=900,height=650,scrollbars=yes,toolbar=no,menubar=no,resizable=yes";
openGeneralPopup(sUrl, '', sStyle);
}
function on_select_issueType()
{
var sIssType = new Array();
var s = document.frmMain.selIssueType.options[document.frmMain.selIssueType.selectedIndex].value;
sIssueType = s.split(',');
var sIssTypeCD = sIssueType[1];
var sIssTypeID = sIssueType[0];
var sUrl = 'IssueMaint_DealStructure.asp?IssTypeCD=' + sIssTypeCD + '&IssTypeID=' + sIssTypeID;
window.location.href = sUrl;
}
function submitBrokers()
{
var sBroker = frmMain.txtFindBroker.value;
if (sBroker != "" && ValidateForm( document.frmMain ) )
{
frmMain.action = "/asp/IssueMaint_AddBookRunner.asp";
frmMain.submit();
return true;
}
else
{
alert("Please enter text for Bookrunner query.");
}
}
function submitGlobalCoordinators()
{
var sBroker = frmMain.txtFindGlobalCoordinator.value;
if (sBroker != "" && ValidateForm( document.frmMain ) )
{
frmMain.action = "/asp/IssueMaint_AddGlobalCoordinator.asp";
frmMain.submit();
return true;
}
else
{
alert("Please enter text for Global Coordinator query.");
}
}
function changeIPOInd()
{
if(document.frmMain.hidIPOUpdatedValue.value == 1)	
document.frmMain.hidIPOUpdatedValue.value = 0;	
else
document.frmMain.hidIPOUpdatedValue.value = 1;
}
function showHideOneArea(areaName)
{
var elthis = eval(areaName);	
if (elthis.style.display == 'none'){
elthis.style.display = '';
}
else{
elthis.style.display = 'none';
}
}
function onRoleTypeClicked(iLead)
{
if(iLead == 1)
{
divSelOwnerRoleLead.style.display = ''
divSelOwnerRoleNonLead.style.display = 'none'
}
else
{
divSelOwnerRoleLead.style.display = 'none'
divSelOwnerRoleNonLead.style.display = ''
}
}
function onChangeCEF()
{
if (document.frmMain.all("chkClosedEndFund") != null)
{
if (document.frmMain.all("chkClosedEndFund").checked == true)
tr_closedendfund_row.style.display = "inline";
else
tr_closedendfund_row.style.display = "none";
}
}
function onChangeETN()
{
if (document.frmMain.all("chkExchTradedNotes") != null)
{
if (document.frmMain.all("chkExchTradedNotes").checked == true)
tr_closedendfund_row.style.display = "inline";
else
tr_closedendfund_row.style.display = "none";
}
}
function onPageLoad()
{
if (document.frmMain.all("hidBlockIOICntryID") != null)
PopulateHiddenProspectusCountryBlock();
menuShow('issuemaint_dealdetails_eq', 'show');
if (document.frmMain.all("chkClosedEndFund") != null)
{
if (document.frmMain.all("chkClosedEndFund").checked == true)
tr_closedendfund_row.style.display = "inline";
}
if (document.frmMain.all("chkExchTradedNotes") != null)
{
if (document.frmMain.all("chkExchTradedNotes").checked == true)
tr_closedendfund_row.style.display = "inline";
}
var CustomerShowOD;
CustomerShowOD = getDocumentElement("hidCustomerShowOD");
if (!CustomerShowOD || CustomerShowOD.value == 0)
return;
var IssueTypeCd;
IssueTypeCd = getDocumentElement("hidIssueTypeCd");
if (!IssueTypeCd)
return;
if (IssueTypeCd.value == 'CB' || IssueTypeCd.value =='CP')
{
getDocumentElement("ConcurrentOfferingLayer").style.display = "";
getDocumentElement("ConcurrentOfferingLabelLayer").style.display = "";
if (document.frmMain.hidConCurrentInd.value == 'True')
{
document.frmMain.chkConCurrOffering.checked = true;	
getDocumentElement("ConcurrentOfferingDealLayer").style.display = "";
}	
}	
}
function PopulateHiddenProspectusCountryBlock()
{
var sHidProsCntryBlockID = "";
for(var i = 0; i < g_PCB.length; i++)
{
if(document.frmMain.hidBlockIOICntryID.value)
{
getDocumentElement("hidBlockIOICntryID").value = getDocumentElement("hidBlockIOICntryID").value + "|" + g_PCB[i].cntry_id;
getDocumentElement("divBlockIOICntryNM").innerHTML = getDocumentElement("divBlockIOICntryNM").innerHTML + ", " + g_PCB[i].cntry_nm;
}
else
{
getDocumentElement("hidBlockIOICntryID").value = g_PCB[i].cntry_id;
getDocumentElement("divBlockIOICntryNM").innerHTML = g_PCB[i].cntry_nm;
}
} 
}
function onClickConCurrentOffering(cbConCurrentOffering)
{
if (!cbConCurrentOffering.checked)
{
getDocumentElement("ConcurrentOfferingDealLayer").style.display = "none";
}
else
{
getDocumentElement("ConcurrentOfferingDealLayer").style.display = "";
} 
} 
function getDocumentElement(sElementName)
{
if (document.getElementById)
{
return document.getElementById(sElementName);
}
else if (document.all)
{
return document.all[sElementName];
}
else if (document.layers)
{	
if (document.layers[sElementName])
{
return document.layers[sElementName]; 
}
for(var i=0;i<document.layers.count-1;i++)
{
if (document.layers[i].elements[sElementName])
{
return document.layers[i].elements[sElementName];
}
} 
}
return 0;
} 
function OnEnableProspectusChecked()
{
var oChkBox = document.getElementById("chkUseIdealProspectus") ;
var arrRadBlockIOI = document.getElementsByName("radBlockIOI");
if(!oChkBox.checked)
{
alert('By unchecking the "Use i-Deal Prospectus" checkbox you will not be able to view the Prospectus tracking data within the deal.') ;
for(var i = 0; i < arrRadBlockIOI.length; i++)
{
arrRadBlockIOI[i].disabled = true;
}
}
else
{
for(var i = 0; i < arrRadBlockIOI.length; i++)
{
arrRadBlockIOI[i].disabled = false;
}
}
}
function OnEnableAllowSalesToEnterPM()
{
var oChkBox = document.getElementById("chkAllowSalesToEnterPM") ;
var arrRadBlockIOI = document.getElementsByName("radBlockIOIwoPM");
if(!oChkBox.checked)
{
for(var i = 0; i < arrRadBlockIOI.length; i++)
{
arrRadBlockIOI[i].disabled = true;
}
}
else
{
for(var i = 0; i < arrRadBlockIOI.length; i++)
{
arrRadBlockIOI[i].disabled = false;
}
}
}
function openDLAdapter()
{
var sIssueId = document.frmMain.hidIssueID.value;
var sUrl = "/aspx/UI/DLAdapter/DLAdapterUI.aspx?iss_id=" + sIssueId;
var sStyle = "width=800,height=700,toolbar=no,menubar=no,location=no,directories=no,resizable=yes,scrollbars=yes,left=100,top=50,dependent=yes";
openGeneralPopup(sUrl, "", sStyle); 
}
function setIndustry(frm)
{
var sIndustry = new Array();
var s = frm.selIndustry.options[frm.selIndustry.selectedIndex].value;
if (s.indexOf(",") != -1) {
sIndustry = s.split(',');
if (sIndustry[1] == 0) 
frm.hidSector.value = "False";
else
frm.hidSector.value = "True"; 
}
frm.hidIndustryId.value = sIndustry[0]; 
}
function setExchangeTradedNotes(frm)
{
if (document.frmMain.all("chkExchTradedNotes") != null)
{
if (document.frmMain.all("chkExchTradedNotes").checked == true)
document.frmMain.hidExchTradedNotes.value = 1;
else
document.frmMain.hidExchTradedNotes.value = 0;
}
}
function openMultipleRegistrations(iPrdId)
{
var sUrl = "specialIssueMaint_MultipleRegistrations.asp?ID=" + iPrdId;
var sStyle = "width=350,height=200,scrollbars=yes,toolbar=no,menubar=no,resizable=yes";
openGeneralPopup(sUrl, '', sStyle);
}
function EscapeXMLChar(str)
{
var regex;
regex = /&/g;
str = str.replace(regex, "&amp;");
regex = />/g;
str = str.replace(regex, "&gt;");
regex = /</g;
str = str.replace(regex, "&lt;");
regex = /"/g;	
str = str.replace(regex, "&quot;");
regex = /'/g;
str = str.replace(regex, "&apos;");
return(str);
}
function UnEscapeXMLChar(str)
{
var regex;
regex = /&amp;/g;
str = str.replace(regex, "&");
regex = /&gt;/g;
str = str.replace(regex, ">");
regex = /&lt;/g;
str = str.replace(regex, "<");
regex = /&quot;/g;	
regex = /&apos;/g;
str = str.replace(regex, "'");
return(str);
}
