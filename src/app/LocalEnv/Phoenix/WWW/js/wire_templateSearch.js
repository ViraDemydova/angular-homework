<!-- 
function onPageLoad()
{
fillWireCategoryDropDown();
} 
function onEnter()
{
if(document.frmMain.rsWireCategory.value != "")
{
submitPage(document.frmMain);
}
}
function submitPage(frm)
{
if (ValidateForm(frm))
{
if (frm.sFirm.selectedIndex != -1)
frm.hidFirmName.value = frm.sFirm[frm.sFirm.selectedIndex].text;
frm.action = "wire_templateSearchResults.asp";
frm.submit();
return true;
}
}
function fillWireCategoryDropDown()
{
var sSel = document.frmMain.sSecurityType;
var wireCategorySel = document.frmMain.rsWireCategory;
clearWireCategoryDropDown();
clearWireTemplateDropDown();
for(var i=0; i< arrWireCategories.length; i++) 
{
if (arrWireCategories[i][0] == "B" || arrWireCategories[i][0] == sSel.value)
{
var opt = new Option(arrWireCategories[i][2], arrWireCategories[i][1]);
wireCategorySel.options[wireCategorySel.options.length] = opt;
}
}
}
function fillWireTemplateDropDown()
{
var sFirmSel = document.frmMain.sFirm;
var sWireCategorySel = document.frmMain.rsWireCategory;
var wireTemplateSel = document.frmMain.sWireTemplate;
clearWireTemplateDropDown();
for(var i=0; i< arrWireTemplates.length; i++) 
{
if (arrWireTemplates[i][0] == sWireCategorySel.value &&
((arrWireTemplates[i][1] == '') || (arrWireTemplates[i][1] == sFirmSel.value))) 
{
var opt = new Option(arrWireTemplates[i][3], arrWireTemplates[i][2]);
wireTemplateSel.options[wireTemplateSel.options.length] = opt;
}
}
}
function clearWireCategoryDropDown()
{
document.frmMain.rsWireCategory.length = 0;
}
function clearWireTemplateDropDown()
{
document.frmMain.sWireTemplate.length = 0;
}
function CheckConditionallyRequiredFields(frm, arrFieldsInErro)
{
var arrMoreErrors = new Array();
if (frm.hidAction.value == "update")
{
if (frm.sWireTemplate.value == '')
{
var arrError = FieldErrorInfo("sWireTemplate", 'Please select a template.', "", "sWireTemplate", "Template");
arrMoreErrors[arrMoreErrors.length] = arrError;
}
}
return arrMoreErrors;
}
function createTemplate()
{
var frm = document.frmMain;
frm.hidAction.value = "add";
if (ValidateForm(frm))
{
frm.hidSecurityType.value = frm.sSecurityType.value;
frm.hidWireTypeID.value = frm.rsWireCategory.value;
frm.hidWireTypeName.value = frm.rsWireCategory.options[frm.rsWireCategory.selectedIndex].text;
frm.hidFirmID.value = frm.sFirm.value;
frm.method = "POST"
frm.action = "wire_templateCreate.asp";
frm.submit();
}
}
function updateTemplate()
{
var frm = document.frmMain;
frm.hidAction.value = "update";
if (ValidateForm(frm))
{
frm.hidTemplateID.value = frm.sWireTemplate.value;
frm.hidWireTypeID.value = frm.rsWireCategory.value;
frm.hidWireTypeName.value = frm.rsWireCategory.options[frm.rsWireCategory.selectedIndex].text;
frm.method = "POST"
frm.action = "wire_templateEdit.asp";
frm.submit();
}
}
