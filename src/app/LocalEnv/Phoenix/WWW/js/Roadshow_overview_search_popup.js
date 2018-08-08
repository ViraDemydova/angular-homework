<!-- 
function onPageLoad()
{
document.frmMain.txtDealName.focus();
}
function submitPage( frm, action, sID, sName, sIssueCd, sDebtEqFlg, sExpenseCd, bUseAlias, sAliasName, sAliasCode, b1On1, iDayCount,
sPreStartDate, sPreEndDate, sStartDate, sEndData, iRSIssID, issrID, iCoordID, bConcInd, iPMDayCOunt,
iConcOfferID )
{
switch (action)
{
case "Search" :
frm.action = "/asp/Roadshow_overview_search_popup.asp?Search=" + frm.txtDealName.value +
"&DealType=2&RSDealType=2"; 
frm.hidAction.value = "Search";
frm.submit();
break;
case "DealSelected":
window.parent.opener.SaveSessionDataAndReload(iRSIssID, sID, sName, sIssueCd, sDebtEqFlg, issrID);
window.close();
break;	
}
}
function OnChange(frm)
{
frm.action = "/asp/Roadshow_overview_search_popup.asp?Search=" + frm.txtDealName.value + "&DealType=2"; 
frm.hidAction.value = "Search";
}
