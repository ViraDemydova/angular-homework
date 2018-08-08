<!-- 
function onPageLoad()
{
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
function submitPage( frm )
{ 
var sStyle = 'scrollbars=yes,menubar=yes,height=600,width=725,toolbar=no,status=no,titlebar=no,resizable=yes';
var sWinName = '_blank';
var winNew;
var sNav = new String(navigator.userAgent);
var iIE = sNav.indexOf("MSIE");
if(frm.contentmanager && frm.contentmanager.checked){
winNew = window.open((iIE > 0)?'':'/help/pdf/Content_Manager_Getting_Started_Guide.pdf', sWinName, sStyle );
if (winNew != null)
{
opened = true;
winNew.focus();
if (iIE > 0)
winNew.navigate('/help/pdf/Content_Manager_Getting_Started_Guide.pdf');
}
}	
if(frm.syndicatemanager && frm.syndicatemanager.checked){
winNew = window.open((iIE > 0)?'':'/help/pdf/Syndicate_Manager_Getting_Started_Guide.pdf', sWinName, sStyle );	
if (winNew != null)
{
opened = true;
winNew.focus();
if (iIE > 0)
winNew.navigate('/help/pdf/Syndicate_Manager_Getting_Started_Guide.pdf');
}
}	
if(frm.syndicatemarketer && frm.syndicatemarketer.checked){
winNew = window.open((iIE > 0)?'':'/help/pdf/Syndicate_Marketer_Getting_Started_Guide.pdf', sWinName, sStyle );	
if (winNew != null)
{
opened = true;
winNew.focus();
if (iIE > 0)
winNew.navigate('/help/pdf/Syndicate_Marketer_Getting_Started_Guide.pdf');
}
}	
if(frm.syndicateparticipant && frm.syndicateparticipant.checked){
winNew = window.open((iIE > 0)?'':'/help/pdf/Broker_Dealer_Getting_Started_Guide.pdf', sWinName, sStyle );	
if (winNew != null)
{
opened = true;
winNew.focus();
if (iIE > 0)
winNew.navigate('/help/pdf/Broker_Dealer_Getting_Started_Guide.pdf');
}
}
if(frm.issuer && frm.issuer.checked){
winNew = window.open((iIE > 0)?'':'/help/pdf/Issuer_Getting_Started_Guide.pdf', sWinName, sStyle );	
if (winNew != null)
{
opened = true;
winNew.focus();
if (iIE > 0)
winNew.navigate('/help/pdf/Issuer_Getting_Started_Guide.pdf');
}
} 
if(frm.sales && frm.sales.checked){
winNew = window.open((iIE > 0)?'':'/help/pdf/Sales_Getting_Started_Guide.pdf', sWinName, sStyle );	
if (winNew != null)
{
opened = true;
winNew.focus();
if (iIE > 0)
winNew.navigate('/help/pdf/Sales_Getting_Started_Guide.pdf');
}
} 
if(frm.investor && frm.investor.checked){
winNew = window.open((iIE > 0)?'':'/help/pdf/Institutional_Investor_Getting_Started_Guide.pdf', sWinName, sStyle );	
if (winNew != null)
{
opened = true;
winNew.focus();
if (iIE > 0)
winNew.navigate('/help/pdf/Institutional_Investor_Getting_Started_Guide.pdf');
}
} 
if(frm.customeradmin && frm.customeradmin.checked){
winNew = window.open((iIE > 0)?'':'/help/pdf/Customer_Administrator_Getting_Started_Guide.pdf', sWinName, sStyle );	
if (winNew != null)
{
opened = true;
winNew.focus();
if (iIE > 0)
winNew.navigate('/help/pdf/Customer_Administrator_Getting_Started_Guide.pdf');
}
} 
if(frm.dealadmin && frm.dealadmin.checked){
winNew = window.open((iIE > 0)?'':'/help/pdf/Deal_Administrator_Getting_Started_Guide.pdf', sWinName, sStyle );	
if (winNew != null)
{
opened = true;
winNew.focus();
if (iIE > 0)
winNew.navigate('/help/pdf/Deal_Administrator_Getting_Started_Guide.pdf');
}
}
}
