<!-- 
var bNeedToSelectPrivateType = 0;
function onPageLoad()
{
if (frmMain.sOther.value == "")
frmMain.sOther.disabled=true;
}
function CheckConditionallyRequiredFields( frm, arrFieldsInError )
{
var arrMoreErrors = new Array();
for (var i=0; i<frm.hidTotalGeneralRegType.value; i++)
{
if (frm.selGeneralRegType[i].checked)
{
return (arrMoreErrors);
}
}
var arrError = FieldErrorInfo("", "", "", "selGeneralRegType[0]", "Please select a Registration Type.");
arrError[2] = '';
arrMoreErrors[0] = arrError;
return (arrMoreErrors);
} 
function CustomValidation( frm, arrFieldsInError )
{
var arrMoreErrors = new Array();
return (arrMoreErrors);
} 
function submitPage( frm , action, prdid )
{
var mode = frm.hidAction.value;
var pos = frm.hidPosition.value;
var sReturnToAspx = GetQueryStringParameter('returnToAspx');
var bReturnToAspx = false;
if (sReturnToAspx == "True")
{
bReturnToAspx = true;
}
switch (action)
{
case "Add" :
if (bNeedToSelectPrivateType == 1)
DisplayRegRuleMsg();
else if(ValidateForm( frm ))
{
if (mode == "createreg" ) {
if(bReturnToAspx)
{
frm.action = "/aspx/UI/Deal/ProductDetails.aspx?ID=" + prdid;
}
else
{
frm.action = "/asp/specialIssueMaint_CreateProduct.asp?Mode=createreg&pos=" + pos;
}
frm.submit();
}
else {
frm.action = "/asp/specialutil_submit_action.asp";
frm.hidAction.value = "Add";
frm.submit();
}
}
break;
case "AddAnother" :
if (bNeedToSelectPrivateType == 1)
DisplayRegRuleMsg();
else if(ValidateForm( frm ))
{
frm.action = "/asp/specialutil_submit_action.asp";
frm.hidAction.value = "Add";
frm.hidAddAnotherReg.value = "1";
frm.submit(); 
}
break;
case "Update" :
if (bNeedToSelectPrivateType == 1)
DisplayRegRuleMsg();
else if(ValidateForm( frm ))
{
if (mode == "editreg" ) {
if(bReturnToAspx)
{
frm.action = "/aspx/UI/Deal/ProductDetails.aspx?ID=" + prdid;
}
else
{
frm.action = "/asp/specialIssueMaint_CreateProduct.asp?Mode=editreg&pos=" + pos;
}
frm.submit();
}
else {
frm.action = "/asp/specialutil_submit_action.asp";
frm.hidAction.value = "Update";
frm.submit();
}
}
break;
case "RevertToSaved" :
window.location.reload();
break;
case "Cancel" :
if (prdid > 0 ) {
if(bReturnToAspx)
{
frm.action = "/aspx/UI/Deal/ProductDetails.aspx?ID=" + prdid;
}
else
{
frm.action = "specialIssueMaint_EditProduct.asp?Mode=Edit&ID="+prdid;
}
frm.submit();
}
else {
frm.action = "/asp/specialIssueMaint_CreateProduct.asp?Mode=cancelreg";
frm.submit();
}
break;
}
}
var sLastSelectedTag = "";
var bPrivateSelError = false;
function setRegDoc()
{ 
var sSelectedTag = "";
for (var i=0; i<document.frmMain.hidTotalRegTypes.value; i++)
{
if (document.frmMain.selGeneralRegType[i].checked)
{
sSelectedTag = document.frmMain.selGeneralRegType[i].value + "_" + document.frmMain.selCountry.value;
break;
}
}
var sPrivateTypeID = document.frmMain.hidPrivateTypeID.value;
var sResult = sSelectedTag.split("_");
if (sResult[0] != sPrivateTypeID || document.frmMain.selCountry.value != 840)
{
bNeedToSelectPrivateType = 0;
}
document.frmMain.hidRegDoc.value = ""; 
if (document.all["div_" + sSelectedTag] != null )
{
onChangeRegDoc(document.all["sel_" + sSelectedTag]);
document.all["div_" + sSelectedTag].style.display = "block";
}
sResult = sLastSelectedTag.split("_");
if (document.all["div_" + sLastSelectedTag] != null )
{
document.all["div_" + sLastSelectedTag].style.display = "none";
if (bPrivateSelError)
document.all["div_" + sLastSelectedTag].style.display = "block";
}
sLastSelectedTag = sSelectedTag;
bPrivateSelError = false;
} 
function onChangeRegDoc(selRegDoc) 
{
var sPrivateTypeID = document.frmMain.hidPrivateTypeID.value;
var sResult = selRegDoc.name.split("_");
document.frmMain.hidRegDoc.value = selRegDoc.value;
if (sResult[1] == sPrivateTypeID && selRegDoc.value.length == 0 && document.frmMain.selCountry.value == 840)
bNeedToSelectPrivateType = 1;
else
bNeedToSelectPrivateType = 0;
}
function EnableOtherSettlementLocation()
{
if (frmMain.chkOther.checked == true)
{
frmMain.sOther.disabled=false;
frmMain.sOther.focus();
}
else
{
frmMain.sOther.value="";
frmMain.sOther.disabled=true;
}
}
function CheckOtherSettlementLocation()
{
if (frmMain.sOther.value == "")
{
frmMain.chkOther.checked = false;
frmMain.sOther.disabled=true;
}
}
function DisplayRegRuleMsg()
{
alert("Please select a rule for Private registration type!");
bPrivateSelError = true;
}
function GetQueryStringParameter( name )
{
var regexS = "[\\?&]"+name+"=([^&#]*)";
var regex = new RegExp( regexS );
var tmpURL = window.location.href;
var results = regex.exec( tmpURL );
if( results == null )
return "";
else
return results[1];
}
