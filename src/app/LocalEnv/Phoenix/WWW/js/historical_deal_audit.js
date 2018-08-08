<!-- 
var NUM_REPORTS = 2;
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
reportIndex[nIndex] = nIndex;
reportName[nIndex] = "Syndicate Part/Allocation Audit Report";
reportURL_EQ[nIndex] = "/rpt/HistAuditSyndPartAlloc.rpt";
sortFields[nIndex][1] = "inv_uw_cd";
sortFieldNames[nIndex][1] = "Broker Code";
sortFieldDef[nIndex][1] = "inv_uw_cd";
sortFieldDefOrder[nIndex][1] = "A";
sortFields[nIndex][2] = "inv_uw_nm";
sortFieldNames[nIndex][2] = "Broker Name";
sortFieldDef[nIndex][2] = "inv_uw_nm";
sortFieldDefOrder[nIndex][2] = "A";
sortFields[nIndex][3] = "timestamp";
sortFieldNames[nIndex][3] = "Time Stamp";
sortFieldDef[nIndex][3] = "timestamp";
sortFieldDefOrder[nIndex][3] = "A";
sortFields[nIndex][4] = "user_name_";
sortFieldNames[nIndex][4] = "User name";
sortFieldDef[nIndex][4] = "user_name_";
sortFieldDefOrder[nIndex][4] = "A";
nIndex++;
reportIndex[nIndex] = nIndex;
reportName[nIndex] = "Masterbook Audit Report";
reportURL_EQ[nIndex] = "/rpt/HistAuditMaster Book.rpt";
sortFields[nIndex][1] = "inv_uw_cd";
sortFieldNames[nIndex][1] = "Investor Code";
sortFieldDef[nIndex][1] = "inv_uw_cd";
sortFieldDefOrder[nIndex][1] = "A";
sortFields[nIndex][2] = "inv_uw_nm";
sortFieldNames[nIndex][2] = "Investor Name";
sortFieldDef[nIndex][2] = "inv_uw_nm";
sortFieldDefOrder[nIndex][2] = "A";
sortFields[nIndex][3] = "timestamp";
sortFieldNames[nIndex][3] = "Time Stamp";
sortFieldDef[nIndex][3] = "timestamp";
sortFieldDefOrder[nIndex][3] = "A";
sortFields[nIndex][4] = "user_name_";
sortFieldNames[nIndex][4] = "User name";
sortFieldDef[nIndex][4] = "user_name_";
sortFieldDefOrder[nIndex][4] = "A";
nIndex++;
addReportsToDropDown();
OnChangeReport();
ResizeViewer(document.report,180,180);
function OnChangeReport()
{
var elVersion = eval('selectReportDate');
initSort(document.frmMain.selReport.value);
elVersion.style.display='';
}
function CheckConditionallyRequiredFields( frm, arrFieldsInError )
{
var arrMoreErrors = new Array();
var count = 0;
{
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
if (getSortCode().length > 0) 
report += '&amp;bstrSortCode="' + getSortCode() + '"';
report += '&amp;lIssId="' + document.frmMain.hidIssId.value + '"';
report += '&amp;lTrnId="' + -1 + '"';
report += '&amp;bstrAuditType="' + AuditType + '"';
report += '&amp;bstrStartDate="' + document.frmMain.dtTxtStartDate.value + '"';
report += '&amp;bstrEndDate="' + document.frmMain.dtTxtEndDate.value + '"';
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
var sFromDate = document.frmMain.dtTxtStartDate.value;
var sToDate = document.frmMain.dtTxtEndDate.value;
if ((sFromDate == '') && (sToDate == ''))
{
document.frmMain.dtTxtStartDate.value = format_date(getStartDate());
document.frmMain.dtTxtEndDate.value = format_date(new Date());
}
}
