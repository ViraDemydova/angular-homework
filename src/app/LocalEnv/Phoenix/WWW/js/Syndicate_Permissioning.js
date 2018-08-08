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
EnableCheckboxes(frm);
frm.action = "/asp/util_submit_action2.asp";
frm.hidAction.value = "Syndicate_Permissioning_Update";
frm.hidSuppressRedirect.value = "1" ;
frm.submit(); 
}
break;
case "ReleaseAllocationToSyndConnectBD" :
frm.action = "/asp/util_submit_action.asp";
frm.hidAction.value = "ReleaseAllocationToSyndConnectBD";
frm.submit(); 
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
function loadTranche(frm)
{
var selectID = frm.selTranche.selectedIndex;
var selectValue = frm.selTranche.options[selectID].value;
window.location = "Syndicate_Permissioning.asp?TrancheId=" + selectValue;
}
function EnableCheckboxes(frm)
{
var total = frm.hidSynMemCount.value;
for (var index = 1; index <= total; ++index)
{
var Fldname = "sChkAcceptInstOrders" + index;
if (frm.elements[Fldname].disabled)
{
frm.elements[Fldname].disabled = false;
}
Fldname = "sChkViewInstOrders" + index;
if (frm.elements[Fldname].disabled)
{
frm.elements[Fldname].disabled = false;
}
Fldname = "sChkShowBookView" + index;
if (frm.elements[Fldname].disabled)
{
frm.elements[Fldname].disabled = false;
}
Fldname = "sChkShowProfiles" + index;
if (frm.elements[Fldname].disabled)
{
frm.elements[Fldname].disabled = false;
}
Fldname = "sChkAfterMarketPos" + index;
if (frm.elements[Fldname].disabled)
{
frm.elements[Fldname].disabled = false;
}
}
}
function CheckAll(elt)
{
if (!elt || !elt.value || elt.checked == false)
return;
var frm = document.frmMain;
var total = frm.hidSynMemCount.value;
for (var index = 1; index <= total; ++index)
{
var Fldname = elt.name + index;
if (frm.elements[Fldname] && !frm.elements[Fldname].disabled)
{
frm.elements[Fldname].checked = true;
}
}
}
function UnCheckCheckAll(elt, position)
{
if (!elt || !elt.value || !elt.name || elt.checked == true)
return;
var frm = document.frmMain;
var group_fldname = "hidSyndicateType" + position;
var group = frm.elements[group_fldname].value;
var Fldname;
Fldname = "sChkTakeIOI"
if (elt.name.substr(0, Fldname.length) == Fldname)
{
frm.elements[Fldname].checked = false;
frm.elements[Fldname + group].checked = false;
}
Fldname = "sChkShowAlloc"
if (elt.name.substr(0, Fldname.length) == Fldname)
{
frm.elements[Fldname].checked = false;
frm.elements[Fldname + group].checked = false;
}
Fldname = "sChkAcceptInstOrders"
if (elt.name.substr(0, Fldname.length) == Fldname)
{
frm.elements[Fldname].checked = false;
frm.elements[Fldname + group].checked = false;
}
Fldname = "sChkViewInstOrders"
if (elt.name.substr(0, Fldname.length) == Fldname)
{
frm.elements[Fldname].checked = false;
frm.elements[Fldname + group].checked = false;
}
Fldname = "sChkShowBookView"
if (elt.name.substr(0, Fldname.length) == Fldname)
{
frm.elements[Fldname].checked = false;
frm.elements[Fldname + group].checked = false;
}
Fldname = "sChkShowProfiles"
if (elt.name.substr(0, Fldname.length) == Fldname)
{
frm.elements[Fldname].checked = false;
frm.elements[Fldname + group].checked = false;
}
Fldname = "sChkAfterMarketPos"
if (elt.name.substr(0, Fldname.length) == Fldname)
{
frm.elements[Fldname].checked = false;
frm.elements[Fldname + group].checked = false;
}
}
function CheckAllInGroup(elt, position)
{
if (!elt || !elt.value || elt.checked == false)
return;
var frm = document.frmMain;
var total = frm.hidSynMemCount.value;
var group_fldname = "hidSyndicateType" + position;
var group = frm.elements[group_fldname].value;
for (var index = 1; index <= total; ++index)
{
var Elementname = elt.name;
var Fldname = Elementname.substr(0, Elementname.length - group.length) + index;
var GroupFldname = "hidSyndicateType" + index;
if (frm.elements[Fldname] && !frm.elements[Fldname].disabled && frm.elements[GroupFldname].value == group)
{
frm.elements[Fldname].checked = true;
}
}
}
function showHideUsers(eltname)
{
var elt = eval(eltname);
if (elt)
{
if (elt.style.display == 'none')
elt.style.display = '';
else
elt.style.display = 'none';
}
}
