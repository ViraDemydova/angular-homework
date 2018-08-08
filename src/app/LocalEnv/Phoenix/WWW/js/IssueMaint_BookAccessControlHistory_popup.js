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
function submitPage( frm )
{ 
if(ValidateForm( frm ))
{
frm.action = "/asp/IssueMaint_BookAccessControlHistory_popup.asp";
frm.method = "post";
frm.hidTrancheID.value = frm.selTranche.value;
frm.submit(); 
}
}
function openSelectedPopup(revisionID, action, sWindowParms)
{
var sChildName = window.name+"Selected";
var newWindow = window.open("IssueMaint_OrderPermissionChangeHistory_popup.asp?revision_id="+revisionID+"&action="+action,sChildName,sWindowParms);
newWindow.focus();
}
