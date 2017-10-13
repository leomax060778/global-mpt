/***************Import Library*******************/
$.import("mktgplanningtool.services.commonLib","mapper");
var mapper = $.mktgplanningtool.services.commonLib.mapper;
var dbRolePermission = mapper.getRolePermission();
var ErrorLib = mapper.getErrors();
/*************************************************/

function getAll(){
	return dbRolePermission.getAllPermissionByRole();
}

