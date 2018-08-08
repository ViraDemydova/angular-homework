<!-- 
function onSelectTranche()
{
var frm = document.frmMain;
frm.hidTrancheId.value = frm.selTranche.options[frm.selTranche.options.selectedIndex].value;
frm.method = "POST";
frm.action = "designations_view_trade_support.asp"
frm.submit();
}
function onSelectRegion()
{
var frm = document.frmMain;
frm.hidRegionId.value = frm.selRegion.options[frm.selRegion.options.selectedIndex].value;
frm.method = "POST";
frm.action = "designations_view_trade_support.asp"
frm.submit();
}
function submitColumnSort(sortColumn)
{
var frm = document.frmMain;
if (frm.hidSortColumn.value == sortColumn)
{
if (frm.hidSortAsc.value == '1')
frm.hidSortAsc.value = '0';
else
frm.hidSortAsc.value = '1';
}
else
{
frm.hidSortAsc.value = '0';
frm.hidSortColumn.value = sortColumn;
}
frm.method = "POST";
frm.action = "designations_view_trade_support.asp"
frm.submit();
}
function onFilter()
{
openGeneralPopup("designations_view_trade_support_popup.asp", "", "width=360,height=120,resizable,toolbar=no,scrollbars,menubar=no");
}
function submitPageForDesignation( ord_id )
{
var frm = document.frmMain;
openGeneralPopup('designations_edit_sales.asp?TrancheId=' + frm.hidTrancheId.value + '&OrdId=' + ord_id + '&enableAddDesignation=true&ReturnPage=desi_tdr_supp', '', 'width=750,height=500,resizable,toolbar=no,scrollbars,menubar=no'); 
}
function verification(doVerification)
{
var frm = document.frmMain;
if (doVerification)
{
frm.method = "POST";
frm.action = "designations_verification.asp";
frm.submit();
}
else
{
frm.hidProgID.value = "IssueMaintenance_usr.TrancheControl";
frm.action = "util_submit_action.asp";
frm.hidAction.value = "Verify";
frm.submit();	
}
}
function onChangeView(newView, sortColumn)
{
var frm = document.frmMain;
frm.hidSortAsc.value = "1";
frm.hidSortColumn.value = sortColumn;
frm.hidView.value = newView;	
frm.method = "POST";
frm.action = "designations_view_trade_support.asp"
frm.submit();	
}
function onCheckAll()
{
var frm = document.frmMain;
if (frm.chkCheckAll.checked)
{
checkAll();
}
}
function checkAll()
{
var frm = document.frmMain;
if (frm.chkDesignation != null)
{
if (frm.chkDesignation.length != null)
{	
for (var i=0; i<frm.chkDesignation.length; i++)
{
frm.chkDesignation[i].checked = true;
}
}
else
{
frm.chkDesignation.checked = true;
}
}
}
