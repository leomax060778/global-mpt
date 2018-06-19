$.import("mktgplanningtool.services.commonLib", "mapper");
var mapper = $.mktgplanningtool.services.commonLib.mapper;
var dataL5Legacy = mapper.getDataLevel5Legacy();
var ErrorLib = mapper.getErrors();
var dataConfig = mapper.getDataConfig();

/** *********** MESSAGES *************** **/

var L5_MSG_ID_NOT_FOUND = "The Marketing Tactic Legacy ID can not be found.";
var L5_MSG_USER_ID_NOT_FOUND = "The User ID can not be found";

/** *********** GET *************** **/

function getHl5LegacyById(hl5LegacyId, userId){
	if(!hl5LegacyId){
		throw ErrorLib.getErrors().BadRequest("The Parameter HL5 Legacy ID is not found", "level5LegacyService/handleGet/getHl5LegacyById", L5_MSG_ID_NOT_FOUND);
	}
	
	if(!userId){
		throw ErrorLib.getErrors().BadRequest("The Parameter User ID is not found", "level5LegacyService/handleGet/getHl5LegacyById", L5_MSG_USER_ID_NOT_FOUND);
	}

	var result = JSON.parse(JSON.stringify(dataL5Legacy.getHl5LegacyById(hl5LegacyId)));

	if(result){
        result.BUDGET_EUROS = (Number(result.BUDGET)).toFixed(2);
        result.BUDGET = (Number(result.BUDGET) * Number(result.CURRENCY_VALUE)).toFixed(2);
    }

	return result;
}

/** *********** UPDATE *************** **/

function updateHl5Legacy(reqBody, userId){
    validateUpdateHl5Legacy(reqBody, userId);

    var result = dataL5Legacy.updateHl5Legacy(reqBody, userId);
	updateKPIComments(reqBody, userId);

    return result;
}

function updateKPIComments(reqBody, userId){
    dataL5Legacy.deleteKPIComments(reqBody.HL5_LEGACY_ID, userId);
    return dataL5Legacy.insertKPIComments(reqBody, userId);
}

/** *********** VALIDATIONS *************** **/

function validateUpdateHl5Legacy(reqBody, userId){
    if(!userId){
        throw ErrorLib.getErrors().BadRequest("The Parameter User ID is not found", "level5LegacyService/handlePut/updateHl5Legacy", L5_MSG_USER_ID_NOT_FOUND);
    }

    if(!reqBody.HL5_LEGACY_ID){
        throw ErrorLib.getErrors().BadRequest("The Parameter HL5 Legacy ID is not found", "level5LegacyService/handlePut/updateHl5Legacy", L5_MSG_ID_NOT_FOUND);
    }
}