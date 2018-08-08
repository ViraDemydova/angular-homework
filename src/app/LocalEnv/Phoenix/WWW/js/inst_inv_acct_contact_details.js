function SendCorrectionEmail(sEmailTo, sSubject, sBody)
{
var sURL ;
sBody= "Contact:" + document.frmMain.fName.value + " " + document.frmMain.lName.value + "\n" ;
sBody = sBody + "Account: " + document.frmMain.hidInvName.value + "\n" ;
sBody = sBody + "Requestor: " + document.frmMain.hidRequestorName.value + "\n\n" ;
sBody = sBody + "Job Title: " + document.frmMain.jobtitle.value + "\n" ;
sBody = sBody + "Address: " + document.frmMain.addr1.value + "\n" ;
sBody = sBody + document.frmMain.addr2.value + "\n" ;
sBody = sBody + document.frmMain.addr3.value + "\n" ;
sBody = sBody + "City: " + document.frmMain.city.value + "\n" ;
sBody = sBody + "State: " + document.frmMain.state.value + "\n" ;
sBody = sBody + "Zip: " + document.frmMain.zip.value + "\n" ;
sBody = sBody + "Country: " + document.frmMain.country.value + "\n" ;
sBody = sBody + "Email: " + document.frmMain.email.value + "\n" ;
sBody = sBody + "Phone: " + document.frmMain.phone_no.value + "\n" ;
sBody = sBody + "Fax: " + document.frmMain.fax_no.value + "\n\n" ;
sBody = sBody + "Assistant Name: " + document.frmMain.assist_name.value + "\n" ;
sBody = sBody + "Assistant job Title: " + document.frmMain.assist_jobtitle.value + "\n" ;
sBody = sBody + "Assistant Phone: " + document.frmMain.assist_phone.value + "\n" ;
sBody = sBody + "Switchboard Phone: " + document.frmMain.switch_phone.value + "\n" ;
sBody = sBody + "Sales Coverage:" + "\n"
var i ;
for (i = 0 ; i < document.frmMain.selSales.options.length ; i++)
{
sBody = sBody + document.frmMain.selSales.options[i].text + "\n" ;
}
sBody = sBody + "\n" ;
sBody = sBody + "Please enter the field that you would like updated here:" + "\n\n" ;
sBody = sBody + "The information should be updated to:" + "\n\n" ;
sBody = escape(sBody) ;
sSubject = "Update Contact Request" ;
sURL = "mailto:" ;
sURL = sURL + sEmailTo ;
sURL = sURL + "?subject=" ;
sURL = sURL + sSubject ;
sURL = sURL + "&body=" ;
sURL = sURL + sBody ;
window.open(sURL, null, "height=200,width=200,status=yes,toolbar=no,menubar=no,location=no") ;
}
