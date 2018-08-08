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
case "savechanges" :
frm.shidOrderedDocTypes.value = "";
var i;
for (i=0; i<frm.selDocType.length; i++)
{
if (i == frm.selDocType.length - 1)
frm.shidOrderedDocTypes.value += frm.selDocType.options[i].value;
else
frm.shidOrderedDocTypes.value += frm.selDocType.options[i].value + ",";
}
frm.method = "POST";
frm.action = "/asp/util_submit_action.asp";
frm.submit();
window.close();
window.opener.location = "mastertables_documenttypes.asp?hidAction=viewAll";
break;
case "list" :
frm.method = "POST";
frm.action = "/asp/mastertables_documenttypes_popup.asp";
frm.submit();
break;
case "reverttosaved" :
window.location.reload();
break;
case "cancel" :
window.close();
break;
case "addreg" :
frm.action = "/asp/_template.asp";
frm.submit();
break;
}
}
function moveup()
{
if (document.frmMain.selDocType.selectedIndex <= 0)
return;
if (document.frmMain.selDocType.length <= 1)
return;
swap(document.frmMain.selDocType.options[document.frmMain.selDocType.selectedIndex - 1], document.frmMain.selDocType.options[document.frmMain.selDocType.selectedIndex]);
} 
function movedown()
{
if (document.frmMain.selDocType.selectedIndex >= document.frmMain.selDocType.length - 1 || document.frmMain.selDocType.selectedIndex <= -1)
return;
if (document.frmMain.selDocType.length <= 1)
return;
swap(document.frmMain.selDocType.options[document.frmMain.selDocType.selectedIndex + 1], document.frmMain.selDocType.options[document.frmMain.selDocType.selectedIndex]);
}
function swap(opt1, opt2)
{ 
var tempText = opt1.text;
var tempValue = opt1.value;
opt1.text = opt2.text;
opt1.value = opt2.value;
opt2.text = tempText;
opt2.value = tempValue;
opt1.selected = true;
}
