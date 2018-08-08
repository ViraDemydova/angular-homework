function OnSubmit(sAction)
{
var i; 
var bPassed;	
bPassed = false;
if (sAction == "add")
{
for (i = 0; i < frmMain.cbAddBroker.length; i++) 
{
if (frmMain.cbAddBroker[i].checked)
{
bPassed = true;
break;
}
}
if (frmMain.cbAddBroker.checked == true)	
bPassed = true;
if (bPassed)
{
document.frmMain.hidSavedData.value = escape(document.frmMain.hidSavedData.value);
frmMain.action = "/asp/IssueMaint_AddGlobalCoordinator.asp";
frmMain.submit();	
}
else
alert("Please select at least one broker/dealer to add.");	
}
else
{
frmMain.action = "/asp/specialIssueMaint_EditDealDetails_EQ.asp";
frmMain.submit();
}
}
function SendMeBackToDealDetails()
{
window.location.href = "/asp/specialIssueMaint_EditDealDetails_EQ.asp?hidSavedData=" + escape(document.frmMain.hidSavedData.value);
}
function SendMeBackToPreviousPage()
{
document.frmMain.action = "/asp/specialIssueMaint_EditDealDetails_EQ.asp";
document.frmMain.submit();	
}
