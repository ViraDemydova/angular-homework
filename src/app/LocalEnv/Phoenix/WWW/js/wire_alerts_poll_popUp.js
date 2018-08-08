<!-- 
function onPageLoad()
{
PollNewWire();
}
function GetNumberOfNewWires()
{
var co = RSExecute("/asp/rs_wire_checkNewWire.asp","js_GetNumberOfNewWires");
return co.return_value;
}
function PollNewWire()
{
Poll();
}
function Poll()
{
var iNumberOfNewWires = GetNumberOfNewWires();
if (iNumberOfNewWires> 0)
{
popUpAlertConfirmation(iNumberOfNewWires);
}
else
startPolling();
}
function startPolling()
{
setTimeout('PollNewWire()', 30000);
}
function popUpAlertConfirmation(iNumberOfNewWires){
var sUrl = "wire_alerts_confirmation_popUp.asp?numWires=" + iNumberOfNewWires;
var sStyle = "width=200,";
sStyle += "height=100";
window.open(sUrl, 'alerts', sStyle);
}
