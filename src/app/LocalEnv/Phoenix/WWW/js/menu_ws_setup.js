//topmost_pos=65; 
num_shades=0; 
var offset=0;
ws=[]; 
shades=[]; 
function getLyHeight(ly_name) { return (IE)?ly[ly_name].scrollHeight:(NS6)?ly[ly_name].offsetHeight:ly[ly_name].document.height; }
function setIDealWinShadePos(prevLy,thisLy,lastcssname,top_relative_pos){
top_relative_pos=top_relative_pos||getHeaderBottom();
var top=top_relative_pos; 
top+=getLyHeight(prevLy);
adjustLyPos(thisLy,lastcssname,top);
return top;
}
function adjustLyPos(thisLy,cssname,top){
if (NS4) { doc.ids[thisLy].top=top; }
else if (IE) { doc.styleSheets[cssname].addRule("#"+thisLy,"top:"+top); }
else if (NS6) { doc.getElementsByTagName("style")[cssname].sheet.insertRule("#"+thisLy+" {top:"+top+"px;}",doc.getElementsByTagName("style")[cssname].sheet.cssRules.length); }
}
function getAggregateWinShadeHeight(collection) {
var tot_height=0;
for (var i in collection) {
tot_height+=collection[i].totalHeight||0;
}
return tot_height;
}
function getDocBottom() {
var aggregate_winshade_height=getAggregateWinShadeHeight(ws);
var doc_height=((NS4)?ly['NScontent'].top:(NS6)?ly['content'].offsetHeight:ly['content'].scrollHeight)||0;
doc_height+=30 + getHeaderBottom();
return Math.max(aggregate_winshade_height+getHeaderBottom(),doc_height);
}
function getHeaderBottom() {
var n= ((NS4)?ly['NSheader'].top:(NS6)?ly['header'].offsetHeight:ly['header'].scrollHeight)||0;
return n;
}
function moveFooterPos(footerLy) {
if (!NS4) { ly[footerLy].style.top=getDocBottom(); }
else { ly[footerLy].top=getDocBottom(); }
}
function setFooterPos(footerLy,cssname){
var top_pos=getDocBottom()
adjustLyPos(footerLy,cssname,top_pos);
return top;
}
function setMenuTop( ){
var top_pos=getHeaderBottom()
adjustLyPos( "menu1a", "menu1css", top_pos );
}
image_list = {};
image_list["active"]={};
image_list["inactive"]={};
image_list["active"]["up"]=new Image();
image_list["active"]["down"]=new Image();
image_list["inactive"]["up"]=new Image();
image_list["inactive"]["down"]=new Image();
image_list["active"]["up"].src = "../images/up_active.gif";
image_list["active"]["down"].src = "../images/down_active.gif";
image_list["inactive"]["up"].src = "../images/up_inactive.gif";
image_list["inactive"]["down"].src = "../images/down_inactive.gif";
function menuSetUp() {
var args; 
for (var i=0;i<shades.length;i++){
args=shades[i];
if ((num_shades-1)==i) { args[3]=null; }
ws[i]=new IDealWinShade(args[0],args[1],args[2],args[3],args[4]);
if (args.length>6) { 
ws[i].setImage(args[6],image_list[args[7]]["up"].src,image_list[args[7]]["down"].src);
}
ws[i].onDrop+='moveFooterPos("footer");';
ws[i].onCollapse+='moveFooterPos("footer");';
ws[i].draw();
}
for (i=0;i<shades.length;i++) {
if (getCookie(ws[i].name) == "down") {ws[i].dropItDown();}
} 
}
function calcLeftNavHeight(){
menuHeight=20;
if (NS4) {
for (i=0;i<shades.length;i++){
for (j=0; j<shades[i][1].length; j++) {
menuHeight += getLyHeight(shades[i][1][j]);
} 
}
}
doc.write("<img src=\"../images/spacer.gif\" height=\"" + menuHeight + "\" width=\"118\" border=\"0\" />");
}
function getCookie(special) 
{
var cookieName = (special + "=");
var i = 0;
while (i < document.cookie.length) 
{
var j = i + cookieName.length;
if (document.cookie.substring(i, j) == cookieName) return getCookieValue(j);
i = document.cookie.indexOf(" ", i) + 1;
if (i == 0) break; 
}
return "down";
}
function getCookieValue(offset) 
{
var endString = document.cookie.indexOf (";", offset);
if (endString == -1) endString = document.cookie.length;
return unescape(document.cookie.substring(offset, endString));
}
function setCookie(cookieName, cookieData)
{
var expiry = new Date();
expiry.setTime(expiry.getTime() + 1 * (24 * 60 * 60 * 1000));
document.cookie = cookieName + "=" + escape(cookieData) + "; expires=" + expiry.toGMTString();;
}
