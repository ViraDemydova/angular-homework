<!-- 
function onPageLoad()
{
}
function CustomValidation( frm, arrFieldsInError )
{
var arrMoreErrors	= new Array();
var nErrInd = 0;
if(frm.txtName)
{
if (frm.txtName.value == "")
{
var arrError = FieldErrorInfo("txtName", "Please enter Name", "", "txtName", "Venue Name");
arrMoreErrors[nErrInd] = arrError;
nErrInd++;
}
}
return (arrMoreErrors);
}
function submitPage( frm, action, sID, sName )
{
switch (action)
{
case "Search" :
if(ValidateForm( frm ))
{ 
frm.action = "/asp/Roadshow_venues.asp?Search=" + frm.txtSearch.value + "&Action=Search";
frm.hidAction.value = "Search";
frm.submit();
}
break;
case "AddSave":
if(ValidateForm( frm ))
{ 
frm.action = "/asp/util_submit_action.asp";
if (frm.hidCityID.value == "")
{
alert ("Please Select a city/location");
return ;
}
if (frm.hidMode.value == "Edit")
{
frm.hidAction.value = "UpdateVenue";
ProcessUpdate2XML(frm);
}
else
frm.hidAction.value = "Add";
frm.submit();
}
break;
case "AddCancel":
frm.action = "/asp/Roadshow_Venues.asp";
frm.hidAction.value = "Cancel";
frm.submit();
break;
case "EditLink":
frm.action = "/asp/Roadshow_venues_Add.asp?City=" + frm.hidCityLocation.value + "&VID=" + sID + "&VName=" + sName;
frm.hidAction.value = "EditLink";
frm.submit();
break;
case "UpdateActiveInds":
if(ValidateForm( frm ))
{ 
ProcessActiveInd2XML(frm);
frm.action = "/asp/util_submit_action.asp";
frm.hidAction.value = "UpdateActiveInds";
frm.submit();
}
break;
case "Delete":
if(ValidateForm( frm ))
{ 
ProcessDelete2XML(frm);
frm.action = "/asp/util_submit_action.asp";
frm.hidAction.value = "Delete";
frm.submit();
}
break;
case "Search+" :
var sUrl = "Roadshow_venues_search_popup.asp?";
var sStyle = "width=450, height=400, scrollbars=1";
openGeneralPopup( sUrl, '', sStyle );
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
sXML += "<PostalCode>" + frm.txtPostalCode.value + "</PostalCode>";
sXML += "</Venue>";
frm.hidUpdateActiveXML.value = sXML;
}
function OnChange(frm)
{
if(event.keyCode == 13)
{
if(ValidateForm( frm ))
{ 
frm.action = "/asp/Roadshow_venues.asp?Search=" + frm.txtSearch.value + "&Action=Search";
frm.hidAction.value = "Search";
frm.submit();
}
}
}
