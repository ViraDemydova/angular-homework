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
if (frm.radPotType[0].checked == false && frm.radPotType[1].checked == false){
var arrError = FieldErrorInfo("radPotType", 'Please select Pot Type.', "", "radPotType[1]", "Pot Type");
arrMoreErrors[count++] = arrError;	
}
if ( frm.chkInactive.checked==false && frm.iSelBroker.selectedIndex==0 ) 
{
var arrError = FieldErrorInfo("iSelBroker", 'Please select Default Subsidiary.', "", "iSelBroker", "Default Subsidiary");
arrMoreErrors[count++] = arrError;	
}	
if (frm.radPopulate[0].checked == false && frm.radPopulate[1].checked == false){
var arrError = FieldErrorInfo("radPopulate", 'Please select Yes Or No for Populate Master Book Directly', "", "radPopulate[1]", "Populate Directly");
arrMoreErrors[count++] = arrError;	
}
return (arrMoreErrors);
} 
function CustomValidation( frm, arrFieldsInError )
{
var arrMoreErrors = new Array();
return (arrMoreErrors);
} 
function ToggleEuroAsiaProcess( type )
{
var frm = document.frmMain;
var radEuroProcess = frm.radEuroProcess;
var radAsiaProcess = frm.radAsiaProcess;
if(radEuroProcess[0] != null && radAsiaProcess[0] != null)
{
if (type == 'asia')
{
radEuroProcess[0].checked = false;
radEuroProcess[1].checked = true;
}
if (type == 'euro')
{
radAsiaProcess[0].checked = false;
radAsiaProcess[1].checked = true; 
} 
}
}
function submitPage( frm , action )
{
switch (action)
{
case "savechanges" :
frm.method = "POST";
if (frm.hidTrancheID.value == "")
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
frm.action = "/asp/mastertables_tranche.asp";
if(ValidateForm( frm )) 
frm.submit();	
break;
case	"create" :
frm.method = "POST"; 
frm.hidAction.value = action;
frm.action = "/asp/mastertables_tranche.asp";
frm.submit();	
break; 
case	"edit" :
frm.method = "POST";
frm.hidAction.value = "edit";
frm.action = "/asp/mastertables_tranche.asp";
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
frm.action = "mastertables_tranche.asp";
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
