<!-- 
function onPageLoad()
{
document.frmMain.sTxtOldPassword.focus();
}
function submitPage(frm)
{
if(ValidateFormPasswords( frm ))
{
frm.action = "/changepassword.asp";
frm.submit(); 
}
}
function hasInvalidChar( str )
{
var re = /[\@\"\'<>\&]+/ ;
return re.test( str );
}
function ValidateFormPasswords(frm){
if ( frm.sTxtNewPassword && frm.sTxtConfirmPassword )
{
var sPassword = frm.sTxtNewPassword.value ;
var sConfPassword = frm.sTxtConfirmPassword.value ;
if ( hasInvalidChar( sPassword ) ) {
alert("Input \"New Password\" may not contain special characters. (&, <, >, \", ', @)");
return false;
}
if ( hasInvalidChar( sConfPassword ) ) {
alert("Input \"Confirm New Password\" may not contain special characters. (&, <, >, \", ', @)");
return false;
}
if ( sPassword.length < 7 ) {
alert("Input \"New Password\" must be at least 7 characters long!");
return false;
}
if ( sConfPassword.length < 7 ) {
alert("Input \"Confirm New Password\" must be at least 7 characters long!");
return false;
}
if ( sPassword != sConfPassword ) {
alert( "Input \"New Password\" and \"Confirm New Password\" must be the same." );
return false;
}
}
return true;
}
function passwordGuidelines()
{
var sUrl = "/asp/user_customization_popup.asp?mode=password_guidelines";
var sStyle = "width=300,height=340,scrollbars=1";
openGeneralPopup( sUrl, '', sStyle );
}
function forgotYourPassword()
{
var sUrl = "/asp/user_customization_popup.asp";
var sStyle = "width=300,height=300,scrollbars=1";
openGeneralPopup( sUrl, '', sStyle );
}
