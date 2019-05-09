$.import("mktgplanningtool.services.commonLib", "mapper");
var mapper = $.mktgplanningtool.services.commonLib.mapper;
var db = mapper.getdbHelper();
/** ***********END INCLUDE LIBRARIES*************** */

//STORE PROCEDURE LIST NAME
var GET_DES_TYPE = "GET_DES_TYPE";
var GET_DES_TYPE_BY_ID = "GET_DES_TYPE_BY_ID";
var GET_DES_TYPE_BY_NAME = "GET_DES_TYPE_BY_NAME";
var GET_DES_TYPE_FOR_LEGACY_RECORDS = "GET_DES_TYPE_FOR_LEGACY_RECORDS";
var GET_DES_TYPE_PARENTS_BY_ID = "GET_DES_TYPE_PARENTS_BY_ID";
var INS_DES_TYPE = "INS_DES_TYPE";
var UPD_DES_TYPE = "UPD_DES_TYPE";
var DEL_DES_TYPE = "DEL_DES_TYPE";

function getDesType() {
    var parameters = {};
    var data = db.executeProcedureManual(GET_DES_TYPE, parameters);
    return db.extractArray(data.out_result);
}

function getDesTypeById(desTypeId) {
    var parameters = {in_des_type_id: desTypeId};
    var data = db.executeProcedureManual(GET_DES_TYPE_BY_ID, parameters);
    return db.extractArray(data.out_result)[0];
}

function getDesTypeByName(desTypeName) {
    var parameters = {in_des_type_name: desTypeName};
    var data = db.executeProcedureManual(GET_DES_TYPE_BY_NAME, parameters);
    return db.extractArray(data.out_result)[0];
}

function getDesTypeForLegacyRecords(){
    var result = db.executeProcedureManual(GET_DES_TYPE_FOR_LEGACY_RECORDS, {});

    return db.extractArray(result.out_result);
}

function getParentIdsByDesTypeId(desTypeId){
    var parameters = {};
    parameters.in_des_type_id = desTypeId;

    var result = db.executeProcedureManual(GET_DES_TYPE_PARENTS_BY_ID, parameters);
    var list = db.extractArray(result.out_result);

    return list && list.length ? db.extractArray(result.out_result)[0] : {};
}

function deleteDesType(desTypeId, userId) {
    var parameters = {in_des_type_id: desTypeId, in_user_id: userId};
    return db.executeScalarManual(DEL_DES_TYPE, parameters, 'out_result');
}


function insertDesType(name, atomaticApproval, userId) {
	var parameters = {
			in_name: name
			, in_automatic_approval: atomaticApproval
			, in_user_id: userId
			};
    return db.executeScalarManual(INS_DES_TYPE, parameters, "out_result");
}

function updateDesType(desTypeId, name, atomaticApproval, userId) {
	var parameters = {
			in_des_type_id: desTypeId
			, in_name: name
			, in_automatic_approval: atomaticApproval
			, in_user_id: userId
			};
    return db.executeScalarManual(UPD_DES_TYPE, parameters, "out_result");
}