<!-- 
function SaveOverallotment( frm )
{
if ( ValidateForm( frm ) )
{
frm.action = "/asp/util_submit_action.asp";
frm.hidAction.value = "Update";
frm.submit(); 
} 
}
function UndoExerciseOverallotment( frm, sMessage, sKeepChildWindowsOpen, isPopup )
{
if ( confirm(sMessage) )
{
if (isPopup)
{
var win = window.opener;
if ( win && !win.closed && win.document.frmMainOA.hidKeepChildWindowsOpen ) 
win.document.frmMainOA.hidKeepChildWindowsOpen.value = sKeepChildWindowsOpen;
}
frm.action = "/asp/posmgnt_undo_last_overallotment.asp?iss_id=" + frm.hidIssueID.value;
frm.submit();
}
}
function popUpOverallotment(lIssueID, iUseQuantityInd)
{
var sUrl = "PosMgnt_Overallotment.asp?lIssueID=" + lIssueID + "&iUseQtyInd=" + iUseQuantityInd;
var sStyle = "width=450,height=280,resizable=yes";
openGeneralPopup( sUrl, '', sStyle );
}
function AdjustOverallotment()
{
var sUrl = "syndpart_overview_adjust_overallotment.asp";
var sStyle = "directories=no,location=no,menubar=no,status=no,scrollbars=yes,width=1024,height=768,resizable=yes";
var adjustWin = open(sUrl,'AdjustOverallotment',sStyle);
adjustWin.focus();
}
function closePopups()
{
if (document.frmMainOA.hidKeepChildWindowsOpen.value == "1")
{
document.frmMainOA.hidKeepChildWindowsOpen.value = "";
}
else
{
if( popupError!=null ) popupError.close();
if( popupCalendar != null ) popupCalendar.close();
if( popupGeneral != null ) popupGeneral.close();
if( popupHelp != null ) popupHelp.close();
}
}
