MAC=NS4=IE4=IE5=IE=NS6=0;
NS=1; doc=document; ly=null; win=window;
if (navigator.platform=="MacPPC") { MAC=1; }
if (doc.layers) { NS4=1;ly=doc.layers; } else if (doc.all) {
IE=1; NS=0; ly=doc.all;
IE5=(doc.recalc)?1:0; IE4=!IE5;
} else {
NS6=1;
ly=doc.getElementsByTagName("*");
}
