function onPageLoad()
{
}
function viewHistoryDetails(iss_id, copy_log_id)
{
var sUrl = "Bookbuild_CopyFieldsHistoryDetails.asp?iss_id="+iss_id+"&tcopy_log_id="+copy_log_id;	
var sStyle = "width=800,height=650,toolbar=no,menubar=no,location=no,directories=no,resizable=yes,scrollbars=yes";
window.open(sUrl, '', sStyle);
}
