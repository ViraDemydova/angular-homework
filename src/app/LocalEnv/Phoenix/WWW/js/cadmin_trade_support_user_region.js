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
case "DeleteRegion" :
if(frm.chkDelete != null && ValidateForm( frm ))
{
frm.action = "util_submit_action.asp";
frm.method = "POST";
frm.submit();
break; 
}
}
}
