function OnMouseOver(object)
{ 
if (!object.contains(event.fromElement))
{ 
object.style.cursor = 'hand'; 
} 
}
function OnMouseOut(object)
{ 
if (!object.contains(event.toElement)){ 
object.style.cursor = 'default'; 
} 
}
function displayPopupMessage( sUserMsg )
{
var sWinName;
var sMessage = new String();
if (displayPopupMessage.arguments.length == 2) {
sWinName = displayPopupMessage.arguments[1];
} else {
sWinName = "Message";
}
sMessage = "<html><head>";
sMessage = sMessage + "<title>" + document.title + " " + sWinName + "</title>";
sMessage = sMessage + "</head><body>";
sMessage = sMessage + "<table cellspacing='0' cellpadding='0' width='100%' height='62' border='0'>"
sMessage = sMessage + "<tr><td width='119' height='62' rowspan='3' class='topWelcomeArea1' valign='top'><img src='../images/brand.gif' width='119' height='62' border='0' alt='i-Deal'></td>"
sMessage = sMessage + "<td width='20' height='30' class='topWelcomeArea'><img src='../images/spacer.gif' width='20' height='30' border='0'></td>"
sMessage = sMessage + "<td class='topWelcomeArea'>&#160;</td>"
sMessage = sMessage + "<td class='topWelcomeArea' nowrap width='50%'><img src='../images/spacer.gif' width='2' height='7' border='0'><br><img src='../images/spacer.gif' width='10' height='3' border='0'>&#160; </td>"
sMessage = sMessage + "<td class='topWelcomeArea' width='50%' align='right' nowrap><img src='../images/spacer.gif' width='2' height='7' border='0'><br>&#160;<img src='../images/spacer.gif' width='10' height='10' border='0'></td>"
sMessage = sMessage + "</tr>"
sMessage = sMessage + "<tr><td colspan='4' height='3'><img src='../images/spacer.gif' width='10' height='3' border='0'></td></tr>"
sMessage = sMessage + "<tr><td colspan='4'>"
sMessage = sMessage + sUserMsg;
sMessage = sMessage + "<br><a href='Javascript:window.close()'>Close</a>&#160;&#160;&#160;&#160;";
sMessage = sMessage + "<a href='javascript:print();'>Print</a>";
sMessage = sMessage + "</td></tr>";
sMessage = sMessage + "</table></body></html>";
var sHeight = "height=450"
var sWindowParms = "toolbar=no,location=no,directories=no,scrollbars=yes,resizable=yes,width=450,center=yes,dependent=yes," + sHeight;
var sChildName = window.name + sWinName;
var newWindow = window.open("",sChildName,sWindowParms);
newWindow.document.open();
newWindow.document.write(sMessage);
newWindow.document.close();
newWindow.focus();
}
function showDebugMenu()
{
if (event.altKey==true && event.shiftKey==true)
{
var sUrl = "/aspx/ui/test/Permission.aspx";
var sStyle = "width=1024,height=768,resizable=1,scrollbars=1,menubar=1,location=1,status=1,titlebar=1,toolbar=1";
openGeneralPopup( sUrl, '', sStyle );	
}
}
