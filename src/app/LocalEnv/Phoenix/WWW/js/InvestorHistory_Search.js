<!-- 
function onPageLoad()
{
menuShow('investorhistory_search_sales', 'tophide');
getCurrentDate(document.frmMain);
getFromDate(document.frmMain);
}
function CheckConditionallyRequiredFields( frm, arrFieldsInError )
{
var arrMoreErrors = new Array();
if(frm.selSalesPerson){
if ( frm.selSalesPerson.selectedIndex == -1 ) {
var arrError = FieldErrorInfo("selSalesPerson", 'You must select a Sales Person', "", "", "Sales Person");
arrMoreErrors[arrMoreErrors.length] = arrError;
}
}
if(frm.rdtFromDate && frm.rdtInDate){
if ( DateCmp( frm.rdtFromDate.value, frm.rdtInDate.value ) == 1 ){
var arrError = FieldErrorInfo("rdtFromDate", 'The From Date must be a date before the To Date', "", "", "From Date");
arrMoreErrors[0] = arrError;
}
}	
return (arrMoreErrors);
} 
function CustomValidation( frm, arrFieldsInError )
{
var arrMoreErrors = new Array();
return (arrMoreErrors);
} 
function searchSubmitPage( frm, sInvestorName, sSalesMode, sSalesPerson, sFromDate, sToDate )
{
if(ValidateForm( frm ))
{ 
frm.hidInvNm.value = sInvestorName;
frm.hidSalesMode.value = sSalesMode;
frm.hidSalesPerson.value = sSalesPerson;
frm.hidFromDate.value = sFromDate;
frm.hidToDate.value = sToDate; 
frm.method = "POST";
frm.action = "InvestorHistory_SelectClient.asp";
frm.submit();
}
} 
function selectSubmitPage( frm, sSalesMode, sFromDate, sToDate ) 
{
frm.hidSalesMode.value = sSalesMode;
frm.hidFromDate.value = sFromDate;
frm.hidToDate.value = sToDate;
if(ValidateForm( frm ))
{
frm.method = "POST";
frm.action = "InvestorHistory_SearchResults.asp";
frm.submit()
}
} 
function showHideArea(areaName){
var elthis = eval(areaName)
if (elthis.style.display == 'none'){
elthis.style.display = '';
}
else{
elthis.style.display = 'none';
}
}
function getCurrentDate(frm){
var now = new Date();
var day = now.getDate();
var month = now.getMonth()+ 1;
if(frm.rdtInDate){
if(month < 10 && day < 10){
frm.rdtInDate.value = '0' + month + '/' + '0' + day + '/' + (now.getFullYear ? now.getFullYear() : now.getYear());
}
else if(month < 10 && day > 10){
frm.rdtInDate.value = '0' + month + '/' + day + '/' + (now.getFullYear ? now.getFullYear() : now.getYear());
}
else if(month > 10 && day < 10){
frm.rdtInDate.value = month + '/' + '0' + day + '/' + (now.getFullYear ? now.getFullYear() : now.getYear());
}
else{
frm.rdtInDate.value = month + '/' + now.getDate() + '/' + (now.getFullYear ? now.getFullYear() : now.getYear());
}
}
}	
function getFromDate(frm){
var now = new Date();
var day = now.getDate();
var year = now.getFullYear();
var month = now.getMonth()+ 1;
month = 18 - month;
if(month > 12){
month = month - 12;
year = year - 2;
}
else if(month == 12){
year = year - 2; 
}
else{
month = 12 - month;
year--;
} 
if(month < 10 && day < 10){
frm.rdtFromDate.value = '0' + month + '/' + '0' + day + '/' + year;
}
else if(month < 10 && day > 10){	
frm.rdtFromDate.value = '0' + month + '/' + day + '/' + year;
}
else if(month > 10 && day < 10){	
frm.rdtFromDate.value = month + '/' + '0' + day + '/' + year;
}
else
frm.rdtFromDate.value = month + '/' + now.getDate() + '/' + year;
}
