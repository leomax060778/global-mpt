/** **** libs *********** */
$.import("mktgplanningtool.services.commonLib", "mapper");
var mapper = $.mktgplanningtool.services.commonLib.mapper;
var httpUtil = mapper.getHttp();
var ErrorLib = mapper.getErrors();
var config = mapper.getDataConfig();
var apiLib = mapper.getApi();
/** *************************************** */

var method = "method";
var id = "id";
var GET_WBS_BY_ID = "WBS_ID";
var GET_WBS_BY_PATH = "WBS_PATH";
var GET_REPORT_EXPORT_DATA = "GET_REPORT_EXPORT_DATA";

function processRequest() {
	httpUtil.processRequest(handleGet, handlePost, handlePut, handleDelete,
			true, "", true);
}

function handleGet(parameters, userSessionID) {
	var rdo = null;
    var method = httpUtil.getUrlParameters().get("method").toUpperCase();
    var deltaTimeLastUpdate = httpUtil.getUrlParameters().get("DELTA_TIME_LAST_UPDATE");
    var levelFilter = httpUtil.getUrlParameters().get("HIERARCHY_LEVEL");
	if (parameters.length > 0) {
		switch (parameters[0].name) {
			case GET_WBS_BY_ID:
				rdo = apiLib.getL6ById(parameters[0].value);
				break;
			case GET_WBS_BY_PATH: 
				rdo = apiLib.getL6ByWBSPath(parameters[0].value);
				break;
			case GET_REPORT_EXPORT_DATA:
				var filter = {};
				if (method === "FULL" || method === "DELTA") {
                    filter.IN_IS_FULL_DOWNLOAD = (method.toUpperCase() === "FULL") ? 1 : 0;
                    filter.IN_HIERARCHY_LEVEL = filter.IN_IS_FULL_DOWNLOAD ? [] : levelFilter;
                    filter.IN_DELTA_TIME_LAST_UPDATE = deltaTimeLastUpdate || 0;
                    rdo = apiLib.getReportExportData(filter);
                } else {
                    throw ErrorLib.getErrors().BadRequest("", "",
                        "invalid parameter method");
				}
				break;
			default:
				throw ErrorLib.getErrors().BadRequest("", "",
						"invalid parameter name");
		}
	}
	httpUtil.handleResponse(rdo, httpUtil.OK, httpUtil.AppJson);
}

function handlePost() {
	httpUtil.notImplementedMethod();
}

function handlePut() {
	httpUtil.notImplementedMethod();
}

function handleDelete() {
	httpUtil.notImplementedMethod();
}

processRequest();