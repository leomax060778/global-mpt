$.import("mktgplanningtool.services.commonLib","mapper");
var mapper = $.mktgplanningtool.services.commonLib.mapper;
var db = mapper.getdbHelper();
var ErrorLib = mapper.getErrors();
var httpUtil = mapper.getHttp();
/***************END INCLUDE LIBRARIES*******************/

var spGET_DICTIONARY_PATH_BY_USER_ID = "GET_DICTIONARY_PATH_BY_USER_ID";
var spINS_DICTIONARY = "INS_DICTIONARY_L5_L6";
var spINS_DICTIONARY_KPI = "INS_DICTIONARY_KPI";
var spGET_MAP_HL_EXCEL = "GET_MAP_HL_EXCEL";
var spGET_MAP_HL1_EXCEL = "GET_MAP_HL1_EXCEL";
var spGET_MAP_HL5_HL6_CATEGORIES = "GET_MAP_HL5_HL6_CATEGORIES";
var spGET_MAP_L1L2L3_EXCEL = "GET_MAP_L1L2L3_EXCEL";
var spGET_ALL_PATH_FROM_DICTIONARY_L5_L6 = "GET_ALL_PATH_FROM_DICTIONARY_L5_L6";
var spGET_HL5_PATH_FROM_DICTIONARY_L5_L6 = "GET_HL5_PATH_FROM_DICTIONARY_L5_L6";
var spGET_HL6_PATH_FROM_DICTIONARY_L5_L6 = "GET_HL6_PATH_FROM_DICTIONARY_L5_L6";
var spGET_DATA_FROM_DICTIONARY_BY_PATH = "GET_DATA_FROM_DICTIONARY_BY_PATH";
var INS_UPLOAD_L5_L6_LOG = "INS_UPLOAD_L5_L6_LOG";
var INS_IMPORT_L5_L6 = "INS_IMPORT_L5_L6";
var GET_UPLOAD_L5_L6_LOG = "GET_UPLOAD_L5_L6_LOG";
var GET_IMPORT = "GET_IMPORT";
var UPD_IMPORT_L5_L6 = "UPD_IMPORT_L5_L6";
var DEL_DICTIONARY_L5_L6_BY_USER_ID = "DEL_DICTIONARY_L5_L6_BY_USER_ID";
var INS_IMPORT_HL = "INS_IMPORT_HL";
var UPD_IMPORT_HL = "UPD_IMPORT_HL";
var GET_DEFAULT_CURRENCY_FOR_HL_AND_LEVEL = "GET_DEFAULT_CURRENCY_FOR_HL_AND_LEVEL";
var GET_TOP_NODE = "GET_TOP_NODE";
/******************************************************/
var hierarchyLevel = {
    "hl1": 6,
    "hl2": 5,
    "hl3": 4,
    "hl5": 2,
    "hl6": 3
}

function getMapHL1Excel(){
    var rdo = db.executeProcedure(spGET_MAP_HL1_EXCEL, {});
    return db.extractArray(rdo.OUT_RESULT);
}

function getMapCategories(){
    var rdo = db.executeProcedure(spGET_MAP_HL5_HL6_CATEGORIES, {});
    return db.extractArray(rdo.OUT_RESULT);
}

function getMapForL1L2L3(){
    var rdo = db.executeProcedure(spGET_MAP_L1L2L3_EXCEL, {});
    return db.extractArray(rdo.OUT_RESULT);
}

function getMapHLExcel(){
    var rdo = db.executeProcedure(spGET_MAP_HL_EXCEL, {});
    return db.extractArray(rdo.OUT_RESULT);
}

function getLogByImport(importId){
    var rdo = db.executeProcedure(GET_UPLOAD_L5_L6_LOG, {'IN_IMPORT_ID':importId});
    return db.extractArray(rdo.OUT_RESULT);
}

function getDefaultCurrencyForHlLevel(hl_id, hierarchy_level_id){
    var rdo = db.executeProcedureManual(GET_DEFAULT_CURRENCY_FOR_HL_AND_LEVEL, {'hl_id':hl_id, 'hierarchy_level_id': hierarchy_level_id});
    return db.extractArray(rdo.OUT_RESULT)[0];
}

function getImports(){
    var rdo = db.executeProcedure(GET_IMPORT, {});
    return db.extractArray(rdo.OUT_RESULT);
}

function insertImport(description, userId){
    var params = {
        'IN_DESCRIPTION' : description,
        'in_user_id': userId
    };
    var rdo = db.executeScalarManual(INS_IMPORT_L5_L6, params, "OUT_IMPORT_ID");
    return rdo;
}

function insertLog(csvColumnName, columnName, state, comments, importId, userId){
    var params = {
        'IN_CSV_COLUM_NAME' : csvColumnName,
        'IN_COLUMN_VALUE': columnName,
        'IN_STATE': state,
        'IN_COMMENTS' : comments ,
        'IN_IMPORT_ID' : importId ? importId : null,
        'IN_USER_ID' : userId
    };
    var rdo = db.executeScalarManual(INS_UPLOAD_L5_L6_LOG, params, "OUT_RESULT");
    return rdo;
}

function insertDictionary(path, key, value, hl, userId, parent){
    var params = {
        'IN_PATH' : path,
        'IN_KEY': key,
        'IN_VALUE': value,
        'HIERARCHY_LEVEL_ID' :  hl ? hierarchyLevel[hl.toLowerCase()] : 0,
        'IN_USER_ID' : userId,
        'IN_PARENT': parent || null
    };
    var rdo = db.executeScalarManual(spINS_DICTIONARY, params, "OUT_RESULT");
    return rdo;
}

function insertDictionaryKPI(path, key, value, hl, userId){
    var params = {
        'IN_PATH' : path,
        'IN_KEY': key,
        'IN_VALUE': value,
        'HIERARCHY_LEVEL_ID' :  hl ? hierarchyLevel[hl.toLowerCase()] : 0,
        'IN_USER_ID' : userId
    };
    var rdo = db.executeScalarManual(spINS_DICTIONARY_KPI, params, "OUT_RESULT");
    return rdo;
}

function getDictionaryL5L6PathByUser(userId){
    var rdo = db.executeProcedure(spGET_DICTIONARY_PATH_BY_USER_ID, {'IN_USER_ID':userId});
    return db.extractArray(rdo.OUT_RESULT);
}

function getParentIdByPath(path, hierarchyLevelId){
    var tablename = '"_SYS_BIC"."mktgplanningtool.db.data.views/CV_GET_LEVEL_PATH"';
    var columnreference = 'HL_ID';
    var columnFilter = 'PATH';

    var otherFilter = "";
    if(hierarchyLevelId)
        otherFilter = otherFilter + " and HIERARCHY_LEVEL_ID = " + hierarchyLevelId;

    return getForeignId(tablename, columnreference, columnFilter, path, otherFilter);
}

function getForeignId(tableName, columnReference, columnFilter, findValue, otherFilter, operator){

    var query = "";

    var condition = operator ? '%' + findValue + '%' : findValue;

    operator = operator || " = ";

    if (otherFilter) {
        query = "SELECT " + columnReference + " FROM " + tableName + " WHERE enabled = 1 and deleted = 0 and upper(" + columnFilter + ")" + operator + "  upper('" + condition + "') " + otherFilter + ";";
    }else {
        query = "SELECT " + columnReference + " FROM " + tableName + " WHERE enabled = 1 and deleted = 0 and upper(" + columnFilter + ")" + operator + "  upper('" + condition + "');";
    }

    var rdo = db.executeQuery(query);
    var arr = db.extractArray(rdo);
    if(arr.length)
        return arr[0];
    else {
        var obj = {};
        obj[columnReference] = null;
        return obj;
    }
}

function getAllPathFromDictionary(userId){
    var rdo = db.executeProcedure(spGET_ALL_PATH_FROM_DICTIONARY_L5_L6, {'IN_USER_ID':userId});
    return db.extractArray(rdo.OUT_RESULT);
}

function getHL1PathFromDictionary(userId){
    return httpUtil.notImplementedMethod();
}

function getHL5PathFromDictionary(userId){
    var rdo = db.executeProcedure(spGET_HL5_PATH_FROM_DICTIONARY_L5_L6, {'IN_USER_ID':userId});
    return db.extractArray(rdo.OUT_RESULT);
}

function getHL6PathFromDictionary(userId){
    var rdo = db.executeProcedure(spGET_HL6_PATH_FROM_DICTIONARY_L5_L6, {'IN_USER_ID':userId});
    return db.extractArray(rdo.OUT_RESULT);
}

function getDataFromDictionaryByPath(path, userId){
    var rdo = db.executeProcedure(spGET_DATA_FROM_DICTIONARY_BY_PATH, {'IN_PATH': path, 'IN_USER_ID':userId});
    return db.extractArray(rdo.OUT_RESULT);
}

function getDataFromUploadDictionaryByPath(path, userId){
    return getDataFromDictionaryByPath(path, userId);
}


function updateImport(importId, userId){
    var params = {
        'in_import_id' : importId,
        'in_user_id': userId
    };
    var rdo = db.executeScalarManual(UPD_IMPORT_L5_L6, params, "out_result");
    return rdo;
}

function deleteDictionary(userId){
    var params = {
        'in_user_id': userId
    };
    var rdo = db.executeScalarManual(DEL_DICTIONARY_L5_L6_BY_USER_ID, params, "out_result");
    return rdo;

}

function getDictionaryPathByUser(userId, level){
    var param = {'IN_USER_ID': userId };
    if(level)
        param.IN_LEVEL = hierarchyLevel[level.toLowerCase()];// level.toUpperCase();
    else
        param.IN_LEVEL = '';

    var rdo = db.executeProcedure(spGET_DICTIONARY_PATH_BY_USER_ID, param);
    return db.extractArray(rdo.OUT_RESULT);
}

function insertImportHl(description, userId){
    var params = {
        'in_description' : description,
        'in_user_id': userId
    };
    var rdo = db.executeScalarManual(INS_IMPORT_HL, params, "OUT_IMPORT_ID");
    return rdo;
}

function updateImportHl(importId, userId){
    var params = {
        'in_import_id' : importId,
        'in_user_id': userId
    };
    var rdo = db.executeScalarManual(UPD_IMPORT_HL, params, "out_result");
    return rdo;
}

function getTopNode(Hl_Id, level){
    var param = {
        'IN_HL_ID': Hl_Id,
        'IN_LEVEL': level};

    var rdo = db.executeProcedure(GET_TOP_NODE, param);
    return db.extractArray(rdo.OUT_RESULT)[0];
}