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
case "delete" :
{
frm.hidAction.value = "Delete";
frm.method = "POST";
frm.action = "util_submit_loc_action.asp";
frm.submit(); 
}
break; 
case "update" :
{
if (ValidateForm( document.frmMain ) )
{
frm.hidAction.value = "Update";
frm.method = "POST";
frm.action = "util_submit_action.asp";
frm.submit();	
} 
}
break; 
case "close" :
{
window.close(); 
}
break; 
case "cancel" :
{
window.location.reload(true);
} 
break; 
}
}
function selectAll(sel, chk)
{
if (chk.checked)
{
for (var i=0; i<sel.length; i++)
sel.options[i].selected = true;
}
}
function unSelectAll(sel, chk)
{
for (var i=0; i<sel.length; i++)
sel.options[i].selected = false;
chk.checked = false;
}
function checkSelectAll(sel, chk)
{
if (chk.checked)
{
for (var i=0; i<sel.options.length; i++)
{
if (sel.options[i].selected == false)
{
chk.checked = false;
break;
}
}
}
}
