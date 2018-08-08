<!-- 
function onPageLoad()
{
}
function CustomValidation( frm, arrFieldsInError )
{
return (arrMoreErrors);
}
function submitPage( frm, action, sID, sName )
{
switch (action)
{
case "Save":
if (ValidateForm(frm))
{
if (parseInt(frm.hidEventId.value) > 0)
frm.hidAction.value = "Update";
else
frm.hidAction.value = "Add";
frm.method = "POST";
frm.action = "util_submit_action.asp";
frm.submit();
}	
break;
case "Cancel":
window.location.reload(true);
break;	
case "Search":
frm.action = "roadshow_analyst_mgmt_event_popup.asp";
frm.method = "POST";
frm.submit();
break;	
case "close":
window.close();
break; 
}
}
function onSelectDeal(issId, issName)
{
window.opener.document.all("sDealName").innerText = issName;
window.opener.document.all("sDealName").style.color = "";
window.opener.document.frmMain.hidIssId.value = issId;
window.opener.document.frmMain.hidAddAttendees.value ="";
window.opener.document.frmMain.hidRemoveAttendees.value ="";
window.opener.document.frmMain.hidAddAttendees.value ="";
window.opener.document.frmMain.hidRemoveAttendees.value ="";
window.opener.document.frmMain.hidAttendeeList.value = "";
window.parent.opener.document.all.spanIssuerCnt.innerText = "0";
window.parent.opener.document.all.spanBankerCnt.innerText = "0";
window.parent.opener.document.all.spanInvestorCnt.innerText = "0";
window.parent.opener.document.all.spanOtherCnt.innerText = "0";
window.parent.opener.document.all.spanTotalCnt.innerText ="0"
window.parent.opener.document.frmMain.hidIssuerCnt.value = "0";
window.parent.opener.document.frmMain.hidBankerCnt.value = "0";
window.parent.opener.document.frmMain.hidInvestorCnt.value = "0";
window.parent.opener.document.frmMain.hidOtherCnt.value = "0";
window.close();
}
