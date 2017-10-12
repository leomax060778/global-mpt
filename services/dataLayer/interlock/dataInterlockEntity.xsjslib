/***************Import Library*******************/
$.import("mktgplanningtool.services.commonLib","mapper");
var mapper = $.mktgplanningtool.services.commonLib.mapper;
var db = mapper.getdbHelper();
var ErrorLib = mapper.getErrors();
/**************************************************/
var spGetAllInterlock = "GET_ALL_INTERLOCK_ENTITY";
var spGetInterlockById = "GET_INTERLOCK_ENTITY_BY_ENTITY_ID";

var spInsertInterlock = "INS_INTERLOCK_ENTITY";

var spUpdInterlock = "UPD_INTERLOCK_ENTITY";

var spDelInterlock = "DEL_INTERLOCK_ENTITY";
/******************************************************/

/********** GET **********/
function getAllInterlockEntity(){
	var rdo = db.executeProcedureManual(spGetAllInterlock, {});

	return db.extractArray(rdo.out_interlock_entity);
}

function getInterlockEntityById(interlockEntityId){
	var params = {};
	params.in_entity_id = interlockEntityId;
	
	var result = db.executeProcedure(spGetInterlockById, params);
    
	var list = db.extractArray(result.out_interlock_entity);
    if(list.length){
 	   return list[0];
    } else {
 	   	return {};
    }
}

/********** INSERT **********/

function insertInterlockEntity(objInterlock, userId){
		var params = {};
		params.in_name = objInterlock.NAME;
		params.in_created_user_id = userId;
		
		return db.executeScalarManual(spInsertInterlock, params, 'out_result');
}

/********** UPDATE **********/

function updateInterlockEntity(objInterlock, userId){
	var params = {};
	params.in_interlock_entity_id = objInterlock.INTERLOCK_ENTITY_ID;
	params.in_name = objInterlock.NAME;
	params.in_modified_user_id = userId;
	
	return db.executeScalarManual(spUpdInterlock,params,'out_result');
}

/********** DELETE **********/
function deleteInterlockEntity(interlockEntityId, userId){
	var params = {};
	params.in_interlock_entity_id = interlockEntityId;
	params.in_user_id = userId;

	var rdo = db.executeScalarManual(spDelInterlock, params, 'out_result');
	
    return rdo;
}