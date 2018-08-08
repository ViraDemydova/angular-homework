function onPageLoad()
{ 
var sHidProsCntryBlockID = "";
var aHidProsCntryBlockID;
sHidProsCntryBlockID = window.opener.getDocumentElement("hidBlockIOICntryID").value;
aHidProsCntryBlockID = sHidProsCntryBlockID.split("|");
for(var i = 0; i < aHidProsCntryBlockID.length; i++)
{
iHidProsCntryBlockID = aHidProsCntryBlockID[i];
for(var selLoop =0;selLoop < document.frmMain.selSrcCntry.length; selLoop++)
{
if(document.frmMain.selSrcCntry[selLoop].value == iHidProsCntryBlockID)
{
oOption = new Option(document.frmMain.selSrcCntry[selLoop].text,document.frmMain.selSrcCntry[selLoop].value);
document.frmMain.selDestCntry[document.frmMain.selDestCntry.length] = oOption;
document.frmMain.selSrcCntry[selLoop] = null; 
}
} 
} 
}
function submitPage( frm , action, brokerID )
{
switch (action)
{
case "update" :
fUpdateParentHiddenValue()
window.close();
break;
case "cancel" :
window.close();
break;
}
}
function fUpdateParentHiddenValue()
{
var sProsCntryBlockID = "";
var sProsCntryBlockNM = "";
for(var i = 0; i < document.frmMain.selDestCntry.length; i++)
{
if(sProsCntryBlockID)
{
sProsCntryBlockID = sProsCntryBlockID + "|" + document.frmMain.selDestCntry[i].value;
sProsCntryBlockNM = sProsCntryBlockNM + ", " + document.frmMain.selDestCntry[i].text;
}
else
{
sProsCntryBlockID = document.frmMain.selDestCntry[i].value;
sProsCntryBlockNM = document.frmMain.selDestCntry[i].text;
}
}
window.opener.getDocumentElement("hidBlockIOICntryID").value = sProsCntryBlockID;
window.opener.getDocumentElement("divBlockIOICntryNM").innerHTML = sProsCntryBlockNM;
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
