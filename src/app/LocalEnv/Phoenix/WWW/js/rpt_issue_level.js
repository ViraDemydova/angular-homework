<!-- 
var MAX_REPORTS = 505;
var NUM_REPORTS = MAX_REPORTS;
var MAX_SORT_FIELDS = 10;
var MAX_UPN = 1
var reportIndex = new Array(NUM_REPORTS+1);
var reportType = new Array(NUM_REPORTS+1);
var reportName = new Array(NUM_REPORTS+1);
var reportURL_EQ = new Array(NUM_REPORTS+1);
var reportURL_FI = new Array(NUM_REPORTS+1);
var reportGroup = new Array(NUM_REPORTS+1);
var reportUPNCount = new Array(NUM_REPORTS+1);
var	reportUPN = new Array(NUM_REPORTS+1);
var sortFields = new Array(NUM_REPORTS+1);
var sortFieldNames = new Array(NUM_REPORTS+1);
var	sortFieldDef = new Array(NUM_REPORTS+1);
var	sortFieldDefOrder = new Array(NUM_REPORTS+1);
var versiontype = new Array(NUM_REPORTS+1);
var reportSalesRegion = new Array(NUM_REPORTS+1);
var i, j;
var nIndex = 1;
var nMainReportIndex = 0;
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
reportUPNCount[i] = 0;
reportUPN[i] = new Array(MAX_UPN + 1);
for (j = 1; j <= MAX_UPN; j++)
{
reportUPN[i][j] = "";
}
versiontype[i] = 0;	
reportSalesRegion[i] = "" ;
}
if (nIndex > MAX_REPORTS) alert ("Too many reports");
reportIndex[nIndex] = nIndex;
reportType[nIndex] = "ECM/Syndicate";
reportName[nIndex] = "Pot Indication-Allocation Report";
reportURL_EQ[nIndex] = "/rpt/IndAllocECM.rpt";
reportURL_FI[nIndex] = "";
reportGroup[nIndex] = "ITShort";
sortFields[nIndex][1] = "ii_name";
sortFieldNames[nIndex][1] = "Account";
sortFields[nIndex][2] = "oi_ioi_qty";
sortFieldNames[nIndex][2] = "Indication";
sortFields[nIndex][3] = "eo_inst_alloc_qty";
sortFieldNames[nIndex][3] = "Allocation";
sortFieldDef[nIndex][1] = "ii_name";
sortFieldDefOrder[nIndex][1] = "A";
versiontype[nIndex] = -1; 
reportSalesRegion[nIndex] = "Y" ;
nMainReportIndex = nIndex;
nIndex++;
if (nIndex > MAX_REPORTS) alert ("Too many reports");
reportIndex[nIndex] = nIndex;
reportType[nIndex] = "ECM/Syndicate";
reportName[nIndex] = "Pot Indication-Allocation";
reportURL_EQ[nIndex] = "/rpt/IndAllocECM.rpt";
reportURL_FI[nIndex] = "";
reportGroup[nIndex] = "ITShort";
sortFields[nIndex][1] = "ii_name";
sortFieldNames[nIndex][1] = "Account";
sortFields[nIndex][2] = "oi_ioi_qty";
sortFieldNames[nIndex][2] = "Indication";
sortFields[nIndex][3] = "eo_inst_alloc_qty";
sortFieldNames[nIndex][3] = "Allocation";
sortFieldDef[nIndex][1] = "ii_name";
sortFieldDefOrder[nIndex][1] = "A";
versiontype[nIndex] = nMainReportIndex;
reportSalesRegion[nIndex] = "Y" ;
nIndex++;
if (nIndex > MAX_REPORTS) alert ("Too many reports");
reportIndex[nIndex] = nIndex;
reportType[nIndex] = "ECM/Syndicate";
reportName[nIndex] = "Pot Indication-Allocation Report with %";
reportURL_EQ[nIndex] = "/rpt/IndAllocECMwPecent.rpt";
reportURL_FI[nIndex] = "";
reportGroup[nIndex] = "ITShort";
sortFields[nIndex][1] = "ii_name";
sortFieldNames[nIndex][1] = "Account";
sortFields[nIndex][2] = "oi_ioi_qty";
sortFieldNames[nIndex][2] = "Indication";
sortFields[nIndex][3] = "eo_inst_alloc_qty";
sortFieldNames[nIndex][3] = "Allocation";
sortFieldDef[nIndex][1] = "ii_name";
sortFieldDefOrder[nIndex][1] = "A";
versiontype[nIndex] = nMainReportIndex;
reportSalesRegion[nIndex] = "Y" ;
nIndex++;
if (nIndex > MAX_REPORTS) alert ("Too many reports");
reportIndex[nIndex] = nIndex;
reportType[nIndex] = "ECM/Syndicate";
reportName[nIndex] = "Indication Percentage by Broker";
reportURL_EQ[nIndex] = "/aspx/UI/reports/ReportViewerPopupQS.aspx";
reportURL_FI[nIndex] = "";
versiontype[nIndex] = 0;
reportGroup[nIndex] = "IndicationPercentagebyBroker";
reportUPNCount[nIndex] = 1;
reportUPN[nIndex][1] = 'ml'
nIndex++; 
var displayRoadshow = false;
if (document.frmMain.hidRsEqType != null)
{
if (document.frmMain.hidRsEqType.value == "1" || document.frmMain.hidRsEqType.value == "2")
{
displayRoadshow = true;
}
}
var displayiPlanner = false;
if (document.frmMain.hidiPlanner != null)
{
if (document.frmMain.hidiPlanner.value == "true")
{
displayiPlanner = true;
}
}
if (displayRoadshow)
{
if (nIndex > MAX_REPORTS) alert ("Too many reports");
reportIndex[nIndex] = nIndex;
reportType[nIndex] = "ECM/Syndicate";
reportName[nIndex] = "Pot Indication-Allocation Report with Roadshow";
reportURL_EQ[nIndex] = "/rpt/EarningsReportEQ.rpt";
reportURL_FI[nIndex] = "";
reportGroup[nIndex] = "ITShort";
sortFields[nIndex][1] = "ii_name";
sortFieldNames[nIndex][1] = "Account";
sortFields[nIndex][2] = "oi_ioi_qty";
sortFieldNames[nIndex][2] = "Indication";
sortFields[nIndex][3] = "eo_inst_alloc_qty";
sortFieldNames[nIndex][3] = "Allocation";
sortFields[nIndex][4] = "ii_rs_decode";
sortFieldNames[nIndex][4] = "Roadshow Events";
sortFields[nIndex][5] = "comm_rank";
sortFieldNames[nIndex][5] = "Last Year Comm. Rank";
sortFields[nIndex][6] = "@syndpct";
sortFieldNames[nIndex][6] = "Last Year Synd. %";
sortFields[nIndex][7] = "focus_acct_rank";
sortFieldNames[nIndex][7] = "Focus Acc't Rank";
sortFieldDef[nIndex][1] = "ii_name";
sortFieldDefOrder[nIndex][1] = "A";
versiontype[nIndex] = nMainReportIndex;
reportSalesRegion[nIndex] = "Y" ;
nIndex++;
}
if (displayiPlanner)
{
if (nIndex > MAX_REPORTS) alert ("Too many reports");
reportIndex[nIndex] = nIndex;
reportType[nIndex] = "ECM/Syndicate";
reportName[nIndex] = "Pot Indication-Allocation Report with Roadshow (iPlan)";
reportURL_EQ[nIndex] = "/rpt/EarningsReportEQ_IP.rpt";
reportURL_FI[nIndex] = "";
reportGroup[nIndex] = "ITShort";
sortFields[nIndex][1] = "ii_name";
sortFieldNames[nIndex][1] = "Account";
sortFields[nIndex][2] = "oi_ioi_qty";
sortFieldNames[nIndex][2] = "Indication";
sortFields[nIndex][3] = "eo_inst_alloc_qty";
sortFieldNames[nIndex][3] = "Allocation";
sortFields[nIndex][4] = "ii_rs_decode";
sortFieldNames[nIndex][4] = "Roadshow Events";
sortFields[nIndex][5] = "comm_rank";
sortFieldNames[nIndex][5] = "Last Year Comm. Rank";
sortFields[nIndex][6] = "@syndpct";
sortFieldNames[nIndex][6] = "Last Year Synd. %";
sortFields[nIndex][7] = "focus_acct_rank";
sortFieldNames[nIndex][7] = "Focus Acc't Rank";
sortFieldDef[nIndex][1] = "ii_name";
sortFieldDefOrder[nIndex][1] = "A";
versiontype[nIndex] = nMainReportIndex;
reportSalesRegion[nIndex] = "Y" ;
nIndex++;
}
if (displayRoadshow)
{
if(document.frmMain.hidViewPotIndRdShowRankRpt.value == "1")
{
if (nIndex > MAX_REPORTS) alert ("Too many reports");
reportIndex[nIndex] = nIndex;
reportType[nIndex] = "ECM/Syndicate";
reportName[nIndex] = "Pot Indication-Allocation Report with %, Roadshow and Rankings";
reportURL_EQ[nIndex] = "/rpt/IndAllocECMwPercentRoadshow.rpt";
reportURL_FI[nIndex] = "";
reportGroup[nIndex] = "ITShort";
sortFields[nIndex][1] = "ii_name";
sortFieldNames[nIndex][1] = "Account";
sortFields[nIndex][2] = "oi_ioi_qty";
sortFieldNames[nIndex][2] = "Indication";
sortFields[nIndex][3] = "eo_inst_alloc_qty";
sortFieldNames[nIndex][3] = "Allocation";
sortFields[nIndex][4] = "ii_rs_decode";
sortFieldNames[nIndex][4] = "Roadshow Events";
sortFields[nIndex][5] = "comm_rank";
sortFieldNames[nIndex][5] = "Last Year Comm. Rank";
sortFields[nIndex][6] = "@syndpct";
sortFieldNames[nIndex][6] = "Last Year Synd. %";
sortFields[nIndex][7] = "focus_acct_rank";
sortFieldNames[nIndex][7] = "Focus Acc't Rank";
sortFieldDef[nIndex][1] = "ii_name";
sortFieldDefOrder[nIndex][1] = "A";
versiontype[nIndex] = nMainReportIndex;
reportSalesRegion[nIndex] = "Y" ;
nIndex++;
}
}
if (displayiPlanner)
{
if(document.frmMain.hidViewPotIndRdShowRankRpt.value == "1")
{
if (nIndex > MAX_REPORTS) alert ("Too many reports");
reportIndex[nIndex] = nIndex;
reportType[nIndex] = "ECM/Syndicate";
reportName[nIndex] = "Pot Indication-Allocation Report with %, Roadshow (iPlan) and Rankings";
reportURL_EQ[nIndex] = "/rpt/IndAllocECMwPercentRoadshow_IP.rpt";
reportURL_FI[nIndex] = "";
reportGroup[nIndex] = "ITShort";
sortFields[nIndex][1] = "ii_name";
sortFieldNames[nIndex][1] = "Account";
sortFields[nIndex][2] = "oi_ioi_qty";
sortFieldNames[nIndex][2] = "Indication";
sortFields[nIndex][3] = "eo_inst_alloc_qty";
sortFieldNames[nIndex][3] = "Allocation";
sortFields[nIndex][4] = "ii_rs_decode";
sortFieldNames[nIndex][4] = "Roadshow Events";
sortFields[nIndex][5] = "comm_rank";
sortFieldNames[nIndex][5] = "Last Year Comm. Rank";
sortFields[nIndex][6] = "@syndpct";
sortFieldNames[nIndex][6] = "Last Year Synd. %";
sortFields[nIndex][7] = "focus_acct_rank";
sortFieldNames[nIndex][7] = "Focus Acc't Rank";
sortFieldDef[nIndex][1] = "ii_name";
sortFieldDefOrder[nIndex][1] = "A";
versiontype[nIndex] = nMainReportIndex;
reportSalesRegion[nIndex] = "Y" ;
nIndex++;
}
}
if (nIndex > MAX_REPORTS) alert ("Too many reports");
reportIndex[nIndex] = nIndex;
reportType[nIndex] = "Operations";
reportName[nIndex] = "Underwriter List";
reportURL_EQ[nIndex] = "/rpt/UWList.rpt";
reportURL_FI[nIndex] = "";
reportGroup[nIndex] = "MLLST";
reportUPNCount[nIndex] = 1;
reportUPN[nIndex][1] = 'ml'
nIndex++;
if (nIndex > MAX_REPORTS) alert ("Too many reports");
reportIndex[nIndex] = nIndex;
reportType[nIndex] = "Operations";
reportName[nIndex] = "Printer List";
reportURL_EQ[nIndex] = "/rpt/Printer_List.rpt";
reportURL_FI[nIndex] = "";
reportGroup[nIndex] = "MLLST";
reportUPNCount[nIndex] = 1;
reportUPN[nIndex][1] = 'ml'
nIndex++;
if (nIndex > MAX_REPORTS) alert ("Too many reports");
reportIndex[nIndex] = nIndex;
reportType[nIndex] = "Operations";
reportName[nIndex] = "Advertising List";
reportURL_EQ[nIndex] = "/rpt/AdvList.rpt";
reportURL_FI[nIndex] = "";
reportGroup[nIndex] = "MLLST";
reportUPNCount[nIndex] = 1;
reportUPN[nIndex][1] = 'ml'
nIndex++;
if (nIndex > MAX_REPORTS) alert ("Too many reports");
reportIndex[nIndex] = nIndex;
reportType[nIndex] = "Operations";
reportName[nIndex] = "IOI Free Riding Questionnaire Report";
reportURL_EQ[nIndex] = "/rpt/CompQuestEQ.rpt";
reportURL_FI[nIndex] = "";
reportGroup[nIndex] = "ITLong";
sortFields[nIndex][1] = "ii_name";
sortFieldNames[nIndex][1] = "Account";
sortFields[nIndex][2] = "po_frq_type";
sortFieldNames[nIndex][2] = "QIB";
sortFields[nIndex][3] = "oi_ioi_qty";
sortFieldNames[nIndex][3] = "Indication";
sortFields[nIndex][4] = "eo_inst_alloc_qty";
sortFieldNames[nIndex][4] = "Allocation";
sortFieldDef[nIndex][1] = "ii_name";
sortFieldDefOrder[nIndex][1] = "A";
reportUPNCount[nIndex] = 1;
reportUPN[nIndex][1] = 'ml.'
nIndex++;
if (nIndex > MAX_REPORTS) alert ("Too many reports");
reportIndex[nIndex] = nIndex;
reportType[nIndex] = "Operations";
reportName[nIndex] = "Pot Account List Report";
reportURL_EQ[nIndex] = "/rpt/PotAccountList.rpt";
reportURL_FI[nIndex] = "/rpt/PotAccountList.rpt";
reportGroup[nIndex] = "ITShort";
nIndex++;
if (nIndex > MAX_REPORTS) alert ("Too many reports");
reportIndex[nIndex] = nIndex;
reportType[nIndex] = "Operations";
reportName[nIndex] = "Pot Allocation Report";
reportURL_EQ[nIndex] = "/rpt/PotAllocation.rpt";
reportURL_FI[nIndex] = "/rpt/PotAllocation.rpt";
reportGroup[nIndex] = "ITShort";
sortFields[nIndex][1] = "inst_inv_nm";
sortFieldNames[nIndex][1] = "Account";
sortFields[nIndex][2] = "alloc_qty";
sortFieldNames[nIndex][2] = "Allocation";
sortFieldDef[nIndex][1] = "inst_inv_nm";
sortFieldDefOrder[nIndex][1] = "A";
nIndex++;
if (nIndex > MAX_REPORTS) alert ("Too many reports");
reportIndex[nIndex] = nIndex;
reportType[nIndex] = "Operations";
reportName[nIndex] = "Pot Book Detail Report";
reportURL_EQ[nIndex] = "/rpt/PotBookDetailEQ.rpt";
reportURL_FI[nIndex] = "/rpt/PotBookDetailFI.rpt";
reportGroup[nIndex] = "ITLong";
sortFields[nIndex][1] = "ii_name";
sortFieldNames[nIndex][1] = "Account";
sortFields[nIndex][2] = "oi_ioi_qty";
sortFieldNames[nIndex][2] = "Indication";
sortFields[nIndex][3] = "eo_inst_alloc_qty";
sortFieldNames[nIndex][3] = "Allocation";
sortFieldDef[nIndex][1] = "ii_name";
sortFieldDefOrder[nIndex][1] = "A";
reportUPNCount[nIndex] = 1;
reportUPN[nIndex][1] = 'ssb'
nIndex++;
if (nIndex > MAX_REPORTS) alert ("Too many reports");
reportIndex[nIndex] = nIndex;
reportType[nIndex] = "Operations";
reportName[nIndex] = "Pot Book / Deal Designation Percentage Report";
reportURL_EQ[nIndex] = "/rpt/PotbkDesiPercentage.rpt";
reportURL_FI[nIndex] = "/rpt/PotbkDesiPercentage.rpt";
reportGroup[nIndex] = "ITShort";
nIndex++;
if (nIndex > MAX_REPORTS) alert ("Too many reports");
reportIndex[nIndex] = nIndex;
reportType[nIndex] = "Operations";
reportName[nIndex] = "Mailing List Report";
reportURL_EQ[nIndex] = "/rpt/MailList.rpt";
reportURL_FI[nIndex] = "";
reportGroup[nIndex] = "UIMLT";
nIndex++;
if (nIndex > MAX_REPORTS) alert ("Too many reports");
reportIndex[nIndex] = nIndex;
reportType[nIndex] = "Operations";
reportName[nIndex] = "Pot Book / DO/MBD By Dealer";
reportURL_EQ[nIndex] = "/rpt/PotbkDOMBDDlrDetail.rpt";
reportURL_FI[nIndex] = "/rpt/PotbkDOMBDDlrDetail.rpt";
reportGroup[nIndex] = "ITShort";
nIndex++;
if (nIndex > MAX_REPORTS) alert ("Too many reports");
reportIndex[nIndex] = nIndex;
reportType[nIndex] = "Operations";
reportName[nIndex] = "Pot Book / Group Sales";
reportURL_EQ[nIndex] = "/rpt/PotbkGroupSales.rpt";
reportURL_FI[nIndex] = "";
reportGroup[nIndex] = "ITShort";
nIndex++;
if (nIndex > MAX_REPORTS) alert ("Too many reports");
reportIndex[nIndex] = nIndex;
reportType[nIndex] = "Operations";
reportName[nIndex] = "DBD Blotter";
reportURL_EQ[nIndex] = "/rpt/DealDBDBlotter.rpt";
reportURL_FI[nIndex] = "";
reportGroup[nIndex] = "UII";
reportUPNCount[nIndex] = 1;
reportUPN[nIndex][1] = 'ml'
nIndex++;
if (nIndex > MAX_REPORTS) alert ("Too many reports");
reportIndex[nIndex] = nIndex;
reportType[nIndex] = "Operations";
reportName[nIndex] = "Pot Book / Missing Designation Report";
reportURL_EQ[nIndex] = "/rpt/MissingDesignationsEQ.rpt";
reportURL_FI[nIndex] = "/rpt/MissingDesignationsFI.rpt";
reportGroup[nIndex] = "ITLong";
reportUPNCount[nIndex] = 1;
reportUPN[nIndex][1] = 'ssb'
nIndex++;
if (nIndex > MAX_REPORTS) alert ("Too many reports");
reportIndex[nIndex] = nIndex;
reportType[nIndex] = "Operations";
reportName[nIndex] = "Pot Book / Our Revenue Per Institution";
reportURL_EQ[nIndex] = "/rpt/PotbkRevPerInst.rpt";
reportURL_FI[nIndex] = "/rpt/PotbkRevPerInst.rpt";
reportGroup[nIndex] = "UIT";
reportUPNCount[nIndex] = 1;
reportUPN[nIndex][1] = 'ssb'
nIndex++;
if (nIndex > MAX_REPORTS) alert ("Too many reports");
reportIndex[nIndex] = nIndex;
reportType[nIndex] = "Operations";
reportName[nIndex] = "Pot Book / Pot Indication-Allocation Report";
reportURL_EQ[nIndex] = "/rpt/IndicationReportEQ.rpt";
reportURL_FI[nIndex] = "/rpt/IndicationReportFI.rpt";
reportGroup[nIndex] = "ITLong";
sortFields[nIndex][1] = "ii_name";
sortFieldNames[nIndex][1] = "Account";
sortFields[nIndex][2] = "oi_ioi_qty";
sortFieldNames[nIndex][2] = "Indication";
sortFields[nIndex][3] = "eo_inst_alloc_qty";
sortFieldNames[nIndex][3] = "Allocation";
sortFieldDef[nIndex][1] = "ii_name";
sortFieldDefOrder[nIndex][1] = "A";
nIndex++;
if (nIndex > MAX_REPORTS) alert ("Too many reports");
reportIndex[nIndex] = nIndex;
reportType[nIndex] = "Operations";
reportName[nIndex] = "Short Covering / Stabilization";
reportURL_EQ[nIndex] = "/rpt/ShortCovering.rpt";
reportURL_FI[nIndex] = "";
reportGroup[nIndex] = "UI";
nIndex++;
if (nIndex > MAX_REPORTS) alert ("Too many reports");
reportIndex[nIndex] = nIndex;
reportType[nIndex] = "Operations";
reportName[nIndex] = "Syndicate Book Report";
reportURL_EQ[nIndex] = "/rpt/DealReportEQ.rpt";
reportURL_FI[nIndex] = "/rpt/DealReportFI.rpt";
reportGroup[nIndex] = "ITIT";
nIndex++;
if (nIndex > MAX_REPORTS) alert ("Too many reports");
reportIndex[nIndex] = nIndex;
reportType[nIndex] = "Operations";
reportName[nIndex] = "Syndicate Book / Designation Breakout Sheet";
reportURL_EQ[nIndex] = "/rpt/DlrBkDesiBreakout.rpt";
reportURL_FI[nIndex] = "/rpt/DlrBkDesiBreakout.rpt";
reportGroup[nIndex] = "BreakoutA";
nIndex++;
if (nIndex > MAX_REPORTS) alert ("Too many reports");
reportIndex[nIndex] = nIndex;
reportType[nIndex] = "Operations";
reportName[nIndex] = "Syndicate Book / Desi. Breakout Blank Sheet";
reportURL_EQ[nIndex] = "/rpt/DlrBkDesiBreakout.rpt";
reportURL_FI[nIndex] = "/rpt/DlrBkDesiBreakout.rpt";
reportGroup[nIndex] = "BreakoutB";
nIndex++;
if (nIndex > MAX_REPORTS) alert ("Too many reports");
reportIndex[nIndex] = nIndex;
reportType[nIndex] = "Operations";
reportName[nIndex] = "Syndicate Book / Final List of Underwriters";
reportURL_EQ[nIndex] = "/rpt/MasterFinalListReportEQ.rpt";
reportURL_FI[nIndex] = "/rpt/MasterFinalListReportFI.rpt";
reportGroup[nIndex] = "ITIT";
nIndex++;
if (nIndex > MAX_REPORTS) alert ("Too many reports");
reportIndex[nIndex] = nIndex;
reportType[nIndex] = "Operations";
reportName[nIndex] = "Syndicate Book / Payment Report (All)";
reportURL_EQ[nIndex] = "/rpt/MstrbkPayment.rpt";
reportURL_FI[nIndex] = "/rpt/MstrbkPayment.rpt";
reportGroup[nIndex] = "PaymentA";
nIndex++;
if (nIndex > MAX_REPORTS) alert ("Too many reports");
reportIndex[nIndex] = nIndex;
reportType[nIndex] = "Operations";
reportName[nIndex] = "Syndicate Book / Payment Report (UW only)";
reportURL_EQ[nIndex] = "/rpt/MstrbkPayment.rpt";
reportURL_FI[nIndex] = "/rpt/MstrbkPayment.rpt";
reportGroup[nIndex] = "PaymentU";
nIndex++;
if (nIndex > MAX_REPORTS) alert ("Too many reports");
reportIndex[nIndex] = nIndex;
reportType[nIndex] = "Operations";
reportName[nIndex] = "Syndicate Book / Payment Report (SG @Offer Px Only)";
reportURL_EQ[nIndex] = "/rpt/MstrbkPayment.rpt";
reportURL_FI[nIndex] = "/rpt/MstrbkPayment.rpt";
reportGroup[nIndex] = "PaymentS";
nIndex++;
if (nIndex > MAX_REPORTS) alert ("Too many reports");
reportIndex[nIndex] = nIndex;
reportType[nIndex] = "ECM/Syndicate";
reportName[nIndex] = "Sales Feedback Report";
reportURL_EQ[nIndex] = "/rpt/SalesFeedback.rpt";
reportURL_FI[nIndex] = "";
reportGroup[nIndex] = "ITShort";
sortFields[nIndex][1] = "name";
sortFieldNames[nIndex][1] = "Investor";
sortFields[nIndex][2] = "cat_nm";
sortFieldNames[nIndex][2] = "Region";
sortFields[nIndex][3] = "user_name";
sortFieldNames[nIndex][3] = "Sales";
sortFieldDef[nIndex][1] = "name";
sortFieldDefOrder[nIndex][1] = "A";
reportSalesRegion[nIndex] = "Y" ;
nIndex++;
if (nIndex > MAX_REPORTS) alert ("Too many reports");
reportIndex[nIndex] = nIndex;
reportType[nIndex] = "ECM/Syndicate";
reportName[nIndex] = "One Off Contact Report";
reportURL_EQ[nIndex] = "/rpt/OneOffContact.rpt";
reportURL_FI[nIndex] = "";
reportGroup[nIndex] = "UI";
nIndex++;
if (nIndex > MAX_REPORTS) alert ("Too many reports");
reportIndex[nIndex] = nIndex;
reportType[nIndex] = "ECM/Syndicate";
reportName[nIndex] = "Demand Reports";
reportURL_EQ[nIndex] = "/rpt/DemandByQualityAndPrice.rpt";
reportURL_FI[nIndex] = "";
reportGroup[nIndex] = "UIT";
versiontype[nIndex] = -1; 
nMainReportIndex = nIndex;
nIndex++;
if ( document.frmMain.hidDisplayAllDemandReports.value == "1")
{
if (displayRoadshow)
{
if (nIndex > MAX_REPORTS) alert ("Too many reports");
reportIndex[nIndex] = nIndex;
reportType[nIndex] = "ECM/Syndicate";
reportName[nIndex] = "Demand by Roadshow Meetings & Price";
reportURL_EQ[nIndex] = "/rpt/DemandByRoadshowEvent.rpt";
reportURL_FI[nIndex] = "";
reportGroup[nIndex] = "UIT";
versiontype[nIndex] = nMainReportIndex;
nIndex++;
}
if (displayiPlanner)
{
if (nIndex > MAX_REPORTS) alert ("Too many reports");
reportIndex[nIndex] = nIndex;
reportType[nIndex] = "ECM/Syndicate";
reportName[nIndex] = "Demand by Roadshow Meetings (iPlan) & Price";
reportURL_EQ[nIndex] = "/rpt/DemandByRoadshowEvent_IP.rpt";
reportURL_FI[nIndex] = "";
reportGroup[nIndex] = "UIT";
versiontype[nIndex] = nMainReportIndex;
nIndex++;
}	
}
if ( document.frmMain.hidDisplayAllDemandReports.value == "1")
{
if (nIndex > MAX_REPORTS) alert ("Too many reports");
reportIndex[nIndex] = nIndex;
reportType[nIndex] = "ECM/Syndicate";
reportName[nIndex] = "Demand and Fall off by Limit";
reportURL_EQ[nIndex] = "/rpt/DemandAndFalloffByLimit.rpt";
reportURL_FI[nIndex] = "";
reportGroup[nIndex] = "MLIMITS";
versiontype[nIndex] = nMainReportIndex;
nIndex++;
}
if ( document.frmMain.hidDisplayAllDemandReports.value == "1")
{
if (nIndex > MAX_REPORTS) alert ("Too many reports");
reportIndex[nIndex] = nIndex;
reportType[nIndex] = "ECM/Syndicate";
reportName[nIndex] = "Demand and Fall off by Limit Graph";
reportURL_EQ[nIndex] = "/rpt/DemandAndFalloffByLimitGraph.rpt";
reportURL_FI[nIndex] = "";
reportGroup[nIndex] = "MLIMITS";
versiontype[nIndex] = nMainReportIndex;
nIndex++;
}
if ( document.frmMain.hidDisplayAllDemandReports.value == "1")
{
if (nIndex > MAX_REPORTS) alert ("Too many reports");
reportIndex[nIndex] = nIndex;
reportType[nIndex] = "ECM/Syndicate";
reportName[nIndex] = "Demand by Price";
reportURL_EQ[nIndex] = "/rpt/DemandByPrice.rpt";
reportURL_FI[nIndex] = "";
reportGroup[nIndex] = "RANGEPRICELIMIT";
versiontype[nIndex] = nMainReportIndex;
nIndex++;
}
if (nIndex > MAX_REPORTS) alert ("Too many reports");
reportIndex[nIndex] = nIndex;
reportType[nIndex] = "ECM/Syndicate";
reportName[nIndex] = "Demand by Quality & Price";
reportURL_EQ[nIndex] = "/rpt/DemandByQualityAndPrice.rpt";
reportURL_FI[nIndex] = "";
reportGroup[nIndex] = "UIT";
versiontype[nIndex] = nMainReportIndex;
nIndex++;
if (nIndex > MAX_REPORTS) alert ("Too many reports");
reportIndex[nIndex] = nIndex;
reportType[nIndex] = "Operations";
reportName[nIndex] = "Designation Percentage Account Detail Report";
reportURL_EQ[nIndex] = "/rpt/DesiPercentageAccountDetail.rpt";
reportURL_FI[nIndex] = "/rpt/DesiPercentageAccountDetail.rpt";
reportGroup[nIndex] = "ITShort";
sortFields[nIndex][1] = "broker";
sortFieldNames[nIndex][1] = "Dealer";
sortFields[nIndex][2] = "syndicate_sort";
sortFieldNames[nIndex][2] = "Syndicate";
sortFields[nIndex][3] = "desi";
sortFieldNames[nIndex][3] = "DO";
sortFields[nIndex][4] = "@desi_pct";
sortFieldNames[nIndex][4] = "DO %";
sortFieldDef[nIndex][1] = "syndicate_sort";
sortFieldDefOrder[nIndex][1] = "A";
nIndex++;
if (nIndex > MAX_REPORTS) alert ("Too many reports");
reportIndex[nIndex] = nIndex;
reportType[nIndex] = "Operations";
reportName[nIndex] = "Designation Percentage Dealer Detail Report";
reportURL_EQ[nIndex] = "/rpt/DesiPercentageDealerDetail.rpt";
reportURL_FI[nIndex] = "/rpt/DesiPercentageDealerDetail.rpt";
reportGroup[nIndex] = "ITShort";
sortFields[nIndex][1] = "inst_inv_nm";
sortFieldNames[nIndex][1] = "Account";
sortFields[nIndex][2] = "alloc_qty";
sortFieldNames[nIndex][2] = "Allocation";
sortFields[nIndex][3] = "desi_qty";
sortFieldNames[nIndex][3] = "DO";
sortFields[nIndex][4] = "@desi_pct";
sortFieldNames[nIndex][4] = "DO %";
sortFieldDef[nIndex][1] = "inst_inv_nm";
sortFieldDefOrder[nIndex][1] = "A";
nIndex++;
if (nIndex > MAX_REPORTS) alert ("Too many reports");
reportIndex[nIndex] = nIndex;
reportType[nIndex] = "Operations";
reportName[nIndex] = "Designation Percentage Summary Report";
reportURL_EQ[nIndex] = "/rpt/DesiPercentageSummary.rpt";
reportURL_FI[nIndex] = "/rpt/DesiPercentageSummary.rpt";
reportGroup[nIndex] = "ITShort";
sortFields[nIndex][1] = "name";
sortFieldNames[nIndex][1] = "Dealer";
sortFields[nIndex][2] = "syndicate_sort";
sortFieldNames[nIndex][2] = "Syndicate";
sortFields[nIndex][3] = "desi";
sortFieldNames[nIndex][3] = "DO";
sortFieldDef[nIndex][1] = "syndicate_sort";
sortFieldDefOrder[nIndex][1] = "A";
nIndex++;
if (nIndex > MAX_REPORTS) alert ("Too many reports");
reportIndex[nIndex] = nIndex;
reportType[nIndex] = "Operations";
reportName[nIndex] = "Institutional Pot Revenue Per Institution Report";
reportURL_EQ[nIndex] = "/rpt/InstPotRevPerInst.rpt";
reportURL_FI[nIndex] = "/rpt/InstPotRevPerInst.rpt";
reportGroup[nIndex] = "UIT";
sortFields[nIndex][1] = "inst_inv_nm";
sortFieldNames[nIndex][1] = "Account";
sortFields[nIndex][2] = "alloc_qty";
sortFieldNames[nIndex][2] = "Allocation";
sortFields[nIndex][3] = "desi_qty";
sortFieldNames[nIndex][3] = "DO";
sortFields[nIndex][4] = "@desi_pct";
sortFieldNames[nIndex][4] = "DO %";
sortFields[nIndex][5] = "mbd_qty";
sortFieldNames[nIndex][5] = "MBD";
sortFields[nIndex][6] = "@total_shares";
sortFieldNames[nIndex][6] = "Total Shares";
sortFields[nIndex][7] = "@revenue";
sortFieldNames[nIndex][7] = "Revenue";
sortFieldDef[nIndex][1] = "inst_inv_nm";
sortFieldDefOrder[nIndex][1] = "A";
nIndex++;
if (nIndex > MAX_REPORTS) alert ("Too many reports");
reportIndex[nIndex] = nIndex;
reportType[nIndex] = "ECM/Syndicate";
reportName[nIndex] = "Pot Allocation Report";
reportURL_EQ[nIndex] = "/rpt/PotAllocationECM.rpt";
reportURL_FI[nIndex] = "";
reportGroup[nIndex] = "ITShort";
sortFields[nIndex][1] = "inst_inv_nm";
sortFieldNames[nIndex][1] = "Account";
sortFields[nIndex][2] = "alloc_qty";
sortFieldNames[nIndex][2] = "Allocation";
sortFieldDef[nIndex][1] = "inst_inv_nm";
sortFieldDefOrder[nIndex][1] = "A";
reportSalesRegion[nIndex] = "Y" ;
nIndex++;
if (nIndex > MAX_REPORTS) alert ("Too many reports");
reportIndex[nIndex] = nIndex;
reportType[nIndex] = "ECM/Syndicate";
reportName[nIndex] = "IOI Free Riding Questionnaire Report";
reportURL_EQ[nIndex] = "/rpt/CompQuestEQECM.rpt";
reportURL_FI[nIndex] = "";
reportGroup[nIndex] = "ITLong";
sortFields[nIndex][1] = "ii_name";
sortFieldNames[nIndex][1] = "Account";
if (document.frmMain.hidIsDealPriceBeforeRule2790.value == '1')
{ 
sortFields[nIndex][2] = "po_frq_type";
sortFieldNames[nIndex][2] = "FRQ Y/N";
}
else
{
sortFields[nIndex][2] = "restricted_2790_flg";
sortFieldNames[nIndex][2] = "Rule 2790";
}
sortFields[nIndex][3] = "oi_ioi_qty";
sortFieldNames[nIndex][3] = "Indication";
sortFields[nIndex][4] = "eo_inst_alloc_qty";
sortFieldNames[nIndex][4] = "Allocation";
sortFieldDef[nIndex][1] = "ii_name";
sortFieldDefOrder[nIndex][1] = "A";
reportUPNCount[nIndex] = 1;
reportUPN[nIndex][1] = 'ssb';
reportSalesRegion[nIndex] = "Y" ;
nIndex++;
if (nIndex > MAX_REPORTS) alert ("Too many reports");
reportIndex[nIndex] = nIndex;
reportType[nIndex] = "ECM/Syndicate";
reportName[nIndex] = "IOI Free Riding Questionnaire Report";
reportURL_EQ[nIndex] = "/rpt/CompQuestEQECMML.rpt";
reportURL_FI[nIndex] = "";
reportGroup[nIndex] = "ITLong";
sortFields[nIndex][1] = "ii_name";
sortFieldNames[nIndex][1] = "Account";
sortFields[nIndex][2] = "po_frq_type";
sortFieldNames[nIndex][2] = "QIB";
sortFields[nIndex][3] = "oi_ioi_qty";
sortFieldNames[nIndex][3] = "Indication";
sortFields[nIndex][4] = "eo_inst_alloc_qty";
sortFieldNames[nIndex][4] = "Allocation";
sortFieldDef[nIndex][1] = "ii_name";
sortFieldDefOrder[nIndex][1] = "A";
reportUPNCount[nIndex] = 1;
reportUPN[nIndex][1] = 'ml';
reportSalesRegion[nIndex] = "Y" ;
nIndex++;
if (nIndex > MAX_REPORTS) alert ("Too many reports");
reportIndex[nIndex] = nIndex;
reportType[nIndex] = "ECM/Syndicate";
reportName[nIndex] = "Designation Percentage Account Detail Report";
reportURL_EQ[nIndex] = "/rpt/DesiPercentageAccountDetailECM.rpt";
reportURL_FI[nIndex] = "";
reportGroup[nIndex] = "ITShort";
sortFields[nIndex][1] = "broker";
sortFieldNames[nIndex][1] = "Dealer";
sortFields[nIndex][2] = "syndicate_sort";
sortFieldNames[nIndex][2] = "Syndicate";
sortFields[nIndex][3] = "desi";
sortFieldNames[nIndex][3] = "DO";
sortFields[nIndex][4] = "@desi_pct";
sortFieldNames[nIndex][4] = "DO %";
sortFieldDef[nIndex][1] = "syndicate_sort";
sortFieldDefOrder[nIndex][1] = "A";
reportSalesRegion[nIndex] = "Y" ;
nIndex++;
if (nIndex > MAX_REPORTS) alert ("Too many reports");
reportIndex[nIndex] = nIndex;
reportType[nIndex] = "ECM/Syndicate";
reportName[nIndex] = "Designation Percentage Dealer Detail Report";
reportURL_EQ[nIndex] = "/rpt/DesiPercentageDealerDetailECM.rpt";
reportURL_FI[nIndex] = "";
reportGroup[nIndex] = "ITShort";
sortFields[nIndex][1] = "inst_inv_nm";
sortFieldNames[nIndex][1] = "Account";
sortFields[nIndex][2] = "alloc_qty";
sortFieldNames[nIndex][2] = "Allocation";
sortFields[nIndex][3] = "desi_qty";
sortFieldNames[nIndex][3] = "DO";
sortFields[nIndex][4] = "@desi_pct";
sortFieldNames[nIndex][4] = "DO %";
sortFieldDef[nIndex][1] = "inst_inv_nm";
sortFieldDefOrder[nIndex][1] = "A";
reportSalesRegion[nIndex] = "Y" ;
nIndex++;
if (nIndex > MAX_REPORTS) alert ("Too many reports");
reportIndex[nIndex] = nIndex;
reportType[nIndex] = "ECM/Syndicate";
reportName[nIndex] = "Designation Percentage Summary Report";
reportURL_EQ[nIndex] = "/rpt/DesiPercentageSummaryECM.rpt";
reportURL_FI[nIndex] = "";
reportGroup[nIndex] = "ITShort";
sortFields[nIndex][1] = "name";
sortFieldNames[nIndex][1] = "Dealer";
sortFields[nIndex][2] = "syndicate_sort";
sortFieldNames[nIndex][2] = "Syndicate";
sortFields[nIndex][3] = "desi";
sortFieldNames[nIndex][3] = "DO";
sortFieldDef[nIndex][1] = "syndicate_sort";
sortFieldDefOrder[nIndex][1] = "A";
reportSalesRegion[nIndex] = "Y" ;
nIndex++;
if (nIndex > MAX_REPORTS) alert ("Too many reports");
reportIndex[nIndex] = nIndex;
reportType[nIndex] = "ECM/Syndicate";
reportName[nIndex] = "Institutional Pot Revenue Per Institution Report";
reportURL_EQ[nIndex] = "/rpt/InstPotRevPerInstECM.rpt";
reportURL_FI[nIndex] = "";
reportGroup[nIndex] = "UIT";
sortFields[nIndex][1] = "inst_inv_nm";
sortFieldNames[nIndex][1] = "Account";
sortFields[nIndex][2] = "alloc_qty";
sortFieldNames[nIndex][2] = "Allocation";
sortFields[nIndex][3] = "desi_qty";
sortFieldNames[nIndex][3] = "DO";
sortFields[nIndex][4] = "@desi_pct";
sortFieldNames[nIndex][4] = "DO %";
sortFields[nIndex][5] = "mbd_qty";
sortFieldNames[nIndex][5] = "MBD";
sortFields[nIndex][6] = "@total_shares";
sortFieldNames[nIndex][6] = "Total Shares";
sortFields[nIndex][7] = "@revenue";
sortFieldNames[nIndex][7] = "Revenue";
sortFieldDef[nIndex][1] = "inst_inv_nm";
sortFieldDefOrder[nIndex][1] = "A";
reportSalesRegion[nIndex] = "Y" ;
nIndex++;
if (nIndex > MAX_REPORTS) alert ("Too many reports");
reportIndex[nIndex] = nIndex;
reportType[nIndex] = "ECM/Syndicate";
reportName[nIndex] = "Pot Indication Report";
reportURL_EQ[nIndex] = "/rpt/PotIndicationECM.rpt";
reportURL_FI[nIndex] = "";
reportGroup[nIndex] = "LIMIT";
sortFields[nIndex][1] = "ii_name";
sortFieldNames[nIndex][1] = "Account";
sortFields[nIndex][2] = "oi_ioi_qty";
sortFieldNames[nIndex][2] = "Indication";
sortFieldDef[nIndex][1] = "ii_name";
sortFieldDefOrder[nIndex][1] = "A";
reportSalesRegion[nIndex] = "Y" ;
nIndex++;
if (nIndex > MAX_REPORTS) alert ("Too many reports");
reportIndex[nIndex] = nIndex;
reportType[nIndex] = "ECM/Syndicate";
reportName[nIndex] = "Syndicate Book Report";
reportURL_EQ[nIndex] = "/rpt/SyndicateBookEcmEQ.rpt";
reportURL_FI[nIndex] = "";
reportGroup[nIndex] = "ITShort";
sortFields[nIndex][1] = "bk_name";
sortFieldNames[nIndex][1] = "Broker/Dealer";
sortFields[nIndex][2] = "sm_uw_size_qty";
sortFieldNames[nIndex][2] = "Participation";
sortFields[nIndex][3] = "ind_ioi_qty";
sortFieldNames[nIndex][3] = "Indication";
sortFields[nIndex][4] = "sm_free_ret_ioi_qty";
sortFieldNames[nIndex][4] = "Retention";
sortFields[nIndex][5] = "rank";
sortFieldNames[nIndex][5] = "Syndicate Participation List";
sortFieldDef[nIndex][1] = "rank";
sortFieldDefOrder[nIndex][1] = "A";
nIndex++;
if (nIndex > MAX_REPORTS) alert ("Too many reports");
reportIndex[nIndex] = nIndex;
reportType[nIndex] = "Operations";
reportName[nIndex] = "Pot Indication Report";
reportURL_EQ[nIndex] = "/rpt/PotIndication.rpt";
reportURL_FI[nIndex] = "";
reportGroup[nIndex] = "LIMIT";
sortFields[nIndex][1] = "ii_name";
sortFieldNames[nIndex][1] = "Account";
sortFields[nIndex][2] = "oi_ioi_qty";
sortFieldNames[nIndex][2] = "Indication";
sortFieldDef[nIndex][1] = "ii_name";
sortFieldDefOrder[nIndex][1] = "A";
nIndex++;
if (displayRoadshow)
{
if (nIndex > MAX_REPORTS) alert ("Too many reports");
reportIndex[nIndex] = nIndex;
reportType[nIndex] = "ECM/Syndicate";
reportName[nIndex] = "Deal Captain Report";
reportURL_EQ[nIndex] = "/rpt/DealCaptain.rpt";
reportURL_FI[nIndex] = "";
reportGroup[nIndex] = "DEALCAPTAIN";
sortFields[nIndex][1] = "ii_name";
sortFieldNames[nIndex][1] = "Account Name";
sortFields[nIndex][2] = "eo_inst_alloc_qty";
sortFieldNames[nIndex][2] = "Allocation";
sortFields[nIndex][3] = "ii_rs_decode";
sortFieldNames[nIndex][3] = "Roadshow";
sortFields[nIndex][4] = "oi_ioi_qty";
sortFieldNames[nIndex][4] = "Indication";
sortFieldDef[nIndex][1] = "ii_name";
sortFieldDefOrder[nIndex][1] = "A";
reportSalesRegion[nIndex] = "Y" ;
nIndex++;
}
if (displayiPlanner)
{
if (nIndex > MAX_REPORTS) alert ("Too many reports");
reportIndex[nIndex] = nIndex;
reportType[nIndex] = "ECM/Syndicate";
reportName[nIndex] = "Deal Captain Report (iPlan)";
reportURL_EQ[nIndex] = "/rpt/DealCaptain_IP.rpt";
reportURL_FI[nIndex] = "";
reportGroup[nIndex] = "DEALCAPTAIN";
sortFields[nIndex][1] = "ii_name";
sortFieldNames[nIndex][1] = "Account Name";
sortFields[nIndex][2] = "eo_inst_alloc_qty";
sortFieldNames[nIndex][2] = "Allocation";
sortFields[nIndex][3] = "ii_rs_decode";
sortFieldNames[nIndex][3] = "Roadshow";
sortFields[nIndex][4] = "oi_ioi_qty";
sortFieldNames[nIndex][4] = "Indication";
sortFieldDef[nIndex][1] = "ii_name";
sortFieldDefOrder[nIndex][1] = "A";
reportSalesRegion[nIndex] = "Y" ;
nIndex++;
}
if (nIndex > MAX_REPORTS) alert ("Too many reports");
reportIndex[nIndex] = nIndex;
reportType[nIndex] = "ECM/Syndicate";
reportName[nIndex] = "Limit Summary Report";
reportURL_EQ[nIndex] = "/rpt/LimitSummary.rpt";
reportURL_FI[nIndex] = "";
reportGroup[nIndex] = "DEALCAPTAIN";
sortFields[nIndex][1] = "ii_name";
sortFieldNames[nIndex][1] = "Account Name";
sortFields[nIndex][2] = "oi_ioi_qty";
sortFieldNames[nIndex][2] = "Indication";
sortFields[nIndex][3] = "eo_inst_alloc_qty";
sortFieldNames[nIndex][3] = "Allocation";
sortFieldDef[nIndex][1] = "ii_name";
sortFieldDefOrder[nIndex][1] = "A";
versiontype[nIndex] = -1;
nMainReportIndex = nIndex;
reportSalesRegion[nIndex] = "Y" ;
nIndex++;
if (nIndex > MAX_REPORTS) alert ("Too many reports");
reportIndex[nIndex] = nIndex;
reportType[nIndex] = "ECM/Syndicate";
reportName[nIndex] = "Limit Summary Report (Indications as Entered)";
reportURL_EQ[nIndex] = "/rpt/LimitSummary.rpt";
reportGroup[nIndex] = "DEALCAPTAIN";
sortFields[nIndex][1] = "ii_name";
sortFieldNames[nIndex][1] = "Account Name";
sortFields[nIndex][2] = "oi_ioi_qty";
sortFieldNames[nIndex][2] = "Indication";
sortFields[nIndex][3] = "eo_inst_alloc_qty";
sortFieldNames[nIndex][3] = "Allocation";
sortFieldDef[nIndex][1] = "ii_name";
sortFieldDefOrder[nIndex][1] = "A";
versiontype[nIndex] = nMainReportIndex;
reportSalesRegion[nIndex] = "Y" ;
nIndex++;
if (nIndex > MAX_REPORTS) alert ("Too many reports");
reportIndex[nIndex] = nIndex;
reportType[nIndex] = "ECM/Syndicate";
reportName[nIndex] = "Limit Summary Report With Commission Rank";
reportURL_EQ[nIndex] = "/rpt/LimitSummaryWithComm.rpt";
reportGroup[nIndex] = "DEALCAPTAIN";
sortFields[nIndex][1] = "ii_name";
sortFieldNames[nIndex][1] = "Account Name";
sortFields[nIndex][2] = "oi_ioi_qty";
sortFieldNames[nIndex][2] = "Indication";
sortFields[nIndex][3] = "eo_inst_alloc_qty";
sortFieldNames[nIndex][3] = "Allocation";
sortFieldDef[nIndex][1] = "ii_name";
sortFieldDefOrder[nIndex][1] = "A";
versiontype[nIndex] = nMainReportIndex;
reportSalesRegion[nIndex] = "Y" ;
nIndex++;
if (nIndex > MAX_REPORTS) alert ("Too many reports");
reportIndex[nIndex] = nIndex;
reportType[nIndex] = "ECM/Syndicate";
reportName[nIndex] = "1-ON-1 Hit Ratio Report";
reportURL_EQ[nIndex] = "/rpt/oneonone.rpt";
reportURL_FI[nIndex] = "";
reportGroup[nIndex] = "ITShort";
sortFields[nIndex][1] = "ii_name";
sortFieldNames[nIndex][1] = "Account";
sortFields[nIndex][2] = "oi_ioi_qty";
sortFieldNames[nIndex][2] = "Indication";
sortFields[nIndex][3] = "eo_inst_alloc_qty";
sortFieldNames[nIndex][3] = "Allocation";
sortFieldDef[nIndex][1] = "ii_name";
sortFieldDefOrder[nIndex][1] = "A";
versiontype[nIndex] = -1;
nMainReportIndex = nIndex;
nIndex++;
if (nIndex > MAX_REPORTS) alert ("Too many reports");
reportIndex[nIndex] = nIndex;
reportType[nIndex] = "ECM/Syndicate";
reportName[nIndex] = "1-ON-1 Hit Ratio";
reportURL_EQ[nIndex] = "/rpt/oneonone.rpt";
reportURL_FI[nIndex] = "";
reportGroup[nIndex] = "ITShort";
sortFields[nIndex][1] = "ii_name";
sortFieldNames[nIndex][1] = "Account";
sortFields[nIndex][2] = "oi_ioi_qty";
sortFieldNames[nIndex][2] = "Indication";
sortFields[nIndex][3] = "eo_inst_alloc_qty";
sortFieldNames[nIndex][3] = "Allocation";
sortFieldDef[nIndex][1] = "ii_name";
sortFieldDefOrder[nIndex][1] = "A";
versiontype[nIndex] = nMainReportIndex;
nIndex++;
if (nIndex > MAX_REPORTS) alert ("Too many reports");
reportIndex[nIndex] = nIndex;
reportType[nIndex] = "ECM/Syndicate";
reportName[nIndex] = "1-ON-1 Hit Ratio Report (All Meetings)";
reportURL_EQ[nIndex] = "/rpt/OneOnOneAll.rpt";
reportURL_FI[nIndex] = "";
reportGroup[nIndex] = "ITShort";
sortFields[nIndex][1] = "rs_team";
sortFieldNames[nIndex][1] = "Team";
sortFields[nIndex][2] = "rs_day";
sortFieldNames[nIndex][2] = "Date";
sortFields[nIndex][3] = "rs_location";
sortFieldNames[nIndex][3] = "Location";
sortFields[nIndex][4] = "ii_name";
sortFieldNames[nIndex][4] = "Account";
sortFields[nIndex][5] = "oi_ioi_qty";
sortFieldNames[nIndex][5] = "Indication";
sortFields[nIndex][6] = "eo_inst_alloc_qty";
sortFieldNames[nIndex][6] = "Allocation";
sortFieldDef[nIndex][1] = "rs_team";
sortFieldDefOrder[nIndex][1] = "A";
versiontype[nIndex] = nMainReportIndex;
nIndex++;
if (nIndex > MAX_REPORTS) alert ("Too many reports");
reportIndex[nIndex] = nIndex;
reportType[nIndex] = "ECM/Syndicate";
reportName[nIndex] = "1-ON-1 Hit Ratio Report (Team Hit Ratio)";
reportURL_EQ[nIndex] = "/rpt/OneOnOneTeam.rpt";
reportURL_FI[nIndex] = "";
reportGroup[nIndex] = "ITShort";
sortFields[nIndex][1] = "rs_team";
sortFieldNames[nIndex][1] = "Team";
sortFields[nIndex][2] = "rs_day";
sortFieldNames[nIndex][2] = "Date";
sortFields[nIndex][3] = "rs_location";
sortFieldNames[nIndex][3] = "Location";
sortFields[nIndex][4] = "ii_name";
sortFieldNames[nIndex][4] = "Account";
sortFields[nIndex][5] = "oi_ioi_qty";
sortFieldNames[nIndex][5] = "Indication";
sortFields[nIndex][6] = "eo_inst_alloc_qty";
sortFieldNames[nIndex][6] = "Allocation";
sortFieldDef[nIndex][1] = "rs_team";
sortFieldDefOrder[nIndex][1] = "A";
versiontype[nIndex] = nMainReportIndex;
nIndex++;
if (nIndex > MAX_REPORTS) alert ("Too many reports");
reportIndex[nIndex] = nIndex;
reportType[nIndex] = "ECM/Syndicate";
reportName[nIndex] = "Underwriter List";
reportURL_EQ[nIndex] = "/rpt/UnderwriterListReportEQECM.rpt";
reportURL_FI[nIndex] = "";
reportGroup[nIndex] = "ITLong";
reportUPNCount[nIndex] = 1;
reportUPN[nIndex][1] = 'ssb'
nIndex++;
if (nIndex > MAX_REPORTS) alert ("Too many reports");
reportIndex[nIndex] = nIndex;
reportType[nIndex] = "ECM/Syndicate";
reportName[nIndex] = "Advertising List";
reportURL_EQ[nIndex] = "/rpt/AdvertisingListReportEQECM.rpt";
reportURL_FI[nIndex] = "";
reportGroup[nIndex] = "ITLong";
reportUPNCount[nIndex] = 1;
reportUPN[nIndex][1] = 'ssb'
nIndex++;
if (nIndex > MAX_REPORTS) alert ("Too many reports");
reportIndex[nIndex] = nIndex;
reportType[nIndex] = "ECM/Syndicate";
reportName[nIndex] = "Printer List";
reportURL_EQ[nIndex] = "/rpt/PrinterListReportEQECM.rpt";
reportURL_FI[nIndex] = "";
reportGroup[nIndex] = "ITLong";
reportUPNCount[nIndex] = 1;
reportUPN[nIndex][1] = 'ssb'
nIndex++;
if (nIndex > MAX_REPORTS) alert ("Too many reports");
reportIndex[nIndex] = nIndex;
reportType[nIndex] = "Operations";
reportName[nIndex] = "Dealer Flip Summary Report";
reportURL_EQ[nIndex] = "/rpt/DealerFlipSummaryReportECM.rpt";
reportURL_FI[nIndex] = "";
reportGroup[nIndex] = "DS";
sortFields[nIndex][1] = "brk_nm";
sortFieldNames[nIndex][1] = "Dealer Name";
sortFields[nIndex][2] = "free_ret_qty";
sortFieldNames[nIndex][2] = "Retention";
sortFields[nIndex][3] = "rtl_flip_qty";
sortFieldNames[nIndex][3] = "Flipped";
sortFields[nIndex][4] = "@percent";
sortFieldNames[nIndex][4] = "%";
sortFieldDef[nIndex][1] = "brk_nm";
sortFieldDefOrder[nIndex][1] = "A";
nIndex++;
if (nIndex > MAX_REPORTS) alert ("Too many reports");
reportIndex[nIndex] = nIndex;
reportType[nIndex] = "ECM/Syndicate";
reportName[nIndex] = "FRQ Sales Supervisor Report";
reportURL_EQ[nIndex] = "/rpt/ComplianceStatusIndAlloc.rpt";
reportURL_FI[nIndex] = "";
reportGroup[nIndex] = "UIMA";
versiontype[nIndex] = -1; 
nMainReportIndex = nIndex;
reportSalesRegion[nIndex] = "Y" ;
nIndex++;
if (nIndex > MAX_REPORTS) alert ("Too many reports");
reportIndex[nIndex] = nIndex;
reportType[nIndex] = "ECM/Syndicate";
reportName[nIndex] = "FRQ Sales Supervisor Report (Indication only)";
reportURL_EQ[nIndex] = "/rpt/ComplianceStatusInd.rpt";
reportURL_FI[nIndex] = "";
reportGroup[nIndex] = "UIMA";
versiontype[nIndex] = nMainReportIndex;
sortFields[nIndex][1] = "ii_name";
sortFieldNames[nIndex][1] = "Account";
sortFields[nIndex][2] = "cat_nm";
sortFieldNames[nIndex][2] = "Region";
sortFieldDef[nIndex][1] = "ii_name";
sortFieldDefOrder[nIndex][1] = "A";
reportSalesRegion[nIndex] = "Y" ;
nIndex++;
if (nIndex > MAX_REPORTS) alert ("Too many reports");
reportIndex[nIndex] = nIndex;
reportType[nIndex] = "ECM/Syndicate";
reportName[nIndex] = "FRQ Sales Supervisor Report (Indication/Allocation)";
reportURL_EQ[nIndex] = "/rpt/ComplianceStatusIndAlloc.rpt";
reportURL_FI[nIndex] = "";
reportGroup[nIndex] = "UIMA";
versiontype[nIndex] = nMainReportIndex;
sortFields[nIndex][1] = "ii_name";
sortFieldNames[nIndex][1] = "Account";
sortFields[nIndex][2] = "cat_nm";
sortFieldNames[nIndex][2] = "Region";
sortFieldDef[nIndex][1] = "ii_name";
sortFieldDefOrder[nIndex][1] = "A";
reportSalesRegion[nIndex] = "Y" ;
nIndex++;
if (nIndex > MAX_REPORTS) alert ("Too many reports");
reportIndex[nIndex] = nIndex;
reportType[nIndex] = "ECM/Syndicate";
reportName[nIndex] = "FRQ Sales Supervisor Report (Owner Bill-and-Deliver)";
reportURL_EQ[nIndex] = "/rpt/ComplianceStatusIndAlloc.rpt";
reportURL_FI[nIndex] = "";
reportGroup[nIndex] = "UIMB";
versiontype[nIndex] = nMainReportIndex;
reportSalesRegion[nIndex] = "Y" ;
sortFields[nIndex][1] = "ii_name";
sortFieldNames[nIndex][1] = "Account";
sortFields[nIndex][2] = "cat_nm";
sortFieldNames[nIndex][2] = "Region";
sortFieldDef[nIndex][1] = "ii_name";
sortFieldDefOrder[nIndex][1] = "A";
nIndex++;
if ((gRAPDeal_NonLeadInd == "False" || (gRAPDeal_NonLeadInd == "True" && gRAPDeal_NonLeadInd2 == "True")) && gRAPDeal_Cust_Setting != "HideReportFromMgrBk")
{
if (nIndex > MAX_REPORTS) alert ("Too many reports");
reportIndex[nIndex] = nIndex;
reportType[nIndex] = "ECM/Syndicate";
reportName[nIndex] = "Institutional Pot";
reportURL_EQ[nIndex] = "/asp/reports_inst_pot.asp";
reportURL_FI[nIndex] = "";
versiontype[nIndex] = nMainReportIndex;
reportGroup[nIndex] = "RBReport";
reportUPNCount[nIndex] = 1;
reportUPN[nIndex][1] = 'ml'
nIndex++;
if (nIndex > MAX_REPORTS) alert ("Too many reports");
reportIndex[nIndex] = nIndex;
reportType[nIndex] = "ECM/Syndicate";
reportName[nIndex] = "Institutional Pot With IOI";
reportURL_EQ[nIndex] = "/asp/reports_inst_pot_with_ioi.asp";
reportURL_FI[nIndex] = "";
versiontype[nIndex] = nMainReportIndex;
reportGroup[nIndex] = "RBReport";
reportUPNCount[nIndex] = 1;
reportUPN[nIndex][1] = 'ml'
nIndex++;
if (nIndex > MAX_REPORTS) alert ("Too many reports");
reportIndex[nIndex] = nIndex;
reportType[nIndex] = "ECM/Syndicate";
reportName[nIndex] = "Order Allocations";
reportURL_EQ[nIndex] = "/asp/reports_order_allocations.asp";
reportURL_FI[nIndex] = "";
versiontype[nIndex] = nMainReportIndex;
reportGroup[nIndex] = "RBReport";
reportUPNCount[nIndex] = 1;
reportUPN[nIndex][1] = 'ml'
nIndex++;
if (nIndex > MAX_REPORTS) alert ("Too many reports");
reportIndex[nIndex] = nIndex;
reportType[nIndex] = "ECM/Syndicate";
reportName[nIndex] = "Indications Only";
reportURL_EQ[nIndex] = "/asp/reports_indications_only.asp";
reportURL_FI[nIndex] = "";
versiontype[nIndex] = nMainReportIndex;
reportGroup[nIndex] = "RBReport";
reportUPNCount[nIndex] = 1;
reportUPN[nIndex][1] = 'ml'
nIndex++;
if (nIndex > MAX_REPORTS) alert ("Too many reports");
reportIndex[nIndex] = nIndex;
reportType[nIndex] = "ECM/Syndicate";
reportName[nIndex] = "Limit Summary - Incremental";
reportURL_EQ[nIndex] = "/asp/reports_limits_summary.asp";
reportURL_FI[nIndex] = "";
versiontype[nIndex] = nMainReportIndex;
reportGroup[nIndex] = "RBReport";
reportUPNCount[nIndex] = 1;
reportUPN[nIndex][1] = 'ml'
nIndex++;
if (nIndex > MAX_REPORTS) alert ("Too many reports");
reportIndex[nIndex] = nIndex;
reportType[nIndex] = "ECM/Syndicate";
reportName[nIndex] = "Limit Summary - Cummulative";
reportURL_EQ[nIndex] = "/asp/reports_cummulative_limits_summary.asp";
reportURL_FI[nIndex] = "";
versiontype[nIndex] = nMainReportIndex;
reportGroup[nIndex] = "RBReport";
nIndex++;
if (nIndex > MAX_REPORTS) alert ("Too many reports");
reportIndex[nIndex] = nIndex;
reportType[nIndex] = "ECM/Syndicate";
reportName[nIndex] = "Demand by Investor Origin";
reportURL_EQ[nIndex] = "/asp/reports_demand_investororigin.asp";
reportURL_FI[nIndex] = "";
versiontype[nIndex] = 0;
reportGroup[nIndex] = "RBReport";
reportUPNCount[nIndex] = 1;
reportUPN[nIndex][1] = 'ml'
nIndex++;
if (nIndex > MAX_REPORTS) alert ("Too many reports");
reportIndex[nIndex] = nIndex;
reportType[nIndex] = "ECM/Syndicate";
reportName[nIndex] = "Cumulative & Daily Demand";
reportURL_EQ[nIndex] = "/asp/reports_cumdailydemand.asp";
reportURL_FI[nIndex] = "";
versiontype[nIndex] = -1;
reportGroup[nIndex] = "RBCumDailyDemand";
nMainReportIndex = nIndex;	
reportSalesRegion[nIndex] = "Y" ;	
nIndex++;
if (nIndex > MAX_REPORTS) alert ("Too many reports");
reportIndex[nIndex] = nIndex;
reportType[nIndex] = "ECM/Syndicate";
reportName[nIndex] = "By Quality";
reportURL_EQ[nIndex] = "/asp/reports_cumdailydemand.asp?basedon=quality";
reportURL_FI[nIndex] = "";
versiontype[nIndex] = nMainReportIndex;
reportGroup[nIndex] = "RBCumDailyDemand";
reportSalesRegion[nIndex] = "Y" ;	
nIndex++;	
if (nIndex > MAX_REPORTS) alert ("Too many reports");
reportIndex[nIndex] = nIndex;
reportType[nIndex] = "ECM/Syndicate";
reportName[nIndex] = "By Country";
reportURL_EQ[nIndex] = "/asp/reports_cumdailydemand.asp?basedon=country";
reportURL_FI[nIndex] = "";
versiontype[nIndex] = nMainReportIndex;
reportGroup[nIndex] = "RBCumDailyDemand";
nMainReportIndex = nIndex; 
reportSalesRegion[nIndex] = "Y" ;	
nIndex++; 
if (nIndex > MAX_REPORTS) alert ("Too many reports");
reportIndex[nIndex] = nIndex;
reportType[nIndex] = "Operations";
reportName[nIndex] = "Underwriting List";
reportURL_EQ[nIndex] = "/asp/reports_underwriterlist.asp";
reportURL_FI[nIndex] = "";
versiontype[nIndex] = nMainReportIndex;
reportGroup[nIndex] = "RBReport";
reportUPNCount[nIndex] = 1;
reportUPN[nIndex][1] = 'ml..'
nIndex++;
if (nIndex > MAX_REPORTS) alert ("Too many reports");
reportIndex[nIndex] = nIndex;
reportType[nIndex] = "Operations";
reportName[nIndex] = "Advertising List";
reportURL_EQ[nIndex] = "/asp/reports_advertisinglist.asp";
reportURL_FI[nIndex] = "";
versiontype[nIndex] = nMainReportIndex;
reportGroup[nIndex] = "RBReport";
reportUPNCount[nIndex] = 1;
reportUPN[nIndex][1] = 'ml..'
nIndex++;
if (nIndex > MAX_REPORTS) alert ("Too many reports");
reportIndex[nIndex] = nIndex;
reportType[nIndex] = "Operations";
reportName[nIndex] = "Printer List";
reportURL_EQ[nIndex] = "/asp/reports_printerlist.asp";
reportURL_FI[nIndex] = "";
versiontype[nIndex] = nMainReportIndex;
reportGroup[nIndex] = "RBReport";
reportUPNCount[nIndex] = 1;
reportUPN[nIndex][1] = 'ml..'
nIndex++;
}
if ( document.frmMain.hidDisplayNetroadshowReports.value == "1")
{
if (nIndex > MAX_REPORTS) alert ("Too many reports");
reportIndex[nIndex] = nIndex;
reportType[nIndex] = "ECM/Syndicate";
reportName[nIndex] = "Netroadshow Activity Tracking (External)";
reportURL_EQ[nIndex] = "/rpt/NetroadshowTrackingExt.rpt";
reportURL_FI[nIndex] = "";
reportGroup[nIndex] = "UI";
nIndex++;
if (nIndex > MAX_REPORTS) alert ("Too many reports");
reportIndex[nIndex] = nIndex;
reportType[nIndex] = "ECM/Syndicate";
reportName[nIndex] = "Netroadshow Activity Tracking (Internal)";
reportURL_EQ[nIndex] = "/rpt/NetroadshowTrackingInt.rpt";
reportURL_FI[nIndex] = "";
reportGroup[nIndex] = "UI";
nIndex++;
}
if (nIndex > MAX_REPORTS) alert ("Too many reports");
reportIndex[nIndex] = nIndex;
reportType[nIndex] = "Operations";
reportName[nIndex] = "ALV Credit Report";
reportURL_EQ[nIndex] = "/rpt/ProductionCreditReport.rpt";
reportURL_FI[nIndex] = "";
reportGroup[nIndex] = "ITShort";
nIndex++;
if ( document.frmMain.hidDisplayERIReport.value == "1")
{
if (nIndex > MAX_REPORTS) alert ("Too many reports");
reportIndex[nIndex] = nIndex;
reportType[nIndex] = "ECM/Syndicate";
reportName[nIndex] = "ERI Report";
reportURL_EQ[nIndex] = "/rpt/ERIReport.rpt";
reportURL_FI[nIndex] = "";
reportGroup[nIndex] = "ERI";
nIndex++;
}
if ( document.frmMain.hidOD.value=="1" && document.frmMain.hidIsDealPriced.value=="true" )
{
var now = new Date();
now.setDate(now.getDate()-30);
var dtCurrent = now.getFullYear();
dtCurrent += ((now.getMonth()+1)<10 ? "0" : "") + (now.getMonth()+1);
dtCurrent += (now.getDate()<10 ? "0" : "") + now.getDate();
if (nIndex > MAX_REPORTS) alert ("Too many reports");
reportIndex[nIndex] = nIndex;
reportType[nIndex] = "ECM/Syndicate";
reportName[nIndex] = "Master Book Compliance Report (T+1)";
reportURL_EQ[nIndex] = '/rpt/MstrbkCompliance.rpt&amp;lType="0"';
reportURL_FI[nIndex] = "";
reportGroup[nIndex] = "UI";
nIndex++;
if ( dtCurrent>=document.frmMain.hidOfferDt.value )
{	
if (nIndex > MAX_REPORTS) alert ("Too many reports");
reportIndex[nIndex] = nIndex;
reportType[nIndex] = "ECM/Syndicate";
reportName[nIndex] = "Master Book Compliance Report (T+30)";
reportURL_EQ[nIndex] = '/rpt/MstrbkCompliance.rpt&amp;lType="1"';
reportURL_FI[nIndex] = "";
reportGroup[nIndex] = "UI";
nIndex++;
}
}
if (nIndex > MAX_REPORTS) alert ("Too many reports");
reportIndex[nIndex] = nIndex;
reportType[nIndex] = "Operations";
reportName[nIndex] = "Payment Blotter";
reportURL_EQ[nIndex] = "/rpt/PmtBlotter.rpt";
reportURL_FI[nIndex] = "";
reportGroup[nIndex] = "UIT";
reportUPNCount[nIndex] = 1;
reportUPN[nIndex][1] = 'ml'
nIndex++;
if (nIndex > MAX_REPORTS) alert ("Too many reports");
reportIndex[nIndex] = nIndex;
reportType[nIndex] = "Operations";
reportName[nIndex] = "Flipper Deal Penalties Summary";
reportURL_EQ[nIndex] = "/rpt/FlipperDealPenalty.rpt";
reportURL_FI[nIndex] = "";
reportGroup[nIndex] = "UIT";
reportUPNCount[nIndex] = 1;
reportUPN[nIndex][1] = 'ml'
nIndex++;
if (nIndex > MAX_REPORTS) alert ("Too many reports");
reportIndex[nIndex] = nIndex;
reportType[nIndex] = "Operations";
reportName[nIndex] = "Flipper Deal Penalties By Broker";
reportURL_EQ[nIndex] = "/rpt/FlipperBrokerPenalty.rpt";
reportURL_FI[nIndex] = "";
reportGroup[nIndex] = "UIT";
reportUPNCount[nIndex] = 1;
reportUPN[nIndex][1] = 'ml'
nIndex++;
if (nIndex > MAX_REPORTS) alert ("Too many reports");
reportIndex[nIndex] = nIndex;
reportType[nIndex] = "Operations";
reportName[nIndex] = "Flipper Deal Penalties By Branche Office";
reportURL_EQ[nIndex] = "/rpt/FlipperDealPenaltyByBrancheOffice.rpt";
reportURL_FI[nIndex] = "";
reportGroup[nIndex] = "UI";
reportUPNCount[nIndex] = 1;
reportUPN[nIndex][1] = 'ml'
nIndex++;
if (nIndex > MAX_REPORTS) alert ("Too many reports");
reportIndex[nIndex] = nIndex;
reportType[nIndex] = "Operations";
reportName[nIndex] = "Manager Bill & Deliver Report";
reportURL_EQ[nIndex] = "/rpt/ManagerBD.rpt";
reportURL_FI[nIndex] = "";
reportGroup[nIndex] = "UI";
reportUPNCount[nIndex] = 1;
reportUPN[nIndex][1] = 'ml'
nIndex++;
if (nIndex > MAX_REPORTS) alert ("Too many reports");
reportIndex[nIndex] = nIndex;
reportType[nIndex] = "Operations";
reportName[nIndex] = "Desk Worksheet Report";
reportURL_EQ[nIndex] = "/rpt/WorksheetList.rpt";
reportURL_FI[nIndex] = "";
reportGroup[nIndex] = "UI";
reportUPNCount[nIndex] = 1;
reportUPN[nIndex][1] = 'ml'
nIndex++;
if (nIndex > MAX_REPORTS) alert ("Too many reports");
reportIndex[nIndex] = nIndex;
reportType[nIndex] = "Operations";
reportName[nIndex] = "NASD Inquiry Report";
reportURL_EQ[nIndex] = "/rpt/NASDInquiry.rpt";
reportURL_FI[nIndex] = "";
reportGroup[nIndex] = "UI";
reportUPNCount[nIndex] = 1;
reportUPN[nIndex][1] = 'ml'
nIndex++;
if (nIndex > MAX_REPORTS) alert ("Too many reports");
reportIndex[nIndex] = nIndex;
reportType[nIndex] = "Operations";
reportName[nIndex] = "Sales Credit Processing Report";
reportURL_EQ[nIndex] = "/rpt/SalesCreditProcessing.rpt";
reportURL_FI[nIndex] = "";
reportGroup[nIndex] = "UI";
reportUPNCount[nIndex] = 1;
reportUPN[nIndex][1] = 'twp'
nIndex++;
if (nIndex > MAX_REPORTS) alert ("Too many reports");
reportIndex[nIndex] = nIndex;
reportType[nIndex] = "Operations";
reportName[nIndex] = "Mailing List Report";
reportURL_EQ[nIndex] = "/rpt/MailList.rpt";
reportURL_FI[nIndex] = "";
reportGroup[nIndex] = "UIMLT";
reportUPNCount[nIndex] = 1;
reportUPN[nIndex][1] = 'ml'
nIndex++;
if (nIndex > MAX_REPORTS) alert ("Too many reports");
reportIndex[nIndex] = nIndex;
reportType[nIndex] = "Operations";
reportName[nIndex] = "Invitation Report";
reportURL_EQ[nIndex] = GetInvitationRptURL();
reportURL_FI[nIndex] = "";
reportGroup[nIndex] = "UI";
nIndex++;
if (nIndex > MAX_REPORTS) alert ("Too many reports");
reportIndex[nIndex] = nIndex;
reportType[nIndex] = "Operations";
reportName[nIndex] = "Sales Credit - Xtiva Upload";
reportURL_EQ[nIndex] = "/rpt/SalesCredit.rpt";
reportURL_FI[nIndex] = "";
reportGroup[nIndex] = "UI";
reportUPNCount[nIndex] = 1;
reportUPN[nIndex][1] = 'twp'
nIndex++;
if (nIndex > MAX_REPORTS) alert ("Too many reports");
reportIndex[nIndex] = nIndex;
reportType[nIndex] = "Operations";
reportName[nIndex] = "Initial Settlement Report";
reportURL_EQ[nIndex] = "/rpt/InitialSettlementWorksheet.rpt";
reportURL_FI[nIndex] = "";
reportGroup[nIndex] = "UI";
reportUPNCount[nIndex] = 1;
reportUPN[nIndex][1] = 'ml'
nIndex++;
if (nIndex > MAX_REPORTS) alert ("Too many reports");
reportIndex[nIndex] = nIndex;
reportType[nIndex] = "Operations";
reportName[nIndex] = "Operations Worksheet";
reportURL_EQ[nIndex] = "/rpt/OperationsWorksheet.rpt";
reportURL_FI[nIndex] = "";
reportGroup[nIndex] = "MLLST";
reportUPNCount[nIndex] = 1;
reportUPN[nIndex][1] = 'ml'
nIndex++;
if(displayiPlanner)
{
if (nIndex > MAX_REPORTS) alert ("Too many reports");
reportIndex[nIndex] = nIndex;
reportType[nIndex] = "ECM/Syndicate";
reportName[nIndex] = "1-ON-1 Hit Ratio Report (iPlan)";
reportURL_EQ[nIndex] = "/rpt/OneonOne_IP.rpt";
reportURL_FI[nIndex] = "";
reportGroup[nIndex] = "ITShort";
sortFields[nIndex][1] = "ii_name";
sortFieldNames[nIndex][1] = "Account";
sortFields[nIndex][2] = "oi_ioi_qty";
sortFieldNames[nIndex][2] = "Indication";
sortFields[nIndex][3] = "eo_inst_alloc_qty";
sortFieldNames[nIndex][3] = "Allocation";
sortFieldDef[nIndex][1] = "ii_name";
sortFieldDefOrder[nIndex][1] = "A";
versiontype[nIndex] = -1;
nMainReportIndex = nIndex;
nIndex++;
if (nIndex > MAX_REPORTS) alert ("Too many reports");
reportIndex[nIndex] = nIndex;
reportType[nIndex] = "ECM/Syndicate";
reportName[nIndex] = "1-ON-1 Hit Ratio (iPlan)";
reportURL_EQ[nIndex] = "/rpt/OneonOne_IP.rpt";
reportURL_FI[nIndex] = "";
reportGroup[nIndex] = "ITShort";
sortFields[nIndex][1] = "ii_name";
sortFieldNames[nIndex][1] = "Account";
sortFields[nIndex][2] = "oi_ioi_qty";
sortFieldNames[nIndex][2] = "Indication";
sortFields[nIndex][3] = "eo_inst_alloc_qty";
sortFieldNames[nIndex][3] = "Allocation";
sortFieldDef[nIndex][1] = "ii_name";
sortFieldDefOrder[nIndex][1] = "A";
versiontype[nIndex] = nMainReportIndex;
nIndex++;
if (nIndex > MAX_REPORTS) alert ("Too many reports");
reportIndex[nIndex] = nIndex;
reportType[nIndex] = "ECM/Syndicate";
reportName[nIndex] = "1-ON-1 Hit Ratio Report - All Meetings (iPlan)";
reportURL_EQ[nIndex] = "/rpt/OneOnOneAll_IP.rpt";
reportURL_FI[nIndex] = "";
reportGroup[nIndex] = "ITShort";
sortFields[nIndex][1] = "rs_team";
sortFieldNames[nIndex][1] = "Team";
sortFields[nIndex][2] = "rs_day";
sortFieldNames[nIndex][2] = "Date";
sortFields[nIndex][3] = "rs_location";
sortFieldNames[nIndex][3] = "Location";
sortFields[nIndex][4] = "ii_name";
sortFieldNames[nIndex][4] = "Account";
sortFields[nIndex][5] = "oi_ioi_qty";
sortFieldNames[nIndex][5] = "Indication";
sortFields[nIndex][6] = "eo_inst_alloc_qty";
sortFieldNames[nIndex][6] = "Allocation";
sortFieldDef[nIndex][1] = "rs_team";
sortFieldDefOrder[nIndex][1] = "A";
versiontype[nIndex] = nMainReportIndex;
nIndex++;
if (nIndex > MAX_REPORTS) alert ("Too many reports");
reportIndex[nIndex] = nIndex;
reportType[nIndex] = "ECM/Syndicate";
reportName[nIndex] = "1-ON-1 Hit Ratio Report - Team Hit Ratio (iPlan)";
reportURL_EQ[nIndex] = "/rpt/OneOnOneTeam_IP.rpt";
reportURL_FI[nIndex] = "";
reportGroup[nIndex] = "ITShort";
sortFields[nIndex][1] = "rs_team";
sortFieldNames[nIndex][1] = "Team";
sortFields[nIndex][2] = "rs_day";
sortFieldNames[nIndex][2] = "Date";
sortFields[nIndex][3] = "rs_location";
sortFieldNames[nIndex][3] = "Location";
sortFields[nIndex][4] = "ii_name";
sortFieldNames[nIndex][4] = "Account";
sortFields[nIndex][5] = "oi_ioi_qty";
sortFieldNames[nIndex][5] = "Indication";
sortFields[nIndex][6] = "eo_inst_alloc_qty";
sortFieldNames[nIndex][6] = "Allocation";
sortFieldDef[nIndex][1] = "rs_team";
sortFieldDefOrder[nIndex][1] = "A";
versiontype[nIndex] = nMainReportIndex;
nIndex++;
}
addTypedReportsToDropDown();
initSort(document.frmMain.selReport.value);
ResizeViewer(document.report,200,200);
function OnChangeReport()
{
var frm = document.frmMain;
if (frm.selReport.value == 0)
{
hideRAPDivision();
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
document.frmMain.hidSortField1.value = "";
document.frmMain.hidSortField2.value = "";
document.frmMain.hidSortField3.value = "";
document.frmMain.hidSortField4.value = "";
initSort(document.frmMain.selReport.value);
var index = frm.selReport.value;
if ("UI;UIMA;UIMB;UII".indexOf(reportGroup[document.frmMain.selReport.value]) != -1 ||
(versiontype[index] == 0 && reportGroup[index] == "RBReport") || 
reportName[index] == "Flipper Deal Penalties Summary" ||
reportName[index] == "Flipper Deal Penalties By Broker" ||
reportName[index] == "Mailing List Report" ||
reportName[index] == "Initial Settlement Report" )
{
document.frmMain.selTranche.value = -1;
document.frmMain.selTranche.disabled = true;
}
else
{
document.frmMain.selTranche.disabled = false;
}
if (versiontype[document.frmMain.selReport.value] < 0)
{
var elVersion = eval('selectReportVersion');
elVersion.style.display='';
while (document.frmMain.selVersionReport.options.length > 0)
document.frmMain.selVersionReport.options.remove(0);
for (i = 1;i <= NUM_REPORTS;i++)
{
if (versiontype[i] == document.frmMain.selReport.value)
{
var oOption = document.createElement("OPTION");
oOption.text=reportName[i];
oOption.value=reportIndex[i];
document.frmMain.selVersionReport.add(oOption);	
}
} 
OnChangeVersion();
}
else
{
var elVersion = eval('selectReportVersion');
elVersion.style.display='none';
var elLimits = eval('selectMultipleLimitsLayer');
elLimits.style.display='none';
elLimits = eval('selectLimitRange');
elLimits.style.display='none';
}
var elParam = eval('selectLimitLayer');
if (reportGroup[document.frmMain.selReport.value] == 'LIMIT')
elParam.style.display='';
else
elParam.style.display='none';
var elRegion = eval('selectRegionLayer');
if(reportSalesRegion[document.frmMain.selReport.value] == "Y" && document.frmMain.hidDisplaySalesRegionFilter.value == "1")
elRegion.style.display='';
else
elRegion.style.display='none';
var elParam = eval('selectMailingListLayer');
if (reportGroup[document.frmMain.selReport.value] == 'UIMLT')
elParam.style.display='';
else
elParam.style.display='none';
}
function OnChangeVersion()
{
document.frmMain.hidSortField1.value = "";
document.frmMain.hidSortField2.value = "";
document.frmMain.hidSortField3.value = "";
document.frmMain.hidSortField4.value = "";
initSort(document.frmMain.selVersionReport.value);
var elLimits = eval('selectMultipleLimitsLayer');
if (reportGroup[document.frmMain.selVersionReport.value] == 'MLIMITS')
elLimits.style.display='';
else
elLimits.style.display='none';
elLimits = eval('selectLimitRange');
if (reportGroup[document.frmMain.selVersionReport.value] == 'RANGEPRICELIMIT')
elLimits.style.display='';
else
elLimits.style.display='none';
}
function CheckConditionallyRequiredFields( frm, arrFieldsInError )
{
var arrMoreErrors = new Array();
var count = 0;
{
}
return arrMoreErrors;
}
function getReportURL(index, bEquity)
{
var report;
report = "/asp/rpt_get_report.asp?";
if (bEquity)
report += "ReportFile=" + reportURL_EQ[index];
else
report += "ReportFile=" + reportURL_FI[index];
if (getSortCode().length > 0) 
report += '&amp;bstrSortCode="' + getSortCode() + '"';
if (reportGroup[index] == "ITIT")
{
report += '&amp;lIssueid="' + document.frmMain.hidIssID.value + '"';
report += '&amp;lTrancheid="' + document.frmMain.selTranche.value + '"';
report += '&amp;lIssue2id="' + document.frmMain.hidIssID.value + '"';
report += '&amp;lTranche2id="' + document.frmMain.selTranche.value + '"';
}
else if (reportGroup[index] == "ITShort")
{
report += '&amp;bstrUPN="' + document.frmMain.hidUPN.value + '"';
report += '&amp;lIssId="' + document.frmMain.hidIssID.value + '"';
report += '&amp;lTrnId="' + document.frmMain.selTranche.value + '"';
}
else if (reportGroup[index] == "ITLong")
{
report += '&amp;lIssueid="' + document.frmMain.hidIssID.value + '"';
report += '&amp;lTrancheid="' + document.frmMain.selTranche.value + '"';
}
else if (reportGroup[index] == "UIT")
{
report += '&amp;bstrUPN="' + document.frmMain.hidUPN.value + '"';
report += '&amp;lIssId="' + document.frmMain.hidIssID.value + '"';
report += '&amp;lTrnId="' + document.frmMain.selTranche.value + '"';
}
else if (reportGroup[index] == "UI")
{
report += '&amp;bstrUPN="' + document.frmMain.hidUPN.value + '"';
report += '&amp;lIssId="' + document.frmMain.hidIssID.value + '"';
}
else if (reportGroup[index] == "DS")
{
report += '&amp;bstrUPN="' + document.frmMain.hidUPN.value + '"';
report += '&amp;lIssId="' + document.frmMain.hidIssID.value + '"';
report += '&amp;bstrStartDate="2001-05-21"';
report += '&amp;bstrEndDate="2001-05-21"';
}
else if (reportGroup[index] == "PaymentA")
{
report += '&amp;lIssId="' + document.frmMain.hidIssID.value + '"';
report += '&amp;lTrnId="' + document.frmMain.selTranche.value + '"';
report += '&amp;bstrMode="A"';
}
else if (reportGroup[index] == "PaymentU")
{
report += '&amp;lIssId="' + document.frmMain.hidIssID.value + '"';
report += '&amp;lTrnId="' + document.frmMain.selTranche.value + '"';
report += '&amp;bstrMode="U"';
}
else if (reportGroup[index] == "PaymentS")
{
report += '&amp;lIssId="' + document.frmMain.hidIssID.value + '"';
report += '&amp;lTrnId="' + document.frmMain.selTranche.value + '"';
report += '&amp;bstrMode="S"';
}
else if (reportGroup[index] == "BreakoutA")
{
report += '&amp;bstrUPN="' + document.frmMain.hidUPN.value + '"';
report += '&amp;lIssId="' + document.frmMain.hidIssID.value + '"';
report += '&amp;lTrnId="' + document.frmMain.selTranche.value + '"';
report += '&amp;bstrMode="A"';
}
else if (reportGroup[index] == "BreakoutB")
{
report += '&amp;bstrUPN="' + document.frmMain.hidUPN.value + '"';
report += '&amp;lIssId="' + document.frmMain.hidIssID.value + '"';
report += '&amp;lTrnId="' + document.frmMain.selTranche.value + '"';
report += '&amp;bstrMode="B"';
}
else if (reportGroup[index] == "LIMIT")
{
report += '&amp;bstrSecTypeCd="' + document.frmMain.hidSecTypeCd.value + '"';
report += '&amp;lIssueid="' + document.frmMain.hidIssID.value + '"';
report += '&amp;lTrancheid="' + document.frmMain.selTranche.value + '"';
report += AddReportLIMITParam("bstrFilterPrice", document.frmMain.selLimit, document.frmMain.fltLimit);
report += AddReportLIMITParam("bstrFilterCoupon", document.frmMain.selCoupon, document.frmMain.fltCoupon);
report += AddReportLIMITParam("bstrFilterPremium", document.frmMain.selPremium, document.frmMain.fltPremium);
}
else if (reportGroup[index] == "DEALCAPTAIN")
{
report += '&amp;lIssId="' + document.frmMain.hidIssID.value + '"';
report += '&amp;lTrnId="' + document.frmMain.selTranche.value + '"';
report += '&amp;lTimeZoneOffset="' + document.frmMain.hidTimeZoneOffset.value + '"';
report += '&amp;bstrUPN="' + document.frmMain.hidUPN.value + '"';
}
else if (reportGroup[index] == "UIMA")
{
report += '&amp;bstrUPN="' + document.frmMain.hidUPN.value + '"';
report += '&amp;lIssId="' + document.frmMain.hidIssID.value + '"';
report += '&amp;bstrMode="A' + document.frmMain.selRegion.value + '"';
}
else if (reportGroup[index] == "UIMB")
{
report += '&amp;bstrUPN="' + document.frmMain.hidUPN.value + '"';
report += '&amp;lIssId="' + document.frmMain.hidIssID.value + '"';
report += '&amp;bstrMode="B' + document.frmMain.selRegion.value + '"';
}
else if (reportGroup[index] == "MLIMITS")
{
report += '&amp;bstrUPN="' + document.frmMain.hidUPN.value + '"';
report += '&amp;lIssId="' + document.frmMain.hidIssID.value + '"';
report += '&amp;lTrnId="' + document.frmMain.selTranche.value + '"';
report += '&amp;bstrFilterPrice="&lt;DemandAndFalloffByLimit_filter&gt;';
report += AddReportOptionalPriceNodeParam(document.frmMain.selLimit1, document.frmMain.flt_selLimit1);
report += AddReportOptionalPriceNodeParam(document.frmMain.selLimit2, document.frmMain.flt_selLimit2);
report += AddReportOptionalPriceNodeParam(document.frmMain.selLimit3, document.frmMain.flt_selLimit3);
report += AddReportOptionalPriceNodeParam(document.frmMain.selLimit4, document.frmMain.flt_selLimit4);
report += AddReportOptionalPriceNodeParam(document.frmMain.selLimit5, document.frmMain.flt_selLimit5);
report += AddReportOptionalPriceNodeParam(document.frmMain.selLimit6, document.frmMain.flt_selLimit6);
report += '&lt;/DemandAndFalloffByLimit_filter&gt;"';
}
else if (reportGroup[index] == "RANGEPRICELIMIT")
{
report += '&amp;bstrUPN="' + document.frmMain.hidUPN.value + '"';
report += '&amp;lIssId="' + document.frmMain.hidIssID.value + '"';
report += '&amp;lTrnId="' + document.frmMain.selTranche.value + '"';
report += '&amp;bstrFilterPrice="&lt;DemandByPrice&gt;';
report += '&lt;limit_price_lo&gt;' + document.frmMain.fltDemandPriceLow.value + '&lt;/limit_price_lo&gt;';
report += '&lt;limit_price_hi&gt;' + document.frmMain.fltDemandPriceHigh.value + '&lt;/limit_price_hi&gt;';
report += '&lt;limit_price_increment&gt;' + document.frmMain.fltPriceInc.value + '&lt;/limit_price_increment&gt;';
report += '&lt;/DemandByPrice&gt;"';
}
else if (reportGroup[index] == "RBReport")
{
report = reportURL_EQ[index] + "?TrancheID=" + document.frmMain.selTranche.value;
} 
else if (reportGroup[index] == "RBCumDailyDemand")
{
report = reportURL_EQ[index] + "&TrancheID=" + document.frmMain.selTranche.value; 
}
else if (reportGroup[index] == "IndicationPercentagebyBroker")
{
report = reportURL_EQ[index];
report += '?bstrUPN=' + document.frmMain.hidUPN.value;
report += '&amp;lIssId=' + document.frmMain.hidIssID.value;
report += '&amp;lTrnId=' + document.frmMain.selTranche.value;
report += '&amp;DataModel=push';
report += '&amp;TemplateName=IndicationPercentageByBroker.rpt';
report += '&amp;MethodName=ListIndicationPercentageByBroker'; 
}
else if (reportGroup[index] == "ERI")
{
report += '&amp;bstrUPN="' + document.frmMain.hidUPN.value + '"';
report += '&amp;lIssId="' + document.frmMain.hidIssID.value + '"';
report += '&amp;lTrnId="' + document.frmMain.selTranche.value + '"';
report += '&amp;lTimeZoneOffset="' + document.frmMain.hidTimeZoneOffset.value + '"';
}
else if (reportGroup[index] == "UII")
{
report += '&amp;bstrUPN="' + document.frmMain.hidUPN.value + '"';
report += '&amp;lIssId="' + document.frmMain.hidIssID.value + '"';
report += '&amp;lTrnId="' + document.frmMain.selTranche.value + '"';
report += '&amp;lIHIssId="' + document.frmMain.hidIssID.value + '"';
}
else if (reportGroup[index] == "UIMLT")
{
report += '&amp;bstrUPN="' + document.frmMain.hidUPN.value + '"';
report += '&amp;lIssId="' + document.frmMain.hidIssID.value + '"';
report += '&amp;bstrMLType="' + document.frmMain.selMListType.value + '"';
}
else if (reportGroup[index] == "MLLST")
{
report += '&amp;lIssueid="' + document.frmMain.hidIssID.value + '"';
report += '&amp;lTrancheid="' + document.frmMain.selTranche.value + '"';
report += '&amp;bstrUPN="' + document.frmMain.hidUPN.value + '"';
report += '&amp;lIssId="' + document.frmMain.hidIssID.value + '"'; 
}
if(reportSalesRegion[document.frmMain.selReport.value] == "Y")
{
report += '&amp;bstrSalesRegion="' + document.frmMain.selRegion.value + '"';
}
return report;
}
function AddReportOptionalPriceNodeParam(frm_input_elem, frm_txt_elem)
{
if ((typeof(frm_input_elem) != "undefined") && (frm_input_elem.value != ""))
return '&lt;limit_px&gt;' + frm_input_elem.value + '&lt;/limit_px&gt;';
else if ((typeof(frm_txt_elem) != "undefined") && (frm_txt_elem.value != ""))
return '&lt;limit_px&gt;' + frm_txt_elem.value + '&lt;/limit_px&gt;';
else
return '';
}
function AddReportLIMITParam(param_name, frm_input_elem, frm_txt_elem)
{
var retval = '-1';
if ((typeof(frm_input_elem) != "undefined") && (frm_input_elem.value != ""))
retval = frm_input_elem.value;
else if ((typeof(frm_txt_elem) != "undefined") && (frm_txt_elem.value != ""))
retval = frm_txt_elem.value;
return '&amp;' + param_name + '="' + retval + '"';
}
function OnChangeCBEnableTB(frm, comboId, txtId)
{
if (typeof(frm[comboId]) != "undefined")
{
if (frm[comboId].value == "")
frm[txtId].disabled = false;
else
{
frm[txtId].disabled = true;
frm[txtId].value = "";
}
}
}
function submitPage(frm, action)
{
var bEquity;
if (frm.hidDebtEq.value == "D")
bEquity = false;
else
bEquity = true;
switch (action)
{
case "GetReport" :
if (ValidateForm(frm))
{
if (versiontype[frm.selReport.value] < 0)
frm.hidReportURL.value = getReportURL(frm.selVersionReport.value, bEquity);
else 
frm.hidReportURL.value = getReportURL(frm.selReport.value, bEquity);
var sw = screen.width * 0.85
var sh = screen.height * 0.85
var sStyle = "width=" + sw + ",height=" + sh + ",scrollbars=0,resizable=1,left=5,top=5, scrollbars=1";
openGeneralPopup( frm.hidReportURL.value, '', sStyle ); 
}
break;
}
}
function GetInvitationRptURL()
{
var sRpt = "/rpt/A4Invite.rpt" ;
if(document.frmMain.hidUSLeadTranche.value == "1" )
sRpt = "/rpt/LTRInvite.rpt" ;
return sRpt;
}
function ShowSalesRegions()
{
var sUrl = "/asp/rpt_sales_region.asp" ;
var sStyle = "scrollbars=yes,menubar=no,width=400,height=500,toolbar=no,status=no,titlebar=no";
openGeneralPopup(sUrl, '', sStyle);
}
