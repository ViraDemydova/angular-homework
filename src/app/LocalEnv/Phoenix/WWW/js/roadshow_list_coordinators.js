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
case "update" :
frm.hidNextPage.value = "roadshow_list_coordinators.asp";
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
case "addnewcoordinator" :
frm.action = "/asp/util_submit_action.asp";
frm.method = "post";
frm.hidProgID.value = "RoadshowMaster_usr.Coordinators";
frm.hidAction.value = action;
frm.hidButtonPressed.value = button;
frm.hidNextPage.value = "roadshow_search_coordinators.asp";
break;
case "reverttosaved" :
frm.action = "/asp/roadshow_list_coordinators.asp?coord_type=" + frm.hidCoordType.value;
frm.hidSaveFlag.value = "";
}
frm.submit();
return true;
}
