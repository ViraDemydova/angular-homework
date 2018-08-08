<!-- 
function submitPage( frm , action, trancheIDtoUpdate )
{
switch (action)
{
case "savechanges" :
if(ValidateForm( frm ))
{
frm.action = "/asp/util_submit_action.asp";
frm.hidAction.value = "Update";
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
function switchTrancheID(){
var lTrnID = document.frmMain.sSelTranche.value
var sUrl = "reports_after_market_positionFI.asp?lTrnID=" + lTrnID;
window.location.href = sUrl
}
