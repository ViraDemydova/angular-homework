<!-- 
function getElementByValue(frm, elementName, value)
{
if (frm.elements[elementName] != null)
{
if (frm.elements[elementName].length != null)
{
for (var i=0; i<frm.elements[elementName].length; i++)
{
if (frm.elements[elementName][i].value == value) 
return frm.elements[elementName][i];
}
}
else
{
if (frm.elements[elementName].value == value)
return frm.elements[elementName];
}
}
return null;
}
function ValidateRow(frm, arrMoreErrors, chkAdd)
{
var coverageId = chkAdd.value.toString();
if (chkAdd.checked)
{	
var tdrSuppRgn = 'selTdrSuppRegion_' + coverageId.toString();
if (frm.elements[tdrSuppRgn].options[frm.elements[tdrSuppRgn].options.selectedIndex].value == '0')
{
var arrError = FieldErrorInfo(tdrSuppRgn, 'Please select a trade support region.', "", tdrSuppRgn, "Add Trade Support Region(s)");
arrMoreErrors[arrMoreErrors.length] = arrError; 
}	
}
}
function CheckConditionallyRequiredFields( frm, arrFieldsInError )
{
var arrMoreErrors = new Array();
var checked = false;
if (frm.chkAdd != null)
{
if (frm.chkAdd.length != null)
{	
for (var i=0; i<frm.chkAdd.length; i++)
{
ValidateRow(frm, arrMoreErrors, frm.chkAdd[i])
}
}
else
{
ValidateRow(frm, arrMoreErrors, frm.chkAdd)
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
case "UpdateUser" :
if( (frm.chkDelete != null || frm.chkAdd != null) && ValidateForm( frm ))
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
frm.hidInstInvId.value = "";
frm.action = "cadmin_trade_support_client_search.asp";
frm.method = "POST";
frm.submit();
}
function onSelectCurrentRegion(instInvId)
{
openGeneralPopup("cadmin_trade_support_client_account.asp?hidInstInvId=" + instInvId, "", "width=500,height=250,resizable,toolbar=no,scrollbars,menubar=no");
}
function onBack()
{
var frm = document.frmMain;
frm.action = "cadmin_trade_support.asp";
frm.method = "POST";
frm.submit();
}
function setCheck(coverageId, tdrSuppCoverageId)
{
var frm = document.frmMain;
var selTdrSupp = frm.elements["selTdrSuppRegion_" + coverageId];
if (selTdrSupp != null)
{	
var value = selTdrSupp.options[selTdrSupp.options.selectedIndex].value;
var chkAdd = getElementByValue(frm, 'chkAdd', coverageId);	
if (chkAdd != null)
chkAdd.checked = (value != "0");	
var chkDelete = getElementByValue(frm, 'chkDelete', tdrSuppCoverageId);	
if (chkDelete != null && !chkDelete.disabled)
chkDelete.checked = (value != "0"); 
}
}
