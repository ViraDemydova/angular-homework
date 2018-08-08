<!-- 
function onPageLoad()
{
}
function CustomValidation( frm, arrFieldsInError )
{
var arrMoreErrors = new Array();
return (arrMoreErrors);
} 
function submitPage( frm, action, sID, sName )
{
switch (action)
{
case "Add":
if (ValidateForm(frm))
{
frm.action = "/asp/util_submit_action.asp";
frm.submit();
}	
case "Search+" :
var sUrl = "Roadshow_venues_search_popup.asp?";
var sStyle = "width=450, height=400, scrollbars=1";
openGeneralPopup( sUrl, '', sStyle );
break;
case "Cancel":
if (confirm("Are you sure you want to cancel it?") == true)
frm.reset();
break;
case "Next":
var vIssID = frm.hidDealID.value;
var vDealName = frm.hidDealName.value;
frm.action = "/asp/Roadshow_overview_contacts.asp?IssID=" + vIssID + "&DName=" + vDealName;
frm.submit();
break;
case "Previous":
frm.action = "/asp/specialRoadshow_Overview.asp";
frm.submit();
break;
}
}
function ToggleActiveInd(frm)
{
if (frm.chkActive.checked == false)
frm.hidActiveInd.value = "0";
else
frm.hidActiveInd.value = "1";
}
function ProcessActiveInd2XML(frm)
{
var sXML = "<Venues>";
var varrCB = document.all.item("cbActiveInd");
for (var i=0; i < varrCB.length; i++)
{
sXML += "<Venue>";
sXML += "<ID>";
sXML += varrCB[i].value;
sXML += "</ID>";
sXML += "<ActiveInd>";
sXML += (varrCB[i].checked == true) ? "1" : "0";
sXML += "</ActiveInd>";
sXML += "</Venue>";
}
sXML += "</Venues>";
frm.hidUpdateActiveXML.value = sXML;
}
function ProcessDelete2XML(frm)
{
var sXML = "<Venue>";
var vID = frm.hidVenueID.value;
sXML += "<Delete>";
sXML += "<ID>";
sXML += vID;
sXML += "</ID>";
sXML += "</Delete>";
sXML += "</Venue>";
frm.hidUpdateActiveXML.value = sXML;
}
function ProcessUpdate2XML(frm)
{
var sXML = "<Venue>";
var vID = frm.hidVenueID.value;
var vCityID = frm.hidCityID.value;
sXML += "<ID>" + vID + "</ID>";
sXML += "<Name>" + frm.txtName.value + "</Name>";
sXML += "<ActiveInd>" + frm.hidActiveInd.value + "</ActiveInd>";
sXML += "<Address1>" + frm.txtAddress1.value + "</Address1>";
sXML += "<Address2>" + frm.txtAddress2.value + "</Address2>";
sXML += "<Address3>" + frm.txtAddress3.value + "</Address3>";
sXML += "<CityID>" + vCityID + "</CityID>";
sXML += "<ContactName>" + frm.txtContactName.value + "</ContactName>";
sXML += "<PhoneNo>" + frm.txtPhone.value + "</PhoneNo>";
sXML += "<FaxNo>" + frm.txtFax.value + "</FaxNo>";
sXML += "<EMail>" + frm.txtEMail.value + "</EMail>";
sXML += "</Venue>";
frm.hidUpdateActiveXML.value = sXML;
}
function OnChange(frm)
{
frm.action = "/asp/Roadshow_venues.asp?Search=" + frm.txtSearch.value;
frm.hidAction.value = "Search";
}
function popUpDeal(frm)
{
var sUrl = "Roadshow_overview_search_popup.asp?";
var sStyle = "width=450, height=400, scrollbars=1";
openGeneralPopup( sUrl, '', sStyle );
}
function popUpTeam(sTeamName,sTeamID) 
{
var sUrl = "Roadshow_Team_Popup.asp?TName=" + sTeamName+"&TeamID=" + sTeamID;
var sStyle = "width=450, height=400, scrollbars=1";
openGeneralPopup( sUrl, '', sStyle );
}
function populateOverview()
{
var frm = document.frmMain;
frm.txtOVDealName.value = frm.hidDealName.value;
frm.txtOVDealCode.value = frm.hidDealCD.value;
frm.txtOVExpenseCode.value = frm.hidExpenseCD.value;
var sTmp = new String(frm.hidUseAlias.value);
document.all.cbUseAlias.checked = (sTmp.length > 0) ? sTmp : false;
frm.txtAliasName.value = frm.hidAliasName.value;
frm.txtAliasCode.value = frm.hidAliasCode.value;
}
function showElement(oElement)
{
if (oElement)
{
if (document.getElementById)
{
oElement.style.visibility="visible";
}
else if (document.all)
{
oElement.style.visibility="visible";
}
else if (document.layers)
{
oElement.visibility="show";
}
return 1;
}
}
function hideElement(oElement)
{
if (oElement)
{
if (document.getElementById)
{
oElement.style.visibility="hidden";
}
else if (document.all)
{
oElement.style.visibility="hidden";
}
else if (document.layers)
{
oElement.visibility="hide";
}
return 1;
}
}
function popUpAdd(type)
{
var sUrl = "Roadshow_add_contacts.asp?type=" + type;
var sStyle = "width=450, height=400, scrollbars=1";
openGeneralPopup( sUrl, '', sStyle );
}
