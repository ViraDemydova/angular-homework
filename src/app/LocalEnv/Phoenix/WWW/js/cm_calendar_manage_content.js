<!-- 
function onPageLoad()
{
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
frm.action = "/asp/_template.asp";
frm.submit(); 
}
break;
case "RevertToSaved" :
window.location.reload();
break;
case "Cancel" :
frm.action = "/asp/_template.asp";
frm.submit();
break;
case "AddReg" :
frm.action = "/asp/_template.asp";
frm.hidAction.value = "Add";
frm.submit();
break;
case "Edit" :
frm.action = "cm_calendar_add_report.asp";
frm.submit();
break; 
case "Remove" :
frm.hidAction.value = "Delete";
frm.action = "util_submit_action.asp";
frm.submit();
break;
}
}
function confirmDelete( strDocument )
{
return confirm( "Do you wish to delete document \"" + strDocument + "\" ?" );
}
function editDoc(docId)
{
document.frmMain.DocId.value = docId;
document.frmMain.method = "POST";
document.frmMain.target = "_self"; 
submitPage(document.frmMain, "Edit");
}
function removeDoc(docId)
{
document.frmMain.DocId.value = docId;
document.frmMain.method = "POST";
document.frmMain.target = "_self"; 
submitPage(document.frmMain, "Remove");
}
function viewDoc(docId)
{
document.frmMain.DocId.value = docId;
document.frmMain.method = "POST";
document.frmMain.target = "ViewDocument"; 
document.frmMain.action = "cm_viewdoc.asp";
document.frmMain.submit();
}
