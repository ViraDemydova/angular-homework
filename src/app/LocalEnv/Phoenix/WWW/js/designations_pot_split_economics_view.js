<!-- 
function loadTranche(frm, linkFlg)
{
var selectID = frm.selTranche.selectedIndex;
var selectValue = frm.selTranche.options[selectID].value;
if(linkFlg == 'True')
window.location = "designations_pot_split_economics.asp?TrancheId="+selectValue+"";
else	
window.location = "designations_pot_split_economics_view.asp?TrancheId="+selectValue+"";
}
