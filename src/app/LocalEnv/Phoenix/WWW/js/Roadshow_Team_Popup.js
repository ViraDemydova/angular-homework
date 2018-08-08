<!-- 
function onPageLoad()
{
document.frmMain.rtxtTeamName.focus();
}
function CustomValidation( frm, arrFieldsInError )
{
var arrMoreErrors = new Array();
return (arrMoreErrors);
} 
function submitPage( frm, action, sID, sName )
{
switch (action)
{
case "Update":
if (ValidateForm(frm))
{	
frm.hidAction.value = "Update";
frm.action = "/asp/util_submit_action.asp";
frm.submit();
}
break;
case "Delete":
if (confirm("Are you sure you want to delete entire team?") == true)
{
frm.hidAction.value ="Delete"
frm.action = "/asp/util_submit_action.asp";
frm.submit();
}
break;
case "Cancel":
if (confirm("Are you sure you want to cancel it?") == true)
frm.reset();
break;
case "Next":
var vIssID = frm.hidDealID.value;
var vDealName = frm.hidDealName.value;
frm.action = "/asp/Roadshow_overview_contacts.asp?IssID=" + vIssID + "&DName=" + vDealName;
frm.submit();
break;
case "Previous":
frm.action = "/asp/specialRoadshow_Overview.asp";
frm.submit();
break;
}
}
