<!-- 
RSEnableRemoteScripting("/_ScriptLibrary");
function onPageLoad()
{
ConfirmRemoteScripting();
RSCallObject_wait(); 
}
function ConfirmRemoteScripting()
{ 
var enabled = false;
context = "Confirm";
co = RSExecute('rs_prospectus_contacts_send.asp', 'js_RemoteScriptingEnabled', RSShowResult, RSShowError, context);
}
function RSShowResult(co)
{
var frm = document.frmCMAddDocument;
var sRet = co.return_value
switch (co.context)
{
case "Confirm":
if (!sRet)
alert("Remote scripting not enabled");
break;
case "ListAccountContacts":
populateAcctContactSearchResultCombo(frm, sRet);
break;
case "SendEmail":
alert("Sent email to the contact administrator.") ;
break;
}
}
function RSShowError(co)
{
msg = "The following error occurred during the " 
msg = msg + co.context
msg = msg + " remote scripting call:\n"
msg = msg + co.message
alert(msg);
}
function OnFilterChange(nPosition)
{
var oFilterBy, sFilterBy, oElem ;
sFilterBy = "selFilterBy" + nPosition ;
oFilterBy = document.getElementById(sFilterBy);
if(oFilterBy.value == "ACCOUNTNUM" || oFilterBy.value == "CONTACTNAME")
{
var oSelSource = document.getElementById("selSource" + nPosition);
var oSelSearchValues = document.getElementById("selSearchValues" + nPosition);
var oAdd = document.getElementById("Add" + nPosition);
var oAddAll = document.getElementById("AddAll" + nPosition);
var oRemove = document.getElementById("Remove" + nPosition);
var oRemoveAll = document.getElementById("RemoveAll" + nPosition);
var oSearchResult = document.getElementById("searchResult" + nPosition);
var oSelectItems = document.getElementById("selectItems" + nPosition);
var obtnSearch = document.getElementById("btnSearch" + nPosition);
oSelSource.style.display = "none";
oSelSearchValues.style.display = "none";
oAdd.style.display = "none";
oAddAll.style.display = "none";
oRemove.style.display = "none";
oRemoveAll.style.display = "none";
oSearchResult.style.display = "none";
oSelectItems.style.display = "none";
obtnSearch.style.display = "none";
}
}
function onSearchValues(nPosition)
{
SearchFilterListValues(nPosition) ;
}
function SearchFilterListValues(nPosition)
{
var oElem, sSearchString, sMode;
oElem = document.getElementById("selFilterBy" + nPosition) ;
if(oElem)
{
sMode = oElem.value ;
}
if(sMode == "NONE") 
{
alert("Please select a criteria") ;
return ;
}
sSearchString = "" ;
oElem = document.getElementById("txtSearchValues" + nPosition) ;
if(oElem)
{
sSearchString = oElem.value ;
}
var co; 
co = RSExecute('rs_prospectus_contacts_send.asp', 'js_ListSearchCriteriaResults', sSearchString, sMode);
var strData = co.return_value;
var cbElement, sName, sValue
cbElement = document.getElementById("selSource" + nPosition) ;
if(cbElement)
{
cbElement.options.length = 0;
if (strData && strData != "")
{
aryRecords = strData.split("\t");
aryRecords.sort();
for (i=0; i < aryRecords.length; i++)
{
if(aryRecords[i] != "")
{
sValue = aryRecords[i] ;
sName = aryRecords[i] ;
cbElement.options[cbElement.options.length]= new Option(sName, sValue);
}
}
} 
else
{
cbElement.options[cbElement.options.length]= new Option("No results found.", "0");
}
}
}
function AddFilter()
{
for(var i = 1 ; i <= 12 ; i++)
{
var oElem = document.getElementById("divFilter" + i) ;
if(oElem)
{
if(oElem.style.display == "none")
{
oElem.style.display = "block" ;
break;
}
}
}
}
function onComplexSearchRemove(selSourceName, selTargetName)
{
try
{
var selSource, selTarget ;
selSource = document.getElementById(selSourceName) ;
selTarget = document.getElementById(selTargetName) ;
while(selSource.selectedIndex!=-1)
{
var bFound = false;
for(var i=0; i<selTarget.length; i++)
{
if(selSource.options(selSource.selectedIndex).text.toLowerCase()==selTarget.options(i).text.toLowerCase())
{
bFound=true;
break;
}
}
if(!bFound)
{
var newElem = document.createElement("OPTION");
newElem.text = selSource.options(selSource.selectedIndex).text;
newElem.value = selSource.options(selSource.selectedIndex).value; 
selTarget.options.add(newElem);
}
selSource.options.remove(selSource.selectedIndex);
}
onSearchSelectionSort(selTargetName);
onSearchSelectionSort(selSourceName);
}
catch(e)
{
alert("Please report this error to i-Deal\n" + "FRG-JS-RPT-FILTER-JS-onComplexSearchRemove - " + (e.number & 0xFFFF).toString() + " - " + e.description);
}
}
function onSearchSelectionSort(selControlName)
{
selControl = document.getElementById(selControlName) ;
var aryRecords = new Array();
for(var i=0;i<selControl.options.length;i++){
aryRecords.push(selControl.options[i].text+","+selControl.options[i].value);
}
aryRecords = aryRecords.sort();
selControl.options.length=0;
for(var i=0;i<aryRecords.length;i++){
aryRecordsArray = aryRecords[i].split(',');
selControl.options[selControl.options.length] = new Option(aryRecordsArray[0],aryRecordsArray[1]); 
} 
}
function onComplexSearchAddAll(selSourceName, selTargetName)
{
try
{
var selSource, selTarget ;
selSource = document.getElementById(selSourceName) ;
selTarget = document.getElementById(selTargetName) ;
if (selTarget.options.length <3)
{
for(var i=0; i<selTarget.length; i++) 
if(selTarget.options(i).text == "")
selTarget.options.remove(i);
}
while(selSource.options.length > 0)
{
var bFound = false;
for(var i=0; i<selTarget.options.length; i++)
{
if(selSource.options(0).text.toLowerCase()==selTarget.options(i).text.toLowerCase())
{
bFound=true;
break;
}
}
if(!bFound)
{
var newElem = document.createElement("OPTION");
newElem.text = selSource.options(0).text;
selTarget.options.add(newElem);
}
selSource.options.remove(0);
}
onSearchSelectionSort(selTargetName);
onSearchSelectionSort(selSourceName); 
}
catch(e)
{
alert("Please report this error to i-Deal\n" + "FRG-JS-RPT-FILTER-JS-onComplexSearchAddAll - " + (e.number & 0xFFFF).toString() + " - " + e.description);
}
}
function SearchContacts(sDisplayMode)
{
var bFilters = false;
var bNeedSecondaryFilter = false;
var sPrimaryFilter = "";
for(i = 1 ; i <= 12; i++)
{
var oFilterBy, sFilterBy, oElem ;
sFilterBy = "selFilterBy" + i ;
oFilterBy = document.getElementById(sFilterBy);
oElem = document.getElementById("divFilter" + i);
if(i == 1)
{
if(oFilterBy.value == "CRITICALCONTACTS" || oFilterBy.value == "INVESTORCOUNTRY" || oFilterBy.value == "ACCOUNTCONTACTCOUNTRY" )
{	bFilters = true;
sPrimaryFilter = oFilterBy.value;
bNeedSecondaryFilter = true;
}
} else {
if(bFilters == true && bNeedSecondaryFilter == true)
{
if(oFilterBy.value != sPrimaryFilter && oElem.style.display != "none") 
{
bNeedSecondaryFilter = false;
}
}
}
var oElem1 = document.getElementById("hidSearchValues" + i) ;
var oTxtSearchValues;
if(oFilterBy.value == "ACCOUNTNUM" || oFilterBy.value == "CONTACTNAME")
{
oTxtSearchValues = document.getElementById("txtSearchValues" + i);
if(oElem1) oElem1.value = oTxtSearchValues.value + ";";
}
else
{
var oSelectedValues = document.getElementById("selSearchValues" + i) ;
if(oSelectedValues)
{
var sTemp = "" ;
for(var j=0; j < oSelectedValues.options.length; j++)
{
sTemp = sTemp + oSelectedValues.options(j).text + ";" ;
}
if(oElem1) oElem1.value = sTemp ;
}
}
}
if(bNeedSecondaryFilter)
{
alert("Your search will result in too large of a data set. Please add an additional filter and then search again.");
}
else 
{
var oMode = document.getElementById("hidDisplayMode") ;
if (sDisplayMode == '')
oMode.value = "1" ;
else
oMode.value = sDisplayMode;
document.frmMain.submit() ;	
}
}
function ShowSentContacts()
{
var oMode = document.getElementById("hidDisplayMode") ;
oMode.value = "2" ;
document.frmMain.submit() ;
}
function sortColumns(sColName)
{
var frm = document.frmMain;
frm.action = "prospectus_contacts_send.asp" ;
if (frm.hidSortColumn.value != sColName)
{
frm.hidSortColumn.value = sColName;
frm.hidSortOrder.value = 'ascending';	
}
else
{
if (frm.hidSortOrder.value == 'ascending')
{
frm.hidSortOrder.value = 'descending';
}
else{
frm.hidSortOrder.value = 'ascending';
} 
}
SearchContacts(frm.hidDisplayMode.value);
}
function chkSelectAllClicked()
{
var oChkSelectAll ;
oChkSelectAll = document.getElementById("chkSelectAll") ;
if(oChkSelectAll)
{
var bChecked = oChkSelectAll.checked ;
var arrCheck = document.getElementsByName("chkSelect");
if(arrCheck)
{
for(var i = 0; i < arrCheck.length; i++)
{
arrCheck[i].checked = bChecked;
}
}
}
}
function ShowProspectusHistory()
{
openGeneralPopup('prospectus_contacts_send_hist.asp', '', 'width=700,height=500,resizable,toolbar=no,scrollbars,menubar=no');	
}
function SendProspectus()
{
var j = 0 ;
for(j = 1 ; j <= 12 ; j++)
{
var oFilterBy, sFilterBy ;
sFilterBy = "selFilterBy" + j ;
oFilterBy = document.getElementById(sFilterBy) ;
if(oFilterBy)
{
if(oFilterBy.value == "SECTOR")
{
var oSelectedValues = document.getElementById("selSearchValues" + j) ;
var oHidSelectedValues = document.getElementById("hidSelectedSectors") ;
var sSelectedValues = "" ;
if(oSelectedValues)
{
for(var k =0; k < oSelectedValues.options.length; k++)
{
sSelectedValues = sSelectedValues + oSelectedValues.options(k).text + ";" ;
}
if(oHidSelectedValues) oHidSelectedValues.value = sSelectedValues ;
}
break;
}
}
}
var nCount = 0 ;
var oElem1 = document.getElementById("hidProspectusEmailAddr");
var oElem2 = document.getElementById("hidProspectusContactId");
var oElem3 = document.getElementById("hidInstInvestorId");
oElem1.value = oElem2.value = oElem3.value = "";
var arrCheck = document.getElementsByName("chkSelect");
if(arrCheck)
{
for(var i = 0; i < arrCheck.length; i++)
{
if(arrCheck[i].checked == true)
{
nCount = nCount + 1 ;
var sEmail = arrCheck[i].email;
var sInstContactId = arrCheck[i].inst_contact_id; 
var sInstInvId = arrCheck[i].inst_inv_id;
if(oElem1) oElem1.value = oElem1.value + sEmail + ";" ;
if(oElem2) oElem2.value = oElem2.value + sInstContactId + ";" ;
if(oElem3) oElem3.value = oElem3.value + sInstInvId + ";" ; 
}
}
}
if(nCount == 0)
{
alert("Please select a contact.") ;
return ;
}
if (!confirm("Are you sure you want to send prospectus?"))
{
return;
}
document.frmMain.btnSendProspectus.disabled=true;
document.frmMain.action = "util_submit_action.asp" ;
document.frmMain.submit() ;
}
function OnSavedListChange()
{
var frm = document.frmMain;
var sSelVal = frm.selSavedList.options(frm.selSavedList.selectedIndex).value;
if (sSelVal != "-1")
{
frm.hidSelProspectusContactListId.value = sSelVal;
frm.hidDisplayMode.value = "4";
frm.submit();
}
}
function OnSaveContactList()
{
var frm = document.frmMain;
var sSelVal = frm.selSavedList.options(frm.selSavedList.selectedIndex).value;
if (sSelVal != "-1")
{
if(frm.chkAllowSalesOptOut != null)
{
if (frm.chkAllowSalesOptOut.checked && !ValidateAndSetDate())
return;
}
var arrCheck = document.getElementsByName("chkSelect");
if(arrCheck)
{
var sEmailList = "";
var sInstContactId = "";
var sInstInvId = "";
var sCheckList = "";
for(var i = 0; i < arrCheck.length; i++)
{
sEmailList += (arrCheck[i].inst_prosp_list_email_id + "|");
sInstContactId += (arrCheck[i].inst_contact_id + "|"); 
sInstInvId += (arrCheck[i].inst_inv_id + "|");
sCheckList += (arrCheck[i].checked ? "0" : "1");
}
frm.hidEmailList.value = sEmailList;
frm.hidProspectusContactId.value = sInstContactId;
frm.hidInstInvestorId.value = sInstInvId; 
frm.hidCheckList.value = sCheckList;
var sPageAction = frm.action;
var sAction = frm.hidAction.value;
frm.hidAction.value = "UpdateProspectusContactList";
frm.action = "util_submit_action.asp" ;
frm.submit();
frm.action = sPageAction;
frm.hidAction.value = sAction;
}
}
else
OnSaveAsContactList();
}
function OnSaveAsContactList()
{
var frm = document.frmMain;
if(frm.chkAllowSalesOptOut != null)
{
if (frm.chkAllowSalesOptOut.checked && !ValidateAndSetDate())
return;
}
var j = 0 ;
var iFilterNum = 0;
var sSearchXml = "<searchxml>";
for(j = 1 ; j <= 12 ; j++)
{
var oFilterBy, sFilterBy ;
sFilterBy = "selFilterBy" + j ;
oFilterBy = document.getElementById(sFilterBy) ;
var oFilterCond;
oFilterCond = document.getElementById("selCondition" + j); 
if(oFilterBy && oFilterBy.value != "NONE")
{
iFilterNum = iFilterNum + 1;
sSearchXml = sSearchXml + "<filter>";
sSearchXml = sSearchXml + "<filter_num>" + iFilterNum + "</filter_num>";
sSearchXml = sSearchXml + "<filter_by>" + oFilterBy.value + "</filter_by>";
sSearchXml = sSearchXml + "<filter_cond>" + oFilterCond.value + "</filter_cond>";
var oSelectedValues = document.getElementById("selSearchValues" + j) ;
var sSelectedValues = "" ;
if(oSelectedValues)
{
for(var k =0; k < oSelectedValues.options.length; k++)
{
sSearchXml = sSearchXml + "<filter_value>" + XMLEncode(oSelectedValues.options(k).text, false) + "</filter_value>";
}
}
sSearchXml = sSearchXml + "</filter>";
}
}
sSearchXml = sSearchXml + "</searchxml>";
frm.hidSearchXml.value = sSearchXml;
var arrCheck = document.getElementsByName("chkSelect");
if(arrCheck)
{
var sEmailList = "";
var sInstContactId = "";
var sInstInvId = "";
var sCheckList = "";
for(var i = 0; i < arrCheck.length; i++)
{
sEmailList += (arrCheck[i].email + "|");
sInstContactId += (arrCheck[i].inst_contact_id + "|"); 
sInstInvId += (arrCheck[i].inst_inv_id + "|");
sCheckList += (arrCheck[i].checked ? "0" : "1");
}
frm.hidEmailList.value = sEmailList;
frm.hidProspectusContactId.value = sInstContactId;
frm.hidInstInvestorId.value = sInstInvId;
frm.hidCheckList.value = sCheckList;
var sTarget = frm.target;
var sPageAction = frm.action;
var win = window.open('blank.asp', 'save_contact_list','height=200,width=400');
if (win)
{
frm.method = "POST";
frm.action = "prospectus_contact_list_save_popup.asp";
frm.target = "save_contact_list";
frm.submit();
frm.action = sPageAction;
frm.target = sTarget;
}
}	
}
function ValidateAndSetDate()
{
var frm = document.frmMain;
if(frm.dtOptOutExpiration != null)
{
var iHr = frm.iHr.value;
var iMin = frm.iMin.value;
var sExpireDate = frm.dtOptOutExpiration.value;
if (sExpireDate.length == 0)
{
alert("Please enter list expiry date");
return false;
}
if (iHr > 12 || iHr == 0)
{
alert("Hours can only be specified between 1 and 12");
return false;
}
if (iMin >= 60)
{
alert("Minutes can only be specified between 0 and 59");
return false;
}
if (iHr.length == 0)
iHr = "00";
if (iMin.length == 0)
iMin = "00";
var sAMPM = frm.selAMPM.options(frm.selAMPM.selectedIndex).value;
sExpireDate = sExpireDate + " ";
sExpireDate = sExpireDate + iHr;
sExpireDate = sExpireDate + ":" + iMin + ":00 " + sAMPM; 
var oDate = new Date(sExpireDate);
sExpireDate = oDate.getUTCFullYear() + "-" + (oDate.getUTCMonth() + 1) + "-" + oDate.getUTCDate() + " " + oDate.getUTCHours() + ":" + oDate.getUTCMinutes() + ":00";
frm.hidOptOutExpireDate.value = sExpireDate;
return true;
} else {
return false;
}
}
function ShowUncheckMsg()
{
var frm = document.frmMain;
var bCheck = frm.chkAllowSalesOptOut.checked;
if (!bCheck)
alert("By unchecking the 'Allow Sales to Opt Out' checkbox, the Opt Out functionality will not be used. Therefore, sales will not be able to deselect contacts from receiving ECM blast emails.");
}
function excelExport(sDisplayMode)
{
var frm = document.frmMain;
frm.hidExcelExport.value = sDisplayMode;
for(i = 1 ; i <= 12; i++)
{
var oSelectedValues = document.getElementById("selSearchValues" + i) ;
var oElem = document.getElementById("hidSearchValues" + i) ;
if(oSelectedValues)
{
var sTemp = "" ;
for(var j=0; j < oSelectedValues.options.length; j++)
{
sTemp = sTemp + oSelectedValues.options(j).text + ";" ;
}
if(oElem) oElem.value = sTemp ;
}
}
var oMode = document.getElementById("hidDisplayMode") ;
oMode.value = "1" ;	
frmMain.submit() ;
frm.hidExcelExport.value="";
}
function XMLEncode(sText, fromXml)
{
if(sText==null) return null;
var sReplaceStringsEntityRef=new Array();
sReplaceStringsEntityRef[0]="&amp;";
sReplaceStringsEntityRef[1]="&gt;";
sReplaceStringsEntityRef[2]="&lt;";
sReplaceStringsEntityRef[3]="&quot;";	
sReplaceStringsEntityRef[4]="&apos;";
var sReplaceStringsEntity=new Array();
sReplaceStringsEntity[0]="&";
sReplaceStringsEntity[1]=">";
sReplaceStringsEntity[2]="<";
sReplaceStringsEntity[3]="\\\"";
sReplaceStringsEntity[4]="\\\'";
var sRet=sText;
for(var i=0;i<sReplaceStringsEntityRef.length;i++)
{
if(fromXml)
{
var re = new RegExp(sReplaceStringsEntityRef[i], "g");
sRet=sRet.replace(re, sReplaceStringsEntity[i]);
}
else
{
var re = new RegExp(sReplaceStringsEntity[i], "g");
sRet=sRet.replace(re, sReplaceStringsEntityRef[i]);
}
}	
return sRet;
}
