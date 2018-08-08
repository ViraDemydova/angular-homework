<!-- 
function sortServerSide(frm, sSortBy1){
if (sSortBy1 != "") {
frm.hidSortBy1.value = sSortBy1; 
}
setOrder(frm);
frm.action = "Reports_IndicateAllocate.asp"; 
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
