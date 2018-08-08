<!-- 
function onPageLoad()
{
onSelChangeWireTemplate();
}
function onSelChangeTranche()
{
var frm = document.frmMain;
var selectID = frm.selTranche.selectedIndex;
var selectValue = frm.selTranche.options[selectID].value;
window.location = "wire_addressWire_Response.asp?trn_id=" + selectValue + "&wire_template_id=" + frm.hidTemplateId.value;
}
function onSelChangeWireTemplate()
{
var frm = document.frmMain;
var selectID = frm.selWireTemplate.selectedIndex;
var selectValue = frm.selWireTemplate.options[selectID].value;
frm.hidTemplateId.value = selectValue;
frm.hidWTID.value = selectValue;
}
function checkCategory(checkBoxName)
{
var frm = document.frmMain;
var ck = frm.elements[checkBoxName];
var subCount = frm.elements[checkBoxName + "ct"].value;
for (var i = 1; i <= subCount ;i++)
{
if (!frm.elements[checkBoxName + "_" + i].disabled)
{
frm.elements[checkBoxName + "_" + i].checked = ck.checked;
}
}
frm.deselectAll.checked = false;
frm.selectAll.checked = isAllChecked(frm);
}
function getBrokers(frm)
{
var brk_id = "";
var ctr;
for ( ctr = 1; ctr < frm.radResponse.length; ctr++)
{
if(frm.radResponse[ctr].checked)
{
brk_id = frm.radResponse[ctr].value;
break;
}
}
return brk_id;
}
function getNonBrokers(frm)
{
var brk_id = "";
return brk_id;
}
function CheckConditionallyRequiredFields(frm, arrFieldsInErro)
{
var arrMoreErrors = new Array();
var brkList = getBrokers(frm);
if (brkList == '')
{
var arrError = FieldErrorInfo("", 'Please select a firm.', "", "", "");
arrMoreErrors[arrMoreErrors.length] = arrError;
}
return arrMoreErrors;
}
