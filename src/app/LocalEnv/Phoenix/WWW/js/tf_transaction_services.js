<!-- 
RSEnableRemoteScripting("/_ScriptLibrary");
var sActiveTab = ""; 
function onPageLoad()
{
menuShow('issuemaint_dealdetails_eq', 'show');
ConfirmRemoteScripting();
RSCallObject_wait(); 
if(document.frmCMAddDocument.hidPeerlistSelectionRS.value != "") 
document.frmCMAddDocument.cbPeerList_RS.value = document.frmCMAddDocument.hidPeerlistSelectionRS.value ;
if(document.frmCMAddDocument.hidPeerlistSelectionDM.value != "") 
document.frmCMAddDocument.cbPeerList_DM.value = document.frmCMAddDocument.hidPeerlistSelectionDM.value ;
if(document.frmCMAddDocument.cbPeerList_RS.value == "DM")
document.frmCMAddDocument.cbPeerList_DM.disabled = true ;
if(document.frmCMAddDocument.cbPeerList_DM.value == "RS")
document.frmCMAddDocument.cbPeerList_RS.disabled = true ;
if(document.frmCMAddDocument.hidDistlistSelectionRS.value != "") 
document.frmCMAddDocument.cbDistList_RS.value = document.frmCMAddDocument.hidDistlistSelectionRS.value ;
if(document.frmCMAddDocument.hidDistlistSelectionDM.value != "") 
document.frmCMAddDocument.cbDistList_DM.value = document.frmCMAddDocument.hidDistlistSelectionDM.value ;
if(document.frmCMAddDocument.hidDistlistSelectionTS.value != "") 
document.frmCMAddDocument.cbDistList_TS.value = document.frmCMAddDocument.hidDistlistSelectionTS.value ;
DisableDistListComboBox("cbDistList_RS", "RS", "cbDistList_DM" , "cbDistList_TS") ;
DisableDistListComboBox("cbDistList_DM", "DM", "cbDistList_RS" , "cbDistList_TS") ;
DisableDistListComboBox("cbDistList_TS", "TS", "cbDistList_RS" , "cbDistList_DM") ;
sTemp = document.frmCMAddDocument.txtSpecialInstr.value ;
sTemp = replaceString('~^', '\r\n', sTemp);
document.frmCMAddDocument.txtSpecialInstr.value = sTemp ;
if (document.frmCMAddDocument.hidPeerSearchMode.value != "")
{
document.frmCMAddDocument.selSearchMode_RS.value = document.frmCMAddDocument.hidPeerSearchMode.value ;
document.frmCMAddDocument.selSearchMode_DM.value = document.frmCMAddDocument.hidPeerSearchMode.value ;
}
else
{
document.frmCMAddDocument.selSearchMode_RS.selectedIndex = 0 ;
document.frmCMAddDocument.selSearchMode_DM.selectedIndex = 0 ;
}
document.frmCMAddDocument.event_type_flg.value = document.frmCMAddDocument.hidEventTypeFlg.value ;
document.frmCMAddDocument.conference_bridge_flg.value = document.frmCMAddDocument.hidConfBridgeFlg.value ;
document.frmCMAddDocument.audience_flg.value = document.frmCMAddDocument.hidAudienceFlg.value ;
InitializeOriginalValues() ;
var sFromCM;
sFromCM = document.frmCMAddDocument.hidFromCM.value ;
if (sFromCM == "1")
{
document.getElementById("chkNetRoadshow").checked = true ;
OnTFOrderNext() ;
ActivateTab("NR") ;
}
}
function CustomValidation( frm, arrFieldsInError )
{
var arrMoreErrors = new Array();
var sMsg ;
var nIndex = -1 ;
if(document.frmCMAddDocument.hidJSAction.value == "MovePeerSelection")
{
sMsg = "You can select a maximum of 11 in the peer list." ;
var arrError = FieldErrorInfo("", "", "", "", sMsg);
arrError[2] = '';
arrMoreErrors[0] = arrError;
}
if(document.frmCMAddDocument.hidJSAction.value == "OnPeerListSearch")
{
if(document.frmCMAddDocument.hidPeerSearchValid.value == "NO" )
{
sMsg = "A minimum of three characters is needed for a company search." ;
var arrError = FieldErrorInfo("", "", "", "", sMsg);
arrError[2] = '';
arrMoreErrors[0] = arrError;
}
}
if(document.frmCMAddDocument.hidJSAction.value == "OnTFOrderNext")
{
if ( (document.getElementById("chkRoadshowProfile").checked == false) &&
(document.getElementById("chkDailyMarketSummary").checked == false) &&
(document.getElementById("chkTransactionSurveillance").checked == false) && 
(document.getElementById("chkNetRoadshow").checked == false) )
{	
sMsg = "No products have been selected yet. Please choose at least one product." ;
var arrError = FieldErrorInfo("", "", "", "", sMsg);
arrError[2] = '';
arrMoreErrors[0] = arrError;
}
}
if(document.frmCMAddDocument.hidJSAction.value == "OnTFOrderDetailNext")
{
bRet = CheckOrderDetails() ;
if(!bRet)
{
sMsg = "Peer List- At least one peer is required for the selected product." ;
var arrError = FieldErrorInfo("", "", "", "", sMsg);
arrError[2] = '';
nIndex = nIndex + 1 ;
arrMoreErrors[nIndex] = arrError;
}
if(document.getElementById("chkRoadshowProfile").checked == false)
{
if( (document.frmCMAddDocument.cbPeerList_DM.value == "RS" ) ||
(document.frmCMAddDocument.cbDistList_DM.value == "RS" ) ||
(document.frmCMAddDocument.cbDistList_TS.value == "RS" ) )
{
sMsg = "The Roadshow Profile Summary Peer/Distribution List cannot be used if the product is not selected." ;
arrError = FieldErrorInfo("", "", "", "", sMsg);
arrError[2] = '';
nIndex = nIndex + 1;
arrMoreErrors[nIndex] = arrError ;
}
}
if(document.getElementById("chkDailyMarketSummary").checked == false)
{
if( (document.frmCMAddDocument.cbPeerList_RS.value == "DM" ) ||
(document.frmCMAddDocument.cbDistList_RS.value == "DM" ) ||
(document.frmCMAddDocument.cbDistList_TS.value == "DM" ) )
{
sMsg = "The Daily Market Summary Peer/Distribution List cannot be used if the product is not selected." ;
arrError = FieldErrorInfo("", "", "", "", sMsg);
arrError[2] = '';
nIndex = nIndex + 1;
arrMoreErrors[nIndex] = arrError ;
}
}
if(document.getElementById("chkTransactionSurveillance").checked == false)
{
if( (document.frmCMAddDocument.cbDistList_RS.value == "TS" ) ||
(document.frmCMAddDocument.cbDistList_DM.value == "TS" ) )
{
sMsg = "The Transaction Surveillance Distribution List cannot be used if the product is not selected." ;
arrError = FieldErrorInfo("", "", "", "", sMsg);
arrError[2] = '';
nIndex = nIndex + 1;
arrMoreErrors[nIndex] = arrError ;
}
}
if(document.getElementById("chkNetRoadshow").checked == true)
{
if (IsValidTime("presentation_hr", "presentation_min") == false)
{
sMsg = "Invalid presentation start time (NetRoadshow)" ;
arrError = FieldErrorInfo("", "", "", "", sMsg);
arrError[2] = '';
nIndex = nIndex + 1;
arrMoreErrors[nIndex] = arrError ;
}
if (IsValidTime("loadin_hr", "loadin_min") == false)
{
sMsg = "Invalid load-in time (NetRoadshow)" ;
arrError = FieldErrorInfo("", "", "", "", sMsg);
arrError[2] = '';
nIndex = nIndex + 1;
arrMoreErrors[nIndex] = arrError ;
}
}
}
return (arrMoreErrors);
} 
function IsValidTime(sHrName, sMinName)
{
var oElem, sValue ;
oElem = document.getElementById(sHrName)
if(oElem)
{
sValue = oElem.value ;
if (sValue != "")
{
if (isInteger(sValue) == false || sValue < 0 || sValue > 12)
{
return false ;
}
}	
}
oElem = document.getElementById(sMinName)
if(oElem)
{
sValue = oElem.value ;
if (sValue != "")
{
if (isInteger(sValue) == false || sValue < 0 || sValue > 60)
{
return false ;
}
}	
}
return true ;
}
function ConfirmRemoteScripting()
{ 
var enabled = false;
context = "Confirm";
co = RSExecute('rs_tf_transaction_services.asp', 'js_RemoteScriptingEnabled', RSShowResult, RSShowError, context);
}
function RSShowResult(co)
{
var frm = document.frmCMAddDocument;
var sRet = co.return_value
switch (co.context)
{
case "Confirm":
if (!sRet)
alert("Remote scripting not enabled");
break;
case "ListAccountContacts":
populateAcctContactSearchResultCombo(frm, sRet);
break;
case "SendEmail":
alert("Sent email to the contact administrator.") ;
break;
}
}
function RSShowError(co)
{
msg = "The following error occurred during the " 
msg = msg + co.context
msg = msg + " remote scripting call:\n"
msg = msg + co.message
alert(msg);
}
function OnTFOrderCancel()
{
var sRet ;
var sFeatures="status:0;dialogHeight: 200px;" ;
sRet = window.showModalDialog("tf_transaction_services_cancel.asp", "", sFeatures) ;
if(sRet == "YES")
{
document.frmCMAddDocument.action = "tf_transaction_services.asp" ;
document.frmCMAddDocument.submit() ;
}
}
function OnTFOrderNext()
{
var oElem, oRow ;
if ( (document.getElementById("chkRoadshowProfile").checked == false) &&
(document.getElementById("chkDailyMarketSummary").checked == false) &&
(document.getElementById("chkTransactionSurveillance").checked == false) && 
(document.getElementById("chkNetRoadshow").checked == false) )
{	
sMsg = "No products have been selected yet. Please choose at least one product." ;
alert(sMsg) ;
return ;
}
if ( (document.getElementById("hidNetroadshowvendorexists").value == "N") &&
(document.getElementById("chkNetRoadshow").checked == true) )
{	
sMsg = "NetRoadshow can be chosen only if the NetRoadshow vendor exists." ;
alert(sMsg) ;
return ;
}
if ( (document.getElementById("hidInetprstothervendor").value == "Y") &&
(document.getElementById("chkNetRoadshow").checked == true) )
{	
sMsg = "Another Internet Presentation Vendor has been selected." ;
alert(sMsg) ;
var oElem, sOTranID ;
oElem = document.getElementById("chkNetRoadshow") ;
if(oElem) oElem.checked = false ;
oElem = document.getElementById("hidTranOrderId") ;
sOTranID = oElem.value ;
if( (sOTranID = "" || sOTranID <= 0) || ( 
(document.getElementById("chkRoadshowProfile").checked == false) && 
(document.getElementById("chkDailyMarketSummary").checked == false) &&
(document.getElementById("chkTransactionSurveillance").checked == false)) )
{
return ;
}
}
var bIntelligenceProductsChosen, bNetRoadshowProductsChosen ;
bIntelligenceProductsChosen = false;
bNetRoadshowProductsChosen = false ;
if ( (document.getElementById("chkRoadshowProfile").checked == true) ||
(document.getElementById("chkDailyMarketSummary").checked == true) ||
(document.getElementById("chkTransactionSurveillance").checked == true) )
{
bIntelligenceProductsChosen = true ;
}
if(document.getElementById("chkNetRoadshow").checked == true) 
{
bNetRoadshowProductsChosen = true ;
}
if( bIntelligenceProductsChosen == true && bNetRoadshowProductsChosen == true)
{
oElem = document.getElementById("divTFDrawOrderTabs") ;
if (oElem) oElem.style.display = "inline" ;
}
if( (bIntelligenceProductsChosen == true) && (sActiveTab == "MI" || sActiveTab == "") )
{
oElem = document.getElementById("divTFOrderDetails") ;
if (oElem) oElem.style.display = "inline" ;
sActiveTab = "MI" ;
}
else
{
oElem = document.getElementById("divTFOrderNetRoadshow") ;
if (oElem) oElem.style.display = "inline" ;
sActiveTab = "NR" ;
}
oElem = document.getElementById("divTFOrderTransaction") ;
if (oElem) oElem.style.display = "none" ;	
oElem = document.getElementById("chkRoadshowProfile") ;
if(oElem.checked)
{
oRow = document.getElementById("trRow1_RS") ;
oRow.style.display = "inline" ;
oRow = document.getElementById("trRow2_RS") ;
oRow.style.display = "inline" ;
}
else
{
oRow = document.getElementById("trRow1_RS") ;
oRow.style.display = "none" ;
oRow = document.getElementById("trRow2_RS") ;
oRow.style.display = "none" ;
if(document.frmCMAddDocument.cbPeerList_DM.value == "RS") document.frmCMAddDocument.cbPeerList_DM.value = 0;
if(document.frmCMAddDocument.cbDistList_DM.value == "RS") document.frmCMAddDocument.cbDistList_DM.value = 0;
if(document.frmCMAddDocument.cbDistList_TS.value == "RS") document.frmCMAddDocument.cbDistList_TS.value = 0;
}
oElem = document.getElementById("chkDailyMarketSummary") ;
if(oElem.checked)
{
oRow = document.getElementById("trRow1_DM") ;
oRow.style.display = "inline" ;
oRow = document.getElementById("trRow2_DM") ;
oRow.style.display = "inline" ;
}
else
{
oRow = document.getElementById("trRow1_DM") ;
oRow.style.display = "none" ;
oRow = document.getElementById("trRow2_DM") ;
oRow.style.display = "none" ;
if(document.frmCMAddDocument.cbPeerList_RS.value == "DM") document.frmCMAddDocument.cbPeerList_RS.value = 0;
if(document.frmCMAddDocument.cbDistList_RS.value == "DM") document.frmCMAddDocument.cbDistList_RS.value = 0;
if(document.frmCMAddDocument.cbDistList_TS.value == "DM") document.frmCMAddDocument.cbDistList_TS.value = 0;
}
oElem = document.getElementById("chkTransactionSurveillance") ;
if(oElem.checked)
{
oRow = document.getElementById("trRow1_TS") ;
oRow.style.display = "inline" ;
}
else
{
oRow = document.getElementById("trRow1_TS") ;
oRow.style.display = "none" ;
if(document.frmCMAddDocument.cbDistList_RS.value == "TS") document.frmCMAddDocument.cbDistList_RS.value = 0;
if(document.frmCMAddDocument.cbDistList_DM.value == "TS") document.frmCMAddDocument.cbDistList_DM.value = 0;
}
OnChangePeerList("RS") ;
OnChangePeerList("DM") ;
OnChangeDistList("RS") ;
OnChangeDistList("DM") ;
OnChangeDistList("TS") ;
}
function OnTFOrderDetailCancel()
{
var sRet ;
var sFeatures="status:0;dialogHeight: 200px;" ;
sRet = window.showModalDialog("tf_transaction_services_cancel.asp", "", sFeatures) ;
if(sRet == "YES")
{
document.frmCMAddDocument.action = "tf_transaction_services.asp" ;
document.frmCMAddDocument.submit() ;
}
}
function OnTFOrderDetailBack()
{
var oElem;
oElem = document.getElementById("divTFDrawOrderTabs") ;
if (oElem) oElem.style.display = "none" ;
oElem = document.getElementById("divTFOrderDetails") ;
if (oElem) oElem.style.display = "none" ;
oElem = document.getElementById("divTFOrderNetRoadshow") ;
if (oElem) oElem.style.display = "none" ;
oElem = document.getElementById("divTFOrderTransaction") ;
if (oElem) oElem.style.display = "inline" ;
}
function OnTFOrderDetailNext()
{
var oElem , lTOrdId, bRet ;
document.frmCMAddDocument.hidJSAction.value = "OnTFOrderDetailNext" ;
if(document.getElementById("chkNetRoadshow").checked == false)
{
document.frmCMAddDocument.rdtStartDate.value = "01/01/1900" ;
document.frmCMAddDocument.rdtEndDate.value = "01/01/1900" ;
}
if (!ValidateForm(document.frmCMAddDocument))
{
return;
}
document.frmCMAddDocument.hidJSAction.value = "" ;
if(document.getElementById("chkNetRoadshow").checked == false)
{
document.frmCMAddDocument.rdtStartDate.value = "" ;
document.frmCMAddDocument.rdtEndDate.value = "" ;
}
oElem = document.getElementById("divTFDrawOrderTabs") ;
if (oElem) oElem.style.display = "none" ;
oElem = document.getElementById("divTFOrderDetails") ;
if (oElem) oElem.style.display = "none" ;
oElem = document.getElementById("divTFOrderNetRoadshow") ;
if (oElem) oElem.style.display = "none" ;
lTOrdId = document.frmCMAddDocument.hidTranOrderId.value ;
if(lTOrdId > 0)
{
ShowConfirmChanges() ;
}
else
{
ShowConfirmOrder() ;
}
}
function OnTFOrderConfirmBack()
{
var bIntelligenceProductsChosen, bNetRoadshowProductsChosen ;
bIntelligenceProductsChosen = false;
bNetRoadshowProductsChosen = false ;
if ( (document.getElementById("chkRoadshowProfile").checked == true) ||
(document.getElementById("chkDailyMarketSummary").checked == true) ||
(document.getElementById("chkTransactionSurveillance").checked == true) )
{
bIntelligenceProductsChosen = true ;
}
if(document.getElementById("chkNetRoadshow").checked == true) 
{
bNetRoadshowProductsChosen = true ;
}
if( bIntelligenceProductsChosen == true && bNetRoadshowProductsChosen == true)
{
oElem = document.getElementById("divTFDrawOrderTabs") ;
if (oElem) oElem.style.display = "inline" ;
}
if( sActiveTab == "MI")
{
oElem = document.getElementById("divTFOrderDetails") ;
if (oElem) oElem.style.display = "inline" ;
}
else
{
oElem = document.getElementById("divTFOrderNetRoadshow") ;
if (oElem) oElem.style.display = "inline" ;
}
oElem = document.getElementById("divTFOrderConfirm") ;
if (oElem) oElem.style.display = "none" ;
}
function OnTFOrderConfirm()
{
var i, sTemp ;
var oElem ;
document.frmCMAddDocument.hidAction.value = "Add" ;
sTemp = "" ;
for(i = 0 ; i < document.frmCMAddDocument.selPeerListCurrent_RS.options.length ; i++)
{
sTemp = sTemp + document.frmCMAddDocument.selPeerListCurrent_RS.options[i].value ;
sTemp = sTemp + "~" ;
}
document.frmCMAddDocument.hidselPeerListCurrent_RS.value = sTemp ;
sTemp = "" ;
for(i = 0 ; i < document.frmCMAddDocument.selPeerListCurrent_DM.options.length ; i++)
{
sTemp = sTemp + document.frmCMAddDocument.selPeerListCurrent_DM.options[i].value ;
sTemp = sTemp + "~" ;
}
document.frmCMAddDocument.hidselPeerListCurrent_DM.value = sTemp ;
sTemp = "" ;
for(i = 0 ; i < document.frmCMAddDocument.selIndustries.options.length ; i++)
{
if(document.frmCMAddDocument.selIndustries.options[i].selected == true)
{
sTemp = sTemp + document.frmCMAddDocument.selIndustries.options[i].value ;
sTemp = sTemp + "~" ;
}
}
document.frmCMAddDocument.hidselIndustries.value = sTemp ;
sTemp = document.frmCMAddDocument.txtSpecialInstr.value ;
sTemp = replaceString('\r\n','~^', sTemp)
document.frmCMAddDocument.txtSpecialInstr.value = sTemp ;
document.frmCMAddDocument.submit() ;
}
function OnTFOrderConfirmCancel()
{
var sRet ;
var sFeatures="status:0;dialogHeight: 200px;" ;
sRet = window.showModalDialog("tf_transaction_services_cancel.asp", "", sFeatures) ;
if(sRet == "YES")
{
document.frmCMAddDocument.action = "tf_transaction_services.asp" ;
document.frmCMAddDocument.submit() ;
}
}
function OnTFOrderChangeBack()
{
var bIntelligenceProductsChosen, bNetRoadshowProductsChosen ;
bIntelligenceProductsChosen = false;
bNetRoadshowProductsChosen = false ;
if ( (document.getElementById("chkRoadshowProfile").checked == true) ||
(document.getElementById("chkDailyMarketSummary").checked == true) ||
(document.getElementById("chkTransactionSurveillance").checked == true) )
{
bIntelligenceProductsChosen = true ;
}
if(document.getElementById("chkNetRoadshow").checked == true) 
{
bNetRoadshowProductsChosen = true ;
}
if( bIntelligenceProductsChosen == true && bNetRoadshowProductsChosen == true)
{
oElem = document.getElementById("divTFDrawOrderTabs") ;
if (oElem) oElem.style.display = "inline" ;
}
if( sActiveTab == "MI")
{
oElem = document.getElementById("divTFOrderDetails") ;
if (oElem) oElem.style.display = "inline" ;
}
else
{
oElem = document.getElementById("divTFOrderNetRoadshow") ;
if (oElem) oElem.style.display = "inline" ;
}
oElem = document.getElementById("divTFOrderChange") ;
if (oElem) oElem.style.display = "none" ;
}
function OnTFChangeConfirm()
{
var i ;
var sTemp;
document.frmCMAddDocument.hidAction.value = "Update" ;
sTemp = "" ;
for(i = 0 ; i < document.frmCMAddDocument.selPeerListCurrent_RS.options.length ; i++)
{
sTemp = sTemp + document.frmCMAddDocument.selPeerListCurrent_RS.options[i].value;
sTemp = sTemp + "~" ;
}
document.frmCMAddDocument.hidselPeerListCurrent_RS.value = sTemp ;
sTemp = "" ;
for(i = 0 ; i < document.frmCMAddDocument.selPeerListCurrent_DM.options.length ; i++)
{
sTemp = sTemp + document.frmCMAddDocument.selPeerListCurrent_DM.options[i].value ;
sTemp = sTemp + "~" ;
}
document.frmCMAddDocument.hidselPeerListCurrent_DM.value = sTemp ;
document.frmCMAddDocument.hidselIndustries.value = "" ;
sTemp = "" ;
var oElem = document.getElementById("selIndustries") ;
for(i = 0 ; i < oElem.options.length ; i++)
{
if(oElem.options[i].selected)
{
sTemp = sTemp + oElem.options[i].value ;
sTemp = sTemp + "~" ;
}
}
document.frmCMAddDocument.hidselIndustries.value = sTemp;
sTemp = document.frmCMAddDocument.txtSpecialInstr.value ;
sTemp = replaceString('\r\n','~^', sTemp)
document.frmCMAddDocument.txtSpecialInstr.value = sTemp ;
document.frmCMAddDocument.submit() ;
}
function OnTFOrderChangeCancel()
{
var sRet ;
var sFeatures="status:0;dialogHeight: 200px;" ;
sRet = window.showModalDialog("tf_transaction_services_cancel.asp", "", sFeatures) ;
if(sRet == "YES")
{
document.frmCMAddDocument.action = "tf_transaction_services.asp" ;
document.frmCMAddDocument.submit() ;
}
}
function OnChangePeerList(sPeerListType)
{
var oElem, sVal, sDisplay ;
sDisplay = "none";
if(sPeerListType == "RS")
{
oElem = document.getElementById("cbPeerList_RS") ;
sVal = oElem.options(oElem.selectedIndex).value ;
if (sVal == "0") sDisplay = "inline";
oElem = document.getElementById("trPeerList1_RS") ;
oElem.style.display = sDisplay;
oElem = document.getElementById("trPeerList2_RS") ;
oElem.style.display = sDisplay ;
oElem = document.getElementById("cbPeerList_DM") ;
if (sVal == "DM")
{
oElem.disabled = true ;
}
else
{
oElem.disabled = false ;
}
}
else if (sPeerListType == "DM")
{
oElem = document.getElementById("cbPeerList_DM") ;
sVal = oElem.options(oElem.selectedIndex).value ;
if (sVal == "0") sDisplay = "inline";
oElem = document.getElementById("trPeerList1_DM") ;
oElem.style.display = sDisplay;
oElem = document.getElementById("trPeerList2_DM") ;
oElem.style.display = sDisplay ;
oElem = document.getElementById("cbPeerList_RS") ;
if (sVal == "RS")
{
oElem.disabled = true ;
}
else
{
oElem.disabled = false ;
}
}
}
function OnChangeDistList(sDistListType)
{
var oElem, sVal, sDisplay ;
var sDistList, sDistRow ;
var oElem1, oElem2 ;
sDisplay = "none";
if(sDistListType == "RS")
{
oElem = document.getElementById("cbDistList_RS") ;
sVal = oElem.options(oElem.selectedIndex).value ;
if (sVal == "0") sDisplay = "inline";
oElem = document.getElementById("trDistList_RS") ;
oElem.style.display = sDisplay;
}
else if(sDistListType == "DM")
{
oElem = document.getElementById("cbDistList_DM") ;
sVal = oElem.options(oElem.selectedIndex).value ;
if (sVal == "0") sDisplay = "inline";
oElem = document.getElementById("trDistList_DM") ;
oElem.style.display = sDisplay;
}
else if(sDistListType == "TS")
{
oElem = document.getElementById("cbDistList_TS") ;
sVal = oElem.options(oElem.selectedIndex).value ;
if (sVal == "0") sDisplay = "inline";
oElem = document.getElementById("trDistList_TS") ;
oElem.style.display = sDisplay;
}
DisableDistListComboBox("cbDistList_RS", "RS", "cbDistList_DM" , "cbDistList_TS") ;
DisableDistListComboBox("cbDistList_DM", "DM", "cbDistList_RS" , "cbDistList_TS") ;
DisableDistListComboBox("cbDistList_TS", "TS", "cbDistList_RS" , "cbDistList_DM") ;
}
function DisableDistListComboBox(sTargetCombo, sVal, sCombo1, sCombo2)
{
var oElem1 , oElem2, sVal1, sVal2 ;
var oElem, bDisabled ;
oElem1 = document.getElementById(sCombo1) ;
sVal1 = oElem1.options(oElem1.selectedIndex).value ;
oElem2 = document.getElementById(sCombo2) ;
sVal2 = oElem2.options(oElem2.selectedIndex).value ;
bDisabled = false ;
if ( (sVal1 == sVal) || (sVal2 == sVal) )
{
bDisabled = true ;
}
oElem = document.getElementById(sTargetCombo) ;
oElem.disabled = bDisabled;
}
function OnPeerListKeyPress(txtPeerList, selPeerListSearch, selMode)
{
if (window.event.keyCode == 13)
{
OnPeerListSearch(txtPeerList, selPeerListSearch, selMode) ;
}
}
function OnPeerListSearch(txtPeerList, selPeerListSearch, selMode)
{
var oElem, sSearchString, sMode;
oElem = document.getElementById(selMode) ;
sMode = oElem.value ;
document.frmCMAddDocument.hidPeerSearchValid.value = "YES" ;
oElem = document.getElementById(txtPeerList) ;
sSearchString = oElem.value;
if (sSearchString.length == 0 ) return ;
if(sSearchString.length < 3 && sMode == "N") 
{
document.frmCMAddDocument.hidJSAction.value = "OnPeerListSearch" ;
document.frmCMAddDocument.hidPeerSearchValid.value = "NO" ;
ValidateForm(document.frmCMAddDocument) ;
return ;
}
var co; 
co = RSExecute('rs_tf_transaction_services.asp', 'js_ListPeersByName', sSearchString, sMode);
var strData = co.return_value;
var cbElement, sName, sValue
cbElement = document.getElementById(selPeerListSearch) ;
if(cbElement)
cbElement.options.length = 0;
if (strData && strData != "")
{
aryRecords = strData.split("\t");
for (i=0; i < aryRecords.length-1; i++)
{
aryData = aryRecords[i].split("\b");
sValue = aryData[0] ;
sName = aryData[1] ;
if (aryData[2] != '')
{
sName = sName + " - (" ;
sName = sName + aryData[2] ;
sName = sName + ")" ;
}
cbElement.options[cbElement.options.length]= new Option(sName, sValue);
}
} 
else
{
cbElement.options[cbElement.options.length]= new Option("No results found.", "0");
}
}
function RemovePeerSelection(from) 
{
for (var i=(from.options.length-1); i>=0; i--) 
{
var o = from.options[i];
if (o.selected) {
from.options[i] = null;
}
}
from.selectedIndex = -1;
}
function MovePeerSelection(from,to, bDelFomSource, bCheckForMaxItems) 
{
var nLength, sTemp;
nLength = from.options.length ;
if(nLength == 1)
{
if(from.options[0].value == "0" )
{
return;
}
}
if(bCheckForMaxItems)
{
nLength = to.options.length ;
for (var i=0; i<from.options.length; i++) 
{
var o = from.options[i];
if ((o.selected) && (cbValueExists(to, o.value ) == 0) )
{
nLength = nLength + 1;
}
}
if (nLength > 11 )
{
document.frmCMAddDocument.hidJSAction.value = "MovePeerSelection" ;
ValidateForm(document.frmCMAddDocument) ;
return ;
}
}
for (var i=0; i<from.options.length; i++) 
{
var o = from.options[i];
if ((o.selected) && (cbValueExists(to, o.value ) == 0) )
{
to.options[to.options.length] = new Option( o.text, o.value, false, false);
}
}
if(bDelFomSource == true)
{
for (var i=(from.options.length-1); i>=0; i--) 
{
var o = from.options[i];
if (o.selected) {
from.options[i] = null;
}
}
}
sortSelect(from);
sortSelect(to);	
from.selectedIndex = -1;
to.selectedIndex = -1; 
}
function cbValueExists(cbBox, txtVal)
{
var nRet;
nRet = 0 ;
for (var i=0; i <cbBox.options.length; i++) 
{
var o = cbBox.options[i];
if (o.value == txtVal) 
{
nRet = 1;
}
}
return nRet;
}
function sortSelect(obj) 
{
var o = new Array();
if (obj.options==null) { return; }
for (var i=0; i<obj.options.length; i++) 
{
o[o.length] = new Option( obj.options[i].text, obj.options[i].value, obj.options[i].defaultSelected, obj.options[i].selected) ;
}
if (o.length==0) { return; }
o = o.sort( 
function(a,b) { 
if ((a.text+"") < (b.text+"")) { return -1; }
if ((a.text+"") > (b.text+"")) { return 1; }
return 0;
} 
);
for (var i=0; i<o.length; i++) 
{
obj.options[i] = new Option(o[i].text, o[i].value, o[i].defaultSelected, o[i].selected);
}
}
function ShowSample(sSample)
{
var sDataFormat, sLanguage;
sDataFormat = document.frmCMAddDocument.hidUserDataFormat.value ;
sLanguage = document.frmCMAddDocument.hidUserLanguage.value ;
if ((sDataFormat == "2057") || (sLanguage == "UK") )
{
if(sSample == "ROADSHOWPROFILE")
{
window.open("/help/pdf/RoadshowProfileSampleUK.pdf") ;
}
else if(sSample == "DAILYMARKET")
{
window.open("/help/pdf/DMSSampleUK.pdf") ;
}
else if(sSample == "SURVEILLANCE")
{
window.open("/help/pdf/TransactionSurveillanceUK.pdf") ;
}
}
else
{
if(sSample == "ROADSHOWPROFILE")
{
window.open("/help/pdf/RoadshowProfileSample.pdf") ;
}
else if(sSample == "DAILYMARKET")
{
window.open("/help/pdf/DMSSample.pdf") ;
}
else if(sSample == "SURVEILLANCE")
{
window.open("/help/pdf/TransactionSurveillance.pdf") ;
}
else if(sSample == "DTCINSTRUCTIONS")
{
window.open("/help/pdf/DTCInstructions.doc") ;
}
}
}
function CheckOrderDetails()
{
var oElem
if(document.getElementById("chkRoadshowProfile").checked == true) 
{	
oElem = document.getElementById("cbPeerList_RS") ;
if( (oElem.value != "DM") && (document.frmCMAddDocument.selPeerListCurrent_RS.options.length == 0) )
{
return false;
}
}
if(document.getElementById("chkDailyMarketSummary").checked == true) 
{	
oElem = document.getElementById("cbPeerList_DM") ;
if( (oElem.value != "RS") && (document.frmCMAddDocument.selPeerListCurrent_DM.options.length == 0) )
{
return false;
}
}
return true
}
function ShowConfirmOrder()
{
var oElem, sTemp ;
oElem = document.getElementById("divTFOrderConfirm") ;
if (oElem) oElem.style.display = "inline" ;
var sDisplay;
sDisplay = "none" ;
if(document.getElementById("chkRoadshowProfile").checked == true) sDisplay = "inline" ;
oElem = document.getElementById("trRoadshowProfileConfirm") ;
oElem.style.display = sDisplay;
sDisplay = "none" ;
if(document.getElementById("chkDailyMarketSummary").checked == true) sDisplay = "inline" ;
oElem = document.getElementById("trDailyMarketSummaryConfirm") ;
oElem.style.display = sDisplay;
sDisplay = "none" ;
if(document.getElementById("chkTransactionSurveillance").checked == true) sDisplay = "inline" ;
oElem = document.getElementById("trTransactionSurveillanceConfirm") ;
oElem.style.display = sDisplay;
sDisplay = "none" ;
if(document.getElementById("chkNetRoadshow").checked == true) sDisplay = "inline" ;
oElem = document.getElementById("trNetRoadshowConfirm") ;
oElem.style.display = sDisplay;
oElem = document.getElementById("hidMarketIntelligenceEmail") ;
if ((document.getElementById("chkRoadshowProfile").checked == true) ||
(document.getElementById("chkDailyMarketSummary").checked == true) ||
(document.getElementById("chkTransactionSurveillance").checked == true) )
{
if (oElem) oElem.value = "Y" ;
}
else
{
if (oElem) oElem.value = "N" ;
}
oElem = document.getElementById("hidNetRoadshowEmail") ;
if (document.getElementById("chkNetRoadshow").checked == true )
{
if (oElem) oElem.value = "Y" ;
}
else
{
if (oElem) oElem.value = "N" ;
}
}
function ShowConfirmChanges()
{
var sTemp , bModified, bNRModified;
bModified = false ;
bNRModified = false ;
oElem = document.getElementById("divTFOrderChange") ;
if (oElem) oElem.style.display = "inline" ;
oElem = document.getElementById("trTFOrderChange_No_Changes") ;
if (oElem) oElem.style.display = "none" ;
oElem = document.getElementById("trTFOrderChange_Del_RS") ;
oElem.style.display = "none"
oElem = document.getElementById("trTFOrderChange_RS") ;
oElem.style.display = "none" ;
oElem = document.getElementById("divTFOrderChange_PL_RS") ;
oElem.style.display = "none" ;
oElem = document.getElementById("divTFOrderChange_DL_RS") ;
oElem.style.display = "none" ;
oElem = document.getElementById("trTFOrderChange_Del_DM") ;
oElem.style.display = "none"
oElem = document.getElementById("trTFOrderChange_DM") ;
oElem.style.display = "none" ;
oElem = document.getElementById("divTFOrderChange_PL_DM") ;
oElem.style.display = "none" ;
oElem = document.getElementById("divTFOrderChange_DL_DM") ;
oElem.style.display = "none" ;
oElem = document.getElementById("trTFOrderChange_Del_TS") ;
oElem.style.display = "none"
oElem = document.getElementById("trTFOrderChange_TS") ;
oElem.style.display = "none" ;
oElem = document.getElementById("divTFOrderChange_DL_TS") ;
oElem.style.display = "none" ;
oElem = document.getElementById("trTFOrderChange_Industry") ;
oElem.style.display = "none" ;
oElem = document.getElementById("trTFOrderChange_Logo") ;
oElem.style.display = "none" ;
oElem = document.getElementById("trTFOrderChange_SPInstr") ;
oElem.style.display = "none" ;
oElem = document.getElementById("trTFOrderChange_NR") ;
oElem.style.display = "none" ;
if((document.frmCMAddDocument.chkRoadshowProfile.checked == false)
&& (document.frmCMAddDocument.hidchkRoadshowProfile_orig.value == "true") )
{
oElem = document.getElementById("trTFOrderChange_Del_RS") ;
oElem.style.display = "block"
bModified = true ;
}
if ( (document.frmCMAddDocument.hidselPeerListCurrent_RS_orig.value != GetListBoxTextValues("selPeerListCurrent_RS", false) )
|| (document.frmCMAddDocument.hidcbPeerList_RS_orig.value != document.frmCMAddDocument.cbPeerList_RS.value) )
{
oElem = document.getElementById("trTFOrderChange_RS") ;
oElem.style.display = "block" ;
oElem = document.getElementById("divTFOrderChange_PL_RS") ;
oElem.style.display = "block" ;
bModified = true ;
}
if ( (document.frmCMAddDocument.hidtxtDistList_RS_orig.value != document.frmCMAddDocument.txtDistList_RS.value) 
|| (document.frmCMAddDocument.hidcbDistList_RS_orig.value != document.frmCMAddDocument.cbDistList_RS.value) )
{
oElem = document.getElementById("trTFOrderChange_RS") ;
oElem.style.display = "block" ; 
oElem = document.getElementById("divTFOrderChange_DL_RS") ;
oElem.style.display = "block" ; 
bModified = true ;
}
if((document.frmCMAddDocument.chkDailyMarketSummary.checked == false)
&& (document.frmCMAddDocument.hidchkDailyMarketSummary_orig.value == "true") )
{
oElem = document.getElementById("trTFOrderChange_Del_DM") ;
oElem.style.display = "block";
bModified = true ;
}
if ( (document.frmCMAddDocument.hidselPeerListCurrent_DM_orig.value != GetListBoxTextValues("selPeerListCurrent_DM", false) )
|| (document.frmCMAddDocument.hidcbPeerList_DM_orig.value != document.frmCMAddDocument.cbPeerList_DM.value) )
{
oElem = document.getElementById("trTFOrderChange_DM") ;
oElem.style.display = "block" ;
oElem = document.getElementById("divTFOrderChange_PL_DM") ;
oElem.style.display = "block" ;
bModified = true ;
}
if ( (document.frmCMAddDocument.hidtxtDistList_DM_orig.value != document.frmCMAddDocument.txtDistList_DM.value) 
|| (document.frmCMAddDocument.hidcbDistList_DM_orig.value != document.frmCMAddDocument.cbDistList_DM.value) )
{
oElem = document.getElementById("trTFOrderChange_DM") ;
oElem.style.display = "block" ;
oElem = document.getElementById("divTFOrderChange_DL_DM") ;
oElem.style.display = "block" ;
bModified = true ;
}
if((document.frmCMAddDocument.chkTransactionSurveillance.checked == false)
&& (document.frmCMAddDocument.hidchkTransactionSurveillance_orig.value == "true") )
{
oElem = document.getElementById("trTFOrderChange_Del_TS") ;
oElem.style.display = "block"
bModified = true ;
}
if((document.frmCMAddDocument.chkTransactionSurveillance.checked == true)
&& (document.frmCMAddDocument.hidchkTransactionSurveillance_orig.value == "false") )
{
oElem = document.getElementById("trTFOrderChange_TS") ;
oElem.style.display = "block" ;
bModified = true ;
}
if ( (document.frmCMAddDocument.hidtxtDistList_TS_orig.value != document.frmCMAddDocument.txtDistList_TS.value) 
|| (document.frmCMAddDocument.hidcbDistList_TS_orig.value != document.frmCMAddDocument.cbDistList_TS.value) )
{
oElem = document.getElementById("trTFOrderChange_TS") ;
oElem.style.display = "block" ;
oElem = document.getElementById("divTFOrderChange_DL_TS") ;
oElem.style.display = "block" ; 
bModified = true ;
}
if (document.frmCMAddDocument.hidselIndustries_orig.value != document.frmCMAddDocument.selIndustries.value )
{
oElem = document.getElementById("trTFOrderChange_Industry") ;
oElem.style.display = "block" ;
bModified = true ;
}
if(document.frmCMAddDocument.sDocumentName.value != "")
{
oElem = document.getElementById("trTFOrderChange_Logo") ;
oElem.style.display = "block" ;
bModified = true ;
}
if (document.frmCMAddDocument.txtSpecialInstr.value != document.frmCMAddDocument.txtSpecialInstr_orig.value )
{
oElem = document.getElementById("trTFOrderChange_SPInstr") ;
oElem.style.display = "block" ;
bModified = true ;
}
oElem = document.getElementById("hidMarketIntelligenceEmail") ;
if ( bModified == true && (
(document.getElementById("chkRoadshowProfile").checked == true) ||
(document.getElementById("chkDailyMarketSummary").checked == true) ||
(document.getElementById("chkTransactionSurveillance").checked == true)) )
{
if (oElem) oElem.value = "Y" ;
}
else
{
if (oElem) oElem.value = "N" ;
}
if((document.frmCMAddDocument.chkNetRoadshow.checked == false)
&& (document.frmCMAddDocument.hidchkNetRoadshow_orig.value == "true") )
{
oElem = document.getElementById("trTFOrderChange_NR") ;
if (oElem) oElem.style.display = "block" ;
oElem = document.getElementById("tdTFOrderChange_NR") ;
if(oElem)
{
oElem.innerHTML = "<div>Deleted</div>" ;
}
bNRModified = true ;
}
else
{
var sErrMsg = "" ;
if(document.frmCMAddDocument.hiddealcaptain_nm_orig.value != document.frmCMAddDocument.dealcaptain_nm.value)
sErrMsg = sErrMsg + "<div>Deal Captain Name</div>" ;
if(document.frmCMAddDocument.hiddealcaptain_phone_no_orig.value != document.frmCMAddDocument.dealcaptain_phone_no.value ||
document.frmCMAddDocument.hiddealcaptain_phone_no2_orig.value != document.frmCMAddDocument.dealcaptain_phone_no2.value )
sErrMsg = sErrMsg + "<div>Deal Captain Phone</div>" ;
if(document.frmCMAddDocument.hiddealcaptain_email_addr_orig.value != document.frmCMAddDocument.dealcaptain_email_addr.value )
sErrMsg = sErrMsg + "<div>Deal Captain Email</div>" ;
if(document.frmCMAddDocument.prospectus_doc.value != "")
sErrMsg = sErrMsg + "<div>Prospectus</div>" ;
if(document.frmCMAddDocument.presentation_doc.value != "")
sErrMsg = sErrMsg + "<div>Presentation</div>" ;
if(document.frmCMAddDocument.hidcall_phone_no_orig.value != document.frmCMAddDocument.call_phone_no.value ||
document.frmCMAddDocument.hidcall_phone_no2_orig.value != document.frmCMAddDocument.call_phone_no2.value )
sErrMsg = sErrMsg + "<div>Call Information</div>" ;
if(document.frmCMAddDocument.hidstr_nm_orig.value != document.frmCMAddDocument.str_nm.value )
sErrMsg = sErrMsg + "<div>Address</div>" ;
if(document.frmCMAddDocument.hidstr_nm2_orig.value != document.frmCMAddDocument.str_nm2.value )
sErrMsg = sErrMsg + "<div>Address2</div>" ;
if(document.frmCMAddDocument.hidstr_nm3_orig.value != document.frmCMAddDocument.str_nm3.value )
sErrMsg = sErrMsg + "<div>Address3</div>" ;
if(document.frmCMAddDocument.hidcity_nm_orig.value != document.frmCMAddDocument.city_nm.value )
sErrMsg = sErrMsg + "<div>City</div>" ;
if(document.frmCMAddDocument.hidst_nm_orig.value != document.frmCMAddDocument.st_nm.value )
sErrMsg = sErrMsg + "<div>State</div>" ;
if(document.frmCMAddDocument.hidzip_cd_orig.value != document.frmCMAddDocument.zip_cd.value ||
document.frmCMAddDocument.hidzip_cd2_orig.value != document.frmCMAddDocument.zip_cd2.value)
sErrMsg = sErrMsg + "<div>Zip</div>" ;
if(document.frmCMAddDocument.hidcntry_nm_orig.value != document.frmCMAddDocument.cntry_nm.value)
sErrMsg = sErrMsg + "<div>Country</div>" ;
if(document.frmCMAddDocument.hiddtpresentation_date_orig.value != document.frmCMAddDocument.dtPresentation_date.value)
sErrMsg = sErrMsg + "<div>Presentation Date</div>" ;
if(document.frmCMAddDocument.hidpresentation_hr_orig.value != document.frmCMAddDocument.presentation_hr.value ||
document.frmCMAddDocument.hidpresentation_min_orig.value != document.frmCMAddDocument.presentation_min.value ||
document.frmCMAddDocument.hidpresentation_AMPM_orig.value != document.frmCMAddDocument.presentation_AMPM.value )
sErrMsg = sErrMsg + "<div>Presentation Start Time</div>" ;
if(document.frmCMAddDocument.hidloadin_hr_orig.value != document.frmCMAddDocument.loadin_hr.value ||
document.frmCMAddDocument.hidloadin_min_orig.value != document.frmCMAddDocument.loadin_min.value ||
document.frmCMAddDocument.hidloadin_AMPM_orig.value != document.frmCMAddDocument.loadin_AMPM.value )
sErrMsg = sErrMsg + "<div>Load-In Time</div>" ;
if(document.frmCMAddDocument.hidcontact_nm_orig.value != document.frmCMAddDocument.contact_nm.value )
sErrMsg = sErrMsg + "<div>Location Contact Name</div>" ;
if(document.frmCMAddDocument.hidcontact_phone_no_orig.value != document.frmCMAddDocument.contact_phone_no.value ||
document.frmCMAddDocument.hidcontact_phone_no2_orig.value != document.frmCMAddDocument.contact_phone_no2.value )
sErrMsg = sErrMsg + "<div>Location Contact Phone</div>" ;
if(document.frmCMAddDocument.hidevent_type_flg_orig.value != document.frmCMAddDocument.event_type_flg.value )
sErrMsg = sErrMsg + "<div>Event Type</div>" ;
if(document.frmCMAddDocument.hidconference_bridge_flg_orig.value != document.frmCMAddDocument.conference_bridge_flg.value )
sErrMsg = sErrMsg + "<div>Conference Bridge</div>" ;
if( document.frmCMAddDocument.hidnum_speakers_orig.value != document.frmCMAddDocument.num_speakers.value )
sErrMsg = sErrMsg + "<div>Number of Speakers</div>" ;
if(document.frmCMAddDocument.hidaudience_flg_orig.value != document.frmCMAddDocument.audience_flg.value )
sErrMsg = sErrMsg + "<div>Audience</div>" ;
if(document.frmCMAddDocument.hidtxtNRInstructions_orig.value != document.frmCMAddDocument.txtNRInstructions.value )
sErrMsg = sErrMsg + "<div>Instructions</div>" ;
if(document.frmCMAddDocument.hidrdtStartDate_orig.value != document.frmCMAddDocument.rdtStartDate.value )
sErrMsg = sErrMsg + "<div>Start Date</div>" ;
if(document.frmCMAddDocument.hidrdtEndDate_orig.value != document.frmCMAddDocument.rdtEndDate.value )
sErrMsg = sErrMsg + "<div>End Date</div>" ;
if(sErrMsg != "") 
{
oElem = document.getElementById("trTFOrderChange_NR") ;
if (oElem) oElem.style.display = "block" ;
oElem = document.getElementById("tdTFOrderChange_NR") ;
if(oElem)
{
oElem.innerHTML = sErrMsg ;
}
bNRModified = true ;
}
}
oElem = document.getElementById("hidNetRoadshowEmail") ;
if (bNRModified == true && document.getElementById("chkNetRoadshow").checked == true )
{
if (oElem) oElem.value = "Y" ;
}
else
{
if (oElem) oElem.value = "N" ;
}
if(bModified == false && bNRModified == false)
{
oElem = document.getElementById("trTFOrderChange_No_Changes") ;
if (oElem) oElem.style.display = "block" ;
}
}
function InitializeOriginalValues()
{
var oElem, i ;
document.frmCMAddDocument.hidchkRoadshowProfile_orig.value = document.frmCMAddDocument.chkRoadshowProfile.checked ;
document.frmCMAddDocument.hidchkDailyMarketSummary_orig.value = document.frmCMAddDocument.chkDailyMarketSummary.checked ;
document.frmCMAddDocument.hidchkTransactionSurveillance_orig.value = document.frmCMAddDocument.chkTransactionSurveillance.checked ;
document.frmCMAddDocument.hidchkNetRoadshow_orig.value = document.frmCMAddDocument.chkNetRoadshow.checked ;
document.frmCMAddDocument.hidselPeerListCurrent_RS_orig.value = GetListBoxTextValues("selPeerListCurrent_RS", false) ;
document.frmCMAddDocument.hidcbPeerList_RS_orig.value = document.frmCMAddDocument.cbPeerList_RS.value ;
document.frmCMAddDocument.hidselPeerListCurrent_DM_orig.value = GetListBoxTextValues("selPeerListCurrent_DM", false) ;
document.frmCMAddDocument.hidcbPeerList_DM_orig.value = document.frmCMAddDocument.cbPeerList_DM.value ;
document.frmCMAddDocument.hidtxtDistList_RS_orig.value = document.frmCMAddDocument.txtDistList_RS.value ;
document.frmCMAddDocument.hidcbDistList_RS_orig.value = document.frmCMAddDocument.cbDistList_RS.value ;
document.frmCMAddDocument.hidtxtDistList_DM_orig.value = document.frmCMAddDocument.txtDistList_DM.value ;
document.frmCMAddDocument.hidcbDistList_DM_orig.value = document.frmCMAddDocument.cbDistList_DM.value ;
document.frmCMAddDocument.hidtxtDistList_TS_orig.value = document.frmCMAddDocument.txtDistList_TS.value ;
document.frmCMAddDocument.hidcbDistList_TS_orig.value = document.frmCMAddDocument.cbDistList_TS.value ;
document.frmCMAddDocument.hidselIndustries_orig.value = document.frmCMAddDocument.selIndustries.value ;
document.frmCMAddDocument.txtSpecialInstr_orig.value = document.frmCMAddDocument.txtSpecialInstr.value ;
document.frmCMAddDocument.hiddealcaptain_nm_orig.value = document.frmCMAddDocument.dealcaptain_nm.value ;
document.frmCMAddDocument.hiddealcaptain_phone_no_orig.value = document.frmCMAddDocument.dealcaptain_phone_no.value ;
document.frmCMAddDocument.hiddealcaptain_phone_no2_orig.value = document.frmCMAddDocument.dealcaptain_phone_no2.value ;
document.frmCMAddDocument.hiddealcaptain_email_addr_orig.value = document.frmCMAddDocument.dealcaptain_email_addr.value ;
document.frmCMAddDocument.hidcall_phone_no_orig.value = document.frmCMAddDocument.call_phone_no.value ;
document.frmCMAddDocument.hidcall_phone_no2_orig.value = document.frmCMAddDocument.call_phone_no2.value ;
document.frmCMAddDocument.hidstr_nm_orig.value = document.frmCMAddDocument.str_nm.value ;
document.frmCMAddDocument.hidstr_nm2_orig.value = document.frmCMAddDocument.str_nm2.value ;
document.frmCMAddDocument.hidstr_nm3_orig.value = document.frmCMAddDocument.str_nm3.value ;
document.frmCMAddDocument.hidcity_nm_orig.value = document.frmCMAddDocument.city_nm.value ;
document.frmCMAddDocument.hidst_nm_orig.value = document.frmCMAddDocument.st_nm.value ;
document.frmCMAddDocument.hidzip_cd_orig.value = document.frmCMAddDocument.zip_cd.value ;
document.frmCMAddDocument.hidzip_cd2_orig.value = document.frmCMAddDocument.zip_cd2.value ;
document.frmCMAddDocument.hidcntry_nm_orig.value = document.frmCMAddDocument.cntry_nm.value ;
document.frmCMAddDocument.hidpresentation_hr_orig.value = document.frmCMAddDocument.presentation_hr.value ;
document.frmCMAddDocument.hidpresentation_min_orig.value = document.frmCMAddDocument.presentation_min.value ;
document.frmCMAddDocument.hidpresentation_AMPM_orig.value = document.frmCMAddDocument.presentation_AMPM.value ;
document.frmCMAddDocument.hidloadin_hr_orig.value = document.frmCMAddDocument.loadin_hr.value ;
document.frmCMAddDocument.hidloadin_min_orig.value = document.frmCMAddDocument.loadin_min.value ;
document.frmCMAddDocument.hidloadin_AMPM_orig.value = document.frmCMAddDocument.loadin_AMPM.value ;
document.frmCMAddDocument.hidcontact_nm_orig.value = document.frmCMAddDocument.contact_nm.value ;
document.frmCMAddDocument.hidcontact_phone_no_orig.value = document.frmCMAddDocument.contact_phone_no.value ;
document.frmCMAddDocument.hidcontact_phone_no2_orig.value = document.frmCMAddDocument.contact_phone_no2.value ;
document.frmCMAddDocument.hidevent_type_flg_orig.value = document.frmCMAddDocument.event_type_flg.value ;
document.frmCMAddDocument.hidconference_bridge_flg_orig.value = document.frmCMAddDocument.conference_bridge_flg.value ;
document.frmCMAddDocument.hidnum_speakers_orig.value = document.frmCMAddDocument.num_speakers.value ;
document.frmCMAddDocument.hidaudience_flg_orig.value = document.frmCMAddDocument.audience_flg.value ;
document.frmCMAddDocument.hidtxtNRInstructions_orig.value = document.frmCMAddDocument.txtNRInstructions.value ;
}
function GetListBoxTextValues(sListBox, bSelected)
{
var cCombo, i, sTemp;
sTemp = ""
cCombo = document.getElementById(sListBox) ;
if(cCombo)
{
for (i = 0 ; i < cCombo.options.length ; i++)
{
if (bSelected == false)
{
sTemp = sTemp + cCombo.options[i].text ;
sTemp = sTemp + "~" ;
}
else
{
if(cCombo.options[i].selected == true)
{
sTemp = sTemp + cCombo.options[i].text ;
sTemp = sTemp + "~" ;
}
}
}
}
return sTemp
}
function GenerateEmail()
{
var oElem, sTemp, i;
var sMsg = "" , sSubject = "" ;
var sEmailFrom = "", sEmailTo = "" ;
sMsg = "The following Transaction Services have been ordered/changed:" ;
sMsg = sMsg + "\n\n" ;
sMsg = sMsg + "i-Deal Client:" ;
sMsg = sMsg + document.frmCMAddDocument.hidDealOwnerName.value;
sMsg = sMsg + "\n\n" ;
sMsg = sMsg + "Deal Name:" ;
sMsg = sMsg + document.frmCMAddDocument.hidIssueName.value;
sMsg = sMsg + "\n\n" ;
sMsg = sMsg + "Ordered By:" ;
sMsg = sMsg + "\n"
sMsg = sMsg + document.frmCMAddDocument.hidorder_by_first_nm.value;
sMsg = sMsg + " " ;
sMsg = sMsg + document.frmCMAddDocument.hidorder_by_last_nm.value;
sMsg = sMsg + "\n" ;
if (document.frmCMAddDocument.hidorder_by_phone_no.value != "")
{
sMsg = sMsg + document.frmCMAddDocument.hidorder_by_phone_no.value;
sMsg = sMsg + "\n" ;
}
if (document.frmCMAddDocument.hidorder_by_email_addr.value != "")
{
sMsg = sMsg + document.frmCMAddDocument.hidorder_by_email_addr.value;
sMsg = sMsg + "\n" ;
}
sMsg = sMsg + "\n" ;
sMsg = sMsg + "Products Ordered:" ;
sMsg = sMsg + "\n"
if(document.getElementById("chkRoadshowProfile").checked == true)
{
sMsg = sMsg + "Roadshow Profile";
sMsg = sMsg + "\n" ;
}
if(document.getElementById("chkDailyMarketSummary").checked == true)
{
sMsg = sMsg + "Daily Market Summary";
sMsg = sMsg + "\n" ;
}
if(document.getElementById("chkTransactionSurveillance").checked == true)
{
sMsg = sMsg + "Transaction Surveillance";
sMsg = sMsg + "\n" ;
}
sMsg = sMsg + "\n\n" ;
if(document.getElementById("chkRoadshowProfile").checked == true)
{
sMsg = sMsg + "Roadshow Profile" ;
sMsg = sMsg + "\n";
sMsg = sMsg + "Peer List:";
sMsg = sMsg + "\n";
sTemp = document.frmCMAddDocument.cbPeerList_RS.value ;
if(sTemp != "DM")
{
oElem = document.getElementById("selPeerListCurrent_RS") ;
for(i = 0 ; i < oElem.options.length ; i ++)
{
sMsg = sMsg + oElem.options[i].text;
sMsg = sMsg + "\n" ;
}
}
else
{
sMsg = sMsg + "Use the same peer list as: " ;
sMsg = sMsg + document.frmCMAddDocument.cbPeerList_RS.options[document.frmCMAddDocument.cbPeerList_RS.selectedIndex].text ;
sMsg = sMsg + "\n";
}
sMsg = sMsg + "\n";
sMsg = sMsg + "Distribution List:";
sMsg = sMsg + "\n";
sTemp = document.frmCMAddDocument.cbDistList_RS.value ;
if( (sTemp != "DM") && (sTemp != "TS"))
{
sMsg = sMsg + document.frmCMAddDocument.txtDistList_RS.value;
sMsg = sMsg + "\n" ;
}
else
{
sMsg = sMsg + "Use the same distribution list as: " ;
sMsg = sMsg + document.frmCMAddDocument.cbDistList_RS.options[document.frmCMAddDocument.cbDistList_RS.selectedIndex].text ;
sMsg = sMsg + "\n";
}
}
if(document.getElementById("chkDailyMarketSummary").checked == true)
{
sMsg = sMsg + "\n";
sMsg = sMsg + "Daily Market Summary" ;
sMsg = sMsg + "\n";
sMsg = sMsg + "Peer List:";
sMsg = sMsg + "\n";
sTemp = document.frmCMAddDocument.cbPeerList_DM.value ;
if(sTemp != "RS")
{
oElem = document.getElementById("selPeerListCurrent_DM") ;
for(i = 0 ; i < oElem.options.length ; i ++)
{
sMsg = sMsg + oElem.options[i].text;
sMsg = sMsg + "\n" ;
}
}
else
{
sMsg = sMsg + "Use the same peer list as: " ;
sMsg = sMsg + document.frmCMAddDocument.cbPeerList_DM.options[document.frmCMAddDocument.cbPeerList_DM.selectedIndex].text ;
sMsg = sMsg + "\n";
}
sMsg = sMsg + "\n";
sMsg = sMsg + "Distribution List:";
sMsg = sMsg + "\n";
sTemp = document.frmCMAddDocument.cbDistList_DM.value ;
if( (sTemp != "RS") && (sTemp != "TS"))
{
sMsg = sMsg + document.frmCMAddDocument.txtDistList_RS.value;
sMsg = sMsg + "\n" ;
}
else
{
sMsg = sMsg + "Use the same distribution list as: " ;
sMsg = sMsg + document.frmCMAddDocument.cbDistList_DM.options[document.frmCMAddDocument.cbDistList_DM.selectedIndex].text ;
sMsg = sMsg + "\n";
}
}
if(document.getElementById("chkTransactionSurveillance").checked == true)
{
sMsg = sMsg + "\n";
sMsg = sMsg + "Transaction Surveillance" ;
sMsg = sMsg + "\n";
sMsg = sMsg + "Distribution List:";
sMsg = sMsg + "\n";
sTemp = document.frmCMAddDocument.cbDistList_TS.value ;
if( (sTemp != "RS") && (sTemp != "DM"))
{
sMsg = sMsg + document.frmCMAddDocument.txtDistList_TS.value;
sMsg = sMsg + "\n" ;
}
else
{
sMsg = sMsg + "Use the same distribution list as: " ;
sMsg = sMsg + document.frmCMAddDocument.cbDistList_TS.options[document.frmCMAddDocument.cbDistList_TS.selectedIndex].text ;
sMsg = sMsg + "\n";
}
}
sMsg = sMsg + "\n";
sMsg = sMsg + "Industries:" ;
sMsg = sMsg + "\n";
oElem = document.getElementById("selIndustries") ;
for(i = 0 ; i < oElem.options.length ; i ++)
{
if( oElem.options[i].selected == true)
{
sMsg = sMsg + oElem.options[i].text;
sMsg = sMsg + "\n" ;
}
}
if( (document.frmCMAddDocument.sDocumentName.value != "") ||
(document.frmCMAddDocument.hidAttachment_dfs_file_nm.value != "") )
{
sMsg = sMsg + "\n";
sMsg = sMsg + "Logos: Attached" ;
sMsg = sMsg + "\n";
}
sMsg = sMsg + "\n";
sMsg = sMsg + "Special Instructions:" ;
sMsg = sMsg + "\n";
sMsg = sMsg + document.frmCMAddDocument.txtSpecialInstr.value ;
sEmailTo = document.frmCMAddDocument.hidAnalyticsEmail.value ;
sEmailFrom = document.frmCMAddDocument.hidUserEmail.value ;
sSubject = "Transaction Services Order"
var sAttachmentPath = "", sAttachmentPathXml = "";
if(document.frmCMAddDocument.hidAttachment_dfs_file_nm.value != "")
{
sAttachmentPath = document.frmCMAddDocument.hidDFSRoot.value ;
sAttachmentPath = sAttachmentPath + "Thompson" ;
sAttachmentPath = sAttachmentPath + "\\" ;
sAttachmentPath = sAttachmentPath + document.frmCMAddDocument.hidAttachment_dfs_file_nm.value ;
sAttachmentPathXml = "<file_paths><file>"
sAttachmentPathXml = sAttachmentPathXml + sAttachmentPath ;
sAttachmentPathXml = sAttachmentPathXml + "</file></file_paths>" ;
}
document.frmCMAddDocument.hidEmailBody.value = escape(sMsg) ;
return ;
}
function OnUploadLogoClear()
{
var oElem;
oElem = document.getElementById("sDocumentName") ;
oElem.clearAttributes() ;
}
function replaceString(oldS,newS,fullS)
{
for (var i=0; i<fullS.length; i++)
{
if (fullS.substring(i,i+oldS.length) == oldS)
{
fullS = fullS.substring(0,i)+newS+fullS.substring(i+oldS.length,fullS.length)
}
}
return fullS
}
function ActivateTab(sTabName)
{
var oTabMarketIntelligence, oTabNetRoadshow ;
sActiveTab = sTabName;
oTabNetRoadshow = document.getElementById("divTFOrderNetRoadshow") ;
oTabMarketIntelligence = document.getElementById("divTFOrderDetails") ;
if(sTabName == "MI")
{
oTabMarketIntelligence.style.display = "block" ;
oTabNetRoadshow.style.display = "none" ;
}
else
{
oTabMarketIntelligence.style.display = "none" ;
oTabNetRoadshow.style.display = "block" ;
}
}
function isInteger(val){
if (isBlank(val)){return false;}
for(var i=0;i<val.length;i++){
if(!isDigit(val.charAt(i))){return false;}
}
return true;
}
function editGlobalRegions()
{
var sUrl = "cm_globalregions_popUp.asp?Regions=" + document.frmCMAddDocument.hidSalesGblRegions.value;
var sStyle = "width=700,height=200,scrollbars=1,resizable=1";
openGeneralPopup( sUrl, '', sStyle );	
}
function ShowHideAddRemAccess(isSSB)
{
if(document.frmCMAddDocument.chkSales.checked == true)
{
if ( isSSB=="true" )
document.frmCMAddDocument.hidSalesGblRegions.value = document.frmCMAddDocument.hidGlobalRegions.value;
AddRemAccess.style.display = 'block';
}
else
{
if ( isSSB=="true" )
document.frmCMAddDocument.hidSalesGblRegions.value = "";
AddRemAccess.style.display = 'none';
}
}
