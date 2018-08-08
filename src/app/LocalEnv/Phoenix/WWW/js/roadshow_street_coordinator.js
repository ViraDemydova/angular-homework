function popUpFirms()
{
var sUrl = "roadshow_firms_popup.asp?firm_nm=";
var sStyle = "height=400,width=400,resizable,status";
openGeneralPopup( sUrl, '', sStyle );
}
function CheckConditionallyRequiredFields( frm, arrFieldsInError )
{
var arrMoreErrors = new Array();
var count = 0;
if (frm.txtFirstName.value == ""){
var arrError = FieldErrorInfo("txtFirstName", 'Please enter a coordinator first name.', "", "txtFirstName", "First Name");
arrMoreErrors[count] = arrError;	
count++;
}
if (frm.txtLastName.value == ""){
var arrError = FieldErrorInfo("txtLastName", 'Please enter a coordinator last name.', "", "txtLastName", "Last Name");
arrMoreErrors[count] = arrError;	
count++;
}
if (frm.hidBrkId.value == ""){
var arrError = FieldErrorInfo("hidBrkId", 'Please select a coordinator firm.', "", "hidBrkId", "Firm");
arrMoreErrors[count] = arrError;	
count++;
}
if (frm.txtEMail.value == ""){
var arrError = FieldErrorInfo("txtEMail", 'Please enter a coordinator e-mail.', "", "txtEMail", "Email");
arrMoreErrors[count] = arrError;	
count++;
}
return (arrMoreErrors);
} 
function submitPage(frm, action, button)
{
if (button == "cancel")
{
frm.action = "roadshow_search_coordinators_results.asp?coord_type=" + frm.hidCoordType.value + "&last_nm=" + frm.hidSearchLastName.value + "&firm_nm=" + frm.hidSearchFirmName.value;
frm.submit();
return true;
}
else
{
if (ValidateForm(frm)) 
{
frm.action = "/asp/util_submit_action.asp";
frm.method = "post";
frm.hidProgID.value = "RoadshowMaster_usr.Coordinators";
frm.hidAction.value = action;
frm.hidButtonPressed.value = button;
frm.hidNextPage.value = "roadshow_street_coordinator.asp";
frm.hidActiveIndicator.value = frm.chkActiveIndicator.checked;	
frm.hidFirstName.value = frm.txtFirstName.value;
frm.hidLastName.value = frm.txtLastName.value;
frm.hidBusinessRole.value = frm.txtBusinessRole.value;
frm.hidAddress1.value = frm.txtAddress1.value;
frm.hidAddress2.value = frm.txtAddress2.value;
frm.hidAddress3.value = frm.txtAddress3.value;
frm.hidCityLocation.value = frm.txtCityLocation.value;
frm.hidPostalCode.value = frm.txtPostalCode.value;
frm.hidPhoneNo.value = frm.txtPhone.value;
frm.hidFaxNo.value = frm.txtFax.value;
frm.hidEmail.value = frm.txtEMail.value;
frm.submit();
return true;
}
}
}
