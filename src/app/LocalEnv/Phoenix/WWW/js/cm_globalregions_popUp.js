function onPageLoad()
{ 
}
function submitPage( frm , action, brokerID )
{
switch (action)
{
case "update" :
fAddValuesToParent()
window.close();
break;
case "cancel" :
window.close();
break;
}
}
function fAddValuesToParent()
{
var sRgnList="",i;
for(i=0;i< document.frmMain.selDestGlobalRegion.length;i++)
{ 
sRgnList = sRgnList + document.frmMain.selDestGlobalRegion[i].value + ";"; 
} 
if(sRgnList.length == 0)
{
sRgnList = "";
window.opener.document.frmCMAddDocument.chkSales.checked=false;
window.opener.document.all("AddRemAccess").style.display = 'none';
}
else
{
window.opener.document.frmCMAddDocument.chkSales.checked=true;
window.opener.document.all("AddRemAccess").style.display = 'block';
}
window.opener.document.frmCMAddDocument.hidSalesGblRegions.value = sRgnList;
}
function fAddOption(sText, sValue, oSelect)
{
var oOption = new Option(sText, sValue);
oSelect[oSelect.length] = oOption;	
}
function fAdd(sSourceList, sDestList)
{
var oSourceOptions, oDestOptions, i, x, bUnique;
oSourceOptions = eval("document." + sSourceList + ".options;");
oDestOptions = eval("document." + sDestList + ".options;");	
i = 0;	
if (oSourceOptions.length > 0)
{
do
{
bUnique = true;
if (oSourceOptions[i].selected)
{ 
for(x=0; x<oDestOptions.length; x++)
{ 
if (oDestOptions[x].value == oSourceOptions[i].value)
{
oDestOptions[x] = null;
break;
}
}
if (bUnique == true)
{
fAddOption(oSourceOptions[i].text, oSourceOptions[i].value, eval("document." + sDestList))
oSourceOptions[i] = null;
i = 0;
}
else
i++; 
}
else
i++;
}
while (i < oSourceOptions.length)
} 
}
function fAddAll(sSourceList, sDestList)
{
var oSourceOptions, oDestOptions, i, x, bUnique;
oSourceOptions = eval("document." + sSourceList + ".options;");
oDestOptions = eval("document." + sDestList + ".options;");	
i = 0;	
if (oSourceOptions.length > 0)
{
do
{
bUnique = true;
for(x=0; x<oDestOptions.length; x++)
{ 
if (oDestOptions[x].value == oSourceOptions[i].value)
{
oDestOptions[x] = null;
break;
}
}
if (bUnique == true)
{
fAddOption(oSourceOptions[i].text, oSourceOptions[i].value, eval("document." + sDestList))
oSourceOptions[i] = null;
i = 0;
}
else
i++; 
}
while (i < oSourceOptions.length)
} 
}
