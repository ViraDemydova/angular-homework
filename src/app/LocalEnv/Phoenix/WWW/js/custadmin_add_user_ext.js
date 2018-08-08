<!-- 
function CheckConditionallyRequiredFields( frm, arrFieldsInError )
{
var arrMoreErrors = new Array();
return (arrMoreErrors);
} 
function CustomValidation( frm, arrFieldsInError )
{
var arrMoreErrors = new Array();
var sSuffix = frm.selUpnSuffix[frm.selUpnSuffix.selectedIndex].value;
var sUpn = frm.rsUserId.value + "@" + sSuffix;
var sLength = 20 - sSuffix.length;
if (sUpn.length > 20)
{
var arrError = FieldErrorInfo("rsUserId", new String, "", "rsUserId", "UserId");
arrError[2] = "User Id cannot exceed " + sLength + " characters!";
arrMoreErrors[arrMoreErrors.length] = arrError;
}
if (frm.rsPassword.value != frm.rsConfPassword.value)
{
var arrError = FieldErrorInfo("rsPassword", new String, "", "rsPassword", "Password");
arrError[2] = "Password and confirm password are not the same.";
arrMoreErrors[arrMoreErrors.length] = arrError;
}
var bRolesChecked = false;
var bBusRolesChecked = false;
for (var i = 0; i < frm.cbBusRole.length; i++) {
if (frm.cbBusRole[i].value == "DebtUser"){
if (frm.cbBusRole[i].checked) { 
bBusRolesChecked = true;
}
continue;
}
if (frm.cbBusRole[i].value == "EquityUser") {
if (frm.cbBusRole[i].checked) {
bBusRolesChecked = true;
}
continue;
} 
}
if (bBusRolesChecked == false)
{
var arrError = FieldErrorInfo("cbBusRole", new String, "", "cbBusRole[0]", "Business Role");
arrError[2] = "Please check at least one business role.";
arrMoreErrors[arrMoreErrors.length] = arrError;
}
if (frm.cbRole.length) {
for (var j = 0; j < frm.cbRole.length; j++) {
bRolesChecked |= frm.cbRole[j].checked;
}
} else {
if (frm.cbRole.checked)
bRolesChecked = true
}
if (bRolesChecked == false)
{
var arrError = FieldErrorInfo("cbRole", new String, "", "cbRole[0]", "Role");
arrError[2] = "Please check at least one role.";
arrMoreErrors[arrMoreErrors.length] = arrError;
}
return (arrMoreErrors);
} 
function submitPage( frm )
{
var sUserId = frm.rsUserId.value;
var sFirstname = frm.rsFName.value;
var sLastname = frm.rsLName.value;
var sBusEmail = frm.remBEmail.value;
var sCustomerdn = frm.txtCustomer.value;
var sPassword = frm.rsPassword.value;
var sConfPassword = frm.rsConfPassword.value;
var sSuffix = frm.selUpnSuffix[frm.selUpnSuffix.selectedIndex].value;
var sUpn = sUserId + "@" + sSuffix;
if (sUpn.indexOf('@') != -1) 
{
frm.txtCommonName.value = Left(sUpn, sUpn.indexOf('@')); 
}
frm.txtCountryDesc.value = frm.selCountry[frm.selCountry.selectedIndex].text;
if (ValidateForm( frm )) { 
frm.submit();
}
}
RSEnableRemoteScripting("/_ScriptLibrary");
function error_callback(co)
{
alert("Error_callback\n\n" +
"status = " + co.status + "\n\n" +
"message = " + co.message + "\n\n" +
"data = " + co.data);
}
function on_callback_get_subsidiary(co)
{
var sResult = co.return_value; 
var index = 0;
var sExp = new RegExp(";");
var sStreetAdd;
var sCity;
var sState;
var sCntryId;
var sZipCd;
index = sResult.search(sExp);
sStreetAdd = sResult.substring(0,index);
sResult = sResult.substr(index+1)
index = sResult.search(sExp);
sCity = sResult.substring(0, index);
sResult = sResult.substr(index+1);
index = sResult.search(sExp);
sState = sResult.substring(0, index);
sResult = sResult.substr(index+1);
index = sResult.search(sExp);
sCntryId = sResult.substring(0, index);
sZipCd = sResult.substr(index+1);
var i;
for (i = 0; i < document.forms.length; i++)
{
if (document.forms[i].name == "frmUser")
break;
}
document.forms[i].txtStreetAdd.value = sStreetAdd;
document.forms[i].txtCity.value = sCity;
document.forms[i].txtState.value = sState;
document.forms[i].txtZip.value = sZipCd;
document.forms[i].selCountry.value = sCntryId;
for( var index = 0; i < document.forms[i].selCountry.options.length; index++ )
{
if (document.forms[i].selCountry.options[index].value == sCntryId)
{
document.forms[i].selCountry.options[index].selected = true;
break;
}
}
}
function on_subsidiary_sel_change()
{
var sSubsidiaryId = document.frmUser.selSubsidiary.options[document.frmUser.selSubsidiary.selectedIndex].value; 
var co = RSExecute('rs_custadmin_add_user_server.asp', 'GetSubsidiary', sSubsidiaryId, on_callback_get_subsidiary, error_callback, 'Error occurred while calling RsExecute()');
}
function OnNameBlur()
{
var sFirstName = document.frmUser.rsFName.value;
var sLastName = document.frmUser.rsLName.value;
document.frmUser.txtDName.innerText = sFirstName + " " + sLastName;
document.frmUser.txtDName.value = sFirstName + " " + sLastName;
return true;
}
