<!-- 
function showHideSelectReport()
{
var old = showHideOneArea('selectReportLayer');
if (old == '')
{
hideOneArea('selectReportLayer2');
hideOneArea('sortLayer');
}
else
{
showOneArea('selectReportLayer2');
initSort(document.frmMain.selReport.value);
}
}
function showHideOneArea(areaName){
var elthis = eval(areaName);
var oldDisplayStyle = elthis.style.display;
if (elthis.style.display == 'none'){
elthis.style.display = '';
}
else{
elthis.style.display = 'none';
}
return oldDisplayStyle;
}
function showOneArea(areaName){
var elthis = eval(areaName);
elthis.style.display = '';
}
function hideOneArea(areaName){
var elthis = eval(areaName);
elthis.style.display = 'none';
}
function getSortCode()
{
var sortCode="";
if (document.frmMain.sortField1.value != "None")
sortCode += document.frmMain.sortField1.value + "1" + document.frmMain.sortOrder1.value;
if (document.frmMain.sortField2.value != "None")
{
if (sortCode.length > 0)
sortCode += ":"
sortCode += document.frmMain.sortField2.value + "2" + document.frmMain.sortOrder2.value;
}
if (document.frmMain.sortField3.value != "None")
{
if (sortCode.length > 0)
sortCode += ":"
sortCode += document.frmMain.sortField3.value + "3" + document.frmMain.sortOrder3.value;
}
if (document.frmMain.sortField4.value != "None")
{
if (sortCode.length > 0)
sortCode += ":"
sortCode += document.frmMain.sortField4.value + "4" + document.frmMain.sortOrder4.value;
}
return sortCode;
}
function addReportsToDropDown()
{
var i;
while (document.frmMain.selReport.options.length > 0)
document.frmMain.selReport.options.remove(0);
{ var oOption = document.createElement("OPTION");
oOption.text = " - Select a report - ";
oOption.value = 0;
document.frmMain.selReport.add(oOption);
}
for (i = 1;i <= NUM_REPORTS;i++)
{
var oOption = document.createElement("OPTION");
oOption.text=reportName[i];
oOption.value=reportIndex[i];
document.frmMain.selReport.add(oOption);
if (reportIndex[i] == document.frmMain.hidRptSelectPos.value)
oOption.selected = true;
}
}
function InitCrossReportsToDropDown(sReportType)
{
var i;
var frm = document.frmMain;
while (frm.selReport.options.length > 0)
frm.selReport.options.remove(0);
{ var oOption = document.createElement("OPTION");
oOption.text = " - Select a report - ";
oOption.value = 0;
frm.selReport.add(oOption);
}
hideSelectReportDate();
hideSelectTranchSummary();
hideSortLayer();
hideRAPDivision();
hideDealCode();
for (i = 1;i <= NUM_REPORTS;i++)
{
if (reportType[i] == sReportType && 
(reportUPNCount[i] == 0 || 
(reportUPN[i][1] == "ssb" && document.frmMain.hidShowSSBReports.value == "1") ||
(reportUPN[i][1] == "ml" && document.frmMain.hidShowMLReports.value == "1") ||
(reportUPN[i][1] == "twp" && document.frmMain.hidShowTWPReports.value == "1") )
)
{
var oOption = document.createElement("OPTION");
oOption.text=reportName[i];
oOption.value=reportIndex[i];
frm.selReport.add(oOption);
if (reportIndex[i] == frm.hidRptSelectPos.value)
oOption.selected = true;
}
}
if (frm.selReportType.value == "ECM/Syndicate")
EnableFRSelection(frm);
else
DisableFRSelection(frm);
}
function addTypedReportsToDropDown()
{
var i;
var frm = document.frmMain;
while (document.frmMain.selReport.options.length > 0)
document.frmMain.selReport.options.remove(0);
{ var oOption = document.createElement("OPTION");
oOption.text = " - Select a report - ";
oOption.value = 0;
document.frmMain.selReport.add(oOption);
}
if (typeof(document.frmMain.selVersionReport) == "object")
{
while (document.frmMain.selVersionReport.options.length > 0)
document.frmMain.selVersionReport.options.remove(0);
}
for (i = 1;i <= NUM_REPORTS;i++)
{
if ((reportType[i] == document.frmMain.selReportType.value) &&
((document.frmMain.hidDebtEq.value == "D" && reportURL_FI[i] != "") ||
(document.frmMain.hidDebtEq.value == "E" && reportURL_EQ[i] != "")) &&
(reportUPNCount[i] == 0 || 
(reportUPN[i][1] == "ssb" && document.frmMain.hidShowSSBReports.value == "1") ||
(reportUPN[i][1] == "ml" && document.frmMain.hidShowMLReports.value == "1") ||
(reportUPN[i][1] == "twp" && document.frmMain.hidShowTWPReports.value == "1") ))
{
if (versiontype[i] <= 0 || reportGroup[i] == "RBReport")
{
var oOption = document.createElement("OPTION");
oOption.text=reportName[i];
oOption.value=reportIndex[i];
document.frmMain.selReport.add(oOption);
}
else
{
var oOption = document.createElement("OPTION");
oOption.text=reportName[i];
oOption.value=reportIndex[i];
document.frmMain.selVersionReport.add(oOption); 
}
if (reportIndex[i] == document.frmMain.hidRptSelectPos.value)
{
oOption.selected = true;
}
}
}
initSort(document.frmMain.selReport.options.value);
if (reportGroup[1] == 'UI')
{
document.frmMain.selTranche.value = -1;
document.frmMain.selTranche.disabled = true;
}
else
{
document.frmMain.selTranche.disabled = false;
}
OnChangeReport();
if (frm.selReportType.value == "ECM/Syndicate")
EnableFRSelection(frm);
else
DisableFRSelection(frm);
}
function addCrossReportsToDropDown()
{
var i;
while (document.frmMain.selReport.options.length > 0)
document.frmMain.selReport.options.remove(0);
{ var oOption = document.createElement("OPTION");
oOption.text = " - Select a report - ";
oOption.value = 0;
document.frmMain.selReport.add(oOption);
}
if (typeof(document.frmMain.selVersionReport) == "object")
{
while (document.frmMain.selVersionReport.options.length > 0)
document.frmMain.selVersionReport.options.remove(0);
}
for (i = 1;i <= NUM_REPORTS;i++)
{
if ((reportType[i] == document.frmMain.selReportType.value) &&
((document.frmMain.hidDebtEq.value == "D" && reportURL_FI[i] != "") ||
(document.frmMain.hidDebtEq.value == "E" && reportURL_EQ[i] != "")) 
)
{
var oOption = document.createElement("OPTION");
oOption.text=reportName[i];
oOption.value=reportIndex[i];
document.frmMain.selReport.add(oOption);
if (reportIndex[i] == document.frmMain.hidRptSelectPos.value)
{
oOption.selected = true;
}
}
}
initSort(document.frmMain.selReport.options.value);
OnChangeReport();
}
function initSort(idx)
{
if (idx == 0)
return; 
var i;
var bShowSortLayer = false;
var iFields = 0;
while (document.frmMain.sortField1.options.length > 0)
document.frmMain.sortField1.options.remove(0);
while (document.frmMain.sortField2.options.length > 0)
document.frmMain.sortField2.options.remove(0);
while (document.frmMain.sortField3.options.length > 0)
document.frmMain.sortField3.options.remove(0);
while (document.frmMain.sortField4.options.length > 0)
document.frmMain.sortField4.options.remove(0);
addInitialSortFieldOption(document.frmMain.sortField1);
addInitialSortFieldOption(document.frmMain.sortField2);
addInitialSortFieldOption(document.frmMain.sortField3);
addInitialSortFieldOption(document.frmMain.sortField4);
if (document.frmMain.hidSortField1.value == "" && sortFieldDef[idx][1] != "")
{
document.frmMain.hidSortField1.value = sortFieldDef[idx][1];
document.frmMain.hidSortOrder1.value = sortFieldDefOrder[idx][1];
}
if (document.frmMain.hidSortField2.value == "" && sortFieldDef[idx][2] != "")
{
document.frmMain.hidSortField2.value = sortFieldDef[idx][2];
document.frmMain.hidSortOrder2.value = sortFieldDefOrder[idx][2];
}
if (document.frmMain.hidSortField3.value == "" && sortFieldDef[idx][3] != "")
{
document.frmMain.hidSortField3.value = sortFieldDef[idx][3];
document.frmMain.hidSortOrder3.value = sortFieldDefOrder[idx][3];
}
if (document.frmMain.hidSortField4.value == "" && sortFieldDef[idx][4] != "")
{
document.frmMain.hidSortField4.value = sortFieldDef[idx][4];
document.frmMain.hidSortOrder4.value = sortFieldDefOrder[idx][4];
}
for(i = 1; i <= MAX_SORT_FIELDS; i++)
{
if (sortFields[idx][i] != "")
{
bShowSortLayer = true;
iFields++;
var oOption1 = document.createElement("OPTION");
oOption1.text=sortFieldNames[idx][i];
oOption1.value=sortFields[idx][i];
document.frmMain.sortField1.add(oOption1);
if (sortFields[idx][i] == document.frmMain.hidSortField1.value)
oOption1.selected = true;
var oOption2 = document.createElement("OPTION");
oOption2.text=sortFieldNames[idx][i];
oOption2.value=sortFields[idx][i];
document.frmMain.sortField2.add(oOption2);
if (sortFields[idx][i] == document.frmMain.hidSortField2.value)
oOption2.selected = true;
var oOption3 = document.createElement("OPTION");
oOption3.text=sortFieldNames[idx][i];
oOption3.value=sortFields[idx][i];
document.frmMain.sortField3.add(oOption3);
if (sortFields[idx][i] == document.frmMain.hidSortField3.value)
oOption3.selected = true;
var oOption4 = document.createElement("OPTION");
oOption4.text=sortFieldNames[idx][i];
oOption4.value=sortFields[idx][i];
document.frmMain.sortField4.add(oOption4);
if (sortFields[idx][i] == document.frmMain.hidSortField4.value)
oOption4.selected = true;
}
}
var elthis = eval('sortLayer');
if (bShowSortLayer)
{
var repLayer = eval('selectReportLayer');
elthis.style.display=repLayer.style.display;
populateSortOrder(document.frmMain.sortOrder1, document.frmMain.sortField1, document.frmMain.hidSortOrder1);
populateSortOrder(document.frmMain.sortOrder2, document.frmMain.sortField2, document.frmMain.hidSortOrder2);
populateSortOrder(document.frmMain.sortOrder3, document.frmMain.sortField3, document.frmMain.hidSortOrder3);
populateSortOrder(document.frmMain.sortOrder4, document.frmMain.sortField4, document.frmMain.hidSortOrder4);
document.frmMain.sortField1.disabled = true;
document.frmMain.sortField2.disabled = true;
document.frmMain.sortField3.disabled = true;
document.frmMain.sortField4.disabled = true;
document.frmMain.sortOrder1.disabled = true;
document.frmMain.sortOrder2.disabled = true;
document.frmMain.sortOrder3.disabled = true;
document.frmMain.sortOrder4.disabled = true;
if (iFields >= 1)
{
document.frmMain.sortField1.disabled = false;
}
if (iFields >= 2)
{
document.frmMain.sortField2.disabled = false;
}
if (iFields >= 3)
{
document.frmMain.sortField3.disabled = false;
}
if (iFields >= 4)
{
document.frmMain.sortField4.disabled = false;
}
OnChangeSort1();
OnChangeSort2();
OnChangeSort3();
OnChangeSort4();
}
else
elthis.style.display="none";
}
function addInitialSortFieldOption(sortField)
{
var oOption = document.createElement("OPTION");
oOption.text="- Select Field -";
oOption.value="None";
sortField.add(oOption);
}
function OnChangeSort1()
{
if (document.frmMain.sortField1.value != "None")
document.frmMain.sortOrder1.disabled = false;
}
function OnChangeSort2()
{
if (document.frmMain.sortField2.value != "None")
document.frmMain.sortOrder2.disabled = false;
}
function OnChangeSort3()
{
if (document.frmMain.sortField3.value != "None")
document.frmMain.sortOrder3.disabled = false;
}
function OnChangeSort4()
{
if (document.frmMain.sortField4.value != "None")
document.frmMain.sortOrder4.disabled = false;
}
function populateSortOrder(sortOrder, sortField, hidField)
{
while (sortOrder.options.length > 0)
sortOrder.options.remove(0);
var oOptionAsc = document.createElement("OPTION");
oOptionAsc.text="Ascending";
oOptionAsc.value="A";
sortOrder.add(oOptionAsc);
if ("A" == hidField.value && sortField.value != "None")
oOptionAsc.selected = true;
var oOptionDes = document.createElement("OPTION");
oOptionDes.text="Descending";
oOptionDes.value="D";
sortOrder.add(oOptionDes);
if ("D" == hidField.value && sortField.value != "None")
oOptionDes.selected = true;
}
function ResizeViewer(viewer, initialOffsetX, initialOffsetY)
{
if (viewer == null)
return;
var oElement=viewer;
var lOffsetX=initialOffsetX;
var lOffsetY=initialOffsetY;
while(oElement)
{
lOffsetX+=oElement.offsetLeft;
lOffsetY+=oElement.offsetTop;
oElement=oElement.offsetParent
}
if (document.body.offsetWidth-lOffsetX > 320)
viewer.width = document.body.offsetWidth-lOffsetX;
if (document.body.offsetHeight-lOffsetY > 200)
viewer.height = document.body.offsetHeight-lOffsetY;
}
function OnClickRAPNext()
{
try
{
var frm = document.frmMain;
var sUrl;
var arrVals;
if (frm.selReport.value == 0)
alert("You must select a report.");
else
{
showRAPDivision();
}
}
catch (e)
{
}
}
function OnSwitchFRTab(sTarget, sPage)
{
try
{
var frm = document.frmMain;
var sUrl;
var arrVals;
if (frm.selReport.value == 0)
alert("You must select a report.");
}
catch (e)
{
}
}
function showRAPDivision()
{
try
{	
document.all.divRAPNext.style.display = "block";
}
catch (e)
{
}
}
function hideRAPDivision()
{
try
{	var frm = document.frmMain;
if (frm.selReport.value == 0)
document.all.divRAPNext.style.display = "none";
}
catch (e)
{
}
}
function hideDealCode()
{
try
{	
document.all.selectDealCode.style.display = "none";
}
catch (e)
{
}
}
function hideBtnNext()
{
try
{	
document.all.divBtnNext.style.display = "none";
}
catch (e)
{
}
}
function hideSelectReportDate()
{
try
{	
document.all.selectReportDate.style.display = "none";
}
catch (e)
{
}
}
function hideSortLayer()
{
try
{	
document.all.sortLayer.style.display = "none";
}
catch (e)
{
}
}
function EnableFRSelection(frm)
{
try
{	
}
catch (e)
{
}
}
function DisableFRSelection(frm)
{
try
{	
}
catch (e)
{
}
}
function hideSelectTranchSummary()
{
try
{
document.all.TradeSummaryFilter.style.display = "none";
}
catch(e)
{
}
}
