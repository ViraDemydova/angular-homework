<!-- 
function onPageLoad()
{
}
function CustomValidation( frm, arrFieldsInError )
{
var arrMoreErrors = new Array();
return (arrMoreErrors);
} 
function PopUpEdit(){
var listOfIds = "";
if (!document.frmMain.sChkEdit.length) {
listOfIds = document.frmMain.sChkEdit.value+", ";
} 
else {
for (var i=0; i < document.frmMain.sChkEdit.length; i++) {
if (document.frmMain.sChkEdit[i].checked==true){
listOfIds = document.frmMain.sChkEdit[i].value+", "+listOfIds;
}
}
} 
var sUrl = "calendar_custom_edit_EQ_popup.asp?sListOfIds="+listOfIds;
var sStyle = "width=450, height=320, scrollbars=1";
openGeneralPopup( sUrl, '', sStyle );
}
function PopUpEditFI(){
var listOfIds = "";
if (!document.frmMain.sChkEdit.length) {
listOfIds = document.frmMain.sChkEdit.value+", ";
} 
else {
for (var i=0; i < document.frmMain.sChkEdit.length; i++) {
if (document.frmMain.sChkEdit[i].checked==true){
listOfIds = document.frmMain.sChkEdit[i].value+", "+listOfIds;
}
}
} 
var sUrl = "calendar_custom_edit_FI_popup.asp?sListOfIds="+listOfIds;
var sStyle = "width=450, height=320, scrollbars=1";
openGeneralPopup( sUrl, '', sStyle );
} 
function getDetails(page, issue_id, debtequityflag, nextPage, issue_name, issue_code){ 
document.frmMain.hidIssueId.value=issue_id; 
document.frmMain.hidDebtEquityFlag.value=debtequityflag;
document.frmMain.hidNextPage.value=nextPage;
document.frmMain.hidIssueName.value = issue_name;
document.frmMain.hidIssueCode.value = issue_code;
document.frmMain.action = page; 
document.frmMain.submit();
}
function SaveSortOrder( frm , sColumn, sOrder, sAction )
{
frm.hidSortOrder.value = "<DisplayOrder><ColumnOrder><ColumnName>" + sColumn + "</ColumnName><SortOrder>1</SortOrder><Direction>" + sOrder + "</Direction></ColumnOrder></DisplayOrder>";
frm.action = sAction;
frm.submit();
}
