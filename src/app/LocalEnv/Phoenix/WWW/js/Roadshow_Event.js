<!-- 
RSEnableRemoteScripting("/_ScriptLibrary");
var g_blnDirtyFlag;
function onPageLoad()
{
ConfirmRemoteScripting();
RSCallObject_wait(); 
onchange_event_main_type();
var PopupUrl;
PopupUrl = document.frmMain.hidPopupUrl.value;
if(PopupUrl =="Add_Attendee")
{
var lEventID = document.frmMain.hidEventId.value;
var sType = document.frmMain.hidType.value;
PopupUrl="roadshow_addattendee_popup.asp?EventID="+ lEventID+"&Type="+sType;
}
else if(PopupUrl == "View_Attendee")
{
var lEventID = document.frmMain.hidEventId.value;
PopupUrl = "Roadshow_View_Attendee.asp?EventID="+ lEventID;
}
if(PopupUrl.length > 0)
openGeneralPopup(PopupUrl, '', 'width=600,height=400,toolbar=no,scrollbars=yes,menubar=no,resizable=yes');
document.frmMain.hidPopupUrl.value ="";
g_blnDirtyFlag = 0;
}
function CustomValidation( frm, arrFieldsInError )
{
var arrMoreErrors = new Array();
if(String(frm.iEndHr.value).charAt(0)== "0") 
frm.iEndHr.value = String(frm.iEndHr.value).charAt(1);
if(String(frm.iStartHr.value).charAt(0)== "0") 
frm.iStartHr.value = String(frm.iStartHr.value).charAt(1);
var startTime = (frm.selStartAMPM.value == 'PM' ? 12 * 60 : 0) + 
(frm.iStartHr.value.length == 0 ? 0 : (parseInt(frm.iStartHr.value) == 12 ? 0 : parseInt(frm.iStartHr.value) )) * 60 + 
(frm.iStartMin.value.length == 0 ? 0 : parseInt(frm.iStartMin.value));
var endTime =	(frm.selEndAMPM.value == 'PM' ? 12 * 60 : 0) + 
(frm.iEndHr.value.length == 0 ? 0 : (parseInt(frm.iEndHr.value) == 12 ? 0 : parseInt(frm.iEndHr.value))) * 60 + 
(frm.iEndMin.value.length == 0 ? 0 : parseInt(frm.iEndMin.value));
if(endTime >0)
{
if (startTime > endTime)
{
var arrError = FieldErrorInfo("iStartHr", 'Start Time cannot be after End Time', "", "", "Start Time");
arrMoreErrors[arrMoreErrors.length] = arrError;	
}
}	
return (arrMoreErrors);
}
function submitPage( frm, action, sID, sName )
{
switch (action)
{
case "Save":
if (ValidateForm(frm))
{
if (parseInt(frm.hidEventId.value) > 0)
frm.hidAction.value = "Update";
else
frm.hidAction.value = "Add";
frm.method = "POST";
frm.action = "util_submit_action.asp";
frm.submit();
}	
break;
case "Cancel":
window.location.reload(true);
break;	
case "Delete":
if (window.confirm('Are you sure to delete this event?') == true)
{
frm.hidAction.value = "Delete";
frm.method = "POST";
frm.action = "util_submit_action.asp";
frm.submit();
}
break; 
}
}
var lastEventSubTypeId = "";
function onchange_event_main_type()
{	
var frm = document.frmMain;
var values;
if (frm.hidPageMode.value != '1')
values = frm.selEventMainType.options[document.frmMain.selEventMainType.selectedIndex].value.split(",");
else
values = frm.selEventMainType.value.split(",");
var sEventMainTypeId = values[0];
if (lastEventSubTypeId.length != 0)
document.all["EventSubType_" + lastEventSubTypeId].style.display = 'none';
document.all["EventSubType_" + sEventMainTypeId].style.display = 'inline';
document.all["selPresentationType"].style.display = 'none';
document.all["for"].style.display = 'none';
document.all["selPresentationAud"].style.display = 'none';
document.all["venue"].style.display = 'none';
document.all["account"].style.display = 'none';
document.all["callin"].style.display = 'none';
document.all["contactName"].style.display = 'none';	
document.all["phone"].style.display = 'none';
document.all["confirmation"].style.display = 'none';	
document.all["fax"].style.display = 'none';	
document.all["salesperson"].style.display = 'none';
document.all["moderator"].style.display = 'none'; 
document.all["aePhone"].style.display = 'none';
if (document.all["select_venue"])
document.all["select_venue"].style.display = 'none';	
if (document.all["select_account"])
document.all["select_account"].style.display = 'none';	
document.all["email"].style.display = 'none';
document.all["ShowAccountInformation_Div"].style.display = 'none';
var sEventCode = values[1];
switch (sEventCode)
{
case "1":
showElement(getDocumentElement("divExportOutlook"));
document.all["account"].style.display = 'inline';
document.all["contactName"].style.display = 'inline';	
document.all["phone"].style.display = 'inline';
document.all["salesperson"].style.display = 'inline';
document.all["aePhone"].style.display = 'inline';
if (document.all["select_account"])
document.all["select_account"].style.display = 'inline';	
document.all["email"].style.display = 'inline';
document.all["ShowAccountInformation_Div"].style.display = 'inline';
break;
case "G":
hideElement(getDocumentElement("divExportOutlook"));
document.all["venue"].style.display = 'inline';
document.all["contactName"].style.display = 'inline';	
document.all["phone"].style.display = 'inline';
document.all["fax"].style.display = 'inline';
if (document.all["select_venue"])
document.all["select_venue"].style.display = 'inline';
document.frmMain.hidInstInvId.value = "";
break;
case "C":
hideElement(getDocumentElement("divExportOutlook"));
document.all["venue"].style.display = 'inline';
document.all["callin"].style.display = 'inline';
document.all["confirmation"].style.display = 'inline';	
document.all["moderator"].style.display = 'inline';
if (document.all["select_venue"])
document.all["select_venue"].style.display = 'inline';
document.frmMain.hidInstInvId.value = "";
break;	
case "P":
document.all["selPresentationType"].style.display = 'inline';
document.all["for"].style.display = 'inline';
document.all["selPresentationAud"].style.display = 'inline';
hideElement(getDocumentElement("divExportOutlook"));
document.all["venue"].style.display = 'inline';
document.all["callin"].style.display = 'inline';
document.all["confirmation"].style.display = 'inline';	
document.all["moderator"].style.display = 'inline';
if (document.all["select_venue"])
document.all["select_venue"].style.display = 'inline';
document.frmMain.hidInstInvId.value = "";
break; 
}
if (lastEventSubTypeId.length != 0)
{
document.frmMain.elements["selEventSubType_" + sEventMainTypeId].options[0].selected = true;
document.frmMain.elements["selPresentationType"].options[0].selected = true;
document.frmMain.elements["selPresentationAud"].options[0].selected = true;
document.frmMain.sName.value = '';
document.frmMain.sAddress1.value = '';
document.frmMain.sAddress2.value = '';
document.frmMain.sAddress3.value = '';
document.frmMain.sCallIn.value = '';
document.frmMain.sContactName.value = '';
document.frmMain.sPhone.value = '';
document.frmMain.sConfirmation.value = '';
document.frmMain.sFax.value = '';
document.frmMain.sSalesperson.value = '';
document.frmMain.sModerator.value = '';
document.frmMain.sAEPhone.value = '';
document.frmMain.hidVenueId.value = '0';
document.frmMain.sEmail.value = '';
}
lastEventSubTypeId = sEventMainTypeId; 
}
function onSelectVenue()
{
openGeneralPopup('roadshow_event_venue_popup.asp?Loc=' + document.frmMain.selLocation.options[document.frmMain.selLocation.selectedIndex].value, '', 'width=600,height=400,toolbar=no,scrollbars=yes,menubar=no,resizable=yes');
}
function onSelectAccount()
{
openGeneralPopup('roadshow_event_account_popup.asp', '', 'width=600,height=400,toolbar=no,scrollbars=yes,menubar=no,resizable=yes');
}
function onSelectOneOnOne()
{
var sValue = document.frmMain.selLocation.options[document.frmMain.selLocation.selectedIndex].value;
var arrValue = sValue.split(",");
openGeneralPopup('roadshow_event_1on1_popup.asp?mode=' + document.frmMain.hidMode.value + '&DaySetupId=' + arrValue[3], '', 'width=600,height=400,toolbar=no,scrollbars=yes,menubar=no,resizable=yes');
}
function PopupAddAttendee(sType)
{
var url;
var lEventID = document.frmMain.hidEventId.value;
url="roadshow_addattendee_popup.asp?EventID="+ lEventID+"&Type="+sType;
openGeneralPopup(url, '', 'width=600,height=450,toolbar=no,scrollbars=yes,menubar=no,resizable=yes');	
}
function OnSelectAttendees()
{
var url;
var lEventID = document.frmMain.hidEventId.value;
url = "Roadshow_View_Attendee.asp?EventID="+ lEventID;
if( g_blnDirtyFlag ==1)
{
if (ValidateForm(document.frmMain))
{
if (parseInt(document.frmMain.hidEventId.value) > 0)
document.frmMain.hidAction.value = "Update";
else
document.frmMain.hidAction.value = "Add";
document.frmMain.hidPopupUrl.value = "View_Attendee";
document.frmMain.method = "POST";
document.frmMain.action = "util_submit_action.asp";
document.frmMain.submit();
}
}
else
{
openGeneralPopup(url, '', 'width=600,height=400,toolbar=no,scrollbars=yes,menubar=no,resizable=yes');
}
}
function SetDirtyFlag()
{
g_blnDirtyFlag = 1;
}
function onOutlookExport(frm)
{
if (frm.sName.value.length <= 0)
{
alert("Please select an \"1-on-1 request\" first!");
return;
}
if (frm.iStartHr.value.length == 0)
{
if(frm.hidPageMode.value == 1)
alert("A Start Time must be specified by the Coordinator in order to export to Outlook.");
else
alert("A Start Time must be specified."); 
return;
}
if (ValidateForm(frm))
{ 
var oSelLoc = frm.selLocation;
var arrLoc;
if (typeof(oSelLoc.options) != "undefined")
arrLoc = oSelLoc.options[frm.selLocation.selectedIndex].value.split(",");
else
arrLoc = oSelLoc.value.split(",");
var arrDttm = frm.hidRoadshowDttm.value.split(" ");
var url;
var rExp = /\'/g
var sStartTm = frm.iStartHr.value + ":" + frm.iStartMin.value + " " + frm.selStartAMPM.value.replace(rExp, "");
var sEndTm = frm.iEndHr.value + ":" + frm.iEndMin.value + " " + frm.selEndAMPM.value.replace(rExp,"");
if(frm.iEndHr.value == "" && (frm.iEndMin.value == "00" || frm.iEndMin.value == ""))
{
if(frm.iStartHr.value == "12")
sEndTm = "1";
else
sEndTm = Number(frm.iStartHr.value) + 1;
if(sEndTm == "12" && frm.selStartAMPM.value.replace(rExp, "") == "PM")
sEndTm = "11" + ":" + "59" + " ";
else
sEndTm = sEndTm + ":" + frm.iStartMin.value + " ";
if(frm.iStartHr.value == "11")
{
if(frm.selStartAMPM.value.replace(rExp, "") == "AM")
sEndTm = sEndTm + "PM";
else if(frm.selStartAMPM.value.replace(rExp, "") == "PM")
sEndTm = sEndTm + frm.selStartAMPM.value.replace(rExp, "");
}
else
sEndTm = sEndTm + frm.selStartAMPM.value.replace(rExp, "");
}	
var sName = frm.sName.value;
var sAddr1= frm.sAddress1.value;
var sAddr2= frm.sAddress2.value;
var sAddr3= frm.sAddress3.value;
var sCName= frm.sContactName.value;
var sCPhone= frm.sPhone.value;
var sSalesP= frm.sSalesperson.value;
var sSPhone= frm.sAEPhone.value;
url = "Roadshow_event_export_outlook.asp?LID=" + arrLoc[3] + "&Dttm=" + arrDttm[0];
url = url + "&ST=" + sStartTm + "&ET=" + sEndTm;
url = url + "&SN=" + escape(sName);
url = url + "&A1=" + escape(sAddr1);
url = url + "&A2=" + escape(sAddr2);
url = url + "&A3=" + escape(sAddr3);
url = url + "&CN=" + escape(sCName);
url = url + "&CP=" + escape(sCPhone);
url = url + "&SA=" + escape(sSalesP);
url = url + "&SP=" + escape(sSPhone);
openGeneralPopup(url, '', 'width=600,height=400,toolbar=no,scrollbars=yes,menubar=no,resizable=yes');
}
}
function ShowPending(inst_inv_id, mode)
{
openGeneralPopup('roadshow_1On1_list_popup.asp?inst_inv_id=' + inst_inv_id + '&mode=' + mode, '', 'width=750,height=300,resizable,toolbar=no,scrollbars,menubar=no'); 
}
function ShowAccountInformation(frm)
{
var contactID, sInvName, sRequestorName ;
contactID = frm.hidAccountContactID.value ;
sInvName = frm.sName.value ;
sRequestorName = frm.sContactName.value ;
if ( (contactID != null) && (contactID != '') && (Number(contactID) > 0))
{
var sURL;
sURL = "inst_inv_acct_contact_details.asp" ;
sURL = sURL + "?CONTACTID=" ;
sURL = sURL + contactID ;
sURL = sURL + "&INVESTORNAME=" ;
sURL = sURL + escape(sInvName) ;
sURL = sURL + "&REQUESTORNAME=" ;
sURL = sURL + escape(sRequestorName) ;
var sStyle = "width=400,height=500,scrollbars=0,resizable=1,left=5,top=5";
openGeneralPopup( sURL, '', sStyle ); 
}
else
{
alert("An existing Account Contact must first be chosen.") ;
}
}
function EmailEventToAcctContact(frm)
{
var sSubject , sBody, sTemp, sEmailTo, oElem ;
sTemp = "Issue Code: " + frm.hidIssueCd.value + "\n" ;
sTemp = sTemp + "Expense Code: " + frm.hidExpenseCd.value + "\n" ;
sTemp = sTemp + "Alias Name: " + frm.hidAliasNm.value + "\n" ;
sTemp = sTemp + "Alias Code: " + frm.hidAliasCd.value + "\n" ;
oElem = document.getElementById("spanAddEventDate") ;
sTemp = sTemp + "Add Event: " + oElem.innerText + "\n" ;
sTemp = sTemp + "Roadshow Dates: \n" ;
oElem = document.getElementById("tdStartDate") ;
sTemp = sTemp + "StartDate: " + oElem.innerText + "\n" ;
oElem = document.getElementById("tdEndDate") ;
sTemp = sTemp + "EndDate: " + oElem.innerText + "\n" ;
sTemp = sTemp + "DayCount: " + frm.hidDayCount.value + "\n" ;
if (frm.hidPageMode.value != '1')
{
sTemp = sTemp + "Location: " + frm.selLocation.options[frm.selLocation.selectedIndex].text + "\n" ;
}
else
{
oElem = document.getElementById("spanLocName") ;
sTemp = sTemp + "Location: " + oElem.innerText ;
sTemp = sTemp + "\n" ;
}
if (frm.hidPageMode.value != '1')
{
sTemp = sTemp + "EventType: " + frm.selEventMainType.options[frm.selEventMainType.selectedIndex].text ;
var sName
var arrName, sElemName ;	
sElemName = frm.selEventMainType.options[frm.selEventMainType.selectedIndex].value ;
arrName = sElemName.split(",")
if ( ( arrName[0] != undefined ) && ( arrName[0] != null ) )
{
var sEventSubType ;
oElem = eval("frm.selEventSubType_" + arrName[0]) ;
sEventSubType = oElem.options[oElem.selectedIndex].text ;
sTemp = sTemp + " " + sEventSubType ;
}
sTemp = sTemp + "\n" ;
}
else
{
oElem = document.getElementById("spanEventType") ;
sTemp = sTemp + "EventType: " + oElem.innerText ;
sTemp = sTemp + "\n" ;
}
if (frm.hidPageMode.value != '1')
{
sTemp = sTemp + "Start Time: " ;
if (frm.iStartHr.value != "") 
{
sTemp = sTemp + frm.iStartHr.value + ":" + frm.iStartMin.value ;
sTemp = sTemp + " " + frm.selStartAMPM.options[frm.selStartAMPM.selectedIndex].text ;
}
sTemp = sTemp + "\n" ;
sTemp = sTemp + "End Time: " ;
if(frm.iEndHr.value != "")
{
sTemp = sTemp + frm.iEndHr.value + ":" + frm.iEndMin.value ;
sTemp = sTemp + " " + frm.selEndAMPM.options[frm.selEndAMPM.selectedIndex].text ;
}
sTemp = sTemp + "\n\n" ;
}
else
{
sTemp = sTemp + "Start Time: " ;
if (frm.iStartHr.value != "") 
{
sTemp = sTemp + frm.iStartHr.value + ":" + frm.iStartMin.value ;
sTemp = sTemp + " " + frm.selStartAMPM.value;
}
sTemp = sTemp + "\n" ;
sTemp = sTemp + "End Time: " ;
if(frm.iEndHr.value != "")
{
sTemp = sTemp + frm.iEndHr.value + ":" + frm.iEndMin.value ;
sTemp = sTemp + " " + frm.selEndAMPM.value ;
}
sTemp = sTemp + "\n\n" ;
}
sTemp = sTemp + "Account Name: " + frm.sName.value + "\n" ;
sTemp = sTemp + "Address: \n" ;
sTemp = sTemp + frm.sAddress1.value + "\n" ;
sTemp = sTemp + frm.sAddress2.value + "\n" ;
sTemp = sTemp + frm.sAddress3.value + "\n" ;
sTemp = sTemp + "ContactName: " + frm.sContactName.value + "\n" ;
sTemp = sTemp + "Phone: " + frm.sPhone.value + "\n" ;
sTemp = sTemp + "Email: " + frm.sEmail.value + "\n" ;
sTemp = sTemp + "Salesperson: " + frm.sSalesperson.value + "\n" ;
sTemp = sTemp + "Sales Phone: " + frm.sAEPhone.value + "\n" ;
sTemp = sTemp + "Coordinator Comments: " + "\n" ;
sTemp = sTemp + frm.sCordComments.value + "\n" ;
sTemp = sTemp + "Sales Comments:" + "\n" ;
sTemp = sTemp + frm.sComments.value + "\n" ;
sBody = escape(sTemp) ;
sSubject = "Roadshow Event Details" ;
sEmailTo = frm.sEmail.value ;
sURL = "mailto:" ;
sURL = sURL + sEmailTo ;
sURL = sURL + "?subject=" ;
sURL = sURL + sSubject ;
sURL = sURL + "&body=" ;
sURL = sURL + sBody ;
window.open(sURL, null, "height=200,width=200,status=yes,toolbar=no,menubar=no,location=no") ;
return;	
}
function ConfirmRemoteScripting()
{ 
var enabled = false;
context = "Confirm";
co = RSExecute('rs_roadshow_server.asp', 'js_RemoteScriptingEnabled', RSShowResult, RSShowError, context);
}
function RSShowResult(co)
{
var frm = document.frmMain;
var sRet = co.return_value
switch (co.context)
{
case "Confirm":
if (! sRet)
alert("Remote scripting not enabled");
break;
case "SendEmail":
alert("Contact administrator has been notified.") ;
break;
}
}
function RSShowError(co)
{
msg = "The following error occurred during the " 
msg = msg + co.context
msg = msg + " remote scripting call:\n"
msg = msg + co.message
alert(msg);
}
