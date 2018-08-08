<!-- 
function CheckConditionallyRequiredFields( frm, arrFieldsInError )
{
var arrMoreErrors = new Array();
var checked = false;
if (frm.chkDelete != null)
{
if (frm.chkDelete.length != null)
{	
for (var i=0; i<frm.chkDelete.length; i++)
{
if (frm.chkDelete[i].checked) 
{
checked = true;
break;
}
}
}
else
{
if (frm.chkDelete.checked)
{
checked = true; 
}
}
}	
if (!checked)
{
if (frm.chkAdd != null)
{
if (frm.chkAdd.length != null)
{	
for (var i=0; i<frm.chkAdd.length; i++)
{
if (frm.chkAdd[i].checked) 
{
checked = true;
break;
}
}
}
else
{
if (frm.chkAdd.checked)
{
checked = true; 
}
}
} 
}
if (!checked)
{
var arrError = FieldErrorInfo("", 'Please select the item(s) you wish to add or delete.', "", "", "");
arrMoreErrors[arrMoreErrors.length] = arrError; 
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
case "UpdateUser" :
if( (frm.chkAdd != null || frm.chkDelete != null) && ValidateForm( frm ) )
{ 
frm.action = "util_submit_action.asp";
frm.method = "POST";
frm.submit();
break; 
}
}
}
function onSearch()
{
var frm = document.frmMain;
if (frm.sName.value.length == 0)
frm.sName.value = "%";
frm.hidUpId.value = "";
frm.action = "cadmin_trade_support_user_search.asp";
frm.method = "POST";
frm.submit();
}
function onSelectCurrentRegion(upId)
{
openGeneralPopup("cadmin_trade_support_user_region.asp?hidUpId=" + upId, "", "width=500,height=250,resizable,toolbar=no,scrollbars,menubar=no");
}
function onBack()
{
var frm = document.frmMain;
frm.action = "cadmin_trade_support.asp";
frm.method = "POST";
frm.submit();
}
function onChangeNewRegion(upId)
{
var frm = document.frmMain;
if (frm.chkAdd.length != null)
{
for (var i=0; i<frm.chkAdd.length; i++)
{
if (frm.chkAdd[i].value == upId)
{
frm.chkAdd[i].checked = true; 
break;
}
}
}
else
{
if (frm.chkAdd.value == upId)
frm.chkAdd.checked = true;
}
}
