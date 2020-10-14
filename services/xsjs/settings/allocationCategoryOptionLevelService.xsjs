/****** libs ************/
$.import("mktgplanningtool.services.commonLib", "mapper");
var mapper = $.mktgplanningtool.services.commonLib.mapper;
var httpUtil = mapper.getHttp();
var categoryOptionLevel = mapper.getAllocationCategoryOptionLevelLib();
/******************************************/

function processRequest() {
    httpUtil.processRequest(handleGet, handlePost, handlePut, handleDelete, false, "", true);
}

function handleGet(parameters, userSessionID) {
    var params = httpUtil.getJSONParameters();
    var rdo = null;

    var hierarchyLevelId = params.HIERARCHY_LEVEL_ID || null;

    switch(params.METHOD) {
        case "SYNDICATED_PROGRAM_ASSOCIATION":
            var categoryId = params.CATEGORY_ID;

            rdo = categoryOptionLevel.getSyndicatedSubProgramAssociationByCategoryIdHierarchyLevelId(categoryId, hierarchyLevelId);
            break;
        case "OBJECTIVE_ALLOCATION_ASSOCIATION":
            rdo = categoryOptionLevel.getObjectiveAllocationAssociationByHierarchyLevelId(hierarchyLevelId);
            break;
        default:
            throw ErrorLib.getErrors().BadRequest("","","Invalid parameter value (should be SYNDICATED_PROGRAM_ASSOCIATION");
            break;
    }

    return httpUtil.handleResponse(rdo, httpUtil.OK, httpUtil.AppJson);
}
function handlePost(reqBody, userSessionID) {
    var parameters = httpUtil.getJSONParameters();
    var rdo = null;

    switch(parameters.METHOD) {
        case "INSERT_SYNDICATED_SUB_PROGRAM_ASSOCIATION":
            rdo = categoryOptionLevel.insertSyndicatedSubProgramAssociation(reqBody, userSessionID);
            break;
        default:
            throw ErrorLib.getErrors().BadRequest("","","Invalid parameter value (should be INSERT_SYNDICATED_SUB_PROGRAM_ASSOCIATION");
            break;
    }

    return httpUtil.handleResponse(rdo, httpUtil.OK, httpUtil.AppJson);
}

function handlePut(reqBody, userSessionID) {
    var parameters = httpUtil.getJSONParameters();
    var rdo = null;
    if(!parameters || !parameters.METHOD) {
        rdo = categoryOptionLevel.updateCategoryOptionLevel(reqBody, userSessionID);
    } else {
        switch(parameters.METHOD) {
            case "UPDATE_SYNDICATED_SUB_PROGRAM_ASSOCIATION":
                categoryOptionLevel.updateSyndicatedSubProgramAssociation(reqBody, userSessionID);
                break;
            default:
                throw ErrorLib.getErrors().BadRequest("","","Invalid parameter value (should be UPDATE_SYNDICATED_SUB_PROGRAM_ASSOCIATION");
                break;
        }
    }

    return httpUtil.handleResponse(rdo, httpUtil.OK, httpUtil.AppJson);
}

function handleDelete(reqBody, userSessionID) {
    var parameters = httpUtil.getJSONParameters();
    var result = null;
    switch(parameters.METHOD){
        case 'REMOVE_SYNDICATED_SUB_PROGRAM_ASSOCIATION':
            result = categoryOptionLevel.deleteSyndicatedSubProgramAssociation(reqBody.ALLOCATION_CATEGORY_OPTION_LEVEL_SYNDICATED_SUB_PROGRAM_ID, userSessionID);
            break;
    }

    return httpUtil.handleResponse(result,httpUtil.OK,httpUtil.AppJson);
}
processRequest();
