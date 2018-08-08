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
function AddSalesRepUserSubmit()
{
var frm = document.frmAddSalesRepUser;
if (frm.hidMode.value == "ManageSalesRep")
{
var iTotalCnt = frm.txtUserCount.value;
var arrUsers = new Array();
var iCtr = 0;
for(var i = 1; i <= iTotalCnt; i++)
{
var elemChk = document.getElementById("chkSalesRepUser_" + i);
if (elemChk && elemChk.checked)
{
arrUsers[iCtr] = new Object();
arrUsers[iCtr].up_id = elemChk.value;
var elemText = document.getElementById("hidUserName_" + i);
arrUsers[iCtr].user_name = elemText.value;
iCtr++;
}
}
window.opener.AddUsersToList(arrUsers);
window.close();
}
else
{
frm.action = "/asp/util_submit_action.asp";
frm.hidAction.value = "BatchSalesRepAdd";
frm.submit();
}
}
