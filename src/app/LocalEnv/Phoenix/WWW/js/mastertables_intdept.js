<!-- 
function onPageLoad()
{
if (fnExists('menuShow'))
menuShow('mastertables', 'tophide');
}
function CheckConditionallyRequiredFields( frm, arrFieldsInError )
{
var arrMoreErrors = new Array();	
var count = 0;	
return (arrMoreErrors);
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
case "savechanges" :
frm.method = "POST";
if (frm.hidIntDeptID.value == "")
frm.hidAction.value = "Add";
else
frm.hidAction.value = "Update";
frm.action = "/asp/util_submit_action.asp";
if(ValidateForm( frm )) 
frm.submit();
break; 
case "reverttosaved" :
frm.reset();
break;
case "cancel" :
frm.action = frm.hidCalledFromPage.value;
frm.submit();
break;
case "addreg" :
frm.action = "mastertables.asp";
frm.submit();
break;
case	"find" :
frm.method = "POST";
frm.hidAction.value = action;
frm.action = "/asp/mastertables_intdept.asp";
if(ValidateForm( frm )) 
frm.submit();	
break;
case	"create" :
frm.method = "POST"; 
frm.hidAction.value = action;
frm.action = "/asp/mastertables_intdept.asp";
frm.submit();	
break; 
case	"edit" :
frm.method = "POST";
frm.hidAction.value = "edit";
frm.action = "/asp/mastertables_intdept.asp";
frm.submit();	
break; 
case	"delete" :
if(!ValidateForm( frm ))
return;	
frm.method = "POST";
frm.hidAction.value = "Delete";
frm.action = "/asp/util_submit_action.asp";
if(ValidateForm( frm )) 
frm.submit();
break; 
case	"viewAll" :
frm.method = "POST"; 
frm.hidAction.value = action;
frm.action = "mastertables_intdept.asp";
frm.submit();	
break; 
}
}
function onEnter()
{
var keyCode = event.keyCode;
if (keyCode == 13){
submitPage(document.frmSearch, "edit");
}	
} 
