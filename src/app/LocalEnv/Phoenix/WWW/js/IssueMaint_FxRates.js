<!-- 
function CheckConditionallyRequiredFields( frm, arrFieldsInError )
{
var arrMoreErrors = new Array();
return (arrMoreErrors);
} 
function CustomValidation( frm, arrFieldsInError )
{
var arrMoreErrors = new Array();
for(var j = 0; j< frm.elements.length; ++j)
{
var vControl = frm[j];
vName = vControl.name;
vInfo = MetaInfoFromName(vName);
vTypePrefix = vInfo[2];
vPureName = vInfo[3];
vLabelId = "lbl" + vPureName;
if(frm[j].type!="hidden") 
{
var arrFieldErrorInfo = FieldErrorInfo(vTypePrefix+vPureName, new String, vLabelId, vName, vInfo[5]);
var sValue = vControl.value;
if(vName.indexOf("flt")==0)
{
if(!CheckNumericValueRange(sValue,11))
{
arrFieldErrorInfo[2] = arrFieldErrorInfo[2] + "- This field must be less than 100,000,000,000. Please change it.";
arrMoreErrors[arrMoreErrors.length] = arrFieldErrorInfo;
}
}
}
}
return (arrMoreErrors);
} 
function submitPage( frm )
{
if(ValidateForm( frm ))
{
if( document.frmMain.hidRefererPage.value == "PricingPage" )
{
var str="";
var count = document.frmMain.hidNumOfCurrency.value;
for(var i=1; i <= count; i++)
{
str += document.frmMain.all("ccy_cd"+i).innerText;
str += "*";
str += document.frmMain.all("fltAtOffering"+i).value;
if( i != count )
{
str +="^";
}
}
self.window.opener.UpdateFXRates(str);
}
document.frmMain.submit();
}
}
function ToggleCurrencySection() 
{
var imgObj = document.images['ImExCurrency'];
if (divAdditionalRates.style.display == 'none') {
divAdditionalRates.style.display = '';
imgObj.src = "../images/collapse.gif";
}
else 
{
divAdditionalRates.style.display = 'none';
imgObj.src = "../images/expand.gif";
}
}
