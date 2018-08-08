<!-- 
var NUM_REPORTS = 27;
var MAX_SORT_FIELDS = 10;
var MAX_UPN = 1;
var reportType = new Array(NUM_REPORTS+1);
var reportIndex = new Array(NUM_REPORTS+1);
var reportName = new Array(NUM_REPORTS+1);
var reportURL_EQ = new Array(NUM_REPORTS+1);
var reportUPNCount = new Array(NUM_REPORTS+1);
var	reportUPN = new Array(NUM_REPORTS+1);
var sortFields = new Array(NUM_REPORTS+1);
var sortFieldNames = new Array(NUM_REPORTS+1);
var	sortFieldDef = new Array(NUM_REPORTS+1);
var	sortFieldDefOrder = new Array(NUM_REPORTS+1);
var brkIds ;
var subReportURL = new Array(NUM_REPORTS+1);
var subReport2URL = new Array(NUM_REPORTS+1);
var reportGroup = new Array(NUM_REPORTS+1);
var reportParam = new Array(NUM_REPORTS+1);
var paramDateRange = 1;
var paramNextWeekRange = 2;
var paramNextFourWeekRange = 3;
var paramThisWeekRange = 4;
var paramThisWeekRangeWPF = 5;
var paramNoDefDateRange = 6;
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
sortFieldDef[i] = new Array(NUM_REPORTS);
sortFieldDefOrder[i] = new Array(NUM_REPORTS);
for (j = 1; j <= NUM_REPORTS - 1; j++)
{
sortFieldDef[i][j] = "";
sortFieldDefOrder[i][j] = "";
}
reportUPNCount[i] = 0;
reportUPN[i] = new Array(MAX_UPN + 1);
for (j = 1; j <= MAX_UPN; j++)
{
reportUPN[i][j] = "";
}
reportGroup[i] = "";
reportParam[i] = 0;
subReportURL[i] = "";
subReport2URL[i] = "";
}
reportIndex[nIndex] = nIndex;
reportType[nIndex] = "Operations";
reportName[nIndex] = "NASD Quarterly Designations Report"
reportURL_EQ[nIndex] = "/rpt/NASDDesignationEQ.rpt";
reportParam[nIndex] = paramNoDefDateRange;
nIndex++;
reportIndex[nIndex] = nIndex;
reportType[nIndex] = "Operations";
reportName[nIndex] = "Non Lead Manager Receivable Report"
reportURL_EQ[nIndex] = '/rpt/NonLeadManagerEQ.rpt&amp;lType="0"';
nIndex++;
reportIndex[nIndex] = nIndex;
reportType[nIndex] = "Operations";
reportName[nIndex] = "Non Lead Manager Closed Receivable Report"
reportURL_EQ[nIndex] = '/rpt/NonLeadManagerEQClosed.rpt&amp;lType="1"';
nIndex++;
reportIndex[nIndex] = nIndex;
reportType[nIndex] = "Operations";
reportName[nIndex] = "Non Lead Missing Designations Report"
reportURL_EQ[nIndex] = "/rpt/NonLeadMissDesignEQ.rpt";
nIndex++;
reportIndex[nIndex] = nIndex;
reportType[nIndex] = "Operations";
reportName[nIndex] = "Non Lead Missing Pot Allocation Report"
reportURL_EQ[nIndex] = "/rpt/NonLeadMissPotAllocEQ.rpt";
reportParam[nIndex] = paramNoDefDateRange;
nIndex++;
reportIndex[nIndex] = nIndex;
reportType[nIndex] = "Operations";
reportName[nIndex] = "Syndicate Settlement Calendar";
reportURL_EQ[nIndex] = "/rpt/SyndicateSettlementEQ.rpt";
sortFields[nIndex][1] = "settlement_dt";
sortFieldNames[nIndex][1] = "Settlement Date";
sortFields[nIndex][2] = "client_role";
sortFieldNames[nIndex][2] = "Client Role";
sortFieldDef[nIndex][1] = "settlement_dt";
sortFieldDefOrder[nIndex][1] = "A";
sortFieldDef[nIndex][2] = "client_role";
sortFieldDefOrder[nIndex][2] = "D";
nIndex++;
reportIndex[nIndex] = nIndex;
reportType[nIndex] = "Operations";
reportName[nIndex] = "Cross Deal Open Designation";
reportURL_EQ[nIndex] = "/rpt/OpenDesignationEQ.rpt";
reportParam[nIndex] = paramNoDefDateRange;
nIndex++;
reportIndex[nIndex] = nIndex;
reportType[nIndex] = "ECM/Syndicate";
reportName[nIndex] = "OutStanding Position";
reportURL_EQ[nIndex] = "/rpt/Position.rpt";
nIndex++;
reportIndex[nIndex] = nIndex;
reportType[nIndex] = "Operations";
reportName[nIndex] = "Lock Books";
reportURL_EQ[nIndex] = "/rpt/LockBooks.rpt";
nIndex++;
reportIndex[nIndex] = nIndex;
reportType[nIndex] = "Operations";
reportName[nIndex] = "Investor Report";
reportURL_EQ[nIndex] = "/rpt/InvestorReport.rpt";
sortFields[nIndex][1] = "ACCOUNT_NAME";
sortFieldNames[nIndex][1] = "Account Name";
sortFields[nIndex][2] = "ACCOUNT_NO";
sortFieldNames[nIndex][2] = "Account Number";
sortFields[nIndex][3] = "SE_RR_CODE";
sortFieldNames[nIndex][3] = "Sales RR #";
sortFields[nIndex][4] = "SE_RR_NAME";
sortFieldNames[nIndex][4] = "Sales RR Name";
sortFields[nIndex][5] = "ST_RR_CODE";
sortFieldNames[nIndex][5] = "Sales Trader RR #";
sortFields[nIndex][6] = "ST_RR_NAME";
sortFieldNames[nIndex][6] = "Sales Trader Name";
sortFieldDef[nIndex][1] = "ACCOUNT_NAME";
sortFieldDefOrder[nIndex][1] = "A";
sortFieldDef[nIndex][2] = "ACCOUNT_NO";
sortFieldDefOrder[nIndex][2] = "A";
reportUPNCount[nIndex] = 1;
reportUPN[nIndex][1] = 'twp'
nIndex++;
reportIndex[nIndex] = nIndex;
reportType[nIndex] = "Operations";
reportName[nIndex] = "Cashier's Settlement Calendar";
reportURL_EQ[nIndex] = "/rpt/CashierSettlementEQ.rpt";
sortFields[nIndex][1] = "settlement_dt";
sortFieldNames[nIndex][1] = "Settlement Date";
sortFields[nIndex][2] = "issuer_nm";
sortFieldNames[nIndex][2] = "Issuer Name";
sortFieldDef[nIndex][1] = "settlement_dt";
sortFieldDefOrder[nIndex][1] = "A";
sortFieldDef[nIndex][2] = "issuer_nm";
sortFieldDefOrder[nIndex][2] = "A";
reportParam[nIndex] = paramThisWeekRange;
reportUPNCount[nIndex] = 1;
reportUPN[nIndex][1] = 'ml'
nIndex++;
reportIndex[nIndex] = nIndex;
reportType[nIndex] = "Operations";
reportName[nIndex] = "Override Expiration Report";
reportURL_EQ[nIndex] = "/rpt/OverrideExpireEQ.rpt";
reportParam[nIndex] = paramThisWeekRange;
nIndex++;
addReport("ML Managed & Co-Managed IPO", "YEOIPOS.RPT", "", "", "NewIssue", paramDateRange);
addReport("ML Managed & Co-Managed Non-IPO","YEONIPOS.RPT", "", "", "NewIssue", paramDateRange);
addReport("Non-Managed IPO", "YEOIPOSST.RPT", "", "", "NewIssue", paramDateRange);
addReport("Non-Managed Non-IPO", "YEONIPOSST.RPT", "", "", "NewIssue", paramDateRange);
addReport("Priced Summary", "YEOSUMM.RPT", "", "", "NewIssue", paramDateRange);
addReport("Yearly Convertible Pricing Log", "CVTYLOG.RPT", "", "", "NewIssue", paramDateRange);
addReport("Syndicate New Issue Calendar", "INTCAL.RPT", "INTCAL3.RPT", "", "NewIssue", paramNextFourWeekRange);
addReport("Syndicate Future Business Calendar", "INTCAL2.RPT", "", "", "", 0);
addReport("Weekly Equity Price & File SUM", "EquityCv.rpt", "EquitySm2.rpt", "", "NewIssue", paramThisWeekRangeWPF);
addReport("Deals in Registration (Sort Date Order)", "REGSUMM.RPT", "DLSNREG.RPT", "DLSNREG2.RPT", "NewIssue", paramDateRange);
addReport("Special Bracket", "SpecialBrackets.RPT", "", "", "NewIssue", 0);
reportIndex[nIndex] = nIndex;
reportType[nIndex] = "Operations";
reportName[nIndex] = "Exposure Worksheet";
reportURL_EQ[nIndex] = "/rpt/ExposureWorksheet.rpt";
reportParam[nIndex] = paramThisWeekRange;
reportUPNCount[nIndex] = 1;
reportUPN[nIndex][1] = 'ml'
nIndex++;
reportIndex[nIndex] = nIndex;
reportType[nIndex] = "Operations";
reportName[nIndex] = "New Issue FRB Request"
reportURL_EQ[nIndex] = "/rpt/NewIssueFRBRequestReport.rpt";
reportParam[nIndex] = paramNoDefDateRange;
reportUPNCount[nIndex] = 1;
reportUPN[nIndex][1] = 'ml'
nIndex++;
reportIndex[nIndex] = nIndex;
reportType[nIndex] = "ECM/Syndicate";
reportName[nIndex] = "Trade Summary";
reportURL_EQ[nIndex] = "/rpt/Position.rpt";
reportGroup[nIndex] = "TRD"
nIndex++;
InitCrossReportsToDropDown("ECM/Syndicate");
OnChangeReport();
ResizeViewer(document.report,180,180);
function addReport(name, url, subrpt_url, subrpt2_url, group, param)
{
if (nIndex > NUM_REPORTS) alert ("Too many reports");
else
{
reportIndex[nIndex] = nIndex;
reportType[nIndex] = "Calendar";
reportName[nIndex] = name;
reportURL_EQ[nIndex] = "/rpt/" + url;
if (subrpt_url != '')
subReportURL[nIndex] = "/rpt/" + subrpt_url;
else
subReportURL[nIndex] = "";
if (subrpt2_url != '')
subReport2URL[nIndex] = "/rpt/" + subrpt2_url;
else
subReport2URL[nIndex] = "";
reportGroup[nIndex] = group;
reportParam[nIndex] = param;
nIndex++;
}
}
function OnChangeReport()
{
var frm = document.frmMain;
if(document.frmMain.selReport.value != 26 )
ResetTrdSummaryValues();
if (frm.selReport.value == 0)
{
hideRAPDivision();
hideSelectTranchSummary();
hideSelectReportDate();
return; 
}
else
{
try
{
OnClickRAPNext();
hideBtnNext();
}
catch (e)
{
}
}
var elVersion = eval('selectReportDate'); 
var elVersionStart = eval('selectStartDateOnly'); 
var elVersionStartWPF = eval('selectReportDateWPF'); 
var elRegion = eval('selectRegion');
var elDealCode = eval('selectDealCode');
var elTradeSummaryFilter = eval('TradeSummaryFilter');	
initSort(document.frmMain.selReport.value);
if(elTradeSummaryFilter != null)
{
if(document.frmMain.selReport.value == 26)
{
elTradeSummaryFilter.style.display='';
}
else
{
elTradeSummaryFilter.style.display= 'none' ;
}
}
if (document.frmMain.selReport.value == 2 || document.frmMain.selReport.value == 3 || document.frmMain.selReport.value == 4 || document.frmMain.selReport.value == 10||document.frmMain.selReport.value == 26)
{
elVersion.style.display='none';
elVersionStart.style.display='none';
elVersionStartWPF.style.display='none';
}
else
{
elVersion.style.display='';
elVersionStart.style.display='';
elVersionStartWPF.style.display='';
}
if (document.frmMain.selReport.value == 10)
{
selectInvestor.style.display='';
}
else
selectInvestor.style.display='none';
if (document.frmMain.selReport.value == 24 && frm.selReportType.value == "Operations")
{
elDealCode.style.display = '';
}
else
{
elDealCode.style.display = 'none';
}
if (frm.selReportType.value != "Calendar")
{
elVersionStart.style.display='none';
elVersionStartWPF.style.display='none';
}
if (frm.selReportType.value == "Calendar" && (document.frmMain.selReport.value == 19 || document.frmMain.selReport.value == 20))
elRegion.style.display="";
else
elRegion.style.display="none";
document.frmMain.dtTxtStartDate.value = "";
document.frmMain.dtTxtEndDate.value = "";
if (frm.selReportType.value == "Calendar" || frm.selReportType.value == "Operations")
{
if (reportParam[document.frmMain.selReport.value] == 0)
{
elVersion.style.display='none';
elVersionStart.style.display='none';
elVersionStartWPF.style.display='none'; 
}
else if(reportParam[document.frmMain.selReport.value] == paramNextFourWeekRange)
{
elVersion.style.display='none';
elVersionStart.style.display='block';
elVersionStartWPF.style.display='none';
initDateFields(document.frmMain.selReport.value); 
}
else if(reportParam[document.frmMain.selReport.value] == paramThisWeekRangeWPF)
{	
elVersion.style.display='none';
elVersionStart.style.display='none';
elVersionStartWPF.style.display='block';
initDateFields(document.frmMain.selReport.value);	
}
else if (reportParam[document.frmMain.selReport.value] == paramNoDefDateRange)
{
elVersion.style.display='block';
elVersionStart.style.display='none';
elVersionStartWPF.style.display='none';
}
else
{
elVersion.style.display='block';
elVersionStart.style.display='none';
elVersionStartWPF.style.display='none';
initDateFields(document.frmMain.selReport.value);
}
}
if (document.frmMain.selReport.value == 9 )
{
elVersion.style.display='block';
var dtStart = getStartOfYearDate();
document.frmMain.dtTxtStartDate.value = format_date(dtStart);
document.frmMain.dtTxtEndDate.value = format_date(new Date()); 
}
if (document.frmMain.selReport.value == 6 )
{
elVersion.style.display='block';
var dtStart = new Date("January 01, 2004");
document.frmMain.dtTxtStartDate.value = format_date(dtStart);
document.frmMain.dtTxtEndDate.value = format_date(new Date()); 
}
}
function CheckConditionallyRequiredFields( frm, arrFieldsInError )
{
var arrMoreErrors = new Array();
var count = 0;
if (document.frmMain.selReport.value == 1 || document.frmMain.selReport.value == 5 )
{
if (frm.dtTxtStartDate.value == '' && frm.dtTxtStartDateOnly.value == '' && frm.dtTxtStartDateWPF.value == '')
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
if(reportGroup[index]=="TRD" && document.frmMain.selReport.value == 26)
{
AddSelectedBrokerIds();
report = "/aspx/UI/Reports/ReportViewerPopupQS.aspx?";
report += 'ReportId=TRD'; 
report += '&bstrUPN="' + document.frmMain.hidUPN.value + '"';
if(document.frmMain.txtSymbol != null)
report += '&Symbol=' + document.frmMain.txtSymbol.value ;
if(document.frmMain.txtCusip != null)
report += '&Cusip=' + document.frmMain.txtCusip.value ;
if(document.frmMain.chkRetRetention != null)
report += '&RetRetention=' + document.frmMain.chkRetRetention.checked ;
if( document.frmMain.dtTxtStartDateTrd != null && document.frmMain.dtTxtStartDateTrd.value != '')
report += '&StartDate=' + document.frmMain.dtTxtStartDateTrd.value;
if( document.frmMain.dtTxtEndDateTrd != null && document.frmMain.dtTxtEndDateTrd.value != '')
report += '&EndDate=' + document.frmMain.dtTxtEndDateTrd.value;
if(document.frmMain.txtBrokerDealerName.value != '')	
document.getElementById('hidBrkIds').value = brkIds;	
report += '&DataModel=push';
report += '&TemplateName=TradeSummaryReport.aspx';
report += '&MethodName=ListTradeSummary';
report += '&ReportType=FILE'; 
}
else 
{
report = "/asp/rpt_get_report.asp?";
report += "ReportFile=" + reportURL_EQ[index];
}
if (document.frmMain.selReport.value == 2 || document.frmMain.selReport.value == 3 || document.frmMain.selReport.value == 4)
{
if (getSortCode().length > 0) 
report += '&amp;bstrSortCode="' + getSortCode() + '"';
report += '&amp;bstrUPN="' + document.frmMain.hidUPN.value + '"';
report += '&amp;bstrStartDate="2001-05-21"';
report += '&amp;bstrEndDate="2001-05-21"';
}
else if (document.frmMain.selReport.value == 10)
{
if (getSortCode().length > 0) 
report += '&amp;bstrSortCode="' + getSortCode() + '"';
report += '&amp;bstrUPN="' + document.frmMain.hidUPN.value + '"';
report += '&amp;bstrAccountName="' + document.frmMain.txtInvNm.value + '"'; 
report += '&amp;bstrActiveCode="';
if (document.frmMain.chkActive.checked == true && document.frmMain.chkInactive.checked == true)
report += 'BOTH"';
else if (document.frmMain.chkActive.checked == true)
report += 'ACTIVE"';
else
report += 'INACTIVE"';
}
else
{
if (getSortCode().length > 0) 
report += '&amp;bstrSortCode="' + getSortCode() + '"';
report += '&amp;bstrUPN="' + document.frmMain.hidUPN.value + '"';
if ( document.frmMain.dtTxtStartDateOnly.value != '' )
{
report += '&amp;bstrStartDate="' + document.frmMain.dtTxtStartDateOnly.value + '"';
report += '&amp;bstrEndDate="' + document.frmMain.dtTxtStartDateOnly.value + '"';
}
else if( document.frmMain.dtTxtStartDateWPF.value != '' )
{
report += '&amp;bstrStartDate="' + document.frmMain.dtTxtStartDateWPF.value + '"';
report += '&amp;bstrEndDate="' + document.frmMain.dtTxtEndDateWPF.value + '"';	
}
else
{
report += '&amp;bstrStartDate="' + document.frmMain.dtTxtStartDate.value + '"';
report += '&amp;bstrEndDate="' + document.frmMain.dtTxtEndDate.value + '"';
}
if (index == 19 || index == 20)
report += '&amp;bstrRegion="' + GenerateRegionXML() + '"';
if (index == 24)
{
if(document.frmMain.txtDealCode.value != '' )
report += '&amp;bstrDealCode="' + document.frmMain.txtDealCode.value + '"';	
else
report += '&amp;bstrDealCode=""';	
}
}
return report;
}
function submitPage(frm, action)
{ 
switch (action)
{
case "GetReport" :
if (frm.selReport.value == 0)
{
alert("You must select a report.");
return;
}
if (ValidateForm(frm))
{
var rptIndex = frm.selReport.value;
frm.hidReportURL.value = getReportURL(frm.selReport.value);
if(document.frmMain.selReport.value == 26)
{
frm.action = frm.hidReportURL.value;	
frm.submit(); 
}
else
{
var sw = screen.width * 0.85;
var sh = screen.height * 0.85;
var sStyle = "width=" + sw + ",height=" + sh + ",scrollbars=0,resizable=1,left=5,top=5";
openGeneralPopup( frm.hidReportURL.value, '', sStyle ); 
if (subReportURL[rptIndex] != "" )
{
var subStyle = "width=" + sw + ",height=" + sh + ",scrollbars=0,resizable=1,left=105,top=105";
openSubReportPopup( getSubReportURL(rptIndex), '', subStyle ); 
}
if (subReport2URL[rptIndex] != "" )
{
var subStyle = "width=" + sw + ",height=" + sh + ",scrollbars=0,resizable=1,left=205,top=205";
openSubReport2Popup( getSubReport2URL(rptIndex), '', subStyle ); 
}
}
}
break;
case	"find" : 
if(frm.hidAction!=null)
{
frm.hidAction.value = action;
}
frm.action = "/asp/rpt_RAP_CrossDeal.asp";
frm.submit(); 
}
frm.hidReportURL.value = ""; 
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
year = year - 2;
return new Date(year, month, day);
}
function getStartOfYearDate()
{
var now = new Date();
var day = 1;
var year = now.getFullYear();
var month = 0;
return new Date(year, month, day);
}
function getEndDate(frm)
{
var now = new Date();
var end = new Date();
var i , nDays ;
nDays = 5 ;
for (i = 1; i <= 5 ; i++)
{
end.setTime(now.getTime() + i*24*3600*1000 ) ;
if (end.getDay() == 6 || end.getDay() == 0)
{
nDays = 7 ;
}
}
end.setTime(now.getTime() + nDays*24*3600*1000 ) ;
return end ;
}
function onPageLoad()
{
menuShow('rpt_RAP_CrossDeal', 'tophide');
var sFromDate = document.frmMain.dtTxtStartDate.value;
var sToDate = document.frmMain.dtTxtEndDate.value;
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
document.frmMain.dtTxtStartDateOnly.value = '';
document.frmMain.dtTxtStartDateWPF.value = '';
document.frmMain.dtTxtEndDateWPF.value = '';
}
else if (reportParam[rpt_index] == paramNextFourWeekRange)
{
var now = new Date();
var nextMonday = new Date(now.getFullYear(), now.getMonth(), now.getDate() - now.getDay() + 8);
document.frmMain.dtTxtStartDateOnly.value = format_date(nextMonday);
}
else if (reportParam[rpt_index] == paramThisWeekRange)
{
var now = new Date();
var ThisMonday = new Date(now.getFullYear(), now.getMonth(), now.getDate() - now.getDay() + 1 );
var ThisFriday = new Date(ThisMonday.getFullYear(), ThisMonday.getMonth(), ThisMonday.getDate() + 4 );
document.frmMain.dtTxtStartDate.value = format_date(ThisMonday);
document.frmMain.dtTxtEndDate.value = format_date(ThisFriday);
}
else if (reportParam[rpt_index] == paramThisWeekRangeWPF)
{
var now = new Date();
var ThisMonday = new Date(now.getFullYear(), now.getMonth(), now.getDate() - now.getDay() + 1 );
var ThisFriday = new Date(ThisMonday.getFullYear(), ThisMonday.getMonth(), ThisMonday.getDate() + 4 );
document.frmMain.dtTxtStartDateWPF.value = format_date(ThisMonday);
document.frmMain.dtTxtEndDateWPF.value = format_date(ThisFriday);
document.frmMain.dtTxtStartDateOnly.value = '';
}
else
{
var now = new Date();
document.frmMain.dtTxtStartDate.value = format_date(new Date(now.getFullYear(),0,1));
document.frmMain.dtTxtEndDate.value = format_date(new Date(now.getFullYear(),11,31));
document.frmMain.dtTxtStartDateWPF.value = '';
document.frmMain.dtTxtEndDateWPF.value = '';
document.frmMain.dtTxtStartDateOnly.value = '';
}
}
function getSubReportURL(index)
{
subreport = "/asp/rpt_get_report.asp?";
subreport += "ReportFile=" + subReportURL[index];
subreport += '&amp;bstrUPN="' + document.frmMain.hidUPN.value + '"';
if (reportGroup[index] == "NewIssue")
{
if ( document.frmMain.dtTxtStartDateOnly.value != '' )
{
subreport += '&amp;bstrStartDate="' + document.frmMain.dtTxtStartDateOnly.value + '"';
subreport += '&amp;bstrEndDate="' + document.frmMain.dtTxtStartDateOnly.value + '"';
}
else if( document.frmMain.dtTxtStartDateWPF.value != '' )
{
subreport += '&amp;bstrStartDate="' + document.frmMain.dtTxtStartDateWPF.value + '"';
subreport += '&amp;bstrEndDate="' + document.frmMain.dtTxtEndDateWPF.value + '"';
}
else
{
subreport += '&amp;bstrStartDate="' + document.frmMain.dtTxtStartDate.value + '"';
subreport += '&amp;bstrEndDate="' + document.frmMain.dtTxtEndDate.value + '"';
}
if (index == 18 || index == 19)
subreport += '&amp;bstrRegion="' + GenerateRegionXML() + '"';
}
return subreport;
}
function getSubReport2URL(index)
{
subreport = "/asp/rpt_get_report.asp?";
subreport += "ReportFile=" + subReport2URL[index];
subreport += '&amp;bstrUPN="' + document.frmMain.hidUPN.value + '"';
if (reportGroup[index] == "NewIssue")
{
subreport += '&amp;bstrStartDate="' + document.frmMain.dtTxtStartDate.value + '"';
subreport += '&amp;bstrEndDate="' + document.frmMain.dtTxtEndDate.value + '"';
if (index == 18 || index == 19)
subreport += '&amp;bstrRegion="' + GenerateRegionXML() + '"';
}
return subreport;
}
function openDealsInRegistration()
{
var sUrl = "/aspx/UI/Reports/DealsInRegistration.aspx";
var sStyle = "width=350,height=250,toolbar=no,menubar=no,location=no,directories=no,resizable=yes,scrollbars=yes,left=50,top=50";
var popupGeneral = window.open( sUrl, 'Dealsregistration', sStyle);
popupGeneral.focus();
}
function GenerateRegionXML()
{
var sXML = "<regions>";
if (document.frmMain.chkAmer.checked)
sXML += "<region><region_cd>AMER</region_cd></region>";
if (document.frmMain.chkAsia.checked)
sXML += "<region><region_cd>ASIA</region_cd></region>";
if (document.frmMain.chkEmea.checked)
sXML += "<region><region_cd>EMEA</region_cd></region>";
sXML += "</regions>";
return sXML;	
}
function ResetTrdSummaryValues()
{
if(document.frmMain.txtSymbol != null)
document.frmMain.txtSymbol.value = "";
if(document.frmMain.txtCusip != null)
document.frmMain.txtCusip.value = "";
if(document.frmMain.chkRetRetention != null)
document.frmMain.chkRetRetention.checked = true;
if( document.frmMain.dtTxtStartDateTrd != null)
document.frmMain.dtTxtStartDateTrd.value = "";
if( document.frmMain.dtTxtEndDateTrd != null)
document.frmMain.dtTxtEndDateTrd.value = "";	
if( document.frmMain.txtBrokerDealerName != null)	
document.frmMain.txtBrokerDealerName.value = "";
if(document.frmMain.hidTotalBrk.value > 0)
{
var elSelectBroker = eval('selectBroker');
if(elSelectBroker.style.display == '')
{
elSelectBroker.style.display= 'none';
divSearchResult.style.display = 'none';
resetBrkChkBoxes(document.frmMain, 'chkBrk', 'chkSelectAll'); 
} 
} 
}
function resetBrkChkBoxes(frm, chkBroker, chkSelectAll)
{
var chkSelectAll = (frm.elements[chkSelectAll])
var count = frm.hidTotalBrk.value;
if(chkSelectAll != null)
{
chkSelectAll.checked = false;
for(i = 1; i <= count; i++)
{
var element = chkBroker + i;
if(document.getElementById(element)!= null)
{	
document.getElementById(element).checked = false;	
}
}
}
}
function AddSelectedBrokerIds()
{
var frm = document.frmMain;
var count = frm.hidTotalBrk.value;
brkIds = "";
for(i=1; i <= count ;i++)
{
var element = "chkBrk"+ i;
if(document.getElementById(element)!= null)
{
if(document.getElementById(element).checked== true)
{
brkIds += document.getElementById(element).value + ","; 
}
}
}
}
function ChangeSelectAllCheckBoxValue(frm, chkBroker, chkSelectAll)
{
var chkSelectAll = frm.elements[chkSelectAll];
var count = frm.hidTotalBrk.value;
if(chkSelectAll != null)
{
chkSelectAll.checked = true;
for(i=1; i <= count ;i++)
{
var element = chkBroker + i ;
if(document.getElementById(element)!= null)
{
if(document.getElementById(element).checked == false)
{
chkSelectAll.checked = false ;
break;
}
}
}
}
}
function CheckUncheckAll(frm, chkBroker, chkSelectAll)
{ 
var sMode = (frm.elements[chkSelectAll].checked) ? 1 : 0;
var count = frm.hidTotalBrk.value;
for(i=1; i <= count ;i++)
{
var element = chkBroker + i;
if(document.getElementById(element)!= null)
{
if(sMode == 0)
{
document.getElementById(element).checked = false;
}
else
{
document.getElementById(element).checked = true;
}
}
}
}
