<!-- 
function onPageLoad()
{
}
function hasInvalidChar( str )
{
var re = /[\@\"\'<>\&]+/
return re.test( str )
}
function CheckConditionallyRequiredFields( frm, arrFieldsInError )
{
var arrMoreErrors = new Array();
var arrError;
var count = 0;
if ( (frm.sTxtOldPassword.value == "" && (frm.sTxtNewPassword.value != "" || frm.sTxtNewPassword2.value != "")) || (frm.sTxtNewPassword.value == "" && (frm.sTxtOldPassword.value != "" || frm.sTxtNewPassword2.value != "")) || (frm.sTxtNewPassword2.value == "" && (frm.sTxtOldPassword.value != "" || frm.sTxtNewPassword.value != "")) )
{
arrError = FieldErrorInfo("sTxtOldPassword", 'Please enter all information in all password textboxes.', "", "sTxtOldPassword", "Password Error");
arrMoreErrors[count] = arrError;	
}
if ( frm.sTxtNewPassword.value != "" && frm.sTxtNewPassword2.value != "" )
{
var sPassword = frm.sTxtNewPassword.value
var sConfPassword = frm.sTxtNewPassword2.value
if ( hasInvalidChar( sPassword ) ) 
{
arrError = FieldErrorInfo( "sTxtNewPassword", "May not contain special characters. (&, <, >, \", ', @)", "", "sTxtNewPassword", "New Password" )
arrMoreErrors[ count ] = arrError
count++
} 
if ( hasInvalidChar( sConfPassword ) ) 
{
arrError = FieldErrorInfo( "sTxtNewPassword2", "May not contain special characters. (&, <, >, \", ', @)", "", "sTxtNewPassword2", "Confirm New Password" )
arrMoreErrors[ count ] = arrError
count++
}
if ( sPassword.length < 7 )
{
arrError = FieldErrorInfo( "sTxtNewPassword", "Must be at least 7 characters long", "", "sTxtNewPassword", "New Password" )
arrMoreErrors[ count ] = arrError
count++
}
if ( sConfPassword.length < 7 )
{
arrError = FieldErrorInfo( "sTxtNewPassword2", "Must be at least 7 characters long", "", "sTxtNewPassword2", "Confirm New Password" )
arrMoreErrors[ count ] = arrError
count++
}
if ( sPassword != sConfPassword )
{
arrError = FieldErrorInfo( "sTxtNewPassword", "Password and confirm password must be the same.", "", "sTxtNewPassword", "New Password" )
arrMoreErrors[ count ] = arrError
count++
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
case "SaveChanges" :
if(ValidateForm( frm ))
{
frm.action = "user_customization_action.asp";
frm.hidAction.value = "Update";
frm.submit(); 
}
break;
case "RevertToSaved" :
window.location.reload();
break;
case "Cancel" :
frm.action = "/asp/_template.asp";
frm.submit();
break;
case "AddReg" :
frm.action = "/asp/_template.asp";
frm.hidAction.value = "Add";
frm.submit();
break;
}
}
function DirtyMe(area){
switch (area)
{
case "Language" :
document.frmMain.hidDirtyLanguage.value = "True";
break;
case "StartPage" :
document.frmMain.hidDirtyStartPage.value = "True";
break;
case "Password" :
document.frmMain.hidDirtyPassword.value = "True";
break;
case "DealLevelStartPage" :
document.frmMain.hidDirtyDealLevelStart.value = "True";
break;
case "MixedContent" :
document.frmMain.hidDirtySupportMixedConent.value = "True";
break;
case "RemoteScriptMethod" :
document.frmMain.hidDirtyRemoteScriptMethod.value = "True";
break;
case "FastFindMethod" :
document.frmMain.hidDirtyFastFindMethod.value = "True";
break;
case "SalesWorkSheetRegion" :
document.frmMain.hidDirtySalesWorkSheetRegion.value = "True";
break;
case "DataFormat" :
document.frmMain.hidDataFormat.value = "True";
if (document.frmMain.sSelDataFormat.selectedIndex == 0)
{
showArea("EnglishUSExample");
hideArea("EnglishUKExample");
hideArea("FrenchExample");
hideArea("JapaneseExample");
hideArea("PortugueseExample");
}
if (document.frmMain.sSelDataFormat.selectedIndex == 1)
{
showArea("EnglishUKExample");
hideArea("EnglishUSExample");
hideArea("FrenchExample");
hideArea("JapaneseExample");
hideArea("PortugueseExample");
}
if (document.frmMain.sSelDataFormat.selectedIndex == 2)
{
showArea("FrenchExample");
hideArea("EnglishUKExample");
hideArea("EnglishUSExample");
hideArea("JapaneseExample");
hideArea("PortugueseExample");
}
if (document.frmMain.sSelDataFormat.selectedIndex == 3)
{
showArea("JapaneseExample");
hideArea("EnglishUKExample");
hideArea("EnglishUSExample");
hideArea("FrenchExample");
hideArea("PortugueseExample");
}
if (document.frmMain.sSelDataFormat.selectedIndex == 4)
{
showArea("PortugueseExample");
hideArea("EnglishUKExample");
hideArea("EnglishUSExample");
hideArea("FrenchExample");
hideArea("JapaneseExample");
}
break;
}
}
function hideArea(areaName){
var elthis = eval(areaName)
elthis.style.display = 'none';
}
function showArea(areaName){ 
var elthis = eval(areaName)
elthis.style.display = '';
}
function passwordGuidelines()
{
var sUrl = "user_customization_popup.asp?mode=password_guidelines";
var sStyle = "width=300,height=340,scrollbars=1";
openGeneralPopup( sUrl, '', sStyle );
}
function popUpWindow()
{
var sUrl = "user_customization_popup.asp";
var sStyle = "width=300,height=300,scrollbars=1";
openGeneralPopup( sUrl, '', sStyle );
}
function setDateFormat(cbLang)
{
var df = "";
switch (cbLang.options[cbLang.options.selectedIndex].value)
{
case "EN":
case "CA":
df = "1033";
break;
case "UK":
df = "2057";
break;
}
var cbDF = document.frmMain.sSelDataFormat;
if (cbDF != null)
{
for (var i=0; i<cbDF.length; i++)
{
if (cbDF.options[i].value == df)
{
cbDF.options[i].selected = true;
break;
}
}	
}
}
function setLanguage(cbDF)
{
var lang = "";
switch (cbDF.options[cbDF.options.selectedIndex].value)
{
case "1033":
lang = "EN";
break;
case "2057":
lang = "UK";
break;
case "1036":
lang = "FR";
break;
case "1041":
lang = "JA";
break; 
}
var cbLang = document.frmMain.sSelLanguage;
if (cbLang != null)
{
for (var i=0; i<cbLang.length; i++)
{
if (cbLang.options[i].value == lang)
{
cbLang.options[i].selected = true;
break;
}
}	
}
}
