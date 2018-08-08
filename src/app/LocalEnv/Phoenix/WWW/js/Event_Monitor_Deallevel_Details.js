<!-- 
RSEnableRemoteScripting("/_ScriptLibrary");
function onPageLoad()
{
ConfirmRemoteScripting();
RSCallObject_wait();
}
function PopupEvent(iEventId,sIssueNm)
{
var sUrl = "Event_Monitor_Details_Popup.asp?EventID=" + iEventId + "&issue_nm=" + sIssueNm;
openGeneralPopup(sUrl,"","width=450,height=300,toolbar=no,scrollbars=yes,menubar=no,resizable=yes");
}
function ShowDealLevelDetails(elt)
{
var sName = elt.options[elt.selectedIndex].innerText;
var sValue = elt.options[elt.selectedIndex].value;
var co= RSExecute ('rs_GetCoordinatorInfo_server.asp', 'SaveSessionKeyValuePair','IssueID', sValue);
if (co.return_value != "1")
alert("Failed to save roadshow session info. !");
window.location = "Event_Monitor_Deallevel.asp?Iss_Id=" + sValue + "&issue_nm=" + sName;
}
function showDealLevelInfo(iIssId,sIssName)
{
var co= RSExecute ('rs_GetCoordinatorInfo_server.asp', 'SaveSessionKeyValuePair','IssueID', iIssId);
if (co.return_value != "1")
alert("Failed to save roadshow session info. !");
window.location = "Event_Monitor_Deallevel.asp?Iss_Id=" + iIssId + "&issue_nm=" + sIssName;
}
function UpdateDeallevelDetails(sIssueNm,sIssId,frm)
{
var iEventId = frm.categories.options[frm.categories.selectedIndex].value;
var sEventType = frm.status.options[frm.status.selectedIndex].value;
window.location = "Event_Monitor_Deallevel_Details.asp?Iss_Id=" + sIssId + "&EventTypeId=" + iEventId + "&EventTypeFlag=" +sEventType;
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
