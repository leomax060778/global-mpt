$.import("mktgplanningtool.services.commonLib","mapper");
var mapper = $.mktgplanningtool.services.commonLib.mapper;
var db = mapper.getdbHelper();
/** ***********END INCLUDE LIBRARIES*************** */

var INS_HL3_USER = "INS_HL3_USER";
var GET_HL3_USER = "GET_HL3_USER";
var DEL_ALL_HL3_BY_ID = "DEL_ALL_HL3_BY_ID";
var DEL_HL3_USER = "DEL_HL3_USER";

/*EXECUTE QUERY TO INSERT NEW PAIR HL3_USER*/
function insertLevel3User(data){
	/*
	var parameters = {};	
	parameters.in_hl3_id = Number(objLevel3) || objLevel3.IN_HL3_ID;
	parameters.in_user_id = Number(objLevel3User) || objLevel3User.IN_USER_ID;
	parameters.in_created_user_id = userId;
	*/
	return db.executeScalarManual(INS_HL3_USER,data,"out_hl3_user_id");
}

function delAllLevel3User(objLevel3, userId){
	var parameters = {};
	parameters.in_hl3_id = Number(objLevel3) || objLevel3.IN_HL3_ID;
	return db.executeScalarManual(DEL_ALL_HL3_BY_ID,parameters,"out_result");
}

function existsHl3UserPair(objHl3User, objLevel3){
	var exists = false;
	var parameters = {'in_user_id': objHl3User.IN_USER_ID, 'in_hl3_id': objLevel3.IN_HL3_ID};	
	var result = db.executeProcedureManual(GET_HL3_USER, parameters);	
	var list = db.extractArray(result.out_result); 	
	exists = list.length > 0;
	return exists;
}

function deleteLevel3User(data){
	return db.executeScalarManual(DEL_HL3_USER,data,"out_result");
}