<!-- 
function onPageLoad()
{
if (fnExists('menuShow'))
menuShow('mastertables', 'tophide');
}
function CheckConditionallyRequiredFields( frm, arrFieldsInError )
{
var arrMoreErrors = new Array();
return (arrMoreErrors);
} 
function CustomValidation( frm, arrFieldsInError )
{
var arrMoreErrors = new Array();
if (frm.chkEquity.checked == false && frm.chkDebt.checked == false)
{
var arrError = FieldErrorInfo("", "", "", "chkEquity", "Please select a business type (Equity/Debt).");
arrError[2] = '';
arrMoreErrors[0] = arrError;
return (arrMoreErrors);
} 
return (arrMoreErrors);
} 
function submitPage( frm , action )
{
if(frm.chkInActive) frm.chkInActive.disabled = false;
switch (action)
{
case "savechanges" :
frm.method = "POST";
if (frm.hidBrokerDealerID.value == "")
frm.hidAction.value = "Add";
else
frm.hidAction.value = "Update";
frm.action = "/asp/util_submit_action.asp";
if(ValidateForm( frm )) 
{
frm.submit();
}	
break; 
case "reverttosaved" :
frm.reset();
break;
case "cancel" :
frm.method = "POST";
frm.hidAction.value = "cancel";
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
frm.action = "/asp/mastertables_brokerdealer.asp";
if(ValidateForm( frm )) 
frm.submit();	
break;
case	"create" :
frm.method = "POST"; 
frm.hidAction.value = action;
frm.action = "/asp/mastertables_brokerdealer.asp";
frm.submit();	
break; 
case	"edit" :
frm.method = "POST";
frm.hidAction.value = "edit";
frm.action = "/asp/mastertables_brokerdealer.asp";
frm.submit();	
break; 
case	"delete" :
frm.method = "POST";
frm.hidAction.value = "Delete";
frm.action = "/asp/util_submit_action.asp"; 
frm.submit();
break; 
case "back" :
frm.method = "POST";
frm.hidAction.value = "cancel";
frm.action = frm.hidCalledFromPage.value;
frm.submit();
break;
}
}
function setBrokerDealerID(iBrokerDealer, iMasterId, bPublic, frm , action) 
{
frm.hidBrokerDealerID.value = iBrokerDealer;
frm.hidMasterId.value = iMasterId;
frm.hidPublic.value = bPublic;
submitPage( frm , action );
}
function sortList(sortField, frm, action)
{
frm.hidSortField.value = sortField;
submitPage( document.frmSearch , action );
}
function onEnter()
{
if(document.frmSearch.rsBrokerDealerName.value == ""){
submitPage(document.frmSearch, "create");
}
else{
submitPage(document.frmSearch, "find");
}	
} 
function ToggleSection(strElem) 
{
var strWhichEl = eval("Section" + strElem + "Child");
var strWhichIm = eval("Section" + strElem + "Parent.document.images['ImEx" + strElem + "']");
if (strWhichEl.style.display == 'none') {
strWhichEl.style.display = 'block';
strWhichIm.src = "../images/collapse.gif";
}
else {
strWhichEl.style.display = 'none';
strWhichIm.src = "../images/expand.gif";
}
}
function ClickIncludePublic()
{
if (document.frmSearch.chkIncludePublic)
{
if (document.frmSearch.chkIncludePublic.checked)
{
document.frmSearch.chkInactive.checked = true;
document.frmSearch.chkInactive.disabled = true;
}
else
{
document.frmSearch.chkInactive.disabled = false;
}
}
}
function openBrokerComment(brk_id)
{
if (brk_id != undefined)
{
var sSessionID = getSessionID();
var popupGeneral = window.open( 'mastertables_broker_comments_popup.asp?brk_id=' + brk_id, sSessionID, 'width=700,height=400,resizable,toolbar=no,scrollbars,menubar=no');
var bIE = (navigator.userAgent.indexOf("MSIE")>=1); 
if ( bIE ) {
eval("try { popupGeneral.focus(); } catch(e) {}");
}
else {
popupGeneral.focus();
}
}
else
alert("Please add the broker to the private list");
}
