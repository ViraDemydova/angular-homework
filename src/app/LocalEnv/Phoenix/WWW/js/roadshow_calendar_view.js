<!-- 
function onPageLoad()
{
var frm = document.frmRoadShowView;
var iTo = frm.hidiTo.value;
var bUseSN = frm.hidbUseSN.value;
if (String(iTo) != "")
{
for (var i=0; i < frm.selTo.options.length; i++)
{
if (Number(iTo) == Number(frm.selTo.options[i].value))
{
frm.selTo.selectedIndex = i;
break;
}
}
}
if (String(bUseSN) == "true")
frm.cbShortName.checked = true;
else
frm.cbShortName.checked = false;
if (frm.radPreference[0].checked == false && frm.radPreference[1].checked == false && frm.radPreference[2].checked == false)
frm.radPreference[0].checked = true;
}
function submitNextPage( oField, strDomain, strUrl )
{	
if(strDomain){
oField.value = strDomain
}
oField.form.action = strUrl 
oField.form.submit()	
}
function submitRequest(page, issue_id, datToday, nextPage, issue_name, issue_code, bPreMktInd)
{ 
var sPreMktInd = (bPreMktInd == 1) ? "pm" : " ";
document.frmRoadShowView.hidIssueId.value=issue_id; 
document.frmRoadShowView.hidNextPage.value=nextPage;
document.frmRoadShowView.hidIssueName.value = issue_name;
document.frmRoadShowView.hidIssueCode.value = issue_code;
document.frmRoadShowView.action = page + "?iRsIssId=" + issue_id + "&mode=" + sPreMktInd + "&RoadshowDttm=" + datToday; 
document.frmRoadShowView.submit();
}
function viewEvent(RsIssId, EventDate, EventId, bPreMktInd)
{
var sPreMktInd = (bPreMktInd == 1) ? "pm" : " ";
window.location="roadshow_event.asp?RsIssId=" + RsIssId + "&RoadshowDttm=" + EventDate + "&EventId=" + EventId + "&mode=" + sPreMktInd + "&ScheduleRoadshowDttm=" + EventDate;
}
function submitColumnSort( strColumn, page )
{
var oCurrentSortColumn = document.frmRoadShowView.hidCurrentSortColumn
var oCurrentSortOrder = document.frmRoadShowView.hidCurrentSortOrder
if( strColumn != oCurrentSortColumn.value )
{
oCurrentSortColumn.value = strColumn
oCurrentSortOrder.value = "ascending"
}
else if( oCurrentSortOrder.value == "ascending" )	
oCurrentSortOrder.value = "descending"	
else
oCurrentSortOrder.value = "ascending"
document.frmRoadShowView.action = page
document.frmRoadShowView.submit()
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
function OnSelToChanged(frm)
{
SubmitPage(frm, "Update", 0,0,"","","","",0,"");
}
function SubmitPage(frm, action, iIssID, iRSIssID, sExpenseCD, sAliasNM, sAliasCD, sDName, iEventID, sDate , bPreMktInd,sState)
{
if (ValidateForm(frm))
{
var dtFrom = frm.dtTxtFrom.value;
var dtTo = frm.selTo.options[frm.selTo.selectedIndex].value;
var bSN = frm.cbShortName.checked;
var sDir = frm.hidQueryDir.value;
switch (action)
{
case 'Update':
frm.hidSaveQuery.value = 1;
frm.action="/asp/roadshow_calendar_view.asp?dtFrom=" + escape(dtFrom) + "&dtTo=" + escape(dtTo) + "&bSN=" + escape(bSN) + "&Dir=" + escape(sDir);
frm.submit();
break;
case 'Event':
var sPreMktInd = (bPreMktInd == 1) ? "pm" :" ";
frm.action ="Roadshow_Schedule.asp?iRsIssId=" + iRSIssID + "&mode=" + sPreMktInd + "&RoadshowDttm=";
frm.submit();
break;
case 'Previous4Weeks':
dtFrom = frm.hidPreFromDate.value;
frm.action="/asp/roadshow_calendar_view.asp?dtFrom=" + escape(dtFrom) + "&dtTo=-3" + "&bSN=" + escape(bSN)+ "&View=Monthly" + "&Dir=P";
frm.submit();
break;
case 'Next4Weeks':
dtFrom = frm.hidEndDate.value;
frm.action="/asp/roadshow_calendar_view.asp?dtFrom=" + escape(dtFrom) + "&dtTo=3" + "&bSN=" + escape(bSN)+ "&View=Monthly" + "&Dir=N";
frm.submit();
break;
case 'export':
frm.action="/asp/roadshow_calendar_report.asp?dtFrom=" + escape(dtFrom) + "&dtTo=" + escape(dtTo) + "&bSN=" + escape(bSN);
frm.submit();
break;	
case 'set_current_filter':
frm.hidCurrentFilterId.value = frm.selSelectView.options[frm.selSelectView.selectedIndex].value;
frm.hidAction.value = "set_current_filter";
frm.method = "post";
frm.action = "roadshow_calendar_action.asp";
frm.submit(); 
break; 
case 'update_preference':
frm.hidAction.value = "update_preference";
frm.method = "post";
frm.action = "roadshow_calendar_action.asp";
frm.submit(); 
break;	
case 'deal_info':
var sUrl,sStyle;
if(sState == 'priced')
{
sUrl ="IssueMaint_PricingSheet.asp?p=0&issueid=" + iIssID;
sStyle = "width=700, height=500, scrollbars=1";
}
else
{
sUrl ="issuemaint_dealsketch.asp?Popup=1&issueid=" + iIssID;
sStyle = "width=500, height=400, scrollbars=1";
}
openGeneralPopup( sUrl, '', sStyle );
break;	
} 
}
}
function submitPageForLegend()
{
openGeneralPopup('Roadshow_calendar_legend_popup.asp', '', 'width=200,height=50,resizable,toolbar=no,scrollbars,menubar=no'); 
}
