<!-- 
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
case "savechanges" :
if(ValidateForm( frm ))
{
frm.action = "/asp/_template.asp";
frm.hidAction.value = "Update"
frm.submit(); 
}
break;
case "reverttosaved" :
window.location.reload();
break;
case "cancel" :
frm.action = "/asp/_template.asp";
frm.submit();
break;
case "addreg" :
frm.action = "/asp/_template.asp";
frm.submit();
break;
}
}
