<!-- 
function onPageLoad()
{
if (!window.opener.closed && window.opener.document.frmMainOA.hidKeepChildWindowsOpen)
{
if (window.opener.document.frmMainOA.hidKeepChildWindowsOpen.value == "1")
{
window.opener.location.reload();
}
}
}
function CheckConditionallyRequiredFields( frm, arrFieldsInError )
{
var arrMoreErrors = new Array();
var Quantity = frm.iTxtQuantity.value;
var ExerciseDate = frm.dtTxtExerciseDate.value;
var SettleDate = frm.dtTxtSettleDate.value;
if ( Quantity == '' || ExerciseDate == '' || SettleDate == '' ){
var arrError = FieldErrorInfo("iTxtQuantity", 'Please fill out all trade information fields', "", "", "Overallotment Trades");
arrMoreErrors[0] = arrError;
}
return (arrMoreErrors);
}
function CustomValidation( frm, arrFieldsInError )
{
var arrMoreErrors = new Array();
return (arrMoreErrors);
} 
function submitPage( frm , action, sMessage )
{
switch (action)
{
case "savechanges" :
var iCurrPos = new Number (frm.hidCurrPosition.value);
var iInitPos = new Number (frm.hidInitialPosition.value);
var iCurrOverallotment = new Number (frm.hidCurrOverallotment.value);
var iAvail = new Number (frm.hidCurrAvailable.value);
var sAddPos = frm.iTxtQuantity.value;
var	iAddPos = new Number (sAddPos.replace(/,/g,""));
if (isNaN(iCurrPos))	iCurrPos = 0;
if (isNaN(iInitPos))	iInitPos = 0;
if ((iCurrPos < 0) && (Math.abs(iCurrPos) < (iCurrOverallotment + iAddPos)) && (Math.abs(iInitPos) < (iCurrOverallotment + iAddPos)))
{
var iDiff = new Number(Math.abs(iCurrPos));
alert("Overallotment total exercised cannot exceed current short position balance <" + formatAmountString(iDiff.toString()) + ">. ");
}
else 
{ 
if (iAddPos > iAvail)
{
alert("Overallotment total exercised cannot exceed overallotment available <" + formatAmountString(iAvail.toString()) + ">. ");
}
else
{
iCurrOverallotment += iAddPos;
frm.hidCurrOverallotment.value = iCurrOverallotment.toString();
if(ValidateForm( frm ))
{
frm.action = "/asp/util_submit_action.asp";
frm.hidAction.value = "Add";
frm.submit(); 
}
}
} 
if (!window.opener.closed && window.opener.document.frmMainOA.hidKeepChildWindowsOpen)
window.opener.document.frmMainOA.hidKeepChildWindowsOpen.value = "1";
break; 
case "adjustOverallotment":
AdjustOverallotment();
break;
case "UndoExercise":
UndoExerciseOverallotment( frm, sMessage, "1", 1 );
break;
}
}
function cancel(){
self.close();
self.window.opener.location.reload();
self.window.opener.focus();
}
