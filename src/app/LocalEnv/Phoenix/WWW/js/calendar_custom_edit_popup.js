<!-- 
function onPageLoad()
{
onChangeCheckbox( frmMain.sChkSelectedFields, frmMain.sRdoEditTypes );
checkAll( frmMain.sChkSelectedFields )
}
function CheckConditionallyRequiredFields( frm, arrFieldsInError )
{
var arrMoreErrors = new Array();
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
function editFields( frm, debtEquityFlag ){
var blnSelectedValue;
var sListOfColValues = "";
var sListOfIssueIDs = frm.hidListOfIssueIds.value;
var isAtLeastOneChecked = false;
for (var i=0; i<frm.sChkSelectedFields.length; i++){
if (frm.sChkSelectedFields[i].checked){
isAtLeastOneChecked = true;
}
} 
if (isAtLeastOneChecked){
for (var i=0; i<frm.sChkSelectedFields.length; i++){
if (frm.sChkSelectedFields[i].checked){
blnSelectedValue = "T";
}
else{ 
blnSelectedValue = "F";
}
sListOfColValues = sListOfColValues+blnSelectedValue;
}
sListOfColValues = sListOfColValues+"F";
self.close();
if (debtEquityFlag == "D"){
self.window.opener.location.href = "calendar_custom_edit_FI.asp?Action=Edit&amp;ListOfIssues="+sListOfIssueIDs+"&amp;columnValues="+sListOfColValues;
}
else{
self.window.opener.location.href = "calendar_custom_edit_EQ.asp?Action=Edit&amp;ListOfIssues="+sListOfIssueIDs+"&amp;columnValues="+sListOfColValues;
}
self.window.opener.focus();
}
}
function checkAll( lst )
{
toggleCheck( lst, true );
}
function checkNone( lst )
{
toggleCheck( lst, false );
}
function toggleCheck( lst, b )
{
for( var i=0; i<lst.length; i++)
{
lst[i].checked=b;
}
}
function IsAllChecked ( lst ) {
var b = true;
for( var i=0; i<lst.length; i++) 
b = b && lst[i].checked;
return b; 
}
function onChangeCheckbox( lst, opt )
{
if( IsAllChecked(lst) ) {
opt[0].checked = true;
} else {
opt[1].checked = true;
} 
}
