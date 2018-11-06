$.import("mktgplanningtool.services.commonLib","mapper");
var mapper = $.mktgplanningtool.services.commonLib.mapper;
var db = mapper.getdbHelper();

/** *********** PROCEDURES ************** **/

var spGetById = "GET_HL5_LEGACY_BY_ID";

var spUpdateHl5Legacy = "UPD_HL5_LEGACY";
var spUpdateHl5LegacyBudget = "UPD_HL5_LEGACY_BUDGET";
var spInsertExpectedOutcomes = "INS_HL5_LEGACY_EXPECTED_OUTCOMES";
var spDeleteExpectedOutcomes = "DEL_HL5_LEGACY_EXPECTED_OUTCOMES";

/** *********** GET *************** **/

function getHl5LegacyById(hl5LegacyId){
	var parameters = {};
	parameters.in_hl5_id = hl5LegacyId;
	
	var result = db.executeProcedureManual(spGetById, parameters);
	
	return db.extractArray(result.out_result)[0];
}

/** *********** UPDATE *************** **/

function updateHl5Legacy(reqBody, userId){
	var params = {};
	params.in_hl5_legacy_id = reqBody.HL5_LEGACY_ID;
	params.in_full_budget = reqBody.BUDGET;
	params.in_euro_conversion_id = reqBody.EURO_CONVERSION_ID;
	params.in_allow_budget_zero = !!reqBody.ALLOW_BUDGET_ZERO? 1:0;
	params.in_modified_user_id = userId;

    return db.executeScalarManual(spUpdateHl5Legacy, params, 'out_result');
}

function updateHl5LegacyBudget(reqBody,userId) {
    var parameters = {
        in_hl5_id: reqBody.HL5_ID,
        in_updated_budget: reqBody.BUDGET,
        in_allow_budget_zero: reqBody.ALLOW_BUDGET_ZERO,
        in_user_id: userId
    };
    return db.executeScalarManual(spUpdateHl5LegacyBudget, parameters, "out_result");
}

function insertKPIComments(reqBody, userId){
    var params = {};
    params.in_hl5_legacy_id = reqBody.HL5_LEGACY_ID;
    params.in_comments = reqBody.COMMENTS? reqBody.COMMENTS : "";
    params.in_created_user_id = userId;

    return db.executeScalarManual(spInsertExpectedOutcomes, params, 'out_result');
}

function deleteKPIComments(hl5LegacyId, userId){
    var params = {};
    params.in_hl5_legacy_id = hl5LegacyId;
    params.in_modified_user_id = userId;

    return db.executeScalarManual(spDeleteExpectedOutcomes, params, 'out_result');
}