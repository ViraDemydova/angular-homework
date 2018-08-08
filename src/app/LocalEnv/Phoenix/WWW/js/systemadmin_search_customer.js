<!-- 
function onPageLoad()
{
document.frmMain.rsCustomerName.focus();
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
function submitPage( frm , action )
{
switch (action)
{
case "Search" :
if(ValidateForm( frm ))
{
frm.action = "/asp/systemadmin_search_customer.asp";
frm.hidAction.value = "Search";
frm.submit(); 
}
break;
}
}
