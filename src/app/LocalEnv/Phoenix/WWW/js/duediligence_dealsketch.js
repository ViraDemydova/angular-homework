<!-- 
function submitDocument( nDocID, strURL )
{
window.open (strURL + "?DocID=" + nDocID, "cm_doc_win");
}
function submitInternetPresentation( sTargetURL, sPc, sPwd, sLName, sFName, sEMail, sURL, sSendActiveInd, sClientCode )
{
var sTargetWindowName = "cm_doc_win";
var oForm = document.frmDueDiligenceDealSketch;
var sQuery = "?pc=" + sPc + "&pwd=" + sPwd + "&lastname=" + sLName + "&firstname=" + sFName;
sQuery = sQuery + "&email=" + sEMail;
oForm.method = "POST";
oForm.hidTargetURL.value = sTargetURL;
oForm.hidQuery.value = sQuery;
oForm.hidPC.value = sPc;
oForm.hidPWD.value = sPwd;
oForm.hidFNAME.value = sFName;
oForm.hidLNAME.value = sLName;
oForm.hidEMAIL.value = sEMail;
oForm.hidSendActiveInd.value = sSendActiveInd;
oForm.hidClientCode.value = sClientCode;
oForm.target = sTargetWindowName;
oForm.action = sURL;
oForm.submit();
}
function submitToTarget (strURL)
{
var strTargetWindowName = "_self";
var oForm = document.frmMain;
var strPre = strURL.substring(0,7);
var strPre2 = strURL.substring(0,8);
if ((strPre.toUpperCase() != "HTTP:\/\/") && (strPre2.toUpperCase() != "HTTPS:\/\/"))
strURL = "http:\/\/" + strURL;
oForm.method = "GET";
oForm.target = strTargetWindowName;
oForm.action = strURL;
oForm.submit();
}
function ViewNetroadshowTracking()
{
var sURL = getReportURL() ;
var sw = screen.width * 0.85
var sh = screen.height * 0.85
var sStyle = "width=" + sw + ",height=" + sh + ",scrollbars=0,resizable=1,left=5,top=5"; 
openGeneralPopup( sURL, '', sStyle ); 
return;
}
function getReportURL()
{
var report;
var sIssueID, sUPN ;
sIssueID = document.frmDueDiligenceDealSketch.riDealID.value ;
sUPN = document.frmDueDiligenceDealSketch.hidUPN.value ;
report = "/asp/rpt_get_report.asp?";
report += "ReportFile=" + "/rpt/NetroadshowTrackingSales.rpt";
report += '&amp;bstrUPN="' + sUPN + '"';
report += '&amp;lIssId="' + sIssueID + '"';
report += '&amp;lTrnId="' + '-1' + '"';
return report;
}
