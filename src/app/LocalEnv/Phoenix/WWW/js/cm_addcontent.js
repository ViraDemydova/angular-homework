<!-- 
function CheckConditionallyRequiredFields( frm, arrFieldsInError )
{
var arrMoreErrors = new Array();
var oColRadio = frm.rscontent_type;
var oIndRadio;
var i, numContent = oColRadio.length;
var strContentType = "";
var arrError;
for( i = 0; i < numContent; i++ )
{
oIndRadio = oColRadio[i];
strContentType += oIndRadio.checked ? oIndRadio.value : "";
}	
switch (strContentType)	
{
case "document" :
if( frm.document_type.selectedIndex == -1 )
{
arrError = FieldErrorInfo("", "Please select document type to add.", "", "document_type", "Document Type"); 
arrMoreErrors[arrMoreErrors.length]	= arrError; 
}
break;
case "presentation" :
if( frm.frm_roadshow_vendors.selectedIndex == -1 )
{
arrError = FieldErrorInfo("", "Please select presentation vendor to add.", "", "frm_roadshow_vendors", "Presentation Vendor"); 
arrMoreErrors[arrMoreErrors.length]	= arrError;
}
if( frm.internet_presentation.selectedIndex == -1 )
{
arrError = FieldErrorInfo("", "Please select presentation type to add.", "", "internet_presentation", "Presentation Type"); 
arrMoreErrors[arrMoreErrors.length]	= arrError;
}
break;
case "content_url" : 
if( frm.content_url.selectedIndex == -1 )
{
arrError = FieldErrorInfo("", "Please select URL type to add.", "", "content_url", "URL Type"); 
arrMoreErrors[arrMoreErrors.length]	= arrError; 
}
break; 
}
return (arrMoreErrors);
} 
function submitFileDocument( oForm )
{
if( oForm.rscontent_type[0].checked == true)
{
if( ValidateForm( oForm ) )
{
oForm.document_type.value = oForm.file_document_type.options[oForm.file_document_type.selectedIndex].value;
oForm.action = oForm.file_document_type.options[oForm.file_document_type.selectedIndex].url;
oForm.submit();
}
}
else
{
alert( "Incorrect document type selected for submit" ); 
}
}
function submitURLDocument( oForm, strURL )
{	
if( oForm.rscontent_type[2].checked )
{
if( ValidateForm( oForm ) ) 
{
oForm.document_type.value = oForm.content_url.options[oForm.content_url.selectedIndex].value;
oForm.action = strURL;
oForm.submit();
}
}
else
{
alert( "Incorrect document type selected for submit" ); 
}	
}
function submitInetPsntDocument( oForm, strURL )
{
if( oForm.rscontent_type[1].checked )
{
if( ValidateForm( oForm ) )
{	
var sVendorName, sDocCode;
sVendorName = oForm.frm_roadshow_vendors.options[oForm.frm_roadshow_vendors.selectedIndex].text;
sDocCode = oForm.internet_presentation.options[oForm.internet_presentation.selectedIndex].value;
sVendorName = sVendorName.toUpperCase() ;
if ( (sVendorName.indexOf("NETROADSHOW") != -1) && (sDocCode == "MG") )
{
var sURL = "tf_transaction_services.asp?fromcm=1&doctypecode=" + sDocCode ;
location.href = sURL ;
return ;
}
oForm.document_type.value = oForm.internet_presentation.options[oForm.internet_presentation.selectedIndex].value;
oForm.action = strURL;
oForm.submit();
}
}
else
{
alert( "Incorrect document type selected for submit" ); 
}
}
function submitForm( oForm, strURL )
{	
if( ValidateForm( oForm ) )	
{
oForm.action = strURL;
oForm.submit();
}
}
