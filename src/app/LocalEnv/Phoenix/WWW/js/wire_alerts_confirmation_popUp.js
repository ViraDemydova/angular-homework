<!-- 
function onPageLoad()
{
self.focus();
confirmation();
}
function confirmation()
{
window.opener.startPolling();
}
function popupAlertsBox(){
var sUrl = "wire_InBox.asp";
window.open(sUrl,"alertsBox");
window.close();
}
