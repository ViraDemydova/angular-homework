<!--
RSEnableRemoteScripting("/_ScriptLibrary")
function ChangeCustomer(a_id)
{
window.navigate("cadmin_dca_groups.asp?customerID=" + a_id);
}
function SelectGroupCallback(a_userGroup, e_id)
{	
var e = getGroup(e_id);
SelectGroup(e.value, a_userGroup);
}
function getGroup(e_id)
{
var e = document.all(e_id);	
if(e.length)
{
for(var i=0;i<e.length;i++)
{
if(e[i].checked==true)
{	
e = e[i];
break;
}
}
}
return e;
}
function SelectGroup(groupID, a_userGroup, a_CheckIndex)
{
if(a_CheckIndex!=null)
{
var e = document.all("SelectedGroup");
if(e.length)
e[a_CheckIndex].checked = true;
else
e.checked = true;
}
var lCustomerID = GE("hidCustomerId").value;
var co = RSExecute('rs_dca.asp','GetSelectedGroup', lCustomerID, groupID);
var dom = CheckRemoteScriptingError(co);
if(dom==null)
return;
var nodeList = dom.selectNodes("/response/data/users/user");
var xPathArr = new Array();
xPathArr[0] = "id";
xPathArr[1] = "name";
xPathArr[2] = "subsidiary";
xPathArr[3] = "businessArea";
xPathArr[4] = "userID";
xPathArr[5] = "debtEquity";
a_userGroup.clearRows();
a_userGroup.addRowsDOM(nodeList, xPathArr);	
}
function AddUsers()
{
var lCustomerID = GE("hidCustomerId").value;
var vReturnValue = self.showModalDialog ("cadmin_dca_groups.asp?mode=User&customerID="+lCustomerID,self, "help=no,scroll=no");
}
function SearchUsers(a_userGroup)
{ 
var lCustomerID = GE("hidCustomerId").value;
var sLastName = GE("lastNameText").value;
var sFirstName = GE("firstNameText").value;
var sUserID= GE("userIDText").value;
var eBusinessList = GE("ag_types");
var sBusinessArea = eBusinessList.options[eBusinessList.selectedIndex].value;
var eSubsList = GE("ag_subs");
var lSubID = eSubsList.options[eSubsList.selectedIndex].value;
var co = RSExecute('rs_dca.asp','ListUsersDOM', lCustomerID, sLastName, sFirstName, sUserID, sBusinessArea, Number(lSubID), 0);
var dom = CheckRemoteScriptingError(co);
if(dom==null)
return;
var nodeList = dom.selectNodes("/response/data/users/user");
var xPathArr = new Array();
xPathArr[0] = "id";
xPathArr[1] = "name";
xPathArr[2] = "subsidiary";
xPathArr[3] = "businessArea";
xPathArr[4] = "userID";
xPathArr[5] = "debtEquity";
a_userGroup.clearRows();
a_userGroup.addRowsDOM(nodeList, xPathArr);
if(nodeList.length==0)
alert('No user found.');
}
function getSelectedUsers(fromControl, e_id)
{
var e = getAll(e_id);
var addArray=new Array();
var addXML = "<list>";
if(e.length==0)
{ 
return null;
}
for(var i=0;i<e.length;i++)
{
if(e[i].checked)
{
var rowArr = fromControl.getRowArray(e[i].parentNode.parentNode.id);
addArray[addArray.length] = rowArr;
addXML += '<id num="'+rowArr[fromControl.rowIndexColumn]+'"/>';
}
}
addXML += "</list>";
var arr=new Array();
arr[0] = addXML;
arr[1] = addArray;
return arr;
}
function DeleteUsers(a_userGroup, e_id)
{
var lCustomerID = GE("hidCustomerId").value;
var lGroupID = getGroup("SelectedGroup").value;
var ax = getSelectedUsers(a_userGroup, e_id);
if(ax==null || ax[1].length==0)
return;
if( !confirm("You are about to delete these selected Users from the Group.\nAre you sure you want to continue?") )
return;
var deleteXML = ax[0];
var deleteArray = ax[1];
var co = RSExecute('rs_dca.asp','DeleteUsersFromGroup', lCustomerID, lGroupID, deleteXML);
if( CheckRemoteScriptingError(co) == null )	
return;
for(var j=0;j<deleteArray.length;j++)
{
a_userGroup.removeRow(deleteArray[j][a_userGroup.rowIndexColumn]);
}
}
function AddSelectedUsers(fromControl, toControl, e_id)
{
var lCustomerID = GE("hidCustomerId").value;
var lGroupID = window.dialogArguments.getGroup("SelectedGroup").value;
var ax = getSelectedUsers(fromControl, e_id);
if(ax==null || ax[1].length==0)
{
self.close();
return;
}
var addXML = ax[0];
var addArray = ax[1];
var co = RSExecute('rs_dca.asp','AddUsersToGroup', lCustomerID, lGroupID, addXML);
if( CheckRemoteScriptingError(co) == null )
return;	
toControl.addRowsArray(addArray, true);
self.close();
}
function SaveGroup(group_id)
{
var lCustomerID = GE("hidCustomerId").value;
var eTypes = GE("ag_types");
var sGroupName = GE("ag_name").value;
if(sGroupName == "")
{
alert("Blank name not allowed for group! \nPlease re-enter.");
return;
}
var sGroupTypes = "";
var sGroupTypesXML = '<list type="type">';
for(var i=0;i<eTypes.options.length;i++)
{
if(eTypes.options[i].selected)
{
if(sGroupTypes.length > 0)
sGroupTypes += ", ";
sGroupTypes += eTypes.options[i].innerText;
sGroupTypesXML += '<id num="' + eTypes.options[i].value + '"/>';
}
}
sGroupTypesXML += "</list>";
var co;
if(group_id!=null)
{
co = RSExecute('rs_dca.asp','EditGroupInCustomer', lCustomerID, sGroupName, sGroupTypesXML, group_id);
}
else
{
co = RSExecute('rs_dca.asp','AddGroupToCustomer', lCustomerID, sGroupName, sGroupTypesXML);
}
if(co.return_value == -1 || isNaN(co.return_value))
{
CheckRemoteScriptingError(co);
}
else
{
var arr = new Array();
arr[0] = co.return_value;
arr[1] = sGroupName;
arr[2] = sGroupTypes;
window.returnValue = arr;
self.close();
}
}
