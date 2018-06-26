$.import("mktgplanningtool.services.commonLib","mapper");
var mapper = $.mktgplanningtool.services.commonLib.mapper;
var db = mapper.getdbHelper();

/** *********** PROCEDURES ************** **/

var spGetById = "GET_HL6_LEGACY_BY_ID";

var spUpdateHl6Legacy = "UPD_HL6_LEGACY";
var spInsertExpectedOutcomes = "INS_HL6_EXPECTED_OUTCOMES";
var spDeleteExpectedOutcomes = "DEL_HL6_LEGACY_EXPECTED_OUTCOMES";

/** *********** GET *************** **/

function getHl6LegacyById(hl6LegacyId){
    var parameters = {};
    parameters.in_hl6_legacy_id = hl6LegacyId;
    
    var result = db.executeProcedureManual(spGetById, parameters);

    return db.extractArray(result.out_result)[0];
}

/** *********** UPDATE *************** **/

function updateHl6Legacy(reqBody, userId){
    var params = {};
    params.in_hl6_legacy_id = reqBody.HL6_LEGACY_ID;
    params.in_full_budget = reqBody.BUDGET;
    params.in_euro_conversion_id = reqBody.EURO_CONVERSION_ID;
    params.in_allow_budget_zero = !!reqBody.ALLOW_BUDGET_ZERO? 1:0;
    params.in_modified_user_id = userId;

    return db.executeScalarManual(spUpdateHl6Legacy, params, 'out_result');
}

function insertKPIComments(reqBody, userId){
    var params = {};
    params.in_hl6_legacy_id = reqBody.HL6_LEGACY_ID;
    params.in_comments = reqBody.COMMENTS? reqBody.COMMENTS : "";
    params.in_created_user_id = userId;

    return db.executeScalarManual(spInsertExpectedOutcomes, params, 'out_result');
}

function deleteKPIComments(hl6LegacyId, userId){
    var params = {};
    params.in_hl6_legacy_id = hl6LegacyId;
    params.in_modified_user_id = userId;

    return db.executeScalarManual(spDeleteExpectedOutcomes, params, 'out_result');
}