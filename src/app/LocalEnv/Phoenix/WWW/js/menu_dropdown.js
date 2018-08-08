COLLAPSED=INVISIBLE;
DROPPEDDOWN=VISIBLE;
ROLLOVER=0;
CLICK=SHADE=1;
STATIC=2;
function DropDown2(u_name,u_left, u_top, u_ly_tbl_arr,u_type){
var o=this;
o._base=DynMenu;o._base(u_name, u_ly_tbl_arr);
o.onMouseDown=_dd2_onMouseDown;
o.onMouseOut=_dd2_onMouseOut;
o.onMouseOver=_dd2_onMouseOver;
o.toggleState=_dd2_toggleState;
o.dropItDown=_dd2_dropItDown;
o.collapseIt=_dd2_collapseIt; 
o.draw=_dd2_draw;
o.move=_dd2_move;
o.state=null;
o.type=u_type||ROLLOVER;
o.onMove=o.onDrop=o.onCollapse=null;
o.totalHeight=0;
o._left = u_left;
o._top = u_top;
o._timer=null;
o._drawDropDown2=_dd2_drawCore;
}
function _dd2_draw(){ return this._drawDropDown2();}
function _dd2_drawCore(){
var curr_ly, topoff=0;
var left=(IE)?"pixelLeft=":"left=";
var top=(IE)?"pixelTop=":"top=";
for (var i=0;i<this.layers.length;i++){
curr_ly=this.layers[i];
if (curr_ly.draw){
curr_ly.setProps([left+this._left,"zIndex="+this._id,top+(this._top+topoff)]);
topoff+=curr_ly.draw();
}
} 
return (this.totalHeight=topoff);
}
function _dd2_toggleState(){
if (this.state==DROPPEDDOWN) this.collapseIt();
else this.dropItDown();
return this.state;
}
function _dd2_dropItDown(){
if (this.state==DROPPEDDOWN) return;
this.state=DROPPEDDOWN;
setCookie( this.name, "down" );
lp_hk(this,"if (obj.layers[i].collapseable){ obj.layers[i].setVisible(DROPPEDDOWN);}");
this.draw(); if (this.onDrop) { eval(this.onDrop); }
}
function _dd2_collapseIt(){
if(this.state==COLLAPSED) return;
this.state=COLLAPSED;
setCookie( this.name, "up" );
lp_hk(this,"if (obj.layers[i].collapseable){ obj.layers[i].setVisible(COLLAPSED);}");
this.draw();if (this.onCollapse) { eval(this.onCollapse); }
}
function _dd2_move(xoffset, yoffset){
this._top+=yoffset;this._left+=xoffset;
if (this.onMove) { if (typeof(this.onMove)==typeof('')) { eval(this.onMove) } else { this.onMove(xoffset,yoffset) }}
this._drawn=false;this.draw();
}
function _dd2_onMouseDown(e){ if (this.type==CLICK) { this.toggleState(); } }
function _dd2_onMouseOut(e){ if (this.type==ROLLOVER) { this._timer=win.setTimeout(this.name+".collapseIt()",10); } }
function _dd2_onMouseOver(e){ if (this.type==ROLLOVER) { win.clearTimeout(this._timer); this.dropItDown(); } }
