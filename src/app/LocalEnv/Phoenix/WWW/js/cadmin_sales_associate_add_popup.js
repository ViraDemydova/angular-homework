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
function AddSalesAssociationSubmit(action)
{
document.frmAddAssociation.action = "/asp/util_submit_action.asp";
document.frmAddAssociation.hidAction.value = action;
document.frmAddAssociation.submit();
}
function AddSalesAssociate()
{
var strResponse;
strResponse = window.showModalDialog('/asp/cadmin_sales_associate_add_popup.asp?sales_id=', '', 'width=650,height=500,resizable,toolbar=no,scrollbars,menubar=no');
}
function onSearchByClicked()
{
if (document.frmSearchAssociate.elements["rdSearchBy"].item(0).checked)
{
document.frmSearchAssociate.elements["selSalesRole"].disabled=false;
rewriteLayer("pSearchTitle", document.frmSearchAssociate.elements["hidRC_LastName"].value);
}
else
{
document.frmSearchAssociate.elements["selSalesRole"].disabled=true;
rewriteLayer("pSearchTitle", document.frmSearchAssociate.elements["hidRC_Name"].value);
}	
}
function rewriteLayer (idOrPath, html) {
if (document.layers) {
var l = idOrPath.indexOf('.') != -1 ? eval(idOrPath) 
: document[idOrPath];
if (!l)
{
var theForm = document.forms["frmSearchAssociate"];
var l = theForm.elements[idOrPath];
}
if (!l)
return;
if(l.type=="text")
{
l.value=html; 
return;
}
if (!l.ol) {
var ol = l.ol = new Layer (l.clip.width, l);
ol.clip.width = l.clip.width;
ol.left = l.left;
ol.top = l.top;
ol.clip.height = l.clip.height;
ol.bgColor = l.bgColor;
l.visibility = 'hide';
ol.visibility = 'show';
}
var ol = l.ol;
html="<div class='txtBold'>" + html + "</div>"
ol.document.open();
ol.document.write("");
ol.document.close();
}
else if (document.all || document.getElementById) {
var p = idOrPath.indexOf('.');
var id = p != -1 ? 
idOrPath.substring(idOrPath.lastIndexOf('.') + 1) 
: idOrPath;
if (document.all)
{
if (document.all[id])
{
document.all[id].innerHTML = html;
}
}
else {
var l = document.getElementById(id);
var r = document.createRange();
r.setStartAfter(l);
var docFrag = r.createContextualFragment(html);
while (l.hasChildNodes())
l.removeChild(l.firstChild);
l.appendChild(docFrag);
}
}
}
