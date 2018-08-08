<!-- 
RSEnableRemoteScripting("/_ScriptLibrary")
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
function submitPage(frm, action)
{
switch (action)
{
case "add" :
if ( ValidateForm(frm) )
{
frm.action = "util_submit_action.asp";
frm.hidAction.value = "AddPermissions";
frm.submit();
}
break;
case "delete":
if ( ValidateForm(frm) )
{
frm.action = "util_submit_action.asp";
frm.hidAction.value = "DeletePermissions";
frm.submit();
}
break; 
case "search":
if ( ValidateSearch() )
{
frm.action = "IssueMaint_IssueControl_Permission.asp?" + 
"mode=" + document.frmMain.hidMode.value + 
"&trn_id=" + document.frmMain.hidTrnId.value + 
"&searchTxt=" + document.frmMain.txtSearch.value + 
"&searchBy=" + document.frmMain.selSearchBy.value;
frm.submit();
}
break; 
case "UpdateTrancheControlRetailFlags":
if ( ValidateForm(frm) )
{
frm.action = "util_submit_action.asp";
frm.hidAction.value = "UpdateTrancheControlRetailFlags";
frm.submit();
}
break; 
}
}
function onEnter()
{
if(document.frmMain.hidAction.value == "UpdateTrancheControlRetailFlags")
{
submitPage( document.frmMain, "UpdateTrancheControlRetailFlags" );
}
else if ( ValidateSearch() )
{
submitPage( document.frmMain, "search" );
}
} 
function ValidateSearch()
{
if ( document.frmMain.txtSearch.value.length<2 ) 
{
alert("You must enter two characters of the last name in order to search for a sales user.");
return 0;
}
return 1;
} 
function CallBackExpand(divEntity)
{
if (divEntity.nodeType != 'dynamic')
{
return;
}
var sID = divEntity.id;
var sTreeType = sID.substr(0,1);
var sRegionID = divEntity.name;
var co;
if (sTreeType == 's')
{
co = RSExecute('rs_IssueMaint_IssueControl_permission.asp', 'js_RetrieveSalesHierarchy', sRegionID);
}
else
{
var sTrnId = document.frmMain.hidTrnId.value;
var sMode = document.frmMain.hidMode.value;
co = RSExecute('rs_IssueMaint_IssueControl_permission.asp', 'js_RetrieveTrancheOrderPermission', sTrnId, sMode, sRegionID);
}
var strResult = co.return_value;
if (strResult && strResult != "")
{
divEntity.innerHTML = strResult;
}
}
function SaveRetailFlags()
{
document.frmMain.hidAction.value = "UpdateTrancheControlRetailFlags";
document.frmMain.submit();
}
