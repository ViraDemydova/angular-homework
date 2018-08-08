<!-- 
function ResizeActiveXControl()
{
var oMB = document.all("MasterBookCtrl");
if (oMB == null)
return;
var oElement=oMB;
var lOffsetX=0;
var lOffsetY=0;
while(oElement)
{
lOffsetX+=oElement.offsetLeft;
lOffsetY+=oElement.offsetTop;
oElement=oElement.offsetParent
}
oMB.OnFrameSize(document.body.offsetWidth-lOffsetX, document.body.offsetHeight-lOffsetY);
}
function GetEquityDealSummary( TrnId, XmlFilter)
{
var temp;
var IssueId = document.frmMain.hidIssueId.value;
if (TrnId == -1)
TrnId = 0;
var co = RSExecute('rs_bookbuild_indication_server.asp', 
'js_GetEquityDealSummary', 
XmlFilter, IssueId, TrnId);
var szResult = co.return_value;
var aryValues = szResult.split(",");
var DealSize = aryValues[0];
var TotalTargetAlloc = aryValues[1];
var TotalAllocations = aryValues[2];
var TargetInstPot = aryValues[3];
var InstAllocations = aryValues[4];
var InstPotIOI = aryValues[5];
var RetailIOI = aryValues[6];
var InstIOI = aryValues[7];
var ReserveShares = aryValues[8];
var TargetInstRetPot = aryValues[9];
var InstRetention = aryValues[10];
var OverAllotment = aryValues[11];
if (document.all.txtStatus1)
document.all.txtStatus1.innerText = DealSummaryStatus( DealSize, TotalTargetAlloc);
if (document.all.txtDealPosition)
document.all.txtDealPosition.innerText = formatAmountString((Number(DealSize) + Number(OverAllotment)).toString());
if (document.all.txtAllTargetAllocations)
document.all.txtAllTargetAllocations.innerText = formatAmountString(TotalTargetAlloc);
if (document.all.txtStatus2)
document.all.txtStatus2.innerText = DealSummaryStatus( DealSize, TotalAllocations);
if (document.all.txtFiledDealSize)
document.all.txtFiledDealSize.innerText = formatAmountString(DealSize);
if (document.all.txtRealAllocations)
document.all.txtRealAllocations.innerText = formatAmountString(TotalAllocations);
if (document.all.txtStatus3)
document.all.txtStatus3.innerText = DealSummaryStatus( TargetInstPot, InstAllocations);
if (document.all.txtTargetInstlPot)
document.all.txtTargetInstlPot.innerText = formatAmountString(TargetInstPot);
if (document.all.txtPotAllocations)
document.all.txtPotAllocations.innerText = formatAmountString(InstAllocations);
if (document.all.txtStatus4)
document.all.txtStatus4.innerText = DealSummaryStatusPct(InstPotIOI, TargetInstPot);
if (document.all.txtTargetInstlPot2)
document.all.txtTargetInstlPot2.innerText = formatAmountString(TargetInstPot);
if (document.all.txtInstlSubscription)
document.all.txtInstlSubscription.innerText = formatAmountString(InstPotIOI);
if (document.all.txtStatus5)
{
temp = Number(RetailIOI) + Number(InstIOI) + Number(ReserveShares);
document.all.txtStatus5.innerText = DealSummaryStatusPct(temp, DealSize);
}
if (document.all.txtDealSize)
document.all.txtDealSize.innerText = formatAmountString(DealSize);
if (document.all.txtOverallSubscription)
{
temp = Number(RetailIOI) + Number(InstIOI) + Number(ReserveShares);
document.all.txtOverallSubscription.innerText = formatAmountString(temp.toString()); 
}
if (document.all.txtStatus6)
document.all.txtStatus6.innerText = DealSummaryStatus( TargetInstRetPot, InstRetention);
if (document.all.txtTargetInstlRetention)
document.all.txtTargetInstlRetention.innerText = formatAmountString(TargetInstRetPot);
if (document.all.txtInstlRetentionAlloc)
document.all.txtInstlRetentionAlloc.innerText = formatAmountString(InstRetention);
}
function DealSummaryStatus( num1, num2)
{
var szReturn, temp;
if (num1 == num2)
szReturn = "Flat";
else if (num1 > num2)
{
temp = num1 - num2
szReturn = formatAmountString(temp.toString()) + " Long";
}
else
{
temp = num2 - num1
szReturn = formatAmountString(temp.toString()) + " Short";
}
return szReturn;
}
function DealSummaryStatusPct( num1, num2 )
{
var szReturn, temp, iPointPos;
if (num2 == 0)
{
szReturn = "Infinity";
}
else
{ 
temp = num1 / num2 * 100;
szReturn = temp.toString();
iPointPos = szReturn.indexOf(".");
if (iPointPos > 0) szReturn = szReturn.substring(0, iPointPos);
}
return szReturn + " Pct";
}
function openFxRatePage( id )
{
openGeneralPopup('IssueMaint_FxRates.asp?ID='+id+'&refer=MasterBook', '', 'width=900,height=650,scrollbars=yes,toolbar=no,menubar=no,resizable=yes');
}
function OpenOrderCommentPopupWindow(synd_comments,inv_comments,sales_comments,jbr_comments,trade_comments, rs_feedback)
{
var strURL;
strURL = "Bookbuild_OrderComments_popup.asp?synd_comments=" + escape(synd_comments);
strURL = strURL + "&amp;investor_comments=" + escape(inv_comments);
strURL = strURL + "&amp;sales_comments=" + escape(sales_comments);
strURL = strURL + "&amp;jbr_comments=" + escape(jbr_comments);
strURL = strURL + "&amp;trader_comments=" + escape(trade_comments);
strURL = strURL + "&amp;rs_feedback=" + escape(rs_feedback);
openGeneralPopup(strURL, '', 'width=400,height=200,toolbar=no,scrollbars=yes,menubar=no,resizable=yes');
}
function OpenSalesFeedBackPopupWindow(OrdID,role, editable)
{
var strURL;
strURL = "Bookbuild_salesfeedback_popup.asp?ord_id=" + escape(OrdID);	
strURL = strURL + "&amp;role=" + escape(role) + "&amp;editable=" + escape(editable);
openGeneralPopup(strURL, '', 'width=750,height=260,toolbar=no,scrollbars=yes,menubar=no,resizable=yes');
}
function OpenCapitalMarketCommentPopupWindow(synd_comments, investor)
{
var strURL;
strURL = "Bookbuild_CapitalMarketComment_popup.asp?synd_comments=" + escape(synd_comments);	
strURL = strURL + "&amp;investor=" + escape(investor);
openGeneralPopup(strURL, '', 'width=750,height=260,toolbar=no,scrollbars=yes,menubar=no,resizable=yes');
}
function OpenJBRCommentsPopupWindow( sIssId, sOrdId )
{
var strURL = "Bookbuild_JBRComments_popup.asp?iss_id=" + escape(sIssId);	
strURL = strURL + "&amp;ord_id=" + escape(sOrdId);
openGeneralPopup(strURL, '', 'width=600,height=265,toolbar=no,scrollbars=yes,menubar=no,resizable=yes');
}
function OpenNetRoadshowInformation(InstInvID, sViewNetRoadshow)
{
if(sViewNetRoadshow == "3" || sViewNetRoadshow == "2") 
{
var strURL;
strURL = "netroadshow_tracking.asp?inst_inv_id=" + escape(InstInvID);	
openGeneralPopup(strURL, '', 'width=900,height=400,toolbar=no,scrollbars=yes,menubar=no,resizable=yes');
}
}
function OpenProspectusTracking(InstInvID, sProspectusViewed, OrdId, ReturnPage)
{
if(InstInvID != "")
{
var strURL;
strURL = "InvestorProspectusTrackingSW.asp?InvId=" + escape(InstInvID) + "&OrdId=" + escape(OrdId) + "&ReturnPage=" + escape(ReturnPage);	
openGeneralPopup(strURL, '', 'width=900,height=500,toolbar=no,scrollbars=yes,menubar=no,resizable=yes');
}
}
function LehmanOpenProspectusTracking(InstInvID, sProspectusViewed, OrdId, ReturnPage)
{
if(InstInvID != "")
{
var strURL;
strURL = "/aspx/UI/Prospectus/DeliveryMgmtPopup.aspx?InvId=" + escape(InstInvID) + "&ReturnPage=" + escape(ReturnPage);
openGeneralPopup(strURL, '', 'width=1000,height=500,toolbar=no,scrollbars=yes,menubar=no,resizable=yes');
}
}
