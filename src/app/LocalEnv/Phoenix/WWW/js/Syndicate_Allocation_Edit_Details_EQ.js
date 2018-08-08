<!-- 
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
function onPageLoad()
{
onUSIntlChange();
}
function checkIf_US_Intl()
{
var frm = document.frmMain;
var InstUSAlloc = getNum(frm.InstitutionalUSAlloc);
var InstIntlAlloc = getNum(frm.InstitutionalIntlAlloc);
return (InstUSAlloc != 0 || InstIntlAlloc != 0);
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
updateTotal();
}
function onChangePct()
{
var frm = document.frmMain;
var lIssueSize = getNum(frm.hidIssueSize);
if (frm.hidAnticipateOverallotment.value == 1)
lIssueSize += getNum(frm.hidMaxOverallotmentQty);
var InstAlloc = (getNum(frm.InstitutionalAllocPct) * lIssueSize) / 100;
InstAlloc = Math.round(InstAlloc);
frm.InstitutionalAlloc.value = formatAmountString(InstAlloc.toString());
var InstUSAlloc = (getNum(frm.InstitutionalUSAllocPct) * lIssueSize) / 100;
InstUSAlloc = Math.round(InstUSAlloc);
frm.InstitutionalUSAlloc.value = formatAmountString(InstUSAlloc.toString());
var InstIntlAlloc = (getNum(frm.InstitutionalIntlAllocPct) * lIssueSize) / 100 ;
InstIntlAlloc = Math.round(InstIntlAlloc);
frm.InstitutionalIntlAlloc.value = formatAmountString(InstIntlAlloc.toString());
var InstRet = (getNum(frm.InstitutionalRetPct) * lIssueSize) / 100;
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
function updateTotal()
{
var frm = document.frmMain;
var lIssueSize = getNum(frm.hidIssueSize);
if (frm.hidAnticipateOverallotment.value == 1)
lIssueSize += getNum(frm.hidMaxOverallotmentQty);
var InstAlloc = getNum(frm.InstitutionalAlloc);
var RetailAlloc = getNum(frm.RetailTotalAlloc);
var InstRet = getNum(frm.InstitutionalRet);
var TotalAlloc = InstAlloc + RetailAlloc + InstRet;
frm.TotalAlloc.value = formatAmountString(TotalAlloc.toString());
var position = lIssueSize - TotalAlloc;
frm.Position.value = formatAmountString(position.toString());
if (lIssueSize > 0)
{
var InstAllocPct = roundTo2Dec(InstAlloc / lIssueSize * 100);
frm.InstitutionalAllocPct.value = formatFixedDecimalAmountString(InstAllocPct.toString(),2);
var InstUSAllocPct = roundTo2Dec(getNum(frm.InstitutionalUSAlloc) / lIssueSize * 100);
frm.InstitutionalUSAllocPct.value = formatFixedDecimalAmountString(InstUSAllocPct.toString(),2);
var InstIntlAllocPct = roundTo2Dec(getNum(frm.InstitutionalIntlAlloc) / lIssueSize * 100);
frm.InstitutionalIntlAllocPct.value = formatFixedDecimalAmountString(InstIntlAllocPct.toString(),2);
var RetailAllocPct = roundTo2Dec(RetailAlloc / lIssueSize * 100);
frm.RetailTotalAllocPct.value = formatFixedDecimalAmountString(RetailAllocPct.toString(),2);
var RetailRetPct = roundTo2Dec(getNum(frm.RetailRetAlloc) / lIssueSize * 100);
frm.RetailRetAllocPct.value = formatFixedDecimalAmountString(RetailRetPct.toString(),2);
var DirectedPct = roundTo2Dec(getNum(frm.DirectedSharesAlloc) / lIssueSize * 100);
frm.DirectedSharesAllocPct.value = formatFixedDecimalAmountString(DirectedPct.toString(),2);
var InstRetPct = roundTo2Dec(InstRet / lIssueSize * 100);
frm.InstitutionalRetPct.value = formatFixedDecimalAmountString(InstRetPct.toString(),2);
var TotalAllocPct = roundTo2Dec(TotalAlloc / lIssueSize * 100);
frm.TotalAllocPct.value = formatFixedDecimalAmountString(TotalAllocPct.toString(),2);
}
var longShort;
var color;
if (position > 0)
{
longShort = "Long";
color = "green"
}
else if (position < 0)
{
if (frm.hidAnticipateOverallotment.value == "1")
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
}
function submitPage( frm , action)
{
switch (action)
{
case "save" :
if(ValidateForm( frm ))
{
frm.action = "/asp/util_submit_action.asp";
frm.hidAction.value = "SyndicateAllocation_EditDetails_Update";
unformatNumbersForSave();
frm.submit(); 
}
break;
case "reverttosaved" :
window.location.reload();
break;
case "cancel" :
window.close();
break;
}
}
function unformatNumbersForSave()
{
var frm = document.frmMain;
frm.InstitutionalAlloc.disabled = false;
frm.InstitutionalAlloc.value = getNum(frm.InstitutionalAlloc);
frm.InstitutionalUSAlloc.value = getNum(frm.InstitutionalUSAlloc);
frm.InstitutionalIntlAlloc.value = getNum(frm.InstitutionalIntlAlloc);
frm.InstitutionalRet.value = getNum(frm.InstitutionalRet);
}
