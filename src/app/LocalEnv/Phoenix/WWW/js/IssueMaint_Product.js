<!-- 
function onPageLoad()
{
var elHidDisplayConvertibleInfoInd = getDocumentElement("hidDisplayConvertibleInfoInd");
if (elHidDisplayConvertibleInfoInd != null && elHidDisplayConvertibleInfoInd != 0 )
{
if (frmMain.all.hidDisplayConvertibleInfoInd.value == 1 && (frmMain.hidIssueTypeCode.value == "CB" || frmMain.hidIssueTypeCode.value == "CP"))
{
frmMain.all("ConvertibleInfoLayer").style.display = "";
frmMain.all("convertiblePutCallLayer").style.display = "";
}
}
if (frmMain.all("hidNumExchanges"))
DisplayExchanges();
setFocus();
}
function CheckConditionallyRequiredFields( frm, arrFieldsInError )
{
var arrMoreErrors = new Array();
var count = 0;
if (frm.iTxtConversionRatioBase && frm.iTxtConversionRatioCurrent){
if (frm.iTxtConversionRatioBase.value < 0 ){
var arrError = FieldErrorInfo("iTxtConversionRatioBase", 'Please enter a positive base number.', "", "iTxtConversionRatioBase", "Base");
arrMoreErrors[count] = arrError;	
count++;
}
if (frm.iTxtConversionRatioCurrent.value < 0 ){
var arrError = FieldErrorInfo("iTxtConversionRatioCurrent", 'Please enter a positive base number.', "", "iTxtConversionRatioCurrent", "Current");
arrMoreErrors[count] = arrError;	
count++;
}
}
return (arrMoreErrors);
} 
function CustomValidation( frm, arrFieldsInError )
{
var arrMoreErrors = new Array();
return (arrMoreErrors);
} 
function submitReg (frm, mode, position)
{
switch(mode) {
case "deletereg" :
var confirmMsg = window.confirm("Are you sure you want to delete this Registration?"); 
if (confirmMsg) {
frm.action = "specialIssueMaint_CreateProduct.asp?mode=deletereg&pos="+position;
frm.submit();
}
break;
case "editreg" :
frm.action = "specialIssueMaint_CreateRegistration.asp?mode=editreg&pos="+position;
frm.submit();
break;
case "createreg" :
frm.action = "specialIssueMaint_CreateRegistration.asp?mode=createreg";
frm.submit();
break;
case "cancelreg" :
frm.action = "specialIssueMaint_CreateRegistration.asp?mode=cancelreg";
frm.submit();
break;
}
}
function showList(pos)
{
var page = 'specialIssueMaint_MultipleRegistrations.asp?mode=create-symbol';
var cedel = document.frmMain.elements["hidCedel" + pos].value;
var reuter = document.frmMain.elements["hidReuter" + pos].value;
var cins = document.frmMain.elements["hidCins" + pos].value;
var sedol = document.frmMain.elements["hidSedol" + pos].value;
var cusip = document.frmMain.elements["hidCusip" + pos].value;
var sicovam = document.frmMain.elements["hidSicovam" + pos].value;
var common = document.frmMain.elements["hidCommon" + pos].value;
var valoren = document.frmMain.elements["hidValoren" + pos].value;
var isin = document.frmMain.elements["hidIsin" + pos].value;
if (cedel != "")
page = page+'&cedel='+cedel;
if (reuter != "")
page = page+'&reuter='+reuter;
if (cins != "")
page = page+'&cins='+cins;
if (sedol != "")
page = page+'&sedol='+sedol;
if (cusip != "")
page = page+'&cusip='+cusip;
if (sicovam != "")
page = page+'&sicovam='+sicovam;
if (common != "")
page = page+'&common='+common;
if (valoren != "")
page = page+'&valoren='+valoren;
if (isin != "")
page = page+'&isin='+isin;
openGeneralPopup(page, '', 'width=518,height=163,resizable,toolbar=no,scrollbars,menubar=no');
}
function submitPage(frm, sAction, lProductID, lProdRegID, position)
{
if (frm.hidIssueTypeCode.value == "CB" || frm.hidIssueTypeCode.value == "CP")
{
if (frm.sCSYield != "undefined")
frm.sCSYield.value = new Number(frm.sCSYield.value.replace(/(\,)/g, ""));
if (frm.sCSDividend != "undefined")
frm.sCSDividend.value = new Number(frm.sCSDividend.value.replace(/(\,)/g, ""));
}
switch (sAction)
{
case "add" :
if (ValidateForm(frm)) {
frm.action = "/asp/specialutil_submit_action.asp";
frm.hidAction.value = "Add";
frm.submit(); 
}
break;
case "addtwo" :
if (ValidateForm(frm)) {
frm.action = "/asp/specialutil_submit_action.asp";
frm.hidAction.value = "Add";
frm.hidAddAnother.value = "True";
frm.submit(); 
}
break;
case "savechanges" :
if (ValidateForm(frm)) {
frm.action = "/asp/specialutil_submit_action.asp";
frm.hidAction.value = "Update";
frm.submit();
}
break;
case "saveandadd" :
if (ValidateForm(frm)) {
frm.action = "/asp/specialutil_submit_action.asp";
frm.hidAction.value = "Update";
frm.hidAddAnother.value = "True"; 
frm.submit();
}
break;
case "delete" :
frm.action = "/asp/specialutil_submit_action.asp";
frm.hidAction.value = "Delete";
frm.submit();
break;
case "reverttosaved" :
window.location.reload();
break;
case "cancel" :
frm.action = "/asp/specialIssueMaint_DealDetails.asp";
frm.submit();
break;
case "update_registration" :
if (ValidateForm(frm)) 
{
frm.action = "/asp/specialutil_submit_action.asp";
frm.hidAction.value = "Update";
frm.hidPrdRegId.value = lProdRegID; 
frm.hidProductID.value = lProductID;
frm.hidRegModInd.value = 1;	
frm.submit();
}
break;
case "new_registration" :
if (ValidateForm(frm)) 
{
frm.action = "/asp/specialutil_submit_action.asp";
frm.hidAction.value = "Update";
frm.hidProductID.value = lProductID;	
frm.hidRegModInd.value = 1; 
frm.submit();
}
break;
case "delete_registration" :
var confirmMsg = window.confirm("Are you sure that you want to delete this Registration?");
if (confirmMsg) {
frm.action = "/asp/specialutil_submit_action.asp";
frm.hidProgID.value="IssueMaintenance_usr.ProductReg";
frm.hidPosition.value=position;
frm.hidPrdRegId.value = lProdRegID;
frm.hidAction.value="Delete";
frm.submit();
}
else
return;
break;
}
}
function setFocus()
{
if (document.frmMain.rselProductNames){
if(!document.frmMain.rselProductNames.disabled)
{
document.frmMain.rselProductNames.focus();
}
if (document.frmMain.hidIssueTypeCode.value == 'B') {
changeProductName();
}
}
}
function changeProductName(){
var frm = document.frmMain;
if (frm.hidSecTypeId != null && frm.rselProductNames.options[frm.rselProductNames.selectedIndex].value != frm.hidSecTypeId.value && frm.hidOrderExists != null && frm.hidOrderExists.value == '1')
{
if (window.confirm('Orders have been entered. Are you sure you want to change the Product?') == false)
{
for (var i=0; i<frm.rselProductNames.options.length; i++)
{
if (parseInt(frm.rselProductNames.options[i].value) == parseInt(frm.hidSecTypeId.value))
{	
frm.rselProductNames.options[i].selected = true;
break;
}
}
}
}
if (document.frmMain.hidIssueTypeCode.value != 'B')
return;
var select = document.frmMain.rselProductNames;
var value = select.options[select.selectedIndex].text 
ConvCurrent.innerHTML = value;
}
function onCVchange(obj)
{
obj.value = formatAmountString(obj.value.toString());
}
function OnPutCommentsChange()
{
var lLen = new Number(document.all.txtPutComments.value.length);
if (lLen > 50)
{
var sTxt = document.all.txtPutComments.value;
document.all.txtPutComments.value = sTxt.substring(0,50);	
}
}
function OnCallCommentsChange()
{
var lLen = document.all.txtCallComments.value.length;
if (lLen > 50)
{
var sTxt = document.all.txtCallComments.value;
document.all.txtCallComments.value = sTxt.substring(0,50);	
}
}
function OnPutCommentsPress()
{
OnPutCommentsChange();
}
function OnCallCommentsPress()
{
OnCallCommentsChange();
}
function getDocumentElement(sElementName)
{
if (document.getElementById)
{
return document.getElementById(sElementName);
}
else if (document.all)
{
return document.all[sElementName];
}
else if (document.layers)
{	
if (document.layers[sElementName])
{
return document.layers[sElementName]; 
}
for(var i=0;i<document.layers.count-1;i++)
{
if (document.layers[i].elements[sElementName])
{
return document.layers[i].elements[sElementName];
}
} 
}
return 0;
}
function editExchanges()
{
var frm = document.frmMain;
for (var i = 0; i < g_ExchangeList.length; i++)
g_ExchangeList[i].symbol = frm.all("sLocalExch_" + i).value;
var sUrl = "IssueMaint_editMultipleExchanges_popup.asp";
var sStyle = "width=500,height=250,scrollbars=1,resizable=1";
openGeneralPopup( sUrl, '', sStyle );
}
function DisplayExchanges()
{
var frm = document.frmMain;
frm.hidNumExchanges.value = g_ExchangeList.length;
if (g_ExchangeList.length > 1)
{
frm.all("divSingleExchange").style.display = "none";
var sHTML = "";
sHTML = "<table width='100%' cellspacing='2' cellpadding='1'>";
for (var i = 0; i < g_ExchangeList.length; i++)
{
if (i == 0)
{ 
sHTML = sHTML + "<tr><td>" + g_ExchangeList[i].name + "</td></tr>";
frm.hidExch_0.value = g_ExchangeList[i].exchange_id;
}
else
sHTML = sHTML + "<tr><td><input type='hidden' name='hidExch_" + i + "' value='" + g_ExchangeList[i].exchange_id + "'/>" + g_ExchangeList[i].name + "</td></tr>";
}
sHTML = sHTML + "</table>";
frm.all("divMultipleExchange").innerHTML = sHTML;
frm.all("divMultipleExchange").style.display = "inline";
}
else
{
frm.all("divMultipleExchange").style.display = "none";
frm.all("divSingleExchange").style.display = "inline";
if (g_ExchangeList.length > 0)
{
frm.hidExch_0.value = g_ExchangeList[0].exchange_id;
for(var i = 0; i < frm.selExchange.length; i++)
{
if (frm.selExchange.options[i].value == g_ExchangeList[0].exchange_id)
{
frm.selExchange.selectedIndex = i;
break;
}
}
}
else
{
frm.hidExch_0.value = "";
frm.selExchange.selectedIndex = 0;
}
}
sHTML = "<table width='100%' cellspacing='0' cellpadding='0'>";
if (g_ExchangeList.length > 0)
{
for (i = 0; i < g_ExchangeList.length; i++)
sHTML = sHTML + "<tr><td><input type='text' name='sLocalExch_" + i + "' value='" + g_ExchangeList[i].symbol + "'/></td></tr>";
}
else
sHTML = sHTML + "<tr><td><input type='text' name='sLocalExch_0' value=''/></td></tr>";
sHTML = sHTML + "</table>";
frm.all("divLocalSymbol").innerHTML = sHTML; 
}
function EscapeXMLChar(str)
{
var regex;
regex = /&/g;
str = str.replace(regex, "&amp;");
regex = />/g;
str = str.replace(regex, "&gt;");
regex = /</g;
str = str.replace(regex, "&lt;");
regex = /"/g;	
str = str.replace(regex, "&quot;");
regex = /'/g;
str = str.replace(regex, "&apos;");
return(str);
}
function UnEscapeXMLChar(str)
{
var regex;
regex = /&amp;/g;
str = str.replace(regex, "&");
regex = /&gt;/g;
str = str.replace(regex, ">");
regex = /&lt;/g;
str = str.replace(regex, "<");
regex = /&quot;/g;	
str = str.replace(regex, "\"");
regex = /&apos;/g;
str = str.replace(regex, "'");
return(str);
}
function GetSelectedExchanges()
{
return g_ExchangeList;
}
function RefreshExchange(arrExchanges)
{
g_ExchangeList = null;
g_ExchangeList = new Array();
for (var i = 0; i < arrExchanges.length; i++)
{
g_ExchangeList[i] = new Object();
g_ExchangeList[i].exchange_id = arrExchanges[i].exchange_id;
g_ExchangeList[i].name = arrExchanges[i].name;
g_ExchangeList[i].symbol = arrExchanges[i].symbol;
}
DisplayExchanges();
}
function onChangeExchange()
{
var frm = document.frmMain;
g_ExchangeList[0].exchange_id = frm.selExchange.options[frm.selExchange.selectedIndex].value;
frm.hidExch_0.value = g_ExchangeList[0].exchange_id;
}
