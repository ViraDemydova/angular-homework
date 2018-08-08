<!-- 
function padNumber(str, length, padChar)
{
var padding = "";
str = str + "";
if (padNumber.arguments.length == 2)
padChar = "0";
for (i = str.length; i < length; i++)
padding += padChar;
return padding + str;
}
function getClientLocalDate()
{
var today = new Date();
var month = today.getMonth();
var date = today.getDate();
var year = today.getFullYear();
return padNumber(month+1, 2) + "/" + padNumber(date, 2) + "/" + year;
}
function addressWire( frm )
{
frm.hidTemplateId.value = frm.templates.value;
frm.method = "POST";
frm.action = "/asp/wire_AddressWire.asp";
frm.target = "_self";
frm.submit();
}
function editWire( frm )
{
if (ValidateForm(frm))
{
frm.hidBrkList.value = getBrokers(frm);
frm.hidNonBrkList.value = getNonBrokers(frm);
frm.method = "POST";
frm.action = "/asp/wire_EditWire.asp";
frm.target = "_self";
frm.submit();
}
}
function addressWireBack( frm )
{
window.history.back();
}
function previewWire( frm )
{
window.open('blank.asp', 'preview','height=600,width=800,scrollbars');
frm.hidAction.value = "Preview";
frm.hidClientLocal_dt.value = getClientLocalDate();
frm.method = "POST";
frm.action = "wire_PreviewWire.asp";
frm.target = "preview";
frm.submit();
}
function ReloadSavedWire(frm)
{
frm.hidAction.value = "Preview";
frm.hidClientLocal_dt.value = getClientLocalDate();
frm.method = "POST";
frm.action = "wire_PreviewWire.asp";
frm.target = "preview";
frm.submit();
}
function previewWireAddr( frm )
{
if (ValidateForm(frm))
{
var oNewWindow = window.open('', 'preview','height=600,width=800,scrollbars=yes,resizable=yes');
if (oNewWindow)
{
frm.hidBrkList.value = getBrokers(frm);
frm.hidNonBrkList.value = getNonBrokers(frm);
frm.hidClientLocal_dt.value = getClientLocalDate();
frm.method = "POST";
frm.action = "wire_PreviewWire.asp";
frm.target = "preview";
frm.submit();
}
}
}
function previewAWire( frm, brkid )
{
window.open('','preview_a_wire', 'height=600,width=800,scrollbars=yes,resizable=yes');
var sBrkList = frm.hidBrkList.value;
frm.hidBrkList.value = brkid;
frm.hidClientLocal_dt.value = getClientLocalDate();
frm.hidWireTxt.value = restoreWireVariable(document.all("wireTxt").innerHTML); 
frm.method = "POST";
frm.action = "wire_PreviewAWire.asp";
frm.target = "preview_a_wire";
frm.submit();
frm.hidBrkList.value = sBrkList;
}
function previewResponseWire( frm, templateID )
{
if (ValidateForm(frm))
{
frm.hidClientLocal_dt.value = getClientLocalDate();
frm.hidWTID.value = templateID;
frm.method = "POST";
frm.action = "wire_PreviewWire.asp";
frm.target = "preview";
window.open('', 'preview','height=600,width=800,scrollbars=yes,resizable=yes');
frm.submit();
}
}
function saveWireDraft(frm)
{
frm.hidWireTxt.value = restoreWireVariable(document.all("wireTxt").innerHTML);
frm.hidAction.value = "SaveWire";
frm.action = "util_submit_action.asp";
frm.method = "POST"
frm.target = "_self";
frm.submit();
}
function sendWire()
{
var frm = document.frmMain;
frm.hidWireTxt.value = restoreWireVariable(document.all("wireTxt").innerHTML);
frm.action = "util_submit_action.asp";
frm.method = "POST";
frm.target = "_self";
document.all("divActiveSendButton").style.display="none";
document.all("divInActiveSendButton").style.display="inline";
document.all("divActiveSendButton2").style.display="none";
document.all("divInActiveSendButton2").style.display="inline";
if (frm.hidAllowPricingWire.value == "0")
{
var ret = confirm("Regulatory Wire has not been sent yet. Do you want to continue?");
if (!ret)
{
window.opener.location.href = "wire_templatelist.asp" ;
window.close() ;
return;
}
}
if (frm.hidIsConfidentialDeal.value == "1")
{
var ret = confirm("The deal is confidential. Are you sure you want to sent this wire?");
if (!ret)
return;
}
if (frm.hidWireTypeName.value == "Invitation" && frm.hidCEF.value == "True" && frm.hidBookOpen.value == "0")
{
var ret = confirm("The Book is Closed. Are you sure you want to send this wire?");
if (!ret)
return;
}
if (frm.hidRespondWireID.value != "") 
{
frm.hidClientLocal_dt.value = getClientLocalDate();	
frm.hidAction.value = 'AddResponse';
}
frm.submit();	
}
function viewSentWire( wmid, frm)
{
frm.hidWID.value = wmid;
frm.method = "POST"
frm.hidAction.value = "select"
frm.action = "/asp/wire_viewSentWire.asp";
frm.target = "_self";
frm.submit();
}
function viewInBox(frm , mode, sort)
{
if (ValidateForm(frm))
{
frm.hidMode.value = mode;
frm.hidFromDt.value = frm.dtTxtDateFrom.value + " 00:00:00 AM"; 
frm.hidToDt.value = frm.dtTxtDateTo.value + " 00:00:00 AM"; 
frm.hidSortCol.value = sort;
frm.method = "POST"; 
frm.action = "/asp/wire_InBox.asp";
frm.target = "_self";
frm.submit();
}
}
function viewOutBox(frm, sort)
{
if (frm.hidSortOrd.value == "ascending")
{
frm.hidSortOrd.value = "descending";	
}	
else
{
frm.hidSortOrd.value = "ascending";
}
frm.method = "POST"; 
frm.hidSortCol.value = sort;
frm.action = "/asp/wire_OutBox.asp";
frm.target = "_self";
frm.submit();
}
function viewWire( wid, frm)
{
frm.hidWID.value = wid;
frm.method = "POST"
frm.hidAction.value = "select"
frm.action = "/asp/wire_viewwire.asp";
frm.target = "_self";
frm.submit();
}
function viewWireSent( wid, frm)
{
frm.hidWID.value = wid;
frm.method = "POST"
frm.action = "/asp/wire_viewWireSent.asp";
frm.target = "_self";
frm.submit();
}
function viewResponse( wid, frm)
{
frm.hidWID.value = wid;
frm.method = "POST"
frm.action = "/asp/wire_viewResponse.asp";
frm.target = "_self";
frm.submit();
}
function getPrinterFriendly(frm, page)
{
frm.method = "POST";
frm.action = page + "?Printer=1";
frm.submit();
}
function Revert(frm, page)
{
frm.method = "POST";
frm.action = page;
frm.submit();
}
function formatWireVariable(src)
{
var s = src;
var reEmptyWireDealLevelVariable = new RegExp("&lt;wire_deal_level_variable&gt;&lt;/wire_deal_level_variable&gt;", "g"); 
s = s.replace(reEmptyWireDealLevelVariable, "");	
var reBeginWireDealLevelVariable = new RegExp("&lt;wire_deal_level_variable&gt;", "g"); 
s = s.replace(reBeginWireDealLevelVariable, "<label type='text' class='DealLevelVariable' contentEditable='false' oncontrolselect='javascript:unstoreCaretForWireText();'>"); 
var reEndWireDealLevelVariable = new RegExp("&lt;/wire_deal_level_variable&gt;", "g"); 
s = s.replace(reEndWireDealLevelVariable, "</label>");	
var reBeginWireVariable = new RegExp("&lt;wire_variable&gt;", "g"); 
var reEndWireVariable = new RegExp("&lt;/wire_variable&gt;", "g"); 
s = s.replace(reBeginWireVariable, "<span type='text' class='WireVariable' contentEditable='false' oncontrolselect='javascript:unstoreCaretForWireText();'>"); 
s = s.replace(reEndWireVariable, "</span>");	
var reLT = new RegExp("&lt;", "g"); 
var reGT = new RegExp("&gt;", "g");
s = s.replace(reLT, "<"); 
s = s.replace(reGT, ">"); 
return s;
}
function formatWireText(src)
{
var s = src;
var reLT = new RegExp("&lt;", "g"); 
var reGT = new RegExp("&gt;", "g");
var reSpace = new RegExp("&amp;nbsp;", "g"); 
var reAmpLT = new RegExp("&amp;lt;", "g"); 
var reAmpGT = new RegExp("&amp;gt;", "g"); 
s = s.replace(reLT, "<"); 
s = s.replace(reGT, ">"); 
s = s.replace(reSpace, " ");
s = s.replace(reAmpLT,"&lt;"); 
s = s.replace(reAmpGT, "&gt;"); 
return s;
}
function restoreWireVariable(src)
{
var s = src;
var reBeginWireVar = new RegExp("<span[^>]*WireVariable([^>].)*>", "gi"); 
s = s.replace(reBeginWireVar, "<");
var reEndWireVar = new RegExp("</span>", "gi"); 
s = s.replace(reEndWireVar, "/>"); 
var reBeginP = new RegExp("<p>", "gi"); 
s = s.replace(reBeginP, ""); 
var reEndP = new RegExp("</p>", "gi"); 
s = s.replace(reEndP, "");
var reBeginLabel = new RegExp("<label[^>]*DealLevelVariable[^>]*>", "gi"); 
s = s.replace(reBeginLabel, "");
var reEndLabel = new RegExp("</label>", "gi"); 
s = s.replace(reEndLabel, ""); 
var reBr = new RegExp("<br>", "gi"); 
s = s.replace(reBr, "\n"); 
var reSpace = new RegExp("&nbsp;", "gi"); 
s = s.replace(reSpace, " ");	
var reSpace = new RegExp("&amp;", "gi"); 
s = s.replace(reSpace, "&"); 
return s;
}
function onBeforePasteWire()
{
window.event.returnValue = false;
}
function onPasteWire()
{
window.event.returnValue = false;
var tr = window.document.selection.createRange();
tr.text = window.clipboardData.getData("Text");	
}
function onDropWire()
{
window.event.returnValue = false;
var tr = window.document.selection.createRange();
tr.text = event.dataTransfer.getData("Text"); 
}
var lastReturnTextRange = null;
function onKeyPressWireTxt()
{	
if (window.event.keyCode == 13)
{
var tr = window.document.selection.createRange();
if (tr != null && g_textRange != null)
{
if(lastReturnTextRange != null && lastReturnTextRange.inRange(tr))
tr.text = " \n";
else
tr.text = "\n";
tr.select();
lastReturnTextRange = tr.duplicate();
}	
window.event.returnValue = false;
}
}
function refreshWireLibrary(text, value, sWireLibraryId)
{
var option = new Option(text, value);
option.wire_library_id = sWireLibraryId ;
document.frmMain.sWireLibrary.options[document.frmMain.sWireLibrary.options.length] = option;
}
function excelExport()
{
document.frmMain.action = "wire_ViewWire.asp";
document.frmMain.hidExportExcel.value = "true";
document.frmMain.submit();
document.frmMain.hidExportExcel.value = "";
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
