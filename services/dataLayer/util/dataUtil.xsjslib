/***************Import Library*******************/
$.import("mktgplanningtool.services.commonLib","mapper");
var mapper = $.mktgplanningtool.services.commonLib.mapper;
var db = mapper.getdbHelper();
var ErrorLib = mapper.getErrors();
/*************************************************/

/***************SPs******************************/
var GET_SYSUUID = "GET_SYSUUID";
var GET_ID_BY_PATH = "GET_ID_BY_PATH";
var GET_DUPLICATED_HL3_ACRONYM = "GET_DUPLICATED_HL3_ACRONYM";
var GET_DUPLICATED_HL4_ACRONYM = "GET_DUPLICATED_HL4_ACRONYM";
/*************************************************/

function getHash(name){
    var rdo = db.extractArray(db.executeProcedure(GET_SYSUUID, {}).out_result);

    if(rdo.length)
        return rdo[0].SYS_UNIQUE_NUMBER;

    return null;
}

function getIdByPath(data, level){
    var rdo = db.executeProcedureManual(GET_ID_BY_PATH, {in_path_table: data, in_level: level});
    return db.extractArray(rdo.out_result);
}

function getDuplicatedHL3Acronym(acronym){
    var params = {};
    params.IN_ACRONYM = acronym;

    return db.executeScalarManual(GET_DUPLICATED_HL3_ACRONYM, params, "out_result");
}

function getDuplicatedHL4Acronym(acronym){
    var params = {};
    params.IN_ACRONYM = acronym;

    return db.executeScalarManual(GET_DUPLICATED_HL4_ACRONYM, params, "out_result");
}