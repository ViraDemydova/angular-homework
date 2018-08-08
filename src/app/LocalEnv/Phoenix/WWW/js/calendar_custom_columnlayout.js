<!-- 
function onPageLoad()
{ 
ChangeSelect1();
ChangeSelect2();
ChangeSelect3();
document.frmMain.onclick = OnFormClick;
}
function OnFormClick()
{
if (event.shiftKey )
{
event.returnValue = false;
event.cancelBubble = true;
}
}
function CustomValidation( frm, arrFieldsInError )
{
var arrMoreErrors = new Array();
var iMaxSize = 4;
var arrSelVals = new Array( iMaxSize );
var bDuplicate = false;
arrSelVals[0] = frm.selSortBy1;
arrSelVals[1] = frm.selSortBy2;
arrSelVals[2] = frm.selSortBy3;
arrSelVals[3] = frm.selSortBy4;
for (var i=0; i < iMaxSize; i++) {
if ( arrSelVals[i].value != -1 && !arrSelVals[i].disabled )
{
for (var j=0; j < iMaxSize; j++) {
if (i != j && !arrSelVals[j].disabled ) {
if (arrSelVals[i].value == arrSelVals[j].value) {
bDuplicate = true;
break;
}
}
} 
}
} 
if ( bDuplicate ) {
var arrError = FieldErrorInfo('', 'Sort fields cannot be the same. Please make sure sort fields are different values.', '', '', '');
arrMoreErrors[arrMoreErrors.length] = arrError; 
}
return (arrMoreErrors);
} 
function MoveUp(selElem)
{
if (selElem.selectedIndex <= 0)
return;
if (selElem.length <= 1)
return;
swap(selElem.options[selElem.selectedIndex - 1], selElem.options[selElem.selectedIndex]);
selElem.selectedIndex = selElem.selectedIndex - 1;
} 
function MoveDown(selElem)
{
if (selElem.selectedIndex >= selElem.length - 1 || selElem.selectedIndex <= -1)
return;
if (selElem.length <= 1)
return;
swap(selElem.options[selElem.selectedIndex + 1], selElem.options[selElem.selectedIndex]);
selElem.selectedIndex = selElem.selectedIndex + 1;
}
function swap(opt1, opt2)
{ 
var tempText = opt1.text;
var tempValue = opt1.value;
opt1.text = opt2.text;
opt1.value = opt2.value;
opt2.text = tempText;
opt2.value = tempValue;
}
function MoveFromSelect(oSelSource, oSelDest)
{
var i	
if (oSelSource.options.length > 0)
{ 
i = oSelSource.selectedIndex;
while (i >= 0)
{
AddOption(oSelSource.options[i].text, oSelSource.options[i].value, oSelDest)
oSelSource.options[i] = null;
i = oSelSource.selectedIndex;
}
} 
}
function AddOption(sText, sValue, oSelect)
{
var oOption = new Option(sText, sValue);
oSelect.options[oSelect.length] = oOption;
}
function RemoveOption( sVal, oSelect )
{
var i = 0;
while ( i < oSelect.options.length)
{
if (oSelect.options[i].value == sVal)
{
oSelect.options[i] = null;
break;
}
i++; 
}
oSelect.options
}
function Disable ( elem )
{
elem.disabled = true;
}
function Enable ( elem )
{
elem.disabled = false;
}
function Check ( elem )
{
if (!elem[0].checked && !elem[1].checked)
{
elem[0].checked = true; 
} 
}
function SaveAndRedirect( frm, sActionto, bSaveFlag )
{
SaveColumn( frm.selAvailableCols, frm.hidAvailableCols, 0 );
SaveColumn( frm.selCurrentCols, frm.hidCurrentCols, 1 );
SaveSortOrder ( frm.hidSortOrder, frm );
frm.hidactionto.value = sActionto;
frm.hidsaveflag.value = bSaveFlag;
if( ValidateForm( frm ) ) {
frm.submit();
}
}
function SaveColumn ( oSelect, oHidden, bFlag )
{
var sCols = "";
var j = 0;
if (bFlag)
{
sCols = "issue_name"; 
}
while (j < oSelect.options.length)
{
if (j == 0 && !bFlag) 
{
sCols = sCols + oSelect.options[j].value;
}
else 
{
sCols = sCols + ", " + oSelect.options[j].value;
}
j++;
}
oHidden.value = sCols;
}
function SortOrder ( oSelect, oOrder, i )
{
var sXML
var sOrder
if (oOrder[0].checked)
{
sOrder = oOrder[0].value
}
else
{
sOrder = oOrder[1].value 
} 
var sXML = "<ColumnOrder><ColumnName>" + oSelect.options[oSelect.selectedIndex].value + "</ColumnName><SortOrder>" + i + "</SortOrder><Direction>" + sOrder + "</Direction></ColumnOrder>";
return sXML;
}
function SaveSortOrder ( oHidden, frm )
{
var sXML = "<DisplayOrder>";
if ( frm.selSortBy1.value != "-1" && !frm.selSortBy1.disabled )
{
sXML = sXML + SortOrder( frm.selSortBy1, frm.btnSortBy1Order, 1 );
}
if ( frm.selSortBy2.value != "-1" && !frm.selSortBy2.disabled )
{
sXML = sXML + SortOrder( frm.selSortBy2, frm.btnSortBy2Order, 2 ); 
}
if ( frm.selSortBy3.value != "-1" && !frm.selSortBy3.disabled )
{
sXML = sXML + SortOrder( frm.selSortBy3, frm.btnSortBy3Order, 3 ); 
}
if ( frm.selSortBy4.value != "-1" && !frm.selSortBy4.disabled )
{
sXML = sXML + SortOrder( frm.selSortBy4, frm.btnSortBy4Order, 4 ); 
}
sXML = sXML + "</DisplayOrder>";
oHidden.value = sXML; 
}
function ChangeSelect1 ( )
{
if (document.frmMain.selSortBy1.value == "-1")
{
Disable( document.frmMain.selSortBy2 );
Disable( document.frmMain.selSortBy3 );
Disable( document.frmMain.selSortBy4 );
Disable( document.frmMain.btnSortBy2Order[0] );
Disable( document.frmMain.btnSortBy2Order[1] );
Disable( document.frmMain.btnSortBy3Order[0] );
Disable( document.frmMain.btnSortBy3Order[1] );
Disable( document.frmMain.btnSortBy4Order[0] );
Disable( document.frmMain.btnSortBy4Order[1] ); 
}
else
{
Enable( document.frmMain.selSortBy2 );
Enable( document.frmMain.btnSortBy2Order[0] );
Enable( document.frmMain.btnSortBy2Order[1] );
Check( document.frmMain.btnSortBy1Order ); 
}
}
function ChangeSelect2 ( )
{
if (document.frmMain.selSortBy2.value == "-1")
{
Disable( document.frmMain.selSortBy3 );
Disable( document.frmMain.selSortBy4 );
Disable( document.frmMain.btnSortBy3Order[0] );
Disable( document.frmMain.btnSortBy3Order[1] );
Disable( document.frmMain.btnSortBy4Order[0] );
Disable( document.frmMain.btnSortBy4Order[1] ); 
}
else
{
Enable( document.frmMain.selSortBy3 );
Enable( document.frmMain.btnSortBy3Order[0] );
Enable( document.frmMain.btnSortBy3Order[1] );
Check( document.frmMain.btnSortBy2Order ); 
}
}
function ChangeSelect3 ( )
{
if (document.frmMain.selSortBy3.value == "-1")
{
Disable( document.frmMain.selSortBy4 );
Disable( document.frmMain.btnSortBy4Order[0] );
Disable( document.frmMain.btnSortBy4Order[1] ); 
}
else
{
Enable( document.frmMain.selSortBy4 );
Enable( document.frmMain.btnSortBy4Order[0] );
Enable( document.frmMain.btnSortBy4Order[1] ); 
Check( document.frmMain.btnSortBy3Order ); 
} 
}
function ChangeSelect4 ( )
{
Check( document.frmMain.btnSortBy4Order ); 
}
