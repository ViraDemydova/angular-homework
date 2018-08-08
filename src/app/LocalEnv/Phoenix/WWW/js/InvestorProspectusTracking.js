function CloseWindow()
{
window.close() ;
}
function sortColumns(sColName)
{
var frm = document.frmMain;
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
frm.submit();
}
