<!-- 
function submitNextPage( oField, strDomain, strUrl )
{	
if(strDomain){
oField.value = strDomain
}
oField.form.action = strUrl 
oField.form.submit()	
}
function submitRequest(page, issue_id, debtequityflag, nextPage, issue_name, issue_code){ 
document.frmRoadShowTblView.hidIssueId.value=issue_id; 
document.frmRoadShowTblView.hidDebtEquityFlag.value=debtequityflag;
document.frmRoadShowTblView.hidNextPage.value=nextPage;
document.frmRoadShowTblView.hidIssueName.value = issue_name;
document.frmRoadShowTblView.hidIssueCode.value = issue_code;
document.frmRoadShowTblView.action = page; 
document.frmRoadShowTblView.submit();
}
function submitColumnSort( strColumn, page )
{
var oCurrentSortColumn = document.frmRoadShowTblView.hidCurrentSortColumn
var oCurrentSortOrder = document.frmRoadShowTblView.hidCurrentSortOrder
if( strColumn != oCurrentSortColumn.value )
{
oCurrentSortColumn.value = strColumn
oCurrentSortOrder.value = "ascending"
}
else if( oCurrentSortOrder.value == "ascending" )	
oCurrentSortOrder.value = "descending"	
else
oCurrentSortOrder.value = "ascending"
document.frmRoadShowTblView.action = page
document.frmRoadShowTblView.submit()
}
function DetailOrOverall_Roadshow(iIssueID, iDayEventID, dtStartDate, dtEndDate)
{
var hWin;
var strURL;
strURL = '/asp/Roadshow_Calendar_LocDetails.asp?IssueID=' + escape(iIssueID) + '&DayEventID=' + escape(iDayEventID) 
+ '&StartDate=' + escape(dtStartDate) + "&DayEventID=" + escape(iDayEventID) + '&EndDate=' + escape(dtEndDate)
alert(strURL);
hWin = window.open(strURL,
'RoadshowCalendarLocDetails',
'width=700,height=600,menubar=0,toolbar=0,status=0,scrollbars=1,resizable=1,dependent=1,titlebar=0,location=0,screenX=10,screenY=10');
hWin.focus(); 
}
function getRoadshowPopUp(IssueID, Day, DayEventID, Location ){
var sUrl = "calendar_roadshowDetail.asp?IssueID=" + escape(IssueID) + "&Day=" + escape(Day) + "&DayEventID=" + escape(DayEventID) + "&Location=" + escape(Location);
var sStyle = "width=480,height=320,scrollbars=1,resizable=1";
openGeneralPopup( sUrl, '', sStyle );
} 
function getAttendeePopUp(EventID){
var sUrl = "roadshow_attendee.asp?EventID=" + escape(EventID);
var sStyle = "width=480,height=320,scrollbars=1,resizable=1";
openGeneralPopup( sUrl, '', sStyle );
} 
function getConferenceCallPopUp(IssueID, Day, CallEventID, IssueName){
var sUrl = "calendar_ConferenceCallDetail.asp?IssueID=" + escape(IssueID) + "&Day=" + escape(Day) + "&CallEventID=" + escape(CallEventID) + "&IssueName=" + escape(IssueName);
var sStyle = "width=480,height=320,scrollbars=1";
openGeneralPopup( sUrl, '', sStyle );
} 
function excelExport(){
var sURL ;
sURL = "roadshow_calendar.asp?hidExcelExport=1 ";
window.open(sURL) ;
}
function ExportToExcel(){
document.frmRoadShowTblView.hidExportToExcel.value = "1";
document.frmRoadShowTblView.action = "roadshow_calendar.asp"
document.frmRoadShowTblView.submit();
document.frmRoadShowTblView.reset();	
}
