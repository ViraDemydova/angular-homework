var sUseAlias;
function showElement(oElement)
{
if (document.getElementById)
{
oElement.style.visibility="visible";
}
else if (document.all)
{
oElement.style.visibility="visible";
}
else if (document.layers)
{
oElement.visibility="show";
}
return 1;
}
function hideElement(oElement)
{
if (document.getElementById)
{
oElement.style.visibility="hidden";
}
else if (document.all)
{
oElement.style.visibility="hidden";
}
else if (document.layers)
{
oElement.visibility="hide";
}
return 1;
}
function SaveInvestorAlias(bSave)
{
var theForm = document.forms["frmMain"];
var parentDoc = self.window.opener.document;
if (bSave == true)
{
var txtElement = theForm.elements["TxtAliasName"];
var strValue = txtElement.value;
if (theForm.elements["rsUseActual"][1].checked == true) 
{
if (strValue == "")
{
alert("Must enter alias name");
theForm.elements["TxtAliasName"].focus();
return;
}
}
parentDoc.frmMain.hidInvestorAlias.value = strValue;
if(document.all)
{
parentDoc.all["pInvestorAlias"].innerText = strValue;
}
else if (document.layers)
{
parentDoc.frmMain.elements["pInvestorAlias"].value = strValue;
}
parentDoc.frmMain.hidUseAlias.value = sUseAlias;
if (strValue.length > 0)
{
if(document.all)
{
showElement(parentDoc.all["lblAlias"]);
showElement(parentDoc.all["AliasPopupEdit"]);
hideElement(parentDoc.all["AliasPopupCreate"]);
}
else if (document.layers)
{
showElement(parentDoc.layers["lblAlias"]);
showElement(parentDoc.layers["AliasPopupEdit"]); 
hideElement(parentDoc.layers["AliasPopupCreate"]);
}
}
else
{
if(document.all)
{
hideElement(parentDoc.all["lblAlias"]);
hideElement(parentDoc.all["AliasPopupEdit"]);
showElement(parentDoc.all["AliasPopupCreate"]);
}
else if (document.layers)
{
hideElement(parentDoc.layers["lblAlias"]);
hideElement(parentDoc.layers["AliasPopupEdit"]);
showElement(parentDoc.layers["AliasPopupCreate"]);
}
}
}
PreClose();
}
function PreClose()
{
var parentDoc = self.window.opener.document;
parentDoc.frmMain.hidPopUpTrack.value = "0";
window.close();
}
window.onunload=PreClose;
function OnClickUseActual(rdChecked)
{
if (rdChecked)
{
sUseAlias = "0";
document.forms["frmMain"].elements["TxtAliasName"].value="";
}
else
{
sUseAlias = "1";
}
}
function SetUseActual()
{
var theForm = document.forms["frmMain"];
var rdElement = theForm.elements["rsUseActual"];
sUseAlias = self.window.opener.document.frmMain.hidUseAlias.value;
if (sUseAlias == "1")
{
rdElement[1].checked = true;
}
else
{
rdElement[0].checked = true; 
} 
}
function OnFocus_AliasName()
{
self.window.opener.document.frmMain.hidUseAlias.value = "1";
SetUseActual();
}
