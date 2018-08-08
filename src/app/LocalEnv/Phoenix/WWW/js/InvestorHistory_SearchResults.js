<!-- 
function onPageLoad()
{
if (fnExists('menuShow'))
menuShow('investorhistory_search_sales', 'tophide');
}
function CheckConditionallyRequiredFields( frm, arrFieldsInError )
{
var arrMoreErrors = new Array();
return (arrMoreErrors);
} 
function CustomValidation( frm, arrFieldsInError )
{
var arrMoreErrors = new Array();
return (arrMoreErrors);
} 
function submitPage( frm, pagename )
{
if(ValidateForm( frm ))
{ 
frm.method = "POST";
frm.action = pagename;
frm.submit();
}
} 
function showHideArea(areaName){
var elthis = document.getElementsByName(areaName);
if (elthis.length > 0)
{
for(var i = 0; i < elthis.length; i++)
{
if (elthis[i].style.display == 'none'){
elthis[i].style.display = '';
}
else{
elthis[i].style.display = 'none';
}
}
}
}
function submitColumnSort( strColumn, frm )
{
if( strColumn != frm.hidCurrentSortColumn.value )
{
frm.hidCurrentSortColumn.value = strColumn;
frm.hidCurrentSortOrder.value = "ascending";
}
else if( frm.hidCurrentSortOrder.value == "ascending" ){
frm.hidCurrentSortOrder.value = "descending";	
}	
else{
frm.hidCurrentSortOrder.value = "ascending";
}	
frm.method = "POST";
frm.action = "InvestorHistory_SearchResults.asp";
frm.submit();
}
function submitColumnSortEq( strColumn, frm )
{
if( strColumn != frm.hidCurrentSortColumnEq.value )
{
frm.hidCurrentSortColumnEq.value = strColumn;
frm.hidCurrentSortOrderEq.value = "ascending";
}
else if( frm.hidCurrentSortOrderEq.value == "ascending" ){
frm.hidCurrentSortOrderEq.value = "descending";	
}	
else{
frm.hidCurrentSortOrderEq.value = "ascending";
}	
frm.method = "POST";
frm.action = "InvestorHistory_SearchResults.asp";
frm.submit();
}
function submitNewDateSearch(frm)
{
if(ValidateForm( frm ))
{ 
frm.hidFromDate.value = frm.rdtFromDate.value;
frm.hidToDate.value = frm.rdtInDate.value;
frm.method = "POST";
frm.action = "investorhistory_searchresults.asp";
frm.submit();
}
}
function ExportExcel()
{
document.frmMain.hidExportToExcel.value = "true";
document.frmMain.method="POST";
document.frmMain.action = "investorhistory_searchresults.asp";
document.frmMain.submit();
document.frmMain.hidExportToExcel.value = "";
}
