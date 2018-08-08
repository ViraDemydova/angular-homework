<!-- 
function onPageLoad()
{
}
function CloseWindow()
{
window.close() ;
}
function submit()
{
var frm = document.frmMain;
if (frm.txtListDesc.value.length > 2000)
{
alert("Description cannot be more than 2000 chars");
return;
}
frm.submit() ;
}
