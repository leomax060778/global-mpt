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
    var params = {};
	var result = db.executeProcedure(spGetL4DetailedReport, params);

	return db.extractArray(result.out_result);
}

function getL5DetailedReport() {
    var params = {};
	var result = db.executeProcedure(spGetL5DetailedReport, params);

	return db.extractArray(result.out_result);
}

function getPathHl1Hl2Hl3(budgetYear, regionId){
    var params = {};
    params.IN_BUDGET_YEAR_ID = budgetYear || 0;
    params.IN_REGION_ID = regionId || 0;

    var result = db.executeProcedure(GET_PATH_HL3_HL2_HL1, params);

    return db.extractArray(result.OUT_RESULT);
}

function getDetailedReport(hl1Id, hl2Id, hl3Id, budgetYearId, regionId){
    var rdo = {};
    var params = {
        IN_HL1_ID: hl1Id || 0,
        IN_HL2_ID: hl2Id || 0,
        IN_HL3_ID: hl3Id || 0,
        IN_BUDGET_YEAR_ID: budgetYearId || 0,
        IN_REGION_ID: regionId
	};

    var result = db.executeProcedure(GET_REPORT_DETAILS_TACTICS_AND_SUB_TACTICS, params);

    rdo.DATA = db.extractArray(result.out_result);
    rdo.HL5_CATEGORY = db.extractArray(result.out_result_hl5_category);
    rdo.HL6_CATEGORY = db.extractArray(result.out_result_hl6_category);
    rdo.HL5_KPI = db.extractArray(result.out_result_hl5_kpi);
    rdo.HL5_KPI_FORECAST_HL6 = db.extractArray(result.out_hl5_kpi_from_hl6_forecast);
    rdo.HL6_KPI = db.extractArray(result.out_result_hl6_kpi);

    return rdo;
}
