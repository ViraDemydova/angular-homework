function Submit()
{
var state = "";
for (index = 0; index < document.forms["frmMain"].elements.length; index++) 
{
if (document.forms["frmMain"].elements[index].type == "select-one")
{
state = state + document.forms["frmMain"].elements[index].name;
state = state + "=" + document.forms["frmMain"].elements[index].value + ";";
} 
}
document.forms["frmMain"].hidStatusStr.value = state;
document.forms["frmMain"].method = "POST";
document.forms["frmMain"].action = "util_submit_action.asp";
document.forms["frmMain"].submit(); 
}
