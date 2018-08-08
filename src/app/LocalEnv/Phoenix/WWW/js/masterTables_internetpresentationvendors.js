<!-- 
function CheckConditionallyRequiredFields( frm, arrFieldsInError )
{
var arrMoreErrors = new Array();
return (arrMoreErrors);
} 
function CustomValidation( frm, arrFieldsInError )
{
var arrMoreErrors = new Array();
if (frm.hidAction.value == "Delete" && frm.ihidRsVendorId.value == "")
{
var arrError = FieldErrorInfo("", "", "", "iRequestID", "Please select an item you would like to delete.");
arrError[2] = '';
arrMoreErrors[0] = arrError;
return (arrMoreErrors);
}	
if (frm.hidAction.value == "Update" || frm.hidAction.value == "Add")
{
if (frm.sName.value.length == 0)
{
var arrError = FieldErrorInfo("", "", "", "sName", "Please enter a Name");
arrError[2] = '';
arrMoreErrors[0] = arrError;	
return (arrMoreErrors);
}	
if (frm.sName.value.length > 64)
{
var arrError = FieldErrorInfo("", "", "", "sName", "Please do not enter more than 64 characters in the Name field");
arrError[2] = '';
arrMoreErrors[0] = arrError;	
return (arrMoreErrors);
}
if (frm.sURL.value.length == 0)
{
var arrError = FieldErrorInfo("", "", "", "sURL", "Please enter an URL");
arrError[2] = '';
arrMoreErrors[0] = arrError;	
return (arrMoreErrors);
} 
if (frm.sURL.value.length > 256)
{
var arrError = FieldErrorInfo("", "", "", "sURL", "Please do not enter more than 256 characters in the URL field");
arrError[2] = '';
arrMoreErrors[0] = arrError;	
return (arrMoreErrors);
} 
if (frm.sExternalURL.value.length == 0)
{
var arrError = FieldErrorInfo("", "", "", "sExternalURL", "Please enter an External URL");
arrError[2] = '';
arrMoreErrors[0] = arrError;	
return (arrMoreErrors);
} 
if (frm.sExternalURL.value.length > 256)
{
var arrError = FieldErrorInfo("", "", "", "sExternalURL", "Please do not enter more than 256 characters in the External URL field");
arrError[2] = '';
arrMoreErrors[0] = arrError;	
return (arrMoreErrors);
} 
if (frm.sEmailAddress.value.length == 0 && frm.sPasswordFileURL.value.length == 0)
{
var arrError = FieldErrorInfo("", "", "", "sEmailAddress", "Please enter an Email address and/or Password file URL");
arrError[2] = '';
arrMoreErrors[0] = arrError;	
return (arrMoreErrors);
} 
if (frm.sEmailAddress.value.length > 128)
{
var arrError = FieldErrorInfo("", "", "", "sEmailAddress", "Please do not enter more than 128 characters in the Email address field");
arrError[2] = '';
arrMoreErrors[0] = arrError;	
return (arrMoreErrors);
} 
if (frm.sPasswordFileURL.value.length > 256)
{
var arrError = FieldErrorInfo("", "", "", "sPasswordFileURL", "Please do not enter more than 256 characters in the Password file URL field");
arrError[2] = '';
arrMoreErrors[0] = arrError;	
return (arrMoreErrors);
} 
if (frm.sDebt.checked == false && frm.sEquity.checked == false)
{
var arrError = FieldErrorInfo("", "", "", "sDebt", "Please select a Debt and/or Equity type.");
arrError[2] = '';
arrMoreErrors[0] = arrError;	
return (arrMoreErrors);
} 
}	
return (arrMoreErrors);
} 
function submitPage( frm , action )
{
switch (action)
{
case	"savechanges" : 
if (frm.ihidRsVendorId.value == "")
frm.hidAction.value = "Add";
else
frm.hidAction.value = "Update";
if(ValidateForm( frm )) 
{ 
frm.method = "POST";
frm.action = "util_submit_action.asp";
frm.submit();
}
break; 
case "reverttosaved" :
frm.reset();
break;
case "cancel" :
frm.action = "mastertables_internetpresentationvendors.asp";
frm.submit();
break;
case	"find" :
frm.method = "POST";
frm.hidAction.value = action;
frm.action = "mastertables_internetpresentationvendors.asp";
frm.submit();	
break;
case	"create" :
frm.method = "POST"; 
frm.hidAction.value = action;
frm.action = "mastertables_internetpresentationvendors.asp";
frm.submit();	
break; 
case	"viewAll" :
frm.method = "POST"; 
frm.hidAction.value = action;
frm.action = "mastertables_internetpresentationvendors.asp";
frm.submit();	
break; 
case	"edit" :
frm.method = "POST";
frm.hidAction.value = "find";
frm.action = "mastertables_internetpresentationvendors.asp";
frm.submit();	
break; 
case	"delete" :
frm.method = "POST";
frm.hidAction.value = "Delete";
frm.action = "util_submit_action.asp";
if(ValidateForm( frm )) 
frm.submit();
break; 
}
}
function setSubmitPage(iRequestID, frm , action ) 
{
frm.iRequestID.value = iRequestID;
submitPage( frm , action );
}
function onEnter()
{
var keyCode = event.keyCode;
if (keyCode == 13){
submitPage(document.frmMain, "find");
}	
} 
