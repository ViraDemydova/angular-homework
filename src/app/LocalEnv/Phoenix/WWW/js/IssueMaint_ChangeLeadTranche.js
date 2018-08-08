<!-- 
function submitPage( frm , action )
{
switch (action)
{
case "savechanges" :
if(ValidateForm( frm ))
{
frm.action = "/asp/util_submit_action.asp";
frm.hidAction.value = "Update"
frm.submit();
}
break;
case "cancel" :
frm.action = frm.hidReturnToPageName.value;
frm.submit();
break;
}
}
