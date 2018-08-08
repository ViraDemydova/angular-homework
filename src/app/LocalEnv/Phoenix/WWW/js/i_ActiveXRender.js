<!-- 
function ActiveXRender(page)
{
switch (page)
{
case "Bookbuild_MasterbookEQ_exp":
document.write('<OBJECT ID="MasterBookCtrl" CLASSID="CLSID:1C49B617-5936-4c28-9406-91DB36EE4B80"');
document.write(' CODEBASE="');
document.write(document.all["MB_codebase"].value);
document.write('">')
document.write(' <PARAM NAME="bEquity" VALUE="1" />');
document.write(' <PARAM NAME="bNonLead" VALUE="');
document.write(document.all["MB_bNonLead"].value);
document.write('" />');
document.write(' <PARAM NAME="bReadOnly" VALUE="');
document.write(document.all["MB_bReadOnly"].value);
document.write('" />');
document.write('</OBJECT>');
break;
case "RevenueExpense_Expenses":
document.write('<OBJECT ID="ExpensesCtrl" CLASSID="CLSID:CDB4BEFB-81AC-4AFB-BB5E-F9F2A9C58491"');
document.write(' CODEBASE="');
document.write(document.all["MB_codebase"].value);
document.write('">')
document.write('</OBJECT>');
break; 
case "RevenueExpense_Revenues":
document.write('<OBJECT ID="RevenuesCtrl" CLASSID="CLSID:13EE131D-E7E7-4CF0-8D84-DA14E704F2F5"');
document.write(' CODEBASE="');
document.write(document.all["MB_codebase"].value);
document.write('">')
document.write('</OBJECT>');
break; 
case "Accounting_Recap":	
document.write('<OBJECT ID="AccountingRecapCtrl" CLASSID="CLSID:885AF6E0-1753-4731-941E-D0B7BDB7AF4A"');
document.write(' CODEBASE="');
document.write(document.all["MB_codebase"].value);
document.write('">')
document.write('</OBJECT>');
break; 
case "flipper_retail_summaryeq":	
document.write('<OBJECT ID="AXFlipRetailDetailsCtrl" CLASSID="CLSID:8CA1C7B5-3F6E-4cd2-A444-C03BBE7355FE"');
document.write(' CODEBASE="');
document.write(document.all["MB_codebase"].value);
document.write('">')
document.write('</OBJECT>');
break; 
case "flipper_retail_detaileq":	
document.write('<OBJECT ID="AXFlipRetailDetailsCtrl" CLASSID="CLSID:E54913CC-FD85-45c5-932B-C76CC293F208"');
document.write(' CODEBASE="');
document.write(document.all["MB_codebase"].value);
document.write('">')
document.write('</OBJECT>');
break; 
case "flipper_institutional_summary":	
document.write('<OBJECT ID="AXFlipInstitutionalSummaryCtrl" CLASSID="CLSID:f8368919-2688-4489-aa6f-e5808fefec15"');
document.write(' CODEBASE="');
document.write(document.all["MB_codebase"].value);
document.write('">')
document.write('</OBJECT>');
break; 
case "flipper_institutional_detail":	
document.write('<OBJECT ID="AXFlipInstitutionalDetailsCtrl" CLASSID="CLSID:11c3981b-f9c1-414b-950a-c5bdc4198224"');
document.write(' CODEBASE="');
document.write(document.all["MB_codebase"].value);
document.write('">')
document.write('</OBJECT>');
break; 
case "flipper_broker_summaryeq":	
document.write('<OBJECT ID="BrokerSummaryCtrl" CLASSID="CLSID:03423C79-4ECE-489B-8CCB-EFD0F0F270C8"');
document.write(' CODEBASE="');
document.write(document.all["MB_codebase"].value);
document.write('">')
document.write('</OBJECT>');
break; 
case "flipper_broker_detaileq":	
document.write('<OBJECT ID="AXFlipBrokerDetailsCtrl" CLASSID="CLSID:13F030C8-5B55-4274-BB04-BC3BE7F69B9F"');
document.write(' CODEBASE="');
document.write(document.all["MB_codebase"].value);
document.write('">')
document.write('</OBJECT>');
break; 
case "Bookbuild_QuickIOIeq":	
document.write('<OBJECT ID="QuickIOICtrl" CLASSID="CLSID:699ce5f7-dbdc-484c-a339-642e30c775ad"');
document.write(' CODEBASE="');
document.write(document.all["MB_codebase"].value);
document.write('">')
document.write('</OBJECT>');
break; 
}
}
