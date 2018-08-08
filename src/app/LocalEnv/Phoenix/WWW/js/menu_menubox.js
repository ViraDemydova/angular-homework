function MenuBox(ly_name,u_width,u_height,u_attr,zindex){
var o=this;
o._base=Box;this._base(ly_name,zindex);
o.menuItems=[];
o.draw=_mb_draw;
o.addMenuItem=_mb_addMenuItem;
o.width=u_width
o.height=u_height;
o._drawMenuBox=_mb_drawCore;
o._attr=u_attr||"";
}
function _mb_addMenuItem(str){ this.menuItems=this.menuItems.concat(str); this._drawn=false; }
function _mb_draw(){return this._drawMenuBox();}
function _mb_drawCore(){
var o=this;
if (!o._drawn){
var item="";
var tb1="<table";
if (o.width) tb1+=" width="+o.width;
if (o.height) tb2+=" height="+o.height;
if (o._attr) tb1+=" "+o._attr;
tb1+=" cellpadding=0 cellspacing=0 border=0 valign=top>";
if (IE) { tb1+="<tbody>" }
var tb2=(IE)?"</tbody></table>":"</table>"
for (var i=0;i<o.menuItems.length;i++){
item+=o.menuItems[i].toString();
}
if (MAC && IE) { o.setInnerHTML(item); }
else { o.setInnerHTML(tb1+item+tb2); }
}
return o._drawBox();
}
