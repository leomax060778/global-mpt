$.import("mktgplanningtool.services.commonLib", "mapper");
var mapper = $.mktgplanningtool.services.commonLib.mapper;
var db = mapper.getdbHelper();
var ErrorLib = mapper.getErrors();
/*************END INCLUDE LIBRARIES****************/
var spGetL4DetailedReport = "GET_L4_DETAILED_REPORT";
var spGetL5DetailedReport = "GET_L5_DETAILED_REPORT";
var GET_PATH_HL3_HL2_HL1 = "GET_PATH_HL3_HL2_HL1";
var GET_REPORT_DETAILS_TACTICS_AND_SUB_TACTICS = "GET_REPORT_DETAILS_TACTICS_AND_SUB_TACTICS";

function getL4DetailedReport() {
	var result = db.extractArray(db.executeProcedure(spGetL4DetailedReport, {}).out_result);
	return result;
}

function getL5DetailedReport() {
	var result = db.extractArray(db.executeProcedure(spGetL5DetailedReport, {}).out_result);
	return result;
}

function getPathHl1Hl2Hl3(budgetYear, regionId){
    var result = db.extractArray(db.executeProcedure(GET_PATH_HL3_HL2_HL1, {IN_BUDGET_YEAR_ID:budgetYear || 0, IN_REGION_ID:regionId || 0}).OUT_RESULT);
    return result;
}

function getDetailedReport(hl1_id, hl2_id, hl3_id){
	var param = {
        IN_HL1_ID:hl1_id||0,
        IN_HL2_ID:hl2_id||0,
        IN_HL3_ID:hl3_id||0
	};
    var result = db.executeProcedure(GET_REPORT_DETAILS_TACTICS_AND_SUB_TACTICS, param);
    var rdo = {};
    rdo.DATA = db.extractArray(result.out_result);
    rdo.HL5_CATEGORY = db.extractArray(result.out_result_hl5_category);
    rdo.HL6_CATEGORY = db.extractArray(result.out_result_hl6_category);
    rdo.HL5_KPI = db.extractArray(result.out_result_hl5_kpi);
    rdo.HL6_KPI = db.extractArray(result.out_result_hl6_kpi);
    return rdo;
}