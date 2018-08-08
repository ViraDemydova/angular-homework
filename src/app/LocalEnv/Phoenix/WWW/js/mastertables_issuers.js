<!-- 
function CheckConditionallyRequiredFields( frm, arrFieldsInError )
{
var arrMoreErrors = new Array();
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
case "saveissuer" :
frm.method = "POST";
if (frm.hidIssuerID.value == "")
frm.hidAction.value = "AddIssuer";
else
frm.hidAction.value = "UpdateIssuer";
frm.action = "/asp/util_submit_action.asp";
if(ValidateForm( frm )) { 
if(frm.hidSDCPopulatorEnabled.value == "0") setIndustry(frm);
frm.submit();
} 
break; 
case "savechanges" :
frm.method = "POST";
if (frm.hidIssuerID.value == "")
frm.hidAction.value = "Add";
else
frm.hidAction.value = "Update";
frm.action = "/asp/util_submit_action.asp";
if(ValidateForm( frm )) { 
setIndustry(frm);
frm.submit();
} 
break; 
case "reverttosaved" :
frm.reset();
break;
case "cancel" :
frm.action = "mastertables_issuers.asp";
frm.submit();
break;
case "addreg" :
frm.action = "mastertables.asp";
frm.submit();
break;
case	"find" :
frm.method = "POST";
frm.hidAction.value = action;
frm.action = "/asp/mastertables_issuers.asp";
if(ValidateForm( frm )) 
frm.submit();	
break;
case	"create" :
frm.method = "POST"; 
frm.hidAction.value = action;
frm.action = "/asp/mastertables_issuers.asp";
frm.submit();	
break; 
case	"edit" :
frm.method = "POST";
frm.hidAction.value = "edit";
frm.action = "/asp/mastertables_issuers.asp";
frm.submit();	
break; 
case	"delete" :
if(!ValidateForm( frm ))
return;	
frm.method = "POST";
frm.hidAction.value = "Delete";
frm.action = "/asp/util_submit_action.asp";
if(ValidateForm( frm )) 
frm.submit();
break; 
}
}
function setIssuerID(ID, iMstrId, bPublic, frm , action) 
{
frm.hidIssuerID.value = ID;
frm.hidMasterId.value = iMstrId;
frm.hidPublic.value = bPublic;
submitPage( frm , action );
}
function onEnter()
{
if(document.frmSearch.rsIssuersName.value == ""){
submitPage(document.frmSearch, "create");
}
else{
submitPage(document.frmSearch, "find");
}	
} 
function setIndustry(frm)
{
var sIndustry = new Array();
var s = frm.selIndustry.options[frm.selIndustry.selectedIndex].value;
if (s.indexOf(",") != -1) {
sIndustry = s.split(',');
if (sIndustry[1] == 0) 
frm.hidSector.value = "False";
else
frm.hidSector.value = "True"; 
}
frm.hidIndustryId.value = sIndustry[0];
}
function onWholesaleClick()
{
if(document.frmMain.chkWhosaleBrokerInd.checked == true)
document.frmMain.chkSurvivorBenefit.disabled = false;
else
document.frmMain.chkSurvivorBenefit.disabled = true;
}
function OnSelIndOwnershipChange()
{
}
function showAddressArea()
{
var aRow, sDisplay, oImg ;
aRow = document.getElementsByName("AddressRow");
for(var i = 0 ; i < aRow.length; i++)
{
sDisplay = "none";
if(aRow.item(i).style.display == "inline")
{
sDisplay = "none";
}
else
{
sDisplay = "inline";
}
aRow.item(i).style.display = sDisplay ;
}
oImg = document.getElementById("AddressImg") ;
if(oImg)
{
if(sDisplay == "none")
oImg.src="../images/arrow_down_black.gif" ;
else
oImg.src="../images/arrow_up_black.gif" ;
}
}
