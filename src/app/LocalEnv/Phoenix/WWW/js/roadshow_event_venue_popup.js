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
frm.action = "roadshow_event_venue_popup.asp";
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
function onSelectVenue(pos)
{
window.opener.document.frmMain.sName.value = document.frmMain.elements["hidName_" + pos].value;
window.opener.document.frmMain.sAddress1.value = document.frmMain.elements["hidAddr1_" + pos].value;
window.opener.document.frmMain.sAddress2.value = document.frmMain.elements["hidAddr2_" + pos].value;
window.opener.document.frmMain.sAddress3.value = document.frmMain.elements["hidAddr3_" + pos].value;
window.opener.document.frmMain.sContactName.value = document.frmMain.elements["hidContactNm_" + pos].value;
window.opener.document.frmMain.sPhone.value = document.frmMain.elements["hidPhone_" + pos].value;
window.opener.document.frmMain.sFax.value = document.frmMain.elements["hidFax_" + pos].value;
window.opener.document.frmMain.hidVenueId.value = document.frmMain.elements["hidVenueId_" + pos].value;
window.opener.document.frmMain.sCallIn.value = '';
window.opener.document.frmMain.sAEPhone.value = '';
window.opener.document.frmMain.sConfirmation.value = '';	
window.opener.document.frmMain.sSalesperson.value = '';
window.opener.document.frmMain.sModerator.value = '';
window.opener.document.frmMain.hidRequestId.value = ''; 
window.close();
} 
