<!-- 
function CheckConditionallyRequiredFields( frm, arrFieldsInError )
{
var arrMoreErrors = new Array();
return (arrMoreErrors);
} 
function CustomValidation( frm, arrFieldsInError )
{
var arrMoreErrors = new Array();
return (arrMoreErrors);
} 
function submitPage( frm , action )
{
switch (action)
{
case "search" :
{
frm.action = "roadshow_event_1on1_popup.asp";
frm.submit(); 
}
break; 
case "close" :
{
window.close(); 
}
break; 
case "cancel" :
{
window.location.reload(true);
} 
break; 
}
}
function onSelect1On1(pos)
{
window.opener.document.frmMain.sName.value = document.frmMain.elements["hidName_" + pos].value;
window.opener.document.frmMain.sAddress1.value = document.frmMain.elements["hidAddr1_" + pos].value;
window.opener.document.frmMain.sAddress2.value = document.frmMain.elements["hidAddr2_" + pos].value;
window.opener.document.frmMain.sAddress3.value = document.frmMain.elements["hidAddr3_" + pos].value;
window.opener.document.frmMain.sPhone.value = document.frmMain.elements["hidInvPhone_" + pos].value;
window.opener.document.frmMain.sFax.value = document.frmMain.elements["hidInvFax_" + pos].value;
window.opener.document.frmMain.sSalesperson.value = document.frmMain.elements["hidAEName_" + pos].value;
window.opener.document.frmMain.sAEPhone.value = document.frmMain.elements["hidAEPhone_" + pos].value;
window.opener.document.frmMain.sComments.value = document.frmMain.elements["hidComment_" + pos].value;
window.opener.document.frmMain.selStartAMPM.options[document.frmMain.elements["hidStartAMPM_" + pos].value].selected = true;
window.opener.document.frmMain.selEndAMPM.options[document.frmMain.elements["hidEndAMPM_" + pos].value].selected = true;
window.opener.document.frmMain.iStartHr.value = document.frmMain.elements["hidStartHr_" + pos].value;
window.opener.document.frmMain.iStartMin.value = document.frmMain.elements["hidStartMin_" + pos].value;
window.opener.document.frmMain.iEndHr.value = document.frmMain.elements["hidEndHr_" + pos].value;
window.opener.document.frmMain.iEndMin.value = document.frmMain.elements["hidEndMin_" + pos].value;
window.opener.document.frmMain.sContactName.value = "";
window.opener.document.frmMain.sCallIn.value = '';
window.opener.document.frmMain.sConfirmation.value = '';
window.opener.document.frmMain.sModerator.value = '';	
window.opener.document.frmMain.hidVenueId.value = '0';
window.opener.document.frmMain.hidInstInvId.value ='';
window.opener.document.frmMain.hidRequestId.value = document.frmMain.elements["hidRequestId_" + pos].value;
var sContactName, nContactId, sAddr3 ;
nContactId = document.frmMain.elements["hid_inst_contact_id_" + pos].value ;
if (nContactId > 0)
{
sContactName = document.frmMain.elements["hid_inst_contact_last_nm_" + pos].value;
sContactName = sContactName + ", "
sContactName = sContactName + document.frmMain.elements["hid_inst_contact_first_nm_" + pos].value ;
}
else
{
sContactName = document.frmMain.elements["hid_inst_contact_nm_" + pos].value;
sContactName = sContactName + "*";
}
window.opener.document.frmMain.sContactName.value = sContactName; 
window.opener.document.frmMain.sAddress1.value = document.frmMain.elements["hid_inst_contact_str_nm_" + pos].value;
sAddr3 = document.frmMain.elements["hid_inst_contact_city_nm_" + pos].value;
sAddr3 = sAddr3 + ", "
sAddr3 = sAddr3 + document.frmMain.elements["hid_inst_contact_st_nm_" + pos].value;
sAddr3 = sAddr3 + " " ;
sAddr3 = sAddr3 + document.frmMain.elements["hid_inst_contact_zip_cd_" + pos].value;
window.opener.document.frmMain.sAddress3.value = sAddr3;
window.opener.document.frmMain.sPhone.value = document.frmMain.elements["hid_inst_contact_phone_no_" + pos].value;
window.opener.document.frmMain.sEmail.value = document.frmMain.elements["hid_inst_contact_email_" + pos].value;
window.opener.document.frmMain.hidAccountContactID.value = document.frmMain.elements["hid_inst_contact_id_" + pos].value ;
window.opener.document.frmMain.hidAccountContactName.value = document.frmMain.elements["hid_inst_contact_nm_" + pos].value ;
window.close();
} 
