function onPageLoad()
{ 
var arrExchanges = window.opener.GetSelectedExchanges();
var oOption;
for(var i=0; i < arrExchanges.length; i++)
{
for(var selLoop =0;selLoop < document.frmMain.selSrcExchange.length; selLoop++)
{
if(document.frmMain.selSrcExchange[selLoop].value == arrExchanges[i].exchange_id)
{
oOption = new Option(document.frmMain.selSrcExchange[selLoop].text,document.frmMain.selSrcExchange[selLoop].value);
document.frmMain.selDestExchange[document.frmMain.selDestExchange.length] = oOption;
document.frmMain.selSrcExchange[selLoop] = null;
break;
}
}
} 
}
function submitPage( frm , action, brokerID )
{
switch (action)
{
case "update" :
fAddValuesToParentOption()
window.close();
break;
case "cancel" :
window.close();
break;
}
}
function fAddValuesToParentOption()
{
var arrOldSelectedExchange = window.opener.GetSelectedExchanges();
var arrNewSelectedExchange = new Array();
var sAgentSt="",i;
for(i = 0; i < document.frmMain.selDestExchange.length; i++)
{
arrNewSelectedExchange[i] = new Object();
arrNewSelectedExchange[i].exchange_id = document.frmMain.selDestExchange[i].value;
arrNewSelectedExchange[i].name = document.frmMain.selDestExchange[i].text;
arrNewSelectedExchange[i].symbol = "";
for (var j = 0; j < arrOldSelectedExchange.length; j++)
{
if (arrOldSelectedExchange[j].exchange_id == arrNewSelectedExchange[i].exchange_id)
{
arrNewSelectedExchange[i].symbol = arrOldSelectedExchange[j].symbol;
break;
}
}
} 
window.opener.RefreshExchange(arrNewSelectedExchange);
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
function fMoveOption(oSelect, sDirection)
{
//-- Declare Local Variables --
var sIndex, sText, sValue, sText2, sValue2, bMoveOk;
var oSourceOptions = eval("document." + oSelect + ".options");
bMoveOk = false;
//-- Get Currently Selected Option --
sIndex = oSourceOptions.selectedIndex
//-- If Moving Up Check Option Not Already At Top --
if ((sDirection == "up") && (sIndex > 0))
bMoveOk = true;
//-- If Moving Down Check Option Not Already At Bottom --
if ((sDirection == "down") && (sIndex < oSourceOptions.length-1) && (sIndex >= 0))
bMoveOk = true;
//-- If option can be moved, move --
if (bMoveOk == true)
{
//--Data of Option Moving --
if (sDirection == "up")
sIndex2 = oSourceOptions.selectedIndex - 1;
else 
sIndex2 = oSourceOptions.selectedIndex + 1;
sText = oSourceOptions[sIndex].text;
sValue = oSourceOptions[sIndex].value;
//--Data of Option Moving Down--
sText2 = oSourceOptions[sIndex2].text;
sValue2 = oSourceOptions[sIndex2].value;
//--Create temporary option holders--
var oOption = new Option(sText, sValue, false, true);
var oOption2 = new Option(sText2, sValue2, false, false);
//--Move options--
oSourceOptions[sIndex2] = oOption;
oSourceOptions[sIndex] = oOption2; 
}	
}
