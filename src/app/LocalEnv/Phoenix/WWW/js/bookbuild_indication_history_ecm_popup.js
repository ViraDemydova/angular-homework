<!-- 
function RefreshPage()
{
sPendingFilter = 0;
if (document.frmMain.radFilter[1].checked)
{
sPendingFilter = 1;
}
sUrl = "bookbuild_indication_history_ecm_popup.asp"
+ "?ord_id=" + document.frmMain.hidOrdId.value
+ "&pndg_ord_id=" + document.frmMain.hidPndgOrdId.value
+ "&pndg_filter=" + sPendingFilter;
;
document.frmMain.action = sUrl;
document.frmMain.submit();
}
