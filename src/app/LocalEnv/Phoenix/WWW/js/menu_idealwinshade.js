function IDealWinShade(u_name,ly_arr,below_or_left_top,above,typ) {
var left,top,ly_tbl_arr,arr_len;
var var_typ=typeof(below_or_left_top);
if (var_typ==typeof([])) {
left=below_or_left_top[0];
top=below_or_left_top[1];
} else if (var_typ==typeof("")) {
left=eval(below_or_left_top+"._left;");
top=eval(below_or_left_top+"._top+"+below_or_left_top+".layers[0].getHeight()");
if (eval(below_or_left_top+".layers.length")==3) { top+=eval(below_or_left_top+".layers[2].getHeight()"); }
} else { alert("argument 3 is of the wrong type"); return; }
arr_len=ly_arr.length;
if (arr_len>3) { alert("only 3 layers, please"); return; }
else {
ly_tbl_arr=[{"ly_name":ly_arr[0]}];
if (arr_len==3) {
ly_tbl_arr=ly_tbl_arr.concat({"ly_name":ly_arr[1],"properties":["collapseable"],"nohandle":["mousedown"]});
ly_tbl_arr=ly_tbl_arr.concat({"ly_name":ly_arr[2]});
} else { typ=STATIC; }
}
this._base=DropDown2;
this._base(u_name,left,top,ly_tbl_arr,typ);
if (arr_len==3) {
this.onDrop="this._updateImage();";
this.onCollapse="this._updateImage();";
if (above) {
this.onDrop+=above+".move(0,(this.layers[1].getHeight()));";
this.onCollapse+=above+".move(0,-(this.layers[1].getHeight()));";
}
}
if (above) { this.onMove=above+".move(xoffset,yoffset);"; }
this._updateImage=_idws_updateImage;
this._body="";
this.setBody=_idws_setBody;
this.appendToBody=_idws_appendToBody;
this.setImage=_idws_setImage;
}
function _idws_setImage(img_name,up_src,down_src) {
this._img_name=img_name;
this._up_img_src=up_src;
this._down_img_src=down_src;
}
function _idws_updateImage() {
if (!this._img_name) return;
var src;
if (this.state==DROPPEDDOWN) { src=this._up_img_src; }
else if (this.state==COLLAPSED) { src=this._down_img_src; }
if (NS4) { ly[this.layers[0]._ly].document.images[this._img_name].src=src; }
else { doc.images[this._img_name].src=src; }
}
function _idws_setBody(str) {
this._body=str;
var i=(this.layers.length>1)?1:0;
this.layers[i].setInnerHTML(this._body);
}
function _idws_appendToBody(str) {
this._body+=str; 
var i=(this.layers.length>1)?1:0;
this.layers[i].setInnerHTML(this._body);
}
