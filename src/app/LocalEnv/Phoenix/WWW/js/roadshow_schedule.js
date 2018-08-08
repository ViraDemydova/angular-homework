<!-- 
RSEnableRemoteScripting("/_ScriptLibrary");
function onPageLoad()
{
ConfirmRemoteScripting();
RSCallObject_wait();
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
if (frm.chkDeleteEventId != null)
{
if (frm.chkDeleteEventId.length != null)
{
var total = 0;
for (var i=0; i<frm.chkDeleteEventId.length; i++)
{
if (frm.chkDeleteEventId[i].checked)
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
if (frm.chkDeleteEventId.checked)
{
if (window.confirm('Are you sure to delete 1 item?') == false)
return;
}
}	
}
if (ValidateForm(frm))
{
frm.action = "util_submit_action.asp";
frm.submit();
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
case 'export':
frm.action="/asp/roadshow_schedule_report.asp";
frm.submit();
break; 
}
}
function addEvent(RsIssId, EventDate, RsDaySetupId)
{
window.location="roadshow_event.asp?RsIssId=" + RsIssId + "&RsDaySetupId=" + RsDaySetupId + "&RoadshowDttm=" + EventDate + "&mode=" + document.frmMain.hidMode.value + "&ScheduleRoadshowDttm=" + document.frmMain.hidRoadshowDttm.value;
}
function updateEvent(RsIssId, EventDate, EventId)
{
window.location="roadshow_event.asp?RsIssId=" + RsIssId + "&RoadshowDttm=" + EventDate + "&EventId=" + EventId + "&mode=" + document.frmMain.hidMode.value + "&ScheduleRoadshowDttm=" + document.frmMain.hidRoadshowDttm.value;
}
function Export(frm)
{
var maxDate = frm.hidMaxDate.value;
var arrDates = new Array();
for ( var i=1; i<=maxDate; i++ ) 
{ 
var obj = document.all["tblDate" + i];
arrDates[i] = obj ? String(obj.innerText) : ","; 
} 
var co= RSExecute ('rs_GetCoordinatorInfo_server.asp', 'SaveSessionKeyValuePair','DateArray', arrDates);
if (co.return_value != "1")
alert("Failed to save roadshow session info. !");
var RoadshowDttm = frm.hidRoadshowDttm.value
var re = new RegExp (' ', 'gi') ;
window.location = "roadshow_schedule_report.asp?RoadshowDttm=" + RoadshowDttm.replace(re, '%20')+ "&mode=" + frm.hidMode.value;
}
function ConfirmRemoteScripting()
{
var enabled = false;
enabled = RSExecute('rs_GetCoordinatorInfo_server.asp', 'js_RemoteScriptingEnabled').return_value;
if (! enabled)
{
alert("Remote scripting not enabled");
}
}
