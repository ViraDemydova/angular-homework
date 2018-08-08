<!-- 
function respond(frm)
{
window.open("wire_respond_popUp.asp?hidWireID=" + frm.hidWireID.value,'respond','height=700,width=660,resizable,status,scrollbars');
}
function openDealSearchPopup()
{
var sSessionID = getSessionID();
var wireid = document.frmMain.hidWID.value;
var popupGeneral = window.open( 'syndcon_import_deal_popup.asp?wireid=' + wireid, sSessionID, 'width=600,height=500,resizable,toolbar=no,scrollbars,menubar=no');
var bIE = (navigator.userAgent.indexOf("MSIE")>=1); 
if ( bIE ) {
eval("try { popupGeneral.focus(); } catch(e) {}");
}
else {
popupGeneral.focus();
}
}
function DisplayMessage()
{
alert("Unfortunately, you are not as yet an i-Deal client, so this service is unavailable to you. \nPlease call 212-812-0972 to find out how your firm can benefit from our services."); 
}
