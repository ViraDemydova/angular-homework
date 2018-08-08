function dropdownSelect(value, sel) {
if(value) {
for (var i=0; i<sel.options.length; i++) {
if(sel.options[i].value == value) {
sel.selectedIndex = i;
}
}
}
}
function fillDropdownListByVal(value, xmllist, sel, nameatt, valueatt, extravals){
var xmlDocList = document.all(xmllist).XMLDocument;
var elements = xmlDocList.getElementsByTagName('row');
var length = elements.length;
var opt;
var match = 0;
if (sel != null){
for(var i=0; i<length; i++) {
opt = new Option(elements[i].getAttribute(nameatt), elements[i].getAttribute(valueatt));
sel.options[sel.options.length] = opt;
}
if(extravals){
var arrlength = extravals.length
for(i=0; i<arrlength; i++){
opt = new Option(extravals[i][0], extravals[i][1]);
if(extravals[i].length == 3){ 
insertOptionAt(sel,opt,extravals[i][2]);
}
else {
insertOptionAt(sel,opt,0);
}
}
}
length = sel.options.length;
if( !(value == null) ){
for(i=0;i<length;i++){
if(sel.options[i].value == value){
sel.selectedIndex = i;
match = 1;
}
}
if(match != 1){
}
}
}
return;
}
function insertOptionAt (select, option, index) {
var opt = new Option("", "dummy");
select.options[select.options.length] = opt;
for (var i = select.options.length-1; i > index; i--){
select.options[i] = new Option(select.options[i - 1].text, select.options[i - 1].value);
}
select.options[index] = option;
}
function fillDropdownListByValFiltered(value, xmllist, sel, nameatt, valueatt, 
filternametag, selfiltervalue, extravals){
var xmlDocList = document.all(xmllist).XMLDocument;
var elements = xmlDocList.getElementsByTagName('row');
var length = elements.length;
var opt;
var match = 0;
var actuallength = 0;
sel.options.length = 0;
if (length == 0)
return;
for(var i=0; i<length; i++) {
filterAttValue = elements[i].getAttribute(filternametag);
if ((filterAttValue == selfiltervalue) || (valueatt == 'regist_type_id' && i <= 2)) { 
opt = new Option(elements[i].getAttribute(nameatt), elements[i].getAttribute(valueatt)); 
sel.options[sel.options.length] = opt;
} 
}
if(extravals){
var arrlength = extravals.length
for(i=0; i<arrlength; i++){
opt = new Option(extravals[i][0], extravals[i][1]);
if(extravals[i].length == 3) 
insertOptionAt(sel,opt,extravals[i][2]);
else
insertOptionAt(sel,opt,0);
}
}
length = sel.options.length;
if(value){
for(i=0;i<length;i++){
if(sel.options[i].value == value){
sel.selectedIndex = i;
match = 1;
}
}
}
if(match != 1)
sel.selectedIndex = 0;
}
function fillDropdownList(xmlmain, xmllist, sel, maintag, listtag){
var xmlDocMain = document.getElementById(xmlmain).XMLDocument;
var xmlDocList = document.getElementById(xmllist).XMLDocument;
var eltMain = xmlDocMain.getElementsByTagName(maintag);
var eltList = xmlDocList.getElementsByTagName(listtag);
var length = eltList.length;
var opt;
var match = 0;
for(var i=0;i<length;i++){
opt = new Option(eltList[i].text);
sel.options[sel.options.length] = opt;
}
length = sel.options.length;
var val = eltMain[0].text
for(i=0;i<length;i++){
if(sel.options[i].text == val){
sel.selectedIndex = i;
match = 1;
}
}
if(match != 1){
alert('Raise error here! - ' + val + ' invalid.');
}
}
function renderElements(tagXML, tagXSL, divID){
divID.innerHTML = tagXML.transformNode(tagXSL.documentElement);
}
function createOrReplaceElement(sElementName, sElementValue, elementParent, docXML)
{
var elementItem = docXML.createElement(sElementName);
var textValue = docXML.createTextNode(sElementValue);
elementItem.appendChild(textValue);
var nodelistOldItem = elementParent.getElementsByTagName(sElementName);
if (nodelistOldItem.length > 0)
{
elementParent.replaceChild(elementItem, nodelistOldItem.item(0));
}
else
{
elementParent.appendChild(elementItem);
}
}
function createOrReplaceElementAsRealNumber(sElementName, sElementValue, elementParent, docXML)
{
var n = stripCharsInBag( sElementValue, numericCharsToIgnore )
createOrReplaceElement( sElementName, n, elementParent, docXML )
}
function createOrReplaceElementAsWholeNumber(sElementName, sElementValue, elementParent, docXML)
{
var n = stripCharsInBag( sElementValue, numericCharsToIgnore )
createOrReplaceElement( sElementName, n, elementParent, docXML )
}
function appendElement(sElementName, sElementValue, elementParent, docXML)
{
var elementItem = docXML.createElement(sElementName);
var textValue = docXML.createTextNode(sElementValue);
elementItem.appendChild(textValue);
elementParent.appendChild(elementItem);
}
function createOrReplaceElementwValue(sElementName, sElementValue, elementParent, docXML)
{
if (sElementValue != "") {
var elementItem = docXML.createElement(sElementName);
var textValue = docXML.createTextNode(sElementValue);
elementItem.appendChild(textValue);
var nodelistOldItem = elementParent.getElementsByTagName(sElementName);
if (nodelistOldItem.length > 0)
{
elementParent.replaceChild(elementItem, nodelistOldItem.item(0));
}
else
{
elementParent.appendChild(elementItem);
}
}
}
function constructXML(infoArray, bNullValuesAllowed)
{
var value, elementName, topParent
var docXML = new ActiveXObject(MSXML_PROG_ID);
docXML.async = "false";
topParent = "<" + infoArray[0] + "/>";
docXML.loadXML(topParent);
root = docXML.documentElement;
for (i=1; i<infoArray.length; ++i) { 
nextParent = docXML.createElement(infoArray[i][0]);
for (j=0; j<infoArray[i][1].length; ++j) {
value = infoArray[i][1][j][1];
if (value == "" && bNullValuesAllowed == false) 
continue;
elementName = infoArray[i][1][j][0];
elementTag = docXML.createElement(elementName);
elementValue = docXML.createTextNode(value);
elementTag.appendChild(elementValue);
nextParent.appendChild(elementTag);
}
if (nextParent.hasChildNodes())
root.appendChild(nextParent);
}
return(docXML.xml);
}
function Left(str, n)
{
if (n <= 0) 
return "";
else if (n > String(str).length) 
return str; 
else 
return String(str).substring(0,n);
}
function escXmlValue(value)
{
var s = new String( value );
s = s.replace( /\&/gi, "&amp;" );	
s = s.replace( /</g, "&lt;" ); 
s = s.replace( />/g, "&gt;" ); 
s = s.replace( /"/g, "&quot" ); 
s = s.replace( /'/g, "&apos;" );	
return s;
}
function addTag( tagName, tagValue )
{
if(tagValue.length == 0 )
{
return "<" + tagName + "/>";
}
else
{
return "<" + tagName + ">" + escXmlValue( tagValue ) + "</" + tagName + ">";
}
}
