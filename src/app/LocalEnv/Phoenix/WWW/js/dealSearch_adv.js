<!-- 
function CheckConditionallyRequiredFields( frm, arrFieldsInError )
{
var arrMoreErrors = new Array();
return (arrMoreErrors);
} 
function CustomValidation( frm, arrFieldsInError )
{
var arrMoreErrors = new Array();
var bPostponedChecked = false;
var bCancelledChecked = false;
var bPostponedDateChecked;
var bCancelledDateChecked;
var bPerformSubmit = true;
var j = -1;
if (frm.name == "frmSearchSettings") {
if (frm.hidbusinessarea.value == 'Syndicate') {
for (var i = 0; i < frm.cbDealStatus.length; i++) {
if (frm.cbDealStatus[i].value == "Postponed"){
if (frm.cbDealStatus[i].checked) { 
bPostponedChecked = true;
}
continue;
}
if (frm.cbDealStatus[i].value == "Cancelled") {
if (frm.cbDealStatus[i].checked) {
bCancelledChecked = true;
}
continue;
} 
} 
if (frm.dtDealStatusPostponedFrom.value == "" && frm.dtDealStatusPostponedTo.value == "") {
bPostponedDateChecked = false;
} else {
bPostponedDateChecked = true;
}
if (frm.dtDealStatusCancelledFrom.value == "" && frm.dtDealStatusCancelledTo.value == "") {
bCancelledDateChecked = false;
} else {
bCancelledDateChecked = true;
}
if (bPostponedChecked) {
if (bPostponedDateChecked == false) {
j++; 
arrMoreErrors[j] = FieldErrorInfo("dtDealStatusPostponedFrom", 'You must enter a Postponed date value.', "", "dtDealStatusPostponedFrom", "Postponed Deal Status"); 
}
}
if (bPostponedDateChecked) {
if (bPostponedChecked == false) {
j++; 
arrMoreErrors[j] = FieldErrorInfo("cbPostponed", 'You must check Postponed checkbox.', "", "", ""); 
}
}	
if (bCancelledChecked) {
if (bCancelledDateChecked == false) {
j++; 
arrMoreErrors[j] = FieldErrorInfo("dtDealStatusCancelledFrom", 'You must enter a Cancelled date value.', "", "dtDealStatusCancelledFrom", "Cancelled Deal Status"); 
}
}
if (bCancelledDateChecked) {
if (bCancelledChecked == false) {
j++; 
arrMoreErrors[j] = FieldErrorInfo("cbCancelled", 'You must check Cancelled checkbox.', "", "", ""); 
}
}
}
} 
return (arrMoreErrors);
} 
function submitPage( frm )
{
if(ValidateForm( frm ))
{ 
frm.submit();
}
}
function getDealDetails(sIss_id, frm) {
frm.hidIssueId.value = sIss_id;
frm.submit();
}
function submitRevert( frm ) {
frm.hidRevertToPrefs.value = "true";
frm.action = 'dealSearch_adv.asp';
frm.submit();
}
function submitSave( frm ) {
frm.hidSaveToPrefs.value = "true";
frm.submit();
}
function submitClear( frm ) {
frm.reset();
}
function setDebtEquity(sIssueType, frm) {
frm.hidDebtEquity.value = sIssueType;
frm.action = 'dealSearch_adv.asp';
frm.submit();
}
