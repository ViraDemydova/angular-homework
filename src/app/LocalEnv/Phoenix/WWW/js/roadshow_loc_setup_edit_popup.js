<!-- 
RSEnableRemoteScripting("/_ScriptLibrary");
function CheckConditionallyRequiredFields( frm, arrFieldsInError )
{
var arrMoreErrors = new Array();
if ( frm.selLocDate.options[frm.selLocDate.selectedIndex].value == 0 ) 
{
var arrError = FieldErrorInfo("selLocDate", 'Please select a date', "", "", "Location Date");
arrMoreErrors[arrMoreErrors.length] = arrError;
}	
if ( frm.selGlobalReg.options[frm.selGlobalReg.selectedIndex].value == 0 ) 
{
var arrError = FieldErrorInfo("selGlobalReg", 'Please select a Global Region', "", "", "Global Region");
arrMoreErrors[arrMoreErrors.length] = arrError;
}	
return (arrMoreErrors);
} 
function CustomValidation( frm, arrFieldsInError )
{
var arrMoreErrors = new Array();
return (arrMoreErrors);
} 
function submitPage( frm , action )
{
switch (action)
{
case "update" :
{
if (ValidateForm(frm))
{	
frm.selGlobalReg.disabled = false;
frm.selRegion.disabled = false;
frm.selTeam.disabled = false;
frm.selLocDate.disabled = false;
frm.hidAction.value = "Edit";
frm.method = "POST";
frm.action = "util_submit_action.asp";
frm.submit();	
} 
}
break;
case "delete" :
{
frm.hidAction.value = "DeleteOneLocation";
frm.method = "POST";
frm.action = "util_submit_action.asp";
frm.submit(); 
}
break;
case "cancel" :
{
window.location.reload(true);
} 
break;	
case "close" :
{
window.close(); 
}
break; 
}
}
function error_alert(co)
{
alert("Error_callback\n\n" +
"status = " + co.status + "\n\n" +
"message = " + co.message + "\n\n" +
"data = " + co.data);
}
function clearComboBox(cb)
{
while (cb.length > 0)
cb.options[0] = null;
var option0 = new Option(document.frmMain.hidNonSelected.value, 0, true, true);
cb.options[cb.length] = option0; 
}
function buildComboBox(cb, sContent)
{
var lastPos = 0;
var index = sContent.indexOf(" ", 0);
while (index != -1)
{
var sizeOfValue = parseInt(sContent.substr(lastPos, index));
var value = sContent.substr(index + 1, sizeOfValue);
lastPos = index + 1 + sizeOfValue + 1;
index = sContent.indexOf(" ", lastPos)
var sizeOfText = parseInt(sContent.substr(lastPos, index));
var text = sContent.substr(index + 1, sizeOfText);
lastPos = index + 1 + sizeOfText + 1;
index = sContent.indexOf(" ", lastPos)	
var option = new Option(text, value, false, false);
cb.options[cb.length] = option;
}
}
function listRegion()
{ 
clearComboBox(document.frmMain.selRegion);
clearComboBox(document.frmMain.selLocation);
var GlobalRegId = document.frmMain.selGlobalReg.options[document.frmMain.selGlobalReg.selectedIndex].value;
if (GlobalRegId != 0)
{ 
var co = RSExecute('roadshow_rs_loc_setup.asp', 'js_ListContRegion', GlobalRegId);
if (co.status != 0)
{
error_alert(co);
return;
}
buildComboBox(document.frmMain.selRegion, new String(co.return_value));
}
}
function listLocation()
{ 
clearComboBox(document.frmMain.selLocation);
var RegionId = document.frmMain.selRegion.options[document.frmMain.selRegion.selectedIndex].value
if (RegionId != 0)
{
var co = RSExecute('roadshow_rs_loc_setup.asp', 'js_RegLocation', RegionId);
if (co.status != 0)
{
error_alert(co);
return;
}
buildComboBox(document.frmMain.selLocation, new String(co.return_value));
}
} 
function onChangeLocDate()
{
document.frmMain.chkPublish.checked = false;
}
