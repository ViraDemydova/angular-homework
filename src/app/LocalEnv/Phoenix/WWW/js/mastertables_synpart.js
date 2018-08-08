<!-- 
RSEnableRemoteScripting("/_ScriptLibrary");
function CheckConditionallyRequiredFields( frm, arrFieldsInError )
{
var arrMoreErrors = new Array();
if (frm.sName.value == '')
{
var arrErrors = FieldErrorInfo("", "", "", "sName", "Name Required");
arrErrors[2] = '';
arrMoreErrors[0] = arrErrors;
return (arrMoreErrors);
}
return (arrMoreErrors);
} 
function CustomValidation( frm, arrFieldsInError )
{
var arrMoreErrors = new Array();
if (frm.hidAction.value == "Delete" && frm.selRequestID.options[frm.selRequestID.selectedIndex].value == "")
{
var arrError = FieldErrorInfo("", "", "", "selRequestID", "Please select an item you would like to delete.");
arrError[2] = '';
arrMoreErrors[0] = arrError;
return (arrMoreErrors);
}	
if (frm.hidAction.value == "Update" || frm.hidAction.value == "Add")
{
if (frm.sName.value.length > 64)
{
var arrError = FieldErrorInfo("", "", "", "sName", "Please do not enter more than 64 characters in the Name field");
arrError[2] = '';
arrMoreErrors[0] = arrError;	
return (arrMoreErrors);
}
if (frm.chkEquity.checked == false && frm.chkDebt.checked == false)
{
var arrError = FieldErrorInfo("", "", "", "chkEquity", "Equity and/or Debt Required");
arrError[2] = '';
arrMoreErrors[0] = arrError;	
return (arrMoreErrors);
}
}	
return (arrMoreErrors);
} 
function submitPage( frm , action )
{
switch (action)
{
case	"savechanges" : 
frm.method = "POST";
if (frm.hidRequestID.value == "")
{
frm.hidAction.value = "Add";
}
else
{
frm.hidAction.value = "Update";
}
if (frm.hidDetailsTab.value == '1')
{
frm.hidProgID.value = "NEWISSUEMASTER_USR.UnderwriterGroup";
}
else
{
frm.hidProgID.value = "NEWISSUEMASTER_USR.MasterUnderwriter";
}
frm.action = "util_submit_action.asp";
if (frm.hidDetailsTab.value == '1')
{
frm.hidlstCurrentGroup.value = "";
for(i=0; i<document.frmMain.lstCurrentGroup.options.length; i++)
{ 
if (i == document.frmMain.lstCurrentGroup.options.length -1)
{
frm.hidlstCurrentGroup.value += document.frmMain.lstCurrentGroup.options[i].value;
}
else
{
frm.hidlstCurrentGroup.value += document.frmMain.lstCurrentGroup.options[i].value + ",";
}
}
}
if(ValidateForm( frm )) 
frm.submit();
break; 
case "reverttosaved" :
frm.method = "POST";
frm.hidAction.value = "find";
frm.action = "mastertables_synpart.asp";
frm.submit();	
break;
case "cancel" :
frm.action = "mastertables_synpart.asp";
frm.submit();
break;
case	"find" :
frm.method = "POST";
frm.hidAction.value = action;
frm.action = "mastertables_synpart.asp";
frm.submit();	
break;
case	"create" :
if (typeof(frm.hidDetailsTab) != "undefined")
frm.hidDetailsTab.value = 1;
frm.method = "POST"; 
frm.hidAction.value = action;
frm.action = "mastertables_synpart.asp";
frm.submit();	
break; 
case	"viewAll" :
frm.method = "POST"; 
frm.hidAction.value = action;
frm.action = "mastertables_synpart.asp";
frm.submit();	
break; 
case	"edit" :
frm.method = "POST";
frm.hidAction.value = "find";
frm.action = "mastertables_synpart.asp";
frm.submit();	
break; 
case	"delete" :
var ret=confirm("Are you sure that you want to delete this list?");
if (ret)
{
frm.hidAction.value = "Delete";
if(!ValidateForm( frm ))
return;	
frm.hidProgID.value = "NEWISSUEMASTER_USR.UnderwriterGroup";
frm.method = "POST";
frm.action = "util_submit_action.asp";
frm.submit();
}
break; 
case "findBrokerDealer" :
DoFindBrokerDealer ( frm );
break;
case	"OrderBySortName" :
frm.method = "POST";
frm.hidProgID.value = "NEWISSUEMASTER_USR.MasterUnderwriter"; 
frm.hidAction.value = "OrderBySortName";
frm.action = "util_submit_action.asp";
frm.submit();	
break; 
}
}
function changeTab(frm, action, iTab)
{
if (DirtyDataQuestion())
{
frm.hidDetailsTab.value = iTab;
frm.hidAction.value = action;
frm.method = "POST";
frm.action = "mastertables_synpart.asp";
frm.submit();	
}
}
function setSubmitPage(selRequestID, frm , action ) 
{
frm.selRequestID.value = selRequestID;
submitPage( frm , action );
} 
function fMoveOption(oSelect, sDirection)
{
//-- Declare Local Variables --
var sIndex, sText, sValue, sText2, sValue2, bMoveOk;
var oSourceOptions = oSelect.options;
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
setDirty();
oSourceOptions[sIndex2].selected = true;
oSourceOptions[sIndex].selected = false; 
}	
}
function fAdd(sSourceList, sDestList)
{
var oSourceOptions, oDestOptions, i, x, bUnique;
oSourceOptions = sSourceList.options;
oDestOptions = sDestList.options;	
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
fAddOption(oSourceOptions[i].text, oSourceOptions[i].value, sDestList)
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
function fAddOption(sText, sValue, oSelect)
{
var oOption = new Option(sText, sValue);
oSelect[oSelect.options.length] = oOption;
setDirty();
}
function onSelectionChange()
{
if (document.frmMain.hidIsDirty.value == "true")
window.showModalDialog("mastertables_synpart_save_popup.asp");
}
function setDirty()
{
document.frmMain.hidIsDirty.value = "true";
}
function DirtyDataQuestion()
{
var sDirtyDataQuestion = "Data has changed. Click 'Save' to continue.";
var bReturn = false;
if (document.frmMain.hidIsDirty.value == "true")
{
alert(sDirtyDataQuestion);
}
else{
bReturn = true;
}	
return bReturn;
}
function onEnter()
{
var keyCode = event.keyCode;
if (keyCode == 13){
submitPage(document.frmMain, "find");
}	
} 
function error_alert(co)
{
alert("Error_callback\n\n" +
"status = " + co.status + "\n\n" +
"message = " + co.message + "\n\n" +
"data = " + co.data);
}
function DoFindBrokerDealer( frm )
{
var sArray, sNameID;
var co, op;
var nIndex;
var sDebtEqFlag = frm.hidDebtEqFlag.value;
var sSearch = frm.sBrokerDealer.value;
if (sSearch.length == 0 || sSearch == '&' )
{
return alert ("You must enter at least one letter to search for a broker/dealer.");
}
if (sDebtEqFlag == "")
{
if (frm.chkEquity.checked && frm.chkDebt.checked)
sDebtEqFlag = "B";
else if (frm.chkEquity.checked)
sDebtEqFlag = "E";
else if (frm.chkDebt.checked)
sDebtEqFlag = "D";
else
return alert ("Please select a deal type (Equity or Debt or Both)");
}
var co = RSExecute('rs_MasterTables_SynPart.asp', 'js_FindBrokerDealer', sDebtEqFlag, sSearch);
if (co.status != 0)
{
error_alert(co);
return;
}
sArray = co.return_value.split("|");
frm.lstAvailable.options.length = 0;
if (sArray != "undefined")
{ 
for (nIndex = 0; nIndex < sArray.length; nIndex++)
{
op = document.createElement("OPTION");
sNameID = sArray[nIndex].split("_");
op.value = sNameID[1];
op.text = sNameID[0];
if(op.value!="undefined" && op.text != "")	
{ 
frm.lstAvailable.options.add(op);
}
}
}
else
{
op = document.createElement("OPTION");
op.value = -1;
op.text = "No Results Found";
frm.lstAvailable.options.add(op);
}
}
function AddToGroup(selSrc, selDesc)
{
var iIdx = selSrc.selectedIndex;
if (iIdx >= 0)
{
if(isBrokerInList(selDesc, selSrc[iIdx].value) == false)
{
var oOption = new Option(selSrc[iIdx].text, selSrc[iIdx].value);
selDesc[selDesc.length] = oOption;
setDirty();
}
selSrc[iIdx] = null;
}
}
function isBrokerInList(selDesc, brokerID)
{
for(var i=0;i<selDesc.length;i++)
if(brokerID == selDesc[i].value)
return true;
return false;
}
