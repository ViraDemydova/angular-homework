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
frm.action = "IssueMaint_IssuerSearchResults.asp";
frm.hidAction.value = "Find"
frm.submit();
return true;
}
break;
}
}
function IssuerMaintenance()
{
document.frmMain.hidSearchName.value = document.frmMain.rsTxtIssuerName.value;
document.frmMain.hidSearchCountry.value = document.frmMain.sIssuerCountry.value;
document.frmMain.action = "IssuerMaintenance.asp";
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
