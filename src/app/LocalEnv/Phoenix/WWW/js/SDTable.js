<!--
var SDT_Array=new Array();
function getSDT(sdt_id)
{
for(var i=0;i<SDT_Array.length;i++)
{
if(SDT_Array[i].id == sdt_id)
return SDT_Array[i];
}
return null;
}
function SDTable(a_name)
{
this.name=a_name;
this.id=a_name+"_id";	
this.content=null;
this.checkAll=null;
this.Caption="";
this.ColumnsArray=new Array();
this.RowsArray=new Array();
this.rowIndexColumn=null;
SDT_Array[SDT_Array.length] = this;
}
SDTable.prototype.initContent =function()
{
this.tableDiv_id='tableDiv_'+this.name+'_id';
this.tableHeader_id='tableHeader_'+this.name+'_id';
this.tableHeader_spacer_id='tableHeader_spacer_'+this.name+'_id';
this.tableRows_div_id='tableRows_div_'+this.name+'_id';
this.tableRows_id='tableRows_'+this.name+'_id';
this.table_div_id='table_div_'+this.name+'_id';
this.content='';
this.content+='<table border="0" cellpadding="0" cellspacing="0"><tr><td align="center" class="captionStyle">'+this.Caption+'</td></tr>';
this.content+='<tr><td><div id="'+this.tableDiv_id+'"><table border="0" cellspacing="0" cellpadding="0" width="100%"><tr><td class="tableBorderClass">';
this.content+='<table id="'+this.tableHeader_id+'" border="0" cellspacing="2" cellpadding="5" width="100%"><tr align="center">';
this.content+='</tr></table></td><div id="'+this.tableHeader_spacer_id+'"><td bgcolor="#FFFFFF" width="18">&nbsp;</td></div></tr></table>';
this.content+='<div id="'+this.tableRows_div_id+'" style="width: 100%; overflow-y: scroll;">';
this.content+='<table border="0" cellspacing="0" cellpadding="0" width="100%"><tr><td class="tableBorderClass">';
this.content+='<div id="'+this.table_div_id+'">';
this.tableContent='<table id="'+this.tableRows_id+'" border="0" cellspacing="2" cellpadding="3" width="100%">';	
this.content+=this.tableContent;
this.content+='</table>';
this.content+='</div>';
this.content+='</td></tr></table></div></div></td></tr></table>';
}
SDTable.prototype.render =function()
{
this.initContent();
document.write(this.content);
this.setElements();
}
SDTable.prototype.setElements =function()
{
this.tableHeader = GE(this.tableHeader_id);
this.tableRows = GE(this.tableRows_id);
this.tableRows_div = GE(this.tableRows_div_id);
this.table_div = GE(this.table_div_id);
}
SDTable.prototype.setWidth =function(a_width)
{	
this.tableHeader.style.width = a_width;
this.tableRows.style.width = a_width;
this.userWidth = a_width;
}
SDTable.prototype.resetWidth =function()
{
if(this.userWidth)
this.setWidth(this.userWidth);
}
SDTable.prototype.setHeight =function(a_height)
{
this.tableRows_div.style.height = a_height;
}
SDTable.prototype.setAltRowStyleClasses =function(a_altA, a_altB)
{
this.altRowStyleClassA = a_altA;
this.altRowStyleClassB = a_altB;
}
SDTable.prototype.addColumn =function(a_title, a_className, a_width, a_type, a_id)
{
if(!a_type)
a_type="text";
var locArr = new Array();
locArr[0] = a_title;
locArr[1] = a_type;
locArr[2] = a_id;
this.ColumnsArray[this.ColumnsArray.length] = locArr;
var newColCell = this.tableHeader.rows(0).insertCell();
newColCell.align = "left";
if(a_width)
newColCell.width = a_width;
newColCell.className = a_className;	
if(a_type=="text")
{
if(a_title)
{	
var spanID = "span_"+this.name+"_"+a_title;
var val = '<span id="'+spanID+'" style="cursor:hand"><a onclick="sortColumn(\''+this.id+'\', \''+spanID+'\', '+newColCell.cellIndex+');"><u><td>'+a_title+'</td></u></a></span>'; 
newColCell.innerHTML = val; 
}
}
else if(a_type=="checkbox")
{ 
if(!a_title)
{
var val = '<input id="'+this.id+'_'+a_id+'" type="checkbox" value="1" onclick="checkAllCallback(\''+this.id+'\', \''+a_id+'\')"/>';
newColCell.innerHTML = val;
newColCell.style.paddingLeft = "2";
this.checkAll = GE(this.id+"_"+a_id);
var expression = "!" + this.name + ".length()";
this.checkAll.setExpression("disabled", expression);
}
}
}
SDTable.prototype.setRowIndexColumn =function(a_index)
{	
this.rowIndexColumn = a_index;
}
SDTable.prototype.length =function()
{
return this.tableRows.rows.length;
}
SDTable.prototype.addRowsArray =function(a_rowsArray, a_preserve)
{
if(a_preserve && this.rowIndexColumn != null)
{
for(var j=0;j<a_rowsArray.length;j++)
{
for(var i=0;i<this.RowsArray.length;i++)
{
if(this.RowsArray[i][1][this.rowIndexColumn] == a_rowsArray[j][this.rowIndexColumn])
this.removeRow(this.RowsArray[i][1][this.rowIndexColumn]);
}
}
}
var appendHTML = (a_preserve)?this.tableRows.innerHTML:"";
if(a_rowsArray.length <= 0 || a_rowsArray[0].length != this.ColumnsArray.length)
return;
var useClassName = (this.altRowStyleClassA && this.altRowStyleClassB);	
var rowContent='';
for(var i=0;i<a_rowsArray.length;i++)
{
var rowArray=new Array();
var newRowContent='';
var rowID = Math.random() + "_id";
rowArray[0] = rowID;
newRowContent+='<tr id="' + rowID + '" ';
if(useClassName)
{
newRowContent+='class="';
newRowContent+= (i%2) == 0 ? this.altRowStyleClassB : this.altRowStyleClassA;
newRowContent+='" ';
}
newRowContent+='>';
var a_array = new Array();
for(var j=0;j<a_rowsArray[i].length;j++)
{
var cellContent='<td width="' + this.tableHeader.rows(0).cells(j).width + '">';
var cellValue = a_rowsArray[i][j];
a_array[j] = cellValue;
if(this.ColumnsArray[j][1] != "text")
{
cellContent+= '<input type="'+this.ColumnsArray[j][1]+'" value="'+cellValue+'" id="'+this.ColumnsArray[j][2]+'" name="'+this.ColumnsArray[j][2]+'"/>';
}
else
{
cellContent+=cellValue;
} 
cellContent+='</td>'; 
newRowContent+=cellContent;
}
rowArray[1] = a_array;
this.RowsArray[this.RowsArray.length] = rowArray;
newRowContent+='</tr>';
rowContent+=newRowContent;
}
this.table_div.innerHTML = this.tableContent + rowContent + appendHTML + "</table>";
this.setElements();
this.resetWidth();
}
SDTable.prototype.addRowsDOM =function(nodeList, xPathArr, a_preserve)
{
if(xPathArr.length != this.ColumnsArray.length)
return;
if(a_preserve && this.rowIndexColumn != null)
{
for(var j=0;j<nodeList.length;j++)
{
for(var i=0;i<this.RowsArray.length;i++)
{
if( this.RowsArray[i][1][this.rowIndexColumn] == getAttributeString(nodeList[j],xPathArr[i]) )
this.removeRow(this.RowsArray[i][1][this.rowIndexColumn]);
}
}
}
var appendHTML = (a_preserve)?this.tableRows.innerHTML:"";
var useClassName = (this.altRowStyleClassA && this.altRowStyleClassB);	
var rowContent='';
for(var i=0;i<nodeList.length;i++)
{
var rowArray=new Array();
var newRowContent='';
var rowID = Math.random() + "_id";
rowArray[0] = rowID;
newRowContent+='<tr id="' + rowID + '" ';
if(useClassName)
{
newRowContent+='class="';
newRowContent+= (i%2) == 0 ? this.altRowStyleClassB : this.altRowStyleClassA;
newRowContent+='" ';
}
newRowContent+='>';
var a_array = new Array();
for(var j=0;j<xPathArr.length;j++)
{
var cellContent='<td width="' + this.tableHeader.rows(0).cells(j).width + '">';
var cellValue = getAttributeString(nodeList[i],xPathArr[j]);
a_array[j] = cellValue;
if(this.ColumnsArray[j][1] != "text")
{
cellContent+= '<input type="'+this.ColumnsArray[j][1]+'" value="'+cellValue+'" id="'+this.ColumnsArray[j][2]+'" name="'+this.ColumnsArray[j][2]+'"/>';
}
else
{
cellContent+=cellValue;
} 
cellContent+='</td>'; 
newRowContent+=cellContent;
}
rowArray[1] = a_array;
this.RowsArray[this.RowsArray.length] = rowArray;
newRowContent+='</tr>';
rowContent+=newRowContent;
}
this.table_div.innerHTML = this.tableContent + rowContent + appendHTML + "</table>";
this.setElements();
this.resetWidth();
}
SDTable.prototype.addRow =function(a_array, a_className)
{ 
if(a_array.length != this.ColumnsArray.length)
return;
if(this.rowIndexColumn != null)
{
for(var i=0;i<this.RowsArray.length;i++)
{
if(this.RowsArray[i][1][this.rowIndexColumn] == a_array[this.rowIndexColumn])
return;
} 
}
var newRow = this.tableRows.insertRow();
newRow.id = Math.random() + "_id";
if(!a_className && this.altRowStyleClassA && this.altRowStyleClassB)
a_className = (this.tableRows.rows.length % 2) == 0 ? this.altRowStyleClassB : this.altRowStyleClassA;
newRow.className = a_className;
var rowArray=new Array();
rowArray[0] = newRow.id;
rowArray[1] = a_array;
this.RowsArray[this.RowsArray.length] = rowArray;
for(var i=0;i<a_array.length;i++)
{
var newCell = newRow.insertCell();
if(this.ColumnsArray[i][1] != "text")
{
newCell.innerHTML = '<input type="'+this.ColumnsArray[i][1]+'" value="'+a_array[i]+'" id="'+this.ColumnsArray[i][2]+'" name="'+this.ColumnsArray[i][2]+'"/>';
}
else
{
newCell.innerText = a_array[i];
} 
newCell.width = this.tableHeader.rows(0).cells(i).width;
}
return this.RowsArray.length-1;
}
SDTable.prototype.removeRow =function(a_id)
{ 
if(this.rowIndexColumn != null)
{
for(var i=0;i<this.RowsArray.length;i++)
{	
if(this.RowsArray[i][1][this.rowIndexColumn] == a_id)
{
var e = GE(this.RowsArray[i][0]);
this.tableRows.deleteRow(e.rowIndex); 
this.RowsArray.splice(i,1);
}
}
}
this.resetCheckAll();
}
SDTable.prototype.clearRows =function()
{
for(var i=0;i!=this.tableRows.rows.length;)
{
this.RowsArray=new Array();
this.tableRows.deleteRow(i);
}
this.resetCheckAll();
}
SDTable.prototype.getRowArray = function(a_id)
{
for(var i=0;i<this.RowsArray.length;i++)
{
if(this.RowsArray[i][0] == a_id)
return this.RowsArray[i][1];
}
return null;
}
SDTable.prototype.filterRows =function(filterValue, index)
{
for(var i=0;i<this.RowsArray.length;i++)
{
GE( this.RowsArray[i][0] ).style.display = 
( this.RowsArray[i][1][index].indexOf(filterValue) == -1 )
? "none" : "inline"; 
}
}
SDTable.prototype.resetCheckAll =function()
{
if(this.checkAll)
{
this.checkAll.checked = false;
this.checkAll.value = 1;
}
}
function checkAllCallback(a_sdt_id, a_id)
{
var elements = document.all(a_id);
var toCheck = (event.srcElement.value==1)?true:false;	
event.srcElement.value = (event.srcElement.value==1)?0:1;
if(elements.length)
{
for(var i=0;i<elements.length;i++)
{
if(elements[i].parentNode.parentNode.style.display != "none" && !elements[i].parentNode.parentNode.disabled )
elements[i].checked = toCheck;
}
}
else
{
if(elements.parentNode.parentNode.style.display != "none" && !elements.parentNode.parentNode.disabled )
elements.checked = toCheck;
}
}
function sortColumn(a_sdt_id, a_span_id, a_column_index)
{
GE(a_span_id).style.cursor = "wait";
document.body.style.cursor = "wait";	
var a_sdt = getSDT(a_sdt_id);
var table = a_sdt.tableRows;
var a=new Array();
for(var i=0;i<table.rows.length;i++)
{
var aa = new Array();
aa[0] = table.rows[i].id;
aa[1] = table.rows(i).cells(a_column_index).innerText;
a[a.length] = aa;
}
if(table.sort != null && table.sort == a_column_index)
{
a.sort(comparedesc);
table.sort = null;
}
else
{
a.sort(compareasc);
table.sort = a_column_index;
}
var checkedArray=new Array();
for(var j=0;j<a_sdt.ColumnsArray.length;j++)
{
if(a_sdt.ColumnsArray[j][1]!="text")
{
var e = document.all(a_sdt.ColumnsArray[j][2]);
if(e && e.length)
{
for(var k=0;k<e.length;k++)
{
if(e[k].checked)
{
var tempArr=new Array();
tempArr[0] = j;
tempArr[1] = e[k].parentNode.parentNode.id;
checkedArray[checkedArray.length] = tempArr;
}
}
}
else if(e && e.checked)
{
var tempArr=new Array();
tempArr[0] = j;
tempArr[1] = e.parentNode.parentNode.id;
checkedArray[checkedArray.length] = tempArr;
}
}
}
for(var m=0;m<a.length;m++)
{
table.moveRow(GE(a[m][0]).rowIndex, m);
}
for(var n=0;n<checkedArray.length;n++)
{
var row = GE(checkedArray[n][1]);
row.cells[checkedArray[n][0]].getElementsByTagName("input")[0].checked = true;
}
document.body.style.cursor = "auto";
GE(a_span_id).style.cursor = "hand";
}
function compareasc(a,b)
{
return ((a[1] < b[1]) ? -1 : ((a[1] > b[1]) ? 1 : 0));
}
function comparedesc(a,b)
{
return ((a[1] < b[1]) ? 1 : ((a[1] > b[1]) ? -1 : 0));
}
