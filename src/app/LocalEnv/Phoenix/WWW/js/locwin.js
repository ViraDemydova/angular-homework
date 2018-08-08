var nm = 0; var here = ""; 
if (opener != null) 
{
here = opener.location.href; 
var isLayers = 0; 
var isAll = 0; 
var isID = 0; 
if (document.getElementById) 
{
isID = 1;
}
if (document.all) 
{
isAll = 1;
} 
else 
{ 
browserVersion = parseInt(navigator.appVersion); 
if ((navigator.appName.indexOf("Netscape") != -1) && (browserVersion == 4)) 
{
isLayers = 1;
}
}
}
function findInPage(str) 
{
if (opener.closed) 
{
alert("Unable to find as the main window has been closed."); 
self.close(); 
return false;
} 
else if (here != opener.location.href) 
{
here = opener.location.href; 
nm = 0;
} 
if (str == "") 
{
alert("Please enter the text you want to locate."); 
return false;
} 
var tx, i, found; 
if (isLayers) 
{
if (!opener.find(str)) 
while(opener.find(str,false,true)) 
n++; 
else 
n++;
if (n == 0) 
alert(str + "not found on this page."); 
} 
else if (isAll) 
{
tx = opener.document.body.createTextRange();
for (i = 0; i <= nm && (found = tx.findText(str)) != false; i++) 
{
tx.moveStart("character", 1); 
tx.moveEnd("textedit");
} 
if (found) 
{
tx.moveStart("character", -1); 
try
{
tx.findText(str);
tx.select(); 
tx.scrollIntoView(); 
nm++;
}
catch(e)
{
nm++;
findInPage(str);
}
}
else 
{
if (nm > 0) 
{
nm = 0; 
findInPage(str);
}
else 
alert(str + " not found on this page.");
}
} 
else if (isID) 
{
alert("Find function not supported on this browser yet.");
} 
return false;
} 
function mnWin() 
{
if (opener.closed) 
{
alert("Main window has been closed."); 
self.close();
} 
else 
{
opener.focus(); 
locatorWin();
}
}
