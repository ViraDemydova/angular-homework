<!-- 
function onPageLoad()
{
}
function onEnter()
{
if ((document.frmMain.rtxtWireName.value !="") && (document.frmMain.rtxtWireTemplateText.value !=""))
{
submitPage(document.frmMain);
}
}
function storeCaret (textareaElem)
{
if (textareaElem.createTextRange) {
if (document.selection && document.selection.createRange) 
textareaElem.caretPos = document.selection.createRange().duplicate();
}
}
var g_textRange = null;
function storeCaretForWireText()
{
var textRange = document.selection.createRange();
if (textRange != null && textRange.text != undefined)
g_textRange = textRange.duplicate();
else
g_textRange = null;
}
function unstoreCaretForWireText()
{
g_textRange = null;
}
function insertLibrary(frm) {
var textareaElem = frm.rtxtWireTemplateText;
var select = frm.sWireLibrary;
var text = select.options[select.selectedIndex].value;
if (frm.rtxtWireTemplateText.caretPos)
{
if (isValidCaretPos())
{ 
if(isValidTextRange	())
{
insertText(textareaElem, text);
textareaElem.focus();
} 
}
}
else
{
alert("Please place the cursor at the position where you want to insert Custom Text");
}
}
function insertLibraryIntoWireText(frm) 
{
if (g_textRange != null)
{
g_textRange.text = document.frmMain.sWireLibrary.options[document.frmMain.sWireLibrary.options.selectedIndex].value;
}
else
{
alert("Please place the cursor at the position where you want to insert Custom Text");
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
function createFragment()
{
window.open('wire_createFragment_popUp.asp','createFragment','height=300,width=700,resizable=yes,status=yes,scrollbars=yes');
}
function editFragment()
{
var oElem ;
oElem = document.getElementById("sWireLibrary") ;
if( oElem && oElem.selectedIndex > -1)
{
var oOption = oElem.options(oElem.selectedIndex) ;
if(oOption)
{
var sWireLibraryId = oOption.wire_library_id;
if(sWireLibraryId != null && sWireLibraryId != '')
{
var sURL = "wire_editFragment_popUp.asp?wire_library_id=" + sWireLibraryId ;
window.open(sURL,'editFragment','height=300,width=700,resizable=yes,status=yes,scrollbars=yes');
}
else
{
alert("The public custom text cannot be edited.") ;
}
}
}
}
function isValidCaretPos()
{
if (document.forms["frmMain"].rtxtWireTemplateText.caretPos)
{
var caretPos = document.forms["frmMain"].rtxtWireTemplateText.caretPos.duplicate();
var bFlag = true;
caretPos.moveStart("character", 1);
while (true)
{
if (caretPos.moveStart("character", -1) == -1)
{	
var text = caretPos.text.substr(0,1);
if (text == "<")
{
if (document.forms["frmMain"].rtxtWireTemplateText.caretPos.text.substr(0,1) != "<")
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
return bFlag; 
}
else
return false;
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
if (isValidSelection())
if (isValidCaretPos())
event.returnValue = true;
}
function fnPaste()
{
event.returnValue = false;
var text = window.clipboardData.getData("Text");
if ((text.indexOf("<") == -1) && text.indexOf(">") == -1) 
{
if (isValidCaretPos())
{
if(isValidTextRange())
{
event.returnValue = true; 
}
}
}
}
function fnCopy()
{
event.returnValue = false;
if (isValidSelection())
if (isValidCaretPos())
event.returnValue = true;
}
