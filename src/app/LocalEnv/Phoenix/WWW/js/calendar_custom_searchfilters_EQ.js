<!-- 
function onPageLoad()
{
if (!document.frmMain.cbPostponed.checked)
{
TogglePostponed();
}
if (!document.frmMain.cbWithdrawn.checked)
{
ToggleWithdrawn();
}
if (!document.frmMain.cbShowDerivatives.checked)
{
ToggleOptionsDisplay('tblDerivatives');
}
if (!document.frmMain.cbShowBlockTrades.checked)
{
ToggleOptionsDisplay('tblBlockTrade');
}
}
function CustomValidation( frm, arrFieldsInError )
{
var arrMoreErrors = new Array();
return (arrMoreErrors);
} 
function submitPage( frm , action )
{
}
function ToggleOptions(elem) 
{
var sVisibility = document.all(elem).style.visibility;
if (sVisibility == "hidden") {
document.all(elem).style.visibility = "visible";
} else {
document.all(elem).style.visibility = "hidden";
} 
}
function ToggleOptionsDisplay(elem) 
{
var sVisibility = document.all(elem).style.display;
if (sVisibility == "") {
document.all(elem).style.display = "none";
} else {
document.all(elem).style.display = "";
} 
}
function TogglePostponed()
{
ToggleOptions('tdPostponedFrom');
ToggleOptions('tddtPostponedFrom');
ToggleOptions('tdcalendarPostponedFrom');
ToggleOptions('tdPostponedTo');
ToggleOptions('tddtPostponedTo');
ToggleOptions('tdCalendarPostponedTo');
document.all("dtPostponedFrom").value = "";
document.all("dtPostponedTo").value = "";
}
function ToggleWithdrawn()
{
ToggleOptions('tdWithdrawnFrom');
ToggleOptions('tddtWithdrawnFrom');
ToggleOptions('tdcalendarWithdrawnFrom');
ToggleOptions('tdWithdrawnTo');
ToggleOptions('tddtWithdrawnTo');
ToggleOptions('tdCalendarWithdrawnTo');
document.all("dtWithdrawnFrom").value = "";
document.all("dtWithdrawnTo").value = "";
}
function SaveAndRedirect( frm, sActionto, bSaveFlag )
{
if (ValidateSearchCriteria())
{
frm.hidactionto.value = sActionto;
frm.hidsaveflag.value = bSaveFlag;
frm.submit();
}
}
function ValidateSearchCriteria()
{	
var frm = document.frmMain;
if (!frm.cbConfidential.checked && !frm.cbAnnounced.checked && !frm.cbPriced.checked && !frm.cbSettled.checked && !frm.cbFinalSettled.checked)
{
alert("Deal State: At least one item should be checked");
return false;
}
if (!frm.cbIPO.checked && !frm.cbAddOn.checked)
{
alert("Deal Indicator: At least one item should be checked");
return false;
}
if (!frm.cbBookRunner.checked && !frm.cbManaged.checked && !frm.cbUW.checked && !frm.cbSelling.checked && !frm.cbStreet.checked && !frm.cbUNS.checked && !frm.cbSettleWithIssuer.checked)
{
alert("Deal Role: At least one item should be checked");
return false;
}
if (!frm.cbUSD.checked && !frm.cbCAD.checked && !frm.cbEUR.checked && !frm.cbJPY.checked && !frm.cbOther.checked )
{
alert("Currencies: At least one item should be checked");
return false;
}
if (!frm.cbCommon.checked && !frm.cbConvert.checked && !frm.cbEquityUnits.checked && !frm.cbClosedEndFunds.checked )
{
alert("Deal Type: At least one item should be checked");
return false;
}
if (!frm.cbActive.checked && !frm.cbInactive.checked )
{
alert("Deal Status: At least one item should be checked");
return false;
}
return true;
}
function RegCheckboxOnclick(oCheckBox, sListBoxId)
{
var oSelReg = document.frmMain.elements[sListBoxId];
var bSelected = oCheckBox.checked ? true : false;
for (var i = 0; i < oSelReg.options.length; i++)
{
oSelReg.options[i].selected = bSelected;
}
}
function RegSelboxChange(sCheckBoxId)
{
document.frmMain.elements[sCheckBoxId].checked = false;
}
