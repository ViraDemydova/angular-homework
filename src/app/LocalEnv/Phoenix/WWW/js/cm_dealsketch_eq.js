<!-- 
function submitColumnSort( oForm, strColumn, strURL )
{
var oCurrentSortColumn = oForm.hidCurrentSortColumn;
var oCurrentSortOrder = oForm.hidCurrentSortOrder;
if( strColumn != oCurrentSortColumn.value )
{
oCurrentSortColumn.value = strColumn;
oCurrentSortOrder.value = "ascending";
}
else if( oCurrentSortOrder.value == "ascending" )	
oCurrentSortOrder.value = "descending";	
else
oCurrentSortOrder.value = "ascending";
oForm.target = "_self";	
oForm.action = strURL;
oForm.submit();
}
function confirmDelete( strDocument )
{
return confirm( "Do you wish to delete document \"" + strDocument + "\" ?" );
}
function submitDocumentDelete( nDocID, strURL )
{
var oForm = document.frmCMDealSketch;
oForm.encoding = "multipart/form-data";
oForm.target = "_self";
submitDocument( nDocID, "Delete", strURL );
}
var strViewWnd = "_blank";
function submitDocumentView( nDocID )
{
window.open ("cm_viewdoc.asp?DocID=" + nDocID, "cm_doc_win");
}
function submitInetPwdListView( nDocID )
{
javascript:openGeneralPopup('cm_inetpwdlist.asp?DocID=' + nDocID, '', 'width=480,height=320,scrollbars=1,resizable=1');
}
function submitAddOrEdit( nDocID, strDocAction, strURL )
{
var oForm = document.frmCMDealSketch;
oForm.target = "_self";
submitDocument( nDocID, strDocAction, strURL );
}
function submitDocument( nDocID, strDocAction, strURL )
{
var oForm = document.frmCMDealSketch;
oForm.target = "_self";
oForm.rsDocAction.value = strDocAction;
oForm.DocID.value = nDocID;
oForm.action = strURL;
oForm.submit();
}
function submitAddOrEditInetPrst( nDocID, strDocAction, strURL, sRoadshowVendorName, sDocCode)
{
var sVendorName;
sVendorName = sRoadshowVendorName.toUpperCase() ;
if ( (sVendorName.indexOf("NETROADSHOW") != -1) && (sDocCode == "MG") )
{
var sURL = "tf_transaction_services.asp?fromcm=1&doctypecode=" + sDocCode ;
location.href = sURL ;
return ;
}
var oForm = document.frmCMDealSketch;
oForm.target = "_self";
submitDocument( nDocID, strDocAction, strURL );
}
