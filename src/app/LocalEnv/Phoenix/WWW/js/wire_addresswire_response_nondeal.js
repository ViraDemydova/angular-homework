<!-- 
function onPageLoad()
{
SetRequiredFieldIndicator() ;
}
function onSelChangeWireTemplate()
{
var frm = document.frmMain;
var selectID = frm.selWireTemplate.selectedIndex;
var selectValue = frm.selWireTemplate.options[selectID].value;
frm.hidTemplateId.value = selectValue;
frm.hidWTID.value = selectValue;
SetRequiredFieldIndicator();
}
function getBrokers(frm)
{
var brk_id = "";
return brk_id;
}
function getNonBrokers(frm)
{
var mstr_id = "";
var ctr;
if (frm.elements["radBroker"])
{
for ( ctr = 1; ctr < frm.radBroker.length; ctr++)
{
if(frm.radBroker[ctr].checked)
{
mstr_id = frm.radBroker[ctr].value;
break;
}
}
}
return mstr_id;
}
function CheckConditionallyRequiredFields(frm, arrFieldsInErro)
{
var arrMoreErrors = new Array();
var nonbrkList = getNonBrokers(frm);
if (nonbrkList == '')
{
var arrError = FieldErrorInfo("", 'Please select a firm.', "", "", "");
arrMoreErrors[arrMoreErrors.length] = arrError;
}
var oElem ;
oElem = document.getElementById("selWireTemplate") ;
if( oElem && oElem.selectedIndex > -1)
{
var oOption = oElem.options(oElem.selectedIndex) ;
if(oOption && oOption.acceptind == "True")
{
if( document.frmMain.txtDealName.value == "")
{
var arrError = FieldErrorInfo("", 'Please enter deal name.', "", "", "");
arrMoreErrors[arrMoreErrors.length] = arrError;
}
if( document.frmMain.iFileSize.value == "")
{
var arrError = FieldErrorInfo("", 'Please enter deal size.', "", "", "");
arrMoreErrors[arrMoreErrors.length] = arrError;
}
if( document.frmMain.iUWSize.value == "")
{
var arrError = FieldErrorInfo("", 'Please enter underwriting commitment.', "", "", "");
arrMoreErrors[arrMoreErrors.length] = arrError;
}
}
else if(oOption && oOption.acceptind == "False")
{
if( document.frmMain.txtDealName.value == "")
{
var arrError = FieldErrorInfo("", 'Please enter deal name.', "", "", "");
arrMoreErrors[arrMoreErrors.length] = arrError;
}
}
}
return arrMoreErrors;
}
function onEnterPressed( event, element, funcHandler ) 
{
var bEnterPressed;
if (document.all) 
{
bEnterPressed = (window.event && window.event.keyCode == 13);
}
else
{
bEnterPressed = (event && event.which == 13);
}
if ( bEnterPressed )
{
funcHandler();
}
}
function onBtnFind()
{
var frm = document.frmMain;
frm.hidShowTemplate.value = "";
frm.hidAction.value = "";
frm.action = "wire_addresswire_response_nondeal.asp";
frm.target = "_self";
frm.method = "POST";
frm.submit();
}
function SetRequiredFieldIndicator()
{
var oElem, oSuffix ;
oElem = document.getElementById("selWireTemplate") ;
if( oElem && oElem.selectedIndex > -1)
{
var oOption = oElem.options(oElem.selectedIndex) ;
if(oOption && oOption.acceptind == "True")
{
oSuffix = document.getElementById("spnDealNameSuffix") ;
oSuffix.innerText = "*" ;
oSuffix = document.getElementById("spnFileSizeSuffix") ;
oSuffix.innerText = "*" ;
oSuffix = document.getElementById("spnUWSizeSuffix") ;
oSuffix.innerText = "*" ;
}
else if(oOption && oOption.acceptind == "False")
{
oSuffix = document.getElementById("spnDealNameSuffix") ;
oSuffix.innerText = "*" ;
oSuffix = document.getElementById("spnFileSizeSuffix") ;
oSuffix.innerText = "" ;
oSuffix = document.getElementById("spnUWSizeSuffix") ;
oSuffix.innerText = "" ;
}
}
}
