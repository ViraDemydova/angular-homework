<!-- 
function CheckConditionallyRequiredFields( frm, arrFieldsInError )
{
var arrMoreErrors = new Array();
return (arrMoreErrors);
} 
function CustomValidation( frm, arrFieldsInError )
{
var arrMoreErrors = new Array();
var sReg =/[|_,]+$/	
if (frm.hidAction.value == "Delete" && frm.hidPersonnelID.value == "")
{
var arrError = FieldErrorInfo("", "", "", "sRequestID", "Please select an item you would like to delete.");
arrError[2] = '';
arrMoreErrors[0] = arrError;
return (arrMoreErrors);
}	
if (frm.hidAction.value == "Update" || frm.hidAction.value == "Add")
{
if (frm.hidPersonnelType.value == "A")
{
if (frm.sLastName.value.length == 0)
{
var arrError = FieldErrorInfo("", "", "", "sLastName", "Please enter a Last Name");
arrError[2] = '';
arrMoreErrors[0] = arrError;	
return (arrMoreErrors);
} 
if (frm.sLastName.value.length > 64)
{
var arrError = FieldErrorInfo("", "", "", "sLastName", "Please do not enter more than 64 characters for Last Name");
arrError[2] = '';
arrMoreErrors[0] = arrError;	
return (arrMoreErrors);
} 
if (frm.sFirstName.value.length == 0)
{
var arrError = FieldErrorInfo("", "", "", "sFirstName", "Please enter a First Name");
arrError[2] = '';
arrMoreErrors[0] = arrError;	
return (arrMoreErrors);
} 
if (frm.sFirstName.value.length > 64)
{
var arrError = FieldErrorInfo("", "", "", "sFirstName", "Please do not enter more than 64 characters for First Name");
arrError[2] = '';
arrMoreErrors[0] = arrError;	
return (arrMoreErrors);
} 
if (frm.sEmail.value.length == 0)
{
var arrError = FieldErrorInfo("", "", "", "sEmail", "Please enter an E-Mail address");
arrError[2] = '';
arrMoreErrors[0] = arrError;	
return (arrMoreErrors);
} 
if (frm.sEmail.value.length > 128)
{
var arrError = FieldErrorInfo("", "", "", "sEmail", "Please do not enter more than 128 characters for E-Mail address");
arrError[2] = '';
arrMoreErrors[0] = arrError;	
return (arrMoreErrors);
}	
if (frm.sPhone.value.length > 30)
{
var arrError = FieldErrorInfo("", "", "", "sPhone", "Please do not enter more than 30 characters for Phone number");
arrError[2] = '';
arrMoreErrors[0] = arrError;	
return (arrMoreErrors);
} 
if (frm.sFax.value.length > 30)
{
var arrError = FieldErrorInfo("", "", "", "sFax", "Please do not enter more than 30 characters for Fax number");
arrError[2] = '';
arrMoreErrors[0] = arrError;	
return (arrMoreErrors);
} 
}	
if (frm.hidPersonnelType.value == "C")
{
if (frm.sName.value.length == 0)
{
var arrError = FieldErrorInfo("", "", "", "sName", "Please enter a Name");
arrError[2] = '';
arrMoreErrors[0] = arrError;	
return (arrMoreErrors);
} 
if (frm.sName.value.length > 64)
{
var arrError = FieldErrorInfo("", "", "", "sName", "Please do not enter more than 64 characters for Name");
arrError[2] = '';
arrMoreErrors[0] = arrError;	
return (arrMoreErrors);
} 
if (frm.sCode.value.length == 0)
{
var arrError = FieldErrorInfo("", "", "", "sCode", "Please enter a Code");
arrError[2] = '';
arrMoreErrors[0] = arrError;	
return (arrMoreErrors);
} 
if (frm.sCode.value.length > 10)
{
var arrError = FieldErrorInfo("", "", "", "sCode", "Please do not enter more than 10 characters for Code");
arrError[2] = '';
arrMoreErrors[0] = arrError;	
return (arrMoreErrors);
} 
if (frm.sPhone.value.length > 30)
{
var arrError = FieldErrorInfo("", "", "", "sPhone", "Please do not enter more than 30 characters for Phone number");
arrError[2] = '';
arrMoreErrors[0] = arrError;	
return (arrMoreErrors);
} 
if (frm.sFax.value.length > 30)
{
var arrError = FieldErrorInfo("", "", "", "sFax", "Please do not enter more than 30 characters for Fax number");
arrError[2] = '';
arrMoreErrors[0] = arrError;	
return (arrMoreErrors);
} 
}
if (frm.hidPersonnelType.value == "P")
{
if (frm.sPrinterName.value.length == 0)
{
var arrError = FieldErrorInfo("", "", "", "sPrinterName", "Please enter a Name");
arrError[2] = '';
arrMoreErrors[0] = arrError;	
return (arrMoreErrors);
} 
if (frm.sPrinterName.value.length > 64)
{
var arrError = FieldErrorInfo("", "", "", "sPrinterName", "Please do not enter more than 64 characters for Name");
arrError[2] = '';
arrMoreErrors[0] = arrError;	
return (arrMoreErrors);
} 
if (frm.sPrinterCode.value.length == 0)
{
var arrError = FieldErrorInfo("", "", "", "sPrinterCode", "Please enter a Code");
arrError[2] = '';
arrMoreErrors[0] = arrError;	
return (arrMoreErrors);
} 
if (frm.sPrinterCode.value.length > 10)
{
var arrError = FieldErrorInfo("", "", "", "sPrinterCode", "Please do not enter more than 10 characters for Code");
arrError[2] = '';
arrMoreErrors[0] = arrError;	
return (arrMoreErrors);
} 
} 
if (frm.hidPersonnelType.value == "T")
{ 
if (frm.sName.value.length == 0)
{
var arrError = FieldErrorInfo("", "", "", "sName", "Please enter a Name");
arrError[2] = '';
arrMoreErrors[0] = arrError;	
return (arrMoreErrors);
}
if(sReg.test(frm.sName.value))
{
var arrError = FieldErrorInfo("", "", "", "sName", "Invalid Name");
arrError[2] = '';
arrMoreErrors[0] = arrError;	
return (arrMoreErrors); 
} 
}	
if (frm.hidPersonnelType.value == "O")
{
if (frm.sLastName.value.length == 0)
{
var arrError = FieldErrorInfo("", "", "", "sLastName", "Please enter a Last Name");
arrError[2] = '';
arrMoreErrors[0] = arrError;	
return (arrMoreErrors);
}
if(sReg.test(frm.sLastName.value))
{
var arrError = FieldErrorInfo("", "", "", "sLastName", "Invalid Last Name");
arrError[2] = '';
arrMoreErrors[0] = arrError;	
return (arrMoreErrors); 
} 
if (frm.sFirstName.value.length == 0)
{
var arrError = FieldErrorInfo("", "", "", "sFirstName", "Please enter First Name");
arrError[2] = '';
arrMoreErrors[0] = arrError;	
return (arrMoreErrors);
} 
if(sReg.test(frm.sFirstName.value))
{
var arrError = FieldErrorInfo("", "", "", "sFirstName", "Invalid First Name");
arrError[2] = '';
arrMoreErrors[0] = arrError;	
return (arrMoreErrors); 
}
if (frm.sPhone.value.length == 0)
{
var arrError = FieldErrorInfo("", "", "", "sPhone", "Please enter Phone Number");
arrError[2] = '';
arrMoreErrors[0] = arrError;	
return (arrMoreErrors);
}
if(sReg.test(frm.sPhone.value))
{
var arrError = FieldErrorInfo("", "", "", "sPhone", "Invalid Phone Number");
arrError[2] = '';
arrMoreErrors[0] = arrError;	
return (arrMoreErrors); 
} 
}	
if (frm.hidPersonnelType.value != "P")
{
if(!frm.sDebt.checked && !frm.sEquity.checked)
{
var arrError = FieldErrorInfo("", "", "", "sDebt", "Please select a Debt and/or Equity type.");
arrError[2] = '';
arrMoreErrors[0] = arrError;	
return (arrMoreErrors);
}
}	
}	
return (arrMoreErrors);
} 
function submitPage( frm , action )
{
switch (action)
{ 
case "savechanges" :
frm.method = "POST";
if (frm.hidShowWarning != null)
frm.hidShowWarning.value = "True";
if (frm.hidPersonnelID.value == "")
frm.hidAction.value = "Add";
else
frm.hidAction.value = "Update";
frm.action = "util_submit_action_mastertables_personnel.asp";
if(ValidateForm( frm ))
frm.submit();
break; 
case "reverttosaved" :
frm.reset();
break;
case "cancel" :
frm.action = "/asp/mastertables_personnel.asp";
frm.submit();
break;
case "addreg" :
frm.action = "mastertables.asp";
frm.submit();
break;
case	"find" : 
frm.method = "POST";
frm.hidAction.value = action;
frm.action = "/asp/mastertables_personnel.asp";
frm.submit();	
break;
case	"create" :
frm.method = "POST"; 
frm.hidAction.value = action;
frm.action = "/asp/mastertables_personnel.asp";
frm.submit();	
break; 
case	"edit" : 
frm.method = "POST";
frm.hidAction.value = action;
frm.action = "/asp/mastertables_personnel.asp";
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
}
}
function setPersonnelID(personnelID, frm , action) 
{
frm.hidPersonnelID.value = personnelID;
submitPage( frm , action );
}
function onEnter()
{
if(document.frmSearch.sPersonnelName.value == ""){
submitPage(document.frmSearch, "create");
}
else{
submitPage(document.frmSearch, "find");
}	
} 
function onPageLoad()
{
menuShow('mastertables', 'tophide');
if(document.frmMain!=null)
{
if((document.frmMain.ICounselID!=null)&&(document.frmMain.sEquity!=null)
&&(document.frmMain.sDebt!=null))
{
CreateAttorneyFlag();	
}
}
}
function CreateAttorneyFlag()
{
if(document.frmMain!=null)
{
if(document.frmMain.hidAttorneyDebtEqFlag!=null)
{
if((!document.frmMain.sEquity.checked)&&(!document.frmMain.sDebt.checked))
{
SelectAttorneyFlag();
}
else
{
sCounselId = document.frmMain.ICounselID.value;
sFlagValue = document.frmMain("flg"+sCounselId).value;
if(sFlagValue == "B")
{
document.frmMain.sEquity.disabled = false;
document.frmMain.sDebt.disabled = false; 
}
}
}
}
}
function SelectAttorneyFlag()
{
sCounselId = document.frmMain.ICounselID.value;
sFlagValue = document.frmMain("flg"+sCounselId).value;
if(sFlagValue=="E")
{
document.frmMain.sEquity.disabled = true;
document.frmMain.sDebt.disabled = true;
document.frmMain.sEquity.checked = true;
document.frmMain.sDebt.checked = false;
}
else if(sFlagValue=="D")
{
document.frmMain.sEquity.disabled = true;
document.frmMain.sDebt.disabled = true;
document.frmMain.sEquity.checked = false;
document.frmMain.sDebt.checked = true;
}
else
{
document.frmMain.sDebt.checked = true;
document.frmMain.sEquity.checked = true;
document.frmMain.sEquity.disabled = false;
document.frmMain.sDebt.disabled = false;
}
ChangeAttorneyFlag();
}
function ChangeAttorneyFlag()
{
if(document.frmMain.sDebt.checked)
{
if(document.frmMain.sEquity.checked)
{
document.frmMain.hidAttorneyDebtEqFlag.value = "B";
}
else
{
document.frmMain.hidAttorneyDebtEqFlag.value = "D";
}
}
else if(document.frmMain.sEquity.checked)
{
document.frmMain.hidAttorneyDebtEqFlag.value = "E";
}
else
{
document.frmMain.hidAttorneyDebtEqFlag.value = "";
}
}
function SelectTransferAgentFlag()
{
sTransferAgentId = document.frmMain.ITransferAgentID.value;
sFlagValue = document.frmMain("flg"+sTransferAgentId).value;
if(sFlagValue=="E")
{
document.frmMain.sEquity.disabled = true;
document.frmMain.sDebt.disabled = true;
document.frmMain.sEquity.checked = true;
document.frmMain.sDebt.checked = false;
}
else if(sFlagValue=="D")
{
document.frmMain.sEquity.disabled = true;
document.frmMain.sDebt.disabled = true;
document.frmMain.sEquity.checked = false;
document.frmMain.sDebt.checked = true;
}
else
{
document.frmMain.sDebt.checked = true;
document.frmMain.sEquity.checked = true;
document.frmMain.sEquity.disabled = false;
document.frmMain.sDebt.disabled = false;
}
ChangeTransferAgentContactFlag();
}
function ChangeTransferAgentFlag()
{
if(document.frmMain.sDebt.checked)
{
if(document.frmMain.sEquity.checked)
{
document.frmMain.hidTransferAgentDebtEqFlag.value = "B";
}
else
{
document.frmMain.hidTransferAgentDebtEqFlag.value = "D";
}
}
else if(document.frmMain.sEquity.checked)
{
document.frmMain.hidTransferAgentDebtEqFlag.value = "E";
}
else
{
document.frmMain.hidTransferAgentDebtEqFlag.value = "";
}
}
function ChangeTransferAgentContactFlag()
{
if(document.frmMain.sDebt.checked)
{
if(document.frmMain.sEquity.checked)
{
document.frmMain.hidTransferAgentContactDebtEqFlag.value = "B";
}
else
{
document.frmMain.hidTransferAgentContactDebtEqFlag.value = "D";
}
}
else if(document.frmMain.sEquity.checked)
{
document.frmMain.hidTransferAgentContactDebtEqFlag.value = "E";
}
else
{
document.frmMain.hidTransferAgentContactDebtEqFlag.value = "";
}
}
