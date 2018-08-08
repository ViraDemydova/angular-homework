function getDetails(frm, page, coord_id)
{ 
frm.hidCoordId.value=coord_id; 
frm.action = page; 
frm.submit();
}
function setSaveFlag(frm)
{
frm.hidSaveFlag.value = "true";
}
function submitPage(frm, action, button)
{
switch (button)
{
case "search" :
if (frm.hidCoordType.value == "3")
frm.action = "/asp/roadshow_search_coordinators_results.asp?coord_type=" + frm.hidCoordType.value + "&last_nm=" + frm.sUserName.value + "&firm_nm=" + frm.sFirmName.value;
else
frm.action = "/asp/roadshow_search_coordinators_results.asp?coord_type=" + frm.hidCoordType.value + "&last_nm=" + frm.sUserName.value
break;
case "addselected" :
frm.hidNextPage.value = "roadshow_list_coordinators.asp";
var sRoadshowCoordinators = "";
for (index = 0; index < frm.elements.length - 1; index++) 
{ 
if (frm.elements[index].type == "checkbox")
{
if (frm.elements[index].checked)
sRoadshowCoordinators += frm.elements[index].value + ",";
}
}
frm.action = "/asp/util_submit_action.asp";
frm.method = "post";
frm.hidProgID.value = "RoadshowMaster_usr.Coordinators";
frm.hidAction.value = action;
frm.hidButtonPressed.value = button;
frm.hidSelectedCoords.value = sRoadshowCoordinators;
break;
case "update" :
frm.hidNextPage.value = "roadshow_search_coordinators_results.asp?last_nm=" + frm.hidSearchLastName.value + "&firm_nm=" + frm.hidSearchFirmName.value; 
var sActiveIndicators = "";
for (index = 0; index < frm.elements.length - 1; index++) 
{
if (frm.elements[index].type == "checkbox")
{
sActiveIndicators += frm.elements[index].checked + "," + frm.elements[index].value + ",";
}
}
frm.hidActiveIndicators.value = sActiveIndicators;
frm.action = "/asp/util_submit_action.asp";
frm.method = "post";
frm.hidProgID.value = "RoadshowMaster_usr.Coordinators";
frm.hidAction.value = action;
frm.hidButtonPressed.value = button;
break;
case "reverttosaved" :
frm.action = "/asp/roadshow_search_coordinators_results.asp?coord_type=" + frm.hidCoordType.value + "&last_nm=" + + frm.hidSearchLastName.value + "&firm_nm=" + frm.hidSearchFirmName.value; 
frm.hidSaveFlag.value = "";
break;
case "cancel" :
frm.action = "/asp/roadshow_list_coordinators.asp?coord_type=" + frm.hidCoordType.value; 
}
frm.submit();
return true;
}
