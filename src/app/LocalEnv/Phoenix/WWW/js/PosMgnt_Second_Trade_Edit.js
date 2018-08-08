<!-- 
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
function submitPage( frm , action)
{
switch (action)
{
case "savechanges" :
if(ValidateForm( frm ))
{
frm.action = "/asp/util_submit_action.asp";
frm.hidAction.value = "Update";
frm.submit(); 
} 
break;
} 
}
function popUpTrade(lIssueID, UseQuantityInd, TrnID){
var sUrl = "PosMgnt_Second_Trade.asp?lIssueID=" + lIssueID + "&iUseQtyInd=" + UseQuantityInd;
var sStyle = "width=420,height=250";
openGeneralPopup( sUrl, '', sStyle );
}
function popUpOverallotment(lIssueID, UseQuantityInd){
var sUrl = "PosMgnt_Overallotment.asp?lIssueID=" + lIssueID + "&iUseQtyInd=" + UseQuantityInd;
var sStyle = "width=420,height=250";
openGeneralPopup( sUrl, '', sStyle );
}
function switchTrancheID(previousPage){
var lTrnID = document.frmMain.sSelTranche.value
var sUrl = "PosMgnt_Second_Trade_Edit.asp?lTrnID=" + lTrnID + "&pageid="+previousPage;
window.location.href = sUrl
}
function popUpSecondaryTradeEdit(TransID, UseQuantityInd, TrnID){
var sUrl = "PosMgnt_Secondary_Trade_Edit_PopUP.asp?lTransID=" + TransID + "&iUseQtyInd=" + UseQuantityInd + "&lTrnID=" + TrnID;
var sStyle = "width=420,height=120";
openGeneralPopup( sUrl, '', sStyle );
} 
