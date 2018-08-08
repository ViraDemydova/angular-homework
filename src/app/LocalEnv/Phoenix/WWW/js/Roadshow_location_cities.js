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
function OnChangeShow(city_id,elt)
{
document.frmMain.hidCities.value = document.frmMain.hidCities.value + city_id
if(elt.checked == true)
document.frmMain.hidCities.value = document.frmMain.hidCities.value +",1,";
else
document.frmMain.hidCities.value = document.frmMain.hidCities.value +",0,";
}
function CheckAllCities(elt)
{
var i;
if(elt.checked == true)
{	
if(document.frmMain.chkCity) 
{
for(i=0;i<document.frmMain.chkCity.length;i++)
{
document.frmMain.chkCity[i].checked = true;
document.frmMain.hidCities.value = document.frmMain.hidCities.value + document.frmMain.chkCity[i].value;
document.frmMain.hidCities.value = document.frmMain.hidCities.value +",1,";
}
}
if(elt.name == "chkCountry" && document.frmMain.chkArea)
document.frmMain.chkArea.checked = true;
}
else
{
if(document.frmMain.chkCity) 
{
for(i=0;i<document.frmMain.chkCity.length;i++)
{
document.frmMain.chkCity[i].checked = false;
document.frmMain.hidCities.value = document.frmMain.hidCities.value + document.frmMain.chkCity[i].value;
document.frmMain.hidCities.value = document.frmMain.hidCities.value +",0,";
}
}
if(elt.name == "chkCountry" && document.frmMain.chkArea)
document.frmMain.chkArea.checked = false;
}
}
