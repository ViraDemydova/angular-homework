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
var oFlipInstitutionalDetailsCtrl = document.all("AXFlipInstitutionalDetailsCtrl");
oFlipInstitutionalDetailsCtrl.bEquity = true;
oFlipInstitutionalDetailsCtrl.bstrInstitutionalAccnt = document.frmMain.hidInstitutionalAccntListXml.value;
oFlipInstitutionalDetailsCtrl.bstrTrnName = document.frmMain.hidTrnName.value;
oFlipInstitutionalDetailsCtrl.bstrTrnId = document.frmMain.hidTrnId.value;
oFlipInstitutionalDetailsCtrl.bstrSellingConcession = document.frmMain.hidSellingConcession.value;
oFlipInstitutionalDetailsCtrl.bstrPrdCcyCd = document.frmMain.hidPrdCcyCode.value;
oFlipInstitutionalDetailsCtrl.bstrTranchesDetailsFlipper = document.frmMain.hidTranchesDetailsFlipper.value;
oFlipInstitutionalDetailsCtrl.bstrDealDetails = document.frmMain.hidIssueDetail.value;
oFlipInstitutionalDetailsCtrl.bstrCurrentSelAcctCd = document.frmMain.hidAcctCd.value;
oFlipInstitutionalDetailsCtrl.bstrInstInvestor = document.frmMain.hidInstitutionalInvestorListXml.value;
oFlipInstitutionalDetailsCtrl.Refresh();
ResizeActiveXControl();
}
function ResizeActiveXControl()
{
var oActiveX = document.all("AXFlipInstitutionalDetailsCtrl");
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
function bookDetails()
{
return "hello";
}
function toggleMaximizeMinimizing()
{
var oTrnLayer;
if (document.getElementById)
{
oTrnLayer = document.getElementById("divTrnHeaderLayer");
if(oTrnLayer.style.display!="none")
{
oTrnLayer.style.display="none";
}
else
{
oTrnLayer.style.display="block";
}
return;
}
else if (document.all)
{
oTrnLayer= document.all("divTrnHeaderLayer");
if(oTrnLayer.style.display!="none")
{
oTrnLayer.style.display="none";
}
else
{
oTrnLayer.style.display="block";
}
return;
}
else if (document.layers)
{
}	
}
