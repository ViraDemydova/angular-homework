RSEnableRemoteScripting("/_ScriptLibrary")
var nPrevSelectTrnIndext = 0;
var nPrevSelectBrkIndex = 0;
var bDealPricingBeforeRule2790 = false;
function onPageLoad()
{
InitialDate();
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
if (document.frmMain.elements["hidExpandFRQByDefault"])
{
if (document.frmMain.elements["hidExpandFRQByDefault"].value == '1' && document.forms["frmMain"].elements["hidFrqRequired"].value != 1)
showHideOneArea("freeridingLayer");
}
loadFrqFields();
if (getDocumentElement("selTranche"))
{
ConfirmRemoteScripting();
RSCallObject_wait(); 
OnTrancheSelect(false);
}
var theForm = document.forms["frmMain"];
if(theForm.elements["hidNumProduct"] != null)
{
var numProduct = theForm.elements["hidNumProduct"].value;
for (var iPrd=1; iPrd<=numProduct; iPrd++)
{
for(var i = 1; i <= (iPrd*5); i++)
if(theForm.elements["pctTxtDeltaLimit" + i.toString()] != null )
{
if(theForm.elements["selInvDesiredHedgeType" + (iPrd-1).toString()].value == '2')
{
theForm.elements["pctTxtDeltaLimit" + i.toString()].disabled = false;
}
else
{
theForm.elements["pctTxtDeltaLimit" + i.toString()].disabled = true;
}
}
}
}
}
function CheckConditionallyRequiredFields( frm, arrFieldsInError )
{
var arrMoreErrors = new Array();
return (arrMoreErrors);
} 
function CustomValidation( frm, arrFieldsInError )
{
var arrMoreErrors = new Array();
var bCheckFRQ = true;
if (getDocumentElement("selBrokerDealer"))
{
if (frm.elements["hidSmId"].value == "" || frm.elements["hidSmId"].value == null)
{
var arrError = FieldErrorInfo("selBrokerDealer", new String, "", "selBrokerDealer", "Broker");
arrError[2] = "You must select a broker for this order.";
arrMoreErrors[arrMoreErrors.length] = arrError;
}
} 
var theElement = frm.elements["hidNumProduct"];
var numProduct = parseInt(theElement.value, 10);
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
ValidateEquityEntry(i, arrAmount, arrLimit, arrMoreErrors, frm, bCheckFRQ);
bCheckFRQ = false;
} 
}
}
else if (issueTypeCode == "CP" || issueTypeCode=="CB")	
{
for (var i=0; i<numProduct; i++)
{
var arrAmount = new Array;
var arrPrice = new Array;
var arrCoupon = new Array;
var arrPremium = new Array;
var iArray = 0;
for (var j = (i * 5) + 1; j <= ((i + 1) * 5); j++)
{
theElement = frm.elements["iTxtAmount" + j];
if (theElement.value.length > 0)
{
arrAmount[iArray] = stripCharsInBag( theElement.value, numericCharsToIgnore );
theElement = frm.elements["fltTxtPrice" + j];
if (theElement)
{
if (theElement.value.length > 0)
arrPrice[iArray] = stripCharsInBag( theElement.value, numericCharsToIgnore );
else
arrPrice[iArray] = 0;
}
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
ValidateEquityEntryConvertible(i, arrAmount, arrPrice, arrCoupon, arrPremium, arrMoreErrors, frm);
}
} 
}
return (arrMoreErrors);
} 
function ValidateEquityEntry(iPrd, arr_Amount, arr_Limit, arr_MoreErrors,theForm, bCheckFRQ)
{
var lAmount;
var lLastAmount;
var dbLimit;
var dbLastLimit;
var bLimitDiscount = false;
var LimitDiscountInd;
var iNumOfEntry = arr_Amount.length;
if (bCheckFRQ == true)
ValidateFRQ( arr_MoreErrors );
theElement = theForm.elements["selLimitDiscount"+iPrd];
var selIndex = theElement.selectedIndex;
if (selIndex <=0)
{
var arrError = FieldErrorInfo("selLimitDiscount"+iPrd, new String, "", "selLimitDiscount"+iPrd, "Limit/Discount");
arrError[2] = "Please select an Limit/Discount.";
arr_MoreErrors[arr_MoreErrors.length] = arrError;
}
else
{
var strvalue = theElement[selIndex].value;
LimitDiscountInd = strvalue.charAt(0);
}
bLimitDiscount = (LimitDiscountInd == "L") ? false : true;
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
dbLimit = parseFloat(arr_Limit[i]);
if(dbLimit == 0)
{
dbLimit = (bLimitDiscount) ? 0 : 9999999999;
}
if (i == 0)
{
lLastAmount = lAmount;
dbLastLimit = dbLimit;
}
else
{ 
if (i==1) bAscAmount = lAmount > lLastAmount;
if (!bLimitDiscount)
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
function ValidateEquityEntryConvertible(iPrd, arr_Amount, arr_Price, arr_Coupon, arr_Premium, arr_MoreErrors, theForm)
{
var lAmount;
var lLastAmount;
var dbPrice;
var dbLastPrice;
var dbCoupon;
var dbLastCoupon;
var dbPremium;
var dbLastPremium;
var bAscAmount;
var iNumOfEntry = arr_Amount.length;
var bAscPrice;
var bAscCoupon;
var bAscPremium;
var bValidatePrice = (arr_Amount.length == arr_Price.length);
theElement = theForm.elements["selAmountType" + iPrd];
if (theElement.selectedIndex <=0)
{
var arrError = FieldErrorInfo("selAmountType"+iPrd, new String, "", "selAmountType"+iPrd, "Amount Type");
arrError[2] = "Please select an amount type.";
arr_MoreErrors[arr_MoreErrors.length] = arrError;
}
var bValidateOrder = true;
var bPriceExists = false;
var bCouponExists = false;
var bPremiumExists = false;
for (var i=0; i<iNumOfEntry; i++)
{
dbPrice = parseFloat(arr_Price[i]);
if (dbPrice != 0)
bPriceExists = true;
dbCoupon = parseFloat(arr_Coupon[i]);
if (dbCoupon != 0)
bCouponExists = true;
dbPremium = parseFloat(arr_Premium[i]);
if (dbPremium != 0)
bPremiumExists = true;
}
if (!bPriceExists && !bCouponExists && !bPremiumExists)
bValidateOrder = true;
else if (bPriceExists && bCouponExists && bPremiumExists)
bValidateOrder = false;
else
bValidateOrder = bPriceExists ^ bCouponExists ^ bPremiumExists;
for (var i=0; i<iNumOfEntry; i++)
{
lAmount = parseInt(arr_Amount[i],10);
dbPrice = parseFloat(arr_Price[i]);
dbCoupon = parseFloat(arr_Coupon[i]);
dbPremium = parseFloat(arr_Premium[i]);
if (dbPremium == 0.0)
dbPremium = 9999999999;
if (dbPrice == 0.0)
dbPrice = 9999999999;
if (i == 0)
{
lLastAmount = lAmount;
dbLastPrice = dbPrice;
dbLastCoupon = dbCoupon;
dbLastPremium = dbPremium;
}
else
{
if (i == 1)
{
bAscAmount = lAmount > lLastAmount;
bAscPrice = dbPrice > dbLastPrice;
bAscCoupon = dbCoupon > dbLastCoupon;
bAscPremium = dbPremium > dbLastPremium;
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
if (bValidateOrder)
{
if ( bValidatePrice )
{
if (dbPrice == dbLastPrice && dbCoupon == dbLastCoupon && dbPremium == dbLastPremium)
{
var iErrEntry = iPrd*5+(i+1);
var arrError = FieldErrorInfo("fltTxtCoupon"+iErrEntry, new String, "", "fltTxtPrice"+iErrEntry, "Price (% of Par)");
arrError[2] = "Only one of Coupon or Premium can have the same value as its predecessor";
arr_MoreErrors[arr_MoreErrors.length] = arrError;
}
if ( bAscAmount == bAscPrice && dbPrice != dbLastPrice)
{
var iErrEntry = iPrd*5+(i+1);
var arrError = FieldErrorInfo("fltTxtPrice"+iErrEntry, new String, "", "fltTxtPrice"+iErrEntry, "Price (% of Par)");
arrError[2] = "The Amount and Price (% of Par) values must be entered in inverse order. Amount ascending and Price (% of Par) descending or Amount descending and Price (% of Par) ascending.";
arr_MoreErrors[arr_MoreErrors.length] = arrError;
}
if (bAscPrice)
{
if (!(isNaN(dbPrice) || isNaN(dbLastPrice)) && (dbPrice < dbLastPrice))
{
var iErrEntry = iPrd*5+(i+1);
var arrError = FieldErrorInfo("fltTxtPrice"+iErrEntry, new String, "", "fltTxtPrice"+iErrEntry, "Price (% of Par)");
arrError[2] = "If the first two Prices are in ascending order, all prices must be in ascending order";
arr_MoreErrors[arr_MoreErrors.length] = arrError;
}
}
else
{
if (dbPrice > dbLastPrice)
{
var iErrEntry = iPrd*5+(i+1);
var arrError = FieldErrorInfo("fltTxtPrice"+iErrEntry, new String, "", "fltTxtPrice"+iErrEntry, "Price (% of Par)");
arrError[2] = "If the first two Prices are in descending order, prices must be in descending order";
arr_MoreErrors[arr_MoreErrors.length] = arrError;
}
}
}
else
{
if (dbCoupon == dbLastCoupon && dbPremium == dbLastPremium)
{
var iErrEntry = iPrd*5+(i+1);
var arrError = FieldErrorInfo("fltTxtCoupon"+iErrEntry, new String, "", "fltTxtCoupon"+iErrEntry, "Coupon");
arrError[2] = "Only one of Coupon or Premium can have the same value as its predecessor";
arr_MoreErrors[arr_MoreErrors.length] = arrError;
}
}
if ( bAscAmount != bAscCoupon && dbCoupon != dbLastCoupon)
{
var iErrEntry = iPrd*5+(i+1);
var arrError = FieldErrorInfo("fltTxtCoupon"+iErrEntry, new String, "", "fltTxtCoupon"+iErrEntry, "Coupon");
arrError[2] = "The Amount and Coupon values must be entered in same order. Amount and Coupon both should be either ascending or descending.";
arr_MoreErrors[arr_MoreErrors.length] = arrError;
}
if (bAscCoupon)
{ 
if (!(isNaN(dbCoupon) || isNaN(dbLastCoupon)) && (dbCoupon < dbLastCoupon))
{
var iErrEntry = iPrd*5+(i+1);
var arrError = FieldErrorInfo("fltTxtCoupon"+iErrEntry, new String, "", "fltTxtCoupon"+iErrEntry, "Coupon");
arrError[2] = "If the first two Coupons are in ascending order, all coupons must be in ascending order";
arr_MoreErrors[arr_MoreErrors.length] = arrError;
}
}
else
{
if (dbCoupon > dbLastCoupon)
{
var iErrEntry = iPrd*5+(i+1);
var arrError = FieldErrorInfo("fltTxtCoupon"+iErrEntry, new String, "", "fltTxtCoupon"+iErrEntry, "Coupon");
arrError[2] = "If the first two Coupons are in descending order, Coupon must be in descending order";
arr_MoreErrors[arr_MoreErrors.length] = arrError;
}
}
if ( bAscAmount == bAscPremium && dbPremium != dbLastPremium)
{
var iErrEntry = iPrd*5+(i+1);
var arrError = FieldErrorInfo("fltTxtPremium"+iErrEntry, new String, "", "fltTxtPremium"+iErrEntry, "Premium");
arrError[2] = "The Amount and Premium values must be entered in inverse order. Amount ascending and Premium descending or Amount descending and Premium ascending.";
arr_MoreErrors[arr_MoreErrors.length] = arrError;
}
if (bAscPremium)
{
if (!(isNaN(dbPremium) || isNaN(dbPremium)) && (dbPremium < dbLastPremium))
{
var iErrEntry = iPrd*5+(i+1);
var arrError = FieldErrorInfo("fltTxtPremium"+iErrEntry, new String, "", "fltTxtPremium"+iErrEntry, "Premium");
arrError[2] = "If the first two Premium are in ascending order, all Premiums must be in ascending order.";
arr_MoreErrors[arr_MoreErrors.length] = arrError;
}
}
else
{
if (dbPremium > dbLastPremium)
{
var iErrEntry = iPrd*5+(i+1);
var arrError = FieldErrorInfo("fltTxtPremium"+iErrEntry, new String, "", "fltTxtPremium"+iErrEntry, "Premium");
arrError[2] = "If the first two Premium are in descending order, Premium must be in descending order";
arr_MoreErrors[arr_MoreErrors.length] = arrError;
}
} 
}
lLastAmount = lAmount;
dbLastPrice = dbPrice;
dbLastCoupon = dbCoupon;
dbLastPremium = dbPremium;
}
}
}
function InitialDate()
{
var sDateTime = document.frmMain.hidTxtRegisterDateTime.value;
var dtDateTime = new Date(sDateTime)
var hour;
var min;
var ampm;
var bAM = true;
hour = dtDateTime.getHours();
if (hour > 12)
{
hour = hour - 12;
bAM = false;
}
else if (hour == 12)
{
bAM = false;
}
else if (hour == 0)
{
hour = 12;
}
if (bAM)
ampm = "AM";
else 
ampm = "PM";
min = dtDateTime.getMinutes();
if (min < 10)
{
min = "0" + min
}
document.frmMain.TxtRegisterTime.value = hour + ":" + min + " " + ampm;
var frm = document.frmMain;
var theElement = frm.elements["hidNumProduct"];
var numProduct = parseInt(theElement.value, 10);
for (var i=0; i<numProduct; i++)
{
for (var j = (i * 5) + 1; j <= ((i + 1) * 5); j++)
{	
var elem = "fltTxtPrice" + String(j);
if (frm.elements[elem] && frm.elements[elem].value != frm.elements["hidMarketOrderString"].value)
frm.elements[elem].value = formatFixedDecimalAmountString(frm.elements[elem].value,2);
}
}
}
function submitPage( frm , action, pndg_ord_id, trn_id)
{
var sSaleRoleNoIOI = frm.hidIsSalesNoIOI.value; 
var sNavType = frm.hidNavType.value; 
var sRedirect = "";
if (sNavType == "pending")
sRedirect = "Bookbuild_PendingOrdersEq.asp";
else
sRedirect = "Reports_ListIndicationsEq.asp";
switch (action)
{
case "Update" :
ClearMarketOrderString(frm);
if (ValidateForm( frm ))
{
frm.action = "/asp/util_submit_action.asp";
frm.hidRedirect.value = sRedirect;
if (sSaleRoleNoIOI == "True")
frm.hidAction.value = "UpdateSalesComment";
else
frm.hidAction.value = "UpdatePndg";
frm.submit();
}
else
{
RestoreMarketOrderString(frm);
}
break;
case "ReinstateOrder" :
frm.action = "/asp/util_submit_action.asp";
frm.hidAction.value = "ReinstatePndg";
frm.hidRedirect.value = sRedirect;
frm.submit();
break;
case "CancelOrder" :
frm.action = "/asp/util_submit_action.asp";
frm.hidAction.value = "CancelPndg";
frm.hidRedirect.value = sRedirect;
frm.submit();
break;
case "Delete" :
frm.action = "/asp/util_submit_action.asp";
frm.hidAction.value = "Delete";
frm.hidRedirect.value = sRedirect;
frm.submit();
break;
case "Cancel" :
frm.action = "/asp/" + sRedirect;
frm.submit();
break;
case "RevertToSaved" :
frm.action = "/asp/bookbuild_indicationseq.asp?pndg_ord=" + String(pndg_ord_id) + "&trn_id=" + String(trn_id);
frm.submit();
break;
case "Next" : 
case "Previous" :
var sAutoSave = frm.cbAutoSave.checked;
var sCancelInd = frm.hidCanceledInd.value;
if ((sAutoSave == true) && (sCancelInd == "False"))
{
ClearMarketOrderString(frm);
if (ValidateForm( frm ))
{
frm.action = "/asp/util_submit_action.asp";
if (sSaleRoleNoIOI == "True")
frm.hidAction.value = "UpdateSalesComment";
else
frm.hidAction.value = "UpdatePndg";
frm.hidRedirect.value = "/asp/bookbuild_indicationseq.asp?pndg_ord=" + String(pndg_ord_id) + "&trn_id=" + String(trn_id) + "&autosave=" + sAutoSave;
frm.submit();
}
}
else
{ 
frm.action = "/asp/bookbuild_indicationseq.asp?pndg_ord=" + String(pndg_ord_id) + "&trn_id=" + String(trn_id) + "&autosave=" + sAutoSave;
frm.submit();
}
break;
}
}
function onPopBook(objCK)
{
if (objCK.checked == true)
document.forms["frmMain"].elements["hidPopBook"].value = "1";
else
document.forms["frmMain"].elements["hidPopBook"].value = "0";
}
function validateCommentLength( textArea, isPaste )
{
var len = textArea.value.length;
if ( isPaste==true ) {
len += window.clipboardData.getData("Text").length;
}
if ( len>=2000 ) {
alert("The text in the comment field may not exceed 2000 characters.");
event.returnValue = false; 
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
function showHideOneArea(areaName){
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
var theRole;
if (getDocumentElement("hidIOIUserRole"))
{
theRole = getDocumentElement("hidIOIUserRole").value;
}
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
if (theRole == "SyndicateMarketing" || theRole == "SyndicateParticipant" || theRole =="SyndicateRemoteDesk") 
{
if (getDocumentElement("CapitalViewLayer"))
getDocumentElement("CapitalViewLayer").style.display = '';
}
if (imgObj != null)
imgObj.src = "../images/collapse.gif";
}
else{
elthis.style.display = 'none';
if (theRole == "SyndicateMarketing" || theRole == "SyndicateParticipant" || theRole =="SyndicateRemoteDesk") 
{ 
if (getDocumentElement("CapitalViewLayer"))
getDocumentElement("CapitalViewLayer").style.display = 'none';
}
if (imgObj != null)
imgObj.src = "../images/expand.gif";
}
}
function OnTrancheSelect(bCheckOrderExistInd)
{
var cbElement;
var theForm = document.forms["frmMain"];
var theSelected;
var trnId;
var strValues;
var aryValues;
var trnNm;
var HardPotInd;
var bSelectBrFromOrd = false;
var hidOrdTrnId = theForm.elements["hidOrdTrnId"];
cbElement = theForm.elements["selTranche"];
theSelected = cbElement.selectedIndex; 
if ( (theSelected >= 0) && (cbElement.options[theSelected].value != 0) )
{
strValues = cbElement.options[theSelected].value;
aryValues = strValues.split(";");
trnId = aryValues[0];
HardPotInd = aryValues[1];
trnNm = aryValues[2];
var IssId = theForm.elements["hidIssueId"].value;
var coBroker; 
coBroker = RSExecute('rs_bookbuild_indication_server.asp', 'js_ListBrokersByTranche', IssId, trnId);
var strResult = coBroker.return_value;
if (strResult != "")
{
aryRecords = strResult.split("\t");
aryData = aryRecords[0].split("\b");
strValue = aryData[0];
if (HardPotInd == "True" || aryRecords.length == 2)
{
if (bCheckOrderExistInd && hidOrdTrnId.value != trnId )
{
if (CheckOrderExist(strValue))
{
theForm.elements["selTranche"].selectedIndex = nPrevSelectTrnIndext;
var sStatusMsg = new String;
sStatusMsg = sStatusMsg + "Error: Cannot changed tranche<br>";
var sMsg = "Indication already exists in " + trnNm;
sStatusMsg = sStatusMsg + "<li><a href='JavaScript:self.window.opener.document.frmMain.selTranche.focus()'>Tranche</a> " + sMsg + "<br>";
showErrorMessage(sStatusMsg);
return;
}
else
{
theForm.elements["hidTrnId"].value = trnId;
nPrevSelectTrnIndext = theSelected;	
bSelectBrFromOrd = false;	
callback_populateBrokerDealerCombo(coBroker, bSelectBrFromOrd, HardPotInd);
}	
}
else
{
theForm.elements["hidTrnId"].value = trnId;
nPrevSelectTrnIndext = theSelected;	
bSelectBrFromOrd = true;	
callback_populateBrokerDealerCombo(coBroker, bSelectBrFromOrd, HardPotInd);
}
}
else
{
theForm.elements["hidTrnId"].value = trnId;
nPrevSelectTrnIndext = theSelected;	
if (bCheckOrderExistInd)
bSelectBrFromOrd = false;
else
bSelectBrFromOrd = true;	
callback_populateBrokerDealerCombo(coBroker, bSelectBrFromOrd, HardPotInd);	
}
}
else
callback_populateBrokerDealerCombo(coBroker, bSelectBrFromOrd, HardPotInd);
}
}
function CheckOrderExist(SMBRKId)
{
var theForm = document.forms["frmMain"];
var InvestorId = theForm.elements["hidInvestorId"].value;
var co;
if ( (SMBRKId.length > 0) && (InvestorId.length > 0) )
{
co = RSExecute('rs_bookbuild_indication_server.asp', 'js_GetEquityOrder', SMBRKId, InvestorId, 0, 0);
if (co.return_value != "")
return true;
else
return false;
}
return false;
}
function callback_populateBrokerDealerCombo(co, bSelectBrFromOrd, HardPotInd) 
{
var cbElement;
var strResult;
var aryRecords;
var strRecord;
var strLabel;
var strValue;
var aryData;
var hidSmId;
strResult = co.return_value;
theForm = document.forms["frmMain"];
cbElement = theForm.elements["selBrokerDealer"];
cbElement.options.length = 0;
hidSmId = theForm.elements["hidOrdSMBDId"];
if (strResult != "")
{
aryRecords = strResult.split("\t");
if (aryRecords.length-1 > 1)
cbElement.options[cbElement.options.length]= new Option("none selected", "0");
for (i=0; i < aryRecords.length-1; i++)
{
aryData = aryRecords[i].split("\b");
strValue = aryData[0];
strLabel = aryData[1];
cbElement.options[cbElement.options.length]= new Option(strLabel, strValue);
if ( bSelectBrFromOrd && hidSmId.value == strValue)
{
if (aryRecords.length-1 > 1)
cbElement.selectedIndex=i + 1;	
else
cbElement.selectedIndex=i;	
}
}
if (!bSelectBrFromOrd)
{
if (HardPotInd == 'True')
{
if (aryRecords.length-1 > 1)
cbElement.selectedIndex=1;
else
cbElement.selectedIndex=0;
}
else
cbElement.selectedIndex=0;
}
OnBrokerSelect(false); 
} 
else
{
OnBrokerSelect(false);
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
function OnBrokerSelect(bCheckOrderExistInd)
{
var theForm = document.forms["frmMain"];
var DealType;
var cbElement = theForm.elements["selBrokerDealer"];
var theSelected = cbElement.selectedIndex;
var SMBRKId;
var InvestorId;
var hidOrdTrnId = theForm.elements["hidOrdTrnId"];
var hidOrdSMBDId = theForm.elements["hidOrdSMBDId"];
if ( (theSelected >= 0) && (cbElement.options[theSelected].value != 0) )
{
SMBRKId = cbElement[theSelected].value;
if (bCheckOrderExistInd)
{
var cbTrnElement = theForm.elements["selTranche"];
var theSelectedTrn = cbTrnElement.selectedIndex; 
if ((cbTrnElement.options[theSelectedTrn].value == 0) )
return;
var strValues = cbTrnElement.options[theSelectedTrn].value;
var aryValues = strValues.split(";");
var HardPotInd = aryValues[1];
var TrnNm =[2];
var TrnId =[0];
if (HardPotInd == 'True' || (hidOrdTrnId.value == TrnId && hidOrdSMBDId.value == SMBRKId))
{
theForm.elements["hidSmId"].value = SMBRKId;
nPrevSelectBrkIndex = theSelected;
}
else
{
if (CheckOrderExist(SMBRKId))
{
theForm.elements["selBrokerDealer"].selectedIndex = nPrevSelectBrkIndex;
var sStatusMsg = new String;
sStatusMsg = sStatusMsg + "Error: Cannot changed broker<br>";
var sMsg = "Indication already exists in " + TrnNm;
sStatusMsg = sStatusMsg + "<li><a href='JavaScript:self.window.opener.document.frmMain.selBrokerDealer.focus()'>Broker</a> " + sMsg + "<br>";
showErrorMessage(sStatusMsg);
return;
}
else
{
theForm.elements["hidSmId"].value = SMBRKId;
nPrevSelectBrkIndex = theSelected;
}
}
}
else
{
nPrevSelectBrkIndex = theSelected;
theForm.elements["hidSmId"].value = SMBRKId;
} 
}
else
{
theForm.elements["hidSmId"].value = "";
} 
}
function onChangeInvDesiredHedge(position)
{
var theForm = document.forms["frmMain"];
var selInvDesiredHedgeType = theForm.elements["selInvDesiredHedgeType" + position.toString()];
var offset = position + 1
for(var i=offset; i<(offset + 5); i++)
{
if(theForm.elements["pctTxtDeltaLimit" + i.toString()] != null)
{
theForm.elements["pctTxtDeltaLimit" + i.toString()].value = '';
if (selInvDesiredHedgeType.value == 0 || selInvDesiredHedgeType.value == 1)
{
theForm.elements["pctTxtDeltaLimit" + i.toString()].disabled = true;
}
if (selInvDesiredHedgeType.value == 2)
{
theForm.elements["pctTxtDeltaLimit" + i.toString()].disabled = false;
}
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
var sHeight = "height=" + (150 + (1 * 22));
var sWindowParms = "toolbar=no,location=no,directories=no,scrollbars=yes,resizable=yes,width=450,center=yes,dependent=yes," + sHeight;
var sChildName = window.name + "Errors";
popupError = window.open("",sChildName,sWindowParms);
popupError.document.open();
popupError.document.write(sMessage);
popupError.document.close();
popupError.focus();
}
