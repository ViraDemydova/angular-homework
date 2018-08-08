<!-- 
var sInvalidCharMsg = "May not contain special characters. (&, <, >, \", ', @)";
var sInvalidCharMsg2 = "May not contain special characters. (&, <, >, \", @)";
var sInvalidCharMsg3 = "May not contain special characters. (&, <, >, \", ', /, \\, @)";
function onPageLoad()
{
if (document.frmUser.hidAction.value == "Update" 
&& document.frmUser.hidRoleType.value == "Sales"
&& document.frmUser.hidEquityCustomerAdminRole.value == "EquityUser")
{
reverseFillDropDown(document.frmUser);
}	
CheckCapitalMarketsRole(document.frmUser.cbSynRemote);
CheckCapitalMarketsRole(document.frmUser.cbCompliance);
CheckCapitalMarketsRole(document.frmUser.cbRdOnly);
}
function AddUser( )
{
document.frmUser.txtCommonName.value = document.frmUser.rsUserId.value;
if (document.frmUser.selSubsidiary)
{
document.frmUser.txtSubsidiaryId.value = document.frmUser.selSubsidiary[document.frmUser.selSubsidiary.selectedIndex].value;
}
else
{
document.frmUser.txtSubsidiaryId.value = document.frmUser.txtCompanyId.value;
}
if ( document.frmUser.selBusiness.value == "External" )
{
combineRoles( );
}
if ( ValidateForm( document.frmUser ) )
{
document.frmUser.txtDisplayForm.value = "util_submit_action.asp";
document.frmUser.submit();
}
} 
function CheckConditionallyRequiredFields( frm, arrFieldsInError )
{
var arrMoreErrors = new Array();
var arrError
var count = 0;
var bRolesChecked = false;
if ( document.frmUser.cbRole.type == "hidden" )
{
if ( document.frmUser.cbRole != "" )
{
bRolesChecked = true;
}
}
else if ( document.frmUser.cbRole.length )
{
for ( var iIndex = 0 ; iIndex < document.frmUser.cbRole.length; iIndex++ )
{
if ( document.frmUser.cbRole[ iIndex ].checked )
{
bRolesChecked = true;
continue;
}
}
}
else
{
if ( document.frmUser.cbRole.checked )
{
bRolesChecked = true;
}
}
var bIsMandateOnlyUser = false;
if (document.all("cbBusRoleMandate"))
{
if (document.frmUser.cbBusRoleMandate.checked && !document.frmUser.cbEquity.checked && !document.frmUser.cbDebt.checked)
bIsMandateOnlyUser = true; 
}
if ( !bRolesChecked && !bIsMandateOnlyUser)
{
arrError = FieldErrorInfo( "cbRole", "Please check at least one business role.", "", ( document.frmUser.cbRole.length ? "cbRole[0]" : "cbRole" ), "Business Role" );
arrMoreErrors[ count ] = arrError;
count++;
} 
if ( frm.cbRole2 )
{
var bRole2Checked = false;
for ( var iIndex = 0 ; iIndex < document.frmUser.cbRole2.length ; iIndex++ )
{
if ( document.frmUser.cbRole2[ iIndex ].checked )
{
bRole2Checked = true
continue
}
}
if ( !bRole2Checked )
{
arrError = FieldErrorInfo( "cbRole2", "Please select an user role.", "", "cbRole2[0]", "User Roles" )
arrMoreErrors[ count ] = arrError
count++
} 
}
var bBusRolesChecked = false;
for ( var iIndex = 0 ; iIndex < document.frmUser.cbBusRole.length ; iIndex++ )
{
if ( document.frmUser.cbBusRole[ iIndex ].checked )
{
bBusRolesChecked = true;
continue;
}
}
if ( !bBusRolesChecked)
{
document.frmUser.cbBusRole[0].value = "";
if (document.all("cbBusRoleMandate") && document.frmUser.cbBusRoleMandate.checked)
bBusRolesChecked = true;
}
if ( !bBusRolesChecked)
{
arrError = FieldErrorInfo( "cbBusRole", "Please check at least one business type.", "", "cbBusRole[1]", "Business Type" );
arrMoreErrors[ count ] = arrError;
count++
} 
if ( hasInvalidChar2( frm.rsFName.value ) ) 
{
arrError = FieldErrorInfo( "rsFName", sInvalidCharMsg2, "", "rsFName", "First Name" )
arrMoreErrors[ count ] = arrError
count++
}
if ( hasInvalidChar( frm.txtMInitial.value ) ) 
{
arrError = FieldErrorInfo( "txtMInitial", sInvalidCharMsg, "", "txtMInitial", "Middle Initial" )
arrMoreErrors[ count ] = arrError
count++
}
if ( frm.txtMInitial.value.length > 1 )
{
arrError = FieldErrorInfo( "txtMInitial", "Must be at most one letter", "", "txtMInitial", "Middle Initial" )
arrMoreErrors[ count ] = arrError
count++
}
if ( hasInvalidChar2( frm.rsLName.value ) ) 
{
arrError = FieldErrorInfo( "rsLName", sInvalidCharMsg2, "", "rsLName", "Last Name" )
arrMoreErrors[ count ] = arrError
count++
}
if ( hasInvalidChar2( frm.txtNName.value ) ) 
{
arrError = FieldErrorInfo( "txtNName", sInvalidCharMsg2, "", "txtNName", "Nickname" )
arrMoreErrors[ count ] = arrError
count++
}
if ( hasInvalidChar( frm.txtTitle.value ) ) 
{
arrError = FieldErrorInfo( "txtTitle", sInvalidCharMsg, "", "txtTitle", "Business Title" )
arrMoreErrors[ count ] = arrError
count++
}
if ( hasInvalidChar2( frm.txtDName.value ) ) 
{
arrError = FieldErrorInfo( "txtDName", sInvalidCharMsg2, "", "txtDName", "Display Name" )
arrMoreErrors[ count ] = arrError
count++
}
if ( hasInvalidChar3( frm.rsUserId.value ) ) 
{
arrError = FieldErrorInfo( "rsUserId", sInvalidCharMsg3, "", "rsUserId", "User Id" )
arrMoreErrors[ count ] = arrError
count++
}
var sUPNMAX = 64;
var sUpn = frm.rsUserId.value + "@"
var sSuffix 
if ( document.frmUser.selUpnSuffix.selectedIndex )
{
sSuffix = document.frmUser.selUpnSuffix[document.frmUser.selUpnSuffix.selectedIndex].value
sUpn += sSuffix
}
else
{
sSuffix = document.frmUser.selUpnSuffix.value
sUpn += sSuffix
}
if ( sUpn.length > sUPNMAX )
{
arrError = FieldErrorInfo( "rsUserId", "User Id cannot exceed " + ( (sUPNMAX - 1) - sSuffix.length ) + " characters", "", "rsUserId", "User Id" )
arrMoreErrors[ count ] = arrError
count++
}
if ( hasInvalidChar( frm.txtBPhone.value ) ) 
{
arrError = FieldErrorInfo( "txtBPhone", sInvalidCharMsg, "", "txtBPhone", "Business Phone" )
arrMoreErrors[ count ] = arrError
count++
}
var re1 = /[\"\'<>\&]+/
var re2 = /.*\@.*\@.*/
var sBEmail = frm.remBEmail.value
if ( re1.test( sBEmail ) || re2.test( sBEmail ) )
{
arrError = FieldErrorInfo( "remBEMail", "May not contain special characters. (&, <, >, \", /, ') or more than one @", "", "remBEmail", "Business Email" )
arrMoreErrors[ count ] = arrError
count++
}
if ( hasInvalidChar( frm.txtStreetAdd.value ) ) 
{
arrError = FieldErrorInfo( "txtStreetAdd", sInvalidCharMsg, "", "txtStreetAdd", "Company Address" )
arrMoreErrors[ count ] = arrError
count++
} 
if ( hasInvalidChar( frm.txtDept.value ) ) 
{
arrError = FieldErrorInfo( "txtDept", sInvalidCharMsg, "", "txtDept", "Department" )
arrMoreErrors[ count ] = arrError
count++
} 
if ( hasInvalidChar( frm.txtCity.value ) ) 
{
arrError = FieldErrorInfo( "txtCity", sInvalidCharMsg, "", "txtCity", "City" )
arrMoreErrors[ count ] = arrError
count++
} 
if ( hasInvalidChar( frm.txtState.value ) ) 
{
arrError = FieldErrorInfo( "txtState", sInvalidCharMsg, "", "txtState", "State / Province" )
arrMoreErrors[ count ] = arrError
count++
} 
if ( hasInvalidChar( frm.txtZip.value ) ) 
{
arrError = FieldErrorInfo( "txtZip", sInvalidCharMsg, "", "txtZip", "Zip / Postal Code" )
arrMoreErrors[ count ] = arrError
count++
} 
if ( hasInvalidChar( frm.txtExtId.value ) ) 
{
arrError = FieldErrorInfo( "txtExtId", sInvalidCharMsg, "", "txtExtId", "External User Id" )
arrMoreErrors[ count ] = arrError
count++
} 
if ( hasInvalidChar( frm.txtHPhone.value ) ) 
{
arrError = FieldErrorInfo( "txtHPhone", sInvalidCharMsg, "", "txtHPhone", "Home Phone" )
arrMoreErrors[ count ] = arrError
count++
} 
if ( hasInvalidChar( frm.txtFax.value ) ) 
{
arrError = FieldErrorInfo( "txtFax", sInvalidCharMsg, "", "txtFax", "txtFax" )
arrMoreErrors[ count ] = arrError
count++
} 
if ( hasInvalidChar( frm.txtMobilePhone.value ) ) 
{
arrError = FieldErrorInfo( "txtMobilePhone", sInvalidCharMsg, "", "txtMobilePhone", "Mobile Phone" )
arrMoreErrors[ count ] = arrError
count++
} 
if ( hasInvalidChar( frm.txtPager.value ) ) 
{
arrError = FieldErrorInfo( "txtPager", sInvalidCharMsg, "", "txtPager", "Pager" )
arrMoreErrors[ count ] = arrError
count++
} 
if ( frm.rsPassword && frm.rsConfPassword )
{
var sPassword = frm.rsPassword.value
var sConfPassword = frm.rsConfPassword.value
if ( hasInvalidChar( sPassword ) ) 
{
arrError = FieldErrorInfo( "rsPassword", sInvalidCharMsg, "", "rsPassword", "Password" )
arrMoreErrors[ count ] = arrError
count++
} 
if ( hasInvalidChar( sConfPassword ) ) 
{
arrError = FieldErrorInfo( "rsConfPassword", sInvalidCharMsg, "", "rsConfPassword", "Confirm Password" )
arrMoreErrors[ count ] = arrError
count++
}
if ( sPassword.length < 7 )
{
arrError = FieldErrorInfo( "rsPassword", "Must be at least 7 characters long", "", "rsPassword", "Password" )
arrMoreErrors[ count ] = arrError
count++
}
if ( sConfPassword.length < 7 )
{
arrError = FieldErrorInfo( "rsConfPassword", "Must be at least 7 characters long", "", "rsConfPassword", "Confirm Password" )
arrMoreErrors[ count ] = arrError
count++
}
if ( sPassword != sConfPassword )
{
arrError = FieldErrorInfo( "rsPassword", "Password and confirm password must be the same.", "", "rsPassword", "Password" )
arrMoreErrors[ count ] = arrError
count++
}
}
if ( hasInvalidChar( frm.txtComments.value ) ) 
{
arrError = FieldErrorInfo( "txtComments", sInvalidCharMsg, "", "txtComments", "Comments" )
arrMoreErrors[ count ] = arrError
count++
} 
var bActEnabled = ( frm.txtActEnabled == "0" ? true : false )
if ( frm.txtMotherMaidenName )
{
if ( bActEnabled && frm.txtMotherMaidenName.value.length == 0 )
{
arrError = FieldErrorInfo( "txtMotherMaidenName", "Value is required", "", "txtMotherMaidenName", "Mother's Maiden Name" )
arrMoreErrors[ count ] = arrError
count++
}
if ( hasInvalidChar( frm.txtMotherMaidenName.value ) && bActEnabled ) 
{
arrError = FieldErrorInfo( "txtMotherMaidenName", sInvalidCharMsg, "", "txtMotherMaidenName", "Mother's Maiden Name" )
arrMoreErrors[ count ] = arrError
count++
}
}
if ( frm.txtLastSchool )
{
if ( bActEnabled && frm.txtLastSchool.value.length == 0 )
{
arrError = FieldErrorInfo( "txtLastSchool", "Value is required", "", "txtLastSchool", "Last School Attended" )
arrMoreErrors[ count ] = arrError
count++ 
}
if ( hasInvalidChar( frm.txtLastSchool.value ) && bActEnabled ) 
{
arrError = FieldErrorInfo( "txtLastSchool", sInvalidCharMsg, "", "txtLastSchool", "Last School Attended" )
arrMoreErrors[ count ] = arrError
count++
} 
}
if ( frm.txtPetName )
{
if ( bActEnabled && frm.txtPetName.value.length == 0 )
{
arrError = FieldErrorInfo( "txtPetName", "Value is required", "", "txtPetName", "Favorite Pet" )
arrMoreErrors[ count ] = arrError
count++
}
if ( hasInvalidChar( frm.txtPetName.value ) && bActEnabled ) 
{
arrError = FieldErrorInfo( "txtPetName", sInvalidCharMsg, "", "txtPetName", "Favorite Pet" )
arrMoreErrors[ count ] = arrError
count++
} 
}
if (document.all("cbRdOnly"))
{
if (document.all("cbCompliance").checked && !document.all("cbRdOnly").checked)
{
arrError = FieldErrorInfo( "cbRdOnly", "Read Only role needs to checked for Compliance Override", "", "cbRdOnly", "Read Only Role" )
arrMoreErrors[ count ] = arrError
count++
}
}
return (arrMoreErrors);
}
function CustomValidation( frm, arrFieldsInError )
{
var arrMoreErrors = new Array();
return (arrMoreErrors);
} 
function SelectNewSubsidiary( )
{
document.frmUser.action = window.location.pathname;
document.frmUser.submit();
}
function changeAct( strActEnabled )
{
document.frmUser.txtActEnabled.value = strActEnabled;
if ( document.frmUser.selBusiness.value == "External" )
{
combineRoles( );
}
document.frmUser.action = window.location.pathname;
document.frmUser.submit();
}
function ChangeDisplayName( )
{
var sFirstName = document.frmUser.rsFName.value;
var sLastName = document.frmUser.rsLName.value;
document.frmUser.txtDName.innerText = sFirstName + " " + sLastName;
document.frmUser.txtDName.value = sFirstName + " " + sLastName;
return true;
}
function SelectAllRegions( oSelectAll, oRegionBox )
{
var bSelectAll = oSelectAll.checked;
var iRegionCount = oRegionBox.length - 1;
for ( ; iRegionCount != -1; iRegionCount-- )
{
oRegionBox.options[ iRegionCount ].selected = bSelectAll;
}
return true;
}
function ChangeSelectedRegions( oSelectAll, oRegionBox )
{
oSelectAll.checked = false;
CheckAllRegionBox( oSelectAll, oRegionBox )
}
function CheckAllRegionBox( oSelectAll, oRegionBox )
{
if ( oRegionBox && oSelectAll )
{
var bSelectAll = true;
var iRegionCount = oRegionBox.length - 1;
for ( ; iRegionCount != -1; iRegionCount-- )
{
if ( !oRegionBox.options[ iRegionCount ].selected )
{
bSelectAll = false;
}
}
oSelectAll.checked = bSelectAll;
}
return true;
}
function ClearAllRegionBox(oSelectAll,oRegionBox)
{
if ( oRegionBox && oSelectAll )
{
var iRegionCount = oRegionBox.length;
var iRegionIndex;
for (iRegionIndex = 0 ; iRegionIndex < iRegionCount; iRegionIndex++ )
oRegionBox.options[ iRegionIndex ].selected = false;
oSelectAll.checked = false;
}
}
function changeBusinessRole( sRole )
{
document.frmUser.txtRole.value = sRole;
document.frmUser.action = document.location.pathname
document.frmUser.submit()
}
function submitForm( )
{
document.frmUser.txtRole.value = document.frmRoles.txtPrevRole.value
document.frmUser.action = "displayform.asp"
document.frmUser.submit()
}
function combineRoles( )
{
var frm = document.frmUser
var role1 = frm.cbRole1
var role2 = frm.cbRole2
var role3 = frm.cbRole3
var role = frm.cbRole
role.value = ""
if ( role1 )
{
for ( var i = 0 ; i < role1.length ; i++ )
{
if ( role1[i].checked )
{
role.value += role1[i].value + ", "
}
}
}
if ( role2 )
{
for ( var i = 0 ; i < role2.length ; i++ )
{
if ( role2[i].checked )
{
role.value += role2[i].value + ", "
}
}
}
if ( role3 )
{
if ( role3.checked )
{
role.value += role3.value + ", "
}
}
if ( role.value.length > 2 )
{
role.value = role.value.substr( 0, role.value.length - 2 )
}
}
function hasInvalidChar( str )
{
var re = /[\@\"\'<>\&]+/
return re.test( str )
}
function hasInvalidChar2( str )
{
var re = /[\@\"\<>\&]+/
return re.test( str )
} 
function hasInvalidChar3( str )
{
var re = /[\@\"\'<>\&]+/
return re.test( str )
}
function changeBusinessTypeForSalesRole( sType )
{
var frm = document.frmUser
if (sType == 'E')
{
}
else
{
if(frm.cbSaleAENoIOI && (frm.cbSaleAENoIOI.checked == true) )
{
frm.cbSaleAE.checked = true;
}
if(frm.cbSaleMan && (frm.cbSaleMan.checked == true) )
{
frm.cbSaleAE.checked = true;
}
if(frm.cbSalTrd && (frm.cbSalTrd.checked == true) )
{
frm.cbSaleAE.checked = true;
}
}
}
function passwordGuidelines()
{
var sUrl = "user_customization_popup.asp?mode=password_guidelines_cust_admin";
var sStyle = "width=300,height=420,scrollbars=1";
openGeneralPopup( sUrl, '', sStyle );
}
CheckAllRegionBox( document.frmUser.cbAllRegion, document.frmUser.selRSRegion );
function onChangeBrokerRole() 
{
if(document.frmUser.cbWholeSale.checked)
{
document.frmUser.cbCrdPr.disabled = true;
document.frmUser.cbCrdPr.checked = false;
document.frmUser.cbManPr.disabled = true;
document.frmUser.cbManPr.checked = false;
document.frmUser.cbResPr.disabled = true;
document.frmUser.cbResPr.checked = false;
}
else
{
document.frmUser.cbCrdPr.disabled = false;
document.frmUser.cbManPr.disabled = false;
document.frmUser.cbResPr.disabled = false;
}
}
function fillDropDown(selSrcBox, selDestBox, mode)
{
var lSelLength = selSrcBox.length;
selDestBox.length = 0;
var counter = 0;
for(var i=0; i<lSelLength; i++)
{
if(selSrcBox[i].selected)
{
var lSelectId = selSrcBox[i].value;
for(var j=0; j< arrCategories.length; j++) 
{
if(arrCategories[j][2] == lSelectId)
{
var opt = new Option(arrCategories[j][1], arrCategories[j][0]);
selDestBox.options[counter++] = opt;
}
}
} 
} 
if(mode == 1)
document.frmUser.selSalesRegion.length = 0; 
} 
function reverseFillDropDown(frm)
{
var strSalesRegion = frm.hidSalesRegionStr.value;
var i=0;	
while(i<strSalesRegion.length)
{
var index = strSalesRegion.indexOf(",", i);
if(index != -1)
{
var subStrRegion = strSalesRegion.substring(i, index);
fillRegions(frm, subStrRegion, frm.selSalesRegion, 3); 
i=index+2;
}
else
{
var subStrRegion = strSalesRegion.substring(i, strSalesRegion.length);
fillRegions(frm, subStrRegion, frm.selSalesRegion, 3); 
i = strSalesRegion.length + 1; 
} 
}
}	
function fillRegions(frm, lSelectId, selBox, mode)
{
var counter = selBox.length;
var lSelLength = selBox.length;
for(var j=0; j< arrCategories.length; j++) 
{
if(arrCategories[j][0] == lSelectId) 
{
var bAdded = false;
for(var i=0; i<lSelLength; i++)
{
if(selBox[i].value == lSelectId)
{
selBox[i].selected = true;
bAdded = true;
}
}
if(!bAdded && mode > 1)
{
var opt = new Option(arrCategories[j][1], arrCategories[j][0]);
selBox.options[counter++] = opt;
selBox[counter-1].selected = true; 
}
if(mode == 3)
{
fillRegions(frm, arrCategories[j][2], frm.selNatSalesRegion, 2);
}
else if(mode == 2)
{
fillRegions(frm, arrCategories[j][2], frm.selGlobSalesRegion, 1); 
}	
break; 
}
}
} 
function CheckCapitalMarketsRole(elt)
{
if (!elt || !elt.value)
return;
if(elt.value =="ReadOnly")
{
if (!elt.checked)
document.all("cbCompliance").checked = false;
var bDisable;
if (elt.checked || document.all("cbCompliance").checked)
bDisable = true;
else
bDisable = false;
for ( var iIndex = 0 ; iIndex < document.frmUser.cbRole.length; iIndex++ )
{
if ( document.frmUser.cbRole[ iIndex ].value != "ReadOnly" && document.frmUser.cbRole[ iIndex ].value != "Compliance")
{
document.frmUser.cbRole[iIndex].disabled = bDisable;
if(elt.checked)
document.frmUser.cbRole[iIndex].checked = false;
}
} 
}
else if (elt.value =="SyndicateRemoteDesk")
{
for ( var iIndex = 0 ; iIndex < document.frmUser.cbRole.length; iIndex++ )
{
if ( document.frmUser.cbRole[ iIndex ].value != "SyndicateRemoteDesk")
{
document.frmUser.cbRole[iIndex].disabled = elt.checked;
if(elt.checked)
document.frmUser.cbRole[iIndex].checked = !(elt.checked);
}
}
}
else if (elt.value =="Compliance")
{
if (elt.checked)
document.all("cbRdOnly").checked = true;
var bDisable;
if (elt.checked || document.all("cbRdOnly").checked)
bDisable = true;
else
bDisable = false;
for ( var iIndex = 0 ; iIndex < document.frmUser.cbRole.length; iIndex++ )
{
if ( document.frmUser.cbRole[ iIndex ].value != "Compliance" && document.frmUser.cbRole[ iIndex ].value != "ReadOnly")
{
document.frmUser.cbRole[iIndex].disabled = bDisable;
if(elt.checked)
document.frmUser.cbRole[iIndex].checked = !(elt.checked);
}
}
}
else
{
var nChecked=0;
for ( var iIndex = 0 ; iIndex < document.frmUser.cbRole.length; iIndex++ )
{
if ( document.frmUser.cbRole[ iIndex ].value == "ReadOnly" || document.frmUser.cbRole[ iIndex ].value == "Compliance")
{
document.frmUser.cbRole[ iIndex ].disabled = nChecked;
document.frmUser.cbRole[ iIndex ].checked = false;
}
if(document.frmUser.cbRole[iIndex].checked)
{	
nChecked =nChecked + 1;
}
}
}
}
function onChangeMandateUser()
{
var frm = document.frmUser;
if (frm.cbBusRoleMandate.checked == true)
{
frm.cbEquity.disabled=false;
frm.cbEquity.checked=false;
}
else
{
frm.cbEquity.disabled=true;
frm.cbEquity.checked=true;
}
}
