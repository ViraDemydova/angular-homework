<!-- 
function onPageLoad()
{
menuShow('cm_calendar_view_content', 'tophide');
}
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
case "SaveChanges" :
if(ValidateForm( frm ))
{ 
frm.action = "cm_calendar_add_content_action.asp";
frm.submit(); 
}
break;
case "RevertToSaved" :
window.location.reload();
break;
case "Cancel" :
frm.action = "cm_calendar_select_content.asp";
frm.submit();
break;
case "AddReg" :
frm.action = "/asp/_template.asp";
frm.hidAction.value = "Add";
frm.submit();
break;
}
}
function setDescriptionName()
{
var oForm = document.frmMain;
var strFile = oForm.rsDocumentName.value;
var strDisplay = oForm.rsDisplayName.value;
var nIndex = strFile.lastIndexOf("\\");
if( nIndex != -1 )
strFile = strFile.substr(nIndex + 1);
nIndex = strFile.indexOf(".");
if( nIndex != -1 )
strFile = strFile.substring(0, nIndex);
if( strDisplay == "" )
{
oForm.rsDisplayName.value = strFile;
}	
return true;
} 
function showAvailableMimeTypes()
{
window.open('cm_supported_mime_types_popup.asp', 'preview','height=500,width=600,scrollbars');
}
