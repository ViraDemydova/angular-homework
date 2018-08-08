<!-- 
var	bChange = false;
var bClear = false;
var bOAChanged = false;
function onPageLoad()
{
window.onbeforeunload = onPageUnload;
bChange=false;
bClear = false;
bOAChanged = false;
}
function CheckConditionallyRequiredFields( frm, arrFieldsInError )
{
var arrMoreErrors = new Array();
var count = 0;
return (arrMoreErrors);
} 
function CustomValidation( frm, arrFieldsInError )
{
var arrMoreErrors = new Array();
var count=0;
var iQty = new Number(frm.iTxtQuantity.value);
var iOAAvail = new Number(frm.hidOAAvail.value);
if (iQty > iOAAvail)
{
var arrError = FieldErrorInfo("iTxtQuantity", 'Overallotment exercise quantity exceed the available quantity', "", "iTxtQuantity", "Exercise Quantity");
arrMoreErrors[count] = arrError;	
count++;
}	
if (frm.sTxtComments.length > 128)
{
var arrError = FieldErrorInfo("sTxtComments", 'Maximum 128 chars allowed in comments', "", "sTxtComments", "OA Comments");
arrMoreErrors[count] = arrError;	
count++;
}
return (arrMoreErrors);
} 
function submitPage( frm , action )
{
bChange=false;
switch (action)
{
case "UpdateOA":
frm.iTxtMaxOverallotment.value = stripcommas(frm.iTxtMaxOverallotment.value);
if(ValidateForm( frm ))
{
var ret = true;
if (frm.elements("chkUndo"))
{
if (frm.chkUndo.checked)
ret = confirm("You are about to rollback the most recent overallotment trade. Proceed?");
}
if (ret) 
{
frm.action = "/asp/util_submit_action.asp";
frm.hidProgID.value = "PositionManagement_usr.IssueOverAllotment";
frm.hidAction.value = "UpdateOA";
frm.submit();
}
}
break;
case "ExerciseOA":
frm.iTxtQuantity.value = stripcommas(frm.iTxtQuantity.value);
var ret=true;
if (bOAChanged)
ret=confirm("Changes in overallotment detail section will not be saved. Continue?");
if(ValidateForm( frm ))
{
if (ret)
{
frm.action = "/asp/util_submit_action.asp";
frm.hidAction.value = "Add";
frm.hidProgID.value = "PositionManagement_usr.Overallotment";
frm.submit();
}
}
break;
case "reverttosaved" :
window.location.reload();
break;
case "Cancel" :
frm.action = "/asp/PosMgnt_Position.asp?pageid=layoutsummary";
frm.submit(); 
break;
}
}
function onChangeExpirationDt()
{
var frm = document.frmMain;
var iDaysAdd = new Number(frm.selExpirationDt.value);
if (frm.hidOfferDt.value.length > 0 && iDaysAdd > 0)
{
var dt = FormatDate(frm.hidOfferDt.value, UserSettings.dateMask, "YYYY-MM-DD" );
var arrDt = dt.split("-");
var iDay = new Number(arrDt[2]);
var iMonth = new Number(arrDt[1]);
var iYear = new Number(arrDt[0]);
dt = new Date();
dt.setYear(iYear);
dt.setMonth(iMonth - 1);
dt.setDate(iDay);
dt.setDate(dt.getDate() + iDaysAdd);
iDay = dt.getDate();
iMonth = dt.getMonth() + 1;
iYear = dt.getFullYear();
dt = FormatDate(iYear + "-" + iMonth + "-" + iDay, "YYYY-MM-DD", UserSettings.dateMask);
frm.dtExpiration.value = dt;
bChange=true;
bOAChanged = true;
}
}
function formatDate2( dtDateTime )
{
var dt = dtDateTime.getFullYear() + "-";
dt += (dtDateTime.getMonth() + 1) + "-";
dt += dtDateTime.getDate();
return dt; 
}
function onMaxOverAllotmentChange()
{
var frm = document.frmMain;
var iIssueSize = frm.hidIssueSize.value;
var iMaxOA = new Number(stripcommas(frm.iTxtMaxOverallotment.value));
frm.fTxtMaxOverallotmentPct.value = formatAmountString(new String( roundDecimals( iMaxOA / iIssueSize * 100, 2)));
var iOAUsed = new Number(stripcommas(frm.hidOAUsed.value));
frm.hidOAAvail.value = formatAmountString(new String(iMaxOA - iOAUsed));
bChange=true;
bOAChanged = true;
}
function onOverAllotmentPctChange()
{
var frm = document.frmMain;
var iIssueSize = frm.hidIssueSize.value;
var fOAPct = frm.fTxtMaxOverallotmentPct.value;
var iMaxOA = roundDecimals( fOAPct * iIssueSize / 100, 0);
frm.iTxtMaxOverallotment.value = formatAmountString(new String( iMaxOA ));
var iOAUsed = new Number(stripcommas(frm.hidOAUsed.value));
frm.hidOAAvail.value = formatAmountString(new String(iMaxOA - iOAUsed));
bChange=true;
bOAChanged = true;
}
function roundDecimals( sValue, len )
{
var result1 = sValue * Math.pow(10, len);
var result2 = Math.round(result1);
var result3 = result2 / Math.pow(10, len);
return result3;
}
function stripcommas( value )
{
return value.replace(/,/g,"");
}
function AdjustOverallotment()
{
var sUrl = "syndpart_overview_adjust_overallotment.asp";
var sStyle = "directories=no,location=no,menubar=no,status=no,scrollbars=yes,width=1024,height=768,resizable=yes";
var adjustWin = open(sUrl,'AdjustOverallotment',sStyle);
adjustWin.focus();
}
function clearOAExercise()
{
var frm = document.frmMain;
frm.dtTxtExerciseDate.value = "";
frm.dtTxtSettleDate.value = "";
frm.iTxtQuantity.value = "";
frm.sTxtComments.value = "";
bClear = false;
}
function onPageUnload()
{
if (bChange && !bClear)
{
event.returnValue = "You have made changes to this page."
}
}
function backToPosMgmt()
{ 
bChange = false;
var frm = document.frmMain;
frm.action = "/asp/PosMgnt_Position.asp?pageid=layoutsummary";
frm.submit(); 
}
