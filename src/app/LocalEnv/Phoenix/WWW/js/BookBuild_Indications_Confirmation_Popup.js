if (document.frmMain.hidNavigateFromPage.value == "SalesWorkSheet")
{
DisplaySalesWorkSheetConfirmation();
}	
else
{
var sTrnNm = "";
var sOldTrnNm = "";
var sAmount = "";
var sCoupon = "";
var sPremium = "";
var sPrice = "";
var sOrderLimitFlg = "";
var sHtml = "";
var i = 0;
var j = 0;
var sIssueTypeCode = self.window.opener.document.frmMain.hidIssueTypeCode.value;
var nNumProduct = new Number(self.window.opener.document.frmMain.hidNumProduct.value);
var sSalePerson="";
var sRegion="";
if(self.window.opener.document.frmMain.hidIOIUserRole.value=="SyndicateParticipant")
{
sSalePerson=self.window.opener.document.frmMain.hidIOIUserName.value;
}
else
{
if(self.window.opener.document.frmMain.hidRegionName)
sRegion=self.window.opener.document.frmMain.hidRegionName.value;
if(self.window.opener.document.frmMain.hidSalesName) 
sSalePerson = self.window.opener.document.frmMain.hidSalesName.value;
}
var sInvestor;
var bInvestorSet=0;
if(!(bInvestorSet) && self.window.opener.document.frmMain.hidInvestorAlias)
{
if(self.window.opener.document.frmMain.hidInvestorAlias.value != "")
{
sInvestor = self.window.opener.document.frmMain.hidInvestorAlias.value;
bInvestorSet = 1;
}
}
if(!(bInvestorSet))
{
sInvestor = self.window.opener.document.frmMain.hidInvestorName.value; 
}
var sAction = document.frmMain.hidAction.value;
var sAllowPrice = document.frmMain.hidAllowPrice.value;
sHtml += ' <table width="100%" cellpadding="0" cellspacing="0" border="0">';
sHtml += ' <tr><td colspan="3"><div class="txtRegular">&#160;</div></td></tr>';
sHtml += ' <tr>';
sHtml += ' <td width="20"></td>';
sHtml += ' <td><span class="txtBold">' + sSalePerson + ' - ' + sRegion + '</span></td>';
sHtml += ' <td width="20"></td>';
sHtml += ' </tr>';
sHtml += ' <tr>';
sHtml += ' <td width="20"></td>';
sHtml += ' <td><span class="txtBold">Please review your entry for ' + sInvestor + '</span></td>';
sHtml += ' <td width="20"></td>'; 
sHtml += ' </tr>';
sHtml += ' <tr><td colspan="3"><div class="txtRegular">&#160;</div></td></tr>';
sHtml += ' <tr>';
sHtml += ' <td width="20"></td>';
sHtml += ' <td class="resultsTable">';
sHtml += ' <table cellpadding="0" cellspacing="1" width="100%" border="0">';
sHtml += ' <tr class="headerCell">';
sHtml += ' <td align="center"><div class="txtBold">Tranche</div></td>';
sHtml += ' <td align="center"><div class="txtBold">Action</div></td>';
sHtml += ' <td align="center"><div class="txtBold">Amount</div></td>';
if ( sIssueTypeCode=="CB" || sIssueTypeCode=="CP" ) 
{
if (sAllowPrice == "True")
{
sHtml += ' <td align="center"><div class="txtBold">Price (% of Par)</div></td>';
}
sHtml += ' <td align="center"><div class="txtBold">Coupon</div></td>';
sHtml += ' <td align="center"><div class="txtBold">Premium</div></td>';
}
else 
{
if(document.frmMain.hidAllowDiscountFlag.value=="1")
sHtml += ' <td align="center"><div class="txtBold">Limit/Discount</div></td>';
else
sHtml += ' <td align="center"><div class="txtBold">Limit</div></td>';
}	
sHtml += ' </tr>'; 
var bIsCommentOnlyIndication = true;
sTrnNm = self.window.opener.document.frmMain.elements["hidTrnName"].value;
for (i = 0; i < nNumProduct; i++)
{
var sPrdNm = self.window.opener.document.frmMain.elements["hidProductName" + String(i)].value;
var sSelectAmtTypeText = self.window.opener.document.frmMain.elements["selAmountType" + String(i)].options[self.window.opener.document.frmMain.elements["selAmountType" + String(i)].selectedIndex].text;
var sSelectAmtTypeValue = self.window.opener.document.frmMain.elements["selAmountType" + String(i)].options[self.window.opener.document.frmMain.elements["selAmountType" + String(i)].selectedIndex].value;
for (j = (i * 5) + 1; j <= ((i + 1) * 5); j++)
{ 
sAmount = self.window.opener.document.frmMain.elements["iTxtAmount" + String(j)].value;
if ( sIssueTypeCode=="CB" || sIssueTypeCode=="CP" )
{
if (sAllowPrice == "True")
{
sPrice = self.window.opener.document.frmMain.elements["fltTxtPrice" + String(j)].value;
}
sCoupon = self.window.opener.document.frmMain.elements["fltTxtCoupon" + String(j)].value;
sPremium = self.window.opener.document.frmMain.elements["fltTxtPremium" + String(j)].value;
}
else
{
sPrice = self.window.opener.document.frmMain.elements["fltTxtPrice" + String(j)].value;
sLimitDiscount = self.window.opener.document.frmMain.elements["selLimitDiscount" + String(i)].options[self.window.opener.document.frmMain.elements["selLimitDiscount" + String(i)].selectedIndex].text;
}
if (sCoupon == "")
sCoupon = self.window.opener.document.frmMain.elements["hidMarketOrderString"].value;
if (sPremium == "")
sPremium = self.window.opener.document.frmMain.elements["hidMarketOrderString"].value;
if (sPrice == "")
sPrice = self.window.opener.document.frmMain.elements["hidMarketOrderString"].value;
if (sAmount != "")
{
sHtml += '<tr class="resultsRowA">';
if (sOldTrnNm != sTrnNm)
{
sHtml += '<td><div class="txtRegular">' + sTrnNm + '</div></td>';
sHtml += '<td><div class="txtRegular">' + sAction + '</div></td>';
}
else
{
sHtml += '<td><div class="txtRegular">&#160;</div></td>';
sHtml += '<td><div class="txtRegular">&#160;</div></td>';
}
if ( sIssueTypeCode !="CB" && sIssueTypeCode !="CP" && sSelectAmtTypeValue.charAt(0) == 'P')
sHtml += '<td align="right"><div class="txtRegular">' + formatAmountString(sAmount) + '(' + sPrdNm + ')' + '</div></td>';
else
sHtml += '<td align="right"><div class="txtRegular">' + formatAmountString(sAmount) + '(' + sSelectAmtTypeText + ')' + '</div></td>';
if ( sIssueTypeCode=="CB" || sIssueTypeCode=="CP" )
{
if (sAllowPrice == "True")
{
sHtml += '<td align="right"><div class="txtRegular">' + sPrice + '</div></td>';
}
sHtml += '<td align="right"><div class="txtRegular">' + sCoupon + '</div></td>';
sHtml += '<td align="right"><div class="txtRegular">' + sPremium + '</div></td>';
}
else
{
sHtml += '<td align="right"><div class="txtRegular">' + sPrice + '&#160;'+ sLimitDiscount + '</div></td>';
}
sHtml += '</tr>';
sOldTrnNm = sTrnNm;
bIsCommentOnlyIndication = false;
}
}
}
sHtml += ' </table>';
sHtml += ' </td>';
sHtml += ' <td width="20"></td>';
sHtml += ' </tr>';
sHtml += ' <tr><td colspan="3"><div class="txtRegular">&#160;</div></td></tr>';
if (bIsCommentOnlyIndication)
{
sHtml += ' <tr>';
sHtml += ' <td width="20"></td>';
sHtml += ' <td><span class="txtBold">Only a comment is being submitted for this investor.</span></td>';
sHtml += ' <td width="20"></td>'; 
sHtml += ' </tr>';
sHtml += ' <tr><td colspan="3"><div class="txtRegular">&#160;</div></td></tr>';
}
sHtml += ' </table>';
document.write(sHtml);
}
function SubmitPage()
{
var oForm = self.window.opener.document.frmMain;
if (document.frmMain.hidNavigateFromPage.value == 'SalesWorkSheet')
{
var sAction = document.frmMain.hidAction.value;
var nNumProduct = new Number(self.window.opener.document.frmMain.hidNumProduct.value);
if (nNumProduct == 1)
oForm.action = "javascript:submitPage(document.frmMain, '" + sAction + "'," + "'FROMCOMFIRMATIONPOPUP" + "')";
else
oForm.action = "javascript:PreSubmitPage(document.frmMain, '" + sAction + "'," + "'FROMCOMFIRMATIONPOPUP" + "')";
oForm.submit();
window.close();
}
else
{
var sNavType = document.frmMain.hidNavType.value;
oForm.action = "javascript:submitPage(document.frmMain, '" + sNavType + "')";
oForm.submit();
window.close();
}
} 
function DisplaySalesWorkSheetConfirmation()
{
var sTrnNm = "";
var sOldTrnNm = "";
var sAmount = "";
var sCoupon = "";
var sPremium = "";
var sPrice = "";
var sHtml = "";
var i = 0;
var j = 0;
var frm = self.window.opener.document.frmMain;
var sMarket = frm.elements["hidMarketOrderString"].value;
var sIssueTypeCode = frm.hidIssueTypeCode.value;
var nNumProduct = new Number(frm.hidNumProduct.value);
var sSalePerson = "";
if(frm.hidSalesFN && frm.hidSalesLN) 
sSalePerson = frm.hidSalesFN.value + " " + frm.hidSalesLN.value;
var sInvestor = frm.hidInvestorName.value; 
var sAction = document.frmMain.hidAction.value;
var sAllowPrice = document.frmMain.hidAllowPrice.value;
if (nNumProduct != 1)
sAllowPrice = 'False';
if (sAction == "savechanges" && nNumProduct == 1)
{
sAction = (frm.hidEditInd.value=='True') ? "Update" : "Add";
}
sHtml += ' <table width="100%" cellpadding="0" cellspacing="0" border="0">';
sHtml += ' <tr><td colspan="3"><div class="txtRegular">&#160;</div></td></tr>';
sHtml += ' <tr>';
sHtml += ' <td width="20"></td>';
sHtml += ' <td><span class="txtBold">' + sSalePerson + '</span></td>';
sHtml += ' <td width="20"></td>';
sHtml += ' </tr>';
sHtml += ' <tr>';
sHtml += ' <td width="20"></td>';
sHtml += ' <td><span class="txtBold">Please review your entry for ' + sInvestor + '</span></td>';
sHtml += ' <td width="20"></td>'; 
sHtml += ' </tr>';
sHtml += ' <tr><td colspan="3"><div class="txtRegular">&#160;</div></td></tr>';
sHtml += ' <tr>';
sHtml += ' <td width="20"></td>';
sHtml += ' <td class="resultsTable">';
sHtml += ' <table cellpadding="0" cellspacing="1" width="100%" border="0">';
sHtml += ' <tr class="headerCell">';
sHtml += ' <td align="center"><div class="txtBold">Tranche</div></td>';
sHtml += ' <td align="center"><div class="txtBold">Action</div></td>';
sHtml += ' <td align="center"><div class="txtBold">Amount</div></td>';
if ( sIssueTypeCode=="CB" || sIssueTypeCode=="CP" ) 
{
if (sAllowPrice == "True")
{
sHtml += ' <td align="center"><div class="txtBold">Price (% of Par)</div></td>';
}
sHtml += ' <td align="center"><div class="txtBold">Coupon</div></td>';
sHtml += ' <td align="center"><div class="txtBold">Premium</div></td>';
}
else 
{
if(document.frmMain.hidAllowDiscountFlag.value=="1")
sHtml += ' <td align="center"><div class="txtBold">Limit/Discount</div></td>';
else
sHtml += ' <td align="center"><div class="txtBold">Limit</div></td>';
}	
sHtml += ' </tr>'; 
var bIsCommentOnlyIndication = true;
sTrnNm = frm.elements["hidTrnName"].value;
for (i = 0; i < nNumProduct; i++)
{
var sPrdNm = frm.elements["hidProductName" + String(i)].value;
var sSelectAmtTypeText;
var sSelectAmtTypeValue;
if (nNumProduct == 1)
{
sSelectAmtTypeText = frm.elements["selIndType"].options[frm.elements["selIndType"].selectedIndex].text;
sSelectAmtTypeValue = frm.elements["selIndType"].options[frm.elements["selIndType"].selectedIndex].value;
}
else
{
sSelectAmtTypeText = frm.elements["selAmountType" + String(i)].options[frm.elements["selAmountType" + String(i)].selectedIndex].text;
sSelectAmtTypeValue = frm.elements["selAmountType" + String(i)].options[frm.elements["selAmountType" + String(i)].selectedIndex].value;
sSelectAmtTypeValue = sSelectAmtTypeValue.charAt(0);
}
if (nNumProduct == 1 && (sSelectAmtTypeValue == "C" || sSelectAmtTypeValue == "F"))
{
sSelectAmtTypeText = sSelectAmtTypeText + " - " + frm.elements["selCurrency"].options[frm.elements["selCurrency"].selectedIndex].text;
}
for (j = (i * 5) + 1; j <= ((i + 1) * 5); j++)
{ 
sAmount = frm.elements["iTxtAmount" + String(j)].value;
if ( sIssueTypeCode=="CB" || sIssueTypeCode=="CP" )
{
if ( sAllowPrice == "True")
{
sPrice = frm.elements["curTxtLimitPrice" + String(j)].value;
}
if (nNumProduct == 1)
{
sCoupon = frm.elements["curTxtLimitCoupon" + String(j)].value;
sPremium = frm.elements["curTxtLimitPremium" + String(j)].value;
}
else
{
sCoupon = frm.elements["fltTxtCoupon" + String(j)].value;
sPremium = frm.elements["fltTxtPremium" + String(j)].value;
}
}
else
{
if (nNumProduct == 1)	
sPrice = frm.elements["curTxtLimitCoupon" + String(j)].value;
else
sPrice = frm.elements["fltTxtPrice" + String(j)].value;
}
if (sCoupon == "")
sCoupon = sMarket;
if (sPremium == "")
sPremium = sMarket;
if (sPrice == "")
sPrice = sMarket;
if (sAmount != "")
{
sHtml += '<tr class="resultsRowA">';
if (sOldTrnNm != sTrnNm)
{
sHtml += '<td><div class="txtRegular">' + sTrnNm + '</div></td>';
sHtml += '<td><div class="txtRegular">' + sAction + '</div></td>';
}
else
{
sHtml += '<td><div class="txtRegular">&#160;</div></td>';
sHtml += '<td><div class="txtRegular">&#160;</div></td>';
}
if (sSelectAmtTypeValue== "P")
sHtml += '<td align="right"><div class="txtRegular">' + formatAmountString(sAmount) + ' (' + sPrdNm + ')' + '</div></td>';
else
sHtml += '<td align="right"><div class="txtRegular">' + formatAmountString(sAmount) + ' (' + sSelectAmtTypeText + ')' + '</div></td>';
if ( sIssueTypeCode=="CB" || sIssueTypeCode=="CP" )
{
if (sAllowPrice == "True")
{
sHtml += '<td align="right"><div class="txtRegular">' + sPrice + '</div></td>';
}
sHtml += '<td align="right"><div class="txtRegular">' + sCoupon + '</div></td>';
sHtml += '<td align="right"><div class="txtRegular">' + sPremium + '</div></td>';
}
else
{
var sSelectLimitTypeText;
if (nNumProduct == 1)
{	
sSelectLimitTypeText = frm.elements["selLimitCurrency"].options[frm.elements["selLimitCurrency"].selectedIndex].text;
}
else
{
var s = frm.elements["selLimitDiscount" + String(i)].options[frm.elements["selLimitDiscount" + String(i)].selectedIndex].text;
var idx1 = s.lastIndexOf("(") + 1;
var idx2 = s.lastIndexOf(")");
sSelectLimitTypeText = s.substr(idx1,idx2-idx1);
}
sHtml += '<td align="right"><div class="txtRegular">' + sPrice;
if ( sPrice != sMarket && sSelectLimitTypeText && sSelectLimitTypeText.length>0 )
sHtml += ' (' + sSelectLimitTypeText + ')';
sHtml += '</div></td>';
}
sHtml += '</tr>';
sOldTrnNm = sTrnNm;
bIsCommentOnlyIndication = false;
}
}
}
sHtml += ' </table>';
sHtml += ' </td>';
sHtml += ' <td width="20"></td>';
sHtml += ' </tr>';
sHtml += ' <tr><td colspan="3"><div class="txtRegular">&#160;</div></td></tr>';
if (bIsCommentOnlyIndication)
{
sHtml += ' <tr>';
sHtml += ' <td width="20"></td>';
sHtml += ' <td><span class="txtBold">Only a comment is being submitted for this investor.</span></td>';
sHtml += ' <td width="20"></td>'; 
sHtml += ' </tr>';
sHtml += ' <tr><td colspan="3"><div class="txtRegular">&#160;</div></td></tr>';
}
sHtml += ' </table>';
document.write(sHtml);
} 
