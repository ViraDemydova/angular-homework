<!-- 
function onPageLoad()
{
menuShow('issuemaint_dealdetails_eq', 'show');
}
function CheckConditionallyRequiredFields( frm, arrFieldsInError )
{
var arrMoreErrors = new Array();
return (arrMoreErrors);
} 
function CustomValidation( frm, arrFieldsInError )
{
var arrMoreErrors = new Array();
return (arrMoreErrors);
} 
function submitPage( frm , action )
{
switch (action)
{
case "SaveChanges" :
if(ValidateForm( frm ))
{
frm.action = "/asp/util_submit_action.asp";
frm.hidAction.value = "Update";
frm.submit(); 
}
break;
case "RevertToSaved" :
window.location.reload();
break;
case "Cancel" :
frm.action = "/asp/bookbuild_issuerinfo.asp";
frm.submit();
break;
}
}
function formatDecimalString2(obj, digits)
{
var num = obj.value.replace(/(\,)/g,"");
obj.value = num;
formatFixedDecimalAmount(obj, digits);
}
