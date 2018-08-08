<!-- 
function onPageLoad()
{
}
function submitPage(frm)
{
if(ValidateForm( frm ))
{
frm.action = "cadmin_reset_password.asp";
frm.submit(); 
}
}
function hasInvalidChar( str )
{
var re = /[\@\"\'<>\&]+/ ;
return re.test( str );
}
function ValidateForm(frm){
if ( frm.txtPassword && frm.txtConfPassword )
{
var sPassword = frm.txtPassword.value ;
var sConfPassword = frm.txtConfPassword.value ;
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
