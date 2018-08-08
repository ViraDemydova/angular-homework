<!-- Begin old browser hide
var g_Logoff = false;
function OnBeforeUnload() 
{ 
if ((event.clientX > document.body.clientWidth && event.clientY < 0) || event.altKey) 
{ 
g_Logoff = true;
} 
} 
function OnUnload() 
{ 
closePopups();
} 
var popupError; 
var popupCalendar;	
var popupGeneral; 
var popupHelp; 
var popupSubReport;	
var popupSubReport2; 
function FastFindCustomValidation( frm, arrFieldsInError )
{
var arrMoreErrors = new Array();
if (frm.name == "frmFastFind") {
if(frm.selSearchType.type == "hidden")
{
if (frm.selSearchColumn.options[frm.selSearchColumn.selectedIndex].value == "symbol" && frm.selSearchType.value == "Debt") {
arrMoreErrors[0] = FieldErrorInfo("selSearchType", 'Cannot search on Ticker symbol and Debt. Please change to Equity or choose another fields to search on.', "", "selSearchType", "Invalid Selection");
}
}
else if (frm.selSearchColumn.options[frm.selSearchColumn.selectedIndex].value == "symbol" && frm.selSearchType.options[frm.selSearchType.selectedIndex].value == "Debt") {
arrMoreErrors[0] = FieldErrorInfo("selSearchType", 'Cannot search on Ticker symbol and Debt. Please change to Equity or choose another fields to search on.', "", "selSearchType", "Invalid Selection");
}
}
return (arrMoreErrors);
} 
function submitFastFind( frm )
{
if(ValidateForm( frm ))
{
frm.submit();
return true;
}
}
function GetMRUDeal ( frm, page, val )
{ 
if ( val != -1 )
{
if ( val.substr(0, 1) == "E" ) {
frm.hidDebtEquityFlag.value = "Equity";
} else {
frm.hidDebtEquityFlag.value = "Debt";
}
var index = 0;
var sExp = new RegExp(";");
index = val.search(sExp);
frm.hidIssueId.value = val.substring(1,index);
val = val.substr(index+1)
index = val.search(sExp);
frm.hidIssueName.value = val.substring(0, index);
val = val.substr(index+1);
index = val.search(sExp);
frm.hidIssueCode.value = val.substring(0, index);
frm.action = "/asp/" + page;
frm.submit();
}
}
function userSettings()
{
this.dateMask = 'MM/DD/YYYY';
this.locale = '1033';
this.numberSeparator = ',';
this.decimalPointChar = '.';
this.browser = 'IE';
this.activePage = setActivePage;
}
var UserSettings = new userSettings()
function setActivePage( pageId )
{
setCookie( 'api', pageId );
}
function showCalendar(elem) {
show_calendar(elem, null, null, UserSettings.dateMask.toUpperCase(), 'POPUP', 'AppendOrReplace=Replace;CloseOnSelect=Yes;ReturnData=Date;Title=Calendar;InlineX=10;InlineY=275;AllowWeekends=Yes;Resizable=Yes;');
}
function showCalendar2(lnk,elem) 
{
var cal = new CalendarPopup('div_calendar');
cal.showYearNavigation();
cal.select(eval(elem), lnk.id, UserSettings.dateMask, null);
}
function showTodaysDate()
{
today = new Date();
if (today.getDay() == 0)
day = "Sunday";
else if (today.getDay() == 1)
day = "Monday";
else if (today.getDay() == 2)
day = "Tuesday";
else if (today.getDay() == 3)
day = "Wednesday";
else if (today.getDay() == 4)
day = "Thursday";
else if (today.getDay() == 5)
day = "Friday";
else if (today.getDay() == 6)
day = "Saturday";
if (today.getMonth()==0)
month = "January";
else if (today.getMonth()==1)
month = "February";
else if (today.getMonth()==2)
month = "March";
else if (today.getMonth()==3)
month = "April";
else if (today.getMonth()==4)
month = "May";
else if (today.getMonth()==5)
month = "June";
else if (today.getMonth()==6)
month = "July";
else if (today.getMonth()==7)
month = "August";
else if (today.getMonth()==8)
month = "September";
else if (today.getMonth()==9)
month = "October";
else if (today.getMonth()==10)
month = "November";
else if (today.getMonth()==11)
month = "December";
document.write(day, ", ", month, " ", today.getDate());
} 
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
function closePopups()
{
if( popupError!=null ) popupError.close();
if( popupCalendar != null ) popupCalendar.close();
if( popupGeneral != null ) popupGeneral.close();
if( popupHelp != null ) popupHelp.close();
if( popupSubReport != null ) popupSubReport.close();
if( popupSubReport2 != null ) popupSubReport2.close() ;
}
function openGeneralPopup( url, html, style )
{
var sSessionID = getSessionID();
popupGeneral = window.open( url, sSessionID, style);
if ( html.length > 0 )
{
popupGeneral.document.open();
popupGeneral.document.write( html );
popupGeneral.document.close();
}
var bIE = (navigator.userAgent.indexOf("MSIE")>=1); 
if ( bIE ) {
eval("try { popupGeneral.focus(); } catch(e) {}");
}
else {
popupGeneral.focus();
}
}
function openSubReportPopup( url, html, style )
{
var sSessionID = getSessionID();
popupSubReport = window.open( url, sSessionID + "SubReport", style);
if ( html.length > 0 )
{
popupSubReport.document.open();
popupSubReport.document.write( html );
popupSubReport.document.close();
}
var bIE = (navigator.userAgent.indexOf("MSIE")>=1); 
if ( bIE ) {
eval("try { popupSubReport.focus(); } catch(e) {}");
}
else {
popupSubReport.focus();
}
}
function openSubReport2Popup( url, html, style )
{
var sSessionID = getSessionID();
popupSubReport2 = window.open( url, sSessionID + "SubReport2", style);
if ( html.length > 0 )
{
popupSubReport2.document.open();
popupSubReport2.document.write( html );
popupSubReport2.document.close();
}
var bIE = (navigator.userAgent.indexOf("MSIE")>=1); 
if ( bIE ) {
eval("try { popupSubReport2.focus(); } catch(e) {}");
}
else {
popupSubReport2.focus();
}
}
function openHelpPopup( url )
{
var sSessionID = getSessionID();
var style = 'scrollbars=yes,menubar=yes,height=600,width=725,toolbar=yes,status=yes,titlebar=yes,resizable=yes';
popupHelp = window.open( url, sSessionID + "Help", style);
popupHelp.focus();
}
function getCookie(special) 
{
var cookieName = (special + "=");
var i = 0;
while (i < document.cookie.length) 
{
var j = i + cookieName.length;
if (document.cookie.substring(i, j) == cookieName) return getCookieValue(j);
i = document.cookie.indexOf(" ", i) + 1;
if (i == 0) break; 
}
return "down";
}
function getCookieValue(offset) 
{
var endString = document.cookie.indexOf (";", offset);
if (endString == -1) endString = document.cookie.length;
return unescape(document.cookie.substring(offset, endString));
}
function setCookie(cookieName, cookieData)
{
document.cookie = cookieName + "=" + escape(cookieData);
}
function getSessionID()
{
var sCookie = getCookie( 'IDEALSESSION' );
var nPos = sCookie.indexOf( 'SessionID=' );
var sSessionId = sCookie.substring( sCookie.indexOf( '=', nPos ) + 2, sCookie.indexOf( '&', nPos )-1 );
return sSessionId.replace(/-/g, "");
}
function DateCmp( dtA, dtB )
{
var slash1 = new String();
var slash2 = new String();
var sDate = FormatDate( dtA, UserSettings.dateMask, 'MM/DD/YYYY' );
slash1 = sDate.indexOf('/');
slash2 = sDate.indexOf('/', slash1 + 1);
var monthFieldA	= new String( sDate.substring( 0, slash1 ) );
var dayFieldA	= new String( sDate.substring( slash1+1, slash2 ));
var yearFieldA	= new String( sDate.substr( slash2+1) );
sDate = FormatDate( dtB, UserSettings.dateMask, 'MM/DD/YYYY' );
slash1 = sDate.indexOf('/');
slash2 = sDate.indexOf('/', slash1 + 1);
var monthFieldB	= new String( sDate.substring( 0, slash1 ) );
var dayFieldB	= new String( sDate.substring( slash1+1, slash2 ));
var yearFieldB	= new String( sDate.substr( slash2+1) );
var dtOne = new Date( yearFieldA, monthFieldA, dayFieldA );
var dtTwo = new Date( yearFieldB, monthFieldB, dayFieldB );
return ( dtOne.getTime() < dtTwo.getTime() ? -1 : dtOne.getTime() == dtTwo.getTime() ? 0 : 1 );
}
function idealToFixed(num, fractionDigits)
{
var sValue = ""+num;
if((num==NaN)||(fractionDigits<0)||(fractionDigits>20))
return sValue;
var decimalPoint = sValue.indexOf(".");
var sValueTemp = "";
var nLeftSize = 0;
if(decimalPoint<0)
{
sValueTemp = sValue;
nLeftSize = sValue.length;
}
else
{
sValueTemp = sValue.substring(0, decimalPoint)
+sValue.substring(decimalPoint+1, sValue.length);
nLeftSize = decimalPoint;
}
var sDec = getDecimal(sValue);
if(sDec.length>fractionDigits)
{
nTempDigit1 = new Number(sValueTemp.charAt(nLeftSize+fractionDigits));
nTempDigit2 = new Number(sValueTemp.charAt(nLeftSize+fractionDigits-1));
sValueTemp = sValueTemp.substring(0, nLeftSize+fractionDigits-1);
if(nTempDigit1>=5)
{
nTempDigit2+=1;
}
if(nTempDigit2<10)
{
sValueTemp+=nTempDigit2;
}
else
{
sValueTemp+="0";
var cascade = true;
var digitToIncrement = sValueTemp.length-2;
while(cascade&&(digitToIncrement>=0))
{
var nTempDigit = new Number(sValueTemp.charAt(digitToIncrement));
nTempDigit++;
if(nTempDigit<10)
{
cascade = false;
sValueTemp=sValueTemp.substring(0, digitToIncrement)+nTempDigit
+sValueTemp.substring(digitToIncrement+1, sValueTemp.length);
}
else
{
nTempDigit=0;
if(digitToIncrement==0)
{
sValueTemp = "10"+sValueTemp.substring(1,sValueTemp.length);
}
else
{
sValueTemp=sValueTemp.substring(0, digitToIncrement)+nTempDigit
+sValueTemp.substring(digitToIncrement+1, sValueTemp.length);
}
}
digitToIncrement--;
}
}
}
else
{
for(i=0;i<fractionDigits-sDec.length;i++)
{
sValueTemp+="0";
}
}
sValue = sValueTemp.substring(0, sValueTemp.length-fractionDigits);
if(fractionDigits>0)
sValue+="."+sValueTemp.substring(sValueTemp.length-fractionDigits, sValueTemp.length);
return sValue;
}
function SetDisplayStyle(obj, style)
{
if (obj)
obj.style.display = style;
}
function toggleMenuHeader()
{
var oHref = document.getElementById("aToggleMenuHeader");
var oHideMenu = document.getElementById("hidHideMenu");
var	oMB = document.getElementById("MasterBookCtrl");
var oElement = document.getElementById("header");
var oElement2 = document.getElementById("divLeftNav");
var oNavigation = document.getElementById("tblNavigation");
var oNavigation2 = document.getElementById("tblNavigation2");
if ( oElement.style.display=="none" )
{
SetDisplayStyle(oElement, "block");
SetDisplayStyle(oElement2, "block");
SetDisplayStyle(oNavigation, "block");
SetDisplayStyle(oNavigation2, "block");
oHref.innerText = sMsgHideMenuHeader;
if (oHideMenu)
oHideMenu.value = "False";
}
else
{
SetDisplayStyle(oElement, "none");
SetDisplayStyle(oElement2, "none");
SetDisplayStyle(oNavigation, "block");
SetDisplayStyle(oNavigation2, "block");
oHref.innerText = sMsgShowMenuHeader;
if (oHideMenu)
oHideMenu.value = "True";
}
if ( oMB )
ResizeActiveXControl();
}
function toggleHeader()
{
var oElement = document.getElementById("header");
var oElement2 = document.getElementById("divMBTitle");
var oHref = document.getElementById("aToggleHeader");
var oMB = document.getElementById("MasterBookCtrl");
var oNavigation = document.getElementById("tblNavigation");
var oNavigation2 = document.getElementById("tblNavigation2");
if(oElement.style.display!="none")
{
SetDisplayStyle(oElement, "none");
SetDisplayStyle(oElement2, "none");
SetDisplayStyle(oNavigation, "none");
SetDisplayStyle(oNavigation2, "block");
oHref.innerText = sMsgShowHeader;
}
else
{
SetDisplayStyle(oElement, "block");
SetDisplayStyle(oElement2, "block");
SetDisplayStyle(oNavigation, "block");
SetDisplayStyle(oNavigation2, "none");
oHref.innerText = sMsgHideHeader;
}
if(oMB)
ResizeActiveXControl();
}
function gotoPage(sel)
{
window.location.href = sel.options.item(sel.selectedIndex).value;
}
function toggleLeftNav()
{
var oElement;
var oHref;
var oMB;
var oAcctRecap;
if (document.getElementById)
{
oElement = document.getElementById("divLeftNav");
oHref = document.getElementById("aToggleLeftNav");
oMB = document.getElementById("MasterBookCtrl");
oAcctRecap = document.getElementById("AccountingRecapCtrl");
oHideMenu = document.getElementById("hidHideMenu");
if(oElement.style.display!="none")
{
oElement.style.display="none";
oHref.innerText = sMsgShowMenu;
if (oHideMenu)
oHideMenu.value = "True";
}
else
{
oElement.style.display="block";
oHref.innerText = sMsgHideMenu;
if (oHideMenu)
oHideMenu.value = "False";
}
if(oMB || oAcctRecap)
ResizeActiveXControl();
}
else if (document.all)
{
oElement = document.all("divLeftNav");
oHref = document.all("aToggleLeftNav");
oMB = document.all("MasterBookCtrl");
oAcctRecap = document.getElementById("AccountingRecapCtrl");
oHideMenu = document.all("hidHideMenu");
if(oElement.style.display!="none")
{
oElement.style.display="none";
oHref.innerText = sMsgShowMenu;
if (oHideMenu)
oHideMenu.value = "True";
}
else
{
oElement.style.display="block";
oHref.innerText = sMsgHideMenu;
if (oHideMenu)
oHideMenu.value = "False";
}
if(oMB || oAcctRecap)
ResizeActiveXControl();
}
}
function eliminateRoundingError( val, fractionDigits )
{
var retVal = parseFloat( idealToFixed( parseFloat(val), fractionDigits + 3 ) );
if ( val.toString().indexOf("e") >= 0 )
return 0.0;
else
return retVal;
}
function normalizeArray( arr, newSum, fractionDigits )
{
var smallestDecimal = Math.pow( 10, -1 * fractionDigits );
var sum = 0.0;
var lLength = arr.length - 1; 
var i;
var val;
for( i=1; i<=lLength; i++ )
{
val = arr[i];
if ( val != null )
{
sum += parseFloat(val);
}
}
sum = eliminateRoundingError( sum, fractionDigits );
if ( isNaN(sum) || 
sum == 0 ) 
return;
var remainder = parseFloat( newSum );
for ( i=1; i<=lLength; i++ )
{
if (arr[i] != 0) 
{
val = (parseFloat( arr[i] ) / sum );
arr[i] = idealToFixed( (val * newSum) - (smallestDecimal / 2), fractionDigits );
remainder = remainder - arr[i];
}
}
i = 1;
while ( remainder > (smallestDecimal/2) )
{
if (arr[i] != 0) 
{
arr[i] = eliminateRoundingError( parseFloat(arr[i]) + smallestDecimal, fractionDigits );
remainder = remainder - smallestDecimal;
}
if ( i == lLength )
i == 1;
else
i++;
}
for ( i=1; i<=lLength; i++ )
{
arr[i] = idealToFixed( parseFloat(arr[i]), fractionDigits );	
}
}
function createRoundedSplitArray( amount, num, fractionDigits )
{
amount = parseFloat(amount);
num = parseFloat(num);
fractionDigits = parseFloat(fractionDigits);
var lLength = parseInt( num );
if ( lLength < 1 )
return 0;
var splitArray = new Array( lLength + 1 ); 
for ( var i=1; i<=lLength; i++ )
{
splitArray[ i ] = 100.0;
}
normalizeArray( splitArray, amount, fractionDigits );
return splitArray;
}
function PrintPage()
{
var docInnerHtml = document.body.innerHTML;
popup=window.open('blank.asp','popup','toolbar=no,menubar=no,height=1,width=1,left=5000'); 
while (!popup.document.body) { }
popup.document.body.innerHTML = docInnerHtml;
var bodyText = "<BODY><STYLE type='text/css'>.printnoshow{VISIBILITY: hidden}.printnodisp{DISPLAY: none}";
for(var i=0;i<document.styleSheets.length;i++)
{
var style = document.styleSheets.item(i);
bodyText = bodyText + style.cssText;
}
bodyText = bodyText + "</STYLE>" + popup.document.body.innerHTML + "</BODY>";
popup.document.body.innerHTML = bodyText;
popup.print();
popup.close();
}
var g_CalendarShimRegistred = false;
function RegisterCalendarShim()
{
if (g_CalendarShimRegistred == false)
{	
document.write("<DIV ID='div_calendar' STYLE='position:absolute;visibility:hidden;background-color:white;layer-background-color:white;z-index:9999'></DIV>");	
document.write("<IFRAME ID='div_calendar_shim' scrolling='no' frameborder='0' style='position:absolute;top:0px;left:0px;display:none;' SRC='javascript:false'></IFRAME>");
g_CalendarShimRegistred = true;
}
}
function show_calendar2(inputname, linkname, format, defaultdate, clientid)
{
var cal = new CalendarPopup('div_calendar');
cal.showYearNavigation();
cal.select(document.getElementById(inputname), linkname, format, defaultdate);
}
