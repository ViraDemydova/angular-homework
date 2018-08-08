<!-- 
function onPageLoad()
{
var frm = document.frmMain;
frm.selViewby.selectedIndex = (frm.hidSortBy.value == "Date") ? 0 : 1;
SetPermissioning(1);
}
function OnSortChanged(frm)
{
var iSort = frm.selViewby.options[frm.selViewby.selectedIndex].value;
frm.hidSortBy.value = (iSort == 1) ? "Date" : "Location";
frm.action = "/asp/Roadshow_1On1_List.asp?sSortBy=" + frm.hidSortBy.value;
frm.submit();
}
function CustomValidation( frm, arrFieldsInError )
{
var arrMoreErrors = new Array();
return (arrMoreErrors);
} 
function submitPage( frm, action, sID, sName )
{
SetPermissioning(0);
switch (action)
{
case "Add":
if (ValidateForm(frm))
{
ProcessTable(frm);
frm.action = "/asp/util_submit_action.asp";
frm.submit();
}	
break;
case "Update":
if (ValidateForm(frm))
{
frm.action = "/asp/util_submit_action.asp";
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
if (window.history.length > 0)
window.history.go(-1);
} 
break;
case "DrillDown":
frm.action = "/asp/Roadshow_1On1_Add.asp?iRequestID=" + sID;
frm.submit();
break;	
}
}
function ProcessTable(frm)
{
var oTable = getDocumentElement("tblLoc");
if (typeof(oTable) != "undefined")
{
frm.hidTableRows.value = oTable.rows.length;
frm.hidTableCols.value = oTable.rows(1).cells.length;
//var rExp = /\
var sMsg = oTable.rows.length + " x " + oTable.rows(1).cells.length + " table";
for (var i=1; i < oTable.rows.length; i++)
{
var sRequestID = eval("frm.hidRequestId" + i).value;
var sDate = eval("frm.hidStartDate" + i).value;
var sHr = eval("frm.hr_" + sRequestID).value;
if (sHr == "") sHr = "00";
var sMin = eval("frm.min_" + sRequestID).value;
if (sMin == "") sMin = "00";
var oAMPM = eval("frm.amPm_" + sRequestID);
var sAMPM = oAMPM.options[oAMPM.selectedIndex].text;
oTable.rows(i).cells(6).innerText = sHr + ":" + sMin + sAMPM;
eval("frm.hidStartDttm" + i).value = sDate + " " + oTable.rows(i).cells(6).innerText;
var sHr2 = eval("frm.hr2_" + sRequestID).value;
if (sHr2 == "") sHr2 = "00";
var sMin2 = eval("frm.min2_" + sRequestID).value;
if (sMin2 == "") sMin2 = "00";
var oAMPM2 = eval("frm.amPm2_" + sRequestID);
var sAMPM2 = oAMPM2.options[oAMPM2.selectedIndex].text;
oTable.rows(i).cells(7).innerText = sHr2 + ":" + sMin2 + sAMPM2;
eval("frm.hidEndDttm" + i).value = sDate + " " + oTable.rows(i).cells(7).innerText;
}
}
}
function OnChangeAmPm(frm, sRequestID)
{
var oAmPm = eval("document.frmMain.amPm_" + sRequestID);
var ohidAmPm = eval("document.frmMain.hidSelamPm_" + sRequestID);
if (typeof(oAmPm) != "undefined" && typeof(ohidAmPm) != "undefined")
{
ohidAmPm.value = oAmPm.options[oAmPm.selectedIndex].text;
}
}
function OnChangeAmPm2(frm, sRequestID)
{
var oAmPm = eval("document.frmMain.amPm2_" + sRequestID);
var ohidAmPm = eval("document.frmMain.hidSelamPm2_" + sRequestID);
if (typeof(oAmPm) != "undefined")
{
ohidAmPm.value = oAmPm.options[oAmPm.selectedIndex].text;
}
}
function skip () { this.blur(); }
function enableDisableElement(oElement,bDisabled)
{
if (oElement)
{
if (document.all)	
{
oElement.disabled = bDisabled;
}
else if (document.layers) 
{
if(bDisabled)
{
oElement.onfocus=skip;
}
else
{
oElement.onfocus=""; 
}	
}	
}
}
function SetPermissioning(bLoad)
{
var frm = document.frmMain;
var oElement;
var bCoorActive = frm.hidCoorActiveInd.value;
if (bLoad) 
{
for (var i=0; i<daySetupAry.length; i++)
{
oElement = frm.elements["cbAccept" + daySetupAry[i][0]];
if (oElement)
{
var iValue = parseInt(daySetupAry[i][1]);
if (iValue > 2 && bCoorActive == 1)
enableDisableElement(oElement, false);
else
enableDisableElement(oElement, true);
}
}
for (var i=0; i<OneOnOneReqAry.length; i++)
{
oElement = frm.elements["cbCalledOut" + OneOnOneReqAry[i][0]];
if (oElement)
{
var iValue = parseInt(OneOnOneReqAry[i][1]);
if (iValue > 2)
enableDisableElement(oElement, false);
else
enableDisableElement(oElement, true);
}
oElement = frm.elements["amPm_" + OneOnOneReqAry[i][0]];
if (oElement)
{
if (OneOnOneReqAry[i][1] == '1')
enableDisableElement(oElement, true);
else
enableDisableElement(oElement, false);
}
if (oElement)
oElement = frm.elements["amPm2_" + OneOnOneReqAry[i][0]];
{
if (OneOnOneReqAry[i][1] == '1')
enableDisableElement(oElement, true);
else
enableDisableElement(oElement, false);
}
}
}
else 
{
for (var i=0; i<daySetupAry.length; i++)
{
oElement = frm.elements["cbAccept" + daySetupAry[i][0]];
if (oElement) enableDisableElement(oElement, false);
}
for (var i=0; i<OneOnOneReqAry.length; i++)
{
oElement = frm.elements["cbCalledOut" + OneOnOneReqAry[i][0]];
if (oElement) enableDisableElement(oElement, false);
oElement = frm.elements["amPm_" + OneOnOneReqAry[i][0]];
if (oElement) enableDisableElement(oElement, false);
oElement = frm.elements["amPm2_" + OneOnOneReqAry[i][0]];
if (oElement) enableDisableElement(oElement, false);
}
}
}
function SetDirty(Requestid)
{
var elt = eval("document.frmMain.hidDirty_" + Requestid );
elt.value = 1;
}
