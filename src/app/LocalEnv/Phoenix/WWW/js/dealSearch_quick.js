<!-- 
function getDealDetails(page, issue_id, debtequityflag, nextPage, issue_name, issue_code) {
document.frmDealDetails.hidIssueId.value = issue_id;
document.frmDealDetails.hidDebtEquityFlag.value = debtequityflag;
document.frmDealDetails.hidNextPage.value=nextPage;
document.frmDealDetails.hidIssueName.value = issue_name;
document.frmDealDetails.hidIssueCode.value = issue_code;
document.frmDealDetails.action = page; 
document.frmDealDetails.submit();
}
function sortServerSide(sSortBy1){
if (sSortBy1 != "") {
document.frmSort.hidSortBy1.value = sSortBy1; 
}
setOrder()
document.frmSort.submit();
}
function setOrder(){
if (document.frmSort.hidOrder1.value == 'ascending'){
document.frmSort.hidOrder1.value = 'descending';
}
else{
document.frmSort.hidOrder1.value = 'ascending';
} 
}
