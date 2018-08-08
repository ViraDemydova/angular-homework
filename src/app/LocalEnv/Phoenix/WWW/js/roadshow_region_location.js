function checkAll()	
{
for (index = 0; index < document.forms["frmMain"].elements.length -1; index++) 
{
if (document.forms["frmMain"].elements[index].name != "chkAll" && 
document.forms["frmMain"].elements[index].name != "chkActiveIndicator" && 
document.forms["frmMain"].elements[index].type == "checkbox")
{
document.forms["frmMain"].elements[index].checked = document.forms["frmMain"].elements["chkAll"].checked;
}
}
}
function checkAllCountriesAndAreas()
{
checkAll();
for (index = 0; index < document.forms["frmMain"].elements.length -1; index++) 
{
if (document.forms["frmMain"].elements[index].type == "checkbox" && 
document.forms["frmMain"].elements[index].name != "chkActiveIndicator" && 
document.forms["frmMain"].elements[index].name != "chkAll")
{
var AreaId = document.forms["frmMain"].elements[index].value;
var AreaName = document.forms["frmMain"].elements[index].name;
AreaName = AreaName.slice(3);
checkAllAreaLocations(AreaId, AreaName);
}
}
}
function checkAllAreaLocations(AreaId, AreaName)	
{
if (!document.forms["frmMain"].elements["hid_id" + AreaId])
return;
var nTotalLocations = document.forms["frmMain"].elements["hid_id" + AreaId].value;
if (nTotalLocations == 0)
return;
var nSelectedLocations = 0;
if (document.forms["frmMain"].elements["chk" + AreaName].checked)
{
nSelectedLocations = nTotalLocations;
document.forms["frmMain"].elements["hid" + AreaName].value = "-all-;";
}
else
{
document.forms["frmMain"].elements["hid" + AreaName].value = "";
}
sNewName = AreaName + "+" + " (" + nSelectedLocations + " of " + nTotalLocations + " selected)"; 
document.forms["frmMain"].all[AreaName].innerText = sNewName;
}
function checkAllCountryAreas(CountryId, CountryName)
{
for (index = 0; index < document.forms["frmMain"].elements.length -1; index++) 
{
if (document.forms["frmMain"].elements[index].type == "checkbox" && 
document.forms["frmMain"].elements[index].name != "chkActiveIndicator" && 
document.forms["frmMain"].elements[index].name != "chkAll")
{
var AreaId = document.forms["frmMain"].elements[index].value;
var AreaName = document.forms["frmMain"].elements[index].name;
AreaName = AreaName.slice(3);
if (document.forms["frmMain"].elements["hid_pid" + AreaId] &&
document.forms["frmMain"].elements["hid_pid" + AreaId].value == CountryId)
{
document.forms["frmMain"].elements["chk" + AreaName].checked = document.forms["frmMain"].elements["country_chk" + CountryName].checked;
checkAllAreaLocations(AreaId, AreaName);
}
}
}
}
function popUpCities(AreaId, AreaName)
{
document.forms["frmMain"].hidSaveFlag.value = "true";
var sUrl = "roadshow_cities_popup.asp?area_id=" + AreaId +"&area_nm=" + AreaName + "&selected_cities=" + document.forms["frmMain"].elements["hid" + AreaName].value;
var sStyle = "height=450,width=400,resizable,status,scrollbars=yes";
openGeneralPopup( sUrl, '', sStyle );
}
function CheckConditionallyRequiredFields( frm, arrFieldsInError )
{
var arrMoreErrors = new Array();
var count = 0;
if (frm.sLocationName.value == ""){
var arrError = FieldErrorInfo("sLocationName", 'Please enter a location full name.', "", "sLocationName", "Name");
arrMoreErrors[count] = arrError;	
count++;
}
if (frm.sLocationShortName.value == ""){
var arrError = FieldErrorInfo("sLocationShortName", 'Please enter a location short name.', "", "sLocationShortName", "Short Name");
arrMoreErrors[count] = arrError;	
count++;
}
var sStoredCities = "";
for (index = 0; index < frm.elements.length - 1; index++) 
{
if (frm.elements[index].name != "chkAll" && 
frm.elements[index].name.substr(0, 7) != "country" && 
frm.elements[index].name != "chkActiveIndicator" && 
frm.elements[index].type == "checkbox")
{
var sAreaName = frm.elements[index].name;
sStoredCities = frm.elements["chk" + sAreaName.substr(3, sAreaName.length - 3)].value;
if ( sStoredCities != "")
break;
}
}
return (arrMoreErrors);
} 
function submitPage(frm, action, button)
{
if (button != "cancel")
{
frm.action = "/asp/util_submit_action.asp";
frm.method = "post";
frm.hidProgID.value = "RoadshowMaster_usr.Locations";
frm.hidAction.value = frm.hidAction.value;
frm.hidLocationName.value = frm.sLocationName.value;
frm.hidLocationShortName.value = frm.sLocationShortName.value;
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
case "edit":
frm.action=window.location + "&PageType=2"
frm.submit();
break;
}
if (ValidateForm(frm)) 
{
<!-- Store selected areas and cities -->
for (index = 0; index < frm.elements.length - 1; index++) 
{
if (frm.elements[index].name != "chkAll" && 
frm.elements[index].name.substr(0, 7) != "country" && 
frm.elements[index].name != "chkActiveIndicator" && 
frm.elements[index].type == "checkbox")
{
var sStoredCities;
var sAreaName = frm.elements[index].name;
if(frm.elements["hid" + sAreaName.substr(3, sAreaName.length - 3)])
{
sStoredCities = frm.elements["hid" + sAreaName.substr(3, sAreaName.length - 3)].value;
if ( sStoredCities != "" && sStoredCities)
{
<!-- Capture cities -->
frm.elements["hidCities"].value += frm.elements[index].value + "," + sStoredCities + ";";
}	
}
}
} 
frm.submit();
return true;
}
}
else
{
frm.action = frm.hidBack_To.value + "?region_id=" + frm.hidContinentalRegionId.value + "&global_region_id=" + frm.hidGlbRegionId.value +"&global_region_nm=" + frm.hidGlbRegionName.value + "&where_from=roadshow_list_all_regions.asp";
frm.hidSaveFlag.value = "";
frm.submit();
return true;
}
}
function setSaveFlag(frm)
{
frm.hidSaveFlag.value = "true";
}
function ChangeViewType(frm,sViewType)
{
frm.action = "/asp/roadshow_edit_region_location.asp?ViewType=" + sViewType
frm.submit();
return true;
}
