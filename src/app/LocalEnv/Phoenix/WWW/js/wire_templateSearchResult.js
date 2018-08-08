<!-- 
function updateTemplate(template_id, wire_type_id, wire_type_name)
{
var frm = document.frmMain;
frm.hidTemplateID.value = template_id;
frm.hidWireTypeID.value = wire_type_id;
frm.hidWireTypeName.value = wire_type_name;
frm.method = "POST"
frm.action = "wire_templateEdit.asp";
frm.submit();
}
function createTemplate( securityType, wire_type_id, wire_type_name)
{
var frm = document.frmMain;
frm.hidSecurityType.value = securityType;
frm.hidWireTypeID.value = wire_type_id;
frm.hidWireTypeName.value = wire_type_name;
frm.method = "POST"
frm.action = "wire_templateCreate.asp";
frm.submit();
}
