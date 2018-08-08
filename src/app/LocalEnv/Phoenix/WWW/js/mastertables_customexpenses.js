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
function submitPage( frm , action )
{
switch (action)
{
case "savechanges" :
frm.method = "POST";
if (frm.hidExpenseTypeID.value == "")
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
frm.action = "/asp/mastertables_customexpenses.asp";
frm.submit();
break;
case	"create" :
frm.method = "POST"; 
frm.hidAction.value = action;
frm.action = "/asp/mastertables_customexpenses.asp";
frm.submit();	
break; 
case	"edit" :
frm.method = "POST";
frm.hidExpenseTypeID.value = frm.selCustExpType.value; 
frm.hidAction.value = "edit";
frm.action = "/asp/mastertables_customexpenses.asp";
frm.submit();	
break; 
case	"editfromviewall" :
frm.method = "POST";
frm.hidAction.value = "edit";
frm.action = "/asp/mastertables_customexpenses.asp";
frm.submit();	
break; 
case	"viewAll" :
frm.method = "POST"; 
frm.hidAction.value = action;
frm.action = "mastertables_customexpenses.asp";
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
function loadExpenseType(frm, lExpenseID)
{
frm.hidExpenseTypeID.value = lExpenseID;
submitPage(frm, "editfromviewall");
}
