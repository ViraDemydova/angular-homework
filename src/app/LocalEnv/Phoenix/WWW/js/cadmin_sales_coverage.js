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
function submitPage( frm , action)
{
switch (action)
{
case "delete" :
frm.action = "/asp/util_submit_action.asp";
frm.hidAction.value = "Delete"
frm.submit();
break;
}
}
function AddSalesAssociate()
{
var strResponse;
strResponse = window.showModalDialog('/asp/cadmin_sales_associate_add_popup.asp?sales_id=', '', 'width=650,height=500,resizable,toolbar=no,scrollbars,menubar=no');
}
function AddSalesCoveragePopup(lSalesID)
{
openGeneralPopup("/asp/cadmin_sales_coverage_add_popup.asp?sales_id=" + lSalesID, '', 'width=650,height=500,resizable,toolbar=no,scrollbars,menubar=no');
}
function ImportSalesCoveragePopup(lSalesID)
{
openGeneralPopup('/asp/cadmin_sales_coverage_import_popup.asp?sales_id=' + lSalesID, '', 'width=650,height=500,resizable,toolbar=no,scrollbars,menubar=no');
}
function AddSalesCoverageSubmit(frm, action)
{
if(ValidateForm( frm ))
{
document.frmAddCoverage.action = "/asp/util_submit_action.asp";
document.frmAddCoverage.hidAction.value = action
document.frmAddCoverage.submit();
} 
}
function DeleteSalesCoverage()
{
document.frmSalesCoverage.action = "/asp/util_submit_action.asp";
document.frmSalesCoverage.hidAction.value = "BatchDelete"
document.frmSalesCoverage.submit();
}
function AddSalesAssociationPopup(lSalesID, sUpn)
{
openGeneralPopup("/asp/cadmin_sales_associate_add_popup.asp?sales_id=" + lSalesID + '&sales_upn=' + sUpn, '', 'width=650,height=500,resizable,toolbar=no,scrollbars,menubar=no');
}
function AddSalesAssociationSubmit(action)
{
document.frmAddAssociation.action = "/asp/util_submit_action.asp";
document.frmAddAssociation.hidAction.value = action;
document.frmAddAssociation.submit();
}
function AddClientCoveragePopup(lClientID)
{
openGeneralPopup("/asp/cadmin_client_coverage_add_popup.asp?inv_id=" + lClientID, '', 'width=650,height=500,resizable,toolbar=no,scrollbars,menubar=no');
}
function AddClientCoverageSubmit()
{
if(ValidateForm( document.frmClientCoverageAdd ))
{
document.frmClientCoverageAdd.action = "util_submit_action.asp";
document.frmClientCoverageAdd.submit();
} 
}
function ReassignSalesCoverageSubmit()
{
if(ValidateForm( document.frmReassignCoverage ))
{
document.frmReassignCoverage.action = "/asp/util_submit_action.asp";
document.frmReassignCoverage.submit();
} 
}
