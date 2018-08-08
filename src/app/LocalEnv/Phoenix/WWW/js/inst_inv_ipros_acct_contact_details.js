var oSelSalesDefault, oSelSectorsDefault;
function CheckConditionallyRequiredFields( frm, arrFieldsInError )
{
var arrMoreErrors = new Array();
return (arrMoreErrors);
} 
function CustomValidation( frm, arrFieldsInError )
{
var arrMoreErrors = new Array();
if (frm.hidAction.value == "AddiProspectusContact" || frm.hidAction.value == "UpdateiProspectusContact")
{
var arrError;
var reEmail = /^(?:[\w-]+\.?)*[\w-]+@(?:[\w-]+\.?)*[\w-]+$/;
if (frm.lName.value.length == 0)
{
arrError = FieldErrorInfo("", "", "", "lName", "Please Enter Last Name!");
}
else if (frm.fName.value.length == 0)
{
arrError = FieldErrorInfo("", "", "", "fName", "Please Enter First Name!");
}
else if (frm.email.value.length == 0)
{
arrError = FieldErrorInfo("", "", "", "email", "Please Enter Email Address!");
}
else if(!(reEmail.test(frm.email.value)))
{
arrError = FieldErrorInfo("", "", "", "email", "Email Address is not valid!");
}
else if(frm.email.value.match("hotmail.com") ||
frm.email.value.match("yahoo.com") ||
frm.email.value.match("gmail.com"))
{
arrError = FieldErrorInfo("", "", "", "email", "Public Email Service is not Allowed!");
}
else if(!frm.assoProdCommonStockCheck.checked && !frm.assoProdConvertibleBondCheck.checked
&& !frm.assoProdConvertiblePreferredCheck.checked)
{
arrError = FieldErrorInfo("", "", "", "assoProd", "Please check at least one Associated Product!");
}
else if(frm.selSectors.selectedIndex < 0)
{
arrError = FieldErrorInfo("", "", "", "selSectors", "Please select at least one associated sector!");
}
}
if(arrError != null)
{
arrError[2] = '';
arrMoreErrors[0] = arrError;	
return (arrMoreErrors);
}
return (arrMoreErrors);
} 
function onPageLoad()
{
var i;
oSelSalesDefault = document.createElement("select");
oSelSalesCurrent = document.getElementById("selSalesCurrent");
if(oSelSalesCurrent != null)
{
for (i=0; i < oSelSalesCurrent.options.length; i++)
{
oOption = document.createElement("option");
oSelSalesDefault.options.add(oOption);
oOption.innerText = oSelSalesCurrent.options[i].text;
oOption.value = oSelSalesCurrent.options[i].value;
}
}
oSelSectorsDefault = document.createElement("select");
oSelSectors = document.getElementById("selSectors");
if(oSelSectors != null)
{
for (i=0; i < oSelSectors.options.length; i++) {
if (oSelSectors.options[i].selected) 
{
oOption = document.createElement("option");
oSelSectorsDefault.options.add(oOption);
oOption.innerText = oSelSectors.options[i].text;
oOption.value = oSelSectors.options[i].value;
}
}
}
}
function submitPage( frm , action )
{
switch (action)
{
case "savechanges" :
frm.method = "POST";
if (frm.hidiProsContactID.value == null || frm.hidiProsContactID.value == "" || frm.hidiProsContactID.value == "-1")
frm.hidAction.value = "AddiProspectusContact";
else
frm.hidAction.value = "UpdateiProspectusContact";
frm.action = "/asp/util_submit_action.asp";
if(ValidateForm( frm ))
{ 
var i;
oSelSalesCurrent = document.getElementById("selSalesCurrent");
if(oSelSalesCurrent != null)
{
if(oSelSalesCurrent.options.length > 0)
{
frm.hidSelSalesCurrent.value = frm.hidSelSalesCurrent.value + oSelSalesCurrent.options[0].value;
}
for (i=0; i < oSelSalesCurrent.options.length; i++)
{
frm.hidSelSalesCurrent.value = frm.hidSelSalesCurrent.value + "," + oSelSalesCurrent.options[i].value;
}
} 
if(oSelSalesDefault != null)
{
if(oSelSalesDefault.options.length > 0)
{
frm.hidSelSalesDefault.value = frm.hidSelSalesDefault.value + oSelSalesDefault.options[0].value;
}
for (i=0; i < oSelSalesDefault.options.length; i++)
{
frm.hidSelSalesDefault.value = frm.hidSelSalesDefault.value + "," + oSelSalesDefault.options[i].value;
}
} 
oSelSectors = document.getElementById("selSectors");
if(oSelSectors != null)
{
frm.hidSelSectors.value = "";
for (i=0; i < oSelSectors.options.length; i++)
{	
if (oSelSectors.options[i].selected) 
{
if(frm.hidSelSectors.value == "")
{
frm.hidSelSectors.value = frm.hidSelSectors.value + oSelSectors.options[i].text;
}
else
{
frm.hidSelSectors.value = frm.hidSelSectors.value + "," + oSelSectors.options[i].text;
}
}
}
} 
if(oSelSectorsDefault != null)
{
if(oSelSectorsDefault.options.length > 0)
{
frm.hidSelSectorsDefault.value = frm.hidSelSectorsDefault.value + oSelSectorsDefault.options[0].text;
}
for (i=0; i < oSelSectorsDefault.options.length; i++)
{
frm.hidSelSectorsDefault.value = frm.hidSelSectorsDefault.value + "," + oSelSectorsDefault.options[i].text;
}
} 
frm.submit();
}
break; 
case "reverttosaved" :
frm.reset();
var i;
for (i= frm.selSalesCurrent.options.length - 1; i >= 0; i--)
{
frm.selSalesCurrent.remove(i);
}
for (i=0; i < oSelSalesDefault.options.length; i++)
{
oOption = document.createElement("option");
frm.selSalesCurrent.options.add(oOption);
oOption.innerText = oSelSalesDefault.options[i].text;
oOption.value = oSelSalesDefault.options[i].value;
}
break;
case "cancel" :
frm.action = "mastertables.asp";
frm.submit();
break;
case "addreg" :
frm.action = "mastertables.asp";
frm.submit();
break;
case	"find" :
frm.method = "POST";
frm.hidAction.value = action;
frm.action = "/asp/mastertables_inst_investors.asp";
if(ValidateForm( frm )) 
frm.submit();	
break;
case	"create" :
frm.method = "POST"; 
frm.hidAction.value = action;
frm.action = "/asp/mastertables_inst_investors.asp";
frm.submit();	
break; 
case	"edit" :
frm.method = "POST";
frm.hidAction.value = "edit";
frm.action = "/asp/mastertables_inst_investors.asp";
frm.submit();	
break; 
case	"delete" : 
frm.method = "POST";
frm.hidAction.value = "Delete";
frm.action = "/asp/util_submit_action.asp";
if(ValidateForm( frm )) 
frm.submit();
break; 
}
}
function SelectAllSectors()
{
var oAssociatedSectorsCheck, oSelSectors;
oAssociatedSectorsCheck = document.getElementById("associatedSectorsCheck");
oSelSectors = document.getElementById("selSectors");
for (var i=0; i < oSelSectors.options.length; i++) {
oSelSectors.options[i].selected = oAssociatedSectorsCheck.checked;
}
}
function SetCheckAll()
{
}
function removeSales()
{
oSelSalesCurrent = document.getElementById("selSalesCurrent");
if(oSelSalesCurrent != null)
{
var i = oSelSalesCurrent.selectedIndex;	
if(i >= 0)
oSelSalesCurrent.remove(i);
}
}
function addSales()
{
oDdSalesCoverage = document.getElementById("ddSalesCoverage");
oSelSalesCurrent = document.getElementById("selSalesCurrent");
oHidOneOffContact = document.getElementById("hidOneOffContact");
if(oHidOneOffContact != null && oHidOneOffContact.value != "1" && oSelSalesCurrent != null && oDdSalesCoverage != null)
{
var i = oDdSalesCoverage.selectedIndex;	
if(i != 0) 
{
var oOption = document.createElement("option");
oSelSalesCurrent.options.add(oOption);
oOption.innerText = oDdSalesCoverage.options[i].text;
oOption.value = oDdSalesCoverage.options[i].value; 
}
}
}
function RefreshParent(mode)
{
if (mode == "1")
{
if (window.opener != null)
{
window.opener.location = "inst_inv_ipros_acct_contact_details.asp?refreshParent=2";
}
window.close();
}
else if (mode == "2")
{
document.frmMain.submit();
}	
}
