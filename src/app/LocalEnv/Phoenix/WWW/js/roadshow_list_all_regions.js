function submitPage(frm)
{
frm.action = "/asp/util_submit_action.asp";
frm.method = "post";
frm.hidProgID.value = "RoadshowMaster_usr.RoadshowRegions";
frm.hidNextPage.value = "roadshow_list_all_regions.asp";
var sRoadshowRegions = "";
for (index = 0; index < frm.elements.length - 1; index++) 
{
if (frm.elements[index].type == "checkbox")
{
if (frm.elements[index].checked)
sRoadshowRegions += "1";
else
sRoadshowRegions += "0";
sRoadshowRegions += frm.elements[index].value;
sRoadshowRegions += ",";
}
}
frm.hidRoadshowRegions.value = sRoadshowRegions;
frm.submit();
return true;
}
