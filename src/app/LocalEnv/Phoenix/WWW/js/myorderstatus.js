RSEnableRemoteScripting("/_ScriptLibrary")
function onPageLoad()
{
RSCallObject_wait(); 
}
function CheckConditionallyRequiredFields( frm, arrFieldsInError )
{
var arrMoreErrors = new Array();
return (arrMoreErrors);
} 
function CustomValidation( frm, arrFieldsInError )
{
var arrMoreErrors = new Array();
return (arrMoreErrors);
} 
function displayError( oField, strDomain, strUrl )
{	
if(strDomain){
oField.value = strDomain
}
oField.form.action = strUrl 
oField.form.submit()	
}
function AbortOrder(oForm, strOrdTrackId, strUrl)
{
var co;
co = RSExecute('rs_myorderstatus.asp', 'js_AbortOrder', strOrdTrackId, (oForm.elements["hidType"].value == "pending"));
oForm.action = strUrl 
oForm.submit()	
}
function RecoverOrder(oForm, strOrdTrackId, bUseSalesWorksheet)
{
if ( bUseSalesWorksheet=="1" )
{
var strURL = 'Bookbuild_FastIndicationEQ.asp?ordtrackid=' + strOrdTrackId;
openGeneralPopup(strURL, '', 'width=450,height=120,toolbar=no,scrollbars=yes,menubar=no,resizable=yes');
oForm.style.display = "none";
document.title = strURL;
window.resizeTo(750,250);
}
else
{
window.opener.location = 'bookbuild_indicationseq.asp?ordtrackid=' + strOrdTrackId;
}
}
