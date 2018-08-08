<!-- 
function submitPage( )
{
var frm = document.frmMain;
frm.method = "POST";
frm.action = "syndcon_dealsearch_popup.asp";
frm.submit();
}
function ImportUpdate(recipient_iss_id, sender_iss_id, sender_mstr_id, syndcon_cat_cd, syndcon_event_id)
{
var frm = document.frmMain;
frm.hidRecipientIssId.value = recipient_iss_id;
frm.hidSenderIssId.value = sender_iss_id;
frm.hidSenderMstrId.value = sender_mstr_id;
frm.hidSCCatCode.value = syndcon_cat_cd;
frm.hidSCEventId.value = syndcon_event_id;
frm.method = "POST";
frm.action = "/asp/util_submit_action.asp";
frm.hidAction.value = "Import";
frm.submit();
}
