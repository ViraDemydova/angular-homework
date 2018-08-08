<!-- 
function onPageLoad()
{
var oActiveX = document.all("BrokerSummaryCtrl");
oActiveX.bstrTrancheID = document.frmMain.hidTrnID.value;
oActiveX.bstrTranchesDetailsFlipper = document.frmMain.hidTranchesDetailsFlipper.value;
oActiveX.bstrDealDetails = document.frmMain.hidIssueDetail.value;
oActiveX.Refresh();
ResizeActiveXControl();
}
function ResizeActiveXControl()
{
var oActiveX = document.all("BrokerSummaryCtrl");
var oElement=oActiveX;
var lOffsetX=0;
var lOffsetY=110;
while(oElement)
{
lOffsetX+=oElement.offsetLeft;
lOffsetY+=oElement.offsetTop;
oElement=oElement.offsetParent
}
oActiveX.OnFrameSize(document.body.offsetWidth-lOffsetX, document.body.offsetHeight-lOffsetY);
}
