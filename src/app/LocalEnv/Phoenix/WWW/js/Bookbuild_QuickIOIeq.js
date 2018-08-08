<!-- 
RSEnableRemoteScripting("/_ScriptLibrary")
function onPageLoad()
{
var oQI = document.all("QuickIOICtrl");
oQI.bstrIssueDetails = document.frmMain.hidIssueDetailsXml.value;
oQI.bstrTrancheControls = document.frmMain.hidTrancheControlsXml.value;
oQI.bstrTrancheDetails = document.frmMain.hidTrancheDetailsXml.value;
oQI.bstrProductDetails = document.frmMain.hidProductDetailsXml.value;
oQI.bstrCurrency = document.frmMain.hidCurrencyDetailsXml.value;
oQI.bstrRegions = document.frmMain.hidRegionsXml.value;
oQI.bstrSyndicateMembers = document.frmMain.hidSyndicateMembersXml.value;
oQI.bNonLead = ("true"==document.frmMain.hidNonLead.value.toLowerCase());
oQI.bEnableQIBFeature = ("1"==document.frmMain.hidEnableQIBFeature.value);
oQI.bShowExtInvestorNum = document.frmMain.hidshowExtInvestorNum.value;
oQI.bEnableSalesTrader = (document.frmMain.hidEnableSalesTrader.value == "True") ? true : false;
oQI.bstrDealerRoleAssignment	= document.frmMain.hidDealerRoleAssignmentXml.value;
oQI.bUseSalesRep = (document.frmMain.hidUseSalesRep.value == "True") ? true : false;
if (document.frmMain.hidFRQInd.value == 1)
oQI.bstrFRQ	= document.frmMain.hidFRQXml.value;
oQI.bFRQInd = document.frmMain.hidFRQInd.value;
if (self.window.opener)
{
var oMB = self.window.opener.document.all("MasterBookCtrl");
oQI.bRefreshMasterBook = (oMB != null)
}
else
oQI.bRefreshMasterBook = false;
oQI.bBlockODInvestor = (document.frmMain.hidBlockODInvestor.value == "1") ? true : false;
oQI.Refresh();
ResizeActiveXControl();
}
function CheckConditionallyRequiredFields( frm, arrFieldsInError )
{
}
function submitPage( frm , action )
{
switch (action)
{
case "SaveChanges" :
break;
case "RevertToSaved" :
window.location.reload();
break;
case "Cancel" :
break;
}
}
function RefreshMasterBook()
{
if (self.window.opener)
{
var oMB = self.window.opener.document.all("MasterBookCtrl");
if ( oMB != null )
{
oMB.RefreshFromFxRate();
self.window.opener.ResizeActiveXControl();
}
}
}
function ResizeActiveXControl()
{
var oMB = document.all("QuickIOICtrl");
var oElement=oMB;
var lOffsetX=0;
var lOffsetY=0;
while(oElement)
{
lOffsetX+=oElement.offsetLeft;
lOffsetY+=oElement.offsetTop;
oElement=oElement.offsetParent
}
oMB.OnFrameSize(document.body.offsetWidth-lOffsetX, document.body.offsetHeight-lOffsetY-180);
}
function closeWindow()
{
window.close();
}
function DoesEquityOrderExist(sInvID, sSubInvID, sSynMemID)
{
co = RSExecute('rs_bookbuild_indication_server.asp', 'js_GetEquityOrder', sSynMemID, sInvID, 0, sSubInvID);
var strValues = co.return_value;
var aryRecords = strValues.split("\t");
var oQI = document.all("QuickIOICtrl");
if ( oQI != null )
{
if (aryRecords.length > 1) 
{
oQI.bOrderExists = true;
}
else
{
oQI.bOrderExists = false;
}
}
}
