$.import("mktgplanningtool.services.commonLib", "mapper");
var mapper = $.mktgplanningtool.services.commonLib.mapper;
var dataL6Legacy = mapper.getDataLevel6Legacy();
var dataExpectedOutcome = mapper.getDataExpectedOutcome();
var ErrorLib = mapper.getErrors();

/** *********** MESSAGES *************** **/

var L6_MSG_ID_NOT_FOUND = "The Marketing Sub-Tactic Legacy ID can not be found.";
var L6_MSG_USER_ID_NOT_FOUND = "The User ID can not be found";

/** *********** GET *************** **/

function getHl6LegacyById(hl6LegacyId, userId){
    if(!hl6LegacyId){
        throw ErrorLib.getErrors().BadRequest("The Parameter HL6 Legacy ID is not found", "level6LegacyService/handleGet/getHl6LegacyById", L6_MSG_ID_NOT_FOUND);
    }

    if(!userId){
        throw ErrorLib.getErrors().BadRequest("The Parameter User ID is not found", "level6LegacyService/handleGet/getHl6LegacyById", L6_MSG_USER_ID_NOT_FOUND);
    }

    var result = JSON.parse(JSON.stringify(dataL6Legacy.getHl6LegacyById(hl6LegacyId)));

    if(result){
        result.BUDGET_EUROS = (Number(result.BUDGET)).toFixed(2);
        result.BUDGET = (Number(result.BUDGET) * Number(result.CURRENCY_VALUE)).toFixed(2);
    }

    return result;
}

/** *********** UPDATE *************** **/

function updateHl6Legacy(reqBody, userId){
    validateUpdateHl6Legacy(reqBody, userId);

    var result = dataL6Legacy.updateHl6Legacy(reqBody, userId);
    updateKPIComments(reqBody, userId);

    return result;
}

function updateKPIComments(reqBody, userId){
    dataL6Legacy.deleteKPIComments(reqBody.HL6_LEGACY_ID, userId);
    return dataExpectedOutcome.insertHl6ExpectedOutcomes(reqBody.HL6_ID, reqBody.COMMENTS, userId);
}

/** *********** VALIDATIONS *************** **/

function validateUpdateHl6Legacy(reqBody, userId){
    if(!userId){
        throw ErrorLib.getErrors().BadRequest("The Parameter User ID is not found", "level6LegacyService/handlePut/updateHl6Legacy", L6_MSG_USER_ID_NOT_FOUND);
    }

    if(!reqBody.HL6_LEGACY_ID){
        throw ErrorLib.getErrors().BadRequest("The Parameter HL6 Legacy ID is not found", "level6LegacyService/handlePut/updateHl6Legacy", L6_MSG_ID_NOT_FOUND);
    }
}