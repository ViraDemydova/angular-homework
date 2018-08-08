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
case "select" :
{
ProcessLocations();
var sSearch = frm.hidSearchName.value;
var iAccID = frm.hidAccountID.value;
var iRegID = frm.hidRegionID.value;
var iSaleID = frm.hidSalesID.value;
window.parent.opener.document.frmMain.hidLocList.value = frm.hidLocList.value
window.parent.opener.popUpLocationreturn();
}
case "close" :
{
window.close(); 
}
break; 
case "cancel" :
{
window.location.reload(true);
} 
break; 
}
}
function selectAll(sel, chk)
{
if (chk.checked)
{
for (var i=0; i<sel.length; i++)
sel.options[i].selected = true;
}
}
function unSelectAll(sel, chk)
{
for (var i=0; i<sel.length; i++)
sel.options[i].selected = false;
chk.checked = false;
}
function checkSelectAll(sel, chk)
{
if (chk.checked)
{
for (var i=0; i<sel.options.length; i++)
{
if (sel.options[i].selected == false)
{
chk.checked = false;
break;
}
}
}
}
function ProcessLocations()
{
var frm = document.frmMain;
var sDate = frm.hidFirstDate.value;
var sDate2= (typeof(frm.hidLastDate)!= "undefined")?frm.hidLastDate.value:sDate;
if (sDate != "" && sDate2 != "")
{
var rExp = /_/g;
sDate = sDate.replace (rExp, "/");
sDate2 = sDate2.replace (rExp, "/");
var dtFirstDate = new Date(sDate);
var dtLastDate = new Date(sDate2);
var iMonth;
var sResult;
for (var dt = dtFirstDate; dt <= dtLastDate; )
{
iMonth = dt.getMonth() + 1;
if (iMonth > 12)
iMonth = 1;
var sDt = dt.getFullYear() + "_" + iMonth.toString() + "_" + dt.getDate();
var oSel = eval("frm.sel_location_" + sDt);
if (typeof(oSel) != "undefined")
{
for (var i=0; i < oSel.length; i++)
{
if (oSel.options[i].selected == true)
{
sResult = sResult + "<row ";
sResult = sResult + " ProgDate='" + sDt + "'";
sResult = sResult + " Date='" + sDt.replace(rExp,"/") + "'";
sResult = sResult + " DaySetUpID='" + oSel.options[i].value + "'";
sResult = sResult + " LocName='" + escXmlValue(oSel.options[i].text) + "'";
sResult = sResult + " />"
}
}
}
dt.setTime(dt.getTime() + 24 * 60 * 60 * 1000);
}
frm.hidLocList.value = sResult;
}
}
