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
if (frm.hidAction.value == "Find")
{
if (frm.findBy[0].checked)
{
if (frm.sName.value.length < 1)
{
var arrError = FieldErrorInfo("", "", "", "sName", "Please enter at least 1 character to search");
arrError[2] = '';
arrMoreErrors[0] = arrError;
return (arrMoreErrors); 
}
}
}
if (frm.hidAction.value == "Add")
{ 
var lLength = frm.hidBrokerCount.value;
var bSelected = false;
for (var i=1; i<=lLength; i++)
{
var sItem = "cbAddBroker_" + i.toString();
if (frm.elements[sItem].checked == true)
{
bSelected = true;
break;
}
}
if (!bSelected)
{
var arrError = FieldErrorInfo("", "", "", "cbAddBroker_1", "Please select at least one broker");
arrError[2] = '';
arrMoreErrors[0] = arrError;
return (arrMoreErrors); 
}
return (arrMoreErrors);
}
return (arrMoreErrors);
} 
function submitPage( frm , action )
{
switch (action)
{
case "SaveChanges" :
if(ValidateForm( frm ))
{ 
frm.method = "POST";
frm.action = "util_submit_action.asp";
frm.submit(); 
}
break;
case "RevertToSaved" :
window.location.reload();
break;
case "Cancel" :
frm.action = "/asp/_template.asp";
frm.submit();
break;
case "AddReg" :
frm.action = "/asp/_template.asp";
frm.hidAction.value = "Add";
frm.submit();
break;
case "Find" :
frm.hidAction.value = action;
frm.method = "POST";
frm.action = "syndpart_add_uw.asp";
if(ValidateForm( frm ))
{
frm.submit();
}
break; 
}
}
