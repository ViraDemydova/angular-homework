<!-- 
function CheckConditionallyRequiredFields( frm, arrFieldsInError )
{
var arrMoreErrors = new Array();
return (arrMoreErrors);
} 
function CustomValidation( frm, arrFieldsInError )
{
var arrMoreErrors = new Array();
if (frm.sDSPComment.value.length > 2000)
{
var arrError = FieldErrorInfo(frm.sDSPComment, 'The length of comment cannot be more than 2000 characters.', "", frm.sDSPComment, "Comment");
arrMoreErrors[arrMoreErrors.length] = arrError;	
}	
return (arrMoreErrors);
} 
function submitPage( frm , action )
{
switch (action)
{
case "savechanges" :
{
if(ValidateForm( frm ))
{ 
frm.method = "post";
frm.action = "util_submit_action.asp";
frm.submit(); 
}
}
break; 
case "close" :
{
window.close(); 
}
break; 
}
}
