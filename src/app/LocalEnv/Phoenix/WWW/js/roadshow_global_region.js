function getDetails(frm, page, region_id, region_nm)
{ 
frm.hidRegionId.value=region_id; 
frm.hidRegionName.value=region_nm;
frm.action = page; 
frm.submit();
}
function getContinentalDetails(frm, page, region_id, glb_region_nm, glb_region_id, where_from)
{ 
frm.hidRegionId.value=region_id; 
frm.hidRegionName.value=glb_region_nm;
frm.hidGlbRegionId.value=glb_region_id;
frm.hidWhereFrom.value = where_from;
frm.action = page; 
frm.submit();
}
function setSaveFlag(frm)
{
frm.hidSaveFlag.value = "true";
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
if (frm.elements["lstAfrica"].selectedCount == -1 && frm.elements["lstAsia"].selectedCount == -1 && frm.elements["lstAustralasia"].selectedCount == -1 && frm.elements["lstEurope"].selectedCount == -1 && frm.elements["lstNorth America"].selectedCount == -1 && frm.elements["lstSouth America"].selectedCount == -1)
{
var arrError = FieldErrorInfo("lstAfrica", 'Please select one or more country(s)', "", "lstAfrica", "Country");
arrMoreErrors[count] = arrError;	
count++;
}
return (arrMoreErrors);
} 
function submitPage(frm, action, button, page, region_id, glb_region_nm, glb_region_id, where_from)
{
if (button != "cancel")
{
frm.action = "/asp/util_submit_action.asp";
frm.method = "post";
frm.hidProgID.value = "RoadshowMaster_usr.GlobalRegions";
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
frm.hidNextPage.value = "roadshow_list_all_regions.asp";
break;
case "addcontinentalregion" :
frm.hidNextPage.value = "roadshow_add_continental_region.asp";
break;
case "regiondetails" :
frm.hidNextPage.value = page + "?hidRegionId=" + region_id + "&hidRegionName=" + glb_region_nm + "&hidGlbRegionId=" + glb_region_id + "&hidWhereFrom=" + where_from;
break;
case "edit":
frm.action="/asp/roadshow_edit_global_region.asp?PageType=2"
frm.submit();
break;
}
if (ValidateForm(frm)) 
{
var sCountries = collectSelectVals(frm.elements["lstAfrica"].options);
if (frm.elements["lstAsia"].selectedCount != -1)
{
sCountries += "," + collectSelectVals(frm.elements["lstAsia"].options);
}
if (frm.elements["lstAustralasia"].selectedCount != -1)
{
sCountries += "," + collectSelectVals(frm.elements["lstAustralasia"].options);
}
if (frm.elements["lstEurope"].selectedCount != -1)
{
sCountries += "," + collectSelectVals(frm.elements["lstEurope"].options);
}
if (frm.elements["lstNorth America"].selectedCount != -1)
{
sCountries += "," + collectSelectVals(frm.elements["lstNorth America"].options);
}
if (frm.elements["lstSouth America"].selectedCount != -1)
{
sCountries += "," + collectSelectVals(frm.elements["lstSouth America"].options);
}
if (frm.elements["lstNo Africa/Middle East"].selectedCount != -1)
{
sCountries += "," + collectSelectVals(frm.elements["lstNo Africa/Middle East"].options);
}
frm.hidCountries.value = sCountries;
var sContRegionFlag = "false";
for (index = 0; index < frm.elements.length; index++) 
{
if (frm.elements[index].type == "checkbox" && frm.elements[index].name == "continentalregion")
{
sContRegionFlag = "true";
break;
}
}
if (action == "Update" && sContRegionFlag == "true")
{
var sActiveIndicators = "";
for (index = 0; index < frm.elements["continentalregion"].length; index++) 
{
if (frm.elements["continentalregion"][index].type == "checkbox")
{
sActiveIndicators += frm.elements["continentalregion"][index].checked + "," + frm.elements["continentalregion"][index].value + ",";
}
}
if (sActiveIndicators == "")
frm.hidActiveIndicators.value += frm.continentalregion.checked + "," + frm.continentalregion.value;
else
frm.hidActiveIndicators.value = sActiveIndicators;
}
frm.submit();
return true;
}
}
else
{
frm.action = "/asp/roadshow_list_all_regions.asp";
frm.hidSaveFlag.value = "";
frm.submit();
return true;
}
}
function ChangeViewType(frm,sViewType)
{
frm.action = "/asp/roadshow_edit_global_region.asp?ViewType=" + sViewType
frm.submit();
return true;
}
