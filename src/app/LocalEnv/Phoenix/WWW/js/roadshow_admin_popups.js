function savePopupAreasInfo(CountryName)
{
<!-- Capture user selection -->
var nSelectedSize = getSelectValsSize(document.forms["frmMain"].elements["lst" + CountryName].options);	
<!-- Update selection caption -->
var sNewName;
window.opener.document.forms["frmMain"].elements["hid" + CountryName].value = collectSelectVals(document.forms["frmMain"].elements["lst" + CountryName].options, nSelectedSize);
sNewName = CountryName + "+" + " (" + nSelectedSize + " of " + document.forms["frmMain"].elements["lst" + CountryName].options.length + " selected)";
if (nSelectedSize == document.forms["frmMain"].elements["lst" + CountryName].options.length)
window.opener.document.forms["frmMain"].elements["chk" + CountryName].checked = true;
else
window.opener.document.forms["frmMain"].elements["chk" + CountryName].checked = false;
window.opener.document.all[CountryName].innerText = sNewName;
window.close();
}
function savePopupCitiesInfo(AreaName)
{
<!-- Capture user selection -->
var nSelectedSize = getSelectValsSize(document.forms["frmMain"].elements["lst" + AreaName].options);	
<!-- Update selection caption -->
var sNewName;
window.opener.document.forms["frmMain"].elements["hid" + AreaName].value = collectSelectVals(document.forms["frmMain"].elements["lst" + AreaName].options, nSelectedSize);
sNewName = AreaName + "+" + " (" + nSelectedSize + " of " + document.forms["frmMain"].elements["lst" + AreaName].options.length + " selected)";
if (nSelectedSize == document.forms["frmMain"].elements["lst" + AreaName].options.length)
window.opener.document.forms["frmMain"].elements["chk" + AreaName].checked = true;
else
window.opener.document.forms["frmMain"].elements["chk" + AreaName].checked = false;
window.opener.document.all[AreaName].innerText = sNewName;
window.close();
}
function savePopupFirmInfo(FirmName, FirmId, FirmCity, FirmZip, FirmAddress)
{
window.opener.document.all.spanFirm.innerText = FirmName;
window.opener.document.frmMain.hidBrkId.value = FirmId;	
window.opener.document.frmMain.txtAddress1.disabled = false;
window.opener.document.frmMain.txtAddress1.value = FirmAddress;	
window.opener.document.frmMain.txtAddress2.disabled = false;
window.opener.document.frmMain.txtAddress2.value = "";
window.opener.document.frmMain.txtAddress3.disabled = false;
window.opener.document.frmMain.txtAddress3.value = "";
window.opener.document.frmMain.txtCityLocation.disabled = false;
window.opener.document.frmMain.txtCityLocation.value = FirmCity;	
window.opener.document.frmMain.txtPostalCode.disabled = false;
window.opener.document.frmMain.txtPostalCode.value = FirmZip;	
window.close();
}
function searchPopupFirm(frm)
{ 
frm.action = "/asp/roadshow_firms_popup.asp?firm_nm=" + frm.txtName.value; 
frm.submit();
}
<!-- Selection helper functions -->
function check(name) {
if (document.forms["frmMain"].elements[name].checked==true) {
checkList(name);
}
if (document.forms["frmMain"].elements[name].checked==false) {
uncheckList(name);
}
}
function allSelectedCheck(name)	{
numberSelected=0;
for (count=document.forms["frmMain"].elements["lst" + name].length -1; count >=0; count--) {
if(document.forms["frmMain"].elements["lst" + name].options[count].selected==true) {
numberSelected++;
} 
}
if (numberSelected==document.forms["frmMain"].elements["lst" + name].length) {
document.forms["frmMain"].elements[name].checked=true;
} else {document.forms["frmMain"].elements[name].checked=false;
}
}
function checkList(name)	{
document.forms["frmMain"].elements[name].checked=true;
for (count=document.forms["frmMain"].elements["lst" + name].length -1; count >=0; count--) {
document.forms["frmMain"].elements["lst" + name].options[count].selected=true;
}
}
function uncheckList(name)	{
document.forms["frmMain"].elements[name].checked=false;
for (count=document.forms["frmMain"].elements["lst" + name].length -1; count >=0; count--) {
document.forms["frmMain"].elements["lst" + name].options[count].selected=false;
}
}
function getSelectValsSize(oSourceListOptions)
{
var nSize = 0;
for(z=0; z<oSourceListOptions.length; z++)
{
if (oSourceListOptions[z].selected)
nSize++;
}
return nSize;
}
function collectSelectVals(oSourceListOptions)
{
var oSourceOptions, sList, z;
sList="";
for(z=0; z<oSourceListOptions.length; z++)
{
if (oSourceListOptions[z].selected)
{
if (z==0)
sList += oSourceListOptions[z].value;
else
sList += "," + oSourceListOptions[z].value; 
}
}
return sList;
}
function ChangeViewTypeForPopup(frm,sViewType,sPageType)
{
if (sPageType =='Areas')
{
frm.action = "/asp/roadshow_areas_popup.asp?ViewType=" + sViewType + "&country_id=" + frm.hidCountryid.value +"&country_nm=" + frm.hidCountryName.value + "&selected_areas=" + frm.hidselected_areas.value;
}
else
{
frm.action = "/asp/roadshow_cities_popup.asp?ViewType=" + sViewType + "&area_id="+ frm.hidAreaid.value + "&area_nm=" + frm.hidarea_nm.value + "&selected_cities=" + frm.hidselected_cities.value ;
}
frm.submit();
return true;
}
