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
function submitBrokers()
{
var sBroker = frmMain.txtFindBroker.value;
if (sBroker != "")
{
frmMain.action = "/asp/IssueMaint_AddDealBookRunnerFI.asp";
frmMain.submit();
return true;
}
else
{
alert("Please enter text for Bookrunner query.");
}
}
function onSave(frm, action, brokerID)
{
switch (action)
{
case "savechanges" :
if(ValidateForm( frm ))
{
frm.action = "/asp/util_submit_action.asp";
frm.hidAction.value = "Update"
frm.submit(); 
}
break;
case "reverttosaved" :
frm.action = "IssueMaint_DealerRoles.asp";
frm.submit();
break;
case "cancel" :
if (frm.hidDebtEqFlg.value == "D")
frm.action = "/asp/IssueMaint_DealDetailsFI.asp";
else if (frm.hidDebtEqFlg.value == "E")
frm.action = "/asp/specialIssueMaint_DealDetails.asp";
frm.submit();
break;
case "delete" :
frm.action = "/asp/util_submit_action.asp";
frm.hidAction.value = "Delete"
frm.hidBrokerID.value = brokerID;
frm.submit();
break;
}
}
function showHideOneArea(areaName)
{
var elthis = eval(areaName);	
if (elthis.style.display == 'none'){
elthis.style.display = '';
}
else{
elthis.style.display = 'none';
}
}
function onRoleTypeClicked(oField)
{
var iLead = oField.value
if(iLead == 1)
{
divSelOwnerRoleLead.style.display = '';
divSelOwnerRoleNonLead.style.display = 'none';
}
else
{
divSelOwnerRoleLead.style.display = 'none';
divSelOwnerRoleNonLead.style.display = '';
}
}
