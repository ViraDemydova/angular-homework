<!-- 
function onPageLoad()
{
}
function AddSalesRepUserPopup(sSalesRepId)
{
openGeneralPopup("/asp/cadmin_salesrep_user_add_popup.asp?sales_rep_id=" + sSalesRepId, '', 'width=650,height=500,resizable,toolbar=no,scrollbars,menubar=no');
}
function DeleteSalesRepUser()
{
var frm = document.frmSalesRep;
frm.hidAction.value="BatchDeleteSalesRepUser";
frm.submit();
}
