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
function submitPage( frm, action )
{
switch (action)
{
case "savechanges" :
frm.hidSyndMembersKnownBy.value = "";
for( var i=0; i<frm.selSyndMembersKnownBy.length; i++ )
{
if ( frm.selSyndMembersKnownBy.options[i].value>0 )
{
frm.hidSyndMembersKnownBy.value += frm.selSyndMembersKnownBy.options[i].value;
if ( i!=frm.selSyndMembersKnownBy.length-1 ) {
frm.hidSyndMembersKnownBy.value += ",";
}
} 
}
window.opener.document.frmMain.MasterBookCtrl.RefreshFromKnownBy();
frm.method = "POST";
frm.action = "util_submit_action.asp";
frm.submit();
break;
}
}
function addMember()
{
var selSyndMembers = document.frmMain.selSyndMembers;
var selSyndMembersKnownBy = document.frmMain.selSyndMembersKnownBy;
for( var i=0; i<selSyndMembers.length; i++ )
{
var oItem = selSyndMembers.options.item(i);
if ( oItem.selected==false || oItem.value=="" ) 
continue;
var found = false;
for( var j=0; j<selSyndMembersKnownBy.length; j++ )
{
var oItem2 = selSyndMembersKnownBy.options.item(j);
if ( oItem.value==oItem2.value ) {
found = true;
}
}
if ( found==false ) 
{
var oOption = document.createElement("OPTION");
selSyndMembersKnownBy.options.add(oOption);
oOption.innerText = oItem.innerText;
oOption.value = oItem.value;
}
}
} 
function deleteMember()
{
var selSyndMembersKnownBy = document.frmMain.selSyndMembersKnownBy;
for( var i=0; i<selSyndMembersKnownBy.length; i++ )
{
if ( selSyndMembersKnownBy.options.item(i).selected ) {
selSyndMembersKnownBy.options.remove(i--);
}
}
}
