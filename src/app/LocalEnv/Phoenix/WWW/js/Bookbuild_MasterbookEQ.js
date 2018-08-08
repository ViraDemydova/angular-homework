<!-- 
RSEnableRemoteScripting("/_ScriptLibrary")
function onPageLoad()
{
formOnLoad();
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
function submitPage( frm , action )
{
switch (action)
{
case "savechanges" :
if(ValidateForm( frm ))
{
frm.action = "/asp/_template.asp";
frm.hidAction.value = "Update"
frm.submit(); 
}
break;
case "reverttosaved" :
window.location.reload();
break;
case "cancel" :
frm.action = "/asp/_template.asp";
frm.submit();
break;
case "addreg" :
frm.action = "/asp/_template.asp";
frm.submit();
break;
}
}
function formOnLoad()
{
var oMB = document.all("MasterBookCtrl");
oMB.bEquity = true;
oMB.bstrIssueId = document.frmMain.hidIssueId.value;
oMB.bstrIssueType = document.frmMain.hidIssueType.value;
oMB.bReadOnly = (document.frmMain.hidReadOnly.value == "True") ? true : false;
oMB.bNonLead = (document.frmMain.hidNonLeadInd.value == "True") ? true : false;
oMB.bEnableQIBFeature = (document.frmMain.hidEnableQIBFeature.value == "1") ? true : false;
oMB.EnableSalesTrader = (document.frmMain.hidEnableSalesTrader.value == "True") ? true : false;
oMB.HasAccessToFSInvProf = (document.frmMain.hidHasAccessToFSInvProf.value == "1") ? true : false;
oMB.bSyndicateTradeSupport = (document.frmMain.hidSyndicateTradeSupport.value == "1") ? true : false;
oMB.Refresh();
ResizeActiveXControl();
}
function openDealSummaryPreferences()
{
var sUrl = "/aspx/UI/MasterBook/PositionPreferences.aspx";
var sStyle = "width=320,height=320,toolbar=no,menubar=no,location=no,directories=no,resizable=yes";
openGeneralPopup( sUrl, '', sStyle );
}
function openKnownByPage( trn_id, ord_id )
{
var sUrl = "Bookbuild_syndmem_known_by_popup.asp?trn_id="+trn_id+"&ord_id="+ord_id;
var sStyle = "width=500,height=380,scrollbars=1,resizable=1";
openGeneralPopup( sUrl, '', sStyle );	
}
function openQuickIOI()
{
var sUrl = "bookbuild_quickioieq.asp?popup=true";
var sStyle = "width=1200,height=670,toolbar=no,menubar=no,location=no,directories=no,resizable=yes,scrollbars=yes,left=50,status=no";
openGeneralPopup( sUrl, '', sStyle );
}
function openViewDeskFailedOrders()
{
var sUrl = "myorderstatus.asp?type=master";
var sStyle = "width=600,height=450,toolbar=no,menubar=no,location=no,directories=no,resizable=yes,scrollbars=yes";
openGeneralPopup( sUrl, '', sStyle );
}
function openViewSalesFailedOrders()
{
var sUrl = "myorderstatus.asp?type=pending";
var sStyle = "width=600,height=450,toolbar=no,menubar=no,location=no,directories=no,resizable=yes,scrollbars=yes";
openGeneralPopup( sUrl, '', sStyle );
}
function openViewDeletedIndications()
{
var sUrl = "reports_listdeletedindicationseq.asp";
var sStyle = "width=640,height=450,toolbar=no,menubar=no,location=no,directories=no,resizable=yes,scrollbars=yes";
openGeneralPopup( sUrl, '', sStyle );
}
function openViewPendingIndications()
{
var sUrl = "Bookbuild_PendingOrdersEQ.asp?refer=masterbook";
var sStyle = "width=900,height=450,toolbar=no,menubar=no,location=no,directories=no,resizable=yes,scrollbars=yes";
openGeneralPopup( sUrl, '', sStyle );
}
function openSyndicationAllocation()
{
var sUrl = "Syndicate_Allocation_EQ.asp?refer=masterbook";
var sStyle = "width=480,height=300,toolbar=no,menubar=no,location=no,directories=no,resizable=yes,scrollbars=yes, left=550, top=100" ;
var popupGeneral = window.open( sUrl, 'idealSyndicateAllocation', sStyle);
popupGeneral.focus();
}
function OpenFSInvProfPopupWindow(inv_ext_vendor_cd)
{
var strURL = "/aspx/UI/External/InvestorProfile.aspx?ext_vendor_cd=" + escape(inv_ext_vendor_cd);	
openGeneralPopup(strURL, '', 'width=750,height=500,toolbar=no,scrollbars=yes,menubar=no,resizable=yes');
}
function openInterop()
{
var sIssueId = document.frmMain.hidIssueId.value;
var sUrl = "/aspx/UI/DLAdapter/DLAdapterUI.aspx?iss_id=" + sIssueId;
var sStyle = "width=800,height=700,toolbar=no,menubar=no,location=no,directories=no,resizable=yes,scrollbars=yes,left=100,top=50,dependent=yes";
openGeneralPopup(sUrl, "", sStyle);
}
function HideHeader()
{
var oHref = document.all("aToggleHeader");
if ( oHref ) 
{
var oHeader = document.all("header");
if ( oHeader && oHeader.style.display!="none" ) {
toggleHeader();
}
}
}
function openViewECMSalesRegions()
{
var sUrl = "/aspx/UI/MasterBook/ECMIOISalesRegions.aspx";
var sStyle = "width=300,height=450,toolbar=no,menubar=no,location=no,directories=no,resizable=yes,scrollbars=yes";
openGeneralPopup( sUrl, '', sStyle );
}
function openViewJBRInbox(iss_id)
{
var sUrl = "Bookbuild_JBRInbox.asp?iss_id="+iss_id;
var sStyle = "width=700,height=450,toolbar=no,menubar=no,location=no,directories=no,resizable=yes,scrollbars=yes";
openGeneralPopup( sUrl, '', sStyle );
}
function openViewJBROutbox(iss_id)
{
var sUrl = "Bookbuild_JBROutbox.asp?iss_id="+iss_id;
var sStyle = "width=700,height=450,toolbar=no,menubar=no,location=no,directories=no,resizable=yes,scrollbars=yes";
openGeneralPopup( sUrl, '', sStyle );
}
function openMatchedOrders(ord_id)
{
var sUrl = "Bookbuild_MatchedOrders_popup.asp?base_ord_id="+ord_id;
var sStyle = "width=700,height=250,toolbar=no,menubar=no,location=no,directories=no,resizable=yes,scrollbars=yes";
openGeneralPopup( sUrl, '', sStyle );
}
function openBrokerCommentsAdd(brk_id)
{
var sUrl = "Bookbuild_BrokerComments_popup.asp?brk_id="+brk_id+"&mode=add";
var sStyle = "width=700,height=250,toolbar=no,menubar=no,location=no,directories=no,resizable=yes,scrollbars=yes";
openGeneralPopup( sUrl, '', sStyle );
}
function openBrokerCommentsView(brk_id)
{
var sUrl = "Bookbuild_BrokerComments_popup.asp?brk_id="+brk_id+"&mode=view";
var sStyle = "width=700,height=250,toolbar=no,menubar=no,location=no,directories=no,resizable=yes,scrollbars=yes";
openGeneralPopup( sUrl, '', sStyle );
}
function openCopyFieldsHistory(iss_id)
{
var sUrl = "Bookbuild_CopyFieldsHistory.asp?iss_id="+iss_id;
var sStyle = "width=800,height=650,toolbar=no,menubar=no,location=no,directories=no,resizable=yes,scrollbars=yes";
openGeneralPopup( sUrl, '', sStyle );
}
function openMatchedOrdersPage()
{
var sUrl = "/aspx/UI/MasterBook/MatchedIndicationBreakdown.aspx";
var sStyle = "width=700,height=450,toolbar=no,menubar=no,location=no,directories=no,resizable=no,scrollbars=yes";
openGeneralPopup( sUrl, '', sStyle );
}
function openOrderAuditHistory()
{
var sUrl = "/aspx/UI/MasterBook/OrderAuditHistory.aspx";
var sStyle = "width=700,height=450,toolbar=no,menubar=no,location=no,directories=no,resizable=yes,scrollbars=yes";
openGeneralPopup( sUrl, '', sStyle );
}
function openDealSummary()
{
var sUrl = "/aspx/UI/MasterBook/SummaryReport.aspx";
var sStyle = "width=800,height=700,toolbar=no,menubar=no,location=no,directories=no,resizable=yes,scrollbars=yes";
openGeneralPopup( sUrl, '', sStyle );
}
function OpenRoadShowFeedbackPopupWindow(inst_inv_id)
{
var sUrl = "/aspx/UI/MasterBook/RoadshowFeedback.aspx?inst_inv_id=" + inst_inv_id;
var sStyle = "width=600,height=450,toolbar=no,menubar=no,location=no,directories=no,resizable=no,scrollbars=yes";
openGeneralPopup( sUrl, '', sStyle );
}
function openReplaceAccount(ord_id)
{
var sUrl = "/aspx/UI/MasterBook/ReplaceAccount.aspx?refer=masterbook&ord_id=" + ord_id;
var sStyle = "width=650,height=400,toolbar=no,menubar=no,location=no,directories=no,resizable=yes,scrollbars=yes";
openGeneralPopup( sUrl, '', sStyle );
}
