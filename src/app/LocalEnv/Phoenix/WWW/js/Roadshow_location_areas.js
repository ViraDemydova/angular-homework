<!-- 
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
function showcities(area_id,area_nm,cntry_nm,continent_nm)
{
window.location = "/asp/Roadshow_location_cities.asp?area_id=" + area_id+"&area_nm="+area_nm +"&cntry_nm="+ cntry_nm +"&continent_nm="+continent_nm;
return;
}
function OnChangeShow(area_id,elt)
{
document.frmMain.hidAreas.value = document.frmMain.hidAreas.value + area_id
if(elt.checked == true)
document.frmMain.hidAreas.value = document.frmMain.hidAreas.value +",1,";
else
{
document.frmMain.hidAreas.value = document.frmMain.hidAreas.value +",0,";
document.frmMain.chkCountry.checked = false;
}
}
function CheckAllAreas(elt)
{
var i;
for(i=0;i<document.frmMain.chkArea.length;i++)
{
document.frmMain.hidAreas.value = document.frmMain.hidAreas.value + document.frmMain.chkArea[i].value;
if(elt.checked == true)
{
document.frmMain.chkArea[i].checked = true;
document.frmMain.hidAreas.value = document.frmMain.hidAreas.value +",1,";
}
else
{
document.frmMain.chkArea[i].checked = false;
document.frmMain.hidAreas.value = document.frmMain.hidAreas.value +",0,";
}
}
}
