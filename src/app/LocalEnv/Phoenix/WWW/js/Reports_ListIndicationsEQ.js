<!-- 
function CheckConditionallyRequiredFields( frm, arrFieldsInError )
{
var arrMoreErrors = new Array();
return (arrMoreErrors);
} 
function CustomValidation( frm, arrFieldsInError )
{
} 
function submitPage( frm , pndg_ord_id, trn_id )
{
window.location = "/asp/bookbuild_indicationseq.asp?pndg_ord=" + pndg_ord_id + "&trn_id=" + trn_id + "&navtype=report_listind";
}
function submitColumnSort( strColumn, page )
{
var oCurrentSortColumn = document.frmMain.hidCurrentSortColumn
var oCurrentSortOrder = document.frmMain.hidCurrentSortOrder
if( strColumn != oCurrentSortColumn.value )
{
oCurrentSortColumn.value = strColumn
oCurrentSortOrder.value = "ascending"
}
else if( oCurrentSortOrder.value == "ascending" )	
oCurrentSortOrder.value = "descending"	
else
oCurrentSortOrder.value = "ascending"
document.frmMain.action = page
document.frmMain.submit()
}
function PublishOrders()
{
var frm = document.frmMain;
var sPublishOrdId = "";
var sUnpublishOrdId = "";
if (frm.chkPublish)
{
for(var i=1; i < frm.chkPublish.length; i++)
{
var sOrdId = frm.chkPublish[i].value;
var elt = frm.elements["hidOldPublish" + sOrdId];
if (frm.chkPublish[i].checked == true && elt.value == 'False')
{
if (sPublishOrdId == "")
sPublishOrdId = sOrdId;
else
sPublishOrdId += "," + sOrdId;
}
else if (frm.chkPublish[i].checked == false && elt.value == 'True')
{
if (sUnpublishOrdId == "")
sUnpublishOrdId = sOrdId;
else
sUnpublishOrdId += "," + sOrdId;
}
}
}
var ret = confirm("You are about to publish indications. Do you want to continue?");
if (ret)
{
frm.hidUnpublishOrdIds.value = sUnpublishOrdId;
frm.hidPublishOrdIds.value = sPublishOrdId;
frm.action="/asp/util_submit_action.asp";	
frm.submit()
}
}
