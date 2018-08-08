<!-- 
function viewWireInBox(mode)
{
var frm = document.frmMain;
frm.hidMode.value = mode;
frm.action = "wire_Inbox.asp";
frm.submit();
}
function openDealSearchPopup(iss_type_code)
{
var sSessionID = getSessionID();
var popupGeneral = window.open( 'syndcon_dealsearch_popup.asp?hidDealTypeCode=' + iss_type_code, sSessionID, 'width=600,height=500,resizable,toolbar=no,scrollbars,menubar=no');
var bIE = (navigator.userAgent.indexOf("MSIE")>=1); 
if ( bIE ) {
eval("try { popupGeneral.focus(); } catch(e) {}");
}
else {
popupGeneral.focus();
}
}
function NewDealSelected(iss_id, issue_cd, issue_nm)
{
var frm = document.frmMain;
frm.txtRecipientDealCode.value = issue_nm + ": " + issue_cd;
frm.hidRecipientIssId.value = iss_id;
}
function submitPage()
{
var frm = document.frmMain;
if (frm.hidRecipientIssId.value.length > 0)
{
frm.action = "/asp/util_submit_action.asp";
frm.hidAction.value = "Import";
frm.submit();
}
else
alert("Please select the deal.");
}
function DisplayMessage()
{
alert("Unfortunately, you are not as yet an i-Deal client, so this service is unavailable to you. \nPlease call 212-812-0972 to find out how your firm can benefit from our services."); 
}
