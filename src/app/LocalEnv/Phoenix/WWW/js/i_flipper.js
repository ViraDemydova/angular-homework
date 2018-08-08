<!-- 
function ResizeActiveXControl()
{
var oMB = document.all("AXFlipBrokerDetailsCtrl");
if (oMB == null)
return;
var oElement=oMB;
var lOffsetX=0;
var lOffsetY=0;
while(oElement)
{
lOffsetX+=oElement.offsetLeft;
lOffsetY+=oElement.offsetTop;
oElement=oElement.offsetParent
}
oMB.OnFrameSize(document.body.offsetWidth-lOffsetX, document.body.offsetHeight-lOffsetY);
}
