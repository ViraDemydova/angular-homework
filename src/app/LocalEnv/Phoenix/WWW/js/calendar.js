<!-- 
function CheckConditionallyRequiredFields( frm, arrFieldsInError )
{
var arrMoreErrors = new Array();
var StartDate = frm.dtTxtStartDate.value;
var EndDate = frm.dtTxtCurrentDate.value;
var index = 0;
if ( StartDate == "")
{
var arrError = FieldErrorInfo("dtTxtStartDate", 'Please enter a valid Start Date', "", "dtTxtStartDate", "Start Date");
arrMoreErrors[index++] = arrError;
}
if ( EndDate == "")
{
var arrError = FieldErrorInfo("dtTxtCurrentDate", 'Please enter a valid End Date', "", "dtTxtCurrentDate", "End Date");
arrMoreErrors[index++] = arrError;	
}
if ( DateCmp( StartDate, EndDate ) == 1 )
{
var arrError = FieldErrorInfo("dtTxtCurrentDate", "Please enter a current date greater than the start date", "", "dtTxtCurrentDate", "Finish Date");
arrMoreErrors[index++] = arrError;	
}
return (arrMoreErrors);
} 
function CustomValidation( frm, arrFieldsInError )
{
var arrMoreErrors = new Array();
return (arrMoreErrors);
} 
function sortServerSide(strSortBy1, strOrder, sCalendar, sCalendarDomain){
if (strSortBy1 != "") {
document.frmMain.hidSelPrimaryOrder.value = strSortBy1; 
}
else {
if (document.frmMain.selPrimarySort.value == document.frmMain.selSecondarySort.value) {
alert("Invalid Multi-Sort Order");
return false;
} 
document.frmMain.hidSelPrimaryOrder.value = document.frmMain.selPrimarySort.value;
document.frmMain.hidSelSecondaryOrder.value = document.frmMain.selSecondarySort.value;
}
setOrder()
document.frmMain.hidCalendarValue.value = sCalendar;
document.frmMain.hidDebtEquityPermission.value = sCalendarDomain;
document.frmMain.action = "calendar.asp";
document.frmMain.submit();
}
function setOrder(){
if (document.frmMain.hidOrder.value == 'asc'){
document.frmMain.hidOrder.value = 'desc';
}
else{
document.frmMain.hidOrder.value = 'asc';
} 
}
function getDetails(page, issue_id, debtequityflag, nextPage, issue_name, issue_code,japanese_deal_ind){ 
document.frmMain.hidIssueId.value=issue_id; 
document.frmMain.hidDebtEquityFlag.value=debtequityflag;
document.frmMain.hidNextPage.value=nextPage;
document.frmMain.hidIssueName.value = issue_name;
document.frmMain.hidIssueCode.value = issue_code;
if (document.frmMain.hidJapaneseDealInd != null)
document.frmMain.hidJapaneseDealInd.value = japanese_deal_ind;
document.frmMain.action = page; 
document.frmMain.submit();
}
function getCalendar(requestedCalendar, page, sCalendarDomain){
document.frmMain.hidCalendarValue.value = requestedCalendar;
document.frmMain.hidDebtEquityPermission.value = sCalendarDomain;
document.frmMain.action = page;
document.frmMain.submit();
}
function setDebtEquityCalendar(requestedDebtEquityCal, page){
document.frmMain.hidDebtEquityPermission.value = requestedDebtEquityCal;
document.frmMain.action = page;
document.frmMain.submit();
}
function getHistoricalDeals(requestedCalendar, page, sCalendarDomain){
if (ValidateForm(document.frmMain)) {
document.frmMain.hidCalendarValue.value = requestedCalendar;
document.frmMain.hidDebtEquityPermission.value = sCalendarDomain;
document.frmMain.action = page;
document.frmMain.submit();
}
}
function popUpFilters(calendarDomain)
{
var sURL = "/aspx/UI/Calendars/CalendarFilter.aspx";
var sStyle = "width=430,height=600,toolbar=no,menubar=no,location=no,directories=no,resizable=yes,scrollbars=yes,left=50,top=50";
openGeneralPopup(sURL, "", sStyle); 
}
function getConferenceCallPopUp(IssueID, Day, CallEventID, IssueName){
var sUrl = "calendar_ConferenceCallDetail.asp?IssueID=" + IssueID + "&Day=" + Day + "&CallEventID=" + CallEventID + "&IssueName=" + escape(IssueName);
var sStyle = "width=600,height=300,scrollbars=1";
openGeneralPopup( sUrl, '', sStyle );
} 
function getRoadshowPopUp(IssueID, Day, DayEventID, Location )
{
var sUrl = "calendar_roadshowDetail.asp?IssueID=" + escape(IssueID) + 
"&Day=" + escape(Day) + 
"&DayEventID=" + escape(DayEventID) + 
"&Location=" + escape(Location);
var sStyle = "width=600,height=400,scrollbars=1";
openGeneralPopup( sUrl, '', sStyle );
} 
function getRoadshowPopUpEntireIssue(IssueID, Day, DayEventID, Location, IssueName )
{
var sUrl = "calendar_roadshowDetail.asp?IssueID=" + escape(IssueID) + 
"&Day=" + escape(Day) + 
"&DayEventID=" + escape(DayEventID) + 
"&Location=" + escape(Location) + 
"&IssueName=" + escape(IssueName);
var sStyle = "width=400,height=400,scrollbars=1";
openGeneralPopup( sUrl, '', sStyle );
}
function sortColumns( columnName){
document.frmMain.hidSortColumn1.value = columnName;
setOrder();
document.frmMain.action = document.frmMain.hidPageName.value;
if (document.frmMain.hidPageName.value == 'calendar_historical_deals_EQ.asp')
RemoveDataEntryFormats(document.frmMain)
document.frmMain.submit();
}
function ChangeHistoricalDates(debtEquityFlag)
{
if (ValidateForm(document.frmMain)) 
{
document.frmMain.action = 'calendar_historical_deals_EQ.asp';
document.frmMain.submit();
}
}
function ExportExcel(actionform)
{
document.frmMain.hidExportExcel.value = "true";
document.frmMain.action = actionform;
document.frmMain.submit();
document.frmMain.hidExportExcel.value = "";
}
function SyndConViewUpdates(iss_id)
{
var sUrl = "syndcon_view_updates_popup.asp?iss_id=" + iss_id;
var sStyle = "width=750,height=500,scrollbars=1";
openGeneralPopup( sUrl, '', sStyle );
}
function showRoadShowCalendar(el, issId)
{
var sURL = "/aspx/UI/Calendars/DateRangeCalendar.aspx?iss_id=" + issId;
var sStyle = "width=400,height=300,toolbar=no,menubar=no,location=no,directories=no,resizable=yes,scrollbars=yes,left=100,top=100";
openGeneralPopup(sURL, '', sStyle); 
}
