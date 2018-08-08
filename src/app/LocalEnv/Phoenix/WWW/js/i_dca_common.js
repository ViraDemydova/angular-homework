<!--
var GEBI=(document.getElementById)? true:false;
var ALL=(document.all)? true:false;
function GE(a_id){
var retVal=null;
if(GEBI){
retVal=document.getElementById(a_id);
}
else if(ALL){
retVal=document.all[a_id];
}
if(retVal==null) alert("!!! box object '"+a_id+"' not found !!!");
return retVal;
}
function getAll(a_id)
{	
var get = document.all(a_id);
if(get && get.length)
return get;
else
{
var retVal = new Array();
if(get)
retVal[0] = get;
return retVal;
}
}
function CheckRemoteScriptingError(co)
{
var dom = null;
if( co.return_value.substring(0,9) == "<response" )
{
dom = new ActiveXObject("MSXML.DOMDocument");
dom.loadXML( co.return_value );
}
else
{
alert(co.return_value); 
}
return dom;
}
function getAttributeString(node,att)
{
var attNode = node.attributes.getNamedItem(att);
if(attNode != null)
return attNode.text
else
return ""	
}
function XMLEntityEncode(sText, fromXml)
{
if(sText==null) return null;
var sReplaceStringsEntityRef=new Array();
sReplaceStringsEntityRef[0]="&amp;";
sReplaceStringsEntityRef[1]="&gt;";
sReplaceStringsEntityRef[2]="&lt;";
sReplaceStringsEntityRef[3]="&quot;";	
sReplaceStringsEntityRef[4]="&apos;";
var sReplaceStringsEntity=new Array();
sReplaceStringsEntity[0]="&";
sReplaceStringsEntity[1]=">";
sReplaceStringsEntity[2]="<";
sReplaceStringsEntity[3]="\\\"";
sReplaceStringsEntity[4]="\\\'";
var sRet=sText;
for(var i=0;i<sReplaceStringsEntityRef.length;i++)
{
if(fromXml)
{
var re = new RegExp(sReplaceStringsEntityRef[i], "g");
sRet=sRet.replace(re, sReplaceStringsEntity[i]);
}
else
{
var re = new RegExp(sReplaceStringsEntity[i], "g");
sRet=sRet.replace(re, sReplaceStringsEntityRef[i]);
}
}	
return sRet;
}
function ToggleBook(iden)
{ 
var eImage;
if( window.event.srcElement.tagName == "IMG" )
eImage = window.event.srcElement;
else
eImage = window.event.srcElement.children[0];
var a = document.all(iden);
if( a == null )
return;
if( a.length )
{
for(var i=0;i != a.length; i++)
{
if( a[i].style.display == "none")
{
eImage.src = "/images/minus.gif";
a[i].style.display = "inline";
}
else
{
eImage.src = "/images/plus.gif";
a[i].style.display = "none";
}
}
}
else
{
if( a.style.display == "none")
{
eImage.src = "/images/minus.gif";
a.style.display = "inline";
}
else
{
eImage.src = "/images/plus.gif";
a.style.display = "none";
}
}
}
function strip_dsName(dsName, value)
{	
return value.substr(dsName.length);
}
