<!-- 
function editDesignations(frm, sTrancheId, sInvId, sOrdId, sInvName, sOrderQty, sDBDName)
{
frm.hidTrancheId.value = sTrancheId;
frm.hidInvId.value = sInvId;
frm.hidOrdId.value = sOrdId;
frm.hidInvName.value = sInvName;
frm.hidOrderQty.value = sOrderQty;
frm.hidDBDName.value = sDBDName;
frm.method = "POST";
frm.action = "designations_edit_sales.asp";
frm.submit();
}
function submitColumnSort( strColumn )
{
var oCurrentSortColumn = document.frmMain.hidCurrentSortColumn
var oCurrentSortOrder = document.frmMain.hidCurrentSortOrder
if( strColumn != oCurrentSortColumn.value )
{
oCurrentSortColumn.value = strColumn
oCurrentSortOrder.value = "ascending"
}
else if( oCurrentSortOrder.value == "ascending" )	
oCurrentSortOrder.value = "descending"	
else
oCurrentSortOrder.value = "ascending"
document.frmMain.action = "designations_view_sales.asp";
document.frmMain.submit();
}
function showHideArea(areaName){
var elthis = eval(areaName)
if (elthis.style.display == 'none'){
elthis.style.display = '';
}
else{
elthis.style.display = 'none';
}
}
function getDetails(issue_id, debtequityflag, nextPage, issue_name, issue_code,
sTrancheId, sOrdId){ 
document.frmMain.hidIssueId.value=issue_id; 
document.frmMain.hidDebtEquityFlag.value=debtequityflag;
document.frmMain.hidNextPage.value=nextPage;
document.frmMain.hidIssueName.value = issue_name;
document.frmMain.hidIssueCode.value = issue_code;
document.frmMain.hidTrancheId.value = sTrancheId;
document.frmMain.hidOrdId.value = sOrdId;
document.frmMain.action = "calendar_action.asp"; 
document.frmMain.submit();
}
