var selectedEntity = null;
var IMAGE_PATH = "../images/";
function treeClicked( entity ) 
{
if ( entity.open==0 ) {
expand(entity);
}
else {
collapse(entity);
}
window.event.cancelBubble = "true";
}
function expand( entity ) 
{
if ( !entity){
return;
}
if (entity.nodeType == 'dynamic' && entity.childNodes.length==1 )
{
CallBackExpand(entity);
}
var oImage = entity.childNodes(0).all["image"];
if ( oImage ) {
oImage.src = IMAGE_PATH+entity.imgO;
}
var stateImage = entity.childNodes(0).all["sI" + entity.id];
if ( stateImage ) {
stateImage.src = IMAGE_PATH+stateImage._open;
} 
var len = entity.childNodes.length;
for ( var i=0; i<len; i++ ) 
{
var child = entity.childNodes(i);	
if ( child.tagName=="DIV" ) {
child.style.display = "block";
}
}
entity.open = 1;
}
function collapse( entity ) 
{
if ( !entity || entity.childNodes.length==0 )
return;
var oImage = entity.childNodes(0).all["image"];
if ( oImage ) {
oImage.src = IMAGE_PATH+entity.img;
}
var stateImage = entity.childNodes(0).all["sI" + entity.id];
if ( stateImage ) {
stateImage.src = IMAGE_PATH+stateImage._closed;
}
var len = entity.childNodes.length;
for ( var i=0; i<len; i++ ) 
{
var child = entity.childNodes(i);	
if ( child.tagName=="DIV" ) 
{
if ( entity.id!="folderTree" ) {
child.style.display = "none";
}
}
}
entity.open = 0;
}
function expandAll(entity) 
{ 
if ( !entity || entity.childNodes.length==0 )
return;
expand( entity );
for ( var i=0; i<entity.childNodes.length; i++ ) 
{
var child = entity.childNodes(i);	
if ( child.tagName=="DIV" ) {
expandAll( child );
}
}
}
function treeChkClicked( chb ) 
{
var parent = chb.parentNode.parentNode.parentNode.parentNode.parentNode;
var childs = parent.getElementsByTagName("INPUT");
var len = childs.length;
for ( var i=0; i<len; i++ ) 
{
childs.item(i).checked = chb.checked;
}
window.event.cancelBubble = true;
}
