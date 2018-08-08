<!-- 
function submitPage( )
{
var frm = document.frmMain;
frm.method = "POST";
frm.action = "syndcon_dealsearch_popup.asp";
frm.submit();
}
function onEnterPressed( event, element, funcHandler ) 
{
var bEnterPressed;
if (document.all) 
{
bEnterPressed = (window.event && window.event.keyCode == 13);
}
else
{
bEnterPressed = (event && event.which == 13);
}
if ( bEnterPressed )
{
funcHandler();
}
}
function SelectDeal(iss_id, issue_cd, issue_nm)
{
var frm = document.frmMain;
if (frm.hidCalledFrom.value == 'import_deal')
{
frm.hidRecipientIssId.value = iss_id;
frm.hidRecipientIssCd.value = issue_cd;
frm.hidRecipientIssNm.value = issue_nm;
frm.method = "POST";
frm.action = "syndcon_import_deal_popup.asp";
frm.submit(); 
}
else
{
window.opener.NewDealSelected(iss_id, issue_cd, issue_nm);
window.close();
}
}
function cancelPage()
{
var frm = document.frmMain;
if (frm.hidCalledFrom.value == 'import_deal')
{
frm.method = "POST";
frm.action = "syndcon_import_deal_popup.asp";
frm.submit(); 
}
else
window.close();	
}
