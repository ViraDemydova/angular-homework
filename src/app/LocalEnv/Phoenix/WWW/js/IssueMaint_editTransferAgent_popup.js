function onPageLoad()
{ 
var sAgentSt,sAgentList,oOption;
var ITransferAgentID;
if(window.opener.document.frmMain.hidCurrentTrnID)
{
var trnID = window.opener.document.frmMain.hidCurrentTrnID.value;
ITransferAgentID = eval("window.opener.document.frmMain.ITransferAgentID" + trnID);
}
else	
ITransferAgentID = window.opener.document.frmMain.ITransferAgentID;
for(var i=0;i < ITransferAgentID.length;i++)
{
sAgentSt = ITransferAgentID[i].value;
for(var selLoop =0;selLoop < document.frmMain.selSrcTransferAgent.length; selLoop++)
{
if(document.frmMain.selSrcTransferAgent[selLoop].value == sAgentSt)
{
oOption = new Option(document.frmMain.selSrcTransferAgent[selLoop].text,document.frmMain.selSrcTransferAgent[selLoop].value);
document.frmMain.selDestTransferAgent[document.frmMain.selDestTransferAgent.length] = oOption;
document.frmMain.selSrcTransferAgent[selLoop] = null; 
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
var sAgentSt="",i;
for(i=0;i< document.frmMain.selDestTransferAgent.length;i++)
{ 
sAgentSt = sAgentSt + document.frmMain.selDestTransferAgent[i].value + "_" + document.frmMain.selDestTransferAgent[i].text + "|" ; 
} 
window.opener.RefreshAgentList(sAgentSt) 
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
