<!-- 
function onPageLoad()
{
menuShow('issuemaint_dealdetails_eq', 'show');
initializeDate(document.frmMain, "Effectiveness", document.frmMain.hidOffset.value); 
initializeDate(document.frmMain, "Termination", document.frmMain.hidOffset.value); 
initializeDate(document.frmMain, "Stabilization", document.frmMain.hidOffset.value); 
PopulateTransferAgents(-1); 
CalTXDays();
}
function CalTXDays()
{
var	T_X = 0;
var	divTXDaysCont = document.getElementById("divTXDays");
var	dtTxtOfferDateCont = document.getElementById("dtTxtOfferDate");
var	dtTxtSettlementDateCont	= document.getElementById("dtTxtSettlementDate")
if(dtTxtOfferDateCont.value != "" && dtTxtSettlementDateCont.value != "")
{
if(IsValidDate(dtTxtOfferDateCont.value, UserSettings.dateMask, dtTxtOfferDateCont) && IsValidDate(dtTxtSettlementDateCont.value, UserSettings.dateMask, dtTxtSettlementDateCont) )
{
var dtTxtOfferDateUSStandard = FormatDate(dtTxtOfferDateCont.value, UserSettings.dateMask, "MM-DD-YYYY");
var dtTxtSettlementDateUSStandard = FormatDate(dtTxtSettlementDateCont.value, UserSettings.dateMask, "MM-DD-YYYY"); 
var dtTxtOfferDate = new Date(dtTxtOfferDateUSStandard);
var dtTxtSettlementDate = new Date(dtTxtSettlementDateUSStandard);
while (dtTxtOfferDate < dtTxtSettlementDate)
{
if(dtTxtOfferDate.getDay() != 5 && dtTxtOfferDate.getDay() != 6)
T_X = T_X + 1;
dtTxtOfferDate.setDate(dtTxtOfferDate.getDate()+1);
}
divTXDaysCont.innerHTML	= T_X + " days";
} else {
divTXDaysCont.innerHTML = "0 days";
}
} else {
divTXDaysCont.innerHTML = "0 days";
}
divTXDaysCont.innerHTML += " (not including weekends)";
}
function CheckConditionallyRequiredFields( frm, arrFieldsInError )
{
var arrMoreErrors = new Array();
var count = 0;
var transTaxRate = new Number(frm.curTransTaxRate.value.replace(/(\,)/g, ""));
if (transTaxRate >= 100000){
var arrError = FieldErrorInfo("curTransTaxRate", 'This Transfer Tax Rate can not have more than 5 whole numbers.', "", "curTransTaxRate", "Transfer Tax Rate");
arrMoreErrors[count] = arrError;	
count++;
}
var sTransTaxRate = frm.curTransTaxRate.value;
var lTaxRateLength = sTransTaxRate.length;
var lDecPtPlace = sTransTaxRate.indexOf(".");
if(lDecPtPlace > 0){
if((lTaxRateLength - lDecPtPlace) > 3){
var arrError = FieldErrorInfo("curTransTaxRate", 'This Transfer Tax Rate can not have more than 2 decimal places.', "", "curTransTaxRate", "Transfer Tax Rate");
arrMoreErrors[count] = arrError;	
count++;
}
} 
var InternalComments = frm.sComments.value.length;
var InternalCommentsMaxLength = 300;
if ( InternalComments > InternalCommentsMaxLength ) {
var arrError = FieldErrorInfo("sComments", 'The Comments exceeds the maximum length allowed', "", "sComments", "Comments");
arrMoreErrors[arrMoreErrors.length] = arrError;
count++;
}	
return (arrMoreErrors);
} 
function CustomValidation( frm, arrFieldsInError )
{
var arrMoreErrors = new Array();	
return (arrMoreErrors);
} 
function submitPage( frm , action, brokerID )
{
switch (action)
{	
case "update" :
if(ValidateForm( frm ))
{
if(frm("txtDefAcctNum") != null)
{
var nLen = frm.hidDefAcctLen.value;
var strAcctNum = frm.txtDefAcctNum.value;
if(strAcctNum.length > nLen)
alert("Default account number should not exceed " + nLen + "characters");
}
if (frm.hidIPO.value == "True" && frm("IIssueHotCold") != null)
{
frm.hidHotIssue.value = frm.IIssueHotCold.value; 
}
frm.hidMultiAgents.value = fCollectSelectVals(g_TA); 
frm.action = "/asp/util_submit_action.asp";
frm.hidAction.value = "Update";
frm.submit();
}
break;
case "reverttosaved" :
window.location.reload();
break;
case "cancel" :
frm.action = "/asp/specialIssueMaint_DealDetails.asp";
frm.submit();
break;
}
}
function initializeDate(frm, strDateType, strOffset)
{
if (strDateType == "Effectiveness")
{
var strDate = document.frmMain.hidEffectiveDate.value;
if (strDate.length > 0)
{
if (document.frmMain.hidRawEffectiveDate.value.substring(10,21) == "T00:00:00")
return;
var pos = strDate.indexOf(":");
var strHr = strDate.substring(0, pos);
var strMin = strDate.substring(pos + 1, pos + 3);
frm.iHr_Effective.value = strHr;
frm.iMin_Effective.value = strMin;
if(strDate.indexOf("PM") > 0)
{
frm.radAMPM_Effective[1].checked = true;
}
else
{
frm.radAMPM_Effective[0].checked = true; 
}
}
} else if (strDateType == "Termination")
{
var strDate = document.frmMain.hidTermDate.value;
if (strDate.length > 0)
{
if (document.frmMain.hidRawTermDate.value.substring(10,21) == "T00:00:00")
return;
var pos = strDate.indexOf(":");
var strHr = strDate.substring(0, pos);
var strMin = strDate.substring(pos + 1, pos + 3);
frm.iHr_Termination.value = strHr;
frm.iMin_Termination.value = strMin;
if(strDate.indexOf("PM") > 0)
{
frm.radAMPM_Termination[1].checked = true;
}
else
{
frm.radAMPM_Termination[0].checked = true; 
}
}
} else if (strDateType == "Stabilization")
{
var strDate = document.frmMain.hidStabilizationDate.value;
if (strDate.length > 0)
{
if (document.frmMain.hidRawStabilizationDate.value.substring(10,21) == "T00:00:00")
return;
var pos = strDate.indexOf(":");
var strHr = strDate.substring(0, pos);
var strMin = strDate.substring(pos + 1, pos + 3);
frm.iHr_Stabilization.value = strHr;
frm.iMin_Stabilization.value = strMin;
if(strDate.indexOf("PM") > 0)
{
frm.radAMPM_Stabilization[1].checked = true;
}
else
{
frm.radAMPM_Stabilization[0].checked = true; 
}
}
}
}
function editTransferAgent()
{
var sUrl = "IssueMaint_editTransferAgent_popup.asp?PageId=" + frmMain.hidPageID.value;
var sStyle = "width=700,height=155%,scrollbars=1,resizable=1";
openGeneralPopup( sUrl, '', sStyle );	
}
function editTransferAgentContact()
{	
var sUrl = "IssueMaint_editTransferAgentContact_popup.asp?TAID=" + frmMain.ITransferAgentID.value + "&" + "PageId=" + frmMain.hidPageID.value;
var sStyle = "width=700,height=155%,scrollbars=1,resizable=1";	
openGeneralPopup( sUrl, '', sStyle );	
}
function RefreshAgentList(sAgentList)
{
var sAgents,oOption,oOption1,i,ihidCount,sText,sAgentChk,sList,shidTAValue,shidTAOldVal,flgHidTA=0,iAgCount;
frmMain.hidAgentString.value ="";
frmMain.ITransferAgentID.length = 0;	
iAgCount = g_TA.length;
if(sAgentList.length > 0)
{
///////////////////////////////////////////////
var arrHidTemp = new Array();
for (i = 0; i < g_TA.length; i++)
{
arrHidTemp[i] = new Object();
arrHidTemp[i].transfer_agent_id = g_TA[i].transfer_agent_id;
arrHidTemp[i].name = g_TA[i].name;
arrHidTemp[i].transfer_agent_contact_id = g_TA[i].transfer_agent_contact_id
arrHidTemp[i].first_nm = g_TA[i].first_nm;
arrHidTemp[i].last_nm = g_TA[i].last_nm;
arrHidTemp[i].phone_no = g_TA[i].phone_no;
arrHidTemp[i].fax_no = g_TA[i].fax_no;
arrHidTemp[i].email_addr = g_TA[i].email_addr; 
}
g_TA = null;
iAgCount = 0;
g_TA = new Array();
//////////////////////////////////////////////
sAgents = sAgentList.split("|"); 
for(i=0;i < sAgents.length;i++)
{
if(sAgents[i].length > 0)
{
flgHidTA = 0; 
sList = sAgents[i].split("_"); 
for(ihidCount =0;ihidCount < arrHidTemp.length; ihidCount++)
{
if(arrHidTemp[ihidCount].transfer_agent_id)
{
if(arrHidTemp[ihidCount].transfer_agent_id == sList[0])
{
flgHidTA = 1;
break; 
}
}
} 
if(flgHidTA == 0)
{ 
var index = g_TA.length;
g_TA[index] = new Object();
g_TA[index].transfer_agent_id = sList[0];
g_TA[index].name = sList[1];
g_TA[index].transfer_agent_contact_id = "";
g_TA[index].first_nm = "";
g_TA[index].last_nm = "";
g_TA[index].phone_no = "";
g_TA[index].fax_no = "";
g_TA[index].email_addr = ""; 
iAgCount = g_TA.length; 
}
else
{ 
for(ihidCount =0;ihidCount < arrHidTemp.length; ihidCount++)
{
if(sList[0] == arrHidTemp[ihidCount].transfer_agent_id)
{ 
var index = g_TA.length;
g_TA[index] = new Object();
g_TA[index].transfer_agent_id = arrHidTemp[ihidCount].transfer_agent_id;
g_TA[index].name = arrHidTemp[ihidCount].name;
g_TA[index].transfer_agent_contact_id = arrHidTemp[ihidCount].transfer_agent_contact_id;
g_TA[index].first_nm = arrHidTemp[ihidCount].first_nm;
g_TA[index].last_nm = arrHidTemp[ihidCount].last_nm;
g_TA[index].phone_no = arrHidTemp[ihidCount].phone_no;
g_TA[index].fax_no = arrHidTemp[ihidCount].fax_no;
g_TA[index].email_addr = arrHidTemp[ihidCount].email_addr; 
iAgCount = g_TA.length; 
}
} 
} 
frmMain.hidAgentString.value = frmMain.hidAgentString.value + "|" + sList[0]; 
} 
}
sList = frmMain.hidAgentString.value.split("|");	
iAgCount = g_TA.length; 
for(ih =0;ih < iAgCount; ih++)
{ 
for(ihidCount =0;ihidCount < iAgCount; ihidCount++)
{ 
flgHidTA = 0;
for(i=0;i < sList.length; i++)
{
if(g_TA[ihidCount].transfer_agent_id == sList[i]){flgHidTA = 1;}
} 
}
} 
frmMain.ITransferAgentID.selectedIndex = 0; 
PopulateTransferAgents(-1);
}	
else
{
frmMain.ITransferAgentID.length = 0;
frmMain.selTransferAgentCt.length = 0;
frmMain.sPhoneNumber.value = ""; 
}	
}
function RefreshAgentContacts(vAgentContactList,sCurrAgentID,currIndex)
{	
var sContactList,sContact,oOption,sAgentText,ihidCount;
var sAgentVal,sFinal,iCount,flgHidTA=0,shidList,ihidFind,iOldCount=0,flgUpdate=0;
var lAgCount = g_TA.length;
for(ihidCount =0;ihidCount < lAgCount; ihidCount++)
{
if(g_TA[ihidCount].transfer_agent_id == sCurrAgentID)
{
g_TA[ihidCount].transfer_agent_contact_id = "";
g_TA[ihidCount].first_nm = "";
g_TA[ihidCount].last_nm = "";
g_TA[ihidCount].phone_no = "";
g_TA[ihidCount].fax_no = "";
g_TA[ihidCount].email_addr = ""; 
} 
}
if(vAgentContactList.length > 0)
{
///////////////////////////////////////////////
for(iCount = 0;iCount < vAgentContactList.length; iCount++)
{ 
flgUpdate =0;
for(ihidCount =0;ihidCount < g_TA.length; ihidCount++)
{
if(sCurrAgentID == g_TA[ihidCount].transfer_agent_id && g_TA[ihidCount].transfer_agent_contact_id == "")
{ 
g_TA[ihidCount].transfer_agent_contact_id = vAgentContactList[iCount].transfer_agent_contact_id;
g_TA[ihidCount].first_nm = vAgentContactList[iCount].first_nm;
g_TA[ihidCount].last_nm = vAgentContactList[iCount].last_nm;
g_TA[ihidCount].phone_no = vAgentContactList[iCount].phone_no;
g_TA[ihidCount].fax_no = vAgentContactList[iCount].fax_no;
g_TA[ihidCount].email_addr = vAgentContactList[iCount].email_addr;
flgUpdate = 1; 
break;
} 
}	
if(flgUpdate == 0 )
{
for(iVisAgID = 0;iVisAgID < g_TA.length;iVisAgID++)
{
if(sCurrAgentID == g_TA[iVisAgID].transfer_agent_id)
{
var index = g_TA.length;
g_TA[index] = new Object();
g_TA[index].transfer_agent_id = sCurrAgentID;
g_TA[index].name = g_TA[iVisAgID].name;
g_TA[index].transfer_agent_contact_id = vAgentContactList[iCount].transfer_agent_contact_id;
g_TA[index].first_nm = vAgentContactList[iCount].first_nm;
g_TA[index].last_nm = vAgentContactList[iCount].last_nm;
g_TA[index].phone_no = vAgentContactList[iCount].phone_no;
g_TA[index].fax_no = vAgentContactList[iCount].fax_no;
g_TA[index].email_addr = vAgentContactList[iCount].email_addr;
break;
} 
} 
}	
} 
}
PopulateTransferAgents(currIndex);	
}
function fShowPhoneNumber()
{
var selVal,sPhno
frmMain.sPhoneNumber.value = "";
frmMain.sFaxNumber.value = "";
frmMain.sEmailAddr.value = "";
selVal = frmMain.selTransferAgentCt.value.split("~");	
if (!selVal[0])
{
frmMain.selTransferAgentCt.selectedIndex = 0;
selVal = frmMain.selTransferAgentCt.value.split("~");	
}
if (selVal[0])
{	
if(g_TA[selVal[0]].phone_no)
{
frmMain.sPhoneNumber.value = g_TA[selVal[0]].phone_no;
}
if(g_TA[selVal[0]].fax_no)
{
frmMain.sFaxNumber.value = g_TA[selVal[0]].fax_no;
}
if(g_TA[selVal[0]].email_addr)
{
frmMain.sEmailAddr.value = g_TA[selVal[0]].email_addr;
}
}
}
function PopulateTransferAgents(currIndex)
{
var iCount,sAgentList,op,sAgentID ="",sAgentChk,flgAgChk=0;	
frmMain.ITransferAgentID.length = 0;
iCount = g_TA.length;
if(iCount > 0 )
{
for(var i=0; i < iCount ;i++)
{
flgAgChk = 0;
sAgentChk = sAgentID.split("|"); 
if(sAgentChk)
{ 
for(var iChk =0; iChk < sAgentChk.length ; iChk ++)
{	
if(g_TA[i].transfer_agent_id == sAgentChk[iChk])
{ 
flgAgChk = 1;
} 
}
} 
if(flgAgChk == 0)
{ 
op = document.createElement("OPTION"); 
op.value = g_TA[i].transfer_agent_id;
op.text = g_TA[i].name;
frmMain.ITransferAgentID.options[frmMain.ITransferAgentID.length]=op; 
sAgentID = sAgentID + g_TA[i].transfer_agent_id + "|";	
}
}
if(currIndex >=0)
{
frmMain.ITransferAgentID.selectedIndex = currIndex; 
}
else
{
frmMain.ITransferAgentID.selectedIndex = 0; 
}
PopulateContactDetails();
}
}
function PopulateContactDetails()
{
var iCount,sAgentList,op,sAgentID =""; 
sAgentID = frmMain.ITransferAgentID.value;
iCount = g_TA.length;
var iCtIndex = frmMain.selTransferAgentCt.selectedIndex;
frmMain.selTransferAgentCt.length=0;	
if(iCount > 0 )
{
for(var i=0; i < iCount ;i++) 
{
if(g_TA[i].transfer_agent_id == sAgentID && g_TA[i].transfer_agent_contact_id)
{ 
op = document.createElement("OPTION"); 
op.value = i + "~" + g_TA[i].transfer_agent_contact_id;
op.text = g_TA[i].last_nm + "," + g_TA[i].first_nm; 
frmMain.selTransferAgentCt.options[frmMain.selTransferAgentCt.length]=op; 
} 
}
}
if (iCtIndex == -1)iCtIndex=0;
frmMain.selTransferAgentCt.selectedIndex = iCtIndex;	
fShowPhoneNumber(); 
}
function fUpdatePhoneNumber()
{
var sFinalStr,sAgentList,sAgentID,sContID;
var sPhoneNo = frmMain.sPhoneNumber.value; 
var sReg =/[|_,]+$/
if(sReg.test(sPhoneNo)) 
{	
alert("Phone Number contains invalid character");
frmMain.sPhoneNumber.focus();
return; 
} 
sAgentID = frmMain.ITransferAgentID.value; 
sContID = frmMain.selTransferAgentCt.value.split("~");;
for(var ihidCount=0;ihidCount < frmMain.hidITransferAgentID.length;ihidCount++)
{	
sAgentList = frmMain.hidITransferAgentID[ihidCount].value.split("~");
if(sAgentList[0] == sAgentID && sAgentList[2] == sContID[0])
{ 
frmMain.hidITransferAgentID[ihidCount].value = sAgentList[0] + "~" + sAgentList[1] + "_" + sAgentList[2] + "_" + sAgentList[3] + "_" + sPhoneNo;	
}
}	
PopulateContactDetails(); 
}
function fCollectSelectVals(oSourceListOptions)
{
var oSourceOptions,sRemCom, sList, z;
sList="<transfer_agents>";	
for(z=0; z<oSourceListOptions.length; z++)
{
if (oSourceListOptions[z].transfer_agent_id != "")
{
sList += "<transfer_agent>";
sList += "<transfer_agent_id>" + oSourceListOptions[z].transfer_agent_id + "</transfer_agent_id>";
sList += "<name>" + EscapeXMLChar(oSourceListOptions[z].name) + "</name>";
if (oSourceListOptions[z].transfer_agent_contact_id != "")
{
sList += "<transfer_agent_contact_id>" + oSourceListOptions[z].transfer_agent_contact_id + "</transfer_agent_contact_id>";
sList += "<last_nm>" + EscapeXMLChar(oSourceListOptions[z].last_nm) + "</last_nm>";
sList += "<first_nm>" + EscapeXMLChar(oSourceListOptions[z].first_nm) + "</first_nm>";
sList += "<phone_no>" + EscapeXMLChar(oSourceListOptions[z].phone_no) + "</phone_no>";
}
sList += "</transfer_agent>";
} 
}
sList += "</transfer_agents>";
return sList;
}
function DisplayBlueSkyDlg()
{
var sUrl = "blue_sky_popup.asp?IssID=" + frmMain.hidIssueID.value;
var sStyle = "width=600,height=630,scrollbars=1,resizable=1";
openGeneralPopup( sUrl, '', sStyle );	
}
function OnChange(obj)
{
obj.value = formatAmountString(obj.value);
}
function EscapeXMLChar(str)
{
var regex;
regex = /&/g;
str = str.replace(regex, "&amp;");
regex = />/g;
str = str.replace(regex, "&gt;");
regex = /</g;
str = str.replace(regex, "&lt;");
regex = /"/g;	
str = str.replace(regex, "&quot;");
regex = /'/g;
str = str.replace(regex, "&apos;");
return(str);
}
function UnEscapeXMLChar(str)
{
var regex;
regex = /&amp;/g;
str = str.replace(regex, "&");
regex = /&gt;/g;
str = str.replace(regex, ">");
regex = /&lt;/g;
str = str.replace(regex, "<");
regex = /&quot;/g;	
regex = /&apos;/g;
str = str.replace(regex, "'");
return(str);
}
function showRetailAccountInfo()
{
var sURL;
var sIssID ;
sIssID = document.frmMain.hidIssueID.value ;
var sUrl = "/aspx/UI/Retail/RetailAccountInfo.aspx?iss_id=";
sUrl = sUrl + sIssID;
var sStyle = "width=670,height=450,scrollbars=1,resizable=1,left=5,top=5";
var popupGeneral = window.open( sUrl, '', sStyle);
popupGeneral.focus();
}
