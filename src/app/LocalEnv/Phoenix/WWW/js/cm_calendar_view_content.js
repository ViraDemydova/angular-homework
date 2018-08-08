<!-- 
function submitDocument( nDocID, strURL )
{
var strTargetWindowName = "cm_doc_win"
var oForm = document.frmDueDiligenceDealSketch	
oForm.DocID.value = nDocID
oForm.target = strTargetWindowName
oForm.action = strURL
oForm.submit()
}
function submitPage( frm , action )
{
switch (action)
{ 
case "Remove" :
frm.hidAction.value = "Delete";
frm.action = "util_submit_action.asp";
frm.submit();
break;
}
}
function removeDoc(docID)
{
var oForm = document.frmDueDiligenceDealSketch
oForm.DocID.value = docID;
oForm.method = "POST";
oForm.target = "_self"; 
submitPage(oForm, "Remove");
}
function confirmDelete( strDocument )
{
return confirm( "Do you wish to delete document \"" + strDocument + "\" ?" );
}
