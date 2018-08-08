<!-- 
function CloseWindow()
{
window.close() ;
}
function sortColumns(sColName)
{
var frm = document.frmMain;
if (frm.hidSortColumn.value != sColName)
{
frm.hidSortColumn.value = sColName;
frm.hidSortOrder.value = 'ascending';	
}
else
{
if (frm.hidSortOrder.value == 'ascending')
{
frm.hidSortOrder.value = 'descending';
}
else{
frm.hidSortOrder.value = 'ascending';
} 
}
frm.action = "prospectus_oneoff_contacts_send_hist.asp";
frm.submit();
}
function SendProspectus()
{
var nCount = 0 ;
var oElem = document.getElementById("hidProspectusEmailAddr") ;
var arrCheck = document.getElementsByName("chkSendProspectus");
if(arrCheck)
{
for(var i = 0; i < arrCheck.length; i++)
{
if(arrCheck[i].checked == true)
{
nCount = nCount + 1 ;
var sEmail = arrCheck[i].email ;
if(oElem) oElem.value = oElem.value + sEmail + ";" ;
}
}
}
if(nCount == 0)
{
alert("Please select a contact.") ;
return ;
}
var frm = document.frmMain;
frm.btnSendeProspectus.disabled=true;
frm.action = "util_submit_action.asp" ;
frm.hidAction.value = "SendToProspectusFromPT" ;
frm.submit() ;
}
function chkSelectAllClicked()
{
var oChkSelectAll ;
oChkSelectAll = document.getElementById("chkSelectAll") ;
if(oChkSelectAll)
{
var bChecked = oChkSelectAll.checked ;
var arrCheck = document.getElementsByName("chkSendProspectus");
if(arrCheck)
{
for(var i = 0; i < arrCheck.length; i++)
{
arrCheck[i].checked = bChecked;
}
}
}
}
