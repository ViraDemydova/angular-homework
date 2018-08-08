<!-- 
function onPageLoad()
{
if (!window.opener.closed)
{
document.frmMain.comments.value = window.opener.document.frmMain.AccountingRecapCtrl.GetSyndicateComment();
document.frmMain.comments.focus();
}
}
function submitPage( frm, action )
{
switch(action)
{
case "save":
window.opener.document.frmMain.AccountingRecapCtrl.UpdateSyndicateCommentFromPopup(frm.comments.value);
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
function validateCommentLength( textArea, isPaste )
{
var len = textArea.value.length;
if ( isPaste==true ) {
len += window.clipboardData.getData("Text").length;
}
if ( len>=1000 ) {
alert("The text in the comment field may not exceed 1000 characters.");
event.returnValue = false; 
}
}
