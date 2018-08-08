<!-- 
function onPageLoad()
{
}
function onEnter()
{
if ((document.frmMain.rtxtWireName.value !="") && (document.frmMain.rtxtWireTemplateText.value !=""))
{
submitPage(document.frmMain);
}
}
function submitPage(frm)
{
if (ValidateForm(frm))
{
frm.hidAction.value = "Add";
frm.method = "POST";
frm.action = "util_submit_action.asp";
frm.submit();
return true;
}
}
