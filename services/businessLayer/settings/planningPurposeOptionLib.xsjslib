$.import("mktgplanningtool.services.commonLib", "mapper");
var mapper = $.mktgplanningtool.services.commonLib.mapper;
var util = mapper.getUtil();
var ErrorLib = mapper.getErrors();

var dataPlanningPurposeOption = mapper.getDataPlanningPurposeOption();
/** ***********END INCLUDE LIBRARIES*************** */

var USER_NOT_FOUND = "The User can not be found.";
var OBJECT_NOT_FOUND = "The object Planning Purpose is not found.";
var PLANNING_OPTION_NOT_FOUND = "The Planning Purpose is not found.";
var PLANNING_PURPOSE_OPTION_NOT_FOUND = "Planning purpose options are not found.";

/****** GET ******/

function getAllPlanningPurposeOption() {
    return dataPlanningPurposeOption.getAllPlanningPurposeOption();
}

function getPlanningPurposeRelationship(planningPurposeId) {
    var planningPurposeOption = getAllPlanningPurposeOption();
    var planningPurposeRelationship = dataPlanningPurposeOption.getPlanningPurposeRelationship(planningPurposeId || 0);
    var result = {};
    
    planningPurposeRelationship.forEach(function (elem) {
        result[elem.PLANNING_PURPOSE_ID] = result[elem.PLANNING_PURPOSE_ID] || {
            PLANNING_PURPOSE_ID: elem.PLANNING_PURPOSE_ID
            , PLANNING_PURPOSE_NAME: elem.PLANNING_PURPOSE_NAME
            , AVAILABLE_PLANNING_PURPOSE_OPTIONS: []
            , ASSIGNED_PLANNING_PURPOSE_OPTIONS: {}
        };

        if(Number(elem.PLANNING_PURPOSE_OPTION_ID)) {
            result[elem.PLANNING_PURPOSE_ID].ASSIGNED_PLANNING_PURPOSE_OPTIONS[elem.PLANNING_PURPOSE_OPTION_ID] = {
                PLANNING_PURPOSE_OPTION_ID: elem.PLANNING_PURPOSE_OPTION_ID
                , PLANNING_PURPOSE_OPTION_NAME: elem.PLANNING_PURPOSE_OPTION_NAME
            };
        }
    });
    result = util.objectToArray(result);
    if (!planningPurposeId) {
        result.forEach(function (item) {
            planningPurposeOption.forEach(function (option) {
                if (!item.ASSIGNED_PLANNING_PURPOSE_OPTIONS[option.PLANNING_PURPOSE_OPTION_ID]) {
                    item.AVAILABLE_PLANNING_PURPOSE_OPTIONS.push({
                        PLANNING_PURPOSE_OPTION_ID: option.PLANNING_PURPOSE_OPTION_ID
                        , PLANNING_PURPOSE_OPTION_NAME: option.PLANNING_PURPOSE_OPTION_NAME
                    })
                }
            });
            item.ASSIGNED_PLANNING_PURPOSE_OPTIONS = util.objectToArray(item.ASSIGNED_PLANNING_PURPOSE_OPTIONS);
        });
    } else {
        result = result[0];
        result.ASSIGNED_PLANNING_PURPOSE_OPTIONS = util.objectToArray(result.ASSIGNED_PLANNING_PURPOSE_OPTIONS);
    }

    return result;
}

function getPlanningPurposeOptionByPlanningPurposeId(planningPurposeId) {
    return dataPlanningPurposeOption.getPlanningPurposeOptionByPlanningPurposeId(planningPurposeId);
}

/****** INSERT ******/

function insertPlanningPurposeOption(reqBody, userId) {
    validatePlanningPurposeOption(reqBody, userId, "Insert");

    return dataPlanningPurposeOption.insertPlanningPurposeOption(reqBody, userId);
}

/****** UPDATE ******/

function updatePlanningPurposeOption(reqBody, userId) {
    validatePlanningPurposeOption(reqBody, userId, "Update");

    return dataPlanningPurposeOption.updatePlanningPurposeOption(reqBody, userId);
}

function updateRelationship(reqBody, userId) {
    if(reqBody.ASSIGNED_PLANNING_PURPOSE_OPTIONS && reqBody.ASSIGNED_PLANNING_PURPOSE_OPTIONS.length){
        var existingRelationship = getPlanningPurposeRelationship(reqBody.PLANNING_PURPOSE_ID);
        var relationToDelete = compareOptions(existingRelationship.ASSIGNED_PLANNING_PURPOSE_OPTIONS, reqBody.ASSIGNED_PLANNING_PURPOSE_OPTIONS,'PLANNING_PURPOSE_OPTION_ID');
        var relationToUpdate = compareOptions(reqBody.ASSIGNED_PLANNING_PURPOSE_OPTIONS,existingRelationship.ASSIGNED_PLANNING_PURPOSE_OPTIONS,'PLANNING_PURPOSE_OPTION_ID');

        if(relationToUpdate && relationToUpdate.length){
            relationToUpdate = relationToUpdate.map(function (elem) {
                return {
                    in_planning_purpose_option_id: elem,
                    in_planning_purpose_id: reqBody.PLANNING_PURPOSE_ID,
                    in_user_id: userId
                }
            });
            dataPlanningPurposeOption.updateRelationship(relationToUpdate, userId);
        }
        if(relationToDelete && relationToDelete.length){
            relationToDelete = relationToDelete.map(function (elem) {
                return {
                    in_planning_purpose_option_id: elem,
                    in_user_id: userId
                }
            });
            dataPlanningPurposeOption.deleteRelationship(relationToDelete, userId);
        }

    } else {
        throw ErrorLib.getErrors().CustomError("", "", PLANNING_PURPOSE_OPTION_NOT_FOUND);
    }
    return true;
}

/****** DELETE ******/

function deletePlanningPurposeOption(planningPurposeOptionId, userId) {
    if (!planningPurposeOptionId) {
        throw ErrorLib.getErrors().BadRequest("The Parameter PLANNING_PURPOSE_ID is not found", "planningPurposeService/handleDelete/deletePlanningPurpose", PLANNING_OPTION_NOT_FOUND);
    }
    if (!userId) {
        throw ErrorLib.getErrors().BadRequest("The Parameter userId is not found", "planningPurposeService/handleGet/getPlanningPurposeRelatedData", USER_NOT_FOUND);
    }

    return dataPlanningPurposeOption.deletePlanningPurposeOption(planningPurposeOptionId, userId);
}

/****** VALIDATIONS ******/

function validatePlanningPurposeOption(reqBody, userId, action) {
    var path;
    var keys;

    if (action == "Insert") {
        path = "planningPurposeService/handlePost/insertPlanningPurpose";

        keys = [
            'PLANNING_PURPOSE_OPTION_NAME'
        ];
    } else {
        path = "planningPurposeService/handlePut/updatePlanningPurpose";

        keys = [
            'PLANNING_PURPOSE_OPTION_ID',
            'PLANNING_PURPOSE_OPTION_NAME'
        ];
    }

    if (!userId) {
        throw ErrorLib.getErrors().BadRequest("The Parameter userId is not found", path, USER_NOT_FOUND);
    }

    if (!reqBody) {
        throw ErrorLib.getErrors().CustomError("The Parameter reqBody is not found", path, OBJECT_NOT_FOUND);
    }

    var isValid = false;
    var errors = {};
    var BreakException = {};

    try {
        keys.forEach(function (key) {
            if (reqBody[key] === null || reqBody[key] === undefined) {
                errors[key] = null;
                throw BreakException;
            } else {
                // validate attribute type
                isValid = validateType(key, reqBody[key]);
                if (!isValid) {
                    errors[key] = reqBody[key];
                    throw BreakException;
                }
            }
        });
        isValid = true;
    } catch (e) {
        if (e !== BreakException) {
            throw ErrorLib.getErrors().CustomError("", "", e.toString());
        }
        else {
            throw ErrorLib.getErrors().CustomError("", "", JSON.stringify(errors));
        }
    }

    return isValid;
}

//Check data types
function validateType(key, value) {
    var valid = true;
    switch (key) {
        case 'PLANNING_PURPOSE_OPTION_ID':
            valid = !isNaN(value) && value > 0;
            break;
        case 'PLANNING_PURPOSE_OPTION_NAME':
            valid = value.length > 0 && value.length <= 255;
            break;
    }
    return valid;
}

function compareOptions(list1, list2, field){
    var result = [];
    list1.forEach(function (item) {
        var insert = true;
        for(var i = 0; i < list2.length; i++){
            if(item[field] == list2[i][field]){
                insert = false;
                break;
            }
        }
        if(insert){
            result.push(item[field]);
        }
    });
    return result;
}