<!-- 
var g_arrSMId = new Array();
var g_arrSMMgrId = new Array();
var g_arrSMGcId = new Array();
var g_numDecPlaces;
var g_NonLeadDeal;
function onPageLoad()
{
var lTrancheCount = new Number(document.frmMain.hidTrancheCount.value.replace(/(\,)/g, ""));
if (lTrancheCount <= 0)
return;
g_numDecPlaces = parseFloat(document.frmMain.hidNumDecPlaces.value);
g_NonLeadDeal = document.frmMain.hidNonLeadInd.value == "True";
for (var i=1; i <= document.frmMain.hidMgrSyndMemCount.value; i++)
{
var sSMItem = "hidSMMgrID" + i.toString();
g_arrSMMgrId[i] = document.frmMain.elements[sSMItem].value
}
for (var i=1; i <= document.gcFrm.hidGCMemCount.value; i++)
{
var sSMItem = "hidGlobalCordinator" + i.toString();
g_arrSMGcId[i] = document.gcFrm.elements[sSMItem].value
}
for (var i=1; i <= document.frmMain.hidAllSyndMemCount.value; i++)
{
var sSMItem = "hidSMID" + i.toString();
g_arrSMId[i] = document.frmMain.elements[sSMItem].value
}
Sum(document.frmMain, 'curMgmtFeeMgr', document.frmMain.curSumMgmt, document.frmMain.hidMgrSyndMemCount.value, "mgr");
if (document.frmMain.hidCIBCFunctionality.value == 1)
{
Sum(document.frmMain, 'stepupFeePct', document.frmMain.curSumStepUp, document.frmMain.hidUWSyndMemCount.value, "all");
}
{
if(getPotDistr(document.frmMain.PotSplitMthd) != '')
{
reconfigurePotSplit(document.frmMain);
} 
}	
showHideExpArea(document.frmMain.hidInitRevCalc.value);
filterTreatSplit(document.frmMain, "uwFeePct", document.frmMain.curSumUW, document.frmMain.hidUWFeeSum.value);
filterTreatSplit(document.frmMain, "curExpPct", document.frmMain.curSumExp);
SumInt(document.frmMain, 'brkMgmtAmt', document.frmMain.brkMgmtTotalAmt, document.frmMain.hidAllSyndMemCount.value, "all");
if(document.frmMain.hidInitRevCalc.value == 'U' || document.frmMain.hidInitRevCalc.value == 'E')
{
copyValues(document.frmMain, 'iUWFeeTotal', 'brkUWAmt');
}
SumRevenuesTotalForEachSyndMem(document.frmMain);
SumInt(document.frmMain, 'brkUWAmt', document.frmMain.brkUWTotalAmt, document.frmMain.hidAllSyndMemCount.value, "all"); 
SumInt(document.frmMain, 'brkSCAmt', document.frmMain.brkSCTotalAmt, document.frmMain.hidAllSyndMemCount.value, "all"); 
if (document.frmMain.hidCIBCFunctionality.value == 1)
{
SumInt(document.frmMain, 'brkStepupAmt', document.frmMain.brkStepupTotalAmt, document.frmMain.hidAllSyndMemCount.value, "all"); 
} 
SumInt(document.frmMain, 'brkTotalAmt', document.frmMain.brkFeeTotalAmt, document.frmMain.hidAllSyndMemCount.value, "all"); 
if (document.frmMain.hidIsDSP.value == 'true')
{
for (var i=0; i<arrDSPSyndMemId.length; i++)
{
var sm_id = arrDSPSyndMemId[i];
var title = new String(trim(document.frmMain.elements["dspImg" + sm_id].title));
if (title.length == 0)
document.frmMain.elements["dspImg" + sm_id].style.display = "none";
}
setTotalDSP();
onChangeAllSyndMemOfferPx();
setTotalOfferPxDSP();
setDSPPosition();
for (var i=0; i<arrDSPSyndMemId.length; i++)
{
setDSPSyndMemTotal(arrDSPSyndMemId[i]);
}	
setDSPSyndMemTotalByCol("OfferPx");
setDSPSyndMemTotalByCol("DelvyLessSellingConces");
setDSPSyndMemTotalByCol("LessSellingConces");
setDSPSyndMemTotalByCol("LessGrossSpd");
setDSPSyndMemTotalByCol("LessValue");
setDSPSyndMemGrandTotal();	
setPositionSyndMemDSP();
showHideOneArea("directedShareLayer");
}
}
function GetSMIDBaseItemName(sParse, iPos, sType)
{
var sItem;
if (sType == "mgr")
sItem = sParse + g_arrSMMgrId[iPos].toString(); 
else if (sType == "gc")
sItem = sParse + g_arrSMGcId[iPos].toString();
else
sItem = sParse + g_arrSMId[iPos].toString();
return sItem;
}
function CheckConditionallyRequiredFields( frm, arrFieldsInError )
{
var arrMoreErrors = new Array();
var count = 0;
if(document.gcFrm == frm)
{
if(frm.hidGCMemCount.value > 0)
{
var lMgmtFeeSum = new Number(frm.curSumGC.value.replace(/(\,)/g, "")); 
if ((lMgmtFeeSum - 100) != 0)
{
var arrError = FieldErrorInfo(GetSMIDBaseItemName("curGCFeeMgr", 1, "gc"), 'The Global Coordinator percentages do not total to 100%.', "", GetSMIDBaseItemName("curGCFeeMgr", 1, "gc"), "Global Coordinators");
arrMoreErrors[count] = arrError;	
count++;
}
}
return (arrMoreErrors);
}
{	
if(frm.curJumpBallPct)
{
if (frm.curPotSplitPct.value > 100 || frm.curPotSplitPct.value < 0 || frm.curJumpBallPct.value > 100 || frm.curJumpBallPct.value < 0){
var arrError = FieldErrorInfo("curPotSplitPct", 'The Pot split value is invalid.', "", "curPotSplitPct", "Pot Split");
arrMoreErrors[count] = arrError;	
count++;
} 
}
else
{ 
if (frm.curPotSplitPct.value > 100 || frm.curPotSplitPct.value < 0){
var arrError = FieldErrorInfo("curPotSplitPct", 'The Pot split value is invalid.', "", "curPotSplitPct", "Pot Split");
arrMoreErrors[count] = arrError;	
count++;
}
} 
} 
if(frm.selExpMgr[2].selected && !g_NonLeadDeal)
{
if (frm.curSumExp.value != 100){
var arrError = FieldErrorInfo(GetSMIDBaseItemName("curExpPct", 1, "all"), 'The Expense percentages do not total to 100%.', "", GetSMIDBaseItemName("curExpPct", 1, "all"), "Expenses");
arrMoreErrors[count] = arrError;	
count++;
}
} 
{
frm.hidPotMthd.value = getPotDistr(frm.PotSplitMthd);
var numCurFixedPotSplitPct = new Number(frm.curPotSplitPct.value);	
if(frm.hidPotMthd.value == 'M')
{	
var lLength = frm.hidMgrSyndMemCount.value;
var bError1Ind = false;
var bError2Ind = false;
var bError3Ind = false;
var bError4Ind = false;
var bError5Ind = false;
var bError6Ind = false;
var sMgrItem = GetSMIDBaseItemName("curMgmtFeeMgr", 1, "mgr");
var lFirstMgrSplit = new Number(frm.elements[sMgrItem].value.replace(/(\,)/g, ""));
for (var i=1; i<=lLength; i++)
{
sMgrItem = GetSMIDBaseItemName("curMgmtFeeMgr", i, "mgr");
if(frm.elements[sMgrItem].value != "")
{ 
var lMgmtFeeSum = new Number(frm.curSumMgmt.value.replace(/(\,)/g, "")); 
if ((lMgmtFeeSum - 100) != 0){
bError1Ind = true;
}
}
var sSplitItem = GetSMIDBaseItemName("curSplitMgr", i, "mgr");
var sCalcSplitItem = GetSMIDBaseItemName("CalcSplitMgr", i, "mgr");
var sCapLimit = GetSMIDBaseItemName("curCapLimitMgr", i, "mgr"); 
var lCapLimit = new Number(frm.elements[sCapLimit].value.replace(/(\,)/g, ""));
var lSplit = new Number(frm.elements[sSplitItem].value.replace(/(\,)/g, ""));
var lCalcSplit = new Number(frm.elements[sCalcSplitItem].value.replace(/(\,)/g, ""));
if((lCapLimit - lSplit) < 0 && lCapLimit > 0)
bError4Ind = true;
if(lCapLimit < lCalcSplit && lCapLimit > 0)
bError5Ind = true;
if(frm.elements[sSplitItem].value != "")
{
if (frm.curSumSplitMgr.value != 100){
bError2Ind = true;
}
if (frm.curSumSplitMgr.value > 100){
bError6Ind = true;
}
if(frm.cbEqualize.checked)
{
if(!(frm.PotSplitOptMgr[0].checked))
{
var lMgrSplit = new Number(frm.elements[sSplitItem].value.replace(/(\,)/g, "")); 
if((lMgrSplit - lFirstMgrSplit) != 0){
bError3Ind = true;
var lMgrCount = new Number(frm.hidMgrSyndMemCount.value.replace(/(\,)/g, ""));
if(i == 1 || i == lMgrCount){
var eqAmt = 100/lLength; 
var rndEqAmt = idealToFixed(eqAmt, g_numDecPlaces);
var balance = 100 - (rndEqAmt * (lMgrCount - 1));
var rndBalance = idealToFixed(balance, g_numDecPlaces);
if((lMgrSplit - rndBalance) == 0)
bError3Ind = false; 
} 
}
} 
}
} 
}
if(bError1Ind && !g_NonLeadDeal)
{
var arrError = FieldErrorInfo(GetSMIDBaseItemName("curMgmtFeeMgr", 1, "mgr"), 'The sum of the Manager Fee percentages is not equal to 100%.', "", GetSMIDBaseItemName("curMgmtFeeMgr", 1, "mgr"), "Manager Fee");
arrMoreErrors[count] = arrError;	
count++; 
}
if(bError2Ind && !g_NonLeadDeal)
{
var arrError = FieldErrorInfo(GetSMIDBaseItemName("curSplitMgr", 1, "mgr"), 'The sum of the Recommended Split percentages is not equal to 100%.', "", GetSMIDBaseItemName("curSplitMgr", 1, "mgr"), "Recommended Split");
arrMoreErrors[count] = arrError;	
count++; 
}
if(bError6Ind)
{
var arrError = FieldErrorInfo(GetSMIDBaseItemName("curSplitMgr", 1, "mgr"), 'The sum of the Recommended Split percentages cannot be greater than 100%.', "", GetSMIDBaseItemName("curSplitMgr", 1, "mgr"), "Recommended Split");
arrMoreErrors[count] = arrError;	
count++; 
}
if(bError3Ind)
{
var arrError = FieldErrorInfo(GetSMIDBaseItemName("curSplitMgr", 1, "mgr"), 'To Equalize Managers, their Recommended Split percentages must be equal.', "", GetSMIDBaseItemName("curSplitMgr", 1, "mgr"), "Recommended Split");
arrMoreErrors[count] = arrError;	
count++; 
} 
if(bError5Ind)
{
var arrError = FieldErrorInfo(GetSMIDBaseItemName("curCapLimitMgr", 1, "mgr"), 'The Cap Limits are greater than the Calculate Fixed percentages.', "", GetSMIDBaseItemName("curCapLimitMgr", 1, "mgr"), "Cap Limit");
arrMoreErrors[count] = arrError;	
count++; 
}
if(bError4Ind)
{
var arrError = FieldErrorInfo(GetSMIDBaseItemName("curSplitMgr", 1, "mgr"), 'The Split Percentages are greater than the Cap Limits.', "", GetSMIDBaseItemName("curSplitMgr", 1, "mgr"), "Recommended Split");
arrMoreErrors[count] = arrError;	
count++; 
}
if (!g_NonLeadDeal)
{
var numSumSplitMgr = new Number(frm.SumSplitMgr.value);	
if ((numSumSplitMgr != 100 && numSumSplitMgr != 0 && numSumSplitMgr != 'NaN') || (numSumSplitMgr == 0 && numCurFixedPotSplitPct > 0))
{
var arrError = FieldErrorInfo(GetSMIDBaseItemName("SplitMgr", 1, "mgr"), 'The sum of the Fixed Split Percentages is not equal to 100%.', "", GetSMIDBaseItemName("SplitMgr", 1, "mgr"), "Fixed Split");
arrMoreErrors[count] = arrError;	
count++; 
}
}
else
{
var numSumSplitMgr = new Number(frm.SumSplitMgr.value);	
if ((numSumSplitMgr != 0 && numSumSplitMgr != 'NaN' && numSumSplit > 100) || (numSumSplitMgr == 0 && numCurFixedPotSplitPct > 0))
{
var arrError = FieldErrorInfo(GetSMIDBaseItemName("SplitMgr", 1, "mgr"), 'The sum of the Fixed Split Percentages cannot be greater than 100%.', "", GetSMIDBaseItemName("SplitMgr", 1, "mgr"), "Fixed Split");
arrMoreErrors[count] = arrError;	
count++; 
}
}
}	
else
{
var lLength = frm.hidAllSyndMemCount.value;
var bError1Ind = false;
var bError2Ind = false;
var bError3Ind = false;
var bError5Ind = false;
var bError6Ind = false;
var lFirstMgrSplit = new Number(frm.elements[GetSMIDBaseItemName("curSplit", 1, "all")].value.replace(/(\,)/g, ""));
var lMgrLength = new Number(frm.hidMgrSyndMemCount.value.replace(/(\,)/g, ""));	
for (var i=1; i<=lLength; i++)
{
if(i<=lMgrLength)
{
var sMgrItem = GetSMIDBaseItemName("curMgmtFeeMgr", i, "mgr"); 
if(frm.elements[sMgrItem].value != "")
{ 
var lMgmtFeeSum = new Number(frm.curSumMgmt.value.replace(/(\,)/g, ""));	
if ((lMgmtFeeSum - 100) != 0){
bError1Ind = true;
}
} 
} 
var sSplitItem = GetSMIDBaseItemName("curSplit", i, "all"); 
var sCalcSplitItem = GetSMIDBaseItemName("CalcSplit", i, "all");
var sCapLimit = GetSMIDBaseItemName("curCapLimit", i, "all"); 
var lCapLimit = new Number(frm.elements[sCapLimit].value.replace(/(\,)/g, ""));
var lSplit = new Number(frm.elements[sSplitItem].value.replace(/(\,)/g, ""));
var lCalcSplit = new Number(frm.elements[sCalcSplitItem].value.replace(/(\,)/g, ""));
if((lCapLimit - lSplit) < 0 && lCapLimit > 0)
bError4Ind = true;
if(lCapLimit < lCalcSplit && lCapLimit > 0)
bError5Ind = true;
if(frm.elements[sSplitItem].value != "")
{	
if (frm.curSumSplit.value != 100){
bError2Ind = true;
}
if (frm.curSumSplit.value > 100){
bError6Ind = true;
}
if(frm.cbEqualize.checked && i <= lMgrLength)
{
if(!(frm.PotSplitOpt[0].checked))
{
var lMgrSplit = new Number(frm.elements[sSplitItem].value.replace(/(\,)/g, "")); 
if((lMgrSplit - lFirstMgrSplit) != 0){
bError3Ind = true;
var lMemCount = new Number(frm.hidAllSyndMemCount.value.replace(/(\,)/g, ""));
if(i == 1 || i == lMemCount){
var eqAmt = 100/lLength; 
var rndEqAmt = idealToFixed(eqAmt, g_numDecPlaces);
var balance = 100 - (rndEqAmt * (lMemCount - 1));
var rndBalance = idealToFixed(balance, g_numDecPlaces);
if((lMgrSplit - rndBalance) == 0)
bError3Ind = false; 
} 
} 
} 
} 
} 
}
if(bError1Ind && !g_NonLeadDeal)
{
var arrError = FieldErrorInfo(GetSMIDBaseItemName("curMgmtFeeMgr", 1, "mgr"), 'The sum of the Manager Fee percentages is not equal to 100%.', "", GetSMIDBaseItemName("curMgmtFeeMgr", 1, "mgr"), "Manager Fee");
arrMoreErrors[count] = arrError;	
count++; 
} 
if(bError2Ind && !g_NonLeadDeal)
{
var arrError = FieldErrorInfo(GetSMIDBaseItemName("curSplit", 1, "all"), 'The sum of the Recommended Split percentages is not equal to 100%.', "", GetSMIDBaseItemName("curSplit", 1, "all"), "Recommended Split");
arrMoreErrors[count] = arrError;	
count++; 
}
if(bError6Ind)
{
var arrError = FieldErrorInfo(GetSMIDBaseItemName("curSplitMgr", 1, "mgr"), 'The sum of the Recommended Split percentages cannot be greater than 100%.', "", GetSMIDBaseItemName("curSplitMgr", 1, "mgr"), "Recommended Split");
arrMoreErrors[count] = arrError;	
count++; 
} 
if(bError3Ind)
{
var arrError = FieldErrorInfo(GetSMIDBaseItemName("curSplit", 1, "all"), 'To Equalize Managers, their Recommended Split percentages must be equal.', "", GetSMIDBaseItemName("curSplit", 1, "all"), "Recommended Split");
arrMoreErrors[count] = arrError;	
count++; 
} 
if(bError5Ind)
{
var arrError = FieldErrorInfo(GetSMIDBaseItemName("curCapLimit", 1, "all"), 'The Cap Limits are greater than the Calculate Fixed percentages.', "", GetSMIDBaseItemName("curCapLimit", 1, "all"), "Cap Limit");
arrMoreErrors[count] = arrError;	
count++; 
}
if(bError4Ind)
{
var arrError = FieldErrorInfo(GetSMIDBaseItemName("curSplit", 1, "all"), 'The Recommended Split Percentages are greater than the Cap Limits.', "", GetSMIDBaseItemName("curSplit", 1, "all"), "Recommended Split");
arrMoreErrors[count] = arrError;	
count++; 
}
if (!g_NonLeadDeal)
{
var numSumSplit = new Number(frm.SumSplit.value);
if ((numSumSplit != 100 && numSumSplit != 0 && numSumSplit != 'NaN') || (numSumSplit == 0 && numCurFixedPotSplitPct > 0))
{
var arrError = FieldErrorInfo(GetSMIDBaseItemName("Split", 1, "all"), 'The sum of the Fixed Split Percentages is not equal to 100%.', "", GetSMIDBaseItemName("Split", 1, "all"), "Fixed Split");
arrMoreErrors[count] = arrError;	
count++; 
}
}
else
{
var numSumSplit = new Number(frm.SumSplit.value);
if ((numSumSplit != 0 && numSumSplit != 'NaN' && numSumSplit > 100) || (numSumSplit == 0 && numCurFixedPotSplitPct > 0))
{
var arrError = FieldErrorInfo(GetSMIDBaseItemName("Split", 1, "all"), 'The sum of the Fixed Split Percentages cannot be greater than 100%.', "", GetSMIDBaseItemName("Split", 1, "all"), "Fixed Split");
arrMoreErrors[count] = arrError;	
count++; 
}
}
}	
}	
return (arrMoreErrors);
} 
function submitPage( frm , action )
{
switch (action)
{
case "savechanges" :
if(ValidateForm( frm ))
{
if (isDSP())
{
var validateDSPInput = false;
if (getNum(frm.iTrnOfferPx.value) != 0 || getNum(frm.iTrnDelvyLessSellingConces.value) != 0 && getNum(frm.iTrnLessSellingConces.value) != 0 || getNum(frm.iTrnLessGrossSpd.value) != 0 || getNum(frm.iTrnLessValue.value) != 0)
{
validateDSPInput = true;
}
if (!validateDSPInput)
{
for (var i=0; i<arrDSPSyndMemId.length; i++)
{
var sm_id = arrDSPSyndMemId[i];	
if (getNum(frm.elements["iOfferPxCash" + sm_id].value) != 0 || getNum(frm.elements["iOfferPx" + sm_id].value) != 0 || getNum(frm.elements["iDelvyLessSellingConces" + sm_id].value) != 0 && getNum(frm.elements["iLessSellingConces" + sm_id].value) != 0 || getNum(frm.elements["iLessGrossSpd" + sm_id].value) != 0 || getNum(frm.elements["iLessValue" + sm_id].value) != 0)
{
validateDSPInput = true;
break;
}
} 
}
if (validateDSPInput)
{
if (getNum(frm.DSPPosition.value) != 0)
{
if (!confirm("The total Shares distributed across Share transfer price methods for the DSP does not equal the total DSP size. Do you want to continue anyway?"))
return;
}
var trnOfferPx = new Number(getNum(frm.iTrnOfferPx.value));
var totalOfferPxDSP = new Number(getNum(frm.TotalOfferPxDSP.value));
if ((trnOfferPx - totalOfferPxDSP) != 0)
{
if (!confirm("The economic splits for the DSP do not match the total allotment for the offer price transfer method. Do you want to continue anyway?"))
return;
}	
if (getNum(frm.PositionSyndMemDSP.value) != 0)
{
if (!confirm("The billed and delivered shares for the DSP do not equal the total DSP size. Do you want to continue anyway?"))
return;
}	
if (frm.hidMgmtFeeRev.value == "true")
{ 
if (getNum(frm.iTrnLessGrossSpd.value) != 0)
{
if (!confirm("A value has been manually entered into the \"Management Fee\" section of revenues. This value will not be recalculated."))
return; 
} 
}
} 
} 
if(ValidateForm( document.gcFrm ))
{
zeroInputs(document.gcFrm, "curGCFeeMgr", document.gcFrm.hidGCMemCount.value, "gc");
TransferGCData(frm, document.gcFrm); 
}
else
{
break;
}
frm.action = "/asp/util_submit_action.asp";
frm.hidTrancheId.value = frm.selTranche.value;
zeroInputs(frm, "curMgmtFeeMgr", document.frmMain.hidMgrSyndMemCount.value, "mgr"); 
zeroInputs(frm, "curExpPct", document.frmMain.hidAllSyndMemCount.value, "all"); 
enableInputs(frm, "curMgmtFeeMgr", document.frmMain.hidMgrSyndMemCount.value, "mgr");	
enableInputs(frm, "curExpPct", document.frmMain.hidAllSyndMemCount.value, "all");	
if (document.frmMain.hidCIBCFunctionality.value == 1)
{
zeroInputs(frm, "stepupFeePct", document.frmMain.hidAllSyndMemCount.value, "all");	
enableInputs(frm, "stepupFeePct", document.frmMain.hidAllSyndMemCount.value, "all");	
}
getEconCalcMthd(frm);
{ 
if(frm.hidPotMthd.value == 'M')
{
frm.hidPotOpt.value = getPotDistr(frm.PotSplitOptMgr);
zeroInputs(frm, "curSplitMgr", document.frmMain.hidMgrSyndMemCount.value, "mgr"); 
zeroInputs(frm, "SplitMgr", document.frmMain.hidMgrSyndMemCount.value, "mgr");
zeroInputs(frm, "curCapLimitMgr", document.frmMain.hidMgrSyndMemCount.value, "mgr"); 
enableInputs(frm, "curSplitMgr", document.frmMain.hidMgrSyndMemCount.value, "mgr");
enableInputs(frm, "SplitMgr", document.frmMain.hidMgrSyndMemCount.value, "mgr");
}
else
{
frm.hidPotOpt.value = getPotDistr(frm.PotSplitOpt);
zeroInputs(frm, "curSplit", document.frmMain.hidAllSyndMemCount.value, "all"); 
zeroInputs(frm, "Split", document.frmMain.hidAllSyndMemCount.value, "all"); 
zeroInputs(frm, "curCapLimit", document.frmMain.hidAllSyndMemCount.value, "all");	
enableInputs(frm, "curSplit", document.frmMain.hidAllSyndMemCount.value, "all");	
enableInputs(frm, "Split", document.frmMain.hidAllSyndMemCount.value, "all");	
}
}
if((warningPopUp(frm))){
frm.hidAction.value = "Update";
frm.submit(); 
}
}
break;
case "save_gc" :
if(ValidateForm( frm ))
{
frm.hidTrancheId.value = document.frmMain.selTranche.value;
frm.action = "/asp/util_submit_action.asp";
zeroInputs(document.gcFrm, "curGCFeeMgr", document.gcFrm.hidGCMemCount.value, "gc");
frm.hidAction.value = "UpdateGlobalCoordinators";
frm.submit();
}
break;
case "reverttosaved" :
window.location.reload();
break;
case "cancel" :
frm.hidTrancheId.value = frm.selTranche.value;
frm.action = "/asp/tranche_economics.asp";
frm.submit();
break;
}
}
function loadDealEconomics(frm)
{
frm.method = "POST";
frm.action = "deal_economics_edit.asp";
frm.submit();
}
function zeroInputs(frm, sParse, iMemberCount, sType)
{
for (var i=1; i<=iMemberCount; i++)
{
var sItem = GetSMIDBaseItemName(sParse, i, sType);
if(frm.elements[sItem].value == "")
{ 
frm.elements[sItem].value = 0;
}
}
}
function loadTranche(frm)
{
frm.hidTrancheId.value = frm.selTranche.value;
frm.method = "POST";
frm.action = "tranche_economics.asp";
frm.submit();
}
function showHideOneArea(areaName, imageName){
var elthis = document.getElementById(areaName);
var image = document.getElementById(imageName);
if (elthis.style.display == 'none')
{
elthis.style.display = '';
if (image)
image.src="../images/minus.gif";
}
else
{
elthis.style.display = 'none';
if (image)
image.src="../images/plus.gif";
}
}
function changeMgmtGrpCap(frm)
{
if(frm.radCalcMthd[1].checked == true)
frm.curMgmtGrpCap.disabled = false;
else
{
frm.curMgmtGrpCap.disabled = true;
frm.curMgmtGrpCap.value = '';
}
}
function showHidePotArea(memberFlag){
var potOptMgr = eval("potSplitOptMgrOnly");
var potOptAll = eval("potSplitOptAll");
var syndMgr = eval("syndMemMgr");
var syndAll = eval("syndMemAll");
if(memberFlag == ''){
potOptMgr.style.display = 'none';
syndMgr.style.display = 'none';
potOptAll.style.display = 'none';
syndAll.style.display = 'none';	
}
else if(memberFlag == 'M')
{
potOptMgr.style.display = '';
syndMgr.style.display = '';
potOptAll.style.display = 'none';
syndAll.style.display = 'none';
}
else 
{
potOptMgr.style.display = 'none';
syndMgr.style.display = 'none';
potOptAll.style.display = '';
syndAll.style.display = '';
}	
}
function showHideExpArea(memberFlag){
var expAll = eval("allExpLayer");
var expMgr = eval("mgrExpLayer");
if(memberFlag == 'U' || memberFlag == ''){
expAll.style.display = '';
expMgr.style.display = 'none';
}
else 
{
expAll.style.display = 'none';
expMgr.style.display = '';
}	
}
function getPotDistr(potDistr)
{
var PotDistrVal;
if(potDistr.length)
{ 
for(i=0; i<potDistr.length; i++)
{
if(potDistr[i].checked == true)
{
PotDistrVal = potDistr[i].value;
i = potDistr.length;
}	
}	
}
else
{
PotDistrVal = potDistr.value;
}	
return PotDistrVal;
} 
function getEconCalcMthd(frm)
{
if(frm.radRevCalc[0].checked)
{
frm.hidMgrRevMthd.value = frm.hidUWMthdId.value
if(frm.radExpCalc[0].checked)
{
frm.hidMgrExpMthd.value = frm.hidUWMthdId.value
frm.hidUWExpMthd.value = frm.hidUWMthdId.value
}
else
{
frm.hidUWExpMthd.value = frm.hidNoneMthdId.value
if(frm.selExpMgr.value == "1")
{
frm.hidMgrExpMthd.value = frm.hidEqualMthdId.value
}
else if(frm.selExpMgr.value == "2")
{
frm.hidMgrExpMthd.value = frm.hidUWMthdId.value
} 
else
{
frm.hidMgrExpMthd.value = frm.hidCustomMthdId.value
}
}
}
else
{
frm.hidMgrRevMthd.value = frm.hidEqualMthdId.value
if(frm.radExpCalcMgr[0].checked)
{
frm.hidMgrExpMthd.value = frm.hidEqualMthdId.value
frm.hidUWExpMthd.value = frm.hidUWMthdId.value
}
else
{
frm.hidUWExpMthd.value = frm.hidNoneMthdId.value 
if(frm.selExpMgr.value == "1")
{
frm.hidMgrExpMthd.value = frm.hidEqualMthdId.value
}
else if(frm.selExpMgr.value == "2")
{
frm.hidMgrExpMthd.value = frm.hidUWMthdId.value
} 
else
{
frm.hidMgrExpMthd.value = frm.hidCustomMthdId.value
}
} 
} 
} 
function calculatePotSplit(frm, potFlag)
{
if(frm.curJumpBallPct)
{
if(potFlag == 'P')
{
var pot = new Number(frm.curPotSplitPct.value.replace(/(\,)/g, ""));
var jump = 100 - pot;
frm.curJumpBallPct.value = idealToFixed(jump, 2);
}
else
{
var jump = new Number(frm.curJumpBallPct.value.replace(/(\,)/g, ""));
var pot = 100 - jump;
frm.curPotSplitPct.value = idealToFixed(pot, 2);	
}
}
computeRecSplit(frm);
}
function Sum(frm, sParse, sumVal, iMemberCount, sType, total)
{
if (total == null)
{
var sList;
sList = 0;
for (var i=1; i<=iMemberCount; i++)
{
var sItem = GetSMIDBaseItemName(sParse, i, sType);
var iFormVal = new Number(frm.elements[sItem].value.replace(/(\,)/g, ""));
if (!isNaN(iFormVal))
sList += iFormVal;
}
sumVal.value = idealToFixed(sList, g_numDecPlaces);
}
else
{	
sumVal.value = (Math.abs(total - 100) <= 0.001 ? 100 : idealToFixed(total, g_numDecPlaces));
}
}
function SumInt(frm, sParse, sumVal, iMemberCount, sType)
{
var sList;
sList = 0;
for (var i=1; i<=iMemberCount; i++)
{
var sItem = GetSMIDBaseItemName(sParse, i, sType);
var iFormVal = new Number(frm.elements[sItem].value.replace(/(\,)/g, ""));
sList += iFormVal;
}
sumVal.value = formatAmountString(sList.toString());
}
function equalSplit(frm, sParse, sumVal, iMemberCount, sType, noRounding)
{
var lLength = new Number(iMemberCount);
var arr = createRoundedSplitArray( 100, lLength, g_numDecPlaces );
for ( var i = 1; i <= lLength; i++ )
{
var sItem = GetSMIDBaseItemName(sParse, i, sType);
frm.elements[sItem].value = arr[ i ];	
}
Sum(frm, sParse, sumVal, iMemberCount, sType);
}
function mgrFee(frm, sMgrFeeParse, sSplitParse, sumSplitVal, sumMgrFeeVal, iMemberCount)
{
for (var i=1; i<=iMemberCount; i++)
{
var sMgrItem = GetSMIDBaseItemName(sMgrFeeParse, i, "mgr"); 
var sSplitItem = GetSMIDBaseItemName(sSplitParse, i, "mgr");
frm.elements[sSplitItem].value = frm.elements[sMgrItem].value;	
}	
sumSplitVal.value = sumMgrFeeVal.value;
}
function changePotOpt(radOpt, position)
{
radOpt[position].checked = true;
}
function checkInitialState(frm, type)
{	
if(type == 'all')
{
if(getPotDistr(frm.PotSplitOpt) != 'E' &&
getPotDistr(frm.PotSplitOpt) != 'O'){
changePotOpt(frm.PotSplitOpt, 0); 
}
}
else
{
if(getPotDistr(frm.PotSplitOptMgr) != 'E' &&
getPotDistr(frm.PotSplitOptMgr) != 'M' &&
getPotDistr(frm.PotSplitOptMgr) != 'O'){
changePotOpt(frm.PotSplitOptMgr, 0); 
}
}
}
function reconfigurePotSplit(frm)
{
if (getPotDistr(frm.PotSplitMthd) == "M")
{
uncheckEqualize(document.frmMain); 
showHidePotArea('M', potSplitOptMgrOnly, potSplitOptAll); 
checkInitialState(document.frmMain, 'mgr'); 
if (getPotDistr(frm.PotSplitOptMgr) == "O")
{
enableSplitFields(frm, 'M');
Sum(frm, 'curSplitMgr', frm.curSumSplitMgr, frm.hidMgrSyndMemCount.value, "mgr");
}
else
{
disableSplitFields(frm, 'M');
applyPotSplit(document.frmMain, 'M', getPotDistr(frm.PotSplitOptMgr));
}
Sum(frm, 'SplitMgr', frm.SumSplitMgr, frm.hidMgrSyndMemCount.value, "mgr");
updateCalcFixSplit(document.frmMain, 'SplitMgr', 'CalcSplitMgr', 'mgr', 'SumCalcSplitMgr');
}
else if (getPotDistr(frm.PotSplitMthd) == "A")
{
uncheckEqualize(document.frmMain); 
showHidePotArea('A', potSplitOptMgrOnly, potSplitOptAll); 
checkInitialState(document.frmMain, 'all');
if (getPotDistr(frm.PotSplitOpt) == "O")
{
enableSplitFields(frm, 'A');
Sum(frm, 'curSplit', frm.curSumSplit, frm.hidAllSyndMemCount.value, "all");
}
else
{
disableSplitFields(frm, 'A');
applyPotSplit(document.frmMain, 'A', getPotDistr(frm.PotSplitOpt));
}
Sum(frm, 'Split', frm.SumSplit, frm.hidAllSyndMemCount.value, "all");
updateCalcFixSplit(document.frmMain, 'Split', 'CalcSplit', 'all', 'SumCalcSplit');
}
}
function onClickPotSplitMthd(frm)
{
reconfigurePotSplit(frm);
}
function onClickPotSplitOptMgr(frm)
{
reconfigurePotSplit(frm);
}
function onClickPotSplitOpt(frm)
{
reconfigurePotSplit(frm);
}
function onChangeSplit(frm, fld)
{
var val = parseFloat(fld.value);
if (isNaN(val))
fld.value = '';
else
fld.value = idealToFixed(val, g_numDecPlaces);
computeRecSplit(frm);
}
function onChangeRecSplitMgr(frm)
{
uncheckEqualize(frm); 
Sum(frm, 'curSplitMgr', frm.curSumSplitMgr, frm.hidMgrSyndMemCount.value, 'mgr'); 
changePotOpt(frm.PotSplitOptMgr, frm.PotSplitOptMgr.length - 1);
enableSplitFields(frm, 'M');
}
function onChangeRecSplit(frm)
{
Sum(frm, 'curSplit', frm.curSumSplit, frm.hidAllSyndMemCount.value, 'all'); 
changePotOpt(frm.PotSplitOpt, frm.PotSplitOpt.length - 1);
enableSplitFields(frm, 'A');
}
function computeRecSplit(frm)
{
if (getPotDistr(frm.PotSplitMthd) == "M")
{
doRecSplit(frm, 'SplitMgr', 'curSplitMgr', 'curCapLimitMgr', frm.hidMgrSyndMemCount, frm.curSumSplitMgr, "mgr", 'CalcSplitMgr');
Sum(frm, 'SplitMgr', frm.SumSplitMgr, frm.hidMgrSyndMemCount.value, "mgr");
Sum(frm, 'CalcSplitMgr', frm.SumCalcSplitMgr, frm.hidMgrSyndMemCount.value, "mgr");
}
else if (getPotDistr(frm.PotSplitMthd) == "A")
{
doRecSplit(frm, 'Split', 'curSplit', 'curCapLimit', frm.hidAllSyndMemCount, frm.curSumSplit, "all", 'CalcSplit');
Sum(frm, 'Split', frm.SumSplit, document.frmMain.hidAllSyndMemCount.value, "all");
Sum(frm, 'CalcSplit', frm.SumCalcSplit, document.frmMain.hidAllSyndMemCount.value, "all");
}
}
function maintainMgrFeeStruct(frm, position)
{	
{
if(getPotDistr(frm.PotSplitOptMgr) == 'M')
{
var sMgrFeeItem = GetSMIDBaseItemName("curMgmtFeeMgr", position, "mgr");
applyPotSplit(frm, 'M', 'M');
}
}	
}
function getAnticipated(frm, sSrcParse, sParse, sMgmtFeeTotal, iMemberPos, sType)
{
var sAntiItem = GetSMIDBaseItemName(sParse, iMemberPos, sType);
var sAntiPctItem = GetSMIDBaseItemName(sSrcParse, iMemberPos, sType);
if(frm.elements[sAntiPctItem].value == "")
frm.elements[sAntiItem].value = "";
else
{	
var pctAntiPctVal = new Number(frm.elements[sAntiPctItem].value.replace(/(\,)/g, ""));
var lMgmtFeeTotal = new Number(sMgmtFeeTotal);
if (isNaN(lMgmtFeeTotal))
lMgmtFeeTotal = 0;
var rawDesigVal = Math.round(pctAntiPctVal * 0.01 *lMgmtFeeTotal);
frm.elements[sAntiItem].value = formatAmountString(rawDesigVal.toString());
}	
}
function getAllAnticipated(frm, sSrcParse, sParse, sMgmtFeeTotal, lNumMem, sumVal, sType)
{
for(var i=1; i<=lNumMem; i++)
{
getAnticipated(frm, sSrcParse, sParse, sMgmtFeeTotal, i, sType);
}
SumInt(frm, sParse, sumVal, lNumMem, sType); 
}
function applyEqualizeMgr(frm)
{
if(frm.cbEqualize.checked)
{
frm.radRevCalc[1].checked = true;
showHideExpArea('M');
frm.radExpCalcMgr[0].checked = true;
filterTreatSplit(frm, 'uwFeePct', frm.curSumUW, frm.hidUWFeeSum.value);
filterTreatSplit(frm, 'curExpPct', frm.curSumExp, frm.hidUWFeeSum.value);
equalSplit(frm, 'curMgmtFeeMgr', frm.curSumMgmt, frm.hidMgrSyndMemCount.value, "mgr"); 
getAllAnticipated(frm, 'curMgmtFeeMgr', 'curAntiAmtMgr', frm.hidMgmtFeeSum.value, frm.hidMgrSyndMemCount.value, frm.curSumAnti, "mgr") 
{
frm.PotSplitMthd[0].checked = true;
frm.PotSplitOptMgr[0].checked = true;
showHidePotArea('M'); 
applyPotSplit(frm, 'M', 'E'); 
} 
} 
}
function applyCEFMFCalc(frm)
{
if(frm.cbUseCEFMFCalc.checked)
{
uncheckEqualize(document.frmMain);
var totalpct = 0;
for(var i=1; i <= frm.hidMgrSyndMemCount.value; i++)
{
var pct = frm.document.all("hidSMMFPct" + i).value;
var sm_id = frm.document.all("hidSMMgrID" + i).value;
pct = roundDecimals(pct, 4);
totalpct += pct;
frm.document.all("curMgmtFeeMgr" + sm_id).value = pct;
}
var diff = 100 - totalpct;
if (diff != 0)
{
var sm_id = frm.document.all("hidSMMgrID1").value;
var pct = frm.document.all("curMgmtFeeMgr" + sm_id).value;
var pct = new Number(pct) + diff;
pct = roundDecimals(pct, 4);
frm.document.all("curMgmtFeeMgr" + sm_id).value = pct;
}	
getAllAnticipated(frm, 'curMgmtFeeMgr', 'curAntiAmtMgr', frm.hidMgmtFeeSum.value, frm.hidMgrSyndMemCount.value, frm.curSumAnti, "mgr");
Sum(document.frmMain, 'curMgmtFeeMgr', document.frmMain.curSumMgmt, document.frmMain.hidMgrSyndMemCount.value, 'mgr');
}
}
function applyEqualizeGC(frm)
{
equalSplit(frm, 'curGCFeeMgr', frm.curSumGC, frm.hidGCMemCount.value, "gc"); 
getAllAnticipated(frm, 'curGCFeeMgr', 'curGCAntiAmtMgr', frm.hidGCFeeSum.value, frm.hidGCMemCount.value, frm.curSumAntiGC, "gc")
}
function filterTreatSplit(frm, sParse, sumVal, sUWFeeTotal)
{
if(sParse == "uwFeePct")
{
if (g_NonLeadDeal)
{
applyUWCommit(frm, sParse, sumVal, frm.hidAllSyndMemCount.value, "all");
}
else
{
if(frm.radRevCalc[0].checked)
{
applyTreatSplit(frm, sParse, sumVal, 'all');
}
else
{
applyTreatSplit(frm, sParse, sumVal, 'mgr'); 
}
}
getAllUWAmt(frm);
}
else if(sParse == "curExpPct")
{
if(frm.radRevCalc[0].checked)
{
if(frm.radExpCalc[0].checked)
{
applyTreatSplit(frm, sParse, sumVal, 'all'); 
}
else
{
if(frm.selExpMgr.value == "1")
{
blankInputs(frm, "curExpPct", frm.hidAllSyndMemCount.value, "all"); 
equalSplit(frm, sParse, sumVal, frm.hidMgrSyndMemCount.value, "mgr"); 
}
else if(frm.selExpMgr.value == "2")
{
blankInputs(frm, "curExpPct", frm.hidAllSyndMemCount.value, "all"); 
applyMgrGroupOnlyExpenseCommit(frm, sParse, sumVal, frm.hidMgrSyndMemCount.value, "mgr");
} 
else
{
enableInputs(frm, "curExpPct", frm.hidMgrSyndMemCount.value, "mgr"); 
Sum(frm, sParse, sumVal, frm.hidAllSyndMemCount.value, "all"); 
}
}
}
else
{
if(frm.radExpCalcMgr[0].checked)
{
applyTreatSplit(frm, sParse, sumVal, 'mgr'); 
}
else
{
if(frm.selExpMgr.value == "1")
{
blankInputs(frm, "curExpPct", frm.hidAllSyndMemCount.value, "all"); 
equalSplit(frm, sParse, sumVal, frm.hidMgrSyndMemCount.value, "mgr"); 
}
else if(frm.selExpMgr.value == "2")
{
blankInputs(frm, "curExpPct", frm.hidAllSyndMemCount.value, "all"); 
applyMgrGroupOnlyExpenseCommit(frm, sParse, sumVal, frm.hidMgrSyndMemCount.value, "mgr");
} 
else
{
enableInputs(frm, "curExpPct", frm.hidMgrSyndMemCount.value, "mgr"); 
Sum(frm, sParse, sumVal, frm.hidAllSyndMemCount.value, "all"); 
}
} 
} 
}
}
function isSyndicateManager(sSMID)
{
for(var i=1; i<= g_arrSMMgrId.length; i++)
{
if (sSMID == g_arrSMMgrId[i])
return true
}
return false;
}
function applyTreatSplit(frm, sParse, sumVal, type)
{
var lNumSyndMem = new Number(frm.hidAllSyndMemCount.value.replace(/(\,)/g, ""));
var lNumSyndMgr = new Number(frm.hidMgrSyndMemCount.value.replace(/(\,)/g, ""));
var lRunningTotal = g_NonLeadDeal ? 0 : parseFloat(100);
for(var i=1; i<=lNumSyndMem; i++)
{
if (!isSyndicateManager(g_arrSMId[i]) )
{
var sCommit = GetSMIDBaseItemName("hidCommitPct", i, "all");
var lCommitPct = new Number(frm.elements[sCommit].value.replace(/(\,)/g, ""));
if (isNaN(lCommitPct))
lCommitPct = 0;
var sSplit = GetSMIDBaseItemName(sParse, i, "all");
frm.elements[sSplit].value = idealToFixed(lCommitPct, g_numDecPlaces);
lRunningTotal = lRunningTotal - lCommitPct;
}
}
if(type != 'none')
{
var arr;
if ( type == 'mgr' )
{
arr = createRoundedSplitArray( lRunningTotal, lNumSyndMgr, g_numDecPlaces );
}
else
{
arr = new Array( lNumSyndMgr + 1 ); 
for(var i=1; i<=lNumSyndMgr; i++)
{
if ( g_NonLeadDeal )
{
var sCommitPct = GetSMIDBaseItemName("hidCommitPct", i, "mgr"); 
var lCommitPct = new Number(frm.elements[sCommitPct].value.replace(/(\,)/g, ""));
if (isNaN(lCommitPct))
lCommitPct = 0;
arr[ i ] = parseFloat(lCommitPct);
lRunningTotal += lCommitPct;
}
else
{
var sCommit = GetSMIDBaseItemName("hidCommit", i, "mgr"); 
var lCommitPct = new Number(frm.elements[sCommit].value.replace(/(\,)/g, ""));
if (isNaN(lCommitPct))
lCommitPct = 0;
arr[ i ] = parseFloat(lCommitPct);
}
}
normalizeArray( arr, lRunningTotal, g_numDecPlaces );
}
for(var i=1; i<=lNumSyndMgr; i++)
{
var sSplit = GetSMIDBaseItemName(sParse, i, "mgr"); 
frm.elements[sSplit].value = arr[ i ];
}
} 
Sum(frm, sParse, sumVal, frm.hidAllSyndMemCount.value, "all");
}
function enableInputs(frm, sParse, iMemberPos, sType)
{
for(var i=1; i<=iMemberPos; i++)
{
var sItem = GetSMIDBaseItemName(sParse, i, sType); 
frm.elements[sItem].disabled = false; 
}
}
function disableInputs(frm, sParse, iMemberPos, sType)
{
for(var i=1; i<=iMemberPos; i++)
{
var sItem = GetSMIDBaseItemName(sParse, i, sType); 
frm.elements[sItem].disabled = true; 
}
}
function blankInputs(frm, sParse, iMemberCount, sType)
{
for (var i=1; i<=iMemberCount; i++)
{
var sItem = GetSMIDBaseItemName(sParse, i, sType); 
frm.elements[sItem].value = "";
}
}
function checkInitialStateUWFee(frm, type)
{	
if(type == 'all')
{
if(!(frm.radExpCalc.value)){
changePotOpt(frm.radExpCalc, 0); 
frm.selExpMgr.disabled = true; 
disableInputs(frm, "curExpPct", frm.hidMgrSyndMemCount.value, "mgr"); 
frm.selExpMgr[0].selected = true; 
}
}
else
{
if(!(frm.radExpCalcMgr.value)){
changePotOpt(frm.radExpCalcMgr, 0); 
frm.selExpMgr.disabled = true; 
disableInputs(frm, "curExpPct", frm.hidMgrSyndMemCount.value, "mgr"); 
frm.selExpMgr[0].selected = true; 
}
}
}
function enableExpDropDown(frm, type)
{	
if(type == 'all')
{
if(frm.radExpCalc[1].checked){
frm.selExpMgr.disabled = false;
}
else
{
frm.selExpMgr.disabled = true; 
disableInputs(frm, "curExpPct", frm.hidMgrSyndMemCount.value, "mgr"); 
frm.selExpMgr[0].selected = true;
}
}
else
{
if(frm.radExpCalcMgr[1].checked){
frm.selExpMgr.disabled = false; 
}
else
{
frm.selExpMgr.disabled = true; 
disableInputs(frm, "curExpPct", frm.hidMgrSyndMemCount.value, "mgr"); 
frm.selExpMgr[0].selected = true; 
} 
}
}
function checkExpBreakDown(frm)
{
if(frm.selExpMgr.value == "3")
{
enableInputs(frm, "curExpPct", frm.hidMgrSyndMemCount.value, "mgr");
blankInputs(frm, "curExpPct", frm.hidAllSyndMemCount.value, "all");
var sItem = GetSMIDBaseItemName("curExpPct", 1, "all");
frm.elements[sItem].focus();
Sum(frm, "curExpPct", frm.curSumExp, frm.hidAllSyndMemCount.value, "all"); 
}
else
{
disableInputs(frm, "curExpPct", frm.hidAllSyndMemCount.value, "all"); 
}
}
function applyUWCommit(frm, sParse, sumval, iMemberCount, sType)
{
for (var i=1; i<=iMemberCount; i++)
{
var sCommit = GetSMIDBaseItemName("hidCommitPct", i, sType); 
var lCommitPct = new Number(frm.elements[sCommit].value.replace(/(\,)/g, ""));
if (isNaN(lCommitPct))
lCommitPct = 0;
var sSplit = GetSMIDBaseItemName(sParse, i, sType);
frm.elements[sSplit].value = idealToFixed(lCommitPct, g_numDecPlaces);
}
Sum(frm, sParse, sumval, frm.hidAllSyndMemCount.value, "all"); 
}
function applyMgrGroupOnlyExpenseCommit(frm, sParse, sumval, iMemberCount, sType)
{
if( sType = "mgr" && sParse == "curExpPct")
{
var lMgrUWSize = new Number();
lMgrUWSize = 0;
for (var j=1; j<=iMemberCount; j++)
{
var sCommit = GetSMIDBaseItemName("hidCommit", j, sType);	
var lCommit = new Number(frm.elements[sCommit].value.replace(/(\,)/g, ""));
if (isNaN(lCommit))
lCommit = 0;
lMgrUWSize = lMgrUWSize + lCommit
}
if( lMgrUWSize > 0 )
{
var arrCommitPct = new Array( iMemberCount + 1 );
for (j=1; j<=iMemberCount; j++)
{
var sCommit = GetSMIDBaseItemName("hidCommit", j, sType);	
var lCommit = new Number(frm.elements[sCommit].value.replace(/(\,)/g, ""));
if (isNaN(lCommit))
lCommit = 0;
var lCommitPct = 0;
lCommitPct = lCommit / lMgrUWSize * 100;
arrCommitPct[j] = lCommitPct;
}
fractionDigits = parseFloat(g_numDecPlaces);
normalizeArray( arrCommitPct, 100, g_numDecPlaces );
for (j=1; j<=iMemberCount; j++)
{
var sSplit = GetSMIDBaseItemName(sParse, j, sType);
frm.elements[sSplit].value = arrCommitPct[j];
}
}
}
Sum(frm, sParse, sumval, frm.hidAllSyndMemCount.value, "all"); 
}
function uncheckEqualize(frm)
{
if(frm.cbEqualize.checked)
frm.cbEqualize.checked = false;
}
function applyPotSplit(frm, sMemType, sSplitType) 
{
if(sMemType == 'M')
{
if(sSplitType == 'M')
{
mgrFee(frm, 'curMgmtFeeMgr', 'SplitMgr', frm.SumSplitMgr, frm.curSumMgmt, frm.hidMgrSyndMemCount.value, "mgr"); 
}
else if(sSplitType == 'E')
{
equalSplit(frm, 'SplitMgr', frm.SumSplitMgr, frm.hidMgrSyndMemCount.value, "mgr", true); 
}
doRecSplit(frm, 'SplitMgr', 'curSplitMgr', 'curCapLimitMgr', frm.hidMgrSyndMemCount, frm.curSumSplitMgr, "mgr", 'CalcSplitMgr');
}
else
{
if(sSplitType == 'E')
{
equalSplit(frm, 'Split', frm.SumSplit, frm.hidAllSyndMemCount.value, "all", true); 
}
doRecSplit(frm, 'Split', 'curSplit', 'curCapLimit', frm.hidAllSyndMemCount, frm.curSumSplit, "all", 'CalcSplit');
}
}
function updateCalcFixSplit(frm, sSplit, sCalcFix, sType, sSum)
{
var lPotSplit = new Number(frm.curPotSplitPct.value.replace(/(\,)/g, ""));
if(lPotSplit > 0)
{
var lNum;
var fSum = 0;
if (sType == 'mgr')
lNum = new Number(frm.hidMgrSyndMemCount.value.replace(/(\,)/g, ""));
else
lNum = new Number(frm.hidAllSyndMemCount.value.replace(/(\,)/g, ""));
for (var i=1; i<=lNum;i++)
{ 
var sSplitFld = GetSMIDBaseItemName(sSplit, i, sType);
var sCalcFixFld = GetSMIDBaseItemName(sCalcFix, i, sType);
var fSplit = new Number(frm.elements[sSplitFld].value.replace(/(\,)/g, ""));
fSplit = parseFloat(lPotSplit) * parseFloat(fSplit) / parseFloat(100);
frm.elements[sCalcFixFld].value = idealToFixed(fSplit, g_numDecPlaces);
fSum += fSplit;
}
frm.elements[sSum].value = idealToFixed(fSum, g_numDecPlaces);
}
}
function doRecSplit(frm, sSplit1, sSplit2, sCapLimit, sNumMem, sTotal, sType, sCalcFix)
{
var lPotSplit = new Number(frm.curPotSplitPct.value.replace(/(\,)/g, ""));
if(lPotSplit > 0)
{
var lNumMem = new Number(sNumMem.value.replace(/(\,)/g, ""));
var lNumMgr = new Number(frm.hidMgrSyndMemCount.value.replace(/(\,)/g, ""));
var lJumpBall = new Number(frm.curJumpBallPct.value.replace(/(\,)/g, ""));
var lTempJump = lJumpBall;
if (lJumpBall > 0)
{
var RecSplitArr = new Array(lNumMem+1);
var CalcFixArr = new Array(lNumMem+1);
var CapArr = new Array(lNumMem+1);
var ExcludeArr = new Array(lNumMem+1);
var SumFixedPct = 0;
var bCapped = false;
for (var i=1; i<=lNumMem; i++)
{
var sItem1 = GetSMIDBaseItemName(sSplit1, i, sType);
var lSpltPct = new Number(frm.elements[sItem1].value.replace(/(\,)/g, ""));
SumFixedPct += parseFloat(lSpltPct);
var lPct = lPotSplit * lSpltPct * 0.01;
CalcFixArr[i] = parseFloat(lPct);
if(i > lNumMgr)
{
RecSplitArr[i] = CalcFixArr[i];
CapArr[i] = 0;
}
else
{
var sItem3 = GetSMIDBaseItemName(sCapLimit, i, sType);
var curSplitPct = new Number(frm.elements[sItem1].value.replace(/(\,)/g, ""));
if (isNaN(curSplitPct))
curSplitPct = 0;
var curCapLimit = new Number(frm.elements[sItem3].value.replace(/(\,)/g, ""));
if (isNaN(curCapLimit))
curCapLimit = 0;
CapArr[i] = curCapLimit;
var curRecSplitPct;
var lRemainder;
if(frm.cbEqualize.checked)
{ 
lRemainder = lTempJump / lNumMem;
curRecSplitPct = curSplitPct * lPotSplit * 0.01 + lRemainder; 
}
else if(i > 1)
{
curRecSplitPct = curSplitPct * lPotSplit * 0.01; 
}
else
{
curRecSplitPct = curSplitPct * lPotSplit * 0.01 + lJumpBall; 
}
if(curCapLimit == 0 || ((curCapLimit - curRecSplitPct) >= 0))
{
RecSplitArr[i] = parseFloat(curRecSplitPct);
} 
else
{
RecSplitArr[i] = parseFloat(curCapLimit);
bCapped = true;
} 
} 
}
SumFixedPct = idealToFixed(SumFixedPct, g_numDecPlaces + 3);
if (SumFixedPct == 100)
{
if (!bCapped)
{
var SumExclude = 0;
for (var i=1; i<=lNumMem; i++)
{
if (CapArr[i] > 0 && RecSplitArr[i] == CapArr[i])
{
ExcludeArr[i] = RecSplitArr[i];
SumExclude += ExcludeArr[i];
RecSplitArr[i] = 0;
}
}
normalizeArray(RecSplitArr, 100 - SumExclude, g_numDecPlaces);
for (var i=1; i<=lNumMem; i++)
{
if (ExcludeArr[i] > 0)
{
RecSplitArr[i] = ExcludeArr[i];
}
}
}
normalizeArray(CalcFixArr, lPotSplit, g_numDecPlaces);
}
for (var i=1; i<=lNumMem; i++)
{
var sItem2 = GetSMIDBaseItemName(sSplit2, i, sType);
frm.elements[sItem2].value = idealToFixed(parseFloat(RecSplitArr[i]),g_numDecPlaces);
var sItem4 = GetSMIDBaseItemName(sCalcFix, i, sType);
frm.elements[sItem4].value = idealToFixed(parseFloat(CalcFixArr[i]),g_numDecPlaces);;
}
}
else
{
for (var i=1; i<=lNumMem; i++)
{
var sItem1 = GetSMIDBaseItemName(sSplit1, i, sType);
var sItem2 = GetSMIDBaseItemName(sSplit2, i, sType);
frm.elements[sItem2].value = frm.elements[sItem1].value;
var sItem4 = GetSMIDBaseItemName(sCalcFix, i, sType);
frm.elements[sItem4].value = frm.elements[sItem1].value;
} 
}
Sum(frm, sSplit2, sTotal, sNumMem.value, sType); 
} 
}
function getAllUWAmt(frm)
{
var lNumSyndMem = new Number(frm.hidAllSyndMemCount.value.replace(/(\,)/g, ""));
var lNumSyndMgr = new Number(frm.hidMgrSyndMemCount.value.replace(/(\,)/g, ""));
var lUWFeeAmt = new Number(frm.hidUWFeeAmt.value.replace(/(\,)/g, ""));
for(var i=1; i<=lNumSyndMem; i++)
{
if (!isSyndicateManager(g_arrSMId[i]))
{
var sCommit = GetSMIDBaseItemName("hidCommit", i, "all");
var lCommit = new Number(frm.elements[sCommit].value.replace(/(\,)/g, ""));
var sSplit = GetSMIDBaseItemName("iUWFeeTotal", i, "all");
var rawSplit = Math.round(lCommit * lUWFeeAmt);
if (isNaN(rawSplit))
rawSplit = 0;
frm.elements[sSplit].value = formatAmountString(rawSplit.toString());
}
}
if(frm.radRevCalc[0].checked)
{
for(var i=1; i<=lNumSyndMgr; i++)
{
var sCommit = GetSMIDBaseItemName("hidCommit", i, "mgr");
var lCommit = new Number(frm.elements[sCommit].value.replace(/(\,)/g, ""));
var sSplit = GetSMIDBaseItemName("iUWFeeTotal", i, "mgr");
var rawSplit = Math.round(lCommit * lUWFeeAmt);
if (isNaN(rawSplit))
rawSplit = 0;
frm.elements[sSplit].value = formatAmountString(rawSplit.toString()); 
}
} 
else
{
var lUWFeeSum = new Number(frm.hidUWFeeSum.value.replace(/(\,)/g, ""));
for(var i=1; i<=lNumSyndMgr; i++)
{
var sCommit = GetSMIDBaseItemName("uwFeePct", i, "mgr");
var lCommitPct = new Number(frm.elements[sCommit].value.replace(/(\,)/g, ""));
var sSplit = GetSMIDBaseItemName("iUWFeeTotal", i, "mgr");
var rawSplit = Math.round(lCommitPct * 0.01 * lUWFeeSum);
if (isNaN(rawSplit))
rawSplit = 0;
frm.elements[sSplit].value = formatAmountString(rawSplit.toString()); 
} 
} 
SumInt(frm, "iUWFeeTotal", frm.curSumAntiUW, frm.hidAllSyndMemCount.value, "all");
}
function applyCapLimit(frm)
{
if(frm.PotSplitMthd[0].checked)
{
if(frm.PotSplitOptMgr[0].checked)
{
applyPotSplit(frm, 'M', 'E'); 
}
else if(frm.PotSplitOptMgr[1].checked)
{
applyPotSplit(frm, 'M', 'M'); 
}
else
{
applyPotSplit(frm, 'M', 'O');
}
}
else
{
if(frm.PotSplitOpt[0].checked)
{
applyPotSplit(frm, 'A', 'E'); 
}
else
{
applyPotSplit(frm, 'A', 'O');
}
} 
}
function warningPopUp(frm)
{
var retVal = true;
{
if (!(frm.curPotSplitPct.value == 0 || frm.curPotSplitPct.value == ''))
{
var bErrorFlg = true;
var lLength = 0;
var sParse = "";
var sType;
if(frm.hidPotMthd.value == 'M')
{
lLength = frm.hidMgrSyndMemCount.value; 
sParse = "curSplitMgr";
sType = "mgr";
}
else
{
lLength = frm.hidAllSyndMemCount.value; 
sParse = "curSplit";
sType = "all";
} 
for (var i=1; i<=lLength; i++)
{
var sItem = GetSMIDBaseItemName(sParse, i, sType);
var lSplit = new Number(frm.elements[sItem].value.replace(/(\,)/g, ""));
if(lSplit > 0)
{
bErrorFlg = false;
i = lLength;
}
}
if(bErrorFlg)
{
return confirm("You have not entered Recommended Pot Split Percentages, click OK to continue or Cancel to return and enter these values."); 
} 
}
}
return retVal;
}
function copyValues(frm, sSource, sDest)
{
var lLength = new Number(frm.hidAllSyndMemCount.value.replace(/(\,)/g, ""));
var sType = "all";
for(var i=1; i<=lLength; i++)
{
var sFldNm = GetSMIDBaseItemName(sSource, i, sType);
var sFldNm2 = GetSMIDBaseItemName(sDest, i, sType);
var lSrcAmt = new Number(frm.elements[sFldNm].value.replace(/(\,)/g, ""));
if(lSrcAmt > 0)
frm.elements[sFldNm2].value = frm.elements[sFldNm].value;
}
}
function SumRevenuesTotalForEachSyndMem(frm)
{
var lLength = new Number(frm.hidAllSyndMemCount.value.replace(/(\,)/g, ""));
var sType = "all";
for(var i=1; i<=lLength; i++)
{
var sFldMgmtAmt = GetSMIDBaseItemName("brkMgmtAmt", i, sType);
var sFldUWAmt = GetSMIDBaseItemName("brkUWAmt", i, sType);
var sFldSCAmt = GetSMIDBaseItemName("brkSCAmt", i, sType);
var sFldStepupAmt = 0;
if (document.frmMain.hidCIBCFunctionality.value == 1)
{
sFldStepupAmt = GetSMIDBaseItemName("brkStepupAmt", i, sType);
}
var sFldTotalAmt = GetSMIDBaseItemName("brkTotalAmt", i, sType);
var lMgmtAmt = new Number(frm.elements[sFldMgmtAmt].value.replace(/(\,)/g, ""));
var lStepupAmt = new Number(frm.elements[sFldStepupAmt].value.replace(/(\,)/g, ""));
var lUWAmt = new Number(frm.elements[sFldUWAmt].value.replace(/(\,)/g, ""));
var lSCAmt = new Number(frm.elements[sFldSCAmt].value.replace(/(\,)/g, ""));
var lTotal = lStepupAmt + lMgmtAmt + lUWAmt + lSCAmt;
frm.elements[sFldTotalAmt].value = formatAmountString(lTotal.toString());
}
}
function TransferGCData(frm, gcFrm)
{
var lLength = new Number(frm.hidGCMemCount.value.replace(/(\,)/g, ""));
var sName = "curGCFeeMgr";
var sType = "gc";
for(var i=1; i<=lLength; i++)
{
var sItem = GetSMIDBaseItemName(sName, i, sType);
frm.elements[sItem].value = new Number(gcFrm.elements[sItem].value.replace(/(\,)/g, ""));
}
}
function initializeSplitFromRecSplit(frm, type)
{
var lJumpBall = new Number(frm.curJumpBallPct.value.replace(/(\,)/g, ""));
if (type == 'A')
{
for (var i=1; i<=frm.hidAllSyndMemCount.value; i++)
{
var sItem = GetSMIDBaseItemName('curSplit', i, 'all');
var sItem2 = GetSMIDBaseItemName('Split', i, 'all');
var recSplitPct = parseFloat(frm.elements[sItem].value);
var splitPct;
if (lJumpBall > 0)
{
if (i == 1)
{
splitPct = (recSplitPct - lJumpBall) / (100 - lJumpBall) * 100;
}
else
{
splitPct = recSplitPct / (100 - lJumpBall) * 100;
}
}
else
{
splitPct = recSplitPct;
}
frm.elements[sItem2].value = idealToFixed(splitPct, g_numDecPlaces);
}
}
else if (type == 'M')
{
for (var i=1; i<=frm.hidMgrSyndMemCount.value; i++)
{
var sItem = GetSMIDBaseItemName('curSplitMgr', i, 'mgr');
var sItem2 = GetSMIDBaseItemName('SplitMgr', i, 'mgr');
var recSplitPct = parseFloat(frm.elements[sItem].value);
var splitPct;
if (lJumpBall > 0)
{
if (i == 1)
{
splitPct = (recSplitPct - lJumpBall) / (100 - lJumpBall) * 100;
}
else
{
splitPct = recSplitPct / (100 - lJumpBall) * 100;
}
}
else
{
splitPct = recSplitPct;
}
frm.elements[sItem2].value = idealToFixed(splitPct, g_numDecPlaces);
}
}	
}
function enableSplitFields(frm, type)
{
if (type == 'A')
{
for (var i=1; i<=frm.hidAllSyndMemCount.value; i++)
{
var sItem = GetSMIDBaseItemName('Split', i, "all");
frm.elements[sItem].disabled = false;
}
}
else if (type == 'M')
{
for (var i=1; i<=frm.hidMgrSyndMemCount.value; i++)
{
var sItem = GetSMIDBaseItemName('SplitMgr', i, "mgr");
frm.elements[sItem].disabled = false;
}
}	
}
function disableSplitFields(frm, type)
{
if (type == 'A')
{
for (var i=1; i<=frm.hidAllSyndMemCount.value; i++)
{
var sItem = GetSMIDBaseItemName('Split', i, "all");
frm.elements[sItem].disabled = true;
}
}
else if (type == 'M')
{
for (var i=1; i<=frm.hidMgrSyndMemCount.value; i++)
{
var sItem = GetSMIDBaseItemName('SplitMgr', i, "mgr");
frm.elements[sItem].disabled = true;
}
}	
}
function setTotalDSP()
{
var frm = document.frmMain;
var total = getNum(frm.iTrnOfferPx.value) + getNum(frm.iTrnDelvyLessSellingConces.value) + getNum(frm.iTrnLessSellingConces.value) + getNum(frm.iTrnLessGrossSpd.value) + getNum(frm.iTrnLessValue.value);
frm.TotalDSP.value = total;
formatAmount(frm.TotalDSP);	
}
function getNum(src)
{
var result = new Number(src.replace(/(\,)/g, ""));
if (isNaN(result))
result = 0;
return result;
}
function onChangeTrnDSP()
{
setTotalDSP();
setDSPPosition();
}
function onChangeAllSyndMemOfferPx()
{
for (var i=0; i<arrDSPSyndMemId.length; i++)
{
onChangeSyndMemOfferPx(arrDSPSyndMemId[i], false);
}
setTotalOfferPxDSP();
}
function onChangeSyndMemOfferPx(sm_id, usePercent)
{
var frm = document.frmMain;
var trnOfferPx = getNum(document.frmMain.iTrnOfferPx.value);
if (usePercent)
{
frm.elements["iOfferPxCash" + sm_id].value = idealToFixed((trnOfferPx == 0 ? "" : getNum(frm.elements["fltOfferPxCashPct" + sm_id].value) / 100 * trnOfferPx), 0);
formatAmount(frm.elements["iOfferPxCash" + sm_id]);
}
else
{
frm.elements["fltOfferPxCashPct" + sm_id].value = idealToFixed((trnOfferPx == 0 ? "" : getNum(frm.elements["iOfferPxCash" + sm_id].value) / trnOfferPx * 100), 6);
formatFixedDecimalAmount(frm.elements["fltOfferPxCashPct" + sm_id],6);
}
setTotalOfferPxDSP();
}
function setTotalOfferPxDSP()
{
var frm = document.frmMain;
var trnOfferPx = getNum(document.frmMain.iTrnOfferPx.value);
if (trnOfferPx == 0)
{
frm.TotalOfferPxPctDSP.value = "";
return;
}	
var total = 0;
for (var i=0; i<arrDSPSyndMemId.length; i++)
{
total += getNum(frm.elements["iOfferPxCash" + arrDSPSyndMemId[i]].value);
}	
frm.TotalOfferPxDSP.value = idealToFixed(total, 0);
formatAmount(frm.TotalOfferPxDSP);
frm.TotalOfferPxPctDSP.value = idealToFixed(getNum(frm.TotalOfferPxDSP.value) / getNum(trnOfferPx.toString()) * 100, 6);
formatFixedDecimalAmount(frm.TotalOfferPxPctDSP, 6);
}
function setDSPPosition()
{
var frm = document.frmMain;
var DSPTotal = getNum(document.frmMain.TotalDSP.value);
var targetResrv = getNum(document.frmMain.hidTargetResrv.value);
var position = idealToFixed(targetResrv - DSPTotal, 0);
frm.DSPPosition.value = position;
formatAmount(frm.DSPPosition);
if (position > 0)
{
frm.DSPPosition.style.color = "green";
}
else if (position < 0)
{
frm.DSPPosition.style.color = "red";
}	
else if (position == 0)
{
frm.DSPPosition.style.color = "black";
}	
}
function setDSPSyndMemTotal(sm_id)
{
var frm = document.frmMain;
var total = getNum(frm.elements["iOfferPx" + sm_id].value) + getNum(frm.elements["iDelvyLessSellingConces" + sm_id].value) + getNum(frm.elements["iLessSellingConces" + sm_id].value) + getNum(frm.elements["iLessGrossSpd" + sm_id].value) + getNum(frm.elements["iLessValue" + sm_id].value); 
frm.elements["TotalSyndMemDSP" + sm_id].value = idealToFixed(total.toString(), 0);
formatAmount(frm.elements["TotalSyndMemDSP" + sm_id]);
}
function setDSPSyndMemGrandTotal()
{
var frm = document.frmMain;
var grandTotal = 0;
for (var i=0; i<arrDSPSyndMemId.length; i++)
{
grandTotal += getNum(frm.elements["TotalSyndMemDSP" + arrDSPSyndMemId[i]].value);
}
frm.GrandTotalSyndMemDSP.value = idealToFixed(grandTotal.toString(), 0);
formatAmount(frm.GrandTotalSyndMemDSP);
}
function setDSPSyndMemTotalByCol(colName)
{
var frm = document.frmMain;
var total = 0;
for (var i=0; i<arrDSPSyndMemId.length; i++)
{
total += getNum(frm.elements["i" + colName + arrDSPSyndMemId[i]].value);
}
var totalColName = colName + "Total";
frm.elements[totalColName].value = idealToFixed(total.toString(), 0);
formatAmount(frm.elements[totalColName]);
}
function onChangeSyndMemDSP(colName, sm_id)
{
setDSPSyndMemTotalByCol(colName);
setDSPSyndMemTotal(sm_id);
setDSPSyndMemGrandTotal();
setPositionSyndMemDSP();
}
function setPositionSyndMemDSP()
{
var frm = document.frmMain;
var DSPTotal = getNum(document.frmMain.GrandTotalSyndMemDSP.value);
var targetResrv = getNum(document.frmMain.hidTargetResrv.value);
var position = idealToFixed(targetResrv - DSPTotal, 0);
frm.PositionSyndMemDSP.value = position;
formatAmount(frm.PositionSyndMemDSP);
if (position > 0)
{
frm.PositionSyndMemDSP.style.color = "green";
}
else if (position < 0)
{
frm.PositionSyndMemDSP.style.color = "red";
}	
else if (position == 0)
{
frm.PositionSyndMemDSP.style.color = "black";
}
}
function onDSPComment(sm_id)
{
openGeneralPopup("tranche_economics_popup.asp?hidSmId=" + sm_id, "", "width=600, height=400, scrollbars=0");
}
function isDSP()
{
return (document.frmMain.hidIsDSP.value == 'true');
}
function roundDecimals( sValue, len )
{
var result1 = sValue * Math.pow(10, len);
var result2 = Math.round(result1);
var result3 = result2 / Math.pow(10, len);
return result3;
}
function openCEFMFCalcPopup()
{
var frm = document.frmMain;
openGeneralPopup("tranche_economics_cef_mgmtfee_calc_popup.asp?hidTrancheId=" + frm.selTranche.value, "", "width=600, height=400, scrollbars=1, resizable=1");
}
function UncheckCEFMFCalc(frm)
{
if (document.all("cbUseCEFMFCalc"))
{
if(frm.cbUseCEFMFCalc.checked)
frm.cbUseCEFMFCalc.checked = false;
}
}
function openIntDistribution(econId, smId)
{
var frm = document.frmMain;
var sUrl = "/aspx/UI/TrancheEconomics/InternalDistribution.aspx?trn_id=" + frm.selTranche.value;
sUrl = sUrl + "&fee_id=" + econId + "&sm_id=" + smId;
openGeneralPopup(sUrl, "", "width=670, height=520, scrollbars=1, resizable=1");
}
