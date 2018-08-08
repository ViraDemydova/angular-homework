<!-- 
function submitPage( frm , action )
{
switch (action)
{
case "lockverify" :
if(ValidateForm( frm ))
{ 
frm.action = "/asp/util_submit_action.asp";
frm.hidAction.value = "VerifyTrancheFromVerificationPopup";
frm.submit();
}
break;
case "cancel" :
self.window.close();
break;
}
}
