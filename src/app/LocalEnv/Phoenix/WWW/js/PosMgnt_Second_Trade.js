<!-- 
function CheckConditionallyRequiredFields( frm, arrFieldsInError )
{
var arrMoreErrors = new Array();
var count = 0;
if (frm.hidAddDeleteFlag.value == "savechanges"){
if (frm.iTxtQuantity.value == ""){
var arrError = FieldErrorInfo("iTxtQuantity", 'Please enter a Quantity or an Amount.', "", "iTxtQuantity", "Quantity/Amount");
arrMoreErrors[count] = arrError;	
count++;
}
if (frm.fltTxtPrice.value == ""){
var arrError = FieldErrorInfo("fltTxtPrice", 'Please enter a Price.', "", "fltTxtPrice", "Price");
arrMoreErrors[count] = arrError;	
count++;
}
if (frm.dtTxtTradeDate.value == ""){
var arrError = FieldErrorInfo("dtTxtTradeDate", 'Please enter a Trade Date.', "", "dtTxtTradeDate", "Trade Date");
arrMoreErrors[count] = arrError;	
count++;
}
}	
return (arrMoreErrors);
}
function CustomValidation( frm, arrFieldsInError )
{
var arrMoreErrors = new Array();
return (arrMoreErrors);
} 
function CloseBrowser()
{
self.window.opener.location.reload();
self.window.opener.focus();
}
function submitPage( frm , action, trancheIDtoUpdate )
{
frm.hidAddDeleteFlag.value = action;
switch (action)
{
case "savechanges" :
if(ValidateForm( frm ))
{
frm.action = "/asp/util_submit_action.asp";
frm.hidAction.value = "Add";
frm.submit(); 
} 
break; 
case "delete" :
if(ValidateForm( frm ))
{
frm.action = "/asp/util_submit_action.asp";
frm.hidAction.value = "Delete";
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
function CheckCheckAll(){
if(document.frmMain.sChkDelete)
{
if (document.frmMain.sChkCheckAll.checked){
if(document.frmMain.sChkDelete.length>1)
{
for (var c = 0; c < document.frmMain.sChkDelete.length; c++){
document.frmMain.sChkDelete[c].checked = true;
}
}
else
{
document.frmMain.sChkDelete.checked = true;
}
}
else{
if(document.frmMain.sChkDelete.length>1)
{
for (var c = 0; c < document.frmMain.sChkDelete.length; c++){
document.frmMain.sChkDelete[c].checked = false;
}
}
else
{
document.frmMain.sChkDelete.checked = false;
}
}
}
}
function deleteAll(){
document.frmMain.sChkCheckAll.checked= true;
for (var c = 0; c < document.frmMain.sChkDelete.length; c++){
document.frmMain.sChkDelete[c].checked = true;
} 
submitPage(document.frmMain,'delete');
}
function cancel(){
self.close();
self.window.opener.location.reload();
self.window.opener.focus();
}
function potsheet(){
self.close();
self.window.opener.location.href = 'PosMgnt_ActualAlloc_PotSheet_EQ.asp';
self.window.opener.focus();
}
