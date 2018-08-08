<!-- 
function onPageLoad()
{
frm = document.frmMain;
if (window.parent.opener && (window.parent.opener.name == "respond_preview"))
{
for (var i = 0; i <frm.rsResponse.length; i++)
{
if (frm.rsResponse[i].value == window.parent.opener.document.frmMain.hidResponse.value)
{
frm.rsResponse[i].checked = true;
break;
}
}
frm.rtxtResponseText.value = window.parent.opener.document.frmMain.hidResponseText.value;
window.parent.opener.close();
}
}
function respondPreview(frm)
{
if (ValidateForm(frm))
{
window.open("wire_respondPreview_popUp.asp?wire_id=" + frm.hidWireID.value + "&rsResponse=" + getResponse(frm) + "&rtxtResponseText=" + escape(frm.rtxtResponseText.value),'respond_preview','height=200,width=610,resizable,status,scrollbars');
}
}
function getResponse(frm)
{
var value = "";
for (var i = 0; i <frm.rsResponse.length; i++)
{
if (frm.rsResponse[i].checked)
{
value = frm.rsResponse[i].value;
break;
}
}
return value;
}
function CheckConditionallyRequiredFields(frm, arrFieldsInErro)
{
var arrMoreErrors = new Array();
if (getResponse(frm) == '')
{
var arrError = FieldErrorInfo("rsResponse", 'Please select a response.', "", "rsResponse[0]", "Response");
arrMoreErrors[arrMoreErrors.length] = arrError;
}
return arrMoreErrors;
}
function validateKey()
{
return (!isAngleBracket());
}
