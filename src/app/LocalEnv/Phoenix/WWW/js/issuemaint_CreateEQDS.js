<!-- 
RSEnableRemoteScripting("/_ScriptLibrary");
var iDivOrdBase = 0;
var iDivOrdSecondPrd = 1;
var iDivOrdLeadTrn = 0;
var iDivOrdSecondTrn = 1;
var sValueTypeCommonShares = frmMain.all("hidIssueType").value;
var g_SecurityTypesInUse = new Array();
var g_curSecTypeID = -100; 
var g_IssueTypeCD = "C"; 
var g_IssueTypeID = frmMain.all("hidIssueType").value; 
g_SecurityTypesInUse[ sValueTypeCommonShares ] = true;
var g_tranches = new Array();
for (var i=0; i < frmMain.all("sFileSizeAmtLbl").length; i++)
{
g_tranches[i] = new Object();
g_tranches[i].sFileSizeAmtLbl = frmMain.all("sFileSizeAmtLbl").item(i);
g_tranches[i].sUnitsLbl = frmMain.all("sUnitsLbl").item(i);
g_tranches[i].assocProd = null;
}
var g_products = new Array();
for (var i=0; i < frmMain.selCurrency.length; i++)
{
g_products[i] = new Object();
g_products[i].ccyLabel = frmMain.selCurrency(i);
g_products[i].selSecType = frmMain.selSecType(i);
}
g_tranches[0].assocProd = g_products[0];
onChangeSecurityType( frmMain.selSecType_0 );
UpdateProductState();
function onPageLoad()
{
PopulateSecurityTypes(true);
OnSelectTrnGetBroker(frmMain, frmMain.elements["iSelTrancheName_0"]);
OnSelectTrnSetPopulateDirect(frmMain, frmMain.elements["iSelTrancheName_0"]);
OnSelChangeTrnSubsidiary(frmMain, frmMain.elements["iSelTrancheName_0"]);
onselStateChanged();
if (addBookRunner > 0)
{
var sydMem = document.frmMain.sdc_synd_mem.value;
onBookrunnersUpdate(sydMem, 0);
}
if (showErrorMessage)
{
var win = window.open('blank.asp', 'RC_CREATE_NEW_DEAL_EQ_ERROR_MESSAGE','height=360,width=600,scrollbars=1,resizable=1');
win.document.write(document.all("errorMessage").innerHTML);
}
var oChkBox = document.getElementById("chkUseIdealProspectus") ;
if (oChkBox)
{	
var arrRadBlockIOI = document.getElementsByName("radBlockIOI");
if(!oChkBox.checked)
{
for(var i = 0; i < arrRadBlockIOI.length; i++)
{
arrRadBlockIOI[i].disabled = true;
}
}
else
{
for(var i = 0; i < arrRadBlockIOI.length; i++)
{
arrRadBlockIOI[i].disabled = false;
}
}
}
var oChkBoxPM = document.getElementById("chkAllowSalesToEnterPM");
if(oChkBoxPM)
{
var arrRadBlockIOI = document.getElementsByName("radBlockIOIwoPM");
if(!oChkBoxPM.checked)
{
for(var i = 0; i < arrRadBlockIOI.length; i++)
{
arrRadBlockIOI[i].disabled = true;
}
}
else
{
for(var i = 0; i < arrRadBlockIOI.length; i++)
{
arrRadBlockIOI[i].disabled = false;
}
}
}
}
function onChangeSecurityType( oSecTypeSel )
{
var curSecTypeID = oSecTypeSel.value;
g_SecurityTypesInUse[ curSecTypeID ] = true;
g_SecurityTypesInUse[ g_curSecTypeID ] = false;
for( var i=0; i < frmMain.all("selSecType").length; i++)
{
oSelect = frmMain.all("selSecType").item(i);
if( oSelect.sourceIndex == oSecTypeSel.sourceIndex )
{
continue;
}
var vSelectedValue = oSelect.value;
for( ; oSelect.all.length; oSelect.removeChild( oSelect( 0 ) ) )
{}
iSelIndex = 0;
for(var j=0; j < frmMain.hselSecType.all.length; j++)
{
oChildNode = frmMain.hselSecType(j);
if( !g_SecurityTypesInUse[ oChildNode.value ]
|| (vSelectedValue == oChildNode.value ) )
{
if ( ( oChildNode.value == "-1")
&& ( i == 0 ) )
{
continue;
}
if( oChildNode.value != "-1") 
{
frmMain.hselSecTypeByCode.value = oChildNode.value;
frmMain.hselSecTypeByIssueTypeId.value = oChildNode.value;
var issueCD = frmMain.hselSecTypeByCode( frmMain.hselSecTypeByCode.selectedIndex ).text;
var issueID = frmMain.hselSecTypeByIssueTypeId( frmMain.hselSecTypeByIssueTypeId.selectedIndex ).text;
if( issueID != g_IssueTypeID)
{
continue;
}
}
var oNewChildNode = oChildNode.cloneNode( true );
oSelect.insertBefore( oNewChildNode );
if( oNewChildNode.value == vSelectedValue )
{
iSelIndex = j;
}
}
}
oSelect.selectedIndex = iSelIndex;
oSelect.value = vSelectedValue;
}
UpdateTrancheStates( oSecTypeSel,
oSecTypeSel.selectedIndex,
g_curSecTypeID );
}
function UpdateTrancheStates( oSecTypeSel, iSelIndex, sOldValue )
{
var bFound = false;
var selAssocProd = frmMain.all("selAssociatedProduct");
if( oSecTypeSel.value == "-1" )
{
for( var i=0; i < selAssocProd.length; i++ )
{
if( ( selAssocProd(i).value == sOldValue) && sOldValue != "-1" )
{
selAssocProd(i).parentElement.removeChild( selAssocProd(i) );
break;
}
}
}
else
{
for( var i=0; (i < selAssocProd.length) && !bFound; i++)
{
if( selAssocProd(i).value == "-1" )
{
continue;
}
if( selAssocProd(i).value == sOldValue )
{
selAssocProd(i).innerText =
oSecTypeSel(oSecTypeSel.selectedIndex).innerText;
selAssocProd(i).value = oSecTypeSel.value;
bFound = true;
}
}
if( !bFound )
{
if(iSelIndex >= 0)
{
var oNewChildNode =
oSecTypeSel( iSelIndex ).cloneNode( true );
selAssocProd.insertBefore( oNewChildNode );
}	
}
if(iSelIndex >= 0)
{
UpdateFileAmtCurrency();
UpdateFileSizeUnits();
}	
}
}
function onAssocProductChange( oSelAssocProd )
{
var oProduct = null;
for( var i=0; i < g_products.length; i++)
{
if( g_products[i].selSecType.value == oSelAssocProd.value)
{
oProduct = g_products[i];
break;
}
}
g_tranches[1].assocProd = oProduct;
UpdateFileAmtCurrency();
UpdateFileSizeUnits();
}
function onCurrencyChange()
{
UpdateFileAmtCurrency();
onCalcFieldChange();
}
function UpdateFileAmtCurrency()
{
var oTranche = null;
for( var i=0; i < g_tranches.length; i++)
{
if( g_tranches[i].assocProd != null )
{
var ccyLabel = g_tranches[i].assocProd.ccyLabel;
g_tranches[i].sFileSizeAmtLbl.innerText =
ccyLabel( ccyLabel.selectedIndex ).innerText;
}
else
{
g_tranches[i].sFileSizeAmtLbl.innerText = "";
}
}
}
function UpdateFileSizeUnits()
{
var oTranche = null;
for( var i=0; i < g_tranches.length; i++)
{
if( g_tranches[i].assocProd != null )
{
var oSecTypeSel = g_tranches[i].assocProd.selSecType;
g_tranches[i].sUnitsLbl.innerText =
oSecTypeSel( oSecTypeSel.selectedIndex ).innerText;
}
else
{
g_tranches[i].sUnitsLbl.innerText = "";
}
}
}
function onClickSecurityType( oSelect )
{
g_curSecTypeID = oSelect.value;
}
function onSelectIssueType( cbxIssueType )
{
var ipoSection = frmMain.all("ipoSection");
var IsFPCIBCFunctionality = getDocumentElement("hidFPCIBCFunctionality").value;
if (IsFPCIBCFunctionality == "0")
{
selIpoSection.style.display = IsConvertibleIssue() ? "none" : "inline";
}
FundLayer.style.display = IsConvertibleIssue() ? "inline" : "none";
if(getDocumentElement("ClosedEndFundLayer"))
{
ClosedEndFundLayer.style.display = IsConvertibleIssue() ? "none" : "inline";
if (IsConvertibleIssue())
getDocumentElement("chkClosedEndFund").checked = false;
}	
var CustomerShowOD;
CustomerShowOD = getDocumentElement("hidCustomerShowOD");
if (CustomerShowOD && CustomerShowOD.value == 1)
{	
if (getDocumentElement("ConcurrentOfferingLayer"))
{
if (IsConvertibleIssue())
{
getDocumentElement("ConcurrentOfferingLayer").style.display = "";
getDocumentElement("chkConCurrOffering").checked = false; 
}
else
{
getDocumentElement("ConcurrentOfferingLayer").style.display = "none";
getDocumentElement("ConcurrentOfferingDealLayer").style.display = "none";
}
}
}
UpdateProductState();
var selIssueType = frmMain.all("selIssueType");
var sIssueType = selIssueType.value.split(',');
var sIssTypeID = sIssueType[0];
frmMain.all("hidIssueType").value = sIssTypeID;
frmMain.all("hidIssueTypeCd").value = sIssueType[1];
g_IssueTypeCD = sIssueType[1];
g_IssueTypeID = sIssTypeID;
PopulateSecurityTypes();
onCalcFieldChange();
if(getDocumentElement("ClosedEndFundLayer"))
onClosedEndFundClicked();
}
function PopulateSecurityListbox( oSelect, bMustHaveSelection )
{
for( ; oSelect.all.length; oSelect.removeChild( oSelect( 0 ) ) )
{}
iSelIndex = 0;
for(var j=0; j < frmMain.hselSecType.all.length; j++)
{
oChildNode = frmMain.hselSecType(j);
if ( ( oChildNode.value == "-1")
&& ( bMustHaveSelection ) )
{
continue;
}
if( oChildNode.value != "-1") 
{
frmMain.hselSecTypeByCode.value = oChildNode.value;
frmMain.hselSecTypeByIssueTypeId.value = oChildNode.value;
var issueCD = frmMain.hselSecTypeByCode( frmMain.hselSecTypeByCode.selectedIndex ).text;
var issueID = frmMain.hselSecTypeByIssueTypeId( frmMain.hselSecTypeByIssueTypeId.selectedIndex ).text;
if( issueID != g_IssueTypeID)
{
continue;
} 
}
var oNewChildNode = oChildNode.cloneNode( true );
oSelect.insertBefore( oNewChildNode );
}
}
function PopulateSecurityTypes(setDefault)
{
g_SecurityTypesInUse = new Array();
PopulateSecurityListbox( frmMain.selSecType_0, true );
frmMain.selSecType_0.selectedIndex = 0;
PopulateSecurityListbox( frmMain.selSecType_1, false );
frmMain.selSecType_1.selectedIndex = 0;
var selAssocProd = frmMain.all("selAssociatedProduct");
for( ; selAssocProd.all.length; selAssocProd.removeChild( selAssocProd( 0 ) ) )
{}
selAssocProd.options[0]= new Option( "None Selected","-1" );
g_curSecTypeID = "-100";
onChangeSecurityType( frmMain.selSecType_0 );
onChangeSecurityType( frmMain.selSecType_1 );
if (setDefault)
{
for (var i=0; i<frmMain.selSecType_0.options.length; i++)
{
if (frmMain.hidSDCSecTypeId.value == frmMain.selSecType_0.options[i].value)
frmMain.selSecType_0.options[i].selected = true;
}
}
frmMain.all("divSecondProd").style.display =
( g_IssueTypeCD == "CB" ) ? "none" : "inline";
}
function IsConvertibleIssue()
{
var cbxIssueType = frmMain.all("selIssueType");
var issueTypeCd;
issueTypCd = cbxIssueType.value.replace(/.*,/,"");
return (issueTypCd == "CP" || issueTypCd == "CB" );
}
var g_userAlteredFieldIdxs = new Array();
function onGuardedFieldChange( oField )
{
g_userAlteredFieldIdxs[ oField.sourceIndex ] = true;
}
var g_DateOrigValues = new Array();
function GuardDateValue( oField )
{
g_DateOrigValues[ oField.sourceIndex ] = oField.value;
}
function CheckDateChange( oField )
{
if(( g_DateOrigValues[ oField.sourceIndex ] != null )
&& ( g_DateOrigValues[ oField.sourceIndex ] != oField.value ))
{
onGuardedFieldChange( oField );
}
}
function IsChangedByUser( sFieldName )
{
return g_userAlteredFieldIdxs[ frmMain.all( sFieldName ).sourceIndex ] == true;
}
function IsRadioChangedByUser( sFieldName )
{
var oField = frmMain.all( sFieldName );
for(var i=0; i<oField.length; i++)
{
if( g_userAlteredFieldIdxs[ oField.item(i).sourceIndex ] == true)
{
return true;
}
}
return false;
}
function onBlocktradeClicked( cbxBlocktrade )
{
}
function setRegDoc( element )
{
if ( element.name == "cbxRegType_0" )
{
document.frmMain.hRegTypeID_0.value = element.value;
onRegTypeChange( frmMain.selRegRule_0, element.value );
}
else
{
document.frmMain.hRegTypeID_1.value = element.value;
onRegTypeChange( frmMain.selRegRule_1, element.value );
}
}
function setOfferDoc( element )
{
if ( element.name == "cbxOfferType_0" )
{
document.frmMain.hOfferTypeID_0.value = element.value;
onOfferTypeChange( frmMain.selOfferProc_0, element.value );
}
else
{
document.frmMain.hOfferTypeID_1.value = element.value;
onOfferTypeChange( frmMain.selOfferProc_1, element.value );
}
}
function onRegTypeChange( oRegSelect, regType )
{
for( ; oRegSelect.all.length; oRegSelect.removeChild( oRegSelect( 0 ) ) )
{}
var oSrcOpts = ( regType == g_privRegID ) ?
frmMain.hRegPriv.children : frmMain.hRegPub.children;
for( var i=0; i < oSrcOpts.length; i++ )
{
var opt = new Option( oSrcOpts(i).innerHTML, oSrcOpts(i).value );
oRegSelect.options[oRegSelect.options.length] = opt;
}
}
function onOfferTypeChange( oRegSelect, offerType )
{
for( ; oRegSelect.all.length; oRegSelect.removeChild( oRegSelect( 0 ) ) )
{}
var oSrcOpts = ( offerType == g_privRegID ) ?
frmMain.hOfferPriv.children : frmMain.hOfferPub.children;
for( var i=0; i < oSrcOpts.length; i++ )
{
var opt = new Option( oSrcOpts(i).innerHTML, oSrcOpts(i).value );
oRegSelect.options[oRegSelect.options.length] = opt;
}
}
function onIPOClicked()
{
UpdateProductState();
var arrRadBlockIOI = document.getElementsByName("radBlockIOI");
if(arrRadBlockIOI.length != 0)
{
if( frmMain.all("addonIPO").item(0).checked )
arrRadBlockIOI[1].checked = true;
else if(frmMain.all("addonIPO").item(1).checked )
arrRadBlockIOI[0].checked = true;
}
if(getDocumentElement("ClosedEndFundLayer"))
onClosedEndFundClicked();
}
function onClosedEndFundClicked()
{
if (frmMain.all("chkClosedEndFund").checked)
{
frmMain.hidClosedEnd.value = "1";
SetDisplayable( iDivOrdBase, "divFilePrice", false );
SetDisplayable( iDivOrdBase, "divFileRange", false );
SetDisplayable( iDivOrdBase, "divPriceTalk", false );
SetDisplayable( iDivOrdBase, "divConvRatio", false );
if (getDocumentElement("divClosedEndFundVal"))
getDocumentElement("divClosedEndFundVal").style.display = "";
}
else
{
frmMain.hidClosedEnd.value = "0";
if (getDocumentElement("divClosedEndFundVal"))
getDocumentElement("divClosedEndFundVal").style.display = "none";
UpdateProductState();
}
}
function onExchangeTradedNotesClicked()
{
if (frmMain.all("chkExchTradedNotes").checked)
{
frmMain.hidExchTradedNotes.value = "1";
SetDisplayable( iDivOrdBase, "divFilePrice", false );
SetDisplayable( iDivOrdBase, "divFileRange", false );
SetDisplayable( iDivOrdBase, "divPriceTalk", false );
SetDisplayable( iDivOrdBase, "divConvRatio", false );
if (getDocumentElement("divClosedEndFundVal"))
getDocumentElement("divClosedEndFundVal").style.display = "";
}
else
{
frmMain.hidExchTradedNotes.value = "0";
if (getDocumentElement("divClosedEndFundVal"))
getDocumentElement("divClosedEndFundVal").style.display = "none";
UpdateProductState();
}
}
function onAnnouncedRoleClicked( oField )
{
onGuardedFieldChange( oField );
}
function UpdateProductState()
{
SetDisplayable( iDivOrdBase, "divFilePrice", false );
SetDisplayable( iDivOrdBase, "divFileRange", false );
SetDisplayable( iDivOrdBase, "divPriceTalk", false );
SetDisplayable( iDivOrdBase, "divConvRatio", false );
frmMain.all("divEstOfferPxLbl").style.display = "none";
frmMain.all("divEstOfferPxVal").style.display = "none";
frmMain.all("divParValueLbl").style.display = "none";
frmMain.all("divParValueVal").style.display = "none";
if(frmMain.all("divLaunchPxVal"))
{
frmMain.all("divLaunchPxLbl").style.display = "none";
frmMain.all("divLaunchPxVal").style.display = "none";
}
if (frmMain.all.hidDisplayConvertibleInfoInd.value == 1)
{
frmMain.all("ConvertibleInfoLayer").style.display = "none";
frmMain.all("convertiblePutCallLayer").style.display = "none";
}
SetDisplayable( iDivOrdSecondPrd, "divFilePrice", false );
SetDisplayable( iDivOrdSecondPrd, "divFileRange", false );
SetDisplayable( iDivOrdSecondPrd, "divPriceTalk", false );
SetDisplayable( iDivOrdSecondPrd, "divConvRatio", true );
if( IsConvertibleIssue() )
{
var bFPEuroFunctionality = frmMain.all("hidFPEuroFunctionality").value;
SetDisplayable( iDivOrdBase, "divPriceTalk", true );
frmMain.all("divEstOfferPxLbl").style.display = "";
frmMain.all("divEstOfferPxVal").style.display = "";
frmMain.all("divParValueLbl").style.display = "";
frmMain.all("divParValueVal").style.display = "";
if (frmMain.all.hidDisplayConvertibleInfoInd.value == 1)
{
frmMain.all("ConvertibleInfoLayer").style.display = "";
frmMain.all("convertiblePutCallLayer").style.display = "";
}
var cbxIssueType = frmMain.all("selIssueType");
var issueTypeCd;
issueTypCd = cbxIssueType.value.replace(/.*,/,"");
if (bFPEuroFunctionality!=0)
{
if(frmMain.fltParValue_0)
{
if(issueTypCd == "CP")
{
frmMain.fltParValue_0.value=25; 
}
else if(issueTypCd == "CB")
{
frmMain.fltParValue_0.value=1000; 
}
}
if(frmMain.fltEstOfferPrice_0)
{
if(issueTypCd == "CP")
{
if (cbxIssueType.options[cbxIssueType.selectedIndex].text == "Preferred Shares")
{
frmMain.fltEstOfferPrice_0.value="";
}
else
{
frmMain.fltEstOfferPrice_0.value=25; 
}
}
else if(issueTypCd == "CB")
{
frmMain.fltEstOfferPrice_0.value=1000; 
}
} 
}
frmMain.hisIPO.value = "0";
frmMain.hidOfferingType.value = "0";
}
else
{
frmMain.fltEstOfferPrice_0.value = "";
if( frmMain.all("addonIPO").item(1).checked )
{
SetDisplayable( iDivOrdBase, "divFileRange", true );
frmMain.hisIPO.value = "1";
frmMain.hidOfferingType.value = "2";
}
else
{ 
if( frmMain.all("addonIPO").item(0).checked )
{
SetDisplayable( iDivOrdBase, "divFilePrice", true );
if(frmMain.all("divLaunchPxVal"))
{
frmMain.all("divLaunchPxLbl").style.display = "inline";
frmMain.all("divLaunchPxVal").style.display = "inline";
}
frmMain.hisIPO.value = "0";
frmMain.hidOfferingType.value = "1";
}
else
{
if( frmMain.all("addonIPO").item(2).checked )
{
SetDisplayable( iDivOrdBase, "divFilePrice", true );
if(frmMain.all("divLaunchPxVal"))
{ 
frmMain.all("divLaunchPxLbl").style.display = "inline";
frmMain.all("divLaunchPxVal").style.display = "inline";
}
frmMain.hisIPO.value = "0";
frmMain.hidOfferingType.value = "3";
}
if( frmMain.all("addonIPO").item(3).checked )
{
SetDisplayable( iDivOrdBase, "divFilePrice", true );
if(frmMain.all("divLaunchPxVal"))
{ 
frmMain.all("divLaunchPxLbl").style.display = "inline";
frmMain.all("divLaunchPxVal").style.display = "inline";
}
frmMain.hisIPO.value = "0";
frmMain.hidOfferingType.value = "4";
}
}
}
}
}
function todaysCalendarDate()
{
var dtNow = new Date();
var cal = new Calendar( null,
null,
dtNow.getMonth(),
dtNow.getYear().toString(),
UserSettings.dateMask.toUpperCase(),
null);
return cal.format_data( dtNow.getDate().toString() );
}
function popupBookrunners( oFrmMain, index )
{
var lBracketInd = 0;
var lNonLeadInd = 0;
if( frmMain.all("radRoleType").item(1).checked )
lNonLeadInd = 1;
var lDefaultBrokerID;
if( index == 0 )
{
lDefaultBrokerID = frmMain.hLeadTrnBrokerID.value;
}
else
{
lDefaultBrokerID = frmMain.hSecondTrnBrokerID.value;
}
var sUrl = "syndpart_add_uw_popupEQ.asp?FromEQDS=1&EQDSIndex="+index+"&UseBracketInd="+lBracketInd+"&NonLeadInd="+lNonLeadInd+"&DefBrkID="+lDefaultBrokerID+"";
var sStyle = "width=700,height=600,scrollbars=1,resizable=1";
openGeneralPopup( sUrl, '', sStyle );
}
var g_totBookrunners = new Array();
function removeBookrunners( oFrm, index )
{
eval("var oSelect = frmMain.selRunners_"+index+";");
eval("var oBookrunner = g_totBookrunners["+index+"]");
for( var i=0; i < oSelect.children.length; i++)
{
var oChild = oSelect.children(i);
if( oChild.selected == true )
{
for( var j=0; j<oBookrunner.length; j++)
{
if( !oBookrunner[j] )
continue;
if( oBookrunner[j].brk_id == oChild.value )
{
oBookrunner[j] = null;
break;
}
}
}
}
UpdateBookrunnerUI( index );
}
function UpdateBookrunnersData( index, newBookrunners, bFromSearch )
{
var bRet = false;
if( !g_totBookrunners[index] )
{
g_totBookrunners[index] = new Array();
}
var oldBkrunners = g_totBookrunners[index];
for( var i=0; i < newBookrunners.length; i++) 
{
var newBkrunner = newBookrunners[i];
var oldBkrunner = getBrokerByID( oldBkrunners, newBkrunner.brk_id );
if( oldBkrunner == null )
{
AddBookrunner( oldBkrunners, newBkrunner);
}
else
{
ReplaceBookrunner( oldBkrunners, newBkrunner);
}
if( bFromSearch )
{
var trn_brk_id;
if( index == 0 )
trn_brk_id = frmMain.hLeadTrnBrokerID.value;
else
trn_brk_id = frmMain.hSecondTrnBrokerID.value;
if( newBkrunner.brk_id == trn_brk_id)
{
eval("var oRoleSelect = frmMain.selRoleLead_"+index+";");
for (var j = 0; j < oRoleSelect.options.length; j++)
{
if (oRoleSelect.options[j].value.split(',')[0] == newBkrunner.synd_role_id)
{
oRoleSelect.selectedIndex = j;
break;
}
}
if( index == 0 )
frmMain.hLeadTrnRoleID.value = newBkrunner.synd_role_id;
else
frmMain.hSecondTrnRoleID.value = newBkrunner.synd_role_id;
}
}
}
}
// 
// 
function UpdateBookrunnerUI( index )
{
eval("var oSelect = frmMain.selRunners_"+index+";");
for( ; oSelect.all.length; oSelect.removeChild( oSelect( 0 ) ) ) 
{}
eval("var oSettleWithIssuer = frmMain.selSettleWithIssuer_"+index+";");
if (oSettleWithIssuer != undefined)
{
for( ; oSettleWithIssuer.options.length>1; ) 
{
oSettleWithIssuer.options.remove(1);
}
}
var bkRunners = g_totBookrunners[index];
if( !bkRunners )
return;
for( var i=0; i < bkRunners.length; i++)
{
if( !bkRunners[i] )
continue;
if( bkRunners[i].invisible != null )
continue;
var sBrkNm = bkRunners[i].brk_dispInfo.replace(/&amp;/g,"&");
var opt = new Option( sBrkNm, bkRunners[i].brk_id );
oSelect.options[oSelect.options.length] = opt;
var idx = sBrkNm.lastIndexOf("-");
sBrkNm = sBrkNm.substr(0,idx);
if (oSettleWithIssuer != undefined)
{
opt = new Option( sBrkNm, bkRunners[i].brk_id );
oSettleWithIssuer.options[oSettleWithIssuer.options.length] = opt;
}
}
}
function onBookrunnersUpdate( sXML, index )
{ 
UpdateBookrunnersData( index, SyndMemXMLToArray( sXML ), true );
UpdateBookrunnerUI( index );
}
function onRoleChange( oField )
{
var sIndex = oField.name.split('_')[1];
var sID = oField.value.split(',')[0];
var sCode = oField.value.split(',')[1];
if( sIndex == 0 )
{
frmMain.hLeadTrnRoleID.value = sID; 
}
else
{
frmMain.hSecondTrnRoleID.value = sID;	
}
eval("var oTrnSelect = frmMain.iSelTrancheName_"+sIndex+";");
if(oTrnSelect.value == -1)
return;
if( sIndex == 0 )
{
if(frmMain.hLeadTrnBrokerName.value == "")
return;
}
else
{
if(frmMain.hSecondTrnBrokerName.value == "")
return;
}
if (sCode == "UW" || sCode == "SG" || sCode == "CM(INTL)" || sCode == "SA" || sCode == "STR" || sID == "")
{
frmMain.all("radRoles").item(0).checked = false;
frmMain.all("radRoles").item(1).checked = false;
frmMain.all("radRoles").item(2).checked = false;
}
else
frmMain.all("radRoles").item(0).checked = true;
if( sID == "" && g_totBookrunners[sIndex])
{
var oRemoveBR = new Object(); 
if( sIndex == 0 )
{
oRemoveBR.brk_id = frmMain.hLeadTrnBrokerID.value;
}
else
{
oRemoveBR.brk_id = frmMain.hSecondTrnBrokerID.value;
}
if(oRemoveBR.brk_id != 0)
{
var oExistingBR = getBrokerByID( g_totBookrunners[sIndex], oRemoveBR.brk_id );
if( oExistingBR != null )
{
RemoveBookrunner( g_totBookrunners[sIndex], oRemoveBR);
}
UpdateBookrunnerUI( sIndex );
}
return;
}
if( sIndex == 0 )
{
if( (sCode == "JLM") 
|| (sCode == "CM(US)") 
|| (sCode == "STR") 
|| (sCode == "UW")) 
{
if( !IsRadioChangedByUser( "radPopBook_0" ) )
{
frmMain.all("radPopBook_0").item(0).checked = true;
}
}
}
var oBookrunner = new Object();
oBookrunner.synd_role_id = sID;
oBookrunner.uw_size_qty = 0;
if( sIndex == 0 )
{
oBookrunner.brk_id = frmMain.hLeadTrnBrokerID.value;
}
else
{
oBookrunner.brk_id = frmMain.hSecondTrnBrokerID.value;
}
if( frmMain.all("radRoleType").item(1).checked)
{
oBookrunner.invisible = true;
}
else
{
if( sIndex == 0 )
{
var sDisplayName = frmMain.hLeadTrnBrokerName.value.replace(/&amp;/g,"&") + "-" +
oField(oField.selectedIndex).innerText;
oBookrunner.brk_dispInfo = sDisplayName;
}
else
{
var sDisplayName = frmMain.hSecondTrnBrokerName.value.replace(/&amp;/g,"&") + "-" +
oField(oField.selectedIndex).innerText;
oBookrunner.brk_dispInfo = sDisplayName;
}
}
var oBookrunners = new Array();
oBookrunners[0] = oBookrunner;
if (sID != "")
{
UpdateBookrunnersData( sIndex, oBookrunners, false );
}
UpdateBookrunnerUI( sIndex );
}
function AddBookrunner( bookrunners, bookrunner ) 
{
for(var i=0; i < bookrunners.length; i++)
{
if( !bookrunners[i] )
{
bookrunners[i] = bookrunner;
return;
}
}
bookrunners[bookrunners.length] = bookrunner;
}
function ReplaceBookrunner( bookrunners, bookrunner )
{
for(var i=0; i < bookrunners.length; i++)
{
if( bookrunners[i] )
{
if( bookrunners[i].brk_id == bookrunner.brk_id )
{
bookrunners[i] = bookrunner;
return;
}
}
}
return;
}
function RemoveBookrunner( bookrunners, bookrunner )
{
for(var i=0; i < bookrunners.length; i++)
{
if( bookrunners[i] )
{
if( bookrunners[i].brk_id == bookrunner.brk_id )
{
bookrunners[i] = null;
return;
}
}
}
return;
}
function getBrokerByID( bookrunners, brokerID )
{
if( !bookrunners )
return;
for(var i=0; i < bookrunners.length; i++)
{
if( bookrunners[i] )
{
if( bookrunners[i].brk_id == brokerID )
{
return bookrunners[i];
}
}
}
return null;
}
function SyndMemXMLToArray( sXML )
{
var bDone = false;
var bookrunners = new Array();
var ar = sXML.split("</syndicatemember>");
for(var i=0; !bDone ; i++)
{
var member = ar[i];
var re;
if( member == null )
{
bDone = true;
continue;
}
re = /<brk_id>(.*)<\/brk_id>/i;
var brk_id = member.match( re );
if (brk_id != null) brk_id = brk_id[1];
re = /<synd_role_id>(.*)<\/synd_role_id>/i;
var synd_role_id = member.match( re );
if (synd_role_id != null) synd_role_id = synd_role_id[1];
re = /<brk_dispInfo>(.*)<\/brk_dispInfo>/i;
var brk_dispInfo = member.match( re );
if (brk_dispInfo != null) brk_dispInfo = brk_dispInfo[1];
re = /<uw_size_qty>(.*)<\/uw_size_qty>/i;
var uw_size_qty = member.match( re );
if (uw_size_qty != null) uw_size_qty = uw_size_qty[1];
if( ( brk_id == null)
&& ( synd_role_id == null )
&& ( brk_dispInfo == null )
&& ( uw_size_qty == null ))
{
bDone = true;
continue;
}
var bkrunner = new Object();
bkrunner.brk_id = brk_id;
bkrunner.synd_role_id = synd_role_id;
bkrunner.brk_dispInfo = brk_dispInfo;
bkrunner.uw_size_qty = uw_size_qty;
bookrunners[i] = bkrunner;
}
return bookrunners;
}
function SyndMemArrayToXML( bookrunners )
{
var sXML="<syndicatemembers>";
for( var i=0; i < bookrunners.length; i++)
{
if( bookrunners[i] == null )
continue;
sXML +="<syndicatemember>";
sXML = BuildXMLNode(bookrunners[i], "brk_id", sXML);
sXML = BuildXMLNode(bookrunners[i], "synd_role_id", sXML);
sXML = BuildXMLNode(bookrunners[i], "brk_dispInfo", sXML);
sXML = BuildXMLNode(bookrunners[i], "uw_size_qty", sXML);
sXML = BuildXMLNode(bookrunners[i], "bracket_id", sXML);
sXML +="</syndicatemember>";
}
sXML += "</syndicatemembers>";
return sXML;
}
function BuildXMLNode( runner, nodeName, sXML )
{
if (nodeName == "brk_dispInfo")
{
eval("var oBookrunnerVal = runner."+nodeName+"");
if (oBookrunnerVal != null)
{
var oEscBookrunnerVal = oBookrunnerVal.replace(/&/g,"&amp;");
eval("runner."+nodeName+" = oEscBookrunnerVal");
} 
} 
var evline = "if( runner."+nodeName+" != null ) sXML+=\"<"+nodeName+">\"+runner."+nodeName+"+\"</"+nodeName+">\";";
eval( evline );
return sXML;
}
function roundDecimals( sValue, len )
{
var result1 = sValue * Math.pow(10, len);
var result2 = Math.round(result1);
var result3 = result2 / Math.pow(10, len);
return result3;
}
function validateNumFormat( sValue, intlen, declen )
{
var dlen = getDecimal( sValue ).length;
if( dlen > declen )
return false;
if( dlen )
dlen += 1;
var tmpInt = sValue.replace(/(\,)/g, "");
if( tmpInt.substr(0,tmpInt.length - dlen).length > intlen )
return false;
return true;
}
function onCalcFieldChange()
{
if( g_userAlteredFieldIdxs[ frmMain.all("iFileSizeAmt").item(0).sourceIndex] == true )
{
return;
}
if( IsConvertibleIssue() )
{
if( (frmMain.all("fltParValue_0").value != "") &&
(frmMain.all("sUnits_0").value != "" ) )
{
var price = new Number(stripcommas(frmMain.all("fltParValue_0").value));
var units = new Number(stripcommas(frmMain.all("sUnits_0").value));
if( g_userAlteredFieldIdxs[ frmMain.all("iFileSizeAmt").item(0).sourceIndex] != true )
{
frmMain.all("iFileSizeAmt").item(0).value = formatAmountString(new String( roundDecimals( price * units,0 )));
}
}
if( (frmMain.all("fltParValue_0").value != "") &&
(frmMain.all("sUnits_1").value != "" ) )
{
var price = new Number(stripcommas(frmMain.all("fltParValue_0").value));
var units = new Number(stripcommas(frmMain.all("sUnits_1").value));
if( g_userAlteredFieldIdxs[ frmMain.all("iFileSizeAmt").item(1).sourceIndex] != true )
{
frmMain.all("iFileSizeAmt").item(1).value = formatAmountString( new String( roundDecimals(price * units,0)) );
}
}
return;
}
var chkpreipo ; 
if((frmMain.all("addonIPO").item(2)))
chkpreipo = frmMain.all("addonIPO").item(2).checked;
else
chkpreipo = false ;
if( (frmMain.all("addonIPO").item(0).checked) ||(chkpreipo==true))
{
if(frmMain.all("chkClosedEndFund"))
{
if (frmMain.all("chkClosedEndFund").checked == true)
frmMain.all("fltFilePrice_0").value = frmMain.all("fltCEFFilePrice_0").value;
}
var strlaunch_px ;
if(getDocumentElement("divLaunchPxVal"))
{
strlaunch_px = frmMain.all("fltLaunchPrice_0").value ;
}
else
{
strlaunch_px = "" ;
}
if( (frmMain.all("fltFilePrice_0").value != "" || strlaunch_px!= "") &&
(frmMain.all("sUnits_0").value != "" ) )
{
var price = new Number(stripcommas(frmMain.all("fltFilePrice_0").value));
var launch_px = new Number(stripcommas(strlaunch_px));
var units = new Number(stripcommas(frmMain.all("sUnits_0").value));
if( g_userAlteredFieldIdxs[ frmMain.all("iFileSizeAmt").item(0).sourceIndex] != true )
{
if (launch_px > 0)
frmMain.all("iFileSizeAmt").item(0).value = formatAmountString(new String( roundDecimals( launch_px * units,0 )));
else
frmMain.all("iFileSizeAmt").item(0).value = formatAmountString(new String( roundDecimals( price * units,0 )));
}
}
if( (g_tranches[1].assocProd != null) && 
(g_tranches[1].assocProd.selSecType == g_products[1].selSecType) )
{
if ( (frmMain.all("fltFilePrice_0").value != "" || strlaunch_px!= "")
&& (frmMain.all("sUnits_1").value != "" )
&& ( frmMain.all("iConvRatioBase_1").value != "")
&& ( frmMain.all("iConvRatioCurr_1").value != ""))
{
var price = new Number(stripcommas(frmMain.all("fltFilePrice_0").value));
var launch_px = new Number(stripcommas(frmMain.all("fltLaunchPrice_0").value));
var units = new Number(stripcommas(frmMain.all("sUnits_1").value));
var base = new Number(frmMain.all("iConvRatioBase_1").value);
var cur = new Number(frmMain.all("iConvRatioCurr_1").value);
var elem = frmMain.all("selCurrency_0");
var base_prod_curr_id = elem.options[elem.selectedIndex].value;
var base_prod_curr_spot_rate = 1;
for(i = 0; i < g_Ccy.length; i++)
{
if (g_Ccy[i].ccy_id == base_prod_curr_id)
{
base_prod_curr_spot_rate = g_Ccy[i].spot_rate;
break;
}
}
elem = frmMain.all("selCurrency_1");
var cur_prod_curr_id = elem.options[elem.selectedIndex].value;
var cur_prod_curr_spot_rate = 1;
for(i = 0; i < g_Ccy.length; i++)
{
if (g_Ccy[i].ccy_id == cur_prod_curr_id)
{
cur_prod_curr_spot_rate = g_Ccy[i].spot_rate;
break;
}
}
frmMain.all("hidCcySpotRate_0").value = base_prod_curr_spot_rate;
frmMain.all("hidCcySpotRate_1").value = cur_prod_curr_spot_rate;
var res;
if (launch_px > 0)
res = (launch_px * cur_prod_curr_spot_rate / base_prod_curr_spot_rate ) * (( units * base ) / cur);
else
res = (price * cur_prod_curr_spot_rate / base_prod_curr_spot_rate ) * (( units * base ) / cur);
if( g_userAlteredFieldIdxs[ frmMain.all("iFileSizeAmt").item(1).sourceIndex] != true )
{
frmMain.all("iFileSizeAmt").item(1).value = formatAmountString( new String( roundDecimals(res,0)) );
}
}
}
else if( (frmMain.all("fltFilePrice_0").value != "" || strlaunch_px!= "") &&
(frmMain.all("sUnits_1").value != "" ) )
{
var price = new Number(stripcommas(frmMain.all("fltFilePrice_0").value));
var launch_px = new Number(stripcommas(strlaunch_px));
var units = new Number(stripcommas(frmMain.all("sUnits_1").value));
if( g_userAlteredFieldIdxs[ frmMain.all("iFileSizeAmt").item(1).sourceIndex] != true )
{
if (launch_px > 0)
frmMain.all("iFileSizeAmt").item(1).value = formatAmountString( new String( roundDecimals(launch_px * units,0)) );
else
frmMain.all("iFileSizeAmt").item(1).value = formatAmountString( new String( roundDecimals(price * units,0)) );
}
}
}
else 
{
if(getDocumentElement("ClosedEndFundLayer"))
{
if (frmMain.all("chkClosedEndFund").checked == true)
{
frmMain.all("fltFileRangeHi_0").value = frmMain.all("fltCEFFilePrice_0").value;
frmMain.all("fltFileRangeLow_0").value = frmMain.all("fltCEFFilePrice_0").value;
}
}
if( (frmMain.all("fltFileRangeHi_0").value != "" ) &&
(frmMain.all("fltFileRangeLow_0").value != "" ))
{
var lo = new Number(stripcommas(frmMain.all("fltFileRangeLow_0").value));
var hi = new Number(stripcommas(frmMain.all("fltFileRangeHi_0").value));
var avg = lo + ((hi - lo) / 2);
if(frmMain.all("sUnits_0").value != "" )
{
var units = new Number(stripcommas(frmMain.all("sUnits_0").value));
if( g_userAlteredFieldIdxs[ frmMain.all("iFileSizeAmt").item(0).sourceIndex] != true )
{
frmMain.all("iFileSizeAmt").item(0).value = formatAmountString( new String( roundDecimals(avg * units,0)));
}
}
if( (g_tranches[1].assocProd != null) && 
(g_tranches[1].assocProd.selSecType == g_products[1].selSecType) )
{
if ( frmMain.all("sUnits_1").value != "" )
{
var units = new Number(stripcommas(frmMain.all("sUnits_1").value));
var base = new Number(frmMain.all("iConvRatioBase_1").value);
var cur = new Number(frmMain.all("iConvRatioCurr_1").value);
var elem = frmMain.all("selCurrency_0");
var base_prod_curr_id = elem.options[elem.selectedIndex].value;
var base_prod_curr_spot_rate = 1;
for(i = 0; i < g_Ccy.length; i++)
{
if (g_Ccy[i].ccy_id == base_prod_curr_id)
{
base_prod_curr_spot_rate = g_Ccy[i].spot_rate;
break;
}
}
elem = frmMain.all("selCurrency_1");
var cur_prod_curr_id = elem.options[elem.selectedIndex].value;
var cur_prod_curr_spot_rate = 1;
for(i = 0; i < g_Ccy.length; i++)
{
if (g_Ccy[i].ccy_id == cur_prod_curr_id)
{
cur_prod_curr_spot_rate = g_Ccy[i].spot_rate;
break;
}
}
frmMain.all("hidCcySpotRate_0").value = base_prod_curr_spot_rate;
frmMain.all("hidCcySpotRate_1").value = cur_prod_curr_spot_rate;
var res = (avg * cur_prod_curr_spot_rate / base_prod_curr_spot_rate) * (( units * base ) / cur);
if( g_userAlteredFieldIdxs[ frmMain.all("iFileSizeAmt").item(1).sourceIndex] != true )
{
frmMain.all("iFileSizeAmt").item(1).value = formatAmountString( new String( roundDecimals( res,0 )) );
}
}
}
else if( frmMain.all("sUnits_1").value != "" )
{
var units = new Number(stripcommas(frmMain.all("sUnits_1").value));
if( g_userAlteredFieldIdxs[ frmMain.all("iFileSizeAmt").item(1).sourceIndex] != true )
{
frmMain.all("iFileSizeAmt").item(1).value = formatAmountString(new String( roundDecimals( avg * units,0)));
}
}
}
}
}
function showHideOneArea(areaName, imageName)
{
var elthis = document.getElementById(areaName);
var image = document.getElementById(imageName);
if (elthis.style.display == 'none')
{
elthis.style.display = '';
if (image)
image.src="../images/minus.gif";
}
else
{
elthis.style.display = 'none';
if (image)
image.src="../images/plus.gif";
}
}
function SetDisplayable( iDivOrd, sDivName, bVisible )
{
frmMain.all(sDivName+"Lbl").item(iDivOrd).style.display =
bVisible ? "inline" : "none";
frmMain.all(sDivName+"Val").item(iDivOrd).style.display =
bVisible ? "inline" : "none";
}
function CustomValidation( frm, arrFieldsInError )
{
var arrMoreErrors = new Array();
var MAX_PRODUCTS = 2;
var MAX_TRANCHES = 2;
var errCount = 0;
var bHasSecondProduct = (frmMain.selSecType_1.value != "-1");
var bHasSecondTranche = (frmMain.selAssociatedProduct.value !="-1");
if(frmMain.selSecType_0.selectedIndex < 0)
{
var arrError = FieldErrorInfo("selSecType_0",frmMain.hidNoProductErr.value, "", "selSecType_0", "Product Type");
arrMoreErrors[errCount] = arrError;
errCount++;
}
if (frm.selIndustry.value == "-1")
{
var arrError = FieldErrorInfo("selIndustry", "Please select one.", "", "selIndustry", "Industry Sector");
arrMoreErrors[errCount] = arrError;
errCount++;
}
for( var i=0; i < MAX_PRODUCTS; i++)
{
var bProductExists = eval("frmMain.selSecType_"+i+".value != '-1'");
if( !bProductExists )
continue;
eval("var bIsPrivate = frmMain.cbxRegType_"+i+".item(1).checked;");
eval("var bValidRuleSelected = (frmMain.selRegRule_"+i+".value != '');");
if( bIsPrivate && !bValidRuleSelected )
{
var errStr = "Cannot add a tranche with a Private registration type unless a registration rule has been selected";
var arrError = FieldErrorInfo("selRegRule_"+i.toString(), errStr, "", "selRegRule_"+i.toString(), "Registration", 90);
arrMoreErrors[errCount] = arrError;
errCount++;
}
}
var bHasFileDate = ( frmMain.dtLaunch.value != "" );
var bIsAnnounced = ( frmMain.selState.selectedIndex == 0 );
if( bIsAnnounced )
{
if( !bHasFileDate )
{
var errStr = "Cannot announce a deal without a file date";
var arrError = FieldErrorInfo("dtLaunch", errStr, "", "dtLaunch", "File/Launch Date");
arrMoreErrors[errCount] = arrError;
errCount++;
}
var bHasSortDate = ( frmMain.dtExpOfferSortDate.value != "" );
if( !bHasSortDate )
{
var errStr = "Cannot announce a deal without the Offer Sort Date";
var arrError = FieldErrorInfo("dtExpOfferSortDate", errStr, "", "dtExpOfferSortDate", "Exp Offer Sort Date");
arrMoreErrors[errCount] = arrError;
errCount++;
}
}
if( frmMain.all("addonIPO").item(1).checked )
{
if( frmMain.fltFileRangeLow_0.value != "" )
{
validateFilePriceLo(frmMain, arrMoreErrors );
}
if( !validateNumFormat( frmMain.all("fltFileRangeLow_0").value, 7, 5 ) )
{
var errStr = "IPO - Low must be in the form '9,999,999.99999'";
var arrError = FieldErrorInfo("fltFileRangeLow_0", errStr, "", "fltFileRangeLow_0", "IPO - Low");
arrMoreErrors[arrMoreErrors.length] = arrError;
}
if( !validateNumFormat( frmMain.all("fltFileRangeHi_0").value, 7, 5 ) )
{
var errStr = "IPO - High must be in the form '9,999,999.99999'";
var arrError = FieldErrorInfo("fltFileRangeHi_0", errStr, "", "fltFileRangeHi_0", "IPO - High");
arrMoreErrors[arrMoreErrors.length] = arrError;
}
}
else
{
if( !validateNumFormat( frmMain.all("fltFilePrice_0").value, 7, 5 ) )
{
var errStr = "File Price must be in the form '9,999,999.99999'";
var arrError = FieldErrorInfo("fltFilePrice_0", errStr, "", "fltFilePrice_0", "File Price");
arrMoreErrors[arrMoreErrors.length] = arrError;
}
}
if( !validateNumFormat( frmMain.all("sUnits_0").value, 15, 0 ) )
{
var errStr = "File Size must be in the form '999,999,999,999,999'";
var arrError = FieldErrorInfo("sUnits_0", errStr, "", "sUnits_0", "File Size");
arrMoreErrors[arrMoreErrors.length] = arrError;
}
if( !validateNumFormat( frmMain.all("iFileSizeAmt_0").value, 19, 0 ) )
{
var errStr = "File size must be in the form '9,999,999,999,999,999,999'";
var arrError = FieldErrorInfo("iFileSizeAmt_0", errStr, "", "iFileSizeAmt_0", "File Size Amount");
arrMoreErrors[arrMoreErrors.length] = arrError;
}
var selAssocProd = frmMain.all("selAssociatedProduct");
if((frmMain.iSelTrancheName_1.value != "-1")&&(selAssocProd.value == "-1"))
{
var errStr = "The second tranche cannot be created without an associated product. Please select from the list of available products for this deal";
var arrError = FieldErrorInfo("selAssociatedProduct", errStr, "", "selAssociatedProduct", "Associated Product");
arrMoreErrors[arrMoreErrors.length] = arrError;
}
if( selAssocProd.value != "-1" )
{
if((frmMain.iSelTrancheName_1.value == "-1"))
{
var errStr = "Please select the second tranche name from the dropdown list.";
var arrError = FieldErrorInfo("iSelTrancheName_1", errStr, "", "iSelTrancheName_1", "The Second Tranche Name");
arrMoreErrors[arrMoreErrors.length] = arrError;
showOneArea("SecondTranche");
}
if( frmMain.iSelTrancheName_0.value == frmMain.iSelTrancheName_1.value)
{
var errStr = "Cannot use the same name for both tranches";
var arrError = FieldErrorInfo("iSelTrancheName_0", errStr, "", "iSelTrancheName_0", "Tranche Name");
arrMoreErrors[arrMoreErrors.length] = arrError;
}
if( !validateNumFormat( frmMain.all("sUnits_1").value, 15, 0 ) )
{
var errStr = "File size must be in the form '999,999,999,999,999'";
var arrError = FieldErrorInfo("sUnits_1", errStr, "", "sUnits_1", "File Size");
arrMoreErrors[arrMoreErrors.length] = arrError;
}
if( !validateNumFormat( frmMain.all("iFileSizeAmt_1").value, 19, 0 ) )
{
var errStr = "File amount must be in the form '9,999,999,999,999,999,999'";
var arrError = FieldErrorInfo("iFileSizeAmt_1", errStr, "", "iFileSizeAmt_1", "File Size Amount");
arrMoreErrors[arrMoreErrors.length] = arrError;
}
var sEnableLehSalesWorksheet = frmMain.hidEnableLehSalesWorksheet.value;
if( sEnableLehSalesWorksheet )
{ 
var oSettleWithIssuer_1 = frmMain.selSettleWithIssuer_1;
if (oSettleWithIssuer_1 != undefined && oSettleWithIssuer_1 != null && 
oSettleWithIssuer_1.options[oSettleWithIssuer_1.selectedIndex].value=="0")
{	
var errStr = "Settle With Issuer for the second tranche must be selected.";
var arrError = FieldErrorInfo("oSettleWithIssuer_1", errStr, "", "oSettleWithIssuer_1", "Settle With Issuer");
arrMoreErrors[arrMoreErrors.length] = arrError;
}
}
}
var sDealCode = frmMain.rsTxtDealCode.value;
if( sDealCode.length > 0)
{
var co = RSExecute("rs_VerifyDealCode_server.asp","VerifyDealCode", "E", sDealCode);
if (co.return_value == "1")
{
var errStr = "Deal code already exists.";
var arrError = FieldErrorInfo("rsTxtDealCode", errStr, "", "rsTxtDealCode", "Deal Code");
arrMoreErrors[arrMoreErrors.length] = arrError;
}
}
var sDescription = frmMain.sTxtDescription.value;
if (sDescription.length > 4000)
{
var errStr = "The maximum length for Description is 4000 characters";
var arrError = FieldErrorInfo("sDescription", errStr, "", "sDescription", "Description");
arrMoreErrors[arrMoreErrors.length] = arrError; 
}
var sConvRatioBase = frmMain.iConvRatioBase_1.value;
if( !sConvRatioBase.length || sConvRatioBase == "0" )
{
var errStr = "Invalid conversion ratio.";
var arrError = FieldErrorInfo("iConvRatioBase_1", errStr, "", "iConvRatioBase_1", "Conversion Ratio");
arrMoreErrors[arrMoreErrors.length] = arrError;
}
var sConvRatioCurr = frmMain.iConvRatioCurr_1.value;
if( !sConvRatioCurr.length || sConvRatioCurr == "0" )
{
var errStr = "Invalid conversion ratio.";
var arrError = FieldErrorInfo("iConvRatioCurr_1", errStr, "", "iConvRatioCurr_1", "Conversion Ratio");
arrMoreErrors[arrMoreErrors.length] = arrError;
}
var sEnableLehSalesWorksheet = frmMain.hidEnableLehSalesWorksheet.value;
if( sEnableLehSalesWorksheet == "true" )
{
var oSettleWithIssuer_0 = frmMain.selSettleWithIssuer_0;
if (oSettleWithIssuer_0.options[oSettleWithIssuer_0.selectedIndex].value=="0")
{	
var errStr = "Settle With Issuer must be selected.";
var arrError = FieldErrorInfo("oSettleWithIssuer_0", errStr, "", "oSettleWithIssuer_0", "Settle With Issuer");
arrMoreErrors[arrMoreErrors.length] = arrError;
}
}
return (arrMoreErrors);
} 
function validateFilePriceLo( frm, arrFieldsInError )
{
var arrMoreErrors = new Array();
var n1 = new Number( frm.fltFileRangeLow_0.value.replace(/(\,)/g, "") );
var n2 = new Number( frm.fltFileRangeHi_0.value.replace(/(\,)/g, "") );
if ( n1 > n2 ) 
{
var arrError = FieldErrorInfo("fltFileRangeLow_0", 'The File Price Low value exceeds the File Price High value', "", "fltFileRangeLow_0", "File Price");
arrFieldsInError[arrFieldsInError.length] = arrError;
}
}
function fixupRadioButtons()
{ 
frmMain.hsBookOpen_0.value = 
frmMain.all("radBookOpen_0").item(0).checked ?
"0" : "1";
frmMain.hsBookOpen_1.value = 
frmMain.all("radBookOpen_1").item(0).checked ?
"0" : "1";
frmMain.hsPot_0.value = 
frmMain.all("radPot_0").item(0).checked ?
"0" : "1";
frmMain.hsPot_1.value = 
frmMain.all("radPot_1").item(0).checked ?
"0" : "1";
frmMain.hsPopBook_0.value = 
frmMain.all("radPopBook_0").item(0).checked ?
"0" : "1";
frmMain.hsPopBook_1.value = 
frmMain.all("radPopBook_1").item(0).checked ?
"0" : "1";
if (frmMain.all.hidFPAsiaFunctionality.value == 1)
{ 
frmMain.hsAsiaProcess_0.value = 
frmMain.all("radAsiaProcess_0").item(0).checked ?
"0" : "1";
frmMain.hsAsiaProcess_1.value = 
frmMain.all("radAsiaProcess_1").item(0).checked ?
"0" : "1";
}
if (frmMain.all.hidFPEuroFunctionality.value == 1)
{ 
frmMain.hsEuroProcess_0.value = 
frmMain.all("radEuroProcess_0").item(0).checked ?
"0" : "1";
frmMain.hsEuroProcess_1.value = 
frmMain.all("radEuroProcess_1").item(0).checked ?
"0" : "1";
frmMain.hsChargeCommOnTrades_0.value = 
frmMain.all("radChargeCommOnTrd_0").item(0).checked ?
"0" : "1";
frmMain.hsChargeCommOnTrades_1.value = 
frmMain.all("radChargeCommOnTrd_1").item(0).checked ?
"0" : "1";
frmMain.hsPayCreditsOnTrades_0.value = 
frmMain.all("radPayCreditsOnTrd_0").item(0).checked ?
"0" : "1";
frmMain.hsPayCreditsOnTrades_1.value = 
frmMain.all("radPayCreditsOnTrd_1").item(0).checked ?
"0" : "1";
}
if( frmMain.all("radRoles").item(0).checked )
{
frmMain.hsRoles.value = "0";
}
else if( frmMain.all("radRoles").item(1).checked )
{
frmMain.hsRoles.value = "1";
}
else if( frmMain.all("radRoles").item(2).checked )
{
frmMain.hsRoles.value = "2";
}
}
function stripcommas( value )
{
return value.replace(/,/g,"");
}
function fixupNumericFields( )
{
frmMain.sUnits_0.value = stripcommas( frmMain.sUnits_0.value );
frmMain.sUnits_1.value = stripcommas( frmMain.sUnits_1.value );
frmMain.iFileSizeAmt_0.value = stripcommas( frmMain.iFileSizeAmt_0.value );
frmMain.iFileSizeAmt_1.value = stripcommas( frmMain.iFileSizeAmt_1.value );
}
function fixupRegRules( index )
{
var hRegTypeID = eval("frmMain.hRegTypeID_"+index);
var hRegRuleID = eval("frmMain.hRegRuleID_"+index);
var selRegRule = eval("frmMain.selRegRule_"+index);
var cbxRegType = eval("frmMain.cbxRegType_"+index);
var hOfferTypeID = eval("frmMain.hOfferTypeID_"+index);
var hOfferRuleID = eval("frmMain.hOfferRuleID_"+index);
var selOfferProc = eval("frmMain.selOfferProc_"+index);
var cbxOfferType = eval("frmMain.cbxOfferType_"+index);
var regSelected;
if ( cbxRegType.item(0).checked )
regSelected = cbxRegType.item(0).value;
else if ( cbxRegType.item(1).checked )
regSelected = cbxRegType.item(1).value;
if ( regSelected == g_pubRegID )
{
if( selRegRule.value == "" ) 
hRegTypeID.value = regSelected;
else
hRegTypeID.value = selRegRule.value;
hRegRuleID.value = "";
}
else if ( regSelected == g_privRegID )
{
hRegTypeID.value = regSelected;
hRegRuleID.value = selRegRule.value;
}
if (selOfferProc)
{
if ( cbxOfferType.item(0).checked )
regSelected = cbxOfferType.item(0).value;
else if ( cbxOfferType.item(1).checked )
regSelected = cbxOfferType.item(1).value;
if ( regSelected == g_pubRegID )
{
if( selOfferProc.value == "" ) 
hOfferTypeID.value = regSelected;
else
hOfferTypeID.value = selOfferProc.value;
hOfferRuleID.value = "";
}
else if ( regSelected == g_privRegID )
{
hOfferTypeID.value = regSelected;
hOfferRuleID.value = selOfferProc.value;
}
}
}
function submitPage( frm, action )
{
switch (action)
{
case "savechanges" :
if( ValidateForm( frm ) )
{
eval("var oTrnSelect = frmMain.iSelTrancheName_0;");
if(oTrnSelect.value == -1)
{
alert("Please select a Tranche");
return false;
}
if(ValidateConfidentialBookAccess(frm))
{
fixupRadioButtons();
fixupNumericFields();
fixupRegRules(0);
fixupRegRules(1);
if( frmMain.all("radRoleType").item(0).checked )
{
frmMain.all("hSelRole_0").value = frmMain.all("selRoleLead_0").value.split(',')[0];
frmMain.all("hSelRole_1").value = frmMain.all("selRoleLead_1").value.split(',')[0];
}
else
{
frmMain.all("hSelRole_0").value = frmMain.all("selRoleNonLead_0").value.split(',')[0];
frmMain.all("hSelRole_1").value = frmMain.all("selRoleNonLead_1").value.split(',')[0];
}
for(var i=0; i<g_totBookrunners.length; i++)
{
if( g_totBookrunners[i] != null )
{
var bkRunners = g_totBookrunners[i];
for(var j=0; j<bkRunners.length; j++)
{
if( !bkRunners[j] )
continue;
bkRunners[j].bracket_id = frmMain.hMgmtBracket.value;
}
eval("var oSynd = frmMain.hSyndParticipants_" + i + ";");
oSynd.value = SyndMemArrayToXML( bkRunners );
}
}
setIndustry(frm);
setExchangeTradedNotes(frm);
frm.action = "/asp/specialutil_submit_action.asp";
frm.hidAction.value = "AddEQDS";
frm.submit();
}
}
break;
}
}
function OnSelectTrnSetPotType(frm,elt)
{	
var sNameExt = elt.name.replace("iSelTrancheName","");	
var sSelectedTrn = "hidPot" + elt.value + sNameExt;
var sHardPotName ="radPot" + sNameExt ;
var sSoftPotName = "radPot" + sNameExt ;
if(frm.elements[sSelectedTrn])	
{
if(frm.elements[sSelectedTrn].value == "False")
{ 
frm.elements[sSoftPotName][1].checked = true; 
}
else
{ 
frm.elements[sHardPotName][0].checked = true;
}
}
else
{
frm.elements[sSoftPotName][0].checked = false;
frm.elements[sSoftPotName][1].checked = false;
}
}
function OnSelectTrnGetBroker(frm,elt)
{
var sNameExt = elt.name.replace("iSelTrancheName","");
var strData = "";
var iBrkID = 0; 
var sBrkName = ""; 
var iBrkMstrID = 0; 
var sBrkMstrName = "";	
var sIndex = sNameExt.replace("_","");
if(g_totBookrunners[sIndex])
{
var oRemoveBR = new Object();
if( sIndex == 0 )
{
oRemoveBR.brk_id = frmMain.hLeadTrnBrokerID.value;
}
else
{
oRemoveBR.brk_id = frmMain.hSecondTrnBrokerID.value;
}
if(oRemoveBR.brk_id != 0)
{
var oExistingBR = getBrokerByID( g_totBookrunners[sIndex], oRemoveBR.brk_id );
if( oExistingBR != null )
{
RemoveBookrunner( g_totBookrunners[sIndex], oRemoveBR);
}
UpdateBookrunnerUI( sIndex );
}
}
if( frmMain.all("radRoleType").item(0).checked )
{
eval("var oRoleSelect = frmMain.selRoleLead"+sNameExt+";");
}
else
{
eval("var oRoleSelect = frmMain.selRoleNonLead"+sNameExt+";");
}
if (oRoleSelect.selectedIndex > 0)
{
OnSelChangeTrnSubsidiary(frm, elt);
onRoleChange(oRoleSelect);
}
}
function onRoleTypeClicked(oField)
{
if( frmMain.all("radRoleType").item(0).checked )
{
SetDisplayable( iDivOrdLeadTrn, "divRoleTypeLead", true );
SetDisplayable( iDivOrdLeadTrn, "divRoleTypeNonLead", false );
SetDisplayable( iDivOrdSecondTrn, "divRoleTypeLead", true );
SetDisplayable( iDivOrdSecondTrn, "divRoleTypeNonLead", false );
SetDisplayable( iDivOrdLeadTrn, "divRoleLead", true );
SetDisplayable( iDivOrdLeadTrn, "divRoleNonLead", false );
SetDisplayable( iDivOrdSecondTrn, "divRoleLead", true );
SetDisplayable( iDivOrdSecondTrn, "divRoleNonLead", false );
eval("var oRoleSelectLeadTrn = frmMain.selRoleLead_0;");
eval("var oRoleSelectSecondTrn = frmMain.selRoleLead_1;");
}
else
{
SetDisplayable( iDivOrdLeadTrn, "divRoleTypeLead", false );
SetDisplayable( iDivOrdLeadTrn, "divRoleTypeNonLead", true );
SetDisplayable( iDivOrdSecondTrn, "divRoleTypeLead", false );
SetDisplayable( iDivOrdSecondTrn, "divRoleTypeNonLead", true );
SetDisplayable( iDivOrdLeadTrn, "divRoleLead", false );
SetDisplayable( iDivOrdLeadTrn, "divRoleNonLead", true );
SetDisplayable( iDivOrdSecondTrn, "divRoleLead", false );
SetDisplayable( iDivOrdSecondTrn, "divRoleNonLead", true );
eval("var oRoleSelectLeadTrn = frmMain.selRoleNonLead_0;");
eval("var oRoleSelectSecondTrn = frmMain.selRoleNonLead_1;");
}
onRoleChange(oRoleSelectLeadTrn);
onRoleChange(oRoleSelectSecondTrn);
}
function ValidateConfidentialBookAccess(frm)
{
var bIsAnnounced = ( frm.selState.selectedIndex == 0 );
if(!bIsAnnounced)
{
var bBookOpen0 = frm.all("radBookOpen_0").item(0).checked ? 1 : 0;
var bBookOpen1 = frm.all("radBookOpen_1").item(0).checked ? 1 : 0;
if((bBookOpen0 == 1)||(bBookOpen1 == 1))
{
return confirm(frm.hidConfidentialBookAccessConfirm.value);
}
}
return true;
}
function OnSelectTrnSetPopulateDirect(frm,elt)
{	
var sNameExt = elt.name.replace("iSelTrancheName","");	
var sSelectedTrn = "hidPopulateDirect" + elt.value + sNameExt;
var sPopBookYes ="radPopBook" + sNameExt ;
var sPopBookNo = "radPopBook" + sNameExt ;
if(frm.elements[sSelectedTrn])	
{
if(frm.elements[sSelectedTrn].value == "False")
{ 
frm.elements[sPopBookNo][1].checked = true; 
}
else
{ 
frm.elements[sPopBookYes][0].checked = true;
}
}
else
{
frm.elements[sPopBookNo][0].checked = false;
frm.elements[sPopBookNo][1].checked = false;
}
}
function OnSelectTrnSetEuroProcess(frm,elt)
{	
var sNameExt = elt.name.replace("iSelTrancheName","");	
if (frm.hidFPEuroFunctionality.value == 1)
{
var sSelectedEuroTrn = "hidEuroProcess" + elt.value + sNameExt;
var sEuroProcess = "radEuroProcess" + sNameExt ;
if(frm.elements[sSelectedEuroTrn])	
{
if(frm.elements[sSelectedEuroTrn].value == "False")
{ 
frm.elements[sEuroProcess][1].checked = true; 
}
else
{ 
frm.elements[sEuroProcess][0].checked = true;
}
}
else
{
frm.elements[sEuroProcess][0].checked = false;
frm.elements[sEuroProcess][1].checked = false;
}
}
if (frm.hidFPAsiaFunctionality.value == 1)
{
var sSelectedAsiaTrn = "hidAsiaProcess" + elt.value + sNameExt;
var sAsiaProcess = "radAsiaProcess" + sNameExt ;
if(frm.elements[sSelectedAsiaTrn])	
{
if(frm.elements[sSelectedAsiaTrn].value == "False")
{ 
frm.elements[sAsiaProcess][1].checked = true; 
}
else
{ 
frm.elements[sAsiaProcess][0].checked = true;
}
}
else
{
frm.elements[sAsiaProcess][0].checked = false;
frm.elements[sAsiaProcess][1].checked = false;
}
}
}
function showOneArea(areaName)
{
var elthis = eval(areaName);
elthis.style.display = '';
}
function getDocumentElement(sElementName)
{
if (document.getElementById)
{
return document.getElementById(sElementName);
}
else if (document.all)
{
return document.all[sElementName];
}
else if (document.layers)
{	
if (document.layers[sElementName])
{
return document.layers[sElementName]; 
}
for(var i=0;i<document.layers.count-1;i++)
{
if (document.layers[i].elements[sElementName])
{
return document.layers[i].elements[sElementName];
}
} 
}
return 0;
}
function OnPutCommentsChange()
{
var lLen = new Number(document.all.txtPutComments.value.length);
if (lLen > 50)
{
var sTxt = document.all.txtPutComments.value;
document.all.txtPutComments.value = sTxt.substring(0,50);	
}
}
function OnCallCommentsChange()
{
var lLen = document.all.txtCallComments.value.length;
if (lLen > 50)
{
var sTxt = document.all.txtCallComments.value;
document.all.txtCallComments.value = sTxt.substring(0,50);	
}
}
function OnPutCommentsPress()
{
OnPutCommentsChange();
}
function OnCallCommentsPress()
{
OnCallCommentsChange();
}
function onselStateChanged()
{
if (frmMain.selState.selectedIndex == 1)
{
frmMain.all("radBookOpen_0").item(1).checked = true;
frmMain.all("radBookOpen_0").item(0).disabled = true;
frmMain.all("radBookOpen_0").item(1).disabled = true;
frmMain.all("radBookOpen_1").item(1).checked = true;
frmMain.all("radBookOpen_1").item(0).disabled = true;
frmMain.all("radBookOpen_1").item(1).disabled = true;
frmMain.all("radRoles").item(0).disabled = true;
frmMain.all("radRoles").item(1).disabled = true;
frmMain.all("radRoles").item(2).disabled = true;
}
else
{
frmMain.all("radBookOpen_0").item(0).disabled = false;
frmMain.all("radBookOpen_0").item(1).disabled = false;
frmMain.all("radBookOpen_1").item(0).disabled = false;
frmMain.all("radBookOpen_1").item(1).disabled = false;
frmMain.all("radRoles").item(0).disabled = false;
frmMain.all("radRoles").item(1).disabled = false;
frmMain.all("radRoles").item(2).disabled = false;
}
}
function OnSelChangeTrnSubsidiary(frm, elt)
{
var sNameExt = elt.name.replace("iSelTrancheName","");	
var sSelectedTrn = "hidDefBrkId" + elt.value + sNameExt;
var ctr = 0;
var sSubSel = "iSelSubId" + sNameExt;
if(frm.elements[sSelectedTrn])
{
var brkid = frm.elements[sSelectedTrn].value;
var selindex = 0;
for(ctr = 0; ctr < frm.elements[sSubSel].length; ctr++)
{
if (frm.elements[sSubSel].options.item(ctr).value == brkid)
{
frm.elements[sSubSel].selectedIndex = ctr;
selindex = ctr;
}
}
if(sNameExt == "_0")
{
frm.hLeadTrnBrokerName.value = frm.elements[sSubSel].options.item(selindex).text;
frm.hLeadTrnBrokerID.value = frm.elements[sSubSel].value;
}
else
{
frm.hSecondTrnBrokerName.value = frm.elements[sSubSel].options.item(selindex).text;
frm.hSecondTrnBrokerID.value = frm.elements[sSubSel].value;
}
}
}
function OnSelSubIdChange(elt)
{
var sNameExt = elt.name.replace("iSelSubId","");	
var sField;
if( frmMain.all("radRoleType").item(0).checked )
sField = "selRoleLead" + sNameExt;
else
sField = "selRoleNonLead" + sNameExt;
var index = elt.name.split('_')[1];
if( g_totBookrunners[index])
{
var oRemoveBR = new Object(); 
if( index == 0 )
{
oRemoveBR.brk_id = document.frmMain.hLeadTrnBrokerID.value;
}
else
{
oRemoveBR.brk_id = document.frmMain.hSecondTrnBrokerID.value;
}	
if(oRemoveBR.brk_id != 0)
{
var oExistingBR = getBrokerByID( g_totBookrunners[index], oRemoveBR.brk_id );
if( oExistingBR != null )
{
RemoveBookrunner( g_totBookrunners[index], oRemoveBR);
}
UpdateBookrunnerUI( index );
} 
}
if(index == 0)
{
document.frmMain.hLeadTrnBrokerName.value = elt.options.item(elt.selectedIndex).text;
document.frmMain.hLeadTrnBrokerID.value = elt.value;
}
else
{
document.frmMain.hSecondTrnBrokerName.value = elt.options.item(elt.selectedIndex).text;
document.frmMain.hSecondTrnBrokerID.value = elt.value;
}	
onRoleChange( document.frmMain.elements[sField] )
}
function onClickConCurrentOffering(cbConCurrentOffering)
{
if (!cbConCurrentOffering.checked)
{
getDocumentElement("ConcurrentOfferingDealLayer").style.display = "none";
}
else
{
getDocumentElement("ConcurrentOfferingDealLayer").style.display = "";
} 
}
function onCancel()
{
document.location.href = "/aspx/UI/Deal/IssuerSearch.aspx";
}
function setIndustry(frm)
{
var sIndustry = new Array();
var s = frm.selIndustry.options[frm.selIndustry.selectedIndex].value;
if (s.indexOf(",") != -1) {
sIndustry = s.split(',');
if (sIndustry[1] == 0) 
frm.hidSector.value = "False";
else
frm.hidSector.value = "True"; 
}
frm.hidIndustryId.value = sIndustry[0];
}
function OnEnableProspectusChecked()
{
var oChkBox = document.getElementById("chkUseIdealProspectus") ;
var arrRadBlockIOI = document.getElementsByName("radBlockIOI");
if(!oChkBox.checked)
{
for(var i = 0; i < arrRadBlockIOI.length; i++)
{
arrRadBlockIOI[i].disabled = true;
}
}
else
{
for(var i = 0; i < arrRadBlockIOI.length; i++)
{
arrRadBlockIOI[i].disabled = false;
}
}
}
function OnEnableAllowSalesToEnterPM()
{
var oChkBox = document.getElementById("chkAllowSalesToEnterPM") ;
var arrRadBlockIOI = document.getElementsByName("radBlockIOIwoPM");
if(!oChkBox.checked)
{
for(var i = 0; i < arrRadBlockIOI.length; i++)
{
arrRadBlockIOI[i].disabled = true;
}
}
else
{
for(var i = 0; i < arrRadBlockIOI.length; i++)
{
arrRadBlockIOI[i].disabled = false;
}
}
}
function setExchangeTradedNotes(frm)
{
if (document.frmMain.all("chkExchTradedNotes") != null)
{
if (document.frmMain.all("chkExchTradedNotes").checked == true)
document.frmMain.hidExchTradedNotes.value = 1;
else
document.frmMain.hidExchTradedNotes.value = 0;
}
}
function onEuroProcessingClicked()
{
if (frmMain.all("radEuroProcess_0").item(0).checked)
{
frmMain.all("radPayCreditsOnTrd_0").item(0).disabled = false;
frmMain.all("radPayCreditsOnTrd_0").item(1).disabled = false;
frmMain.all("radChargeCommOnTrd_0").item(0).disabled = false;
frmMain.all("radChargeCommOnTrd_0").item(1).disabled = false;
}
else
{
frmMain.all("radPayCreditsOnTrd_0").item(1).checked = true;
frmMain.all("radChargeCommOnTrd_0").item(1).checked = true;
frmMain.all("radPayCreditsOnTrd_0").item(0).disabled = true;
frmMain.all("radPayCreditsOnTrd_0").item(1).disabled = true;
frmMain.all("radChargeCommOnTrd_0").item(0).disabled = true;
frmMain.all("radChargeCommOnTrd_0").item(1).disabled = true;
}
if (frmMain.all("radEuroProcess_1").item(0).checked)
{
frmMain.all("radPayCreditsOnTrd_1").item(0).disabled = false;
frmMain.all("radPayCreditsOnTrd_1").item(1).disabled = false;
frmMain.all("radChargeCommOnTrd_1").item(0).disabled = false;
frmMain.all("radChargeCommOnTrd_1").item(1).disabled = false;
}
else
{
frmMain.all("radPayCreditsOnTrd_1").item(1).checked = true;
frmMain.all("radChargeCommOnTrd_1").item(1).checked = true;
frmMain.all("radPayCreditsOnTrd_1").item(0).disabled = true;
frmMain.all("radPayCreditsOnTrd_1").item(1).disabled = true;
frmMain.all("radChargeCommOnTrd_1").item(0).disabled = true;
frmMain.all("radChargeCommOnTrd_1").item(1).disabled = true;
}
}
function ToggleEuroAsiaProcess( type, trnLead )
{
var oTrnLead = "_0";
if (trnLead == 'False')
oTrnLead = "_1";
var radEuroProcess = frmMain.all("radEuroProcess"+oTrnLead);
var radAsiaProcess = frmMain.all("radAsiaProcess"+oTrnLead);
if(radEuroProcess != null && radAsiaProcess != null)
{
if (type == 'asia')
{
radEuroProcess[0].checked = false;
radEuroProcess[1].checked = true; 
}
if (type == 'euro')
{ 
radAsiaProcess[0].checked = false;
radAsiaProcess[1].checked = true; 
} 
}
}
function onChargeCommOnTrdChange()
{
if (frmMain.all("radChargeCommOnTrd_0").item(0).checked)
frmMain.all("radPayCreditsOnTrd_0").item(1).checked = true;
if (frmMain.all("radChargeCommOnTrd_1").item(0).checked)
frmMain.all("radPayCreditsOnTrd_1").item(1).checked = true;
}
function onPayCreditsOnTrdChange()
{
if (frmMain.all("radPayCreditsOnTrd_0").item(0).checked)
frmMain.all("radChargeCommOnTrd_0").item(1).checked = true;
if (frmMain.all("radPayCreditsOnTrd_1").item(0).checked)
frmMain.all("radChargeCommOnTrd_1").item(1).checked = true;
}
