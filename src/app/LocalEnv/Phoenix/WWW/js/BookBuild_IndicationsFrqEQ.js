function loadFrqFields()
{
if (document.forms["frmMain"].elements["hidFrqUseRadioButton"])
{
if (getDocumentElement("freeridingOldDataLayer"))
getDocumentElement("freeridingOldDataLayer").style.display = 'none';
if (document.forms["frmMain"].elements["hidFrqType"].value !='' && 
document.forms["frmMain"].elements["hidFrqUseRadioButton"].value !='')
{
var nRadioNum = new Number(document.forms["frmMain"].elements["hidFrqUseRadioButton"].value);
var nFrqType = new Number(document.forms["frmMain"].elements["hidFrqType"].value);
if (nFrqType <= nRadioNum && nFrqType > 0)
{	
if (nRadioNum == 1)
document.forms["frmMain"].elements["iFrqType1"].checked =true; 
else
{
var nFRQCheck = new Number(document.forms["frmMain"].elements["iFrqType1"].item(nFrqType - 1).value);
if (nFrqType == 1 || nFrqType == 2 || eval("CapitalViewLayer").style.display == '')
{
if (nFrqType == 1 && getDocumentElement("freeridingOldDataLayer"))
getDocumentElement("freeridingOldDataLayer").style.display = '';
document.forms["frmMain"].elements["iFrqType1"].item(nFRQCheck-1).checked =true; 
}
else
{
ResetRadioBox();
}
}
}
else
ResetRadioBox();
if(document.forms["frmMain"].elements["txtFrqNm"])
document.forms["frmMain"].elements["txtFrqNm"].value = document.forms["frmMain"].elements["hidFrqNm"].value;
}
}
else if (document.forms["frmMain"].elements["hidFrqNm"])
{
if(document.forms["frmMain"].elements["txtFrqNm"])
document.forms["frmMain"].elements["txtFrqNm"].value = document.forms["frmMain"].elements["hidFrqNm"].value;
var iFrqTypeCount = document.forms["frmMain"].elements["hidFrqTypeCount"].value;
for ( i = 0; i < iFrqTypeCount; i++)
{
if ( document.forms["frmMain"].elements["iFrqType"+(i+1)].value == document.forms["frmMain"].elements["hidFrqType"].value )
{
document.forms["frmMain"].elements["iFrqType"+(i+1)].checked = true;
}
}
}
}
function onClickFRQ(nm)
{
if (document.forms["frmMain"].elements["hidFrqUseRadioButton"])
{
return;
}
else if (document.forms["frmMain"].elements[nm].checked == true)
{
var iFrqTypeCount = document.forms["frmMain"].elements["hidFrqTypeCount"].value;
for ( i = 1; i <= iFrqTypeCount; i++)
{
var sTypeName = "iFrqType" + (i);
if (nm != sTypeName)
{
document.forms["frmMain"].elements[sTypeName].checked = false;
}
}
}
}
function ValidateFRQ( arrMoreErrors )
{
var iUseRadioButton;
iUseRadioButton = document.forms["frmMain"].elements["hidFrqUseRadioButton"];
if (iUseRadioButton)
{
var iFrqType = 0;
if (iUseRadioButton.value !='')
{	
var iRadioButtonCount = iUseRadioButton.value;
if (iRadioButtonCount == 1)
{
if (document.forms["frmMain"].elements["iFrqType1"].checked) 
iFrqType = document.forms["frmMain"].elements["iFrqType1"].value;
}
else
{
for ( i = 0; i < iRadioButtonCount; i++)
{
if (document.forms["frmMain"].elements["iFrqType1"].item(i).checked)
{
iFrqType = document.forms["frmMain"].elements["iFrqType1"].item(i).value;
break;
}
}
}
}
if ( iFrqType == 0)
{
var arrError = FieldErrorInfo("", new String, "", "", "");
if (iRadioButtonCount == 1)
arrError[2] = "You can not proceed because the Free Riding and Withholding Questionnaire has not been completed.";
else
arrError[2] = "You can not proceed because one of the Free Riding and Withholding indicators has not been checked.";
arrMoreErrors[arrMoreErrors.length] = arrError;
}
if ( iFrqType == 1)
{
if(document.forms["frmMain"].elements["txtFrqNm"])
{
if ( document.forms["frmMain"].elements["txtFrqNm"].value == "" )
{
var arrError = FieldErrorInfo("txtFrqNm", new String, "", "txtFrqNm", "Free Riding");
arrError[2] = "Please enter name.";
arrMoreErrors[arrMoreErrors.length] = arrError;
}
}
}
document.forms["frmMain"].elements["iFrqType"].value = iFrqType;
} 
else if ( document.forms["frmMain"].elements["hidFrqRequired"] )
{
var iFrqType = 0;
var iFrqTypeCount = document.forms["frmMain"].elements["hidFrqTypeCount"].value;
for ( i = 0; i < iFrqTypeCount; i++)
{
var sTypeName = "iFrqType" + (i+1);
if ( document.forms["frmMain"].elements[sTypeName].checked == true )
{
if ( iFrqType == 0 )
iFrqType = document.forms["frmMain"].elements[sTypeName].value;
else
{
var arrError = FieldErrorInfo(sTypeName, new String, "", sTypeName, "Free Riding");
arrError[2] = "Only one checkbox can be checked.";
arrMoreErrors[arrMoreErrors.length] = arrError;
}
}
}
if ( iFrqType == 0 && document.forms["frmMain"].elements["hidFrqRequired"].value == 1)
{
var arrError = FieldErrorInfo("iFrqType1", new String, "", "iFrqType1", "Free Riding");
arrError[2] = "You can not proceed because the Free Riding and Withholding indicators is not checked.";
arrMoreErrors[arrMoreErrors.length] = arrError;
}
if ( iFrqType == 1)
{
if(document.forms["frmMain"].elements["txtFrqNm"])
{
if ( document.forms["frmMain"].elements["txtFrqNm"].value == "" )
{
var arrError = FieldErrorInfo("txtFrqNm", new String, "", "txtFrqNm", "Free Riding");
arrError[2] = "Please enter name.";
arrMoreErrors[arrMoreErrors.length] = arrError;
}
}
}
document.forms["frmMain"].elements["iFrqType"].value = iFrqType;
}
} 
function ResetRadioBox()
{	var i;
var nRadioNum = new Number(document.forms["frmMain"].elements["hidFrqUseRadioButton"].value);
if (nRadioNum == 1)
document.forms["frmMain"].elements["iFrqType1"].checked = false;
else
{
for ( i = 0; i < nRadioNum; i++)
document.forms["frmMain"].elements["iFrqType1"].item(i).checked = false;
}
getDocumentElement("txtFrqNm").value ="";	
}
