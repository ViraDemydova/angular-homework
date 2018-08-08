<!-- 
function onPageLoad()
{
}
function CheckConditionallyRequiredFields( frm, arrFieldsInError )
{
var arrMoreErrors = new Array();
return (arrMoreErrors);
} 
function CustomValidation( frm, arrFieldsInError )
{
var arrMoreErrors = new Array();
var count = 0;
if (frm.hidAction.value == "Find")
{
if (frm.sName.value.length < 1)
{
var arrError = FieldErrorInfo("", "", "", "sName", "Please enter at least 1 character to search");
arrError[2] = '';
arrMoreErrors[0] = arrError;
return (arrMoreErrors); 
}
}
else if (frm.hidAction.value == "AddParticipants")
{ 
var lLength = frm.hidBrokerCount.value;
var bSelected = false;
for (var i=1; i<=lLength; i++)
{
var sItem = "cbAddBroker_" + i.toString();
var sRole = "selRole" + i.toString();
var sBracket = "selBracket" + i.toString();
if (frm.elements[sItem].checked == true)
{
bSelected = true;
if (frm.elements[sRole].selectedIndex == 0)
{
var arrError = FieldErrorInfo(sRole, 'Please select a Role', "", sRole, "Role");
arrMoreErrors[count] = arrError;	
count++;
}
if (frm.hidUseBracketInd.value == "True")
{
if (typeof(frm.elements[sRole].options) == "undefined")
continue;
var sSelectedRoleCode = frm.elements[sRole].options[frm.elements[sRole].selectedIndex].id;
var sSelectedBracketCode = frm.elements[sBracket].options[frm.elements[sBracket].selectedIndex].id;
if ((sSelectedRoleCode == "SG" || sSelectedRoleCode == "SA" || sSelectedRoleCode == "SS" )
&& sSelectedBracketCode != "SG" )
{
var arrErrors = FieldErrorInfo("", "A Member with the role Selling Group, or Selling Agent must also be in the Selling Group Bracket.", "", sBracket, "Bracket");
arrMoreErrors[count] = arrErrors;
count++; 
}
if ((sSelectedRoleCode != "SG" && sSelectedRoleCode != "SA" && sSelectedRoleCode != "SS" )
&& sSelectedBracketCode == "SG" )
{
var arrErrors = FieldErrorInfo("", "A Member of the Selling Group Bracket must have Selling Group or Selling Agent as their role.", "", sRole, "Role");
arrMoreErrors[count] = arrErrors;
count++; 
}
}
}
}
if (!bSelected)
{
var arrError = FieldErrorInfo("", "", "", "cbAddBroker_1", "Please select at least one broker");
arrError[2] = '';
arrMoreErrors[0] = arrError;
return (arrMoreErrors); 
}
return (arrMoreErrors);
}
return (arrMoreErrors);
} 
function FillParticipantDisplayNames( frm )
{
for(var i=0; i< frm.tags("input").length; i++)
{
var oEle = frm.tags("input").item(i);
if(( oEle.type == "checkbox" )
&& ( oEle.checked == true ))
{
var ss = oEle.name.split("cbAddBroker_");
var sOrd = ss[1]; 
var bkrName;
var bkrRole;
var bkrDispInfo;
eval("bkrName = frm.brokerName_" + sOrd + ".value");
eval("bkrRole = GetRoleName( frm.selRole" + sOrd +")");
eval("bkrDispInfo = frm.hDisplayInfo_" + sOrd);
bkrDispInfo.value = bkrName + " - " + bkrRole;
}
}
}
function GetRoleName( oSelRole )
{
return oSelRole.children.item( oSelRole.selectedIndex ).innerText;
}
function submitPage( frm , action )
{
switch (action)
{
case "SaveChanges" :
frm.hidAction.value = "AddParticipants";
if(ValidateForm( frm ))
{ 
if( frm.hidFromEQDS.value == "1" )
{
FillParticipantDisplayNames( frm );
frm.hidAction.value = "BuildParticipantsXML";
}
else
{
frm.hidAction.value = "AddParticipants";
}
frm.method = "POST";
frm.action = "util_submit_action.asp";
frm.submit(); 
}
break;
case "RevertToSaved" :
window.location.reload();
break;
case "Cancel" :
frm.action = "/asp/_template.asp";
frm.submit();
break;
case "AddReg" :
frm.action = "/asp/_template.asp";
frm.hidAction.value = "Add";
frm.submit();
break;
case "Find" :
frm.hidAction.value = action;
frm.method = "POST";
frm.action = "syndpart_add_uw_popupEQ.asp?SellingGrp=" + frm.hidSellingGroupInd.value;
if(ValidateForm( frm ))
{
frm.submit();
}
break; 
}
}
function onEnterPressed( event, element, funcHandler ) 
{
var bEnterPressed;
if (document.all) 
{
bEnterPressed = (window.event && window.event.keyCode == 13);
}
else
{
bEnterPressed = (event && event.which == 13);
}
if ( bEnterPressed )
{
funcHandler();
}
}
function SubmitFind()
{
submitPage(document.frmMain, "Find");
}
function assignMemDirtyFlag2(frm, lBracketId, lPosition)
{
var sSelBracket = "selBracket" + lPosition.toString();
var sSelRole = "selRole" + lPosition.toString();
if (typeof(frm.elements[sSelBracket].options) != "undefined" && typeof(frm.elements[sSelRole].options) != "undefined")
{
var sVal = frm.elements[sSelBracket].options[frm.elements[sSelBracket].selectedIndex].text;
if (sVal == "Bracket 8 - Selling Group")
{
for (var i=0; i < frm.elements[sSelRole].options.length; i++)
{
if (frm.elements[sSelRole].options[i].text == "Selling Group")
{
frm.elements[sSelRole].selectedIndex = i;
frm.elements[sSelRole].disabled = 1;
frm.elements["hidSellGrpID"].value = frm.elements[sSelRole].options[i].value;
}
}
}
else
{
frm.elements[sSelRole].disabled = 0;
}
}
}
