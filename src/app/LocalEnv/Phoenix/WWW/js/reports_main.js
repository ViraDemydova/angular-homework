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
frm.hidAction.value = "Update";
frm.submit(); 
}
break;
case "SelectReport" :
frm.action = "/asp/reports_main.asp";
frm.hidAction.value = "SelectReport";
frm.submit(); 
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
}
}
function OpenReport( sURL, oTranche, iWidth, iHeight ) {
if (oTranche)
{
if (oTranche.selectedIndex) {
var iTrancheID = oTranche.options[oTranche.selectedIndex].value; 
}
else {
var iTrancheID = oTranche.value;
}
sURL = sURL + '?TrancheId=' + iTrancheID;
}
openGeneralPopup(sURL,'','width=' + iWidth + ',height=' + iHeight + ',toolbar=no,menubar=no,location=no,directories=no,resizable=yes,scrollbars=yes')
}
