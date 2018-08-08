RSEnableRemoteScripting("/_ScriptLibrary")
var HardPotInd = "True";
var	IOIActionArray = new Array();
IOIActionArray[0] = "Add";
IOIActionArray[1] = "Update";
IOIActionArray[2] = "Cancel";
var bDealPricingBeforeRule2790 = false;
function onPageLoad()
{
RSCallObject_wait(); 
InitialDate("dtTxtRegisterDate");
var thePndgOrdId = document.frmMain.elements["hidPndgOrderId"].value;
if ( thePndgOrdId && thePndgOrdId>0 )
{
GetOrderByPendingOrderId(thePndgOrdId);
}
else
{
OnTrancheSelect(true);
if (document.forms["frmMain"].elements["ckPopBook"])
document.forms["frmMain"].elements["ckPopBook"].checked = true;
setFocus(document.frmMain.elements["iTxtAmount1"]);
}
if (document.frmMain.elements["hidML2790Rule"].value == 1 && (document.frmMain.elements["hidPricingDate"].value != '' && document.frmMain.elements["hidPricingDate"].value <= '20040322'))
{
bDealPricingBeforeRule2790 = true;
if (document.forms["frmMain"].elements["hidShowFRQInd"].value == 'True')
{
if (getDocumentElement('TitleLayer'))
getDocumentElement('TitleLayer').style.display = 'none';
if (getDocumentElement('OldTitleLayer'))
getDocumentElement('OldTitleLayer').style.display = '';
}	
}
}
function skip () { this.blur(); }
function enableDisableElement(oElement,bDisabled)
{
if (oElement)
{
if (document.all)	
{
oElement.disabled = bDisabled;
}
else if (document.layers) 
{
if(bDisabled)
{
oElement.onfocus=skip;
}
else
{
oElement.onfocus=""; 
}	
}	
}
}
function rewriteLayer (idOrPath, html) {
if (document.layers) {
var l = idOrPath.indexOf('.') != -1 ? eval(idOrPath) 
: document[idOrPath];
if (!l)
{
var theForm = document.forms["frmMain"];
var l = theForm.elements[idOrPath];
}
if (!l)
return;
if(l.type=="text")
{
l.value=html; 
return;
}
if (!l.ol) {
var ol = l.ol = new Layer (l.clip.width, l);
ol.clip.width = l.clip.width;
ol.left = l.left;
ol.top = l.top;
ol.clip.height = l.clip.height;
ol.bgColor = l.bgColor;
l.visibility = 'hide';
ol.visibility = 'show';
}
var ol = l.ol;
html="<div class='txtBold'>" + html + "</div>"
ol.document.open();
ol.document.write("");
ol.document.close();
}
else if (document.all || document.getElementById) {
var p = idOrPath.indexOf('.');
var id = p != -1 ? 
idOrPath.substring(idOrPath.lastIndexOf('.') + 1) 
: idOrPath;
if (document.all)
{
if (document.all[id])
{
document.all[id].innerHTML = html;
}
}
else {
var l = document.getElementById(id);
var r = document.createRange();
r.setStartAfter(l);
var docFrag = r.createContextualFragment(html);
while (l.hasChildNodes())
l.removeChild(l.firstChild);
l.appendChild(docFrag);
}
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
function showElement(oElement)
{
if (oElement)
{
if (document.getElementById)
{
oElement.style.visibility="visible";
}
else if (document.all)
{
oElement.style.visibility="visible";
}
else if (document.layers)
{
oElement.visibility="show";
}
return 1;
}
}
function hideElement(oElement)
{
if (oElement)
{
if (document.getElementById)
{
oElement.style.visibility="hidden";
}
else if (document.all)
{
oElement.style.visibility="hidden";
}
else if (document.layers)
{
oElement.visibility="hide";
}
return 1;
}
}
function CheckConditionallyRequiredFields( frm, arrFieldsInError )
{
var arrMoreErrors = new Array();
return (arrMoreErrors);
} 
function CustomValidation( frm, arrFieldsInError )
{
return CustomValidationEQ( frm, arrFieldsInError );
}
function CustomValidationEQ( frm, arrFieldsInError )
{
var arrMoreErrors = new Array();
var theElement;
var theSelected;
var theAction = frm.elements["hidAction"].value;
var sBrokerID = frm.elements["hidSMBDId"].value;
var sCustBrokers = frm.elements["hidSubsidiaryBrokers"].value;
ValidateFRQ( arrMoreErrors );
theElement = frm.elements["hidNumProduct"];
var numProduct = parseInt(theElement.value,10);
theElement = frm.elements["hidIssueTypeCode"]
var issueTypeCode = theElement.value;
if ((issueTypeCode == "C") || (issueTypeCode == "EU"))
{
for (var i=0; i<numProduct; i++)
{
var arrAmount = new Array;
var arrLimit = new Array;
var iArray = 0;
for (var j = (i * 5) + 1; j <= ((i + 1) * 5); j++)
{
theElement = frm.elements["iTxtAmount" + j];
if (theElement.value.length > 0)
{
arrAmount[iArray] = stripCharsInBag( theElement.value, numericCharsToIgnore );
theElement = frm.elements["fltTxtPrice" + j];
if (theElement.value.length > 0)
arrLimit[iArray] = stripCharsInBag( theElement.value, numericCharsToIgnore );
else
arrLimit[iArray] = 0;
}
iArray += 1;
}
if (arrAmount.length > 0)
{
ValidateEquityEntry(i, arrAmount, arrLimit, arrMoreErrors);
} 
} 
}
else if (issueTypeCode == "CP" || issueTypeCode=="CB")	
{
for (var i=0; i<numProduct; i++)
{
var arrAmount = new Array;
var arrCoupon = new Array;
var arrPremium = new Array;
var iArray = 0;
for (var j = (i * 5) + 1; j <= ((i + 1) * 5); j++)
{
theElement = frm.elements["iTxtAmount" + j];
if (theElement.value.length > 0)
{
arrAmount[iArray] = stripCharsInBag( theElement.value, numericCharsToIgnore );
theElement = frm.elements["fltTxtCoupon" + j];
if (theElement.value.length > 0)
arrCoupon[iArray] = stripCharsInBag( theElement.value, numericCharsToIgnore );
else
arrCoupon[iArray] = 0;
theElement = frm.elements["fltTxtPremium" + j];
if (theElement.value.length > 0)
arrPremium[iArray] = stripCharsInBag( theElement.value, numericCharsToIgnore );
else
arrPremium[iArray] = 0;
}
iArray += 1;
}
if (arrAmount.length > 0)
{
ValidateEquityEntryConvertible(i, arrAmount, arrCoupon, arrPremium, arrMoreErrors);
} 
} 
}
return (arrMoreErrors);
} 
function ValidateEquityEntry(iPrd, arr_Amount, arr_Limit, arr_MoreErrors)
{
var lAmount;
var lLastAmount;
var dbLimit;
var dbLastLimit;
var bLimitDiscountChk = false;
var LimitDiscountInd;
var iNumOfEntry = arr_Amount.length;
var theForm = document.forms["frmMain"];
theElement = theForm.elements["selAmountType" + iPrd];
if (theElement.selectedIndex <=0)
{
var arrError = FieldErrorInfo("selAmountType"+iPrd, new String, "", "selAmountType"+iPrd, "Amount Type");
arrError[2] = "Please select an amount type.";
arr_MoreErrors[arr_MoreErrors.length] = arrError;
}
var theElementLD = theForm.elements["selLimitDiscount"+iPrd];
var selIndexLD = theElementLD.selectedIndex;
var strvalue = theElementLD[selIndexLD].value;
LimitDiscountInd = strvalue.charAt(0);
for (var i=0; i<iNumOfEntry; i++)
{
lAmount = parseInt(arr_Amount[i],10);
dbLimit = parseFloat(arr_Limit[i]);
if ( lAmount>9223372036854775807 )
{
var iErrEntry = iPrd*5+(i+1);
var arrError = FieldErrorInfo("iTxtAmount"+iErrEntry, new String, "", "iTxtAmount"+iErrEntry, "Amount Entry");
arrError[2] = "The amount may not exceed 9,223,372,036,854,775,807.";
arr_MoreErrors[arr_MoreErrors.length] = arrError;
}
if ((dbLimit > 0) && (selIndexLD <0) && (bLimitDiscountChk == false))
{
bLimitDiscountChk = true;
var arrError = FieldErrorInfo("selLimitDiscount"+iPrd, new String, "", "selLimitDiscount"+iPrd, "Limit/Discount");
arrError[2] = "Please select an Limit/Discount.";
arr_MoreErrors[arr_MoreErrors.length] = arrError;
}
if (dbLimit == 0)
{
if (LimitDiscountInd != "D")
dbLimit = 9999999999;	
}
if (i == 0)
{
lLastAmount = lAmount;
dbLastLimit = dbLimit;
}
else
{
if (i==1)
bAscAmount = lAmount > lLastAmount; 
if (LimitDiscountInd == "L")
{
if (bAscAmount)
{
if (lAmount <= lLastAmount)
{
var iErrEntry = iPrd*5+(i+1);
var arrError = FieldErrorInfo("iTxtAmount"+iErrEntry, new String, "", "iTxtAmount"+iErrEntry, "Amount");
arrError[2] = "If the first two Amounts are in ascending order, all Amounts must be in ascending order";
arr_MoreErrors[arr_MoreErrors.length] = arrError; 
}
if (dbLimit >= dbLastLimit)
{
var iErrEntry = iPrd*5+(i+1);
var arrError = FieldErrorInfo("fltTxtPrice"+iErrEntry, new String, "", "fltTxtPrice"+iErrEntry, "Limit Price");
arrError[2] = "If Amount is in ascending order, Limit price must be in descending order";
arr_MoreErrors[arr_MoreErrors.length] = arrError;
}
}
else
{
if (lAmount >= lLastAmount)
{
var iErrEntry = iPrd*5+(i+1);
var arrError = FieldErrorInfo("iTxtAmount"+iErrEntry, new String, "", "iTxtAmount"+iErrEntry, "Amount");
arrError[2] = "If the first two Amounts are in descending order, all Amounts must be in descending order";
arr_MoreErrors[arr_MoreErrors.length] = arrError; 
}
if (dbLimit <= dbLastLimit)
{
var iErrEntry = iPrd*5+(i+1);
var arrError = FieldErrorInfo("fltTxtPrice"+iErrEntry, new String, "", "fltTxtPrice"+iErrEntry, "Limit Price");
arrError[2] = "If Amount is in descending order, Limit price must be in ascending order";
arr_MoreErrors[arr_MoreErrors.length] = arrError;
} 
}
}
else
{
if (bAscAmount)
{
if (lAmount <= lLastAmount)
{
var iErrEntry = iPrd*5+(i+1);
var arrError = FieldErrorInfo("iTxtAmount"+iErrEntry, new String, "", "iTxtAmount"+iErrEntry, "Amount");
arrError[2] = "If the first two Amounts are in ascending order, all Amounts must be in ascending order";
arr_MoreErrors[arr_MoreErrors.length] = arrError; 
}
if (dbLimit <= dbLastLimit)
{
var iErrEntry = iPrd*5+(i+1);
var arrError = FieldErrorInfo("fltTxtPrice"+iErrEntry, new String, "", "fltTxtPrice"+iErrEntry, "Discount");
arrError[2] = "If Amount is in ascending order, Discount must be in ascending order";
arr_MoreErrors[arr_MoreErrors.length] = arrError;
}
}
else
{
if (lAmount >= lLastAmount)
{
var iErrEntry = iPrd*5+(i+1);
var arrError = FieldErrorInfo("iTxtAmount"+iErrEntry, new String, "", "iTxtAmount"+iErrEntry, "Amount");
arrError[2] = "If the first two Amounts are in descending order, all Amounts must be in descending order";
arr_MoreErrors[arr_MoreErrors.length] = arrError; 
}
if (dbLimit >= dbLastLimit)
{
var iErrEntry = iPrd*5+(i+1);
var arrError = FieldErrorInfo("fltTxtPrice"+iErrEntry, new String, "", "fltTxtPrice"+iErrEntry, "Discount");
arrError[2] = "If Amount is in descending order, Discount must be in descending order";
arr_MoreErrors[arr_MoreErrors.length] = arrError;
} 
}
} 
lLastAmount = lAmount;
dbLastLimit = dbLimit;
}
}
}
function ValidateEquityEntryConvertible(iPrd, arr_Amount, arr_Coupon, arr_Premium, arr_MoreErrors)
{
var lAmount;
var lLastAmount;
var dbCoupon;
var dbLastCoupon;
var dbPremium;
var dbLastPremium;
var bAscAmount;
var iNumOfEntry = arr_Amount.length;
var theForm = document.forms["frmMain"];
var bAscCoupon;
var bAscPremium;
theElement = theForm.elements["selAmountType" + iPrd];
if (theElement.selectedIndex <=0)
{
var arrError = FieldErrorInfo("selAmountType"+iPrd, new String, "", "selAmountType"+iPrd, "Amount Type");
arrError[2] = "Please select an amount type.";
arr_MoreErrors[arr_MoreErrors.length] = arrError;
}
for (var i=0; i<iNumOfEntry; i++)
{
lAmount = parseInt(arr_Amount[i],10);
dbCoupon = parseFloat(arr_Coupon[i]);
dbPremium = parseFloat(arr_Premium[i]);
if (dbPremium == 0.0)
dbPremium = 9999999999; 
if ( lAmount>9223372036854775807 )
{
var iErrEntry = iPrd*5+(i+1);
var arrError = FieldErrorInfo("iTxtAmount"+iErrEntry, new String, "", "iTxtAmount"+iErrEntry, "Amount Entry");
arrError[2] = "The amount may not exceed 9,223,372,036,854,775,807.";
arr_MoreErrors[arr_MoreErrors.length] = arrError;
}
if (i == 0)
{
lLastAmount = lAmount;
dbLastCoupon = dbCoupon;
dbLastPremium = dbPremium; 
}
else
{
if (i == 1)
{
bAscAmount = lAmount > lLastAmount;
bAscCoupon = dbCoupon > dbLastCoupon;
bAscPremium = dbPremium > dbLastPremium;
}
if (dbCoupon == dbLastCoupon && dbPremium == dbLastPremium)
{
var iErrEntry = iPrd*5+(i+1);
var arrError = FieldErrorInfo("fltTxtCoupon"+iErrEntry, new String, "", "fltTxtCoupon"+iErrEntry, "Coupon");
arrError[2] = "Only one of Coupon or Premium can have the same value as its predecessor";
arr_MoreErrors[arr_MoreErrors.length] = arrError;
}
if (bAscAmount)
{
if (lAmount <= lLastAmount)
{
var iErrEntry = iPrd*5+(i+1);
var arrError = FieldErrorInfo("iTxtAmount"+iErrEntry, new String, "", "iTxtAmount"+iErrEntry, "Amount");
arrError[2] = "If the first two Amounts are in ascending order, all Amounts must be in ascending order";
arr_MoreErrors[arr_MoreErrors.length] = arrError;
}
}
else
{
if (lAmount >= lLastAmount)
{
var iErrEntry = iPrd*5+(i+1);
var arrError = FieldErrorInfo("iTxtAmount"+iErrEntry, new String, "", "iTxtAmount"+iErrEntry, "Amount");
arrError[2] = "If the first two Amounts are in descending order, all Amounts must be in descending order";
arr_MoreErrors[arr_MoreErrors.length] = arrError;
}
}
if (bAscCoupon)
{
if (!(isNaN(dbCoupon) || isNaN(dbLastCoupon)) && (dbCoupon < dbLastCoupon))
{
var iErrEntry = iPrd*5+(i+1);
var arrError = FieldErrorInfo("fltTxtCoupon"+iErrEntry, new String, "", "fltTxtCoupon"+iErrEntry, "Coupon");
arrError[2] = "If the first two Coupons are in ascending order, all Coupons must be in ascending order";
arr_MoreErrors[arr_MoreErrors.length] = arrError;
}
}
else
{
if (dbCoupon > dbLastCoupon)
{
var iErrEntry = iPrd*5+(i+1);
var arrError = FieldErrorInfo("fltTxtCoupon"+iErrEntry, new String, "", "fltTxtCoupon"+iErrEntry, "Coupon");
arrError[2] = "If the first two Coupons are in decending order, all Coupons must be in decending order";
arr_MoreErrors[arr_MoreErrors.length] = arrError;
}
}
if (bAscPremium)
{
if (!(isNaN(dbCoupon) || isNaN(dbLastCoupon)) && (dbPremium < dbLastPremium))
{
var iErrEntry = iPrd*5+(i+1);
var arrError = FieldErrorInfo("fltTxtPremium"+iErrEntry, new String, "", "fltTxtPremium"+iErrEntry, "Premium");
arrError[2] = "If the first two Premiums are in ascending order, all Premiums must be in ascending order";
arr_MoreErrors[arr_MoreErrors.length] = arrError;
}
}
else
{
if (dbPremium > dbLastPremium)
{
var iErrEntry = iPrd*5+(i+1);
var arrError = FieldErrorInfo("fltTxtPremium"+iErrEntry, new String, "", "fltTxtPremium"+iErrEntry, "Premium");
arrError[2] = "If the first two Premiums are in decending order, all Premiums must be in decending order";
arr_MoreErrors[arr_MoreErrors.length] = arrError;
}
}
lLastAmount = lAmount;
dbLastCoupon = dbCoupon;
dbLastPremium = dbPremium;
}
}
}
function submitPage( frm , action )
{
switch (action)
{
case "savechanges" :
frm.action = "/asp/util_submit_action.asp";
frm.submit(); 
break;
case "savechangeswithvalidation" :
if (ValidateForm( frm ))
{
frm.action = "/asp/util_submit_action.asp";
frm.submit(); 
}
break;
case "reverttosaved" :
window.location.reload();
break;
case "cancel" :
frm.action = "/asp/specialIssueMaint_DealDetails.asp";
frm.submit();
break;
case "resetfields" :
frm.reset();
break;
}
}
function PreSubmitPage( frm , action, FromConfirmPopUp )
{
if (action == '')
return;
if (FromConfirmPopUp !="FROMCOMFIRMATIONPOPUP" && frm.hidShowConfirmationPopup.value == 1)
{
OpenConfirmationPopup("", action);
return;
}	
frm.elements["hidAction"].value = action;
if ((action == "Add") || (action == "Update")) 
{
ClearMarketOrderString(frm);
if (ValidateForm(frm))
{
frm.action = "/asp/util_submit_action.asp";
frm.submit(); 
}
else
{
RestoreMarketOrderString(frm);
}
} 
else
{
ClearMarketOrderString(frm);
if (ValidateForm(frm))
{
frm.action = "/asp/util_submit_action.asp";
frm.submit(); 
}
else
{
RestoreMarketOrderString(frm);
}
}
submitPage(frm, action, "");
}
function checkPirce(frm)
{
var nNumProduct = new Number(frm.hidNumProduct.value);	
for (i = 0; i < nNumProduct; i++)
{ 
sAmountType = frm.elements["selAmountType" + String(i)].value;
sIOIAmtType = sAmountType.substring(0,1); 
if(sIOIAmtType == "C")
{
if(frm.hidPrice != null)
{
var price = parseFloat(frm.hidPrice.value);
if( isNaN(price) || price == 0 )
{
alert("Please set file price or offer price");
return false;
}
}
else
{
alert("Please set file price or offer price");
return false;
}
}
}	
return true;
}
function OnOrderTypeSelect(objElement)
{
var selValue = objElement[objElement.selectedIndex].value;
if (selValue != -1)
document.forms["frmMain"].elements["hidOrderType"].value = selValue; 
}
function GetOrderByPendingOrderId(OrderId)
{
var co;
if (OrderId > 0)
{
var IssId = document.forms["frmMain"].elements["hidIssueId"].value;
var LocaleId = document.forms["frmMain"].elements["hidLocaleID"].value;
var TimeZoneOffset = document.forms["frmMain"].elements["hidTimeZoneOffset"].value;
co = RSExecute('rs_bookbuild_indication_server.asp', 'js_GetEquityOrderByOrderId', OrderId, LocaleId, TimeZoneOffset);
callback_populateOrder(co); 
} 
}
function GetOrder()
{
var theForm = document.forms["frmMain"];
var SMBRKId = theForm.elements["hidSMBDId"].value;
var InvestorId = theForm.elements["hidInvestorID"].value;
var co;
if ( (SMBRKId.length > 0) && (InvestorId.length > 0) )
{
co = RSExecute('rs_bookbuild_indication_server.asp', 'js_GetEquityOrder', SMBRKId, InvestorId, 0, 0);
callback_populateOrder(co); 
} 
}
function OnBrokerSelect()
{
var theForm = document.forms["frmMain"];
var theRole = theForm.elements["hidIOIUserRole"].value;
if (theRole == "SyndicateParticipant") 
return;
var cbElement = theForm.elements["selBrokerDealer"];
var theSelected = cbElement.selectedIndex;
var SMBRKId;
var InvestorId;
if ( (theSelected >= 0) && (cbElement.options[theSelected].value != 0) )
{
SMBRKId = cbElement[theSelected].value;
theForm.elements["hidSMBDId"].value = SMBRKId;
InvestorId = theForm.elements["hidInvestorID"].value;
if (HardPotInd == "False")
GetOrder();
}
else
{
theForm.elements["hidSMBDId"].value = "";
} 
}
function callback_populateOrder(co)
{
var theForm = document.forms["frmMain"];
var strValues = co.return_value
var aryRecords;
var aryData;
var investorId = theForm.elements["hidInvestorID"].value;
if (strValues != "")
{
ResetIOIEntry();
aryRecords = strValues.split("\t");
LoadOrderInfo(aryRecords[0]);
LoadEntry(strValues);
SetActionButtonByOrderStatus();
}
else
{
var PendingOrderId = theForm.elements["hidPndgOrderId"].value;
var OrdTrackId = theForm.elements["hidOrderTrackId"].value;
if (PendingOrderId || OrdTrackId)
{
if ( (PendingOrderId.length>0 && PendingOrderId!="0") || (OrdTrackId.length>0 && OrdTrackId!="0") )
{
ResetIOIEntry();
theForm.elements["hidPndgOrderId"].value = 0;
theForm.elements["hidOrderTrackId"].value = 0;
theForm.elements["hidPndgOrdRegionId"].value = 0;
theForm.elements["hidPndgOrdSalesId"].value = 0;
theForm.elements["hidCancelOrder"].value = 0;
}
}
if (theForm.elements["txtSalesComments"])
theForm.elements["txtSalesComments"].value = "";
} 
}
function SetActionButtonByOrderStatus()
{
var theForm = document.forms["frmMain"];
var thePndgOrdId = theForm.elements["hidPndgOrderId"].value;
if ( thePndgOrdId=="" || thePndgOrdId=="0" )
{
SetActionButton("New");
}
else
{ 
if (theForm.elements["hidCancelOrder"].value == "1")
{
if (theForm.elements["hidConfirmOrderId"].value == "0")
SetActionButton("Cancelled");
else
SetActionButton("Confirm Cancelled");
} 
else 
{
if (theForm.elements["hidConfirmOrderId"].value == "0")
SetActionButton("Existed");
else
SetActionButton("Confirm Existed");
}
} 
}
function SetActionButton(OrderType)
{
switch (OrderType)
{
case "New":
IOIActionArray[0] = "Add";
IOIActionArray[1] = "";
IOIActionArray[2] = "";
break;
case "Existed":
IOIActionArray[0] = "Update";
IOIActionArray[1] = "Cancel";
IOIActionArray[2] = "Delete";
break;
case "Confirm Existed":
IOIActionArray[0] = "Update";
IOIActionArray[1] = "Cancel";
IOIActionArray[2] = "";
break;
case "Cancelled":
IOIActionArray[0] = "Reinstate";
IOIActionArray[1] = "Delete";
IOIActionArray[2] = "";
break;
case "Confirm Cancelled":
IOIActionArray[0] = "Reinstate";
IOIActionArray[1] = "";
IOIActionArray[2] = "";
break;
case "Closed":
IOIActionArray[0] = "";
IOIActionArray[1] = "";
IOIActionArray[2] = "";
break;
}
}
function LoadEntry(strOrderInfo)
{
var theForm = document.forms["frmMain"];
var IssueTypeCode = theForm.elements["hidIssueTypeCode"].value;
var aryRecords = strOrderInfo.split("\t");
var aryData;
var frmPrdId;
var iEntry;
var OrdPrdId;
var OrdAmtType;
var entryElement;
var amount;
var price;
var strSwitchInfo;
var iCancelled = 0;
var bCancelled = false;
var numProduct = theForm.elements["hidNumProduct"].value;
for (var iPrd=0; iPrd<numProduct; iPrd++)
{
frmPrdId = theForm.elements["hidPrdId" + iPrd].value;
iEntry = iPrd*5;
for (var iOrdPrd=1; iOrdPrd<aryRecords.length; iOrdPrd++)
{
aryData = aryRecords[iOrdPrd].split("\b");
OrdPrdId = aryData[0];
if (frmPrdId == OrdPrdId)
{
if (aryData[5] == "True")
{
theForm.elements["hidCanceledInd" + iPrd].value = "1";
iCancelled = iCancelled + 1;
bCancelled = true;
} 
else
{
theForm.elements["hidCanceledInd" + iPrd].value = "0";
bCancelled = false;
} 
OrdAmtType = aryData[1];
SetAmountType(iPrd, OrdAmtType, aryData[2], aryData[6]);
SetLimitDiscount(iPrd, aryData[3], aryData[4], aryData[12]);
if (OrdAmtType == "P")
amount = aryData[10];
else
amount = aryData[11]; 
iEntry = iEntry + 1;
entryElement = theForm.elements["iTxtAmount" + iEntry];
entryElement.value = formatAmountString(amount);
if (IssueTypeCode=="CP" || IssueTypeCode=="CB")
{
entryElement = theForm.elements["fltTxtCoupon" + iEntry];
entryElement.value = formatAmountString(aryData[8]);
entryElement = theForm.elements["fltTxtPremium" + iEntry];
entryElement.value = formatAmountString(aryData[9]);
}
else
{
entryElement = theForm.elements["fltTxtPrice" + iEntry];
entryElement.value = formatFixedDecimalAmountString(aryData[7],2);
}
if (bCancelled == true)
EnableIOIEntry(iPrd, false);
else
{
EnableIOIEntry(iPrd, true); 
}
} 
}
RestoreMarketOrderString (theForm);
}
if (iCancelled > 0) 
theForm.elements["hidCancelOrder"].value = "1";
else
theForm.elements["hidCancelOrder"].value = "0";
var firstAmt;
for (var iNPrd=0; iNPrd<numProduct; iNPrd++)
{
frmPrdId = theForm.elements["hidPrdId" + iNPrd].value
iEntry = iNPrd*5+1;
firstAmt = theForm.elements["iTxtAmount" + iEntry];
if (firstAmt.disabled == false && (firstAmt.value.length == 0))
{
if (iCancelled > 0)
EnableIOIEntry(iNPrd, false);
else
EnableIOIEntry(iNPrd, true); 
} 
}
}
function GetSelectedTrancheEQ()
{ 
var theForm = document.forms["frmMain"];
var cbElement = theForm.elements["selTranche"];
var theSelected = cbElement.selectedIndex; 
var strValues;
var aryValues;
var trnId;
if ( (theSelected >= 0) && (cbElement.options[theSelected].value != 0) )
{
strValues = cbElement.options[theSelected].value;
aryValues = strValues.split(";");
trnId = aryValues[0];
}
else
trnId = 0; 
return trnId; 
}
function SetAmountType(iprd, ordAmtType, ordCcyId, ordPrdId)
{
var theForm = document.forms["frmMain"];
var ordAmtTypeValue;
if (ordAmtType == "P")
ordAmtTypeValue = ordAmtType + ordPrdId;
else
ordAmtTypeValue = ordAmtType + ordCcyId;
var cbElement = theForm.elements["selAmountType" + iprd];
cbElement.selectedIndex = 0;
for (var ioption=0; ioption<cbElement.options.length; ioption++)
{
if (cbElement.options[ioption].value == ordAmtTypeValue)
{
cbElement.selectedIndex = ioption;
break;
} 
}
}
function SetLimitDiscount(iprd, ordLimitPrdId, ordLimitInPrdInd, ordLimitCcyId)
{
var theForm = document.forms["frmMain"];
var ordLimitDiscountValue;
if (ordLimitInPrdInd == "True")
ordLimitDiscountValue = "D" + ordLimitPrdId;
else
ordLimitDiscountValue = "L" + ordLimitPrdId;
ordLimitDiscountValue += "C" + ordLimitCcyId;
var cbElement = theForm.elements["selLimitDiscount" + iprd];
if (cbElement.type=="select" || cbElement.type=="select-one")
{
cbElement.selectedIndex = 0;
for (var ioption=0; ioption<cbElement.options.length; ioption++)
{
if (cbElement.options[ioption].value == ordLimitDiscountValue)
{
cbElement.selectedIndex = ioption;
break;
} 
}
}
else
{
cbElement.value = ordLimitDiscountValue;
}
}
function LoadOrderInfo(strOrderInfo)
{
var aryData = strOrderInfo.split("\b");
var theForm = document.forms["frmMain"];
var theValue;
var cbElement;
var ioption;
var co;
theForm.elements["hidConfirmOrderId"].value = aryData[0];
theForm.elements["hidPndgOrderId"].value = aryData[1];
SetRegisterDate(aryData[2]);
theForm.elements["hidPndgOrdRegionId"].value = aryData[4];
theForm.elements["hidRegionId"].value = aryData[4];
theForm.elements["hidRegionName"].value = aryData[6];
if (getDocumentElement("pRegionName"))
rewriteLayer("pRegionName", aryData[6]); 
theForm.elements["hidPndgOrdSalesId"].value = aryData[7];
if (theForm.elements["txtSalesComments"])
theForm.elements["txtSalesComments"].value = aryData[9];
if (theForm.elements["txtCMComments"])
theForm.elements["txtCMComments"].value = aryData[10];
theValue = aryData[28]; 
if (theForm.elements["selTranche"])
{ 
cbElement = theForm.elements["selTranche"];
for ( ioption=0; ioption<cbElement.options.length; ioption++ )
{
var strValues = cbElement.options[ioption].value;
var aryValues = strValues.split(";");
var trnId = aryValues[0];
if ( trnId==theValue ) 
{
cbElement.selectedIndex = ioption;
break;
} 
}
OnTrancheSelect(false); 
}
theValue = aryData[12]; 
setOrderType( theValue );
theValue = aryData[13]; 
theForm.elements["hidSMBDId"].value = theValue;
theValue = aryData[16]; 
theForm.elements["selBilledBy"].value = theValue;
theValue = aryData[18];
if (theValue == "True")
{
if (theForm.elements["hidUseAlias"])
theForm.elements["hidUseAlias"].value = "1";
}
else
{
if (theForm.elements["hidUseAlias"])
theForm.elements["hidUseAlias"].value = "0";
}
if (getDocumentElement("hidFrqUseRadioButton"))
{
var nFrqType;
nFrqType = aryData[30];
if ( nFrqType != "0" && nFrqType !="")
{
var nRadioCheck = new Number(nFrqType);
var nFRQCheck;
var nRadioNum = new Number(document.forms["frmMain"].elements["hidFrqUseRadioButton"].value);
if (nRadioNum == 1)
document.forms["frmMain"].elements["iFrqType1"].checked =true; 
else
{
nFRQCheck = new Number(document.forms["frmMain"].elements["iFrqType1"].item(nFrqType - 1).value);
if (nRadioCheck == 1 || nRadioCheck == 2 || eval("CapitalViewLayer").style.display == '')
{
document.forms["frmMain"].elements["iFrqType1"].item(nFRQCheck-1).checked =true; 
}
}
} 
if ( nFrqType == "1" )
{
getDocumentElement("txtFrqNm").value=aryData[31];
}
}
else if (getDocumentElement("hidFrqRequired"))
{
var nFrqType;
var i;
nFrqType = aryData[30];
if ( nFrqType != "0" && nFrqType !="")
{
var iFrqTypeCount = getDocumentElement("hidFrqTypeCount").value;
for ( i = 0; i < iFrqTypeCount; i++)
{
if ( getDocumentElement("iFrqType"+(i+1)).value == nFrqType )
getDocumentElement("iFrqType"+(i+1)).checked = true;
}
}
if ( nFrqType == "1" )
getDocumentElement("txtFrqNm").value=aryData[31];
} 
}
function SetRegisterDate(strDateTime)
{
var spaceIndex;
spaceIndex = strDateTime.indexOf(' ');
var strDate;
var strTime;
if(spaceIndex != "-1")
{
strDate = strDateTime.substring(0, spaceIndex);
strTime = strDateTime.substr(spaceIndex + 1)
}
else
{
strDate = strDateTime;
strTime = "";
}
var strLocalDate;
strLocalDate = FormatDate(strDate,'YYYY-MM-DD',UserSettings.dateMask.toUpperCase())
if(document.frmMain.pRegisterDate)
document.frmMain.pRegisterDate.value = strLocalDate;
if (document.frmMain.dtTxtRegisterDate)
{
dateElement = document.frmMain.dtTxtRegisterDate;
dateElement.value = strLocalDate;
}
dateElement = document.frmMain.hidRegisterDate;
dateElement.value = strLocalDate;
var hour = strTime.substring(0,2);
var min = strTime.substring(3,5);
var bAM = (hour < 12);
var ampm;
if (bAM)
{
ampm = "AM";
if (hour == 0)
{
hour = 12;
}
}
else 
{
ampm = "PM";
if (hour > 12)
{
hour = hour - 12;
}
}
if (document.frmMain.pRegisterTime)
document.frmMain.pRegisterTime.value = hour + ":" + min + " " + ampm;
if (document.frmMain.TxtRegisterHr)
{
dateElement = document.frmMain.TxtRegisterHr;
dateElement.value = hour;
}
dateElement = document.frmMain.hidRegisterHr;
dateElement.value = hour;
if (document.frmMain.TxtRegisterMin)
{
dateElement = document.frmMain.TxtRegisterMin;
dateElement.value = min;
}
dateElement = document.frmMain.hidRegisterMin;
dateElement.value = min;
if (document.frmMain.rsAMPM)
{
dateElement = document.frmMain.rsAMPM;
if (bAM == true)
dateElement[0].checked = true;
else
dateElement[1].checked = true ;
}
dateElement = document.frmMain.hidAMPM;
dateElement.value=bAM;
}
function InitialDate(strObjName)
{
var theForm = document.forms["frmMain"];
var today = theForm.elements["hidSystemDate"].value;
var strDate = today.substring(0,10);
var MDY = FormatDate(strDate,'YYYY-MM-DD',UserSettings.dateMask.toUpperCase())
var hour;
var min;
var bAM = true;
hour = today.substring(11,13);
min = today.substring(14,16);
if (hour >= 12)
{
if (hour > 12)
{
hour = hour - 12;
}
bAM = false;
}
else if (hour == 0)
{
hour = 12;
}
if (theForm.elements[strObjName])
{
var dateElement = theForm.elements[strObjName];
dateElement.value = MDY;
}
else
{
return;
}
dateElement = theForm.elements["hidRegisterDate"];
dateElement.value = MDY;
rewriteLayer("pRegisterDate", MDY); 
dateElement = theForm.elements["TxtRegisterHr"];
if(dateElement)
dateElement.value = hour;
dateElement = theForm.elements["hidRegisterHr"];
dateElement = theForm.elements["TxtRegisterMin"];
if(dateElement)
dateElement.value = min;
dateElement = theForm.elements["hidRegisterMin"];
dateElement.value = min;
dateElement = theForm.elements["rsAMPM"];
if(dateElement)
{
if (bAM == true)
dateElement[0].checked = true;
else
dateElement[1].checked = true ; 
}
dateElement = theForm.elements["hidAMPM"];
dateElement.value=bAM;
rewriteLayer("pRegisterTime", hour+":"+min+" " + (bAM?"AM":"PM")); 
if ('dtTxtRegisterDate' == strObjName)
{
if (document.all['dtTxtRegisterDateReadOnly'] != null)
document.all['dtTxtRegisterDateReadOnly'].innerText = theForm.elements['dtTxtRegisterDate'].value;
if (document.all['TxtRegisterHrReadOnly'] != null)
document.all['TxtRegisterHrReadOnly'].innerText = theForm.elements['TxtRegisterHr'].value;
if (document.all['TxtRegisterMinReadOnly'] != null)
document.all['TxtRegisterMinReadOnly'].innerText = theForm.elements['TxtRegisterMin'].value;
if (document.all['AMReadOnly'] != null && document.all['PMReadOnly'] != null)
{
if (theForm.elements['rsAMPM'][0].checked)
{
document.all['AMReadOnly'].style.display = 'inline';	
document.all['PMReadOnly'].style.display = 'none';	
}
else if (theForm.elements['rsAMPM'][1].checked)
{
document.all['PMReadOnly'].style.display = 'inline'; 
document.all['AMReadOnly'].style.display = 'none'; 
}
} 
}
}
function EnableIOIEntry(iprd, bEnabled)
{ 
var theForm = document.forms["frmMain"];
var IssueTypeCode = theForm.elements["hidIssueTypeCode"].value
var iEntry;
var bDisabled = !bEnabled; 
if (theForm.elements["selAmountType" + iprd])
{
enableDisableElement(theForm.elements["selAmountType" + iprd],bDisabled);
}
if (IssueTypeCode != "CP" && IssueTypeCode != "CB")
{
enableDisableElement(theForm.elements["selLimitDiscount" + iprd],bDisabled);
}
for (var k=1; k<=5; k++)
{
iEntry = iprd*5+k;
if (theForm.elements["iTxtAmount"+ iEntry])
enableDisableElement(theForm.elements["iTxtAmount"+ iEntry],bDisabled);
if(IssueTypeCode=="CP" || IssueTypeCode=="CB")
{
if (theForm.elements["fltTxtCoupon"+ iEntry])
enableDisableElement(theForm.elements["fltTxtCoupon"+ iEntry],bDisabled);
if (theForm.elements["fltTxtPremium"+ iEntry])
enableDisableElement(theForm.elements["fltTxtPremium"+ iEntry],bDisabled);
}
else
{
if (theForm.elements["fltTxtPrice"+ iEntry])
enableDisableElement(theForm.elements["fltTxtPrice"+ iEntry],bDisabled);
}
}
}
function OnTrancheSelect(bLoadOrder)
{
var cbElement;
var strValues;
var theForm = document.forms["frmMain"];
var theRole = theForm.elements["hidIOIUserRole"].value;
var theSelected;
var trnId;
var defPrdId;
var popBook;
var potIOI;
var iEntry;
var entryElement;
var bfind = false;
var issueTypeCode = theForm.elements["hidIssueTypeCode"].value;
if (theRole == "SyndicateParticipant") 
bLoadBD = false;
else
bLoadBD = true; 
cbElement = theForm.elements["selTranche"];
strValues = cbElement.value;
aryValues = strValues.split(";");
trnId = aryValues[0];
defPrdId = aryValues[1];
popBook = aryValues[2]; 
potIOI = aryValues[3]; 
HardPotInd = aryValues[4];
theForm.elements["hidTrnId"].value = trnId;
var iPrd = 0;
for (var i=0; i<prdArray.length && bfind == false; i++)
{
if (prdArray[i][0] == defPrdId)
{
rewriteLayer("pProductName" + iPrd, "Indication - " + prdArray[i][1]);
rewriteLayer("pProductName2" + iPrd, GetPriceDescrAndProductName(prdArray[i][0]));
rewriteLayer("pProductPrice" + iPrd, GetProductFilePrice(prdArray[i][0]));
if(theForm.elements["selAmountType" + iPrd] && issueTypeCode=="C")
{
cbElement = theForm.elements["selAmountType" + iPrd];
cbElement.options[1].value = "P" + prdArray[i][0];
cbElement.options[1].text = "Product - " + prdArray[i][1];
cbElement.options.length > 1?cbElement.selectedIndex=1:cbElement.selectedIndex=0;
}
theForm.elements["hidPrdId" + iPrd].value = prdArray[i][0];
bfind = true;
}
} 
iPrd=0;
for (var i=0; i<prdArray.length; i++)
{
if (prdArray[i][0] != defPrdId)
{
iPrd = iPrd + 1;
rewriteLayer("pProductName" + iPrd, "Indication - " + prdArray[i][1]);
rewriteLayer("pProductName2" + iPrd, GetPriceDescrAndProductName(prdArray[i][0]));
rewriteLayer("pProductPrice" + iPrd, GetProductFilePrice(prdArray[i][0]));
if(theForm.elements["selAmountType" + iPrd] && issueTypeCode=="C")
{
cbElement = theForm.elements["selAmountType" + iPrd];
cbElement.options[1].value = "P" + prdArray[i][0];
cbElement.options[1].text = "Product - " + prdArray[i][1];
cbElement.options.length > 1?cbElement.selectedIndex=1:cbElement.selectedIndex=0;
} 
theForm.elements["hidPrdId" + iPrd].value = prdArray[i][0];
}
} 
ResetIOIEntry();
if (bLoadBD == true)
{
} 
else
{
theForm.elements["hidSMBDId"].value = aryValues[5];
if ( bLoadOrder!=false )
GetOrder();
}
setOrderType(potIOI); 
}
function setOrderType(potIOIInd)
{
var theForm = document.forms["frmMain"];
if (potIOIInd == "False")
{
theForm.elements["hidOrderType"].value = "0";
if (theForm.elements["selOrderType"])
theForm.elements["selOrderType"].selectedIndex = 1;
rewriteLayer("lblOrderType", "Retention");
} 
else
{
theForm.elements["hidOrderType"].value = "1";
if (theForm.elements["selOrderType"])
theForm.elements["selOrderType"].selectedIndex = 0;
rewriteLayer("lblOrderType", "Institutional Pot");
} 
}
function ResetIOIEntry()
{
var theForm = document.forms["frmMain"];
var IssueTypeCode = theForm.elements["hidIssueTypeCode"].value;
var cbElement;
var hidElement;
var iEntry;
var entryElement;
var numProduct = 0;
RestoreMarketOrderString(theForm);
numProduct = prdArray.length;
setOrderType("True"); 
for (var i=0; i<numProduct; i++)
{
var defPrdId = theForm.elements["hidPrdId" + i].value;
var defPrdCcyId = getProductCurrency(defPrdId);
if (theForm.elements["selAmountType" + i])
{
cbElement = theForm.elements["selAmountType" + i];
if ((IssueTypeCode == "EU") && (cbElement.options.length > 1))
ReSequenceAmtType(cbElement, defPrdCcyId);
cbElement.options.length > 1?cbElement.selectedIndex=1:cbElement.selectedIndex=0;
}
if (theForm.elements["selLimitDiscount" + i])
{
cbElement = theForm.elements["selLimitDiscount" + i];
if (cbElement.options)
{
var defPrdId = theForm.elements["hidPrdId" + i].value;
var defValue = "L" + defPrdId + "C" + defPrdCcyId;
for (var icb=0; icb<cbElement.options.length; icb++)
{
if (cbElement.options[icb].value == defValue)
{
cbElement.selectedIndex = icb;
break;
}
} 
} 
} 
for (var j=1; j<=5; j++)
{
iEntry = i*5+j;
if (theForm.elements["iTxtAmount"+ iEntry])
{
entryElement = theForm.elements["iTxtAmount"+ iEntry]; 
entryElement.value = "";
}
}
EnableIOIEntry(i, true);
}
SetActionButton("New");
} 
function ReSequenceAmtType(cbElement, defPrdCcyId)
{
var NumOfAmtType = cbElement.options.length;
var aryStdAmtType = new Array();
var aryAmtType = new Array();
var DefValue;
var DefLabel;
for (var iold=1; iold<NumOfAmtType; iold++)
{
var AmtTypeValue = cbElement.options[iold].value;
var AmtTypeLabel = cbElement.options[iold].text;
if (AmtTypeValue == "C" + defPrdCcyId)
{
DefValue = AmtTypeValue;
DefLabel = AmtTypeLabel;
}
else
{
var stdSeq = GetStdSequence(AmtTypeValue.substr(1, AmtTypeValue.length-1));
if (parseInt(stdSeq) > 0)
{
var aryData = new Array(3);
aryData[0] = AmtTypeValue;
aryData[1] = AmtTypeLabel;
aryData[2] = stdSeq;
aryStdAmtType.push(aryData);
}
else
{
var aryData = new Array(2);
aryData[0] = AmtTypeValue;
aryData[1] = AmtTypeLabel;
aryAmtType.push(aryData);
}
} 
}
var arySortStdAmtType = aryStdAmtType.sort(sortByCcySeqInAsc);
var arySortAmtType = aryAmtType.sort(sortByCcyNameInAsc);
cbElement.options.length = 0;
cbElement.options[cbElement.options.length]= new Option("None Selected", 0);
cbElement.options[cbElement.options.length]= new Option(DefLabel, DefValue);
var inew;
for (inew=0; inew<arySortStdAmtType.length; inew++)
cbElement.options[cbElement.options.length]= new Option(arySortStdAmtType[inew][1], arySortStdAmtType[inew][0]);
for (inew=0; inew<arySortAmtType.length; inew++)
cbElement.options[cbElement.options.length]= new Option(arySortAmtType[inew][1], arySortAmtType[inew][0]);
}
function GetStdSequence(ccyId)
{
for (var iStd=0; iStd<arrStdCurrencySeq.length; iStd++)
{
if (arrStdCurrencySeq[iStd][0] == ccyId)
return arrStdCurrencySeq[iStd][1];
}
return 0;
}
function sortByCcySeqInAsc(aryValue1, aryValue2)
{
if (aryValue1[2] < aryValue2[2]) return -1;
if (aryValue1[2] == aryValue2[2]) return 0;
if (aryValue1[2] > aryValue2[2]) return 1; 
}
function sortByCcyNameInAsc(aryValue1, aryValue2)
{
if (aryValue1[1] < aryValue2[1]) return -1;
if (aryValue1[1] == aryValue2[1]) return 0;
if (aryValue1[1] > aryValue2[1]) return 1; 
} 
function getProductCurrency(prdId)
{
for (var ic=0; ic<prdArray.length; ic++)
{
if (prdArray[ic][0] == prdId)
return prdArray[ic][2];
}
return 0; 
}
function errorCallBack(co)
{
alert("ERROR_CALLBACK\n\n" +
"status = " + co.status + "\n\n" +
"message = " + co.message + "\n\n" +
"context = " + co.context + "\n\n" +
"data = " + co.data);
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
var sHeight = "height=" + (85 + (1 * 22));
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
function ConfirmRemoteScripting()
{
var enabled = false;
enabled = RSExecute('rs_bookbuild_indication_server.asp', 'js_RemoteScriptingEnabled').return_value;
if (! enabled)
{
alert("Remote scripting not enabled");
}
}
function GetPriceDescrAndProductName( lPrdID )
{
var sTitle = "";
var sPrdName = "";
for ( var i=0; i<prdArray.length; i++ )
{
if ( prdArray[i][0]==lPrdID )
{
var nOfferPx = new Number( prdArray[i][6] );
if ( prdArray[i][5]=="True" ) 
{
sTitle = strFilePriceRange;
}
else
{
if ( nOfferPx>0 ) 
sTitle = strOfferPrice;
else
sTitle = strFilePrice;
}
sPrdName = prdArray[i][1];
break;
}
}
return sTitle + " " + sPrdName + ":";
}
function GetProductFilePrice( lPrdID )
{
var sPrice1 = "0";
var sPrice2 = "";
var sPrdCcy = "";
var sFxRate = "";
var sBasePrdFxRate = "";
var sConversionRatio = "0";
for ( var i=0; i<prdArray.length; i++ )
{
if ( prdArray[i][0]==lPrdID )
{
if ( prdArray[i][5]=="True" ) 
{
sPrice1 = sBasePrdCurrFilePxLo; 
sPrice2 = sBasePrdCurrFilePxHi; 
sFxRate = prdArray[i][7]; 
sBasePrdFxRate = sBasePrdFxRateAtFiling;
}
else
{
if ( sBasePrdOfferPx>0 ) 
{
sPrice1 = sBasePrdOfferPx;	
sFxRate = prdArray[i][8]; 
sBasePrdFxRate = sBasePrdFxRateAtOffering;
}
else
{	
sPrice1 = sBasePrdFilePx;	
sFxRate = prdArray[i][7]; 
sBasePrdFxRate = sBasePrdFxRateAtFiling;
}
}
sPrdCcy = prdArray[i][3];
sConversionRatio = prdArray[i][6];
if ( sFxRate=="" ) {
sFxRate = prdArray[i][9]; 
}
break;
}
}
if ( sBasePrdFxRate=="" ) {
sBasePrdFxRate = sBasePrdEstFxRateAtOffering;
}
if ( sBasePrdFxRate=="" || isNaN(sBasePrdFxRate) ) {
sBasePrdFxRate = "1";
}
if ( sFxRate=="" || isNaN(sFxRate) ) {
sFxRate = "1";
}
sPrice1 = GetPriceInTermsOfCurrency( sPrice1, sBasePrdFxRate, sFxRate, sConversionRatio );
sPrice1 = formatFixedDecimalAmountString( sPrice1, 2 );
if ( sPrice2=="" )
{ 
return sPrice1 + " " + sPrdCcy;
}
else
{
sPrice2 = GetPriceInTermsOfCurrency( sPrice2, sBasePrdFxRate, sFxRate, sConversionRatio );
return sPrice1 + " - " + formatFixedDecimalAmountString( sPrice2, 2 ) + " " + sPrdCcy; 
}
}
function GetPriceInTermsOfCurrency( sPrice, sBasePrdFxRate, sFxRate, sConversionRatio )
{
var nPrice = new Number( sPrice );
var nFxRate = new Number( sFxRate );
var nBasePrdFxRate = new Number( sBasePrdFxRate );
var nConversionRatio = new Number( sConversionRatio );
if ( nFxRate==0 || nBasePrdFxRate==0 )
return 0;
return new String( Math.round( nPrice/(nBasePrdFxRate/nFxRate)*nConversionRatio*100 ) / 100 );
}
function showHideOneArea(areaName)
{
if (getDocumentElement(areaName) == null || getDocumentElement(areaName) == 0 )
return;
var elthis = eval(areaName);
var imgObj;
if (document.frmMain.elements["hidML2790Rule"].value == 1)
{
if (bDealPricingBeforeRule2790)
imgObj = document.images['OldImFreeriding'];
else
imgObj = document.images['ImFreeriding'];
}	
else
imgObj = document.images['ImFreeriding'];
if (document.forms["frmMain"].elements["hidFrqRequired"].value == 1)
{
elthis.style.display = '';
if (getDocumentElement("LinkFreeriding")) 
hideElement(getDocumentElement("LinkFreeriding"));
if (getDocumentElement("ImFreeriding")) 
hideElement(getDocumentElement("ImFreeriding"));
if (getDocumentElement("OldLinkFreeriding")) 
hideElement(getDocumentElement("OldLinkFreeriding"));
if (getDocumentElement("OldImFreeriding")) 
hideElement(getDocumentElement("OldImFreeriding"));
return;
}
if (elthis.style.display == 'none'){
elthis.style.display = '';
if (imgObj != null)
imgObj.src = "../images/collapse.gif";
}
else{
elthis.style.display = 'none';
if (imgObj != null)
imgObj.src = "../images/expand.gif";
}
} 
function setMarket(name)
{
if (document.frmMain.elements[name].value.length == 0)
document.frmMain.elements[name].value = document.frmMain.hidMarketOrderString.value;	
}
function OpenConfirmationPopup(sNavType, action)
{
var sUrl = "BookBuild_Indications_Confirmation_popup.asp?navType=" +
String(sNavType) + "&action=" + String(action) + "&navfrom=SalesWorkSheet";
var sStyle = "scrollbars=yes,menubar=no,width=600,height=400,toolbar=no,status=no,titlebar=no";
var popupGeneral = window.open( sUrl, 'ConfirmationPopup', sStyle);
popupGeneral.focus();
}
