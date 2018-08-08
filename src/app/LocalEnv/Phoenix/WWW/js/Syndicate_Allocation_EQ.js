<!-- 
RSEnableRemoteScripting("/_ScriptLibrary")
var g_NumGroups = 0;
var g_GroupName;
var g_GroupCode;
var g_NumSM = 0;
var g_SyndicateType;
var g_NextObj;
var gMsgBGColor;
var gArrRetailRet;
var gArrDirectedSh;
var gArrInstRetn;
var gArrIndication;
var	bChange = false;
function initSyndicateTypes()
{
g_NumSM = document.frmMain.hidSynMemberCount.value;
g_SyndicateType = new Array(g_NumSM + 1);
for (var i = 1; i <= g_NumSM; i++)
{
g_SyndicateType[i] = document.frmMain.elements['hidSyndicateType'+i].value;
}
}
function initGroupsByRole()
{
g_NumGroups = 4;
g_GroupName = new Array(g_NumGroups);
g_GroupCode = new Array(g_NumGroups);
g_GroupName[0] = "Managers";
g_GroupCode[0] = "Manager";
g_GroupName[1] = "Underwriters";
g_GroupCode[1] = "Underwriter";
g_GroupName[2] = "Selling Group";
g_GroupCode[2] = "SellingGroup";
g_GroupName[3] = "Secondary Selling Group";
g_GroupCode[3] = "SecondarySelling";
}
function initGroupsByBracket()
{
var frm = document.frmMain;
g_NumGroups = getNum(frm.hidNumBrackets);
g_GroupName = new Array(g_NumGroups);
g_GroupCode = new Array(g_NumGroups);
for (var grp = 1; grp <= g_NumGroups; grp++)
{
g_GroupName[grp-1] = frm.elements['hidBracketName'+grp].value;
g_GroupCode[grp-1] = frm.elements['hidBracketCode'+grp].value;
}
}
function getNum(fld)
{
var result = new Number(fld.value.replace(/(\,)/g, ""));
if (isNaN(result))
result = 0;
return result;
}
function roundTo2Dec(num)
{
return (Math.round(num * 100)) / 100;
}
function getDealSize()
{
var frm = document.frmMain;
var lIssueSize = getNum(frm.hidIssueSize);
return lIssueSize;
}
function getDealSizeWithOverallotment()
{
var frm = document.frmMain;
var lIssueSize = getNum(frm.hidIssueSize);
var lMaxOverallotmentQty = getNum(frm.hidMaxOverallotmentQty) + getNum(frm.hidMaxUWOptionQty);
var lTotalDeal = lIssueSize + lMaxOverallotmentQty;
return lTotalDeal;
}
function getAnticipatedDealSize()
{
var frm = document.frmMain;
if (frm.cbAnticipateOverallotment.checked)
return getDealSizeWithOverallotment();
else
return getDealSize();
}
function updateTotals()
{
var i;
var frm = document.frmMain;
var lTotalDeal = getAnticipatedDealSize();
frm.TotalDeal.value = formatAmountString(lTotalDeal.toString());
var instAlloc = getNum(frm.InstitutionalAlloc);
if (lTotalDeal > 0)
{
var instAllocPct = roundTo2Dec(instAlloc / lTotalDeal * 100);
frm.InstitutionalAllocPct.value = formatFixedDecimalAmountString(instAllocPct.toString(),2);
if (typeof(frm.InstitutionalUSAlloc) != "undefined" && typeof(frm.InstitutionalIntlAlloc) != "undefined" )
{
var instUSAlloc = getNum(frm.InstitutionalUSAlloc);
var instIntlAlloc = getNum(frm.InstitutionalIntlAlloc);
var instUSAllocPct = roundTo2Dec(instUSAlloc / lTotalDeal * 100);
var instIntlAllocPct = roundTo2Dec(instIntlAlloc / lTotalDeal * 100);
var RetailRetPct = roundTo2Dec(getNum(frm.RetailRetAlloc) / lTotalDeal * 100);
frm.RetailRetAllocPct.value = formatFixedDecimalAmountString(RetailRetPct.toString(),2);
var DirectedPct = roundTo2Dec(getNum(frm.DirectedSharesAlloc) / lTotalDeal * 100);
frm.DirectedSharesAllocPct.value = formatFixedDecimalAmountString(DirectedPct.toString(),2);
frm.InstitutionalUSAllocPct.value = formatFixedDecimalAmountString(instUSAllocPct.toString(),2);
frm.InstitutionalIntlAllocPct.value = formatFixedDecimalAmountString(instIntlAllocPct.toString(),2);
}
}
updateSMTotals();
var totalRetail = getNum(frm.TotalRetail);
if (lTotalDeal > 0)
{
var totalRetailPct = roundTo2Dec(totalRetail / lTotalDeal * 100);
frm.TotalRetailPct.value = formatFixedDecimalAmountString(totalRetailPct.toString(),2);
}
var instRet = getNum(frm.hidInstitutionalRet);
if (instRet > 0 && lTotalDeal > 0)
{
var instRetPct = roundTo2Dec(instRet / lTotalDeal * 100);
frm.InstitutionalRetPct.value = formatFixedDecimalAmountString(instRetPct.toString(),2);
}
var totalAllocated = totalRetail + instAlloc + instRet;
frm.TotalAllocated.value = formatAmountString(totalAllocated.toString());
if (lTotalDeal > 0)
{
var totalAllocatedPct = roundTo2Dec(totalAllocated / lTotalDeal * 100);
frm.TotalAllocatedPct.value = formatFixedDecimalAmountString(totalAllocatedPct.toString(),2);
}
var position = lTotalDeal - (totalRetail + instAlloc + instRet);
frm.Position.value = formatAmountString(position.toString());
var longShort;
var color;
if (position > 0)
{
longShort = "Long";
color = "green"
}
else if (position < 0)
{
if (frm.cbAnticipateOverallotment.checked)
longShort = "Naked";
else
longShort = "Short";
color = "red"
}
else
{
longShort = "Flat";
color = "black"
}
frm.LongShort.value = longShort;
frm.Position.style.color = color;
frm.LongShort.style.color = color;
frm.hidColor.value = color;
if (frm.cbAnticipateOverallotment.checked)
{
hideNaked(true);
}
else
{
hideNaked(false);
var nakedPos = lTotalDeal - (totalRetail + instAlloc + instRet);
if (nakedPos < 0)
{
nakedPos *= -1;
frm.Naked.value = formatAmountString(nakedPos.toString());
frm.Naked.style.color = "red";
}
else
{
frm.Naked.value = "N/A";
frm.Naked.style.color = "black";
}
}
DisplayHeaderInfo();
}
function updateSMTotals()
{
var frm = document.frmMain;
var cf = getNum(frm.hidTrnPrdConversionFactor); 
var totalRetailForIssue = 0;
var totalRetailForIssueNoDSP = 0;
var grp;
var grpExists = new Array(g_NumGroups);
var totalRetailRet = new Array(g_NumGroups);
var totalDirected = new Array(g_NumGroups);
var totalAlloc = new Array(g_NumGroups);
var totalRetentionIOI = new Array(g_NumGroups);
var totalInstRetn = new Array(g_NumGroups);
for (grp = 0; grp < g_NumGroups; grp++)
{
grpExists[grp] = false;
totalRetailRet[grp] = 0;
totalDirected[grp] = 0;
totalAlloc[grp] = 0;
totalRetentionIOI[grp] = 0;
totalInstRetn[grp] = 0;
}
for (i = 1; i <= g_NumSM; i++)
{
var RetailRet = gArrRetailRet[i];
var Directed = gArrDirectedSh[i];
var InstRetn = gArrInstRetn[i];
var SMTotalAlloc = RetailRet + Directed + InstRetn;
totalRetailForIssue += SMTotalAlloc * cf;
if (isDSP())
totalRetailForIssueNoDSP += RetailRet * cf;
for (grp = 0; grp < g_NumGroups; grp++)
{
if (g_SyndicateType[i] == g_GroupCode[grp])
{
grpExists[grp] = true;
totalRetailRet[grp] += RetailRet;
totalDirected[grp] += Directed;
totalAlloc[grp] += SMTotalAlloc;
totalRetentionIOI[grp] += gArrIndication[i];
totalInstRetn[grp] += gArrInstRetn[i];
break;
}
}
}
for (grp = 0; grp < g_NumGroups; grp++)
{
if (grpExists[grp])
{
frm.elements['hid' + g_GroupCode[grp] + 'RetailRet'].value = formatAmountString(blankZeroNum(totalRetailRet[grp]));
frm.elements['hid' + g_GroupCode[grp] + 'Directed'].value = formatAmountString(blankZeroNum(totalDirected[grp]));
frm.elements['hid' + g_GroupCode[grp] + 'TotalAlloc'].value = formatAmountString(blankZeroNum(totalAlloc[grp]));
frm.elements['hid' + g_GroupCode[grp] + 'RetentionIOI'].value = formatAmountString(blankZeroNum(totalRetentionIOI[grp]));
if (frm.hidIsLehman.value == '1')
frm.elements['hid' + g_GroupCode[grp] + 'InstRetn'].value = formatAmountString(blankZeroNum(totalInstRetn[grp]));
}
}
var trnTotalRetailRet = 0;
var trnTotalDirected = 0;
var trnTotalAlloc = 0;
var trnTotalRetentionIOI = 0;
var trnTotalInstRetn = 0;
for (grp = 0; grp < g_NumGroups; grp++)
{
if (grpExists[grp] == true)
{
trnTotalRetailRet += totalRetailRet[grp];
trnTotalDirected += totalDirected[grp];
trnTotalAlloc += totalAlloc[grp];
trnTotalRetentionIOI += totalRetentionIOI[grp];
trnTotalInstRetn += totalInstRetn[grp];
}
}
frm.hidTrancheRetailRet.value = formatAmountString(blankZeroNum(trnTotalRetailRet));
frm.hidTrancheDirected.value = formatAmountString(blankZeroNum(trnTotalDirected));
frm.hidTrancheTotalAlloc.value = formatAmountString(blankZeroNum(trnTotalAlloc));
frm.hidTrancheRetentionIOI.value = formatAmountString(blankZeroNum(trnTotalRetentionIOI));
if (frm.hidIsLehman.value=='1')
frm.hidTrancheInstRetn.value = formatAmountString(blankZeroNum(trnTotalInstRetn));
totalRetailForIssue += getNum(frm.hidOtherTranchesRetailTot);
if (isDSP())
{
totalRetailForIssueNoDSP += getNum(frm.hidOtherTranchesRetailTot) ;
if(frm.DirectedSharesAlloc != undefined) totalRetailForIssueNoDSP += getNum(frm.DirectedSharesAlloc);
}
if (isDSP())
{
if (totalRetailForIssueNoDSP != 0)
frm.TotalRetail.value = formatAmountString(totalRetailForIssueNoDSP.toString());
else
frm.TotalRetail.value = "";	
}
else
{
if (totalRetailForIssue != 0)
frm.TotalRetail.value = formatAmountString(totalRetailForIssue.toString());
else
frm.TotalRetail.value = "";
}
}
function onClickAnticipateOverallotment()
{
SaveLeftNavMenuSetting();
updateTotals();
var frm = document.frmMain;
if (frm.cbAnticipateOverallotment.checked)
frm.hidAnticipateOverallotment.value = "1"
else
frm.hidAnticipateOverallotment.value = "0"
}
function onUpdateAlloc(sElement, iPos)
{
var frm = document.frmMain;
var newNum = getNum(document.frmMain.elements[sElement]);
document.frmMain.elements[sElement].value = formatAmountString(newNum.toString());
if (sElement.indexOf("hidRetailRet") != -1)
gArrRetailRet[iPos] = newNum;
else if (sElement.indexOf("hidDirected") != -1)
gArrDirectedSh[iPos] = newNum;
else if (sElement.indexOf("hidRetentionIOI") != -1)
gArrIndication[iPos] = newNum;
else if (sElement.indexOf("hidInstRetn") != -1)
gArrInstRetn[iPos] = newNum;
var SMTotalAlloc = gArrDirectedSh[iPos] + gArrRetailRet[iPos] + gArrInstRetn[iPos];
if ( SMTotalAlloc != 0)
frm.elements['hidTotalAlloc'+iPos].value = formatAmountString(SMTotalAlloc.toString());
else
frm.elements['hidTotalAlloc'+iPos].value = "";
updateTotals();
if (typeof(g_NextObj) != "undefined")
g_NextObj.focus();
if (frm.hidEditDetailInPage.value > 0)
{
var sName = document.frmMain.elements[sElement].name;
var sPos = iPos.toString();
if (sName.indexOf("hidRetailRet") != -1)
{
var nNum = (getNum(frm.elements["hidRetailRet" + sPos]) - gArrRetailRet[iPos]);
frm.RetailRetAlloc.value = getNum(frm.RetailRetAlloc) + nNum;
frm.RetailRetAlloc.value = formatAmountString(frm.RetailRetAlloc.value);
gArrRetailRet[iPos] = getNum(frm.elements["hidRetailRet" + sPos]);
}
else if (sName.indexOf("hidDirected") != -1)
{
var nNum = (getNum(frm.elements["hidDirected" + sPos]) - gArrDirectedSh[iPos]);
frm.DirectedSharesAlloc.value = getNum(frm.DirectedSharesAlloc) + nNum;
frm.DirectedSharesAlloc.value = formatAmountString(frm.DirectedSharesAlloc.value);
gArrDirectedSh[iPos] = getNum(frm.elements["hidDirected" + sPos]);
}
}
}
function onBlurInstAlloc()
{
var frm = document.frmMain;
var lTotalDeal = getAnticipatedDealSize();
if (lTotalDeal > 0)
{
var instAlloc = getNum(frm.InstitutionalAlloc);
instAlloc = Math.round(instAlloc);
var instAllocPct = instAlloc / lTotalDeal * 100;
frm.InstitutionalAllocPct.value = formatFixedDecimalAmountString(instAllocPct.toString(),2);
frm.InstitutionalAlloc.value = formatAmountString(instAlloc.toString());
}
updateTotals();
}
function onBlurInstRet()
{
var frm = document.frmMain;
var lTotalDeal = getAnticipatedDealSize();
if (lTotalDeal > 0)
{
var instRet = getNum(frm.InstitutionalRet);
instRet = Math.round(instRet);
var instRetPct = instRet / lTotalDeal * 100;
frm.InstitutionalRetPct.value = formatFixedDecimalAmountString(instRetPct.toString(),2);
frm.InstitutionalRet.value = formatAmountString(instRet.toString());
frm.hidInstitutionalRet.value = frm.InstitutionalRet.value;
}
onChangeInstRet();
updateTotals();
}
function onBlurInstAllocPct()
{
var frm = document.frmMain;
var lTotalDeal = getAnticipatedDealSize();
if (lTotalDeal > 0)
{
var instAllocPct = getNum(frm.InstitutionalAllocPct);
var instAlloc = (instAllocPct * lTotalDeal) / 100;
instAlloc = Math.round(instAlloc);
frm.InstitutionalAlloc.value = formatAmountString(instAlloc.toString());
frm.InstitutionalAllocPct.value = formatFixedDecimalAmountString(instAllocPct.toString(),2);
}
updateTotals();
}
function onBlurInstRetPct()
{
var frm = document.frmMain;
var lTotalDeal = getAnticipatedDealSize();
if (lTotalDeal > 0)
{
var instRetPct = getNum(frm.InstitutionalRetPct);
var instRet = (instRetPct * lTotalDeal) / 100 ;
instRet = Math.round(instRet);
frm.InstitutionalRet.value = formatAmountString(instRet.toString());
frm.hidInstitutionalRet.value = frm.InstitutionalRet.value;
frm.InstitutionalRetPct.value = formatFixedDecimalAmountString(instRetPct.toString(),2);
}
onChangeInstRet();
updateTotals();
}
function onChangeInstRet()
{
var frm = document.frmMain;
if (frm.hidIsLehman.value == '1')
{
var iSyndCnt = frm.hidSynMemberCount.value;
for (var i = 1; i <= iSyndCnt;i++)
{
var elem = frm("hidSmId" + i);
if (elem.value == frm.hidSubSyndMemId.value)
{
elem = frm("hidInstRetn" + i);
elem.value = frm.InstitutionalRet.value;
onUpdateAlloc(elem.name, i);
break;
}
}
}
}
function loadTranche(frm)
{
SaveLeftNavMenuSetting();
var selectID = frm.selTranche.selectedIndex;
var selectValue = frm.selTranche.options[selectID].value;
window.location = "syndicate_allocation_eq.asp?TrancheId=" + selectValue;
onUpdatePageDirtyFlag(true);
}
function exportToExcel(frm)
{
var selectID = frm.selTranche.selectedIndex;
var selectValue = frm.selTranche.options[selectID].value;
window.location = "syndicate_allocation_eq.asp?refer=excelexport&TrancheId=" + selectValue;
}
function onPageLoad()
{
menuShow('syndpart_worksheet', 'show');
setTimeout("onPageLoad2();",1); 
}
function onPageLoad2()
{
var frm = document.frmMain;
if (SyndicateList.scrollHeight >= 350)
{	
tdLastHeaderCol.style.paddingRight = 15;
SyndicateList.style.height = 350;
}
if (document.frmMain.hidUseBracketInd.value == "True")
initGroupsByBracket();
else
initGroupsByRole();
initSyndicateTypes();
if (document.frmMain.hidAnticipateOverallotment.value == "True")
document.frmMain.hidAnticipateOverallotment.value = "1";
else if (document.frmMain.hidAnticipateOverallotment.value == "False")
document.frmMain.hidAnticipateOverallotment.value = "0";
if (document.frmMain.hidAnticipateOverallotment.value == "1")
document.frmMain.cbAnticipateOverallotment.checked = true;
else
document.frmMain.cbAnticipateOverallotment.checked = false;
InitInPageArrays(frm);
if (frm.hidEditDetailInPage.value == "1")
{
hideInstRet(false);
}
else
hideInstRet(getNum(document.frmMain.hidInstitutionalRet) == 0);
if (checkIf_US_Intl())
{
document.frmMain.InstitutionalAlloc.disabled = true;
document.frmMain.InstitutionalAllocPct.disabled = true;
}
blankOutZeros(); 
updateTotals();
var SMTotalAlloc;
for (i = 1; i <= g_NumSM; i++)
{
SMTotalAlloc = gArrDirectedSh[i] + gArrRetailRet[i] + gArrInstRetn[i];
if ( SMTotalAlloc != 0)
frm.elements['hidTotalAlloc'+i].value = formatAmountString(SMTotalAlloc.toString());
else
frm.elements['hidTotalAlloc'+i].value = "";
} 
if (document.frmMain.hidLoadEditDetailsInd.value == 1)
{
OpenPopup();
}
document.frmMain.hidLoadEditDetails.value = "0";
UpdateWMTotalSales();
}
function CheckConditionallyRequiredFields( frm, arrFieldsInError )
{
var arrMoreErrors = new Array();
if (isDSP() && (frm.DirectedSharesAlloc != undefined) && !isSignedInteger(frm.DirectedSharesAlloc.value, true))
{
var arrError = FieldErrorInfo("DirectedSharesAlloc", 'Invalid whole number', "", "", "Directed Shares");
arrMoreErrors[arrMoreErrors.length] = arrError; 
}
return (arrMoreErrors);
} 
function CustomValidation( frm, arrFieldsInError )
{
var arrMoreErrors = new Array();
return (arrMoreErrors);
} 
function submitPage( frm , action, trancheIDtoUpdate, sFrom )
{
var hidFromMasterBookInd;
if (sFrom == 'Actual')
SaveLeftNavMenuSetting();
switch (action)
{
case "savechanges" :
if(ValidateForm( frm ))
{
if (isDSP() && (frm.DirectedSharesAlloc != undefined) )
{
frm.DirectedSharesAlloc.value = getNum(frm.DirectedSharesAlloc);	
} 
if (frm.hidAnticipateOverallotment.value == "True")
frm.hidAnticipateOverallotment.value = "1";
else if (frm.hidAnticipateOverallotment.value == "False")
frm.hidAnticipateOverallotment.value = "0"; 
frm.action = "/asp/util_submit_action.asp";
frm.hidAction.value = "SyndicateAllocation_Update";
frm.hidTrancheIDToUpdate.value = trancheIDtoUpdate;
unformatNumbersForSave();
frm.submit();
hidFromMasterBookInd = getDocumentElement("hidFromMasterBookInd");
if (hidFromMasterBookInd != null && hidFromMasterBookInd.value=='true')
{
window.opener.document.frmMain.MasterBookCtrl.RefreshFromFxRate();
}
}
break;
case "reverttosaved" :
ResetCheckedComments();
frm.reset();
InitInPageArrays(frm);
updateTotals();
break;
case "cancel" :
frm.action = "/asp/_template.asp";
frm.submit();
break;
case "addreg" :
frm.action = "/asp/_template.asp";
frm.submit();
break;
case "PublishBlockIndicationToLM" :
frm.action = "/asp/util_submit_action.asp";
frm.hidAction.value = "PublishBlockIndicationToLM";
unformatNumbersForSave();
var sProgId = frm.hidProgID.value;
frm.hidProgID.value = "SyndCon_usr.SyndCon";
frm.submit();
frm.hidProgID.value = sProgId;
break;
}
}
function unformatNumbersForSave()
{
var frm = document.frmMain;
for (i = 1; i <= g_NumSM; i++)
{
frm.elements['hidRetailRet'+i].value = getNum(frm.elements['hidRetailRet'+i]);
frm.elements['hidDirected'+i].value = getNum(frm.elements['hidDirected'+i]);
frm.elements['hidRetentionIOI'+i].value = getNum(frm.elements['hidRetentionIOI'+i]);
}
frm.InstitutionalAlloc.disabled = false;
frm.InstitutionalAlloc.value = getNum(frm.elements['InstitutionalAlloc']);
frm.elements['hidInstitutionalRet'].value = getNum(frm.elements['hidInstitutionalRet']);
if (typeof(frm.InstitutionalUSAlloc) != "undefined" && typeof(frm.InstitutionalIntlAlloc) != "undefined")
{
frm.InstitutionalUSAlloc.value = getNum(frm.elements['InstitutionalUSAlloc']);
frm.InstitutionalIntlAlloc.value = getNum(frm.elements['InstitutionalIntlAlloc']);
}
if (typeof(frm.txtWMRetailSales) != "undefined")
{
frm.txtWMRetailSales.value = getNum(frm.elements['txtWMRetailSales']);
frm.txtWMInstSales.value = getNum(frm.elements['txtWMInstSales']);
frm.txtWMIntlSales.value = getNum(frm.elements['txtWMIntlSales']);
}
}
function blankOutZeros()
{
var frm = document.frmMain;
for (i = 1; i <= g_NumSM; i++)
{
if (getNum(frm.elements['hidRetailRet'+i]) == 0)
frm.elements['hidRetailRet'+i].value = "";
if (getNum(frm.elements['hidDirected'+i]) == 0)
frm.elements['hidDirected'+i].value = "";
if (getNum(frm.elements['hidRetentionIOI'+i]) == 0)
frm.elements['hidRetentionIOI'+i].value = "" ;
}
}
function openEditDetails(bCheckPageDirty)
{
if (bCheckPageDirty)
{
hidPageDirtyEle = getDocumentElement("hidPageDirtyF");
if (hidPageDirtyEle != null)
{
if (hidPageDirtyEle.value == "true")
{
var sStatusMsg = new String;
sStatusMsg = sStatusMsg + "You have make change in the Syndicate Allocation Page. Do you want to save your changes?<br>";
showSaveMessage(sStatusMsg);
return;
}
}
}
SaveLeftNavMenuSetting();
var sUrl = "Syndicate_Allocation_Edit_Details_EQ.asp?overallot_ind=" + document.frmMain.hidAnticipateOverallotment.value;
var sStyle = "width=400,height=300,toolbar=no,menubar=no,location=no,directories=no,resizable=yes,scrollbars=no,center=yes,status=no";
openGeneralPopup( sUrl, '', sStyle );
}
function hideInstRet(bHide)
{
var elthis = eval('InstRetRow');
if (bHide == true)
{
elthis.style.display = 'none';
} 
else
{
elthis.style.display = '';
}
}
function hideNaked(bHide)
{
var elthis = eval('NakedRow');
if (bHide == true)
{
elthis.style.display = 'none';
} 
else
{
elthis.style.display = '';
}
}
function checkIf_US_Intl()
{
var frm = document.frmMain;
var InstUSAlloc = getNum(frm.hidInstUSAlloc);
var InstIntlAlloc = getNum(frm.hidInstIntlAlloc);
return (InstUSAlloc != 0 || InstIntlAlloc != 0);
}
function setSMDirty( fld )
{
document.frmMain.elements[fld].value = "1";
onUpdatePageDirtyFlag(false);
}
function blankZeroNum(num)
{
if (num == 0)
return "";
else
return num.toString();
}
function locatorWin() 
{
SaveLeftNavMenuSetting();
var lwin = window.open('find_on_page.asp','findit','height=60,width=250,toolbar=no,directories=no,status=no,menubar=no,scrollbars=no,resizable=no'); 
lwin.moveTo(0,0); 
lwin.focus();
}
function SaveLeftNavMenuSetting()
{
var frm = document.frmMain;
rsObj = RSExecute ('rs_SyndicateParticipation.asp', 'jsSetLeftNavMenuSetting2', frm.hidHideMenu.value, "SPhideLeftNavMenu");
}
function openComments(lSyndMemId, lPosition)
{
SaveLeftNavMenuSetting();
{
var sUrl = "syndicate_allocation_comments.asp?SyndMemId=" + lSyndMemId + "&Pos=" + lPosition;
var sStyle = "width=350,height=200,scrollbars=1,resizable=1";
openGeneralPopup( sUrl, '', sStyle );	
} 
}
function ResetCheckedComments()
{
var oCount = document.frmMain.hidSynMemberCount;
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
function onUpdatePageDirtyFlag(bReset)
{
var hidPageDirtyEle;
hidPageDirtyEle = getDocumentElement("hidPageDirtyF");
if (hidPageDirtyEle != null)
{
if (bReset)
hidPageDirtyEle.value="false";
else if (hidPageDirtyEle.value == "false")
hidPageDirtyEle.value="true";
}
}
function showSaveMessage(sStatusMsg)
{
var sMessage = new String;
sMessage = sMessage + "<html><head>";
sMessage = sMessage + "<title>" + document.title + " Save Syndicate Allocation" + "</title>";
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
sMessage = sMessage + "<br><input type='button' value='Yes' class='stdButton_R2' onclick='javascript:window.close();javascript:self.window.opener.SaveChanged()'>";
sMessage = sMessage + "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<input type='button' value='No' class='stdButton_R2' onclick='javascript:window.close();javascript:self.window.opener.OpenPopup()'>";
sMessage = sMessage + "</td></tr>";
sMessage = sMessage + "</table></body></html>";
var sHeight = "height=" + (150 + (1 * 22));
var sWindowParms = "toolbar=no,location=no,directories=no,scrollbars=yes,resizable=yes,width=450,center=yes,dependent=yes," + sHeight;
var sChildName = window.name + "Allocations";
var popupSave = window.open("",sChildName,sWindowParms);
popupSave.document.open();
popupSave.document.write(sMessage);
popupSave.document.close();
popupSave.focus();
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
function SaveChanged()
{
var frm = document.frmMain;
var selectID = frm.selTranche.selectedIndex;
var selectValue = frm.selTranche.options[selectID].value;
frm.hidLoadEditDetails.value = "1";
submitPage(document.frmMain,'savechanges',selectValue);
}
function OpenPopup()
{
var sUrl = "Syndicate_Allocation_Edit_Details_EQ.asp?overallot_ind=" + document.frmMain.hidAnticipateOverallotment.value;
var sStyle = "width=400,height=300,toolbar=no,menubar=no,location=no,directories=no,resizable=yes,scrollbars=no,center=yes,status=no";
openGeneralPopup( sUrl, '', sStyle );
}
function checkIf_US_Intl()
{
var frm = document.frmMain;
if (typeof(frm.InstitutionalUSAlloc) != "undefined" && typeof(frm.InstitutionalIntlAlloc) != "undefined" )
{
var InstUSAlloc = getNum(frm.InstitutionalUSAlloc);
var InstIntlAlloc = getNum(frm.InstitutionalIntlAlloc);
return (InstUSAlloc != 0 || InstIntlAlloc != 0);
}
return false;
}
function onUSIntlChange()
{
var frm = document.frmMain;
if (checkIf_US_Intl())
{ 
sumInstPotFromUSIntl();
frm.InstitutionalAlloc.disabled = true;
frm.InstitutionalAllocPct.disabled = true;
}
else
{
if (frm.InstitutionalAlloc.disabled == true)
{
frm.InstitutionalAlloc.value = 0;
}
frm.InstitutionalAlloc.disabled = false;
frm.InstitutionalAllocPct.disabled = false;
}
updateTotals();
} 
function onChangePct()
{
var frm = document.frmMain;
var lIssueSize = getNum(frm.hidIssueSize);
if (frm.hidAnticipateOverallotment.value == 1)
lIssueSize += getNum(frm.hidMaxOverallotmentQty) + getNum(frm.hidMaxUWOptionQty);
var InstAlloc = getNum(frm.InstitutionalAllocPct) * lIssueSize / 100;
InstAlloc = Math.round(InstAlloc);
frm.InstitutionalAlloc.value = formatAmountString(InstAlloc.toString());
var InstUSAlloc = getNum(frm.InstitutionalUSAllocPct) * lIssueSize / 100;
InstUSAlloc = Math.round(InstUSAlloc);
frm.InstitutionalUSAlloc.value = formatAmountString(InstUSAlloc.toString());
var InstIntlAlloc = getNum(frm.InstitutionalIntlAllocPct) * lIssueSize / 100;
InstIntlAlloc = Math.round(InstIntlAlloc);
frm.InstitutionalIntlAlloc.value = formatAmountString(InstIntlAlloc.toString());
var InstRet = getNum(frm.InstitutionalRetPct) * lIssueSize / 100;
InstRet = Math.round(InstRet);
frm.InstitutionalRet.value = formatAmountString(InstRet.toString());
onUSIntlChange();
}
function sumInstPotFromUSIntl()
{
var frm = document.frmMain;
var InstUSAlloc = getNum(frm.InstitutionalUSAlloc);
var InstIntlAlloc = getNum(frm.InstitutionalIntlAlloc);
var InstAlloc = InstUSAlloc + InstIntlAlloc;
frm.InstitutionalAlloc.value = formatAmountString(InstAlloc.toString());
}
function ToggleSection(strElem, s1, s2) 
{
var strWhichEl = eval(strElem);
var strWhichIm = eval("document.images['ImEx']");
if (strWhichEl.style.display == 'none') 
{
strWhichEl.style.display = 'block';
strWhichIm.src = "../images/collapse.gif";
ClearHeaderInfo();
if (typeof(document.all.divMessageC) != "undefined")
{
document.all.divMessageC.style.backgroundColor = gMsgBGColor;
document.all.divMessageC.style.display = "none";
}
if (typeof(document.all.divMessage) != "undefined")
{
document.all.divMessage.style.backgroundColor = gMsgBGColor;
document.all.divMessage.style.display = "none";
}
if (typeof(document.all.divMessageA) != "undefined")
{
document.all.divMessageA.style.display = "none";
}
}
else 
{
strWhichEl.style.display = 'none';
strWhichIm.src = "../images/expand.gif";
DisplayHeaderInfo();
if (typeof(document.all.divMessage) != "undefined")
{
gMsgBGColor = document.all.divMessage.style.backgroundColor;
document.all.divMessage.style.backgroundColor = "#FFFFFF";
document.all.divMessage.style.display = "block";
}
if (typeof(document.all.divMessageA) != "undefined")
{
document.all.divMessageA.style.display = "block";
}
if (typeof(document.all.divMessageC) != "undefined")
{
gMsgBGColor = document.all.divMessage.style.backgroundColor;
document.all.divMessageC.style.backgroundColor = "#FFFFFF";
document.all.divMessageC.style.display = "block";
}
}
}
function ClearHeaderInfo()
{
if (typeof(document.all.divMessageC) != "undefined")
{
document.all.divMessageC.innerText = "";
}
if (typeof(document.all.divMessage) != "undefined")
{
document.all.divMessage.innerText = "";
}
if (typeof(document.all.divMessageA) != "undefined")
{
document.all.divMessageA.innerText = "";
}
}
function DisplayHeaderInfo()
{	
if (typeof(document.all.divMessage) != "undefined")
{
document.all.divMessage.innerText = document.frmMain.LongShort.value;
document.all.divMessage.style.color = document.frmMain.hidColor.value;
}
if (typeof(document.all.divMessageA) != "undefined")
{
document.all.divMessageA.innerText = document.frmMain.TotalDeal.value;
}
if (typeof(document.all.divMessageC) != "undefined")
{
document.all.divMessageC.innerText = document.frmMain.Position.value;
document.all.divMessageC.style.color = document.frmMain.hidColor.value;
}
}
function InitInPageArrays(frm)
{
gArrRetailRet = new Array(frm.hidnSyndicateAlloc.value + 1);
gArrDirectedSh = new Array(frm.hidnSyndicateAlloc.value + 1);
gArrIndication = new Array(frm.hidnSyndicateAlloc.value + 1);
gArrInstRetn = new Array(frm.hidnSyndicateAlloc.value + 1);
for (var i=1; i<= gArrRetailRet.length; i++)
{
var iPos = i.toString();
if(typeof(frm.elements["hidRetailRet" + iPos]) != "undefined")
{
gArrRetailRet[i] = (frm.elements["hidRetailRet" + iPos].value.length == 0) ? 0 :getNum(frm.elements["hidRetailRet" + iPos]);
gArrDirectedSh[i] = (frm.elements["hidDirected" + iPos].value.length == 0) ? 0 :getNum(frm.elements["hidDirected" + iPos]);
gArrIndication[i] = (frm.elements["hidRetentionIOI" + iPos].value.length == 0) ? 0 :getNum(frm.elements["hidRetentionIOI" + iPos]);
if (frm.hidIsLehman.value=='1')
gArrInstRetn[i] = (frm.elements["hidInstRetn" + iPos].value.length == 0) ? 0 :getNum(frm.elements["hidInstRetn" + iPos]);
else
gArrInstRetn[i] = 0;
}
}
}
function onchangeDirectedShare(usePercent)
{
var frm = document.frmMain;
var dealSize = getDealSize();
if (usePercent)
{
frm.DirectedSharesAlloc.value = dealSize / 100 * getNum(frm.DirectedSharesAllocPct)
}
else
{
if (dealSize == 0)
{
frm.DirectedSharesAllocPct.value = '';
}
else
{
frm.DirectedSharesAllocPct.value = getNum(frm.DirectedSharesAlloc) / dealSize;
} 
}
if (frm.hidIsLehman.value == '1')
{
var iSyndCnt = frm.hidSynMemberCount.value;
for (var i = 1; i <= iSyndCnt;i++)
{
var elem = frm("hidSmId" + i);
var elemDirty = frm("hidSMDirtyFlag" + i);
if (elem.value == frm.hidSubSyndMemId.value)
{
elem = frm("hidDirected" + i);
elem.value = frm.DirectedSharesAlloc.value;
elemDirty.value = "1";
onUpdateAlloc(elem.name, i);
elem = frm("hidRetailRet" + i);
var iRetailRet = getNum(elem)
var iDSP = getNum(frm.DirectedSharesAlloc);
if ( iRetailRet > 0)
{
var iOldDSP = getNum(frm.oldDirectedSharesAlloc);
if (iOldDSP > 0)
elem.value = iRetailRet + iOldDSP - iDSP;
else
elem.value = iRetailRet - iDSP;
frm.oldDirectedSharesAlloc.value = iDSP;
onUpdateAlloc(elem.name, i);
setSMDirty('hidSMDirtyFlag' + i);
SetFieldDirty(elem);
}
break;
}
}
}
updateTotals();
}
function isDSP()
{
return (document.frmMain.hidIsDSP.value == 'true');
}
function SetFieldDirty(elem)
{
var elemName = elem.name;
var elemDirtyField = document.frmMain.all(elemName + "_dirty");
if (elemDirtyField)
elemDirtyField.value = 1;
}
function onPageUnload()
{
if (bChange)
{
event.returnValue = "You have made changes to the syndicate allocation page."
}
}
function UpdateWMTotalSales()
{
var oWMTotalSales = getDocumentElement("txtWMTotalSales");
if (oWMTotalSales==null)
return;
var frm = document.frmMain;
var val = getNum(frm.txtWMRetailSales) + getNum(frm.txtWMInstSales) + getNum(frm.txtWMIntlSales);
oWMTotalSales.value = (val==0) ? "" : val;
formatAmount(oWMTotalSales);
}
