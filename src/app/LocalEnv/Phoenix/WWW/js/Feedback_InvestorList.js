<!-- 
function EditFeedback( frm, lInstinvid ) {
frm.hidPageMode.value = "Update";
frm.hidInstinvid.value = lInstinvid; 
frm.submit();
}
function ViewFeedback( frm, lInstinvid ) {
frm.hidPageMode.value = "View";
frm.hidInstinvid.value = lInstinvid;
frm.action = "Feedback_TextView.asp";
frm.submit();
}
function AddFeedback( frm, lInstinvid, lInstinvnm ) {
frm.hidPageMode.value = "Add";
frm.hidInstinvid.value = lInstinvid;
frm.hidInstinvnm.value = lInstinvnm;
frm.submit();
}
function sortServerSide(frm, sSortBy1, action){
if (sSortBy1 != "") {
frm.hidSortBy1.value = sSortBy1; 
}
setOrder(frm);
frm.action = action; 
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
