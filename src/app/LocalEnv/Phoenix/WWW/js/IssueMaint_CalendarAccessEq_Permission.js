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
function submitPage(frm, action)
{
switch (action)
{
case "add" :
if ( ValidateForm(frm) && ValidateAddDelete("chkRgn") )
{
frm.action = "util_submit_action.asp";
frm.hidAction.value = "AddDealCalendarAccess"; 
frm.submit();
}
break;
case "delete":
if ( ValidateForm(frm) && ValidateAddDelete("chkDelRgn"))
{
frm.action = "util_submit_action.asp";
frm.hidAction.value = "DeleteDealCalendarAccess";
frm.submit();
}
break; 
case "cancel" :
self.window.opener.focus();
self.close();
break;
}
}
function onEnter()
{
if ( ValidateSearch() )
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
}
function ValidateAddDelete(checkboxname)
{
var childs = document.getElementsByName(checkboxname);
var len = childs.length;
var bCheckedInd = false;
for(var i=0; i<len; i++)
{
if(childs.item(i).checked)
bCheckedInd = true;
}
if(len == 0)
{
var alertMsg = "";
if(checkboxname == "chkRgn")
alertMsg = "There are no regions to add permissions for.";
else
alertMsg = "There are no regions to remove permissions for.";
alert(alertMsg); 
return 0;	
}
else if(!bCheckedInd)
{
var alertMsg = "";
if(checkboxname == "chkRgn")
alertMsg = "Please select at least one region to add permissions for.";
else
alertMsg = "Please select at least one region to remove permissions for.";
alert(alertMsg); 
return 0;
}
else
return 1;
}
