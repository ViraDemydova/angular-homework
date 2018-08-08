<!-- 
function submitPage( frm )
{
if(ValidateForm( frm ))
{ 
frm.hidPerformSearch.value = true;
frm.submit();
}
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
function getDealSketch( sIss_id, frm ) {
frm.hidIssueId.value = sIss_id;
frm.action = "IssueMaint_DealSketch.asp";
frm.submit();
}
function sortServerSide(frm, sSortBy1){
if (sSortBy1 != "") {
frm.hidSortBy1.value = sSortBy1; 
}
setOrder(frm);
frm.action = "dealSearch_adv_results.asp"; 
frm.submit();
}
function setOrder(frm){
if (frm.hidOrder1.value == 'ascending'){
frm.hidOrder1.value = 'descending';
}
else{
frm.hidOrder1.value = 'ascending';
} 
}
