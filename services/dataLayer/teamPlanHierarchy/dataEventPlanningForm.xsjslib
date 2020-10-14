/***************Import Library*******************/
$.import("mktgplanningtool.services.commonLib","mapper");
var mapper = $.mktgplanningtool.services.commonLib.mapper;
var db = mapper.getdbHelper();
var ErrorLib = mapper.getErrors();
/*************************************************/
var spGetAllRegistrationProcess = "GET_ALL_REGISTRATION_PROCESS";
var spGetAllTargetAudience = "GET_ALL_TARGET_AUDIENCE";
var spGetAllAffiliatedWithLargerEvent = "GET_ALL_AFFILIATED_WITH_LARGER_EVENT";
var spGetAllEventPlanningFormReportDetailed = "GET_EVENT_PLANNING_FORM_REPORT_DETAILED";

function getAllRegistrationProcess(){
    var rdo = db.executeProcedure(spGetAllRegistrationProcess, {});
    return db.extractArray(rdo.out_result);
}

function getAllTargetAudience(){
    var rdo = db.executeProcedure(spGetAllTargetAudience, {});
    return db.extractArray(rdo.out_result);
}

function getAllAffiliatedWithLargerEvent(){
    var rdo = db.executeProcedure(spGetAllAffiliatedWithLargerEvent, {});
    return db.extractArray(rdo.out_result);
}

function getAllEventPlanningFormReport(hl1Id, hl2Id, hl3Id, budgetYearId, regionId){
    var parameters = {};
    parameters.IN_HL1_ID = hl1Id;
    parameters.IN_HL2_ID = hl2Id;
    parameters.IN_HL3_ID = hl3Id;
    parameters.IN_BUDGET_YEAR_ID = budgetYearId;
    parameters.IN_REGION_ID = regionId;

    var rdo = db.executeProcedureManual(spGetAllEventPlanningFormReportDetailed, parameters);

    var result = {};

    result.LEVEL_COLLECTION = db.extractArray(rdo.out_result);
    result.LOB_CATEGORY_COLLECTION = db.extractArray(rdo.out_lob_category);
    result.SEGMENT_CATEGORY_COLLECTION = db.extractArray(rdo.out_segment_category);

    return result;
}
