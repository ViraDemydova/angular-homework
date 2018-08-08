<!-- 
var bPageDirty=false;
var bSkipUnloadPageMsg = false;
var bTradeEntryDirty=false;	
function CheckConditionallyRequiredFields( frm, arrFieldsInError )
{
var arrMoreErrors = new Array();
return (arrMoreErrors);
} 
function submitPage( frm , action)
{
var bValidData = true;
switch (action)
{
case "AddEqFromPopUp" :
if (bTradeEntryDirty && CheckTradeEntryComplete()==true)
{
var ret = confirm("Add Trade To Save Trade List?");
if (ret)
{
InsertNewRow("tblDisplay");
}
}
bSkipUnloadPageMsg = true;
getDocumentElement("hidSaveTradeXML").value = GetLayoutInfoDOM();
frm.hidAction.value = "AddEqFromPopUp";
frm.action = "/asp/util_submit_action.asp";
frm.submit(); 
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
function onPageLoad()
{
UpdateCurrentPosition();	
onEntryTypeClicked();
}
function onEntryTypeClicked()
{
if( frmMain.all("radEntryType").item(1).checked || 
frmMain.all("radEntryType").item(2).checked)
{
showHideOneArea("divTradeLayer", "0"); 
showHideOneArea("divDividenInterestLayer", "1");
}
else
{
showHideOneArea("divDividenInterestLayer", "0"); 
showHideOneArea("divTradeLayer", "1");
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
{
getDocumentElement("hidExchangeID").value = arrPrdNamesAdd[i][1];
getDocumentElement("hidPrdRatio").value = arrPrdNamesAdd[i][2];
}
break;
}
}
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
if (elPrice.value.length == 0 || elPrice.value == 0 || !isSignedFloat( elPrice.value, true ))
{
bErrorInd = true;
var sMsg = "Please Enter Valid Value For Trade Price";
sStatusMsg = sStatusMsg + "<li><a href='JavaScript:self.window.opener.document.frmMain.fltPrice.focus()'> Trade Price </a> " + sMsg + "<br>";
}
if (elDivInt.value.length > 0 && !isSignedFloat( elDivInt.value, true ))
{
bErrorInd = true;
var sMsg = "Please Enter Valid Value For Dividend/Interest Amount";
sStatusMsg = sStatusMsg + "<li><a href='JavaScript:self.window.opener.document.frmMain.fltPrice.focus()'> Dividend/Interest </a> " + sMsg + "<br>";
}
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
if( !bSkipUnloadPageMsg && (( bTradeEntryDirty && CheckTradeEntryComplete()==true) || bPageDirty))
{
event.returnValue = "You have made changes to the Short Covering Trades page."
}
}
function onAddDirtyFlag()
{
bTradeEntryDirty = true;	
}
function InsertNewRow(vTblName)
{
if (!ValidationAddToTradeList())
return;
var vElement;
var vEntryType; 
var elDateValue, elTimeValue, elActionValue, elProductValue, elQtyValue, elPriceValue,
elIntAmtValue, elDivAmtValue, elTradeTypeValue, elCommentValue; 
var elActionDBValue, elProductDBValue, elTradeTypeDBValue;
var vExchangeId;
var vDisableControl = 1;
vExchangeId = getDocumentElement("hidExchangeID").value;
if( frmMain.all("radEntryType").item(0).checked) 
{	
vEntryType = 1;
elDateValue = getDocumentElement("dtTxtTradeDate").value;
if (getDocumentElement("tmTxtTradeTimeHr").value.length && getDocumentElement("tmTxtTradeTimeMin").value.length )
elTimeValue = getDocumentElement("tmTxtTradeTimeHr").value + ":" + getDocumentElement("tmTxtTradeTimeMin").value
+ " " + getDocumentElement("DropDownAmPm").value;
else
elTimeValue = "";
vElement = getDocumentElement("DropDownTradeAction");
elActionValue = vElement.options(vElement.selectedIndex).text;
elActionDBValue = vElement.value;
vElement = getDocumentElement("DropDownProduct");
elProductValue = vElement.options(vElement.selectedIndex).text;
elProductDBValue = vElement.value;
elQtyValue = getDocumentElement("iQuantity").value;
elPriceValue = getDocumentElement("fltPrice").value;
if (frmMain.all("radTradeDivInt").item(1).checked)
{
elIntAmtValue = getDocumentElement("fltAmountTDivInt").value; 
elDivAmtValue = "";
}
else
{ 
elIntAmtValue = "";
elDivAmtValue = getDocumentElement("fltAmountTDivInt").value; 
}
vElement = getDocumentElement("DropDownTradeType");
elTradeTypeValue = vElement.options(vElement.selectedIndex).text;
elTradeTypeDBValue = vElement.value;
elCommentValue = getDocumentElement("tmTxtComments").value;
}
else
{
elActionValue = "";
elProductValue = "";
elQtyValue = "";
elPriceValue = "";
elTradeTypeValue ="";
elProductDBValue = getDocumentElement("hidDefaultPrdID").value;
elDateValue = getDocumentElement("dtTxtTradeDateDI").value;
if (getDocumentElement("tmTxtTradeTimeHrDI").value.length && getDocumentElement("tmTxtTradeTimeMinDI").value.length )
elTimeValue = getDocumentElement("tmTxtTradeTimeHrDI").value + ":" + getDocumentElement("tmTxtTradeTimeMinDI").value
+ " " + getDocumentElement("DropDownAmPmDI").value;
else
elTimeValue = "";
if( frmMain.all("radEntryType").item(1).checked)
{
elIntAmtValue = "";
elDivAmtValue = getDocumentElement("fltAmountDI").value; 
vEntryType = 2;
} 
else
{
elDivAmtValue = "";
elIntAmtValue = getDocumentElement("fltAmountDI").value; 
vEntryType = 3;
}	
elCommentValue = getDocumentElement("tmTxtCommentsDI").value;
}
var oTbl = GetLayoutObject(vTblName);
var frm = document.frmMain;
var nCol = oTbl.rows(1).cells.length;
var oRow = oTbl.insertRow(2);
oRow.className= "resultsRowA";
for (var j=0; j < nCol; j++)
{
var oCell = oRow.insertCell(j);
var oNew;
switch (j)
{
case 0: 
vSize = 14;
vValue = elDateValue;
vDBValue = elDateValue;
AddNewColName(oCell, vSize, vValue, vDBValue, vEntryType, vExchangeId, vDisableControl);
break;
case 1: 
vSize = 14;
vValue = elTimeValue;
vDBValue = elTimeValue;
AddNewColName(oCell, vSize, vValue, vDBValue, vEntryType, vExchangeId, vDisableControl);
break;
case 2: 
vSize = 14;
vValue = elActionValue;
vDBValue = elActionDBValue;
AddNewColName(oCell, vSize, vValue, vDBValue, vEntryType, vExchangeId, vDisableControl);
break;
case 3: 
vSize = 14;
vValue = elQtyValue;
vDBValue = elQtyValue;
AddNewColName(oCell, vSize, vValue, vDBValue, vEntryType, vExchangeId, vDisableControl);
break;
case 4: 
vSize = 14;
vValue = elProductValue;
vDBValue = elProductDBValue;
AddNewColName(oCell, vSize, vValue, vDBValue, vEntryType, vExchangeId, vDisableControl);
break;
case 5: 
vSize = 9;
vValue = elPriceValue;
vDBValue = elPriceValue;
AddNewColName(oCell, vSize, vValue, vDBValue, vEntryType, vExchangeId, vDisableControl);
break;
case 6: 
vSize = 11;
vValue = elDivAmtValue;
vDBValue = elDivAmtValue;
AddNewColName(oCell, vSize, vValue, vDBValue, vEntryType, vExchangeId, vDisableControl);
break;
case 7: 
vSize = 9;
vValue = elIntAmtValue;
vDBValue = elIntAmtValue;
AddNewColName(oCell, vSize, vValue, vDBValue, vEntryType, vExchangeId, vDisableControl);
break;
case 8: 
vSize = 14;
vValue = elTradeTypeValue;
vDBValue = elTradeTypeDBValue;
AddNewColName(oCell, vSize, vValue, vDBValue, vEntryType, vExchangeId, vDisableControl);
break;
case 9: 
vSize = 11;
vValue = elCommentValue;
vDBValue = elCommentValue;
AddNewColName(oCell, vSize, vValue, vDBValue, vEntryType, vExchangeId, vDisableControl);
break;
default:
break;
}
}
bPageDirty = true;
if (vEntryType == 1)
{
var vNewTradeQty;
var vCurrentPosition = new Number(getDocumentElement("hidCurrentPosition").value); 
vNewTradeQty = stripCharsInBag( elQtyValue, numericCharsToIgnore );
vNewTradeQty = vNewTradeQty * getDocumentElement("hidPrdRatio").value;
if (elActionDBValue == 'B')
vCurrentPosition += vNewTradeQty;
else
vCurrentPosition -= vNewTradeQty;
getDocumentElement("hidCurrentPosition").value = vCurrentPosition; 
UpdateCurrentPosition(); 
}
bTradeEntryDirty = false;
}
function GetLayoutObject(vTbl)
{
return document.getElementById(vTbl);
}
function AddNewColName(oCell, vSize, vValue, vDBValue, vEntryType, vExchangeId, vDisableControl)
{
oNew = document.createElement("input"); 
oNew.setAttribute("type","text");
oNew.setAttribute("size",vSize);
oNew.setAttribute("name","txtColumn");
oNew.setAttribute("value",vValue); 
if (vDisableControl)
oNew.setAttribute("disabled", "true");
oNew.setAttribute("DBValue", vDBValue);
oNew.setAttribute("EntryType", vEntryType);
oNew.setAttribute("ExchangeID", vExchangeId);
oCell.appendChild(oNew);
}
function GetLayoutInfoDOM()
{
var oTbl = document.getElementById("tblDisplay");
var nRows= oTbl.rows.length - 1;
var nCols= oTbl.rows(1).cells.length;
var obj, obj2;
var vEntryType, vDate, vTime, vAction, vQty, vPrdId, vExchangeID, vPrice, vDividen, vInterest, vTradeType, vComments;
var bDefaultTimeInd;
var vTradeCD;
var sLayout = "<secondarytrades>"
for (var i=nRows; i > 1; i--) 
{
vDate = "";
vTime = "";
vQty = "";
vPrdId = "";
vPrice = "0";
vDividen = "";
vInterest = "";
vTradeType = "";
vComments = "";
bDefaultTimeInd = 0;
for (var j=0; j < nCols; j++) 
{
obj = oTbl.rows(i).cells(j).firstChild;
if (typeof(obj) == "undefined")
break;
switch (j)
{
case 0:
vEntryType = obj.EntryType;
vExchangeID = obj.ExchangeID;
vDate = obj.DBValue;
break;
case 1:
vTime = obj.DBValue;
break;
case 2:
if (vEntryType == 1) 
vAction = obj.DBValue;
else
vAction = "N";
break;
case 3:
if (vEntryType == 1)
vQty = stripCharsInBag( obj.DBValue, numericCharsToIgnore );
break;
case 4:
vPrdId = obj.DBValue;
break;
case 5:
if (vEntryType == 1)
vPrice = stripCharsInBag( obj.DBValue, numericCharsToIgnore );
break;
case 6:
vDividen = stripCharsInBag( obj.DBValue, numericCharsToIgnore );
break;
case 7:
vInterest = stripCharsInBag( obj.DBValue, numericCharsToIgnore );
break;
case 8:
if (vEntryType == 1)
vTradeType = obj.DBValue;
else if (vEntryType == 2)
vTradeType = "DI";
else
vTradeType = "IT";
break;	
case 9:
vComments = obj.DBValue; 
break;
default:
break;
}
}
sLayout += "<secondarytrade>"
if (vTime.length)
sLayout += "<trade_dt>" + vDate + " " + vTime + "</trade_dt>";
else
{
sLayout += "<trade_dt>" + vDate + "</trade_dt>";
bDefaultTimeInd = 1; 
}	
sLayout += "<def_trade_time_ind>" + bDefaultTimeInd + "</def_trade_time_ind>";
sLayout += "<prd_id>" + vPrdId + "</prd_id>";
sLayout += "<exchange_id>" + vExchangeID + "</exchange_id>"
if (vEntryType == 1)
{
sLayout +="<trade_qty>" + vQty + "</trade_qty>";
}
sLayout +="<price>" + vPrice + "</price>";
sLayout +="<buy_sell_flg>" + vAction + "</buy_sell_flg>";
sLayout +="<trade_type_cd>" + vTradeType + "</trade_type_cd>";
sLayout +="<comments_txt>" + vComments + "</comments_txt>";
if (vDividen.length)
sLayout +="<dividend_amt>" + vDividen + "</dividend_amt>";
if (vInterest.length)
sLayout +="<interest_amt>" + vInterest + "</interest_amt>";
sLayout += "</secondarytrade>"
}
sLayout += "</secondarytrades>";
return sLayout;
}
function UpdateCurrentPosition()
{
var vCurrentPosition;
var vDisplay;
vCurrentPosition = getDocumentElement("hidCurrentPosition").value;
if (vCurrentPosition < 0)
{
vDisplay = "(" + formatAmountString(new String(-vCurrentPosition)) + ")";
}
else 
vDisplay = formatAmountString(vCurrentPosition);
getDocumentElement("txtCurrentPosition").value = vDisplay;
}
function QtyAmtChange(elQty)
{
formatAmount(elQty);
}
function onKeyPress(event,element, ButtonName) 
{
var strNextField;
if (document.all) 
{
if (window.event && window.event.keyCode == 13)
{
if (ButtonName == "AddTrade")
InsertNewRow("tblDisplay");
else if (ButtonName == "Clear")
clearOrderEntry();
}
}
else 
return true;
}
