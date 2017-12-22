/** *****************Import Library******************** */
$.import("mktgplanningtool.services.commonLib", "mapper");
var mapper = $.mktgplanningtool.services.commonLib.mapper;
var db = mapper.getdbHelper();
var ErrorLib = mapper.getErrors();
/** ***********END INCLUDE LIBRARIES*************** */

/** ***************** Stored Procedures ******************** */

var spGetAPIByWbsId = "GET_API_WBS_BY_ID";
var spGetAPIByWbsPath = "GET_API_WBS_BY_CRM_PATH";
var spGetReportExportData = "GET_REPORT_EXPORT_DATA";
var spInsLogReportExportData = "INS_LOG_REPORT_EXPORT_DATA";

/** ********* END LIST OF PROCEDURES ************** */

function getL6ById(l6_id) {
	var rdo = db.executeProcedure(spGetAPIByWbsId, {
		'in_hl6_id' : l6_id
	});
	return db.extractArray(rdo.out_result);
}

function getL6ByWBSPath(wbs_path) {
	var rdo = db.executeProcedure(spGetAPIByWbsPath, {
		'in_crm_path' : wbs_path
	});
	return db.extractArray(rdo.out_result);

}

function getReportExportData(filter) {
    var res = db.executeProcedure(spGetReportExportData, filter);
    return db.extractArray(res.out_result);
}

function insertLogReportExportData(filterParams) {
    return db.executeScalarManual(spInsLogReportExportData, filterParams, "out_result");
}