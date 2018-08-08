<!-- 
var g_blnDirtyFlag;
function onPageLoad()
{
g_blnDirtyFlag = 0;
var PopupUrl;
PopupUrl = document.frmMain.hidPopupUrl.value;
if(PopupUrl == "View_Attendee")
{
openGeneralPopup('roadshow_analyst_mgmt_attendee_popup.asp?action=' + 'view' + '&AnalystManagementScheduleId=' + document.frmMain.hidAnalystManagementScheduleId.value, '', 'width=600,height=400,toolbar=no,scrollbars=yes,menubar=no,resizable=yes');
}
}
function CustomValidation( frm, arrFieldsInError )
{
var arrMoreErrors = new Array();
if (frm.dtDate.value.length == 0)
{
var arrError = FieldErrorInfo("dtDate", 'Please enter a date', "", "", "Date");
arrMoreErrors[arrMoreErrors.length] = arrError;	
}	
if (!(parseInt(frm.hidIssId.value) > 0))
{
var arrError = FieldErrorInfo("", 'Please select an Issue', "", "", "Issue");
arrMoreErrors[arrMoreErrors.length] = arrError;	
}	
return (arrMoreErrors);
} 
function submitPage( frm, action )
{
frm.hidPopupUrl.value ="";
switch (action)
{
case "Save":
var sAddAttendees = frm.hidAddAttendees.value;
var sRemoveAttendess = frm.hidRemoveAttendees.value;
var sAttendeeList = frm.hidAttendeeList.value;
frm.hidAddAttendees.value = "";
frm.hidRemoveAttendees.value = "";
frm.hidAttendeeList.value = "";
if (ValidateForm(frm))
{
if (parseInt(frm.hidAnalystManagementScheduleId.value) > 0)
frm.hidAction.value = "Update";
else
frm.hidAction.value = "Add";
frm.hidAddAttendees.value = sAddAttendees;
frm.hidRemoveAttendees.value = sRemoveAttendess;
frm.hidAttendeeList.value = sAttendeeList;
frm.action = "util_submit_action.asp";
frm.submit();
}	
frm.hidAddAttendees.value = sAddAttendees;
frm.hidRemoveAttendees.value = sRemoveAttendess;
frm.hidAttendeeList.value = sAttendeeList;
break;
case "Delete" :
{
if (window.confirm('Are you sure to delete this schedule?') == true)
{ 
frm.hidAction.value = "Delete";
frm.action = "util_submit_action.asp";
frm.submit();
}
} 
break; 
case "cancel" :
{
window.location.reload(true);
} 
break; 
case "back" :
{
window.location = "roadshow_loc_setup.asp";
} 
break; 
}
}
function showAttendee(attendeeTypeCd, action)
{
var url;
var lAnalystManagementScheduleId = document.frmMain.hidAnalystManagementScheduleId.value;
url = "roadshow_analyst_mgmt_event.asp?AnalystManagementScheduleId="+ lAnalystManagementScheduleId;
if( g_blnDirtyFlag ==1 && action =='view')
{
if (ValidateForm(document.frmMain))
{
if (parseInt(lAnalystManagementScheduleId) > 0)
document.frmMain.hidAction.value = "Update";
else
document.frmMain.hidAction.value = "Add";
document.frmMain.hidPopupUrl.value = "View_Attendee";
document.frmMain.method = "POST";
document.frmMain.action = "util_submit_action.asp";
document.frmMain.submit();
}
}
else
{
var iIssId;
iIssId = document.frmMain.hidIssId.value;
openGeneralPopup('roadshow_analyst_mgmt_attendee_popup.asp?action=' + action + '&AnalystManagementScheduleId=' + document.frmMain.hidAnalystManagementScheduleId.value + '&AttendeeTypeCd=' + attendeeTypeCd + '&IssId=' + iIssId, '', 'width=600,height=400,toolbar=no,scrollbars=yes,menubar=no,resizable=yes');
}
}
function SetDirtyFlag()
{
g_blnDirtyFlag = 1;
}
