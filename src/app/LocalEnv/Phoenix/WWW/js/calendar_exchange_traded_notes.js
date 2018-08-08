<!-- 
function CheckConditionallyRequiredFields( frm, arrFieldsInError )
{
var arrMoreErrors = new Array();
return (arrMoreErrors);
} 
function CustomValidation( frm )
{
var arrMoreErrors = new Array();
return (arrMoreErrors);
} 
function submitPage( frm , action )
{
switch (action)
{
case "update" :
frm.method = "POST";
frm.action = "util_submit_action.asp";
frm.submit();
break;
case "reverttosave" :
window.location.reload();
break;
}
}
