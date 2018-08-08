<!-- 
RSEnableRemoteScripting("/_ScriptLibrary");
var g_bDirtyPage = false;
function CheckConditionallyRequiredFields( frm, arrFieldsInError )
{
var nErrInd = 0;
var arrMoreErrors	= new Array();
if(frm.dtTxtPreStartDate)
{
var sPreMktStart	= frm.dtTxtPreStartDate.value;
var sPreMktEnd = frm.dtTxtPreEndDate.value;
if ((sPreMktStart != "") && (sPreMktEnd == ""))
{
var arrError = FieldErrorInfo("dtTxtPreEndDate", "Pre-marketing end date cannot be empty.", "", "dtTxtPreEndDate", "Pre-marketing End Date");
arrMoreErrors[nErrInd] = arrError;
nErrInd++;
}
if ((sPreMktStart == "") && (sPreMktEnd != ""))
{
var arrError = FieldErrorInfo("dtTxtPreStartDate", "Pre-marketing start date cannot be empty.", "", "dtTxtPreStartDate", "Pre-marketing Start Date");
arrMoreErrors[nErrInd] = arrError;
nErrInd++;
}
}
if (frm.selCoordinatorName.selectedIndex == 0)
{
var arrError = FieldErrorInfo("selCoordinatorName", "Must select a Coordinator.", "", "selCoordinatorName", "Coordinator Name");
arrMoreErrors[nErrInd] = arrError;
nErrInd++;
}
if(frm.txtOVDealCode.value == "")
{
var arrError = FieldErrorInfo("txtOVDealCode", "Must enter a Roadshow code.", "", "txtOVDealCode", "Roadshow code");
arrMoreErrors[nErrInd] = arrError;
nErrInd++;
}
return (arrMoreErrors);
} 
function CustomValidation( frm, arrFieldsInError )
{
var arrMoreErrors	= new Array();
if(frm.dtTxtPreStartDate)
{	
var dtPreMktStart	= new Date(frm.dtTxtPreStartDate.value);
var dtPreMktEnd = new Date(frm.dtTxtPreEndDate.value);
}
var dtStart = new Date(frm.rdtTxtStartDate.value);
var dtEnd = new Date(frm.rdtTxtEndDate.value);
var nErrInd = 0;
if(frm.dtTxtPreStartDate)
{	
if (dtPreMktEnd < dtPreMktStart)
{
var arrError = FieldErrorInfo("dtTxtPreEndDate", "Pre-marketing end date must be greater and start date", "", "dtTxtPreEndDate", "Pre-Marketing End Date");
arrMoreErrors[nErrInd] = arrError;
nErrInd++;
}
} 
if (dtEnd < dtStart)
{
var arrError = FieldErrorInfo("rdtTxtEndDate", "Roadshow end date must be greater than start date", "", "rdtTxtEndDate", "Roadshow End Date");
arrMoreErrors[nErrInd] = arrError;
nErrInd++;
}
if (frm.selCoordinatorName.selectedIndex == 0)
{
var arrError = FieldErrorInfo("selCoordinatorName", "Must select a Coordinator", "", "selCoordinatorName", "Coordinator Name");
arrMoreErrors[nErrInd] = arrError;
nErrInd++;
}
if ( frm.cbConcurrent.checked && frm.selConcurrentDealCode.selectedIndex==-1 ) 
{
var arrError = FieldErrorInfo("selConcurrentDealCode", "Concurrent Deal Code must be selected if Concurrent Offering is checked.", "", "selConcurrentDealCode", "Concurrent Deal Code");
arrMoreErrors[nErrInd] = arrError;
nErrInd++;
}
return (arrMoreErrors);
}
function onPageLoad()
{
ConfirmRemoteScripting();
RSCallObject_wait(); 
var frm = document.frmMain;
PopulateCoordinator(frm.hidRSIssID.value, frm.hidCoordId.value);
if (Number(frm.hidRSIssID.value) > 0)
{
showElement(divOverview);
populateOverview();
PopulateGlobalRegion(frm);
RS_PopulateConcDealCode();
}
else
{
g_bDirtyPage = true;
}
if (frm.hidDealName.value != "")
showElement(divOverview);
if(frm.txtAliasName)
{
frm.txtAliasName.value = frm.hidAliasName.value;	
frm.txtAliasCode.value = frm.hidAliasCode.value;	
}
}
function submitPage( frm, action, sID, sName )
{
var vRsIssId = frm.hidRSIssID.value;
switch (action)
{ 
case "Cancel":
if (confirm("Are you sure you want to cancel it?") == true)
frm.reset();
break;
case "Next":
var vIssID = frm.hidDealID.value;
var vDealName = frm.hidDealName.value;
var vExpenseCD = frm.hidExpenseCD.value;
var vAliasName = frm.hidAliasName.value;
var vAliasCode = frm.hidAliasCode.value;
var vDealCode = frm.hidDealCD.value;
var vRSIssueID = frm.hidRSIssID.value;
var vIssrID = frm.hidIssuerId.value;
if (g_bDirtyPage == false)
frm.action = "/asp/Roadshow_overview_contacts.asp?RSIssID=" + vRSIssueID + "&IssID=" + vIssID + "&DName=" + vDealName + "&DealCode=" + vDealCode + "&ECode=" + vExpenseCD + "&AName=" + vAliasName + "&ACode=" + vAliasCode + "&IssrID=" + vIssrID;
else
{
if (vRsIssId == ""||vRsIssId == "0")
{
frm.hidNextPage.value = "";
frm.hidAction.value = "Add";
}
else
{
frm.hidNextPage.value = "/asp/Roadshow_overview_contacts.asp?RSIssID=" + vRSIssueID;
frm.hidAction.value = "Update";
}
frm.action = "/asp/specialutil_submit_action.asp";
}
frm.submit();
break;
case "Save":
if(ValidateForm( frm ))
{
frm.txtOVDealName.disabled = false;
if (vRsIssId == ""||vRsIssId == "0")
{
frm.hidAction.value = "Add";
frm.hidNextPage.value = "";
}
else
{
frm.hidAction.value = "Update";
frm.hidNextPage.value = "/asp/specialRoadshow_Overview.asp?";
}
frm.action = "/asp/specialutil_submit_action.asp";
frm.submit(); 
}
break; 
}
}
function popUpDeal(frm)
{
var frm = document.frmMain;
var RSEqType = frm.hidRSEqType.value;
var RSDtType = frm.hidRSDtType.value;
var RSDealType;
if ((RSEqType == "1") && (RSDtType == "1")) 
RSDealType = "0";
else if (RSEqType == "1")
RSDealType = "2";
else 
RSDealType = "1"; 
var sUrl = "Roadshow_overview_search_popup.asp?RSDealType=";
sUrl += RSDealType;
if (frm.hiddealtype.value =="Non")
{
if (frm.hidSDC.value == 'SDCPopulator')
sUrl = "Roadshow_SDC_CompanySearchResults.asp"
else
sUrl = "Roadshow_CompanySearchResults.asp"
}
var sStyle = "width=500, height=450, scrollbars=1";
openGeneralPopup( sUrl, '', sStyle );
}
function populateOverview()
{
var frm = document.frmMain;
frm.txtOVDealName.value = frm.hidDealName.value;
frm.txtOVDealCode.value = frm.hidDealCD.value;
frm.txtOVExpenseCode.value = frm.hidExpenseCD.value;
var sTmp = new String(frm.hidUseAlias.value);
if(document.all.cbUseAlias)
{
document.all.cbUseAlias.checked = (sTmp.length > 0) ? sTmp : false;
frm.txtAliasName.value = frm.hidAliasName.value;
frm.txtAliasCode.value = frm.hidAliasCode.value;
}
if (frm.hidDayCount.value == "")
{
getDocumentElement("divDayCount").innerText = "0";
}
else
{
getDocumentElement("divDayCount").innerText = frm.hidDayCount.value;
}
if (frm.hidPMDayCount.value == "" )
{
if(getDocumentElement("divPreDayCount"))
getDocumentElement("divPreDayCount").innerText = "0";
}
else
{
if(getDocumentElement("divPreDayCount"))
getDocumentElement("divPreDayCount").innerText = frm.hidPMDayCount.value;
}
if (frm.hidAccept1On1.value == true)
frm.cb1on1.checked = true;
else
frm.cb1on1.checked = false;
if(frm.cbUseAlias)
{
if (frm.hidUseAlias.value == true)
{
frm.cbUseAlias.checked = true;
frm.txtAliasName.value = frm.hidAliasName.value;
frm.txtAliasCode.value = frm.hidAliasCode.value;
}
else
{
frm.cbUseAlias.checked = false;
frm.txtAliasName.value = "";
frm.txtAliasCode.value = "";
}
}
if (frm.hidConcurrentInd.value == true)
{
frm.cbConcurrent.checked = true;
showConcurrent(frm);
}
else
{
frm.cbConcurrent.checked = false;
frm.selConcurrentDealCode.selectedIndex = 0;
}
PopulateConcDealCode(frm);
MatchConcurrent(frm);
MatchCoordinator(frm.hidCoordId.value);
if (typeof(divNextBtn) != "undefined")
showElement(divNextBtn);
}
function ClearConcDealCode (frm)
{
frm.selConcurrentDealCode.options.length = 1; 
}
function MatchCoordinator(iCoordId)
{
var frm = document.frmMain;
for (var i=0; i < frm.selCoordinatorName.options.length ; i++)
{
if (frm.selCoordinatorName.options[i].value == iCoordId)
{
frm.selCoordinatorName.selectedIndex = i;
frm.hidCoordSelectedID.value = iCoordId;
break;
}
}
setTimeout("PopulateGlobalRegionTimeOut();",1000); 
}
function PopulateListBox(lbCtrl)
{
}
function PopulateGlobalRegionTimeOut()
{
PopulateGlobalRegion(document.frmMain);
}
function showConcurrent(form) 
{
if (form.cbConcurrent.checked==true) 
{
document.all.divConcurrent.style.visibility="visible";
} 
else if (form.cbConcurrent.checked==false) 
{
document.all.divConcurrent.style.visibility="hidden";
}
}
function MatchConcurrent(form)
{
for (var i=1; i < form.selConcurrentDealCode.options.length; i++)
{
if (Number(form.selConcurrentDealCode.options[i].value) == Number (form.hidConcurrentID.value))
{
form.selConcurrentDealCode.selectedIndex = i;
form.hidConcSelectedID.value = form.hidConcurrentID.value;
break;
}
}
}
function onConcSelected(form)
{
form.hidConcSelectedID.value = form.selConcurrentDealCode.options[form.selConcurrentDealCode.selectedIndex].value;
var sName = form.selConcurrentDealCode.options[form.selConcurrentDealCode.selectedIndex].text;
var arrName = sName.split("-");
form.hidConcSelectedCD.value = arrName[0];
}
function onCoordSelected(form)
{
form.hidCoordSelectedID.value = form.selCoordinatorName.options[form.selCoordinatorName.selectedIndex].value;
form.hidCoordId.value = form.hidCoordSelectedID.value;
PopulateGlobalRegion(form);	
}
function SaveSessionDataAndReload (iRsIssID, iIssID, sDealName, sDealCode, sDebtEqFlg, issrID,iEntityID)
{
var frm = document.frmMain;
frm.hidRSIssID.value = iRsIssID;
frm.hidDealID.value = iIssID;
frm.hidDealName.value = sDealName;
frm.hidDealCD.value = sDealCode;
frm.hidDebtEqFlag.value = sDebtEqFlg;
frm.hidIssuerId.value = issrID;
frm.hidEntityID.value = iEntityID;
setTimeout("TOSaveSessionDataAndReload()",100); 
}
function TOSaveSessionDataAndReload()
{
var frm = document.frmMain;
var iRSIssID = frm.hidRSIssID.value;
var iIssID = frm.hidDealID.value;
var sDebtEqFlg = frm.hidDebtEqFlag.value;
var iEntityID = frm.hidEntityID.value;
co= RSExecute ('rs_GetCoordinatorInfo_server.asp', 'SaveSessionHeaderInfo', iRSIssID, iIssID, frm.hidDealName.value, frm.hidDealCD.value, sDebtEqFlg, frm.hidIssuerId.value,iEntityID);
if (co.return_value != "1")
alert("Failed to save roadshow session info. !");
else
document.location="/ASP/specialRoadshow_Overview.asp?iRSIssID=" + iRSIssID + "&IssID=" + iIssID + "&DebtEqFlag=" + sDebtEqFlg;
}
function DisableNextButton()
{
g_bDirtyPage = true;
}
function ConfirmRemoteScripting()
{
var enabled = false;
enabled = RSExecute('rs_GetCoordinatorInfo_server.asp', 'js_RemoteScriptingEnabled').return_value;
if (! enabled)
{
alert("Remote scripting not enabled");
}
}
var arrCoordIdPhoneNo = new Array(["",""]);
function PopulateCoordinator(iRSIssID, iCoordId)
{
var frm = document.frmMain;
var iSelectedIndex = 0;
{
co= RSExecute ('rs_GetCoordinatorInfo_server.asp', 'ListCoordinators', 0);
var sRet = co.return_value;
var arrRet = sRet.split("|");
for (var i=0; i < arrRet.length - 1 ; i++)
{
var arrRet1 = arrRet[i].split("^");
var sName = arrRet1[0];
var arrRet2 = arrRet1[1].split("_");
var sCoordId = arrRet2[0];
var arrRet3 = arrRet2[1].split("!");
var sCoordtype = arrRet3[0];
var sPhoneNo = arrRet3[1];
var opt = new Option(sName, sCoordId);
frm.selCoordinatorName.options[i+1] = opt;
frm.txtCoordPhone.value = sPhoneNo;
if (Number(sCoordId) == Number(iCoordId))
{
iSelectedIndex = i+1;
frm.hidCoordSelectedID.value = iCoordId;
}
arrCoordIdPhoneNo[arrCoordIdPhoneNo.length] = new Array();
arrCoordIdPhoneNo[arrCoordIdPhoneNo.length - 1][0] = sCoordId;
arrCoordIdPhoneNo[arrCoordIdPhoneNo.length - 1][1] = sPhoneNo;
}
frm.selCoordinatorName.selectedIndex = iSelectedIndex;
}
}
function PopulateGlobalRegion(frm)
{
var sStr = "";
getDocumentElement("divGlobalRegion").innerText = sStr;
if (frm.hidCoordId.value.length > 0)
{
co = RSExecute ('rs_GetCoordinatorInfo_server.asp', 'GetCoordinatorInfo', frm.hidCoordId.value, 0, 0 );
var sRet = co.return_value;
var arrRet = sRet.split("|");
for (var i=0; i < arrRet.length - 1 ; i++)
{
var arrRet1 = arrRet[i].split("^");
var sName = arrRet1[0];
var ssName = arrRet1[1];
sStr = sStr + sName + "\r"
}
}
getDocumentElement("divGlobalRegion").innerText = sStr;
for (var i = 0; i < arrCoordIdPhoneNo.length; i++) 
{
if (arrCoordIdPhoneNo[i][0] == frm.hidCoordId.value)
{
frm.txtCoordPhone.value = arrCoordIdPhoneNo[i][1];
}
}
}
function RS_PopulateConcDealCode()
{
var frm = document.frmMain;
co = RSExecute ('rs_GetCoordinatorInfo_server.asp', 'ListRoadshowConcDealNamesByIDs', frm.hidIssuerId.value,frm.hidDealID.value,0 );
frm.hidConcurrent.value = co.return_value;
PopulateConcDealCode(frm);
}
function PopulateConcDealCode(frm)
{
var iCurDealID = frm.hidDealID.value;
var iSelectedConcID = frm.hidConcSelectedID.value;
var sConcDeals = frm.hidConcurrent.value.split("|");
for (var i=0, j=1; i < sConcDeals.length - 1 ; i++)
{
var sDeal = sConcDeals[i].split("^");
var opt = new Option(sDeal[1], sDeal[0]);
if (Number(iCurDealID) != Number(sDeal[0]))
{
frm.selConcurrentDealCode.options[j] = opt;
if (Number(iSelectedConcID) == Number(sDeal[0]))
frm.selConcurrentDealCode.selectedIndex = j;
j++;
}
}
}
function switchDealType(sType)
{
var sUrl;
var sName=""
if (document.frmMain.deal_type[1].checked == true)
{
sUrl = "/asp/specialRoadshow_Overview.asp?dealtype=" + "Non";
}
else
{
sUrl= "/asp/specialRoadshow_Overview.asp?dealtype=" + "Deal";
}
SaveSession("", "", sName, sName, 'E', "","");
hideElement(document.getElementById("divOverview"));
window.location = sUrl;
}
function SaveSession (iRsIssID, iIssID, sDealName, sDealCode, sDebtEqFlg, issrID,iEntityID)
{
var frm = document.frmMain;
frm.hidRSIssID.value = iRsIssID;
frm.hidDealID.value = iIssID;
frm.hidDealName.value = sDealName;
frm.hidDealCD.value = sDealCode;
frm.hidDebtEqFlag.value = sDebtEqFlg;
frm.hidIssuerId.value = issrID;
frm.hidEntityID.value = iEntityID;
TOSaveSessionDataAndReload();
}
