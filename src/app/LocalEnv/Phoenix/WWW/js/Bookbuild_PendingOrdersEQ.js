<!-- 
RSEnableRemoteScripting("/_ScriptLibrary")
function onPageLoad()
{
return;
var oRefer = document.frmMain.hidRefer;
if ( oRefer && oRefer.value=="masterbook" )
return;	
}
function CheckConditionallyRequiredFields( frm, arrFieldsInError )
{
var arrMoreErrors = new Array();
return (arrMoreErrors);
} 
function CustomValidation( frm, arrFieldsInError )
{
var arrMoreErrors = new Array();
if (!validateInvestors(frm))
{
var arrError = FieldErrorInfo("", "Please Select Investor(s) to Add to Master Book", "", "", "");
arrMoreErrors[0] = arrError;
}
return (arrMoreErrors);
} 
function submitPage( frm , action )
{
switch (action)
{
case "populate" :
if(ValidateForm( frm ))
{
frm.action = "/asp/util_submit_action.asp";
frm.submit(); 
}
break;
}
}
function addSelectedToMB(frm)
{
submitPage( frm , "populate");
}
function addAllToMB(frm)
{
var bAdd = false;
if (frm.chkPndgOrder)
{	
if (frm.chkPndgOrder.length)
{
for(var i = 0; i <frm.chkPndgOrder.length; i++)
{
frm.chkPndgOrder[i].checked = true;
bAdd = true;
}
}
else
{
frm.chkPndgOrder.checked = true;
bAdd = true;
}
}
if (frm.chkSMPndgOrder)
{	
if (frm.chkSMPndgOrder.length)
{
for(var i = 0; i <frm.chkSMPndgOrder.length; i++)
{
frm.chkSMPndgOrder[i].checked = true;
bAdd = true;
}
}
else
{
frm.chkSMPndgOrder.checked = true;
bAdd = true;
}
}
if (bAdd)
addSelectedToMB(frm);
}
function validateInvestors(frm)
{
if (frm.chkPndgOrder)
{
if (frm.chkPndgOrder.length)
{
for(var i = 0; i <frm.chkPndgOrder.length; i++)
{
if (frm.chkPndgOrder[i].checked == true)
{
return true;	
}
}
}
else
{
if (frm.chkPndgOrder.checked == true)
{
return true;	
}
}
}
if (frm.chkSMPndgOrder)
{
if (frm.chkSMPndgOrder.length)
{
for(var i = 0; i <frm.chkSMPndgOrder.length; i++)
{
if (frm.chkSMPndgOrder[i].checked == true)
{
return true;	
}
}
}
else
{
if (frm.chkSMPndgOrder.checked == true)
{
return true;	
}
}
}
return false;	
}
function submitColumnSort( strColumn, page )
{
var oCurrentSortColumn = document.frmMain.hidCurrentSortColumn
var oCurrentSortOrder = document.frmMain.hidCurrentSortOrder
if( strColumn != oCurrentSortColumn.value )
{
oCurrentSortColumn.value = strColumn
oCurrentSortOrder.value = "ascending"
}
else if( oCurrentSortOrder.value == "ascending" )	
oCurrentSortOrder.value = "descending"	
else
oCurrentSortOrder.value = "ascending"
document.frmMain.action = page
document.frmMain.submit()
}
function submitEdit( frm , pndg_ord_id, trn_id)
{ 
frm.action = "/asp/bookbuild_indicationseq.asp?pndg_ord=" + String(pndg_ord_id) + "&trn_id=" + String(trn_id) + "&navtype=pending";
frm.submit(); 
}
function onChkPndgOrder(curChk, sender_pndg_ord_id)
{
var frm = document.frmMain;
var curVal = curChk.checked;
if (frm.hidSenderPndgOrdId.length && sender_pndg_ord_id.length > 0)
{
for(var i = 0; i < frm.hidSenderPndgOrdId.length; i++)
{
if (sender_pndg_ord_id == frm.hidSenderPndgOrdId[i].value)
{
frm.chkPndgOrder[i].checked = curVal;
}
}
}
}
