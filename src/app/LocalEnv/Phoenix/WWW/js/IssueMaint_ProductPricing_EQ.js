<!-- 
RSEnableRemoteScripting("/_ScriptLibrary");
var g_baseProdID = frmMain.all("hidProductID").value;
var g_EditFeePct = frmMain.all("hidEditFeePct").value;
var	bChange = false;
function onPageLoad()
{
menuShow('issuemaint_dealdetails_eq', 'show');
var sIssueType = document.all.hidConvertibleType.value;
if (sIssueType == "CP" || sIssueType == "CB")
{
var lOfferPrice;
var lParPrice;
var lEstOfferPrice;
lParPrice= new Number(document.all.hidParValue.value.replace(/(\,)/g,""));
lOfferPrice = new Number(document.all.hidOfferPrice.value.replace(/(\,)/g,""));
lEstOfferPrice = new Number(document.all.hidEstOfferPrice.value.replace(/(\,)/g,""));
if (document.all.hidOfferPrice.value != "")
{
if (Number(document.all.hidParValue.value) == Number(document.all.hidOfferPrice.value))
showHideOneArea("divFaceAmtLayer", 0); 
}	
else if (Number(document.all.hidParValue.value) == Number(document.all.hidEstOfferPrice.value))
{
showHideOneArea("divFaceAmtLayer", 0); 
}
if ((document.all.hidConvertibleType.value == "CP" || document.all.hidConvertibleType.value == "CB") && document.all.hidDisplayConvertibleInfoInd.value == 0)
{
if (document.all.hidInterestBaseNum.value == "360")
{
document.all.radInterestBaseNum[0].checked = true;
}
else if (document.all.hidInterestBaseNum.value == "365")
{
document.all.radInterestBaseNum[1].checked = true;
}
if (document.all.hidActual30.value == "Actual")
{
document.all.radActual30[0].checked = true;
}
else if (document.all.hidActual30.value == "30")
{
document.all.radActual30[1].checked = true;
}
}
}
InitialFormatValues();
for(var i=0; i < g_prodIDs.length; i++)
{
frmMain.all("hfltTxtGrossSpread_"+g_prodIDs[i]).value = frmMain.all("fltTxtGrossSpread_"+g_prodIDs[i]).value;
if (document.all.hidConvertibleType.value == "CB" && document.all.hidMLCompany.value == "1")
{
frmMain.all("hfltTxtParValueGrossSpread_"+g_prodIDs[i]).value = frmMain.all("fltTxtParValueGrossSpread_"+g_prodIDs[i]).value;
}
}
CalTXDays(); 
}
function CalTXDays()
{
var	T_X = 0;
var	divTXDaysCont = document.getElementById("divTXDays");
var	dtTxtOfferDateCont = document.getElementById("dtTxtOfferDate");
var	dtTxtSettlementDateCont	= document.getElementById("dtTxtSettlementDate")
if(dtTxtOfferDateCont.value != "" && dtTxtSettlementDateCont.value != "")
{
if(IsValidDate(dtTxtOfferDateCont.value, UserSettings.dateMask, dtTxtOfferDateCont) && IsValidDate(dtTxtSettlementDateCont.value, UserSettings.dateMask, dtTxtSettlementDateCont) )
{
var dtTxtOfferDateUSStandard = FormatDate(dtTxtOfferDateCont.value, UserSettings.dateMask, "MM-DD-YYYY");
var dtTxtSettlementDateUSStandard = FormatDate(dtTxtSettlementDateCont.value, UserSettings.dateMask, "MM-DD-YYYY"); 
var dtTxtOfferDate = new Date(dtTxtOfferDateUSStandard);
var dtTxtSettlementDate = new Date(dtTxtSettlementDateUSStandard);
while (dtTxtOfferDate < dtTxtSettlementDate)
{
if(dtTxtOfferDate.getDay() != 5 && dtTxtOfferDate.getDay() != 6)
T_X = T_X + 1;
dtTxtOfferDate.setDate(dtTxtOfferDate.getDate()+1);
}
divTXDaysCont.innerHTML	= T_X + " days";
} else {
divTXDaysCont.innerHTML = "0 days";
}
} else {
divTXDaysCont.innerHTML = "0 days";
}
divTXDaysCont.innerHTML += " (not including weekends)";	
}
function InitialFormatValues()
{
for(var i=0; i < g_prodIDs.length; i++)
{ 
document.frmMain("fltTxtOfferPrice_"+g_prodIDs[i]).value = 
formatFixedDecimalAmountString2(document.frmMain("fltTxtOfferPrice_"+g_prodIDs[i]).value,2,6);
if( document.frmMain("fltFxRate_"+g_prodIDs[i]) != null )
{
document.frmMain("fltFxRate_"+g_prodIDs[i]).value = 
formatFixedDecimalAmountString2(document.frmMain("fltFxRate_"+g_prodIDs[i]).value,2,6);
}
document.frmMain("fltTxtSellingConcession_"+g_prodIDs[i]).value = 
formatFixedDecimalAmountString2(document.frmMain("fltTxtSellingConcession_"+g_prodIDs[i]).value,2,6);
document.frmMain("fltTxtGrossSpread_"+g_prodIDs[i]).value = 
formatFixedDecimalAmountString2(document.frmMain("fltTxtGrossSpread_"+g_prodIDs[i]).value,2,6);
document.frmMain("fltTxtUnderwritingFee_"+g_prodIDs[i]).value =
formatFixedDecimalAmountString2(document.frmMain("fltTxtUnderwritingFee_"+g_prodIDs[i]).value,2,6);
document.frmMain("fltTxtManagersFee_"+g_prodIDs[i]).value=
formatFixedDecimalAmountString2(document.frmMain("fltTxtManagersFee_"+g_prodIDs[i]).value,2,6);
document.frmMain("fltTxtGlobalPraecipium_"+g_prodIDs[i]).value=
formatFixedDecimalAmountString2(document.frmMain("fltTxtGlobalPraecipium_"+g_prodIDs[i]).value,2,6);
document.frmMain("fltTxtManagersPraecipium_"+g_prodIDs[i]).value=
formatFixedDecimalAmountString2(document.frmMain("fltTxtManagersPraecipium_"+g_prodIDs[i]).value,2,6);
document.frmMain("fltTxtLeadAllowance_"+g_prodIDs[i]).value=
formatFixedDecimalAmountString2(document.frmMain("fltTxtLeadAllowance_"+g_prodIDs[i]).value,2,6);
if( document.frmMain("fltTxtInternalSellingConcession_"+g_prodIDs[i]) != null )
{
document.frmMain("fltTxtInternalSellingConcession_"+g_prodIDs[i]).value=
formatFixedDecimalAmountString2(document.frmMain("fltTxtInternalSellingConcession_"+g_prodIDs[i]).value,2,6);
}
if( document.frmMain("fltTxtManagementFeeProcessing_"+g_prodIDs[i]) != null )
{
document.frmMain("fltTxtManagementFeeProcessing_"+g_prodIDs[i]).value=
formatFixedDecimalAmountString2(document.frmMain("fltTxtManagementFeeProcessing_"+g_prodIDs[i]).value,2,6);
}
if( document.frmMain("fltTxtIssuerIncentiveFee_"+g_prodIDs[i]) != null )
{
document.frmMain("fltTxtIssuerIncentiveFee_"+g_prodIDs[i]).value=
formatFixedDecimalAmountString2(document.frmMain("fltTxtIssuerIncentiveFee_"+g_prodIDs[i]).value,2,6);
}
reCalculatePercentages(g_prodIDs[i]);
if (document.all.hidConvertibleType.value == "CB" && document.all.hidMLCompany.value == "1")
{
document.frmMain("fltTxtParValueOfferPrice_"+g_prodIDs[i]).value = formatFixedDecimalAmountString2(document.frmMain("fltTxtParValueOfferPrice_"+g_prodIDs[i]).value,2,6);
document.frmMain("fltTxtParValueGrossSpread_"+g_prodIDs[i]).value = formatFixedDecimalAmountString2(document.frmMain("fltTxtParValueGrossSpread_"+g_prodIDs[i]).value,2,6);
document.frmMain("fltTxtParValueSellingConcession_"+g_prodIDs[i]).value = formatFixedDecimalAmountString2(document.frmMain("fltTxtParValueSellingConcession_"+g_prodIDs[i]).value,2,6);
document.frmMain("fltTxtParValueUnderwritingFee_"+g_prodIDs[i]).value = formatFixedDecimalAmountString2(document.frmMain("fltTxtParValueUnderwritingFee_"+g_prodIDs[i]).value,2,6);
document.frmMain("fltTxtParValueManagersFee_"+g_prodIDs[i]).value = formatFixedDecimalAmountString2(document.frmMain("fltTxtParValueManagersFee_"+g_prodIDs[i]).value,2,6);
reCalculateParValuePercentages(g_prodIDs[i]);
}
}
}
function MarkForOverride( oField, sPrdId, sBasePrdId, bNotForBasePrd )
{
if ((bNotForBasePrd == 1 || g_EditFeePct == 1) && sPrdId==sBasePrdId ) 
return;
var field = oField.name.split('_')[0];
var ProdID = oField.name.split('_')[1];
var prod = g_prods[ProdID];
var fieldVal;
var fieldOver;
var newFieldVal = oField.value;
eval("fieldVal = prod."+field+";");
eval("fieldOver = prod.frz_"+field+";");
var fieldValNum = new Number(fieldVal);
var newFieldValNum = new Number( newFieldVal );
if( fieldValNum.toString() == newFieldValNum.toString() )
return;
eval("prod.frz_"+field+" = 1;");
document.frmMain.all("div"+oField.name).className = "resultsRowC";
document.frmMain.all("hrf"+oField.name).style.display = "inline";
}
function UnlockGrossSpread()
{
UnlockCell( "fltTxtGrossSpread_"+g_baseProdID );
}
function UnlockCell( fieldName )
{
document.frmMain.all("div"+fieldName).className = "resultsRowA";
document.frmMain.all("hrf"+fieldName).style.display = "none";
var field = fieldName.split('_')[0];
var ProdID = fieldName.split('_')[1];
var prod = g_prods[ProdID];
eval("prod.frz_"+field+" = 0;");
calcFields();
}
function NotZero(val)
{
return (val == 0) ? 1 : val;
}
function roundDecimals( sValue )
{
var result1 = sValue * Math.pow(10, 8);
var result2 = Math.round(result1);
var result3 = result2 / Math.pow(10, 8);
return result3;
}
function SetFieldAmount( prod, prodID, g_baseProdID, calcFactor, fieldName )
{
eval("var bNotOverridden = prod.frz_"+fieldName+" == '0';");
if( bNotOverridden )
{
var fullFieldName = fieldName + "_" + g_baseProdID;
var fieldValue = document.frmMain(fullFieldName).value;
var fieldAmt = parseFloat(fieldValue.replace(/(\,)/g, ""), 10);
if (isNaN(fieldAmt))
{
fieldAmt = 0;
}
var unformattedAmt = fieldAmt * calcFactor;
var amt = formatFixedDecimalAmountString2(roundDecimals(new String(unformattedAmt)).toString(),2,6)
document.frmMain(fieldName+"_"+prodID).value = amt;
eval("prod."+fieldName+" = amt;");
}
}
function calcFields()
{
if (g_EditFeePct == '1')
calcFields_EditPct();
else
calcFields_NoEditPct();
}
function calcParValueFields()
{
if (g_EditFeePct == '1')
calcParValueFields_EditPct();
else
calcParValueFields_NoEditPct();
}
function calcFields_EditPct()
{
for(var i=0; i < g_prodIDs.length; i++)
{ 
var prod = g_prods[g_prodIDs[i]];
if( g_prodIDs[i] == g_baseProdID )
{
var old_value = parseFloat(document.frmMain('hfltTxtGrossSpread_' + g_prodIDs[i]).value);
if (isNaN(old_value))
old_value = 0;
var new_value = parseFloat(document.frmMain('fltTxtGrossSpread_' + g_prodIDs[i]).value);
if (isNaN(new_value))
new_value = 0;
if (old_value != new_value)
{
document.frmMain('hfltTxtGrossSpread_' + g_prodIDs[i]).value = new_value;
reCalculateGrossSpreadPercentage(g_prodIDs[i]);
}
}
else
{
var calcFactor = GetCalcFactor( g_prodIDs[i] );
SetFieldAmount( prod, g_prodIDs[i], g_baseProdID, calcFactor, "fltTxtOfferPrice");
SetFieldAmount( prod, g_prodIDs[i], g_baseProdID, calcFactor, "fltTxtGrossSpread");
SetFieldAmount( prod, g_prodIDs[i], g_baseProdID, calcFactor, "fltTxtSellingConcession");
SetFieldAmount( prod, g_prodIDs[i], g_baseProdID, calcFactor,"fltTxtUnderwritingFee");
SetFieldAmount( prod, g_prodIDs[i], g_baseProdID, calcFactor, "fltTxtManagersFee");
SetFieldAmount( prod, g_prodIDs[i], g_baseProdID, calcFactor, "fltTxtLeadAllowance");
SetFieldAmount( prod, g_prodIDs[i], g_baseProdID, calcFactor, "fltTxtGlobalPraecipium");
SetFieldAmount( prod, g_prodIDs[i], g_baseProdID, calcFactor, "fltTxtManagersPraecipium");
if(document.frmMain("fltTxtInternalSellingConcession_" + g_prodIDs[i]) != null)
{
SetFieldAmount( prod, g_prodIDs[i], g_baseProdID, calcFactor, "fltTxtInternalSellingConcession");
}
if(document.frmMain("fltTxtManagementFeeProcessing_" + g_prodIDs[i]) != null)
{
SetFieldAmount( prod, g_prodIDs[i], g_baseProdID, calcFactor, "fltTxtManagementFeeProcessing");
}
if(document.frmMain("fltTxtIssuerIncentiveFee_" + g_prodIDs[i]) != null)
{
SetFieldAmount( prod, g_prodIDs[i], g_baseProdID, calcFactor, "fltTxtIssuerIncentiveFee");
}
reCalculatePercentages(g_prodIDs[i]);
}
}
}
function calcFields_NoEditPct()
{
for(var i=0; i < g_prodIDs.length; i++)
{ 
var prod = g_prods[g_prodIDs[i]];
if( g_prodIDs[i] == g_baseProdID )
{
if( prod.frz_fltTxtGrossSpread == '1')
{
reCalculatePercentages(g_prodIDs[i]);
continue;
}
var n1 = document.frmMain("fltTxtSellingConcession_"+g_baseProdID).value.replace(/(\,)/g, "");
var n2 = document.frmMain("fltTxtUnderwritingFee_"+g_baseProdID).value.replace(/(\,)/g, "");
var n3 = document.frmMain("fltTxtManagersFee_"+g_baseProdID).value.replace(/(\,)/g, "");
var n5 = document.frmMain("fltTxtGlobalPraecipium_"+g_baseProdID).value.replace(/(\,)/g, "");
var total = new Number(n1) + new Number(n2) + new Number(n3) + new Number(n5);
var sValue = roundDecimals(total);
prod.fltTxtGrossSpread = formatFixedDecimalAmountString(sValue.toString(),2);
document.frmMain("fltTxtGrossSpread_"+g_baseProdID).value = formatFixedDecimalAmountString(sValue.toString(),2);
}
else
{
var calcFactor = GetCalcFactor( g_prodIDs[i] );
SetFieldAmount( prod, g_prodIDs[i], g_baseProdID, calcFactor, "fltTxtOfferPrice");
SetFieldAmount( prod, g_prodIDs[i], g_baseProdID, calcFactor, "fltTxtGrossSpread");
SetFieldAmount( prod, g_prodIDs[i], g_baseProdID, calcFactor, "fltTxtSellingConcession");
SetFieldAmount( prod, g_prodIDs[i], g_baseProdID, calcFactor,"fltTxtUnderwritingFee");
SetFieldAmount( prod, g_prodIDs[i], g_baseProdID, calcFactor, "fltTxtManagersFee");
SetFieldAmount( prod, g_prodIDs[i], g_baseProdID, calcFactor, "fltTxtLeadAllowance");
SetFieldAmount( prod, g_prodIDs[i], g_baseProdID, calcFactor, "fltTxtGlobalPraecipium");
SetFieldAmount( prod, g_prodIDs[i], g_baseProdID, calcFactor, "fltTxtManagersPraecipium");
if(document.frmMain("fltTxtInternalSellingConcession_" + g_prodIDs[i]) != null)
{
SetFieldAmount( prod, g_prodIDs[i], g_baseProdID, calcFactor, "fltTxtInternalSellingConcession");
}
if(document.frmMain("fltTxtManagementFeeProcessing_" + g_prodIDs[i]) != null)
{
SetFieldAmount( prod, g_prodIDs[i], g_baseProdID, calcFactor, "fltTxtManagementFeeProcessing");
}
if(document.frmMain("fltTxtIssuerIncentiveFee_" + g_prodIDs[i]) != null)
{
SetFieldAmount( prod, g_prodIDs[i], g_baseProdID, calcFactor, "fltTxtIssuerIncentiveFee");
}
}
reCalculatePercentages(g_prodIDs[i]);
}
}
function calcParValueFields_EditPct()
{
for(var i=0; i < g_prodIDs.length; i++)
{ 
var prod = g_prods[g_prodIDs[i]];
if( g_prodIDs[i] == g_baseProdID )
{
var old_value = parseFloat(document.frmMain('hfltTxtParValueGrossSpread_' + g_prodIDs[i]).value);
if (isNaN(old_value))
old_value = 0;
var new_value = parseFloat(document.frmMain('fltTxtParValueGrossSpread_' + g_prodIDs[i]).value);
if (isNaN(new_value))
new_value = 0;
if (old_value != new_value)
{
document.frmMain('hfltTxtParValueGrossSpread_' + g_prodIDs[i]).value = new_value;
reCalculateParValueGrossSpreadPercentage(g_prodIDs[i]);
}
}
else
{
var calcFactor = GetCalcFactor( g_prodIDs[i] );
SetFieldAmount( prod, g_prodIDs[i], g_baseProdID, calcFactor, "fltTxtParValueOfferPrice");
SetFieldAmount( prod, g_prodIDs[i], g_baseProdID, calcFactor, "fltTxtParValueGrossSpread");
SetFieldAmount( prod, g_prodIDs[i], g_baseProdID, calcFactor, "fltTxtParValueSellingConcession");
SetFieldAmount( prod, g_prodIDs[i], g_baseProdID, calcFactor, "fltTxtParValueUnderwritingFee");
SetFieldAmount( prod, g_prodIDs[i], g_baseProdID, calcFactor, "fltTxtParValueManagersFee");
SetFieldAmount( prod, g_prodIDs[i], g_baseProdID, calcFactor, "fltTxtLeadAllowance");
SetFieldAmount( prod, g_prodIDs[i], g_baseProdID, calcFactor, "fltTxtGlobalPraecipium");
SetFieldAmount( prod, g_prodIDs[i], g_baseProdID, calcFactor, "fltTxtManagersPraecipium");
if(document.frmMain("fltTxtInternalSellingConcession_" + g_prodIDs[i]) != null)
{
SetFieldAmount( prod, g_prodIDs[i], g_baseProdID, calcFactor, "fltTxtInternalSellingConcession");
}
if(document.frmMain("fltTxtManagementFeeProcessing_" + g_prodIDs[i]) != null)
{
SetFieldAmount( prod, g_prodIDs[i], g_baseProdID, calcFactor, "fltTxtManagementFeeProcessing");
}
if(document.frmMain("fltTxtIssuerIncentiveFee_" + g_prodIDs[i]) != null)
{
SetFieldAmount( prod, g_prodIDs[i], g_baseProdID, calcFactor, "fltTxtIssuerIncentiveFee");
}
reCalculateParValuePercentages(g_prodIDs[i]);
}
}
}
function calcParValueFields_NoEditPct()
{
for(var i=0; i < g_prodIDs.length; i++)
{ 
var prod = g_prods[g_prodIDs[i]];
if( g_prodIDs[i] == g_baseProdID )
{
if( prod.frz_fltTxtParValueGrossSpread == '1')
{
reCalculateParValuePercentages(g_prodIDs[i]);
continue;
}
var n1 = document.frmMain("fltTxtParValueSellingConcession_"+g_baseProdID).value.replace(/(\,)/g, "");
var n2 = document.frmMain("fltTxtParValueUnderwritingFee_"+g_baseProdID).value.replace(/(\,)/g, "");
var n3 = document.frmMain("fltTxtParValueManagersFee_"+g_baseProdID).value.replace(/(\,)/g, "");
var n5 = document.frmMain("fltTxtGlobalPraecipium_"+g_baseProdID).value.replace(/(\,)/g, "");
var total = new Number(n1) + new Number(n2) + new Number(n3) + new Number(n5);
var sValue = roundDecimals(total);
document.frmMain("fltTxtParValueGrossSpread_"+g_baseProdID).value = formatFixedDecimalAmountString(sValue.toString(),2);
}
else
{
var calcFactor = GetCalcFactor( g_prodIDs[i] );
SetFieldAmount( prod, g_prodIDs[i], g_baseProdID, calcFactor, "fltTxtParValueOfferPrice");
SetFieldAmount( prod, g_prodIDs[i], g_baseProdID, calcFactor, "fltTxtParValueGrossSpread");
SetFieldAmount( prod, g_prodIDs[i], g_baseProdID, calcFactor, "fltTxtParValueSellingConcession");
SetFieldAmount( prod, g_prodIDs[i], g_baseProdID, calcFactor, "fltTxtParValueUnderwritingFee");
SetFieldAmount( prod, g_prodIDs[i], g_baseProdID, calcFactor, "fltTxtParValueManagersFee");
SetFieldAmount( prod, g_prodIDs[i], g_baseProdID, calcFactor, "fltTxtLeadAllowance");
SetFieldAmount( prod, g_prodIDs[i], g_baseProdID, calcFactor, "fltTxtGlobalPraecipium");
SetFieldAmount( prod, g_prodIDs[i], g_baseProdID, calcFactor, "fltTxtManagersPraecipium");
if(document.frmMain("fltTxtInternalSellingConcession_" + g_prodIDs[i]) != null)
{
SetFieldAmount( prod, g_prodIDs[i], g_baseProdID, calcFactor, "fltTxtInternalSellingConcession");
}
if(document.frmMain("fltTxtManagementFeeProcessing_" + g_prodIDs[i]) != null)
{
SetFieldAmount( prod, g_prodIDs[i], g_baseProdID, calcFactor, "fltTxtManagementFeeProcessing");
}
if(document.frmMain("fltTxtIssuerIncentiveFee_" + g_prodIDs[i]) != null)
{
SetFieldAmount( prod, g_prodIDs[i], g_baseProdID, calcFactor, "fltTxtIssuerIncentiveFee");
}
}
reCalculateParValuePercentages(g_prodIDs[i]);
}
}
function GetCalcFactor( curProdID )
{
var baseRate = parseFloat(frmMain.all("fltFxRate_"+g_baseProdID).value);
var curRate = parseFloat(frmMain.all("fltFxRate_"+curProdID).value);
var baseRatioFromBase = g_prods[g_baseProdID].ratioFromBase;
var baseRatioFromSelf = g_prods[g_baseProdID].ratioFromSelf;
var baseConvRatio = NotZero(g_prods[g_baseProdID].ratioFromBase) / NotZero(g_prods[g_baseProdID].ratioFromSelf);
var curRatioFromBase = g_prods[curProdID].ratioFromBase;
var curRatioFromSelf = g_prods[curProdID].ratioFromSelf;
var curConvRatio = NotZero(g_prods[curProdID].ratioFromBase) / NotZero(g_prods[curProdID].ratioFromSelf);
var multiplier = (curRate / NotZero(baseRate))/NotZero(baseConvRatio / curConvRatio);
return multiplier;
}
function UpdateFXRates( ratesTxt )
{
var ratesPerCy = ratesTxt.split('^');
for(var i=0; i<ratesPerCy.length; i++)
{
var cy = ratesPerCy[i].split('*')[0];
var rate = ratesPerCy[i].split('*')[1];
for(var j=0; j<g_prodIDs.length; j++)
{
var prod = g_prods[g_prodIDs[j]];
if( prod.ccy_cd == cy )
{
if( prod.frz_fltFxRate == '0')
{
document.frmMain("fltFxRate_"+g_prodIDs[j]).value = rate;
}
}
}
}
calcFields();
}
function CheckConditionallyRequiredFields( frm, arrFieldsInError )
{
var arrMoreErrors = new Array();
if ( frm==document.frmMainOA )
return (arrMoreErrors);
var GrossSpread = frm.all("fltTxtGrossSpread_"+g_baseProdID).value;
var ManagersPraec = frm.all("fltTxtManagersPraecipium_"+g_baseProdID).value;
var GlobalPrae = frm.all("fltTxtGlobalPraecipium_"+g_baseProdID).value;
var ReAllowance = frm.all("fltTxtLeadAllowance_"+g_baseProdID).value;
var ManagersFee = frm.all("fltTxtManagersFee_"+g_baseProdID).value;
var UnderwritingFee = frm.all("fltTxtUnderwritingFee_"+g_baseProdID).value;
var SellingConcession = frm.all("fltTxtSellingConcession_"+g_baseProdID).value;
var IssueType = frm.hidConvertibleType.value;
var OfferPrice = frm.all("fltTxtOfferPrice_"+g_baseProdID).value;
var CanFunctionality = frm.hidCanFunctionality.value;
if ( (GrossSpread == '' || GrossSpread == '0') && (ManagersPraec !='' || GlobalPrae !='' || ReAllowance !='' ) )
{
var arrError = FieldErrorInfo("fltTxtSellingConcession_"+g_baseProdID, 'If you enter Managers Praecipium, Global Praecipium, or Real Allowance then you must determine Gross Spread', "", "fltTxtSellingConcession_"+g_baseProdID, "Gross Spread");
arrMoreErrors[0] = arrError;
}
if ((IssueType == 'CB' || IssueType == 'CP') && document.all.hidDisplayConvertibleInfoInd.value == 0) {
var OfferDate = new Date(frm.dtTxtOfferDate.value);
var MaturityDate = new Date(frm.dtTxtMaturityDate.value);
if (OfferDate > MaturityDate) {
var arrError = FieldErrorInfo("dtTxtMaturityDate", 'The Maturity Date must be a date after the Offer Date', "", "dtTxtMaturityDate", "Maturity Date");
arrMoreErrors[arrMoreErrors.length] = arrError;
}
}
if(frm.all("fltTxtInternalSellingConcession_"+g_baseProdID) != null)
{
if( CanFunctionality == 'False' )
{
var sInternalSellingConcession = frm.all("fltTxtInternalSellingConcession_"+g_baseProdID).value; 
var nInternalSellingConcession = new Number(sInternalSellingConcession.replace(/(\,)/g, ""));
if (sInternalSellingConcession=="" || nInternalSellingConcession=="NaN")
{
var arrError = FieldErrorInfo("fltTxtInternalSellingConcession_"+g_baseProdID, 'Please enter an Internal Selling Concession that is greater than or equal to zero.', "", "fltTxtInternalSellingConcession_"+g_baseProdID, "Internal Selling Concession");
arrMoreErrors[arrMoreErrors.length] = arrError;
}
}
}
if (frm.hidIsPricedOrAbove.value == 'true' || (frm.priceDeal != null && frm.priceDeal.checked))
{
for(var j=0; j<g_prodIDs.length; j++)
{
var prod = g_prods[g_prodIDs[j]];
if( frm.elements["fltTxtOfferPrice_" + g_prodIDs[j]].value == 0 || frm.elements["fltTxtOfferPrice_" + g_prodIDs[j]].value.length == 0)
{
if (document.all.hidConvertibleType.value == "CB" && document.all.hidMLCompany.value == "1")
{
if( frm.elements["fltTxtParValueOfferPrice_" + g_prodIDs[j]].value == 0 || frm.elements["fltTxtParValueOfferPrice_" + g_prodIDs[j]].value.length == 0)
{
var arrError = FieldErrorInfo("fltTxtOfferPrice_" + g_prodIDs[j], 'Please enter an Offer Price that is greater than zero.', "", "fltTxtOfferPrice_" + g_prodIDs[j], "Offer Price");
arrMoreErrors[arrMoreErrors.length] = arrError;
}
}
else
{
var arrError = FieldErrorInfo("fltTxtOfferPrice_" + g_prodIDs[j], 'Please enter an Offer Price that is greater than zero.', "", "fltTxtOfferPrice_" + g_prodIDs[j], "Offer Price");
arrMoreErrors[arrMoreErrors.length] = arrError;
}
}
}
}
if ((frm.hidIsPricedOrAbove.value == 'true' || (frm.priceDeal != null && frm.priceDeal.checked)) && frm.dtTxtOfferDate.value.toString().length == 0)
{
sError = FieldErrorInfo("dtTxtOfferDate", 'Please enter an Offer Date.', "", "dtTxtOfferDate", "Offer Date"); 
arrMoreErrors[arrMoreErrors.length] = sError; 
}
return (arrMoreErrors);
}
function CustomValidation( frm, arrFieldsInError )
{
var arrMoreErrors = new Array();
return (arrMoreErrors);
} 
function PopulateOverrideFields()
{
for(var i=0; i < g_prodIDs.length; i++)
{
if( frmMain.all("ovrfltFxRate_"+g_prodIDs[i]) != null )
{
frmMain.all("ovrfltFxRate_"+g_prodIDs[i]).value = 
g_prods[ g_prodIDs[i] ].frz_fltFxRate;
}
frmMain.all("ovrfltTxtOfferPrice_"+g_prodIDs[i]).value = 
g_prods[ g_prodIDs[i] ].frz_fltTxtOfferPrice;
frmMain.all("ovrfltTxtSellingConcession_"+g_prodIDs[i]).value = 
g_prods[ g_prodIDs[i] ].frz_fltTxtSellingConcession;
frmMain.all("ovrfltTxtUnderwritingFee_"+g_prodIDs[i]).value = 
g_prods[ g_prodIDs[i] ].frz_fltTxtUnderwritingFee;
frmMain.all("ovrfltTxtManagersFee_"+g_prodIDs[i]).value = 
g_prods[ g_prodIDs[i] ].frz_fltTxtManagersFee;
frmMain.all("ovrfltTxtGlobalPraecipium_"+g_prodIDs[i]).value = 
g_prods[ g_prodIDs[i] ].frz_fltTxtGlobalPraecipium;
frmMain.all("ovrfltTxtManagersPraecipium_"+g_prodIDs[i]).value = 
g_prods[ g_prodIDs[i] ].frz_fltTxtManagersPraecipium;
frmMain.all("ovrfltTxtGrossSpread_"+g_prodIDs[i]).value = 
g_prods[ g_prodIDs[i] ].frz_fltTxtGrossSpread;
frmMain.all("ovrfltTxtLeadAllowance_"+g_prodIDs[i]).value = 
g_prods[ g_prodIDs[i] ].frz_fltTxtLeadAllowance;
if(frmMain.all("ovrfltTxtInternalSellingConcession_"+g_prodIDs[i]) != null)
{
frmMain.all("ovrfltTxtInternalSellingConcession_"+g_prodIDs[i]).value = 
g_prods[ g_prodIDs[i] ].frz_fltTxtInternalSellingConcession;
}
if(frmMain.all("ovrfltTxtManagementFeeProcessing_"+g_prodIDs[i]) != null)
{
frmMain.all("ovrfltTxtManagementFeeProcessing_"+g_prodIDs[i]).value = 
g_prods[ g_prodIDs[i] ].frz_fltTxtManagementFeeProcessing;
}
if(frmMain.all("ovrfltTxtIssuerIncentiveFee_"+g_prodIDs[i]) != null)
{
frmMain.all("ovrfltTxtIssuerIncentiveFee_"+g_prodIDs[i]).value = 
g_prods[ g_prodIDs[i] ].frz_fltTxtIssuerIncentiveFee;
}
if(frmMain.all("ovrfltTxtSalesCreditOnTrades_"+g_prodIDs[i]) != null)
{
frmMain.all("ovrfltTxtSalesCreditOnTrades_"+g_prodIDs[i]).value = 
g_prods[ g_prodIDs[i] ].frz_fltTxtSalesCreditOnTrades;
}
if(frmMain.all("ovrfltTxtIssuerIncentiveFee_"+g_prodIDs[i]) != null)
{
frmMain.all("ovrfltTxtIssuerIncentiveFee_"+g_prodIDs[i]).value = 
g_prods[ g_prodIDs[i] ].frz_fltTxtIssuerIncentiveFee;
}
}
}
function ContinueSubmit()
{
PopulateOverrideFields();
for(var i=0; i < g_prodIDs.length; i++)
{
frmMain.all("hfltTxtGrossSpread_"+g_prodIDs[i]).value = frmMain.all("fltTxtGrossSpread_"+g_prodIDs[i]).value;
if (document.all.hidConvertibleType.value == "CB" && document.all.hidMLCompany.value == "1")
{
frmMain.all("hfltTxtParValueGrossSpread_"+g_prodIDs[i]).value = frmMain.all("fltTxtParValueGrossSpread_"+g_prodIDs[i]).value; 
}
}
if(frmMain.hidClosedEndFundInd.value == "True")
{
if (frmMain.priceDeal != null && frmMain.priceDeal.checked && frmMain.hidIsBookOpen.value == "True")
{
var ret = confirm("You have changed the deal state to Priced. Do you want to close the book?");
if (ret == true)
{
frmMain.hidBookClose.value = "1";
frmMain.hidSuppressRedirect.value = "1" ;
} 
}
}
frmMain.action = "util_submit_action2.asp";
frmMain.hidAction.value = "Update";
frmMain.submit();
}
function submitPage(frm, action)
{
bChange = false;
switch (action)
{
case "update" :
if (ValidateForm(frm))
{
var nOverallotment = new Number(frm.hidOverallotment.value);
var sIssueType = document.all.hidConvertibleType.value; 
if (sIssueType != "CP" && sIssueType != "CB")
{
var finalPrmySize = new Number(document.frmMain.elements["iFinalPrmySize"].value);
var finalSecySize = new Number(document.frmMain.elements["iFinalSecySize"].value);
var dealSize = new Number(document.frmMain.elements["hidDealSize"].value);
if( nOverallotment == 0 && dealSize != (finalPrmySize+finalSecySize) )
{
var agree=confirm("Sum of the final primary and secondary shares do not equal to deal size. Do you wish to save your changes?");
if (agree == false)
return;
} 
document.frmMain.elements["iFinalPrmySize"].disabled = false;
document.frmMain.elements["iFinalSecySize"].disabled = false;
}
for(var i=1;i <= frm.hidNumTranches.value;i++)
{
var TrnSizeFldNm = "iTrancheOfferSize" + i.toString(); 
document.frmMain.elements[TrnSizeFldNm].disabled = false;
}
var nSellingConcession = new Number(document.frmMain.all("fltTxtSellingConcession_"+g_baseProdID).value.replace(/(\,)/g, ""));
var nUnderwritingFee = new Number(document.frmMain.all("fltTxtUnderwritingFee_"+g_baseProdID).value.replace(/(\,)/g, ""));
var nManagersFee = new Number(document.frmMain.all("fltTxtManagersFee_"+g_baseProdID).value.replace(/(\,)/g, ""));
var nGCFee = new Number(document.frmMain.all("fltTxtGlobalPraecipium_"+g_baseProdID).value.replace(/(\,)/g, ""));
var nGrossSpread = new Number(document.frmMain.all("fltTxtGrossSpread_"+g_baseProdID).value.replace(/(\,)/g, ""));
if (frm.priceDeal != null && frm.priceDeal.checked == true && frm.hidShowWarningMsgFRQ.value > 0)
{
var co = RSExecute('rs_IssueMaint_server.asp', 'js_DoesOrderExistWithoutFRQ', frm.hidIssueID.value);
var ret = co.return_value.toString().toLowerCase();
if (ret == 'true')
{
alert('Warning: Orders exist that do not have proper Rule 2790 documentation. Please see the IOI Free Riding Questionnaire Report for the list of investors.');
}
}
var iHr = 0, iMin = 0;
if (frm.hidEnablePricingtime.value == 1)
{
if (frm.iTxtPricingHr.value.length > 0 || frm.iTxtPricingHr.value != 0)
{
iHr = frm.iTxtPricingHr.value;
if (frm.iTxtPricingMin.value.length > 0)
iMin = frm.iTxtPricingMin.value;
if (iHr > 12)
{
alert("Please specify time in 12hr AM/PM format");
break;
}
if (iMin < 0 || iMin > 59)
{
alert("Minutes should be in range 0 - 59");
break;
}
frm.dtTxtPricingDate.value = frm.dtTxtPricingDate.value + " " + iHr + ":" + iMin;
if (iHr <= 12)
{
if (iHr == 12 && iMin == 0 && frm.radAMPM[0].checked)
frm.dtTxtPricingDate.value = frm.dtTxtPricingDate.value + ":00.1"; 
if (frm.radAMPM[0].checked)
frm.dtTxtPricingDate.value = frm.dtTxtPricingDate.value + " AM";
else
frm.dtTxtPricingDate.value = frm.dtTxtPricingDate.value + " PM";
}	
}
}
var sOfferDate = frm.dtTxtOfferDate.value;
var sSettleDate = frm.dtTxtSettlementDate.value;
if (sSettleDate.length > 0)
{
if (sOfferDate.length > 0)
{
if (sSettleDate < sOfferDate)
{
alert("The Settlement Date must be greater than or equal to the Offer Date.");
break;
}
}
else
{
alert("The offer date must be specified before the settlement date can be entered");
frm.dtTxtSettlementDate.value = "";
break;
}	
}	
if (roundDecimals(nGrossSpread) != roundDecimals(nSellingConcession + nUnderwritingFee + nManagersFee + nGCFee))
{
openGeneralPopup('issuemaint_grossspread_popup.asp', '', 'width=400,height=120');
break;
} 
if (document.all.hidConvertibleType.value == "CB" && document.all.hidMLCompany.value == "1")
{
var nParValueSellingConcession = 0;
if(document.frmMain.all("fltTxtParValueSellingConcession_"+g_baseProdID) != null)
nParValueSellingConcession = new Number(document.frmMain.all("fltTxtParValueSellingConcession_"+g_baseProdID).value.replace(/(\,)/g, ""));
var nParValueUnderwritingFee = 0;
if(document.frmMain.all("fltTxtParValueUnderwritingFee_"+g_baseProdID) != null)
nParValueUnderwritingFee = new Number(document.frmMain.all("fltTxtParValueUnderwritingFee_"+g_baseProdID).value.replace(/(\,)/g, ""));
var nParValueManagersFee = 0
if(document.frmMain.all("fltTxtParValueManagersFee_"+g_baseProdID) != null)
nParValueManagersFee = new Number(document.frmMain.all("fltTxtParValueManagersFee_"+g_baseProdID).value.replace(/(\,)/g, ""));
var nParValueGrossSpread = 0
if(document.frmMain.all("fltTxtParValueGrossSpread_"+g_baseProdID) != null)
nParValueGrossSpread = new Number(document.frmMain.all("fltTxtParValueGrossSpread_"+g_baseProdID).value.replace(/(\,)/g, ""));
if (roundDecimals(nParValueGrossSpread) != roundDecimals(nParValueSellingConcession + nParValueUnderwritingFee + nParValueManagersFee + nGCFee))
{
if (!confirm("The Par Value Selling Concession, Par Value Underwriting Fee,\r\nPar Value Management Fee and Global Coordinator Fee\r\ndo not sum up to the Gross Spread.\r\nDo you want to continue?"))
break;
}
}
if ((document.all.hidConvertibleType.value == "CP" || document.all.hidConvertibleType.value == "CB") && document.all.hidDisplayConvertibleInfoInd.value == 0)
{
if (document.all.radInterestBaseNum[0].checked)
{
document.all.hidInterestBaseNum.value = "360";
}
else if (document.all.radInterestBaseNum[1].checked)
{
document.all.hidInterestBaseNum.value = "365";
}
if (document.all.radActual30[0].checked)
{
document.all.hidActual30.value = "Actual";
}
else if (document.all.radActual30[1].checked)
{
document.all.hidActual30.value = "30";
}
}
ContinueSubmit();
return true;
}
break;
case "reverttosave" :
frm.action = "IssueMaint_ProductPricing_EQ.asp";
frm.submit();
break;
case "cancel" :
frm.action = "specialIssueMaint_DealDetails.asp";
frm.submit();
break; 
case "SaveOverallotment" :
SaveOverallotment(frm);
break;
}
}
function OnChangeOfferPrice()
{
var sIssueType = document.all.hidConvertibleType.value;
if (sIssueType == "CP" || sIssueType == "CB")
{
var lIssueSize = new Number(document.all.divOfferSize.innerText.replace(/(\,)/g,""));
var lOfferPrice= new Number(document.frmMain.all("fltTxtOfferPrice_"+g_baseProdID).value.replace(/(\,)/g,""));
var lParValue = new Number(document.all.hidParValue.value.replace(/(\,)/g,""));
var lAmount = lIssueSize * lOfferPrice;
var lFaceAmount = lIssueSize * lParValue;
if (document.frmMain.all("fltTxtOfferPrice_"+g_baseProdID).value != "")
{
if (Number(document.all.hidParValue.value) == Number(lOfferPrice))
showHideOneArea("divFaceAmtLayer", 0);
else
{
showHideOneArea("divFaceAmtLayer", 1);
document.frmMain.FaceAmount.value = formatAmountString(lFaceAmount.toString());
}
}
else
{
var lEstOfferPrice = new Number(document.all.hidEstOfferPrice.value.replace(/(\,)/g,""));
lAmount = lIssueSize * lEstOfferPrice; 
}
document.frmMain.AmountOfProceed.value = formatAmountString(lAmount.toString());
}
}
function OnChangeParValueOfferPrice()
{
var sIssueType = document.all.hidConvertibleType.value;
if (sIssueType == "CB")
{
var lIssueSize = new Number(document.all.divOfferSize.innerText.replace(/(\,)/g,""));
var lOfferPrice= new Number(document.frmMain.all("fltTxtParValueOfferPrice_"+g_baseProdID).value.replace(/(\,)/g,""));
var lParValue = new Number(document.all.hidParValue.value.replace(/(\,)/g,""));
var lAmount = lIssueSize * lOfferPrice;
var lFaceAmount = lIssueSize * lParValue;
if (document.frmMain.all("fltTxtParValueOfferPrice_"+g_baseProdID).value != "")
{
if (Number(document.all.hidParValue.value) == Number(lOfferPrice))
showHideOneArea("divFaceAmtLayer", 0);
else
{
showHideOneArea("divFaceAmtLayer", 1);
document.frmMain.FaceAmount.value = formatAmountString(lFaceAmount.toString());
}
}
else
{
var lEstOfferPrice = new Number(document.all.hidEstOfferPrice.value.replace(/(\,)/g,""));
lAmount = lIssueSize * lEstOfferPrice; 
}
document.frmMain.AmountOfProceed.value = formatAmountString(lAmount.toString());
}
}
function OnTrancheSizeChange (pos)
{
var lNumTranche = new Number(document.frmMain.hidNumTranches.value);
var lTotalSize = new Number(0);
for (var i=1; i <= lNumTranche; i++)
{
var prodID = document.all.item("hidDefaultPrdID" + i).value;
var ratioFromSelf = g_prods[prodID].ratioFromSelf;
var ratioFromBase = g_prods[prodID].ratioFromBase;
var lTrancheSize = Number(document.all.item("iTrancheOfferSize" + i).value.replace(/(\,)/g,""));
lTotalSize += lTrancheSize*(parseFloat(ratioFromBase)/parseFloat(ratioFromSelf))
}
document.all.divOfferSize.innerText = formatAmountString(lTotalSize.toString());
document.frmMain.hidDealSize.value = lTotalSize;
OnChangeOfferPrice();
}
function OnPutCommentsChange()
{
var lLen = new Number(document.all.txtPutComments.value.length);
if (lLen > 50)
{
var sTxt = document.all.txtPutComments.value;
document.all.txtPutComments.value = sTxt.substring(0,50);	
}
}
function OnCallCommentsChange()
{
var lLen = document.all.txtCallComments.value.length;
if (lLen > 50)
{
var sTxt = document.all.txtCallComments.value;
document.all.txtCallComments.value = sTxt.substring(0,50);	
}
}
function OnPutCommentsPress()
{
OnPutCommentsChange();
}
function OnCallCommentsPress()
{
OnCallCommentsChange();
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
function reCalculatePercentages(sprodID)
{
var lGrossSpread = document.frmMain("fltTxtGrossSpread_"+sprodID).value.replace(/(\,)/g, "");
if((lGrossSpread != "") && (lGrossSpread != 0))
{
var uwAmount = document.frmMain("fltTxtUnderwritingFee_"+sprodID).value.replace(/(\,)/g, "");
var scAmount = document.frmMain("fltTxtSellingConcession_"+sprodID).value.replace(/(\,)/g, "");
var mgmtAmount = document.frmMain("fltTxtManagersFee_"+sprodID).value.replace(/(\,)/g, "");
var gcAmount = document.frmMain("fltTxtGlobalPraecipium_"+sprodID).value.replace(/(\,)/g, "");
var uwPercentage = roundDecimals(uwAmount*100/lGrossSpread);
var scPercentage = roundDecimals(scAmount*100/lGrossSpread);
var mgmtPercentage = roundDecimals(mgmtAmount*100/lGrossSpread);
var gcPercentage = roundDecimals(gcAmount*100/lGrossSpread);
if (g_EditFeePct == 1)
{
document.frmMain("fltSC_Pct_"+sprodID).value = idealToFixed(scPercentage, 2);
document.frmMain("fltUW_Pct_"+sprodID).value = idealToFixed(uwPercentage, 2);
document.frmMain("fltMGMT_Pct_"+sprodID).value = idealToFixed(mgmtPercentage, 2);
document.frmMain("fltGCFee_Pct_"+sprodID).value = idealToFixed(gcPercentage, 2);
}
else
{
rewriteLayer("divSC_Pct_"+sprodID, idealToFixed(scPercentage, 2));
rewriteLayer("divUW_Pct_"+sprodID, idealToFixed(uwPercentage, 2));
rewriteLayer("divMGMT_Pct_"+sprodID, idealToFixed(mgmtPercentage, 2));
rewriteLayer("divGCFEE_Pct_"+sprodID, idealToFixed(gcPercentage, 2));
}
}
else
{
if (g_EditFeePct == 1)
{
document.frmMain("fltSC_Pct_"+sprodID).value = "";
document.frmMain("fltUW_Pct_"+sprodID).value = "";
document.frmMain("fltMGMT_Pct_"+sprodID).value = "";
document.frmMain("fltGCFee_Pct_"+sprodID).value = "";
}
else
{
rewriteLayer("divSC_Pct_"+sprodID, "");
rewriteLayer("divUW_Pct_"+sprodID, "");
rewriteLayer("divMGMT_Pct_"+sprodID, "");
rewriteLayer("divGCFEE_Pct_"+sprodID, "");
}
}
reCalculateGrossSpreadPercentage(sprodID);
}
function reCalculateParValuePercentages(sprodID)
{
var lGrossSpread = document.frmMain("fltTxtParValueGrossSpread_"+sprodID).value.replace(/(\,)/g, "");
if((lGrossSpread != "") && (lGrossSpread != 0))
{
var uwAmount = document.frmMain("fltTxtParValueUnderwritingFee_"+sprodID).value.replace(/(\,)/g, "");
var scAmount = document.frmMain("fltTxtParValueSellingConcession_"+sprodID).value.replace(/(\,)/g, "");
var mgmtAmount = document.frmMain("fltTxtParValueManagersFee_"+sprodID).value.replace(/(\,)/g, "");
var gcAmount = document.frmMain("fltTxtGlobalPraecipium_"+sprodID).value.replace(/(\,)/g, "");
var uwPercentage = roundDecimals(uwAmount*100/lGrossSpread);
var scPercentage = roundDecimals(scAmount*100/lGrossSpread);
var mgmtPercentage = roundDecimals(mgmtAmount*100/lGrossSpread);
var gcPercentage = roundDecimals(gcAmount*100/lGrossSpread);
if (g_EditFeePct == 1)
{
document.frmMain("fltParValueSC_Pct_"+sprodID).value = idealToFixed(scPercentage, 2);
document.frmMain("fltParValueUW_Pct_"+sprodID).value = idealToFixed(uwPercentage, 2);
document.frmMain("fltParValueMGMT_Pct_"+sprodID).value = idealToFixed(mgmtPercentage, 2);
document.frmMain("fltParValueGCFee_Pct_"+sprodID).value = idealToFixed(gcPercentage, 2);
}
else
{
rewriteLayer("divParValueSC_Pct_"+sprodID, idealToFixed(scPercentage, 2));
rewriteLayer("divParValueUW_Pct_"+sprodID, idealToFixed(uwPercentage, 2));
rewriteLayer("divParValueMGMT_Pct_"+sprodID, idealToFixed(mgmtPercentage, 2));
rewriteLayer("divParValueGCFEE_Pct_"+sprodID, idealToFixed(gcPercentage, 2));
}
}
else
{
if (g_EditFeePct == 1)
{
document.frmMain("fltParValueSC_Pct_"+sprodID).value = "";
document.frmMain("fltParValueUW_Pct_"+sprodID).value = "";
document.frmMain("fltParValueMGMT_Pct_"+sprodID).value = "";
document.frmMain("fltParValueGCFee_Pct_"+sprodID).value = "";
}
else
{
rewriteLayer("divParValueSC_Pct_"+sprodID, "");
rewriteLayer("divParValueUW_Pct_"+sprodID, "");
rewriteLayer("divParValueMGMT_Pct_"+sprodID, "");
rewriteLayer("divParValueGCFEE_Pct_"+sprodID, "");
}
}
reCalculateParValueGrossSpreadPercentage(sprodID);
}
function reCalculateGrossSpreadPercentage(sprodID)
{
var lOfferPrice = document.frmMain("fltTxtOfferPrice_"+sprodID).value.replace(/(\,)/g, "");
if((lOfferPrice != "") && (lOfferPrice != 0))
{
var lGrossSpread = document.frmMain("fltTxtGrossSpread_"+sprodID).value.replace(/(\,)/g, "");
var gsPercentage = roundDecimals(lGrossSpread*100/lOfferPrice);
if (g_EditFeePct == 1)
document.frmMain("fltGS_Pct_"+sprodID).value = formatFixedDecimalAmountString2(gsPercentage.toString(), 2, 6);
else
rewriteLayer("divGS_Pct_"+sprodID, idealToFixed(gsPercentage, 2));
}
else
{
if (g_EditFeePct == 1)
document.frmMain("fltGS_Pct_"+sprodID).value = "";
else
rewriteLayer("divGS_Pct_"+sprodID, "");
}
}
function reCalculateParValueGrossSpreadPercentage(sprodID)
{
var lOfferPrice = document.frmMain("fltTxtParValueOfferPrice_"+sprodID).value.replace(/(\,)/g, "");
if((lOfferPrice != "") && (lOfferPrice != 0))
{
var lGrossSpread = document.frmMain("fltTxtParValueGrossSpread_"+sprodID).value.replace(/(\,)/g, "");
var gsPercentage = roundDecimals(lGrossSpread*100/lOfferPrice);
if (g_EditFeePct == 1)
document.frmMain("fltParValueGS_Pct_"+sprodID).value = formatFixedDecimalAmountString2(gsPercentage.toString(), 2, 6);
else
rewriteLayer("divParValueGS_Pct_"+sprodID, idealToFixed(gsPercentage, 2));
}
else
{
if (g_EditFeePct == 1)
document.frmMain("fltParValueGS_Pct_"+sprodID).value = "";
else
rewriteLayer("divParValueGS_Pct_"+sprodID, "");
}
}
function setConversionPrice()
{
if (document.all.hidDisplayConvertibleInfoInd.value == 1)
return;
var lastSaleOfCommonStock = parseFloat(document.frmMain.TxtLastSaleOfCommonStock.value);
var convertPremium = parseFloat(document.frmMain.fltTxtConvertPremium.value) / 100;
var convertPrice = (1 + convertPremium) * lastSaleOfCommonStock;
if (!isNaN(convertPrice))
{
document.frmMain.curTxtConvertPrice.value = convertPrice;
}
}
function calcFeeFromPct( sAmtFld, sPctFld, sBasisFld, PrdID )
{
var fltBasis = parseFloat(document.frmMain(sBasisFld+PrdID).value.replace(/(\,)/g, ""));
if (isNaN(fltBasis)) fltBasis = 0;
if (fltBasis == 0)
{
document.frmMain(sAmtFld+PrdID).value = "";
}
else
{
var fltPct = parseFloat(document.frmMain(sPctFld+PrdID).value.replace(/(\,)/g, ""));
if (isNaN(fltPct)) fltPct = 0;
var NewAmt = fltPct / 100 * fltBasis;
document.frmMain(sAmtFld+PrdID).value = formatFixedDecimalAmountString2(NewAmt.toString(), 2, 6);
}	
}
function processPctChange( sAmtFld, sPctFld, PrdID, bGrossSpread )
{
formatFixedDecimalAmount2( document.frmMain(sPctFld+PrdID),2,6);
var fltOfferPrice = document.frmMain("fltTxtOfferPrice_"+PrdID).value.replace(/(\,)/g, "");
var fltGrossSpread = document.frmMain("fltTxtGrossSpread_"+PrdID).value.replace(/(\,)/g, "");
var BasisFld;
if (bGrossSpread == true)
BasisFld = "fltTxtOfferPrice_";
else
BasisFld = "fltTxtGrossSpread_";
calcFeeFromPct( sAmtFld, sPctFld, BasisFld, PrdID); 
MarkForOverride( document.frmMain(sAmtFld+PrdID), PrdID, g_baseProdID);
calcFields();
}
function processOfferPriceChange( PrdID )
{
reCalculateGrossSpreadPercentage(PrdID);
}
function processFeeAmtChange( sAmtFld, sPctFld, PrdID )
{
if (g_EditFeePct == '1' && PrdID == g_baseProdID)
{
calcFields_NoEditPct();
}
else if (!(g_EditFeePct == '1'))
{
calcFields_NoEditPct();
}
}
function processParValueFeeAmtChange( sAmtFld, sPctFld, PrdID )
{
if (g_EditFeePct == '1' && PrdID == g_baseProdID)
{
calcParValueFields_NoEditPct();
}
else if (!(g_EditFeePct == '1'))
{
calcParValueFields_NoEditPct();
}
}
function formatFixedDecimalAmountString2(sValue, min_digits, max_digits)
{
sValue = sValue.replace(/(\,)/g, "");
var fltValue = parseFloat(sValue);
if (!isNaN(fltValue))
{
sValue = roundDecimals(fltValue).toString();
if ( getDecimal(sValue).length<min_digits ) {
sValue = idealToFixed(sValue,min_digits);
}
else if ( getDecimal(sValue).length>max_digits ) {
sValue = idealToFixed(sValue,max_digits);
}
}
return sValue;
}
function formatFixedDecimalAmount2(obj, min_digits, max_digits)
{
if (document.frmMain.elements["hidMarketOrderString"] &&
obj.value == document.frmMain.elements["hidMarketOrderString"].value)
return;
var sValue = obj.value
obj.value = formatFixedDecimalAmountString(sValue, min_digits, max_digits);
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
function onPageUnload()
{
if (bChange)
{
event.returnValue = "You have made changes to the pricing page."
}
}
