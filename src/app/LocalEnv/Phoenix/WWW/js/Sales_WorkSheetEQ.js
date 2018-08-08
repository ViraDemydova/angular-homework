RSEnableRemoteScripting("/_ScriptLibrary")
function gathercbValue(frm, sParse)
{
var sList;
sList="";
var lLength = frm.hidOrderCount.value;
for (var i=1; i<=lLength; i++)
{
var sItem = sParse + i.toString();
if(frm.elements[sItem]){ 
if (frm.elements[sItem].checked == true){
var sOrdId = frm.elements[sItem].value;
if(sList=="")
sList += sOrdId; 
else
sList += "," + sOrdId; 
}
} 
} 
return sList;
}
function onPageLoad()
{
document.frmMain.oldConfirmed.value = gathercbValue(document.frmMain, 'chkAffirm');
document.frmMain.oldApproved.value = gathercbValue(document.frmMain, 'chkApprove');
ConfirmRemoteScripting();
CalcTotals();
SetAsOfDate();
}
function ConfirmRemoteScripting()
{
var enabled = false;
enabled = RSExecute('rs_sales_worksheeteq.asp', 'js_RemoteScriptingEnabled').return_value;
if (! enabled)
{
alert("Remote scripting not enabled");
}
}
function CheckConditionallyRequiredFields( frm, arrFieldsInError )
{
var arrMoreErrors = new Array();
return (arrMoreErrors);
} 
function CustomValidation( frm, arrFieldsInError )
{
} 
function changeTrancheAcctExec(frm)
{
SaveLeftNavMenuSetting();
frm.submit();	
}
function spEditIOI(pndg_ord_id, inst_inv_id, rgn_id, ord_id, feedback_ind)
{
SaveLeftNavMenuSetting();
openGeneralPopup('bookbuild_fastindicationeq.asp?pndg_ord=' + pndg_ord_id + '&trn_id=' + getTrnId() + '&inst_inv=' + inst_inv_id + '&rgn_id=' + rgn_id + '&ord_id=' + ord_id, '', 'width=950,height=' + (feedback_ind == 'True' ? '620' : '600') + ',resizable,toolbar=no,scrollbars,menubar=no');
}
function spIOIHistory(pndg_ord_id, inst_inv_id, rgn_id, ord_id)
{
SaveLeftNavMenuSetting();
openGeneralPopup('bookbuild_indication_history_popup.asp?pndg_ord=' + pndg_ord_id + '&trn_id=' + getTrnId() + '&inst_inv=' + inst_inv_id + '&rgn_id=' + rgn_id + '&ord_id=' + ord_id + '&edit_ind=' + 'False', '', 'width=700,height=300,resizable,toolbar=no,scrollbars,menubar=no');
}
function spAddIOI(inst_inv_id, rgn_id)
{
SaveLeftNavMenuSetting();
if (document.frmMain.selTranch.selectedIndex > -1)
openGeneralPopup('bookbuild_fastindicationeq.asp?inst_inv=' + inst_inv_id + '&trn_id=' + getTrnId() + '&rgn_id=' + rgn_id, '', 'width=950,height=600,resizable,toolbar=no,scrollbars,menubar=no');
else
alert("You can't perform this action at this time because your company is not on the underwriting list. Contact the syndicate desk.");
} 
function spMPEditIOI(pndg_ord_id, inst_inv_id, rgn_id, ord_id)
{
SaveLeftNavMenuSetting();
openGeneralPopup('MultiproductSalesIndicationEQ.asp?pndg_ord=' + pndg_ord_id + '&trn_id=' + getTrnId() + '&inst_inv=' + inst_inv_id + '&rgn_id=' + rgn_id + '&ord_id=' + ord_id, '', 'width=950,height=600,resizable,toolbar=no,scrollbars,menubar=no');
}
function spInvHistory(inst_inv_id)
{
SaveLeftNavMenuSetting();
var dtFromDate = getFromDate(document.frmMain);
var dtCurrDate = getCurrentDate(document.frmMain);
openGeneralPopup('InvestorHistory_SearchResults.asp?InvId=' + inst_inv_id + '&FromDate=' + escape(dtFromDate) + '&CurrDate=' + escape(dtCurrDate) + '&ReturnPage=Worksheet', '', 'width=1000,height=500,resizable,toolbar=no,scrollbars,menubar=no');	
}
function spProspectusOptOut(inst_inv_id)
{
SaveLeftNavMenuSetting();
openGeneralPopup('investor_prospectus_optout_popup.asp?InvId=' + inst_inv_id, '', 'width=1000,height=500,resizable,toolbar=no,scrollbars,menubar=no');	
}
function spInvProspectusTracking(inst_inv_id)
{
SaveLeftNavMenuSetting();
openGeneralPopup('InvestorProspectusTrackingSW.asp?InvId=' + inst_inv_id + '&ReturnPage=Worksheet', '', 'width=1000,height=500,resizable,toolbar=no,scrollbars,menubar=no');	
}
function spTradeSplitHistory(ord_id)
{
SaveLeftNavMenuSetting();
var dtFromDate = getFromDate(document.frmMain);
var dtCurrDate = getCurrentDate(document.frmMain);
openGeneralPopup('/aspx/UI/TradeSplit/TradeSplitHistory.aspx?OrdId=' + ord_id + '&ReturnPage=Worksheet', '', 'width=800,height=500,resizable,toolbar=no,scrollbars,menubar=no');	
}
function spDesignation(ord_id, enableAddDesignation)
{
SaveLeftNavMenuSetting();
openGeneralPopup('designations_edit_sales.asp?TrancheId=' + getTrnId() + '&OrdId=' + ord_id + '&enableAddDesignation=' + enableAddDesignation + '&ReturnPage=Worksheet', '', 'width=750,height=500,resizable,toolbar=no,scrollbars,menubar=no'); 
}
function spFB(ord_id, rgn_id, inst_inv_id, bEdit, feedback_ind, sa_up_id, bRoadShow)
{
SaveLeftNavMenuSetting();
var sCaption = GetInstInvNameFromHref(inst_inv_id);
var sURL = "bookbuild_orderfeedback_popup.asp?PndgOrdId=" + ord_id + "&InvNm=" + sCaption + "&trn_id=" + getTrnId() + "&rgn_id=" + rgn_id + "&inst_inv_id=" + inst_inv_id + "&edit_ind=" + bEdit + "&sa_up_id=" + sa_up_id + "&Roadshow_ind=" + bRoadShow;
openGeneralPopup(sURL, '', 'width=750,height=' + (feedback_ind == 'True' ? '420' : '250') + ',resizable,toolbar=no,scrollbars,menubar=no'); 
}
function submitPageForDealSketch()
{
SaveLeftNavMenuSetting();
openGeneralPopup('issuemaint_dealsketch.asp?Popup=1', '', 'width=500,height=400,resizable,toolbar=no,scrollbars,menubar=no'); 
}
function submitPageForPricingSheet()
{
SaveLeftNavMenuSetting();
openGeneralPopup('issuemaint_pricingsheet.asp?p=0', '', 'width=700,height=500,resizable,toolbar=no,scrollbars,menubar=no'); 
}
function submitPageForLegend()
{
SaveLeftNavMenuSetting();
openGeneralPopup('sales_worksheeteq_legend_popup.asp', '', 'width=450,height=220,resizable,toolbar=no,scrollbars,menubar=no'); 
}
function spRsAdd(inst_inv_id, rgn_id)
{
SaveLeftNavMenuSetting();
openGeneralPopup('roadshow_1On1_add_popup.asp?inst_inv_id=' + inst_inv_id + '&rgn_id=' + rgn_id + '&inv_nm=' + GetInstInvNameFromHref(inst_inv_id), '', 'width=1000,height=300,resizable,toolbar=no,scrollbars,menubar=no'); 
}
function spRsView(inst_inv_id, rgn_id)
{
SaveLeftNavMenuSetting();
openGeneralPopup('roadshow_1On1_list_popup.asp?inst_inv_id=' + inst_inv_id + '&mode=pending' + '&rgn_id=' + rgn_id + '&inv_nm=' + GetInstInvNameFromHref(inst_inv_id), '', 'width=1000,height=300,resizable,toolbar=no,scrollbars,menubar=no'); 
}
function spRsConfirmed(inst_inv_id, event_id, dtRoadshowDttm, rs_iss_id)
{
SaveLeftNavMenuSetting();
window.location = 'roadshow_event.asp?EventId=' + event_id + "&RoadshowDttm=" +dtRoadshowDttm + "&RsIssId=" + rs_iss_id + "&inst_inv_id=" + inst_inv_id;
}
function spRsAddAttendee(inst_inv_id, rs_iss_id, ord_id)
{
SaveLeftNavMenuSetting();
var sURL = "Roadshow_AddAttendeeToEvent_Popup.asp?" + "RsIssId=" + rs_iss_id + "&inst_inv_id=" + inst_inv_id + "&ord_id=" + ord_id;
openGeneralPopup(sURL, '', 'width=560,height=650,resizable,toolbar=no,scrollbars,menubar=no');
}
function openTradeSplit(iss_id, ord_id, ae_nm, trn_id, sort_order, sort_column)
{
var sUrl = "/aspx/UI/TradeSplit/TradeSplit.aspx?IssId="+iss_id+"&OrdId="+ord_id+"&AeNm="+ae_nm+"&TrnId="+trd_id+"&SortOrder="+sort_order+"&sortColumn="+sort_column;
var sStyle = "width=900,height=600,toolbar=no,menubar=no,location=no,directories=no,resizable=yes,scrollbars=yes,left=100,top=50";
var popupGeneral = window.open( sUrl, 'idealTradeSplit', sStyle );
popupGeneral.focus();
}
function openPendingAccount(inv_id, ord_id)
{
var sUrl = "/aspx/UI/TradeSplit/PendingAccount.aspx?InvId="+inv_id+"&OrdId="+ord_id;
var sStyle = "width=500,height=300,toolbar=no,menubar=no,location=no,directories=no,resizable=yes,scrollbars=yes,left=50,top=50" ;
var popupGeneral = window.open( sUrl, 'idealPendingAccount', sStyle);
popupGeneral.focus();
}
function openTradeSplitError(ord_id)
{
var sUrl = "/aspx/UI/TradeSplit/ErrorStatus.aspx?OrdId="+ord_id;
var sStyle = "width=500,height=300,toolbar=no,menubar=no,location=no,directories=no,resizable=yes,scrollbars=yes,left=50,top=50" ;
var popupGeneral = window.open( sUrl, 'idealTradeSplitError', sStyle);
popupGeneral.focus();
}
function submitPageForConfirmAlloc()
{
SaveLeftNavMenuSetting();
var frm = document.frmMain;
frm.cbApproved.value = gathercbValue(frm, 'chkApprove');
frm.cbConfirmed.value = gathercbValue(frm, 'chkAffirm');
frm.action = "/asp/util_submit_action.asp";
frm.hidAction.value = "ConfirmAllocationsAndAutoDesignate";
frm.submit(); 
}
function submitColumnSort(strColumn)
{
SaveLeftNavMenuSetting();
var oCurrentSortColumn = document.frmMain.hidCurrentSortColumn;
var oCurrentSortOrder = document.frmMain.hidCurrentSortOrder;
if (strColumn == "comm_rank") 
{
strColumn = document.frmMain.hidSelectedRank.value;
}
if( strColumn != oCurrentSortColumn.value )
{
oCurrentSortColumn.value = strColumn;
oCurrentSortOrder.value = "ascending";
}
else if( oCurrentSortOrder.value == "ascending" )	
oCurrentSortOrder.value = "descending";	
else
oCurrentSortOrder.value = "ascending";
document.frmMain.action = document.frmMain.hidSalesWorksheetHref.value;
document.frmMain.submit()
}
function getCurrentDate(frm)
{
var now = new Date();
var day = now.getDate();
var month = now.getMonth()+ 1;
var retval;
if(month < 10 && day < 10){
retval = '0' + month + '/' + '0' + day + '/' + (now.getFullYear ? now.getFullYear() : now.getYear());
}
else if(month < 10 && day > 10){
retval = '0' + month + '/' + day + '/' + (now.getFullYear ? now.getFullYear() : now.getYear());
}
else if(month > 10 && day < 10){
retval = month + '/' + '0' + day + '/' + (now.getFullYear ? now.getFullYear() : now.getYear());
}
else{
retval = month + '/' + now.getDate() + '/' + (now.getFullYear ? now.getFullYear() : now.getYear());
}
return retval;	
}	
function getFromDate(frm)
{
var now = new Date();
var day = now.getDate();
var year = now.getFullYear();
var month = now.getMonth()+ 1;
month = 18 - month;
var retval;
if(month > 12){
month = month - 12;
year = year - 2;
}
else if(month == 12){
year = year - 2; 
}
else{
month = 12 - month;
year--;
} 
if (month == 2 && day > 28)
{
day = 28;
}
if(month < 10 && day < 10){
retval = '0' + month + '/' + '0' + day + '/' + year;
}
else if(month < 10 && day > 10){	
retval = '0' + month + '/' + day + '/' + year;
}
else if(month > 10 && day < 10){	
retval = month + '/' + '0' + day + '/' + year;
}
else
retval = month + '/' + now.getDate() + '/' + year;
return retval;
}
function CheckAllCB(frm, sParse, cbAll)
{
var sMode = (frm.elements[cbAll].checked) ? 1 : 0;
var lLength = frm.hidOrderCount.value;
for (var i=1; i<=lLength; i++)
{
var sItem = sParse + i.toString();
if(frm.elements[sItem] && frm.elements[sItem].disabled == false)
{ 
if (sMode == 0)
{
frm.elements[sItem].checked = false;
}
else
{
frm.elements[sItem].checked = true;
} 
} 
} 
}
function SaveLeftNavMenuSetting()
{
try {
var frm = document.frmMain;
rsObj = RSExecute ('rs_Sales_WorksheetEQ.asp', 'jsSetLeftNavMenuSetting', frm.hidHideMenu.value );
}
catch(e)
{
}
}
function GetInstInvNameFromHref(inst_inv_id)
{
if (document.all("ii" + inst_inv_id).length > 1)
{
return escape(document.all("ii" + inst_inv_id).item(0).innerText);
}
else
{
return escape(document.all("ii" + inst_inv_id).innerText);
}
}
function ToggleShowOnlyActiveAccounts()
{
SaveLeftNavMenuSetting();
var oShowOnlyActiveAccounts = document.frmMain.hidShowOnlyActiveAccounts;
if ( oShowOnlyActiveAccounts.value=="True" ) 
{
oShowOnlyActiveAccounts.value = "False";
}
else 
if ( oShowOnlyActiveAccounts.value=="False" ) 
{
oShowOnlyActiveAccounts.value = "True";
}
else
{
var oAEId = document.frmMain.hidAEId;
oShowOnlyActiveAccounts.value = (oAEId.value=="0") ? "False" : "True";
}
document.frmMain.action = document.frmMain.hidSalesWorksheetHref.value;
document.frmMain.submit();
}
function CalcTotals()
{
var oTotalInstInvestors = document.all("txtTotalInstInvestors");
var oTotalRoadshows = document.all("txtTotalRoadshows");
var oTotalIndications = document.all("txtTotalIndications");
var oTotalAllocations = document.all("txtTotalAllocations");
var oTotalRetAllocations= document.all("txtTotalRetAllocations");
var oTotalAffirms = document.all("txtTotalAffirms");
var oTotalFinalShares = document.all("txtTotalFinalShares");
var oInstInvestors = document.all("idInstInv");
var oRoadshows = document.all("idRS");
var oIndications = document.all("idIOI");
var oAllocations = document.all("idAllocation");
var oRetAllocations = document.all("idRetAllocation");
var oAffirms = document.all("idAffirm");
var oFinalShares = document.all("idFinalShares");
var sInstInvestors = "0";
var sRoadshows = "0";
var sIndications = "0";
var sAllocations = "0";
var sRetAllocations = "0";
var sAffirms = "0";
var sFinalShares = "0";
var iIndicationsAmt = 0;
var iAllocationsAmt = 0;
var iRetAllocationsAmt	= 0;
var iFinalSharesAmt = 0;
if ( oTotalInstInvestors)
{
if ( oInstInvestors )
sInstInvestors = oInstInvestors.length ? oInstInvestors.length : "1";
oTotalInstInvestors.innerHTML = sInstInvestors;
document.frmMain.hidTotalInstInvestors.value = sInstInvestors;
}
if ( oTotalRoadshows )
{
if ( oRoadshows )
sRoadshows = oRoadshows.length ? oRoadshows.length : "1";
oTotalRoadshows.innerHTML = sRoadshows;
document.frmMain.hidTotalRoadshows.value = sRoadshows;
}	
if ( oTotalIndications )
{
if ( oIndications )
{
if ( oIndications.length )
{	
sIndications = oIndications.length;
for ( var i=0; i<oIndications.length; i++ )
{
iIndicationsAmt += new Number(oIndications[i].getAttribute("qty"));
}
}
else
{
sIndications = "1";
iIndicationsAmt += new Number(oIndications.getAttribute("qty"));
}
document.frmMain.hidTotalIndications.value = sIndications;
document.frmMain.hidIndicationsAmt.value = iIndicationsAmt;
}
oTotalIndications.innerHTML = sIndications + "&nbsp;&nbsp;&nbsp;" + formatAmountString(""+iIndicationsAmt);
}
if ( oTotalAllocations )
{
if ( oAllocations )
{
if ( oAllocations.length )
{	
sAllocations = oAllocations.length;
for ( var i=0; i<oAllocations.length; i++ )
{
iAllocationsAmt += new Number(oAllocations[i].getAttribute("qty"));
}
}
else
{
sAllocations = "1";
iAllocationsAmt += new Number(oAllocations.getAttribute("qty"));
}
document.frmMain.hidTotalAllocations.value = sAllocations;
document.frmMain.hidAllocationsAmt.value = iAllocationsAmt;
}
oTotalAllocations.innerHTML = sAllocations + "&nbsp;&nbsp;&nbsp;" + formatAmountString(""+iAllocationsAmt);
}
if ( oTotalRetAllocations )
{
if ( oRetAllocations )
{
if ( oRetAllocations.length )
{	
sRetAllocations = oRetAllocations.length;
for ( var i=0; i<oRetAllocations.length; i++ )
{
iRetAllocationsAmt += new Number(oRetAllocations[i].getAttribute("qty"));
}
}
else
{
sRetAllocations = "1";
iRetAllocationsAmt += new Number(oRetAllocations.getAttribute("qty"));
}
document.frmMain.hidTotalRetAllocations.value = sRetAllocations;
document.frmMain.hidRetAllocationsAmt.value = iRetAllocationsAmt;
}
oTotalRetAllocations.innerHTML = sRetAllocations + "&nbsp;&nbsp;&nbsp;" + formatAmountString(""+iRetAllocationsAmt);
}
if ( oTotalAffirms ) 
{
if ( oAffirms )
sAffirms = oAffirms.length ? oAffirms.length : "1";
oTotalAffirms.innerHTML	= sAffirms + " / " + sAllocations;
}	
if ( oTotalFinalShares )
{
if ( oFinalShares )
{
if ( oFinalShares.length )
{	
sFinalShares = oFinalShares.length;
for ( var i=0; i<oFinalShares.length; i++ )
{
iFinalSharesAmt += new Number(oFinalShares[i].getAttribute("qty"));
}
}
else
{
sFinalShares = "1";
iFinalSharesAmt += new Number(oFinalShares.getAttribute("qty"));
}
document.frmMain.hidTotalFinalShares.value = sFinalShares;
document.frmMain.hidFinalSharesAmt.value = iFinalSharesAmt;
}
oTotalFinalShares.innerHTML = sFinalShares + "&nbsp;&nbsp;&nbsp;" + formatAmountString(""+iFinalSharesAmt);
}
}
function submitPageForExportExcel()
{
document.frmMain.action = document.frmMain.hidSalesWorksheetHref.value;
document.frmMain.hidExportExcel.value = "true";
document.frmMain.submit();
document.frmMain.hidExportExcel.value = "";
}
function submitPageForPrinterFriendly()
{
document.frmMain.action = document.frmMain.hidSalesWorksheetHref.value;
document.frmMain.hidPrinterFriendly.value = "true";
document.frmMain.submit();
document.frmMain.hidPrinterFriendly.value = "";
}
function submitPageForColumnOrder()
{
SaveLeftNavMenuSetting();
document.frmMain.hidCurrentSortOrder.value = "";
document.frmMain.hidCurrentSortColumn.value = "";
openGeneralPopup('sales_worksheet_columnlayout.asp?availcols=' + document.frmMain.hidAvailCols.value, '', 'width=800,height=600,resizable,toolbar=no,scrollbars,menubar=no'); 
}
var nm = 0;
function findInPage() 
{
var str = document.frmMain.stxtFind.value;
if (str == "") 
{
alert("Please enter the text you want to locate."); 
return;
} 
var tx, i, found; 
{
tx = document.body.createTextRange();
for (i = 0; i <= nm && (found = tx.findText(str)) != false; i++) 
{
tx.moveStart("character", 1); 
tx.moveEnd("textedit");
} 
if (found) 
{
tx.moveStart("character", -1); 
try
{
tx.findText(str);
tx.select(); 
tx.scrollIntoView(false); 
nm++;
}
catch(e)
{
nm++;
findInPage();
}
}
else 
{
if (nm > 0) 
{
nm = 0; 
findInPage();
}
else 
alert(str + " not found on this page.");
}
}
//	
return;
} 
function getDocumentElement(sElementName)
{
if (document.getElementById)
{
return document.getElementById(sElementName);
}
else if (document.all)
{
return document.all[sElementName];
}
else if (document.layers)
{	
if (document.layers[sElementName])
{
return document.layers[sElementName]; 
}
for(var i=0;i<document.layers.count-1;i++)
{
if (document.layers[i].elements[sElementName])
{
return document.layers[i].elements[sElementName];
}
} 
}
return 0;
}
function onEnterPressed( event, element, funcHandler ) 
{
var bEnterPressed;
if (document.all) 
{
bEnterPressed = (window.event && window.event.keyCode == 13);
}
else
{
bEnterPressed = (event && event.which == 13);
}
if ( bEnterPressed )
{
funcHandler();
}
}
function OnClickInvestorLink(inst_inv_id, current_position, vPndgOrdId, vRgnId, vOrdId, vFeedBackInd)
{
if (getDocumentElement("IOIHistory" + current_position))
{
spIOIHistory(vPndgOrdId, inst_inv_id, vRgnId, vOrdId);
}
else if (getDocumentElement("MPEditIOI" + current_position))
{
spMPEditIOI(vPndgOrdId, inst_inv_id, vRgnId, vOrdId);
}
else if (getDocumentElement("EditIOI" + current_position))
{
spEditIOI(vPndgOrdId, inst_inv_id, vRgnId, vOrdId, vFeedBackInd);
}
else if (getDocumentElement("AddIOI" + current_position))
{
spAddIOI(inst_inv_id, vRgnId);
}
}
function SetAsOfDate()
{
var elemAsOfDate = getDocumentElement("idAsOfDate");
if ( !elemAsOfDate )
return;
var date = new Date();
var day = date.getDate();
var month = date.getMonth() + 1;
var year = date.getFullYear();
month -= ( day<5 ) ? 2 : 1;
if ( month<1 ) 
{
month = 12 - month;
year--;
}	
elemAsOfDate.innerHTML = arrMonth[month]+" "+year;
}
function getTrnId()
{
return getDocumentElement("hidTrancheId").value;	
}
function locatorWin() 
{
SaveLeftNavMenuSetting();
var lwin = window.open('find_on_page.asp','findit','height=60,width=250,toolbar=no,directories=no,status=no,menubar=no,scrollbars=no,resizable=no'); 
lwin.moveTo(0,0); 
lwin.focus();
}
function changeCommRank()
{
var frm = document.frmMain;
frm.hidSelectedRank.value = frm.selCommRank.options[frm.selCommRank.selectedIndex].value;
document.frmMain.submit();
}
function NotEligible()
{
alert(msg2790NotEligible);
}
