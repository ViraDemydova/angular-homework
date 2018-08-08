<!-- 
function CheckConditionallyRequiredFields( frm, arrFieldsInError )
{
var arrMoreErrors = new Array();
if ( frmMain.rtxtLibraryText.value.length >= 3000 ) 
{
var arrError = FieldErrorInfo("rtxtLibraryText", 'Custom Text cannot be more than 3000 characters', "", "rtxtLibraryText", "Custom Text");
arrMoreErrors[arrMoreErrors.length] = arrError;
}	
return (arrMoreErrors);
} 
function onPageLoad()
{
var text = window.opener.document.selection.createRange().duplicate().text;
document.frmMain.rtxtLibraryText.value = text;
document.frmMain.hidDebtEqFlg.value = window.opener.document.frmMain.hidDebtEqFlg.value;
}
function onEnter()
{
if ((document.frmMain.rtxtLibraryName.value != "") && (document.frmMain.rtxtLibraryText.value !=""))
{
submitPage(document.frmMain);
}
}
function libraryNameExists(libraryName)
{
var co = RSExecute("/asp/rs_wire_checkLibraryName.asp","js_NameExist", libraryName);
return co.return_value.toString(); 
}
function submitPage(frm)
{
if (ValidateForm(frm))
{
var ret = libraryNameExists(frm.rtxtLibraryName.value);
if (ret == 'false')
{
frm.hidAction.value = 'Add';
frm.method = "POST";
frm.action = "util_submit_action.asp";
frm.submit();
return true;
}
else
{
alert("Library '" + frm.rtxtLibraryName.value + "' exists, please choose another name");
frm.rtxtLibraryName.focus();
}	
}
}
function validateKey()
{	
return true;
}
function fnPaste()
{
event.returnValue = true;
}
