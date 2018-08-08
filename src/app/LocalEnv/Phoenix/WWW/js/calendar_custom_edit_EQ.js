<!-- 
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
function submitPage( frm , action, listOfColValues )
{
switch (action)
{
case "SaveChanges" :
if(ValidateForm( frm ))
{
frm.action = "/asp/util_submit_action.asp?columnValues="+listOfColValues;
frm.hidAction.value = "Update";
frm.submit(); 
}
break;
}
}
function PopUpEdit(){
var listOfIds = "";
for (var i=0; i < document.frmMain.sChkEdit.length; i++) {
if (document.frmMain.sChkEdit[i].checked==true){
listOfIds = document.frmMain.sChkEdit[i].value+", "+listOfIds;
}
}
var sUrl = "calendar_custom_edit_EQ_popup.asp?sListOfIds="+listOfIds;
var sStyle = "width=450, height=320, scrollbars=1";
openGeneralPopup( sUrl, '', sStyle );
} 
function dirtyMe(dirtyType,recordNumber){
if (dirtyType == 'IssueNote'){
var IssueNote = eval("document.frmMain.hidIssNoteDirty"+recordNumber);
IssueNote.value = "True";
}
if (dirtyType == 'Issue'){
var Issue = eval("document.frmMain.hidIssDirty"+recordNumber);
Issue.value = "True"; 
}
if (dirtyType == 'Tranche'){
var Tranche = eval("document.frmMain.hidTrnDirty"+recordNumber);
Tranche.value = "True"; 
}
if (dirtyType == 'Product'){
var Product = eval("document.frmMain.hidPrdDirty"+recordNumber);
Product.value = "True"; 
}
if (dirtyType == 'Product2'){
var Product2 = eval("document.frmMain.hidPrd2Dirty"+recordNumber);
Product2.value = "True"; 
}
}
function popUpError( errDescription, errColumn ){
var sUrl = "calendar_custom_edit_EQ_popup_Error.asp?ErrorDescription="+errDescription+"&amp;ErrorColumn="+errColumn;
var sStyle = "width=450, height=320, scrollbars=1";
openGeneralPopup( sUrl, '', sStyle );
}
