<!-- 
var g_blnDirtyFlag;
function onPageLoad()
{
}
function submitPage( frm, action )
{
switch (action)
{
case "Export":
frm.hidSubject.value = getDocumentElement("divSubject").innerText
frm.hidLocation.value = getDocumentElement("divLocation").innerText
frm.hidEventTime.value = getDocumentElement("divEventTime").innerText
frm.hidName.value = getDocumentElement("divName").innerText
frm.hidAddr1.value = getDocumentElement("divAddr1").innerText
frm.hidAddr2.value = getDocumentElement("divAddr2").innerText
frm.hidAddr3.value = getDocumentElement("divAddr3").innerText
frm.hidCName.value = getDocumentElement("divCName").innerText
frm.hidCPhone.value = getDocumentElement("divCPhone").innerText
frm.hidSale.value = getDocumentElement("divSale").innerText
frm.hidSPhone.value = getDocumentElement("divSPhone").innerText
frm.hidDttmStartTm.value = frm.hidDttm.value + " " + frm.hidStartTm.value;
frm.hidDttmEndTm.value = frm.hidDttm.value + " " + frm.hidEndTm.value;
frm.hidReminder.value = frm.selReminder.options[frm.selReminder.selectedIndex].value;
frm.method = "POST";
frm.action = "Roadshow_Event_Export_Outlook.asp?Export=1";
frm.submit();
break;
}
}
