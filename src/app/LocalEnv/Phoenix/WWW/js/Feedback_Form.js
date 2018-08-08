<!-- 
function CheckConditionallyRequiredFields( frm, arrFieldsInError )
{
var arrMoreErrors = new Array();
var iIssueConcern = frm.txtIssueConcern.value.length;
var iSalesComments = frm.txtSalesComments.value.length;
var iMAXLENGTH = 300;
if ( iIssueConcern > iMAXLENGTH ) {
var arrError = FieldErrorInfo("txtIssueConcern", 'Issues/Concerns exceeds the maximum length allowed', "", "txtIssueConcern", "Issues/Concerns");
arrMoreErrors[arrMoreErrors.length] = arrError;
}
if ( iSalesComments > iMAXLENGTH ) {
var arrError = FieldErrorInfo("txtSalesComments", 'Sales Comments exceeds the maximum length allowed', "", "txtSalesComments", "Sales Comments");
arrMoreErrors[arrMoreErrors.length] = arrError;
}
return (arrMoreErrors);
}
function CustomValidation( frm, arrFieldsInError )
{
var arrMoreErrors = new Array();
var bHoldDealInd = false;
var bInterestlvl = false;
var bValuationlvl = false;
var iHoldDealIndFocus = "0";
var iInterestlvl = "2";
var iValuationlvl = "2";
var j = -1;
for ( var i=0; i < frm.btnHoldDealInd.length; i++ ) { 
bHoldDealInd |= frm.btnHoldDealInd[i].checked;
}
for ( var i=0; i < frm.btnInterestlvl.length; i++ ) { 
bInterestlvl |= frm.btnInterestlvl[i].checked;
}
for ( var i=0; i < frm.btnValuationlvl.length; i++ ) { 
bValuationlvl |= frm.btnValuationlvl[i].checked;
}
if (!bHoldDealInd) {
j++; 
arrMoreErrors[j] = FieldErrorInfo("btnHoldDealInd", 'You must select a value.', "", "btnHoldDealInd[" + iHoldDealIndFocus + "]", "Hold deal indicator"); 
}
if (!bInterestlvl) {
j++; 
arrMoreErrors[j] = FieldErrorInfo("bInterestlvl", 'You must select a value.', "", "btnInterestlvl[" + iInterestlvl + "]", "Interest Level"); 
}
if (!bValuationlvl) {
j++; 
arrMoreErrors[j] = FieldErrorInfo("bValuationlvl", 'You must select a value.', "", "btnValuationlvl[" + iValuationlvl + "]", "Valuation Level"); 
}
return (arrMoreErrors);
} 
function submitPage( frm )
{
if(ValidateForm( frm ))
{
frm.action = "/asp/util_submit_action.asp";
frm.submit(); 
}
}
