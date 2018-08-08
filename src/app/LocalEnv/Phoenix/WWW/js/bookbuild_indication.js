RSEnableRemoteScripting("/_ScriptLibrary")
var sCreateAlias = '<xsl:value-of select="$RC_IOI_CREATE_ALIAS"/>'
var sEditAlias = '<xsl:value-of select="$RC_IOI_EDIT_ALIAS"/>'
var sChange = '<xsl:value-of select="$RC_IOI_CHANGE"/>'
var sAddIndicationToMasterBook = '<xsl:value-of select="$RC_BOOKBUILD_ADD_INDICATION_TO_MASTER_BOOK"/>'
var sViewTotalIndicationIn = 'View total indication in '
var InvestorChangeLink = "<a href=\"javascript:OnReloadInvestor();\">"+sChange+"</a>";
var RegionChangeLink = "<a href=\"javascript:OnReloadRegion();\">C"+sChange+"</a>";
var SalesChangeLink = "<a href=\"javascript:OnReloadSales();\">"+sChange+"</a>";
var SalesRegionChangeLink = "<a href=\"javascript:OnReloadSalesRegion();\">"+sChange+"</a>";
var ViewTotalLink = "<a href=\"javascript:OpenTotalIOIPopup(";
var PopBookLabel = "<div class='txtBold'>"+sAddIndicationToMasterBook+"</div>";
var AliasPopupStyle = "width=400,height=180,toolbar=no,menubar=no,location=no,directories=no"
var InvestorList = "";
var RegionList = "";
var SalesList = "";
var TraderList = "";
var SalesRegionList = "";
var bAllRegions=false;
var HardPotInd = "True";
var CurrListInSrchRslt = "None";
var PermissionedProductList = "";
var	IOIActionArray = new Array();
IOIActionArray[0] = "Add";
IOIActionArray[1] = "Update";
IOIActionArray[2] = "Cancel";
var sPreviousInvestorId="";
var sPreviousOneOffInvestor="";
var SalesQueryType = 0;
var InvestorIDArray;
var InvestorMaskArray;
var NumInvestors;
document.onkeypress = onFormKeyPress;	
var v_COVERAGE = 1;
var v_INSTITUTIONAL_INVESTOR = 2;
var v_SALES = 4;
var v_REGION = 8;
var bDealPricingBeforeRule2790 = false;
var pageLoading = true;
function onPageLoad()
{
SetSalesQueryType()
ConfirmRemoteScripting();
RSCallObject_wait(); 
InitialDate("dtTxtRegisterDate");
var thePndgOrdId = document.frmMain.elements["hidPndgOrderId"].value;
var theOrdTrackId = document.frmMain.elements["hidOrderTrackId"].value;
if ( theOrdTrackId && theOrdTrackId>0 )	
{
GetOrderByOrderTrack(theOrdTrackId);
}
else
{
if (document.forms["frmMain"].elements["selInvestorSearchResult"] != null)
document.forms["frmMain"].elements["selInvestorSearchResult"].options.length = 0;
if (enforceOrderControlPermission())
{
if (document.forms["frmMain"].elements["hidIOIUserRole"].value == "SalesAccountExecutive")
appendSearchResultsWithCoverageData(false);
}
else
appendSearchResultsWithCoverageData(true);
LoadInvestorPermissioning();
if(document.forms["frmMain"].elements["selTranche"].options.length > 0)
OnTrancheSelect(true);
if (document.forms["frmMain"].elements["ckPopBook"])
document.forms["frmMain"].elements["ckPopBook"].checked = true;
if (document.forms["frmMain"].elements["hidIOIUserRole"].value=="SalesAssistant" && !(document.forms["frmMain"].selSales))
{
LoadRegionBySalesCoverage(document.forms["frmMain"].elements["hidSalesId"].value);
if(theForm.elements["selRegion"])
{
if(theForm.elements["selRegion"].options.length > 2)
{
theForm.elements["hidRegionId"].value="";
rewriteLayer("pRegionName","");
}
else if(theForm.elements["selRegion"].options.length > 1)
{
SetRegionBySalesCoverage(theForm.elements["hidSalesId"].value); 
LoadInvestorBySaleAndRegion(); 
}
}
}
if(!(thePndgOrdId && thePndgOrdId > 0)) 
{
if(document.frmMain.elements["selSales"])
{
if( document.frmMain.elements["selSales"].selectedIndex > -1)
OnSaleSelect(true);
}
}
setFocus(document.frmMain.elements["txtInvestorSearch"]);
}
if (enforceOrderControlPermission())
setMRUInvestor('');
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
if(document.frmMain.elements["hidNumProduct"] != null)
{
var numProduct = document.frmMain.elements["hidNumProduct"].value;
for (var iPrd=1; iPrd<=numProduct; iPrd++)
{
for(var i = 1; i <= (iPrd*5); i++)
if(document.frmMain.elements["pctTxtDeltaLimit" + i.toString()] != null )
{
if(document.frmMain.elements["selInvDesiredHedgeType" + (iPrd-1).toString()].value == '2')
{
document.frmMain.elements["pctTxtDeltaLimit" + i.toString()].disabled = false;
}
else
{
document.frmMain.elements["pctTxtDeltaLimit" + i.toString()].disabled = true;
}
}
}
}
pageLoading = false;
}
function SetAmountTypeText()
{
var theForm = document.forms["frmMain"];
var oAmountType ;
var oAmountTypeText;
var numProduct = theForm.elements["hidNumTranche"].value;
for (var i=0; i<numProduct; i++)
{
oAmountType = theForm.elements["selAmountType" + i];
theSelected = oAmountType.selectedIndex;
oAmountTypeText = theForm.elements["selAmountTypeTxt" + i];
oAmountTypeText.value = oAmountType.options[theSelected].text;
}
}
function onSearchTextEnter(event,element) 
{
var strNextField;
if (document.all) 
{
if (window.event && window.event.keyCode == 13)
{
if(element.name=="txtInvestorSearch")
{
OnFindInvestor();
strNextField = "selInvestorSearchResult"
}
if(element.name=="txtIpsInvestorSearch")
{
OnFindInvestorBySymbol();
strNextField = "selInvestorSearchResult"
} 
else if(element.name=="txtSalesSearch")
{
OnFindSales();
strNextField = "selSalesSearchResult"
}
else if(element.name=="txtTraderSearch")
{
OnFindTrader();
strNextField = "selTraderSearchResult"
}
}
else
{
return true;
}
}
else
{
if (event && event.which == 13)
{
if(element.name=="txtInvestorSearch")
{
OnFindInvestor();
strNextField = "selInvestorSearchResult"
}
else if(element.name=="txtSalesSearch")
{
OnFindSales();
strNextField = "selSalesSearchResult"
}
else if(element.name=="txtTraderSearch")
{
OnFindTrader();
strNextField = "selTraderSearchResult"
}
}
else
{
return true;
}
}
setFocus(document.frmMain.elements[strNextField]);
}
function onSearchResultsEnter(event,element) 
{
if (document.all) 
{
if (window.event && window.event.keyCode == 13)
{
if(element.name=="selInvestorSearchResult")
{
OnInvestorSearchResultSelect();
}
else if(element.name=="selSalesSearchResult")
{
OnSalesSearchResultSelect();
}
else if(element.name=="selTraderSearchResult")
{
OnTraderSearchResultSelect();
}
}
else
{
return true;
}
}
else
{
if (event && event.which == 13)
{
if(element.name=="selInvestorSearchResult")
{
OnInvestorSearchResultSelect();
}
else if(element.name=="selSalesSearchResult")
{
OnSalesSearchResultSelect();
}
else if(element.name=="selTraderSearchResult")
{
OnTraderSearchResultSelect();
}
}
else
{
return true;
}
}
}
function onFormKeyPress(e) 
{
if (document.all) 
{
if (window.event && window.event.ctrlKey && window.event.keyCode == 21)
{
PreSubmitPage( document.frmMain , IOIActionArray[0]); 
}
else
{
return true;
}
}
else
{
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
function getDocumentElements(sElementName)
{
if (document.getElementsByName)
{
return document.getElementsByName(sElementName);
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
var DealType = frm.elements["hidDealType"].value;
return CustomValidationEQ( frm, arrFieldsInError );
}
function CustomValidationEQ( frm, arrFieldsInError )
{
var arrMoreErrors = new Array();
var theElement;
var theSelected;
var theRole = frm.elements["hidIOIUserRole"].value;
var theAction = frm.elements["hidAction"].value;
var sBrokerID = frm.elements["hidSMBDId"].value;
var sCustBrokers = frm.elements["hidSubsidiaryBrokers"].value;
ValidateFRQ( arrMoreErrors );
theElement = frm.elements["hidInvestorID"];
if (theRole =="SyndicateMarketing" || theRole =="SyndicateRemoteDesk")	
{
if (!(frm.elements["hidOneOffInvestorInd"].value=="1") && (theElement.value.length == 0 || theElement.value=="0"))
{
var arrError = FieldErrorInfo("selInvestorSearchResult", new String, "", "txtInvestorSearch", "Investor");
arrError[2] = "Please select an investor.";
arrMoreErrors[arrMoreErrors.length] = arrError;
}
}
else
{
if (theElement.value.length == 0)
{
var arrError = FieldErrorInfo("selSearchResult", new String, "", "txtInvestorSearch", "Investor");
arrError[2] = "Please select an investor.";
arrMoreErrors[arrMoreErrors.length] = arrError;
}	
}
if ((theAction == "Add") && (theRole != "InstitutionalInvestorIOI") && (theRole != "SyndicateParticipant") && !((theRole=="SyndicateMarketing" || theRole == "SyndicateRemoteDesk") && (sCustBrokers.search(sBrokerID+",")==-1)))
{
theElement = frm.elements["hidRegionId"];
if (theElement.value.length == 0)
{
var arrError = FieldErrorInfo("selRegion", new String, "", "selRegion", "Region");
arrError[2] = "Please select a region.";
arrMoreErrors[arrMoreErrors.length] = arrError;
}
} 
if (theRole =="SyndicateMarketing" || theRole == "SyndicateRemoteDesk" )
{
theElement = frm.elements["hidOneOffInvestorInd"];
var bOneOff = theElement.value=="1"?true:false;
if (bOneOff)
{
theElement = frm.elements["txtOneOffInvestorName"];
if (theElement.value.length == 0)
{
var arrError = FieldErrorInfo("txtOneOffInvestorName", new String, "", "txtOneOffInvestorName", "One-off Investor name");
arrError[2] = "Please enter an investor name.";
arrMoreErrors[arrMoreErrors.length] = arrError;
}
}
}
theElement = frm.elements["selTranche"];
theSelected = theElement.selectedIndex;
if ( (theSelected < 0) ||
((theSelected == 0) && (theElement.options[theSelected].value == 0)) )
{
var arrError = FieldErrorInfo("selTranche", new String, "", "selTranche", "Tranche");
arrError[2] = "Please select a tranche.";
arrMoreErrors[arrMoreErrors.length] = arrError;
}
theElement = frm.elements["hidSMBDId"];
if (theElement.value.length == 0)
{
var arrError = FieldErrorInfo("selBrokerDealer", new String, "", "selBrokerDealer", "Broker/Dealer");
arrError[2] = "Please select a broker/dealer.";
arrMoreErrors[arrMoreErrors.length] = arrError;
}
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
ValidateEquityEntryConvertible(i, arrAmount, arrPrice, arrCoupon, arrPremium, arrMoreErrors);
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
function ValidateEquityEntryConvertible(iPrd, arr_Amount, arr_Price, arr_Coupon, arr_Premium, arr_MoreErrors)
{
var lAmount;
var lLastAmount;
var dbPrice;
var dbLastPrice;
var dbCoupon;
var dbLastCoupon;
var dbPremium;
var dbLastPremium;
var iNumOfEntry = arr_Amount.length;
var theForm = document.forms["frmMain"];
var bAscAmount;
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
if ( lAmount>9223372036854775807 )
{
var iErrEntry = iPrd*5+(i+1);
var arrError = FieldErrorInfo("iTxtAmount"+iErrEntry, new String, "", "iTxtAmount"+iErrEntry, "Amount Entry");
arrError[2] = "The amount may not exceed 9,223,372,036,854,775,807.";
arr_MoreErrors[arr_MoreErrors.length] = arrError;
}
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
arrError[2] = "Only one of Price (% of Par) or Coupon or Premium can have the same value as its predecessor";
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
if(!ValidateRoadshowMeeting())
{
alert(sIncorrectRoadshowErrorMessage);
return;
}
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
function ValidateRoadshowMeeting()
{
return true;
}
function PreSubmitPage( frm , action )
{
if (action == '')
return;
frm.elements["hidAction"].value = action;
var DealType = frm.elements["hidDealType"].value;
var theRole = frm.elements["hidIOIUserRole"].value;
if ((action == "Add") || (action == "Update")) 
{
ClearMarketOrderString(frm);
if (ValidateForm(frm))
{
if (!ValidateRoadshowMeeting())
{
alert(sIncorrectRoadshowErrorMessage);
return;
}
if(theRole=="SyndicateMarketing" || theRole == "SyndicateRemoteDesk")
{
frm.action = "/asp/util_submit_action.asp";
frm.submit(); 
}
else
{
OpenConfirmationPopup("savechangeswithvalidation", action);
return;
}
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
if(theRole=="SyndicateMarketing" || theRole == "SyndicateRemoteDesk")
{
frm.action = "/asp/util_submit_action.asp";
frm.submit(); 
}
else
{
OpenConfirmationPopup("savechangeswithvalidation", action);
return;
}
}
else
{
RestoreMarketOrderString(frm);
}
}
submitPage(frm, action);
}
function OpenConfirmationPopup(sNavType, action)
{
var sUrl = "BookBuild_Indications_Confirmation_popup.asp?navType=" +
String(sNavType) + "&action=" + String(action);
var sStyle = "scrollbars=yes,menubar=no,width=600,height=400,toolbar=no,status=no,titlebar=no";
openGeneralPopup(sUrl, '', sStyle);
}
function PopUpInvestorAlias()
{
var theForm = document.forms["frmMain"];
var InvestorName;
var InvestorAlias = theForm.elements["hidInvestorAlias"].value;
var eInvestorName;
var eInvestorAlias;
InvestorName = theForm.elements["hidInvestorName"].value;
if (InvestorName.length == 0)
{
alert("Please select an Investor first..");
return;
} 
theForm.elements["hidPopUpTrack"].value = "1"; 
rExp = /\s/g
eInvestorName = InvestorName.replace(rExp,"+");
if (InvestorAlias.length > 0)
eInvestorAlias = InvestorAlias.replace(rExp,"+");
else
eInvestorAlias = InvestorAlias; 
var sUrl = "Bookbuild_Indications_Alias_popup.asp?Name=" + eInvestorName;
sUrl = sUrl + "&Alias=" + eInvestorAlias;
openGeneralPopup( sUrl, '', AliasPopupStyle );
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
function OpenTotalIOIPopup(prdid)
{
var frm = document.forms["frmMain"];
theElement = frm.elements["hidIssueTypeCode"]
var issueTypeCode = theElement.value;
if(checkPirce(frm))
{
ClearMarketOrderString(frm);
if (ValidateForm(frm))
{ 
theForm.elements["hidPopUpTrack"].value = "1";
var nNumProduct = new Number(frm.hidNumProduct.value);
for (var i = 0; i < nNumProduct; i++)
{
for (var j = (i * 5) + 1; j <= ((i + 1) * 5); j++)
{
frm.elements["iTxtAmount" + String(j)].value = formatAmountString(frm.elements["iTxtAmount" + String(j)].value);
if (issueTypeCode=="CP" || issueTypeCode=="CB")
{
frm.elements["fltTxtCoupon" + String(j)].value = formatAmountString(frm.elements["fltTxtCoupon" + String(j)].value);
frm.elements["fltTxtPremium" + String(j)].value = formatAmountString(frm.elements["fltTxtPremium" + String(j)].value); 
}
else
{
frm.elements["fltTxtPrice" + String(j)].value = formatFixedDecimalAmountString(frm.elements["fltTxtPrice" + String(j)].value,2);
}
}
}
var sUrl = "BookBuild_TotalIOI_Popup.asp?prdid=" + String(prdid);
var sStyle = "scrollbar=no, menubar=no,width=300, height=400, toolbar=no, status=no, titlebar=no";
openGeneralPopup(sUrl, '', sStyle); 
}	
RestoreMarketOrderString(frm);
}	
}
function OnOrderTypeSelect(objElement)
{
var selValue = objElement[objElement.selectedIndex].value;
if (selValue != -1)
document.forms["frmMain"].elements["hidOrderType"].value = selValue; 
}
function GetSalesCoverage(InvestorId)
{
var co;
if (InvestorId > 0)
{
var theForm = document.forms["frmMain"];
co = RSExecute('rs_bookbuild_indication_server.asp', 'js_ListSalesByInvestorID', InvestorId, SalesQueryType);
var strData = co.return_value
var cbElement = theForm.elements["selSalesSearchResult"];
if(!cbElement)
return;
cbElement.options.length = 0;
if (strData && strData != "")
{
aryRecords = strData.split("\t");
var iPreviousID=0;
var sNewSalesInd = document.frmMain.hidNewSalesInd.value;
for (i=0; i < aryRecords.length-1; i++)
{
aryData = aryRecords[i].split("\b");
if (sNewSalesInd == "1")
{
if(aryData[1] != iPreviousID)
{
cbElement.options[cbElement.options.length]= new Option(aryData[2], aryData[0] + ";" + aryData[1]);
}
iPreviousID = aryData[1];
}
else
{
if(aryData[0] != iPreviousID)
{
cbElement.options[cbElement.options.length]= new Option(aryData[1], aryData[0]);
}
iPreviousID = aryData[0];
}
}
SalesList = strData;
}
} 
}
function SetRegionSalesSelectsByCoverage(InvestorId)
{
var co;
if (InvestorId > 0)
{
var theForm = document.forms["frmMain"];
co = RSExecute('rs_bookbuild_indication_server.asp', 'js_ListSalesByInvestorID', InvestorId, SalesQueryType);
var strData = co.return_value
var cbElement = theForm.elements["selSales"];
if(!cbElement)
return;
if (strData && strData != "")
{
aryRecords = strData.split("\t");
for (i=0; i < aryRecords.length-1; i++)
{
aryData = aryRecords[i].split("\b");
cbElement = theForm.elements["selSales"];
if (cbElement)
{
for (var i = 0; i < cbElement.options.length; i++)
{
if (cbElement.options[i].value == aryData[0])
{
cbElement.selectedIndex = i;
onSaleSelect();
break;
} 
}
}
}
}
co = RSExecute('rs_bookbuild_indication_server.asp', 'js_ListRegionsByInstInvID', InvestorId);
var strData = co.return_value
var theForm = document.forms["frmMain"];
var cbElement = theForm.elements["selRegion"];
if(!cbElement)
return;
aryRecords = strData.split("\t");
for (i=0; i < aryRecords.length-1; i++)
{
aryData = aryRecords[i].split("\b");
cbElement = theForm.elements["selRegion"];
if (cbElement)
{
for (var i = 0; i < cbElement.options.length; i++)
{
if (cbElement.options[i].value == aryData[0])
{
cbElement.selectedIndex = i;
onRegionSelect();
break;
} 
}
}
}
} 
}
function SetRegionByCoverage(SalesId, InvestorId)
{
var cbElement;
var strSelectedValues;
var strValue;
var theForm;
var RecordSelected;
var co;
var selInvestor;
co = RSExecute('rs_bookbuild_indication_server.asp', 'js_ListCategoryBySalesIDAndInvestorID', SalesId, InvestorId);
var strResult = co.return_value;
theForm = document.forms["frmMain"];
if (strResult != "")
{
aryRecords = strResult.split("\t");
if(aryRecords.length > 0)
{
var i = 0;
aryData = aryRecords[i].split("\b");
strValue = aryData[0];
strLabel = aryData[1];
theForm.elements["hidRegionId"].value = strValue;
theForm.elements["hidRegionName"].value = strLabel;
rewriteLayer("pRegionName", strLabel);
rewriteLayer("pRegionName2", strLabel);
cbElement = theForm.elements["selRegion"];
if(cbElement) 
{
for (var j=0; j <= cbElement.options.length-1;j++)
{
if (cbElement.options[j].value==strValue)
{
cbElement.selectedIndex=j;
break;
}
}
}
}
}
}
function LoadRegionByCoverage(SalesId, InvestorId)
{
var cbElement;
var strSelectedValues;
var strValue;
var theForm;
var RecordSelected;
var co;
var selInvestor;
co = RSExecute('rs_bookbuild_indication_server.asp', 'js_ListCategoryBySalesIDAndInvestorID', SalesId, InvestorId);
var strResult = co.return_value;
theForm = document.forms["frmMain"];
var cbElement = theForm.elements["selRegion"];
if(cbElement)
cbElement.options.length = 0;
if (strResult != "")
{
aryRecords = strResult.split("\t");
if(aryRecords.length > 0)
{
for (var i=0; i < aryRecords.length-1; i++)
{
aryData = aryRecords[i].split("\b");
cbElement.options[cbElement.options.length]= new Option(aryData[1], aryData[0]);
if (i==0)
{
cbElement.selectedIndex=i;
}
}
RegionList = strResult;
} 
else
{
cbElement.options[cbElement.options.length]= new Option("None selected", "0");
}
}
}
function LoadRegionBySalesCoverage(SalesId)
{
var cbElement;
var strSelectedValues;
var strValue;
var theForm;
var RecordSelected;
var co;
var selInvestor;
co = RSExecute('rs_bookbuild_indication_server.asp', 'js_ListCategoryBySalesID', SalesId);
var strResult = co.return_value;
theForm = document.forms["frmMain"];
var cbElement = theForm.elements["selRegion"];
if(cbElement)
cbElement.options.length = 0;
else
return;
cbElement.options[cbElement.options.length]= new Option("None Selected", 0);
if (strResult != "")
{
aryRecords = strResult.split("\t");
if(aryRecords.length > 0)
{
for (var i=0; i < aryRecords.length-1; i++)
{
aryData = aryRecords[i].split("\b");
cbElement.options[cbElement.options.length]= new Option(aryData[1], aryData[0]);
if (i==0)
{
cbElement.selectedIndex=i;
}
}
RegionList = strResult;
} 
else
{
cbElement.options[cbElement.options.length]= new Option("None selected", "0");
}
}
}
function SetRegionBySalesCoverage(SalesId)
{ 
var cbElement;
var strSelectedValues;
var strValue;
var theForm;
var RecordSelected;
var co;
var selInvestor;
var strResult = "";
theForm = document.forms["frmMain"];
if (enforceOrderControlPermission())
{
var arrOpenedCoverage = listOpenedSalesCoverage(document.frmMain.hidTrnId.value, document.frmMain.hidInvestorID.value, '', document.frmMain.hidRegionId.value, document.frmMain.hidSalesId.value, v_COVERAGE);
var ret = getOpenedSalesCoverage(arrOpenedCoverage, v_COVERAGE);
if (ret.length == 0 || ret == '0')
{
clearInvestor();
document.frmMain.hidRegionId.value = "";
theForm.elements["hidRegionName"].value = "";
rewriteLayer("pRegionName", "");
rewriteLayer("pRegionName2", ""); 
}
arrOpenedCoverage = listOpenedSalesCoverage(document.frmMain.hidTrnId.value, '', theForm.txtInvestorSearch.value, '', SalesId, v_INSTITUTIONAL_INVESTOR + v_REGION);
callback_populateInvestorSearchResultComboByRetVal(getOpenedSalesCoverage(arrOpenedCoverage, v_INSTITUTIONAL_INVESTOR)); 
populateRegionCombo(getOpenedSalesCoverage(arrOpenedCoverage, v_REGION));
}
else
{
co = RSExecute('rs_bookbuild_indication_server.asp', 'js_ListCategoryBySalesID', SalesId);
strResult = co.return_value;
if (strResult != "")
{
aryRecords = strResult.split("\t");
if(aryRecords.length > 0)
{
var i = 0;
aryData = aryRecords[i].split("\b");
strValue = aryData[0];
strLabel = aryData[1];
theForm.elements["hidRegionId"].value = strValue;
theForm.elements["hidRegionName"].value = strLabel;
rewriteLayer("pRegionName", strLabel);
rewriteLayer("pRegionName2", strLabel);
cbElement = theForm.elements["selRegion"];
if(cbElement) 
{
for (var j=0; j <= cbElement.options.length-1;j++)
{
if (cbElement.options[j].value==strValue)
{
cbElement.selectedIndex=j;
break;
}
}
}
}
}
}
}
function SetRegionCBByCoverage(SalesId, InvestorId)
{
if (enforceOrderControlPermission())
{	
var co;
if (InvestorId > 0)
{
var arrOpenCoverage = listOpenedSalesCoverage(document.forms["frmMain"].hidTrnId.value, document.forms["frmMain"].hidInvestorID.value, '', document.forms["frmMain"].hidRegionId.value, document.forms["frmMain"].hidSalesId.value, v_COVERAGE);
var strData = getOpenedSalesCoverage(arrOpenCoverage, v_COVERAGE);	
if (strData.length == 0 || strData == '0')
{
document.frmMain.hidRegionId.value = "";
document.frmMain.elements["hidRegionName"].value = "";
rewriteLayer("pRegionName", "");
rewriteLayer("pRegionName2", ""); 
}	
arrOpenCoverage = listOpenedSalesCoverage(document.forms["frmMain"].hidTrnId.value, InvestorId, '', '', SalesId, v_REGION);
strData = getOpenedSalesCoverage(arrOpenCoverage, v_REGION);
var bSelected = false; 
populateRegionCombo(strData);
}	
}
else
{
var co;
if (InvestorId > 0)
{
co = RSExecute('rs_bookbuild_indication_server.asp', 'js_ListCategoryBySalesIDAndInvestorID', SalesId, InvestorId);
var strData = co.return_value
var theForm = document.forms["frmMain"];
var cbElement = theForm.elements["selRegion"];
if(!cbElement)
return;
var bSelected = false; 
if (strData && strData != "")
{
aryRecords = strData.split("\t");
for (var i=0; i < aryRecords.length-1; i++)
{
aryData = aryRecords[i].split("\b");
cbElement = theForm.elements["selRegion"];
if (cbElement)
{
for (var j = 0; j < cbElement.options.length; j++)
{
if (cbElement.options[j].value == aryData[0])
{
cbElement.selectedIndex = j;
OnRegionSelect(false);
bSelected = true;
break;
} 
}
}
if (bSelected)
break;
}
}
}
} 
}
function populateRegionCombo(strData)
{
var theForm = document.forms["frmMain"];
var cbElement = theForm.elements["selRegion"];	
if(!cbElement)
return; 
clearRegion();
aryRecords = strData.split("\t");
for (var i=0; i < aryRecords.length-1; i++)
{
aryData = aryRecords[i].split("\b");
theForm.elements["selRegion"].options[theForm.elements["selRegion"].length] = new Option(aryData[1], aryData[0], "", "");
}
}
function SetRegionCBBySalesCoverage(SalesId)
{
var co;
if (SalesId > 0)
{
co = RSExecute('rs_bookbuild_indication_server.asp', 'js_ListCategoryBySalesID', SalesId);
var strData = co.return_value
var theForm = document.forms["frmMain"];
var cbElement = theForm.elements["selRegion"];
if(!cbElement)
return;
if (strData && strData != "")
{
aryRecords = strData.split("\t");
for (i=0; i < aryRecords.length-1; i++)
{
aryData = aryRecords[i].split("\b");
cbElement = theForm.elements["selRegion"];
if (cbElement)
{
for (var i = 0; i < cbElement.options.length; i++)
{
if (cbElement.options[i].value == aryData[0])
{
cbElement.selectedIndex = i;
OnRegionSelect(false);
break;
} 
}
}
}
}
} 
}
function SetSalesByCoverage(InvestorId, RegionId)
{
var co;
if (InvestorId > 0)
{
co = RSExecute('rs_bookbuild_indication_server.asp', 'js_ListSalesByInvestorAndRegion', InvestorId, RegionId);
var strData = co.return_value
var theForm = document.forms["frmMain"];
var cbElement = theForm.elements["selSales"];
if(!cbElement)
return;
if (strData && strData != "")
{
aryRecords = strData.split("\t");
for (i=0; i < aryRecords.length-1; i++)
{
aryData = aryRecords[i].split("\b");
cbElement = theForm.elements["selSales"];
if (cbElement)
{
for (var i = 0; i < cbElement.options.length; i++)
{
if (cbElement.options[i].value == aryData[0])
{
cbElement.selectedIndex = i;
OnSaleSelect(false);
break;
} 
}
}
}
}
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
if (co.return_value == "User is not allowed to view this pending order.")
HandleOrderPermissionErr();
else
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
GetProductInvestorPermissioning(investorId);
if (strValues != "")
{
ResetIOIEntry(true);
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
ResetIOIEntry(true);
theForm.elements["hidPndgOrderId"].value = 0;
theForm.elements["hidOrderTrackId"].value = 0;
theForm.elements["hidPndgOrdRegionId"].value = 0;
theForm.elements["hidPndgOrdSalesId"].value = 0;
theForm.elements["hidCancelOrder"].value = 0;	
}
}
ResetInstInvInfo();
rewriteLayer("pRegionName", "");
rewriteLayer("pRegionName2", "");
var cbTempRegion
cbTempRegion = theForm.elements["selRegion"];
if(cbTempRegion && cbTempRegion.options.length==2)
{
cbTempRegion.selectedIndex = 1
var strLabel 
strLabel = cbTempRegion.options[1].text;
theForm.elements["hidRegionId"].value = cbTempRegion.options[1].value;
theForm.elements["hidRegionName"].value = strLabel;
rewriteLayer("pRegionName", strLabel);
rewriteLayer("pRegionName2", strLabel);
}
if (theForm.elements["txtSalesComments"])
theForm.elements["txtSalesComments"].value = "";
if (enforceOrderControlPermission())
{ 
if (theForm.elements["hidIOIUserRole"].value == "SalesAccountExecutive")
{
theForm.elements["hidSalesId"].value = theForm.elements["hidIOIUserID"].value;
theForm.elements["hidSalesName"].value = theForm.elements["hidIOIUserName"].value;
rewriteLayer("pSalesName", theForm.elements["hidIOIUserName"].value);	
}
}
for (j = 1; theForm.elements["pctTxtDeltaLimit"+j] != null; j++)
{
theForm.elements["pctTxtDeltaLimit" + j.toString()].disabled = true;
}
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
var sLanguage = document.forms["frmMain"].elements["hidIOIUserLanguage"].value;
var btnCount = getDocumentElements("IOIActionBtn1").length;
for ( var i=0; i<btnCount; i++ )
{
switch (OrderType)
{
case "New":
getDocumentElements("IOIActionBtn1")[i].caption = "$RC_SUBMIT_IOI_BUTTON";
getDocumentElements("IOIActionBtn2")[i].src = "../images/spacer.gif";
getDocumentElements("IOIActionBtn3")[i].src = "../images/spacer.gif";
showElement(getDocumentElements("divIOIActionBtn1")[i]);
hideElement(getDocumentElements("divIOIActionBtn2")[i]);
hideElement(getDocumentElements("divIOIActionBtn3")[i]);
IOIActionArray[0] = "Add";
IOIActionArray[1] = "";
IOIActionArray[2] = "";
break;
case "Existed":
getDocumentElements("IOIActionBtn1")[i].caption = "$RC_SUBMIT_IOI_BUTTON";
getDocumentElements("IOIActionBtn2")[i].caption = "$RC_CANCEL_INDICATION";
getDocumentElements("IOIActionBtn3")[i].caption = "$RC_DELETE_INDICATION_BUTTON";
showElement(getDocumentElements("divIOIActionBtn1")[i]);
showElement(getDocumentElements("divIOIActionBtn2")[i]);
showElement(getDocumentElements("divIOIActionBtn3")[i]);
IOIActionArray[0] = "Update";
IOIActionArray[1] = "Cancel";
IOIActionArray[2] = "Delete";
break;
case "Confirm Existed":
getDocumentElements("IOIActionBtn1")[i].caption = "$RC_SUBMIT_IOI_BUTTON";
getDocumentElements("IOIActionBtn2")[i].caption = "$RC_CANCEL_INDICATION";
getDocumentElements("IOIActionBtn3")[i].src = "../images/spacer.gif";
showElement(getDocumentElements("divIOIActionBtn1")[i]);
showElement(getDocumentElements("divIOIActionBtn2")[i]);
hideElement(getDocumentElements("divIOIActionBtn3")[i]);
IOIActionArray[0] = "Update";
IOIActionArray[1] = "Cancel";
IOIActionArray[2] = "";
break;
case "Cancelled":
getDocumentElements("IOIActionBtn1")[i].src = "$RC_REINSTATE_INDICATION";
getDocumentElements("IOIActionBtn2")[i].caption = "$RC_DELETE_INDICATION_BUTTON";
getDocumentElements("IOIActionBtn3")[i].src = "../images/spacer.gif";
showElement(getDocumentElements("divIOIActionBtn1")[i]);
showElement(getDocumentElements("divIOIActionBtn2")[i]);
hideElement(getDocumentElements("divIOIActionBtn3")[i]);
IOIActionArray[0] = "Reinstate";
IOIActionArray[1] = "Delete";
IOIActionArray[2] = "";
break;
case "Confirm Cancelled":
getDocumentElements("IOIActionBtn1")[i].src = "$RC_REINSTATE_INDICATION";
getDocumentElements("IOIActionBtn2")[i].src = "../images/spacer.gif";
getDocumentElements("IOIActionBtn3")[i].src = "../images/spacer.gif";
showElement(getDocumentElements("divIOIActionBtn1")[i]);
hideElement(getDocumentElements("divIOIActionBtn2")[i]);
hideElement(getDocumentElements("divIOIActionBtn3")[i]);
IOIActionArray[0] = "Reinstate";
IOIActionArray[1] = "";
IOIActionArray[2] = "";
break;
case "Closed":
getDocumentElements("IOIActionBtn1")[i].src = "../images/spacer.gif";
getDocumentElements("IOIActionBtn2")[i].src = "../images/spacer.gif";
getDocumentElements("IOIActionBtn3")[i].src = "../images/spacer.gif";
showElement(getDocumentElements("divIOIActionBtn1")[i]);
hideElement(getDocumentElements("divIOIActionBtn2")[i]);
hideElement(getDocumentElements("divIOIActionBtn3")[i]);
IOIActionArray[0] = "";
IOIActionArray[1] = "";
IOIActionArray[2] = "";
break;
}
}
}
function LoadEntry(strOrderInfo)
{
var theForm = document.forms["frmMain"];
var DealType = theForm.elements["hidDealType"].value;
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
entryElement = theForm.elements["fltTxtPrice" + iEntry];
if (entryElement != null)
entryElement.value = formatFixedDecimalAmountString(aryData[7],2);
entryElement = theForm.elements["pctTxtDeltaLimit" + iEntry];
if (entryElement != null)
entryElement.value = formatFixedDecimalAmountString(aryData[13],2);
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
var frmTrnId = GetSelectedTrancheEQ();
EnableIOIEntry(iPrd, IsProductPermissioned(frmTrnId, frmPrdId)); 
SelInvestorDesiredHedgeType(iPrd, aryData[14]); 
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
{
var frmTrnId = GetSelectedTrancheEQ();
EnableIOIEntry(iNPrd, IsProductPermissioned(frmTrnId, frmPrdId)); 
} 
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
function SelInvestorDesiredHedgeType(iprd, ordHedgeType)
{
var theForm = document.forms["frmMain"];
var cbHedgeType = theForm.elements["selInvDesiredHedgeType" + iprd];
if(cbHedgeType != null)
{
cbHedgeType.selectedIndex = 0;
for (var ioption=0; ioption<cbHedgeType.options.length; ioption++)
{
if (cbHedgeType.options[ioption].value == ordHedgeType)
{
cbHedgeType.selectedIndex = ioption;
onChangeInvDesiredHedgeWithCleanUp(iprd, false);
break;
} 
}
}
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
function SetInvestorInfo (InstInvId, InstInvNm, BrkId, BrkNm, bUseAliasInd, AcctAliasNm, bOneOffInd)
{
var theForm = document.forms["frmMain"];
var InvestorName;
if (InstInvId == 0)
{
InvestorName = BrkNm; 
theForm.elements["hidInvestorID"].value = BrkId;
if(theForm.elements["selInvestorType"])
{
theForm.elements["selInvestorType"].value = 2;
}
}
else
{
var theRole = theForm.elements["hidIOIUserRole"].value;
if (bUseAliasInd && theRole != "InstitutionalInvestor")
{
InvestorName = AcctAliasNm;
}
else
{
InvestorName = InstInvNm; 
}
theForm.elements["hidInvestorID"].value = InstInvId;
if(theForm.elements["selInvestorType"])
{
theForm.elements["selInvestorType"].value = 1;
}
if (bOneOffInd)
{
theForm.elements["hidOneOffInvestorInd"].value = 1;
}
}
theForm.elements["hidInvestorName"].value = InvestorName;
rewriteLayer("pInvestorName", InvestorName);
rewriteLayer("pInvestorName2", (InstInvId==0)?BrkNm:InstInvNm);
}
function LoadOrderInfo(strOrderInfo)
{
var aryData = strOrderInfo.split("\b");
var theForm = document.forms["frmMain"];
var theRole = theForm.elements["hidIOIUserRole"].value;
var theValue;
var cbElement;
var ioption;
var co;
theForm.elements["hidConfirmOrderId"].value = aryData[0];
theForm.elements["hidPndgOrderId"].value = aryData[1];
SetRegisterDate(aryData[2]); 
SetInvestorAlias(aryData[3]);
theForm.elements["hidPndgOrdRegionId"].value = aryData[4];
theForm.elements["hidRegionId"].value = aryData[4];
theForm.elements["hidRegionName"].value = aryData[6];
if (getDocumentElement("pRegionName"))
rewriteLayer("pRegionName", aryData[6]); 
theForm.elements["hidPndgOrdSalesId"].value = aryData[7];
var sNewSalesInd = document.frmMain.hidNewSalesInd.value;
if (sNewSalesInd == "1")
{
var sSalesId = "";
var sSalesNm = "";
if (aryData[32].length > 0)
{
sSalesId = "SR;" + aryData[32];
sSalesNm = aryData[33];
}
else
{
if (aryData[7].length > 0)
sSalesId = "SU;" + aryData[7];
sSalesNm = aryData[8];
}
theForm.elements["hidSalesId"].value = sSalesId;
theForm.elements["hidSalesName"].value = sSalesNm;
if (getDocumentElement("pSalesName")) 
rewriteLayer("pSalesName", sSalesNm);
if (theForm.elements["selSales"])
{
for (var iSales = 0; iSales < theForm.elements["selSales"].options.length; iSales++)
{ 
if (theForm.elements["selSales"].options[iSales].value == sSalesId)
{
theForm.elements["selSales"].selectedIndex = iSales;
break;
}
}
}
}
else
{
theForm.elements["hidSalesId"].value = aryData[7];
theForm.elements["hidSalesName"].value = aryData[8];
if (getDocumentElement("pSalesName")) 
rewriteLayer("pSalesName", aryData[8]);
if (theForm.elements["selSales"])
{
for (var iSales = 0; iSales < theForm.elements["selSales"].options.length; iSales++)
{ 
if (theForm.elements["selSales"].options[iSales].value == aryData[7])
{ 
theForm.elements["selSales"].selectedIndex = iSales;
break;
}
}
}
}
if (theForm.elements["selRegion"])
{ 
for (var iReg = 0; iReg < theForm.elements["selRegion"].options.length; iReg++)
{ 
if (theForm.elements["selRegion"].options[iReg].value == aryData[4])
{ 
theForm.elements["selRegion"].selectedIndex = iReg;
break;
}
}
}
if (theForm.elements["rsSearchForInvestor"])
{
if (theForm.elements["rsSearchForInvestor"][1].checked)
{
for (var i = 0; i < theForm.elements["selSalePerson"].options.length; i++)
{
if (theForm.elements["selSalePerson"].options[i].text == aryData[8])
{
theForm.elements["selSalePerson"].selectedIndex = i;
break;
}
}
}
}
CurrListInSrchRslt = "None";
ShowSearchComplete();
if (theForm.elements["txtSalesComments"])
theForm.elements["txtSalesComments"].value = aryData[9];
if (theForm.elements["txtCMComments"])
theForm.elements["txtCMComments"].value = aryData[10];
theValue = aryData[11];
if (theForm.elements["selTradeQuality"])
{
cbElement = theForm.elements["selTradeQuality"];
if ( (theValue) && (theValue.length > 0 ) ) 
{
for (ioption=0; ioption<cbElement.options.length; ioption++)
{
if (cbElement.options[ioption].value == theValue)
{
cbElement.selectedIndex = ioption;
break;
} 
}
}
else
{ cbElement.selectedIndex = 0; }
} 
theValue = aryData[26]; 
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
OnTrancheSelect(false, false); 
}
setOrderType( aryData[12] );
theValue = aryData[13]; 
if ((theForm.elements["selBrokerDealer"]) && (HardPotInd == "True"))
{ 
cbElement = theForm.elements["selBrokerDealer"];
for (ioption=0; ioption<cbElement.options.length; ioption++)
{
if (cbElement.options[ioption].value == theValue)
{
cbElement.selectedIndex = ioption;
break;
} 
}
OnBrokerSelect();
}
else if (theRole=="SyndicateParticipant" && (HardPotInd == "True"))
{
theForm.elements["hidSMBDId"].value = theValue;
if (getDocumentElement("pBrokerName")) 
rewriteLayer("pBrokerName", aryData[28]);
}
theValue = aryData[16]; 
if (theForm.elements["selBilledBy"])
{ 
cbElement = theForm.elements["selBilledBy"];
for (ioption=0; ioption<cbElement.options.length; ioption++)
{
if (cbElement.options[ioption].value == theValue)
{
cbElement.selectedIndex = ioption;
break;
} 
}
}
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
if (theForm.elements["ckIndustryHolder"])
{
ckValue = aryData[19];
if (ckValue == "True")
theForm.elements["ckIndustryHolder"].checked = true;
else
theForm.elements["ckIndustryHolder"].checked = false;
}
if (theForm.elements["ckFirstTimeBuyer"])
{
ckValue = aryData[19];
if (ckValue == "True")
theForm.elements["ckFirstTimeBuyer"].checked = false;
else
theForm.elements["ckFirstTimeBuyer"].checked = true;
}
if(theForm.elements["rNoRoadshow"] != null)	
{
iRoadshowMeetingType = aryData[36];
switch(iRoadshowMeetingType)
{
case "255": 
case "0": 
if (theForm.elements["rNoRoadshow"])
theForm.elements["rNoRoadshow"].checked = true;
break
case "1": 
if(theForm.elements["rOneOnOne"])
theForm.elements["rOneOnOne"].checked = true;
break
case "2": 
if (theForm.elements["rSmallGroup"])
theForm.elements["rSmallGroup"].checked = true;
break
case "3": 
if (theForm.elements["rLargeGroup"])
theForm.elements["rLargeGroup"].checked = true;
break
case "4": 
if (theForm.elements["rFullConferenceCall"])
theForm.elements["rFullConferenceCall"].checked = true;
break
default:	
break
}
if (theForm.elements["ckResearch"])
{ 
ckValue = aryData[20];
if (ckValue == "True")
theForm.elements["ckResearch"].checked = true;
else
theForm.elements["ckResearch"].checked = false;
} 
if (theForm.elements["ckNetRoadshow"])
{
ckValue = aryData[22];
if (ckValue == "True")
theForm.elements["ckNetRoadshow"].checked = true;
else
theForm.elements["ckNetRoadshow"].checked = false;
} 
if (theForm.elements["ckConferenceCall"])
{
ckValue = aryData[37];
if (ckValue == "True")
theForm.elements["ckConferenceCall"].checked = true;
else
theForm.elements["ckConferenceCall"].checked = false;
}
}
else
{
if (theForm.elements["ckResearch"])
{ 
ckValue = aryData[20];
if (ckValue == "True")
theForm.elements["ckResearch"].checked = true;
else
theForm.elements["ckResearch"].checked = false;
} 
if (theForm.elements["ckOneOnOne"])
{
ckValue = aryData[21];
if (ckValue == "True")
theForm.elements["ckOneOnOne"].checked = true;
else
theForm.elements["ckOneOnOne"].checked = false;
} 
if (theForm.elements["ckRoadShow"])
{
ckValue = aryData[22];
if (ckValue == "True")
theForm.elements["ckRoadShow"].checked = true;
else
theForm.elements["ckRoadShow"].checked = false;
}
}
if (getDocumentElement("hidTraderId"))
{
if (sNewSalesInd == "1")
{
var sTraderId = "";
var sTraderNm = "";
if (aryData[34].length > 0)
{
sTraderId = "SR;" + aryData[34];
sTraderNm = aryData[35];
}
else
{
if (aryData[24].length > 0)
sTraderId = "SU;" + aryData[24];
sTraderNm = aryData[25];
}
theForm.elements["hidTraderId"].value = sTraderId;
if (getDocumentElement("pTraderName")) 
rewriteLayer("pTraderName", sTraderNm);
}
else
{
theForm.elements["hidTraderId"].value = aryData[24];
if (getDocumentElement("pTraderName")) 
rewriteLayer("pTraderName", aryData[25]);
}
}
if (getDocumentElement("hidFrqUseRadioButton"))
{
var nFrqType;
nFrqType = aryData[30];
if (getDocumentElement("freeridingOldDataLayer"))
getDocumentElement("freeridingOldDataLayer").style.display = 'none';
if ( nFrqType != "0" && nFrqType !="")
{
var nRadioCheck = new Number(nFrqType);
var nFRQCheck = new Number(document.forms["frmMain"].elements["iFrqType1"].item(nFrqType - 1).value);
if (nRadioCheck == 1 || nRadioCheck == 2 || eval("CapitalViewLayer").style.display == '')
{
if (nRadioCheck == 1 && getDocumentElement("freeridingOldDataLayer"))
getDocumentElement("freeridingOldDataLayer").style.display = '';
document.forms["frmMain"].elements["iFrqType1"].item(nFRQCheck - 1).checked =true; 
}
else
ResetRadioBox();
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
function SetInvestorAlias(strAlias)
{
var theForm = document.forms["frmMain"];
if (theForm.elements["hidInvestorAlias"])
{
theForm.elements["hidInvestorAlias"].value = strAlias;
rewriteLayer("pInvestorAlias", strAlias);
if ( (strAlias) && (strAlias.length > 0))
{
showElement(getDocumentElement("lblAlias"));
showElement(getDocumentElement("AliasPopupEdit"));
hideElement(getDocumentElement("AliasPopupCreate"));
} 
else
{
hideElement(getDocumentElement("lblAlias"));
showElement(getDocumentElement("AliasPopupCreate"));
hideElement(getDocumentElement("AliasPopupEdit"));
} 
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
function onPopBook()
{
var theForm = document.forms["frmMain"];
if (theForm.elements["ckPopBook"].checked == true)
document.forms["frmMain"].elements["hidPopBook"].value = "1";
else
document.forms["frmMain"].elements["hidPopBook"].value = "0";
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
function formatDatePart(datePart)
{
var theForm = document.forms["frmMain"];
var dateElement;
var iValue;
if (datePart == "hr")
{
dateElement = theForm.elements["TxtRegisterHr"];
iValue = parseInt(dateElement.value,10);
if ((iValue < 1) || (iValue > 12))
{
var sStatusMsg = new String;
sStatusMsg = sStatusMsg + "Please correct the following error(s):<br>";
var sMsg = " contain invalid hour..";
sStatusMsg = sStatusMsg + "<li><a href='JavaScript:self.window.opener.document.frmMain.TxtRegisterHr.focus()'> Time </a> " + sMsg + "<br>";
showErrorMessage(sStatusMsg);
}
}
if (datePart == "min")
{
dateElement = theForm.elements["TxtRegisterMin"];
iValue = parseInt(dateElement.value,10);
if (iValue > 60)
{
var sStatusMsg = new String;
sStatusMsg = sStatusMsg + "Please correct the following error(s):<br>";
var sMsg = " contain invalid minute..";
sStatusMsg = sStatusMsg + "<li><a href='JavaScript:self.window.opener.document.frmMain.TxtRegisterMin.focus()'> Time </a> " + sMsg + "<br>";
showErrorMessage(sStatusMsg);
}
}
}
function OnReloadInvestor()
{
var theForm = document.forms["frmMain"];
var cbElement = theForm.elements["selInvestorSearchResult"];
cbElement.options.length = 0;
theForm.elements["hidInvestorID"].value = "";
theForm.elements["hidInvestorName"].value = "";
ResetSearchResultSummary(true, false, false, false);
ResetInstInvInfo();
CurrListInSrchRslt = "InvestorList";
populateSearchResultCombo(InvestorList);
} 
function OnReloadRegion()
{
var theForm = document.forms["frmMain"];
var cbElement = theForm.elements["selInvestorSearchResult"];
cbElement.options.length = 0;
theForm.elements["hidRegionId"].value = "";
theForm.elements["hidRegionName"].value = "";
theForm.elements["hidSalesId"].value = "";
theForm.elements["hidSalesName"].value = "";
ResetSearchResultSummary(false, true, false, false);
CurrListInSrchRslt = "RegionList";
populateSearchResultCombo(RegionList);
}
function OnReloadSales()
{
var theForm = document.forms["frmMain"];
var cbElement = theForm.elements["selInvestorSearchResult"];
cbElement.options.length = 0;
theForm.elements["hidSalesId"].value = "";
theForm.elements["hidSalesName"].value = "";
theForm.elements["hidSalesLN"].value = "";
theForm.elements["hidSalesFN"].value = "";
ResetSearchResultSummary(false, false, true, false);
CurrListInSrchRslt = "SalesList";
populateSearchResultCombo(SalesList);
}
function ResetSearchResultSummary(bInvestor, bRegion, bSales, bTrader)
{
if (bInvestor == true)
{
rewriteLayer("pInvestorName", "");
rewriteLayer("pInvestorName2", "");
if (getDocumentElement("ChgInvestor")) 
hideElement(getDocumentElement("ChgInvestor"));
if (getDocumentElement("AddRegion")) 
hideElement(getDocumentElement("AddRegion"));
RegionList = "";
SalesList = "";
TraderList = "";	
}
if (bRegion == true)
{ 
rewriteLayer("pRegionName", "");
if (getDocumentElement("ChgRegion")) 
hideElement(getDocumentElement("ChgRegion"));
SalesList = "";	
TraderList = "";
}
if (bSales == true)
{ 
rewriteLayer("pSalesName", "");
if (getDocumentElement("ChgSales")) 
hideElement(getDocumentElement("ChgSales"));
} 
if (bTrader == true)
{ 
rewriteLayer("pTraderName", "");
} 
}
function ResetInstInvInfo()
{
var theForm = document.forms["frmMain"];
if (getDocumentElement("pInvestorAlias"))
rewriteLayer("pInvestorAlias", "");
if (theForm.elements["ckOneOnOne"]) 
theForm.elements["ckOneOnOne"].checked = false;
if (theForm.elements["ckResearch"])
theForm.elements["ckResearch"].checked = false;
if (theForm.elements["ckRoadShow"])
theForm.elements["ckRoadShow"].checked = false;
if (theForm.elements["ckFirstTimeBuyer"])
theForm.elements["ckFirstTimeBuyer"].checked = false;
if (theForm.elements["selTradeQuality"])
theForm.elements["selTradeQuality"].selectedIndex = 0;
if (theForm.elements["hidUseAlias"])
theForm.elements["hidUseAlias"].value = "0";
if(theForm.elements["rNoRoadshow"])
theForm.elements["rNoRoadshow"].checked = true;
if (theForm.elements["ckNetRoadshow"])
theForm.elements["ckNetRoadshow"].checked = false;	
if (theForm.elements["ckConferenceCall"])
theForm.elements["ckConferenceCall"].checked = false;
}
function OnFindInvestor()
{
var bPopulateInvestorAndRegion = false;
var openedCoverage;
var txtElement;
var strValues;
var theForm = document.forms["frmMain"];
var co;
var selRegion;
var selSales;
var selInvestor;
var theRole = theForm.elements["hidIOIUserRole"].value;
theForm = document.forms["frmMain"];
txtElement = theForm.elements["txtInvestorSearch"];
strValues = txtElement.value; 
if (strValues == "")
{
var sStatusMsg = new String;
sStatusMsg = sStatusMsg + "Please correct the following error(s):<br>";
var sMsg = " must contain some value..";
sStatusMsg = sStatusMsg + "<li><a href='JavaScript:self.window.opener.document.frmMain.txtInvestorSearch.focus()'>Investor search </a> " + sMsg + "<br>";
showErrorMessage(sStatusMsg);
}
else
{
if(theRole=="SyndicateMarketing" || theRole == "SyndicateRemoteDesk" || theRole=="SyndicateParticipant")
{
var iInvestorType=1;
if(theForm.elements["selInvestorType"])
{
iInvestorType = theForm.elements["selInvestorType"][theForm.elements["selInvestorType"].selectedIndex].value;
}
if(iInvestorType==1)
{
co = RSExecute('rs_bookbuild_indication_server.asp', 'js_ListInvestorByNameWithMask', strValues);
}
else
{
co = RSExecute('rs_bookbuild_indication_server.asp', 'js_ListBrokersByName', strValues);
}
if(theRole=="SyndicateMarketing")
reset_selected_region_sales();
}
else
{
if (enforceOrderControlPermission())
{
var arrOpenCoverage = listOpenedSalesCoverage(document.forms["frmMain"].hidTrnId.value, '', strValues, '', theForm.elements["hidSalesId"].value, v_INSTITUTIONAL_INVESTOR + v_REGION);
bPopulateInvestorAndRegion = true;
}
else
co = RSExecute('rs_bookbuild_indication_server.asp', 'js_ListInvestorByNameAndSales', strValues, theForm.elements["hidSalesId"].value);
}
CurrListInSrchRslt = "InvestorList";
if (bPopulateInvestorAndRegion)
{
callback_populateInvestorSearchResultComboByRetVal(getOpenedSalesCoverage(arrOpenCoverage, v_INSTITUTIONAL_INVESTOR)); 
populateRegionCombo(getOpenedSalesCoverage(arrOpenCoverage, v_REGION));
}
else
callback_populateInvestorSearchResultCombo(co); 
} 
}
function OnFindInvestorBySymbol()
{
var bPopulateInvestorAndRegion = false;
var openedCoverage;
var txtElement;
var strValues;
var theForm = document.forms["frmMain"];
var co;
var selRegion;
var selSales;
var selInvestor;
var theRole = theForm.elements["hidIOIUserRole"].value;
theForm = document.forms["frmMain"];
txtElement = theForm.elements["txtIpsInvestorSearch"];
strValues = txtElement.value; 
if (strValues == "")
{
var sStatusMsg = new String;
sStatusMsg = sStatusMsg + "Please correct the following error(s):<br>";
var sMsg = " must contain some value..";
sStatusMsg = sStatusMsg + "<li><a href='JavaScript:self.window.opener.document.frmMain.txtInvestorSearch.focus()'>Investor search </a> " + sMsg + "<br>";
showErrorMessage(sStatusMsg);
}
else
{
if(theRole=="SyndicateMarketing" || theRole == "SyndicateRemoteDesk" || theRole=="SyndicateParticipant")
{
co = RSExecute('rs_bookbuild_indication_server.asp', 'js_ListInvestorBySymbol', strValues);
if(theRole=="SyndicateMarketing")
reset_selected_region_sales();
}
CurrListInSrchRslt = "InvestorList";
callback_populateInvestorSearchResultCombo(co); 
} 
}
function callback_populateInvestorSearchResultCombo(co)
{
callback_populateInvestorSearchResultComboByRetVal(co.return_value);
}
function callback_populateInvestorSearchResultComboByRetVal(strResult)
{ 
populateInvestorSearchResultCombo(strResult);
if (!enforceOrderControlPermission())
appendSearchResultsWithCoverageData(true);
}
function populateInvestorSearchResultCombo(strData)
{
theForm = document.forms["frmMain"];
cbElement = theForm.elements["selInvestorSearchResult"];
if(cbElement)
cbElement.options.length = 0;
if (strData && strData != "")
{
InvestorIDArray = new Array();
InvestorMaskArray = new Array();
aryRecords = strData.split("\t");
for (i=0; i < aryRecords.length-1; i++)
{
aryData = aryRecords[i].split("\x08");
aryName_Mask = aryData[1].split("\x04");
InvestorIDArray[i] = aryData[0];
InvestorMaskArray[i] = aryName_Mask[1];
cbElement.options[cbElement.options.length]= new Option(aryName_Mask[0], aryData[0]);
}
NumInvestors = i;
InvestorList = strData;
} 
else
{
cbElement.options[cbElement.options.length]= new Option(RC_NORESULTS, "0");
}
}
function clearInvestor()
{
var theForm = document.forms["frmMain"];
rewriteLayer("pInvestorName", "");
rewriteLayer("pInvestorName2", "");
sPreviousInvestorId = theForm.elements["hidInvestorID"].value;
if(sPreviousInvestorId =="") sPreviousInvestorId= theForm.elements["hidOneOffInvestorInd"].value
theForm.elements["hidInvestorID"].value = "";
theForm.elements["hidInvestorName"].value = "";
}
function appendSearchResultsWithCoverageData(bShowCoverageSeparator)
{
if (arrSalesInvestor.length < 1)
return;
var theForm = document.forms["frmMain"];
var cbElement = theForm.elements["selInvestorSearchResult"];
var sInvestorText;
var i;
if(cbElement)
{
if (bShowCoverageSeparator)
cbElement.options[cbElement.options.length]= new Option("---" + RC_SALES_COVERAGE + "---", "0");
for (i=0; i<arrSalesInvestor.length; i++)
{
sInvestorText = UnencodeXML(arrSalesInvestor[i][1]);
cbElement.options[cbElement.options.length]= new Option(sInvestorText, arrSalesInvestor[i][0]);
}
}
}	
function onBlurOneOffInvestor()
{
var theForm = document.forms["frmMain"];
if(sPreviousInvestorId	!="" && sPreviousOneOffInvestor != document.forms["frmMain"].elements["txtOneOffInvestorName"].value)
ResetIOIEntry(true);
sPreviousInvestorId = theForm.elements["hidInvestorID"].value;
if(sPreviousInvestorId =="") sPreviousInvestorId= document.forms["frmMain"].elements["hidOneOffInvestorInd"].value;
sPreviousOneOffInvestor = document.forms["frmMain"].elements["txtOneOffInvestorName"].value; 
} 
function onOneOffInvestorNameKeyPress()
{
var theRole = theForm.elements["hidIOIUserRole"].value;
if(document.forms["frmMain"].elements["hidOneOffInvestorInd"])
{
document.forms["frmMain"].elements["hidOneOffInvestorInd"].value="1";
}
if(theForm.elements["selInvestorSearchResult"])
theForm.elements["selInvestorSearchResult"].options.length=0;
if(theRole=="SyndicateMarketing")
if(theForm.elements["selInvestor"])
theForm.elements["selInvestor"].options.length=0;
rewriteLayer("pInvestorName", "");
rewriteLayer("pInvestorName2", "");
theForm.elements["hidInvestorID"].value ="";
theForm.elements["hidInvestorName"].value = "";
} 
function onAmountFieldKeyPress(objElement, event)
{
var strElementValue=objElement.value;
var strKeyValue=String.fromCharCode(window.event.keyCode);
var strSelectedValue;
var range;
var sBookmark;
if(document.all)
{
if (document.selection && document.selection.createRange) 
{
range = document.selection.createRange();
strSelectedValue = range.text;
}
sBookmark = range.getBookmark();
window.clipboardData.setData("text", strKeyValue);
range.execCommand("Paste");
range.expand("textedit");
window.clipboardData.setData("text", formatAmountString(range.text));
range.execCommand("Paste");
range.moveToBookmark(sBookmark);
range.collapse(false);
window.event.keycode=null;
return false;
}
else
{
return true;
}
}
function OnInvestorSearchResultSelect()
{
var cbElement;
theForm = document.forms["frmMain"];
cbElement = theForm.elements["selInvestorSearchResult"];
SelectInvestor(cbElement.selectedIndex);
}
function SelectInvestor(RecordSelected)
{
var cbElement;
var strSelectedValues;
var strValue;
var strLabel;
var theForm = document.forms["frmMain"];
var RecordSelected;
var co;
var selInvestor;
var theRole = theForm.elements["hidIOIUserRole"].value;
var theInvestorType = "";
if(theForm.elements["selInvestorType"])
theInvestorType = theForm.elements["selInvestorType"].value;
else
theInvestorType='1';
theForm = document.forms["frmMain"];
cbElement = theForm.elements["selInvestorSearchResult"];
if (RecordSelected != -1) 
{
strValue = cbElement.options[RecordSelected].value;
strLabel = cbElement.options[RecordSelected].text;
if (strValue == "999" || strValue == "0")
return;
if (theForm.hidEnableQIBFeature.value == "1")
rewriteLayer("pInvestorName", strLabel + " (" + GetInvestorQIBStatus(strValue) + ")");
else
rewriteLayer("pInvestorName", strLabel);
if(theForm.elements["hidEnableRule2790AtAcctLevel"] != null)
{
if (theForm.elements["hidEnableRule2790AtAcctLevel"].value == "1")
{
rewriteLayer("pFlag2790", GetInvestor2790Status(strValue));
}
} 
rewriteLayer("pInvestorName2", strLabel);
sPreviousInvestorId = theForm.elements["hidInvestorID"].value;
if(sPreviousInvestorId =="") sPreviousInvestorId= theForm.elements["hidOneOffInvestorInd"].value
theForm.elements["hidInvestorID"].value = strValue;
theForm.elements["hidInvestorName"].value = strLabel;
PermissionedProductList = "";
theForm.hidOneOffInvestorInd.value="";
if (theForm.txtOneOffInvestorName)
{
theForm.txtOneOffInvestorName.value="";
}
if(theRole !="SyndicateMarketing")
theForm.elements["selInvestor"].selectedIndex=0;
var InvestorId = theForm.elements["hidInvestorID"].value;
if ( (InvestorId > 0) && (PermissionedProductList == "") )
{
GetProductInvestorPermissioning(InvestorId);
}
if(InvestorId>0 && theInvestorType=="1")
{
GetSalesCoverage(InvestorId);
if(theForm.elements["hidSalesId"])
{
if(theForm.elements["hidSalesId"].value.length > 0 && (theForm.elements["hidRegionId"].value.length==0 || enforceOrderControlPermission()))
{
SetRegionCBByCoverage(theForm.elements["hidSalesId"].value, InvestorId); 
}
else if(theForm.elements["hidRegionId"].value.length > 0 && theForm.elements["hidSalesId"].value.length==0 && theRole != "SalesAccountExecutive")
{
SetSalesByCoverage(InvestorId,theForm.elements["hidRegionId"].value); 
}
else if(theForm.elements["hidSalesId"].value.length==0)
{
cbElement = theForm.elements["selSalesSearchResult"];
if(cbElement && cbElement.options.length==1)
{
if(cbElement.options[0].value != 0 )
SelectSales(0);
}
if( cbElement && (cbElement.options.length > 1) )
{
ret = AllSalesPersonsBelongToTheSameRegion(InvestorId) ;
if(ret == true)
{
if(cbElement.options[0].value != 0 )
{
SetRegionCBByCoverage(cbElement.options[0].value, InvestorId); 
}
}
}
}
}
var sEnableSalesTrader = theForm.elements["hidEnableSalesTrader"].value;
var theRole = theForm.elements["hidIOIUserRole"].value;
if (sEnableSalesTrader == 'True' && theRole == 'SyndicateMarketing' )
GetTraderCoverage(InvestorId);
}
if ( (InvestorId > 0) )
{
GetProductInvestorPermissioning(InvestorId);
GetOrder();
}
}
sPreviousInvestorId = theForm.elements["hidInvestorID"].value;
if(sPreviousInvestorId =="") sPreviousInvestorId= document.forms["frmMain"].elements["hidOneOffInvestorInd"].value;
} 
function SelectInvestorFromDropDown(RecordSelected)
{
var cbElement;
var strSelectedValues;
var strSelectedIndex;
var strValue;
var strLabel;
var theForm = document.forms["frmMain"];
var co;
var selInvestor;
var theRole = theForm.elements["hidIOIUserRole"].value;
var theInvestorType = "";
if(theForm.elements["selInvestorType"])
theInvestorType = theForm.elements["selInvestorType"].value;
else
theInvestorType='1';
theForm = document.forms["frmMain"];
cbElement = theForm.elements["selInvestor"];
strSelectedIndex = cbElement.selectedIndex;	
if (RecordSelected != -1) 
{
strValue = cbElement.options[RecordSelected].value;
strLabel = cbElement.options[RecordSelected].text;
if (strValue == "999" || strValue == "0")
return;
rewriteLayer("pInvestorName", strLabel);
rewriteLayer("pInvestorName2", strLabel);
theForm.elements["hidInvestorID"].value = strValue;
theForm.elements["hidInvestorName"].value = strLabel;
PermissionedProductList = "";
if(sPreviousInvestorId	!="")
ResetIOIEntry(true);
theForm.hidOneOffInvestorInd.value="";
if (theForm.txtOneOffInvestorName)
{
theForm.txtOneOffInvestorName.value="";
}
theForm.elements["selInvestor"].selectedIndex=strSelectedIndex;
var InvestorId = theForm.elements["hidInvestorID"].value;
if ( (InvestorId > 0) && (PermissionedProductList == "") )
{
GetProductInvestorPermissioning(InvestorId);
} 
if(InvestorId>0 && theInvestorType=="1")
{
GetSalesCoverage(InvestorId);
if(theForm.elements["hidSalesId"])
{
if(theForm.elements["hidSalesId"].value.length > 0 && theForm.elements["hidRegionId"].value.length==0)
{ 
SetRegionCBByCoverage(theForm.elements["hidSalesId"].value, InvestorId); 
}
else if(theForm.elements["hidRegionId"].value.length > 0 && theForm.elements["hidSalesId"].value.length==0 && theRole != "SalesAccountExecutive")
{
SetSalesByCoverage(InvestorId,theForm.elements["hidRegionId"].value); 
} 
}
}
if ( (InvestorId > 0) )
{
GetProductInvestorPermissioning(InvestorId); 
GetOrder(); 
}
}
sPreviousInvestorId = theForm.elements["hidInvestorID"].value;
if(sPreviousInvestorId =="") sPreviousInvestorId= document.forms["frmMain"].elements["hidOneOffInvestorInd"].value; 
} 
function OnInvestorTypeSelect(cbElement)
{
var strSelectedValues;
var strValue="";
var strLabel="";
var theForm = document.forms["frmMain"];
var RecordSelected;
var co;
var selInvestor;
var theRole = theForm.elements["hidIOIUserRole"].value;
var aryData;
var aryRecords;
var strResult="";
var co;
theForm = document.forms["frmMain"];
RecordSelected = cbElement.selectedIndex; 
if (RecordSelected != -1) 
{ 
rewriteLayer("pInvestorName", "");
rewriteLayer("pInvestorName2", "");
theForm.elements["hidInvestorID"].value = strValue;
theForm.elements["hidInvestorName"].value = strLabel;
theForm.elements["selInvestorSearchResult"].options.length=0;
if(theForm.elements["selInvestor"])
theForm.elements["selInvestor"].options.length=0;
strUPN = theForm.elements["hidIOIUserUPN"].value;
if(cbElement[RecordSelected].value==1)
{
showElement(getDocumentElement("divOneOffLabel"));
showElement(getDocumentElement("divOneOffText"));
if (document.all) 
showCollapsibleDiv(getDocumentElement("divSearch"));
else if (document.layers) 
{
enableDisableElement(theForm.elements["txtInvestorSearch"], false);
enableDisableElement(theForm.elements["selInvestorSearchResult"], false);
}
}
else
{
hideElement(getDocumentElement("divOneOffLabel"));
hideElement(getDocumentElement("divOneOffText"));
if(theRole=="SyndicateParticipant")
{
if (document.all) 
hideCollapsibleDiv(getDocumentElement("divSearch"));
else if (document.layers) 
{
enableDisableElement(theForm.elements["txtInvestorSearch"], true);
enableDisableElement(theForm.elements["selInvestorSearchResult"], true); 
}
theForm.elements["hidInvestorID"].value = theForm.elements["hidIOIUserID"].value;
theForm.elements["hidInvestorName"].value = theForm.elements["hidIOIUserName"].value;
rewriteLayer("pInvestorName", theForm.elements["hidInvestorName"].value);
rewriteLayer("pInvestorName2", theForm.elements["hidInvestorName"].value);
}
}
if(theRole!="SyndicateParticipant")
{
if(cbElement[RecordSelected].value==1)
{
co = RSExecute('rs_bookbuild_indication_server.asp', 'js_ListMRUInvestors', strUPN);
}
else
{
co = RSExecute('rs_bookbuild_indication_server.asp', 'js_ListMRUBrokers', strUPN); 
}
strResult = co.return_value;
if (strResult && strResult != "")
{
cbElement = theForm.elements["selInvestor"];
aryRecords = strResult.split("\t");
cbElement.options[cbElement.options.length]= new Option("--Recently Used--", 0);
for (i=0; i < aryRecords.length-1; i++)
{
aryData = aryRecords[i].split("\b");
cbElement.options[cbElement.options.length]= new Option(aryData[1], aryData[0]);
}
InvestorList = strResult;
ResetIOIEntry(true);
InitializeComments();
hideElement(getDocumentElement("divIdentity"));
} 
}
else	
{
var theInvestorType = "";
if(theForm.elements["selInvestorType"])
theInvestorType = theForm.elements["selInvestorType"][RecordSelected].value;
else
theInvestorType=1;
PermissionedProductList = "";
ResetIOIEntry(true);
InitializeComments();
theForm.txtInvestorSearch.value="";
theForm.hidOneOffInvestorInd.value="";
if (theForm.txtOneOffInvestorName)
theForm.txtOneOffInvestorName.value="";
hideElement(getDocumentElement("divIdentity"));
if(theInvestorType==2)
{
var investorID = theForm.elements["hidIOIUserID"].value;
GetProductInvestorPermissioning(investorID);
} 
ClearComboBox(theForm.elements["selInvestorSearchResult"]); 
} 
}
} 
function OnFindSales()
{
var txtElement;
var strValues;
var theForm = document.forms["frmMain"];
var co;
var selRegion;
var selSales;
var selInvestor;
var theRole = theForm.elements["hidIOIUserRole"].value;
theForm = document.forms["frmMain"];
txtElement = theForm.elements["txtSalesSearch"];
strValues = txtElement.value; 
if (strValues == "")
{
var sStatusMsg = new String;
sStatusMsg = sStatusMsg + "Please correct the following error(s):<br>";
var sMsg = " must contain some value..";
sStatusMsg = sStatusMsg + "<li><a href='JavaScript:self.window.opener.document.frmMain.txtSalesSearch.focus()'>Sales search </a> " + sMsg + "<br>";
showErrorMessage(sStatusMsg);
}
else
{
ResetSearchResultSummary(false, false, true, false);
theForm.elements["hidSalesId"].value = "";
theForm.elements["hidSalesName"].value = "";
theForm.elements["hidSalesLN"].value = "";
theForm.elements["hidSalesFN"].value = "";
co = RSExecute('rs_bookbuild_indication_server.asp', 'js_ListSalesByLastName', strValues, 'SALEAE');
CurrListInSrchRslt = "SalesList";
callback_populateSalesSearchResultCombo(co); 
} 
}
function callback_populateSalesSearchResultCombo(co)
{
var cbElement;
var strResult;
strResult = co.return_value;
populateSalesSearchResultCombo(strResult);
}
function populateSalesSearchResultCombo(strData)
{
theForm = document.forms["frmMain"];
cbElement = theForm.elements["selSalesSearchResult"];
if (cbElement)
cbElement.options.length = 0;
if (strData && strData != "")
{
aryRecords = strData.split("\t");
var sNewSalesInd = document.frmMain.hidNewSalesInd.value;
for (i=0; i < aryRecords.length-1; i++)
{
aryData = aryRecords[i].split("\b");
if (cbElement)
{
if (sNewSalesInd == "1")
cbElement.options[cbElement.options.length]= new Option(aryData[2], aryData[0] + ";" + aryData[1]);
else
cbElement.options[cbElement.options.length]= new Option(aryData[1], aryData[0]);
}
}
SalesList = strData;
}
else
{
if (cbElement)
cbElement.options[cbElement.options.length]= new Option("No results found", "0");
} 
}
function OnSalesSearchResultSelect()
{
theForm = document.forms["frmMain"];
cbElement = theForm.elements["selSalesSearchResult"];
SelectSales(cbElement.selectedIndex);
}
function SelectSales(RecordSelected)
{
var cbElement;
var strSelectedValues;
var strValue;
var strLabel;
var aryValues;
var theForm = document.forms["frmMain"];
var RecordSelected;
var co;
var selInvestor;
var theRole = theForm.elements["hidIOIUserRole"].value;
theForm = document.forms["frmMain"];
cbElement = theForm.elements["selSalesSearchResult"];
if (RecordSelected != -1) 
{
strValue = cbElement.options[RecordSelected].value;
strLabel = cbElement.options[RecordSelected].text;
aryValues = strLabel.split(",");
if (strValue == "999" || strValue == "0")
return;
rewriteLayer("pSalesName", strLabel);
rewriteLayer("pSalesName2", strLabel);
theForm.elements["hidSalesId"].value = strValue;
theForm.elements["hidSalesName"].value = strLabel;
if (aryValues.length > 1)
{
theForm.elements["hidSalesLN"].value = aryValues[0];
theForm.elements["hidSalesFN"].value = aryValues[1];
}
else
{
theForm.elements["hidSalesLN"].value = aryValues[0];
theForm.elements["hidSalesFN"].value = "";
}
PermissionedProductList = "";
if(theForm.elements["hidInvestorID"].value.length > 0 && theForm.elements["hidRegionId"].value.length==0)
{
SetRegionCBByCoverage(theForm.elements["hidSalesId"].value, theForm.elements["hidInvestorID"].value); 
}
if(theForm.elements["hidRegionId"].value.length==0)
{
SetRegionCBBySalesCoverage(theForm.elements["hidSalesId"].value); 
} 
if (theForm.elements["hidRegionId"].value.length==0)
{
ResetRegion(strValue); 
}
LoadInvestorBySaleAndRegion();
if(theForm.elements["hidInvestorID"].value.length == 0)
{
var cbElement = theForm.elements["selInvestorSearchResult"];
if(cbElement.options.length==1)
{
if(cbElement.options[0].value != 0 )
SelectInvestor(0);
}
}
}
} 
function ResetRegion(salesID)
{
var cbElement;
var strSelectedValues;
var strValue;
var theForm;
var RecordSelected;
var co;
var selInvestor;
co = RSExecute('rs_bookbuild_indication_server.asp', 'js_ListRegionBySalesFromCatAccess', salesID);
strResult = co.return_value;
theForm = document.forms["frmMain"];
if (strResult != "")
{
aryRecords = strResult.split("\t");
if(aryRecords.length > 0)
{
var i = 0;
aryData = aryRecords[i].split("\b");
strValue = aryData[0];
strLabel = aryData[1];
theForm.elements["hidRegionId"].value = strValue;
theForm.elements["hidRegionName"].value = strLabel;
rewriteLayer("pRegionName", strLabel);
rewriteLayer("pRegionName2", strLabel);
cbElement = theForm.elements["selRegion"];
if(cbElement) 
{
for (var j=0; j <= cbElement.options.length-1;j++)
{
if (cbElement.options[j].value==strValue)
{
cbElement.selectedIndex=j;
break;
}
}
}
}
}
}
function LoadInvestorPermissioning()
{
var theForm = document.forms["frmMain"];
var theRole = theForm.elements["hidIOIUserRole"].value
var investorId;
if (theRole == "InstitutionalInvestorIOI")
{
investorId = theForm.elements["hidIOIUserID"].value;
theForm.elements["hidInvestorID"].value = investorId;
theForm.elements["hidInvestorName"].value = theForm.elements["hidIOIUserName"].value;
GetProductInvestorPermissioning(investorId);
}
}
function GetProductInvestorPermissioning(investorId)
{
var theForm = document.forms["frmMain"];
var theRole = theForm.elements["hidIOIUserRole"].value;
var DealType = theForm.elements["hidDealType"].value;
if (theRole == "InstitutionalInvestorIOI")
{
if (PermissionedProductList.length == 0)
{ 
var IssueId = theForm.elements["hidIssueId"].value;
var co = RSExecute('rs_bookbuild_indication_server.asp', 'js_ListPermissionedTrancheByInvestor', IssueId, investorId);
PermissionedProductList = co.return_value; 
} 
var cbElement = theForm.elements["selTranche"];
var theSelected = cbElement.selectedIndex;
if (theSelected > 0)
{
var strValues = cbElement.options[theSelected].value;
var aryValues = strValues.split(";");
var trnId = aryValues[0];
SetIOIEntryPermissionEQ(trnId);
}
}
}
function GetPermittedProductByTranche(trnId)
{
var pTrnId;
var pPrdId;
var pProductIdList = "";
var aryData;
var aryRecords = PermissionedProductList.split("\t");
for (i=0; i < aryRecords.length-1; i++)
{
aryData = aryRecords[i].split("\b");
pTrnId = aryData[0];
pPrdId = aryData[2];
if (pTrnId == trnId)
{
pProductIdList += pPrdId
pProductIdList += ",";
}
} 
return pProductIdList;
}
function SetIOIEntryPermissionFI()
{
var theForm = document.forms["frmMain"];
var numTranche = theForm.elements["hidNumTranche"].value;
var frmPrdId;
var frmTrnId;
for (var i=0; i<numTranche; i++)
{
frmTrnId = theForm.elements["hidTrnId" + i].value;
frmPrdId = theForm.elements["hidPrdId" + i].value;
EnableIOIEntry(i, IsProductPermissioned(frmTrnId, frmPrdId)); 
}
}
function SetIOIEntryPermissionEQ(TrnId)
{
var theForm = document.forms["frmMain"];
var numProduct = theForm.elements["hidNumProduct"].value;
var frmPrdId;
for (var i=0; i<numProduct; i++)
{
frmPrdId = theForm.elements["hidPrdId" + i].value;
EnableIOIEntry(i, IsProductPermissioned(TrnId, frmPrdId)); 
}
} 
function IsProductPermissioned(trnId, prdId)
{
var theForm = document.forms["frmMain"];
var theRole = theForm.elements["hidIOIUserRole"].value;
if (theRole == "InstitutionalInvestorIOI")
{
var PProductList = GetPermittedProductByTranche(trnId);
if (PProductList.length > 0)
aryProductList = PProductList.split(","); 
else
return false; 
for (var j=0; j<aryProductList.length; j++)
{
if (prdId == aryProductList[j])
return true;
}
return false; 
}
else
{
return true;
}
} 
function EnableIOIEntry(iprd, bEnabled)
{ 
var theForm = document.forms["frmMain"];
var DealType = theForm.elements["hidDealType"].value;
var IssueTypeCode = theForm.elements["hidIssueTypeCode"].value
var iEntry;
var bDisabled = !bEnabled; 
if (theForm.elements["selAmountType" + iprd])
{
enableDisableElement(theForm.elements["selAmountType" + iprd],bDisabled);
}
if(theForm.elements["selInvDesiredHedgeType" + iprd])
{
enableDisableElement(theForm.elements["selInvDesiredHedgeType" + iprd],bDisabled);
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
if(theForm.elements["pctTxtDeltaLimit" + iEntry])
enableDisableElement(theForm.elements["pctTxtDeltaLimit" + iEntry], bDisabled);
}
else
{
if (theForm.elements["fltTxtPrice"+ iEntry])
enableDisableElement(theForm.elements["fltTxtPrice"+ iEntry],bDisabled);
}
}
}
function ShowSearchComplete()
{
theForm = document.forms["frmMain"];
cbElement = theForm.elements["selSearchResult"];
if (cbElement)
{
cbElement.options.length = 0;
cbElement.options[cbElement.options.length]= new Option("search completed", "999");
cbElement.selectedIndex = -1;
}
CurrListInSrchRslt = "SearchCompleted";
}
function callback_populateRegionCombo(co)
{
var cbElement;
var strResult;
var aryRecords;
var strLabel;
var aryData;
var strValue;
strResult = co.return_value;
theForm = document.forms["frmMain"];
cbElement = theForm.elements["selRegion"];
cbElement.options.length = 0;
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
}
}
cbElement.selectedIndex = 0;
} 
function OnRegionSelect(bLoadSales)
{
var cbElement;
var strValues;
var theForm;
var theSelected;
var selSale;
theForm = document.forms["frmMain"];
var theRole = theForm.elements["hidIOIUserRole"].value;
cbElement = theForm.elements["selRegion"];
if(!cbElement) return;
theSelected = cbElement.selectedIndex; 
if ( (theSelected >= 0) && (cbElement.options[theSelected].value != 0) )
{
var strCatId = cbElement.options[theSelected].value;
theForm.elements["hidRegionId"].value = strCatId;
theForm.elements["hidRegionName"].value = cbElement.options[theSelected].text;
rewriteLayer("pRegionName", cbElement.options[theSelected].text);
rewriteLayer("pRegionName2", cbElement.options[theSelected].text);
if (theRole == "InstitutionalInvestorIOI")
{
bLoadSales = false;
}
if (bLoadSales == true)
{
if(theForm.elements["hidInvestorID"].value.length>0)
{
var co = RSExecute('rs_bookbuild_indication_server.asp','js_ListSalesByInvestorAndRegion', theForm.elements["hidInvestorID"].value, strCatId, SalesQueryType)
}
else
{
var co = RSExecute('rs_bookbuild_indication_server.asp','js_ListSalesByCategory', strCatId, SalesQueryType)
}
if(theRole != "SalesAccountExecutive" && theRole !="SalesAssistant")
{
populateSalesSearchResultCombo(co.return_value);
}
var sEnableSalesTrader = theForm.elements["hidEnableSalesTrader"].value; 
var theRole = theForm.elements["hidIOIUserRole"].value;
if (sEnableSalesTrader == 'True' && theRole == 'SyndicateMarketing' )
{
if(theForm.elements["hidInvestorID"].value.length>0)
{
var co = RSExecute('rs_bookbuild_indication_server.asp','js_ListSalesByInvestorAndRegion', theForm.elements["hidInvestorID"].value, strCatId, 2)
}
else
{
var co = RSExecute('rs_bookbuild_indication_server.asp','js_ListSalesByCategory', strCatId, 2)
}
populateTraderSearchResultCombo(co.return_value);
}
}
if (enforceOrderControlPermission())
{
var arrOpenCoverage = listOpenedSalesCoverage(theForm.elements["hidTrnId"].value, theForm.hidInvestorID.value, '', cbElement.options[cbElement.options.selectedIndex].value, theForm.elements["hidSalesId"].value, v_COVERAGE);
var coverage = getOpenedSalesCoverage(arrOpenCoverage, v_COVERAGE);
if(coverage.length == 0 || coverage == '0')
{
clearInvestor();
}
var arrOpenCoverage = listOpenedSalesCoverage(theForm.elements["hidTrnId"].value, '', document.forms["frmMain"].elements["txtInvestorSearch"].value, cbElement.options[cbElement.options.selectedIndex].value, theForm.elements["hidSalesId"].value, v_INSTITUTIONAL_INVESTOR);
callback_populateInvestorSearchResultComboByRetVal(getOpenedSalesCoverage(arrOpenCoverage, v_INSTITUTIONAL_INVESTOR)); 
}
}
else 
{
theForm.elements["hidRegionId"].value = "";
theForm.elements["hidRegionName"].value = "";
rewriteLayer("pRegionName", "")
rewriteLayer("pRegionName2", "")
} 
if ( theForm.elements["txtInvestorSearch"] )
{
LoadInvestorBySaleAndRegion(); 
}
if (!enforceOrderControlPermission())
{
if (theRole=="SalesAssistant")
{
theForm.elements["hidInvestorID"].value="";
rewriteLayer("pInvestorName","");
}
}
} 
function callback_populateSalesCombo(co) 
{
var cbElement;
var strResult;
var aryRecords;
var strRecord;
var strLabel;
var aryData;
var iStart;
strResult = co.return_value;
theForm = document.forms["frmMain"];
cbElement = theForm.elements["selSales"];
iStart=-1;
for(var i=0;i<cbElement.options.length-1;i++)
{
if(cbElement.options[i].value==-1)
{
iStart=i;
}
}
if (iStart > -1)
{
for(var i=cbElement.options.length-1;i>=iStart;i--)
{
cbElement.options[i]=null; 
}
}
cbElement.options[cbElement.options.length]= new Option("--Regional--", -1);
if (strResult != "")
{
aryRecords = strResult.split("\t");
for (i=0; i < aryRecords.length-1; i++)
{
aryData = aryRecords[i].split("\b");
strValue = aryData[0];
strLabel = aryData[1];
cbElement.options[cbElement.options.length]= new Option(strLabel, strValue);
}
}
cbElement.selectedIndex = 0;
} 
function OnSASaleSelect()
{
var cbElement;
var theForm;
var theSelected;
var aryValues;
var strValues;
var selSaleId;
var selRegionId;
var selRegionName;
theForm = document.forms["frmMain"];
cbElement = theForm.elements["selSales"];
theSelected = cbElement.selectedIndex; 
if ( (theSelected >= 0) && (cbElement.options[theSelected].value != 0) )
{
strValues = cbElement.options[theSelected].value;
aryValues = strValues.split(";");
selSaleId = aryValues[0];
selRegionId = aryValues[1];
selRegionName = aryValues[2]; 
theForm.elements["hidSalesId"].value = selSaleId;
theForm.elements["hidSalesName"].value = cbElement.options[theSelected].text;
var aryValues = theForm.elements["hidSalesName"].value.split(",");
theForm.elements["hidSalesLN"].value = aryValues[0];
theForm.elements["hidSalesFN"].value = aryValues[1];
theForm.elements["hidRegionId"].value = selRegionId;
theForm.elements["hidRegionName"].value = selRegionName;
rewriteLayer("pRegionName", selRegionName);
LoadInvestorBySaleAndRegion();
} 
else
{
theForm.elements["hidSalesId"].value = "";
theForm.elements["hidSalesName"].value = "";
theForm.elements["hidSalesLN"].value = "";
theForm.elements["hidSalesFN"].value = "";
theForm.elements["hidRegionId"].value = "";
theForm.elements["hidRegionName"].value = "";
rewriteLayer("pRegionName", "");
}
} 
function OnSaleSelect(bLoadRegion)
{
var cbElement;
var strId;
var strName;
var theForm;
var theSelected;
var selRegion;
theForm = document.forms["frmMain"];
cbElement = theForm.elements["selSales"];
var theRole = theForm.elements["hidIOIUserRole"].value;
theSelected = cbElement.selectedIndex; 
if (enforceOrderControlPermission() && cbElement.options[theSelected].value == 0)
{
return;
}
if ( (theSelected >= 0) && (cbElement.options[theSelected].value != 0) )
{
strId = cbElement.options[theSelected].value;
theForm.elements["hidSalesId"].value = strId;
strName = cbElement.options[theSelected].text;
theForm.elements["hidSalesName"].value = strName;
var aryValues = strName.split(",");
theForm.elements["hidSalesLN"].value = aryValues[0];
theForm.elements["hidSalesFN"].value = aryValues[1];
rewriteLayer("pSalesName", strName);
rewriteLayer("pSalesName2", strName);
if (theRole=="InstitutionalInvestorIOI")
{
LoadRegionByCoverage(theForm.elements["hidSalesId"].value, theForm.elements["hidInvestorID"].value); 
OnRegionSelect(false);
return;
}
if (theRole=="SalesAssistant" || theRole=="SalesManager")
{
if (enforceOrderControlPermission())
{
var arrOpenCoverage = listOpenedSalesCoverage(document.frmMain.hidTrnId.value, document.frmMain.hidInvestorID.value, '', document.frmMain.hidRegionId.value, document.frmMain.hidSalesId.value, v_COVERAGE);
var ret = getOpenedSalesCoverage(arrOpenCoverage, v_COVERAGE);
if (ret.length == 0 || ret == '0')
{
clearInvestor();
document.frmMain.hidRegionId.value = "";
theForm.elements["hidRegionName"].value = "";
rewriteLayer("pRegionName", "");
rewriteLayer("pRegionName2", ""); 
} 
arrOpenCoverage = listOpenedSalesCoverage(theForm.elements["hidTrnId"].value, '', document.forms["frmMain"].elements["txtInvestorSearch"].value, '', theForm.elements["hidSalesId"].value, v_INSTITUTIONAL_INVESTOR + v_REGION);
callback_populateInvestorSearchResultComboByRetVal(getOpenedSalesCoverage(arrOpenCoverage, v_INSTITUTIONAL_INVESTOR)); 
populateRegionCombo(getOpenedSalesCoverage(arrOpenCoverage, v_REGION)); 
}
else
{
LoadRegionBySalesCoverage(theForm.elements["hidSalesId"].value);
if(theForm.elements["selRegion"])
{
if(theForm.elements["selRegion"].options.length > 2)
{
theForm.elements["hidRegionId"].value="";
rewriteLayer("pRegionName","");
}
else if(theForm.elements["selRegion"].options.length > 1)
{
SetRegionBySalesCoverage(theForm.elements["hidSalesId"].value); 
LoadInvestorBySaleAndRegion(); 
}
}
theForm.elements["hidInvestorID"].value="";
rewriteLayer("pInvestorName","");
}
}
else
{
if ((theForm.elements["hidRegionId"].value.length==0 && theForm.elements["hidInvestorID"].value.length > 0) || theRole=="InstitutionalInvestorIOI")
{ 
SetRegionByCoverage(theForm.elements["hidSalesId"].value, theForm.elements["hidInvestorID"].value); 
SetRegionCBByCoverage(theForm.elements["hidSalesId"].value, theForm.elements["hidInvestorID"].value); 
} 
if(theForm.elements["hidInvestorID"].value.length > 0 && theForm.elements["hidRegionId"].value.length==0)
{
SetRegionCBByCoverage(theForm.elements["hidSalesId"].value, theForm.elements["hidInvestorID"].value); 
}
if(theForm.elements["hidRegionId"].value.length==0 || enforceOrderControlPermission())
{
if (!pageLoading)
SetRegionBySalesCoverage(theForm.elements["hidSalesId"].value); 
}
if (theRole=="CapitalMarkets")
{
LoadInvestorBySaleAndRegion(); 
}
}
}
else
{
theForm.elements["hidSalesId"].value = "";
theForm.elements["hidSalesName"].value = "";
theForm.elements["hidSalesFN"].value = "";
theForm.elements["hidSalesLN"].value = "";
rewriteLayer("pSalesName", "");
rewriteLayer("pSalesName2", "");
}
if (enforceOrderControlPermission())
setMRUInvestor(''); 
} 
function OnInvestorSelect(bLoadRegion)
{
var cbElement;
var strId;
var strName;
var theForm;
var theSelected;
var selRegion;
theForm = document.forms["frmMain"];
cbElement = theForm.elements["selInvestor"];
sPreviousInvestorId = theForm.elements["hidInvestorID"].value;
if(sPreviousInvestorId =="") sPreviousInvestorId= theForm.elements["hidOneOffInvestorInd"].value
theSelected = cbElement.selectedIndex; 
if ( (theSelected >= 0) && (cbElement.options[theSelected].value != 0) )
{
strId = cbElement.options[theSelected].value;
theForm.elements["hidInvestorID"].value = strId;
strName = cbElement.options[theSelected].text;
theForm.elements["hidInvestorName"].value = strName;
rewriteLayer("pInvestorName", strName);
rewriteLayer("pInvestorName2", strName);
theForm.hidOneOffInvestorInd.value="";
if (theForm.txtOneOffInvestorName)
{
theForm.txtOneOffInvestorName.value="";
} 
var cbElement;
var theForm = document.forms["frmMain"];
cbElement = theForm.elements["selInvestor"];
SelectInvestorFromDropDown(cbElement.selectedIndex);	
}
else
{
theForm.elements["hidInvestorID"].value = "";
theForm.elements["hidInvestorName"].value = "";
rewriteLayer("pInvestorName", "");
rewriteLayer("pInvestorName2", "");
}
if (enforceOrderControlPermission())
{
theForm.elements["selInvestorSearchResult"].selectedIndex = -1;
SetRegionCBByCoverage(theForm.elements["hidSalesId"].value, theForm.elements["hidInvestorID"].value);
}
}
function ClearSearchResult()
{
theForm = document.forms["frmMain"];
cbElement = theForm.elements["selInvestorSearchResult"];
cbElement.options.length = 0;
if (getDocumentElement("pInvestorName"))
rewriteLayer("pInvestorName", "");
if (getDocumentElement("pInvestorName2"))
rewriteLayer("pInvestorName2","");
if (getDocumentElement("ChgInvestor")) 
hideElement(getDocumentElement("ChgInvestor"));
if (getDocumentElement("pRegionName")) 
rewriteLayer("pRegionName", "");
if (getDocumentElement("ChgRegion")) 
hideElement(getDocumentElement("ChgRegion"));
if (getDocumentElement("AddRegion")) 
hideElement(getDocumentElement("AddRegion"));
if (getDocumentElement("pSalesName")) 
rewriteLayer("pSalesName", "");
if (getDocumentElement("ChgSales")) 
hideElement(getDocumentElement("ChgSales"));
}
function ClearComboBox(cbElement)
{
cbElement.options.length = 0;
}
function LoadInvestorBySaleAndRegion()
{
var theForm = document.forms["frmMain"];
var theRole = theForm.elements["hidIOIUserRole"].value
if (theRole != "InstitutionalInvestorIOI")
{
var selRegion = theForm.elements["hidRegionId"].value
var selSale = theForm.elements["hidSalesId"].value
var txtInvestor = theForm.elements["txtInvestorSearch"].value;
var selTrader;
if (theRole == 'SyndicateMarketing')
{
var co; 
if (theForm.elements["hidTraderId"])
{
selTrader = theForm.elements["hidTraderId"].value;
if (selRegion.length > 0 && selTrader.length > 0 && selSale.length > 0) 
co = RSExecute('rs_bookbuild_indication_server.asp', 'js_ListInvestorByCategoryAndSaleAndTrader', selRegion, selSale, selTrader, txtInvestor);
else if (selRegion.length > 0 && selTrader.length > 0)
co = RSExecute('rs_bookbuild_indication_server.asp', 'js_ListInvestorByCategoryAndSale', selRegion, selTrader, txtInvestor);
else if ((selRegion.length > 0) && (selSale.length > 0))
co = RSExecute('rs_bookbuild_indication_server.asp', 'js_ListInvestorByCategoryAndSale', selRegion, selSale, txtInvestor);
else 
return;
}
else if ((selRegion.length > 0) && (selSale.length > 0))
co = RSExecute('rs_bookbuild_indication_server.asp', 'js_ListInvestorByCategoryAndSale', selRegion, selSale, txtInvestor);
else 
return;
CurrListInSrchRslt = "InvestorList";
callback_populateInvestorSearchResultCombo(co);
}
else if ((selRegion.length > 0) && (selSale.length > 0))
{
if (enforceOrderControlPermission())
{
if (theForm.hidInvestorID.value.length > 0 && theForm.hidInvestorID.value != theForm.selInvestor.value)
{
CurrListInSrchRslt = "InvestorList";
var arrOpenedCoverage = listOpenedSalesCoverage(theForm.elements["hidTrnId"].value, '', txtInvestor, selRegion, selSale, v_INSTITUTIONAL_INVESTOR);
callback_populateInvestorSearchResultComboByRetVal(getOpenedSalesCoverage(arrOpenedCoverage, v_INSTITUTIONAL_INVESTOR)); 
}
}
else
{
var co = RSExecute('rs_bookbuild_indication_server.asp', 'js_ListInvestorByCategoryAndSale', selRegion, selSale, txtInvestor);
CurrListInSrchRslt = "InvestorList";
callback_populateInvestorSearchResultCombo(co); 
}
}
else
{
if(theRole=="SalesAssistant")
{
theForm.elements["selInvestorSearchResult"].options.length=0;
theForm.elements["hidInvestorID"].value="";
theForm.elements["hidInvestorName"].value="";
rewriteLayer("pInvestorName","");
}
}
}
else
{
theForm.elements["hidInvestorID"].value = theForm.elements["hidIOIUserID"].value;
theForm.elements["hidInvestorName"].value = theForm.elements["hidIOIUserName"].value;
} 
}
function OnTrancheSelect(bLoadOrder, bShowWarning)
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
var theTrnName;
if (theRole == "SyndicateParticipant") 
bLoadBD = false;
else
bLoadBD = true; 
cbElement = theForm.elements["selTranche"];
theSelected = cbElement.selectedIndex; 
var selectedTranche = cbElement.selectedIndex;
if ( (theSelected >= 0) && (cbElement.options[theSelected].value != 0) )
{
strValues = cbElement.options[theSelected].value;
aryValues = strValues.split(";");
trnId = aryValues[0];
defPrdId = aryValues[1];
popBook = aryValues[2]; 
potIOI = aryValues[3]; 
HardPotInd = aryValues[4];
if (theRole == "SyndicateParticipant")
theTrnName = aryValues[6];
else
theTrnName = aryValues[5];
if (getDocumentElement("hidTrnName")) 
theForm.elements["hidTrnName"].value = theTrnName;
theForm.elements["hidTrnId"].value = trnId;
var iPrd = 0;
for (var i=0; i<prdArray.length && bfind == false; i++)
{
if (prdArray[i][0] == defPrdId)
{
rewriteLayer("pProductName" + iPrd, "Indication - " + prdArray[i][1]);
rewriteLayer("pProductName2" + iPrd, GetPriceDescrAndProductName(prdArray[i][0]));
rewriteLayer("pProductPrice" + iPrd, GetProductFilePrice(prdArray[i][0]));
if(issueTypeCode=="C" || issueTypeCode=="EU")
{
rewriteLayer("ViewTotal" + iPrd, ViewTotalLink + prdArray[i][0] + 
")\">" + sViewTotalIndicationIn + prdArray[i][1] + "\+</a>");
}
if(theForm.elements["selAmountType" + iPrd] && issueTypeCode=="CB")
{
cbElement = theForm.elements["selAmountType" + iPrd];
var hidDispOrder = theForm.elements["hidAmountTypeOrder" + iPrd];
var sDispArr = hidDispOrder.value.split(",");
if (sDispArr.length > 0)
{
if (sDispArr[0] == "0")
cbElement.selectedIndex=0;
else
cbElement.selectedIndex=1;
}
else
cbElement.selectedIndex=0;
cbElement.options.length > 2?cbElement.selectedIndex=0:cbElement.selectedIndex=1;
}
if(theForm.elements["selAmountType" + iPrd] && issueTypeCode=="C")
{
cbElement = theForm.elements["selAmountType" + iPrd];
cbElement.options[1].value = "P" + prdArray[i][0];
cbElement.options[1].text = "Product - " + prdArray[i][1];
cbElement.options.length > 2?cbElement.selectedIndex=0:cbElement.selectedIndex=1;
}
theForm.elements["hidPrdId" + iPrd].value = prdArray[i][0];
bfind = true;
}
} 
for (var i=0; i<prdArray.length; i++)
{
if (prdArray[i][0] != defPrdId)
{
iPrd = iPrd + 1;
rewriteLayer("pProductName" + iPrd, "Indication - " + prdArray[i][1]);
rewriteLayer("pProductName2" + iPrd, GetPriceDescrAndProductName(prdArray[i][0]));
rewriteLayer("pProductPrice" + iPrd, GetProductFilePrice(prdArray[i][0]));
if(issueTypeCode=="C" || issueTypeCode=="EU")
{
rewriteLayer("ViewTotal" + iPrd, ViewTotalLink + prdArray[i][0] + 
")\">" + sViewTotalIndicationIn + prdArray[i][1] + "\+</a>");
}
if(theForm.elements["selAmountType" + iPrd] && issueTypeCode=="CB")
{
cbElement = theForm.elements["selAmountType" + iPrd];
var hidDispOrder = theForm.elements["hidAmountTypeOrder" + iPrd];
var sDispArr = hidDispOrder.value.split(",");
if (sDispArr.length > 0)
{
if (sDispArr[0] == "0")
cbElement.selectedIndex=0;
else
cbElement.selectedIndex=1;
}
else
cbElement.selectedIndex=0;
}
if(theForm.elements["selAmountType" + iPrd] && issueTypeCode=="C")
{
cbElement = theForm.elements["selAmountType" + iPrd];
cbElement.options[1].value = "P" + prdArray[i][0];
cbElement.options[1].text = "Product - " + prdArray[i][1];
cbElement.options.length > 2?cbElement.selectedIndex=0:cbElement.selectedIndex=1;
} 
theForm.elements["hidPrdId" + iPrd].value = prdArray[i][0];
}
} 
ResetIOIEntry(false);
if (bLoadBD == true)
{
if (bLoadOrder!=false )
{
var IssId = theForm.elements["hidIssueId"].value;
var co = RSExecute('rs_bookbuild_indication_server.asp', 'js_ListBrokersByTranche', IssId, trnId);
callback_populateBrokerDealerCombo(co);	
if (HardPotInd == "True") 
GetOrder();
}
} 
else
{
theForm.elements["hidSMBDId"].value = aryValues[5];
if ( bLoadOrder!=false )
GetOrder();
}
if (PermissionedProductList.length > 0)
SetIOIEntryPermissionEQ(trnId);
setOrderType(potIOI); 
ResetLimitDiscount(trnId); 
}
else 
{
theForm.elements["hidTrnId"].value = "";
for (var i=0; i<prdArray.length; i++)
{
rewriteLayer("pProductName" + i, "Indication");
rewriteLayer("pProductName2" + i, "");
rewriteLayer("pProductPrice" + i, "");
rewriteLayer("ViewTotal" + i, "");
cbElement = theForm.elements["selAmountType" + i];
if (issueTypeCode == "C")
{
cbElement.options[1].value = "P";
cbElement.options[1].text = "Product - ";
} 
cbElement = theForm.elements["selLimitDiscount" + i];
theForm.elements["hidPrdId" + i].value = "";
}
ResetIOIEntry(true);
theForm.elements["hidSMBDId"].value = "";
cbElement = theForm.elements["selBrokerDealer"];
if (cbElement)
{
cbElement.options.length = 0;
cbElement.options[cbElement.options.length]= new Option("none selected", "0");
} 
cbElement = theForm.elements["selBilledBy"];
if (cbElement)
{
cbElement.options.length = 0;
cbElement.options[cbElement.options.length]= new Option("none selected", "0");
}
setOrderType("True"); 
}
cbElement = theForm.elements["selTranche"];
cbElement.selectedIndex = selectedTranche;
if (enforceOrderControlPermission() && bShowWarning != false)
{
if (theForm.elements["hidInvestorID"].value.length > 0 && theForm.elements["hidSalesId"].value.length > 0 && theForm.elements["hidRegionId"].value.length > 0)
{
var arrOpenCoverage = listOpenedSalesCoverage(document.forms["frmMain"].hidTrnId.value, theForm.elements["hidInvestorID"].value, '', theForm.elements["hidRegionId"].value, theForm.elements["hidSalesId"].value, v_COVERAGE);
var coverage = getOpenedSalesCoverage(arrOpenCoverage, v_COVERAGE);
if (coverage.length == 0 || coverage == "0")
{
alert('This account is not opened in this region for this tranche .');
} 
}
} 
}
function setOrderType(potIOIInd)
{
var theForm = document.forms["frmMain"];
var theRole = theForm.elements["hidIOIUserRole"].value;
if (potIOIInd == "False")
{
theForm.elements["hidOrderType"].value = "0";
if(theRole=="SyndicateMarketing")
return;
if (theForm.elements["selOrderType"])
theForm.elements["selOrderType"].selectedIndex = 1;
rewriteLayer("lblOrderType", "Retention");
} 
else
{
theForm.elements["hidOrderType"].value = "1";
if(theRole=="SyndicateMarketing")
return;
if (theForm.elements["selOrderType"])
theForm.elements["selOrderType"].selectedIndex = 0;
rewriteLayer("lblOrderType", "Institutional Pot");
} 
}
function ResetIOIEntry(blnInvestor)
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
cbElement = theForm.elements["selTranche"];
theSelected = cbElement.selectedIndex;
strValues = cbElement.options[theSelected].value;
aryValues = strValues.split(";");
if (aryValues.length >= 5)
setOrderType(aryValues[3]);
else
setOrderType("True"); 
if(sPreviousInvestorId != "" && blnInvestor == true)
{
if(theForm.elements["txtSalesComments"]) theForm.elements["txtSalesComments"].value ="";
if(theForm.elements["txtCMComments"]) theForm.elements["txtCMComments"].value ="";
if(theForm.elements["txtSwapComments"])	theForm.elements["txtSwapComments"].value="";
if(theForm.elements["selBilledBy"]) 
{
var idx = (theForm.elements["selBilledBy"].options.length>1) ? 1 : 0;
theForm.elements["selBilledBy"].selectedIndex = idx;
}
var strDefString = theForm.elements["hidMarketOrderString"].value;
var IssueTypeCode = theForm.elements["hidIssueTypeCode"].value;
if(IssueTypeCode=="CP" || IssueTypeCode=="CB")
{
for (i = 1; theForm.elements["fltTxtCoupon"+i] != null; i++)
{
if (theForm.elements["fltTxtCoupon"+i].value != "")
{
if((i%5) == 1)
theForm.elements["fltTxtCoupon"+i].value = strDefString;
else
theForm.elements["fltTxtCoupon"+i].value = "";
}
}
for (i = 1; theForm.elements["fltTxtPremium"+i] != null; i++)
{
if (theForm.elements["fltTxtPremium"+i].value != "")
{
if((i%5) == 1)
theForm.elements["fltTxtPremium"+i].value = strDefString;
else
theForm.elements["fltTxtPremium"+i].value = "";
} 
}
for (i = 1; theForm.elements["pctTxtDeltaLimit"+i] != null; i++)
{
if(theForm.elements["pctTxtDeltaLimit"+i].value != "")
{
theForm.elements["pctTxtDeltaLimit"+i].value = "";
}
}
for (i = 0; theForm.elements["selInvDesiredHedgeType" + i] != null; i++)
{
theForm.elements["selInvDesiredHedgeType" + i].value = 0;
}
}
else
{
for (var i = 1; theForm.elements["fltTxtPrice"+i] != null; i++)
{
if (theForm.elements["fltTxtPrice"+i].value != "")
{
if((i%5) == 1)
theForm.elements["fltTxtPrice"+i].value = strDefString;
else
theForm.elements["fltTxtPrice"+i].value = "";
}
}
}
} 
for (var i=0; i<numProduct; i++)
{
var defPrdId = theForm.elements["hidPrdId" + i].value;
var defPrdCcyId = getProductCurrency(defPrdId);
if (theForm.elements["selAmountType" + i])
{
cbElement = theForm.elements["selAmountType" + i];
if ((IssueTypeCode == "EU") && (cbElement.options.length > 1))
{
ReSequenceAmtType(cbElement, defPrdCcyId);
cbElement.options.length > 2?cbElement.selectedIndex=0:cbElement.selectedIndex=1;
}
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
if(arrStdCurrencySeq[iStd] != null)
{
if (arrStdCurrencySeq[iStd][0] == ccyId)
return arrStdCurrencySeq[iStd][1];
}
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
function callback_populateBrokerDealerCombo(co) 
{
var cbElement;
var strResult;
var aryRecords;
var strRecord;
var strLabel;
var strValue;
var aryData;
strResult = co.return_value;
theForm = document.forms["frmMain"];
theRole = theForm.elements["hidIOIUserRole"].value;
cbElement = theForm.elements["selBrokerDealer"];
cbElement.options.length = 0;
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
}
if(theRole=="SyndicateMarketing" || theRole == "SyndicateRemoteDesk" || theRole == "SalesAccountExecutive" || theRole == "SalesAssistant" || theRole == "SalesTrader" || theRole == "SalesManager")	
{
if (aryRecords.length-1 > 1)
cbElement.selectedIndex=1;
else
cbElement.selectedIndex=0;
}
else
{
cbElement.selectedIndex = 0;
}
OnBrokerSelect();
cbElement = theForm.elements["selBilledBy"];
if (cbElement)
{
cbElement.options.length = 0;
if (strResult != "")
{
var iSelectedBrkr = -1;
aryRecords = strResult.split("\t");
if (aryRecords.length-1 > 1)
cbElement.options[cbElement.options.length]= new Option("none selected", "0");
for (i=0; i < aryRecords.length-1; i++)
{
aryData = aryRecords[i].split("\b");
strValue = aryData[0];
strLabel = aryData[1];
cbElement.options[cbElement.options.length]= new Option(strLabel, strValue);
if(aryData[2] == theForm.hidBillDeliverBroker.value)
{
if (aryRecords.length-1 > 1)
iSelectedBrkr = i+1;
else
iSelectedBrkr = i;
}
}
if(theForm.hidBillDeliverBroker.value == "")
iSelectedBrkr = 0;
}
if(iSelectedBrkr != -1 )
{
cbElement.selectedIndex = iSelectedBrkr;
}
else
{
if (aryRecords.length-1 > 1)
cbElement.selectedIndex=1;
else
cbElement.selectedIndex=0;
}
}
} 
else
{
OnBrokerSelect();
} 
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
sMessage = sMessage + "<tr><td width='150' height='62' rowspan='3' class='topWelcomeArea1' valign='top'><img src='../images/brand.gif' width='119' height='62' border='0' alt='i-Deal'></td>";
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
var sHeight = "height=" + (85 + (3 * 22));
var sWindowParms = "toolbar=no,location=no,directories=no,scrollbars=yes,resizable=yes,width=650,center=yes,dependent=yes," + sHeight;
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
function checkSwapFlag(frm)
{
var ck = frm.elements["ckSwap"];
if(!ck.checked)
{
frm.elements["txtSwapComments"].blur();
} 
}
function clearSwapComments(frm)
{
var ck = frm.elements["ckSwap"];
if(!ck.checked)
{
frm.elements["txtSwapComments"].value="";
} 
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
function UnencodeXML(sText)
{
if(sText==null) return null;
var sReplaceStringsSrc=new Array();
sReplaceStringsSrc[0]="&amp;";
sReplaceStringsSrc[1]="&gt;";
sReplaceStringsSrc[2]="&lt;";
sReplaceStringsSrc[3]="&quot;";
sReplaceStringsSrc[4]="&nbsp;";
var sReplaceStringsDst=new Array();
sReplaceStringsDst[0]="&";
sReplaceStringsDst[1]=">";
sReplaceStringsDst[2]="<";
sReplaceStringsDst[3]="\"";
sReplaceStringsDst[4]=" ";
var sHTML=sText;
for(var i=0;i<sReplaceStringsSrc.length;i++)
{
sHTML=sHTML.replace(sReplaceStringsSrc[i], sReplaceStringsDst[i]);
}	
return sHTML;
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
function onChangeSearchResult(oElement)
{
if(oElement.selectedIndex > -1) window.status=oElement[oElement.selectedIndex].text;
return 1;
}
function onChangeInvDesiredHedgeWithCleanUp(position, canClean)
{
var theForm = document.forms["frmMain"];
var selInvDesiredHedgeType = theForm.elements["selInvDesiredHedgeType" + position.toString()];
var offset = position + 1
for(var i=offset; i<(offset + 5); i++)
{
if(theForm.elements["pctTxtDeltaLimit" + i.toString()] != null)
{
if(canClean)
{
theForm.elements["pctTxtDeltaLimit" + i.toString()].value = '';
}
if (selInvDesiredHedgeType.value == 0 || selInvDesiredHedgeType.value == 1)
{
enableDisableElement(theForm.elements["pctTxtDeltaLimit" + i.toString()], true);
}
if (selInvDesiredHedgeType.value == 2)
{
enableDisableElement(theForm.elements["pctTxtDeltaLimit" + i.toString()], false);
}
}
}
}
function onChangeInvDesiredHedge(position)
{
onChangeInvDesiredHedgeWithCleanUp(position, true);
}
function GetOrderByOrderTrack(OrderTrackId)
{
if ( OrderTrackId>0 )
{
var theForm = document.forms["frmMain"];
var IssId = theForm.elements["hidIssueId"].value;
var LocaleId = theForm.elements["hidLocaleID"].value;
var TimeZoneOffset = document.forms["frmMain"].elements["hidTimeZoneOffset"].value;
var co = RSExecute('rs_bookbuild_indication_server.asp', 'js_GetEquityOrderByOrderTrackId', OrderTrackId, LocaleId, TimeZoneOffset);
var strValues = co.return_value;
var aryRecords = strValues.split("\t");
var aryData = aryRecords[0].split("\b");
var TrnId = aryData[26];
var cbElement = theForm.elements["selTranche"];
for ( var i=0; i<cbElement.options.length; i++ )
{ 
strValues = cbElement.options[i].value;
aryValues = strValues.split(";");
if ( TrnId==aryValues[0] )
cbElement.selectedIndex = i;	
}	
var co1 = RSExecute('rs_bookbuild_indication_server.asp', 'js_ListBrokersByTranche', IssId, TrnId);
callback_populateBrokerDealerCombo(co1);
callback_populateOrder(co);
var aryRecords = co.return_value.split("\t");
var OrderInfo = aryRecords[0];
var aryData = OrderInfo.split("\b");
SetInvestorInfo( aryData[14], aryData[27], aryData[13], aryData[28], (aryData[18]=="True"), aryData[3], (aryData[29]=="True"));
} 
}
function ResetLimitDiscount(lTancheID)
{
var theForm = document.forms["frmMain"];
var sDiscountInd = GetTrancheLimitDiscountInd(lTancheID);
for(var j=0; j<prdArray.length; j++)
{
var cbElement = theForm.elements["selLimitDiscount" + j];
if((cbElement) && (cbElement.options))
{
var i = 0;
while(i<cbElement.options.length)
{
if(cbElement.options[i].value.indexOf("D") == 0)
{
cbElement.options[i]=null;
}
else
{
i++;
}
}
if(sDiscountInd == 'True')
{
rewriteLayer("divLimit"+j, theForm.hidLimitDiscountLabel.value)
for(var iProd=0; iProd<prdArray.length; iProd++)
{
var theValue = "D" + prdArray[iProd][0];
var theLabel = "Discount - (% of " + prdArray[iProd][1] + ")";
cbElement.options[cbElement.options.length] = new Option(theLabel, theValue); 
}
}
else
{
rewriteLayer("divLimit"+j, theForm.hidLimitLabel.value)
}
}	
}
}
function GetTrancheLimitDiscountInd(lTancheID)
{
for (var i=0; i<arrTrancheLimitDiscount.length; i++)
{
if (arrTrancheLimitDiscount[i][0] == lTancheID)
return arrTrancheLimitDiscount[i][1];
}
return 'False';
}
function GetPriceDescrAndProductName( lPrdID )
{
var sTitle = "";
var sPrdName = "";
for ( var i=0; i<prdArray.length; i++ )
{
if ( prdArray[i][0]==lPrdID )
{
if (document.frmMain.hidIsDealPriced.value == "1")
{
sTitle = strOfferPrice;
}
else
{
if ( prdArray[i][5]=="True" ) 
{
sTitle = strFilePriceRange;
}	
else
{
sTitle = strFilePrice;
} 
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
if (document.frmMain.hidIsDealPriced.value == "1")
{
sPrice1 = isNaN(sBasePrdOfferPx) ? 0 : sBasePrdOfferPx;	
sFxRate = prdArray[i][8]; 
sBasePrdFxRate = sBasePrdFxRateAtOffering; 
}
else
{
if ( prdArray[i][5]=="True" ) 
{
sPrice1 = isNaN(sBasePrdCurrFilePxLo) ? 0 : sBasePrdCurrFilePxLo; 
sPrice2 = isNaN(sBasePrdCurrFilePxHi) ? 0 : sBasePrdCurrFilePxHi; 
sFxRate = prdArray[i][7]; 
sBasePrdFxRate = sBasePrdFxRateAtFiling;
} 
else
{
sPrice1 = isNaN(sBasePrdFilePx) ? 0 : sBasePrdFilePx;	
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
if (document.frmMain.hidIsDealPriced.value == "1")
{
return sPrice1 + " " + sPrdCcy;
}
else
{
if ( prdArray[i][5]=="True" ) 
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
var theForm = document.forms["frmMain"];
var theRole = theForm.elements["hidIOIUserRole"].value;
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
function OnFindTrader()
{
var txtElement;
var strValues;
var theForm = document.forms["frmMain"];
var co;
var selRegion;
var selSales;
var selInvestor;
var theRole = theForm.elements["hidIOIUserRole"].value;
txtElement = theForm.elements["txtTraderSearch"];
strValues = txtElement.value; 
if (strValues == "")
{
var sStatusMsg = new String;
sStatusMsg = sStatusMsg + "Please correct the following error(s):<br>";
var sMsg = " must contain some value..";
sStatusMsg = sStatusMsg + "<li><a href='JavaScript:self.window.opener.document.frmMain.txtSalesSearch.focus()'>Sales search </a> " + sMsg + "<br>";
showErrorMessage(sStatusMsg);
}
else
{
ResetSearchResultSummary(false, false, false, true);
theForm.elements["hidTraderId"].value = "";
co = RSExecute('rs_bookbuild_indication_server.asp', 'js_ListSalesByLastName', strValues, 'SALETDR');
CurrListInSrchRslt = "TraderList";
callback_populateTraderSearchResultCombo(co); 
} 
}
function OnTraderSearchResultSelect()
{
var theForm = document.forms["frmMain"];
cbElement = theForm.elements["selTraderSearchResult"];
SelectTrader(cbElement.selectedIndex);
}
function SelectTrader(RecordSelected)
{
var cbElement;
var strSelectedValues;
var strValue;
var strLabel;
var aryValues;
var theForm = document.forms["frmMain"];
var RecordSelected;
var co;
var selInvestor;
var theRole = theForm.elements["hidIOIUserRole"].value;
cbElement = theForm.elements["selTraderSearchResult"];
if (RecordSelected != -1) 
{
strValue = cbElement.options[RecordSelected].value;
strLabel = cbElement.options[RecordSelected].text;
aryValues = strLabel.split(",");
if (strValue == "999" || strValue == "0")
return;
rewriteLayer("pTraderName", strLabel);
theForm.elements["hidTraderId"].value = strValue;
PermissionedProductList = "";
if(theForm.elements["hidInvestorID"].value.length > 0 && theForm.elements["hidRegionId"].value.length==0)
{
SetRegionCBByCoverage(theForm.elements["hidTraderId"].value, theForm.elements["hidInvestorID"].value); 
}
if(theForm.elements["hidRegionId"].value.length==0)
{
SetRegionCBBySalesCoverage(theForm.elements["hidTraderId"].value); 
} 
if (theForm.elements["hidRegionId"].value.length==0)
{
ResetRegion(strValue); 
}
LoadInvestorBySaleAndRegion();
if(theForm.elements["hidInvestorID"].value.length == 0)
{
var cbElement = theForm.elements["selInvestorSearchResult"];
if(cbElement.options.length==1)
{
if(cbElement.options[0].value != 0 )
SelectInvestor(0);
}
}
}
} 
function GetTraderCoverage(InvestorId)
{
var co;
var theForm = document.forms["frmMain"];
if (InvestorId > 0)
{
co = RSExecute('rs_bookbuild_indication_server.asp', 'js_ListSalesByInvestorID', InvestorId, 2);
var strData = co.return_value
var cbElement = theForm.elements["selTraderSearchResult"];
if(!cbElement)
return;
cbElement.options.length = 0;
if (strData && strData != "")
{
aryRecords = strData.split("\t");
var iPreviousID=0;
var sNewSalesInd = document.frmMain.hidNewSalesInd.value;
for (i=0; i < aryRecords.length-1; i++)
{
aryData = aryRecords[i].split("\b");
if (sNewSalesInd == "1")
{
if(aryData[1] != iPreviousID)
{
cbElement.options[cbElement.options.length]= new Option(aryData[2], aryData[0] + ";" + aryData[1]);
}
iPreviousID = aryData[1];
}
else
{
if(aryData[0] != iPreviousID)
{
cbElement.options[cbElement.options.length]= new Option(aryData[1], aryData[0]);
}
iPreviousID = aryData[0];
}
}
TraderList = strData;
}
} 
}
function SetSalesQueryType()
{
var theForm = document.forms["frmMain"];
var sEnableSalesTrader = theForm.elements["hidEnableSalesTrader"].value;
var theRole = theForm.elements["hidIOIUserRole"].value;
if (sEnableSalesTrader == 'True' && theRole == 'SyndicateMarketing' )
SalesQueryType = 1;
else
SalesQueryType = 0;
}
function populateTraderSearchResultCombo(strData)
{
var theForm = document.forms["frmMain"];
cbElement = theForm.elements["selTraderSearchResult"];
cbElement.options.length = 0;
if (strData && strData != "")
{
aryRecords = strData.split("\t");
var sNewSalesInd = document.frmMain.hidNewSalesInd.value;
for (i=0; i < aryRecords.length-1; i++)
{
aryData = aryRecords[i].split("\b");
if (sNewSalesInd == "1")
cbElement.options[cbElement.options.length]= new Option(aryData[2], aryData[0] + ";" + aryData[1]);
else
cbElement.options[cbElement.options.length]= new Option(aryData[1], aryData[0]); 
}
TraderList = strData;
}
else
{
cbElement.options[cbElement.options.length]= new Option("No results found", "0");
} 
}
function callback_populateTraderSearchResultCombo(co)
{
var cbElement;
var strResult;
strResult = co.return_value;
populateTraderSearchResultCombo(strResult);
} 
function reset_selected_region_sales()
{
var theForm = document.forms["frmMain"];
if (getDocumentElement("hidRegionId")) 
theForm.elements["hidRegionId"].value = "";
if (getDocumentElement("hidRegionName")) 
theForm.elements["hidRegionName"].value = "";
var cbElement = theForm.elements["selRegion"];
if (cbElement)
cbElement.selectedIndex = 0;
ResetSearchResultSummary(false, true, false, false);
if (getDocumentElement("hidSalesId")) 
theForm.elements["hidSalesId"].value = "";
if (getDocumentElement("hidSalesName")) 
theForm.elements["hidSalesName"].value = "";
if (getDocumentElement("hidSalesLN")) 
theForm.elements["hidSalesLN"].value = "";
if (getDocumentElement("hidSalesFN")) 
theForm.elements["hidSalesFN"].value = "";
ResetSearchResultSummary(false, false, true, false);
if (SalesQueryType == 1)
{
ResetSearchResultSummary(false, false, false, true);
if (getDocumentElement("hidTraderId")) 
theForm.elements["hidTraderId"].value = "";
}
}
function GetInvestorQIBStatus(InvestorID)
{
var i, mask, result;
var theForm = document.forms["frmMain"];
result = "";
for (i = 0; i < NumInvestors; i++)
{
if (InvestorID == InvestorIDArray[i])
{
mask = InvestorMaskArray[i];
if (mask & 2)
{
if (mask & 512)
result = theForm.hidStrPartialQIB.value;
else
result = theForm.hidStrQIB.value;
}
else
result = theForm.hidStrNonQIB.value;
break;
}
}
return result;
}
function GetInvestor2790Status(InvestorID)
{
var theForm = document.forms["frmMain"];
var result = "";
var co; 
co = RSExecute('rs_bookbuild_indication_server.asp', 'js_GetInstInvestor', InvestorID);
var sInvestorRow = co.return_value; 
var aryInvData = sInvestorRow.split("\x04")
var bOveride2790 = aryInvData[3];
var b2790Flag = aryInvData[4];
var bExpire2790 = aryInvData[5];
if (theForm.elements["hidEnableLehSalesWorkSheet"].value == "1") 
{
if (b2790Flag=='Y')
result=theForm.elements["hidRC_RESTRICTED"].value;
else if (b2790Flag=='P') 
result=theForm.elements["hidRC_SOME"].value + b2790Flag;
else if (b2790Flag=='N')
result=theForm.elements["hidRC_ELIGIBLE"].value;
else if (b2790Flag=='E')
result=theForm.elements["hidRC_EXPIRED"].value;
else 
result=theForm.elements["hidRC_NONE"].value;
}
else 
{
if (b2790Flag=='Y')
result=theForm.elements["hidRC_ALL"].value;
else if (b2790Flag=='P')
result=theForm.elements["hidRC_SOME"].value + b2790Flag;
else if (b2790Flag=='N')
result=theForm.elements["hidRC_NONE"].value;
else if (b2790Flag=='E')
result=theForm.elements["hidRC_ALL"].value;
else
result=theForm.elements["hidRC_NOT_APPLICABLE"].value;
}
return result;
}
function clearRegion()
{
var region = document.frmMain.selRegion;
while (region.options.length > 1)
{
region.options[1] = null;
}
}
function enforceOrderControlPermission()
{
return (document.frmMain.hidEnforceOrderControlPermission.value == 'True');
}
function listOpenedSalesCoverage(trnId, instInvId, instInvName, regionId, salesId, view)
{
var co = RSExecute('rs_bookbuild_indication_server.asp', 'js_ListOpenedSalesCoverage', trnId, instInvId, instInvName, regionId, salesId, view);
return co.return_value.split("\f");
}
function getOpenedSalesCoverage(arrOpenedSalesCoverage, view)
{
switch (view)
{
case v_COVERAGE:
return arrOpenedSalesCoverage[0];
case v_INSTITUTIONAL_INVESTOR:
return arrOpenedSalesCoverage[1];
case v_SALES:
return arrOpenedSalesCoverage[2];
case v_REGION:
return arrOpenedSalesCoverage[3];
default:
return "";
}
}
function setMRUInvestor()
{
if (document.frmMain.selInvestor)
{
while (document.frmMain.selInvestor.length > 0)
{
document.frmMain.selInvestor.options[0] = null;
}
var arrOpenedCoverage = listOpenedSalesCoverage(document.frmMain.hidTrnId.value, '', '', '', document.frmMain.hidSalesId.value, v_INSTITUTIONAL_INVESTOR);
var strData = getOpenedSalesCoverage(arrOpenedCoverage, v_INSTITUTIONAL_INVESTOR); 
if (strData && strData != "")
{
InvestorIDArray = new Array();
InvestorMaskArray = new Array();
aryRecords = strData.split("\t");
for (i=0; i < aryRecords.length-1; i++)
{
aryData = aryRecords[i].split("\x08");
aryName_Mask = aryData[1].split("\x04");
InvestorIDArray[i] = aryData[0];
InvestorMaskArray[i] = aryName_Mask[1];
for (var j=0; j<arrMRUInvestor.length; j++)
{
if (parseInt(aryData[0]) == parseInt(arrMRUInvestor[j][0]))
{
if (document.frmMain.selInvestor.length == 0)
{
document.frmMain.selInvestor.options[document.frmMain.selInvestor.length] = new Option ("--Recently Used--", 0);
}
var s = arrMRUInvestor[j][1];
s = s.replace( /&amp;/g, "&" )
s = s.replace( /&lt;/g, "<" )
s = s.replace( /&gt;/g, ">" )
s = s.replace( /&quot;/g, '"' )
s = s.replace( /&apos;/g, "'" )
document.frmMain.selInvestor.options[document.frmMain.selInvestor.length] = new Option (s, arrMRUInvestor[j][0]);
}
}
}
NumInvestors = i;
InvestorList = strData;
} 
}
}
function HandleOrderPermissionErr()
{
var sInvestorName;
sInvestorName = theForm.elements["hidInvestorName"].value;
rewriteLayer("pInvestorName", "");
rewriteLayer("pInvestorName2", "");
theForm.elements["hidInvestorID"].value="";
theForm.elements["hidInvestorName"].value = "";
var sStatusMsg = new String;
sStatusMsg = sStatusMsg + "An indication already exists for the selected Institutional Investor - " + sInvestorName + "<br>";
var sMsg = " Please select different investor";
sStatusMsg = sStatusMsg + "<li><a href='JavaScript:self.window.opener.document.frmMain.selInvestorSearchResult.focus()'>Investor </a> " + sMsg + "<br>";
showErrorMessage(sStatusMsg);
}
function AllSalesPersonsBelongToTheSameRegion(InvestorId)
{
var co;
var ret ;
ret = true ;
if (InvestorId > 0)
{
var theForm = document.forms["frmMain"];
co = RSExecute('rs_bookbuild_indication_server.asp', 'js_ListSalesByInvestorID', InvestorId, SalesQueryType);
var strData = co.return_value
if (strData && strData != "")
{
aryRecords = strData.split("\t");
var iPreviousCatID = 0;
for (i=0; i < aryRecords.length-1; i++)
{
aryData = aryRecords[i].split("\b");
if(i == 0)
{
iPreviousCatID = aryData[3] ;
}
if(aryData[3] != iPreviousCatID)
{
ret = false ;
return ret ;
}
}
}
}
return ret;
}
