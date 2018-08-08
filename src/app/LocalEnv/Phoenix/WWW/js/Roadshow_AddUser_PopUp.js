<!-- 
function onPageLoad()
{
document.frmMain.rtxtFirstName.focus();
}
function CustomValidation( frm, arrFieldsInError )
{
var arrMoreErrors = new Array();
return (arrMoreErrors);
} 
function submitPage( frm, action )
{
switch (action)
{
case "Add":
if (ValidateForm(frm))
{
frm.hidAction.value = action;
window.opener.document.frmMain.hidNonUserFName.value = document.frmMain.rtxtFirstName.value;
window.opener.document.frmMain.hidNonUserLName.value = document.frmMain.rtxtLastName.value;
frm.action = "/asp/util_submit_action.asp";
frm.submit();
}
break;
case "Delete":
if (confirm("Are you sure you want to delete the user?") == true)
{
frm.hidAction.value ="Delete"
frm.action = "/asp/util_submit_action.asp";
frm.submit();
}
break;
case "Update":
if (ValidateForm(frm))
{
frm.hidAction.value = "Update";
frm.action = "/asp/util_submit_action.asp";
frm.submit();
}
break;
}
}
