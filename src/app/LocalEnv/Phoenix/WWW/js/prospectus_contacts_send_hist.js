<!-- 
function sortColumns(sColName)
{
var frm = document.frmMain;
frm.action = "prospectus_contacts_send_hist.asp" ;
if (frm.hidSortColumn.value != sColName)
{
frm.hidSortColumn.value = sColName;
frm.hidSortOrder.value = 'ascending';	
}
else
{
if (frm.hidSortOrder.value == 'ascending')
{
frm.hidSortOrder.value = 'descending';
}
else{
frm.hidSortOrder.value = 'ascending';
} 
}
frm.submit() ;
}
