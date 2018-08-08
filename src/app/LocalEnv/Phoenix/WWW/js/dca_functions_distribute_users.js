<!--
RSEnableRemoteScripting("/_ScriptLibrary")
function FilterOutAssignedFromAvailableTreeView()
{
FilterTypeTreeView(GE('selectTypeSelector_all'), 'treeView_functions', 'all_');
var assignedFunctions = getAll("assigned_SelectAllFunctions");
for(var i=0;i<assignedFunctions.length;i++)
{
var id = strip_dsName("assigned", assignedFunctions[i].value);
var rows = document.all("all_function_all"+id+"_id");
if(rows && rows.length)
{
for(var j=0;j<rows.length;j++)
{
rows[j].style.display="none";
}
}
else if(rows)
{
rows.style.display="none";
}
}
}
function FilterTypeTreeView(a_sel, a_control_id, a_dsName)
{	
var filterVal = a_sel.options[a_sel.selectedIndex].value;	
var holder = GE(a_control_id);
var types = getAll(a_dsName+"typeSelector");
for(var i=0;i<types.length;i++)
{ 
var disp = ( types[i].innerText.indexOf(filterVal) == -1 ) ? "none" : "inline";
var rows = document.all(types[i].parentNode.id);
if(rows && rows.length)
{
for(var j=0;j<rows.length;j++)
{
rows[j].style.display = disp;
}
}
else if(rows)
{
types[i].parentNode.style.display = disp;
}
}	
}
function FilterType(a_sel, a_control, a_index)
{	
var filterVal = a_sel.options[a_sel.selectedIndex].value;
a_control.filterRows(filterVal, a_index);
}
function SelectGroupCallback(e_id, e_altID)
{	
DeSelectRadioOption(e_altID);
var e = getAll(e_id);
var groupID=null;
var groupName=null;
for(var i=0;i<e.length;i++)
{
if(e[i].checked==true)
{	
groupID = e[i].value;
groupName = e[i].parentNode.parentNode.childNodes[1].innerText;
break;
}
}
if(groupID!=null)
SelectGroup(groupID, groupName);
}
function SelectGroup(a_groupID, a_groupName, a_CheckIndex)
{
if(a_CheckIndex!=null)
{
var e = document.all("SelectedGroup");
if(e.length)
e[a_CheckIndex].checked = true;
else
e.checked = true;
}
GE("text_CurrentSelection").innerText = "Group: " + a_groupName;
GE("user_group_flag").value = "G";
var lCustomerID = GE("hidCustomerId").value;
var groupsSelect = GE("ag_groups");
for(var i=0;i<groupsSelect.options.length;i++)
{
if(groupsSelect.options[i].id == a_groupID)
{
groupsSelect.selectedIndex = i;
break;
}
}
var co = RSExecute('rs_dca.asp','GetSelectedGroupWithFunctions', lCustomerID, a_groupID);
var dom = CheckRemoteScriptingError(co);
if(dom==null)
return;
SetTreeViewFunctions("treeView_functionsAssigned", dom);
FilterOutAssignedFromAvailableTreeView();
}
function SetTreeViewFunctions(treeView, dom)
{ 
var treeView_functions = GE(treeView);
treeView_functions.innerHTML = dom.selectSingleNode("/response/treeView_functions").text;
}
function LoadCustomer()
{
var lCustomerID = GE("hidCustomerId").value;
LoadGroupsByCustomer(lCustomerID);
LoadPackagesByCustomer(lCustomerID);
ChangeSelectedPackage();
LoadCustomerSubs(lCustomerID);
ResetControls();	
}
function LoadGroupsByCustomer(custID)
{	
var groupsSelect = GE("ag_groups");
for(var i=groupsSelect.options.length;i>0;i--)
{
groupsSelect.options.remove(i);
}
groupsControl.clearRows();
if(custID==-1)
{
GE("treeView_functionsAssigned").innerHTML = "";
return;
}
var co = RSExecute('rs_dca.asp','GetSelectedCustomer', custID);
var dom = CheckRemoteScriptingError(co);
if(dom==null)
return;
var nodeList = dom.selectNodes("/response/groups/data/company/group");
for(var j=0;j<nodeList.length;j++)
{
var groupID = getAttributeString(nodeList[j], "group_id");
var groupName = getAttributeString(nodeList[j], "group_name");
var groupOption = document.createElement("OPTION");
groupsSelect.options.add(groupOption);
groupOption.id = groupID;
groupOption.value = groupID;
groupOption.innerText = groupName;
var arr = new Array();
arr[0] = groupID;
arr[1] = groupName;
var types = "";
var typeNodeList = nodeList[j].selectNodes("type");
for(var k=0;k<typeNodeList.length;k++)
{
if(k!=0)
types += ', ';
types += getAttributeString(typeNodeList[k], "name");
} 
arr[2] = types;
groupsControl.addRow(arr); 
}
if(nodeList[0]!=null)
{
SelectGroup(getAttributeString(nodeList[0], "group_id"), getAttributeString(nodeList[0], "group_name"), 0);
}
else
{
GE("treeView_functionsAssigned").innerHTML = "";
}
}
function LoadPackagesByCustomer(custID)
{
var sel = GE("selectPackages");
for(var i=sel.options.length-1;i>0;i--)
{
if(sel.options[i].id)
{ 
sel.options[i]=null;
}
}
if(custID==-1)
return;
var co = RSExecute('rs_dca.asp','GetPackagesByCustomer', custID);
var dom = CheckRemoteScriptingError(co);
if(dom==null)
return;
var nodeList = dom.selectNodes("/response/packages/data/packages");
for(var j=0;j<nodeList.length;j++)
{
var opt = document.createElement("option");
sel.options.add(opt);
opt.id = nodeList[j].attributes.getNamedItem("id").text;
opt.value = nodeList[j].attributes.getNamedItem("id").text;
opt.innerText = nodeList[j].attributes.getNamedItem("set_nm").text;
}
}
function ChangeSelectedPackage()
{	
var sel = GE("selectPackages");
var packageID = sel.options[sel.selectedIndex].id;
if(!packageID)
{
var custID = GE("hidCustomerId").value;
if(custID==-1)
{
GE("treeView_functions").innerHTML = "";
return;
}
var co = RSExecute('rs_dca.asp','GetFunctionsByCustomer', custID);
var dom = CheckRemoteScriptingError(co);
if(dom==null)
return;
SetTreeViewFunctions("treeView_functions", dom);
}
else
{
var co = RSExecute('rs_dca.asp','GetFunctionsByPackage', packageID);
var dom = CheckRemoteScriptingError(co);
if(dom==null)
return;
SetTreeViewFunctions("treeView_functions", dom);
}
FilterOutAssignedFromAvailableTreeView();
}
function LoadCustomerSubs(lCustomerID)
{
var sel = GE("ag_subs");
for(var i=sel.options.length-1;i>0;i--)
{
if(sel.options[i].id)
{ 
sel.options[i]=null;
}
}
if(lCustomerID==-1)
return;
var co = RSExecute('rs_dca.asp','GetSubsByCustomer', lCustomerID);
var dom = CheckRemoteScriptingError(co);
if(dom==null)
return;
var nodeList = dom.selectNodes("/response/subs/data/parent/subsidairy[@id]");
for(var j=0;j<nodeList.length;j++)
{
var opt = document.createElement("option");
sel.options.add(opt);
opt.id = nodeList[j].attributes.getNamedItem("id").text;
opt.value = nodeList[j].attributes.getNamedItem("id").text;
opt.innerText = nodeList[j].attributes.getNamedItem("name").text;
}
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
var eGroupsList = GE("ag_groups");
var lGroupID = eGroupsList.options[eGroupsList.selectedIndex].value;
var co = RSExecute('rs_dca.asp','ListUsersDOM', lCustomerID, sLastName, sFirstName, sUserID, sBusinessArea, Number(lSubID), Number(lGroupID));
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
xPathArr[6] = "groups";
a_userGroup.clearRows();
a_userGroup.addRowsDOM(nodeList, xPathArr);
if(nodeList.length==0)
alert('No user found.');
}
function SelectUserCallback(e_id, e_altID)
{
DeSelectRadioOption(e_altID);
var e = getAll(e_id);
var userName=null;
for(var i=0;i<e.length;i++)
{
if(e[i].checked==true)
{	
userName = e[i].parentNode.parentNode.childNodes[4].innerText;
break;
}
}
if(userName!=null)
SelectUser(userName);
}
function SelectUser(sUserName)
{
GE("text_CurrentSelection").innerText = "User: " + sUserName;
GE("user_group_flag").value = "U";
var co = RSExecute('rs_dca.asp','GetFunctionsByUser', sUserName);
var dom = CheckRemoteScriptingError(co);
if(dom==null)
return;
SetTreeViewFunctions("treeView_functionsAssigned", dom);
FilterOutAssignedFromAvailableTreeView();
}
function DeSelectRadioOption(e_id)
{
var e = getAll(e_id);
for(var i=0;i<e.length;i++)
{
if(e[i].checked == true)
{
e[i].checked = false;
return;
} 
}
}
function ResetControls()
{
availableUsersControl.clearRows();
var typeSelects = getAll("selectTypeSelector");
for(var i=0;i<typeSelects.length;i++)
{
typeSelects[i].selectedIndex = 0;
}
}
function toggleDistributeBy(eSel)
{ 
var objs = document.all("div_distributeBy_view");
for(var i=0;i<objs.length;i++)
{
objs[i].style.display = (objs[i].style.display=="none")?"block":"none";
}
}
function SelectFunctionCallback(a_id)
{
ToggleChildrenDisabled(event.srcElement.visibilityID, event.srcElement.checked);
}
function ToggleChildrenDisabled(a_visibilityID, a_checked)
{
if(!a_visibilityID)
return;
var elements = getAll(a_visibilityID);
for(var i=0;i<elements.length;i++)
{
if(!elements[i].root)
{ 
elements[i].disabled = !(a_checked)
}
}	
}
function checkAllCallbackTreeView(a_id, bCheckVisibility)
{
var toCheck = (event.srcElement.value==1)?true:false;	
event.srcElement.value = (event.srcElement.value==1)?0:1;
var elements = getAll(a_id);
for(var i=0;i<elements.length;i++)
{
if(bCheckVisibility)
{
if( GE(elements[i].visibilityID).style.display != "none" )
{
elements[i].checked = toCheck;
ToggleChildrenDisabled(elements[i].visibilityID, toCheck);
}
}
else
{
elements[i].checked = toCheck;
ToggleChildrenDisabled(elements.visibilityID, toCheck);
}
}
}
function Add()
{
var user_group_Flag = GE("user_group_flag").value;
var listFunctions = GetSelectedFunctionsXML("all_");
if(listFunctions.length > 13)
{
if(! confirm("You are about to add Functions to the current User/Group.\nAre you sure you want to procede?") )
return;
}
if(user_group_Flag == "G")
{
var groupID=null;
var groups = getAll("SelectedGroup");
for(var i=0;i<groups.length;i++)
{
if(groups[i].checked == true)
{
groupID = groups[i].value;
break;
}
}
if(groupID==null)
return;
var co = RSExecute('rs_dca.asp','AddFunctionsToGroup', groupID, listFunctions);
var dom = CheckRemoteScriptingError(co); 
if(dom==null)
return;
var lCustomerID = GE("hidCustomerId").value;
var co = RSExecute('rs_dca.asp','GetSelectedGroupWithFunctions', lCustomerID, groupID);
var dom = CheckRemoteScriptingError(co);
if(dom==null)
return;
SetTreeViewFunctions("treeView_functionsAssigned", dom);
}
else
{
var userName=null;
var userID=null;
var users = getAll("SelectedUser");
for(var i=0;i<users.length;i++)
{
if(users[i].checked == true)
{
userName = users[i].parentNode.parentNode.childNodes[4].innerText;
userID = users[i].value;
}
}
if(userName==null || userID==null)
return;
var co = RSExecute('rs_dca.asp','AddFunctionsToUser', userName, listFunctions, userID);
var dom = CheckRemoteScriptingError(co);
if(dom==null)
return;
var co = RSExecute('rs_dca.asp','GetFunctionsByUser', userName);
var dom = CheckRemoteScriptingError(co);
if(dom==null)
return;
SetTreeViewFunctions("treeView_functionsAssigned", dom);
}
FilterOutAssignedFromAvailableTreeView();
}
function Remove()
{
var listFunctions = GetSelectedFunctionsXML("assigned_");
if(listFunctions.length > 13)
{
if(! confirm("You are about to remove Functions from the current User/Group.\nAre you sure you want to procede?") )
return;
}
var user_group_Flag = GE("user_group_flag").value;
if(user_group_Flag == "G")
{
var groupID=null;
var groups = getAll("SelectedGroup");
for(var i=0;i<groups.length;i++)
{
if(groups[i].checked == true)
{
groupID = groups[i].value;
break;
}
}
if(groupID==null)
return;
var co = RSExecute('rs_dca.asp','DeleteFunctionsFromGroup', groupID, listFunctions);
var dom = CheckRemoteScriptingError(co); 
if(dom==null)
return;
var lCustomerID = GE("hidCustomerId").value;
var co = RSExecute('rs_dca.asp','GetSelectedGroupWithFunctions', lCustomerID, groupID);
var dom = CheckRemoteScriptingError(co);
if(dom==null)
return;
SetTreeViewFunctions("treeView_functionsAssigned", dom);
}
else
{
var userName=null;
var userID=null;
var users = getAll("SelectedUser");
for(var i=0;i<users.length;i++)
{
if(users[i].checked == true)
{
userName = users[i].parentNode.parentNode.childNodes[4].innerText;
userID = users[i].value;
}
}
if(userName==null || userID==null)
return;
var co = RSExecute('rs_dca.asp','DeleteFunctionsFromUser', userName, listFunctions, userID);
var dom = CheckRemoteScriptingError(co);
if(dom==null)
return;
var co = RSExecute('rs_dca.asp','GetFunctionsByUser', userName);
var dom = CheckRemoteScriptingError(co);
if(dom==null)
return;
SetTreeViewFunctions("treeView_functionsAssigned", dom);
}
FilterOutAssignedFromAvailableTreeView();
}
function GetSelectedFunctionsXML(functionTree_dsName)
{
var selectedFunctions = getAll(functionTree_dsName+"SelectAllFunctions");
var listFunctions = "<list>";
for(var i=0;i<selectedFunctions.length;i++)
{
if( selectedFunctions[i].checked && GE(selectedFunctions[i].visibilityID).style.display != "none" )
{
listFunctions += '<id num="' + strip_dsName(functionTree_dsName, selectedFunctions[i].value) + '">';
var rootAttr = getAll(functionTree_dsName+"attributeCheck_"+selectedFunctions[i].value)
for(var j=0;j<rootAttr.length;j++)
{
if(rootAttr[j].childNodes[0].checked)
{ 
listFunctions += '<a num="' + strip_dsName(functionTree_dsName, rootAttr[j].childNodes[0].value) + '"/>';
}
}
var childFunc = getAll(functionTree_dsName+"childFunctionCheck_"+selectedFunctions[i].value)
for(var k=0;k<childFunc.length;k++)
{
if(childFunc[k].childNodes[0].checked)
{ 
listFunctions += '<cf num="' + strip_dsName(functionTree_dsName, childFunc[k].childNodes[0].value) + '">';
var cfAttr = getAll(functionTree_dsName+"attributeCheck_"+childFunc[k].childNodes[0].value)
for(var m=0;m<cfAttr.length;m++)
{
if(cfAttr[m].childNodes[0].checked)
{ 
listFunctions += '<a num="' + strip_dsName(functionTree_dsName, cfAttr[m].childNodes[0].value) + '"/>';
}
}
listFunctions += '</cf>';
}
}
listFunctions += '</id>';
}
}
listFunctions += "</list>";
return listFunctions;
}
function Distribute()
{
var listFunctions = GetSelectedFunctionsXML("all_");
var distributeByCode;
var listDestination = "<list>";
if( distributeBy == 1 ) 
{
distributeByCode = "C";
var selectedCustomers = GE("ag_customersMultiple");
for(var j=0;j<selectedCustomers.options.length;j++)
{
if(selectedCustomers.options[j].selected)
listDestination += '<id num="' + selectedCustomers.options[j].value + '"/>';
} 
}
else if( distributeBy == 2 )
{
distributeByCode = "G";
var selectedGroups = document.all("SelectedGroup");
if(!selectedGroups)
return false;
if(selectedGroups.length)
{
for(var i=0;i<selectedGroups.length;i++)
{ 
if( selectedGroups[i].checked && selectedGroups[i].parentNode.parentNode.style.display != "none" )
listDestination += '<id num="' + selectedGroups[i].value + '"/>';
}
}
else
{
if( selectedGroups.checked && selectedGroups.parentNode.parentNode.style.display != "none" )
listDestination += '<id num="' + selectedGroups.value + '"/>';
}
}
listDestination += "</list>";
GE("hidListFunctions").value = listFunctions;
GE("hidListDestination").value = listDestination;
self.open("/asp/blank.asp","confirmationDialog", "scrollbars=yes");
document.forms["frmSubmit"].action = "dca_functions_distribute.asp?mode=Confirmation&distributeByCode="+distributeByCode+"&respectTypes="+Number(respectTypes);	
document.forms["frmSubmit"].target = "confirmationDialog";
document.forms["frmSubmit"].submit();
}
function RespectTypes()
{ 
return;
if( GE("distributeBySelect_id").value != 2 ) 
return;
var a_checked = GE("respectTypesCheckbox_id").checked;
var index = 2;
if(a_checked)
{
var valArray = new Array();
var cells = document.all("typeRespect");
if(cells && cells.length)
{
for(var i=0;i<cells.length;i++)
{
if( cells[i].childNodes[0].checked && cells[i].parentNode.style.display != "none" )
{
var splitArray = cells[i].parentNode.childNodes[3].innerText.split(",");
for(var j=0;j<splitArray.length;j++)
{
if( valArray.join().indexOf(splitArray[j]) == -1)
{
valArray[valArray.length] = splitArray[j];
}
}
}
}
}
else
{
if( cells.childNodes[0].checked && cells.parentNode.style.display != "none" )
{
var splitArray = cells.parentNode.childNodes[3].innerText.split(",");
for(var j=0;j<splitArray.length;j++)
{
if( valArray.join().indexOf(splitArray[j]) == -1)
{
valArray[valArray.length] = splitArray[j];
}
}
}
}
for(var k=0;k<groupsControl.RowsArray.length;k++)
{
var row = GE( groupsControl.RowsArray[k][0] );
row.disabled = true;
for(var l=0;l<valArray.length;l++)
{
if( groupsControl.RowsArray[k][1][index].indexOf(valArray[l]) != -1 )
{	
row.disabled = false;
break;
}
}
}
for(k=0;k<groupsControl.RowsArray.length;k++)
{
var row = GE( groupsControl.RowsArray[k][0] );
if( row.disabled && row.cells[0].childNodes[0].checked )
row.cells[0].childNodes[0].checked = false;
}
}
else
{
for(var k=0;k<groupsControl.RowsArray.length;k++)
{
var row = GE( groupsControl.RowsArray[k][0] );
row.disabled = false;
}
}
}
function Confirm()
{
var listFunctions = XMLEntityEncode(g_InputArguments[0],true);
var distributeByCode = g_InputArguments[1];
var listDestination = XMLEntityEncode(g_InputArguments[2],true);
var respectTypes = g_InputArguments[3];
var co = RSExecute('rs_dca.asp','DistributeFunctionsFast', 1, listFunctions, distributeByCode, listDestination, Number(respectTypes));
var dom = CheckRemoteScriptingError(co);
if(dom==null)
return;
self.close();
}
