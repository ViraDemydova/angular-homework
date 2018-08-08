<!-- 
function SendProspectus()
{
var frm = document.frmMain;
var sEmails = CleanupInputEmails(frm.txtEmails.value);
if (sEmails.length == 0)
{
alert("Please enter a contact email.");
return;
}
frm.hidProspectusEmailAddr.value = sEmails;
frm.btnSendeProspectus.disabled=true;
frm.submit();
}
function trimString (str) {
return str.replace(/^\s+/g, '').replace(/\s+$/g, '');
}
function CleanupInputEmails(sInput)
{
var sEmail = "";
var sEmails = "";
var aEmails;
aEmails = sInput.split(";");
if (aEmails != null && aEmails.length > 0)
{
for (var i=0; i < aEmails.length; i++)
{
sEmail = trimString(aEmails[i]);
if (sEmail.length > 0)
sEmails = sEmails + sEmail + ";";
}
}
return sEmails;
}
