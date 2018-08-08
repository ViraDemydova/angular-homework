<!-- 
function CheckConditionallyRequiredFields( frm, arrFieldsInError )
{
var arrMoreErrors = new Array();
return (arrMoreErrors);
} 
function CustomValidation( frm, arrFieldsInError )
{
var arrMoreErrors = new Array();
if (frm.hidAction.value == "Save")
{
if (frm.sName.value.length == 0)
{
var arrError = FieldErrorInfo("", "", "", "sName", "Industry Sector Name required");
arrError[2] = '';
arrMoreErrors[0] = arrError;	
return (arrMoreErrors);
}
}
return (arrMoreErrors);
} 
function submitPage( frm , action )
{
switch (action)
{
case "cancel" :
frm.action = "/asp/mastertables_industrysector.asp";
frm.submit();
break;
case	"savechanges" :
if(ValidateForm( frm ))
{
if (frm.sName.value.length <= 0)
{
alert("Please enter Industry Sector information first.")
return;
}
frm.hidSaveXml.value = BuildSaveXml(frm);
frm.method = "POST";
frm.hidAction.value = "Save";
frm.action = "/asp/util_submit_action.asp";
frm.submit();
}
break;
case	"find" :
frm.method = "POST";
frm.hidAction.value = action;
frm.action = "/asp/mastertables_industrysector.asp";
frm.submit();
break;
case	"create" :
frm.method = "POST";
frm.hidAction.value = action;
frm.action = "/asp/mastertables_industrysector.asp";
frm.submit();
break;
case	"viewAll" :
frm.method = "POST";
frm.hidAction.value = action;
frm.action = "/asp/mastertables_industrysector.asp";
frm.submit();
break;
case	"edit" :
frm.method = "POST";
frm.hidAction.value = "find";
frm.action = "/asp/mastertables_industrysector.asp";
frm.submit();
break;
}
}
function setSubmitPage(iRequestID, frm , action ) 
{
frm.iRequestID.value = iRequestID;
submitPage( frm , action );
} 
function onEnter()
{
var keyCode = event.keyCode;
if (keyCode == 13){
submitPage(document.frmMain, "find");
}
}
function onChange()
{
var frm = document.frmMain;
var iSelected = frm.lstGroup.selectedIndex;
if (iSelected != -1)
{
var aValues;
var sValue = frm.lstGroup.options[iSelected].value;
aValues = sValue.split('|');
frm.sUpdGrpName.value = frm.lstGroup.options[iSelected].text;
frm.sUpdGrpCode.value = aValues[1];
frm.chkUpdGrpActive.checked = aValues[2] == "1" ? true : false;
}
}
function XMLEntityEncode(sText, fromXml)
{
if(sText==null) return null;
var sReplaceStringsEntityRef=new Array();
sReplaceStringsEntityRef[0]="&amp;";
sReplaceStringsEntityRef[1]="&gt;";
sReplaceStringsEntityRef[2]="&lt;";
sReplaceStringsEntityRef[3]="&quot;";	
sReplaceStringsEntityRef[4]="&apos;";
var sReplaceStringsEntity=new Array();
sReplaceStringsEntity[0]="&";
sReplaceStringsEntity[1]=">";
sReplaceStringsEntity[2]="<";
sReplaceStringsEntity[3]="\\\"";
sReplaceStringsEntity[4]="\\\'";
var sRet=sText;
for(var i=0;i<sReplaceStringsEntityRef.length;i++)
{
if(fromXml)
{
var re = new RegExp(sReplaceStringsEntityRef[i], "g");
sRet=sRet.replace(re, sReplaceStringsEntity[i]);
}
else
{
var re = new RegExp(sReplaceStringsEntity[i], "g");
sRet=sRet.replace(re, sReplaceStringsEntityRef[i]);
}
}	
return sRet;
}
function BuildSaveXml(frm)
{
var sXml = "<sector>";
if (frm.hidAction.value != "create")
sXml += "<ind_sect_id>" + frm.iRequestID.value + "</ind_sect_id>";
sXml += "<ind_sect_cd>" + XMLEntityEncode(frm.sCode.value, false) + "</ind_sect_cd>";
sXml += "<ind_sect_nm>" + XMLEntityEncode(frm.sName.value, false) + "</ind_sect_nm>";
sXml += "<active_ind>" + (frm.chkActive.checked == true ? "1" : "0") + "</active_ind>";
if (frm.lstGroup.options.length > 0)
{
sXml += "<groups>";
for (i=0; i < frm.lstGroup.options.length; i++)
{
var aValues;
var sValue = frm.lstGroup.options[i].value;
aValues = sValue.split('|');
sXml += "<group>";
if (aValues[0] != -1)
sXml += "<ind_grp_id>" + XMLEntityEncode(aValues[0], false) + "</ind_grp_id>";
sXml += "<ind_grp_cd>" + XMLEntityEncode(aValues[1], false) + "</ind_grp_cd>";
sXml += "<ind_grp_nm>" + XMLEntityEncode(frm.lstGroup.options[i].text, false) + "</ind_grp_nm>";
sXml += "<active_ind>" + aValues[2] + "</active_ind>";
sXml += "</group>";
}
sXml += "</groups>";
}
sXml += "</sector>";
return sXml;
}
function onAddGroup()
{
var frm = document.frmMain;
if (frm.sName.value.length <= 0)
{
alert("Please enter Industry Sector information first.")
return;
}
if (frm.sAddGrpName.value.length <= 0)
{
alert("Please enter Industry Group name.")
return;
}
var length = frm.lstGroup.options.length;
var opt = document.createElement('OPTION');
opt.text = frm.sAddGrpName.value;
opt.value = "-1|" + frm.sAddGrpCode.value + "|" + (frm.chkAddGrpActive.checked == true ? "1" : "0");
frm.lstGroup.options.add(opt, length);
frm.lstGroup.size = (length < 2 ? 2 : length+1);
}
function onUpdateGroup()
{
var frm = document.frmMain;
var iSelected = frm.lstGroup.selectedIndex;
if (iSelected != -1)
{
if (frm.sUpdGrpName.value.length <= 0)
{
alert("Industry Group name can not be empty.")
return;
}
var aValues;
var sValue = frm.lstGroup.options[iSelected].value;
aValues = sValue.split('|');
frm.lstGroup.options[iSelected].text = frm.sUpdGrpName.value;
frm.lstGroup.options[iSelected].value = aValues[0] + "|" + frm.sUpdGrpCode.value + "|" + (frm.chkUpdGrpActive.checked == true ? "1" : "0");
}
}
