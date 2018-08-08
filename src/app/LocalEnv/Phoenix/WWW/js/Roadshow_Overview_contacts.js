<!-- 
var blnChanged;
function onPageLoad()
{
blnChanged = false;
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
frm.action = "/asp/util_submit_action.asp";
frm.submit();
}
break;
case "Cancel":
if (confirm("Are you sure you want to cancel it?") == true)
frm.reset();
break;
case "Next":
var vRsIssId = frm.hidRsIssueID.value;
frm.action = "/asp/roadshow_loc_setup.asp?iRsIssId=" + vRsIssId;
frm.submit();
break; 
case "Save":
frm.hidAction.value ="Update";
frm.hidProgID.value ="Roadshow_usr.Roadshowcontacts";
frm.action = "/asp/util_submit_action.asp";
frm.submit();
blnChanged = false;
break;
case "Previous":
frm.action = "/asp/specialRoadshow_Overview.asp";
frm.submit();
break;
}
}
function ToggleActiveInd(frm)
{
if (frm.chkActive.checked == false)
frm.hidActiveInd.value = "0";
else
frm.hidActiveInd.value = "1";
}
function RemoveContacts(frm,Contact_id)
{
if(blnChanged == true)
{
if (confirm("Would you like to save the page before continue?") == true)
{
submitPage( document.frmMain,"Save");
}
}
if (confirm("Are you sure you want to remove this contact?") == true)
{
frm.hidContactID.value = Contact_id;
frm.hidAction.value = "Delete";
frm.hidProgID.value = "Roadshow_usr.RoadshowContacts";
frm.action = "/asp/util_submit_action.asp";
frm.submit();
}
}
function SetChagedFlag()
{
blnChanged = true
}
function popUpTeam(sTeamName,sTeamID) 
{
var sIssueID	= document.frmMain.hidIssueID.value;
var sDName = document.frmMain.hidDName.value;
var sECode = document.frmMain.hidECode.value;
var sRsIssueID = document.frmMain.hidRsIssueID.value;
var vAliasName	= document.frmMain.hidAName.value;
var vAliasCode	= document.frmMain.hidACode.value;
var vIssrID = document.frmMain.hidIssuerId.value;
var sUrl = "Roadshow_Team_Popup.asp?TName=" + sTeamName+"&TeamID=" + sTeamID +"&IssID=" + sIssueID + "&iRsIssId=" + sRsIssueID + "&DName=" + sDName + "&ECode=" + sECode + "&AName=" + vAliasName + "&ACode=" + vAliasCode +"&IssrID=" + vIssrID;
var sStyle = "width=450, height=400, scrollbars=1";
openGeneralPopup( sUrl, '', sStyle );
}
function showElement(oElement)
{
if (oElement)
{
if (document.getElementById)
{
oElement.style.visibility="visible";
}
else if (document.all)
{
oElement.style.visibility="visible";
}
else if (document.layers)
{
oElement.visibility="show";
}
return 1;
}
}
function hideElement(oElement)
{
if (oElement)
{
if (document.getElementById)
{
oElement.style.visibility="hidden";
}
else if (document.all)
{
oElement.style.visibility="hidden";
}
else if (document.layers)
{
oElement.visibility="hide";
}
return 1;
}
}
function popUpAdd(type,trn_id,sm_id,brk_nm)
{
var sIssueID	= document.frmMain.hidIssueID.value;
var sDName = document.frmMain.hidDName.value;
var sECode = document.frmMain.hidECode.value;
var sRsIssueID = document.frmMain.hidRsIssueID.value;
var vAliasName	= document.frmMain.hidAName.value;
var vAliasCode	= document.frmMain.hidACode.value;
var vIssrID = document.frmMain.hidIssuerId.value;
var sUrl = "Roadshow_add_contacts.asp?type=" + type+ "&IssID=" + sIssueID + "&RsIssId=" + sRsIssueID + "&DName=" + sDName + "&ECode=" + sECode + "&AName=" + vAliasName + "&ACode=" + vAliasCode + "&IssrID=" + vIssrID +"&trnid=" + trn_id +"&smid="+ sm_id +"&brknm="+ brk_nm;
var sStyle = "width=450, height=400, scrollbars=1";
openGeneralPopup( sUrl, '', sStyle );
}
function OnUserSelected(frm,sUserID,sFName,sLName,sTitle,sPhoneno)
{
var vIssrID = document.frmMain.hidIssuerId.value;
var sUrl = "Roadshow_AddUser_Popup.asp?" + "IssrID=" + vIssrID+"&FName="+sFName+"&LName="+sLName+"&Title="+sTitle+"&Phoneno="+sPhoneno +"&UserID=" +sUserID;
var sStyle = "width=450, height=400, scrollbars=1";
window.open( sUrl, null, sStyle );
}
