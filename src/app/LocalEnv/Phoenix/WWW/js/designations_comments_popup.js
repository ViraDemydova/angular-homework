<!-- 
function onPageLoad()
{
if (!window.opener.closed)
document.frmMain.sComments.value = window.opener.document.frmMain.elements['hidComments' + document.frmMain.hidCommentsPos.value].value;
}
function save()
{
if(verifyComment())
{
if (!window.opener.closed)
{
var hidCommentsPos = document.frmMain.hidCommentsPos.value;
window.opener.document.frmMain.elements['hidComments' + hidCommentsPos].value = document.frmMain.sComments.value;
window.opener.document.frmMain.elements['img' + hidCommentsPos].alt = document.frmMain.sComments.value;
if (document.frmMain.sComments.value.toString().length == 0)
window.opener.document.frmMain.elements['img' + hidCommentsPos].style.display = 'none';
else
window.opener.document.frmMain.elements['img' + hidCommentsPos].style.display = 'inline';
}
window.close();
}
}
function verifyComment()
{
var sComments = document.frmMain.sComments.value;
if(sComments.length > 99)
{
alert('Comments must be no longer than 99 characters.'); 
document.frmMain.sComments.value = sComments.substring(0, 99);
return false;
}
return true;
}
