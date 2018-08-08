<!-- DO NOT MODIFY CASE OF FRG to frg! -->
<!-- Begin old browser hide
function menuToggle(divID, imgID, imgSuffix) 
{
if (document.all) {
var objDiv = eval(divID);
var objImgArrowUp = eval(imgID+"Up"); 
var objImgArrowDown = eval(imgID+"Down"); 
if ( objDiv.style.display == "none" ) {
objDiv.style.display = "block";
objImgArrowUp.style.display = "block";
objImgArrowDown.style.display = "none";
}
else {
objDiv.style.display = "none";
objImgArrowUp.style.display = "none";
objImgArrowDown.style.display = "block";
}
}
}
function menuShow(activePageID, toggle)
{
for(var i = 0; i < LeftNav.obj.length; i++)
{
if (LeftNav.obj[i].pageid == activePageID){
if (toggle == "tophide"){
dID = LeftNav.obj[i].divId.substring(0,3);
menuToggle2(dID, dID, 'hide');
}
else
menuToggle2(LeftNav.obj[i].divId, LeftNav.obj[i].divId, toggle);
}
}
}
function menuToggle2(divID, imgID, toggle)
{
var divTest = document.getElementById('div'+divID);
var ImgUpTest = document.getElementById('navImg'+divID+'Up');
var ImgDownTest = document.getElementById('navImg'+divID+'Down');
if (toggle == "show")
{
if (divTest)
divTest.style.display="block";
if (ImgUpTest)
ImgUpTest.style.display="block";
if (ImgDownTest)
ImgDownTest.style.display="none";
}
else
{
if (divTest)
divTest.style.display="none";
if (ImgUpTest)
ImgUpTest.style.display="none";
if (ImgDownTest)
ImgDownTest.style.display="block";
}
}
function showHandCursor(flag)
{
if (document.all) {
var divElement = event.srcElement;
divElement.style.cursor = 'hand';
if ( flag )
divElement.style.textDecoration = 'underline';
}
}
function showArrowCursor(flag)
{
if (document.all) {
var divElement = event.srcElement;
divElement.style.cursor = 'auto';
if ( flag )
divElement.style.textDecoration = 'none';
}
}
var LeftNav = new Menu();
function Menu()
{
this.activeTopic = "";
this.obj = new Array();
this.addItem = Menu_addItem;
this.write = Menu_write;
}
function Menu_addItem( obj )
{
if ( obj.pageid == this.activeTopic )
obj.selected = true;
obj.idx = this.obj.length;
this.obj[obj.idx] = obj;
}
function Menu_write()
{
document.write('<TABLE cellSpacing="0" cellPadding="0" border="0">');
for ( var idx = 0; idx < this.obj.length; idx++ )
{
this.obj[idx].write();
}
document.write('<TR>');
document.write('<TD class="menuSpacer" colSpan="3">&nbsp;</TD>');
document.write('</TR>');
document.write('</TABLE>');
}
function MenuItem( pageid, caption, pagename, menuLevel, divId, displayStyle, onclick, querystring, childHasAccess, arrowDirection, style, url, disableSubMenu )
{
this.idx = null;
this.pageid = pageid;
this.caption = caption;
this.pagename = pagename;
this.menuLevel = menuLevel;
this.divId = divId;
this.displayStyle = displayStyle;
this.onclick = onclick;
this.querystring = querystring;
this.childHasAccess = childHasAccess;
this.arrowDirection = arrowDirection;
this.style = style;
this.url = url;
this.disableSubMenu = disableSubMenu;
this.selected = false;
this.write = MenuItem_write;
this.writeHeader = MenuItem_writeHeader;
this.writeBody = MenuItem_writeBody;
this.writeFooter = MenuItem_writeFooter;
this.writeHeader_ie = MenuItem_writeHeader_ie;
this.writeBody_ie = MenuItem_writeBody_ie;
this.writeFooter_ie = MenuItem_writeFooter_ie;
}
function MenuItem_write()
{
if ( this.menuLevel == 0 && this.idx < LeftNav.obj.length-1 )
{
if ( LeftNav.obj[this.idx+1].menuLevel == 0 ) return;
}
if ( UserSettings.browser == "IE" )
{
this.writeHeader_ie();
this.writeBody_ie();
this.writeFooter_ie();
}
else
{
this.writeHeader();
this.writeBody();
this.writeFooter();
}
}
function MenuItem_writeHeader()
{
document.write('<TR>');
document.write('<TD width=154 colSpan=4>');
if ( this.menuLevel > 0 )
document.write('<DIV id='+this.divId+'>');
document.write('<TABLE cellSpacing=0 cellPadding=0 width=154 border=0>');
}
function MenuItem_writeBody()
{
document.write('<TR>');
document.write('<TD width=6><IMG height=1 src="/images/spacer.gif" width=6></IMG></TD>');
document.write('<TD width=148 colSpan=3><IMG src="/images/menuLevel'+this.menuLevel+'_top.gif"></IMG></TD>');
document.write('</TR>');
document.write('<TR>');
document.write('<TD><IMG height=1 src="/images/spacer.gif" width=6></IMG></TD>');
document.write('<TD><IMG src="/images/menuLevel'+this.menuLevel+'_left.gif"></IMG></TD>');
document.write('<TD><IMG src="/images/menuLevel'+this.menuLevel+'_center.gif"></IMG></TD>');
document.write('<TD><IMG src="/images/menuLevel'+this.menuLevel+'_right.gif"></IMG></TD>');
document.write('</TR>');
document.write('<TR>');
document.write('<TD><IMG height=1 src="/images/spacer.gif" width=6></IMG></TD>');
document.write('<TD class=menuLevel'+this.menuLevel+'_left align=right>');
if ( this.selected )
document.write('&raquo;');
else
document.write('<IMG height=7 src="/images/spacer.gif" width=7></IMG>');
document.write('</TD>');
if ( this.pagename != "" && this.style != "nohref")
{
document.write('<TD class=menuLevel'+this.menuLevel+'_center><A class=menuLinkLevel'+this.menuLevel+' onclick="'+this.onclick+'" href="'+this.pagename);
if ( this.querystring != "" )
document.write('?'+this.querystring);
document.write('">'+this.caption+'</TD>');
}
else
document.write('<TD class=menuLevel'+this.menuLevel+'_center>'+this.caption+'</TD>');
document.write('<TD class=menuLevel'+this.menuLevel+'_right vAlign=top width=17><IMG height=1 src="/images/spacer.gif" width=17></IMG></TD>');
document.write('</TR>');
document.write('<TR>');
document.write('<TD width=6><IMG height=1 src="/images/spacer.gif" width=6></IMG></TD>');
document.write('<TD width=148 colSpan=3><IMG src="/images/menuLevel'+this.menuLevel+'_bottom.gif"></IMG></TD>');
document.write('</TR>');
}
function MenuItem_writeFooter()
{
document.write('</TABLE>');
if ( this.menuLevel > 0 )
document.write('</DIV>');
document.write('</TD>');
document.write('</TR>');
}
function MenuItem_writeHeader_ie()
{
if ( this.menuLevel == 0 && this.idx != 0)
{
document.write('<TR>');
document.write('<TD class="menuSpacer" colSpan="3">&nbsp;</TD>');
document.write('</TR>');
document.write('</TABLE>');
document.write('<TABLE cellSpacing="0" cellpadding="0" border="0">');
}
}
function MenuItem_writeFooter_ie()
{
if ( LeftNav.obj.length-1 == this.idx )
{
}
else if ( this.menuLevel < LeftNav.obj[this.idx+1].menuLevel )
{
document.write('<TR>');
document.write('<TD width="148px" colSpan="3">');
document.write('<DIV id="div'+this.divId+'" style="'+this.displayStyle+'">');
document.write('<TABLE cellSpacing="0" cellPadding="0" width="148px" border="0">');
}
}
function loadLink(div, div2, url)
{
if (url!="no")
location.href=url;
else
menuToggle(div, div2, '_white'); return false;
}
function MenuItem_writeBody_ie()
{
if ( this.menuLevel == 0 )
{
document.write('<TR>');
document.write('<TD class="menuLevel0_top" width="148px" colSpan="3" height="2"px></TD>');
document.write('</TR>');
document.write('<TR>');
document.write('<TD width="10px" class="menuLevel0_left" style="border-top:1px outset #333333; border-bottom:1px outset #333333; border-left:1px outset #333333" align="right">&nbsp;</TD>');
document.write('<TD width="118px" class="menuLevel0_center" style="cursor:hand; border-top:1px outset #333333; border-bottom:1px outset #333333" onclick="loadLink(\'div'+this.divId+'\', \'navImg'+this.divId+'\', \''+this.url+'\'); return false;" onmouseover="showHandCursor();" onmouseout="showArrowCursor()" wrap="no">'+this.caption+'</TD>');
if (this.disableSubMenu == "1")
{
document.write('<TD width="10px" ALIGN="CENTER" class="menuLevel0_right" style="border-top:1px outset #333333; border-bottom:1px outset #333333; border-right:1px outset #333333" align="" vAlign="top">&nbsp;');
}
else
{
document.write('<TD width="10px" ALIGN="CENTER" class="menuLevel0_right" style="border-top:1px outset #333333; border-bottom:1px outset #333333; border-right:1px outset #333333" align="" vAlign="top" onmouseover="showHandCursor();" onmouseout="showArrowCursor()" onclick="menuToggle(\'div'+this.divId+'\', \'navImg'+this.divId+'\', \'_white\'); return false;">');
if ( this.arrowDirection == "_up" )
document.write('<DIV id="navImg'+this.divId+'Up" style="display: block;"><a href="javascript:" class="menuLinkLevel0" style="FONT-FAMILY: Courier; text-decoration:none">-</a></DIV><DIV id="navImg'+this.divId+'Down" style="display: none;"><a href="javascript:" class="menuLinkLevel0" style="FONT-FAMILY: Courier; text-decoration:none">+</a></DIV>');
else
document.write('<DIV id="navImg'+this.divId+'Up" style="display: none;"><a href="javascript:" class="menuLinkLevel0" style="FONT-FAMILY: Courier; text-decoration:none">-</a></DIV><DIV id="navImg'+this.divId+'Down" style="display: block;"><a href="javascript:" class="menuLinkLevel0" style="FONT-FAMILY: Courier; text-decoration:none">+</a></DIV>');
}
document.write('</TD>');
document.write('</TR>');
document.write('<TR>');
document.write('<TD class="menuLevel0_bottom" width="148px" colSpan="3" height="2px"></TD>');
document.write('</TR>');
}
else
{
if ( this.menuLevel < 2 )
{
document.write('<TR>');
document.write('<TD width="148px" colSpan="3" height="1px"></TD>');
document.write('</TR>');
}
document.write('<TR>');
if ( this.pagename != "" && this.style.indexOf("nohref") == -1)
{
document.write('<TD width="20px" class="menuLevel'+this.menuLevel+'_left" style="border-top:1px outset #333333; border-bottom:1px outset #333333; border-left:1px outset #333333" align="center" valign="middle" onmouseover="showHandCursor();" onmouseout="showArrowCursor()" onClick="');
if ( this.onclick != "" )
{
this.onclick = replace(this.onclick, "javascript:", "");
this.onclick = replace(this.onclick, '"', '\\"');
document.write(this.onclick);
}
else if ( this.pagename != "" )
{
document.write('location.href=\'' + replace(this.pagename, "'", "\\'"));
if ( this.querystring != "" )
document.write('?'+this.querystring);
document.write('\';');
}
document.write('">');
}
else
{
document.write('<TD width="20px" class="menuLevel'+this.menuLevel+'_left" style="border-top:1px outset #333333; border-bottom:1px outset #333333; border-left:1px outset #333333" align="center" valign="middle" onmouseover="showHandCursor();" onmouseout="showArrowCursor()" onClick="menuToggle(\'div'+this.divId+'\', \'navImg'+this.divId+'\', \'_black\'); return false;">');
}
if ( this.selected )
document.write('&raquo;');
else
document.write('&nbsp;');
document.write('</TD>');
if ( this.pagename != "" && this.style.indexOf("nohref") == -1)
{
document.write('<TD width="118px" class="menuLevel'+this.menuLevel+'_center" style="border-top:1px outset #333333; border-bottom:1px outset #333333" wrap="no" onmouseover="showHandCursor(true);" onmouseout="showArrowCursor(true)" onClick="');
if ( this.onclick != "" )
{
this.onclick = replace(this.onclick, "javascript:", "");
this.onclick = replace(this.onclick, '"', '\\"');
document.write(this.onclick);
}
else if ( this.pagename != "" )
{
document.write('location.href=\'' + replace(this.pagename, "'", "\\'"));
if ( this.querystring != "" )
document.write('?'+this.querystring);
document.write('\';');
}
document.write('">');
if ( this.onclick != "" )
{
document.write('<a onClick="event.cancelBubble=false;" class="menuLinkLevel'+this.menuLevel+'"');
}
else if ( this.pagename != "" )
{
document.write('<a onClick="event.cancelBubble=true;" class="menuLinkLevel'+this.menuLevel+'"');
document.write(' href="'+this.pagename);
if ( this.querystring != "" )
document.write('?'+this.querystring);
document.write('"');
}
document.write('">');
document.write(this.caption);
document.write('</a>');
}
else
{
document.write('<TD width="118px" class="menuLevel'+this.menuLevel+'_center" style="border-top:1px outset #333333; border-bottom:1px outset #333333" wrap="no" onmouseover="showHandCursor(true);" onmouseout="showArrowCursor(true)" onClick="menuToggle(\'div'+this.divId+'\', \'navImg'+this.divId+'\', \'_black\'); return false;">');
document.write(this.caption);
}
document.write('</TD>');
if ( this.childHasAccess == "True" )
{
document.write('<TD width="10px" class="menuLevel'+this.menuLevel+'_right" style="border-top:1px outset #333333; border-bottom:1px outset #333333; border-right:1px outset #333333" vAlign="top" onmouseover="showHandCursor();" onmouseout="showArrowCursor()" onClick="menuToggle(\'div'+this.divId+'\', \'navImg'+this.divId+'\', \'_black\'); return false;">');
if ( this.arrowDirection == "_up" )
document.write('<DIV id="navImg'+this.divId+'Up" style="display: block;"><a href="javascript:" class="menuLinkLevel'+this.menuLevel+'" style="FONT-FAMILY: Courier; text-decoration:none">-</a></DIV><DIV id="navImg'+this.divId+'Down" style="display: none;"><a href="javascript:" class="menuLinkLevel'+this.menuLevel+'" style="FONT-FAMILY: Courier; text-decoration:none">+</a></DIV>');
else
document.write('<DIV id="navImg'+this.divId+'Up" style="display: none;"><a href="javascript:" class="menuLinkLevel'+this.menuLevel+'" style="FONT-FAMILY: Courier; text-decoration:none">-</a></DIV><DIV id="navImg'+this.divId+'Down" style="display: block;"><a href="javascript:" class="menuLinkLevel'+this.menuLevel+'" style="FONT-FAMILY: Courier; text-decoration:none">+</a></DIV>');
}
else
{
document.write('<TD width="10px" class="menuLevel'+this.menuLevel+'_right" style="border-top:1px outset #333333; border-bottom:1px outset #333333; border-right:1px outset #333333" onmouseover="showHandCursor();" onmouseout="showArrowCursor()" onClick="');
if ( this.onclick != "" )
{
this.onclick = replace(this.onclick, "javascript:", "");
this.onclick = replace(this.onclick, '"', '\\"');
document.write(this.onclick);
}
else if ( this.pagename != "" )
{
document.write('location.href=\'' + replace(this.pagename, "'", "\\'"));
if ( this.querystring != "" )
document.write('?'+this.querystring);
document.write('\';');
}
document.write('">&nbsp;');
}
document.write('</TD>');
document.write('</TR>');
document.write('<TR>');
if ( this.menuLevel >= 2 )
{
document.write('<TD class="menuLevel'+this.menuLevel+'_bottom" width="148px" colSpan="3" height="1px"></TD>');
}
else
{
document.write('<TD class="menuLevel'+this.menuLevel+'_bottom" width="148px" colSpan="3" height="2px"></TD>');
}
document.write('</TR>');
if ( LeftNav.obj.length-1 == this.idx )
{
for ( var i = 0; i < this.menuLevel; i++ )
{
writeBody_ie_divclose();
}
}
else if ( this.menuLevel >= LeftNav.obj[this.idx+1].menuLevel )
{
if ( this.menuLevel > 0 && this.menuLevel == LeftNav.obj[this.idx+1].menuLevel )
{
document.write('<tr><td colspan="3" width="148px">');
document.write('<div id="div'+this.menuLevel+'001" style="display:none">');
document.write('<table cellpadding="0" cellspacing="0" border="0" width="148"><tr><td></td></tr></table>');
document.write('</div>');
document.write('</td></tr>');
}
if ( this.menuLevel != LeftNav.obj[this.idx+1].menuLevel )
{
var nextLevel = LeftNav.obj[this.idx+1].menuLevel;
for ( var i = 0; i < this.menuLevel - nextLevel; i++ )
{
writeBody_ie_divclose();
}
}
}
}
}
function writeBody_ie_divclose()
{
document.write('</TABLE>');
document.write('</DIV>');
document.write('</TD>');
document.write('</TR>');
}
function replace(str, from, to)
{
var temp;
var re = new RegExp(from, "g");
temp = str.replace(re, to);
return temp;
}
function openCommunicatorLink()
{
openGeneralPopup( '/aspx/UI/External/Communicator.aspx', '', '' );
}
