<!-- 
function CheckConditionallyRequiredFields( frm, arrFieldsInError )
{
var arrMoreErrors = new Array();
return (arrMoreErrors);
} 
function CustomValidation( frm, arrFieldsInError )
{
var arrMoreErrors = new Array();
if (frm.hidAction.value == "Delete" && frm.ihidSecTypeID.value == "")
{
var arrError = FieldErrorInfo("", "", "", "iRequestID", "Please select an item you would like to delete.");
arrError[2] = '';
arrMoreErrors[0] = arrError;
return (arrMoreErrors);
}	
if (frm.hidAction.value == "Update" || frm.hidAction.value == "Add")
{
if (frm.sName.value.length == 0)
{
var arrError = FieldErrorInfo("", "", "", "sName", "Trademark Security Name required");
arrError[2] = '';
arrMoreErrors[0] = arrError;	
return (arrMoreErrors);
}
if (frm.sCode.value.length == 0)
{
var arrError = FieldErrorInfo("", "", "", "sCode", "Trademark Security Acronym required");
arrError[2] = '';
arrMoreErrors[0] = arrError;	
return (arrMoreErrors);
}
if (frm.sName.value.length > 64)
{
var arrError = FieldErrorInfo("", "", "", "sName", "Please do not enter more than 64 characters in the Name field");
arrError[2] = '';
arrMoreErrors[0] = arrError;	
return (arrMoreErrors);
}
if (frm.sCode.value.length > 50)
{
var arrError = FieldErrorInfo("", "", "", "sCode", "Please do not enter more than 50 characters in the Code field");
arrError[2] = '';
arrMoreErrors[0] = arrError;	
return (arrMoreErrors);
} 
var sSelected = document.frmMain.iIssTypeID.options[document.frmMain.iIssTypeID.selectedIndex].text
if(sSelected != "Bond" && sSelected != "Preferred")
{
if (!frm.sIOICashInd.checked && !frm.sIOIUnitsInd.checked && !frm.sIOIFaceInd.checked)
{
var arrError = FieldErrorInfo("", "", "", "sIOICashInd", "IOI Options required");
arrError[2] = '';
arrMoreErrors[0] = arrError;	
return (arrMoreErrors);
} 
}	
}	
return (arrMoreErrors);
return (arrMoreErrors);
} 
function onPageLoad()
{
if (fnExists('menuShow'))
menuShow('mastertables', 'tophide');
onChangeIssueType();
var frm = document.frmMain;
if (frm.hidCalledFrom.value == 'import_deal')
frm.iIssTypeID.disabled=true;
}
function submitPage( frm , action )
{
switch (action)
{
case	"savechanges" : 
frm.method = "POST";
if (frm.ihidSecTypeID.value == "")
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
frm.action = "/asp/_template.asp";
frm.submit();
break;
case	"find" :
frm.method = "POST";
frm.hidAction.value = action;
frm.action = "/asp/mastertables_trademarksecurities.asp";
frm.submit();	
break;
case	"create" :
frm.method = "POST"; 
frm.hidAction.value = action;
frm.action = "/asp/mastertables_trademarksecurities.asp";
frm.submit();	
break; 
case	"viewAll" :
frm.method = "POST"; 
frm.hidAction.value = action;
frm.action = "/asp/mastertables_trademarksecurities.asp";
frm.submit();	
break; 
case	"edit" :
frm.method = "POST";
frm.hidAction.value = "find";
frm.action = "/asp/mastertables_trademarksecurities.asp";
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
function setSubmitPage(iRequestID, frm , action ) 
{
frm.iRequestID.value = iRequestID;
submitPage( frm , action );
} 
function onEnter()
{
var keyCode = event.keyCode;
if (keyCode == 13){
submitPage(document.frmMain, "find");
}	
} 
function onChangeIssueType()
{
if ( typeof(document.frmMain.iIssTypeID)=="undefined" )
return;
var sSelected = document.frmMain.iIssTypeID.options[document.frmMain.iIssTypeID.selectedIndex].text;
document.frmMain.hidSelIssTypeId.value = document.frmMain.iIssTypeID.value;
if(sSelected == "Bond")
{
btnsIOIOptions.style.display = 'none';
btnOID.style.display = 'none';
txtOID.style.display = 'none';
divIOICashInd.disabled = false;
document.frmMain.sIOICashInd.checked = false;
document.frmMain.sIOIFaceInd.checked = true;
document.frmMain.sIOIUnitsInd.checked = false;
document.frmMain.sOidInd.checked = false;
}
else if(sSelected == "Preferred")
{
btnsIOIOptions.style.display = 'none';
btnOID.style.display = 'none';
txtOID.style.display = 'none';
divIOICashInd.disabled = false;
document.frmMain.sIOICashInd.checked = false;
document.frmMain.sIOIFaceInd.checked = false;
document.frmMain.sIOIUnitsInd.checked = true;
document.frmMain.sOidInd.checked = false;
}
else if (sSelected == "Convertible Bond")
{
btnsIOIOptions.style.display = 'block';
divIOIFaceInd.style.display = 'block';
divCBOptions.style.display='block';
divCBCaption.style.display='block';
var divIOIUnitContent = divIOIUnitsInd.innerHTML;
divIOIUnitsInd.innerHTML = divIOIUnitContent.replace("Shares","Bonds");
btnOID.style.display = 'inline';
txtOID.style.display = 'inline';
onClickOID();
PopulateDisplayOrder();
}
else if (sSelected == "Common Stock" ||
sSelected == "Equity Units" ||
sSelected == "Convertible Pref")
{
btnsIOIOptions.style.display = 'block';
divIOIFaceInd.style.display = 'none';
var divIOIUnitContent = divIOIUnitsInd.innerHTML;
divIOIUnitsInd.innerHTML = divIOIUnitContent.replace("Bonds","Shares");
btnOID.style.display = 'none';
txtOID.style.display = 'none';
divIOICashInd.disabled = false;
divCBOptions.style.display='none';
divCBCaption.style.display='none';
document.frmMain.sIOIFaceInd.checked = false;
document.frmMain.sOidInd.checked = false;
}
else
{
btnsIOIOptions.style.display = 'block';
btnOID.style.display = 'none';
txtOID.style.display = 'none';
divIOICashInd.disabled = false;
}
} 
function onClickOID()
{
if(document.frmMain.sOidInd.checked == true)
divIOICashInd.disabled = false;
else
{
divIOICashInd.disabled = true;
document.frmMain.sIOICashInd.checked = false;
PopulateDisplayOrder()
}
}
function PopulateDisplayOrder()
{
var selElem, optElem;
var i;
selElem = document.frmMain.selFirstOrder;
while( selElem.length > 1)
selElem.options.remove(1);
selElem = document.frmMain.selSecondOrder;
while( selElem.length > 1)
selElem.options.remove(1);
selElem = document.frmMain.selThirdOrder;
while( selElem.length > 1)
selElem.options.remove(1);
if (document.frmMain.sIOICashInd.checked == true)
{
optElem = document.createElement("OPTION");
optElem.text = document.frmMain.hidCash.value;
optElem.value = 'C';
document.frmMain.selFirstOrder.options.add(optElem);
optElem = document.createElement("OPTION");
optElem.text = document.frmMain.hidCash.value;
optElem.value = 'C';
document.frmMain.selSecondOrder.options.add(optElem);
optElem = document.createElement("OPTION");
optElem.text = document.frmMain.hidCash.value;
optElem.value = 'C';
document.frmMain.selThirdOrder.options.add(optElem);
}
if (document.frmMain.sIOIFaceInd.checked == true)
{
optElem = document.createElement("OPTION");
optElem.text = document.frmMain.hidFace.value;
optElem.value = 'F';
document.frmMain.selFirstOrder.options.add(optElem);
optElem = document.createElement("OPTION");
optElem.text = document.frmMain.hidFace.value;
optElem.value = 'F';
document.frmMain.selSecondOrder.options.add(optElem);
optElem = document.createElement("OPTION");
optElem.text = document.frmMain.hidFace.value;
optElem.value = 'F';
document.frmMain.selThirdOrder.options.add(optElem);
}
if (document.frmMain.sIOIUnitsInd.checked == true)
{	
optElem = document.createElement("OPTION");
optElem.text = document.frmMain.hidUnits.value;
optElem.value = 'U';
document.frmMain.selFirstOrder.options.add(optElem);
optElem = document.createElement("OPTION");
optElem.text = document.frmMain.hidUnits.value;
optElem.value = 'U';
document.frmMain.selSecondOrder.options.add(optElem);
optElem = document.createElement("OPTION");
optElem.text = document.frmMain.hidUnits.value;
optElem.value = 'U';
document.frmMain.selThirdOrder.options.add(optElem);
}
if (document.frmMain.hidIOIOrder.value.length > 0)
{
var sOrderVal = document.frmMain.hidIOIOrder.value.split(",")
selElem = document.frmMain.selFirstOrder;
if (sOrderVal.length >= 1) 
{
for (i = 0; i < selElem.options.length; i++)
{
if (selElem.options.item(i).value == sOrderVal[0])
selElem.selectedIndex = i;
}
} 
selElem = document.frmMain.selSecondOrder;
if (sOrderVal.length >= 2) 
{
for (i = 0; i < selElem.options.length; i++)
{
if (selElem.options.item(i).value == sOrderVal[1])
selElem.selectedIndex = i;
}
} 
selElem = document.frmMain.selThirdOrder;
if (sOrderVal.length >= 3) 
{
for (i = 0; i < selElem.options.length; i++)
{
if (selElem.options.item(i).value == sOrderVal[2])
selElem.selectedIndex = i;
}
} 
}
}
function OnSelChangeOrder()
{
var sOrder;
var index;
index = document.frmMain.selFirstOrder.selectedIndex;
sOrder = document.frmMain.selFirstOrder.options.item(index).value + ",";
index = document.frmMain.selSecondOrder.selectedIndex;
sOrder = sOrder + document.frmMain.selSecondOrder.options.item(index).value + ",";
index = document.frmMain.selThirdOrder.selectedIndex;
sOrder = sOrder + document.frmMain.selThirdOrder.options.item(index).value + ",";
document.frmMain.hidIOIOrder.value = sOrder;
}
