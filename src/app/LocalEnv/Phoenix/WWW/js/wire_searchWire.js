<!-- 
function onPageLoad()
{
menuShow('wire_inbox', 'show');
fillWireCategoryDropDown();
} 
function viewWireInBox(mode)
{
var frm = document.frmMain;
frm.hidMode.value = mode;
frm.action = "wire_Inbox.asp";
frm.submit();
}
function getSearchCriteria(frm)
{
var securityTypeSel = frm.sSecurityType;
var wireCategorySel = frm.sWireCategory;
var sSearchCriteria = "<searchCriteria>";
sSearchCriteria += "<dateFrom>"
if(frm.dtTxtStartDate.value != "") 
sSearchCriteria += frm.dtTxtStartDate.value + " 00:00:00 AM</dateFrom>";
else 
sSearchCriteria += frm.dtTxtStartDate.value + "</dateFrom>";	
sSearchCriteria += "<dateTo>"
if(frm.dtTxtEndDate.value != "") 
sSearchCriteria += frm.dtTxtEndDate.value + " 11:59:59 PM</dateTo>";
else 
sSearchCriteria += frm.dtTxtEndDate.value + "</dateTo>"; 
sSearchCriteria += "<dealName>" + frm.txtDealName.value + "</dealName>";
sSearchCriteria += "<dealCode>" + frm.txtDealCode.value + "</dealCode>";
sSearchCriteria += "<securityType>" + securityTypeSel.options[securityTypeSel.selectedIndex].value + "</securityType>";
sSearchCriteria += "<wireType>" + wireCategorySel.options[wireCategorySel.selectedIndex].value + "</wireType>";
sSearchCriteria += "</searchCriteria>";
return sSearchCriteria;
}
function search(frm)
{
if (ValidateForm(frm))
{
frm.hidSearchCriteria.value = getSearchCriteria(frm);
frm.action = "wire_searchWire.asp";
frm.submit();
return true;
}
}
function fillWireCategoryDropDown()
{
var sSel = document.frmMain.sSecurityType;
var wireCategorySel = document.frmMain.sWireCategory;
var selectedWireType = document.frmMain.hidSelectedWireType;
clearWireCategoryDropDown();
for(var i=0; i< arrWireCategories.length; i++) 
{
if (arrWireCategories[i][0] == "B" || arrWireCategories[i][0] == sSel.value)
{
var opt = new Option(arrWireCategories[i][2], arrWireCategories[i][1]);
wireCategorySel.options[wireCategorySel.options.length] = opt;
if ((selectedWireType.value != '') && (arrWireCategories[i][1] == selectedWireType.value))
{
wireCategorySel.options[wireCategorySel.options.length - 1].selected = true;
}
}
}
}
function clearWireCategoryDropDown()
{
document.frmMain.sWireCategory.length = 0;
}
function CheckConditionallyRequiredFields( frm, arrFieldsInError )
{
var arrMoreErrors = new Array();
var StartDate = frm.dtTxtStartDate.value;
var EndDate = frm.dtTxtEndDate.value;
var index = 0;
if (StartDate !="" && EndDate !="")
{
if ( DateCmp( StartDate, EndDate ) == 1 )
{
var arrError = FieldErrorInfo("dtTxtEndDate", "Please enter a end date greater than the start date", "", "dtTxtEndDate", "End Date");
arrMoreErrors[index++] = arrError;	
}
}
return (arrMoreErrors);
} 
