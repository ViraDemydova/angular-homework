<!-- 
RSEnableRemoteScripting("/_ScriptLibrary");
function onPageLoad()
{
var frm = document.frmMain;	
if (frm.hidDealCEF.value == "True")
{
if (frm.elements["selRecipientTranche"] && frm.selRecipientTranche.value == -1)
{	
for(var i = 0; i < frm.selRecipientTranche.options.length; i++)
{
if (frm.selRecipientTranche.options[i].text == "UNITED STATES")
frm.selRecipientTranche.selectedIndex = i;
}
}
for (var i = 1; i <= frm.hidNumProducts.value; i++)
{
var selElem = frm.elements["selRecipientPrd" + i];
if (frm.elements["selRecipientPrd" + i] && selElem.value == -1)
{
for(var j = 0; j < selElem.options.length; j++)
{
if (selElem.options[j].text == "Common Stock")
selElem.selectedIndex = i;
}
}
}
}
}
function CustomValidation( frm, arrFieldsInError )
{
var arrMoreErrors = new Array();
var sDealCode = frm.txtDealCode.value;
if( sDealCode.length > 0 && frm.hidRecipientIssId.value.length == 0)
{
co = RSExecute ('rs_VerifyDealCode_server.asp', 'VerifyDealCode', "E", sDealCode );
if (co.return_value == "1")
{
var errStr = "Deal code already exists.";
var arrError = FieldErrorInfo("txtDealCode", errStr, "", "txtDealCode", "Deal Code");
arrMoreErrors[arrMoreErrors.length] = arrError;
}
}
return (arrMoreErrors);
}
function submitPage( )
{
var frm = document.frmMain;
if( ValidateForm( frm ) )
{
if (frm.elements["selRecipientTranche"] && frm.selRecipientTranche.value == -1)
{	
alert("Please select the tranche for your deal");
return;
}
for (var i = 1; i <= frm.hidNumProducts.value; i++)
{
if (frm.elements["selRecipientPrd" + i] && frm.elements["selRecipientPrd" + i].value == -1)
{
alert("Please select the valid products for your deal");
return;
}
}
var ret=true;
if (frm.hidMissingBrk.value > 0)
ret = confirm(frm.hidMissingBrk.value + " brokers are not present in your private list. They will not be added in the deal. Continue?");
if (ret)
{
frm.method = "POST";
frm.action = "/asp/util_submit_action.asp";
frm.hidAction.value = "Import";
frm.submit();
}
}
}
function NewDealSelected(iss_id, issue_cd, issue_nm)
{
var frm = document.frmMain;
frm.hidRecipientIssId.value = iss_id;
}
function openDealSearchPopup()
{
var frm = document.frmMain;
frm.hidAction.value = "";
frm.hidRedirectPage.value = "syndcon_dealsearch_popup.asp";
frm.action = "syndcon_import_deal_popup.asp";
frm.submit();
}
function ResetPage()
{
window.location='syndcon_import_deal_popup.asp?wireid=' + document.frmMain.hidWID.value;
}
function addTranche()
{
var frm = document.frmMain;
frm.hidAction.value = "create";
frm.hidRedirectPage.value = "mastertables_tranche.asp";
frm.action = "syndcon_import_deal_popup.asp";
frm.submit();
}
function addProduct()
{
var frm = document.frmMain;
frm.hidAction.value = "create";
frm.hidRedirectPage.value = "mastertables_trademarksecurities.asp";
frm.action = "syndcon_import_deal_popup.asp";
frm.submit();
}
function addBroker(brk_nm, mstr_id, brk_id)
{
var frm = document.frmMain;
frm.hidMasterId.value = mstr_id;
if (brk_id.length > 0)
{
frm.hidBrokerDealerID.value = brk_id;
frm.hidPublic.value = 0;
}
else
{
frm.hidBrokerDealerID.value = 0;
frm.hidPublic.value = 1;
}
frm.hidAction.value="edit";
frm.hidRedirectPage.value = "Mastertables_brokerdealer.asp";
frm.action = "syndcon_import_deal_popup.asp";
frm.submit();
}
