<!-- 
function CheckConditionallyRequiredFields( frm, arrFieldsInError )
{
var arrMoreErrors = new Array();
if ( frm.sTxtSymbol.value ) {
var sSymbol = new String(frm.sTxtSymbol.value);
if (sSymbol.indexOf("&") != -1 || sSymbol.indexOf("<") != -1 || sSymbol.indexOf(">") != -1 
|| sSymbol.indexOf("'") != -1 || sSymbol.indexOf('"') != -1 ) {
var arrError = FieldErrorInfo("sTxtSymbol", 'Ticker Symbol should only contain alpha letter and digit.', "", "sTxtSymbol", "Ticker Symbol");
arrMoreErrors[arrMoreErrors.length] = arrError;
}
} 
return (arrMoreErrors);
} 
function CustomValidation( frm, arrFieldsInError )
{
var arrMoreErrors = new Array();
var drpSelCountry = document.getElementById("rsSelCountry");
var drpSelHqCountry = document.getElementById("sSelHqCountry");
if (drpSelCountry != null)
{
if (drpSelCountry.value == "0" && drpSelCountry.type == "select-one")
{
var arrFieldErrorInfo = FieldErrorInfo(drpSelCountry.id, "A Country must be selected", "rsSelCountry", drpSelCountry.name, "Country");
arrMoreErrors[arrMoreErrors.length] = arrFieldErrorInfo;
}
}
if(drpSelHqCountry != null && drpSelHqCountry.type == "select-one")
{
if (drpSelHqCountry.value == "0")
{
var arrFieldErrorInfo = FieldErrorInfo(drpSelHqCountry.id, "A Country of Head Quarters must be selected", "rsSelCountry", drpSelHqCountry.name, "Country of Head Quarters");
arrMoreErrors[arrMoreErrors.length] = arrFieldErrorInfo;
}
}
return (arrMoreErrors);
} 
function submitPage(page, IssuerStatus){
if (ValidateForm(document.frmMain)){ 
setIndustry(document.frmMain);
document.frmMain.hidAction.value = IssuerStatus;
document.frmMain.action = page;
document.frmMain.submit();
return true; 
}
}
function setAddAnother(){
document.frmMain.hidAddAnother.value='Yes';
}
function setCreateDeal(){
document.frmMain.hidCreateDeal.value='Yes';
}
function setIndustry(frm)
{
var sIndustry = new Array();
var s = frm.rsSelIndustry.options[frm.rsSelIndustry.selectedIndex].value;
if (s.indexOf(",") != -1) {
sIndustry = s.split(',');
if (sIndustry[1] == 0) 
frm.hidSector.value = "False";
else
frm.hidSector.value = "True"; 
}
frm.hidIndustryId.value = sIndustry[0];
} 
