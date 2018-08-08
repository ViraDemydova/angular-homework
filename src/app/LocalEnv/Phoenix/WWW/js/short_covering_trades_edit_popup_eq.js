<!-- 
var bTradeEditSectionDirty=false;
var arrDirtyF = new Array();
var g_bHideOtherTrade=true;
var bSkipUnloadPageMsg = false;
var bTradeEntryDirty=false; 
var g_PageNo = 1; 
var g_PageSize = 250;
var g_OtherTradesArray = new Array();
function CheckConditionallyRequiredFields( frm, arrFieldsInError )
{
var arrMoreErrors = new Array();
return (arrMoreErrors);
} 
function submitPage( frm , action)
{
var bValidData = true;
bSkipUnloadPageMsg = true; 
switch (action)
{
case "UpdateEq" :
getDocumentElement("hidSaveTrade").value="0"; 
frm.hidAction.value = "UpdateSingleTradeEq";
if (bTradeEditSectionDirty)
{
if(!ValidationEditTradeList())
bValidData = false;
}
if (bValidData)
{
frm.action = "/asp/util_submit_action.asp";
frm.submit(); 
} 
break; 
case "UpdateEqFromSaveTradePopUp" :
document.frmMain.hidAction.value = "UpdateEq";
if(!ValidationAddToTradeList())
bValidData = false;
else if (bTradeEditSectionDirty)
{
if(!ValidationEditTradeList())
bValidData = false;
}
if (bValidData)
{
document.frmMain.action = "/asp/util_submit_action.asp";
document.frmMain.submit(); 
} 
break;
case "AddEqFromSaveTradePopUp": 
document.frmMain.hidAction.value = "AddEq";
if(ValidationAddToTradeList())
{
document.frmMain.action = "/asp/util_submit_action.asp";
document.frmMain.submit(); 
} 
break; 
}
}
function getDocumentElement(sElementName)
{
if (document.getElementById)
{
return document.getElementById(sElementName);
}
else if (document.all)
{
return document.all[sElementName];
}
else if (document.layers)
{	
if (document.layers[sElementName])
{
return document.layers[sElementName]; 
}
for(var i=0;i<document.layers.count-1;i++)
{
if (document.layers[i].elements[sElementName])
{
return document.layers[i].elements[sElementName];
}
} 
}
return 0;
}
function formatDatePart(emName, datePart)
{
var theForm = document.forms["frmMain"];
var iValue;
if (datePart == "hr")
{
iValue = parseInt(emName.value,10);
if ((iValue < 1) || (iValue > 12))
{
var sStatusMsg = new String;
sStatusMsg = sStatusMsg + "Please correct the following error(s):<br>";
var sMsg = " contain invalid hour..";
sStatusMsg = sStatusMsg + "<li><a href='JavaScript:self.window.opener.document.frmMain." + emName.id + ".focus()'Time </a> " + sMsg + "<br>";
showErrorMessage(sStatusMsg);
}
}
if (datePart == "min")
{
iValue = parseInt(emName.value,10);
if (iValue > 60)
{
var sStatusMsg = new String;
sStatusMsg = sStatusMsg + "Please correct the following error(s):<br>";
var sMsg = " contain invalid minute..";
sStatusMsg = sStatusMsg + "<li><a href='JavaScript:self.window.opener.document.frmMain." + emName.id + ".focus()'Time </a> " + sMsg + "<br>";
showErrorMessage(sStatusMsg);
}
}
} 
function showHideOneArea(areaName, bShow)
{
var objDivIdentity = getDocumentElement(areaName);
if (objDivIdentity)
{
if (bShow == '1'){
objDivIdentity.style.display = '';
}
else{
objDivIdentity.style.display = 'none';
}
}
}
function onProductChange(enChanged, ActionType, nPosition)
{
for(var i=0; i<arrPrdNamesAdd.length; i++)
{
if (arrPrdNamesAdd[i][0] == enChanged.value)
{
if (ActionType == "ADD")
getDocumentElement("hidExchangeID").value = arrPrdNamesAdd[i][1];
else 
{
getDocumentElement("hidExchangeID"+ nPosition).value = arrPrdNamesAdd[i][1];
onUpdateDirtyFlag(nPosition);
}
break;
}
}
}
function onUpdateDirtyFlag(nPosition)
{
var hidElementName;
bTradeEditSectionDirty = true;
hidElementName = "hidDirtyF" + nPosition;
if (getDocumentElement(hidElementName).value=="0")
{
arrDirtyF[arrDirtyF.length]=nPosition;
getDocumentElement(hidElementName).value="1";
}
}
function onUpdateClearanceDirtyFlag()
{
var hidElementName;
hidElementName = "hidClearanceDirty";
getDocumentElement(hidElementName).value="1";
}
function showErrorMessage(sStatusMsg)
{
var sMessage = new String;
sMessage = sMessage + "<html><head>";
sMessage = sMessage + "<title>" + document.title + " Error(s)" + "</title>";
sMessage = sMessage + "<link href='../style/ideal_custom_generic.css' rel='stylesheet' type='text/css'>";
sMessage = sMessage + "<link href='../style/ideal_custom_ie.css' rel='stylesheet' type='text/css'>";
sMessage = sMessage + "</head><body>";
sMessage = sMessage + "<table cellspacing='0' cellpadding='0' width='100%' height='62' border='0'>";
sMessage = sMessage + "<tr><td width='119' height='62' rowspan='3' class='topWelcomeArea1' valign='top'><img src='../images/brand.gif' width='119' height='62' border='0' alt='i-Deal'></td>";
sMessage = sMessage + "<td width='20' height='30' class='topWelcomeArea'><img src='../images/spacer.gif' width='20' height='30' border='0'></td>";
sMessage = sMessage + "<td class='topWelcomeArea'>&nbsp;</td>";
sMessage = sMessage + "<td class='topWelcomeArea' nowrap width='50%'><img src='../images/spacer.gif' width='2' height='7' border='0'><br><img src='../images/spacer.gif' width='10' height='3' border='0'>&nbsp; </td>";
sMessage = sMessage + "<td class='topWelcomeArea' width='50%' align='right' nowrap><img src='../images/spacer.gif' width='2' height='7' border='0'><br>&nbsp;<img src='../images/spacer.gif' width='10' height='10' border='0'></td>";
sMessage = sMessage + "</tr>";
sMessage = sMessage + "<tr><td colspan='4' height='3'><img src='../images/spacer.gif' width='10' height='3' border='0'></td></tr>";
sMessage = sMessage + "<tr><td></td><td colspan='3' class='txtRegular'>"
sMessage = sMessage + sStatusMsg;
sMessage = sMessage + "<br><input type='button' value='Close' class='stdButton_R2' onclick='javascript:window.close()'>";
sMessage = sMessage + "</td></tr>";
sMessage = sMessage + "</table></body></html>";
var sHeight = "height=" + (85 + (5 * 22));
var sWindowParms = "toolbar=no,location=no,directories=no,scrollbars=yes,resizable=yes,width=450,center=yes,dependent=yes," + sHeight;
var sChildName = window.name + "Errors";
popupError = window.open("",sChildName,sWindowParms);
popupError.document.open();
popupError.document.write(sMessage);
popupError.document.close();
popupError.focus();
}
function setFocus(oElement)
{
if(oElement)
{
oElement.focus();
}
}
function openSaveTradePopUp(sActionType)
{
var sUrl = "short_convering_trade_save_popup.asp?ActionType=" + String(sActionType);
var sStyle = "width=350,height=80,scrollbars=1,resizable=0";
openGeneralPopup( sUrl, '', sStyle );	
}
function CheckTradeEntryComplete()
{
if( getDocumentElement("radEntryType").checked) 
{	
var elDate = getDocumentElement("dtTxtTradeDate");
if (elDate.value.length == 0)
{
return false;
}
var elQuantity = getDocumentElement("iQuantity");
var elPrice = getDocumentElement("fltPrice"); 
if (elQuantity.value.length == 0 || elQuantity.value == 0)
{
return false;
}
if (elPrice.value.length == 0 || elPrice.value == 0)
{
return false;
}
}
else
{
var elDate = getDocumentElement("dtTxtTradeDateDI");
if (elDate.value.length == 0)
{
return false;
}
var elAmount = getDocumentElement("fltAmountDI");
if (elAmount.value.length == 0 || elAmount.value == 0)
{
return false;
}
}
return true;
}
function DisplayPrevShortCvOrder(nOrderPos)
{
var hidType;
hidType = getDocumentElement("hidType" + nOrderPos);
if (hidType.value == "DI" || hidType.value == "IT")
{
showHideOneArea("divTradeLayer", "0"); 
showHideOneArea("divDividenInterestLayer", "1");
if (hidType.value == "DI")
{
frmMain.all("radEntryType").item(1).checked = true;
getDocumentElement("fltAmountDI").value = getDocumentElement("fltDividend" + nOrderPos).value;
} 
else
{
frmMain.all("radEntryType").item(2).checked = true;
getDocumentElement("fltAmountDI").value = getDocumentElement("fltInterest" + nOrderPos).value;
} 
getDocumentElement("dtTxtTradeDateDI").value = getDocumentElement("dtTxtTradeDate" + nOrderPos).value;
getDocumentElement("tmTxtTradeTimeHrDI").value = getDocumentElement("tmTxtTradeTimeHr" + nOrderPos).value;
getDocumentElement("tmTxtTradeTimeMinDI").value = getDocumentElement("tmTxtTradeTimeMin" + nOrderPos).value;
getDocumentElement("DropDownAmPmDI").selectedIndex = getDocumentElement("DropDownAmPm" + nOrderPos).selectedIndex;
getDocumentElement("tmTxtCommentsDI").value = getDocumentElement("hidComments" + nOrderPos).value;
}
else
{
showHideOneArea("divDividenInterestLayer", "0"); 
showHideOneArea("divTradeLayer", "1");
frmMain.all("radEntryType").item(0).checked = true;
getDocumentElement("dtTxtTradeDate").value = getDocumentElement("dtTxtTradeDate" + nOrderPos).value;
getDocumentElement("tmTxtTradeTimeHr").value = getDocumentElement("tmTxtTradeTimeHr" + nOrderPos).value;
getDocumentElement("tmTxtTradeTimeMin").value = getDocumentElement("tmTxtTradeTimeMin" + nOrderPos).value;
getDocumentElement("DropDownAmPm").selectedIndex = getDocumentElement("DropDownAmPm" + nOrderPos).selectedIndex;
getDocumentElement("DropDownTradeAction").selectedIndex = getDocumentElement("DropDownTradeAction" + nOrderPos).selectedIndex;
getDocumentElement("iQuantity").value = getDocumentElement("iQuantity" + nOrderPos).value;
getDocumentElement("DropDownProduct").selectedIndex = getDocumentElement("DropDownProduct" + nOrderPos).selectedIndex;
onProductChange(getDocumentElement("DropDownProduct")+nOrderPos, 'ADD', '1');
getDocumentElement("fltPrice").value = getDocumentElement("fltPrice" + nOrderPos).value;
getDocumentElement("DropDownTradeType").selectedIndex = getDocumentElement("DropDownTradeType" + nOrderPos).selectedIndex;
getDocumentElement("tmTxtComments").value = getDocumentElement("hidComments" + nOrderPos).value;
if (getDocumentElement("fltDividend" + nOrderPos))
{
frmMain.all("radTradeDivInt").item(0).checked = true;
getDocumentElement("fltAmountTDivInt").value = getDocumentElement("fltDividend" + nOrderPos).value;
}
else if (getDocumentElement("fltInterest" + nOrderPos))
{
frmMain.all("radTradeDivInt").item(1).checked = true;
getDocumentElement("fltAmountTDivInt").value = getDocumentElement("fltInterest" + nOrderPos).value;
}
}
}
function clearOrderEntry()
{
if (frmMain.all("radEntryType").item(1).checked == true || 
frmMain.all("radEntryType").item(2).checked == true)
{
getDocumentElement("dtTxtTradeDateDI").value = '';
getDocumentElement("tmTxtTradeTimeHrDI").value = '';
getDocumentElement("tmTxtTradeTimeMinDI").value = '';
getDocumentElement("DropDownAmPmDI").selectedIndex = 0;
getDocumentElement("fltAmountDI").value = '';
getDocumentElement("tmTxtCommentsDI").value = '';
}
else
{
getDocumentElement("dtTxtTradeDate").value = '';
getDocumentElement("tmTxtTradeTimeHr").value = '';
getDocumentElement("tmTxtTradeTimeMin").value = '';
getDocumentElement("DropDownAmPm").selectedIndex = 0;
getDocumentElement("DropDownTradeAction").selectedIndex = 0;
getDocumentElement("iQuantity").value = '';
getDocumentElement("DropDownProduct").selectedIndex = 0;
onProductChange(getDocumentElement("DropDownProduct"), 'ADD', '1');
getDocumentElement("fltPrice").value = '';
getDocumentElement("DropDownTradeType").selectedIndex = 0;
getDocumentElement("tmTxtComments").value = '';
frmMain.all("radTradeDivInt").item(0).checked = true;
getDocumentElement("fltAmountTDivInt").value = '';
}
}
function formatFixedDecimalAmount2(obj, digits)
{
var sValue = obj.value
sValue = sValue.replace(/,/g, "");
obj.value = formatFixedDecimalAmountString(sValue,digits);
}
function ToggleExTradeSection()
{
var elHiddenCount = getDocumentElement("hidCount"); 
if (elHiddenCount.value <= 10)
return;
var imgObj = document.images['ImExTradeSection'];
if (g_bHideOtherTrade) 
{
imgObj.src = "../images/collapse.gif";
}
else 
{
imgObj.src = "../images/expand.gif";
}
for (var i=0; i<document.styleSheets.length; i++)
{ 
if (document.styleSheets.item(i).id == "RowHide")
{
if (g_bHideOtherTrade)
document.styleSheets.item(i).cssText = '.RowHide{display:;}';
else
document.styleSheets.item(i).cssText = '.RowHide{display:none;}';
break;
}
}
g_bHideOtherTrade = !g_bHideOtherTrade;	
}
function GenerateOtherTradesArray()
{
var elHiddenCount = getDocumentElement("hidCount"); 
if (elHiddenCount.value <= 10)
return;
for (var i=11; i<=elHiddenCount.value; i++)
{ 
var elem = document.all("trOthers" + i);
g_OtherTradesArray[i-11] = elem;
}
}
function GotoPage()
{
if (g_PageNo > 1)
{ 
document.all("hrefPrevPage").style.display = "";
document.all("hrefPrevPage2").style.display = "";
}
else
{ 
document.all("hrefPrevPage").style.display = "none";
document.all("hrefPrevPage2").style.display = "none";
}
if (document.frmMain.hidCount.value > (g_PageNo * g_PageSize))
{
document.all("hrefNextPage").style.display = "";
document.all("hrefNextPage2").style.display = "";
}
else
{ 
document.all("hrefNextPage").style.display = "none";
document.all("hrefNextPage2").style.display = "none";
}
var RowCtr = (g_PageNo - 1) * g_PageSize;
for (;RowCtr < g_OtherTradesArray.length && RowCtr < (g_PageNo * g_PageSize); RowCtr++)
{ 
g_OtherTradesArray[RowCtr].style.display = "";
}
}
function PrevPage()
{
HideAllTrades();
g_PageNo--;
if (g_PageNo < 1)
g_PageNo = 1;
GotoPage();
}
function NextPage()
{
HideAllTrades();
g_PageNo++;
GotoPage();
}
function HideAllTrades()
{
for (var i=0; i<g_OtherTradesArray.length; i++)
{ 
g_OtherTradesArray[i].style.display = "none";
}
}
function ValidationAddToTradeList()
{
var arrMoreErrors = new String;
var arrError;
var bErrorInd;
bErrorInd = false;
sStatusMsg = "Please correct the following error(s):<br>";
if( frmMain.all("radEntryType").item(0).checked) 
{	
var elDate = getDocumentElement("dtTxtTradeDate");
var vControl;
if (elDate.value.length == 0 || !IsValidDate(elDate.value,UserSettings.dateMask, vControl))
{
bErrorInd = true;
var sMsg = " Please Enter Valid Value For Trade Date..";
sStatusMsg = sStatusMsg + "<li><a href='JavaScript:self.window.opener.document.frmMain.dtTxtTradeDate.focus()'> Trade Date </a> " + sMsg + "<br>";
}
var elQuantity = getDocumentElement("iQuantity");
var elPrice = getDocumentElement("fltPrice");
var elDivInt = getDocumentElement("fltAmountTDivInt"); 
if (elQuantity.value.length == 0 || elQuantity.value == 0 || !isSignedInteger( elQuantity.value, true ))
{
bErrorInd = true;
var sMsg = "Please Enter Valid Value For Trade Quantity";
sStatusMsg = sStatusMsg + "<li><a href='JavaScript:self.window.opener.document.frmMain.iQuantity.focus()'> Trade Quantity </a> " + sMsg + "<br>";
}
else
elQuantity.value =stripCharsInBag( elQuantity.value, numericCharsToIgnore );
if (elPrice.value.length == 0 || elPrice.value == 0 || !isSignedFloat( elPrice.value, true ))
{
bErrorInd = true;
var sMsg = "Please Enter Valid Value For Trade Price";
sStatusMsg = sStatusMsg + "<li><a href='JavaScript:self.window.opener.document.frmMain.fltPrice.focus()'> Trade Price </a> " + sMsg + "<br>";
}
else
elPrice.value =stripCharsInBag( elPrice.value, numericCharsToIgnore );
if (elDivInt.value.length > 0 && !isSignedFloat( elDivInt.value, true ))
{
bErrorInd = true;
var sMsg = "Please Enter Valid Value For Dividend/Interest Amount";
sStatusMsg = sStatusMsg + "<li><a href='JavaScript:self.window.opener.document.frmMain.fltPrice.focus()'> Dividend/Interest </a> " + sMsg + "<br>";
}
else
elDivInt.value =stripCharsInBag( elDivInt.value, numericCharsToIgnore );
}
else
{
var elDate = getDocumentElement("dtTxtTradeDateDI");
var vControl;
if (elDate.value.length == 0 || !IsValidDate(elDate.value,UserSettings.dateMask, vControl))
{
bErrorInd = true;
var sMsg = " Please Enter Valid Value For Trade Date..";
sStatusMsg = sStatusMsg + "<li><a href='JavaScript:self.window.opener.document.frmMain.dtTxtTradeDateDI.focus()'> Trade Date </a> " + sMsg + "<br>";
}
var elAmount = getDocumentElement("fltAmountDI");
if (elAmount.value.length == 0 || elAmount.value == 0 || !isSignedFloat( elAmount.value, true ))
{
bErrorInd = true;
var sMsg = " Please Enter Valid Value For Dividend/Interest Amount";
sStatusMsg = sStatusMsg + "<li><a href='JavaScript:self.window.opener.document.frmMain.dtTxtTradeDateDI.focus()'> Dividend/Interest </a> " + sMsg + "<br>";
}
else
elAmount.value =stripCharsInBag( elAmount.value, numericCharsToIgnore );
}
if (bErrorInd)
{
showErrorMessage(sStatusMsg);
return false;
}	
else
return true;
}
function ValidationEditTradeList()
{
if (!bTradeEditSectionDirty)
return true;
var bErrorInd;
bErrorInd = false;
sStatusMsg = "Please correct the following error(s) for edit trades:<br>";
var nCount;
var elHiddenCount = getDocumentElement("hidCount");
var elDate;
var elHr;
var elMin;
var elQty;
var elPrice;
var elDiv;
var elInt;
var vControl;
var elHiddenType;
var nDirtyRow;
for (nDirtyRow = 0; nDirtyRow < arrDirtyF.length; nDirtyRow++)
{
nCount = arrDirtyF[nDirtyRow];
elHiddenDirtyF = getDocumentElement("hidDirtyF" + nCount);
if (elHiddenDirtyF.value == "1")
{
elDate = getDocumentElement("dtTxtTradeDate" + nCount);
if (elDate.value.length == 0 || !IsValidDate(elDate.value,UserSettings.dateMask, vControl))
{
bErrorInd = true;
var sMsg = " Please Enter Valid Value For Trade Date";
sStatusMsg = sStatusMsg + "<li><a href='JavaScript:self.window.opener.document.frmMain." + elDate.id + ".focus()'> Trade Date " + nCount + "</a> " + sMsg + "<br>";
}
elHr = getDocumentElement("tmTxtTradeTimeHr" + nCount);
if (elHr.value.length > 0 && elHr.value < 0 && elHr.value >12 )
{
bErrorInd = true;
var sMsg = " Please Enter Valid Value For Hour";
sStatusMsg = sStatusMsg + "<li><a href='JavaScript:self.window.opener.document.frmMain." + elHr.id + ".focus()'> Hour " + nCount + "</a> " + sMsg + "<br>";
}
elMin = getDocumentElement("tmTxtTradeTimeMin" + nCount);
if (elMin.value.length > 0 && elMin.value < 0 && elHr.value >60 )
{
bErrorInd = true;
var sMsg = " Please Enter Valid Value For Minute";
sStatusMsg = sStatusMsg + "<li><a href='JavaScript:self.window.opener.document.frmMain." + elMin.id + ".focus()'> Minute " + nCount + "</a> " + sMsg + "<br>";
}
elHiddenType = getDocumentElement("hidType" + nCount);
if (elHiddenType.value == "DI") 
{
elDiv = getDocumentElement("fltDividend" + nCount);
if (elDiv.value.length == 0 || elDiv.value == 0 || !isSignedFloat( elDiv.value, true ))
{
bErrorInd = true;
var sMsg = " Please Enter Value For Dividend";
sStatusMsg = sStatusMsg + "<li><a href='JavaScript:self.window.opener.document.frmMain." + elDiv.id + ".focus()'> Dividend " + nCount + "</a> " + sMsg + "<br>";
}
else
elDiv.value = stripCharsInBag( elDiv.value, numericCharsToIgnore );
}
else if (elHiddenType.value == "IT") 
{
elInt = getDocumentElement("fltInterest" + nCount);
if (elInt.value.length == 0 || elInt.value == 0 || !isSignedFloat( elInt.value, true ))
{
bErrorInd = true;
var sMsg = " Please Enter Value For Interest";
sStatusMsg = sStatusMsg + "<li><a href='JavaScript:self.window.opener.document.frmMain." + elInt.id + ".focus()'> Interest " + nCount + "</a> " + sMsg + "<br>";
}
else
elInt.value = stripCharsInBag( elInt.value, numericCharsToIgnore );
}
else
{
elQty = getDocumentElement("iQuantity" + nCount);
elPrice = getDocumentElement("fltPrice" + nCount); 
if (elQty.value.length == 0 || elQty.value == 0 || !isSignedInteger( elQty.value, true ))
{
bErrorInd = true;
var sMsg = "Please Enter Value For Trade Quantity";
sStatusMsg = sStatusMsg + "<li><a href='JavaScript:self.window.opener.document.frmMain." + elQty.id + ".focus()'> Quantity " + nCount + "</a> " + sMsg + "<br>";
}
else
elQty.value = stripCharsInBag( elQty.value, numericCharsToIgnore );
if (elPrice.value.length == 0 || elPrice.value == 0 || !isSignedFloat( elPrice.value, true ) )
{
bErrorInd = true;
var sMsg = "Please Enter Value For Trade Price";
sStatusMsg = sStatusMsg + "<li><a href='JavaScript:self.window.opener.document.frmMain." + elPrice.id + ".focus()'> Price " + nCount + "</a> " + sMsg + "<br>";
}
else
elPrice.value = stripCharsInBag( elPrice.value, numericCharsToIgnore );
elDiv = getDocumentElement("fltDividend" + nCount);
if (elDiv != null)
{
if (!isSignedFloat( elDiv.value, true ))
{
bErrorInd = true;
var sMsg = " Please Enter Value For Dividend";
sStatusMsg = sStatusMsg + "<li><a href='JavaScript:self.window.opener.document.frmMain." + elDiv.id + ".focus()'> Dividend " + nCount + "</a> " + sMsg + "<br>";
}
else
elDiv.value = stripCharsInBag( elDiv.value, numericCharsToIgnore );
}
elInt = getDocumentElement("fltInterest" + nCount);
if (elInt != null)
{
if (!isSignedFloat( elInt.value, true ))
{
bErrorInd = true;
var sMsg = " Please Enter Value For Interest";
sStatusMsg = sStatusMsg + "<li><a href='JavaScript:self.window.opener.document.frmMain." + elInt.id + ".focus()'> Interest " + nCount + "</a> " + sMsg + "<br>";
}
else
elInt.value = stripCharsInBag( elInt.value, numericCharsToIgnore );
}
}
}
}	
if (bErrorInd)
{
showErrorMessage(sStatusMsg);
return false;
}	
else
return true;
}
function onPageUnloading()
{
if (bSkipUnloadPageMsg)
bSkipUnloadPageMsg = false;
else if ( (bTradeEntryDirty && CheckTradeEntryComplete()==true) || bTradeEditSectionDirty)
{
event.returnValue = "You have made changes to the Short Covering Trades page."
}
}
function onAddDirtyFlag()
{
bTradeEntryDirty = true;	
}
function openQuickAddTrade(vCurrPos)
{
var sUrl = "short_covering_trades_add_popup.asp?CurrentPosition="+vCurrPos+"";
var sStyle = "width=850,height=500,scrollbars=1,resizable=1";
openGeneralPopup( sUrl, '', sStyle );	
}
