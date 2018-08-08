<!-- 
function expandProduct( Product )
{
elProduct = eval(Product);
imTriangle = event.srcElement;
if ( elProduct.style.display == "none" )
{
elProduct.style.display = "";
imTriangle.src = "../images/triangleDown.gif";
}
else
{
elProduct.style.display = "none";
imTriangle.src = "../images/triangleRight.gif";
}
}
function permissionCountry( frm, issueID, productID, countryID, countryPrdInvID )
{
frm.hidUpdateMode.value = 'C';
frm.hidIssueID.value = issueID;
frm.hidProductID.value = productID;
frm.hidCountryID.value = countryID;
frm.hidCountryPrdInvID.value = countryPrdInvID;
frm.hidInvestorCount.value = '1';
frm.hidPermissionGroup.value = 'P';
frm.submit();
}
function blockCountry( frm, issueID, productID, countryID, countryPrdInvID )
{
frm.hidUpdateMode.value = 'C';
frm.hidIssueID.value = issueID;
frm.hidProductID.value = productID;
frm.hidCountryID.value = countryID;
frm.hidCountryPrdInvID.value = countryPrdInvID;
frm.hidInvestorCount.value = '1';
frm.hidPermissionGroup.value = 'B';
frm.submit();
}
function permissionProduct( frm, issueID, productID, productPrdInvID )
{
frm.hidUpdateMode.value = 'P';
frm.hidIssueID.value = issueID;
frm.hidProductID.value = productID;
frm.hidProductPrdInvID.value = productPrdInvID;
frm.hidInvestorCount.value = '1';
frm.hidPermissionGroup.value = 'P';
frm.submit();
}
function blockProduct( frm, issueID, productID, productPrdInvID )
{
frm.hidUpdateMode.value = 'P';
frm.hidIssueID.value = issueID;
frm.hidProductID.value = productID;
frm.hidProductPrdInvID.value = productPrdInvID;
frm.hidInvestorCount.value = '1';
frm.hidPermissionGroup.value = 'B';
frm.submit();
}
function saveInvestorPermissions( frm, issueID, productID, countryID )
{
frm.hidUpdateMode.value = 'I';
frm.hidIssueID.value = issueID;
frm.hidProductID.value = productID;
frm.hidCountryID.value = countryID;
frm.submit();
}
function blockNonIPQ( frm )
{
document.body.style.cursor = "wait";
for (var count = 1; count <= frm.hidInvestorCount.value ; count ++ )
{
if ( frm["srdoPermission"+count] )
{
if ( frm["hidInvestorStatus"+count].value == "Non-IPQ" )
{
frm["srdoPermission"+count][1].checked = true;
} 
}
}
document.body.style.cursor = "";
}
function blockNonQIB( frm )
{
document.body.style.cursor = "wait";
for (var count = 1; count <= frm.hidInvestorCount.value ; count ++ )
{
if ( frm["srdoPermission"+count] )
{
if ( frm["hidInvestorStatus"+count].value == "IAI" ||
frm["hidInvestorStatus"+count].value == "Non-QIB" )
{
frm["srdoPermission"+count][1].checked = true;
} 
}
}
document.body.style.cursor = "";
}
function onPageLoad()
{
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
function submitPage( frm , action )
{
switch (action)
{
case "SaveChanges" :
if(ValidateForm( frm ))
{
frm.action = "/asp/_template.asp";
frm.hidAction.value = "Update";
frm.submit(); 
}
break;
case "RevertToSaved" :
window.location.reload();
break;
case "Cancel" :
frm.action = "/asp/_template.asp";
frm.submit();
break;
case "AddReg" :
frm.action = "/asp/_template.asp";
frm.hidAction.value = "Add";
frm.submit();
break;
}
}
