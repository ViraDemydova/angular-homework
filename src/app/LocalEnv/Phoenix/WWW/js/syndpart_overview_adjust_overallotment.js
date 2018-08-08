<!-- 
var g_SM_TrnID = new Array();
var g_SM_SmID = new Array();
var g_SM_OAQty = new Array();
var g_SM_OCQty = new Array(); 
var g_SM_UWGID = new Array();
var g_NumSM = 0;
var g_Trn_TrnID = new Array();
var g_Trn_OriginalOAQty = new Array();
var g_Trn_TrnSize = new Array();
var g_NumTrn = 0;
var g_FirstOAField = new Array();
function submitPage( frm , action )
{
var iLen = frm.elements.length;
var sTrancheId = "";
var sXmlData, sName, sTemp;
var bTrancheTagOpen = false;
var sArray, sQty, sAmt;
sXmlData = "<adjustoverallotment>";
sXmlData += "<iss_id>" + frm.hidIssueID.value + "</iss_id>"
sXmlData += "<non_lead_ind>" + frm.hidNonLeadInd.value + "</non_lead_ind>"
switch (action)
{
case "SaveChanges" :
if(ValidateForm( frm ))
{
for (var i=0; i < iLen; i++)
{
sName = frm.elements[i].name;
if (sName.charAt(0) == 'Z')
{
sTemp = sName.substring(1);
sArray = sTemp.split("_");
if (sArray[0] != sTrancheId)
{
sTrancheId = sArray[0];
if (bTrancheTagOpen)
sXmlData += "</tranche>";
sXmlData += "<tranche><trn_id>" + sArray[0] + "</trn_id>";
bTrancheTagOpen = true;
}
sXmlData += "<syndicatemember><sm_id>" + sArray[1] + "</sm_id>";
var str1 = new String(frm.elements[i].value);
var str2 = str1.replace(/k/g, "000");
var str3 = str2.replace(/mm/g, "000000");
var val = new Number(str3.replace(/(\,)/g, ""));
var sVal = "0";
if (isNaN(val) || val == 0)
{
sVal = "0";
}
else
{
sVal = val.toString(); 
}
if (frm.hidUseQtyInd.value == "True")
{
sQty = sVal;
sAmt = "0";
}
else
{
sQty = "0";
sAmt = sVal;
}
sXmlData += "<overallotment_qty>" + sQty + "</overallotment_qty>";
sXmlData += "<overallotment_amt>" + sAmt + "</overallotment_amt>";
sXmlData += "</syndicatemember>";
}
}
if (bTrancheTagOpen)
sXmlData += "</tranche>";
sXmlData += "</adjustoverallotment>";
frm.xmlData.value = sXmlData;
frm.method = "POST"; 
frm.action = "util_submit_action.asp";
frm.submit(); 
}
break;
}
} 
function onPageLoad()
{
var frm = document.frmMain;
var iLen = frm.elements.length;
var sTrancheId = "";
var sXmlData, sName, sTemp;
var bTrancheTagOpen = false;
var sArray, sQty, sAmt;
for (var i=0; i < iLen; i++)
{
sName = frm.elements[i].name;
if (sName.charAt(0) == 'Z')
{
sTemp = sName.substring(1);
sArray = sTemp.split("_");
g_SM_TrnID[g_NumSM] = sArray[0];
g_SM_SmID[g_NumSM] = sArray[1];
g_SM_UWGID[g_NumSM] = sArray[2];
g_SM_OAQty[g_NumSM] = new Number((frm.elements[i].value).replace(/(\,)/g, ""));
g_SM_OCQty[g_NumSM] = parseFloat(frm.elements['OC'+g_SM_SmID[g_NumSM]].value);
if (isNaN(g_SM_OAQty[g_NumSM]))
g_SM_OAQty[g_NumSM] = 0;
g_NumSM++;
if (g_NumTrn == 0)
{
g_Trn_TrnID[g_NumTrn] = sArray[0];
g_FirstOAField[g_NumTrn] = sName;
g_Trn_OriginalOAQty[g_NumTrn] = new Number((frm.elements['OATot'+g_Trn_TrnID[g_NumTrn]].value).replace(/(\,)/g, ""));
g_Trn_TrnSize[g_NumTrn] = new Number(frm.elements['hidTrnSize'+g_Trn_TrnID[g_NumTrn]].value);
g_NumTrn++;
}
else if (g_Trn_TrnID[g_NumTrn-1] != sArray[0])
{
g_Trn_TrnID[g_NumTrn] = sArray[0];
g_FirstOAField[g_NumTrn] = sName;
g_Trn_OriginalOAQty[g_NumTrn] = new Number((frm.elements['OATot'+g_Trn_TrnID[g_NumTrn]].value).replace(/(\,)/g, ""));
g_Trn_TrnSize[g_NumTrn] = new Number(frm.elements['hidTrnSize'+g_Trn_TrnID[g_NumTrn]].value);
g_NumTrn++;
}
}
}
var fSum = 0;
for (var i=0; i < g_NumSM; i++)
{
fSum += parseFloat(g_SM_OAQty[i]);
}
for (var i=0; i < g_NumTrn; i++)
{
UpdateTrancheBalance(g_Trn_TrnID[i], g_Trn_OriginalOAQty[i]);
}
}
function onChangeSMOA(sm_id, fld)
{
var frm = document.frmMain;
formatAmount(fld);
var newVal = new Number((fld.value).replace(/(\,)/g, ""));
if (isNaN(newVal))
newVal = 0;
var trn_id;
var uwg_id;
var smIndex = 0;
for (var i=0; i < g_NumSM; i++)
{
if (g_SM_SmID[i] == sm_id) 
{
g_SM_OAQty[i] = parseFloat(newVal);
trn_id = g_SM_TrnID[i];
uwg_id = g_SM_UWGID[i];
smIndex = i;
break;
}
}
var newCommitment = parseFloat(g_SM_OCQty[smIndex]) + parseFloat(g_SM_OAQty[smIndex]);
frm.elements['CWO'+sm_id].value = formatAmountString(newCommitment.toString());
var trn_OATot = 0;
var trn_CWOTot = 0;
for (var j=0; j < g_NumSM; j++)
{
if (g_SM_TrnID[j] == trn_id)
{
trn_OATot += g_SM_OAQty[j];
trn_CWOTot += g_SM_OAQty[j] + g_SM_OCQty[j];
}
}
frm.elements['OATot'+trn_id].value = formatAmountString(trn_OATot.toString());
frm.elements['CWO'+trn_id].value = formatAmountString(trn_CWOTot.toString());
UpdateTrancheBalance(trn_id, trn_OATot);
var uwg_CWOTot = 0;
for (var j=0; j < g_NumSM; j++)
{
if (g_SM_UWGID[j] == uwg_id)
uwg_CWOTot += g_SM_OAQty[j]+g_SM_OCQty[j];
}
frm.elements['CWO'+uwg_id].value = formatAmountString(uwg_CWOTot.toString());
var trnIndex;
for (var j=0; j < g_NumTrn; j++)
{
if (trn_id == g_Trn_TrnID[j])
{
trnIndex = j;
break;
}
}
frm.elements['Pct'+uwg_id].value = idealToFixed(uwg_CWOTot / g_Trn_TrnSize[trnIndex] * 100,2);
for (var j=0; j < g_NumSM; j++)
{
if (g_SM_UWGID[j] == uwg_id)
{
var tempCommitment = g_SM_OAQty[j]+g_SM_OCQty[j];
frm.elements['Pct'+g_SM_SmID[j]].value = idealToFixed(tempCommitment / uwg_CWOTot * 100,2);
}
}
} 
function UpdateTrancheBalance(TrnID, OA)
{
document.frmMain.elements['TBOD' + TrnID].value = formatAmountString(OA.toString());
for (var i=0; i < g_NumTrn; i++)
{
if (TrnID == g_Trn_TrnID[i])
{
var bal = parseFloat(g_Trn_OriginalOAQty[i]) - parseFloat(OA);
if (bal == 0)
{
document.frmMain.elements['TBBAL1' + TrnID].value = document.frmMain.hidRC_BALANCED.value;
document.frmMain.elements['TBBAL2' + TrnID].value = '';
}
else
{
document.frmMain.elements['TBBAL1' + TrnID].value = document.frmMain.hidRC_BALANCED.value + ':';
if (bal > 0)
document.frmMain.elements['TBBAL2' + TrnID].value = document.frmMain.hidRC_LONG.value +' ' + formatAmountString(bal.toString());
else
document.frmMain.elements['TBBAL2' + TrnID].value = document.frmMain.hidRC_SHORT.value +' ' + formatAmountString((-bal).toString());
}
break;
}
}
}
function CheckConditionallyRequiredFields( frm, arrFieldsInError )
{
var arrMoreErrors = new Array();
var count = 0;
for (var i=0; i < g_NumTrn; i++)
{
var trn_OATot = 0;
for (var j=0; j < g_NumSM; j++)
{
if (g_SM_TrnID[j] == g_Trn_TrnID[i])
{
trn_OATot += g_SM_OAQty[j];
}
}
if (trn_OATot != g_Trn_OriginalOAQty[i])
{
var arrError = FieldErrorInfo(g_FirstOAField[i], 'Total overallotment distributed to syndicate members must equal total overallotment exercised. Please re-enter distribution so the totals are balanced.', "", g_FirstOAField[i], "Overallotment");
arrMoreErrors[count] = arrError;	
count++;	
} 
}
return (arrMoreErrors);
} 
