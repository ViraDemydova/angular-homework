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
frm.method="POST"; 
frm.action = "util_submit_action.asp";
frm.submit(); 
}
break;
case "RevertToSaved" :
window.location.reload();
break;
case "Cancel" :
frm.method="POST";
frm.action = "syndpart_overview.asp";
frm.submit();
break;
case "AddReg" :
frm.action = "/asp/_template.asp";
frm.hidAction.value = "Add";
frm.submit();
break;
}
}
function resetAmount()
{
for (var i=1; i<=document.frmMain.hidNumSyndMem.value; i++)
document.frmMain.elements["iTxtAmount" + i].value = "";
document.frmMain.iTxtTotal.value = "";
}
function doCalculate()
{
var sAmount = new String(document.frmMain.txtAmount.value.replace(/mm/g, "000000"));
sAmount = sAmount.replace(/k/g, "000");
sAmount = sAmount.replace(/(\,)/g, "");
document.frmMain.txtAmount.value = sAmount;
var iAmount = new Number(0);
if (document.frmMain.txtAmount.value == "")
return;
else
iAmount = new Number(document.frmMain.txtAmount.value);
var iNumSynMem = new Number(0);
if (document.frmMain.hidNumSyndMem.value == "")
return;
else
iNumSynMem = new Number(document.frmMain.hidNumSyndMem.value); 
var iTrnSize = new Number(0);
if (document.frmMain.hidTrancheSize.value != "")
iTrnSize = new Number(document.frmMain.hidTrancheSize.value); 
var amount = new Number(0); 
switch (document.frmMain.selCalculationType.options[document.frmMain.selCalculationType.selectedIndex].value)
{
case "amt" :
amount = iAmount;
document.frmMain.txtTargetTotal.value = formatAmountString(document.frmMain.hidTargetTotal.value);
break;
case "pct" :
if (iAmount > 100)
{
resetAmount();
return;
}
amount = Math.round(iTrnSize * iAmount / 100);
document.frmMain.txtTargetTotal.value = formatAmountString(document.frmMain.hidTargetTotal.value);
break;
case "eq_amt_barcket" :
amount = Math.round(iAmount / iNumSynMem);
document.frmMain.txtTargetTotal.value = formatAmountString(iAmount.toString());
break;
case "eq_pct_barcket" :
if (iAmount > 100)
{
resetAmount();
return;
}
amount = Math.round(iTrnSize * iAmount / 100 / iNumSynMem);
document.frmMain.txtTargetTotal.value = formatAmountString(document.frmMain.hidTargetTotal.value);
break; 
}
var total = new Number(0);
for (var i=1; i<=iNumSynMem; i++)
{
document.frmMain.elements["iTxtAmount" + i].value = formatAmountString(amount.toString());
total += amount;
} 
document.frmMain.iTxtTotal.value = formatAmountString(total.toString());
document.frmMain.txtAmount.value = "";
}
