<!-- 
function sortColumns( columnName){
document.frmMain.hidSortBy.value = columnName;
setOrder();
document.frmMain.submit();
}
function setOrder(){
if (document.frmMain.hidSortOrder.value == 'ascending'){
document.frmMain.hidSortOrder.value = 'descending';
}
else{
document.frmMain.hidSortOrder.value = 'ascending';
} 
}
