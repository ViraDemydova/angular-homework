<!-- 
function onPageLoad()
{
fillWireTemplateDropDown();
} 
function confirmYesNo(msg)
{
return showModalDialog('wire_templatelist_overwrite.html', msg, 'unadorned:yes;status:no;resizable:no;dialogWidth:300px;dialogHeight:200px;center:yes');
}
function addressWire( frm )
{
if (frm.tranche.selectedIndex != -1)
{
if (ValidateForm(frm))
{	
var draftWireIndex = findDraftWire(frm);
var sentWireIndex = findSentWire(frm);
if (draftWireIndex >= 0)
{
var msg;
msg = "A draft of \"";
msg += arrWireDrafts[draftWireIndex][3];
msg += "\" wire exists, last modified by ";
msg += arrWireDrafts[draftWireIndex][5];
msg += " on ";
msg += frm[arrWireDrafts[draftWireIndex][4] + "lastModifiedDate"].value;
msg += ". Do you wish to overwrite it?";
if (confirmYesNo(msg))
{
frm.hidUpdateWireMasterID.value = arrWireDrafts[draftWireIndex][4];
}
else
{
frm.hidDraftWireMasterID.value = arrWireDrafts[draftWireIndex][4];
frm.hidUpdateWireMasterID.value = arrWireDrafts[draftWireIndex][4];
}
}
else if (sentWireIndex >= 0)
{
var msg;
msg = "The \"";
msg += arrWireSent[sentWireIndex][3];
msg += "\" wire has already been sent by ";
msg += arrWireSent[sentWireIndex][5];
msg += " on ";
msg += frm[arrWireSent[sentWireIndex][4] + "sendDate"].value;
msg += ". Do you wish to overwrite the previously sent wire?";
if (!confirmYesNo(msg))
{
frm.hidDraftWireMasterID.value = arrWireSent[sentWireIndex][4];
}
}
frm.hidTemplateID.value = frm.sWireTemplate.value;
frm.hidTemplateName.value = frm.sWireTemplate.options[frm.sWireTemplate.selectedIndex].text;
frm.hidTrancheName.value = frm.tranche.options[frm.tranche.selectedIndex].text;
frm.hidWireTypeName.value = frm.sWireCategory.options[frm.sWireCategory.selectedIndex].text;
frm.method = "POST";
frm.action = "wire_AddressWire.asp";
frm.submit();
}
}
else
alert("Tranche is not selected. Your subsidiary may not be a tranche owner in this deal.")
}
function findDraftWire(frm)
{
for (var i = 0; i < arrWireDrafts.length; i++)
{
if ((arrWireDrafts[i][0] == frm.tranche.value) &&
(arrWireDrafts[i][2] == frm.sWireTemplate.value)) 
{
return i;
}
}
return -1;
}
function findSentWire(frm)
{
for (var i = 0; i < arrWireSent.length; i++)
{
if ((arrWireSent[i][0] == frm.tranche.value) &&
(arrWireSent[i][2] == frm.sWireTemplate.value)) 
{
return i;
}
}
return -1;
}
function fillWireTemplateDropDown()
{
var sWireCategorySel = document.frmMain.sWireCategory;
var wireTemplateSel = document.frmMain.sWireTemplate;
clearWireTemplateDropDown();
for(var i=0; i< arrWireTemplates.length; i++) 
{
if (arrWireTemplates[i][0] == sWireCategorySel.value)
{
if (arrWireTemplates[i][4] == 'True')
{
var opt = new Option(arrWireTemplates[i][3].replace(/&amp;/g,"&"), arrWireTemplates[i][2]);
wireTemplateSel.options[wireTemplateSel.options.length] = opt;
}
}
}
checkFreeText();
}
function clearWireTemplateDropDown()
{
document.frmMain.sWireTemplate.length = 0;
}
function checkFreeText()
{
var wireCategorySel = document.frmMain.sWireCategory;
document.all.newFreeText.style.display = 'none';
if (wireCategorySel.selectedIndex < 0)
return;
if (wireCategorySel.options[wireCategorySel.selectedIndex].text == 'Free Text')
{
document.all.newFreeText.style.display = 'block';
}
}
function createFreeTextTemplate()
{
var frm = document.frmMain;
frm.hidAction.value = "add";
if (ValidateForm(frm))
{
frm.method = "POST";
frm.action = "wire_FreeTextTemplateCreate.asp";
frm.submit();
}
}
function CheckConditionallyRequiredFields(frm, arrFieldsInErro)
{
var arrMoreErrors = new Array();
if (frm.hidAction.value != "add")
{
if (frm.sWireTemplate.value == '')
{
var arrError = FieldErrorInfo("sWireTemplate", 'Please select a template.', "", "sWireTemplate", "Template");
arrMoreErrors[arrMoreErrors.length] = arrError;
}
}
return arrMoreErrors;
}
