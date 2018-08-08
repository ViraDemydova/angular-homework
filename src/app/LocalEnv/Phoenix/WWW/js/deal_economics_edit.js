<!-- 
function onPageLoad()
{
showHideExpArea(document.frmMain.hidInitRevCalc.value);
}
function CheckConditionallyRequiredFields( frm, arrFieldsInError )
{
var arrMoreErrors = new Array();
var count = 0;
return (arrMoreErrors);
} 
function submitPage( frm , action )
{
switch (action)
{
case "savechanges" :
if(ValidateForm( frm ))
{ 
getEconCalcMthd(frm); 
frm.action = "/asp/util_submit_action.asp";
if(frm.hidTrancheId.value == "")
{
frm.hidAction.value = "Add";
}
else
{
frm.hidAction.value = "Update";
}
frm.submit(); 
}
break;
case "reverttosaved" :
window.location.reload();
break;
case "cancel" :
window.location = "deal_economics_view.asp"; 
break;
}
}
function showHideExpArea(memberFlag){
var expAll = eval("allExpLayer");
var expMgr = eval("mgrExpLayer");
if(memberFlag == 'U' || memberFlag == ''){
expAll.style.display = '';
expMgr.style.display = 'none';
}
else 
{
expAll.style.display = 'none';
expMgr.style.display = '';
}	
}
function enableExpDropDown(frm, type)
{	
frm.selExpMgr[0].selected = true;
if(type == 'all')
{
if(frm.radExpCalc[1].checked){
frm.selExpMgr.disabled = false;
}
else
{
frm.selExpMgr.disabled = true; 
}
}
else
{
if(frm.radExpCalcMgr[1].checked){
frm.selExpMgr.disabled = false; 
}
else
{
frm.selExpMgr.disabled = true; 
} 
}
}
function setInitialState(frm)
{
if(frm.radRevCalc[0].checked)
{
frm.radExpCalc[0].checked = true;
}
else
{
frm.radExpCalcMgr[0].checked = true;
}
frm.selExpMgr[0].selected = true; 
frm.selExpMgr.disabled = true; 
}
function getEconCalcMthd(frm)
{
if(frm.radRevCalc[0].checked)
{
frm.hidMgrRevMthd.value = frm.hidUWMthdId.value
if(frm.radExpCalc[0].checked)
{
frm.hidMgrExpMthd.value = frm.hidUWMthdId.value
frm.hidUWExpMthd.value = frm.hidUWMthdId.value
}
else
{
frm.hidUWExpMthd.value = frm.hidNoneMthdId.value
if(frm.selExpMgr.value == "1")
{
frm.hidMgrExpMthd.value = frm.hidEqualMthdId.value
}
else if(frm.selExpMgr.value == "2")
{
frm.hidMgrExpMthd.value = frm.hidUWMthdId.value
} 
else
{
frm.hidMgrExpMthd.value = frm.hidCustomMthdId.value
}
}
}
else
{
frm.hidMgrRevMthd.value = frm.hidEqualMthdId.value
if(frm.radExpCalcMgr[0].checked)
{
frm.hidMgrExpMthd.value = frm.hidEqualMthdId.value
frm.hidUWExpMthd.value = frm.hidUWMthdId.value
}
else
{
frm.hidUWExpMthd.value = frm.hidNoneMthdId.value 
if(frm.selExpMgr.value == "1")
{
frm.hidMgrExpMthd.value = frm.hidEqualMthdId.value
}
else if(frm.selExpMgr.value == "2")
{
frm.hidMgrExpMthd.value = frm.hidUWMthdId.value
} 
else
{
frm.hidMgrExpMthd.value = frm.hidCustomMthdId.value
}
} 
} 
} 
