<!-- 
function onPageLoad()
{
if (typeof(document.frmMain.hidNumFields) != "undefined" && typeof(document.all.divScroll) != "undefined")
{
var nRows = document.frmMain.hidNumSyndMem.value;
var nHeight;
if (typeof(nRows) == "undefined")
nRows = 1;
if (nRows < 12)
return;
nHeight = 18 * nRows;
if (nHeight < 400) nHeight = 400;
if (nHeight > 600) nHeight = 600;
document.body.style.scrollbarArrowColor="#008000";
document.body.style.scrollbarDarkShadowColor="#00FFFF";
document.all.divScroll.style.height=nHeight;
document.all.divScroll.style.width=900;
}
ResetAllDeclines();
}
var gMsgBGColor;
var gTrancheSize;
function ToggleSection(strElem, sTrancheSize, sUnderwrittenSize) 
{
var strWhichEl = eval(strElem);
var strWhichIm = eval("document.images['ImEx']");
if (strWhichEl.style.display == 'none') {
strWhichEl.style.display = 'block';
strWhichIm.src = "../images/collapse.gif";
if (typeof(document.frmMain.hidMessage3) != "undefined")
{
document.all.divMessage.style.backgroundColor = gMsgBGColor;
document.all.divMessage.innerText = "";
}
else if (typeof(document.frmMain.hidMessage) != "undefined")
{
document.all.divMessage.style.backgroundColor = gMsgBGColor;
document.all.divMessage.innerText = "";
}
else if (typeof(document.frmMain.hidMessage2) != "undefined")
{
document.all.divMessage.style.backgroundColor = gMsgBGColor;
document.all.divMessage.innerText = "";
}
if (typeof(document.all.divMessageC) != "undefined")
{
document.all.divMessageC.innerText = "";
}
}
else {
strWhichEl.style.display = 'none';
strWhichIm.src = "../images/expand.gif";
if (typeof(document.frmMain.hidMessage3) != "undefined")
{
gMsgBGColor = document.all.divMessage.style.backgroundColor;
document.all.divMessage.style.backgroundColor = "#FFFFFF";
document.all.divMessage.style.color = "red";
document.all.divMessage.innerText = document.frmMain.hidMessage3.value;
}
else if (typeof(document.frmMain.hidMessage) != "undefined")
{
gMsgBGColor = document.all.divMessage.style.backgroundColor;
document.all.divMessage.style.backgroundColor = "#FFFFFF";
document.all.divMessage.style.color = "red";
document.all.divMessage.innerText = document.frmMain.hidMessage.value;
}
else if (typeof(document.frmMain.hidMessage2) != "undefined")
{
gMsgBGColor = document.all.divMessage.style.backgroundColor;
document.all.divMessage.style.backgroundColor = "#FFFFFF";
document.all.divMessage.style.color = "red";
document.all.divMessage.innerText = document.frmMain.hidMessage2.value;
}
if (typeof(document.frmMain.Underwritten) != "undefined" && typeof(document.all.divMessageC) != "undefined")
{
document.all.divMessageC.innerText = sTrancheSize + ": " + document.all.divTrnSize.innerText + " " +
sUnderwrittenSize + ": " + document.frmMain.Underwritten.value;
gTrancheSize = document.all.divTrnSize.innerText;
}
}
}
function loadTranche(frm, linkFlg)
{
var selectID = frm.selTranche.selectedIndex;
var selectValue = frm.selTranche.options[selectID].value;
if (frm.hidPrinter.value == 1)
window.location = "syndpart_worksheet.asp?Printer=1&TrancheId="+selectValue+"";
else
window.location = "syndpart_worksheet.asp?TrancheId="+selectValue+"";
}
function CheckConditionallyRequiredFields( frm, arrFieldsInError )
{
var arrMoreErrors = new Array();
var count = 0;
if(frm.hidAction.value == "AddBatch")
{
if (frm.sName.value == '')
{
var arrErrors = FieldErrorInfo("", "", "", "sName", "Name Required");
arrMoreErrors[count] = arrErrors;
count++;
}
if (frm.sName.value.length > 64)
{
var arrErrors = FieldErrorInfo("", "", "", "sName", "Please do not enter more than 64 characters in the Name field");
arrMoreErrors[count] = arrErrors;
count++;
} 
}
else if(frm.hidAction.value == "Update" && frm.hidBracketInd.value == "1")
{
var lNumGroups;
if(frm.hidNumFields)
lNumGroups = frm.hidNumFields.value;
else
lNumGroups = 0;
var lSyndMemPlace = 1;
var lNumSyndMem = 0;
var error1Ind = false;
var error2Ind = false; 
for(var i=1; i<=lNumGroups; i++)
{
var sFldNm = "GroupUsed" + i.toString();
var lGroupId = new Number(frm.elements[sFldNm].value.replace(/(\,)/g, ""));
if(lGroupId > 0)
{
var sFldCount = lGroupId.toString() + "Count";
var lBracketMemCount = new Number(frm.elements[sFldCount].value.replace(/(\,)/g, "")); 
var lBracketEightID = new Number(frm.hidBracketEightID.value.replace(/(\,)/g, "")); 
var lSellingGroupID = new Number(frm.hidSellingGroupID.value.replace(/(\,)/g, "")); 
var lSellingAgentID = new Number(frm.hidSellingAgentID.value.replace(/(\,)/g, "")); 
var lSecondSellingID = new Number(frm.hidSecondSellingID.value.replace(/(\,)/g, "")); 
lNumSyndMem = lNumSyndMem + lBracketMemCount;
for(var j=lSyndMemPlace; j<=lNumSyndMem; j++)
{ 
if (typeof(frm.elements[sBrackNm])=="undefined")
continue;
var sBrackNm = "selBracket" + j.toString(); 
var lBracket = new Number(frm.elements[sBrackNm].value.replace(/(\,)/g, ""));
var sRoleNm = "selRole" + j.toString();
var lRole = new Number(frm.elements[sRoleNm].value.replace(/(\,)/g, ""));
if((lBracket-lBracketEightID) == 0)
{
if(lRole < lSellingGroupID)
{
if(error1Ind == false)
{ 
var arrErrors = FieldErrorInfo("", "A Member of the Selling Group Bracket must have Selling Group or Selling Agent as their role.", "", "", "");
arrMoreErrors[count] = arrErrors;
count++; 
error1Ind = true; 
}
} 
}
else if((lRole-lSellingGroupID)==0 || (lRole-lSellingAgentID) == 0 || (lRole-lSecondSellingID) == 0)
{
if(error2Ind == false)
{
var arrErrors = FieldErrorInfo("", "A Member with the role Selling Group, Selling Agent or Second Selling must also be in the Selling Group Bracket.", "", "", "");
arrMoreErrors[count] = arrErrors;
count++; 
error2Ind = true; 
}
}
} 
lSyndMemPlace = lSyndMemPlace + lBracketMemCount;
}
} 
}
return (arrMoreErrors);
} 
function submitPage( frm , action )
{
switch (action)
{
case "SaveChanges" :
break;
case "RevertToSaved" :
frm.reset();
break;
case "Cancel" :
frm.action = "/asp/_template.asp";
frm.submit();
break;
case "SaveChangesPopup" :
frm.hidAction.value = "UpdateDecline";
if(ValidateForm( frm ))
{
EnableAllAmount(frm);
assignDirtyFlag(frm);
frm.method = "POST"; 
frm.action = "util_submit_action.asp";
frm.submit(); 
}
break;
case "Add" :
case "SyndRevision" :
case "AddBatch" :
case "CopyToTranche" :
case "DeleteList" :
case "Printer":
case "Revert":
case "OrderBySortName":
case "ShowDeclines":
break; 
}
}
function addParticipant()
{
}
function changeSort(frm)
{
}
function checkChanges(frm)
{
var lNumGroups;
if(frm.hidNumFields)
lNumGroups = frm.hidNumFields.value;
else
lNumGroups = 0;
var lSyndMemPlace = 1;
var lNumSyndMem = 0;
for(var i=1; i<=lNumGroups; i++)
{
var sFldNm = "GroupUsed" + i.toString();
if(frm.elements[sFldNm].value > 0)
{
var lGroupId = frm.elements[sFldNm].value;
var sFldChgNm = lGroupId.toString() + "Chg";
var sFldNmChg = lGroupId.toString() + "MemChg";
if(typeof(frm.elements[sFldChgNm])!="undefined" && (frm.elements[sFldChgNm].value == 1 || frm.elements[sFldNmChg].value == 1))
{
return confirm("You have made changes to this page. Do you wish to not save and continue?");
}
}
} 
return true;
}
function assignDirtyFlag(frm)
{
var lNumGroups;
if(frm.hidNumFields)
lNumGroups = frm.hidNumFields.value;
else
lNumGroups = 0;
var lSyndMemPlace = 1;
var lNumSyndMem = 0;
var sPageType = frm.hidSyndPartPageType.value;
for(var i=1; i<=lNumGroups; i++)
{
var sFldNm = "GroupUsed" + i.toString();
if(frm.elements[sFldNm].value > 0 )
{
var lGroupId = frm.elements[sFldNm].value;
var sBrkFldNm = lGroupId.toString() + "Amt";
var sBrkFldNmOld = lGroupId.toString() + "OldAmt";
var sFldChgNm = lGroupId.toString() + "Chg";
if (typeof(frm.elements[sBrkFldNm]) != "undefined")
{
var lBracketAmt = new Number(frm.elements[sBrkFldNm].value.replace(/(\,)/g, ""));
var lBracketAmtOld = new Number(frm.elements[sBrkFldNmOld].value.replace(/(\,)/g, ""));
if((lBracketAmt-lBracketAmtOld) != 0 && typeof(frm.hidOAExercised) == "undefined")
{
frm.elements[sFldChgNm].value = 1;
} 
sBrkFldNm = lGroupId.toString() + "CalcType";
sBrkFldNmOld = lGroupId.toString() + "CalcTypeOld";
var lCalcType = new Number(frm.elements[sBrkFldNm].value.replace(/(\,)/g, ""));
var lCalcTypeOld = new Number(frm.elements[sBrkFldNmOld].value.replace(/(\,)/g, ""));
if((lCalcType-lCalcTypeOld) != 0)
{
frm.elements[sFldChgNm].value = 1;
}
}
var sFldNmChg = lGroupId.toString() + "MemChg";
var sFldCount = lGroupId.toString() + "Count";
if (typeof(frm.elements[sFldCount])=="undefined")
continue;
var lBracketMemCount = new Number(frm.elements[sFldCount].value.replace(/(\,)/g, "")); 
lNumSyndMem = lNumSyndMem + lBracketMemCount;
for(var j=lSyndMemPlace; j<=lNumSyndMem; j++)
{
var sDirty = "hidDirtyFlag" + j.toString();
var sGroup = "hidGroupChg" + j.toString();
var sInvite = "selInviteOld" + j.toString();
if (typeof(frm.elements[sInvite])=="undefined")
continue;
if(frm.elements[sInvite].value == "0")
frm.elements[sDirty].value == 1;
if(frm.elements[sDirty].value == "1" || frm.elements[sGroup].value == "1")
frm.elements[sFldNmChg].value = 1;
}
lSyndMemPlace = lSyndMemPlace + lBracketMemCount;
}
} 
}
function assignMemDirtyFlag(frm, lBracketId, lPosition)
{
j=lPosition 
var sDirty = "hidDirtyFlag" + j.toString();
frm.elements[sDirty].value = 0;
var sGroup = "hidGroupChg" + j.toString();
frm.elements[sGroup].value = 0;
var sFldNm = "iTxtAmount" + j.toString();
var sFldNmOld = "iTxtAmountOld" + j.toString();
var lMemAmt = new Number(frm.elements[sFldNm].value.replace(/(\,)/g, ""));
var lMemAmtOld = new Number(frm.elements[sFldNmOld].value.replace(/(\,)/g, ""));
if((lMemAmt-lMemAmtOld) != 0)
{
frm.elements[sDirty].value = 1; 
} 
if(frm.hidBracketInd.value == "1")
{
sFldNm = "selBracket" + j.toString();
sFldNmOld = "selBracketOld" + j.toString();
var lBracket = new Number(frm.elements[sFldNm].value.replace(/(\,)/g, ""));
var lBracketOld = new Number(frm.elements[sFldNmOld].value.replace(/(\,)/g, ""));
if((lBracket-lBracketOld) != 0)
{
frm.elements[sDirty].value = 1;
frm.elements[sGroup].value = 1;
}
}
sFldNm = "selRole" + j.toString();
sFldNmOld = "selRoleOld" + j.toString();
var lRole = new Number(frm.elements[sFldNm].value.replace(/(\,)/g, ""));
var lRoleOld = new Number(frm.elements[sFldNmOld].value.replace(/(\,)/g, "")); 
if((lRole-lRoleOld) != 0)
{
frm.elements[sDirty].value = 1;
if(frm.hidBracketInd.value == "0") { 
frm.elements[sGroup].value = 1; 
}
} 
sFldNm = "cbDelete" + j.toString(); 
if(frm.elements[sFldNm].checked == true){
frm.elements[sDirty].value = 1;
}
var lBracketEightID = new Number(frm.hidBracketEightID.value.replace(/(\,)/g, "")); 
if((lBracketId - lBracketEightID) != 0)
{
sFldNm = "selInvite" + j.toString();
sFldNmOld = "selInviteOld" + j.toString();
var lInvite = new Number(frm.elements[sFldNm].value.replace(/(\,)/g, ""));
var lInviteOld = new Number(frm.elements[sFldNmOld].value.replace(/(\,)/g, ""));
if((lInvite-lInviteOld) != 0)
{
frm.elements[sDirty].value = 1;
} 
}
}
function assignMemDirtyFlag2(frm, lBracketId, lPosition)
{
assignMemDirtyFlag(frm, lBracketId, lPosition);
var sSelBracket = "selBracket" + lPosition.toString();
var sSelRole = "selRole" + lPosition.toString();
if (typeof(frm.elements[sSelBracket].options) != "undefined" && typeof(frm.elements[sSelRole].options) != "undefined")
{
var sVal = frm.elements[sSelBracket].options[frm.elements[sSelBracket].selectedIndex].text;
if (sVal == "Bracket 8 - Selling Group")
{
for (var i=0; i < frm.elements[sSelRole].options.length; i++)
{
if (frm.elements[sSelRole].options[i].text == "Selling Group")
{
frm.elements[sSelRole].selectedIndex = i;
frm.elements[sSelRole].disabled = 1;
frm.elements["hidSellGrpID"].value = frm.elements[sSelRole].options[i].value;
frm.elements["hidSellingGroupID"].value = frm.elements[sSelRole].options[i].value;
assignMemDirtyFlag(frm, frm.elements[sSelRole].options[i].value, lPosition);
}
}
}
else
{
frm.elements[sSelRole].disabled = 0;
}
}
}
function openComments(lSyndMemId, lPosition)
{
}
function getCommitmentPct(frm, lBracketId, iMemberPos)
{ 
var sCommitItem = "iTxtAmount" + iMemberPos.toString();
var sOldCommitItem = "iTxtAmountOld" + iMemberPos.toString();
var lTrnSize = frm.elements["hidTrnSize"].value;
if (lTrnSize <= 0)
{
alert("Need tranche size to enter commitment amounts");
frm.elements[sCommitItem].value = frm.elements[sOldCommitItem].value;
return;
} 
Sum(frm, lBracketId);
var sBracketRoleId = lBracketId.toString();
var sStartPos = sBracketRoleId + "StartPos";
var lStartPos = new Number(frm.elements[sStartPos].value.replace(/(\,)/g, ""));
var sMemCount = sBracketRoleId + "Count";
var lMemCount = new Number(frm.elements[sMemCount].value.replace(/(\,)/g, ""));
var sGrpTotal = sBracketRoleId + "Amt";
var lGrpSize = new Number(frm.elements[sGrpTotal].value.replace(/(\,)/g, ""));
lMemCount = lStartPos + lMemCount - 1; 
for(var i=lStartPos; i<=lMemCount; i++)
{
var sCommitItem = "iTxtAmount" + i.toString();
if (typeof(frm.elements[sCommitItem])=="undefined")
continue;
var lCommit = new Number(frm.elements[sCommitItem].value.replace(/(\,)/g, ""));
var sCommitPctItem = "grpPct" + i.toString();
var rawCommitPct = (lCommit/lGrpSize)*100;
frm.elements[sCommitPctItem].value = idealToFixed(rawCommitPct, 2); 
} 
SumUnderwritten(frm);	
assignMemDirtyFlag(frm, lBracketId, iMemberPos)	
}
function getCommitment(frm, lBracketId, iMemberPos)
{
var sCommitItem = "iTxtAmount" + iMemberPos.toString();
var sCommitPctItem = "grpPct" + iMemberPos.toString();
if(frm.elements[sCommitPctItem].value == "")
frm.elements[sCommitItem].value = "";
else
{	
var pctCommitPctVal = new Number(frm.elements[sCommitPctItem].value.replace(/(\,)/g, ""));
var sGrpTotal = lBracketId.toString() + "Amt";
var lGrpSize = new Number(frm.elements[sGrpTotal].value.replace(/(\,)/g, ""));
var rawCommitVal = Math.round(pctCommitPctVal * 0.01 *lGrpSize);
frm.elements[sCommitItem].value = formatAmountString(rawCommitVal.toString());
}	
assignMemDirtyFlag(frm, lBracketId, iMemberPos) 
}
function getBracketPct(frm, lBracketId, lTrnSize)
{
var sCommitItem = lBracketId.toString() + "Amt";
var sOldCommitItem = lBracketId.toString() + "OldAmt";
if (lTrnSize <= 0)
{
alert("Need tranche size to enter commitment amounts");
frm.elements[sCommitItem].value = frm.elements[sOldCommitItem].value
return;
} 
var sCommitItem = lBracketId.toString() + "Amt";
var sCommitPctItem = lBracketId.toString() + "TrnPct";
if(frm.elements[sCommitItem].value == "")
frm.elements[sCommitPctItem].value = "";
else
{
var iCommitVal = new Number(frm.elements[sCommitItem].value.replace(/(\,)/g, ""));
var lGrpSize = new Number(lTrnSize);
var rawCommitPct = (iCommitVal/lGrpSize)*100;
frm.elements[sCommitPctItem].value = idealToFixed(rawCommitPct,2);
}	
applySplit(frm, lBracketId, lTrnSize);
SumUnderwritten(frm);
}
function getBracket(frm, lBracketId, lTrnSize)
{
var sCommitPctItem = lBracketId.toString() + "TrnPct";
if (lTrnSize <= 0)
{
alert("Need tranche size to enter commitment amounts");
frm.elements[sCommitPctItem].value = "";
return;
} 
var sCommitItem = lBracketId.toString() + "Amt";
if(frm.elements[sCommitPctItem].value == "")
frm.elements[sCommitItem].value = "";
else
{	
var pctCommitPctVal = new Number(frm.elements[sCommitPctItem].value.replace(/(\,)/g, ""));
var lGrpSize = new Number(lTrnSize);
var rawCommitVal = Math.round(pctCommitPctVal * 0.01 *lGrpSize);
frm.elements[sCommitItem].value = formatAmountString(rawCommitVal.toString());
}	
applySplit(frm, lBracketId, lTrnSize);
SumUnderwritten(frm); 
}
function applySplit(frm, lBracketRoleId, lTrnSize)
{
var sBracketRoleId = lBracketRoleId.toString();
var sStartPos = sBracketRoleId + "StartPos";
var lStartPos = new Number(frm.elements[sStartPos].value.replace(/(\,)/g, ""));
var sMemCount = sBracketRoleId + "Count";
var lMemCount = new Number(frm.elements[sMemCount].value.replace(/(\,)/g, ""));
var sGroupAmt = sBracketRoleId + "Amt";
var lGroupAmt = new Number(frm.elements[sGroupAmt].value.replace(/(\,)/g, ""));
var lActualMemCount = lMemCount - GetDeclineCount(frm, lBracketRoleId);
if(lGroupAmt > 0){
if(frm.selCalcType.value == "1"){
var sBrackCalc = sBracketRoleId + "CalcType";
frm.elements[sBrackCalc].value = frm.selCalcType.value;
var lSplitAmt = Math.floor(lGroupAmt/lActualMemCount);
var lNewGroupAmt = Math.floor(lSplitAmt * lActualMemCount);
frm.elements[sGroupAmt].value = formatAmountString(lNewGroupAmt.toString());
var rawCommitPct = (lSplitAmt/lGroupAmt)*100;
lMemCount = lStartPos + lMemCount - 1; 
for(var i=lStartPos; i<=lMemCount; i++)
{ 
var sCommitItem = "iTxtAmount" + i.toString();
if(!IsDeclined(frm, lBracketRoleId, i) && typeof(frm.elements[sCommitItem])!="undefined" && !(frm.elements[sCommitItem].disabled))
{
frm.elements[sCommitItem].value = formatAmountString(lSplitAmt.toString());
var sCommitPctItem = "grpPct" + i.toString();
frm.elements[sCommitPctItem].value = idealToFixed(rawCommitPct,2); 
assignMemDirtyFlag(frm, lBracketRoleId, i) 
} 
}
} 
else{
var sBrackCalc = sBracketRoleId + "CalcType"; 
frm.elements[sBrackCalc].value = frm.selCalcType.value; 
var sPartAmt = sBracketRoleId + "PartAmt";
frm.elements[sPartAmt].value = lGroupAmt;
var lNewGroupAmt = Math.round(lGroupAmt * lMemCount);
frm.elements[sGroupAmt].value = formatAmountString(lNewGroupAmt.toString());
var lGrpSize = new Number(lTrnSize);
var rawGroupCommitPct = (lNewGroupAmt/lGrpSize)*100;
var sGroupPct = sBracketRoleId + "TrnPct";
frm.elements[sGroupPct].value = idealToFixed(rawGroupCommitPct,2);
var rawCommitPct = (lGroupAmt/lNewGroupAmt)*100;
lMemCount = lStartPos + lMemCount - 1; 
for(var i=lStartPos; i<=lMemCount; i++)
{
var sCommitItem = "iTxtAmount" + i.toString();
if(typeof(frm.elements[sCommitItem])!="undefined" && !(frm.elements[sCommitItem].disabled))
{ 
frm.elements[sCommitItem].value = formatAmountString(lGroupAmt.toString());
var sCommitPctItem = "grpPct" + i.toString();
frm.elements[sCommitPctItem].value = idealToFixed(rawCommitPct,2); 
assignMemDirtyFlag(frm, lBracketRoleId, i) 
}
} 
}
}
else
{
lMemCount = lStartPos + lMemCount - 1; 
for(var i=lStartPos; i<=lMemCount; i++)
{
var sCommitItem = "iTxtAmount" + i.toString();
if (typeof(frm.elements[sCommitItem])!="undefined")
frm.elements[sCommitItem].value = 0;
var sCommitPctItem = "grpPct" + i.toString();
if (typeof(frm.elements[sCommitPctItem])!="undefined")
frm.elements[sCommitPctItem].value = 0; 
assignMemDirtyFlag(frm, lBracketRoleId, i) 
} 
}
}
function Sum(frm, lBracketRoleId)
{
var sBracketRoleId = lBracketRoleId.toString();
var sStartPos = sBracketRoleId + "StartPos";
var lStartPos = new Number(frm.elements[sStartPos].value.replace(/(\,)/g, ""));
var sMemCount = sBracketRoleId + "Count";
var lMemCount = new Number(frm.elements[sMemCount].value.replace(/(\,)/g, ""));
var lSum = 0;
lMemCount = lStartPos + lMemCount - 1; 
for(var i=lStartPos; i<=lMemCount; i++)
{
var sCommitItem = "iTxtAmount" + i.toString();
if (typeof(frm.elements[sCommitItem])=="undefined")
continue;
var lCommit = new Number(frm.elements[sCommitItem].value.replace(/(\,)/g, ""));
lSum += lCommit; 
}
var sGroupAmt = sBracketRoleId + "Amt";
frm.elements[sGroupAmt].value = formatAmountString(lSum.toString());
lTrnSize = new Number(frm.hidTrnSize.value.replace(/(\,)/g, ""));
var rawCommitPct = (lSum/lTrnSize)*100;
var sCommitPctItem = sBracketRoleId + "TrnPct";
frm.elements[sCommitPctItem].value = idealToFixed(rawCommitPct,2);
}
function SumUnderwritten(frm)
{
var lNumGroups = frm.hidNumFields.value;
var lSum = 0;
for(var i=1; i<=lNumGroups; i++)
{
var sFldNm = "GroupUsed" + i.toString();
var lGroupId = frm.elements[sFldNm].value;
if(lGroupId > 0)
{
var sBrackTotal = lGroupId.toString() + "Amt";
if(typeof(frm.elements[sBrackTotal])!="undefined")
{
var lCommit = new Number(frm.elements[sBrackTotal].value.replace(/(\,)/g, ""));
lSum += lCommit;
}
}
}
frm.Underwritten.value = formatAmountString(lSum.toString()); 
var lTrnSize = new Number(frm.hidTrnSize.value.replace(/(\,)/g, ""));
var LWarning = eval("ShowMaxWarning");
var LNoWarning = eval("NoShowMaxWarning");
if(lSum > lTrnSize){
LNoWarning.style.display = 'none';
LWarning.style.display = '';
}
else 
{
LWarning.style.display = 'none';
LNoWarning.style.display = '';
}	
DoUpdateHeaderTrancheInfo();
}
function assignSubRoleDirtyFlag(frm,position)
{ 
}
function SellingGrpAllocOrdExists(frm)
{
var sSellInd,sDeleteInd
for(var i=1;i <= frm.hidNumSyndMem.value; i++)
{
sSellInd = "hidSellGrpOrdInd" + i.toString();
sDeleteInd = "cbDelete" + i.toString();
if(typeof(frm.elements[sDeleteInd])!="undefined" && (frm.elements[sDeleteInd].checked == true && frm.elements[sSellInd].value== 1))
{
return confirm(frm.hidSellGrpDelMsg.value); 
} 
}	
return true;	
}
function addSellingGroupMember()
{
assignDirtyFlag(document.frmMain);
if(checkChanges(document.frmMain) == true)
{
var lBracketInd;
var radBracket = document.frmMain.radGroupedBy;
if(radBracket)
{
var lBracketInd = 1;
for(i=0; i<radBracket.length; i++)
{
if(radBracket[i].checked == true)
{
lBracketInd = radBracket[i].value;
i = radBracket.length;
}	
}
}
else
lBracketInd = ""; 
var sUrl = "syndpart_add_uw_popupEQ.asp?TrancheId="+document.frmMain.hidTrnId.value+"&UseBracketInd="+lBracketInd+"&SellingGrp=1";
var sStyle = "width=700,height=600,scrollbars=1,resizable=1";
openGeneralPopup( sUrl, '', sStyle );	
} 
}
function onInvitationChange(frm, lBracketId, lPosition)
{
var sPosition = lPosition.toString();
var sBracketId = lBracketId.toString();
var sCalcType = sBracketId + "CalcType";
var sSelRole = "selInvite" + sPosition;
var lCalcType = frm.elements[sCalcType].value;
if (typeof(frm.elements[sSelRole].options) != "undefined")
{
var sCommitment = "iTxtAmount" + lPosition.toString();
if (frm.elements[sSelRole].options[frm.elements[sSelRole].selectedIndex].text == "Decline")
{
frm.elements[sCommitment].value = 0;
if (typeof(frm.elements[sCommitment]) != "undefined")
{
frm.elements[sCommitment].value = 0;
}
}
else
{
if (typeof(frm.elements[sCommitment]) != "undefined")
{
var sNDuwSize = sBracketId + "NDuwSize";
if (lCalcType == 1) 
{
var sEqualSplit = sBracketId + "EqualSplit";
if (frm.elements[sEqualSplit])
frm.elements[sEqualSplit].value = 1;
if (frm.elements[sCommitment])
frm.elements[sCommitment].value = 0;
}
else
{
if (frm.elements[sCommitment] && frm.elements[sNDuwSize])
frm.elements[sCommitment].value = frm.elements[sNDuwSize].value;
}
}
}
}
var sDirty = "hidDirtyFlag" + lPosition.toString();
var sGroup = "hidGroupChg" + lPosition.toString();
var sAmount = "iTxtAmount" + lPosition.toString();
var sMemChg = sBracketId + "MemChg";
frm.elements[sDirty].value = 1;
frm.elements[sGroup].value = 0;
frm.elements[sMemChg].value = 1;
} 
function DoUpdateHeaderTrancheInfo()
{
}
function UpdateHeaderTrancheInfo(sTrancheSize, sUnderwrittenSize)
{
}
function IsDeclined(frm, lBracketRoleID, iPos)
{
var sPos = iPos.toString();
var sSM = frm.elements["hidSyndMemId" + sPos].value.toString() + "|";
var oDList = frm.elements[lBracketRoleID.toString() + "DeclinedString"];
if (oDList.value.indexOf(sSM) != -1)
return true;
else
return false;
}
function GetDeclineCount(frm, lBracketRoleID)
{
return frm.elements[lBracketRoleID.toString() + "DeclinedCount"].value;
}
function AddDecline(frm, lBracketRoleID, iPos)
{
var sSM = frm.elements["hidSyndMemId" + iPos.toString()].value.toString();
var sBracketRoleID = lBracketRoleID.toString();
frm.elements[sBracketRoleID + "DeclinedCount"].value++;
frm.elements[sBracketRoleID + "DeclinedString"].value += sSM + "|";
}
function RemoveDecline(frm, lBracketRoleID, iPos)
{
var sPos = iPos.toString();
var sSM = frm.elements["hidSyndMemId" + sPos].value.toString() + "|";
var oDList = frm.elements[lBracketRoleID.toString() + "DeclinedString"];
if (oDList.value.indexOf(sSM) != -1)
{
var sBracketRoleID = lBracketRoleID.toString();
frm.elements[sBracketRoleID + "DeclinedCount"].value--;
oDList.value = oDList.value.replace(sSM, "");
frm.elements["iTxtAmount" + sPos].value = frm.elements["iTxtAmountOld" + sPos].value;
}
}
function ResetDeclines(frm, lBracketRoleID)
{
frm.elements[lBracketRoleID.toString() + "DeclinedCount"].value = 0;
frm.elements[lBracketRoleID.toString() + "DeclinedString"].value = "";
}
function ResetAllDeclines()
{
var frm = document.frmMain;
if (typeof(frm.elements["hidBracketID"]) != "undefined")
{
var nBracketID = frm.elements["hidBracketID"].length;
for (var i=0; i < nBracketID; i++)
ResetDeclines(frm, frm.elements["hidBracketID"][i].value);
}
}
function EnableAllAmount(frm)
{
var lNumGroups;
if(frm.hidNumFields)
lNumGroups = frm.hidNumFields.value;
else
lNumGroups = 0;
var lSyndMemPlace = 1;
var lNumSyndMem = 0;
for(var i=1; i<=lNumGroups; i++)
{
var sFldNm = "GroupUsed" + i.toString();
var lGroupId = frm.elements[sFldNm].value;
var sFldCount = lGroupId.toString() + "Count";
if (typeof(frm.elements[sFldCount])=="undefined")
continue;
var lBracketMemCount = new Number(frm.elements[sFldCount].value.replace(/(\,)/g, "")); 
lNumSyndMem = lNumSyndMem + lBracketMemCount;
for(var j=lSyndMemPlace; j<=lNumSyndMem; j++)
{
var sAmount = "iTxtAmount" + j.toString();
var sRole = "selRole" + j.toString();
var sBracket = "selBracket" + j.toString();
if (typeof(frm.elements[sAmount]) != "undefined")
frm.elements[sAmount].disabled = 0;
if (typeof(frm.elements[sRole]) != "undefined")
frm.elements[sRole].disabled = 0;
if (typeof(frm.elements[sBracket]) != "undefined")
frm.elements[sBracket].disabled = 0;
}
lSyndMemPlace = lSyndMemPlace + lBracketMemCount;
} 
}
