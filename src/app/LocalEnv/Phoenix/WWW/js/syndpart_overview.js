<!-- 
function onPageLoad()
{
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
function submitPage( frm , action )
{
if (frm.hidnOverallotment.value > 0 || frm.hidCurrTrnLockInd.value > 0 || frm.hidAllLockInd.value > 0)
return; 
switch (action)
{
case "SaveChanges" :
if(ValidateForm( frm ))
{
frm.method = "POST"; 
frm.action = "util_submit_action.asp";
frm.submit(); 
}
break;
case "RevertToSaved" :
window.location.reload();
break;
case "Cancel" :
frm.action = "/asp/_template.asp";
frm.submit();
break;
case "AddReg" :
frm.action = "/asp/_template.asp";
frm.hidAction.value = "Add";
frm.submit();
break;
case "AddParticipants" :
frm.method = "POST";
frm.action = "syndpart_add_uw.asp";
frm.hidAction.value = "AddParticipants";
frm.submit();
break; 
case "EditParticipants" :
frm.method = "POST";
frm.action = "syndpart_edit_grp_part.asp";
frm.hidAction.value = "EditParticipants";
frm.submit();
break; 
case "EditWorksheet" :
frm.method = "POST";
frm.action = "syndpart_edit_worksheet.asp";
frm.hidAction.value = "EditWorksheet";
frm.submit();
break; 
case "Edit" : 
frm.method = "POST";
frm.action = "syndpart_edit_uw.asp";
frm.hidAction.value = "Edit";
frm.submit();
break; 
case "EditGroups" : 
frm.method = "POST";
frm.action = "syndpart_edit_uw_group.asp";
frm.hidAction.value = "EditGroups";
frm.submit();
break; 
}
}
function addParticipants(frm, action, trnid, lockedInd, showWarning)
{
var bContinue = true;
if (showWarning) 
bContinue = window.confirm("You have entered your commitments for one of the syndicate participants. Adding a new participant will erase previously entered commitments. To prevent this from occurring in the future please use 'Edit Groups' to allocate your group commitments.\nDo you want to continue?");
if (bContinue)
{
frm.hidCurrTrnLockInd.value = lockedInd;
frm.hidTrnid.value = trnid;
submitPage(frm, action);
}
}
function editParticipants(frm, action, trnid, trngrpid, lockedInd)
{
frm.hidCurrTrnLockInd.value = lockedInd;
frm.hidTrngrpid.value = trngrpid;
frm.hidTrnid.value = trnid;
submitPage(frm, action); 
}
function editWorksheet(frm, action, trnid, trngrpid, lockedInd)
{
frm.hidCurrTrnLockInd.value = lockedInd;
frm.hidTrngrpid.value = trngrpid;
frm.hidTrnid.value = trnid;
submitPage(frm, action); 
}
function edit(frm, action, trnid, brkid, lockedInd)
{
frm.hidCurrTrnLockInd.value = lockedInd;
frm.hidBrkid.value = brkid;
frm.hidTrnid.value = trnid;
submitPage(frm, action); 
}
function editGroups(frm, action, trnid, lockedInd)
{
frm.hidCurrTrnLockInd.value = lockedInd;
frm.hidTrnid.value = trnid;
submitPage(frm, action); 
} 
