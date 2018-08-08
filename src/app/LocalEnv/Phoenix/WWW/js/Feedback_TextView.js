<!-- 
function CheckConditionallyRequiredFields( frm, arrFieldsInError )
{
var arrMoreErrors = new Array();
var iCmMarket = frm.txtCmMarket.value.length;
var iMAXLENGTH = 300;
if ( iCmMarket > iMAXLENGTH ) {
var arrError = FieldErrorInfo("txtCmMarket", 'Capital Market comments exceeds the maximum length allowed', "", "txtCmMarket", "Capital Market Comments");
arrMoreErrors[arrMoreErrors.length] = arrError;
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
