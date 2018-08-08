<!-- 
function onPageLoad()
{
window.opener.parent.close();
}
function responseEdit(frm)
{
window.open("wire_respond_popUp.asp?hidWireID=" + frm.hidWireID.value,'respond','height=560,width=610,resizable,status,scrollbars');
}
function padNumber(str, length, padChar)
{
var padding = "";
str = str + "";
if (padNumber.arguments.length == 2)
padChar = "0";
for (i = str.length; i < length; i++)
padding += padChar;
return padding + str;
}
function getClientLocalDate()
{
var today = new Date();
var month = today.getMonth();
var date = today.getDate();
var year = today.getFullYear();
return padNumber(month+1, 2) + "/" + padNumber(date, 2) + "/" + year;
}
function submitPage(frm)
{
if (ValidateForm(frm))
{
frm.hidClientLocal_dt.value = getClientLocalDate();	
frm.hidAction.value = 'AddResponse';
frm.method = "POST";
frm.action = "util_submit_action.asp";
frm.submit();
return true;
}
}
