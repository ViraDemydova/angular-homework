<!-- 
var nSelectedAttendee = 0;
var AddAttendees=window.parent.opener.document.frmMain.hidAddAttendees.value;
var RemoveAttendees=window.parent.opener.document.frmMain.hidRemoveAttendees.value;
function onPageLoad()
{
var sSelectAttendees,sRemoveAttendees;
var arrSelectAttendees,i,arrRemoveAttendees;
sSelectAttendees = window.parent.opener.document.frmMain.hidAddAttendees.value;
sRemoveAttendees = window.parent.opener.document.frmMain.hidRemoveAttendees.value;
arrSelectAttendees = sSelectAttendees.split("~");
arrRemoveAttendees = sRemoveAttendees.split("~");
if(document.frmMain.cbSelect)
{
if(document.frmMain.cbSelect.length)
{
for(i=0;i< arrSelectAttendees.length ;i= i+ 2)
{
for(j=0;j<document.frmMain.cbSelect.length;j++)
{
if(document.frmMain.cbSelect[j].value == arrSelectAttendees[i])
{
document.frmMain.cbSelect[j].checked = true;
}
}
}
for(i=0;i< arrRemoveAttendees.length ;i++)
{
for(j=0;j<document.frmMain.cbSelect.length;j++)
{
if(document.frmMain.cbSelect[j].value == arrRemoveAttendees[i])
{
document.frmMain.cbSelect[j].checked = false;
}
}
}
}
else
{
for(i=0;i< arrSelectAttendees.length ;i= i+ 2)
{
if(document.frmMain.cbSelect.value == arrSelectAttendees[i])
{
document.frmMain.cbSelect.checked = true;
}
}
for(i=0;i< arrRemoveAttendees.length ;i++)
{
if(document.frmMain.cbSelect.value == arrRemoveAttendees[i])
{
document.frmMain.cbSelect.checked = false;
}
}
}
}
if(document.frmMain.hidAnalystManagementScheduleId.value =="")
{
switch(document.frmMain.hidAttendeeTypeCd.value)
{
case "ISSUER":
nSelectedAttendee = window.parent.opener.document.all.spanIssuerCnt.innerText;
break;
case "BANKER":
nSelectedAttendee = window.parent.opener.document.all.spanBankerCnt.innerText;
break;
}
}	
}
function CustomValidation( frm, arrFieldsInError )
{
var arrMoreErrors = new Array();
if (frm.hidAttendeeTypeCd.value != "OTHER")
{	
if(typeof(frm.sFirm) != "undefined")
frm.hidFirmName.value = frm.sFirm.value;
if(frm.hidFirmName.value.length ==0)
{
if(typeof(frm.sFirmName) != "undefined")
var arrError = FieldErrorInfo("", "", "sFirm", "", "Firm Name - Value is required");
else
var arrError = FieldErrorInfo("", "", "", "", "Firm Name - Value is required");
arrError[2] = '';
arrMoreErrors[0] = arrError;
}
}
return (arrMoreErrors);
} 
function submitPage( frm, action, sID, sName )
{
switch (action)
{
case "Add":
if (ValidateForm(frm))
{
window.parent.opener.SetDirtyFlag();
var AttendeeInfo;
AttendeeInfo = frm.sFirstName.value +"~";
AttendeeInfo = AttendeeInfo + frm.sLastName.value +"~"+ frm.sFirm.value + "~" + frm.hidAttendeeTypeCd.value;
var strAttendeelist = window.parent.opener.document.frmMain.hidAttendeeList.value
var bad = (strAttendeelist.indexOf(AttendeeInfo) > -1) ? 1 : 0;
if(bad)
{
alert("Duplicate Attendee.Please enter another one");
return;
}
window.parent.opener.document.frmMain.hidAttendeeList.value = window.parent.opener.document.frmMain.hidAttendeeList.value + "~" + AttendeeInfo;
window.parent.opener.document.frmMain.hidAttendeeAction.value ="Add"
window.parent.opener.document.frmMain.hidAttendeeTypeCd.value = frm.hidAttendeeTypeCd.value;
switch(frm.hidAttendeeTypeCd.value)
{
case "ISSUER":
window.parent.opener.document.frmMain.hidIssuerCnt.value = Number(window.parent.opener.document.frmMain.hidIssuerCnt.value) + 1;
window.parent.opener.document.all.spanIssuerCnt.innerText = Number(window.parent.opener.document.frmMain.hidIssuerCnt.value); 
break;
case "BANKER":
window.parent.opener.document.frmMain.hidBankerCnt.value = Number(window.parent.opener.document.frmMain.hidBankerCnt.value) + 1;
window.parent.opener.document.all.spanBankerCnt.innerText = Number(window.parent.opener.document.frmMain.hidBankerCnt.value); 
break;
case "INVESTOR":
window.parent.opener.document.frmMain.hidInvestorCnt.value = Number(window.parent.opener.document.frmMain.hidInvestorCnt.value) + 1;
window.parent.opener.document.all.spanInvestorCnt.innerText = window.parent.opener.document.frmMain.hidInvestorCnt.value;
break;
case "OTHER":
window.parent.opener.document.frmMain.hidOtherCnt.value = Number(window.parent.opener.document.frmMain.hidOtherCnt.value) + 1;
window.parent.opener.document.all.spanOtherCnt.innerText = window.parent.opener.document.frmMain.hidOtherCnt.value;
break;
}
nTotalCnt = Number(window.parent.opener.document.all.spanIssuerCnt.innerText) + Number(window.parent.opener.document.all.spanBankerCnt.innerText);
nTotalCnt = nTotalCnt + Number(window.parent.opener.document.all.spanInvestorCnt.innerText);
nTotalCnt = nTotalCnt + Number(window.parent.opener.document.all.spanOtherCnt.innerText);
window.parent.opener.document.all.spanTotalCnt.innerText = nTotalCnt;
window.close();
}
break;
case "Update":
if (ValidateForm(frm))
{
frm.hidAction.value = "Update";	
frm.method = "POST";
frm.action = "util_submit_action.asp";
frm.submit();
}	
break; 
case "UpdateShowInd":
frm.hidAction.value = "UpdateShowInd";	
frm.method = "POST";
frm.action = "util_submit_action.asp";
frm.submit();
break;	
case "Delete":
frm.hidAction.value = "Delete";	
frm.method = "POST";
frm.action = "util_submit_action.asp";
frm.submit();
break; 
case "Cancel":
window.location.reload(true);
break;
case "Select":
var i;
var nAttendee=0;
window.parent.opener.SetDirtyFlag();
switch(frm.hidAttendeeTypeCd.value)
{
case "ISSUER":
if(document.frmMain.hidAnalystManagementScheduleId.value =="")
window.parent.opener.document.all.spanIssuerCnt.innerText = nSelectedAttendee;
else 
window.parent.opener.document.all.spanIssuerCnt.innerText = Number(window.parent.opener.document.all.spanIssuerCnt.innerText) + Number(nSelectedAttendee);
break;
case "BANKER":
if(document.frmMain.hidAnalystManagementScheduleId.value =="")
window.parent.opener.document.all.spanBankerCnt.innerText = Number(nSelectedAttendee);
else
window.parent.opener.document.all.spanBankerCnt.innerText = Number(window.parent.opener.document.all.spanBankerCnt.innerText)+ Number(nSelectedAttendee);
break;
}
nTotalCnt = Number(window.parent.opener.document.all.spanIssuerCnt.innerText) + Number(window.parent.opener.document.all.spanBankerCnt.innerText);
nTotalCnt = nTotalCnt + Number(window.parent.opener.document.all.spanInvestorCnt.innerText);
nTotalCnt = nTotalCnt + Number(window.parent.opener.document.all.spanOtherCnt.innerText);
window.parent.opener.document.all.spanTotalCnt.innerText = nTotalCnt;
window.parent.opener.document.frmMain.hidAttendeeAction.value ="Select"
window.parent.opener.document.frmMain.hidAddAttendees.value = AddAttendees;
window.parent.opener.document.frmMain.hidRemoveAttendees.value = RemoveAttendees;
window.parent.opener.document.frmMain.hidAttendeeTypeCd.value = frm.hidAttendeeTypeCd.value;
window.parent.opener.document.frmMain.hidIssuerCnt.value = window.parent.opener.document.all.spanIssuerCnt.innerText ;
window.parent.opener.document.frmMain.hidBankerCnt.value = window.parent.opener.document.all.spanBankerCnt.innerText ;
window.parent.opener.document.frmMain.hidInvestorCnt.value = window.parent.opener.document.all.spanInvestorCnt.innerText ;
window.parent.opener.document.frmMain.hidOtherCnt.value = window.parent.opener.document.all.spanOtherCnt.innerText ;
window.close();
break;
case "Close":
window.close();
break; 
}
}
function deleteAttendee(AnalystManagementAttendeeId)
{
document.frmMain.hidAnalystManagementAttendeeId.value = AnalystManagementAttendeeId;
submitPage(document.frmMain, 'Delete');
}
function OnSelectFirm()
{
var lEventID = document.frmMain.hidAnalystManagementScheduleId.value;
var sType="INVESTOR";
var sFirstName = document.frmMain.rsFirstName.value;
var sLastName = document.frmMain.rsLastName.value;
url="roadshow_firm_search_popup.asp?AnalystID="+ lEventID+"&Type="+sType + "&FirstName=" + escape(sFirstName) + "&LastName=" + escape(sLastName);
window.location = url;
}
function UpdateAttendees(elt)
{
var rExp = eval("/" + elt.value+ "/gi");
if(elt.checked == true)
{
nSelectedAttendee = Number(nSelectedAttendee) + 1
AddAttendees = AddAttendees + elt.value +"~" + document.frmMain.hidAttendeeTypeCd.value + "~";
RemoveAttendees = RemoveAttendees.replace(rExp,"");
}
else
{
nSelectedAttendee = Number(nSelectedAttendee) - 1
RemoveAttendees = RemoveAttendees + elt.value +"~";
AddAttendees = AddAttendees.replace(rExp,"")
}
}
