<!-- 
function CheckConditionallyRequiredFields( frm, arrFieldsInError )
{
var arrMoreErrors = new Array();
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
case "update" :
{
if (!window.opener.closed)
{
if (document.frmMain.hidFilterId.value = window.opener.document.frmMain.hidFilterId.value)
{
if (document.frmMain.hidFilterId.value = window.opener.document.frmMain.selSelectView.options[window.opener.document.frmMain.selSelectView.selectedIndex].value)
{
window.opener.document.frmMain.selSelectView.options[window.opener.document.frmMain.selSelectView.selectedIndex].text = frm.sName.value;
window.opener.document.frmMain.hidFilterName.value = frm.sName.value;
}
}
}
}
window.close();
break; 
case "close" :
{
window.close(); 
}
break; 
}	
}
