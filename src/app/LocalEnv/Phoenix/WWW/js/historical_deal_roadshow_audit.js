<!-- 
var NUM_REPORTS = 1;
var MAX_SORT_FIELDS = 10;
var reportIndex = new Array(NUM_REPORTS+1);
var reportName = new Array(NUM_REPORTS+1);
var reportURL_EQ = new Array(NUM_REPORTS+1);
var sortFields = new Array(NUM_REPORTS+1);
var sortFieldNames = new Array(NUM_REPORTS+1);
var	sortFieldDef = new Array(NUM_REPORTS+1);
var	sortFieldDefOrder = new Array(NUM_REPORTS+1);
var i, j;
var nIndex = 1;
for (i = 1;i <= NUM_REPORTS;i++)
{
sortFields[i] = new Array(MAX_SORT_FIELDS + 1);
sortFieldNames[i] = new Array(MAX_SORT_FIELDS + 1);
for (j = 1; j <= MAX_SORT_FIELDS; j++)
{
sortFields[i][j] = "";
sortFieldNames[i][j] = "";
}
sortFieldDef[i] = new Array(5);
sortFieldDefOrder[i] = new Array(5);
for (j = 1; j <= 4; j++)
{
sortFieldDef[i][j] = "";
sortFieldDefOrder[i][j] = "";
}
}
if (nIndex > NUM_REPORTS) alert ("Too many reports");
reportIndex[nIndex] = nIndex;
reportName[nIndex] = "Road Show Schedule Report";
reportURL_EQ[nIndex] = "/rpt/HistRoadshow.rpt";
nIndex++;
addReportsToDropDown();
OnChangeReport();
ResizeViewer(document.report,180,180);
function OnChangeReport()
{
}
function CheckConditionallyRequiredFields( frm, arrFieldsInError )
{
var arrMoreErrors = new Array();
var count = 0;
{
}
return arrMoreErrors;
}
function getReportURL(index)
{
var AuditType;
report = "/asp/rpt_get_report.asp?";
report += "ReportFile=" + reportURL_EQ[index];
if (document.frmMain.selReport.value == 1 )
AuditType = 'U';
else
AuditType = 'P';
{
report += '&amp;lIssId="' + document.frmMain.hidIssID.value + '"';
report += '&amp;lTrnId="' + -1 + '"'; 
}
return report;
}
function submitPage(frm, action)
{
switch (action)
{
case "GetReport" :
if (ValidateForm(frm))
{
frm.hidReportURL.value = getReportURL(frm.selReport.value);
var sw = screen.width * 0.85
var sh = screen.height * 0.85
var sStyle = "width=" + sw + ",height=" + sh + ",scrollbars=0,resizable=1,left=5,top=5";
openGeneralPopup( frm.hidReportURL.value, '', sStyle ); 
}
break;
}
}
function format_date( dtDateTime )
{
var USMDY;
USMDY = (dtDateTime.getMonth() + 1) + "/";
USMDY += dtDateTime.getDate() + "/";
USMDY += dtDateTime.getFullYear();
return FormatDate(USMDY,UserSettings.dateMask,'MM/DD/YYYY') 
}
function getStartDate(frm)
{
var now = new Date();
var day = now.getDate();
var year = now.getFullYear();
var month = now.getMonth();
year = year - 10;
return new Date(year, month, day);
}
function onPageLoad()
{
}
