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
function OnAllRegionClick()
{
var bChecked = document.frmUser.cbAllRegion.checked; 
var lLength = document.frmUser.selRSRegion.length;
for (var i = 0; i < lLength; i++)
{
document.frmUser.selRSRegion.options[i].selected = bChecked;
}
return true;
}
function OnSelRSChange()
{
document.frmUser.cbAllRegion.checked = false;
}
function OnNameBlur()
{
var sFirstName = document.frmUser.rsFName.value;
var sLastName = document.frmUser.rsLName.value;
document.frmUser.txtDName.innerText = sFirstName + " " + sLastName;
document.frmUser.txtDName.value = sFirstName + " " + sLastName;
return true;
}
function checkCategory(sCatId)
{
var sCategoryId;
var lLength = document.frmUser.selRSRegion.length;
for (var i = 0; i < lLength; i++)
{
sCategoryId = document.frmUser.selRSRegion.options[i].value;
if (sCatId == sCategoryId)
{
document.frmUser.selRSRegion.options[i].selected = true;
return true;
}
}
return true;
}
function checkAllRegionCB()
{
var lLength = document.frmUser.selRSRegion.length;
var lChecked = 0;
for (var i = 0; i < lLength; i++)
{
if (document.frmUser.selRSRegion.options[i].selected == true)
lChecked++;
}
if (lChecked == lLength)
document.frmUser.cbAllRegion.checked = true;
return true;
}
function submitbusiness() 
{
var choice = document.frmUser.selBusiness.selectedIndex;
var selected = document.frmUser.selBusiness.options[choice].text;
document.frmUser.txtBusinessAreaDesc.value = document.frmUser.selBusiness[choice].text;
document.frmUser.action = "custadmin_add_user.asp";
document.frmUser.submit(); 
}
function changeBusiness(sBusArea, sBusAreaDesc) 
{ 
document.frmUser.selBusiness.value = sBusArea; 
document.frmUser.txtBusinessAreaDesc.value = sBusAreaDesc;
document.frmUser.action = "custadmin_add_user.asp";
document.frmUser.submit(); 
}
function submituser() 
{ 
var sUserId = document.frmUser.rsUserId.value;
var sFirstname = document.frmUser.rsFName.value;
var sLastname = document.frmUser.rsLName.value;
var sBusEmail = document.frmUser.remBEmail.value;
var sCustomerdn = document.frmUser.txtCustomer.value;
var sPassword = document.frmUser.rsPassword.value;
var sConfPassword = document.frmUser.rsConfPassword.value;
var sSuffix = document.frmUser.selUpnSuffix[document.frmUser.selUpnSuffix.selectedIndex].value;
var sUpn = sUserId + "@" + sSuffix;
var sLength = 20 - sSuffix.length;
if (sUpn.length > 20)
{
alert("User Id cannot exceed " + sLength + " characters!");
document.frmUser.rsUserId.focus();
return;
}
var bRolesChecked = false;
var bBusRolesChecked = false;
for (var i = 0; i < document.frmUser.cbBusRole.length; i++) {
if (document.frmUser.cbBusRole[i].value == "DebtUser"){
if (document.frmUser.cbBusRole[i].checked) { 
bBusRolesChecked = true;
}
continue;
}
if (document.frmUser.cbBusRole[i].value == "EquityUser") {
if (document.frmUser.cbBusRole[i].checked) {
bBusRolesChecked = true;
}
continue;
} 
}
if (document.frmUser.cbRole.length) {
for (var j = 0; j < document.frmUser.cbRole.length; j++) {
bRolesChecked |= document.frmUser.cbRole[j].checked;
}
} else {
if (document.frmUser.cbRole.checked)
bRolesChecked = true
}
if (bRolesChecked == false) {
alert("Please check at least one role.");
return;
}
if (bBusRolesChecked == false)
{
alert("Please check at least one business role.");
return;
}
if (sPassword != sConfPassword)
{
alert("Password and confirm password are not the same.\r\nPlease re-enter password");
document.frmUser.rsPassword.focus();
return;
}
if (sUpn.indexOf('@') != -1) 
{
document.frmUser.txtCommonName.value = Left(sUpn, sUpn.indexOf('@')); 
} 
document.frmUser.txtCountryDesc.value = document.frmUser.selCountry[document.frmUser.selCountry.selectedIndex].text;
document.frmUser.txtSubsidiaryId.value = document.frmUser.selSubsidiary[document.frmUser.selSubsidiary.selectedIndex].value;
document.frmUser.txtSubsidiaryDesc.value = document.frmUser.selSubsidiary[document.frmUser.selSubsidiary.selectedIndex].text;
document.frmUser.txtBusinessArea.value = document.frmUser.selBusiness.value;
var sRoadshowRegions;
sRoadshowRegions = "";
var lLength = document.frmUser.selRSRegion.length;
for (var i = 0; i < lLength; i++)
{ 
if (document.frmUser.selRSRegion.options[i].selected)
{
sRoadshowRegions += "<category_nm>" + document.frmUser.selRSRegion.options[i].text + "</category_nm>";
}
}
if (!sRoadshowRegions)
{
sRoadshowRegions = "<category_nm>No region selected</category_nm>";
}
document.frmUser.txtRoadshowRegionDesc.value = sRoadshowRegions;
if (ValidateForm(document.frmUser)) {
document.frmUser.submit();
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
