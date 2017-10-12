/***************Import Library*******************/
$.import("mktgplanningtool.services.commonLib","mapper");
var mapper = $.mktgplanningtool.services.commonLib.mapper;
var db = mapper.getdbHelper();
var ErrorLib = mapper.getErrors();
/**************************************************/
var spGetAllInterlock = "GET_ALL_INTERLOCK_ORGANIZATION";
var spGetInterlockById = "GET_INTERLOCK_ORGANIZATION_BY_ID";

var spInsertInterlock = "INS_INTERLOCK_ORGANIZATION";

var spUpdInterlock = "UPD_INTERLOCK_ORGANIZATION";

var spDelInterlock = "DEL_INTERLOCK_ORGANIZATION";
/******************************************************/

/********** GET **********/
function getAllInterlockOrganization(){
	var rdo = db.executeProcedureManual(spGetAllInterlock, {});

	return db.extractArray(rdo.out_result);
}

function getInterlockOrganizationById(interlockOrganizationId){
	var params = {};
	params.in_interlock_organization_id = interlockOrganizationId;
	
	var result = db.executeProcedure(spGetInterlockById, params);
    
	var list = db.extractArray(result.out_result);
    if(list.length){
 	   return list[0];
    } else {
 	   	return {};
    }
}

/********** INSERT **********/

function insertInterlockOrganization(objInterlock, userId){
		var params = {};
		params.in_name = objInterlock.NAME;
		params.in_created_user_id = userId;
		
		return db.executeScalarManual(spInsertInterlock, params, 'out_result');
}

/********** UPDATE **********/

function updateInterlockOrganization(objInterlock, userId){
	var params = {};
	params.in_interlock_organization_id = objInterlock.INTERLOCK_ORGANIZATION_ID;
	params.in_name = objInterlock.NAME;
	params.in_modified_user_id = userId;
	
	return db.executeScalarManual(spUpdInterlock,params,'out_result');
}

/********** DELETE **********/
function deleteInterlockOrganization(interlockOrganizationId, userId){
	var params = {};
	params.in_interlock_organization_id = interlockOrganizationId;
	params.in_user_id = userId;

	var rdo = db.executeScalarManual(spDelInterlock, params, 'out_result');
	
    return rdo;
}