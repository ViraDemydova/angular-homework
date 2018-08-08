<!-- 
function onPageLoad()
{
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
function searchSubmitPage( frm, sInvestorName, sSalesMode, sSalesPerson, sFromDate, sToDate )
{
if(ValidateForm( frm ))
{ 
window.location = "InvestorHistory_SelectClient.asp?InvestorName="+escape(sInvestorName)+"&Mode="+sSalesMode+"&SalesPerson="+escape(sSalesPerson)+"&FromDate="+escape(sFromDate)+"&ToDate="+escape(sToDate)+""; 
}
} 
function selectSubmitPage( frm, sInvestorName, sFromDate, sToDate, sOldInvNm, sSalesMode, sSalesPerson) 
{
var selectID = sInvestorName.selectedIndex;
var selectValue = sInvestorName.options[selectID].value;
var selectName = sInvestorName.options[selectID].text;
frm.hidInvNm.value = selectName;
frm.hidInvId.value = selectValue;
if(ValidateForm( frm ))
{
frm.method = "POST";
frm.action="InvestorHistory_SearchResults.asp";
frm.submit();
}
} 
