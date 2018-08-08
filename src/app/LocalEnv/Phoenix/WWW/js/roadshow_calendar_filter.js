<!-- 
function onPageLoad()
{
var frm = document.frmMain;
if (frm.chkFilingDt.checked && frm.chkProspAvailDt.checked && frm.chkOfferDt.checked)
frm.chkAllDealInfo.checked = true;
if (frm.chkDeal.checked && frm.chkNonDeal.checked)
frm.chkAllRoadshowType.checked = true;
if (frm.elements['chkGlbRegIssr'].length == 1)
{
if (frm.chkGlbRegIssr.checked && frm.chkGlbRegEvent.checked)
frm.chkAllGlobalRegion.checked = true;
}
else if (frm.elements['chkGlbRegIssr'].length > 1)
{
var checkAll = true
for (var i=0; i<frm.elements['chkGlbRegIssr'].length; i++)
{
if (!frm.chkGlbRegIssr[i].checked || !frm.chkGlbRegEvent[i].checked)
{
checkAll = false;
break; 
}
}
frm.chkAllGlobalRegion.checked = checkAll;
} 
if (frm.chkRoadshow.checked && frm.chkAnalyMgmt.checked && frm.chkPreMakt.checked) 
frm.chkAllScheduleType.checked = true;
if (frm.chkLeadManaged.checked && frm.chkCoManaged.checked) 
frm.chkAllRole.checked = true;
if (frm.chkCommon.checked && frm.chkConvertible.checked)
frm.chkAllSecType.checked = true;
}
function CheckConditionallyRequiredFields( frm, arrFieldsInError )
{
var arrMoreErrors = new Array();
if (frm.sSaveView.value.length == 0 && frm.selSelectView.options[frm.selSelectView.selectedIndex].value == '-1')
{
var arrError = FieldErrorInfo("sSaveView", "A filter name is missing.", "", "sSaveView", "Creat New View");
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
case "save" :
{
if(ValidateForm( frm ))
{ 
if (frm.selSelectView.options[frm.selSelectView.selectedIndex].value == '-1' || frm.sSaveView.value.length > 0)
{
frm.hidAction.value = "add";
frm.hidFilterName.value = frm.sSaveView.value;
}
else
{
frm.hidAction.value = "update";
}
frm.method = "post";
frm.action = "roadshow_calendar_action.asp";
frm.submit(); 
} 
}
break; 
case "delete" : 
frm.hidAction.value = "delete"; 
frm.method = "post";
frm.action = "roadshow_calendar_action.asp";
frm.submit();	
break;
case "update_calendar" :
{
frm.hidCurrentFilterId.value = frm.selSelectView.options[frm.selSelectView.selectedIndex].value;
frm.hidAction.value = "update_calendar";
frm.method = "post";
frm.action = "roadshow_calendar_action.asp";
frm.submit(); 
}
break; 
case "change_filter" :
{
frm.method = "post";
frm.action = "roadshow_calendar_filter.asp";
frm.submit(); 
}
break; 
case "close" :
{
window.close(); 
}
break;
case "cancel" :
{
window.close(); 
}
break; 
}	
}
function onRenameFilter()
{
javascript:window.open('roadshow_calendar_filter_rename_popup.asp?filterId=' + document.frmMain.selSelectView.options[document.frmMain.selSelectView.selectedIndex].value, null, 'width=300,height=150,toolbar=no,scrollbars=yes,menubar=no,resizable=no,status=no', true);
}
function onClickAll(checkBox)
{
if (checkBox.checked)
{
var frm = document.frmMain;
switch (checkBox.name)
{
case 'chkAllDealInfo':
frm.chkFilingDt.checked = true;
frm.chkProspAvailDt.checked = true;
frm.chkOfferDt.checked = true;
break;
case 'chkAllRoadshowType':
frm.chkDeal.checked = true;
frm.chkNonDeal.checked = true;
break; 
case 'chkAllGlobalRegion':
if (frm.elements['chkGlbRegIssr'].length == 1)
{
frm.chkGlbRegIssr.checked = true;
frm.chkGlbRegEvent.checked = true;
}
else if (frm.elements['chkGlbRegIssr'].length > 1)
{
for (var i=0; i<frm.elements['chkGlbRegIssr'].length; i++)
{
frm.chkGlbRegIssr[i].checked = true;
frm.chkGlbRegEvent[i].checked = true; 
}
}
break; 
case 'chkAllScheduleType':
frm.chkRoadshow.checked = true;
frm.chkAnalyMgmt.checked = true;
frm.chkPreMakt.checked = true;
break;	
case 'chkAllRole':
frm.chkLeadManaged.checked = true;
frm.chkCoManaged.checked = true;
break;	
case 'chkAllSecType':
frm.chkCommon.checked = true;
frm.chkConvertible.checked = true;
break; 
}
}
}
function onClickChild(checkBox)
{
var frm = document.frmMain;
if (!checkBox.checked)
{	
switch (checkBox.name)
{
case 'chkFilingDt':
case 'chkProspAvailDt':
case 'chkOfferDt': 
frm.chkAllDealInfo.checked = false;
break;
case 'chkDeal':
case 'chkNonDeal':
frm.chkAllRoadshowType.checked = false;
break; 
case 'chkGlbRegIssr':
case 'chkGlbRegEvent':
frm.chkAllGlobalRegion.checked = false;
break; 
case 'chkRoadshow':
case 'chkAnalyMgmt':
case 'chkPreMakt': 
frm.chkAllScheduleType.checked = false;
break;	
case 'chkLeadManaged':
case 'chkCoManaged': 
frm.chkAllRole.checked = false;
break;	
case 'chkCommon':
case 'chkConvertible':
frm.chkAllSecType.checked = false;
break; 
} 
}
else
{ 
switch (checkBox.name)
{
case 'chkFilingDt':
case 'chkProspAvailDt':
case 'chkOfferDt': 
if (frm.chkFilingDt.checked && frm.chkProspAvailDt.checked && frm.chkOfferDt.checked)
frm.chkAllDealInfo.checked = true;
break;
case 'chkDeal':
case 'chkNonDeal':
if (frm.chkDeal.checked && frm.chkNonDeal.checked)
frm.chkAllRoadshowType.checked = true;
break; 
case 'chkGlbRegIssr':
case 'chkGlbRegEvent':
if (frm.elements['chkGlbRegIssr'].length == 1)
{
if (frm.chkGlbRegIssr.checked && frm.chkGlbRegEvent.checked)
frm.chkAllGlobalRegion.checked = true;
}
else if (frm.elements['chkGlbRegIssr'].length > 1)
{
var checkAll = true
for (var i=0; i<frm.elements['chkGlbRegIssr'].length; i++)
{
if (!frm.chkGlbRegIssr[i].checked || !frm.chkGlbRegEvent[i].checked)
{
checkAll = false;
break; 
}
}
frm.chkAllGlobalRegion.checked = checkAll;
} 
break; 
case 'chkRoadshow':
case 'chkAnalyMgmt':
case 'chkPreMakt':
if (frm.chkRoadshow.checked && frm.chkAnalyMgmt.checked && frm.chkPreMakt.checked) 
frm.chkAllScheduleType.checked = true;
break;	
case 'chkLeadManaged':
case 'chkCoManaged':	
if (frm.chkLeadManaged.checked && frm.chkCoManaged.checked) 
frm.chkAllRole.checked = true;
break;	
case 'chkCommon':
case 'chkConvertible':
if (frm.chkCommon.checked && frm.chkConvertible.checked)
frm.chkAllSecType.checked = true;
break; 
} 
}
}
