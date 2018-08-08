<!-- 
function isArrowKey()
{
return (event.keyCode == 37 || event.keyCode == 38 || event.keyCode == 39 || event.keyCode == 40 ) ? true : false
}
function isAngleBracket()
{
return ((event.shiftKey && event.keyCode == 188) || (event.shiftKey && event.keyCode == 190)) ? true : false;
}
function isBackspaceKey()
{
return event.keyCode == 8 ? true : false;
} 
function isDeleteKey()
{
return event.keyCode == 46 ? true : false;
}
function isQuestionMarkKey()
{
return (event.shiftKey && event.keyCode == 191) ? true : false;
}
function isSlashKey()
{
return ((event.keyCode == 191) || (event.keyCode == 220)) ? true : false;
}
function isColonKey()
{
return (event.shiftKey && event.keyCode == 186) ? true : false;
}
function isVerticalBarKey()
{
return (event.shiftKey && event.keyCode == 220) ? true : false;
}
function isStarKey()
{
return (event.shiftKey && event.keyCode == 56) ? true : false;
}
function isDoubleQuoteKey()
{
return (event.shiftKey && event.keyCode == 222) ? true : false;
}
function fnBeforeCut()
{
event.returnValue=false;
}
function fnBeforePaste()
{
event.returnValue=false;
}
function fnBeforeCopy()
{
event.returnValue=false;
}
