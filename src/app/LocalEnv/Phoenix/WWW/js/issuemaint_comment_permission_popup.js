<!-- 
function onPageLoad()
{
}
function CheckConditionallyRequiredFields( frm, arrFieldsInError )
{
} 
function submitPage( frm , action )
{
switch (action)
{
case "save" :
frm.action = "/asp/util_submit_action.asp";
frm.hidAction.value = "UpdateCommentPermission";
frm.submit();
break;
}
}
