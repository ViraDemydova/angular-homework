<!-- 
RSEnableRemoteScripting("/_ScriptLibrary");
function onPageLoad()
{
menuShow('syndpart_worksheet', 'show');
var frm = document.frmMain;
if (typeof(document.frmMain.hidNumFields) != "undefined" && typeof(document.all.divScroll) != "undefined")
{
var nRows = document.frmMain.hidNumSyndMem.value;
var nHeight;
var nWidth = (frm.hidHideMenu.value)? 910 : 850;
if (typeof(nRows) == "undefined")
nRows = 1;
if (nRows >= 12)
{
nHeight = 18 * nRows;
if (nHeight < 400) nHeight = 400;
if (nHeight > 600) nHeight = 600;
document.all.divScroll.style.height=nHeight;
}
}
ResetAllDeclines();
var sAction = frm.hidLink.value;
frm.hidLink.value = "";
switch (sAction)
{
case "AddParticipant":
addParticipantPopup();
break;
case "AddSG":
addSellingGroupMemberPopup();
break;
case "ShowDeclines":
showDeclinesPopup(frm);
break;
case "ChangeSort":
changeSortPopup(frm);
break;
case "OrderBySortName":
DoOrderBySortName(frm);
break;
default:
if (sAction.indexOf("AddList") != -1)
{
var arrVars = sAction.split("|");
frm.selUnderwriter.selectedIndex = arrVars[1];
DoAddList(frm);
}
else if (sAction.indexOf("DeleteList") != -1)
{
var arrVars = sAction.split("|");
frm.selUnderwriter.selectedIndex = arrVars[1];
DoDeleteList(frm);
}
else if (sAction.indexOf("SyndRevision") != -1)
{
var arrVars = sAction.split("|");
frm.selStatus.selectedIndex = arrVars[1];
DoSyndRevision(frm);
}
else if (sAction.indexOf("AddBatch") != -1)
{
var arrVars = sAction.split("|");
frm.sName.value = arrVars[1];
DoAddBatch(frm);
}
else if (sAction.indexOf("LoadTranche") != -1)
{
var arrVars = sAction.split("|");
frm.selTranche.selectedIndex = arrVars[1];
DoLoadTranche(frm);
}
break;
}
}
var gMsgBGColor;
var gTrancheSize;
var gTrancheName;
function ToggleSection(strElem, sTrancheName, sUnderwrittenSize) 
{
gTrancheName = sTrancheName;
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
document.all.divMessageC.innerText = sTrancheName + ": " + document.all.divTrnSize.innerText + " " +
sUnderwrittenSize + ": " + document.frmMain.Underwritten.value;
gTrancheSize = document.all.divTrnSize.innerText;
}
}
}
function loadTranche(frm, linkFlg)
{
if(checkChanges2(frm) == true)
{ 
frm.hidLink.value = "LoadTranche|" + frm.selTranche.selectedIndex;
submitPageChange (frm, frm.hidLink.value)
return;
} 
DoLoadTranche(frm);
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
SaveLeftNavMenuSetting();
switch (action)
{
case "SaveChanges" :
frm.hidAction.value = "UpdateEQ";
if(!SellingGrpAllocOrdExists(frm)){return;} 
EnableAllDisable (frm);
if(ValidateForm( frm ))
{
if (CheckDeleteParticipants())
{
if (frm.hidChanges.value == "|")
frm.hidChanges.value = "";
if (frm.hidBraketRoles.value == "|")
frm.hidBraketRoles.value = ""; 
frm.method = "POST"; 
frm.action = "util_submit_action_EQ.asp";
frm.submit();	
} 
}
break;
case "SaveChangesPopup" :
frm.hidAction.value = "UpdatePopupEQ";
if(ValidateForm( frm ))
{
assignDirtyFlag(frm);
frm.method = "POST"; 
frm.action = "util_submit_action.asp";
frm.submit(); 
}
break;
case "RevertToSaved" :
ResetAllChanges(frm);
frm.reset();
DoUpdateHeaderTrancheInfo()
ResetCheckedComments();
ResetDelete(frm);
break;
case "Cancel" :
frm.action = "/asp/_template.asp";
frm.submit();
break;
case "Add" :
if (frm.selUnderwriter.options[frm.selUnderwriter.selectedIndex].text=="" )
{
alert(frm.hidImportUWListMsg.value);
return;
}
if (!ValidateCalcType(document.frmMain, document.frmMain.radCalType1))
return;
if(checkChanges2(frm) == true)
{
frm.hidLink.value = "AddList|" + frm.selUnderwriter.selectedIndex;
submitPageChange (frm, frm.hidLink.value)
return;
}	
DoAddList(frm);
break; 
case "SyndRevision" :
if(checkChanges2(frm) == true)
{ 
frm.hidLink.value = "SyndRevision|" + frm.selStatus.selectedIndex;
submitPageChange (frm, frm.hidLink.value)
return;
} 
DoSyndRevision(frm);
break; 
case "AddBatch" :
if(checkChanges2(frm) == true)
{ 
frm.hidLink.value = "AddBatch|" + frm.sName.value;
submitPageChange (frm, frm.hidLink.value)
return;
}
DoAddBatch(frm);
break; 
case "CopyToTranche" :
if(checkChanges(frm) == true)
{
frm.action = "util_submit_action.asp";
frm.hidAction.value = "CopyToTranche";
frm.submit();
}
break; 
case "DeleteList" :
if (frm.selUnderwriter.options[frm.selUnderwriter.selectedIndex].text=="" )
{
alert(frm.hidDeleteUWListMsg.value);
return;
}
if(checkChanges2(frm) == true)
{
frm.hidLink.value = "DeleteList|" + frm.selUnderwriter.selectedIndex;
submitPageChange (frm, frm.hidLink.value)
return;
}
DoDeleteList(frm);
break;
case "Printer":
frm.hidPrinter.value = 1;
loadTranche (frm, "");
break;
case "Revert":
frm.hidPrinter.value = 0;
loadTranche (frm, "");
break; 
case "OrderBySortName":
if(checkChanges2(frm) == true)
{
frm.hidLink.value = "OrderBySortName";
submitPageChange (frm, frm.hidLink.value)
return;
}
DoOrderBySortName(frm);
break; 
case "ShowDeclines":
if(checkChanges2(frm) == true)
{
frm.hidLink.value = "ShowDeclines";
submitPageChange (frm, frm.hidLink.value)
return;
}	
showDeclinesPopup(frm);
break; 
}
}
function submitPageOrderBySort( frm , synRoleID, bracketID )
{
SaveLeftNavMenuSetting();
if(checkChanges2(frm) == true)
{
frm.hidLink.value = "OrderBySortNameBracket";
submitPageChange (frm, frm.hidLink.value)
return;
}
DoOrderBySortNameBracket(frm, synRoleID, bracketID);
}
function addParticipant()
{
if (!ValidateCalcType(document.frmMain, document.frmMain.radCalType1))
return;
SaveLeftNavMenuSetting();
if(checkChanges2(document.frmMain) == true)
{
var frm = document.frmMain;
frm.hidLink.value = "AddParticipant";
submitPageChange (frm, frm.hidLink.value)
return;
} 
addParticipantPopup();
}
function addParticipantPopup()
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
var sUrl = "syndpart_add_uw_popupEQ.asp?TrancheId="+document.frmMain.hidTrnId.value+"&UseBracketInd="+lBracketInd+"";
var sStyle = "width=700,height=600,scrollbars=1,resizable=1";
openGeneralPopup( sUrl, '', sStyle );
}
function submitPageChange (frm, sValue)
{
rsObj = RSExecute ('rs_SyndicateParticipation.asp', 'jsSetLeftNavMenuSetting2', frm.hidLink.value, "SPMode");
submitPage( frm , "SaveChanges" )
}
function changeSort(frm)
{
if(checkChanges2(frm) == true)
{
frm.hidLink.value = "ChangeSort";
submitPageChange (frm, frm.hidLink.value)
return;
}
changeSortPopup(frm);
}
function checkChanges(frm)
{
if (frm.elements["hidChanges"].value.length > 0 || frm.elements["hidBRCommitment"].value.length > 0)
return confirm("You have made changes to this page. Do you wish to not save and continue?");
return true;
}
function checkChanges2(frm)
{
if (frm.elements["hidChanges"].value.length > 0 || frm.elements["hidBRCommitment"].value.length > 0)
return confirm("You have made changes to this page. Do you wish to save and continue?");
return false;
}
function assignDirtyFlag(frm)
{
}
function assignMemDirtyFlag(frm, lBracketId, lPosition, oGroupUsed)
{
}
function assignMemDirtyFlag2(frm, lBracketId, lPosition)
{
var sPosition = lPosition.toString();
var sSelBracket = "selBracket" + sPosition;
var sSelRole = "selRole" + sPosition;
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
AddChage(frm.elements["hidChanges"], lPosition, 4);
AddDisable (frm, sSelRole)
}
}
}
else
{
frm.elements[sSelRole].disabled = 0;
RemoveDisable (frm, sSelRole)
}
}
AddChage(frm.elements["hidChanges"], lPosition, 8);
AddChage(frm.elements["hidBraketRoles"], lPosition, lBracketId);
}
function openComments(lSyndMemId, lPosition)
{
SaveLeftNavMenuSetting();
{
var sUrl = "syndpart_comments_popup.asp?SyndMemId=" + lSyndMemId + "&Pos=" + lPosition;
var sStyle = "width=350,height=200,scrollbars=1,resizable=1";
openGeneralPopup( sUrl, '', sStyle );	
} 
}
function getCommitmentPct(frm, lBracketId, iMemberPos)
{ 
var sPosition = iMemberPos.toString()
var sCommitItem = "iTxtAmount" + sPosition;
var sOldCommitItem = "iTxtAmountOld" + sPosition;
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
}
function getCommitment(frm, lBracketId, iMemberPos)
{
var sPosition = iMemberPos.toString();
var sCommitItem = "iTxtAmount" + sPosition;
var sCommitPctItem = "grpPct" + sPosition;
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
}
function OnCommitmentPctChange(frm, lBracketId, lTrnSize, iMemberPos)
{
var sPosition = iMemberPos.toString();
var sCommitItem = "iTxtAmount" + sPosition;
var sCommitPctItem = "commitmentPct" + sPosition;
var sGrpPctItem = "grpPct" + sPosition;
if(frm.elements[sCommitPctItem].value == "")
{
frm.elements[sCommitItem].value = "";
}
else
{	
var pctCommitPctVal = new Number(frm.elements[sCommitPctItem].value.replace(/(\,)/g, ""));
var rawCommitVal = Math.round(pctCommitPctVal * 0.01 * lTrnSize);
frm.elements[sCommitItem].value = formatAmountString(rawCommitVal.toString());
}	
OnCommitmentChange (frm, lBracketId, iMemberPos);
}
function getBracketPct(frm, lBracketId, lTrnSize)
{
var sCommitItem = lBracketId.toString() + "Amt";
var sOldCommitItem = lBracketId.toString() + "OldAmt";
if (lTrnSize <= 0)
{
alert("Need tranche size to enter commitment amounts");
frm.elements[sCommitItem].value = frm.elements[sOldCommitItem].value
return false;
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
return true;
}
function getBracket(frm, lBracketId, lTrnSize)
{
var sCommitPctItem = lBracketId.toString() + "TrnPct";
if (lTrnSize <= 0)
{
alert("Need tranche size to enter commitment amounts");
frm.elements[sCommitPctItem].value = "";
return false;
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
return true; 
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
var bIsClosedEndFund = (frm.elements["hidClosedEndFundFlag"].value == "True");
if(lGroupAmt > 0)
{
if(frm.selCalcType.value == "1")
{
var sBrackCalc = sBracketRoleId + "CalcType";
frm.elements[sBrackCalc].value = frm.selCalcType.value;
var lSplitAmt = Math.floor(lGroupAmt/lActualMemCount);
var lNewGroupAmt = Math.floor(lSplitAmt * lActualMemCount);
var lRemainingAmt = lGroupAmt - lNewGroupAmt;
var rawGrpPct;
var rawCommitPct;
rawGrpPct = (lSplitAmt/lGroupAmt)*100;
rawCommitPct = (lSplitAmt/lTrnSize)*100;
lMemCount = lStartPos + lMemCount - 1; 
var bApplyRem = 0; 
for(var i=lStartPos; i<=lMemCount; i++)
{ 
var sPosition = i.toString()
var sCommitItem = "iTxtAmount" + sPosition;
if(!IsDeclined(frm, lBracketRoleId, i) && typeof(frm.elements[sCommitItem])!="undefined" && !(frm.elements[sCommitItem].disabled))
{
if (i==lStartPos)
{ 
frm.elements[sCommitItem].value = formatAmountString((lSplitAmt+lRemainingAmt).toString());
bApplyRem = 1;
}
else
{
frm.elements[sCommitItem].value = formatAmountString(lSplitAmt.toString());
}
var sGrpPctItem = "grpPct" + sPosition;
frm.elements[sGrpPctItem].value = idealToFixed(rawGrpPct,2);
var sCommitmentPctItem = "commitmentPct" + sPosition;
frm.elements[sCommitmentPctItem].value = idealToFixed(rawCommitPct,2);
}
AddChage(frm.elements["hidChanges"], i, 16)
}
if (bApplyRem)
{
frm.elements[sGroupAmt].value = formatAmountString((lNewGroupAmt+lRemainingAmt).toString());
}
else
{
frm.elements[sGroupAmt].value = formatAmountString(lNewGroupAmt.toString());
}
} 
else
{
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
var rawGrpPct;
var rawCommitPct;
rawCommitPct = (lGroupAmt/lTrnSize)*100;
rawGrpPct = (lGroupAmt/lNewGroupAmt)*100;
lMemCount = lStartPos + lMemCount - 1; 
for(var i=lStartPos; i<=lMemCount; i++)
{
var sPosition = i.toString();
var sCommitItem = "iTxtAmount" + sPosition;
if(typeof(frm.elements[sCommitItem])!="undefined" && !(frm.elements[sCommitItem].disabled))
{ 
frm.elements[sCommitItem].value = formatAmountString(lGroupAmt.toString());
var sGrpPctItem = "grpPct" + sPosition;
frm.elements[sGrpPctItem].value = idealToFixed(rawGrpPct,2);
var sCommitmentPctItem = "commitmentPct" + sPosition;
frm.elements[sCommitmentPctItem].value = idealToFixed(rawCommitPct,2);
}
AddChage(frm.elements["hidChanges"], i, 16)
} 
}
}
else
{
lMemCount = lStartPos + lMemCount - 1; 
for(var i=lStartPos; i<=lMemCount; i++)
{
var sPosition = i.toString();
var sCommitItem = "iTxtAmount" + sPosition;
if (typeof(frm.elements[sCommitItem])!="undefined")
{
frm.elements[sCommitItem].value = 0;
}
var sGrpPctItem = "grpPct" + sPosition;
if (typeof(frm.elements[sGrpPctItem])!="undefined")
{
frm.elements[sGrpPctItem].value = 0; 
}
var sCommitmentPctItem = "commitmentPct" + sPosition;
if (typeof(frm.elements[sCommitmentPctItem])!="undefined")
{
frm.elements[sCommitmentPctItem].value = 0; 
}
AddChage(frm.elements["hidChanges"], i, 16)
} 
}
}
function SumSmart(frm, lBracketRoleId, lPos)
{
var lTrnSize = new Number(frm.hidTrnSize.value.replace(/(\,)/g, ""));
if (lTrnSize <= 0)
{
alert("Need tranche size to enter commitment amounts");
return;
} 
var sBracketRoleId = lBracketRoleId.toString();
var sPos = lPos.toString();
formatAmount(frm.elements["iTxtAmount" + sPos]);
var lNew = new Number(frm.elements["iTxtAmount" + sPos].value.replace(/(\,)/g, ""));
var lOld = frm.elements["iTxtAmountOld" + sPos].value;
var sGroupAmt = sBracketRoleId + "Amt";
var lSum = new Number(frm.elements[sGroupAmt].value.replace(/(\,)/g, "")) + (lNew - lOld);
frm.elements["iTxtAmountOld"+sPos].value = lNew;
frm.elements[sGroupAmt].value = formatAmountString(lSum.toString());
var rawCommitPct = (lSum/lTrnSize)*100;
var sCommitPctItem = sBracketRoleId + "TrnPct";
frm.elements[sCommitPctItem].value = idealToFixed(rawCommitPct,2);
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
if(lSum != 0 && lTrnSize != 0)
{
var rawCommitPct = (lSum/lTrnSize)*100;
var sCommitPctItem = sBracketRoleId + "TrnPct";
frm.elements[sCommitPctItem].value = idealToFixed(rawCommitPct,2);
}
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
function addSellingGroupMember()
{
if (!ValidateCalcType(document.frmMain, document.frmMain.radCalType1))
return;
SaveLeftNavMenuSetting();
if(checkChanges2(document.frmMain) == true)
{
var frm = document.frmMain;
frm.hidLink.value = "AddSG";
submitPageChange (frm, frm.hidLink.value)
return;
}
addSellingGroupMemberPopup();
}
function addSellingGroupMemberPopup()
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
function onInvitationChange(frm, lBracketId, lPosition)
{
var oTemplateElement ;
var sElemName , oElemRetAlocQty, oElemRetIOIQty;
var oSelRoleElem, oSelBracketElem ;
sElemName = "selRole" + lPosition ;
oSelRoleElem = document.getElementById(sElemName) ;
oTemplateElement = document.getElementById("hidSyndRoles") ;
_PopDrop(oSelRoleElem, oTemplateElement)
sElemName = "selBracket" + lPosition ;
oSelBracketElem = document.getElementById(sElemName) ;
oTemplateElement = document.getElementById("hidBracket") ;
_PopDrop(oSelBracketElem, oTemplateElement) ;
sElemName = "hidFree_Ret_Alo_Qty" + lPosition ;
oElemRetAlocQty = document.getElementById(sElemName); 
sElemName = "hidFree_Ret_Ioi_Qty" + lPosition ;
oElemRetIOIQty = document.getElementById(sElemName); 
var lChosenInviteID ;
sElemName = "selInvite" + lPosition ;
lChosenInviteID = (document.getElementById(sElemName)).value ; 
var lDeclineInviteID ;
lDeclineInviteID = document.getElementById("hidDeclineInviteID").value ;
var lNoDecisionInviteID ;
lNoDecisionInviteID = document.getElementById("hidNoDecisionInviteID").value ;
if(lDeclineInviteID == lChosenInviteID && ( oElemRetAlocQty.value > 0 || oElemRetIOIQty.value > 0 ) )
{
var oElem ;
sElemName = "selInvite" + lPosition ;
oElem = document.getElementById(sElemName) ;
if(oElem) oElem.value = lNoDecisionInviteID; 
if (oSelRoleElem) oSelRoleElem.value = document.getElementById("hidSellingGroupRoleID").value ;
OnRoleChange(frm, lBracketId, lPosition) ;
}
var sPos = lPosition.toString();
var sSelRole = "selInvite" + sPos;
var sBracketId = lBracketId.toString();
if (typeof(frm.elements[sSelRole].options) != "undefined")
{
if (frm.elements[sSelRole].options[frm.elements[sSelRole].selectedIndex].text == "Decline")
{
var sCommitment = "iTxtAmount" + sPos;
if (typeof(frm.elements[sCommitment]) != "undefined")
{
var sCalcType = sBracketId + "CalcType";
var lCalcType = frm.elements[sCalcType].value;
if (lCalcType == 1) 
{
var sEqualSplit = sBracketId + "EqualSplit";
frm.elements[sEqualSplit].value = 1;
}
frm.elements[sCommitment].value = 0;
AddDecline(frm, lBracketId, lPosition);
AddChage(frm.elements["hidChanges"], lPosition, 16);
AddChage(frm.elements["hidBraketRoles"], lPosition, lBracketId);
}
}
else
{
RemoveDecline(frm, lBracketId, lPosition);
RemoveChange(frm.elements["hidBraketRoles"], lPosition, lBracketId);
}
}
AddChage(frm.elements["hidChanges"], lPosition, 1);
}
function DoUpdateHeaderTrancheInfo()
{
UpdateHeaderTrancheInfo(gTrancheName, "Underwritten Size"); 
}
function UpdateHeaderTrancheInfo(sTrancheName, sUnderwrittenSize)
{
if (typeof(document.frmMain.Underwritten) != "undefined" && typeof(document.all.divMessageC) != "undefined")
{
if (document.all.divMessageC.innerText.length > 0)
document.all.divMessageC.innerText = sTrancheName + ": " + gTrancheSize + " " +
sUnderwrittenSize + ": " + document.frmMain.Underwritten.value;
}
}
function SaveCommitmentCalcType()
{
var frm = document.frmMain;
rsObj = RSExecute ('rs_SyndicateParticipation.asp', 'jsSetCommitmentCalcType', frm.selCalcType.value.toString() );
submitPage(frm, "SaveChanges")	
}
function SaveLeftNavMenuSetting()
{
var frm = document.frmMain;
rsObj = RSExecute ('rs_SyndicateParticipation.asp', 'jsSetLeftNavMenuSetting', frm.hidHideMenu.value );
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
if (typeof(frm.elements[lBracketRoleID.toString() + "DeclinedCount"]) != "undefined")
frm.elements[lBracketRoleID.toString() + "DeclinedCount"].value = 0;
if (typeof(frm.elements[lBracketRoleID.toString() + "DeclinedString"]) != "undefined")
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
function ResetCheckedComments()
{
var oCount = document.frmMain.hidTotalSyndicates;
if (typeof(oCount) != "undefined")
{
for (var i = 1; i <= oCount.value; i++)
{
var oDiv = eval("document.all." + "divComment" + i.toString());
if (typeof(oDiv) != "undefined")
oDiv.style.display = "none";
}
}
}
function CheckComment( lPos)
{
var oDiv = eval("document.all." + "divComment" + lPos.toString());
if (typeof(oDiv) != "undefined")
oDiv.style.display = "block";
}
function CheckDeleteParticipants()
{
var frm = document.frmMain;
var oCount = frm.hidTotalSyndicates;
if (typeof(oCount) != "undefined")
{
var iCount = frm.elements["hidDeleteCount"].value;
//}
if (iCount == 1)
{
var sMsg = "Are you sure you want to delete broker/dealer ?";
return confirm(sMsg);
}
else if (iCount > 1)
{
var sMsg = "Are you sure you want to delete brokers/dealers ?";
return confirm(sMsg);
}
}
return true;
}
function SellingGrpAllocOrdExists(frm)
{
if (frm.elements["hidSellGrpDelOrdCnt"].value > 0)
return confirm(frm.hidSellGrpDelMsg.value); 
return true;	
}
function AddDelete(frm, lBracketRoleID, iPos)
{
var sBracketRoleID = lBracketRoleID.toString() + iPos.toString() + "|";
if (frm.elements["hidDeleteString"].value.indexOf(sBracketRoleID) == -1)
{
frm.elements["hidDeleteCount"].value++;
frm.elements["hidDeleteString"].value += sBracketRoleID ;
var	sSellInd = "hidSellGrpOrdInd" + iPos;
if(frm.elements[sSellInd].value== 1)
{
frm.elements["hidSellGrpDelOrdCnt"].value++;
} 
}
}
function RemoveDelete(frm, lBracketRoleID, iPos)
{
var sBracketRoleID = lBracketRoleID.toString() + iPos.toString() + "|";
if (frm.elements["hidDeleteString"].value.indexOf(sBracketRoleID) != -1)
{
frm.elements["hidDeleteCount"].value--;
frm.elements["hidDeleteString"].value = frm.elements["hidDeleteString"].value.replace(sBracketRoleID, "");
var	sSellInd = "hidSellGrpOrdInd" + iPos;
if(frm.elements[sSellInd].value== 1)
{
frm.elements["hidSellGrpDelOrdCnt"].value++;
} 
}
}
function ResetDelete(frm)
{
frm.elements["hidDeleteCount"].value = 0;
frm.elements["hidDeleteString"].value = "";
frm.elements["hidSellGrpDelOrdCnt"].value = 0;
}
function OnDelete(frm, lBracketRoleId, lPos)
{
var sPos = lPos.toString();
var sFldNm = "cbDelete" + sPos; 
if(frm.elements[sFldNm].checked)
{
AddDelete(frm, lBracketRoleId, lPos);
AddChage(frm.elements["hidChanges"], lPos, 2);
AddChage(frm.elements["hidBraketRoles"], lPos, lBracketRoleId);
}
else
{
RemoveDelete(frm, lBracketRoleId, lPos);
RemoveChange(frm.elements["hidChanges"], lPos, 2);
RemoveChange(frm.elements["hidBraketRoles"], lPos, lBracketRoleId);
}
}
function OnRoleChange(frm, lBracketRoleId, lPos)
{
var sPosition = lPos.toString();
var sSelBracket = "selBracket" + sPosition;
var sSelRole = "selRole" + sPosition;
if (typeof(frm.elements[sSelBracket]) != "undefined" && typeof(frm.elements[sSelRole]) != "undefined")
{
var sVal = frm.elements[sSelRole].options[frm.elements[sSelRole].selectedIndex].text;
if (sVal == "Selling Group")
{
for (var i=0; i < frm.elements[sSelBracket].options.length; i++)
{
if (frm.elements[sSelBracket].options[i].text == "Bracket 8 - Selling Group")
{
frm.elements[sSelBracket].selectedIndex = i;
frm.elements[sSelBracket].disabled = 1;
AddChage(frm.elements["hidChanges"], lPos, 8);
if (Number(frm.elements["hidBracketInd"].value) == 1)
AddChage(frm.elements["hidBraketRoles"], lPos, lBracketRoleId);
AddDisable (frm, sSelBracket)
}
}
}
else
{
frm.elements[sSelBracket].disabled = 0;
RemoveDisable (frm, sSelBracket)
}
}
AddChage(frm.elements["hidChanges"], lPos, 4);
if (Number(frm.elements["hidBracketInd"].value) == 0)
AddChage(frm.elements["hidBraketRoles"], lPos, lBracketRoleId);
}
function OnMemCommitmentChange(frm, lBracketRoleId, lPos)
{
}
function SetSelectgroupUsed(frm, lBracketRoleId)
{
var lNumGroups;
if(frm.hidNumFields)
lNumGroups = frm.hidNumFields.value;
else
lNumGroups = 0;
var lNumSyndMem = 0;
for(var i=1; i<=lNumGroups; i++)
{
var sFldNm = "GroupUsed" + i.toString();
if(Number(frm.elements[sFldNm].value) == Number(lBracketRoleId))
{
frm.hidSelGroupUsed.value = i;
break;
}
}
}
function OnBRCommitmentChg(frm, lBracketRoleId, lTrnSize, obj)
{
formatAmount(obj);
if (!SPVerifyInput(frm, obj) || !ValidateCalcType(frm, frm.radCalType1))
{
Sum(frm, lBracketRoleId);
return;
}
var sBracketRoleId = lBracketRoleId.toString();
if (typeof(frm.elements[sBracketRoleId + "hAmt"]) != "undefined")
{
if (frm.elements[sBracketRoleId + "hAmt"].value == frm.elements[sBracketRoleId + "Amt"].value)
return; 
}
SetSelectgroupUsed(frm, lBracketRoleId);
if (getBracketPct(frm, lBracketRoleId, lTrnSize))
{
frm.elements[lBracketRoleId.toString()+"Chg"].value = 1;
AddChage(frm.elements["hidBRCommitment"], frm.hidSelGroupUsed.value, lBracketRoleId);
}
if (typeof(frm.elements[sBracketRoleId + "hAmt"]) != "undefined")
frm.elements[sBracketRoleId + "hAmt"].value = frm.elements[sBracketRoleId + "Amt"].value;
}
function OnBRPercentChg(frm, lBracketRoleId, lTrnSize, obj)
{
formatAmount(obj);
if (!SPVerifyInput(frm, obj) || !ValidateCalcType(frm, frm.radCalType1))
{
Sum(frm, lBracketRoleId);
obj.value = "";
return;
}
SetSelectgroupUsed(frm, lBracketRoleId);
if (getBracket(frm, lBracketRoleId, lTrnSize))
{
frm.elements[lBracketRoleId.toString()+"Chg"].value = 1;
AddChage(frm.elements["hidBRCommitment"], frm.hidSelGroupUsed.value, lBracketRoleId);
}
}
function OnCommitmentChange (frm, lBracketRoleId, lPos)
{
var sPos = lPos.toString();
var obj = frm.elements["iTxtAmount"+sPos];
formatAmount(obj);
if (!SPVerifyInput(frm, obj))
return;
if (!ValidateCalcType(frm, frm.radCalType1))
{
obj.value =	frm.elements["iTxtAmountOld"+sPos].value;
formatAmount(obj);
return;
}
var sCommitPctItem = "commitmentPct" + sPos;
var rawCommitVal = new Number(obj.value.replace(/(\,)/g, ""));
var lTrnSize = new Number(frm.elements["hidTrnSize"].value.replace(/(\,)/g, ""));
var rawCommitPctVal = (rawCommitVal / lTrnSize) * 100;
frm.elements[sCommitPctItem].value = idealToFixed(rawCommitPctVal,2);	
AddChage(frm.elements["hidChanges"], lPos, 16);
SumSmart(frm, lBracketRoleId, lPos);
SumUnderwritten(frm);
}
function AddChage(obj, iPos, iVal)
{
var sPos = iPos.toString() + "x";
var sVal, sOldVal;
var i,j,k, p;
if ((p = obj.value.indexOf("|" + sPos)) == -1)
{
sVal = sPos + iVal.toString() + "|";
}
else
{
j = p + sPos.length;
sVal = obj.value.substr(j);
if ((i = sVal.indexOf("|")) != -1)
sVal = sVal.substr(1,i - 1);
sOldVal = "|" + sPos + sVal;
k = Number(sVal) | iVal;
sVal = sPos + k.toString() + "|";
obj.value = obj.value.replace(sOldVal, "");	
}
if (obj.value == "")
{
obj.value += "|";
}
obj.value += sVal;
}
function RemoveChange(obj, iPos, iVal)
{
var sPos = "|" + iPos.toString() + "x";
var sVal, sOldVal;
var i,j,k, p;
if ((p = obj.value.indexOf(sPos)) != -1)
{
j = p + sPos.length;
sVal = obj.value.substr(j);
if ((i = sVal.indexOf("|")) != -1)
sVal = sVal.substr(0,i);
sOldVal = sPos + sVal;
k = Number(sVal) & ~iVal;
sVal = sPos + k.toString();
obj.value = obj.value.replace(sOldVal, "");
if (k > 0)	
{
sVal = sVal.substr(1, sVal.length) + "|";
obj.value += sVal;
}
}
}
function AddDisable (frm, sObjName)
{
var obj = frm.elements["hidDisableList"];
if (obj.value.indexOf(sObjName) == -1)
obj.value += sObjName + "|";
}
function RemoveDisable (frm, sObjName)
{
var obj = frm.elements["hidDisableList"];
if (obj.value.indexOf(sObjName) != -1)
obj.value = obj.value.replace(sObjName + "|", "");	
}
function EnableAllDisable (frm)
{
var sDisable = frm.elements["hidDisableList"].value;
if (sDisable.length > 0)
{
var arrDisable = sDisable.split("|");
for (var i=0; i < arrDisable.length-1; i++)
{
frm.elements[arrDisable[i]].disabled = 0;
}
}
}
function ResetAllChanges(frm)
{
frm.elements["hidChanges"].value = "";
frm.elements["hidBraketRoles"].value = "";
frm.elements["hidBRCommitment"].value = "";
EnableAllDisable (frm);
frm.elements["hidDisableList"].value = "";
}
function SPVerifyInput(frm, obj)
{
var sRet = stripCharsNotInBag(obj.value, "0123456789.,MK");
if (sRet != obj.value)
{
var arrMoreErrors = new Array();
var count = 0;
var sName = obj.id;
var arrErrors = FieldErrorInfo(sName, "Enter only digits(0-9), mm, k", "", sName, sName);
arrMoreErrors[count] = arrErrors;
count++; 
var bRet = displayErrorElems(frm, arrMoreErrors, true);
return false;
}
else
return true;
}
function showDeclinesPopup(frm)
{
var sUrl = "syndpart_worksheet.asp?TrancheId="+frm.hidTrnId.value+"&Mode=ShowDeclines";
var sStyle = "width=900,height=600,scrollbars=1,resizable=1";
openGeneralPopup( sUrl, '', sStyle );
}
function changeSortPopup(frm)
{
var sUrl = "syndpart_sort_order_popup.asp?TrancheId="+document.frmMain.hidTrnId.value+"";
var sStyle = "width=500,height=400,scrollbars=1,resizable=1";
openGeneralPopup( sUrl, '', sStyle );	
}
function DoOrderBySortName(frm)
{
frm.method = "POST";
frm.hidAction.value = "OrderBySortName"; 
frm.action = "util_submit_action.asp";
frm.submit();
}
function DoOrderBySortNameBracket(frm, synRoleID, bracketID)
{
frm.method = "POST";
if (bracketID == "" )
{
frm.hidBracketIDForOrderSort.value = -1
}
else
{
frm.hidBracketIDForOrderSort.value = bracketID
}
if (synRoleID == "" )
{
frm.hidSynRoleIDForOrderSort.value = -1
}
else
{
frm.hidSynRoleIDForOrderSort.value = synRoleID
}
frm.hidAction.value = "OrderBySortNameBracket"; 
frm.action = "util_submit_action.asp";
frm.submit();
}
function DoAddList(frm)
{
frm.action = "util_submit_action.asp";
frm.hidAction.value = "Add";
frm.submit();
}
function DoDeleteList(frm)
{
frm.action = "util_submit_action_EQ.asp";
frm.hidAction.value = "DeleteList";
frm.submit();
}
function DoSyndRevision(frm)
{
frm.action = "util_submit_action.asp";
frm.hidAction.value = "SyndRevision";
frm.submit();
}
function DoAddBatch(frm)
{
if(ValidateForm( frm ))
{
frm.hidAction.value = "AddBatch";
frm.action = "util_submit_action.asp";
frm.hidProgID.value = "NewIssueMaster_usr.MasterUnderwriter";
frm.submit();
}
}
function DoLoadTranche(frm)
{
var selectID = frm.selTranche.selectedIndex;
var selectValue = frm.selTranche.options[selectID].value;
window.location = "syndpart_worksheet.asp?TrancheId="+selectValue+"";
}
function onCalcTypeChange(frm, sCalcType)
{
if (sCalcType == "1" || sCalcType == "5")
{
frm.selCalcType.value = sCalcType;
if (sCalcType == "1")
frm.elements["radCalType"+"5"].checked = 0;
else
frm.elements["radCalType"+"1"].checked = 0;
SaveCommitmentCalcType();
}
}
function ValidateCalcType(frm, obj)
{
if (!frm.selCalcType) 
return true;
var sCalcType = frm.selCalcType.value;
if (sCalcType != "1" && sCalcType != "5")
{
var arrMoreErrors = new Array();
var count = 0;
var sName = obj.id;
var arrErrors = FieldErrorInfo(sName, "You cannot add participants or enter commitment values prior to selecting a Commitment Calculation Type", "", sName, "Commitment Calculation Type:");
arrMoreErrors[count] = arrErrors;
count++; 
var bRet = displayErrorElems(frm, arrMoreErrors, true);
return false;
}
return true;
}
function ToggleSortName(frm)
{
var arrSortNm = document.all.divSortNm;
for (var i=0; i < arrSortNm.length; i++)
{
if (arrSortNm(i).style.display == 'none')
arrSortNm(i).style.display="block";
else
arrSortNm(i).style.display="none";
}
}
function PopDrop(templateDropDown, pos)
{
var srcElement = event.srcElement;
var templateElement = eval('document.frmMain.' + templateDropDown );
if ( srcElement && templateElement && srcElement.options.length == 1)
{
_PopDrop(srcElement, templateElement);
if (pos > 0 )
{
if (templateDropDown == 'hidBracket')
{
srcElement = eval('document.frmMain.selRole' + pos );;
templateElement = eval('document.frmMain.hidSyndRoles' );
if (srcElement && templateElement)
_PopDrop(srcElement, templateElement);
}
else if (templateDropDown == 'hidSyndRoles')
{
srcElement = eval('document.frmMain.selBracket' + pos );;
templateElement = eval('document.frmMain.hidBracket' );
if (srcElement && templateElement)
_PopDrop(srcElement, templateElement);
}
}
window.event.cancelBubble = true;	
event.srcElement.focus();
}
}
function _PopDrop(targetControl, templateControl)
{
if ( targetControl && templateControl && targetControl.options.length == 1)
{
for (i=0; i< templateControl.options.length; i++)
{
var oOption = document.createElement("OPTION");
oOption.text=templateControl.options(i).text;
oOption.value=templateControl.options(i).value;
var bFound = false;
for (j=0; j<targetControl.options.length; j++){
if (targetControl.options[j].value == oOption.value){
bFound = true;
break;
}
}
if (!bFound)
targetControl.add(oOption);
}
window.event.cancelBubble = true;
}
}
function OnCheckGlobalCoordinator(frm, lBracketRoleId, lPos)
{
var sPos = lPos.toString();
var sFldNm = "cbGlobalCoordinator" + sPos; 
if(frm.elements[sFldNm].checked)
{
frm.elements["hidGlobalCoordInd" + sPos].value = "1" ;
}
else
{
frm.elements["hidGlobalCoordInd" + sPos].value = "0" ;
}
AddChage(frm.elements["hidChanges"], lPos, 32);
AddChage(frm.elements["hidBraketRoles"], lPos, lBracketRoleId);
}
function ReplaceBroker(frm)
{
var sUrl = "syndpart_replace_broker.asp?TrancheId="+frm.hidTrnId.value+"&CalledFrom=syndpart_worksheet&replace=broker";
var sStyle = "width=700,height=600,scrollbars=1,resizable=1";
openGeneralPopup( sUrl, '', sStyle );	
}
function ReplaceSubsidiary(frm)
{
var sUrl = "syndpart_replace_broker.asp?TrancheId="+frm.hidTrnId.value+"&CalledFrom=syndpart_worksheet&replace=subsidiary";
var sStyle = "width=700,height=600,scrollbars=1,resizable=1";
openGeneralPopup( sUrl, '', sStyle );	
}
function UpdateUnderwrittenSize(frm)
{
var sUrl = "/aspx/UI/SyndicateParticipation/UpdateUnderwrittenSize.aspx?trn_id=" + frm.hidTrnId.value;
var sStyle = "width=700,height=450,scrollbars=1,resizable=1";
openGeneralPopup( sUrl, '', sStyle );	
}
var g_bCANFunctionality;
var g_bGroupByBracket;
var g_arrUSByRole = new Array(25,13,10,19,9,12,12);
var g_arrUSByBracket = new Array(23,11,8,10,17,9,11,11);
var g_arrCANByRole = new Array(22,12,10,16,10,8,10,12);
var g_arrCANByBracket = new Array(18,9,9,13,15,9,9,8,10);
function OnResize()
{
ApplyParticipantsColumnsWidth(g_bCANFunctionality, g_bGroupByBracket);
window.setTimeout("ApplyParticipantsColumnsWidth2();", 200);
}
function ApplyParticipantsColumnsWidth(bCANFunctionality, bGroupByBracket)
{
g_bCANFunctionality = bCANFunctionality;
g_bGroupByBracket = bGroupByBracket;
var trHeader = document.getElementById("trSyndicateHeader");
var trData = document.getElementById("trSyndicateData");
var arr;
if (g_bCANFunctionality!="True" && g_bGroupByBracket=="True")
arr = g_arrUSByBracket;
if (g_bCANFunctionality!="True" && g_bGroupByBracket!="True")
arr = g_arrUSByRole;
if (g_bCANFunctionality=="True" && g_bGroupByBracket=="True")
arr = g_arrCANByBracket;
if (g_bCANFunctionality=="True" && g_bGroupByBracket!="True")
arr = g_arrCANByRole;
for(var i=0; i<arr.length; i++)
{
trData.cells[i].style.width = arr[i] + "%"; 
}	
}
function ApplyParticipantsColumnsWidth2()
{
var trHeader = document.getElementById("trSyndicateHeader");
var trData = document.getElementById("trSyndicateData");
var divScroll = document.getElementById("divScroll");
for(var i=0; i<trHeader.cells.length; i++)
{
var w = trData.cells[i].clientWidth;
if (i==trHeader.cells.length-1)
{
if (divScroll.clientWidth!=0)
w += (divScroll.offsetWidth - divScroll.clientWidth);	
}
trHeader.cells[i].style.width = w; 
}
}
