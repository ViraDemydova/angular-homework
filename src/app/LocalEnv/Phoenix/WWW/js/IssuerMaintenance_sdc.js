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
function submitPage( frm , action )
{
switch (action)
{
case "savechanges" :
if (ValidateForm(frm))
{
setIndustry(frm);
if (frm.hidIsAddingPrivateIssr.value == 'true' || frm.hidIsAddingPublicIssr.value == 'true')
frm.hidAction.value = "Add";
else
frm.hidAction.value = "Update";
frm.action = "IssuerMaintenance_sdc_Action.asp";
frm.method = "post";
frm.submit(); 
}
break;
case "addissrandcreatedael" :
if (ValidateForm(frm))
{
setIndustry(frm);
frm.hidAction.value = "Add";
frm.action = "IssuerMaintenance_sdc_Action.asp";
frm.method = "post";
frm.hidPostURL.value = "IssueMaint_CreateEQDSForm.asp";
frm.submit();	
break; 
}
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
function onCancel(isRoadshow)
{
var frm = document.frmMain;
if (isRoadshow == '1')
{
frm.hidSearchName.value = "";
frm.action = "Roadshow_SDC_CompanySearchResults.asp";
frm.submit();	
}
else
{
frm.action = "IssueMaint_sdc_IssuerSearch.asp";
frm.hidAction.value = frm.hidSDCIssrSearchAction.value;
frm.Issr_Id.value = frm.hidPrevIssrId.value;
frm.submit();
}
}
