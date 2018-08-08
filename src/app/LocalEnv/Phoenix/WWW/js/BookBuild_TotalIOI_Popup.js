RSEnableRemoteScripting("/_ScriptLibrary")
var bRefresh = false;
var oForm = self.window.opener.document.frmMain;
var nNumProduct = new Number(oForm.hidNumProduct.value);
var sProduct = document.frmMain.elements["hidProductLiteral"].value
var sLimit = document.frmMain.elements["hidLimitLiteral"].value
LoadPage();
function error_page(co)
{
var sHtml;
sHtml += ' <table width="100%" cellpadding="0" cellspacing="0" border="0" class="fixed">';
sHtml += ' <tr>';
sHtml += ' <td width="20"></td>';
sHtml += ' <td class="resultsTable">';
sHtml += ' <table cellpadding="0" cellspacing="1" width="100%" border="0">';
sHtml += ' <tr class="headerCell">';
sHtml += ' <td><div class="txtBold">Error</div></td>';
sHtml += ' <td><div class="txtBold">Msg</div></td>';
sHtml += ' </tr>';
sHtml += ' <tr class="resultsRowA">';
sHtml += ' <td><div class="txtRegular">' + 'Status' + '</div></td>';
sHtml += ' <td><div class="txtRegular">' + co.status + '</div></td>';
sHtml += ' </tr>';
sHtml += ' <tr class="resultsRowA">';
sHtml += ' <td><div class="txtRegular">' + 'Message' + '</div></td>';
sHtml += ' <td><div class="txtRegular">' + co.message + '</div></td>';
sHtml += ' </tr>';
sHtml += ' <tr class="resultsRowA">';
sHtml += ' <td><div class="txtRegular">' + 'Data' + '</div></td>';
sHtml += ' <td><div class="txtRegular">' + co.data + '</div></td>';
sHtml += ' </tr>';
sHtml += ' </table>';
sHtml += ' </td>';
sHtml += ' <td width="20"></td>';
sHtml += ' </tr>'; 
sHtml += ' </table>';
document.write(sHtml);
}
function error_alert(co)
{
alert("Error_callback\n\n" +
"status = " + co.status + "\n\n" +
"message = " + co.message + "\n\n" +
"data = " + co.data);
}
function getProductID(sLimitDiscount)
{
var ss = sLimitDiscount.split("C",2);
return ss[0];
}
function GetAmountPrice()
{
var i = 0;
var j = 0;
var sPrd_id = document.frmMain.selProduct.value;
var sProductId = "";
var sAmountType = "";
var sIOIAmtType = "";
var sLimitDiscount = "" 
var sLimitPrdId = "";
var sLimitType = "";
var sPrdCcyId = "";
var dblAmount;
var dblPrice;
var sXml = "<pe><to>" + sPrd_id + "</to>";
for (i = 0; i < nNumProduct; i++)
{ 
sProductId = oForm.elements["hidPrdId" + String(i)].value;
sAmountType = oForm.elements["selAmountType" + String(i)].value;
sIOIAmtType = sAmountType.substring(0,1); 
sPrdCcyId = sAmountType.substring(1);
sLimitDiscount = oForm.elements["selLimitDiscount" + String(i)].value; 
sLimitType = sLimitDiscount.substring(0,1);
sLimitPrdId = getProductID(sLimitDiscount.substring(1));
dblAmount = new Number(oForm.elements["iTxtAmount" + String((i*5)+1)].value.replace(/(\,)/g, ""));
if (sAmountType != "0" && dblAmount > 0)
{
sXml += "<po>";
sXml += "<pi>" + sProductId + "</pi>";
sXml += "<ia>" + sIOIAmtType + "</ia>";
if (sLimitPrdId == "")
{
sXml += "<lp>" + sProductId + "</lp>";
}
else
{
sXml += "<lp>" + sLimitPrdId + "</lp>";
}
if (sLimitType == "L")
{
sXml += "<li>0</li>";
}
else
if (sLimitType == "D")
{
sXml += "<li>1</li>";
}
else
{
sXml += "<li>0</li>";
}
if (sIOIAmtType == "C")
{
sXml += "<ic>" + sPrdCcyId + "</ic>";
}
else
{
sXml += "<ic>0</ic>";
}
for (j = (i * 5) + 1; j <= ((i + 1) * 5); j++)
{
dblAmount = new Number(oForm.elements["iTxtAmount" + String(j)].value.replace(/(\,)/g, ""));
var PriceElementValue = oForm.elements["fltTxtPrice" + String(j)].value
if (PriceElementValue == oForm.elements["hidMarketOrderString"].value)
{
dblPrice = 0;
}
else
{
dblPrice = new Number(PriceElementValue.replace(/(\,)/g, ""));
}
if ((dblAmount == 0))
{
}
else
{
sXml += "<i>";
if (dblPrice != 0)
{ 
sXml += "<p>" + String(dblPrice) + "</p>";
}
if (sIOIAmtType == "P")
{
sXml += "<r>" + sPrdCcyId + "</r>";
sXml += "<q>" + String(dblAmount) + "</q>"; 
}
else
if (sIOIAmtType == "C")
{
sXml += "<r>" + sProductId + "</r>";
sXml += "<a>" + String(dblAmount) + "</a>";
}
sXml += "</i>";
} 
}
sXml += "</po>";
}
} 
sXml += "</pe>";
return sXml;
}
function LoadPage()
{
var sXml = GetAmountPrice();
var co = RSExecute('rs_bookbuild_indication_server.asp', 'js_TotalIOIPopup', sXml);
var sAmountArr = new Array(nNumProduct*5);
var sPriceArr = new Array(nNumProduct*5);
if (co.status != 0)
{
error_page(co);
return;
}
var sArray = co.return_value.split(",");
var nElements = sArray.length/2;
for (nIndex = 0; nIndex < nElements; nIndex++)
{
sAmountArr[nIndex] = sArray[nIndex];
sPriceArr[nIndex] = sArray[nElements+nIndex];
} 
var sPrd_id = document.frmMain.hidPrdId.value;
var sTxtAmountName = "";
var sTxtPriceName = "";
var sInputStyle = 'onfocus="return blur()" style="text-align: right; border: 0"';
var sAmount = "";
var sPrice = ""; 
var sHtml = "";
sHtml += ' <table width="100%" cellpadding="0" cellspacing="0" border="0" class="fixed">';
sHtml += ' <tr>';
sHtml += ' <td width="20"></td>';
sHtml += ' <td class="resultsTable">';
sHtml += ' <table cellpadding="0" cellspacing="1" width="100%" border="0">';
sHtml += ' <tr class="headerCell">';
sHtml += ' <td><div class="txtBold">'+sProduct+'</div></td>';
sHtml += ' <td><div class="txtBold">'+sLimit+'</div></td>';
sHtml += ' </tr>';
for (nIndex = 0; nIndex < nElements; nIndex++)
{
if (sAmount[nIndex] != 0)
{ 
sTxtAmountName = "txtAmount" + String(nIndex);
sTxtPriceName = "txtPrice" + String(nIndex);
sAmount = formatAmountString(sAmountArr[nIndex]);
sPrice = formatAmountString(sPriceArr[nIndex]);
sHtml += ' <tr class="resultsRowA">';
sHtml += ' <td><input type="text" id="' + sTxtAmountName + '" name="' + sTxtAmountName + '" ' + sInputStyle + 'value="' + sAmount + '"/></td>';
sHtml += ' <td><input type="text" id="' + sTxtPriceName + '" name="' + sTxtPriceName + '" ' + sInputStyle + 'value="' + sPrice + '"/></td>';
sHtml += ' </tr>';
}
}
sHtml += ' </table>';
sHtml += ' </td>';
sHtml += ' <td width="20"></td>';
sHtml += ' </tr>'; 
sHtml += ' </table>';
document.write(sHtml);
}
function OnProductChanged()
{
var sXml = GetAmountPrice();
var co = RSExecute('rs_bookbuild_indication_server.asp', 'js_TotalIOIPopup', sXml);
if (co.status != 0)
{
error_alert(co);
return;
}
var sAmountField = "";
var sPriceField = "";
var sAmount = "";
var sPrice = "";
var sArray = co.return_value.split(",");
var nElements = sArray.length/2;
for (nIndex = 0; nIndex < nElements; nIndex++)
{ 
sAmount = sArray[nIndex];
sPrice = sArray[nElements+nIndex];
sAmountField = "txtAmount" + String(nIndex);
sPriceField = "txtPrice" + String(nIndex);
try
{
document.frmMain.elements[sAmountField].value = formatAmountString(sAmount);
document.frmMain.elements[sPriceField].value = formatAmountString(sPrice);
}
catch(e)
{
alert("Error performing task.\n\rPlease click refresh and try again.");
}
}
}
function PreClose()
{
if (!bRefresh)
{
var parentDoc = self.window.opener.document;
parentDoc.frmMain.hidPopUpTrack.value = "0";
close();
} 
else
bRefresh = false;
}
window.onunload=PreClose;
function Refresh()
{
bRefresh = true;
window.location.reload();
}
