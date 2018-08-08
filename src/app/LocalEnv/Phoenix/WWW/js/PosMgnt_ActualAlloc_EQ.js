<!-- 
function onPageLoad()
{ 
var frm= document.frmMain;
var lTotal = new Number(frm.iTxtStreet.value.replace(/(\,)/g, ""));
var lNumFields = parseInt(document.frmMain.hidNumberOfSynMembers.value, 10);
for (var i = 1; i <= lNumFields; i++)
{
var item = "iTxtSynMemberFreeRet" + i;
var value = new Number(frm.elements[item].value.replace(/(\,)/g, ""));
if (isNaN(value) || value == 0)
{
frm.elements[item].value = "";
}
else
{
frm.elements[item].value = formatAmountString(value.toString());
lTotal += value; 
}
}
document.frmMain.iTxtFreeRetention.value = formatAmountString(lTotal.toString());
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
function submitPage( frm , action, trancheIDtoUpdate )
{
switch (action)
{
case "savechanges" :
if(ValidateForm( frm ))
{
frm.action = "/asp/util_submit_action.asp";
frm.hidAction.value = "Update";
frm.hidTrancheIDToUpdate.value = trancheIDtoUpdate;
frm.submit(); 
}
break;
case "reverttosaved" :
window.location.reload();
break;
case "cancel" :
frm.action = "/asp/_template.asp";
frm.submit();
break;
case "addreg" :
frm.action = "/asp/_template.asp";
frm.submit();
break;
}
}
