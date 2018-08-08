<!-- 
function onPageLoad()
{
document.initialOptions = new Array();
var sSourceSel = document.frmMain.sTemplateList;
for (var i = 0; i < sSourceSel.options.length; i++)
{
var oOption = new Option(sSourceSel[i].text, sSourceSel[i].value);
document.initialOptions[i] = oOption;
}
}
function fRemove(sSel)
{
var iLen = sSel.options.length;
for (var i = 0; i <iLen;)
{
if ((sSel[i] != null) && (sSel[i].selected))
{
sSel.options[i]= null;
}
else
i++;
}
}
function fAdd(sSourceSel, sDestSel)
{
for (var i = 0; i < sSourceSel.options.length; i++)
{
if (sSourceSel[i].selected)
{
var bFound = false;
for (var j = 0; j < sDestSel.options.length; j++)
{
if (sDestSel[j].value == sSourceSel[i].value)
{
bFound = true;
break;
}
}
if (!bFound) 
fAddOption(sSourceSel[i].text, sSourceSel[i].value, sDestSel);
}
} 
}
function fAddOption(sText, sValue, oSelect)
{
var oOption = new Option(sText, sValue);
oSelect.options[oSelect.options.length] = oOption;
}
function init()
{
var sSourceSel = document.frmMain.sTemplateList;
sSourceSel.options.length = 0;
if (document.initialOptions.length)
{
for (var i = 0; i < document.initialOptions.length; i++)
{
fAddOption(document.initialOptions[i].text, document.initialOptions[i].value, sSourceSel);
}
}
}
function onEnter()
{
if ((document.frmMain.rtxtTemplateName.value != "") && (document.frmMain.rtxtTemplateText.value !=""))
{
submitPage(document.frmMain);
}
}
function templateNameExists(cid, wireTypeID, templateName)
{
if (cid == '')
cid = 0;
var co = RSExecute("/asp/rs_wire_checkTemplateName.asp","js_NameExist", cid, wireTypeID, templateName);
return co.return_value;
}
function getRoles(frm)
{
sSourceSel = frm.sTemplateList;
var roles = "";
for (var i = 0; i < sSourceSel.options.length; i++)
{
if (i == 0)
roles += sSourceSel[i].value;
else
roles += "," + sSourceSel[i].value;
}
return roles;
}
function submitPage(frm)
{
if (ValidateForm(frm))
{
frm.method = "POST";
frm.hidAction.value = 'Update';
if ((frm.oldTemplateName.value != frm.rtxtTemplateName.value) ||
(frm.oldCid.value != frm.sFirm.value))
{
if (!templateNameExists(frm.sFirm.value, frm.hidWireTypeID.value, frm.rtxtTemplateName.value))
{	
frm.hidRoles.value = getRoles(frm);	
frm.hidAction.value = 'Add';
frm.method = "POST";
frm.action = "util_submit_action.asp";
frm.submit();
return true;
}
else
{
alert("Template '" + frm.rtxtTemplateName.value + "' exists, please choose another name");
frm.rtxtTemplateName.focus();
}
}
else
{
frm.hidRoles.value = getRoles(frm);
frm.action = "util_submit_action.asp";
frm.submit();
return true;
}
}
}
function storeCaret (textareaElem)
{
if (textareaElem.createTextRange) {
if (document.selection && document.selection.createRange) 
textareaElem.caretPos = document.selection.createRange().duplicate();
}
}
function insertVariable(frm) {
var textareaElem = frm.rtxtTemplateText;
var select = frm.sWireVariable;
var text = select.options[select.selectedIndex].value;
if (isValidCaretPos())
{ 
insertText(textareaElem, text);
textareaElem.focus();
}
}
function insertText(textareaElem, text)
{
if (textareaElem.createTextRange && textareaElem.caretPos)
{
var caretPos = textareaElem.caretPos;
caretPos.text = caretPos.text.charAt(caretPos.text.length - 1) == ' ' ? text + ' ' : text;
}
else
textareaElem.value = text;
}
function isValidCaretPos()
{
var bFlag = true;
if (document.forms["frmMain"].rtxtTemplateText.caretPos)
{
var caretPos = document.forms["frmMain"].rtxtTemplateText.caretPos.duplicate();
while (true)
{
if (caretPos.moveStart("character", -1) == -1)
{	
var text = caretPos.text.substr(0,1);
if (text == "<")
{ 
if (document.forms["frmMain"].rtxtTemplateText.caretPos.text.substr(0,1) != "<")
{
bFlag = false;
break;
}
}
else if (text == ">")
{
break;
}
else if ((text == " ") || (text == "\n"))
{
break;
}
}
else
break;
}
}
return bFlag; 
}
function validateKey()
{
var bFlag = false;
var caretPos = document.selection.createRange().duplicate();
if (isArrowKey())
{
bFlag = true;
}
else if (isAngleBracket())
{
bFlag = false;
}
else if (isValidCaretPos())
{
if (isValidTextRange())
{
if (isBackspaceKey())
{
if (caretPos.text.length == 0)
{
caretPos.moveStart("character", -1);
if (caretPos.text.indexOf(">") == -1)
bFlag = true;
}
else
bFlag = true;
}
else if (isDeleteKey())
{
if (caretPos.text.length == 0)
{
caretPos.moveEnd("character", 1);
if (caretPos.text.indexOf("<") == -1)
bFlag = true;
}
else
bFlag = true;
}
else
bFlag = true;
}
}
return bFlag;
}
function isValidSelection()
{
var textRange = document.selection.createRange();
var text = textRange.text;
var bFlag = true;
if ((text.indexOf("<") != -1) || (text.indexOf(">") != -1))
{
document.selection.empty();
bFlag = false;
}
return bFlag;
}
function isValidTextRange()
{
var textRange = document.selection.createRange();
var text = textRange.text;
var bFlag = true;
var listArray = text.split("<");
var listArray2 = text.split(">");
if (listArray.length != listArray2.length)
{
bFlag = false;
}
else if (listArray.length > 1)
{
if (listArray[0].indexOf(">") != -1)
bFlag = false;
else
{
for (var i = 1; i < listArray.length; i ++)
{
var str = listArray[i];
var index = str.indexOf(">");
var index2 = str.lastIndexOf(">");
if ((index != -1) && (index2 != index))
{
bFlag = false;
break;
}
}
}
}
return bFlag;
}
function fnCut()
{
event.returnValue = false;
if (isValidCaretPos())
{
event.retrunValue = isValidTextRange();
}
}
function fnPaste()
{
event.returnValue = false;
var text = window.clipboardData.getData("Text");
if ((text.indexOf("<") == -1) && text.indexOf(">") == -1) 
if (isValidCaretPos())
event.returnValue = true; 
}
function fnCopy()
{
event.returnValue = false;
if (isValidSelection())
if (isValidCaretPos())
event.returnValue = true;
}
