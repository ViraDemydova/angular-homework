<!-- 
var g_NextObj;
var gMsgBGColor;
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
var lMaxOverallotmentQty = getNum(frm.hidMaxOverallotmentQty);
var lMaxUWOptionQty = getNum(frm.hidMaxUWOptionQty);
var lTotalDeal;
lTotalDeal = lIssueSize + lMaxOverallotmentQty + lMaxUWOptionQty;
return lTotalDeal;
}
function getAnticipatedDealSize()
{
var frm = document.frmMain;
if (frm.hidAnticipateOverallotment.value == "True")
return getDealSizeWithOverallotment();
else
return getDealSize();
}
function updateTotals()
{
var i;
var frm = document.frmMain;
var lTotalDeal = getAnticipatedDealSize();
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
frm.InstitutionalUSAllocPct.value = formatFixedDecimalAmountString(instUSAllocPct.toString(),2);
frm.InstitutionalIntlAllocPct.value = formatFixedDecimalAmountString(instIntlAllocPct.toString(),2);
var RetailRetPct = roundTo2Dec(getNum(frm.RetailRetAlloc) / lTotalDeal * 100);
frm.RetailRetAllocPct.value = formatFixedDecimalAmountString(RetailRetPct.toString(),2);
var DirectedPct = roundTo2Dec(getNum(frm.DirectedSharesAlloc) / lTotalDeal * 100);
frm.DirectedSharesAllocPct.value = formatFixedDecimalAmountString(DirectedPct.toString(),2);
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
var position = getAnticipatedDealSize() - (totalRetail + instAlloc + instRet);
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
if (frm.hidAnticipateOverallotment.value == "True")
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
if (frm.hidAnticipateOverallotment.value == "True")
{
hideNaked(true);
}
else
{
hideNaked(false);
var nakedPos = getDealSizeWithOverallotment() - (totalRetail + instAlloc + instRet);
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
}
function updateSMTotals()
{
var frm = document.frmMain;
var totalRetailForIssue = 0;
var totalRetailForIssueNoDSP = 0;
totalRetailForIssue += getNum(frm.hidOtherTranchesRetailTot);
if (isDSP())
totalRetailForIssueNoDSP += getNum(frm.hidOtherTranchesRetailTot) + getNum(frm.DirectedSharesAlloc);
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
function onUpdateAlloc(sElement)
{
var newNum = getNum(document.frmMain.elements[sElement]);
document.frmMain.elements[sElement].value = formatAmountString(newNum.toString());
updateTotals();
if (typeof(g_NextObj) != "undefined")
g_NextObj.focus(); 
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
updateTotals();
}
function onPageLoad()
{
setTimeout("onPageLoad2();",1); 
}
function onPageLoad2()
{
hideInstRet(false);
if (checkIf_US_Intl())
{
document.frmMain.InstitutionalAlloc.disabled = true;
document.frmMain.InstitutionalAllocPct.disabled = true;
}
updateTotals();
}
function CheckConditionallyRequiredFields( frm, arrFieldsInError )
{
var arrMoreErrors = new Array();
return (arrMoreErrors);
} 
function CustomValidation( frm, arrFieldsInError )
{
var arrMoreErrors = new Array();
return (arrMoreErrors);
} 
function submitPage( frm , action, trancheIDtoUpdate )
{
switch (action)
{
case "savechanges" :
if(ValidateForm( frm ))
{
if (isDSP())
{
frm.DirectedSharesAlloc.value = getNum(frm.DirectedSharesAlloc);	
} 
frm.action = "/asp/util_submit_action.asp";
frm.hidAction.value = "SyndAllocFromMasterBook_Update";
unformatNumbersForSave();
frm.submit();
}
break;
case "cancel" :
window.close();
}
}
function unformatNumbersForSave()
{
var frm = document.frmMain;
frm.InstitutionalAlloc.disabled = false;
frm.InstitutionalAlloc.value = getNum(frm.elements['InstitutionalAlloc']);
frm.elements['hidInstitutionalRet'].value = getNum(frm.elements['hidInstitutionalRet']);
if (typeof(frm.InstitutionalUSAlloc) != "undefined" && typeof(frm.InstitutionalIntlAlloc) != "undefined")
{
frm.InstitutionalUSAlloc.value = getNum(frm.elements['InstitutionalUSAlloc']);
frm.InstitutionalIntlAlloc.value = getNum(frm.elements['InstitutionalIntlAlloc']);
}
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
function blankZeroNum(num)
{
if (num == 0)
return "";
else
return num.toString();
}
function locatorWin() 
{
var lwin = window.open('find_on_page.asp','findit','height=60,width=250,toolbar=no,directories=no,status=no,menubar=no,scrollbars=no,resizable=no'); 
lwin.moveTo(0,0); 
lwin.focus();
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
if (frm.hidAnticipateOverallotment.value == "True")
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
updateTotals();
}
function isDSP()
{
return (document.frmMain.hidIsDSP.value == 'true');
}
