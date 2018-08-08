<!-- 
RSEnableRemoteScripting("/_ScriptLibrary");
function onPageLoad()
{
OnChange(document.frmMain);
}
function EnableSelect( elem )
{
elem.disabled = false;
}
function DisableSelect( elem )
{ 
elem.disabled = true; 
}
function error_alert(co)
{
alert("Error_callback\n\n" +
"status = " + co.status + "\n\n" +
"message = " + co.message + "\n\n" +
"data = " + co.data);
}
function OnChange(frm)
{
if (frm.selFilter_trn_id.options) {
var lTrn_id = frm.selFilter_trn_id.options[frm.selFilter_trn_id.selectedIndex].value; 
} else {
var lTrn_id = frm.selFilter_trn_id.value
}
if (frm.selFilter_prd_id.options) {
var lPrd_id = frm.selFilter_prd_id.options[frm.selFilter_prd_id.selectedIndex].value;
} else {
var lPrd_id = frm.selFilter_prd_id.value;
}
if (frm.selFilter_ccy_id.options) {
var lCcy_id = frm.selFilter_ccy_id.options[frm.selFilter_ccy_id.selectedIndex].value;
} else {
var lCcy_id = frm.selFilter_ccy_id.value;
}
var lIss_id = frm.hidIssID.value;
var bIsBond = frm.hidIsBond.value; 
var bIssuerView = frm.hidIsIssuerView.value; 
if (bIsBond == 1)
{
GetRemoteList(frm.selFilter_coupon, "coupon", lIss_id, lTrn_id, lPrd_id, lCcy_id, bIssuerView);
GetRemoteList(frm.selFilter_premium, "premium", lIss_id, lTrn_id, lPrd_id, lCcy_id, bIssuerView);
}
else
{ 
GetRemoteList(frm.selFilter_price, "price", lIss_id, lTrn_id, lPrd_id, lCcy_id, bIssuerView);
}
}
function GetRemoteList (elem, sListType, lIss_id, lTrn_id, lPrd_id, lCcy_id, bIssuerView)
{
var sArray;
var co;
var nIndex;
var iSelectedIndex = elem.selectedIndex;
if (elem.options) {
switch (sListType)
{
case "price" :
var co = RSExecute('rs_Reports_BookView_Filter.asp', 'js_GetEquityLimitsPrice', lIss_id, lTrn_id, lPrd_id, lCcy_id, bIssuerView); 
break;
case "coupon" :
var co = RSExecute('rs_Reports_BookView_Filter.asp', 'js_GetEquityLimitsCoupon', lIss_id, lTrn_id, lPrd_id, lCcy_id, bIssuerView); 
break;
case "premium" :
var co = RSExecute('rs_Reports_BookView_Filter.asp', 'js_GetEquityLimitsPremium', lIss_id, lTrn_id, lPrd_id, lCcy_id, bIssuerView); 
break; 
}
if (co.status != 0)
{
error_alert(co);
return;
}
sArray = co.return_value.split(",");
elem.options.length = 0;
var opt = document.createElement("OPTION");
opt.value = "-1";
opt.text = "All"; 
elem.options.add(opt)
if (sArray != "undefined")
{
for (nIndex = 0; nIndex < sArray.length; nIndex++)
{
opt = document.createElement("OPTION");
opt.value = trimString(sArray[nIndex]);
opt.text = trimString(sArray[nIndex]);
elem.options.add(opt);
}
}
elem.selectedIndex = iSelectedIndex;
}
}
function trimString (str) {
str = this != window? this : str;
return str.replace(/^\s+/g, '').replace(/\s+$/g, '');
}
function sortindications ( frm, sSort_Order )
{
frm.hidFilter_sort_order.value = sSort_Order;
frm.submit();
}
function changeSelIssuerView(frm)
{
var choice = frm.selIssrView.value;
var url = "/aspx/UI/Bookview/BookviewIssuerView.aspx?view_type=";
if (choice == "INSTDEMAND")
{
url += "I";
window.location.href = url;
}
if (choice == "INSTDEMAND_IP")
{
url += "I&iplanner=1";
window.location.href = url;
}	
else if (choice == "RETDEMAND")
{
url += "R";
window.location.href = url;
}
else if (choice == "PRICEDISCOVERY")
{
url += "P";
window.location.href = url;
}
}
