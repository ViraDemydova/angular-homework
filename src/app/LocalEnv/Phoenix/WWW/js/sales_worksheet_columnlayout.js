<!-- 
function onPageLoad()
{ 
Check( document.frmMain.btnSortBy1Order );
Check( document.frmMain.btnSortBy2Order );
Check( document.frmMain.btnSortBy3Order );
Check( document.frmMain.btnSortBy4Order );
if (document.frmMain.hidCloseflag.value == "true")
{
window.close();
window.opener.document.frmMain.submit();
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
for (var i=0; i < iMaxSize; i++) 
{
if ( arrSelVals[i].value != -1 )
{
for (var j=0; j < iMaxSize; j++) 
{
if (i != j)
{
if (arrSelVals[i].value == arrSelVals[j].value) 
{
bDuplicate = true;
break;
}
}
} 
}
} 
if ( bDuplicate ) 
{
var arrError = FieldErrorInfo('', document.frmMain.hidErrMessage.value, '', '', '');
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
var sValue = selElem.options.item(selElem.selectedIndex).value;
swap(selElem.options[selElem.selectedIndex - 1], selElem.options[selElem.selectedIndex]);
selElem.selectedIndex = selElem.selectedIndex - 1;
} 
function MoveDown(selElem)
{
if (selElem.selectedIndex >= selElem.length - 1 || selElem.selectedIndex <= -1)
return;
if (selElem.length <= 1)
return;
var sValue = selElem.options.item(selElem.selectedIndex).value;
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
function Check ( elem )
{
if (!elem[0].checked && !elem[1].checked)
{
elem[0].checked = true; 
} 
}
function submitPage(frm, sAction)
{
if (sAction != "revert")
{
SaveColumn(frm.selCurrentCols, frm.hidCurrentCols);
SaveSortOrder(frm.hidSortOrder, frm);
}
frm.hidAction.value = sAction;
if( ValidateForm( frm ) ) 
{
if (sAction != "revert")
frm.hidCloseflag.value = "true";
frm.submit();
}
}
function SaveColumn ( oSelect, oHidden)
{
var sCols = "";
var j = 0;
sCols = "ext_key_num, inst_inv_nm"; 
while (j < oSelect.options.length)
{
sCols = sCols + ", " + oSelect.options[j].value;
j++;
}
var sAllCols = document.frmMain.hidAllCols.value;
var sColArr = sAllCols.split(",");
var i = 0;
for (i = 0; i < sColArr.length; i++)
{
var sVal = sColArr[i];
var re = new RegExp(sVal,"i"); 
if (!re.test(sCols))
sCols = sCols + ", " + sVal;
}
oHidden.value = sCols;
}
function SortOrder ( oSelect, oOrder, i )
{
var sOrder = (oOrder[0].checked) ? oOrder[0].value : oOrder[1].value;
var sXML = "<ColumnOrder><ColumnName>" + oSelect.options[oSelect.selectedIndex].value + "</ColumnName><SortOrder>" + i + "</SortOrder><Direction>" + sOrder + "</Direction></ColumnOrder>";
return sXML;
}
function SaveSortOrder ( oHidden, frm )
{
var sXML = "<DisplayOrder>";
var sortOrder = 1;
if ( frm.selSortBy1.value != "-1" )
{
sXML += SortOrder( frm.selSortBy1, frm.btnSortBy1Order, sortOrder++ );
}
if ( frm.selSortBy2.value != "-1" )
{
sXML += SortOrder( frm.selSortBy2, frm.btnSortBy2Order, sortOrder++ ); 
}
if ( frm.selSortBy3.value != "-1" )
{
sXML += SortOrder( frm.selSortBy3, frm.btnSortBy3Order, sortOrder++ ); 
}
if ( frm.selSortBy4.value != "-1" )
{
sXML += SortOrder( frm.selSortBy4, frm.btnSortBy4Order, sortOrder++ ); 
}
sXML = sXML + "</DisplayOrder>";
oHidden.value = sXML; 
}
