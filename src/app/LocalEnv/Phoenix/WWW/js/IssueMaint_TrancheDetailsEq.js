<!-- 
function onPageLoad()
{
updateCurrFileSize(document.frmMain, document.frmMain.hidDealType.value);
updateCurrAmount(document.frmMain);
var divNewIssueTrack = document.all["divNewIssueTrackingLayer"];
if (divNewIssueTrack != null)
onTrancheNameChange("divNewIssueTrackingLayer");
initPenaltyLiftedTime();
initBooksCloseTime();
}
function CheckConditionallyRequiredFields( frm, arrFieldsInError )
{
var arrMoreErrors = new Array();
var Invitation = frm.sTxtInvitationText.value.length;
var Comments = frm.sTxtCalComments.value.length;
var Ops_Comments 
if(frm.sTxtTransferComments)
Ops_Comments = frm.sTxtTransferComments.value.length;
var InvitationMaxLength = 256;
var CommentsMaxLength = 300;
var Ops_CommentsMaxLength = 300;
if ( Invitation > InvitationMaxLength ) {
var arrError = FieldErrorInfo("sTxtInvitationText", 'The Invitation Text field exceeds the maximum length allowed', "", "", "Invitation Text");
arrMoreErrors[arrMoreErrors.length] = arrError;
}
if ( Comments > CommentsMaxLength ) {
var arrError = FieldErrorInfo("sTxtCalComments", 'The Calendar Items Comments field exceeds the maximum length allowed', "", "", "Comments");
arrMoreErrors[arrMoreErrors.length] = arrError;
}
if(frm.sTxtTransferComments){
if ( Ops_Comments > Ops_CommentsMaxLength ) {
var arrError = FieldErrorInfo("sTxtTransferComments", 'The Account Codes Comments field exceeds the maximum length allowed', "", "", "Comments");
arrMoreErrors[arrMoreErrors.length] = arrError;
}
} 
return (arrMoreErrors);
} 
function CheckTrancheSize(frm)
{
var fCurrDealSize = Number(changeToFloat(frm.hidCurrDealSize.value));
var fTotalCurrTrancheSize = Number(changeToFloat(frm.hidTotalCurrTrancheSize.value));
var fCurrTrancheSize = Number(changeToFloat(frm.hidCurrTrancheSize.value));
var fNewFileSize = Number(changeToFloat(frm.iTxtCurrentFileSize.value));
if (frm.hidBaseProduct.value != frm.iSelDefaultProduct.value) {
var SelectedProduct = frm.iSelDefaultProduct.selectedIndex + 1;
var iRatioBase = eval("frm.hidRatioBase" + SelectedProduct + ".value");
var iRatioSelf = eval("frm.hidRatioSelf" + SelectedProduct + ".value");
fNewFileSize = Math.round(fNewFileSize * (iRatioBase/iRatioSelf));
}
if ( fCurrDealSize != (fTotalCurrTrancheSize - fCurrTrancheSize + fNewFileSize))
{
return confirm("The sum of the current file sizes of the tranches does not equal the current file size of the deal. Do you wish to continue?");
} 
return true; 
}
function CustomValidation( frm, arrFieldsInError )
{
var arrMoreErrors = new Array();
return arrMoreErrors;	
} 
function submitPage( frm , action, page )
{
switch (action)
{
case "update":
if (ValidateForm(frm)) {
if (CheckTrancheSize(frm) == true )
{
setTargetMarketsHiddenVariable();
frm.hidAction.value = "Update";
frm.action = "util_submit_action.asp"
frm.submit();
}
}
break;
case "updateandadd":
if (ValidateForm(frm)) {
setTargetMarketsHiddenVariable();
frm.hidAction.value = "Update";
frm.hidAddAnother.value="True"; 
frm.action = "util_submit_action.asp"
frm.submit();
}
break; 
case "reverttosaved":
frm.action = page;
frm.submit();
break;
case "cancel":
frm.action = page;
frm.submit();
break;
case "delete":
frm.hidAction.value = "Delete";
frm.action = "util_submit_action.asp"
frm.submit();
break;
case "add": 
if (ValidateForm(frm)) { 
if (CheckTrancheSize(frm) == true )
{
if (frm.iSelSubBrkId.selectedIndex != -1)
frm.hidTrnDefaultBrkId.value = frm.iSelSubBrkId.options[frm.iSelSubBrkId.selectedIndex].value;
setTargetMarketsHiddenVariable();	
GetPotIndAndPopulateDirectInd(frm);
frm.hidAction.value = "Add";
frm.action = "util_submit_action.asp"
frm.submit();
}
}
break;
case "addanother":
if (ValidateForm(frm)) {
if (frm.iSelSubBrkId.selectedIndex != -1)
frm.hidTrnDefaultBrkId.value = frm.iSelSubBrkId.options[frm.iSelSubBrkId.selectedIndex].value;
setTargetMarketsHiddenVariable();	
GetPotIndAndPopulateDirectInd(frm); 
frm.hidAction.value = "Add";
frm.hidAddAnother.value="True";
frm.action = "util_submit_action.asp"
frm.submit();
}
break 
}
}
function submitToSelf( mode, trnid, useqty ){
var bReturnToAspx = false;
if(document.frmMain.hidReturnToAspx)
bReturnToAspx = document.frmMain.hidReturnToAspx.value;
switch(mode){
case 'read':
location.href = './IssueMaint_TrancheDetailsEq.asp?mode=read&trn=' + trnid + '&useqty=' + useqty + '&returnToAspx=' + bReturnToAspx;
break;
case 'edit':
location.href = './IssueMaint_TrancheDetailsEq.asp?mode=edit&trn=' + trnid + '&useqty=' + useqty + '&returnToAspx=' + bReturnToAspx;
break;
case 'delete':
if(document.frmMain.hidDeleteInd.value == 0){
location.href = './IssueMaint_TrancheDetailsEq.asp?mode=delete&trn=' + trnid + '&returnToAspx=' + bReturnToAspx;
}
else{
alert("This tranche may not be deleted because there are still syndicate members associated with it.")
}
break; 
default:
break;
}
}
function updateCurrAmount( frm )
{
if(frm.hidDealType.value == "C" || frm.hidDealType.value == "EU")
{ 
if (frm.hidBaseProdCurrRate)
var fltBaseProdCurrRate = frm.hidBaseProdCurrRate.value;
if (frm.hidCurProdCurrRate)
var fltCurProdCurrRate = frm.hidCurProdCurrRate.value;
if (fltBaseProdCurrRate == "" || fltBaseProdCurrRate == 0)
fltBaseProdCurrRate = 1;
if (fltCurProdCurrRate == "" || fltCurProdCurrRate == 0)
fltCurProdCurrRate = 1;
if (typeof(frm.iTxtCurrentFileSize) == "undefined" || typeof(frm.iTxtInitialFileSize) == "undefined")
return;
if (frm.iTxtOfferSize.value != "" && frm.iTxtOfferSize.value != "0")
var iTxtFileSize = frm.iTxtOfferSize.value;
else if (frm.iTxtCurrentFileSize.value != "" && frm.iTxtCurrentFileSize.value != "0")
var iTxtFileSize = frm.iTxtCurrentFileSize.value;
else if (frm.iTxtInitialFileSize.value != "" && frm.iTxtInitialFileSize.value != "0")
var iTxtFileSize = frm.iTxtInitialFileSize.value;
else 
{
var iTxtFileSize = 0;
frm.iTxtFileAmt.value = ""
return;
}
var iTxtFileSize = new Number(iTxtFileSize.replace(/(\,)/g, ""));
if (frm.hidBaseProduct.value != frm.iSelDefaultProduct.value) {
var SelectedProduct = frm.iSelDefaultProduct.selectedIndex + 1;
var iRatioBase = eval("frm.hidRatioBase" + SelectedProduct + ".value");
var iRatioSelf = eval("frm.hidRatioSelf" + SelectedProduct + ".value");
iTxtFileSize = Math.round(iTxtFileSize * (iRatioBase/iRatioSelf));
}
if (frm.hidStateID.value == 30) {
var curTxtFilePrice = frm.hidOfferPrice.value;
if (curTxtFilePrice != "") {
curTxtFilePrice = new Number(curTxtFilePrice.replace(/(\,)/g, "")); 
var iFileAmt = Math.round(iTxtFileSize * curTxtFilePrice);
frm.iTxtFileAmt.value = formatAmountString(iFileAmt.toString());
}
else {
frm.iTxtFileAmt.value = "";
return;
}
} 
else if (frm.hidIPOInd.value == 'True') {
var curTxtFilePriceLo = frm.hidFilePriceLo.value;
var curTxtFilePriceHi = frm.hidFilePriceHi.value;
if (curTxtFilePriceLo != "" && curTxtFilePriceHi != "") {
var icurTxtFilePriceLo = new Number(curTxtFilePriceLo.replace(/(\,)/g, "")); 
var iCurTxtFilePriceHi = new Number(curTxtFilePriceHi.replace(/(\,)/g, ""));
var iFileAmt = Math.round(iTxtFileSize * (fltCurProdCurrRate / fltBaseProdCurrRate) * ((icurTxtFilePriceLo + iCurTxtFilePriceHi) / 2));
frm.iTxtFileAmt.value = formatAmountString(iFileAmt.toString());
}
else {
frm.iTxtFileAmt.value = "";
return;
}
}
else if (frm.hidIPOInd.value == 'False') { 
var curTxtFilePrice = frm.hidFilePrice.value;
if (curTxtFilePrice != "") {
var icurTxtFilePrice = new Number(curTxtFilePrice.replace(/(\,)/g, ""));
var iFileAmt = Math.round(icurTxtFilePrice * iTxtFileSize * (fltCurProdCurrRate / fltBaseProdCurrRate)); 
frm.iTxtFileAmt.value = formatAmountString(iFileAmt.toString());
}
else {
frm.iTxtFileAmt.value = "";
return; 
}
}
}
} 
function updateSizes(frm)
{
frm.iTxtCurrentFileSize.value = frm.iTxtInitialFileSize.value; 
}
function updateCurrFileSize(frm, strDealType)
{
if(strDealType == "CB" || strDealType == "CP")
{
if (typeof(frm.iTxtCurrentFileSize) == "undefined" || typeof(frm.iTxtInitialFileSize) == "undefined")
return;
if(frm.iTxtCurrentFileSize && (frm.iTxtCurrentFileSize.value == "" || frm.iTxtCurrentFileSize.value == "0"))
{
frm.iTxtCurrentFileSize.value = frm.iTxtInitialFileSize.value; 
updateTrancheAmt(document.frmMain); 
}
}
}
function updateTrancheAmt(frm)
{
if(frm.hidDealType.value == "CB" || frm.hidDealType.value == "CP")
{
var currFile = new Number(frm.iTxtCurrentFileSize.value.replace(/(\,)/g, ""));
var numVal = new Number(frm.hidParValue.value.replace(/(\,)/g, ""));
frm.iTxtFileAmtFace.value = formatAmountString(Math.round(currFile * numVal).toString());
if(((frm.hidDealPricedOrHigher) && (frm.hidDealPricedOrHigher.value == 1)) 
|| ((frm.hidOfferPrice.value != "") && (frm.hidOfferPrice.value > 0)))
{
numVal = new Number(frm.hidOfferPrice.value.replace(/(\,)/g, ""));
}
else
{
numVal = new Number(frm.hidEstOfferPrice.value.replace(/(\,)/g, ""));
}
frm.iTxtFileAmtProceeds.value = formatAmountString(Math.round(currFile * numVal).toString());
} 
}
function onTrancheNameChange(sShowHideArea)
{
var bIPODeal;
var sDefBrkId;
for(var i=0; i<arrTrancheNames.length; i++)
{
if (arrTrancheNames[i][0] == document.frmMain.iSelTrancheName.value)
{
if (arrTrancheNames[i][1] == 'True')
document.frmMain.radDefineGroups[0].checked = true;
else if (arrTrancheNames[i][1] == 'False')
document.frmMain.radDefineGroups[1].checked = true;
bIPODeal = document.forms["frmMain"].elements["hidIPOInd"].value;
var hidCountUSTrancheInDeal = document.forms["frmMain"].elements["hidCountUSTrancheInDeal"];
if (hidCountUSTrancheInDeal == null || hidCountUSTrancheInDeal.value == 0)
showHideOneArea(sShowHideArea, "1"); 
else
showHideOneArea(sShowHideArea, "0");
sDefBrkId = arrTrancheNames[i][2];
var sNameRole = arrTrancheNames[i][3] + " " + document.forms["frmMain"].elements["hidTextRole"].value;
rewriteLayer("pDefaultSubsidName", sNameRole);
}
}
for( var i = 0; i < document.frmMain.iSelSubBrkId.options.length; i++)
{
if (document.frmMain.iSelSubBrkId.options[i].value == sDefBrkId)
{
document.frmMain.iSelSubBrkId.selectedIndex = i;
break;
}
}
if (document.all["radNewIssueTrack"] != null)
document.frmMain.radNewIssueTrack[1].checked = true;
if (document.all["radPenaltyImposed"] != null)
document.frmMain.radPenaltyImposed[1].checked = true;
if (document.all["dtTxtPenaltyBidDate"] != null)
document.frmMain.dtTxtPenaltyBidDate.value = "";
if (document.all["dtTxtPenaltyBidLiftedDate"] != null)
document.frmMain.dtTxtPenaltyBidLiftedDate.value = "";
if (document.all["dtTxtSubstitutionDate"] != null)
document.frmMain.dtTxtSubstitutionDate.value ="";
}
function showHideOneArea(areaName, bShow)
{
var objDivIdentity = getDocumentElement(areaName);
if (objDivIdentity)
{
if (bShow == '1'){
objDivIdentity.style.display = '';
}
else{
objDivIdentity.style.display = 'none';
}
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
function GetPotIndAndPopulateDirectInd(frm)
{	
for(var i=0; i<arrTrancheNames.length; i++)
{
if (arrTrancheNames[i][0] == document.frmMain.iSelTrancheName.value)
{
if(arrTrancheNames[i][4] == 'True')
frm.hidPotInd.value = '1'; 
else
frm.hidPotInd.value = '0';
if(arrTrancheNames[i][5] == 'True')
frm.hidPopulateDirectInd.value = '1'; 
else
frm.hidPopulateDirectInd.value = '0';
break;
}
}	
}
function formatDatePart(emName, displayName, datePart)
{
var iValue;
if (datePart == "hr")
{
iValue = parseInt(emName.value,10);
if(iValue)
{
if ((iValue < 1) || (iValue > 12))
{
var sStatusMsg = new String;
sStatusMsg = sStatusMsg + "Please correct the following error(s):<br>";
var sMsg = " contains an invalid hour value";
sStatusMsg = sStatusMsg + "<li><a href=\"JavaScript:self.window.opener.getDocumentElement('" + emName.id + "').focus()\">" + displayName + "</a> " + sMsg + "<br>";
showErrorMessage(sStatusMsg);
} 
else 
{
var iMin = parseInt(getDocumentElement('TxtBooksCloseTimeMM').value);
if(!iMin)
getDocumentElement('TxtBooksCloseTimeMM').value = "00";
}
}
}
if (datePart == "min")
{
iValue = parseInt(emName.value,10);
if (iValue < 0 || iValue > 59)
{
var sStatusMsg = new String;
sStatusMsg = sStatusMsg + "Please correct the following error(s):<br>";
var sMsg = " contains an invalid minute value";
sStatusMsg = sStatusMsg + "<li><a href=\"JavaScript:self.window.opener.getDocumentElement('" + emName.id + "').focus()\">" + displayName + "</a> " + sMsg + "<br>";
showErrorMessage(sStatusMsg);
}
else if (!iValue)
{
var iHour = parseInt(getDocumentElement('TxtBooksCloseTimeHH').value);
if(iHour)
{
getDocumentElement('TxtBooksCloseTimeMM').value = "00";	
} 
}
}
} 
function showErrorMessage(sStatusMsg)
{
var sMessage = new String;
sMessage = sMessage + "<html><head>";
sMessage = sMessage + "<title>" + document.title + " Error(s)" + "</title>";
sMessage = sMessage + "<link href='../style/ideal_custom_generic.css' rel='stylesheet' type='text/css'>";
sMessage = sMessage + "<link href='../style/ideal_custom_ie.css' rel='stylesheet' type='text/css'>";
sMessage = sMessage + "</head><body>";
sMessage = sMessage + "<table cellspacing='0' cellpadding='0' width='100%' height='62' border='0'>";
sMessage = sMessage + "<tr><td width='119' height='62' rowspan='3' class='topWelcomeArea1' valign='top'><img src='../images/brand.gif' width='119' height='62' border='0' alt='i-Deal'></td>";
sMessage = sMessage + "<td width='20' height='30' class='topWelcomeArea'><img src='../images/spacer.gif' width='20' height='30' border='0'></td>";
sMessage = sMessage + "<td class='topWelcomeArea'>&nbsp;</td>";
sMessage = sMessage + "<td class='topWelcomeArea' nowrap width='50%'><img src='../images/spacer.gif' width='2' height='7' border='0'><br><img src='../images/spacer.gif' width='10' height='3' border='0'>&nbsp; </td>";
sMessage = sMessage + "<td class='topWelcomeArea' width='50%' align='right' nowrap><img src='../images/spacer.gif' width='2' height='7' border='0'><br>&nbsp;<img src='../images/spacer.gif' width='10' height='10' border='0'></td>";
sMessage = sMessage + "</tr>";
sMessage = sMessage + "<tr><td colspan='4' height='3'><img src='../images/spacer.gif' width='10' height='3' border='0'></td></tr>";
sMessage = sMessage + "<tr><td></td><td colspan='3'>";
sMessage = sMessage + sStatusMsg;
sMessage = sMessage + "<br><input type='button' value='Close' class='stdButton_R2' onclick='javascript:window.close()'>";
sMessage = sMessage + "</td></tr>";
sMessage = sMessage + "</table></body></html>";
var sHeight = "height=" + (105 + (2 * 22));
var sWindowParms = "toolbar=no,location=no,directories=no,scrollbars=yes,resizable=yes,width=450,center=yes,dependent=yes," + sHeight;
var sChildName = window.name + "Errors";
popupError = window.open("",sChildName,sWindowParms);
popupError.document.open();
popupError.document.write(sMessage);
popupError.document.close();
popupError.focus();
}
function initPenaltyLiftedTime()
{
var frm = document.frmMain;
var sPenaltyLiftedDateTime;
if (frm.hidPenaltyLiftedDate)
{
sPenaltyLiftedDateTime = frm.hidPenaltyLiftedDate.value;
var hidRawPenaltyLiftedDate = frm.hidRawPenaltyLiftedDate.value
if (sPenaltyLiftedDateTime == "" )
return;
if (hidRawPenaltyLiftedDate.substring(10,21) == "T00:00:00")
return;
var dtPenaltyLifted = new Date(sPenaltyLiftedDateTime);
if (isNaN(dtPenaltyLifted))
return;
var iHours = dtPenaltyLifted.getHours();
var iAMPMndx = 0;
if (iHours > 12)
{
iHours -= 12;
iAMPMndx = 1;
}
else if (iHours == 12)
{
iAMPMndx = 1;
}
else if (iHours == 0)
{
iHours = 12;
iAMPMndx = 0;
}
var iMins = dtPenaltyLifted.getMinutes();
frm.txtPenaltyLiftedTimeHH.value = iHours;
if (iMins < 10)
frm.txtPenaltyLiftedTimeMM.value = '0' + iMins.toString();
else
frm.txtPenaltyLiftedTimeMM.value = iMins;
frm.radPenaltyLiftedTimeAMPM[iAMPMndx].checked = true;
}
}
function addTimePortionForPenaltyLiftedDate()
{
var frm = document.frmMain;
if (frm.hidPenaltyLiftedDate && frm.hidPenaltyLiftedDate.value != "")
{
var iHours = parseInt(frm.txtPenaltyLiftedTimeHH.value);
var iMins = parseInt(frm.txtPenaltyLiftedTimeMM.value);
var sHours;
var sMins;
if (frm.radPenaltyLiftedTimeAMPM[1].checked)
{
if (iHours != 12)
iHours += 12; 
}
else
{
if (iHours == 12)
iHours = 0; 
}
if (iHours < 10)
sHours = '0' + iHours.toString();
else
sHours = iHours.toString();
if (iMins < 10)
sMins = '0' + iMins.toString();
else
sMins = iMins.toString();
frm.dtTxtPenaltyBidDate.value = frm.dtTxtPenaltyBidDate.value + ' ' + sHours + ':' + sMins;
}
}
function initBooksCloseTime()
{
var frm = document.frmMain;
var sBooksCloseDateTime;
if (frm.hidBooksCloseDate)
{
sBooksCloseDateTime = frm.hidBooksCloseDate.value;
var hidRawBooksCloseDate = frm.hidRawBooksCloseDate.value
if (sBooksCloseDateTime == "" )
return;
if (hidRawBooksCloseDate.substring(10,21) == "T00:00:00")
return;
var dtBooksClose = new Date(sBooksCloseDateTime);
if (isNaN(dtBooksClose))
return;
var iHours = dtBooksClose.getHours();
var iAMPMndx = 0;
if (iHours > 12)
{
iHours -= 12;
iAMPMndx = 1;
}
else if (iHours == 12)
{
iAMPMndx = 1;
}
else if (iHours == 0)
{
iHours = 12;
iAMPMndx = 0;
}
var iMins = dtBooksClose.getMinutes();
frm.TxtBooksCloseTimeHH.value = iHours;
if (iMins < 10)
frm.TxtBooksCloseTimeMM.value = '0' + iMins.toString();
else
frm.TxtBooksCloseTimeMM.value = iMins;
frm.radTxtBooksCloseTimeAMPM[iAMPMndx].checked = true;
}
}
function setTargetMarketsHiddenVariable()
{
if(document.frmMain.selTrancheTargetMarket)
{
var oSourceListOptions = document.frmMain.selTrancheTargetMarket.options;
var sList, z;
var firstEntryNotAdded = true;
sList="";
for(z=0; z<oSourceListOptions.length; z++)
{
if(oSourceListOptions[z].selected)
{
if (firstEntryNotAdded)
{
firstEntryNotAdded = false;
sList += oSourceListOptions[z].value;
}
else{
sList += "," + oSourceListOptions[z].value; 
}
}
}
document.frmMain.hidTrancheTargetMarkets.value = sList;
}
}
