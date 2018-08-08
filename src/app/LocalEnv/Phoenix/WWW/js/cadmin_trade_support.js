<!-- 
function CheckConditionallyRequiredFields( frm, arrFieldsInError )
{
var arrMoreErrors = new Array();
if (frm.chkDelete != null)
{
if (frm.chkDelete.length != null)
{
var checked = false;
for (var i=0; i<frm.chkDelete.length; i++)
{
if (frm.chkDelete[i].checked) 
{
checked = true;
break;
}
}
if (!checked)
{
var arrError = FieldErrorInfo("", 'Please select the item(s) you wish to delete.', "", "", "");
arrMoreErrors[arrMoreErrors.length] = arrError; 
}
}
else
{
if (!frm.chkDelete.checked)
{
var arrError = FieldErrorInfo("", 'Please select the item(s) you wish to delete.', "", "", "");
arrMoreErrors[arrMoreErrors.length] = arrError; 
}
}
}	
return (arrMoreErrors);
} 
function CustomValidation( frm, arrFieldsInError )
{
var arrMoreErrors = new Array();
return (arrMoreErrors);
} 
function submitPage( frm , action)
{
switch (action)
{
case "DeleteUserAll" :
if(frm.chkDelete != null && ValidateForm( frm ))
{
var frm = document.frmMain;
frm.hidAction.value = "DeleteUserRegionAll";
frm.action = "util_submit_action.asp";
frm.method = "POST";
frm.submit();
break; 
}
case "DeleteRegionAccountAll" :
if(frm.chkDelete != null && ValidateForm( frm ))
{
var frm = document.frmMain;
frm.hidAction.value = "DeleteRegionAccountAll";
frm.action = "util_submit_action.asp";
frm.method = "POST";
frm.submit();
break; 
} 
}
}
function onRegionChange()
{
var frm = document.frmMain;
frm.action = "cadmin_trade_support.asp";
frm.method = "POST";
frm.submit();
}
function onChangeView(view)
{
var frm = document.frmMain;
frm.hidView.value = view;
frm.action = "cadmin_trade_support.asp";
frm.method = "POST";
frm.submit();
}
function onAddTradeSupport()
{
var frm = document.frmMain;
frm.hidRegionId.value = frm.selRegion.options[frm.selRegion.options.selectedIndex].value;
frm.action = "cadmin_trade_support_user_search.asp";
frm.method = "POST";
frm.submit();	
}
function onSelectUser(upId)
{	
var frm = document.frmMain;
frm.hidUpId.value = upId;
frm.action = "cadmin_trade_support_user_search.asp";
frm.method = "POST";
frm.submit(); 
}
function onAddAccount()
{
var frm = document.frmMain;
frm.hidRegionId.value = frm.selRegion.options[frm.selRegion.options.selectedIndex].value;
frm.action = "cadmin_trade_support_client_search.asp";
frm.method = "POST";
frm.submit(); 
}
function onSelectAccount(instInvId)
{	
var frm = document.frmMain;
frm.hidInstInvId.value = instInvId;
frm.action = "cadmin_trade_support_client_search.asp";
frm.method = "POST";
frm.submit(); 
}
function onSelectCurrentUserRegion(up_id)
{
openGeneralPopup("cadmin_trade_support_user_region.asp?hidUpId=" + up_id, "", "width=500,height=250,resizable,toolbar=no,scrollbars,menubar=no");
}
function onSelectCurrentClientRegion(instInvId)
{
openGeneralPopup("cadmin_trade_support_client_account.asp?hidInstInvId=" + instInvId, "", "width=500,height=250,resizable,toolbar=no,scrollbars,menubar=no");
}
