<!-- 
RSEnableRemoteScripting("/_ScriptLibrary");
function CheckConditionallyRequiredFields( frm, arrFieldsInError )
{
var arrMoreErrors = new Array();
if ( frm.selLocDate.options[frm.selLocDate.selectedIndex].value == 0 ) 
{
var arrError = FieldErrorInfo("selLocDate", 'Please select a date', "", "", "Location Date");
arrMoreErrors[arrMoreErrors.length] = arrError;
}	
if ( frm.selGlobalReg.options[frm.selGlobalReg.selectedIndex].value == 0 ) 
{
var arrError = FieldErrorInfo("selGlobalReg", 'Please select a Global Region', "", "", "Global Region");
arrMoreErrors[arrMoreErrors.length] = arrError;
}	
return (arrMoreErrors);
} 
function CustomValidation( frm, arrFieldsInError )
{
var arrMoreErrors = new Array();
return (arrMoreErrors);
} 
function submitPage( frm , action )
{
switch (action)
{
case "add" :
{
if (ValidateForm(frm))
{
frm.hidAction.value = "Add";
frm.method = "POST";
frm.action = "util_submit_action.asp";
frm.submit(); 
}
}
break;
case "publish" :
{
for (var i = 0; i < frm.publish.length; i++)
{
frm.publish[i].disabled = false;
}
frm.hidAction.value = "Publish";
frm.method = "POST";
frm.action = "util_submit_action.asp";
frm.submit(); 
}
break;
case "cancel" :
{
window.location.reload(true);
} 
break; 
case "back" :
{
window.location = "Roadshow_overview_contacts.asp";
} 
break; 
case "schedule_event" :
{
window.location = "roadshow_schedule.asp?iRsIssId=" + frm.hidRSIssId.value + "&mode=" + frm.hidMode.value;
} 
break; 
}
}
function error_alert(co)
{
alert("Error_callback\n\n" +
"status = " + co.status + "\n\n" +
"message = " + co.message + "\n\n" +
"data = " + co.data);
}
function clearComboBox(cb)
{
while (cb.length > 0)
cb.options[0] = null;
if (document.frmMain.hidIsARegional.value != "1")
{
var option0 = new Option(document.frmMain.hidNonSelected.value, 0, true, true);
cb.options[cb.length] = option0; 
}
}
function buildComboBox(cb, sContent)
{
var lastPos = 0;
var index = sContent.indexOf(" ", 0);
while (index != -1)
{
var sizeOfValue = parseInt(sContent.substr(lastPos, index));
var value = sContent.substr(index + 1, sizeOfValue);
lastPos = index + 1 + sizeOfValue + 1;
index = sContent.indexOf(" ", lastPos)
var sizeOfText = parseInt(sContent.substr(lastPos, index));
var text = sContent.substr(index + 1, sizeOfText);
lastPos = index + 1 + sizeOfText + 1;
index = sContent.indexOf(" ", lastPos)	
var option = new Option(text, value, false, false);
cb.options[cb.length] = option;
}
}
function addComboBoxItem(cb, text, value)
{
for (var i = 0; i < cb.length; i++)
{
if (cb.options[i].value == value)
{
return;
}
}
cb.options[cb.length] = new Option(text, value, false, false);
}
var iDaySetupGlbRegID = 0;
var iDaySetupGlbRegNm = 1;
var iDaySetupContRegID = 2;
var iDaySetupContRegNm = 3;
var iDaySetupRegLocationID = 4;
var iRegLocationNm = 5;
var iDaySetupRoadshowDttm = 6;
var iDaySetupTeamID = 8;
var iDaySetupTeamNm = 9;
var iCoordinatorLocationsContRegID = 2;
var iCoordinatorLocationsRegLocationID = 4;
var iCoordinatorLocationsRegLocationNm = 5;
function listGlobalRegion()
{ 
if (document.frmMain.hidIsARegional.value != "1")
{
return;
}
clearComboBox(document.frmMain.selGlobalReg);
clearComboBox(document.frmMain.selRegion);
clearComboBox(document.frmMain.selLocation);
var sSelLocDate = document.frmMain.selLocDate.options[document.frmMain.selLocDate.selectedIndex].value;
var dSelLocDate = new Date(sSelLocDate.substring(0, 4), sSelLocDate.substring(5, 7) - 1, sSelLocDate.substring(8));
for (var i = 0; i < arrDaySetup.length; i++) 
{
var sRoadshowDttm = arrDaySetup[i][iDaySetupRoadshowDttm];
var dRoadshowDttm = new Date(sRoadshowDttm.substring(0, 4), sRoadshowDttm.substring(5, 7) - 1, sRoadshowDttm.substring(8, 10));
if (dRoadshowDttm.valueOf() == dSelLocDate.valueOf())
{
addComboBoxItem(document.frmMain.selGlobalReg, 
arrDaySetup[i][iDaySetupGlbRegNm], 
arrDaySetup[i][iDaySetupGlbRegID]);
}
}
listRegion();
}
function listRegion()
{ 
clearComboBox(document.frmMain.selRegion);
clearComboBox(document.frmMain.selLocation);
var sSelLocDate = document.frmMain.selLocDate.options[document.frmMain.selLocDate.selectedIndex].value;
var dSelLocDate = new Date(sSelLocDate.substring(0, 4), sSelLocDate.substring(5, 7) - 1, sSelLocDate.substring(8));
var sSelGlobalReg = "";
if(document.frmMain.selGlobalReg.selectedIndex != -1)
{
sSelGlobalReg = document.frmMain.selGlobalReg.options[document.frmMain.selGlobalReg.selectedIndex].value;
}
if (document.frmMain.hidIsARegional.value == "1")
{
for (var i = 0; i < arrDaySetup.length; i++) 
{
var sRoadshowDttm = arrDaySetup[i][iDaySetupRoadshowDttm];
var dRoadshowDttm = new Date(sRoadshowDttm.substring(0, 4), sRoadshowDttm.substring(5, 7) - 1, sRoadshowDttm.substring(8, 10));
var sGlbRegID = arrDaySetup[i][iDaySetupGlbRegID];
if ((dRoadshowDttm.valueOf() == dSelLocDate.valueOf()) && 
(sGlbRegID == sSelGlobalReg))
{
addComboBoxItem(document.frmMain.selRegion, 
arrDaySetup[i][iDaySetupContRegNm], 
arrDaySetup[i][iDaySetupContRegID]);
}
}
listLocation();
} 
else 
{ 
if (sSelGlobalReg != 0)
{ 
var co = RSExecute('roadshow_rs_loc_setup.asp', 'js_ListContRegion', sSelGlobalReg);
if (co.status != 0)
{
error_alert(co);
return;
}
buildComboBox(document.frmMain.selRegion, new String(co.return_value));
}
}
}
function listLocation()
{ 
clearComboBox(document.frmMain.selLocation);
var sSelRegion = "";
if(document.frmMain.selRegion.selectedIndex != -1)
{
sSelRegion = document.frmMain.selRegion.options[document.frmMain.selRegion.selectedIndex].value
}
if (document.frmMain.hidIsARegional.value == "1")
{
for (var i = 0; i < arrCoordinatorLocations.length; i++) 
{
var sCoordinatorContRegID = arrCoordinatorLocations[i][iCoordinatorLocationsContRegID];
if (sCoordinatorContRegID == sSelRegion)
{
addComboBoxItem(document.frmMain.selLocation, 
arrCoordinatorLocations[i][iCoordinatorLocationsRegLocationNm], 
arrCoordinatorLocations[i][iCoordinatorLocationsRegLocationID]);
}
}
listTeam();
} 
else 
{ 
if (sSelRegion != 0)
{
var co = RSExecute('roadshow_rs_loc_setup.asp', 'js_RegLocation', sSelRegion);
if (co.status != 0)
{
error_alert(co);
return;
}
buildComboBox(document.frmMain.selLocation, new String(co.return_value));
}
}
} 
function listTeam()
{
if (document.frmMain.hidIsARegional.value != "1")
{
return;
}
clearComboBox(document.frmMain.selTeam);
var sSelLocDate = document.frmMain.selLocDate.options[document.frmMain.selLocDate.selectedIndex].value;
var dSelLocDate = new Date(sSelLocDate.substring(0, 4), sSelLocDate.substring(5, 7) - 1, sSelLocDate.substring(8));
var sSelGlobalReg = "";
if(document.frmMain.selGlobalReg.selectedIndex != -1)
{
sSelGlobalReg = document.frmMain.selGlobalReg.options[document.frmMain.selGlobalReg.selectedIndex].value;
}
var sSelRegion = "";
if(document.frmMain.selRegion.selectedIndex != -1)
{
sSelRegion = document.frmMain.selRegion.options[document.frmMain.selRegion.selectedIndex].value ;
}
for (var i = 0; i < arrDaySetup.length; i++) 
{
var sRoadshowDttm = arrDaySetup[i][iDaySetupRoadshowDttm];
var dRoadshowDttm = new Date(sRoadshowDttm.substring(0, 4), sRoadshowDttm.substring(5, 7) - 1, sRoadshowDttm.substring(8, 10));
var sGlbRegID = arrDaySetup[i][iDaySetupGlbRegID];
var sContRegID = arrDaySetup[i][iDaySetupContRegID];
var sTeamID = arrDaySetup[i][iDaySetupTeamID];
if ((dRoadshowDttm.valueOf() == dSelLocDate.valueOf()) && 
(sGlbRegID == sSelGlobalReg) &&
(sContRegID == sSelRegion) &&
(sTeamID != ""))
{
addComboBoxItem(document.frmMain.selTeam, arrDaySetup[i][iDaySetupTeamNm], sTeamID);
}
}
}
function OnPublish(elt)
{
if(elt.checked == false)
{
alert('Unable to unpublish.This location is currently accepting 1-on-1');
return false;
}
else
return true;
}
