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
case "Update" :
if(ValidateForm( frm ))
{
frm.method = "POST"; 
frm.action = "util_submit_action.asp";
frm.hidAction.value = "Update";
frm.submit(); 
}
break;
case "Delete" :
if (window.confirm("Do you wish to delete " + frm.hidBrokerName.value + " ?"))
{
frm.method = "POST"; 
frm.action = "util_submit_action.asp";
frm.hidAction.value = "Delete";
frm.submit();	
}
break; 
case "RevertToSaved" :
window.location.reload();
break;
case "Cancel" :
window.location = "syndpart_overview.asp";
break;
case "AddReg" :
frm.action = "/asp/_template.asp";
frm.hidAction.value = "Add";
frm.submit();
break;
}
}
