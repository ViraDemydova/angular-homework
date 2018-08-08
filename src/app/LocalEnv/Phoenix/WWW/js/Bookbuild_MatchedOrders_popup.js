<!-- 
function submitPage( frm, action )
{
frm.hidInputXML.value = "<data><base_ord_id>" + frm.hidBaseOrdId.value + "</base_ord_id></data>";
frm.action = "/asp/util_submit_action.asp";	
switch (action)
{
case "unmatch" :
frm.hidAction.value = "RemoveMatch2";
frm.submit();
break;
case "updatedominant" :
frm.hidAction.value = "UpdateDominant";
frm.submit();
break;
}	
} 
function onPageLoad()
{
var frmMain = document.forms["frmMain"];
var radDominant = frmMain.radDominant;
var Count = 0;
for(i=0; i<radDominant.length; i++)
{
if (frmMain.radDominant[i].disabled == false)
{
Count++;
}
}
if (Count < 2)
{ 
frmMain.btnSave.style.display = "none";
}
}
