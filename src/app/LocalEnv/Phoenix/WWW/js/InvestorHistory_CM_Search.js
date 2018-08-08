<!-- 
function onPageLoad()
{
menuShow('rpt_RAP_CrossDeal', 'tophide');
var sFromDate = document.frmMain.dtFromDate.value;
var sToDate = document.frmMain.dtInDate.value;
if ((sFromDate == "") && (sToDate == ""))
{
document.frmMain.dtFromDate.value = formatDate(getFromDate(document.frmMain));
document.frmMain.dtInDate.value = formatDate(new Date());
}
onClickInvHistType();
}
function formatDate( dtDateTime )
{
var USMDY;
USMDY = (dtDateTime.getMonth() + 1) + "/";
USMDY += dtDateTime.getDate() + "/";
USMDY += dtDateTime.getFullYear();
return FormatDate(USMDY,UserSettings.dateMask,'MM/DD/YYYY') 
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
function submitFindPage( frm )
{
if(ValidateForm( frm ))
{
var sFromDate = frm.dtFromDate.value;
var sToDate = frm.dtInDate.value;
var sInvestName = frm.txtInvestorName.value;
if (frm.radInvestorHistoryType[1].checked)
{
if (sFromDate.length == 0 && sToDate.length == 0 && sInvestName.length == 0 )
{
alert("Please enter either date range or investor name to search meetings");
return;
}
}
else if (frm.radInvestorHistoryType[0].checked)
{
if ((sFromDate.length == 0 && sToDate.length == 0) || sInvestName.length == 0 )
{
alert("Please enter both date range and investor name to search for investor history");
return;
} 
}
else if (frm.radInvestorHistoryType[2].checked)
{
if (sInvestName.length == 0 )
{
alert("Please enter investor name to search for investors");
return;
} 
}
frm.hidFromDate.value = sFromDate;
frm.hidToDate.value = sToDate;
frm.hidInvNm.value = sInvestName;
frm.hidOldInvNm.value = sInvestName;
frm.method = "POST";
frm.action = "InvestorHistory_CM_Search.asp";
frm.submit();
}
}
function submitResultPage( frm, inst_inv_id, inst_inv_nm )
{ 
var sFromDate = frm.dtFromDate.value;
var sToDate = frm.dtInDate.value;
frm.hidFromDate.value = sFromDate;
frm.hidToDate.value = sToDate;
frm.hidInvNm.value = inst_inv_nm;
frm.hidInvId.value = inst_inv_id; 
frm.method = "POST";
var sTarget = frm.target;
if (frm.radInvestorHistoryType[0].checked)
frm.action = "InvestorHistory_SearchResults.asp";
else
{
frm.hidMode.value = "Add";
var oNewWindow = window.open('', 'meeting','height=700,width=650,scrollbars');
if (oNewWindow)
{
frm.action = "Investor_Meeting.asp";
frm.target = "meeting";
}
}
frm.submit();
frm.target = sTarget;
}
function getFromDate(frm)
{
var now = new Date();
var day = now.getDate();
var year = now.getFullYear();
var month = now.getMonth()+ 1;
month = 18 - month;
if(month > 12)
{
month = month - 12;
year = year - 2;
}
else if(month == 12)
{
year = year - 2; 
}
else
{
month = 12 - month;
year--;
} 
return new Date(year, month-1, day);
}
function onClickInvHistType()
{
var frm = document.frmMain;
if (frm.radInvestorHistoryType[1].checked)
{
document.all("lblDateRange").innerText = frm.hidMeetDateRangeTxt.value;
frm.all("div_Investor_Result").style.display = "none";
frm.all("div_Meeting_Result").style.display = "inline";
}
else
{
document.all("lblDateRange").innerText = frm.hidHistDateRangeTxt.value;
frm.all("div_Investor_Result").style.display = "inline";
frm.all("div_Meeting_Result").style.display = "none";
}
if (frm.radInvestorHistoryType[2].checked)
{
frm.dtFromDate.disabled = true;
frm.dtInDate.disabled = true;
frm.all("href_from_cal").style.display = "none";
frm.all("href_to_cal").style.display = "none";
}
else
{
frm.dtFromDate.disabled = false;
frm.dtInDate.disabled = false;
frm.all("href_from_cal").style.display = "inline";
frm.all("href_to_cal").style.display = "inline";
}	
if (frm.radInvestorHistoryType[1].checked || frm.radInvestorHistoryType[2].checked)
{
frm.all("divInvestorType").style.display = "none";
frm.selInvestorType[0].checked = true;
frm.all("divInvestorSearchType").style.display = "";	
}
else
{
frm.all("divInvestorType").style.display = "inline";
frm.all("divInvestorSearchType").style.display = "none";	
}
}
function onChkMeetingAll()
{
var frm = document.frmMain;
var bCheck = frm.chkMeetingAll.checked;
var arrCheck = document.getElementsByName("chkMeeting");
for(var i = 0; i < arrCheck.length; i++)
{
arrCheck[i].checked = bCheck;
}
}
function UpdateMeeting(frm, lInvMeetingId, inst_inv_id, inst_inv_nm)
{
frm.hidMode.value = "Update";
frm.hidInvNm.value = inst_inv_nm;
frm.hidInvId.value = inst_inv_id;
frm.hidInvMeetingId.value = lInvMeetingId;
frm.method = "POST";
var oNewWindow = window.open('', 'meeting','height=700,width=650,scrollbars');
if (oNewWindow)
{
var sTarget = frm.target;	
frm.action = "Investor_Meeting.asp";
frm.target = "meeting";
frm.submit();
frm.target = sTarget; 
}
}
function PrintSelected()
{
var frm = document.frmMain;
var arrCheck = document.getElementsByName("chkMeeting");
var sXml = "<meetings>";
for(var i = 0; i < arrCheck.length; i++)
{
if (arrCheck[i].checked)
sXml += "<meeting><meeting_id>" + arrCheck[i].value + "</meeting_id></meeting>";
}
sXml += "</meetings>";
frm.bstrXML.value = sXml;
var sReportUrl = '/asp/rpt_get_report.asp?ReportFile=/rpt/MeetingMinutesEQ.rpt&amp;bstrXML="' + sXml + '"';
sReportUrl += '&amp;bstrUPN="' + frm.hidSessionKey.value + '"';
var sw = screen.width * 0.85;
var sh = screen.height * 0.85;
var sStyle = "width=" + sw + ",height=" + sh + ",scrollbars=0,resizable=1,left=5,top=5";
openGeneralPopup( sReportUrl, '', sStyle ); 
}
function onChkMeeting()
{
var frm = document.frmMain;
var arrCheck = document.getElementsByName("chkMeeting");
var bCheck = true;
for(var i = 0; i < arrCheck.length; i++)
{
if (!arrCheck[i].checked)
bCheck = false;
}
frm.chkMeetingAll.checked = bCheck;
}
function submitPage( )
{
var frm = document.frmMain;
if (window.confirm("Do you wish to delete?"))
{
if(GenerateXml() == false)
{
return;
}
frm.method = "POST";
frm.hidAction.value = "DeleteInvestorMeetingMinutes";
frm.action = "util_submit_action.asp";
frm.submit();	
}
}
function GenerateXml()
{
var arrCheck = document.getElementsByName("chkMeeting");
var sXml = "<meetings>";
var count =0;
for(var i = 0; i < arrCheck.length; i++)
{
if (arrCheck[i].checked)
{
sXml += "<meeting><meeting_id>" + arrCheck[i].value + "</meeting_id></meeting>";
count = count + 1;
}
}
sXml += "</meetings>";
document.frmMain.bstrXML.value = sXml;
if(count == 0)
{
alert('Atleast One Meeting must be selected');
return false;
}
}
function OpenInvestorProfilePopupWindow(inv_ext_vendor_cd)
{
var strURL = "/aspx/UI/External/InvestorProfile.aspx?ext_vendor_cd=" + escape(inv_ext_vendor_cd);	
openGeneralPopup(strURL, '', 'width=750,height=500,toolbar=no,scrollbars=yes,menubar=no,resizable=yes');
}
