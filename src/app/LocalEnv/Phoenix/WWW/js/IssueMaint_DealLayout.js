function ChangeTranche(elm)
{
var cmd = "/asp/IssueMaint_DealLayout.asp?TrancheId=";
cmd += elm.options[elm.selectedIndex].value
document.frmMain.action = cmd
document.frmMain.submit();
}
