/***************Import Library*******************/
$.import("mktgplanningtool.services.commonLib", "mapper");
var mapper = $.mktgplanningtool.services.commonLib.mapper;
var db = mapper.getdbHelper();
var ErrorLib = mapper.getErrors();
/*************************************************/
var GET_ALL_PRIORITY = "GET_ALL_PRIORITY";
var GET_PRIORITY_BY_ID = "GET_PRIORITY_BY_ID";
var INS_PRIORITY = "INS_PRIORITY";
var UPD_PRIORITY = "UPD_PRIORITY";
var DEL_PRIORITY = "DEL_PRIORITY";

/******************************************************/


function getAllPriority() {
    var rdo = db.executeProcedureManual(GET_ALL_PRIORITY, {}, "out_result");
    return db.extractArray(rdo.out_result);
}

function getPriorityById(id) {
    if (id) {
        var rdo = db.executeProcedureManual(GET_PRIORITY_BY_ID, {in_priority_id: id}, "out_result");
        return db.extractArray(rdo.out_result);
    }

    return null;
}

function insertPriority(description, crmKey, userId) {
    var rdo = db.executeScalar(INS_PRIORITY, {
        "in_name": description,
        "in_crm_key": crmKey,
        "in_user_id": userId
    }, "out_result");
    return db.extractArray(rdo);
}

function updatePriority(priority_id, name, crmKey, userId) {
    var rdo = db.executeScalar(UPD_PRIORITY, {
        "in_priority_id": priority_id,
        "in_name": name,
        "in_crm_key": crmKey,
        "in_modified_user_id": userId
    }, "out_result");
    return db.extractArray(rdo);
}

function deletePriority(priority_id, userId) {
    var rdo = db.executeScalar(DEL_PRIORITY, {
        "in_priority_id": priority_id,
        "in_user_id": userId
    }, "out_result");
    return db.extractArray(rdo);
}