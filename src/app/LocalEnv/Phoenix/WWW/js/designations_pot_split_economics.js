<!-- 
function onPageLoad()
{
if(document.frmMain.hidHardPotInd.value == 'True' || document.frmMain.hidHardPotInd.value == '')
{
showHideArea(document.frmMain.hidCurrPotMthd.value);
if(document.frmMain.hidCurrPotMthd.value != ''){
Sum(document.frmMain, 'curSplit', document.frmMain.curSumSplit, document.frmMain.hidAllSyndMemCount.value);
Sum(document.frmMain, 'curMgmtFeeMgr', document.frmMain.curSumMgmt, document.frmMain.hidMgrSyndMemCount.value);
Sum(document.frmMain, 'curSplitMgr', document.frmMain.curSumSplitMgr, document.frmMain.hidMgrSyndMemCount.value);
}	
} 
}
function CheckConditionallyRequiredFields( frm, arrFieldsInError )
{
var arrMoreErrors = new Array();
var count = 0;
if (frm.curPotSplitPct.value > 100 || frm.curPotSplitPct.value < 0 || frm.curJumpBallPct.value > 100 || frm.curJumpBallPct.value < 0){
var arrError = FieldErrorInfo("curPotSplitPct", 'The Pot split value is invalid.', "", "curPotSplitPct", "Pot Split");
arrMoreErrors[count] = arrError;	
count++;
}
frm.hidPotMthd.value = getPotDistr(frm.PotSplitMthd);
if(frm.hidPotMthd.value == 'M')
{	
var lLength = frm.hidMgrSyndMemCount.value;
for (var i=1; i<=lLength; i++)
{
var sMgrItem = "curMgmtFeeMgr" + i.toString(); 
if(frm.elements[sMgrItem].value != "")
{ 
if (frm.curSumMgmt.value > 100){
var arrError = FieldErrorInfo("curMgmtFeeMgr1", 'The Manager Fee percentages are greater than 100%.', "", "curMgmtFeeMgr1", "Manager Fee");
arrMoreErrors[count] = arrError;	
count++;
}
i = lLength;
}
var sSplitItem = "curSplitMgr" + i.toString();
if(frm.elements[sSplitItem].value != "")
{
if (frm.curSumSplitMgr.value > 100){
var arrError = FieldErrorInfo("curSplitMgr1", 'The Split percentages are greater than 100%.', "", "curSplitMgr1", "Split");
arrMoreErrors[count] = arrError;	
count++;
}
i = lLength; 
} 
}
}	
else
{
var lLength = frm.hidAllSyndMemCount.value;
for (var i=1; i<=lLength; i++)
{
var sSplitItem = "curSplit" + i.toString(); 
if(frm.elements[sSplitItem].value != "")
{	
if (frm.curSumSplit.value > 100){
var arrError = FieldErrorInfo("curSplit1", 'The Split percentages are greater than 100%.', "", "curSplit1", "Split");
arrMoreErrors[count] = arrError;	
count++;
}
i = lLength; 
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
frm.action = "/asp/util_submit_action.asp";
frm.hidTrancheId.value = getTrnID(frm);
if(frm.hidPotMthd.value == 'M')
{
frm.hidPotOpt.value = getPotDistr(frm.PotSplitOptMgr);
zeroInputs(frm, "curMgmtFeeMgr", document.frmMain.hidMgrSyndMemCount.value); 
zeroInputs(frm, "curSplitMgr", document.frmMain.hidMgrSyndMemCount.value); 
frm.hidMgmtFeeValues.value = gatherSMValues(frm, "curMgmtFeeMgr", document.frmMain.hidAllSyndMemCount.value);
frm.hidSplitValues.value = gatherSMValues(frm, "curSplitMgr", document.frmMain.hidAllSyndMemCount.value);
frm.hidCapLimitValues.value = gatherSMValues(frm, "curCapLimitMgr", document.frmMain.hidAllSyndMemCount.value);
frm.hidSyndMemIDValues.value = gatherSMValues(frm, "hidSMID", document.frmMain.hidAllSyndMemCount.value);
frm.hidEqualEconValues.value = gatherEqualEcon(frm, "chkEqualEconMgr", document.frmMain.hidAllSyndMemCount.value);
}
else
{
frm.hidPotOpt.value = getPotDistr(frm.PotSplitOpt);
frm.hidMgmtFeeValues.value = createZeroString(frm, document.frmMain.hidAllSyndMemCount.value);
zeroInputs(frm, "curSplit", document.frmMain.hidAllSyndMemCount.value); 
frm.hidSplitValues.value = gatherSMValues(frm, "curSplit", document.frmMain.hidAllSyndMemCount.value);
frm.hidCapLimitValues.value = gatherSMValues(frm, "curCapLimit", document.frmMain.hidAllSyndMemCount.value);
frm.hidSyndMemIDValues.value = gatherSMValues(frm, "hidSMID", document.frmMain.hidAllSyndMemCount.value); 
frm.hidEqualEconValues.value = createZeroString(frm, document.frmMain.hidAllSyndMemCount.value);
}
frm.hidAction.value = "Update";
frm.submit(); 
}
break;
case "reverttosaved" :
window.location.reload();
break;
case "cancel" :
frm.hidTrancheId.value = getTrnID(frm); 
frm.action = "/asp/designations_pot_split_economics_view.asp";
frm.submit();
break;
}
}
function zeroInputs(frm, sParse, iMemberCount)
{
for (var i=1; i<=iMemberCount; i++)
{
var sItem = sParse + i.toString(); 
if(frm.elements[sItem].value == "")
{ 
frm.elements[sItem].value = 0;
}
}
}
function createZeroString(frm, iMemberCount)
{
var sList = "";
for (var i=1; i<=iMemberCount; i++)
{
if(i==1){
sList = "0";
}
else{
sList += "," + "0";
}	
}
return sList;
}
function loadTranche(frm)
{
var selectValue = getTrnID(frm);
window.location = "designations_pot_split_economics.asp?TrancheId="+selectValue+"";
}
function showHideArea(memberFlag){
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
function getTrnID(frm)
{
var selectID = frm.selTranche.selectedIndex;
var selectValue = frm.selTranche.options[selectID].value;
return selectValue;
}
function gatherSMValues(frm, sParse, iMemberCount)
{
var sList;
sList="";
for (var i=1; i<=iMemberCount; i++)
{
var sItem = sParse + i.toString();
if(frm.elements[sItem]){
if (i==1){
sList += frm.elements[sItem].value;
}
else{
sList += "," + frm.elements[sItem].value;	
}
}
else{
sList += "," + "0"; 
}	
}
return sList;
}
function gatherEqualEcon(frm, sParse, iMemberCount)
{
var sList;
sList="0";
for (var i=2; i<=iMemberCount; i++)
{
var sItem = sParse + i.toString();
if(frm.elements[sItem]){ 
if (frm.elements[sItem].checked == true){
sList += "," + "1"; 
}
else{
sList += "," + "0"; 
}
}
else{
sList += "," + "0"; 
} 
} 
return sList;
}
function calculatePotSplit(frm, potFlag)
{
if(potFlag == 'P')
{
var pot = new Number(frm.curPotSplitPct.value.replace(/(\,)/g, ""));
var jump = 100 - pot;
frm.curJumpBallPct.value = jump.toFixed(2);
}
else
{
var jump = new Number(frm.curJumpBallPct.value.replace(/(\,)/g, ""));
var pot = 100 - jump;
frm.curPotSplitPct.value = pot.toFixed(2);	
}	
}
function Sum(frm, sParse, sumVal, iMemberCount)
{
var sList;
sList = 0;
for (var i=1; i<=iMemberCount; i++)
{
var sItem = sParse + i.toString();
var iFormVal = new Number(frm.elements[sItem].value.replace(/(\,)/g, ""));
sList += iFormVal;
}
sumVal.value = sList.toFixed(2);
}
function equalSplit(frm, sParse, sumVal, iMemberCount)
{
var lLength = new Number(iMemberCount);
var eqAmt = 100/lLength;
var rndEqAmt = eqAmt.toFixed(2);
var balance = 100;
for (var i=1; i<=lLength; i++)
{
var sItem = sParse + i.toString(); 
if( i==lLength)
{
if(balance < rndEqAmt)
{
frm.elements[sItem].value = balance; 
}
else
{
var sFirstItem = sParse + "1";
frm.elements[sItem].value = rndEqAmt;
frm.elements[sFirstItem].value = balance;
}	
}	
else
{
frm.elements[sItem].value = rndEqAmt;	
balance = balance - rndEqAmt;
balance = balance.toFixed(2);
}
}	
Sum(frm, sParse, sumVal, iMemberCount);
}
function mgrFee(frm, sMgrFeeParse, sSplitParse, sumSplitVal, sumMgrFeeVal, iMemberCount)
{
for (var i=1; i<=iMemberCount; i++)
{
var sMgrItem = sMgrFeeParse + i.toString(); 
var sSplitItem = sSplitParse + i.toString();
frm.elements[sSplitItem].value = frm.elements[sMgrItem].value;	
}	
sumSplitVal.value = sumMgrFeeVal.value;
}
function changePotOpt(radOpt, position)
{
radOpt[position].checked = true;
}
function applyEqualEcon(type, position)
{
if(type == 'all'){
var sEqEcon = "chkEqualEcon" + position.toString();
if (document.frmMain.elements[sEqEcon].checked == true){
var sSplit = "curSplit" + position.toString();
var sCapLimit = "curCapLimit" + position.toString();
document.frmMain.elements[sSplit].value = document.frmMain.curSplit1.value;
document.frmMain.elements[sCapLimit].value = document.frmMain.curCapLimit1.value;
Sum(document.frmMain, "curSplit", document.frmMain.curSumSplit, document.frmMain.hidAllSyndMemCount.value)
}
}
else
{
var sEqEcon = "chkEqualEconMgr" + position.toString();
if (document.frmMain.elements[sEqEcon].checked == true){
var sMgrFee = "curMgmtFeeMgr" + position.toString();
var sSplit = "curSplitMgr" + position.toString();
var sCapLimit = "curCapLimitMgr" + position.toString();
document.frmMain.elements[sMgrFee].value = document.frmMain.curMgmtFeeMgr1.value;
document.frmMain.elements[sSplit].value = document.frmMain.curSplitMgr1.value;
document.frmMain.elements[sCapLimit].value = document.frmMain.curCapLimitMgr1.value;
changePotOpt(document.frmMain.PotSplitOptMgr, document.frmMain.PotSplitOptMgr.length - 1);
Sum(document.frmMain, "curMgmtFeeMgr", document.frmMain.curSumMgmt, document.frmMain.hidMgrSyndMemCount.value)
Sum(document.frmMain, "curSplitMgr", document.frmMain.curSumSplitMgr, document.frmMain.hidMgrSyndMemCount.value)
document.frmMain.elements[sMgrFee].disabled = true;
document.frmMain.elements[sSplit].disabled = true;
document.frmMain.elements[sCapLimit].disabled = true;
}
}	
}
function uncheckEqEcon(position)
{
var sEqEcon = "chkEqualEconMgr" + position.toString();
if (document.frmMain.elements[sEqEcon].checked == false)
{
var sMgrFee = "curMgmtFeeMgr" + position.toString();
var sSplit = "curSplitMgr" + position.toString();
var sCapLimit = "curCapLimitMgr" + position.toString();
document.frmMain.elements[sMgrFee].disabled = false;
document.frmMain.elements[sSplit].disabled = false;
document.frmMain.elements[sCapLimit].disabled = false;
}	
}
function checkInitialState(frm, type)
{	
if(type == 'all')
{
if(!(frm.PotSplitOpt.value)){
changePotOpt(frm.PotSplitOpt, 0); 
equalSplit(frm, 'curSplit', frm.curSumSplit, frm.hidAllSyndMemCount.value);
}
}
else
{
if(!(frm.PotSplitOptMgr.value)){
changePotOpt(frm.PotSplitOptMgr, 0); 
equalSplit(frm, 'curSplitMgr', frm.curSumSplitMgr, frm.hidMgrSyndMemCount.value);	
}
}
}
function maintainEqEcon(frm, field, position, iMemberCount)
{	
if(position == 1)
{
var sLeadMgrItem = field + position.toString();
for (var i=2; i<=iMemberCount; i++)
{
var sItem = "chkEqualEconMgr" + i.toString();
if (frm.elements[sItem].checked == true){
var sSyndMemItem = field + i.toString();
frm.elements[sSyndMemItem].value = frm.elements[sLeadMgrItem].value;
}
} 
}
}
function maintainMgrFeeStruct(frm, position)
{	
if(getPotDistr(frm.PotSplitOptMgr) == 'M')
{
var sMgrFeeItem = "curMgmtFeeMgr" + position.toString();
var sSplitItem = "curSplitMgr" + position.toString();
frm.elements[sSplitItem].value = frm.elements[sMgrFeeItem].value;
Sum(document.frmMain, "curSplitMgr", document.frmMain.curSumSplitMgr, document.frmMain.hidMgrSyndMemCount.value) 
}
}
function changeEqualEcon(frm, position)
{	
if(position != 1){
var sItem = "chkEqualEconMgr" + position.toString();
if (frm.elements[sItem].checked == true){
frm.elements[sItem].checked = false; 
}
}	
}
