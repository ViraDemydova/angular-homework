<!-- 
function onPageLoad()
{
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
case "add_new_event":
window.location = 'roadshow_analyst_mgmt_event.asp';
break;
case "delete" :
{
if (frm.hidAnalystManagementScheduleId != null)
{
if (frm.hidAnalystManagementScheduleId.length != null)
{
var total = 0;
for (var i=0; i<frm.hidAnalystManagementScheduleId.length; i++)
{
if (frm.hidAnalystManagementScheduleId[i].checked)
total++;
}
if (total > 0)
{
if (window.confirm('Are you sure to delete ' + total + ' item(s)?') == false)
{
return;
} 
}
}
else
{
if (frm.hidAnalystManagementScheduleId.checked)
{
if (window.confirm('Are you sure to delete 1 item?') == false)
return;
}
}	
} 
frm.hidAction.value = "Delete";
frm.hidProgID.value = "Roadshow_usr.AnalystManagement";
frm.action = "util_submit_action.asp";
frm.method = "POST";
frm.submit();
} 
break;	
case "update":
if (ValidateForm(frm))
{
frm.action = 'roadshow_analyst_mgmt_schedule.asp';
frm.method = "POST";
frm.submit();
}
break; 
}
}
