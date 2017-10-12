/***************Import Library*******************/
$.import("mktgplanningtool.services.commonLib","mapper");
var mapper = $.mktgplanningtool.services.commonLib.mapper;
var db = mapper.getdbHelper();
var ErrorLib = mapper.getErrors();
/**************************************************/
var spGetAllOrganization = "GET_ALL_ORGANIZATION_TYPE";
var spGetOrganizationById = "GET_ORGANIZATION_TYPE_BY_ID";

var spInsertOrganization = "INS_ORGANIZATION_TYPE";

var spUpdateOrganization = "UPD_ORGANIZATION_TYPE";

var spDelOrganization = "DEL_ORGANIZATION_TYPE";
/******************************************************/

/********** GET **********/
function getAllOrganizationType(){
	var rdo = db.executeProcedureManual(spGetAllOrganization, {});

	return db.extractArray(rdo.out_result);
}

function getOrganizationTypeById(organizationTypeId){
	var params = {};
	params.in_organization_type_id = organizationTypeId;
	
	var result = db.executeProcedure(spGetOrganizationById, params);
    
	var list = db.extractArray(result.out_result);
    if(list.length){
 	   return list[0];
    } else {
 	   	return {};
    }
}

/********** INSERT **********/

function insertOrganizationType(objOrganizationType, userId){
		var params = {};
		params.in_name = objOrganizationType.NAME;
		params.in_created_user_id = userId;
		
		return db.executeScalarManual(spInsertOrganization, params, 'out_result');
}

/********** UPDATE **********/

function updateOrganizationType(objOrganizationType, userId){
	var params = {};
	params.in_organization_type_id = objOrganizationType.ORGANIZATION_TYPE_ID;
	params.in_name = objOrganizationType.NAME;
	params.in_modified_user_id = userId;
	
	return db.executeScalarManual(spUpdateOrganization,params,'out_result');
}

/********** DELETE **********/
function deleteOrganizationType(organizationTypeId, userId){
	var params = {};
	params.in_organization_type_id = organizationTypeId;
	params.in_user_id = userId;

	var rdo = db.executeScalarManual(spDelOrganization, params, 'out_result');
	
    return rdo;
}