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
function savetrade(sSaveTradeInd)
{
if (sSaveTradeInd == "1")
{
var varSaveTrade = self.window.opener.getDocumentElement("hidSaveTrade");
varSaveTrade.value = "1";
}
if (getDocumentElement("hidActionType").value == "Add" && sSaveTradeInd == "0")
self.window.opener.submitPage( null, "AddEqFromSaveTradePopUp");
else
self.window.opener.submitPage( null, "UpdateEqFromSaveTradePopUp");
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
