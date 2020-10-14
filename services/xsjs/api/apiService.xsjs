/** **** libs *********** */
$.import("mktgplanningtool.services.commonLib", "mapper");
var mapper = $.mktgplanningtool.services.commonLib.mapper;
var httpUtil = mapper.getHttp();
var ErrorLib = mapper.getErrors();
var config = mapper.getDataConfig();
var apiLib = mapper.getApi();
var utilLib = mapper.getUtil();
/** *************************************** */

var method = "method";
var id = "id";
var GET_WBS_BY_ID = "WBS_ID";
var GET_WBS_BY_PATH = "WBS_PATH";
var GET_REPORT_EXPORT_DATA = "GET_REPORT_EXPORT_DATA";
var GET_REPORT_EXPORT_DATA_REGION = "GET_REPORT_EXPORT_DATA_REGION";
var DEFAULT_FORMAT = 'JSON';

function processRequest() {
    httpUtil.processRequest(handleGet, handlePost, handlePut, handleDelete,
        true, "", true);
}

function handleGet(parameters, userSessionID) {
    var rdo = null;
    var jsonParameters = httpUtil.getJSONParameters();

    if(!jsonParameters.METHOD){
        throw ErrorLib.getErrors().BadRequest("", "",
            "Missing parameter METHOD");
    }

    var method = jsonParameters.METHOD.toUpperCase();
    var deltaTimeLastUpdate = jsonParameters.DELTA_TIME_LAST_UPDATE;
    var levelFilter = jsonParameters.HIERARCHY_LEVEL; //Example: hl5,hl6
    var scope = jsonParameters.SCOPE;
    var format = jsonParameters.FORMAT;
    var status = jsonParameters.STATUS;

    if (parameters.length > 0) {
        var filter = {};
        filter.LIMIT = jsonParameters.LIMIT || null;
        filter.OFFSET = jsonParameters.OFFSET || 0;

        if (method === "FULL" || method === "DELTA") {
            filter.IN_IS_FULL_DOWNLOAD = (method === "FULL") ? 1 : 0;
            filter.IN_HIERARCHY_LEVEL = filter.IN_IS_FULL_DOWNLOAD ? [] : levelFilter;
            filter.IN_DELTA_TIME_LAST_UPDATE = deltaTimeLastUpdate || 0;
            filter.SCOPE = scope || null;
            filter.FORMAT = format || DEFAULT_FORMAT;
            filter.IN_STATUS = status || null;
        }
        switch (parameters[0].name) {
            case GET_WBS_BY_ID:
                rdo = apiLib.getL6ById(parameters[0].value);
                break;
            case GET_WBS_BY_PATH:
                rdo = apiLib.getL6ByWBSPath(parameters[0].value);
                break;
            case GET_REPORT_EXPORT_DATA:
                if (method === "FULL" || method === "DELTA") {
                    rdo = apiLib.getReportExportData(filter, GET_REPORT_EXPORT_DATA);
                } else {
                    throw ErrorLib.getErrors().BadRequest("", "",
                        "invalid parameter method");
                }
                break;
            case GET_REPORT_EXPORT_DATA_REGION:
                if (method === "FULL" || method === "DELTA") {
                    rdo = apiLib.getReportExportDataRegion(filter, GET_REPORT_EXPORT_DATA_REGION);
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

    if (format === "CSV") {
        var reportTitle = "API_" + new Date();
        httpUtil.handleResponseCSV(rdo, reportTitle);
    } else {
        httpUtil.handleResponse(rdo, httpUtil.OK, httpUtil.AppJson);
    }
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
