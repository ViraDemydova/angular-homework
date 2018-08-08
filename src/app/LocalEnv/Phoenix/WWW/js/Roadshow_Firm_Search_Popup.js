<!-- 
function onPageLoad()
{
}
function CustomValidation( frm, arrFieldsInError )
{
} 
function submitPage( frm, action )
{
switch (action)
{
case "Search":
var lEventID = document.frmMain.hidEventID.value;
var lAnalystID = document.frmMain.hidAnalystID.value;
sFirstName = document.frmMain.hidFirstName.value;
sLastName = document.frmMain.hidLastName.value;
frm.action="Roadshow_Firm_Search_Popup.asp?Search=" + frm.sFirm.value +"&Type=INVESTOR" +"&EventID=" + lEventID + "&AnalystID=" + lAnalystID + "&FirstName=" + escape(sFirstName) + "&LastName=" + escape(sLastName);
frm.submit();
break;
case "Delete":
break;
case "Update":
break;
}
}
function OnUserSelected(sName,inst_inv_id)
{
var lEventID = document.frmMain.hidAnalystID.value;
if(lEventID !="")
{
var sFirstName,sLastName;
sFirstName = document.frmMain.hidFirstName.value;
sLastName = document.frmMain.hidLastName.value;
window.location = "roadshow_analyst_mgmt_attendee_popup.asp?action=add&AnalystManagementScheduleId=" + lEventID + "&AttendeeTypeCd=INVESTOR" + "&FName=" + sName + "&FirstName=" + escape(sFirstName) + "&LastName=" + escape(sLastName);
}
else
{
lEventID = document.frmMain.hidEventID.value;
if(window.opener.document.all.spanFirm)
{
window.opener.document.all.spanFirm.innerText = sName;
window.parent.opener.document.frmMain.hidFirmName.value = sName;
window.parent.opener.document.frmMain.hidFirmId.value = inst_inv_id;
window.close();
}
else
{
window.location = "roadshow_analyst_mgmt_attendee_popup.asp?action=add&AnalystManagementScheduleId=" + lEventID + "&AttendeeTypeCd=INVESTOR" + "&FName=" + sName;
}
}
}
function OnQuickAdd()
{
var url;
var lEventID = document.frmMain.hidEventID.value;
url="roadshow_addattendee_popup.asp?EventID="+ lEventID+"&Type=Investor";
openGeneralPopup(url, '', 'width=600,height=400,toolbar=no,scrollbars=yes,menubar=no,resizable=yes');
}
