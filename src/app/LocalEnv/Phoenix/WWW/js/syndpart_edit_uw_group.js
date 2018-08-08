<!-- 
function onPageLoad()
{
updateTotal(document.frmMain);
}
function CheckConditionallyRequiredFields( frm, arrFieldsInError )
{
var arrMoreErrors = new Array();
return (arrMoreErrors);
} 
function CustomValidation( frm, arrFieldsInError )
{
var arrMoreErrors = new Array();
updateTotal(frm);
var lTotal = new Number(frm.txtTotal.value.toString().replace(/(\,)/g, "")); 
if (frm.hidType.value == "amt")
{
var lTrnSize = new Number(frm.hidTrnSize.value); 
if (lTotal > lTrnSize)
{
var arrError = FieldErrorInfo("", "", "", "fltTxtCl1", "Amount entered must not exceed tranche amount");
arrError[2] = '';
arrMoreErrors[0] = arrError;	
return (arrMoreErrors);
}
}
else if (frm.hidType.value == "pct")
{
if (lTotal > 100)
{
var arrError = FieldErrorInfo("", "", "", "fltTxtCl1", "Percentage exceeded 100%");
arrError[2] = '';
arrMoreErrors[0] = arrError;	
return (arrMoreErrors); 
}
}	
return (arrMoreErrors);
} 
function submitPage( frm , action )
{
switch (action)
{
case "SaveChanges" :
if (ValidateForm( frm ))
{ 
frm.hidNavtype.value = frm.selGroupType.value;
frm.method = "POST";
frm.hidAction.value = "Update";
frm.action = "util_submit_action.asp";
frm.submit();
}
break;
case "RevertToSaved" :
frm.reset();
break;
case "TypeChange" :
if (ValidateForm( frm ))
{ 
frm.hidNavtype.value = frm.selGroupType.options[frm.selGroupType.selectedIndex].value;
frm.hidAction.value = "TypeChange";
frm.method = "POST";
frm.action = "syndpart_edit_uw_group.asp";
frm.submit();
}
else
{
frm.selGroupType.value = frm.hidType.value;
}
break; 
case "EditWorksheet" :
frm.method = "POST";
frm.action = "syndpart_edit_worksheet.asp";
frm.hidAction.value = "EditWorksheet";
frm.submit();
break; 
}
}
function updateTotal(frm)
{ 
var lTrnSize = new Number(frm.hidTrnSize.value);
if (isNaN(lTrnSize) || lTrnSize == 0)
{
alert("Invalid Tranche size");
return;
}
var lTotal = new Number(0);
var lNumFields = parseInt(frm.hidNumFields.value, 10);
for (var i = 1; i <= lNumFields; i++)
{
var item = "fltTxtCl" + i;
var str1 = new String(frm.elements[item].value);
var str2 = str1.replace(/k/g, "000");
var str3 = str2.replace(/mm/g, "000000");
var value = new Number(str3.replace(/(\,)/g, ""));
if (isNaN(value) || value == 0)
{
frm.elements[item].value = "";
}
else
{
frm.elements[item].value = formatAmountString(value.toString());
lTotal += value; 
}
}
frm.txtTotal.value = formatAmountString(lTotal.toString());
}
function editWorksheet(frm, action, trnbracketid)
{
frm.hidTrngrpid.value = trnbracketid;
submitPage(frm, action); 
} 
