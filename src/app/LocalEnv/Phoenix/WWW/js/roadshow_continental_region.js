function checkAll()	
{
for (index = 0; index < document.forms["frmMain"].elements.length; index++) 
{
if (document.forms["frmMain"].elements[index].name != "chkAll" &&
document.forms["frmMain"].elements[index].name != "chkActiveIndicator" && 
document.forms["frmMain"].elements[index].type == "checkbox" &&
document.forms["frmMain"].elements[index].name != "regionlocation")
document.forms["frmMain"].elements[index].checked = document.forms["frmMain"].elements["chkAll"].checked;
}
}
function setSaveFlag(frm)
{
frm.hidSaveFlag.value = "true";
}
function checkAllRegionsAndCountries()
{
checkAll();
for (index = 0; index < document.forms["frmMain"].elements.length; index++) 
{
if (document.forms["frmMain"].elements[index].type == "checkbox" && 
document.forms["frmMain"].elements[index].name != "chkRegion" && 
document.forms["frmMain"].elements[index].name != "chkActiveIndicator" && 
document.forms["frmMain"].elements[index].name != "chkAll" &&
document.forms["frmMain"].elements[index].name != "regionlocation")
{
var CountryId = document.forms["frmMain"].elements[index].value;
var CountryName = document.forms["frmMain"].elements[index].name;
CountryName = CountryName.slice(3);
checkAllCountryAreas(CountryId, CountryName);
}
}
}
function checkAllCountryAreas(CountryId, CountryName)	
{
var nTotalAreas = document.forms["frmMain"].elements["hid_id" + CountryId].value;
if (nTotalAreas == 0)
return;
var nSelectedAreas = 0;
if (document.forms["frmMain"].elements["chk" + CountryName].checked)
{
nSelectedAreas = nTotalAreas;
document.forms["frmMain"].elements["hid" + CountryName].value = "-all-;";
}
else
{
document.forms["frmMain"].elements["hid" + CountryName].value = "";
}
sNewName = CountryName + "+" + " (" + nSelectedAreas + " of " + nTotalAreas + " selected)"; 
document.forms["frmMain"].all[CountryName].innerText = sNewName;
}
function checkAllRegionCountries()
{
document.forms["frmMain"].elements["chkAll"].checked = document.forms["frmMain"].elements["chkRegion"].checked;
checkAllRegionsAndCountries();
}
function popUpAreas(CountryId, CountryName,CountryCode)
{
document.forms["frmMain"].hidSaveFlag.value = "true";
if(CountryCode == 'CAN' || CountryCode == 'USA')
var sUrl = "roadshow_areas_popup.asp?country_id=" + CountryId +"&country_nm=" + CountryName + "&selected_areas=" + document.forms["frmMain"].elements["hid" + CountryName].value;
else
{
var sUrl = "roadshow_cities_popup.asp?country_id=" + CountryId +"&country_nm=" + CountryName + "&RegionId=" + document.forms["frmMain"].elements["hidRegionId"].value;
}
var sStyle = "height=450,width=400,resizable,status,scrollbars=yes";
openGeneralPopup( sUrl, '', sStyle );
}
function CheckConditionallyRequiredFields( frm, arrFieldsInError )
{
var arrMoreErrors = new Array();
var count = 0;
if (frm.sRegionName.value == ""){
var arrError = FieldErrorInfo("sRegionName", 'Please enter a region full name.', "", "sRegionName", "Name");
arrMoreErrors[count] = arrError;	
count++;
}
if (frm.sRegionShortName.value == ""){
var arrError = FieldErrorInfo("sRegionShortName", 'Please enter a region short name.', "", "sRegionShortName", "Short Name");
arrMoreErrors[count] = arrError;	
count++;
}
var sStoredAreas = "";
for (index = 0; index < frm.elements.length - 1; index++) 
{
if (frm.elements[index].name != "chkAll" && 
frm.elements[index].name != "chkRegion" && 
frm.elements[index].name != "chkActiveIndicator" && 
frm.elements[index].type == "checkbox" &&
frm.elements[index].name != "regionlocation" )
{
var sCountryName = frm.elements[index].name;
sStoredAreas = frm.elements["hid" + sCountryName.substr(3, sCountryName.length - 3)].value;
if ( sStoredAreas != "")
break;
}
}
if (sStoredAreas == "")
{
var arrError = FieldErrorInfo("chkAll", 'Please select one or more area(s)', "", "chkAll", "Area");
arrMoreErrors[count] = arrError;	
count++;
}
return (arrMoreErrors);
} 
function submitPage(frm, action, button, page, location_id, region_nm, region_id)
{
if (button != "cancel")
{
frm.action = "/asp/util_submit_action_EQ.asp";
frm.method = "post";
frm.hidProgID.value = "RoadshowMaster_usr.ContinentalRegions";
frm.hidAction.value = action;
frm.hidRegionName.value = frm.sRegionName.value;
frm.hidRegionShortName.value = frm.sRegionShortName.value;
frm.hidActiveIndicator.value = frm.chkActiveIndicator.checked;
frm.hidButtonPressed.value = button;
switch (button)
{
case "done" :
frm.hidNextPage.value = frm.hidWhereFrom.value;
break;
case "back" :
frm.hidNextPage.value = frm.hidBack_To.value;
break;
case "addregionlocation" :
frm.hidNextPage.value = "roadshow_add_region_location.asp";
break;
case "locationdetails" :
frm.hidNextPage.value = page + "?hidLocationId=" + location_id + "&hidRegionId=" + region_id + "&hidRegionName=" + region_nm +
"&hidGlbRegionId=" + frm.hidGlbRegionId.value + "&hidGlbRegionName=" + frm.hidGlbRegionName.value + "&hidWhereFrom=" + frm.hidWhereFrom.value;	
break;
case "edit":
frm.action="/asp/roadshow_edit_continental_region.asp?PageType=2"
frm.submit();
break;
}
if (ValidateForm(frm)) 
{
<!-- Store selected countries and areas -->
var sLocationFlag = "false";
for (index = 0; index < frm.elements.length; index++) 
{
if (frm.elements[index].name != "chkAll" && 
frm.elements[index].name != "chkRegion" && 
frm.elements[index].name != "chkActiveIndicator" &&
frm.elements[index].type == "checkbox" &&
frm.elements[index].name != "regionlocation")
{
var sStoredAreas;
var sCountryName = frm.elements[index].name;
if (sCountryName.substr(0,3) == "chk")
{
sStoredAreas = frm.elements["hid" + sCountryName.substr(3, sCountryName.length - 3)].value;
if ( sStoredAreas != "")
{
<!-- Capture countries -->
frm.elements["hidCountries"].value += frm.elements[index].value + ",";
<!-- Capture areas -->
if( frm.elements[index].value == 840 || frm.elements[index].value == 124)
frm.elements["hidAreas"].value += frm.elements[index].value + "," + sStoredAreas + ";";
else
frm.elements["hidCities"].value += frm.elements[index].value + "," + sStoredAreas + ";";
}	
}
}
if (frm.elements[index].type == "checkbox" && frm.elements[index].name == "regionlocation")
sLocationFlag = "true";
}	
if (action == "Update" && sLocationFlag == "true")
{
var sActiveIndicators = "";
for (index = 0; index < frm.elements["regionlocation"].length; index++) 
{
if (frm.elements["regionlocation"][index].type == "checkbox")
{
sActiveIndicators += frm.elements["regionlocation"][index].checked + "," + frm.elements["regionlocation"][index].value + ",";
}
}
if (sActiveIndicators == "")
frm.hidActiveIndicators.value += frm.regionlocation.checked + "," + frm.regionlocation.value;
else
frm.hidActiveIndicators.value = sActiveIndicators;
} 
frm.submit();
return true;
}
}
else
{
if (frm.hidBack_To.value != "roadshow_edit_global_region.asp") 
frm.action = "roadshow_list_all_regions.asp";
else
frm.action = frm.hidBack_To.value + "?region_id=" + frm.hidGlbRegionId.value;
frm.hidSaveFlag.value = "";
frm.submit();
return true;
}
}
function ChangeViewType(frm,sViewType)
{
frm.action = "/asp/roadshow_edit_continental_region.asp?ViewType=" + sViewType
frm.submit();
return true;
}
