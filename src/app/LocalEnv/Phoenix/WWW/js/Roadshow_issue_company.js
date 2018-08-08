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
return (arrMoreErrors);
} 
function submitPage(frm, IssuerStatus){
frm.hidProgID.value = "Roadshow_usr.RoadshowEntity";
frm.hidAction.value = IssuerStatus;
frm.action = "/asp/util_submit_action.asp";
frm.submit();
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
