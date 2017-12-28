/*******************Import Library*********************/
$.import("mktgplanningtool.services.commonLib","mapper");
var mapper = $.mktgplanningtool.services.commonLib.mapper;
var dbHelper = mapper.getdbHelper();
var ErrorLib = mapper.getErrors();
var api = mapper.getDataApi();
var dataHl6 = mapper.getDataLevel6();
var config = mapper.getConfig();
/** ***********END INCLUDE LIBRARIES*************** */

var L6_MSG_INITIATIVE_NOT_FOUND = "The Campaign/Activity & Sub tactic can not be found.";

var hierarchyLevel = {
    "HL1": 6,
    "HL2": 5,
    "HL3": 4,
    "HL4": 1,
    "HL5": 2,
    "HL6": 3
};

function getL6ById(l6_id){
	if(!l6_id){
		throw ErrorLib.getErrors().BadRequest("The Parameter l6_id is not found","",l6_id);
	}
	if(!dataHl6.getHl6ById(l6_id)) {
		throw ErrorLib.getErrors().BadRequest("The L6 is not found", "", L6_MSG_INITIATIVE_NOT_FOUND);
    }

	return api.getL6ById(l6_id);
}

function getL6ByWBSPath(wbs_path){
	if(!wbs_path){
		throw ErrorLib.getErrors().BadRequest("The Parameter wbs_path is not found","",wbs_path);
	}
	return api.getL6ByWBSPath(wbs_path);
}

function getReportExportData(filter){
    var filterParameter = {IN_MODE: (filter.IN_IS_FULL_DOWNLOAD === 1 ? 1 : 2), IN_FILTER_CRITERIA: null};
    if (!filter.IN_IS_FULL_DOWNLOAD) {
        filter.IN_HIERARCHY_LEVEL = filter.IN_HIERARCHY_LEVEL.toUpperCase();
        if (filter.IN_DELTA_TIME_LAST_UPDATE !== undefined && !isFinite(Number(filter.IN_DELTA_TIME_LAST_UPDATE))) {
            throw ErrorLib.getErrors().CustomError("", "", "The parameter DELTA_TIME_LAST_UPDATE must be a valid number");
        } else {
            if (!filter.IN_HIERARCHY_LEVEL) {
                throw ErrorLib.getErrors().CustomError("", "", "The parameter HIERARCHY_LEVEL is invalid");
            }
            if (!Number(filter.IN_DELTA_TIME_LAST_UPDATE)) {
                filter.IN_DELTA_TIME_LAST_UPDATE = config.getConfigurationByName("deltaTimeLastUpdate")[0].VALUE;
            }
            filterParameter.IN_FILTER_CRITERIA = "HIERARCHY_LEVEL=" + filter.IN_HIERARCHY_LEVEL + "&" + "DELTA_TIME_LAST_UPDATE=" + filter.IN_DELTA_TIME_LAST_UPDATE;
            var levelFilter = filter.IN_HIERARCHY_LEVEL.split(",");
            var aux = levelFilter.reduce(function (res, elem) {
                if (hierarchyLevel[elem]) {
                    res[hierarchyLevel[elem]] = {HIERARCHY_LEVEL_ID: hierarchyLevel[elem]};
                }
                return res;
            }, {});
            filter.IN_HIERARCHY_LEVEL = Object.keys(aux).map(function (elem) {
                return aux[elem];
            });
            if (!filter.IN_HIERARCHY_LEVEL.length) {
                throw ErrorLib.getErrors().CustomError("", "", "The parameter HIERARCHY_LEVEL is invalid");
            }
        }
    }
	api.insertLogReportExportData(filterParameter);
    return api.getReportExportData(filter);
}