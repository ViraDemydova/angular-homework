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
function submitPage()
{
var frm = document.frmMain;
if (frm.hidSalesRepId.value == "")
{
var sUsers = "";
for(var i = 0; i < frm.selTeamMembers.options.length; i++)
{
sUsers = sUsers + frm.selTeamMembers.options(i).value + ";";
}
frm.hidSelectedSalesRepUsers.value = sUsers;
if (sUsers.length == 0)
{
alert("Please select team members");
return;
}
var sInvestors = "";
for(var i = 0; i < frm.selCoverage.options.length; i++)
{
sInvestors = sInvestors + frm.selCoverage.options(i).value + ";";
}
frm.hidSelectedSalesRepCoverage.value = sInvestors;
frm.hidAction.value = "AddSalesRep";
}
else
frm.hidAction.value = "UpdateSalesRep";
frm.submit();
}
function AddTeamMembers()
{
openGeneralPopup("/asp/cadmin_salesrep_user_add_popup.asp?mode=ManageSalesRep", '', 'width=650,height=500,resizable,toolbar=no,scrollbars,menubar=no');
}
function RemoveTeamMember()
{
var frm = document.frmMain;
var iIndex = frm.selTeamMembers.selectedIndex;
if (iIndex != -1)
frm.selTeamMembers.options.remove(iIndex);
}
function AddUsersToList(arrUsers)
{
var frm = document.frmMain;
if (arrUsers.length > 0)
{
for (var i = 0; i < arrUsers.length; i++)
{
var oOption = new Option(arrUsers[i].user_name, arrUsers[i].up_id);
frm.selTeamMembers.options.add(oOption);
} 
}
}
function AddSalesRepCoverage()
{
openGeneralPopup("/asp/cadmin_salesrep_coverage_add_popup.asp?mode=ManageSalesRep", '', 'width=650,height=500,resizable,toolbar=no,scrollbars,menubar=no');
}
function RemoveSalesRepCoverage()
{
var frm = document.frmMain;
var iIndex = frm.selCoverage.selectedIndex;
if (iIndex != -1)
frm.selCoverage.options.remove(iIndex);
}
function AddInvestorsToList(arrInv)
{
var frm = document.frmMain;
if (arrInv.length > 0)
{
for (var i = 0; i < arrInv.length; i++)
{
var oOption = new Option(arrInv[i].inst_inv_nm, arrInv[i].inst_inv_id);
frm.selCoverage.options.add(oOption);
} 
}
}
