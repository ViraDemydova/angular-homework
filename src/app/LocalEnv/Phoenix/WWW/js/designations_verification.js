<!-- 
function editDesignations(frm, sInvId, sOrdId, sInvName, sOrderQty, sDBDName)
{
frm.hidInvId.value = sInvId;
frm.hidOrdId.value = sOrdId;
frm.hidInvName.value = sInvName;
frm.hidOrderQty.value = sOrderQty;
frm.hidDBDName.value = sDBDName;
frm.method = "POST";
frm.action = "designations_edit.asp";
frm.submit();
}
function submitPage( frm , action )
{
switch (action)
{
case "freeze" :
if(ValidateForm( frm ))
{ 
frm.action = "/asp/util_submit_action.asp";
frm.hidAction.value = "Verify";
frm.submit();
}
break;
case "cancel" :
window.location = "designations_view_capmkts.asp?TrancheId="+frm.hidTrancheId.value+"";
break;
}
}
function submitColumnSort( strColumn, sectionNum )
{
var oCurrentSortColumn
var oCurrentSortOrder
if(sectionNum == 1){
oCurrentSortColumn = document.frmMain.hidCurrentSortColumn
oCurrentSortOrder = document.frmMain.hidCurrentSortOrder
}
else
{
oCurrentSortColumn = document.frmMain.hidCurrentSortColumn2
oCurrentSortOrder = document.frmMain.hidCurrentSortOrder2
}
if( strColumn != oCurrentSortColumn.value )
{
oCurrentSortColumn.value = strColumn
oCurrentSortOrder.value = "ascending"
}
else if( oCurrentSortOrder.value == "ascending" )	
oCurrentSortOrder.value = "descending"	
else
oCurrentSortOrder.value = "ascending"
document.frmMain.action = "designations_verification.asp";
document.frmMain.submit();
}
