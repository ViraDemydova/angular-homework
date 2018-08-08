<!-- 
function EditFeedback( frm, lInstinvid ) {
frm.hidPageMode.value = "Update";
frm.hidInstinvid.value = lInstinvid;
frm.action = "Feedback_Form.asp"; 
frm.submit();
}
function ViewFeedback( frm, lInstinvid ) {
frm.hidPageMode.value = "View";
frm.hidInstinvid.value = lInstinvid;
frm.action = "Feedback_TextView.asp";
frm.submit();
}
function AddFeedback( frm, lInstinvid, sInstinvnm ) {
frm.hidPageMode.value = "Add";
frm.hidInstinvid.value = lInstinvid;
frm.hidInstinvnm.value = sInstinvnm;
frm.action = "Feedback_Form.asp";
frm.submit();
}
function sortServerSide(frm, sSortBy1){
if (sSortBy1 != "") {
frm.hidSortBy1.value = sSortBy1; 
}
setOrder(frm); 
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
function sortandSearch(frm, sSortBy) {
frm.hidSearchInd.value = true;
sortServerSide(frm, sSortBy);
}
function submitPage( frm )
{
if(ValidateForm( frm ))
{
frm.hidSearchInd.value = true;
frm.submit(); 
}
}
