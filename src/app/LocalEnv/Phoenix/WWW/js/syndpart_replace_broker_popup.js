<!-- 
function onEnterPressed( event, element, funcHandler ) 
{
var bEnterPressed;
if (document.all) 
{
bEnterPressed = (window.event && window.event.keyCode == 13);
}
else
{
bEnterPressed = (event && event.which == 13);
}
if ( bEnterPressed )
{
funcHandler();
}
}
function findBroker()
{
var frm = document.frmMain;
if (frm.txtFindBrokerByName.value == "")
{
alert("Please enter at least 1 character to search for Broker/Dealer");
return;
}
frm.method = "POST";
frm.action = "syndpart_replace_broker.asp?IssueId=" + frm.hidCurrIssId.value + "&TrancheId=" + frm.selTrancheName.options.item(frm.selTrancheName.selectedIndex).value + "&CalledFrom=" + frm.hidCalledFrom.value + "&replace=" + frm.hidReplace.value;
frm.submit();
}
function ReplaceBroker()
{
var frm = document.frmMain;
if (Validate(frm))
{
frm.method = "POST";
frm.action = "util_submit_action_EQ.asp";
frm.submit();
}
}
function Validate(frm)
{
var i;
if (frm.selBrokerName.selectedIndex < 1)
{
if (frm.hidReplace.value = "broker")
alert("Please select the Broker to be replaced");
else
alert("Please select the Subsidiary to be replaced");
return false;
}
var bFound = false;
var index;
for(i = 1; i < frm.radReplaceWith.length; i++)
{
if (frm.radReplaceWith[i].checked)
{
bFound = true;
index = i;
}
}
if (bFound == false	)
{
if (frm.hidReplace.value = "broker")
alert("Please select a new broker");
else
alert("Please select a new subsidiary");
return false;
}
else
{
var retval;
retval = confirm("Are you sure you want to replace '" + frm.selBrokerName.options.item(frm.selBrokerName.selectedIndex).text + "' with '" + frm.hidBrokerNm[index].value + "'?");	
if (retval == false)
return false;
}
return true; 
}
function ChangeTranche()
{
var frm = document.frmMain;
frm.method = "POST";
frm.action = "syndpart_replace_broker.asp?IssueId=" + frm.hidCurrIssId.value + "&TrancheId=" + frm.selTrancheName.options.item(frm.selTrancheName.selectedIndex).value + "&CalledFrom=accounting_recap&replace=" + frm.hidReplace.value;
frm.submit();
}
