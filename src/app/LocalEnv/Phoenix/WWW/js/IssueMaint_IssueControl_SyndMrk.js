<!-- 
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
function submitPage(frm, action)
{
switch (action)
{
case "update" :
if (ValidateForm(frm))
{
frm.action = "util_submit_action.asp";
if (frm.hidDebtEqFlg.value == 'E') {
checkPotChange(frm);
frm.hidAction.value = "Update";
if (frm.radInstitutional.disabled == true)
frm.hidOrdersExist.value = "Yes";
else
frm.hidOrdersExist.value = "No";
}
frm.submit();
}
break;
case "updateAll" :
if (ValidateForm(frm))
{
frm.hidAction.value = "UpdateAll";
frm.action = "util_submit_action.asp";
if (frm.hidDebtEqFlg.value == 'E') {
checkPotChange(frm); 
if (frm.radInstitutional.disabled == true)
frm.hidOrdersExist.value = "Yes";
else
frm.hidOrdersExist.value = "No";
}
frm.submit();
}
break;
case "reverttosave" :
window.location.reload();
break;
case "cancel" :
window.history.back(1);
break; 
}
}
function on_select_tranche ( frm )
{
frm.action = self.window.location;
frm.submit();
} 
function selectAll( lst, count )
{
for( var i=0; i<lst.length; i++)
{
lst.options[i].selected=true;
}
lst.disabled=false;
}
function selectNone( lst )
{
for( var i=0; i<lst.length; i++)
{
lst.options[i].selected=false;
}
lst.disabled=true;
}
function onChangeSelect( lst, opt )
{
if( lst.selectedIndex == -1 ){
opt[1].checked = true;
} else {
var nCount = 0;
for( var i=0; i<lst.length; i++) 
{
if (lst.options[i].selected) {
++nCount;
}
}
if (nCount<lst.length) {
document.frmMain.elements[opt][0].checked=true;
} else {
document.frmMain.elements[opt][1].checked=true;
}
}
}
function checkPotChange( frm )
{
var newPotVal = frm.radPot[0].checked;
var oldPotVal = frm.hidPrevPotVal.value;
if((newPotVal == true && oldPotVal == 'True') || (newPotVal == false && oldPotVal == 'False'))
frm.hidPotChange.value = "False";
else
frm.hidPotChange.value = "True";
}
function warningPopUp(frm)
{
var retVal = true;
var bShowAlloc = frm.selShowBranches.value;
var lOldShowAlloc = frm.hidOldShowAlloc.value;
if(bShowAlloc != "" && lOldShowAlloc == "0")
{
return confirm("If you chose to Auto-Designate in Economics Details, when you show allocations to branches you will auto-designate all orders in this tranche. Do you wish to continue?"); 
} 
return retVal;
}
