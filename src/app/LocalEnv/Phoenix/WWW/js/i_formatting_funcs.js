function replaceChar(s1, replMe, useMe){
var s = new String(trim(s1));
var array = s.split(replMe);
return array.join(useMe);
}
function trim(s) 
{
var i, j;
if (s == null) return "";
s += "";
for (i=0; i < s.length; i++) 
{
ch = s.charAt(i);
if (ch != ' ' && ch != "\t") break;
}
for (j=s.length-1; j>=0; j--) 
{
ch = s.charAt(j);
if (ch != ' ' && ch != "\t")break;
}
if (j >= i) return s.substring(i, j + 1);
else return "";
}
function insertChar(str, insertAt, insertMe){
return str.substring(0, insertAt) + insertMe + str.substring(insertAt)
}
function isFloat (s)
{
var decimalPointDelimiter = "."
var i;
var seenDecimalPoint = false;
if (isEmpty(s)) return true;
if (s == decimalPointDelimiter) return false;
for (i = 0; i < s.length; i++)
{ 
var c = s.charAt(i);
if ((c == decimalPointDelimiter) && !seenDecimalPoint) seenDecimalPoint = true;
else if (!isDigit(c)) return false;
}
return true;
} 
function isEmpty(s)
{
if (!s)
return true;
s = s.replace(/(\s)/g, "");
return ((s == null) || (s.length == 0))
}
function isDigit(c){return ((c >= "0") && (c <= "9"))}
function FormatPhone(sPhone, sFormat)
{
var cTemp, sPhoneNum, sNewPhone;
sPhoneNum = new String;
sNewPhone = new String;
for(var i = 0; i < sPhone.length; ++i)
{
cTemp = sPhone.substr(i, 1);
if(cTemp >= '0' || cTemp <= '9')
if(cTemp != '(' && cTemp != ')' && cTemp != '-')
sPhoneNum += cTemp;
}
switch(sFormat)
{
case "(XXX)XXX-XXXX":
if(sPhoneNum.length >= 10)
{
sNewPhone = '(';
sNewPhone += sPhoneNum.substr(0,3);
sNewPhone += ')'; 
sNewPhone += sPhoneNum.substr(3,3);
sNewPhone += '-';
sNewPhone += sPhoneNum.substr(5);
}
else
sNewPhone = sPhone;
break;
case "XXXXXXXXXX":
if(sPhoneNum.length >= 10)
sNewPhone = sPhoneNum.substr(0,10);
else
sNewPhone = sPhone;
break;	
case "XXX-XXXX":
if(sPhoneNum.length >= 7)
{
sNewPhone = sPhoneNum.substr(0,3); 
sNewPhone += '-'; 
sNewPhone += sPhoneNum.substr(3);
}
else
sNewPhone = sPhone;
break;
case "XXXXXXX":
if(sPhoneNum.length >= 7)
sNewPhone = sPhoneNum.substr(0,7);
else
sNewPhone = sPhone;
break;
}
return(sNewPhone);
}
function FormatDate(sDate, sInFormat, sOutFormat)
{ 
var sYear, sMonth, sDay;
var nYear, nMonth, nDay;
var myDate;
var sReturnDate;
if (isEmpty(sDate))
return "";
switch (sInFormat.toUpperCase())
{
case "DD/MM/YYYY":
var tempDate = new String('');
var slash1, slash2;
slash1 = new String();
slash2 = new String();
slash1 = sDate.indexOf('/');
slash2 = sDate.indexOf('/', slash1 + 1);
tempDate = sDate.substring(slash1 + 1, slash2);
tempDate += '/';
tempDate += sDate.substring(0, slash1);
tempDate += '/';
tempDate += sDate.substr(slash2 + 1);
sDate = tempDate;
break;
case "YYYY/MM/DD":
var tempDate = new String('');
var slash1, slash2;
slash1 = new String();
slash2 = new String();
slash1 = sDate.indexOf('/');
slash2 = sDate.indexOf('/', slash1 - 5);
space = sDate.indexOf(' ');
tempDate = sDate.substring(0, slash2);
tempDate = sDate.substring(slash2 + 1 );
tempDate += '/';
tempDate += sDate.substring(space + 1, slash1);
sDate = tempDate;
break;
case "YYYY-MM-DD":
var tempDate = new String('');
var slash1, slash2;
slash1 = new String();
slash2 = new String();
slash1 = sDate.indexOf('-');
slash2 = sDate.indexOf('-', slash1 - 5);
space = sDate.indexOf(' ');
tempDate = sDate.substring(0, slash2);
tempDate = sDate.substring(slash2 + 1 );
tempDate += '-';
tempDate += sDate.substring(space + 1, slash1);
sDate = tempDate;
sDate = replaceChar(sDate, "-", "/");
break;
case "DDDXDD/MM/YYYY":
var tempDate = new String('');
var slash1, slash2;
slash1 = new String();
slash2 = new String();
slash1 = sDate.indexOf('/');
slash2 = sDate.indexOf('/', slash1 + 1);
space = sDate.indexOf(' ');
tempDate = sDate.substring(slash1 + 1, slash2);
tempDate += '/';
tempDate += sDate.substring(space + 1, slash1);
tempDate += '/';
tempDate += sDate.substr(slash2 + 1);
sDate = tempDate;
break;
case "DDDXMM/DD/YYYY":
var tempDate = new String('');
var slash1, slash2;
slash1 = new String();
slash2 = new String();
slash1 = sDate.indexOf('/');
slash2 = sDate.indexOf('/', slash1 + 1);
space = sDate.indexOf(' ');
tempDate = sDate.substr(space + 1);
sDate = tempDate;
break;
case "D,XMMXDD,XYYYY":
sDate = sDate;
}
var slash1, slash2;
slash1 = new String();
slash2 = new String();
slash1 = sDate.indexOf('/');
slash2 = sDate.indexOf('/', slash1 + 1);
nMonth= new Number( sDate.substring(0, slash1) );
nDay = new Number( sDate.substring(slash1 + 1, slash2) );
nYear = new Number( sDate.substr(slash2 + 1) );
if (nYear < 51) 
nYear += 2000
else if ( nYear < 100 )
nYear += 1900;
sYear = '' + nYear;
if (nMonth < 10) sMonth = '0' + nMonth;
else	sMonth = '' + nMonth;
if (nDay < 10) sDay = '0' + nDay;
else	sDay = '' + nDay;
var sDayName = new String('');
switch( nDay )
{
case 0:
sDayName = 'Sunday';
break;
case 1:
sDayName = 'Monday';
break;
case 2:
sDayName = 'Tuesday';
break;
case 3:
sDayName = 'Wednesday';
break;
case 4:
sDayName = 'Thursday';
break;
case 5:
sDayName = 'Friday';
break;
case 6:
sDayName = 'Saturday';
break;
}
var sMonthName = new String('');
switch( nMonth )
{
case 0:
sMonthName = 'January';
break;
case 1:
sMonthName = 'February';
break;
case 2:
sMonthName = 'March';
break;
case 3:
sMonthName = 'April';
break;
case 4:
sMonthName = 'May';
break;
case 5:
sMonthName = 'June';
break;
case 6:
sMonthName = 'July';
break;
case 7:
sMonthName = 'August';
break;
case 8:
sMonthName = 'September';
break;
case 9:
sMonthName = 'October';
break;
case 10:
sMonthName = 'November';
break;
case 11:
sMonthName = 'December';
break;
}
switch (sOutFormat.toUpperCase())
{
case "MM/DD/YYYY":
sReturnDate = sMonth + '/' + sDay + '/' + sYear;
break;
case "DD/MM/YYYY":
sReturnDate = sDay + '/' + sMonth + '/' + sYear;
break;
case "DDDXMM/DD/YYYY":
sReturnDate = sDayName.substr(0,3) + ' ' + sMonth + '/' + sDay + '/' + sYear;
break;
case "DDDXDD/MM/YYYY":
sReturnDate = sDayName.substr(0,3) + ' ' + sDay + '/' + sMonth + '/' + sYear;
break;
case "D,XMMXDD,XYYYY":
sReturnDate = sDayName + ', ' + sMonthName + ' ' + sDay + ', ' + sYear;
break;
case "YYYY-MM-DD":
sReturnDate = sYear + '-' + sMonth + '-' + sDay;
break;
case "YYYY/MM/DD":
sReturnDate = sYear + '/' + sMonth + '/' + sDay;
break;
default:
sReturnDate = sMonth + '/' + sDay + '/' + sYear;
break;
}
return (sReturnDate);
}
function FormatSSN(sSSN, sFormat)
{ 
var sNewSSN = new String('');
switch (sFormat)
{
case "XXX-XX-XXXX":
sNewSSN += sSSN.substr(0,3);
sNewSSN += '-';
sNewSSN += sSSN.substr(3,2);
sNewSSN += '-';
sNewSSN += sSSN.substr(5);
break; 
default: 
var nCounter;
for (nCounter = 0; nCounter < sSSN.length; nCounter++)
if (sSSN.charAt(nCounter) >= '0' && 
sSSN.charAt(nCounter) <= '9')
sNewSSN += sSSN.charAt(nCounter);
}
return (sNewSSN);
}
function FormatCurrency(sAmount)
{
var nCurrency = new Number(sAmount);
var sCurrency, nLength, nCnt=0;
var sNum, sDec;
nCurrency *=100;
nCurrency = Math.round(nCurrency);
sCurrency = new String(nCurrency);
nLength = sCurrency.length;
sNum = sCurrency.substring(0, nLength-2);
sDec = sCurrency.substring(nLength-2, nLength);
var sTemp = new String;
for(var i=sNum.length; i >= 0; --i)
{
if((nCnt == 3) && (sNum.length > 3))
{
sTemp = sTemp + "," + sNum.substring(i,i-1);	
nCnt = 1;
}
else
{
sTemp = sTemp + sNum.substring(i,i-1);
++nCnt;
}
}
var sNum = new String;
for(var j = sTemp.length; j >=0; --j)
sNum = sNum + sTemp.substring(j, j-1);
sCurrency = sNum + '.' + sDec;
return(sCurrency);
}
function changeToFloat(strV){
strV = replaceChar(strV, " ", "");
strV = replaceChar(strV, ",", "");
var intValue = 0;
var intMult = 1;
var firstChar = strV.charAt(0);
if(firstChar != "-") firstChar = ""; 
else strV = strV.substring(1, strV.length);
var lastChar = strV.charAt(strV.length -1);
lastChar = lastChar.toUpperCase();
if(lastChar == "K")
{
intMult = 1000.00
strV = strV.substring(0, strV.length-1);
} 
else 
if (lastChar == "M") 
{
intMult = 1000000.00
strV = strV.substring(0, strV.length-1);
}
if(!isFloat(strV)) return "";
intValue = (parseFloat(strV, 10))* intMult;
if(isNaN(intValue)) return "";
intValue = "" + intValue
var dec = intValue.indexOf(".");
if(dec == -1) intValue = intValue + ".00"
return firstChar + intValue;
}
function getDecimal(sValue)
{
var sLastChar;
var nIndex;
var nIndex = sValue.indexOf(".");
if (nIndex == -1) return "";
sDec = sValue.substring(nIndex+1);
sDec = sDec.replace(/(\D)/g, "");
while ((sDec.charAt(sDec.length-1) == "0") && (sDec.length > 1))
{
sDec = sDec.substring(0, sDec.length-1);
}
return sDec;
}
function formatAmountString(sValue)
{
var sDec;
if(isEmpty(sValue)) return "";
var nMult = 1;
var sLastChar = sValue.charAt(sValue.length-1);
sLastChar = sLastChar.toUpperCase();
var sLastChars = "";
var sOneBeforeLastChar = sValue.charAt(sValue.length-2);
sOneBeforeLastChar = sOneBeforeLastChar.toUpperCase();
if((sOneBeforeLastChar == "M")&&(sLastChar == "M"))
{	
sLastChars = sValue.substring(sValue.length-2, sValue.length);	
sValue = sValue.substring(0 ,sValue.length-2);
sDec = getDecimal(sValue);
if (sDec != "" )
{
sValue = sValue.substring(0, sValue.indexOf(".")) + sDec; 
nMult = 1000000/Math.pow(10,sDec.length);
}
else
{ 
nMult = 1000000;
}
sDec = "";
}
else if ((sLastChar == "M")||(sLastChar == "K"))
{
sLastChars = sValue.substring(sValue.length-1, sValue.length);	
sValue = sValue.substring(0 ,sValue.length-1);
sDec = getDecimal(sValue);
if (sDec != "" )
{
sValue = sValue.substring(0, sValue.indexOf(".")) + sDec;
nMult = 1000/Math.pow(10,sDec.length);
}
else
{
nMult = 1000;
}
sDec = "";
}
else if ((sLastChar == "O")||(sLastChar == "o"))
{
sLastChars = sValue.substring(sValue.length-1, sValue.length);	
sValue = sValue.substring(0 ,sValue.length-1);
sDec = getDecimal(sValue);
if (sDec != "" )
{
sValue = sValue.substring(0, sValue.indexOf(".")) + sDec;
nMult = 100000000/Math.pow(10,sDec.length);
}
else
{
nMult = 100000000;
}
sDec = "";
}	
else
{
sDec = getDecimal(sValue);
if (sDec != "")
{ 
sValue = sValue.substring(0, sValue.indexOf("."));
}
}
if(!isNaN(sValue))
{	
var nValue = new Number(sValue) * nMult;
sValue = nValue.toString(10); 
var firstChar = sValue.charAt(0); 
if (firstChar == "-" || firstChar == "+")
{
sValue = sValue.substring(1,sValue.length); 
}
else
{
firstChar = "";
}
var i = sValue.length - 3; 
for(i; i > 0; i = i-3)
sValue = insertChar(sValue, i, UserSettings.numberSeparator);
sValue = firstChar + sValue;
if (sDec != "")
sValue += UserSettings.decimalPointChar + sDec;
}
else
{
sValue = sValue + sLastChars;
}
return sValue;
}
function formatAmount(obj)
{
if ( document.frmMain )
{
if (document.frmMain.elements["hidMarketOrderString"] &&
obj.value == document.frmMain.elements["hidMarketOrderString"].value)
return;
}
var sValue = obj.value
obj.value = formatAmountString(sValue);
}
function formatFixedDecimalAmount(obj, digits)
{
if ( document.frmMain )
{
if (document.frmMain.elements["hidMarketOrderString"] &&
obj.value == document.frmMain.elements["hidMarketOrderString"].value)
return;
}
var sValue = obj.value
obj.value = formatFixedDecimalAmountString(sValue,digits);
}
function formatSignedAmount(obj,digits)
{
var sValue = obj.value
obj.value = formatSignedAmountString(sValue,digits);
}
function formatSignedAmountString(sValue)
{
sValue = replaceChar(sValue, " ", "");
var firstChar = sValue.charAt(0);
var lastChar = sValue.charAt(sValue.length-1);
sValue = formatAmountString(sValue);
if ((firstChar == "-") || (firstChar == "(" && lastChar == ")"))
sValue = "-" + sValue;
return sValue;
}
function formatFixedDecimalAmountString(sValue, digits)
{
sValue = formatAmountString(sValue);
if ( sValue && digits && sValue!="" && digits>0 )
{
if ( getDecimal(sValue).length<digits ) {
sValue = idealToFixed(sValue,digits);
}
}
return sValue;
}
function RemoveDataEntryFormats(frm)
{
var nNumFields;
var arrFieldsInError = new Array;
var vName, vInfo, vValue, bRequired, vPureName, vTypePrefix;
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
if (vTypePrefix != "sel") {
vControl.value = vValue;
}
else if (vValue == "") 
{
vControl.value = vValue;
}
if ( vTypePrefix == "i" || vTypePrefix == "cur" || vTypePrefix == "flt" ) {
vControl.value =stripCharsInBag( vValue, numericCharsToIgnore );
}
if ( vTypePrefix == "dt" ) {
vControl.value =FormatDate( vValue, UserSettings.dateMask, "YYYY-MM-DD" );
}
}
}
function formatSpread(obj)
{
var sValue = obj.value;	
obj.value = formatSpreadString(sValue);
}
function formatSpreadString(sValue)
{	
sValue = replaceChar(sValue, " ", "");
if(sValue.length > 0)
{
sValue = formatAmountString(sValue);
var firstChar = sValue.charAt(0); 
if (firstChar != "-" && firstChar != "+") 
sValue = "+" + sValue;
}
return sValue;
}
