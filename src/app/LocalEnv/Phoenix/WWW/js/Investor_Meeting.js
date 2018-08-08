<!-- 
function onPageLoad()
{
var frm = document.frmMain;
frm.txtMeetingMinutes.value = frm.hidMeetingNotes.value;
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
function Submit( )
{
var frm = document.frmMain;
if (frm.hidMeetingId.value != "")
frm.hidAction.value = "UpdateInvestorMeetingMinutes";
else
frm.hidAction.value = "AddInvestorMeetingMinutes";
GenerateXml('selMeetingAttendee', 'hidMeetingAttendees');
GenerateXml('selMeetingContact', 'hidMeetingContacts');
frm.hidMeetingNotes.value = frm.txtMeetingMinutes.value;
if (frm.rdtMeeting.value.length == 0 || !IsValidDate(frm.rdtMeeting.value, frm.hidDateFormat.value, frm.rdtMeeting))
{
alert('Please enter valid meeting date');
return;
}
if (frm.txtMeetingMinutes.value.length == 0)
{
alert('Meeting minutes cannot be empty');
return;
}
if (frm.txtMeetingMinutes.value.length == 0)
{
alert('Meeting minutes cannot be empty');
return;
}
if (frm.txtMeetingMinutes.value.length > 2000)
{
alert('Meeting minutes cannot be more be 2000 characters');
return;
}
if (frm.txtSubject.value.length > 100)
{
alert('Subject cannot be more be 100 characters');
return;
}
if (ValidateForm(frm))
{
frm.method = "POST";
frm.action = "util_submit_action.asp";
frm.submit();
}
}
function GenerateXml(sSelectControlNm, sDestControlNm)
{
var frm = document.frmMain;
var oDestControl = frm.all(sDestControlNm);
var oSelControl = frm.all(sSelectControlNm);
var sXml = "<options>";
var sMValId = "-1";
var sId = "-1";
if (oSelControl.options.length > 0)
{
for(var i = 0; i < oSelControl.options.length; i++)
{
var oOption = oSelControl.options(i);
sXml = sXml + "<option><caption>" + EscapeXMLChar(oOption.text) + "</caption>";
var sVal = oOption.value;
sMValId = sVal.split(";")[0];
sId = sVal.split(";")[1];
sMValId = sMValId.split(":")[1];
sId = sId.split(":")[1];
sXml = sXml + "<m_id>" + sMValId + "</m_id>";
sXml = sXml + "<c_id>" + sId + "</c_id>";
sXml = sXml + "</option>";
}
}
sXml = sXml + "</options>";
oDestControl.value = sXml;
}
function findInControl(sTxtControlNm, sSelectControlNm)
{
var frm = document.frmMain;
var oTxtControl = frm.all(sTxtControlNm);
var oSelControl = frm.all(sSelectControlNm);
var sEnteredVal = oTxtControl.value;
if (sEnteredVal.length > 0)
{
var re = "^" + sEnteredVal;
re = re.toLowerCase();
for(var i=0; i < oSelControl.options.length ; i++)
{
if (oSelControl.options(i).text.toLowerCase().search(re) >= 0)
{
oSelControl.selectedIndex = i;
break;
}
}
}
}
function fAdd(sSourceList, sDestList)
{
var oSourceOptions, oDestOptions, i, x, bUnique;
oSourceOptions = eval("document.frmMain." + sSourceList + ".options;");
oDestOptions = eval("document.frmMain." + sDestList + ".options;");	
i = 0;	
if (oSourceOptions.length > 0)
{
do
{
if (oSourceOptions[i].selected)
{
var sSource = oSourceOptions[i].value;
if (sSource.split(";")[0].split(":")[1] != "-1")
{
var oOption = new Option(oSourceOptions[i].text, oSourceOptions[i].value);
oDestOptions[oDestOptions.length] = oOption;
}
oSourceOptions[i] = null;
i = 0;
}
else
i++;
}
while (i < oSourceOptions.length)
} 
}
function fAddOneOffItem(sTxtControlNm, sSelectControlNm)
{
var frm = document.frmMain;
var oTxtControl = frm.all(sTxtControlNm);
var oSelControl = frm.all(sSelectControlNm);
var sEnteredVal = oTxtControl.value;
var sVal = "";
if (sSelectControlNm == "selMeetingAttendee")
sVal = "UP:-1;MA:-1";
else
sVal = "IC:-1;MC:-1";
if (sEnteredVal.length > 0)
{
var oOption = new Option(sEnteredVal, sVal);
oSelControl.options[oSelControl.options.length] = oOption;
}
}
function EscapeXMLChar(str)
{
var regex;
regex = /&/g;
str = str.replace(regex, "&amp;");
regex = />/g;
str = str.replace(regex, "&gt;");
regex = /</g;
str = str.replace(regex, "&lt;");
regex = /"/g;	
str = str.replace(regex, "&quot;");
regex = /'/g;
str = str.replace(regex, "&apos;");
return(str);
}
