<!-- 
RSEnableRemoteScripting("/_ScriptLibrary")
function onPageLoad()
{
menuShow('issuemaint_dealdetails_eq', 'show');
frmMain.hidCurSelectedTranche.value = frmMain.selTrancheId.selectedIndex;
frmMain.hidNextTrnID.value = frmMain.selTrancheId.options[frmMain.selTrancheId.selectedIndex].value;
frmMain.hidCurSelectedCounsel.value = frmMain.selCounsel.selectedIndex;	
frmMain.hidCurSelectedIssuerCounsel.value = frmMain.selIssuerCounsel.selectedIndex;	
if (document.getElementById("selLegalCounsel1") != null)
frmMain.hidCurSelectedLegalCounsel1.value = frmMain.selLegalCounsel1.selectedIndex;	
if (document.getElementById("selLegalCounsel2") != null)
frmMain.hidCurSelectedLegalCounsel2.value = frmMain.selLegalCounsel2.selectedIndex;	
}
function CheckConditionallyRequiredFields( frm, arrFieldsInError )
{
var arrMoreErrors = new Array();
return (arrMoreErrors);
} 
function CustomValidation( frm, arrFieldsInError )
{
var arrMoreErrors = new Array();
return (arrMoreErrors);
} 
function submitPage( frm , action, sType )
{
switch (action)
{
case "gettrancheinfo" :
if (frm.hidDirtyDataFlag.value == "True")
{
if (window.confirm(sDirtyDataQuestion))
{
return submitPage (frm, "savechanges", sType); 
}
else
{
frm.selTrancheId.selectedIndex = frm.hidCurSelectedTranche.value;
frm.hidNextTrnID.value = frm.hidCurSelectedTranche.value;
}
}
else
{
frm.action = "/asp/IssueMaint_Contacts.asp";
frm.hidAction.value = "gettrancheinfo";
frm.hidSaveType.value = sType;
frm.method = "post";
frm.submit(); 
}
break;
case "getattorneyinfo" :
if (sType == 'uw')
{
co = RSExecute ('rs_Common_Server.asp', 'GetAttorney', frm.elements("selCounsel").options[frm.elements("selCounsel").selectedIndex].value );
PopulateAttorney(frm.elements("selSrcAttorneys"), co.return_value);
}
else if (sType == 'issuer')
{
co = RSExecute ('rs_Common_Server.asp', 'GetAttorney', frm.elements("selIssuerCounsel").options[frm.elements("selIssuerCounsel").selectedIndex].value);
PopulateAttorney(frm.elements("selSrcIssuerAttorneys"), co.return_value);
}
else if (sType == 'legal1')
{
co = RSExecute ('rs_Common_Server.asp', 'GetAttorney', frm.elements("selLegalCounsel1").options[frm.elements("selLegalCounsel1").selectedIndex].value);
PopulateAttorney(frm.elements("selSrcLegalAttorneys1"), co.return_value);
}
else if (sType == 'legal2')
{
co = RSExecute ('rs_Common_Server.asp', 'GetAttorney', frm.elements("selLegalCounsel2").options[frm.elements("selLegalCounsel2").selectedIndex].value);
PopulateAttorney(frm.elements("selSrcLegalAttorneys2"), co.return_value);
}
else ;
break;
case "savechanges":
if(ValidateForm( frm ))
{
frm.action = "/asp/util_submit_action.asp";
frm.method = "post";
frm.hidProgId.value = "IssueMaintenance_usr.Contacts";
if (frm.chkApplyToAllTranche && frm.chkApplyToAllTranche.checked == true) 
frm.hidAction.value = "UpdateAllTranche";
else
frm.hidAction.value = "Update";
frm.hidMultiSynResearchAnalysts.value = fCollectSelectVals(document.frmMain.selDestResearchAnalyst.options); 
frm.hidMultiBankers.value = fCollectSelectVals(document.frmMain.selDestBankers.options); 
frm.hidMultiAttorney.value = fCollectSelectVals(document.frmMain.selDestAttorneys.options);
frm.hidMultiIssuerAttorney.value = fCollectSelectVals(document.frmMain.selDestIssuerAttorneys.options);
if (document.getElementById("selDestLegalAttorneys1") != null)
frm.hidMultiLegalAttorney1.value = fCollectSelectVals(document.frmMain.selDestLegalAttorneys1.options);
if (document.getElementById("selDestLegalAttorneys2") != null)
frm.hidMultiLegalAttorney2.value = fCollectSelectVals(document.frmMain.selDestLegalAttorneys2.options);
frm.hidMultiSynOriginators.value = fCollectSelectVals(document.frmMain.selDestSynOriginators.options); 
frm.hidMultiSynMarketers.value = fCollectSelectVals(document.frmMain.selDestSynMarketers.options); 
frm.hidMultiSynMgrs.value = fCollectSelectVals(document.frmMain.selDestSynManagers.options); 
frm.hidMultiSynOps.value = fCollectSelectVals(document.frmMain.selDestSynOps.options); 
frm.submit(); 
}
break;
case "reverttosaved" :
frm.action = "/asp/IssueMaint_Contacts.asp?Reload=true";
{
frm.hidDirtyDataFlag.value = "False";
frm.submit();
}
break;
case "cancel" :
frm.action = "/asp/IssueMaint_Contacts.asp?Reload=true";
if (frmMain.hidDirtyDataFlag.value == "True")
{
if (window.confirm(sDirtyDataQuestion))
{
frm.hidDirtyDataFlag.value = "False";
frm.submit();
}
}
else
{
frm.hidDirtyDataFlag.value = "False";
frm.submit();
}
break;
case "addreg" :
frm.action = "/asp/IssueMaint_Contacts.asp";
frm.submit();
break;
}
}
function fCollectSelectVals(oSourceListOptions)
{
var oSourceOptions, sList, z;
sList="";
for(z=0; z<oSourceListOptions.length; z++)
{
if (z==0){
sList += oSourceListOptions[z].value;
}
else{
sList += "," + oSourceListOptions[z].value; 
}
}
return sList;
}
function fSaveSelectState( oSelect, sType )
{
if (sType == "tranche")
{
frmMain.hidCurSelectedTranche.value = oSelect.selectedIndex;
frmMain.hidNextTrnID.value = frmMain.hidCurSelectedTranche.value;
}
if (sType == "counsel")
frmMain.hidCurSelectedCounsel.value = oSelect.selectedIndex;	
if (sType == "issuer_counsel")
frmMain.hidCurSelectedIssuerCounsel.value = oSelect.selectedIndex;	
if (sType == "legal_counsel1")
frmMain.hidCurSelectedLegalCounsel1.value = oSelect.selectedIndex;
if (sType == "legal_counsel2")
frmMain.hidCurSelectedLegalCounsel2.value = oSelect.selectedIndex;	
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
function fAddOption(sText, sValue, oSelect)
{
var oOption = new Option(sText, sValue);
oSelect[oSelect.length] = oOption;
frmMain.hidDirtyDataFlag.value = "True";
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
frmMain.hidDirtyDataFlag.value = "True";
}	
}
function PopulateAttorney(obj, sRet)
{
var arrRet = sRet.split("|");
if (arrRet.length > 1)
obj.options.length = 0;
for (var i=0; i < arrRet.length - 1 ; i++)
{
var arrRet1 = arrRet[i].split("^");
var sID = arrRet1[0];
var sName = arrRet1[1];
var opt = new Option(sName, sID);
obj.options[i] = opt;
}
}
function OnChangeTranche (frm, oSelect)
{
if (frm.hidDirtyDataFlag.value == "True")
{
if (window.confirm(sDirtyDataQuestion))
{
frm.hidNextTrnID.value = oSelect.options[oSelect.selectedIndex].value;
oSelect.selectedIndex = frm.hidCurSelectedTranche.value;
return submitPage (frm, "savechanges", "tranche"); 
}
else
{
oSelect.selectedIndex = frm.hidCurSelectedTranche.value;
frm.hidNextTrnID.value = oSelect.options[frm.hidCurSelectedTranche.value];
}
}
else
{
frm.hidCurSelectedTranche.value = oSelect.selectedIndex;
frm.hidNextTrnID.value = oSelect.options[frm.hidCurSelectedTranche.value];
frm.action = "/asp/IssueMaint_Contacts.asp";
frm.hidAction.value = "gettrancheinfo";
frm.hidSaveType.value = "tranche";
frm.method = "post";
frm.submit(); 
}
}
function onPrinterChange(frm)
{
frm.hidDirtyDataFlag.value = "True";
}
