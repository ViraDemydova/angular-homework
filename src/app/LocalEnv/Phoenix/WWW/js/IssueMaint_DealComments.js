function CheckConditionallyRequiredFields( frm, arrFieldsInError )
{
var arrMoreErrors = new Array();
var Description = frm.taIssueDesc.value.length;
var InternalComments = frm.taInternalComments.value.length;
var DescriptionMaxLength = 300;
var InternalCommentsMaxLength = 300;
if ( Description > DescriptionMaxLength ) {
var arrError = FieldErrorInfo("taIssueDesc", 'The Issue Description exceeds the maximum length allowed', "", "taIssueDesc", "Issue Description");
arrMoreErrors[arrMoreErrors.length] = arrError;
}
if ( InternalComments > InternalCommentsMaxLength ) {
var arrError = FieldErrorInfo("taInternalComments", 'The Internal Comments for Sales exceeds the maximum length allowed', "", "taInternalComments", "Internal Comments for Sales");
arrMoreErrors[arrMoreErrors.length] = arrError;
}
return (arrMoreErrors);
}
function CustomValidation( frm, arrFieldsInError )
{
var arrMoreErrors = new Array();
return (arrMoreErrors);
} 
function submitpage(frm, sAction)
{
switch (sAction)
{
case "savechanges" :
if(ValidateForm( frm ))
{ 
frm.action = "/asp/util_submit_action.asp";
frm.hidAction.value = "Update";
frm.submit(); 
}
break;
case "reverttosaved" :
window.location.reload();
break;
case "cancel" :
frm.action = "/asp/IssueMaint_DealDetailsFI.asp";
frm.submit();
break;
case "Printer":
frm.method = "POST"; 
frm.action = "IssueMaint_DealComments.asp?Printer=1";
frm.submit(); 
break;
case "Revert":
frm.method = "POST";
frm.action = "IssueMaint_DealComments.asp";
frm.submit();
break; 
}
}
function rewriteLayer (idOrPath, html) {
if (document.layers) {
var l = idOrPath.indexOf('.') != -1 ? eval(idOrPath) 
: document[idOrPath];
if (!l)
{
var theForm = document.forms["frmMain"];
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
function onPageLoad()
{
if(document.frmMain.hidPrinterFriendlyFlag && (document.frmMain.hidPrinterFriendlyFlag.value == 1))
{
if(document.frmMain.hidIssueDesc)
{
var sIssueDesc = document.frmMain.hidIssueDesc.value;
sIssueDesc = sIssueDesc.replace(/ /g, "&#160;");
sIssueDesc = sIssueDesc.replace(/\n/g, "<br>");
rewriteLayer('IssueDesc', sIssueDesc);
}
if(document.frmMain.hidSyndNotes)
{
var sSyndNotes = document.frmMain.hidSyndNotes.value;
sSyndNotes = sSyndNotes.replace(/ /g, "&#160;");
sSyndNotes = sSyndNotes.replace(/\n/g, "<br>");
rewriteLayer('SyndNotes', sSyndNotes);
}
if(document.frmMain.hidSalesComments)
{
var sSalesComments = document.frmMain.hidSalesComments.value;
sSalesComments = sSalesComments.replace(/ /g, "&#160;");
sSalesComments = sSalesComments.replace(/\n/g, "<br>");
rewriteLayer('SalesComments', sSalesComments);
}
}
}
