<!-- 
function onPageLoad()
{
updateCategoriesChecked();
updateCategoriesDisabled();
}
function isAllChecked(frm)
{
var bFlag = true;
if (frm.elements["bracket_ct"])
{
var bracket_ct = frm.elements["bracket_ct"].value;	
for (var i = 1; i <= bracket_ct; i++)
{
if (!frm.elements["checkbox" + i].checked)
{
bFlag = false;
break;
}
}
}
if (frm.elements["company_type_ct"])
{
var company_type_ct = frm.elements["company_type_ct"].value;	
for (var i = 1; i <= company_type_ct; i++)
{
if (!frm.elements["ncheckbox" + i].checked)
{
bFlag = false;
break;
}
}
}
return bFlag;
}
function isAllDisabled(frm)
{
var bFlag = true;
if (frm.elements["bracket_ct"])
{
var bracket_ct = frm.elements["bracket_ct"].value;	
for (var i = 1; i <= bracket_ct; i++)
{
if (!frm.elements["checkbox" + i].disabled)
{
bFlag = false;
break;
}
}
}
if (frm.elements["company_type_ct"])
{
var company_type_ct = frm.elements["company_type_ct"].value;	
for (var i = 1; i <= company_type_ct; i++)
{
if (!frm.elements["ncheckbox" + i].disabled)
{
bFlag = false;
break;
}
}
}
return bFlag;
}
function checkAll(frm, bFlag)
{
if (frm.elements["bracket_ct"])
{
var bracket_ct = frm.elements["bracket_ct"].value;
for (var i = 1; i <= bracket_ct; i++)
{
var checkboxName = "checkbox" + i;
var syndmemCt = frm.elements[checkboxName + "ct"].value;
var bDisable = true;
for (var j = 1; j <= syndmemCt; j++)
{
if (!frm.elements[checkboxName + "_" + j].disabled)
{
frm.elements[checkboxName + "_" + j].checked = bFlag;
bDisable = false;
}
}
if (!bDisable)
frm.elements[checkboxName].checked = bFlag;
}
}
if (frm.elements["company_type_ct"])
{
var company_type_ct = frm.elements["company_type_ct"].value;
for (var i = 1; i <= company_type_ct; i++)
{
var checkboxName = "ncheckbox" + i;
var companyCt = frm.elements[checkboxName + "ct"].value;
var bDisable = true;
for (var j = 1; j <= companyCt; j++)
{
if (!frm.elements[checkboxName + "_" + j].disabled)
{
frm.elements[checkboxName + "_" + j].checked = bFlag;
bDisable = false;
}
}
if (!bDisable)
frm.elements[checkboxName].checked = bFlag;
}
}
frm.selectAll.checked = bFlag;
frm.deselectAll.checked = !bFlag;
}
function updateCategoriesChecked()
{
var frm = document.frmMain;
if (frm.elements["bracket_ct"])
{
var bracket_ct = frm.elements["bracket_ct"].value;
for (var i = 1; i <= bracket_ct; i++)
{
var checkboxName = "checkbox" + i;
var syndmemCt = frm.elements[checkboxName + "ct"].value;
var bFlag = true;
for (var j = 1; j <= syndmemCt; j++)
{
if (!frm.elements[checkboxName + "_" + j].checked)
{
bFlag = false;
break;
}
}
frm.elements[checkboxName].checked = bFlag;
}
}
if (frm.elements["company_type_ct"])
{
var company_type_ct = frm.elements["company_type_ct"].value;
for (var i = 1; i <= company_type_ct; i++)
{
var checkboxName = "ncheckbox" + i;
var companyCt = frm.elements[checkboxName + "ct"].value;
var bFlag = true;
for (var j = 1; j <= companyCt; j++)
{
if (!frm.elements[checkboxName + "_" + j].checked)
{
bFlag = false;
break;
}
}
frm.elements[checkboxName].checked = bFlag;
}
}
frm.deselectAll.checked = false;
frm.selectAll.checked = isAllChecked(frm);
}
function updateCategoriesDisabled()
{
var frm = document.frmMain;
if (frm.elements["bracket_ct"])
{
var bracket_ct = frm.elements["bracket_ct"].value;
for (var i = 1; i <= bracket_ct; i++)
{
var checkboxName = "checkbox" + i;
var syndmemCt = frm.elements[checkboxName + "ct"].value;
var bFlag = true;
for (var j = 1; j <= syndmemCt; j++)
{
if (!frm.elements[checkboxName + "_" + j].disabled)
{
bFlag = false;
break;
}
}
frm.elements[checkboxName].disabled = bFlag;
}	
}
if (frm.elements["company_type_ct"])
{
var company_type_ct = frm.elements["company_type_ct"].value;
for (var i = 1; i <= company_type_ct; i++)
{
var checkboxName = "ncheckbox" + i;
var companyCt = frm.elements[checkboxName + "ct"].value;
var bFlag = true;
for (var j = 1; j <= companyCt; j++)
{
if (!frm.elements[checkboxName + "_" + j].disabled)
{
bFlag = false;
break;
}
}
frm.elements[checkboxName].disabled = bFlag;
}	
}
if (isAllDisabled(frm))
{
frm.selectAll.disabled = true;
frm.deselectAll.disabled = true;
}
}
function checkCategory(checkBoxName)
{
var frm = document.frmMain;
var ck = frm.elements[checkBoxName];
var subCount = frm.elements[checkBoxName + "ct"].value;
for (var i = 1; i <= subCount ;i++)
{
if (!frm.elements[checkBoxName + "_" + i].disabled)
{
frm.elements[checkBoxName + "_" + i].checked = ck.checked;
}
}
frm.deselectAll.checked = false;
frm.selectAll.checked = isAllChecked(frm);
}
function getBrokers(frm)
{
var first = true;
var brkList = "";
if (frm.elements["bracket_ct"])
{
var bracket_ct = frm.elements["bracket_ct"].value;
for (var i = 1; i <= bracket_ct; i++)
{
var checkboxName = "checkbox" + i;
var syndmemCt = frm.elements[checkboxName + "ct"].value;
for (var j = 1; j <= syndmemCt; j++)
{
if (frm.elements[checkboxName + "_" + j].checked)
{
if (first)
{
brkList += frm.elements[checkboxName + "_" + j].value;
first = false;
}
else
{
brkList += "," + frm.elements[checkboxName + "_" + j].value;
}
}
}
}
}
return brkList;
}
function getNonBrokers(frm)
{
var first = true;
var nonBrkList = "";
if (frm.elements["company_type_ct"])
{
var company_type_ct = frm.elements["company_type_ct"].value;
for (var i = 1; i <= company_type_ct; i++)
{
var checkboxName = "ncheckbox" + i;
var companyCt = frm.elements[checkboxName + "ct"].value;
for (var j = 1; j <= companyCt; j++)
{
if (frm.elements[checkboxName + "_" + j].checked)
{
if (first)
{
nonBrkList += frm.elements[checkboxName + "_" + j].value;
first = false;
}
else
{
nonBrkList += "," + frm.elements[checkboxName + "_" + j].value;
}
}
}
}
}
return nonBrkList;
}
function CheckConditionallyRequiredFields(frm, arrFieldsInErro)
{
var arrMoreErrors = new Array();
if (getBrokers(frm) == '')
{
var arrError = FieldErrorInfo("", 'Please select a firm.', "", "", "");
arrMoreErrors[arrMoreErrors.length] = arrError;
}
return arrMoreErrors;
}
function showHideUsers(eltname)
{
var elt = eval(eltname);
if (elt)
{
if (elt.style.display == 'none')
elt.style.display = '';
else
elt.style.display = 'none';
}
}
