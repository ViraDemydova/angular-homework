<!-- 
function onPageLoad()
{
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
case "delete" :
case "delete" :
frm.action = "/asp/util_submit_action.asp";
frm.hidAction.value = "Delete"
frm.submit();
break;
case "Cancel" :
window.close();
break;
}
}
