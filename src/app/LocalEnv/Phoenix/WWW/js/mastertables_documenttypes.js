<!-- 
function onPageLoad()
{
menuShow('mastertables', 'tophide');
var arrDealLevelInd = document.frmMain.deal_level_ind;
if ( arrDealLevelInd != null )
{
if ( arrDealLevelInd[0].checked && !arrDealLevelInd[0].disabled )
onClickDealLevelInd(0);
else if (arrDealLevelInd[1].checked && !arrDealLevelInd[1].disabled )
onClickDealLevelInd(1);
}
}
function CheckConditionallyRequiredFields( frm, arrFieldsInError )
{
var arrMoreErrors = new Array();
return (arrMoreErrors);
} 
function CustomValidation( frm, arrFieldsInError )
{ 
var arrMoreErrors = new Array();
if (frm.hidAction.value == "Delete" && frm.ihidDocTypeID.value == "")
{
var arrError = FieldErrorInfo("", "", "", "iRequestID", "Please select an item you would like to delete.");
arrError[2] = '';
arrMoreErrors[0] = arrError;
return (arrMoreErrors);
}	
if (frm.hidAction.value == "Update" || frm.hidAction.value == "Add")
{ 
if (frm.sName.value.length == 0)
{
var arrError = FieldErrorInfo("", "", "", "sName", "Please enter a Document Type Name");
arrError[2] = '';
arrMoreErrors[0] = arrError;	
return (arrMoreErrors);
} 
if (frm.sName.value.length > 64)
{
var arrError = FieldErrorInfo("", "", "", "sName", "Please do not enter more than 64 characters for Document Type Name");
arrError[2] = '';
arrMoreErrors[0] = arrError;	
return (arrMoreErrors);
}
if (frm.sCode.value.length == 0)
{
var arrError = FieldErrorInfo("", "", "", "sCode", "Please enter a Code");
arrError[2] = '';
arrMoreErrors[0] = arrError;	
return (arrMoreErrors);
} 
if (frm.sCode.value.length > 12)
{
var arrError = FieldErrorInfo("", "", "", "sCode", "Please do not enter more than 12 characters for Code");
arrError[2] = '';
arrMoreErrors[0] = arrError;	
return (arrMoreErrors);
}	
if (!frm.deal_level_ind[0].checked && !frm.deal_level_ind[1].checked)
{
var arrError = FieldErrorInfo("", "", "", "deal_level_ind[0]", "Please select a Level.");
arrError[2] = '';
arrMoreErrors[0] = arrError;	
return (arrMoreErrors);
} 
if (!frm.sDocumentType[0].checked && !frm.sDocumentType[1].checked && !frm.sDocumentType[2].checked && !frm.sDocumentType[3].checked && document.frmMain.deal_level_ind[0].checked)
{
var arrError = FieldErrorInfo("", "", "", "sDocumentType[0]", "Please select a Document type.");
arrError[2] = '';
arrMoreErrors[0] = arrError;	
return (arrMoreErrors);
} 
if (!frm.sDocumentType[0].checked && !frm.sDocumentType[2].checked && document.frmMain.deal_level_ind[1].checked)
{
var arrError = FieldErrorInfo("", "", "", "sDocumentType[0]", "Please select a Document type.");
arrError[2] = '';
arrMoreErrors[0] = arrError;	
return (arrMoreErrors);
}
if (!frm.sDebt.checked && !frm.sEquity.checked && document.frmMain.deal_level_ind[0].checked)
{
var arrError = FieldErrorInfo("", "", "", "sDebt", "Please select a Debt and/or Equity type.");
arrError[2] = '';
arrMoreErrors[0] = arrError;	
return (arrMoreErrors);
} 
if (!frm.chkCapitalMarkets.checked && !frm.chkSales.checked && 
!frm.chkInvestmentBanking.checked && !frm.chkResearch.checked &&
!frm.chkInstitutionalInvestor.checked && !frm.chkIssuer.checked &&
!frm.chkBrokerDealer.checked)
{
var arrError = FieldErrorInfo("", "", "", "chkCapitalMarkets", "Permissions required");
arrError[2] = '';
arrMoreErrors[0] = arrError;	
return (arrMoreErrors);
} 
}	
return (arrMoreErrors);
} 
function submitPage( frm , action )
{
switch (action)
{
case	"savechanges" :
frm.method = "POST";
if (frm.ihidDocTypeID.value == "")
frm.hidAction.value = "Add";
else
frm.hidAction.value = "Update";
frm.action = "util_submit_action.asp";
for(var i=0; i<4; i++)
{
if(frm.sDocumentType[i].checked == true)
{
frm.hidDocumentType.value = frm.sDocumentType[i].value;
break;
}
}
for(var j=0; j<2; j++)
{
if(frm.deal_level_ind[j].checked == true)
{
frm.hidDealLevelInd.value = frm.deal_level_ind[j].value;
break;
}
}
if(frm.sDebt.checked)
{
frm.hidDebtFlg.value = frm.sDebt.value;
}
if(frm.sEquity.checked)
{
frm.hidEquityFlg.value = frm.sEquity.value;
}
if(!ValidateForm( frm ))
return;	
frm.submit();
break; 
case "reverttosaved" :
frm.reset();
break;
case "cancel" :
frm.action = "mastertables_documenttypes.asp";
frm.submit();
break;
case "addreg" :
frm.action = "/asp/_template.asp";
frm.submit();
break;
case	"find" :
frm.method = "POST";
frm.hidAction.value = action;
frm.action = "mastertables_documenttypes.asp";
frm.submit();	
break;
case	"create" :
frm.method = "POST"; 
frm.hidAction.value = action;
frm.action = "mastertables_documenttypes.asp";
frm.submit();	
break; 
case	"viewAll" :
frm.method = "POST"; 
frm.hidAction.value = action;
frm.action = "mastertables_documenttypes.asp";
frm.submit();	
break; 
case	"edit" :
frm.method = "POST";
frm.hidAction.value = "find";
frm.action = "mastertables_documenttypes.asp";
frm.submit();	
break; 
case	"delete" :
frm.method = "POST";
frm.hidAction.value = "Delete";
frm.action = "util_submit_action.asp";
if(ValidateForm( frm )) 
frm.submit();
break; 
case	"ManageDocumentTypes" :
frm.method = "POST"; 
frm.hidAction.value = action;
frm.action = "mastertables_documenttypes.asp";
frm.submit();	
break; 
case	"filter" :
frm.method = "POST"; 
frm.hidAction.value = action;
frm.action = "mastertables_documenttypes.asp";
frm.submit();	
break; 
case	"createdoctype" :
frm.method = "POST"; 
frm.hidAction.value = action;
frm.action = "util_submit_action.asp";
frm.submit();	
break; 
case	"savedoctype" :
frm.method = "POST"; 
frm.hidAction.value = action;
frm.action = "util_submit_action.asp";
frm.submit();	
break; 
}
}
function OnSelectedDocumentType()
{
var frm = document.frmMain;
var sSelVal = document.frmMain.DocumentTypes.options(document.frmMain.DocumentTypes.selectedIndex).value;
if (sSelVal != "-1")
{
frm.method = "POST"; 
frm.hidAction.value = "selectDocumentType";
frm.action = "mastertables_documenttypes.asp";
frm.hidDocumentTypeID.value = sSelVal;
frm.submit();
}
}
function setSubmitPage(iRequestID, frm , action ) 
{
frm.iRequestID.value = iRequestID;
submitPage( frm , action );
} 
function sortList(sSortField, frm , action ) 
{
frm.hidSortField.value = sSortField;
submitPage( frm , action );
} 
function onEnter()
{
var keyCode = event.keyCode;
if (keyCode == 13){
submitPage(document.frmMain, "find");
}	
} 
function onClickDealLevelInd(dealLevelInd)
{
if (dealLevelInd == 0)
{
if (document.frmMain.sCode.value != "SELLMEM" && document.frmMain.sCode.value != "ISSUERURL")
{
document.frmMain.chkInstitutionalInvestor.disabled = 0;
document.frmMain.chkIssuer.disabled = 0;
document.frmMain.chkBrokerDealer.disabled = 0;
}	
document.frmMain.sDocumentType[0].disabled = false;
document.frmMain.sDocumentType[1].disabled = false;
document.frmMain.sDocumentType[2].disabled = false;	
document.frmMain.sDebt.disabled = false;
document.frmMain.sEquity.disabled = false; 
}
else if (dealLevelInd == 1)
{
document.frmMain.chkInstitutionalInvestor.checked = 0;
document.frmMain.chkIssuer.checked = 0;
document.frmMain.chkBrokerDealer.checked = 0;
document.frmMain.chkInstitutionalInvestor.disabled = "true";
document.frmMain.chkIssuer.disabled = "true";
document.frmMain.chkBrokerDealer.disabled = "true";	
document.frmMain.sDocumentType[1].disabled = true;
document.frmMain.sDocumentType[2].disabled = true;
document.frmMain.sDebt.disabled = true;
document.frmMain.sEquity.disabled = true; 
}
}
function onDocumentTypeSelect(type)
{
if(type == "I" || type == "P" || (type == "D" && document.frmMain.hidIsCMExternUserPerm.value == 'true' && document.frmMain.hidIsPublicDocTypeId.value == 'false'))
{
divExternalUsersPerm.style.display = '';
document.frmMain.chkInstitutionalInvestor.disabled = false;
document.frmMain.chkIssuer.disabled = false;
document.frmMain.chkBrokerDealer.disabled = false;
}
else
{
divExternalUsersPerm.style.display = 'none';
document.frmMain.chkInstitutionalInvestor.disabled = true;
document.frmMain.chkIssuer.disabled = true;
document.frmMain.chkBrokerDealer.disabled = true;
}
}
