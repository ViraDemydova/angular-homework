function onPageLoad()
{
var sGlobalRegionId;
sGlobalRegionId = document.frmMain.lstGlobalRegions.value;
if(document.frmMain.elements["lstReg" + sGlobalRegionId])
{
document.frmMain.elements["lstReg" + sGlobalRegionId].style.display = 'block';
reloadLocations(document.frmMain,document.frmMain.elements["lstReg" + sGlobalRegionId]);
}
}
function reloadRegions(frm)
{
var sGlobalRegionId;
sGlobalRegionId = frm.lstGlobalRegions.value;
if(frm.elements["lstReg" + frm.hidLastGlbRegionSelected.value])
{
frm.elements["lstReg" + frm.hidLastGlbRegionSelected.value].style.display = 'none';
frm.elements["lstReg" + sGlobalRegionId].style.display = 'block';
reloadLocations(document.frmMain,document.frmMain.elements["lstReg" + sGlobalRegionId]);
frm.hidLastGlbRegionSelected.value = sGlobalRegionId;
}
}
function reloadLocations(frm,elt)
{
var i;
var sContRegionId;
var j;
var op;
var selLocation;
var iSelected = 0;
if(frm.elements["lstLocations"])
{
for(i=0; i<frm.elements["lstLocations"].length; i++ )
{
frm.elements["lstLocations"].options.remove(i--);
}
for(i=0;i<=elt.options.length-1;i++)
{
if(elt.options[i].selected)
{
sContRegionId = elt.options[i].value;
selLocation = frm.elements["lst" + sContRegionId];
for(j=0;j<= selLocation.length-1;j++)
{
op = document.createElement("OPTION")
op.text = selLocation.options[j].text;
op.value =selLocation.options[j].value;
op.selected = selLocation.options[j].selected
frm.elements["lstLocations"].options.add(op);
}
iSelected = iSelected + 1;
}
}
if(elt.options.length != iSelected)
{
frm.elements["chkAllRegions"].checked = false;
frm.elements["chkAllLocations"].checked = false;
}
}
}
function onSelectStart(frm)
{
frm.hidLastGlbRegionSelected.value = frm.lstGlobalRegions.value;
}
function submitPage(frm, action, button)
{
switch (button)
{
case "update" :
frm.action = "/asp/util_submit_action.asp";
frm.method = "post";
frm.hidProgID.value = "RoadshowMaster_usr.Coordinators";
frm.hidAction.value = action;
frm.hidButtonPressed.value = button;
frm.hidActiveIndicator.value = frm.chkActiveIndicator.checked;	
frm.hidNextPage.value = "roadshow_edit_coordinator.asp";
frm.hidLastGlbRegionSelected.value = frm.elements["lstGlobalRegions"].value;
if (frm.hidCoordType.value == "1")
frm.hidSelectedRegions.value = collectSelectVals(frm.elements["lstGlobalRegions"].options)
else if (frm.hidCoordType.value == "2" && frm.hidLastGlbRegionSelected.value !="" )
{
frm.hidSelectedRegions.value = collectSelectVals(frm.elements["lstReg" + frm.hidLastGlbRegionSelected.value].options)
frm.hidSelectedLocations.value = collectSelectVals(frm.elements["lstLocations"].options) 
}
break;
case "cancel" :
frm.action = "roadshow_list_coordinators.asp?coord_type=" + frm.hidCoordType.value;
}
frm.submit();
return true;
}
function CheckAll(elt)
{
var i;
if(elt.checked && elt.name =="chkAllRegions")
{
var sGlobalRegionId;
sGlobalRegionId = document.frmMain.lstGlobalRegions.value;
for(i=0; i<document.frmMain.elements["lstReg" + sGlobalRegionId].length; i++ )
document.frmMain.elements["lstReg" + sGlobalRegionId].options[i].selected = 1;
reloadLocations(document.frmMain,document.frmMain.elements["lstReg" + sGlobalRegionId]);
}
if(elt.checked && elt.name =="chkAllLocations")
{
for(i=0; i<document.frmMain.elements["lstLocations"].length; i++ )
document.frmMain.elements["lstLocations"].options[i].selected = 1;
}
}
function UnCheckAll(elt)
{
var iSelected=0;
for(i=0;i<=elt.options.length-1;i++)
{
if(elt.options[i].selected)
{
iSelected = iSelected + 1;
}
}
if(elt.options.length != iSelected)
document.frmMain.elements["chkAllLocations"].checked = false;
}
