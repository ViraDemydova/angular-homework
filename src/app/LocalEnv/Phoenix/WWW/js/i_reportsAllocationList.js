<!-- 
function sortServerSide(strSortBy1, strSortType, strTrnName)
{
setOrder()
var strURL = "reports_allocation_listEQ.asp?TRANCHE_NM=" + strTrnName + "&SortName=" + strSortBy1 + 
"&SortType=" + strSortType + "&SortOrder=" + document.frmMain.hidOrder.value;
document.frmMain.action = strURL;
document.frmMain.submit();
}
function setOrder()
{
if (document.frmMain.hidOrder.value == 'asc'){
document.frmMain.hidOrder.value = 'desc';
}
else{
document.frmMain.hidOrder.value = 'asc';
} 
}
function submitPage( frm, action)
{
switch (action)
{
case "Submit":
frm.method = "POST";
frm.hidAction.value = "Update";
frm.action = "util_submit_action.asp"; 
frm.submit();
break;
case "Printer":
frm.method = "POST";
frm.hidAction.value = "Printer";
frm.action = "reports_allocation_listeq.asp?Printer=1";
frm.submit();
break;
case "Export":
frm.method = "POST";
frm.hidAction.value = "Export";
frm.action = "reports_allocation_listeq.asp?Export=1";
frm.submit();
break;
case "Revert":
frm.method = "POST";
frm.hidAction.value = "Revert";
frm.action = "reports_allocation_listeq.asp";
frm.submit();
break;
}
}
function checkall(sId)
{
var box, bCheck;
if(sId == 'cbApprvCheckAll')
{
bCheck = document.frmMain.cbApprvCheckAll.checked;
box = document.frmMain.cbApproved;
}
else
{
bCheck = document.frmMain.cbAffrmCheckAll.checked;
box = document.frmMain.cbConfirmed;
}
if(box)
{
if(box.length) 
{
for( var i=0; i<box.length; i++)
{
if(box[i].disabled != true)
box[i].checked = bCheck;
}
}
else 
{
if(box.disabled != true)
box.checked = bCheck;
}
}
}
