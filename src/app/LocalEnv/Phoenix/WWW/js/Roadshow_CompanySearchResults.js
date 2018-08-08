<!-- 
function onPageLoad()
{
setFocus();
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
function submitPage(frm, action)
{
switch (action)
{
case "find" :
if (ValidateForm(frm))
{
frm.action = "Roadshow_CompanySearchResults.asp";
frm.hidAction.value = "Find"
frm.submit();
return true;
}
break;
}
}
function IssuerMaintenance( bIsEquity )
{
document.frmMain.action	= "Roadshow_issue_company.asp";
document.frmMain.submit();	
}
function setFocus(){
document.frmMain.rsTxtIssuerName.focus();
}
function sortServerSide(sSortBy1){
if (sSortBy1 != "") {
document.frmMain.hidSortBy1.value = sSortBy1; 
}
setOrder()
document.frmMain.submit();
}
function setOrder(frm){
if (document.frmMain.hidOrder1.value == 'ascending'){
document.frmMain.hidOrder1.value = 'descending';
}
else{
document.frmMain.hidOrder1.value = 'ascending';
} 
} 
function onEnter( bEquity )
{
if(document.frmMain.rsTxtIssuerName.value != ""){
submitPage(document.frmMain, "find", bEquity);
}
} 
function dropDownOnEnter()
{
var keyCode = event.keyCode;
if (keyCode == 13){
submitPage(document.frmMain, "find");
}	
} 
function OnCompanySelected(sName,sId,blnIssuer,sRsIssueID)
{
if (sRsIssueID == 0)
sRsIssueID="";
window.parent.opener.document.frmMain.hidIssuerId.value="";
window.parent.opener.document.frmMain.hidEntityID.value="";
if(blnIssuer == 0)
window.parent.opener.SaveSessionDataAndReload(sRsIssueID, "", sName, sName, 'E', "",sId);
else
window.parent.opener.SaveSessionDataAndReload(sRsIssueID, "", sName, sName, 'E', sId,window.parent.opener.document.frmMain.hidEntityID.value);
window.close();
}
