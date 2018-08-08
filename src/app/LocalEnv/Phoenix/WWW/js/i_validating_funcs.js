// http:
var cmDateAmerican = new String( 'MM/DD/YYYY' );
var cmDateAmericanMedium = new String( 'dddxMM/DD/YYYY' );
var cmDateBritish = new String( 'DD/MM/YYYY' );
var cmDateBritishMedium = new String( 'dddxDD/MM/YYYY' );
var cmDateLong = new String( 'd,xMMxDD,xYYYY' );
var cmDateJapanese = new String( 'YYYY/MM/DD' );
var cmDateISOStandard = new String( 'YYYY-MM-DD' );
var strCmpLike = 1;
function strCmp( vString1, vString2, nCompareMode )
{
var sString1, sString2;
sString1 = new String( '' + vString1);
sString2 = new String( '' + vString2);
if ( nCompareMode == strCmpLike ) {
sString1 = sString1.toUpperCase();
sString2 = sString2.toUpperCase();
}
var nCounter;
for ( nCounter=0; nCounter < sString1.length; nCounter++ ) {
if ( sString1.substr(nCounter, 1) < sString2.substr(nCounter, 1) )
return -1;
if ( sString1.substr(nCounter, 1) > sString2.substr(nCounter, 1) )
return 1;
}
return 0;
}
function IsValidDate(sDate, sFormat, vControl)
{
var sStandardDate = FormatDate( sDate, 'YYYY-MM-DD', 'YYYY-MM-DD' );
if (sStandardDate == sDate)
{
vControl.value = FormatDate( sDate, 'YYYY-MM-DD', sFormat );
sDate = FormatDate( sDate, 'YYYY-MM-DD', 'MM/DD/YYYY' );
}
else
{
switch (sFormat.toUpperCase())
{
case "MM/DD/YYYY":
break;
case "YYYY/MM/DD":
sDate = FormatDate(	sDate,
cmDateJapanese,
cmDateAmerican);
break;
case "DD/MM/YYYY":
sDate = FormatDate(	sDate,
cmDateBritish,
cmDateAmerican);
break;
case "dddxMM/DD/YYYY":
sNewDate = sDate.substr(4);
sDate = FormatDate(	sDate,
cmDateAmericanMedium,
cmDateAmerican);
break;
case "dddxDD/MM/YYYY":
sNewDate = sDate.substr(4);
sDate = FormatDate(	sDate,
cmDateBritishMedium,
cmDateAmerican);
break;
case "d,xMMxDD,xYYYY":
sDate = FormatDate(	sDate,
cmDateLong,
cmDateAmerican);
break;
}
}
var slash1 = new String();
var slash2 = new String();
slash1 = sDate.indexOf('/');
slash2 = sDate.indexOf('/', slash1 + 1);
var monthField	= new String( sDate.substring( 0, slash1 ) );
var dayField	= new String( sDate.substring( slash1+1, slash2 ));
var yearField	= new String( sDate.substr( slash2+1) );
return ( isValidDate (yearField, monthField, dayField));
}
function ValidateForm(frm)
{
return ValidateFormEx(frm, true);
}
function ValidateFormEx(frm, showErrorLink)
{
var isValid = false;
isValid = ValidateInputFields(frm, showErrorLink);
if (isValid)
{
RemoveDataEntryFormats( frm );
return(true);
}
else
{
return(false);
}
}
function ValidateInputFields(frm, showErrorLink)
{
if (bNS) window.name = ((new Date).getTime()).toString();
var fldsInError = CheckInputFields(frm)
return displayErrorElems(frm, fldsInError, showErrorLink);
}
function CheckInputFields(frm)
{
var nNumFields;
var arrFieldsInError = new Array;
var vName, vInfo, vValue, bRequired, vPureName, vTypePrefix, vLabelId;
nNumFields = frm.elements.length;
for(var i = 0; i< nNumFields; ++i)
{
var vControl = frm[i];
vName = vControl.name;
vValue = trim( vControl.value );
vInfo = MetaInfoFromName(vName);
bRequired = vInfo[1]
vTypePrefix = vInfo[2];
vPureName = vInfo[3];
vLabelId = "lbl" + vPureName;
if (vName)
{
if (vTypePrefix != "sel") {
vControl.value = vValue;
}
else if (vValue == "")
{
vControl.value = vValue;
}
var arrFieldErrorInfo = FieldErrorInfo(vTypePrefix + vPureName, new String, vLabelId, vName, vInfo[5]);
if(bRequired)
{
vControl.className='clsNormal';
if(vValue.length == 0)
{
arrFieldErrorInfo[2] = "- Value is required"
}
}
var bValid
switch (vTypePrefix)
{
case "i": 
bValid = isSignedInteger( vValue, true );
if (!bValid)
arrFieldErrorInfo[2] = arrFieldErrorInfo[2] + "- Invalid whole number";
break;
case "dt": 
bValid = (isEmpty(vValue) || IsValidDate(vValue,UserSettings.dateMask, vControl));
if (!bValid)
arrFieldErrorInfo[2] = arrFieldErrorInfo[2] + "- Invalid date - format should be " + UserSettings.dateMask;
break;
case "cur":
bValid = isSignedFloat( vValue, true );
if (!bValid)
arrFieldErrorInfo[2] = arrFieldErrorInfo[2] + "- Invalid amount";
break;
case "flt":
bValid = isSignedFloat( vValue, true );
if (!bValid)
arrFieldErrorInfo[2] = arrFieldErrorInfo[2] + "- Invalid real number";
break;
case "em": 
bValid = isEmail( vValue, true );
if (!bValid)
arrFieldErrorInfo[2] = arrFieldErrorInfo[2] + "- Invalid e-mail address";
break;
case "pct": 
bValid = isPercent( vValue, true );
if (!bValid)
arrFieldErrorInfo[2] = arrFieldErrorInfo[2] + "- Invalid percentage";
break; 
}
if (arrFieldErrorInfo[2].length > 0)
{
arrFieldsInError[arrFieldsInError.length] = arrFieldErrorInfo;
}
else
{
var sHtmlTag = matchHtmlTag(vValue);
if (sHtmlTag != null)
{
arrFieldErrorInfo[2] = arrFieldErrorInfo[2] + " - " + "A potentially dangerous value was detected and cannot be used as an input.";
arrFieldsInError[arrFieldsInError.length] = arrFieldErrorInfo;
}
}
}
}
if (frm.name != "frmFastFind") {
if( fnExists( 'CheckConditionallyRequiredFields' ) ) {
var arrMoreErrors = CheckConditionallyRequiredFields(frm,arrFieldsInError);
for(var e = 0; e < arrMoreErrors.length; ++e)
{arrFieldsInError[arrFieldsInError.length] = arrMoreErrors[e];}
} 
if( fnExists( 'CustomValidation' ) ) {
arrMoreErrors = CustomValidation(frm,arrFieldsInError);
for(var e = 0; e < arrMoreErrors.length; ++e)
{arrFieldsInError[arrFieldsInError.length] = arrMoreErrors[e];}
}
} else { 
if( fnExists( 'FastFindCustomValidation' ) ) {
arrMoreErrors = FastFindCustomValidation(frm,arrFieldsInError);
for(var e = 0; e < arrMoreErrors.length; ++e)
{arrFieldsInError[arrFieldsInError.length] = arrMoreErrors[e];}
}
}
return(arrFieldsInError);
}
function CheckRequiredField(frm, sID, arrFieldsInError)
{
var vName, vInfo, bRequired, vPureName, vTypePrefix, vLabelId;
var vControl = FormFieldWithID(frm,sID)
var arrMoreFieldsInError;
vName = vControl.name;
vInfo = MetaInfoFromName(vName);
bRequired = vInfo[1];
vTypePrefix = vInfo[2];
vPureName = vInfo[3];
vLabelId = "lbl" + vPureName;
vControl.className='clsNormal';
arrFieldErrorInfo = null;
if(vControl.value.length == 0)
{
var arrFieldErrorInfo = FieldErrorInfo(vControl.id, "value is required", vLabelId, vName, vInfo[5]);
}
return(arrFieldErrorInfo);
}
function FieldErrorInfo (sFieldId, sMsg, sLabelId, sName, sLabel, iHeight)
{
var arrFieldErrorInfo = new Array;
arrFieldErrorInfo[1] = sFieldId
arrFieldErrorInfo[2] = sMsg
arrFieldErrorInfo[3] = sLabelId;
arrFieldErrorInfo[4] = sName;
arrFieldErrorInfo[5] = sLabel;
arrFieldErrorInfo[6] = iHeight;
return(arrFieldErrorInfo);
}
function MetaInfoFromName(sName)
{
var vInfo = new Array;
var i, sChar, iRequired, bRequired, iStart;
iRequired = sName.indexOf("r");
bRequired = iRequired == 0;
if (bRequired)
iStart = iRequired + 1;
else
iStart = 0;
for(var i = iStart; i< sName.length; ++i)
{
sChar = sName.substr(i,1);
var uChar = sChar.toUpperCase();
if (sChar == uChar)
break;
}
var sLabel = new String;
for(var j = i; j< sName.length; ++j)
{
sChar = sName.substr(j,1);
var uChar = sChar.toUpperCase();
if (sChar == uChar)
sLabel = sLabel + " " + sChar
else
sLabel = sLabel + sChar;
}
vInfo[1] = bRequired;
vInfo[2] = sName.substring(iStart,i);
vInfo[3] = sName.substring(i, sName.length);
vInfo[4] = sName;
vInfo[5] = sLabel;
return(vInfo)
}
var reWhitespace = /^\s+$/
var reLetter = /^[a-zA-Z]$/
var reAlphabetic = /^[a-zA-Z]+$/
var reAlphanumeric = /^[a-zA-Z0-9]+$/
var reDigit = /^\d/
var reLetterOrDigit = /^([a-zA-Z]|\d)$/
var reInteger = /^\d+$/
var reSignedInteger = /^(((\+|-)?\d+)|(\(\d+\)))$/
var reFloat = /^((\d+(\.\d*)?)|((\d*\.)?\d+))$/
var reSignedFloat = /^((((\+|-)?\d+(\.\d*)?)|((\+|-)?(\d*\.)?\d+))|((\(\d+(\.\d*)?\))|(\((\d*\.)?\d+\))))$/
var reEmail = /^.+\@.+\..+$/
var whitespace = " \t\n\r";
var numericCharsToIgnore = "$,KM";
var defaultEmptyOK = false
var daysInMonth = new Array( 0, 31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31 );
function isWhitespace (s)
{ 
return (isEmpty(s) || reWhitespace.test(s));
}
function stripCharsInRE (s, bag)
{ return s.replace(bag, "")
}
function stripCharsInBag (s, bag)
{ var i;
var returnString = "";
if (isEmpty(s)) return "";
for (i = 0; i < s.length; i++)
{
var c = s.charAt(i);
if (bag.indexOf(c) == -1) returnString += c;
}
return returnString;
}
function stripCharsNotInBag (s, bag)
{ var i;
var returnString = "";
for (i = 0; i < s.length; i++)
{
var c = s.charAt(i);
if (bag.indexOf(c) != -1) returnString += c;
}
return returnString;
}
function stripWhitespace (s)
{ return stripCharsInBag (s, whitespace)
}
function charInString (c, s)
{ for (i = 0; i < s.length; i++)
{ if (s.charAt(i) == c) return true;
}
return false
}
function stripInitialWhitespace (s)
{ var i = 0;
while ((i < s.length) && charInString (s.charAt(i), whitespace))
i++;
return s.substring (i, s.length);
}
function isLetter (c)
{ return reLetter.test(c)
}
function isDigit (c)
{ return reDigit.test(c)
}
function isLetterOrDigit (c)
{ return reLetterOrDigit.test(c)
}
function isInteger (s)
{ var i;
if (isEmpty(s))
if (isInteger.arguments.length == 1) return defaultEmptyOK;
else return (isInteger.arguments[1] == true);
return reInteger.test(s)
}
function isSignedInteger (s)
{ if (isEmpty(s))
if (isSignedInteger.arguments.length == 1) return defaultEmptyOK;
else return (isSignedInteger.arguments[1] == true);
else {
s =stripCharsInBag( s, numericCharsToIgnore );
return reSignedInteger.test(s)
}
}
function isPositiveInteger (s)
{ var secondArg = defaultEmptyOK;
if (isPositiveInteger.arguments.length > 1)
secondArg = isPositiveInteger.arguments[1];
return (isSignedInteger(s, secondArg)
&& ( (isEmpty(s) && secondArg) || (parseInt (s) > 0) ) );
}
function isNonnegativeInteger (s)
{ var secondArg = defaultEmptyOK;
if (isNonnegativeInteger.arguments.length > 1)
secondArg = isNonnegativeInteger.arguments[1];
return (isSignedInteger(s, secondArg)
&& ( (isEmpty(s) && secondArg) || (parseInt (s) >= 0) ) );
}
function isNegativeInteger (s)
{ var secondArg = defaultEmptyOK;
if (isNegativeInteger.arguments.length > 1)
secondArg = isNegativeInteger.arguments[1];
return (isSignedInteger(s, secondArg)
&& ( (isEmpty(s) && secondArg) || (parseInt (s) < 0) ) );
}
function isNonpositiveInteger (s)
{ var secondArg = defaultEmptyOK;
if (isNonpositiveInteger.arguments.length > 1)
secondArg = isNonpositiveInteger.arguments[1];
return (isSignedInteger(s, secondArg)
&& ( (isEmpty(s) && secondArg) || (parseInt (s) <= 0) ) );
}
function isFloat (s)
{ if (isEmpty(s)) 
if (isFloat.arguments.length == 1) return defaultEmptyOK;
else return (isFloat.arguments[1] == true);
var strip = stripCharsInBag( s, numericCharsToIgnore );
var valid = reFloat.test(strip);
if(valid){
var index = s.search(/\./);
if(index > 19){
valid = false;
}else if(index == -1){
if(s.length > 19){
valid = false;
}	
}else{
if((s.length - index) > 9){
valid = false;
}	
}
}
return valid; 
}
function isSignedFloat (s)
{ if (isEmpty(s)) 
if (isSignedFloat.arguments.length == 1) return defaultEmptyOK;
else return (isSignedFloat.arguments[1] == true);
else {
var strip = stripCharsInBag( s, numericCharsToIgnore );
var valid = reSignedFloat.test(strip);
if(valid){
var index = s.search(/\+|-/);
var index2 = s.search(/\./);
if(index == 0){
if(index2 > 26){
valid = false;
}else if(index2 == -1){
if(s.length > 26){
valid = false;
}	
}else{
if((s.length - index) > 10){
valid = false;
}	
}
}else{
var index = s.search(/\./);
if(index > 25){
valid = false;
}else if(index == -1){
if(s.length > 25){
valid = false;
}	
}else{
if((s.length - index) > 9){
valid = false;
}	
}
}
} 
return valid; 
}
}
function isAlphabetic (s)
{ var i;
if (isEmpty(s)) 
if (isAlphabetic.arguments.length == 1) return defaultEmptyOK;
else return (isAlphabetic.arguments[1] == true);
else {
return reAlphabetic.test(s)
}
}
function isAlphanumeric (s)
{ var i;
if (isEmpty(s)) 
if (isAlphanumeric.arguments.length == 1) return defaultEmptyOK;
else return (isAlphanumeric.arguments[1] == true);
else {
return reAlphanumeric.test(s)
}
}
function isEmail (s)
{ if (isEmpty(s)) 
if (isEmail.arguments.length == 1) return defaultEmptyOK;
else return (isEmail.arguments[1] == true);
else {
return reEmail.test(s)
}
}
function isYear (s)
{ 
if (isEmpty(s)) 
if (isYear.arguments.length == 1) return defaultEmptyOK;
else return (isYear.arguments[1] == true);
if (!isNonnegativeInteger(s)) return false;
return ((s.length == 2) || (s.length == 4));
}
function isIntegerInRange (s, a, b)
{ if (isEmpty(s)) 
if (isIntegerInRange.arguments.length == 1) return defaultEmptyOK;
else return (isIntegerInRange.arguments[1] == true);
if (!isInteger(s, false)) return false;
var num = parseInt(s, 10);
return ((num >= a) && (num <= b));
}
function isMonth (s)
{ 
if (isEmpty(s)) 
if (isMonth.arguments.length == 1) return defaultEmptyOK;
else return (isMonth.arguments[1] == true);
return isIntegerInRange (s, 1, 12);
}
function isDay (s)
{ 
if (isEmpty(s)) 
if (isDay.arguments.length == 1) return defaultEmptyOK;
else return (isDay.arguments[1] == true); 
return isIntegerInRange (s, 1, 31);
}
function daysInFebruary (year)
{ 
return ( ((year % 4 == 0) && ( (!(year % 100 == 0)) || (year % 400 == 0) ) ) ? 29 : 28 );
}
function isValidDate (year, month, day)
{ 
if (! (isYear(year, false) && isMonth(month, false) && isDay(day, false))) return false;
var intYear = parseInt(year, 10);
var intMonth = parseInt(month, 10);
var intDay = parseInt(day, 10);
if (intDay > daysInMonth[intMonth]) return false; 
if ((intMonth == 2) && (intDay > daysInFebruary(intYear))) return false;
if (intYear < 1900) return false;
return true;
}
function isPercent (s)
{ if (isEmpty(s)) 
if (isPercent.arguments.length == 1) return defaultEmptyOK;
else return (isPercent.arguments[1] == true);
var strip = stripCharsInBag( s, numericCharsToIgnore );
var valid = reFloat.test(strip);
if(valid){
var index = s.search(/\./);
if(index > 9){
valid = false;
}else if(index == -1){
if(s.length > 9){
valid = false;
}	
}else{
if((s.length - index) > 5){
valid = false;
}	
}
}
return valid;
}
function CheckNumericValueFormat(sValue, numBeforeDecimal, numAfterDecimal)
{
if( (!CheckNumericValueRange(sValue, numBeforeDecimal))
||(!CheckNumericValuePrecision(sValue, numAfterDecimal)) )
return(false);
else
return(true);
}
function CheckNumericValuePrecision(sValue, numAfterDecimal)
{
if(sValue==null)
return false;
sRightOfDecimal = getDecimal(sValue);
if(sRightOfDecimal.length>numAfterDecimal)
return(false);
else
return(true);
}
function CheckNumericValueRange(sValue, numBeforeDecimal)
{
if(sValue==null)
return false;
var sLeftOfDecimal = "";
var decimalPointLocation = sValue.indexOf("."); 
if (decimalPointLocation<0)
{
decimalPointLocation = sValue.length;
}
for(i=0; i<decimalPointLocation;i++)
{
if(sValue.charAt(i)!=UserSettings.numberSeparator)
sLeftOfDecimal+=sValue.charAt(i);
}
if(sLeftOfDecimal.length>numBeforeDecimal)
{
return(false); 
}
else
return(true); 
}
var arrBadHtmlTags = new Array();
arrBadHtmlTags[arrBadHtmlTags.length] = /(<|&#60;|&lt;)(\/)*a\b(.*)(>|&#62;|&gt;)/i
arrBadHtmlTags[arrBadHtmlTags.length] = /(<|&#60;|&lt;)(\/)*applet\b(.*)(>|&#62;|&gt;)/i
arrBadHtmlTags[arrBadHtmlTags.length] = /(<|&#60;|&lt;)(\/)*bgsound\b(.*)(>|&#62;|&gt;)/i
arrBadHtmlTags[arrBadHtmlTags.length] = /(<|&#60;|&lt;)(\/)*embed\b(.*)(>|&#62;|&gt;)/i
arrBadHtmlTags[arrBadHtmlTags.length] = /(<|&#60;|&lt;)(\/)*fig\b(.*)(>|&#62;|&gt;)/i
arrBadHtmlTags[arrBadHtmlTags.length] = /(<|&#60;|&lt;)(\/)*form\b(.*)(>|&#62;|&gt;)/i
arrBadHtmlTags[arrBadHtmlTags.length] = /(<|&#60;|&lt;)(\/)*frame\b(.*)(>|&#62;|&gt;)/i
arrBadHtmlTags[arrBadHtmlTags.length] = /(<|&#60;|&lt;)(\/)*iframe\b(.*)(>|&#62;|&gt;)/i
arrBadHtmlTags[arrBadHtmlTags.length] = /(<|&#60;|&lt;)(\/)*img\b(.*)(>|&#62;|&gt;)/i
arrBadHtmlTags[arrBadHtmlTags.length] = /(<|&#60;|&lt;)(\/)*input\b(.*)(>|&#62;|&gt;)/i
arrBadHtmlTags[arrBadHtmlTags.length] = /(<|&#60;|&lt;)(\/)*link\b(.*)(>|&#62;|&gt;)/i
arrBadHtmlTags[arrBadHtmlTags.length] = /(<|&#60;|&lt;)(\/)*meta\b(.*)(>|&#62;|&gt;)/i
arrBadHtmlTags[arrBadHtmlTags.length] = /(<|&#60;|&lt;)(\/)*object\b(.*)(>|&#62;|&gt;)/i
arrBadHtmlTags[arrBadHtmlTags.length] = /(<|&#60;|&lt;)(\/)*overlay\b(.*)(>|&#62;|&gt;)/i
arrBadHtmlTags[arrBadHtmlTags.length] = /(<|&#60;|&lt;)(\/)*script\b(.*)(>|&#62;|&gt;)/i
arrBadHtmlTags[arrBadHtmlTags.length] = /(<|&#60;|&lt;)(.*)javascript(:|&#58;)(.*)(>|&#62;|&gt;)/ig
arrBadHtmlTags[arrBadHtmlTags.length] = /(<|&#60;|&lt;)(.*)vbscript(:|&#58;)(.*)(>|&#62;|&gt;)/ig
function matchHtmlTag(sValue)
{
for(var i=0; i<arrBadHtmlTags.length; i++)
{ 
var sMatchTag = sValue.match(arrBadHtmlTags[i]);
if (sMatchTag != null)
return sMatchTag[0]; 
}
return null;
}
function ClearMarketOrderString (frm)
{
var strDefString = frm.elements["hidMarketOrderString"].value;
for (i = 1; frm.elements["fltTxtCoupon"+i] != null; i++)
{
if (((i%5) == 1 || frm.elements["iTxtAmount"+i].value != '')
&& frm.elements["fltTxtCoupon"+i].value == strDefString)
{
frm.elements["fltTxtCoupon"+i].value = "";
}
}
for (i = 1; frm.elements["fltTxtPremium"+i] != null; i++)
{
if (((i%5) == 1 || frm.elements["iTxtAmount"+i].value != '')
&& frm.elements["fltTxtPremium"+i].value == strDefString)
{
frm.elements["fltTxtPremium"+i].value = "";
}
}
for (var i = 1; frm.elements["fltTxtPrice"+i] != null; i++)
{
if (((i%5) == 1 || frm.elements["iTxtAmount"+i].value != '')
&& frm.elements["fltTxtPrice"+i].value == strDefString)
frm.elements["fltTxtPrice"+i].value = "";
}
}
function RestoreMarketOrderString (frm)
{
var strDefString = frm.elements["hidMarketOrderString"].value;
for (i = 1; frm.elements["fltTxtCoupon"+i] != null; i++)
{
if (((i%5) == 1 || frm.elements["iTxtAmount"+i].value != '')
&& frm.elements["fltTxtCoupon"+i].value == "")
{
frm.elements["fltTxtCoupon"+i].value = strDefString;
}
}
for (i = 1; frm.elements["fltTxtPremium"+i] != null; i++)
{
if (((i%5) == 1 || frm.elements["iTxtAmount"+i].value != '')
&& frm.elements["fltTxtPremium"+i].value == "")
{
frm.elements["fltTxtPremium"+i].value = strDefString;
}
}
for (var i = 1; frm.elements["fltTxtPrice"+i] != null; i++)
{
if (((i%5) == 1 || frm.elements["iTxtAmount"+i].value != '')
&& frm.elements["fltTxtPrice"+i].value == "")
{
frm.elements["fltTxtPrice"+i].value = strDefString;
}
}
}
function displayErrorElems(frm, fldsInError, showErrorLink)
{
var sStatusMsg = new String;
var sMsgHeight = 0;
if (fldsInError.length > 0)
{
sStatusMsg = sStatusMsg + "Please correct the following error(s):<br>"
for(var j = 0; j < fldsInError.length ; j++)
{
var sFieldId = fldsInError[j][1];
var sMsg = fldsInError[j][2];
var sLabelId = fldsInError[j][3];
var sName = fldsInError[j][4];
sMsgHeight += ( fldsInError[j][6] == null ) ? 45 : fldsInError[j][6];
var sErrorName = "";	
if (bIE)
{
if(showErrorLink == true) 
sErrorName = "<a href='JavaScript:SetFocus(document." + frm.name + "." + sName + ")'>" + fldsInError[j][5] + "</a>";
else
sErrorName = fldsInError[j][5];
sStatusMsg = sStatusMsg + "<li>" + sErrorName + " " + sMsg + "<br>";
eval("document." + frm.name + "." + sName + ".className='clsFieldInError'");
}
if (bNS)
{
}
if(showErrorLink == true) 
sErrorName = "<a href='JavaScript:window.opener.document." + frm.name + "." + sName + ".focus();'>" + fldsInError[j][5] + "</a>";
else
sErrorName = "<b>" + fldsInError[j][5] + "</b>";
sStatusMsg = sStatusMsg + "<li>" + sErrorName + " " + sMsg + "<br>";
}
var sMessage = new String;
sMessage = sMessage + "<html><head>";
sMessage = sMessage + "<title>" + document.title + " Error(s)" + "</title>";
sMessage = sMessage + "<link href='../style/ideal_custom_generic.css' rel='stylesheet' type='text/css'>";
sMessage = sMessage + "<link href='../style/ideal_custom_ie.css' rel='stylesheet' type='text/css'>";
sMessage = sMessage + "</head><body>";
sMessage = sMessage + "<table cellspacing='0' cellpadding='0' width='100%' height='62' border='0'>"
sMessage = sMessage + "<tr><td width='119' height='62' rowspan='3' class='topWelcomeArea1' valign='top'><img src='../images/brand.gif' width='119' height='62' border='0' alt='i-Deal'></td>"
sMessage = sMessage + "<td width='20' height='30' class='topWelcomeArea'><img src='../images/spacer.gif' width='20' height='30' border='0'></td>"
sMessage = sMessage + "<td class='topWelcomeArea'>&#160;</td>"
sMessage = sMessage + "<td class='topWelcomeArea' nowrap width='50%'><img src='../images/spacer.gif' width='2' height='7' border='0'><br><img src='../images/spacer.gif' width='10' height='3' border='0'>&#160; </td>"
sMessage = sMessage + "<td class='topWelcomeArea' width='50%' align='right' nowrap><img src='../images/spacer.gif' width='2' height='7' border='0'><br>&#160;<img src='../images/spacer.gif' width='10' height='10' border='0'></td>"
sMessage = sMessage + "</tr>"
sMessage = sMessage + "<tr><td colspan='4' height='3'><img src='../images/spacer.gif' width='10' height='3' border='0'></td></tr>"
sMessage = sMessage + "<tr><td></td><td colspan='3' class='txtRegular'>"
sMessage = sMessage + sStatusMsg;
sMessage = sMessage + "<br><input type='button' value='Close' class='stdButton_R2' onclick='javascript:window.close()'>";
sMessage = sMessage + "</td></tr>";
sMessage = sMessage + "</table></body></html>";
var sHeight = "height=" + (120 + sMsgHeight);
var sWindowParms = "toolbar=no,location=no,directories=no,scrollbars=yes,resizable=yes,width=450,center=yes,dependent=yes," + sHeight;
var sChildName = window.name + "Errors";
popupError = window.open("",sChildName,sWindowParms);
popupError.document.open();
popupError.document.write(sMessage);
popupError.document.close();
popupError.focus();
return false;
}
else
return true;
}
