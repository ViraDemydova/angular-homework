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
frm.hidOrderedBrokerID.value = "";
var i;
for (i=0; i<frm.selBroker.length; i++)
{
if (i == frm.selBroker.length - 1)
frm.hidOrderedBrokerID.value += frm.selBroker.options[i].value;
else
frm.hidOrderedBrokerID.value += frm.selBroker.options[i].value + ",";
}
frm.method = "POST";
frm.action = "util_submit_action.asp";
frm.submit();
//window.close();	
break;
case "reverttosaved" :
//window.location.reload();	
window.history.back();
break;
case "back" :
//window.close();	
frm.method = "POST";
frm.action = "syndpart_edit_grp_part.asp"
frm.submit();
break;
case "addreg" :
frm.action = "/asp/_template.asp";
frm.submit();
break;
}
}
function moveup()
{
if (document.frmMain.selBroker.selectedIndex <= 0)
return;
if (document.frmMain.selBroker.length <= 1)
return;
swap(document.frmMain.selBroker.options[document.frmMain.selBroker.selectedIndex - 1], document.frmMain.selBroker.options[document.frmMain.selBroker.selectedIndex]);
} 
function movedown()
{
if (document.frmMain.selBroker.selectedIndex >= document.frmMain.selBroker.length - 1 || document.frmMain.selBroker.selectedIndex <= -1)
return;
if (document.frmMain.selBroker.length <= 1)
return;
swap(document.frmMain.selBroker.options[document.frmMain.selBroker.selectedIndex + 1], document.frmMain.selBroker.options[document.frmMain.selBroker.selectedIndex]);
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
