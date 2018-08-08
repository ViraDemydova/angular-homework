<!-- 
function onPageLoad()
{
if (document.frmMain.hidPassThru.value == 'true')
PopulateIssuer();
else
document.frmMain.sTxtIssuerName.focus();
}
function CheckConditionallyRequiredFields( frm, arrFieldsInError )
{
var arrMoreErrors = new Array();
if ( frm.hidAction.value == "Find" && frm.selSearchType.options[frm.selSearchType.selectedIndex].value == "IssrNm" && frm.sTxtIssuerName.value.length < 3 ) 
{
var arrError = FieldErrorInfo("sTxtIssuerName", 'A minimum of 3 characters is needed for an Issuer Name Search', "", "sTxtIssuerName", "Issuer Name Search");
arrMoreErrors[arrMoreErrors.length] = arrError;
} 
if ( frm.hidAction.value == "Find" && frm.selSearchType.options[frm.selSearchType.selectedIndex].value == "Ticker" && frm.sTxtIssuerName.value.length < 1 ) 
{
var arrError = FieldErrorInfo("sTxtIssuerName", 'A minimum of 1 character is needed for an Ticker Search', "", "sTxtIssuerName", "Ticker Search");
arrMoreErrors[arrMoreErrors.length] = arrError;
} 
return (arrMoreErrors);
} 
function CustomValidation( frm, arrFieldsInError )
{
var arrMoreErrors = new Array();
return (arrMoreErrors);
} 
function onSubmit()
{
var frm = document.frmMain;
if (frm.hidAction.value == "")
frm.hidAction.value = "Find";
if (!ValidateForm(frm))
{
frm.hidAction.value = "";
return false;
}
if (frm.hidAction.value == "Find")
{
frm.hidSearchName.value = frm.sTxtIssuerName.value;
frm.hidSelectedIssr.value = "";
var selectedIndex = frm.sIssuerCountry.options.selectedIndex;
if (selectedIndex >= 0)
frm.hidSearchCountry.value = frm.sIssuerCountry.options[selectedIndex].value;
}
return true;	
}
function submitPage(frm, action)
{
frm.hidAction.value = action;
switch (action)
{
case "Find" : 
if (ValidateForm(frm))
{
onSubmit();
frm.submit();
}
break;
}
frm.hidAction.value = "";
}
function IssuerMaintenance(sMstrId, sIssrId)
{
var frm = document.frmMain;
frm.Master_Id.value = sMstrId;
frm.Issr_Id.value = sIssrId;
if (sIssrId.length == 0)
frm.hidAction.value = "Add";
else
frm.hidAction.value = "Update";
frm.hidPostURL.value = "Roadshow_sdc_CompanySearchResults.asp";	
frm.action = "IssuerMaintenance_sdc.asp";
frm.submit();	
}
function DblClickSeachResults()
{
var frm = document.frmMain;
var i;
if (frm.selIssuerResult.selectedIndex != -1)
{
if (frm.selIssuerResult.options[frm.selIssuerResult.selectedIndex].value != "0")
{
tblsearchresults.style.display="inline";
for (i = 3; i < tblsearchresults.rows.length; i++)
tblsearchresults.rows.item(i).style.display = "none";
tblsearchresults.rows.item(frm.selIssuerResult.selectedIndex + 3).style.display = "inline";
}
}
}
function OnCompanySelected(sName,sMstrId,sIssuerId, sCntryId)
{
var frm = document.frmMain;
frm.IssuerName.value = sName;
frm.Master_Id.value = sMstrId;
if (sIssuerId.length == 0)
{
frm.hidAction.value = "AddPublicIssuer";
frm.hidIssuerCntryId.value = sCntryId;
frm.hidPassThru.value = 'true';
frm.action = "IssuerMaintenance_SDC_Action.asp";
frm.submit();
}
else
{
frm.IssuerName.value = sName;
frm.Issr_Id.value = sIssuerId;
PopulateIssuer();
}
}
function PopulateIssuer()
{
var sName = document.frmMain.IssuerName.value;
var sIssuerId = document.frmMain.Issr_Id.value;
window.parent.opener.document.frmMain.hidIssuerId.value="";
window.parent.opener.document.frmMain.hidEntityID.value="";
window.parent.opener.SaveSessionDataAndReload("", "", sName, sName, 'E',sIssuerId, window.parent.opener.document.frmMain.hidEntityID.value);
window.close();
}
