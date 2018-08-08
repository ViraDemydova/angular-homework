<!-- 
function onPageLoad()
{
initializeRegions(document.frmMain);
}
function loadDesignations(frm)
{
frm.hidTrancheId.value = frm.selTranche.value;
frm.method = "POST";
frm.action = "designations_view_capmkts.asp";
frm.submit();
}
function loadVerification(frm)
{
frm.hidTrancheId.value = frm.selTranche.value;
frm.method = "POST";
frm.action = "designations_verification.asp";
frm.submit();
}
function loadView(frm)
{
if(frm.hidPageType.value == "CapMktsA")
{
frm.hidPageType.value = "CapMktsR";
}
else
{
frm.hidPageType.value = "CapMktsA"; 
}
frm.method = "POST";
frm.action = "designations_view_capmkts.asp";
frm.submit(); 
}
function submitColumnSort( strColumn )
{
var oCurrentSortColumn = document.frmMain.hidCurrentSortColumn
var oCurrentSortOrder = document.frmMain.hidCurrentSortOrder
if( strColumn != oCurrentSortColumn.value )
{
oCurrentSortColumn.value = strColumn
oCurrentSortOrder.value = "ascending"
}
else if( oCurrentSortOrder.value == "ascending" )	
oCurrentSortOrder.value = "descending"	
else
oCurrentSortOrder.value = "ascending"
if(document.frmMain.hidPageType.value == "R") 
{
document.frmMain.hidShowHideRegions.value = gatherRegionValues(document.frmMain, "region");
} 
document.frmMain.action = "designations_view_capmkts.asp";
document.frmMain.submit();
}
function showHideArea(areaName){
var elthis = eval(areaName)
if (elthis.style.display == 'none'){
elthis.style.display = '';
}
else{
elthis.style.display = 'none';
}
}
function editDesignations(frm, sOrdId)
{
frm.hidTrancheId.value = frm.selTranche.value;
frm.hidOrdId.value = sOrdId;
frm.method = "POST";
frm.action = "designations_edit.asp";
frm.submit();
}
function openPendingAccount(inv_id, ord_id, owned_ind)
{
var sUrl = "/aspx/UI/TradeSplit/PendingAccount.aspx?InvId="+inv_id+"&OrdId="+ord_id+"&OwnedInd="+owned_ind;
var sStyle = "width=500,height=300,toolbar=no,menubar=no,location=no,directories=no,resizable=yes,scrollbars=yes,left=50,top=50" ;
var popupGeneral = window.open( sUrl, 'idealPendingAccount', sStyle);
popupGeneral.focus();
}
function gatherRegionValues(frm, sParse)
{
var sList;
sList="";
var lLength = frm.hidRegionCount.value;
for (var i=1; i<=lLength; i++)
{
var sItem = sParse + i.toString();
var elthis = eval(sItem); 
if (elthis.style.display == 'none'){
sList += sItem + ", Hide, ";
}
else{
sList += sItem + ", Show, ";	
} 
}
if(frm.hidNoRegionInd.value == "True")
{
var sItem = sParse + "0";
var elthis = eval(sItem); 
if (elthis.style.display == 'none'){
sList += sItem + ", Hide, ";
}
else{
sList += sItem + ", Show, ";	
} 
}
return sList;
}
function initializeRegions(frm)
{
var strRegionDisplay = frm.hidRegionDisplay.value;
var i=0;
while( i<strRegionDisplay.length)
{
var iPos = strRegionDisplay.indexOf(",", i);
var sRegion = strRegionDisplay.substring(i, iPos);
i= iPos +2;
var elRegion = eval(sRegion); 
var iPos = strRegionDisplay.indexOf(",", i);
var sDisplay = strRegionDisplay.substring(i, iPos);
i= iPos +2;
if(sDisplay == "Show")
{
elRegion.style.display = ''; 
}
else
{
elRegion.style.display = 'none'; 
}
if(i == strRegionDisplay.length - 1)
break;
}
}
function submitFromOpsPage( frm, action )
{
frm.hidTrancheId.value = frm.selTranche.value;
frm.hidProgID.value = "SyndicateParticipation_usr.Designations"; 
frm.action = "/asp/util_submit_action.asp";
frm.hidAction.value = "TrancheAutoDesignate";
frm.submit();
}
function submitPage( frm, action )
{
switch (action)
{
case "verify" :
if(ValidateForm( frm ))
{ 
frm.hidTrancheId.value = frm.selTranche.value;
frm.hidProgID.value = "IssueMaintenance_usr.TrancheControl";
frm.action = "/asp/util_submit_action.asp";
frm.hidAction.value = "Verify";
frm.submit();
}
break;
case "autodesignate" :
if(ValidateForm( frm ))
{ 
frm.hidTrancheId.value = frm.selTranche.value;
frm.hidProgID.value = "SyndicateParticipation_usr.Designations"; 
frm.action = "/asp/util_submit_action.asp";
frm.hidAction.value = "MultiAutoDesignate";
frm.submit();
}
break; 
case "trancheautodesignate" :
if(ValidateForm( frm ))
{ 
frm.hidTrancheId.value = frm.selTranche.value;
frm.hidProgID.value = "SyndicateParticipation_usr.Designations"; 
frm.action = "/asp/util_submit_action.asp";
frm.hidAction.value = "TrancheAutoDesignate";
frm.submit();
}
break; 
}
}
