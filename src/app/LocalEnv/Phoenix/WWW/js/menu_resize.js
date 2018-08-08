if(NS4 && !window.saveInnerWidth) {
window.onresize = onWindowResize; window.saveInnerWidth = window.innerWidth;
window.saveInnerHeight = window.innerHeight;
}
function onWindowResize(e) {
if (NS4&& (saveInnerWidth < window.innerWidth || saveInnerWidth > window.innerWidth || saveInnerHeight > window.innerHeight || saveInnerHeight < window.innerHeight ) ){
window.history.go(0);
}
}
window.onresize=onWindowResize;
