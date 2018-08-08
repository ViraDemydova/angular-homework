INVISIBLE=(NS4)?"hide":"hidden";
VISIBLE=(NS4)?"show":"visible";
function Box(ly_name,u_zindex){
var o=this;
o.draw=_drawBox;
o.setVisible=_setVis;
o.setInnerHTML=_setBoxIHTML;
o.getInnerHTML=_getBoxIHTML;
o.setProps=_setBoxProps;
o.getHeight=_getBxH;
o.getWidth=_getBxW;
o.getRealHeight=_getBxRH;
o.getRealWidth=_getBxRW;
o.getLeft=_getBoxX;
o.getTop=_getBoxY;
o.clipTo=_clipBoxTo;
o._ly=ly_name;
o._drawn=false;
o.zindex=u_zindex;
o._innerHTML="";
o._drawBox=_drawBoxCore;
o._setVis=_setBxVis;
if (o.zindex) { ly[o._ly].zIndex=this.zindex; }
}
function __gcw(obj){ if (obj.clip) {return (obj.clip[1]-obj.clip[3])} else return obj.getRealWidth(); }
function __gch(obj){ if (obj.clip) {return (obj.clip[2]-obj.clip[0])} else return obj.getRealHeight(); }
function _setVis(state) { this._setVis(state) }
function _setBxVis(state){this.setProps(["visibility='"+state+"'"]);}
function _getBxW(){ return (IE||NS6)?__gcw(this):ly[this._ly].clip.width;}
function _getBxH(){ return (IE||NS6)?__gch(this):ly[this._ly].clip.height; }
function _getBxRW(){ return (IE)?ly[this._ly].scrollWidth:(NS6)?ly[this._ly].offsetWidth:ly[this._ly].document.width;}
function _getBxRH(){ return (IE)?ly[this._ly].scrollHeight:(NS6)?ly[this._ly].offsetHeight:ly[this._ly].document.height; }
function _getBoxX(){return (NS)?((NS6)?ly[this._ly].style.left:ly[this._ly].left):ly[this._ly].style.pixelLeft;}
function _getBoxY(){return (NS)?((NS6)?ly[this._ly].style.top:ly[this._ly].top):ly[this._ly].style.pixelTop;}
function _getBoxIHTML(){ return this._innerHTML; }
function _setBoxIHTML(str){ this._innerHTML=str;this._drawn=false; }
function _clipBoxTo(c){ 
o=this;
c=c||[0,o.getRealWidth(),o.getRealHeight(),0];
t=c[0];r=c[1];b=c[2];l=c[3];o.clip=c;
if (b>=0 && t>=0) { clipHeight=b-t; }
if (l>=0 && r>=0) { clipWidth=r-l; }
if (NS4) {
if (t>=0) { ly[o._ly].clip.top = t; }
if (r>=0) { ly[o._ly].clip.right = r; }
if (b>=0) { ly[o._ly].clip.bottom = b; }
if (l>=0) { ly[o._ly].clip.left = l; }
}else if (IE || NS6){
for (var i=0;i<c.length;i++) { if (c[i]<0) c[i]='auto'; }
ly[o._ly].style.clip='rect('+t+' '+r+' '+b+' '+l+')'; 
}
}
function _setBoxProps(props){
var code="ly[this._ly].";
if (IE || NS6){code+="style."}
for (var i=0;i<props.length;i++){ eval(code+props[i]+";"); }
}
function _drawBox(){return this._drawBox();}
function _drawBoxCore(){
o=this;
if (!o._drawn){
if (o._innerHTML.length>0){
o._drawn=true;
if(IE || NS6){
ly[o._ly].innerHTML=o._innerHTML;
}else if (NS4){
ly[o._ly].document.write(o._innerHTML);
ly[o._ly].document.close();
}
} else { o.clipTo(); }
o.height=o.getHeight();
}
var code="ly[this._ly].";
if (IE || NS6){ code+="style." }
if (eval(code+"visibility=='"+INVISIBLE+"'")) return 0;
else return o.height;
}
