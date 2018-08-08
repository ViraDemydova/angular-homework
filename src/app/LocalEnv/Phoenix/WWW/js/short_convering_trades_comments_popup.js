<!-- 
function onPageLoad()
{
var hidPositionIndex = getDocumentElement("hidPositionIndex");
var stComments = self.window.opener.getDocumentElement("hidComments"+hidPositionIndex.value);
getDocumentElement("sComments").value= stComments.value;
}
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
function saveComments()
{
var sPositionIndex = getDocumentElement("hidPositionIndex").value;
var hidComments = self.window.opener.getDocumentElement("hidComments"+sPositionIndex);
var divComments = self.window.opener.getDocumentElement("divComments"+sPositionIndex);
var iconComments = self.window.opener.getDocumentElement("iconComments"+sPositionIndex);
var hidDirtyF = self.window.opener.getDocumentElement("hidDirtyF"+sPositionIndex);
var sComment = getDocumentElement("sComments").value;
if (sComment.length > 255)
{
alert("Comment should not be greater than 255 characters.");
return;
}
hidComments.value = getDocumentElement("sComments").value;
divComments.title = hidComments.value;
iconComments.style.display = (hidComments.value.length > 0) ? "block" : "none";
self.window.opener.onUpdateDirtyFlag(sPositionIndex);
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
