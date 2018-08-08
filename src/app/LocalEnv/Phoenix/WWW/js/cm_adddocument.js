<!-- 
function CheckConditionallyRequiredFields( frm, arrFieldsInError )
{
var arrMoreErrors = new Array();
return (arrMoreErrors);
} 
function CustomValidation( frm, arrFieldsInError )
{
var arrMoreErrors = new Array();
if(frm.chkSales.checked == true)
{
if(frm.hidSalesGblRegions.value == "")
{
arrMoreErrors[arrMoreErrors.length] = FieldErrorInfo("", "No sales user have been permissioned", "", "chkSales", "Add/Remove Access");
}
}
return (arrMoreErrors);
} 
function submitForm( oForm, strURL )
{	
if( ValidateForm( oForm ) )	
{
if((oForm.rsDocAction.value == "Add") && !VerifyProspAdd(oForm) ){return;}
oForm.action = strURL;
oForm.submit();
}
}
function setDescriptionName()
{
var oForm = document.frmCMAddDocument;
var strDocType = oForm.DocType.value;
var strFile = oForm.rsDocumentName.value;
var strDisplay = oForm.rsDisplayName.value;
var nIndex = strFile.lastIndexOf("\\");
if( nIndex != -1 )
strFile = strFile.substr(nIndex + 1);
nIndex = strFile.indexOf(".");
if( nIndex != -1 )
strFile = strFile.substring(0, nIndex);
if( strDisplay == "" )
{
oForm.rsDisplayName.value = strFile;
}	
return true;
}
function setFilter(bFilter)
{
if (bFilter)
{
for(var i=0; i<arrAllTranches.length; i++)
{
var element = arrAllTranches[i][0];
var issueState = arrAllTranches[i][1];
if (issueState >= 30)
element.disabled = true;
}
}
else
{
for(var i=0; i<arrAllTranches.length; i++)
{
var element = arrAllTranches[i][0];
element.disabled = false;
} 
}
}
function deleteDocument()
{
var oForm = document.frmCMAddDocument;
oForm.rsDocAction.value = "Delete";
oForm.action = "cm_action.asp";
oForm.submit();
}
function editGlobalRegions()
{
var sUrl = "cm_globalregions_popUp.asp?Regions=" + document.frmCMAddDocument.hidSalesGblRegions.value;
var sStyle = "width=700,height=200,scrollbars=1,resizable=1";
openGeneralPopup( sUrl, '', sStyle );	
}
function ShowHideAddRemAccess(isSSB)
{
if(document.frmCMAddDocument.chkSales.checked == true)
{
if ( isSSB=="true" )
document.frmCMAddDocument.hidSalesGblRegions.value = document.frmCMAddDocument.hidGlobalRegions.value;
AddRemAccess.style.display = 'block';
}
else
{
if ( isSSB=="true" )
document.frmCMAddDocument.hidSalesGblRegions.value = "";
AddRemAccess.style.display = 'none';
}
}
function VerifyProspAdd(frm)
{
if( frm.hidDocTypeCode && frm.hidDocTypeCode.value == "PROSP")
{
if(!frm.elements["prosp_final_only"])
{
if(frm.prospectus_style[0].checked == true)
{
if(frm.hidPrelimProspCount)
{
if(frm.hidPrelimProspCount.value > 0)
{	
return confirm(frm.hidAddPrelimMsg.value);
}
}
}
if(frm.prospectus_style[1].checked == true)
{
if(frm.hidFinalProspCount)
{
if(frm.hidFinalProspCount.value > 0)
{
return confirm(frm.hidAddFinalMsg.value);
}
}
}
}
else
{
if(frm.hidFinalProspCount)
{
if(frm.hidFinalProspCount.value > 0)
{
return confirm(frm.hidAddFinalMsg.value);
}
}
}
return true;
}
return true;
}
function showAvailableMimeTypes()
{
window.open('cm_supported_mime_types_popup.asp', 'preview','height=500,width=600,scrollbars');
}
