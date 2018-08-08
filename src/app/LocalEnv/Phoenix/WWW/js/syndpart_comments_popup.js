<!-- 
function onPageLoad()
{
}
function CheckConditionallyRequiredFields( frm, arrFieldsInError )
{
var arrMoreErrors = new Array();
return (arrMoreErrors);
} 
function CustomValidation( frm, arrFieldsInError )
{
var arrMoreErrors = new Array();
return (arrMoreErrors);
} 
function submitPage( frm , iPos)
{
if (frm.sComments.value.length > 225)
{
alert("Comment cannot be more than 225 chars")
return;
}
if(ValidateForm( frm ))
{ 
frm.method = "POST";
frm.action = "util_submit_action.asp";
frm.submit(); 
}
var sOrgComment = frm.hidOrgComment.value;
var sNewComment = frm.sComments.value;
if (sOrgComment != sNewComment)
{
window.opener.CheckComment(iPos);
}
}
