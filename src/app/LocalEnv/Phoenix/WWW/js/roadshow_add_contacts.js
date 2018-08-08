<!-- 
var PopupHandle;
window.onunload = closePopups;
function onPageLoad()
{
}
function submitPage( frm, action)
{
switch (action)
{
case "Search" :
var vFirstName = frm.txtFirstName.value;
var vLastName = frm.txtLastName.value;
var vIssueID = frm.hidIssueID.value;
var vRsIssueID = frm.hidRsIssueID.value;
var vDName = frm.hidDName.value;
var vECode = frm.hidECode.value;
var vAliasName = frm.hidAName.value;
var vAliasCode = frm.hidACode.value;
var vIssrID = frm.hidIssuerId.value;
var vType = frm.hidType.value;
var vTrnID = frm.hidTrnID.value;
var vSmID = frm.hidSmID.value;
var vBrkName = frm.hidBrokerName.value;
frm.action = "/asp/Roadshow_add_contacts.asp?FirstName=" + vFirstName +"&LastName="+ vLastName+ "&Type=" + vType +"&RsIssId=" + vRsIssueID + "&IssrID=" + vIssrID + "&IssID=" + vIssueID +"&DName=" + vDName + "&ECode=" + vECode + "&AName=" + vAliasName + "&ACode=" + vAliasCode+"&trnid=" + vTrnID +"&smid="+ vSmID +"&brknm="+vBrkName ;
frm.hidAction.value = "Search";
frm.submit();
break;
}
}
function OnUserSelected(frm,sUserID,sFName,sLName,sTitle,sPhoneno)
{
frm.hidUserid.value = sUserID;
var vIssrID = document.frmMain.hidIssuerId.value;
var vType = document.frmMain.hidType.value;
var sUrl = "Roadshow_AddUser_Popup.asp?" + "IssrID=" + vIssrID+"&Type=" + vType+"&FName="+sFName+"&LName="+sLName+"&Title="+sTitle+"&Phoneno="+sPhoneno +"&UserID=" +sUserID;
var sStyle = "width=450, height=400, scrollbars=1";
PopupHandle= window.open( sUrl, null, sStyle );
}
function AddUserSelected(frm)
{
frm.hidAction.value ="Add";
frm.hidProgID.value = "Roadshow_usr.Roadshowcontacts";
frm.action = "/asp/util_submit_action.asp";
frm.submit();
}
function PopupAddUser()
{
var vIssrID = document.frmMain.hidIssuerId.value;
var vType = document.frmMain.hidType.value;
var sUrl = "Roadshow_AddUser_Popup.asp?" + "IssrID=" + vIssrID+"&Type=" + vType;
var sStyle = "width=450, height=400, scrollbars=1";
PopupHandle = window.open( sUrl, null, sStyle );
}
function closePopups()
{
if(PopupHandle != null)
PopupHandle.close();
}
