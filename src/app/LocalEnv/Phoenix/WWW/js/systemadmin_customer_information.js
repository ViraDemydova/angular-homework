<!-- 
// ****** Global variables ****** 
var vAdminHdrRows = 3; 
var vAdminFtrRows = 3; 
var vAdminAddId = 0; 
function onPageLoad()
{
gotoTab("cust");
}
function CheckConditionallyRequiredFields( frm, arrFieldsInError )
{
var arrMoreErrors = new Array();
return (arrMoreErrors);
} 
function CustomValidation( frm, arrFieldsInError )
{
var arrMoreErrors = new Array();
return (arrMoreErrors);
} 
function submitPage( frm , action )
{ 
switch (action)
{
case "Add" :
if(ValidateForm( frm ))
{
selectAllUpnSuffixes(); 
saveAdminDetails(); 
unloadAdministratorToFormFields(action);
addCustomerPreferences(); 
frm.hidAction.value = "Add";
frm.action = "/asp/systemadmin_customer_information_action.asp";
frm.submit(); 
}
break;
case "Update" :
alert("Note: update functionality is not yet implemented.");
if(ValidateForm( frm ))
{
selectAllUpnSuffixes();
frm.hidAction.value = "Update";
frm.action = "/asp/systemadmin_customer_information_action.asp";
frm.submit(); 
}
break;
case "Cancel" :
frm.hidAction.value = "Cancel";
if (document.frmMain.hidMode.value == "Add")
frm.action = "/asp/systemadmin_search_broker_dealer.asp";
else
frm.action = "/asp/systemadmin_search_customer.asp";
frm.submit(); 
break;
}
}
function unloadAdministratorToFormFields(action) {
var frm = document.frmMain;
switch (action)
{
case "Add" :
var sFields = new String(oAdminsTable.rows[vAdminHdrRows].cells[4].innerText);
var sValues = sFields.split("|");
createFormField( frm, "rsAdminUserCommonName", sValues[10]);
createFormField( frm, "selAdminUserUpnSuffix", sValues[11]);
createFormField( frm, "rsAdminUserFirstName", sValues[24]);
createFormField( frm, "rsAdminUserLastName", sValues[23]);
createFormField( frm, "txtSubsidiaryId", sValues[19]);
createFormField( frm, "txtDepartment", sValues[12]);
createFormField( frm, "txtStreetAddress", sValues[ 2]);
createFormField( frm, "txtCity", sValues[ 3]);
createFormField( frm, "txtSt", sValues[ 4]);
createFormField( frm, "selCo", sValues[ 6]);
createFormField( frm, "txtPostalCode", sValues[ 5]);
createFormField( frm, "remMail", sValues[ 1]);
createFormField( frm, "txtExternalUserId", sValues[13]);
createFormField( frm, "txtFacsimileTelephoneNumber",sValues[ 8]);
createFormField( frm, "txtHomePhone", sValues[14]);
createFormField( frm, "txtMobile", sValues[ 9]);
createFormField( frm, "txtTelephoneNumber", sValues[ 0]);
createFormField( frm, "txtPager", sValues[15]);
createFormField( frm, "txtTitle", sValues[16]);
createFormField( frm, "rsPassword", "test");
createFormField( frm, "txtDescription", sValues[17]);
break;
case "Update" :
break;
} 
}
function createFormField( frm, name, value) {
var field = document.createElement("<input type='hidden' name='" + name + "' value='"+ value +"'>");
frm.appendChild(field);
}
function selectAllUpnSuffixes() {
var oColl = document.frmMain.all("divUPNsForm").all("selUpnSuffix").options;
var i;
for (i = 0; i < oColl.length; i++) {
var oOption = oColl(i);
oOption.selected = true;
}
}
function addCustomerPreferences() {
createFormField( frm, "rsGlobalLocale", "1033");
createFormField( frm, "rsGlobalLanguage", "EN");
createFormField( frm, "rsGlobalDomain", "debt");
createFormField( frm, "rsGlobalHomePage", "default.asp");
createFormField( frm, "rsCalendarFICurrency", "USD, CAD, EUR, GBP, JPY, OTH");
createFormField( frm, "rsCalendarFIProduct", "ABS, AG, CBO, EM, HG, HY, MBS, PF, PFD, SV, SP, SN");
createFormField( frm, "rsCalendarEQCurrency", "USD, CAD, EUR, GBP, JPY, OTH");
createFormField( frm, "rsCalendarEQProduct", "C, CB, CP, EU");
createFormField( frm, "rsDealSearchEQIssueRoles", "BR, MGR, UW, SG, STR, UNS");
createFormField( frm, "rsDealSearchEQIssueStates", "C, A, P, S, F");
createFormField( frm, "rsDealSearchEQIssueTypes", "C, CB, CP, EU");
createFormField( frm, "rsDealSearchEQIssueStati", "Active");
createFormField( frm, "rsDealSearchEQIssueInd", "IPO, AddOn, Derivatives, BlockTrade");
createFormField( frm, "rsDealSearchFIIssueRoles", "BR, MGR, UW, SG, STR, UNS");
createFormField( frm, "rsDealSearchFIIssueStates", "C, A, P, S, F");
createFormField( frm, "rsDealSearchFIIssueTypes", "B, P");
createFormField( frm, "rsDealSearchFIIssueStati", "Active");
createFormField( frm, "rsDealSearchFIProductType", "ABS, MBS, HG, HY, EM, AG, SN, SV, CBO, SP, PFD, PF");
}
function gotoAdminDetail(id){
if (document.frmMain.hidMode.value == "Add") {
document.frmMain.all("divAdminDetailButtons").style.display = "none";
}
else {
document.frmMain.all("divAdminDetailButtons").style.display = "inline";
}
var oFields = new Array(); 
if (id == 0) { 
var i;
for (i=0;i<26;i++) 
oFields.push("");
oFields[ 6] = "840"; 
}
else { 
var sFields = new String(oAdminsTable.rows[id].cells[4].innerText);
var oTemp = sFields.split("|");
var i;
for (i=0;i<oTemp.length;i++)
oFields.push(oTemp[i]);
oFields.push(oAdminsTable.rows[id].cells[0].innerText); 
oFields.push(oAdminsTable.rows[id].cells[1].innerText); 
oFields.push(oAdminsTable.rows[id].cells[2].innerText); 
oFields.push(oAdminsTable.rows[id].cells[3].innerText); 
}
var vDiv = document.frmMain.all("divAdminsDetailForm");
var oColl = vDiv.all("selAdminUpnSuffix").options;
for (i = oColl.length - 1; 0 <= i; i--) {
oOption = null;
oColl.remove(i);
}
var oSuffixes = document.frmMain.all("divUPNsForm").all("selUpnSuffix").options;
for (i = 0; i < oSuffixes.length; i++) {
var oOption = document.createElement("OPTION");
oColl.add(oOption);
oOption.innerText = oSuffixes(i).innerText;
oOption.value = oSuffixes(i).value;
if (oOption.innerText == oFields[11])
oOption.selected = true;
} 
if (oFields[ 7] == "Active")
vDiv.all("radActive_yes").checked = true;
else
vDiv.all("radActive_no").checked = true;
vDiv.all("cbDebt").checked = (oFields[21] == "true") ? true : false;
vDiv.all("cbEquity").checked = (oFields[22] == "true") ? true : false;
var oSuffix = vDiv.all("selAdminUpnSuffix");
vDiv.all("sCommonName").value = oFields[10];
vDiv.all("sFirstNm").value = oFields[24];
vDiv.all("sLastNm").value = oFields[23];
vDiv.all("sBusPhone").value = oFields[ 0];
vDiv.all("sBusEmail").value = oFields[ 1];
vDiv.all("sDept").value = oFields[12];
vDiv.all("sSubNm").value = oFields[26];
vDiv.all("sExtUsrId").value = oFields[13];
vDiv.all("sTitle").value = oFields[16];
vDiv.all("sDesc").value = oFields[17];
vDiv.all("sBusAddr").value = oFields[ 2];
vDiv.all("sCity").value = oFields[ 3];
vDiv.all("sState").value = oFields[ 4];
vDiv.all("sPostalCd").value = oFields[ 5];
vDiv.all("selCountry").value = oFields[ 6];
vDiv.all("sMobilePh").value = oFields[ 9];
vDiv.all("sFaxNo").value = oFields[ 8];
vDiv.all("sHomePh").value = oFields[14];
vDiv.all("sPager").value = oFields[15];
vDiv.all("hidAdminDtlId").value = id;
vDiv.all("hidAdminDtlInstId").value = oFields[18];
vDiv.all("hidAdminDtlSubId").value = oFields[19];
vDiv.all("hidAdminDtlUsrTyp").value = oFields[20];
vDiv.all("hidAdminDtlUpn").value = oFields[25];
vDiv.all("hidAdminDtlSubNm").value = oFields[26];
document.frmMain.all("divAdminsListForm").style.display = "none";
document.frmMain.all("divAdminsDetailForm").style.display = "inline";
document.frmMain.hidActiveDiv.value = "divAdminsDetailForm";
}
function saveAndGotoAdminList() {
saveAdminDetails();
document.frmMain.all("divAdminsDetailForm").style.display = "none";
document.frmMain.all("divAdminsListForm").style.display = "inline";
document.frmMain.hidActiveDiv.value = "divAdminsListForm";
}
function saveAdminDetails() {
var vDiv = document.frmMain.all("divAdminsDetailForm");
var id = vDiv.all("hidAdminDtlId").value;
if (id == 0) {
id = oAdminsTable.rows.length - vAdminFtrRows;
var oRow;
oRow = oAdminsTable.insertRow(id);
oRow.style.backgroundColor = "white";
var i;
for (i=0;i<5;i++)
oRow.insertCell();
oRow.cells[4].style.width = "0%";
if (document.frmMain.hidMode.value == "Add")
vAdminAddId = id;
}
var sDetails, sActive, sSuffix, oSel, vLastNmAsHref, vUPN;
vLastNmAsHref = "<A href=\"javascript:gotoAdminDetail(" + 
id + 
")\">" +
vDiv.all("sLastNm").value + 
"</A>";
oSel = vDiv.all("selAdminUpnSuffix");
if (oSel.selectedIndex == -1) oSel.selectedIndex = 0; 
sSuffix = oSel.options(oSel.selectedIndex).innerText;
vUPN = vDiv.all("sCommonName").value + "@" + sSuffix;
sActive = vDiv.all("radActive_yes").checked ? "Active" : "Inactive";
sDetails = "<span style=\"display:none\">" +
vDiv.all("sBusPhone").value + "|" + 
vDiv.all("sBusEmail").value + "|" + 
vDiv.all("sBusAddr").value + "|" + 
vDiv.all("sCity").value + "|" + 
vDiv.all("sState").value + "|" + 
vDiv.all("sPostalCd").value + "|" + 
vDiv.all("selCountry").value + "|" + 
sActive + "|" + 
vDiv.all("sFaxNo").value + "|" + 
vDiv.all("sMobilePh").value + "|" + 
vDiv.all("sCommonName").value + "|" + 
sSuffix + "|" + 
vDiv.all("sDept").value + "|" + 
vDiv.all("sExtUsrId").value + "|" + 
vDiv.all("sHomePh").value + "|" + 
vDiv.all("sPager").value + "|" + 
vDiv.all("sTitle").value + "|" + 
vDiv.all("sDesc").value + "|" + 
vDiv.all("hidAdminDtlInstId").value + "|" + 
vDiv.all("hidAdminDtlSubId").value + "|" + 
vDiv.all("hidAdminDtlUsrTyp").value + "|" + 
vDiv.all("cbDebt").checked + "|" + 
vDiv.all("cbEquity").checked + "|" + 
vDiv.all("sLastNm").value + "|" + 
vDiv.all("sFirstNm").value + "|" + 
vUPN + "|" + 
vDiv.all("hidAdminDtlSubNm").value + 
"</span>";
oAdminsTable.rows[id].cells[0].innerHTML = vLastNmAsHref;
oAdminsTable.rows[id].cells[1].innerText = vDiv.all("sFirstNm").value;
oAdminsTable.rows[id].cells[2].innerText = vUPN;
oAdminsTable.rows[id].cells[3].innerText = vDiv.all("hidAdminDtlSubNm").value;
oAdminsTable.rows[id].cells[4].innerHTML = sDetails;
}
function gotoAdminList() {
document.frmMain.all("divAdminsDetailForm").style.display = "none";
document.frmMain.all("divAdminsListForm").style.display = "inline";
document.frmMain.hidActiveDiv.value = "divAdminsListForm";
}
function addUPN() {
var div = document.frmMain.all("divUPNsForm");
var suffix = new String(div.all("sSuffix").value);
if (0 == suffix.length){
alert("Please enter a UPN Suffix.");
}
else {
var oColl = div.all("selUpnSuffix").options;
var oOption = document.createElement("OPTION");
oColl.add(oOption);
oOption.innerText = suffix;
oOption.Value = oColl.length;
div.all("sSuffix").value = "";
div.all("sSuffix").focus();
}
}
function removeUPN() {
var div = document.frmMain.all("divUPNsForm");
var oColl = div.all("selUpnSuffix").options;
if (oColl.length>0) {
for (i = oColl.length - 1; 0 <= i; i--) {
if (oColl(i).selected) {
var oOption = oColl(i);
oOption = null;
oColl.remove(i);
}
}
}
}
function gotoTab( tab){
var sTab = new String(document.frmMain.hidActiveTab.value);
var sDiv = new String(document.frmMain.hidActiveDiv.value);
if (0 < sTab.length)
document.all(sTab.valueOf()).style.display = "none";
if (0 < sDiv.length) {
document.frmMain.all(sDiv.valueOf()).style.display = "none";
if (sDiv == "divAdminsDetailForm") {
if (tab != "admins") {
if (confirm("Do you want to save the administrator changes?")) {
saveAdminDetails();
}
}
}
}
switch (tab) {
case "cust":
document.all("divCustTabs").style.display = "inline";
document.frmMain.all("divCustForm").style.display = "inline";
document.frmMain.hidActiveTab.value = "divCustTabs";
document.frmMain.hidActiveDiv.value = "divCustForm";
break;
case "admins":
document.all("divAdminsTabs").style.display = "inline";
document.frmMain.hidActiveTab.value = "divAdminsTabs";
if (document.frmMain.hidMode.value == "Add") {
gotoAdminDetail(vAdminAddId);
}
else {
gotoAdminList();
}
break;
case "cats":
document.all("divCatsTabs").style.display = "inline";
document.frmMain.all("divCatsForm").style.display = "inline";
document.frmMain.hidActiveTab.value = "divCatsTabs";
document.frmMain.hidActiveDiv.value = "divCatsForm";
break;
case "upns":
document.all("divUPNsTabs").style.display = "inline";
document.frmMain.all("divUPNsForm").style.display = "inline";
document.frmMain.hidActiveTab.value = "divUPNsTabs";
document.frmMain.hidActiveDiv.value = "divUPNsForm";
break;
case "certs":
document.all("divCertsTabs").style.display = "inline";
document.frmMain.all("divCertsForm").style.display = "inline";
document.frmMain.hidActiveTab.value = "divCertsTabs";
document.frmMain.hidActiveDiv.value = "divCertsForm";
break;
case "subs":
document.all("divSubsTabs").style.display = "inline";
document.frmMain.all("divSubsForm").style.display = "inline";
document.frmMain.hidActiveTab.value = "divSubsTabs";
document.frmMain.hidActiveDiv.value = "divSubsForm";
break;
}
}
