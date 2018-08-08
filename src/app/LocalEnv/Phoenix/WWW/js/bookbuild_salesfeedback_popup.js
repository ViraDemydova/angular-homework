<!-- 
function submitPage( frm, action )
{
switch(action)
{
case "save":
if (getDocumentElement("hidOrderFeedbackId"))
{
getDocumentElement("hidOrderFeedbackId").value = sLastestFeedbackId;
frm.action = "/asp/util_submit_action.asp";
frm.hidAction.value = "Update";
frm.submit();
window.opener.document.frmMain.MasterBookCtrl.RefreshFromFxRate();
}
break;
default:
break;
}
window.close();
} 
function getDocumentElement(sElementName)
{
if (document.getElementById)
{
return document.getElementById(sElementName);
}
else if (document.all)
{
return document.all[sElementName];
}
else if (document.layers)
{	
if (document.layers[sElementName])
{
return document.layers[sElementName]; 
}
for(var i=0;i<document.layers.count-1;i++)
{
if (document.layers[i].elements[sElementName])
{
return document.layers[i].elements[sElementName];
}
} 
}
return 0;
}
