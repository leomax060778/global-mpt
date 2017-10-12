/***************Import Library*******************/
$.import("mktgplanningtool.services.commonLib","mapper");
var mapper = $.mktgplanningtool.services.commonLib.mapper;
var db = mapper.getdbHelper();
var ErrorLib = mapper.getErrors();
/*************************************************/
var spGetForInterlockOrg = "GET_ORGANIZATION_TYPE_FOR_INTERLOCK_ORGANIZATION";
var spGetOrgByTypeId = "GET_INTERLOCK_ORGANIZATION_BY_ORGANIZATION_TYPE_ID";
var spInsertOrgTypeInterlockOrg = "INS_ORGANIZATION_TYPE_INTERLOCK_ORGANIZATION";
var spDeleteOrgTypeInterlockOrg = "DEL_ORGANIZATION_TYPE_INTERLOCK_ORGANIZATION";
	
function getOrganizationTypeForInterlockOrganization(){
	var rdo = db.executeProcedureManual(spGetForInterlockOrg, {});
	var result = {};
	result.ORGANIZATION_TYPE = db.extractArray(rdo.out_result);
	result.INTERLOCK_ORGANIZATION = db.extractArray(rdo.out_interlock_organization);
	return result;
}

function getInterlockOrganizationByOrganizationTypeId(organizationTypeId){
	var params = {};
	params.in_organization_type_id = organizationTypeId;
	
	var rdo = db.executeProcedureManual(spGetOrgByTypeId, params);
	return db.extractArray(rdo.out_result);
}

function insertOrganizationTypeInterlockOrganization(reqBody, userId){
	var params = {};
	params.in_organization_type_id = reqBody.ORGANIZATION_TYPE_ID;
	params.in_interlock_organization_id = reqBody.INTERLOCK_ORGANIZATION_ID;
	params.in_created_user_id = userId;
	
	return db.executeScalarManual(spInsertOrgTypeInterlockOrg, params, 'out_result');
}

function deleteOrganizationTypeInterlockOrganization(id, userId){
	var params = {};
	params.in_organization_type_interlock_organization_id = id;
	params.in_user_id = userId;
	
	return db.executeScalarManual(spDeleteOrgTypeInterlockOrg, params, 'out_result');
}