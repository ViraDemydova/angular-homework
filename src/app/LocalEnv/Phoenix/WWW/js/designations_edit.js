<!-- 
var g_numDecPlaces = parseFloat(document.frmMain.hidNumDecPlaces.value);
var g_DesignationsCommentsPopup;
var g_OriginalTotalDesignations = 0;
window.onunload = closeMyPopups;
function onPageLoad()
{
getAllDesignationPct(document.frmMain, 'iDesignation', 'curDesignationPct',0);
Sum(document.frmMain, 'iDesignation', document.frmMain.sumDesig);
g_OriginalTotalDesignations = new Number(document.frmMain.sumDesig.value.replace(/(\,)/g, "")); 
Sum(document.frmMain, 'curDesignationPct', document.frmMain.sumDesigPct);
Sum(document.frmMain, 'iAway', document.frmMain.sumAway);
}
function closeMyPopups()
{
if (g_DesignationsCommentsPopup != null) g_DesignationsCommentsPopup.close();
}
function CheckConditionallyRequiredFields( frm, arrFieldsInError )
{
var arrMoreErrors = new Array();
var count = 0;
var sAllocAmt = new Number(frm.hidAllocationAmt.value.replace(/(\,)/g, "")); 
var lLength = frm.hidSyndMemCount.value;
var sBusinessArea = frm.hidBusinessArea.value;
var iDesTotal = new Number(frm.sumDesig.value.replace(/(\,)/g, ""));
if (iDesTotal > 0)
{
for (var i=1; i<=lLength; i++)
{
var sDesigItem = "iDesignation" + i.toString(); 
var sCapLimitItem = "hidCapLimit" + i.toString();
if(frm.elements[sDesigItem].value != "" && frm.elements[sCapLimitItem].value != "")
{	
var lDes = new Number(frm.elements[sDesigItem].value.replace(/(\,)/g, ""));
var fltDesigPct = (lDes/sAllocAmt) * 100.00;
var fltCapLimit = new Number(frm.elements[sCapLimitItem].value.replace(/(\,)/g, ""));
var halfSharePct = 50 / sAllocAmt;
if(frm.hidBusinessArea.value == 'Syndicate')
{
if (fltDesigPct > fltCapLimit + halfSharePct){
if(!confirm("Are you sure you want overide the cap limits on this designation?") == true)
{
return;
}
}	
}
else
{
if (fltDesigPct > fltCapLimit + halfSharePct){
var arrError = FieldErrorInfo(sDesigItem, 'This Designation exceeds the Cap Limit.', "", sDesigItem, "Designation");
arrMoreErrors[count] = arrError;	
count++;
}
}
}
if(frm.hidBusinessArea.value == "Sales")
{
var sDesigItem = "iDesignation" + i.toString();
var sFixedPctItem = "hidFix" + i.toString();
if (frm.elements[sFixedPctItem].value != "" && 
((frm.elements[sDesigItem].value != "") || (iDesTotal-sAllocAmt == 0)) )
{
var fFixedPct = new Number(frm.elements[sFixedPctItem].value.replace(/(\,)/g, ""));
var fFixedQty = fFixedPct * sAllocAmt / 100;
var fDesigQty = new Number(frm.elements[sDesigItem].value.replace(/(\,)/g, ""));
if ((fDesigQty + 1) <= fFixedQty) 
{
var arrError = FieldErrorInfo(sDesigItem, 'This Designation is below the Fixed % guarantee for this Syndicate Member.', "", sDesigItem, "Designation");
arrMoreErrors[count] = arrError;	
count++;
}
}
}
}
}
if(frm.hidEqualizeMgrInd.value == "True") 
{
var lMgrCount = new Number(frm.hidMgrSyndMemCount.value.replace(/(\,)/g, "")); 
var lFirstMgrSplit = new Number(frm.iDesignation1.value.replace(/(\,)/g, ""));
var lMgrSum = 0;
var bError1Ind = false; 
for (var i=1; i<=lMgrCount; i++)
{
var sSplit = "iDesignation" + i.toString();
var lMgrSplit = new Number(frm.elements[sSplit].value.replace(/(\,)/g, "")); 
lMgrSum = lMgrSum + lMgrSplit
} 
var lRange = Math.round(lMgrSum * 0.01);
var lEqAmt = Math.round(lMgrSum/lMgrCount);
var lLowRange = lEqAmt - lRange;
var lHighRange = lEqAmt + lRange;
for (var i=1; i<=lMgrCount; i++)
{
var sSplit = "iDesignation" + i.toString();
var lMgrSplit = new Number(frm.elements[sSplit].value.replace(/(\,)/g, "")); 
if(lMgrSplit < lLowRange || lMgrSplit > lHighRange)
{
var arrError = FieldErrorInfo(sSplit, 'The Managers are not Equal.', "", sSplit, "Designation");
arrMoreErrors[count] = arrError;	
count++;	
i = lMgrCount;
}
} 
}
var sDesigItem = "iDesignation" + "1"; 
// iDesTotal != 0 ) 
if(sAllocAmt < iDesTotal)
{
var arrError = FieldErrorInfo(sDesigItem, 'The Designation total is more than 100% of the Allocation total.', "", sDesigItem, "Designation");
arrMoreErrors[count] = arrError;	
count++;	
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
zeroInputs(frm, "iDesignation");
zeroInputs(frm, "iAway");
if (warningPopUp(frm))
{
enableAway(frm); 
frm.action = "/asp/util_submit_action.asp";
frm.hidAction.value = "Add";
frm.target = "_self";
frm.submit();
} 
}
break;
case "saveapplyjump" :
jumpBallToLead(frm);
if(ValidateForm( frm ))
{ 
zeroInputs(frm, "iDesignation");
zeroInputs(frm, "iAway");
if (warningPopUp(frm))
{
frm.action = "/asp/util_submit_action.asp";
frm.hidAction.value = "Add";
frm.submit();
} 
}
break; 
case "autodesignate" :
frm.hidAutoDesignateInd.value = 1; 
frm.action = "/asp/util_submit_action.asp";
frm.hidAction.value = "SingleAutoDesignate";
frm.submit();
break;	
case "reverttosaved" :
window.location.reload();
break;
case "cancel" :
if (frm.hidPageType.value == "CapMktsR")
{
window.location = "designations_view_capmkts.asp?TrancheId="+frm.hidTrancheId.value+"&PageType="+frm.hidPageType.value+"";
}
else if (frm.hidPageType.value == "CapMktsA")
{
window.location = "designations_view_capmkts.asp?TrancheId="+frm.hidTrancheId.value+"&PageType="+frm.hidPageType.value+"";
} 
else if (frm.hidPageType.value == "Sales")
{
window.location = "designations_view_sales.asp"; 
}
else if (frm.hidPageType.value == "SalesI")
{
window.location = "designations_view_all_sales.asp"; 
}
else if (frm.hidPageType.value == "Worksheet" || frm.hidPageType.value == "WorksheetLehman" || frm.hidPageType.value == "desi_tdr_supp")
{
window.close();
} 
else
{
window.location = "designations_verification.asp?TrancheId="+frm.hidTrancheId.value+""; 
}
break;
}
}
function zeroInputs(frm, sParse)
{
var lLength = frm.hidSyndMemCount.value;
for (var i=1; i<=lLength; i++)
{
var sItem = sParse + i.toString(); 
if(frm.elements[sItem].value == "")
{ 
frm.elements[sItem].value = 0;
}
}
}
function submitColumnSort( strColumn )
{
var oCurrentSortColumn = document.frmMain.hidCurrentSortColumn
var oCurrentSortOrder = document.frmMain.hidCurrentSortOrder
if( strColumn != oCurrentSortColumn.value )
{
oCurrentSortColumn.value = strColumn
oCurrentSortOrder.value = "ascending"
}
else if( oCurrentSortOrder.value == "ascending" )	
oCurrentSortOrder.value = "descending"	
else
oCurrentSortOrder.value = "ascending"
document.frmMain.action = "designations_edit.asp";
document.frmMain.submit();
}
function gatherSMValues(frm, sParse)
{
var sList;
sList="";
var lLength = frm.hidSyndMemCount.value;
for (var i=1; i<=lLength; i++)
{
var sItem = sParse + i.toString();
if (i==1){
sList += frm.elements[sItem].value;
}
else{
sList += "," + frm.elements[sItem].value;	
}
}
return sList;
}
function Sum(frm, sParse, sumVal)
{
if ( sParse == "curDesignationPct" )
{
var sumDesig = new Number(frm.sumDesig.value.replace(/(\,)/g, ""));
var pct = 100.0 * sumDesig / parseFloat(frm.hidAllocationAmt.value);
sumVal.value = idealToFixed( pct, g_numDecPlaces );
return;
}
var sList;
sList = 0;
var lLength = frm.hidSyndMemCount.value;
for (var i=1; i<=lLength; i++)
{
var sItem = sParse + i.toString();
var iFormVal = new Number(frm.elements[sItem].value.replace(/(\,)/g, ""));
sList += iFormVal;
}
sumVal.value = formatAmountString(sList.toString());
}
function getDesignationPct(frm, sDesig, sDesigPct, iMemberPos)
{
var sDesigItem = sDesig + iMemberPos.toString();
var sDesigPctItem = sDesigPct + iMemberPos.toString();
if(frm.elements[sDesigItem].value == "")
frm.elements[sDesigPctItem].value = "";
else
{
var iDesigVal = new Number(frm.elements[sDesigItem].value.replace(/(\,)/g, ""));
var lOrderQty = new Number(frm.hidOrderQty.value.replace(/(\,)/g, ""));
var rawDesigPct = (iDesigVal/lOrderQty)*100;
frm.elements[sDesigPctItem].value = idealToFixed(rawDesigPct, 6);
}	
}
function getDesignation(frm, sDesig, sDesigPct, iMemberPos)
{
var sDesigItem = sDesig + iMemberPos.toString();
var sDesigPctItem = sDesigPct + iMemberPos.toString();
if(frm.elements[sDesigPctItem].value == "")
frm.elements[sDesigItem].value = "";
else
{	
var pctDesigPctVal = new Number(frm.elements[sDesigPctItem].value.replace(/(\,)/g, ""));
var lOrderQty = new Number(frm.hidOrderQty.value.replace(/(\,)/g, ""));
var rawDesigVal = Math.round(pctDesigPctVal * 0.01 *lOrderQty);
frm.elements[sDesigItem].value = formatAmountString(rawDesigVal.toString());
}	
}
function getAllDesignationPct(frm, sDesig, sDesigPct,bForceNew)
{
var lLength = frm.hidSyndMemCount.value;
var isNewDesig = "";
for (var i=1; i<=lLength; i++)
{	
var sDesignation = sDesig + i.toString();
if(frm.elements[sDesignation].value == "")
isNewDesig = "True"; 
else{
isNewDesig = "False"; 
i=lLength;
}
}	
var countSyndMem = 0;
var balance = 0;
var lPotSplitQty = new Number(frm.hidPotSplit.value.replace(/(\,)/g, ""));
var lSoftDollar = new Number(frm.hidSoftDollar.value.replace(/(\,)/g, ""));
if(lSoftDollar > 0)
lPotSplitQty = lPotSplitQty - lSoftDollar;
var lOrderQty = new Number(frm.hidOrderQty.value.replace(/(\,)/g, ""));
balance = Math.round(lOrderQty * (0.01 * lPotSplitQty));
for (var i=1; i<=lLength; i++)
{
var sDesigItem = sDesig + i.toString();
var sDesigPctItem = sDesigPct + i.toString();
if(bForceNew == 1) isNewDesig ="True";
if(isNewDesig == "True" && bForceNew == 1)
{ 
var sPreAgreedItem = "hidPreAgreed" + i.toString();
var pctPreAgreed = new Number(frm.elements[sPreAgreedItem].value.replace(/(\,)/g, ""));
if (pctPreAgreed > 0)
{
countSyndMem++;
frm.elements[sDesigPctItem].value = idealToFixed(pctPreAgreed, 6); 
var rawDesigVal = Math.floor(pctPreAgreed * lOrderQty * 0.01);
balance = balance - rawDesigVal;
frm.elements[sDesigItem].value = formatAmountString(rawDesigVal.toString());
}	
}
else
{
var iDesigVal = new Number(frm.elements[sDesigItem].value.replace(/(\,)/g, ""));
if(iDesigVal > 0){
var rawDesigPct = (iDesigVal/lOrderQty)*100;
frm.elements[sDesigPctItem].value = idealToFixed(rawDesigPct, 6);
}	
}
}
}
function warningPopUp(frm)
{
var retVal = true;
var i, sDesigItem;
var lLength = frm.hidSyndMemCount.value;
var sAllocAmt = new Number(frm.hidAllocationAmt.value.replace(/(\,)/g, ""));
var iSumDesignation = 0;
for (i=1; i<=lLength; i++)
{
var sDesigItem = "iDesignation" + i.toString();
iSumDesignation += new Number(frm.elements[sDesigItem].value.replace(/(\,)/g, ""));
}
if (iSumDesignation == 0 && g_OriginalTotalDesignations != 0)
{
return confirm("This is a warning to alert you that all Designation values entered are zero. If you continue saving any existing designations for this order will be removed.");
}
if (iSumDesignation > 0)
{
for (i=1; i<=lLength; i++)
{
var sDesigItem = "iDesignation" + i.toString();
var sPreAgreedItem = "hidPreAgreed" + i.toString();
var pctPreAgreed = new Number(frm.elements[sPreAgreedItem].value.replace(/(\,)/g, ""));
var rndPreAgreed = idealToFixed(pctPreAgreed, 6);
var lDesig = new Number(frm.elements[sDesigItem].value.replace(/(\,)/g, ""));
var pctDesig = (lDesig/sAllocAmt) * 100.00;
var rndDesig = idealToFixed(pctDesig, 6);
var sPotSplit = new Number(frm.hidPotSplit.value.replace(/(\,)/g, ""));
var diffVal = rndDesig - rndPreAgreed;
if(rndPreAgreed > 0 && sPotSplit != 0 && (diffVal <= -1) )
{
i=lLength;
return confirm("This is a warning to alert you that the designations entered do not agree with the recommended values. You may continue saving or close this window to adjust your values.");
} 
}
}
return retVal;
}
function jumpBallToLead(frm)
{
var sDesigTotal = new Number(frm.sumDesigPct.value.replace(/(\,)/g, ""));
var lAllocAmt = new Number(frm.hidAllocationAmt.value.replace(/(\,)/g, ""));
if(sDesigTotal < 100)
{
var sJumpBall = 100 - sDesigTotal;
if(frm.hidEqualizeMgrInd.value == "True")
{
var lNumMgrs = new Number(frm.hidMgrSyndMemCount.value.replace(/(\,)/g, ""));
var lDesTotal = new Number(frm.sumDesig.value.replace(/(\,)/g, "")); 
var lJumpBall = lAllocAmt - lDesTotal;
var lRemainder = Math.round(lJumpBall/lNumMgrs);
for (var i=1; i<=lNumMgrs; i++)
{
var sDesig = "iDesignation" + i.toString();
var lDesig = new Number(frm.elements[sDesig].value.replace(/(\,)/g, ""));
var sCapLimit = "hidCapLimit" + i.toString();
var pctCapLimit = new Number(frm.elements[sCapLimit].value.replace(/(\,)/g, ""));
var lNewTotal = lDesig + lRemainder;
var pctNewTotal = (lNewTotal/lAllocAmt) * 100;
if(pctCapLimit > 0)
{
if(pctCapLimit > pctNewTotal)
{
frm.elements[sDesig].value = formatAmountString(lNewTotal.toString());
}
else
{
var lCapLimit = Math.round(pctCapLimit * lAllocAmt * 0.01)
frm.elements[sDesig].value = formatAmountString(lCapLimit.toString());
}
}
else
{
frm.elements[sDesig].value = formatAmountString(lNewTotal.toString()); 
} 
}
Sum(frm, 'iDesignation', frm.sumDesig);
}
sDesigTotal = new Number(frm.sumDesigPct.value.replace(/(\,)/g, ""));
sJumpBall = 100 - sDesigTotal; 
var lDesig = new Number(frm.iDesignation1.value.replace(/(\,)/g, ""));
var pctDesig = (lDesig/lAllocAmt) * 100.00;
var pctCapLimit = new Number(frm.hidCapLimit1.value.replace(/(\,)/g, ""));	
if(pctCapLimit > 0)
{
if((pctCapLimit - pctDesig) > sJumpBall){
var sDesTotal = new Number(frm.sumDesig.value.replace(/(\,)/g, ""));
var sDesAmt = new Number(frm.iDesignation1.value.replace(/(\,)/g, ""));
var sAllocAmt = new Number(frm.hidAllocationAmt.value.replace(/(\,)/g, ""));
var iDiff = sAllocAmt - sDesTotal;
var sJumpDesAmt = sDesAmt + iDiff;
frm.iDesignation1.value = formatAmountString(sJumpDesAmt.toString());
}
else
{
frm.curDesignationPct1.value = idealToFixed(pctCapLimit, 6);
getDesignation(frm, "iDesignation", "curDesignationPct", 1) 
} 
}
else
{
var sDesTotal = new Number(frm.sumDesig.value.replace(/(\,)/g, ""));
var sDesAmt = new Number(frm.iDesignation1.value.replace(/(\,)/g, ""));
var sAllocAmt = new Number(frm.hidAllocationAmt.value.replace(/(\,)/g, ""));
var iDiff = sAllocAmt - sDesTotal;
var sJumpDesAmt = sDesAmt + iDiff;
frm.iDesignation1.value = formatAmountString(sJumpDesAmt.toString());
} 
Sum(frm, 'iDesignation', frm.sumDesig);
}
}
function openComments(hidCommentsPos)
{
var frm = document.frmMain;
var sUrl = "designations_comments_popup.asp?hidCommentsPos=" + hidCommentsPos;
var sStyle = "width=350,height=200,scrollbars=0,resizable=0";
g_DesignationsCommentsPopup = window.open('', 'DesigCommentsPopup', sStyle);
frm.action = sUrl;
frm.target = "DesigCommentsPopup";
frm.submit();
}
function getCommentsXML(frm)
{
var i, sXML, SMID;
sXML = "<sm_comments>";
for (i = 1; i <= parseInt(frm.hidNumSyndMem.value); i++)
{
sXML += "<sm_comment>";
SMID = frm.elements['hidSMId' + i].value;
sXML += "<sm_id>" + SMID + "</sm_id>";
sXML += "<sm_designation>" + frm.elements['iDesignation' + i].value + "</sm_designation>";
sXML += "<sm_comments_txt><![CDATA[" + frm.elements['hidComments' + i].value + "]]></sm_comments_txt>";
sXML += "</sm_comment>";
}
sXML += "</sm_comments>";
return sXML;
}
function toCharCode(str)
{
var i, l, outstr;
l = str.length;
outstr = "";
for (i = 0; i < l; i++)
{
if (outstr.length > 0)
outstr += ",";
outstr += new String(str.charCodeAt(i));
}
return outstr;
}
function ApplyRecommendedSplit()
{
ZeroDesignations(document.frmMain);
getAllDesignationPct(document.frmMain, 'iDesignation', 'curDesignationPct',1);
NormalizeDesignations(document.frmMain, 'iDesignation', 'curDesignationPct');
Sum(document.frmMain, 'iDesignation', document.frmMain.sumDesig);
Sum(document.frmMain, 'curDesignationPct', document.frmMain.sumDesigPct);
Sum(document.frmMain, 'iAway', document.frmMain.sumAway);
}
function NormalizeDesignations(frm, sDesignation, sDesignationPct)
{
var lLength = frm.hidSyndMemCount.value;
var lOrderQty = parseFloat(frm.hidAllocationAmt.value);
var arr = new Array(lLength + 1);
var arrPct = new Array(lLength + 1);
var lSum = 0;
for (var i=1; i<=lLength; i++)
{
var fldName = sDesignation + i.toString();
arr[i] = new Number(frm.elements[fldName].value.replace(/(\,)/g, ""));
lSum += arr[i];
}
if (frm.hidNonLeadInd.value == "False")
{
var lRemainder = lOrderQty - lSum;
while (lRemainder > 0)
{
var lRemainderAtStart = lRemainder;
for (var i=1; i<=lLength; i++)
{
if(arr[i] > 0)
{
arr[i] += 1;
lRemainder--;
if (lRemainder == 0)
break;
}
}
if (lRemainderAtStart == lRemainder)
break; 
}
}
for (var i=1; i<=lLength; i++)
{
var fldName = sDesignation + i.toString();
frm.elements[fldName].value = formatAmountString(arr[i].toString());
arrPct[i] = parseFloat((arr[i]/lOrderQty)*100);
}
for (var i=1; i<=lLength; i++)
{
var fldName = sDesignationPct + i.toString();
frm.elements[fldName].value = idealToFixed(arrPct[i], g_numDecPlaces);
}
}
function ZeroDesignations(frm)
{
var sDesignation = 'iDesignation';
var sDesignationPct = 'curDesignationPct';
var lLength = frm.hidSyndMemCount.value;
for (var i=1; i<=lLength; i++)
{
var fldName = sDesignation + i.toString();
frm.elements[fldName].value = '';
fldName = sDesignationPct + i.toString();
frm.elements[fldName].value = '';
}
frm.sumDesig.value = '';
frm.sumDesigPct.value = '';
}
function onChangeDesigPct(frm, pos)
{
getDesignation(frm, 'iDesignation', 'curDesignationPct', pos); 
Sum(frm, 'iDesignation', frm.sumDesig); 
Sum(frm, 'curDesignationPct', frm.sumDesigPct);
}
function onChangeDesigQty(frm, pos)
{
var sDesigItem = 'iDesignation' + pos;
formatAmount(frm.elements[sDesigItem]); 
getDesignationPct(frm, 'iDesignation', 'curDesignationPct', pos);
Sum(frm, 'iDesignation', frm.sumDesig); 
Sum(frm, 'curDesignationPct', frm.sumDesigPct);
}
function enableAway(frm)
{
var lLength = frm.hidSyndMemCount.value;
for (var i=1; i<=lLength; i++)
{
var sItem = "iAway" + i.toString();
var iFormFld = frm.elements[sItem];
iFormFld.disabled = false;
}
}
