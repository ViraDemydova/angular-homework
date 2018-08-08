_uid=1000; 
function DynMenu(u_name, u_ly_tbl_arr){
var o=this;
o.name=u_name;
o.layers=[];
o.onMouseOver=o.onMouseOut=o.onMouseDown=null;
o.indexOf=_dm_indexOf;
o.draw=_dm_draw;
o._id=_uid--;
o._drawDynMenu=_dm_drawCore;
o._handleEvent=_dm_handleEvent;
o._init=_dm_init;
o._init(u_ly_tbl_arr);
}
function lp_hk(obj,code){ for (var i=0;i<obj.layers.length;i++){ eval(code); } }
function _dm_init(u_ly_table_arr){
var tmp_ly,curr_ly_table,ly_name;
var args="ly_name";
for (var i=0;i<u_ly_table_arr.length;i++){
curr_ly_table=u_ly_table_arr[i];
obj_const=curr_ly_table["type"];
if (!curr_ly_table["type"]){ obj_const="Box"; }
ly_name=curr_ly_table["ly_name"];
if (curr_ly_table["args"]){ args+=","+curr_ly_table["args"].join(",");}
eval("tmp_ly=new "+obj_const+"("+args+")");
if (curr_ly_table["properties"]) {
for (var j=0;j<curr_ly_table["properties"].length;j++){
tmp_ly[curr_ly_table["properties"][j]]=1;
}
}
ly[ly_name].onmouseover=this._handleEvent;
ly[ly_name].onmouseout=this._handleEvent;
if (NS4) { ly[ly_name].captureEvents(Event.MOUSEDOWN); }
ly[ly_name].onmousedown=this._handleEvent;
if (curr_ly_table["nohandle"]) {
for (j=0;j<curr_ly_table["nohandle"].length;j++){
eval("ly[ly_name].on"+curr_ly_table["nohandle"][j]+"=null;");
}
}
ly[ly_name].container=this.name;
this.layers=this.layers.concat(tmp_ly);
}
}
function _dm_handleEvent(e){
if (NS) event=e;
var x,y,obj=eval(this.container);
if (!obj) return (NS4)?this.routeEvent(event):0;
if (event.type=="mouseover"){
if (obj.onMouseOver) { obj.onMouseOver(event) }
}else if (event.type=="mouseout"){
if (obj.onMouseOut) { obj.onMouseOut(event); }
} else if (event.type=="mousedown"){
if (obj.onMouseDown) { obj.onMouseDown(event); }
else { if (NS4) { this.routeEvent(event) } } 
}
}
function _dm_draw(){ return this._drawDynMenu();}
function _dm_drawCore(){
var curr_ly;
for (var i=0;i<this.layers.length;i++){
curr_ly=this.layers[i];
if (curr_ly.draw){ curr_ly.draw(); }
}
}
function _dm_indexOf(ly_name) { 
for (var i=0;i<this.layers.length;i++) { if (this.layers[i]._ly==ly_name) return i; } 
return -1;
}
