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
function AddSalesRepCoveragePopup(lSalesRepId)
{
openGeneralPopup("/asp/cadmin_salesrep_coverage_add_popup.asp?sales_rep_id=" + lSalesRepId, '', 'width=650,height=500,resizable,toolbar=no,scrollbars,menubar=no');
}
function AddSalesRepCoverageSubmit(frm, action)
{
if(ValidateForm( frm ))
{
if (frm.hidMode.value == "ManageSalesRep")
{
var iTotalCnt = frm.txtInvestorCount.value;
var arrInv = new Array();
var iCtr = 0;
for(var i = 1; i <= iTotalCnt; i++)
{
var elemChk = document.getElementById("chkInvestorAdd_" + i);
if (elemChk && elemChk.checked)
{
arrInv[iCtr] = new Object();
arrInv[iCtr].inst_inv_id = elemChk.value;
var elemText = document.getElementById("hidInvestorName_" + i);
arrInv[iCtr].inst_inv_nm = elemText.value;
iCtr++;
}
}
window.opener.AddInvestorsToList(arrInv);
window.close(); 
}
else
{
document.frmAddSalesRepCoverage.action = "/asp/util_submit_action.asp";
document.frmAddSalesRepCoverage.hidAction.value = action
document.frmAddSalesRepCoverage.submit();
}
} 
}
function DeleteSalesRepCoverage()
{
document.frmSalesRepCoverage.action = "/asp/util_submit_action.asp";
document.frmSalesRepCoverage.hidAction.value = "BatchDeleteSalesRepCoverage"
document.frmSalesRepCoverage.submit();
}
