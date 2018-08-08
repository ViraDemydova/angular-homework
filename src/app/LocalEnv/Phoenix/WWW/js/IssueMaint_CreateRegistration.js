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
function submitPage(page){
if (ValidateForm(document.frmMain)) {
document.frmMain.action = page;
document.frmMain.submit();
return true; 
}
}
