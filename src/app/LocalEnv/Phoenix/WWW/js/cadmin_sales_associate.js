function onDisplayByClicked()
{
if (document.frmSalesAssociate.elements["rdDisplayBy"].item(0).checked)
{
if (getDocumentElement("DisplaySalesAssociationByRoleLayer"))
getDocumentElement("DisplaySalesAssociationByRoleLayer").style.display = '';
if (getDocumentElement("DisplaySalesAssociationByBranchLayer"))
getDocumentElement("DisplaySalesAssociationByBranchLayer").style.display = 'none';
}
else
{
if (getDocumentElement("DisplaySalesAssociationByRoleLayer"))
getDocumentElement("DisplaySalesAssociationByRoleLayer").style.display = 'none';
if (getDocumentElement("DisplaySalesAssociationByBranchLayer"))
getDocumentElement("DisplaySalesAssociationByBranchLayer").style.display = '';
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
for(var i=0;i < document.layers.count-1;i++)
{
if (document.layers[i].elements[sElementName])
{
return document.layers[i].elements[sElementName];
}
} 
}
return 0;
}
function onPageLoad()
{
if (getDocumentElement("hidDisplayByRoleOrBranchInd").value == 1)
onDisplayByClicked();
}
function DisplaySalesAssociationBranchPopup(sales_upn, category_id, sales_name, category_name)
{
openGeneralPopup("/asp/cadmin_sales_associate_branch_popup.asp?sae_upn=" + sales_upn + "&category_id=" + category_id + "&s_name=" + sales_name + "&cat_name=" + category_name, '', 'width=850,height=500,resizable,toolbar=no,scrollbars,menubar=no');
}
