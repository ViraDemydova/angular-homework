<!-- 
function onOK()
{
if (document.frmMain.hidEditFeePct.value == '1')
{
if (document.frmMain.optGrossSpread[0].checked)
{
window.opener.ContinueSubmit();
}
else if (document.frmMain.optGrossSpread[1].checked)
window.close();
}
else
{
if (document.frmMain.optGrossSpread[0].checked)
{
window.opener.UnlockGrossSpread();
window.close();
}
else if (document.frmMain.optGrossSpread[1].checked)
{
window.opener.ContinueSubmit();
}
else if (document.frmMain.optGrossSpread[2].checked)
window.close();
}
}
