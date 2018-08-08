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
function submitPage( frm , action )
{
switch (action)
{
case "savechanges" :
if(ValidateForm( frm ))
{
frm.action = "/asp/util_submit_action.asp";
frm.hidAction.value = "Update";
frm.submit(); 
}
break;
case "reverttosaved" :
window.location.reload();
break;
case "cancel" :
frm.action = "/asp/PosMgnt_ActualAlloc_EQ.asp";
frm.submit();
break;
case "addreg" :
frm.action = "/asp/_template.asp";
frm.submit();
break;
}
}
var is_3 = parseInt(navigator.appVersion);
function hideArea(areaName){
var elthis = eval(areaName)
elthis.style.display = 'none';
}
function showArea(areaName){ 
var elthis = eval(areaName)
elthis.style.display = '';
}
function streetPosSummary(trancheID, UseQtyInd){
if (document.frmMain.sChkIncludeManagers.checked == true)
{
SpsCheckBox = 'True';
}
else
{
SpsCheckBox = 'False';
}
location.href = "PosMgnt_ActualAlloc_EditDetails_EQ.asp?TrancheID=" + trancheID + "&UseQuantityInd=" + UseQtyInd + "&ChkBox=" + SpsCheckBox;
}
