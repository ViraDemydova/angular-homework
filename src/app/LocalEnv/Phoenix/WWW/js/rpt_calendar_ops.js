<!-- 
var MAX_REPORTS = 27;
var NUM_REPORTS = MAX_REPORTS;
var MAX_SORT_FIELDS = 10;
var reportIndex = new Array(NUM_REPORTS+1);
var reportName = new Array(NUM_REPORTS+1);
var reportURL_EQ = new Array(NUM_REPORTS+1);
var reportGroup = new Array(NUM_REPORTS+1);
var reportParam = new Array(NUM_REPORTS+1);
var sortFields = new Array(NUM_REPORTS+1);
var sortFieldNames = new Array(NUM_REPORTS+1);
var sortFieldDef = new Array(NUM_REPORTS+1);
var sortFieldDefOrder = new Array(NUM_REPORTS+1);
var subReportURL = new Array(NUM_REPORTS+1);
var paramDateRange = 1;
var paramNextWeekRange = 2;
var i, j;
for (i = 1;i <= NUM_REPORTS;i++)
{
sortFields[i] = new Array(MAX_SORT_FIELDS + 1);
sortFieldNames[i] = new Array(MAX_SORT_FIELDS + 1);
for (j = 1; j <= MAX_SORT_FIELDS; j++)
{
sortFields[i][j] = "";
sortFieldNames[i][j] = "";
}
sortFieldDef[i] = new Array(NUM_REPORTS+1);
sortFieldDefOrder[i] = new Array(NUM_REPORTS+1);
for (j = 1; j < NUM_REPORTS; j++)
{
sortFieldDef[i][j] = "";
sortFieldDefOrder[i][j] = "";
}
reportGroup[i] = "";
reportParam[i] = 0;
subReportURL[i] = "";
}
var nIndex = 1;
addReport("Special Bracket Report - Deals Offered", "BRKTSUMM.RPT", "", "", 0);
addReport("Special Bracket Report - Deals in Registrn", "BRKTREG.RPT", "", "", 0);
addReport("Sort Report - Deals in Registration", "REGSORT.RPT", "", "", 0);
addReport("ML Managed & Co-Managed IPO", "YEOIPOS.RPT", "", "NewIssue", paramDateRange);
addReport("ML Managed & Co-Managed Non-IPO","YEONIPOS.RPT", "", "NewIssue", paramDateRange);
addReport("Non-Managed IPO", "YEOIPOSST.RPT", "", "NewIssue", paramDateRange);
addReport("Non-Managed Non-IPO", "YEONIPOSST.RPT", "", "NewIssue", paramDateRange);
addReport("Priced Summary", "YEOSUMM.RPT", "", "NewIssue", paramDateRange);
addReport("Deals in Registration (Alpha Week)", "REGSUMM.RPT", "", "", 0);
addReport("Deals in Registration (Dollar Size Order)", "DLSNREG.RPT", "", "", 0);
addReport("Deals in Registration (Sort Date Order)", "DLSNREG2.RPT", "", "", 0);
addReport("Deals in Registration (Recent SEC Filings)", "RCNTFILS.RPT", "", "", 0);
addReport("Convertibles Filed (Recent SEC Filings)", "CVTFILS.RPT", "", "", 0);
addReport("Common Pricing Log", "CMNPXLOG.RPT", "", "", 0);
addReport("Convertible Pricing Log", "", "", "", 0);
addReport("Yearly Convertible Pricing Log", "", "", "", 0);
addReport("Monthly Convertibles Filed", "", "", "", 0);
addReport("Monthly Common Pricing Log", "", "", "", 0);
addReport("Monthly Convertibles Pricing Log", "", "", "", 0);
addReport("Syndicate New Issue Calendar", "INTCAL.RPT", "INTCAL2.RPT", "NewIssue", paramNextWeekRange);
addReport("Syndicate Marketing New Issue Calendar", "", "", "", 0);
addReport("Syndicate Future Business Calendar", "INTCAL2.RPT", "", "", 0);
addReport("Equity Price & File Summary", "", "", "", 0);
addReport("Weekly Equity Price & File Summary", "", "", "", 0);
addReport("Invitation Report", "", "", "", 0);
addReport("Changes", "", "", "", 0);
addReport("Personnel Report", "", "", "", 0);
addReportsToDropDown();
OnChangeReport();
ResizeViewer(document.report,180,180);
function addReport(name, url, subrpt_url, group, param)
{
if (nIndex > MAX_REPORTS) alert ("Too many reports");
else
{
reportIndex[nIndex] = nIndex;
reportName[nIndex] = name;
reportURL_EQ[nIndex] = "/rpt/" + url;
if (subrpt_url != '')
subReportURL[nIndex] = "/rpt/" + subrpt_url;
else
subReportURL[nIndex] = "";
reportGroup[nIndex] = group;
reportParam[nIndex] = param;
nIndex++;
}
}
function OnChangeReport()
{
var elVersion = eval('selectReportDate');
initSort(document.frmMain.selReport.value);
if (reportParam[document.frmMain.selReport.value] == 0)
{
elVersion.style.display='none';
}
else
{
elVersion.style.display='';
initDateFields(document.frmMain.selReport.value);
}
}
function CheckConditionallyRequiredFields( frm, arrFieldsInError )
{
var arrMoreErrors = new Array();
var count = 0;
if (frm.dtTxtStartDate.value == '')
{
var arrErrors = FieldErrorInfo("", "", "", "dtTxtStartDate", "StartDate Required");
arrMoreErrors[count] = arrErrors;
count++;
}
if (frm.dtTxtEndDate.value == '')
{
var arrErrors = FieldErrorInfo("", "", "", "dtTxtEndDate", "EndDate Required");
arrMoreErrors[count] = arrErrors;
count++;
}
return arrMoreErrors;
}
function getReportURL(index)
{
report = "/asp/rpt_get_report.asp?";
report += "ReportFile=" + reportURL_EQ[index];
if (getSortCode().length > 0)
report += '&amp;bstrSortCode="' + getSortCode() + '"';
report += '&amp;bstrUPN="' + document.frmMain.hidUPN.value + '"';
if (reportGroup[index] == "NewIssue")
{
report += '&amp;bstrStartDate="' + document.frmMain.dtTxtStartDate.value + '"';
report += '&amp;bstrEndDate="' + document.frmMain.dtTxtEndDate.value + '"';
}
return report;
}
function getSubReportURL(index)
{
subreport = "/asp/rpt_get_report.asp?";
subreport += "ReportFile=" + subReportURL[index];
subreport += '&amp;bstrUPN="' + document.frmMain.hidUPN.value + '"';
if (reportGroup[index] == "NewIssue")
{
subreport += '&amp;bstrStartDate="' + document.frmMain.dtTxtStartDate.value + '"';
subreport += '&amp;bstrEndDate="' + document.frmMain.dtTxtEndDate.value + '"';
}
return subreport;
}
function submitPage(frm, action)
{
switch (action)
{
case "GetReport" :
if (ValidateForm(frm))
{
var rptIndex = frm.selReport.value;
frm.hidReportURL.value = getReportURL(rptIndex);
var sw = screen.width * 0.85
var sh = screen.height * 0.85
var sStyle = "width=" + sw + ",height=" + sh + ",scrollbars=0,resizable=1,left=5,top=5";
openGeneralPopup( frm.hidReportURL.value, '', sStyle ); 
var subStyle = "width=" + sw + ",height=" + sh + ",scrollbars=0,resizable=1,left=105,top=105";
if (subReportURL[rptIndex] != "" )
{
openSubReportPopup( getSubReportURL(rptIndex), '', subStyle ); 
}
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
function initDateFields(rpt_index)
{
if (reportParam[rpt_index] == paramNextWeekRange)
{
var now = new Date();
var nextMonday = new Date(now.getFullYear(), now.getMonth(), now.getDate() - now.getDay() + 8);
var nextFriday = new Date(nextMonday.getFullYear(), nextMonday.getMonth(), nextMonday.getDate() + 4);
document.frmMain.dtTxtStartDate.value = format_date(nextMonday);
document.frmMain.dtTxtEndDate.value = format_date(nextFriday);
}
else
{
var now = new Date();
document.frmMain.dtTxtStartDate.value = format_date(new Date(now.getFullYear(),0,1));
document.frmMain.dtTxtEndDate.value = format_date(new Date(now.getFullYear(),11,31));
}
}
