<!-- 
function onPageLoad()
{
menuShow('syndpart_worksheet', 'show');
document.frmMainOA.hidKeepChildWindowsOpen.value = "";
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
function submitPage( frm , action, sMessage )
{
switch (action)
{
case "SaveOverallotment" :
SaveOverallotment(frm);
break;
case "reverttosaved" :
window.location.reload();
break;
case "cancel" :
frm.action = "/asp/_template.asp";
frm.submit();
break;
}
}
function popUpTrade(lIssueID, UseQuantityInd, TrnID){
var sUrl = "PosMgnt_Second_Trade.asp?lIssueID=" + lIssueID + "&iUseQtyInd=" + UseQuantityInd + "&lTrnID=" + TrnID;
var sStyle = "width=420,height=250";
openGeneralPopup( sUrl, '', sStyle );
}
function switchTrancheID(previousPage){
var lTrnID = document.frmMain.sSelTranche.value
var sUrl = "PosMgnt_Position.asp?lTrnID=" + lTrnID + "&pageid="+previousPage;
window.location.href = sUrl
}
