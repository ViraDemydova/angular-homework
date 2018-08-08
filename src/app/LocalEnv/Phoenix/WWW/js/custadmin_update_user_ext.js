<!-- 
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
function submitPage( frm )
{
frm.txtCountryDesc.value = frm.selCountry[frm.selCountry.selectedIndex].text; 
var sUPN = frm.rsUserId.value;
var sFirstname = frm.rsFName.value;
var sLastname = frm.rsLName.value;
var sBusEmail = frm.remBEmail.value;
var i;
if (sFirstname == "")
{
alert("First name is a required field");
frm.rsFName.focus();
return;
}
if (sLastname == "")
{
alert("Last name is a required field");
frm.rsLName.focus();
return;
}
if (sBusEmail == "")
{
alert("Business email address is a required field")
frm.remBEmail.focus();
return;
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
alert("Please check at least one role.");
return;
}
if (bBusRolesChecked == false)
{
alert("Please check at least one business role.");
return;
}
if(ValidateForm( frm ))
{
frm.submit();
}
}
function OnTypeChange()
{
document.frmUser.txtType.value = frmUser.selType[document.frmUser.selType.selectedIndex].text
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
