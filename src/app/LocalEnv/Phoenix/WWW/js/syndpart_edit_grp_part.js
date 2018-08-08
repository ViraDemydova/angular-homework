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
if (frm.hidAction.value == "Delete")
{
var lLength = frm.hidNumSyndMem.value;
var bSelected = false;
for (var i=1; i<=lLength; i++)
{
var sItem = "cbDelete" + i.toString();
if (frm.elements[sItem].checked == true)
{
bSelected = true;
break;
}
}
if (!bSelected && lLength> 0)
{
var arrError = FieldErrorInfo("", "", "", "cbDelete1", "Please select at least one broker.");
arrError[2] = '';
arrMoreErrors[0] = arrError;
return (arrMoreErrors); 
}
return (arrMoreErrors);
}	
return (arrMoreErrors);
} 
function submitPage( frm , action )
{
switch (action)
{
case "SaveChanges" :
if (frm.hidAction.value == "Delete")
{ 
if (ValidateForm( frm ))
{
var lLength = frm.hidNumSyndMem.value;
var lDeletedBrokers = 0;
for (var i=1; i<=lLength; i++)
{
var sItem = "cbDelete" + i.toString();
if (frm.elements[sItem].checked == true)
lDeletedBrokers++;
} 
if (window.confirm("Do you wish to delete " + lDeletedBrokers.toString() + " broker(s)?"))
{
frm.method = "POST"; 
frm.action = "util_submit_action.asp";
frm.submit(); 
}
}
}
else
{ 
frm.hidAction.value = "Update";
if(ValidateForm( frm ))
{
frm.method = "POST"; 
frm.action = "util_submit_action.asp";
frm.submit(); 
}
}
break;
case "RevertToSaved" :
frm.reset();
UpdateTotal();
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
function onPageLoad()
{
UpdateTotal();
} 
function UpdateTotal()
{ 
var sItemNum = String("iTxtAmount" + 1); 
if(frmMain.elements[sItemNum]){
var nSyndMem = frmMain.hidNumSyndMem.value;
var lTotal = new Number(0);
for (var i = 1; i <= nSyndMem; i++)
{
var sItem = String("iTxtAmount" + i); 
var sValue = frmMain.elements[sItem].value.replace(/(\,)/g, "");
lTotal += new Number(sValue);
}
frmMain.txtTotal.value = formatAmountString(String(lTotal));
}
}
function SetupDeleteAction()
{
var frm;
frm = document.frmMain;
var lDeletedBrokers = 0;
var lLength = frm.hidNumSyndMem.value;
for (var i=1; i<=lLength; i++)
{
var sItem = "cbDelete" + i.toString();
if (frm.elements[sItem].checked == true)
lDeletedBrokers++;
}
if (lDeletedBrokers > 0)
frm.hidAction.value = "Delete";
else
frm.hidAction.value = "";
}
