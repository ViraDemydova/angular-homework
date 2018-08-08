<!-- 
function CheckConditionallyRequiredFields( frm, arrFieldsInError )
{
var arrMoreErrors = new Array();
var sFeedBack = "";
if (frm.txtFeedback)
sFeedBack = frm.txtFeedback.value;
if (sFeedBack.length > 2000)
{
var arrError = FieldErrorInfo("txtFeedback", new String, "txtFeedback", "txtFeedback", "Feedback");
arrError[2] = "Your comment length is " + sFeedBack.length + " characters. The maximum comment length is 2,000. Please reduce the comment size and try again.";
arrMoreErrors[arrMoreErrors.length] = arrError; 
}	
return (arrMoreErrors);
} 
function submitFilter( frm )
{
window.location = 'bookbuild_orderfeedback_popup.asp?PndgOrdId=' + frm.hidPndgOrdId.value + '&InvNm=' + escape(frm.hidInvNm.value) + '&trn_id=' + frm.hidTrancheId.value + '&rgn_id=' + frm.hidRegionId.value + '&inst_inv_id=' + frm.hidInvestorID.value + '&edit_ind=' + frm.hidBookOpenInd.value + '&Roadshow_ind=' + frm.hidRoadShowInd.value + '&Filter=' + frm.selRole.value;
}
function submitPage( frm )
{
if(ValidateForm(frm))
{
if(frm.hidPndgOrdId.value == '')
{
frm.hidAction.value = "SaveFromSalesWksht";
frm.hidProgID.value = "Order_usr.PendingEquityOrder";
}
else
{
var sTemp;
if (document.frmMain.selRole)
sTemp = document.frmMain.selRole.value;
if (sTemp == "RoadShow")
{
document.frmMain.hidRoadShowInd.value = "1" ;
}
else
{
document.frmMain.hidRoadShowInd.value = "0" ;
}
frm.hidAction.value = "Add";
frm.hidProgID.value = "Order_usr.OrderFeedback";
}
frm.action = "/asp/util_submit_action.asp";	
frm.submit();
} 
} 
function ExporttoExcel( frm )
{
window.location = 'bookbuild_orderfeedback_popup.asp?PndgOrdId=' + frm.hidPndgOrdId.value + '&InvNm=' + escape(frm.hidInvNm.value) + '&trn_id=' + frm.hidTrancheId.value + '&rgn_id=' + frm.hidRegionId.value + '&inst_inv_id=' + frm.hidInvestorID.value + '&Filter=' + frm.selRole.value + '&ExportToExcel=true';
}
