<!-- 
function ShowCountries(frm,ContinentID)
{
frm.hidContinentID.value = ContinentID;
frm.action = "/asp/Roadshow_location_master.asp";
frm.submit();
}
function onPageLoad()
{
}
function submitPage( frm, action )
{
switch (action)
{ 
case "Save":
frm.action = "/asp/util_submit_action.asp";
frm.submit(); 
break; 
}
}
function ShowCountries(frm,ContinentID)
{
if(frm.hidContinentID.value !=ContinentID)
frm.hidContinentID.value = ContinentID;
else
frm.hidContinentID.value = "";
frm.action = "/asp/Roadshow_location_master.asp";
frm.submit();
}
function ShowAreas(cntry_id,name,continent_nm)
{
if(cntry_id == "840"||cntry_id == "124")
window.location = "/asp/Roadshow_location_areas.asp?CntryID=" + cntry_id+"&country_nm=" + name +"&continent_nm="+continent_nm;
else
window.location = "/asp/Roadshow_location_cities.asp?CntryID=" + cntry_id+"&cntry_nm=" + name +"&continent_nm="+continent_nm;
return;
}
function OnChangeShow(cntry_id,elt)
{
document.frmMain.hidCountries.value = document.frmMain.hidCountries.value + cntry_id
if(elt.checked == true)
document.frmMain.hidCountries.value = document.frmMain.hidCountries.value +",1,";
else
document.frmMain.hidCountries.value = document.frmMain.hidCountries.value +",0,";
}
