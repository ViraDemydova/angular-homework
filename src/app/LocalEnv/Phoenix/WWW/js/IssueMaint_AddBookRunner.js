function OnSubmit(sAction)
{
var i; 
var iSelectedElmts = 0; 
frmMain.hidSelBrokers.value = ""
if (sAction == "add")
{
if(ValidateForm( frmMain ))
{ 
var lLength = frmMain.hidBrokerCount.value;
for (i = 1; i <= lLength; i++) 
{
var sItem = "cbAddBroker_" + i.toString();
var sRole = "selRole_" + i.toString();
if (frmMain.elements[sItem].checked)
{
if(iSelectedElmts == 0)
{
frmMain.hidSelBrokers.value += frmMain.elements[sItem].value + "_" + frmMain.elements[sRole].value
}
else
{
frmMain.hidSelBrokers.value += "," + frmMain.elements[sItem].value + "_" + frmMain.elements[sRole].value
}
iSelectedElmts++;
}
}
if (iSelectedElmts > 0)
{
document.frmMain.hidSavedData.value = escape(document.frmMain.hidSavedData.value);
frmMain.action = "/asp/IssueMaint_AddBookRunner.asp";
frmMain.submit();	
}
}
}
else
{
if (document.frmMain.hidDebtEQFlag.value == "E")
frmMain.action = "/asp/specialIssueMaint_EditDealDetails_EQ.asp";
else
frmMain.action = "/asp/IssueMaint_DealerRoles.asp?UserID="+document.frmMain.hidUserRole.value+"&String="+escape(document.frmMain.hidMgrString.value);
frmMain.submit();
}
}
function CustomValidation( frm, arrFieldsInError )
{
var arrMoreErrors = new Array();
var count = 0;
var lLength = frm.hidBrokerCount.value;
var bSelected = false;
for (var i=1; i<=lLength; i++)
{
var sItem = "cbAddBroker_" + i.toString();
var sRole = "selRole_" + i.toString();
if (frm.elements[sItem].checked == true)
{
bSelected = true;
if (frm.elements[sRole].selectedIndex == 0)
{
var arrError = FieldErrorInfo(sRole, 'Please select a Role', "", sRole, "Role");
arrMoreErrors[count] = arrError;	
count++;
}
}
}
if (!bSelected)
{
var arrError = FieldErrorInfo("", "", "", "cbAddBroker_1", "Please select at least one broker");
arrError[2] = '';
arrMoreErrors[0] = arrError;
return (arrMoreErrors); 
}
return (arrMoreErrors);
} 
function SendMeBackToDealDetails()
{
if (document.frmMain.hidDebtEQFlag.value == "E")
window.location.href = "/asp/specialIssueMaint_EditDealDetails_EQ.asp?hidSavedData=" + escape(document.frmMain.hidSavedData.value);
else
window.location.href = "/asp/issuemaint_dealdetailsfi.asp";
}
function SendMeBackToPreviousPage()
{
if (document.frmMain.hidDebtEQFlag.value == "E")
{
document.frmMain.action = "/asp/specialIssueMaint_EditDealDetails_EQ.asp";
document.frmMain.submit();	
}	
else
window.history.back();
}
