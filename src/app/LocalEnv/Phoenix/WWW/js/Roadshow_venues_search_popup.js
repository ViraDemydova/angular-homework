<!-- 
function onPageLoad()
{
}
function submitPage( frm, action, sID, sName, sAreaName, sCntryName )
{
switch (action)
{
case "Search" :
var vCountryID = frm.selCountry.options[frm.selCountry.selectedIndex].value;
frm.action = "/asp/Roadshow_venues_search_popup.asp?Search=" + frm.txtCityName.value + "&CountryID=" + vCountryID;
frm.hidAction.value = "Search";
frm.submit();
break;
case "CitySelected":
var sCity = sName + "," + sAreaName + "," + sCntryName;
window.parent.opener.document.all.spanCity.innerText = sCity;
window.parent.opener.document.frmMain.hidCity.value = sCity;
window.parent.opener.document.frmMain.hidCityID.value = sID;
window.close();
break;
}
}
function OnChange(frm)
{
if(event.keyCode == 13)
{
var vCountryID = frm.selCountry.options[frm.selCountry.selectedIndex].value;
frm.action = "/asp/Roadshow_venues_search_popup.asp?Search=" + frm.txtCityName.value + "&CountryID=" + vCountryID;
frm.hidAction.value = "Search";
frm.submit();
}
}
