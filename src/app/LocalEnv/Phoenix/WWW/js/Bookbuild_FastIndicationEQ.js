<!-- 
RSEnableRemoteScripting("/_ScriptLibrary");
var bCancelOrderInd = false;
var bIndTypeChangedInd = false;
var bDealPricingBeforeRule2790 = false;
function onPageLoad()
{
ConfirmRemoteScripting();
RSCallObject_wait(); 
var frm = document.frmMain;
if(frm.hidEditInd.value == 'True')
{
frm.hidStepInd.value = frm.hidEditStepInd.value;
showHideStepControls(frm);
}	
if (frm.hidRecoverModeInd.value == '0')
{
changeIndType(document.frmMain);
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
loadFrqFields();
setMarket();
var lPrdId = frm.hidDefPrdId.value;
if ( frm.selProduct )
{
var idx = frm.selProduct.selectedIndex;
lPrdId = frm.selProduct.options[idx].value;
}
UpdateFilePrice(lPrdId)
bIndTypeChangedInd = false;
loadInitialIOIValues() ;
if(frm.selInvDesiredHedgeType != undefined)
{
if (frm.elements["hidEnableMLSalesWorkSheet"].value)
frm.selInvDesiredHedgeType.value = 1; 
else
frm.selInvDesiredHedgeType.value = 0; 
if (frm.selInvDesiredHedgeType.value != '2')
{
for(var i=1; i<6; i++)
{
frm.elements["pctTxtLimitDeltaLimit" + i.toString()].value = '';
frm.elements["pctTxtLimitDeltaLimit" + i.toString()].disabled = true;
}
}
} 
var chkBoxEnableAllocation = document.getElementById("chkEnableAllocationOnSwap");
if(chkBoxEnableAllocation)
{
var txtCounterPartySwap = document.getElementById("txtCounterPartySwapNm");
var bHasText = txtCounterPartySwap.value.length > 0;
chkBoxEnableAllocation.checked = bHasText;
document.getElementById("hidEnableAllocationOnSwap").value = bHasText;
txtCounterPartySwap.disabled = !bHasText;
}
else
{
document.getElementById("hidEnableAllocationOnSwap").value = false;
}
}
function ConfirmRemoteScripting()
{ 
var enabled = false;
context = "Confirm";
co = RSExecute('rs_prospectus_contacts_send.asp', 'js_RemoteScriptingEnabled', RSShowResult, RSShowError, context);
}
function RSShowResult(co)
{
var frm = document.frmCMAddDocument;
var sRet = co.return_value
switch (co.context)
{
case "Confirm":
if (!sRet)
alert("Remote scripting not enabled");
break;
}
}
function RSShowError(co)
{
msg = "The following error occurred during the " 
msg = msg + co.context
msg = msg + " remote scripting call:\n"
msg = msg + co.message
alert(msg);
}
function CheckConditionallyRequiredFields( frm, arrFieldsInError )
{
var arrMoreErrors = new Array();
if (!IsCommentOrder(frm))
ValidateFRQ( arrMoreErrors );
else if (frm.elements["hidFrqRequired"] )
frm.elements["iFrqType"].value = "";	
ValidateZeroIndication(frm, arrMoreErrors);	
if ( frm.hidStepInd.value=="1" )
{
if(frm.hidIssueTypeCode.value == 'CB' || frm.hidIssueTypeCode.value == 'CP')
ValidateEquityEntryConvertible(frm, arrMoreErrors);	
else
ValidateEquityEntry(frm, arrMoreErrors);
}
var sFeedBack = (frm.txtFeedback) ? frm.txtFeedback.value : "";
if (sFeedBack.length > 2000)
{
var arrError = FieldErrorInfo("txtFeedback", new String, "txtFeedback", "txtFeedback", "Feedback");
arrError[2] = "Your comment length is " + sFeedBack.length + " characters. The maximum comment length is 2,000. Please reduce the comment size and try again.";
arrMoreErrors[arrMoreErrors.length] = arrError; 
}	
if ( !ValidateSalesPerson() )
{
var arrError = FieldErrorInfo("selSalesPerson", new String, "selSalesPerson", "selSalesPerson", "Sales Person");
arrError[2] = "Please select Sales Person";
arrMoreErrors[arrMoreErrors.length] = arrError; 
}	
if( !ValidateERI() )
{
var arrError = FieldErrorInfo("rdoERI", new String, "rdoERI", "rdoERI", "ERI");
arrError[2] = "You must respond Yes to the ERI attestation in order to add/edit the indication amount or limit price.";
arrMoreErrors[arrMoreErrors.length] = arrError; 
}
return (arrMoreErrors);
} 
function SaveChanges(frm)
{
getStepInd(frm);
if (bIndTypeChangedInd && frm.hidEditInd.value=="True")
{
var ret = confirm("You've changed the indication type. Are you sure that the amounts and limits are correct?");
if (!ret)
return;
}
if (document.all("selLimitCurrency"))
{
var sLimitType = frm.selLimitCurrency.options[frm.selLimitCurrency.selectedIndex].value;
frm.hidLimitType.value = sLimitType.split(";")[0];
frm.hidLimitTypeId.value = sLimitType.split(";")[1];
}
var sIOIType = frm.selCurrency.options[frm.selCurrency.selectedIndex].value;
frm.hidIOIType.value = sIOIType.split(";")[0];
frm.hidIOITypeId.value = sIOIType.split(";")[1];
frm.action = "/asp/util_submit_action.asp";
frm.hidAction.value = "SaveFromSalesWksht";
frm.submit(); 
}
function submitPage( frm, action, FromConfirmPopUp )
{
if (FromConfirmPopUp !="FROMCOMFIRMATIONPOPUP" && frm.hidShowConfirmationPopup.value == 1)
{
OpenConfirmationPopup("", action);
return;
}	
unSetMarket();
switch (action)
{
case "Add and Send" :
if(ValidateForm(frm))
{
var nCount = 0 ;
var oElem = document.getElementById("hidProspectusEmailAddr") ;
var arrCheck = document.getElementsByName("chkSendProspectus");
if(arrCheck)
{
for(var i = 0; i < arrCheck.length; i++)
{
if(arrCheck[i].checked == true)
{
nCount = nCount + 1 ;
var sEmail = arrCheck[i].email ;
if(oElem) oElem.value = oElem.value + sEmail + ";" ;
}
}
}
if(nCount == 0)
{
alert("Please select a contact to send the eProspectus.") ;
return ;
}
SaveChanges(frm);
}
break;
case "Add and SendHC":
if(ValidateForm(frm))
{
if (SendProspectusHC())
{
SaveChanges(frm);
}
}
break;
case "savechanges" :
if(ValidateForm(frm))
{
if(document.getElementById("chkEnable2790Partial"))
{
if (!document.getElementById("chkEnable2790Partial").checked) 
{
alert("Please read and confirm the Partial 2790 constraint.") ; 
return ;
}
}
if (document.getElementById("txtPortfolioMgrNm"))
{
var vPortfolioMgrNm = document.getElementById("txtPortfolioMgrNm").value;
vPortfolioMgrNm = vPortfolioMgrNm.replace(/^\s*|\s*$/g,"");
if(document.getElementById("hidPortfolioMgrBlockIoiInd").value == 'True' && vPortfolioMgrNm == '')
{
alert('Please enter the Name of the PM at this account'); 
return; 
}
}
SaveChanges(frm);
}
break;
case "cancel" :
if(ValidateForm(frm))
{
frm.action = "/asp/util_submit_action.asp";
frm.hidAction.value = "Cancel";
frm.submit(); 
}
break;
case "reinstate" :
bCancelOrderInd = true;
if(ValidateForm(frm))
{
frm.action = "/asp/util_submit_action.asp";
frm.hidAction.value = "Reinstate";
frm.submit(); 
}
break;
}
setMarket();	
}
function getStepInd(frm)
{
return frm.hidStepInd.value;
}
function showHideArea(areaShowName, areaHidName, areaHidName2)
{
if(areaShowName != '')
{
var elthis = eval(areaShowName)	
elthis.style.display = '';
} 
if(areaHidName != '')
{
var elthis2 = eval(areaHidName) 
elthis2.style.display = 'none'; 
} 
if(areaHidName2 != '')
{
var elthis3 = eval(areaHidName2);
elthis3.style.display = 'none';
}
}
function changeProduct(frm)
{
var idx = frm.selProduct.selectedIndex;
var lPrdId = frm.selProduct.options[idx].value;
frm.hidProductName0.value = frm.selProduct.options[idx].text; 
for(var i=1; i< arrProducts.length; i++) 
{
if(arrProducts[i][0] == lPrdId)
{
frm.hidDefPrdId.value = arrProducts[i][0];
frm.hidDefCcyId.value = arrProducts[i][2];
frm.selIndType.length = 0;
var counter = 0;
if(arrProducts[i][3] == 'True')
{
var opt = new Option(getDocumentElement("hidMsgProduct").value, 'P');
frm.selIndType.options[counter++] = opt; 
}
if(arrProducts[i][4] == 'True')
{
var opt = new Option(getDocumentElement("hidMsgCash").value, 'C');
frm.selIndType.options[counter++] = opt; 
}
if(arrProducts[i][5] == 'True')
{
var opt = new Option(getDocumentElement("hidMsgFace").value, 'F');
frm.selIndType.options[counter++] = opt; 
} 
changeIndType(frm);
var temp = eval("prodName");
temp.innerText = arrProducts[i][1];
UpdateFilePrice(lPrdId);
break;
}
}
}
function changeInvDesiredHedge(frm)
{
if(frm.selInvDesiredHedgeType.value == '0')
{
for(var i=1; i<6; i++)
{
frm.elements["pctTxtLimitDeltaLimit" + i.toString()].value = '';
frm.elements["pctTxtLimitDeltaLimit" + i.toString()].disabled = true;
}	
}
else if (frm.selInvDesiredHedgeType.value == '1')
{
for(var i=1; i<6; i++)
{
frm.elements["pctTxtLimitDeltaLimit" + i.toString()].value = '';
frm.elements["pctTxtLimitDeltaLimit" + i.toString()].disabled = true;
}
}
else 
{
for(var i=1; i<6; i++)
{
frm.elements["pctTxtLimitDeltaLimit" + i.toString()].value = '';
if(frm.elements["curTxtLimitPremium" + i.toString()].disabled != true)
{
frm.elements["pctTxtLimitDeltaLimit" + i.toString()].disabled = false;
}
}
}
}
function changeIndType(frm)
{
if(frm.selIndType.value == 'C')
{
showHideArea('cashHeader', 'prodHeader', 'faceHeader');
showHideArea('currDropDown', 'prodName', '');
}
else if(frm.selIndType.value == 'F')
{
showHideArea('faceHeader', 'prodHeader', 'cashHeader');	
showHideArea('currDropDown', 'prodName', '');
}
else
{
showHideArea('prodHeader', 'cashHeader', 'faceHeader');	
showHideArea('prodName', 'currDropDown', '');
}
bIndTypeChangedInd = true;
} 
function changeStepInd(frm)
{
var stepInd = (getStepInd(frm)=="0") ? "1" : "0";
frm.hidStepInd.value = stepInd;
showHideStepControls(frm);
if ( stepInd==0 )
{
clearValues(frm);
}
}
function showHideStepControls(frm)
{
if ( getStepInd(frm)==0 )
{
getDocumentElement("hrefMultLink").innerText = frm.hidMultipleLimits.value + "+";
showHideArea('', 'multEntry2', '');	
showHideArea('', 'multEntry3', '');	
showHideArea('', 'multEntry4', '');	
showHideArea('', 'multEntry5', '');	
}
else
{
getDocumentElement("hrefMultLink").innerText = frm.hidSingleLimit.value + "+";
showHideArea('multEntry2', '', '');	
showHideArea('multEntry3', '', '');	
showHideArea('multEntry4', '', '');	
showHideArea('multEntry5', '', '');	
}
}
function clearValues(frm)
{
for(var i=2; i<6; i++)
{
frm.elements["iTxtAmount" + i.toString()].value = '';
frm.elements["curTxtLimitCoupon" + i.toString()].value = '';
if(frm.hidIssueTypeCode.value == 'CB' || frm.hidIssueTypeCode.value == 'CP')
{
if ( frm.elements["curTxtLimitPrice" + i.toString()] )
frm.elements["curTxtLimitPrice" + i.toString()].value = ''; 
frm.elements["curTxtLimitPremium" + i.toString()].value = ''; 
}
} 
}
function ValidateZeroIndication(frm, arr_MoreErrors)
{
if (bCancelOrderInd)
return;
var bZeroInd = true;
for(var i=1; i<6; i++)
{
lAmount = new Number(frm.elements["iTxtAmount" + i.toString()].value.replace(/(\,)/g, ""));
if(lAmount > 0)
bZeroInd = false;	
}
if(bZeroInd && (frm.txtFeedback.value.length == 0))
{
var arrError = FieldErrorInfo("iTxtAmount1", new String, "", "iTxtAmount1", "Amount");
arrError[2] = "You must enter feedback to submit a zero or null indication";
arr_MoreErrors[arr_MoreErrors.length] = arrError; 
}
}
function ValidateEquityEntry(frm, arr_MoreErrors)
{
var lLastAmount = 0;
var lAmount = 0;
var dbLastLimit = 0;
var dbLimit = 0;
var bAscAmount;
var bDiscountLimit = false;
if (document.all("selLimitCurrency"))
{
var sLimitType = frm.selLimitCurrency.options[frm.selLimitCurrency.selectedIndex].value;
var lValue = sLimitType.split(";")[0];
if(lValue == "D")
bDiscountLimit = true; 
}
for (var i=1; i<6; i++)
{
var sAmtString = "iTxtAmount" + i.toString();
var sLimitString = "curTxtLimitCoupon" + i.toString();
lAmount = new Number(frm.elements[sAmtString].value.replace(/(\,)/g, ""));
dbLimit = new Number(frm.elements[sLimitString].value.replace(/(\,)/g, ""));
if( dbLimit == 0 )
dbLimit = (bDiscountLimit) ? 0 : 9999999999;
if (i == 1)
{
lLastAmount = lAmount; 
dbLastLimit = dbLimit; 
}
else
{
if (i==2)
bAscAmount = lAmount > lLastAmount; 
if(lAmount > 0)
{ 
if (bAscAmount)
{
if (lAmount <= lLastAmount)
{
var arrError = FieldErrorInfo(sAmtString, new String, "", sAmtString, "Amount");
arrError[2] = "If the first two Amounts are in ascending order, all Amounts must be in ascending order";
arr_MoreErrors[arr_MoreErrors.length] = arrError; 
}
if (!bDiscountLimit && dbLimit >= dbLastLimit && (lAmount != 0 && lLastAmount != 0))
{
var arrError = FieldErrorInfo(sLimitString, new String, "", sLimitString, "Limit Price");
arrError[2] = "If Amount is in ascending order, Limit price must be in descending order";
arr_MoreErrors[arr_MoreErrors.length] = arrError;
}
else if (bDiscountLimit && dbLimit <= dbLastLimit && (lAmount != 0 && lLastAmount != 0))
{
var arrError = FieldErrorInfo(sLimitString, new String, "", sLimitString, "Limit Price");
arrError[2] = "If Amount is in ascending order, Discount Limit price must be in ascending order";
arr_MoreErrors[arr_MoreErrors.length] = arrError;
}
}
else
{
if (lAmount >= lLastAmount)
{
var arrError = FieldErrorInfo(sAmtString, new String, "", sAmtString, "Amount");
arrError[2] = "If the first two Amounts are in descending order, all Amounts must be in descending order";
arr_MoreErrors[arr_MoreErrors.length] = arrError; 
}
if (!bDiscountLimit && dbLimit <= dbLastLimit && (lAmount != 0 && lLastAmount != 0))
{
var arrError = FieldErrorInfo(sLimitString, new String, "", sLimitString, "Limit Price");
arrError[2] = "If Amount is in descending order, Limit price must be in ascending order";
arr_MoreErrors[arr_MoreErrors.length] = arrError;
}
else if (bDiscountLimit && dbLimit >= dbLastLimit && (lAmount != 0 && lLastAmount != 0))
{
var arrError = FieldErrorInfo(sLimitString, new String, "", sLimitString, "Limit Price");
arrError[2] = "If Amount is in descending order, Discount Limit price must be in descending order";
arr_MoreErrors[arr_MoreErrors.length] = arrError;
}	
} 
lLastAmount = lAmount;
dbLastLimit = dbLimit;
}
}	
}
}
function ValidateEquityEntryConvertible(frm, arr_MoreErrors)
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
var bAscPrice;
var bAscCoupon;
var bAscPremium;
var bValidatePrice = true;
var bValidateOrder = true;
var bPriceExists = false;
var bCouponExists = false;
var bPremiumExists = false;
for (var i=1; i<6; i++)
{
var sAmtString = "iTxtAmount" + i.toString();
var sPriceString = "curTxtLimitPrice" + i.toString();
var sCouponString = "curTxtLimitCoupon" + i.toString();
var sPremiumString = "curTxtLimitPremium" + i.toString();
var sAmt = frm.elements[sAmtString].value;
if (sAmt.length > 0)
{
if ( frm.elements[sPriceString] )
{
dbPrice = new Number(frm.elements[sPriceString].value.replace(/(\,)/g, ""));
if (dbPrice != 0)
bPriceExists = true;
}
dbCoupon = new Number(frm.elements[sCouponString].value.replace(/(\,)/g, ""));
if (dbCoupon != 0)
bCouponExists = true;
dbPremium = new Number(frm.elements[sPremiumString].value.replace(/(\,)/g, ""));
if (dbPremium != 0)
bPremiumExists = true;
} 
}
if (!bPriceExists && !bCouponExists && !bPremiumExists)
bValidateOrder = true;
else if (bPriceExists && bCouponExists && bPremiumExists)
bValidateOrder = false;
else
bValidateOrder = bPriceExists ^ bCouponExists ^ bPremiumExists;
for (var i=1; i<6; i++)
{
var sAmtString = "iTxtAmount" + i.toString();
var sPriceString = "curTxtLimitPrice" + i.toString();
var sCouponString = "curTxtLimitCoupon" + i.toString();
var sPremiumString = "curTxtLimitPremium" + i.toString();
var sAmt = frm.elements[sAmtString].value;
if (sAmt.length > 0)
{
lAmount = new Number(frm.elements[sAmtString].value.replace(/(\,)/g, ""));
if ( frm.elements[sPriceString] )
{
dbPrice = new Number(frm.elements[sPriceString].value.replace(/(\,)/g, ""));
}
else
{
bValidatePrice = false;
dbPrice = 0;
}
dbCoupon = new Number(frm.elements[sCouponString].value.replace(/(\,)/g, ""));
dbPremium = new Number(frm.elements[sPremiumString].value.replace(/(\,)/g, ""));
if (dbPrice == 0)
dbPrice = 9999999999;
if (frm.elements[sPremiumString].value.length > 0)
dbPremium = new Number(frm.elements[sPremiumString].value.replace(/(\,)/g, ""));
else
dbPremium = 9999999999; 
if (i == 1)
{
lLastAmount = lAmount;
dbLastPrice = dbPrice;
dbLastCoupon = dbCoupon;
dbLastPremium = dbPremium; 
}
else
{
if (i == 2)
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
var arrError = FieldErrorInfo(sAmtString, new String, "", sAmtString, "Amount");
arrError[2] = "If the first two Amounts are in ascending order, all Amounts must be in ascending order";
arr_MoreErrors[arr_MoreErrors.length] = arrError;
}
}
else
{
if (lAmount >= lLastAmount)
{
var arrError = FieldErrorInfo(sAmtString, new String, "", sAmtString, "Amount");
arrError[2] = "If the first two Amounts are in descending order, all Amounts must be in descending order";
arr_MoreErrors[arr_MoreErrors.length] = arrError;
}
}
if (bValidateOrder)
{
if(lAmount > 0)
{
if ( bValidatePrice ) 
{
if (dbPrice == dbLastPrice && dbCoupon == dbLastCoupon && dbPremium == dbLastPremium)
{
var arrError = FieldErrorInfo(sCouponString, new String, "", sPriceString, "Price (% of Par)");
arrError[2] = "Only one of Price (% of Par), Coupon or Premium can have the same value as its predecessor";
arr_MoreErrors[arr_MoreErrors.length] = arrError;
}
}
else
{
if (dbCoupon == dbLastCoupon && dbPremium == dbLastPremium)
{
var arrError = FieldErrorInfo(sCouponString, new String, "", sCouponString, "Coupon");
arrError[2] = "Only one of Coupon or Premium can have the same value as its predecessor";
arr_MoreErrors[arr_MoreErrors.length] = arrError;
}
}
if ( bValidatePrice ) 
{
if ( bAscAmount == bAscPrice )
{
var arrError = FieldErrorInfo(sPriceString, new String, "", sPriceString, "Price (% of Par)");
arrError[2] = "The Amount and Price (% of Par) values must be entered in inverse order. Amount ascending and Price (% of Par) descending or Amount descending and Price (% of Par) ascending.";
arr_MoreErrors[arr_MoreErrors.length] = arrError;
}
if (bAscPrice)
{
if (!(isNaN(dbPrice) || isNaN(dbLastPrice)) && (dbPrice < dbLastPrice))
{
var arrError = FieldErrorInfo(sPriceString, new String, "", sPriceString, "Price (% of Par)");
arrError[2] = "If the first two Prices are in ascending order, all prices must be in ascending order";
arr_MoreErrors[arr_MoreErrors.length] = arrError;
}
}
else
{
if (dbPrice > dbLastPrice)
{
var arrError = FieldErrorInfo(sPriceString, new String, "", sPriceString, "Price (% of Par)");
arrError[2] = "If the first two Prices are in descending order, prices must be in descending order";
arr_MoreErrors[arr_MoreErrors.length] = arrError;
}
}
}
if (bAscCoupon)
{
if (dbCoupon < dbLastCoupon && (lAmount != 0 && lLastAmount != 0))
{
var arrError = FieldErrorInfo(sCouponString, new String, "", sCouponString, "Coupon");
arrError[2] = "If the first two Coupons are in ascending order, all Coupons must be in ascending order";
arr_MoreErrors[arr_MoreErrors.length] = arrError;
}
}
else
{
if (dbCoupon > dbLastCoupon && (lAmount != 0 && lLastAmount != 0))
{
var arrError = FieldErrorInfo(sCouponString, new String, "", sCouponString, "Coupon");
arrError[2] = "If the first two Coupons are in decending order, all Coupons must be in decending order";
arr_MoreErrors[arr_MoreErrors.length] = arrError;
}
}
if (bAscPremium)
{
if ( (dbPremium < dbLastPremium) && (lAmount != 0 && lLastAmount != 0))
{ 
var arrError = FieldErrorInfo(sPremiumString, new String, "", sPremiumString, "Premium");
arrError[2] = "If the first two Premiums are in ascending order, all Premiums must be in ascending order";
arr_MoreErrors[arr_MoreErrors.length] = arrError;
}
}
else
{
if ( (dbPremium > dbLastPremium) && (lAmount != 0 && lLastAmount != 0))
{
var arrError = FieldErrorInfo(sPremiumString, new String, "", sPremiumString, "Premium");
arrError[2] = "If the first two Premiums are in decending order, all Premiums must be in decending order";
arr_MoreErrors[arr_MoreErrors.length] = arrError;
}
}
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
if (elthis.style.display == 'none')
{
elthis.style.display = '';
if (imgObj != null)
imgObj.src = "../images/collapse.gif";
}
else
{
elthis.style.display = 'none';
if (imgObj != null)
imgObj.src = "../images/expand.gif";
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
function setMarket()
{
if (document.frmMain.curTxtLimitPrice1 != null && document.frmMain.curTxtLimitPrice1.value.length == 0)
document.frmMain.curTxtLimitPrice1.value = document.frmMain.hidMarket.value;	
if (document.frmMain.curTxtLimitCoupon1 != null && document.frmMain.curTxtLimitCoupon1.value.length == 0)
document.frmMain.curTxtLimitCoupon1.value = document.frmMain.hidMarket.value;	
if (document.frmMain.curTxtLimitPremium1 != null && document.frmMain.curTxtLimitPremium1.value.length == 0)
document.frmMain.curTxtLimitPremium1.value = document.frmMain.hidMarket.value; 
}
function unSetMarket()
{
if (document.frmMain.curTxtLimitPrice1 != null && document.frmMain.curTxtLimitPrice1.value == document.frmMain.hidMarket.value)
document.frmMain.curTxtLimitPrice1.value = "";	
if (document.frmMain.curTxtLimitCoupon1 != null && document.frmMain.curTxtLimitCoupon1.value == document.frmMain.hidMarket.value)
document.frmMain.curTxtLimitCoupon1.value = "";	
if (document.frmMain.curTxtLimitPremium1 != null && document.frmMain.curTxtLimitPremium1.value == document.frmMain.hidMarket.value)
document.frmMain.curTxtLimitPremium1.value = ""; 
}
function IsCommentOrder(frm)
{
var bCommentOrder = true;
var lAmount;
for(var i=1; i<6; i++)
{
lAmount = new Number(frm.elements["iTxtAmount" + i.toString()].value.replace(/(\,)/g, ""));
if(lAmount > 0)
{
bCommentOrder = false;
break;
}	
}
return bCommentOrder;
}	
function OpenConfirmationPopup(sNavType, action)
{
var sUrl = "BookBuild_Indications_Confirmation_popup.asp?navType=" +
String(sNavType) + "&action=" + String(action) + "&navfrom=SalesWorkSheet";
var sStyle = "scrollbars=yes,menubar=no,width=600,height=400,toolbar=no,status=no,titlebar=no";
var popupGeneral = window.open( sUrl, 'ConfirmationPopup', sStyle);
popupGeneral.focus();
}
function UpdateFilePrice(lPrdId)
{
var divFilePrice = getDocumentElement("divFilePrice");
if (divFilePrice) 
{
var hidIssueTypeCode = getDocumentElement("hidIssueTypeCode");
if ( hidIssueTypeCode.value=="CB" || hidIssueTypeCode.value=="CP" )
{
divFilePrice.innerHTML = formatFixedDecimalAmountString(sBasePrdEstOfferPx,2) + " " + arrProducts[1][6];
}
else
{
divFilePrice.innerHTML = GetProductFilePrice(lPrdId);
}
}	
}
function GetProductFilePrice( lPrdID )
{
var sPrice1 = "0";
var sPrice2 = "";
var sPrdCcy = "";
var sFxRate = "";
var sBasePrdFxRate = "";
var sConversionRatio = "0";
for ( var i=0; i<arrProducts.length; i++ )
{
if ( arrProducts[i][0]==lPrdID )
{
if (document.frmMain.hidIsDealPriced.value == "1")
{
sPrice1 = isNaN(sBasePrdOfferPx) ? 0 : sBasePrdOfferPx;	
sFxRate = arrProducts[i][11]; 
sBasePrdFxRate = sBasePrdFxRateAtOffering; 
}
else
{
if ( arrProducts[i][8]=="True" ) 
{
sPrice1 = isNaN(sBasePrdCurrFilePxLo) ? 0 : sBasePrdCurrFilePxLo; 
sPrice2 = isNaN(sBasePrdCurrFilePxHi) ? 0 : sBasePrdCurrFilePxHi; 
sFxRate = arrProducts[i][10]; 
sBasePrdFxRate = sBasePrdFxRateAtFiling;
} 
else
{
sPrice1 = isNaN(sBasePrdFilePx) ? 0 : sBasePrdFilePx;	
sFxRate = arrProducts[i][10]; 
sBasePrdFxRate = sBasePrdFxRateAtFiling; 
}	
}
sPrdCcy = arrProducts[i][6];
sConversionRatio = arrProducts[i][9];
if ( sFxRate=="" ) {
sFxRate = arrProducts[i][9]; 
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
if (document.frmMain.hidIsDealPriced.value == "1")
{
return sPrice1 + " " + sPrdCcy;
}
else
{
if ( arrProducts[i][8]=="True" ) 
{
sPrice2 = GetPriceInTermsOfCurrency( sPrice2, sBasePrdFxRate, sFxRate, sConversionRatio );
return sPrice1 + " - " + formatFixedDecimalAmountString( sPrice2, 2 ) + " " + sPrdCcy; 
}
else
{
return sPrice1 + " " + sPrdCcy;
}
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
function ValidateSalesPerson()
{
if ( document.frmMain.selSalesPerson )
{
var idx = document.frmMain.selSalesPerson.selectedIndex;
var sAeUpId = document.frmMain.selSalesPerson.options[idx].value;
if ( sAeUpId=="0" )
return false;
document.frmMain.hidSalesId.value = sAeUpId;
}
return true;
}
function ValidateERI()
{
var oElem, aElem, bRet ;
if((document.frmMain.hidDisplayERI.value == "0") || (document.frmMain.rdoERI == null) )
{
return true ;
}
oElem = document.getElementById("hidPndgOrderId") ;
if ( (oElem.value == ""))
{	
if(IOIHasChanged() == false)
{
aElem = document.getElementsByName("rdoERI") ;
if ( aElem != null)
{
for(i = 0 ; i < aElem.length ; i++)
{
aElem[i].checked = false ;
}
}
}
}
if(IOIHasChanged() == false)
{
return true ;
}
oElem = document.frmMain.rdoERI[0] ;
if(oElem && (oElem.checked == false) )
{
bRet = false ;
}
else
{
bRet = true ;
}
return bRet ;
}
function IOIHasChanged()
{
var sAmtToken, sLimitToken ;
sAmtToken	= TokenizeFieldValues("iTxtAmount", 4) ;
sLimitToken = TokenizeFieldValues("curTxtLimitCoupon", 4) ;
if ( (sAmtToken == document.frmMain.hidOrigIOIAmt.value) && (sLimitToken == document.frmMain.hidOrigIOILimit.value) )
{
return false ;
}
else
{
return true ;
}
}
function loadInitialIOIValues()
{
var sAmtToken, sLimitToken ;
sAmtToken	= TokenizeFieldValues("iTxtAmount", 4) ;
sLimitToken = TokenizeFieldValues("curTxtLimitCoupon", 4) ;
if(document.frmMain.hidOrigIOIAmt) document.frmMain.hidOrigIOIAmt.value = sAmtToken;
if(document.frmMain.hidOrigIOILimit) document.frmMain.hidOrigIOILimit.value = sLimitToken;
}
function TokenizeFieldValues(sFieldName, nNumFields) 
{
var oElem, sElem, sTemp ;
sTemp = "" ;
for(i = 1 ; i <= nNumFields ; i++)
{
sElem = sFieldName + i ;
oElem = document.getElementById(sElem) ;
if(oElem) 
{
if((oElem.value).toUpperCase() != "MARKET") sTemp = sTemp + oElem.value ;
}
sTemp = sTemp + ";" ;
}
return sTemp ;
}
function sortColumns(sPar)
{
}
function chkSelectAllClicked()
{
var oChkSelectAll ;
oChkSelectAll = document.getElementById("chkSelectAll") ;
if(oChkSelectAll)
{
var bChecked = oChkSelectAll.checked ;
var arrCheck = document.getElementsByName("chkSendProspectus");
if(arrCheck)
{
for(var i = 0; i < arrCheck.length; i++)
{
arrCheck[i].checked = bChecked;
}
}
}
}
function SendProspectusHC()
{
var sUrl, sSubject, sBody, sEmailTo ;
var sCRLf, nCount ;
var sDealName, sRequestorName, oElem, sEmailAddresses, nIssId, nInvId;
nCount = 0 ;
sCRLf = "%0D%0A" ;
sEmailTo = "" ;
oElem = document.getElementById("hidProspectusEmailAddressHC") ;
if(oElem) sEmailTo = oElem.value;
sSubject = "Hard Copy Prospectus Request" ;
oElem = document.getElementById("hidInvestorId") ;
nInvId = oElem.value ;
oElem = document.getElementById("hidIssId") ;
nIssId = oElem.value ;
oElem = document.getElementById("hidIssName") ;
sDealName = oElem.value ;
sEmailAddresses = "" ;
sRequestorName = "" ;
oElem = document.getElementById("hidUserFirstName") ;
if(oElem) sRequestorName = sRequestorName + oElem.value ;
oElem = document.getElementById("hidUserLastName") ;
if(oElem) sRequestorName = sRequestorName + oElem.value ;
sBody = sRequestorName + " requests that the following contact(s) be sent a hard copy of the prospectus for " + sDealName + " deal" ;
sBody = sBody + sCRLf;
sBody = sBody + sCRLf;
var arrCheck = document.getElementsByName("chkSendProspectusHC");
var arrCheckFirstClass = document.getElementsByName("chkFirstClass");
var arrCheckOvernight = document.getElementsByName("chkOvernight");
if(arrCheck)
{
for(var i = 0; i < arrCheck.length; i++)
{
if(arrCheck[i].checked)
{
var bMode = "" ;
var sEmail = arrCheck[i].email ;
var sInvestor = arrCheck[i].investor_name
var sFirstName = arrCheck[i].contact_first_nm ;
var sLastName = arrCheck[i].contact_last_nm ;
var sStreet = arrCheck[i].str_nm ;
var sStreet2 = arrCheck[i].str_nm2 ;
var sStreet3 = arrCheck[i].str_nm3 ;
var sCity = arrCheck[i].city_nm ;
var sState = arrCheck[i].state_cd ;
var sZip = arrCheck[i].zip_cd ;
nCount = nCount + 1 ;
sBody = sBody + escape(sFirstName) + " " + escape(sLastName) ;
sBody = sBody + sCRLf;
if(sEmail != "")
{
sEmailAddresses = sEmailAddresses + sEmail + ";" ;
}
if(sInvestor != "")
{
sBody = sBody + escape(sInvestor) ;
sBody = sBody + sCRLf;
}
if(sStreet != "")
{
sBody = sBody + escape(sStreet) ;
sBody = sBody + sCRLf;
}
if(sStreet2 != "")
{
sBody = sBody + escape(sStreet2) ;
sBody = sBody + sCRLf;
}
if(sStreet3 != "")
{
sBody = sBody + escape(sStreet3) ;
sBody = sBody + sCRLf;
}
if(sCity != "" || sState != "" || sZip != "")
{
sBody = sBody + escape(sCity) + ", " + escape(sState) + " " + escape(sZip);
sBody = sBody + sCRLf;
}
sBody = sBody + "Delivery Method:" ;
if(arrCheckFirstClass)
{
if(arrCheckFirstClass[i].checked)
{
bMode = "1" ;
sBody = sBody + "FirstClass" ;
}
}
if(arrCheckOvernight)
{
if(arrCheckOvernight[i].checked)
{
if(bMode == "1") sBody = sBody + ", " ;
sBody = sBody + "Overnight" ;
bMode = "2" ;
}
}
if(bMode == "")
{
alert("You must choose a Delivery Method before you can send a hard copy.") ;
return false;
}
sBody = sBody + sCRLf + sCRLf;
}
}
}
if(nCount == 0) 
{
alert("Please select a contact to send the hardcopy.") ;
return false;
}
sUrl = "mailto:" + sEmailTo + "?subject=" + sSubject + "&body=" + sBody ;
window.open(sUrl) ;
var co; 
co = RSExecute('rs_prospectus_contacts_send.asp', 'js_SendProsectusHardCopy', nIssId, sEmailAddresses, nInvId);
var strData = co.return_value;
return true;
}
function chkSelectAllClickedHC()
{
var oChkSelectAll ;
oChkSelectAll = document.getElementById("chkSelectAllHC") ;
if(oChkSelectAll)
{
var bChecked = oChkSelectAll.checked ;
var arrCheck = document.getElementsByName("chkSendProspectusHC");
if(arrCheck)
{
for(var i = 0; i < arrCheck.length; i++)
{
arrCheck[i].checked = bChecked;
}
}
}
}
function chkSelectAllFirstClassClicked()
{
var oChkSelectAll ;
oChkSelectAll = document.getElementById("chkSelectAllFirstClass") ;
if(oChkSelectAll)
{
var bChecked = oChkSelectAll.checked ;
var arrCheck = document.getElementsByName("chkFirstClass");
if(arrCheck)
{
for(var i = 0; i < arrCheck.length; i++)
{
arrCheck[i].checked = bChecked;
}
}
}
oChkSelectAll = document.getElementById("chkSelectAllOvernight") ;
oChkSelectAll.checked = false ;
if(oChkSelectAll)
{
var bChecked = oChkSelectAll.checked ;
var arrCheck = document.getElementsByName("chkOvernight");
if(arrCheck)
{
for(var i = 0; i < arrCheck.length; i++)
{
arrCheck[i].checked = bChecked;
}
}
}
}
function chkSelectAllOvernightClicked()
{
var oChkSelectAll ;
oChkSelectAll = document.getElementById("chkSelectAllOvernight") ;
if(oChkSelectAll)
{
var bChecked = oChkSelectAll.checked ;
var arrCheck = document.getElementsByName("chkOvernight");
if(arrCheck)
{
for(var i = 0; i < arrCheck.length; i++)
{
arrCheck[i].checked = bChecked;
}
}
}
oChkSelectAll = document.getElementById("chkSelectAllFirstClass") ;
oChkSelectAll.checked = false ;
if(oChkSelectAll)
{
var bChecked = oChkSelectAll.checked ;
var arrCheck = document.getElementsByName("chkFirstClass");
if(arrCheck)
{
for(var i = 0; i < arrCheck.length; i++)
{
arrCheck[i].checked = bChecked;
}
}
}
}
function chkFirstClassClicked(nPos)
{
var sElem ;
sElem = "chkOvernight" + nPos ;
var oElem = document.getElementById(sElem) ;
if(oElem) oElem.checked = false ;
}
function chkOvernightClicked(nPos)
{
var sElem ;
sElem = "chkFirstClass" + nPos ;
var oElem = document.getElementById(sElem) ;
if(oElem) oElem.checked = false ;
}
function ShowiProsContactDetails(contactID, invID)
{
var sURL, sInstInvID;
sInstInvID = invID;
sURL = "inst_inv_ipros_acct_contact_details.asp?" ;
sURL = sURL + "CONTACTID=" ;
sURL = sURL + contactID ;
sURL = sURL + "&INSTINVID=" ;
sURL = sURL + escape(sInstInvID) ;
sURL = sURL + "&ONEOFFCONTACT=1" ;
var sStyle = "width=500,height=700,scrollbars=0,resizable=1,left=5,top=5";
var winPopup = window.open( sURL, '', sStyle);
}
function chkEnableAllocationOnSwapClick()
{
var chkBoxEnableAllocation = document.getElementById("chkEnableAllocationOnSwap") ;
var txtCounterPartySwap = document.getElementById("txtCounterPartySwapNm");
txtCounterPartySwap.disabled = !chkBoxEnableAllocation.checked;
document.getElementById("hidEnableAllocationOnSwap").value = chkBoxEnableAllocation.checked;
}
