<!-- 
var PopupHandle;
window.onunload = closePopups;
function onPageLoad()
{
}
function CustomValidation( frm, arrFieldsInError )
{
} 
function submitPage( frm, action ,lAttnID)
{
switch (action)
{
case "Delete":
frm.hidattnID.value = lAttnID;
if (confirm("Are you sure you want to delete the attendee") == true)
{
frm.hidAction.value ="Delete"
frm.action = "/asp/util_submit_action.asp";
frm.submit();
}
break;
case "Update":
frm.hidAction.value = "Update";
frm.action = "/asp/util_submit_action.asp";
frm.submit();
break;
}
}
function LoadAttendee(lAttnID,sType)
{
var lEventID = document.frmMain.hidEventID.value;
var url="roadshow_addattendee_popup.asp?EventID="+ lEventID+"&Type="+sType+"&AttnID="+lAttnID;
var sStyle = "width=600, height=450, scrollbars=1";
PopupHandle = window.open( url, null, sStyle );
}
function closeWindow()
{
window.close();
window.opener.location = window.opener.location + "&UsePopup=0";
}
function closePopups()
{
if(PopupHandle != null)
PopupHandle.close();
}
function ShowContactDetails(contactID, sInvName, sRequestorName)
{
var sURL ;
sURL = "inst_inv_acct_contact_details.asp" ;
sURL = sURL + "?CONTACTID=" ;
sURL = sURL + contactID ;
sURL = sURL + "&INVESTORNAME=" ;
sURL = sURL + escape(sInvName) ;
sURL = sURL + "&REQUESTORNAME=" ;
sURL = sURL + escape(sRequestorName) ;
var sStyle = "width=400,height=500,scrollbars=0,resizable=1,left=5,top=5";
window.open( sURL, '', sStyle ); 
}
