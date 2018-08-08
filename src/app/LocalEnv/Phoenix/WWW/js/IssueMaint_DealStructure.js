<!-- 
function CheckConditionallyRequiredFields( frm, arrFieldsInError )
{
var arrMoreErrors = new Array();
var Description = frm.sTxtDescription.value.length;
var DescriptionMaxLength = 300;
if ( Description > DescriptionMaxLength ) {
var arrError = FieldErrorInfo("sTxtDescription", 'The Description exceeds the maximum length allowed', "", "", "Description");
arrMoreErrors[arrMoreErrors.length] = arrError;
}
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
if(ValidateForm( frm ))
{ 
frm.action = "/asp/util_submit_action.asp";
frm.hidAction.value = "Update";
frm.submit(); 
}
break;
case "reverttosaved" :
frm.action = "IssueMaint_DealStructure.asp";
frm.submit();
break;
case "cancel" :
frm.action = "/asp/specialIssueMaint_DealDetails.asp";
frm.submit();
break;
}
}
function popSlf(){
sUrl = "IssueMaint_FxRates.asp";
sStyle = "width=900,height=650,scrollbars=yes,toolbar=no,menubar=no,resizable=yes";
openGeneralPopup(sUrl, '', sStyle);
}
function on_select_issueType()
{
var sIssType = new Array();
var s = document.frmMain.selIssueType.options[document.frmMain.selIssueType.selectedIndex].value;
sIssueType = s.split(',');
var sIssTypeCD = sIssueType[1];
var sIssTypeID = sIssueType[0];
var sUrl = 'IssueMaint_DealStructure.asp?IssTypeCD=' + sIssTypeCD + '&IssTypeID=' + sIssTypeID;
window.location.href = sUrl; 
}
function onPageLoad()
{
var CustomerShowOD;
CustomerShowOD = getDocumentElement("hidCustomerShowOD");
if (!CustomerShowOD || CustomerShowOD.value == 0)
return;
if (document.frmMain.hidIssueTypeCd.value == 'CB' || document.frmMain.hidIssueTypeCd.value =='CP')
{
getDocumentElement("ConcurrentOfferingLayer").style.display = "";
getDocumentElement("ConcurrentOfferingLabelLayer").style.display = "";
if (document.frmMain.hidConCurrentInd.value == 'True')
{
document.frmMain.chkConCurrOffering.checked = true;	
getDocumentElement("ConcurrentOfferingDealLayer").style.display = "";
}	
}	
}
function onClickConCurrentOffering(cbConCurrentOffering)
{
if (!cbConCurrentOffering.checked)
{
getDocumentElement("ConcurrentOfferingDealLayer").style.display = "none";
}
else
{
getDocumentElement("ConcurrentOfferingDealLayer").style.display = "";
} 
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
