/*******************Import Library*********************/
$.import("mktgplanningtool.services.commonLib", "mapper");
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

function getL6ById(l6_id) {
    if (!l6_id) {
        throw ErrorLib.getErrors().BadRequest("The Parameter l6_id is not found", "", l6_id);
    }
    if (!dataHl6.getHl6ById(l6_id)) {
        throw ErrorLib.getErrors().BadRequest("The L6 is not found", "", L6_MSG_INITIATIVE_NOT_FOUND);
    }

    return api.getL6ById(l6_id);
}

function getL6ByWBSPath(wbs_path) {
    if (!wbs_path) {
        throw ErrorLib.getErrors().BadRequest("The Parameter wbs_path is not found", "", wbs_path);
    }
    return api.getL6ByWBSPath(wbs_path);
}

function getReportExportData(filter, method) {
    var scopeValues = ['ALL', 'KPI', 'BUDGET'];
    var result = [];

    var defaultFields = [
        'HIERARCHY_LEVEL_ID'
        , 'CRM_ID'
        , 'CAMP_OBJ_TYPE'
        , 'BUDGET'
        , 'BUDGET_Q1'
        , 'BUDGET_Q2'
        , 'BUDGET_Q3'
        , 'BUDGET_Q4'
        , 'INTERNAL_FUNDING'
        , 'PARTNER_CONTRIBUTION'
        , 'CURRENCY'
        , 'MNP_VALUE'
        , 'MNP_VOLUME'
        , 'MTP_VALUE'
        , 'MTP_VOLUME'
        , 'MIP_VALUE'
        , 'MIP_VOLUME'
        , 'LEAD_VOLUME_VALUE'
        , 'LEAD_VOLUME_VOLUME'
        , 'BUDGET_YEAR'
        , 'ON_PREM'
        , 'CLOUD'
        , 'MODIFIED_DATE'
        //, 'STATUS'
    ];

    var commonFields = [
        'HIERARCHY_LEVEL_ID'
        , 'CRM_ID'
        , 'CAMP_OBJ_TYPE'
        , 'CURRENCY'
        , 'BUDGET_YEAR'
        , 'MODIFIED_DATE'
    ];

    var budgetFields = [
        'BUDGET'
        , 'BUDGET_Q1'
        , 'BUDGET_Q2'
        , 'BUDGET_Q3'
        , 'BUDGET_Q4'
        , 'INTERNAL_FUNDING'
        , 'PARTNER_CONTRIBUTION'
        //, 'STATUS'
    ];

    var kpiFields = [
        'MNP_VALUE'
        , 'MNP_VOLUME'
        , 'MTP_VALUE'
        , 'MTP_VOLUME'
        , 'MIP_VALUE'
        , 'MIP_VOLUME'
        , 'LEAD_VOLUME_VALUE'
        , 'LEAD_VOLUME_VOLUME'
        , 'ON_PREM'
        , 'CLOUD'
        //, 'STATUS'
    ];

    if (!filter.SCOPE) {
        filter.SCOPE = 'ALL';
    }

    if (scopeValues.indexOf(filter.SCOPE.toUpperCase()) < 0) {
        throw ErrorLib.getErrors().CustomError("", "", "The parameter SCOPE is invalid");
    }

    var validStatus = {
        IN_CRM: "In CRM",
        IN_PROGRESS: "In Progress",
        CREATE_IN_CRM: "Create In CRM",
        UPDATE_IN_CRM: "Update In CRM",
        EXCEED_BUDGET: "Exceed Budget",
        COMPLETE: "Complete",
        VALID_FOR_CRM: "Valid for CRM",
        IN_CRM_NEED_NEW_BUDGET_APPROVAL: "In CRM-Need New Budget Approval",
        DELETION_REQUEST: "Deletion Request",
        DELETED_IN_CRM: "Deleted In CRM"
    };

    if (filter.IN_STATUS != null) {
        filter.IN_STATUS = filter.IN_STATUS.toUpperCase();
        if (!validStatus[filter.IN_STATUS]) {
            throw ErrorLib.getErrors().CustomError("", "", "Status invalid, current status are:  IN_CRM, " +
                "IN_PROGRESS," +
                " CREATE_IN_CRM," +
                " UPDATE_IN_CRM," +
                " VALID_FOR_CRM," +
                " IN_CRM_NEED_NEW_BUDGET_APPROVAL," +
                " DELETION_REQUEST,DELETED_IN_CRM");
        }
    }

    var filterParameter = {
        IN_MODE: (filter.IN_IS_FULL_DOWNLOAD === 1 ? 1 : 2),
        IN_FILTER_CRITERIA: "SCOPE=" + filter.SCOPE
    };
    if (!filter.IN_IS_FULL_DOWNLOAD) {
        filter.IN_HIERARCHY_LEVEL = filter.IN_HIERARCHY_LEVEL.toUpperCase();
        if (!filter.IN_HIERARCHY_LEVEL) {
            throw ErrorLib.getErrors().CustomError("", "", "The parameter HIERARCHY_LEVEL is invalid");
        }

        filterParameter.IN_FILTER_CRITERIA += "&" + "HIERARCHY_LEVEL=" + filter.IN_HIERARCHY_LEVEL + "&" + "DELTA_TIME_LAST_UPDATE=" + filter.IN_DELTA_TIME_LAST_UPDATE;
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

    if (!(new Date(filter.IN_DELTA_TIME_LAST_UPDATE).valueOf())) {
        var now = new Date();

        /**
         * config.getConfigurationByName("deltaTimeLastUpdate")[0].VALUE === 24 hs
         *
         */

        filter.IN_DELTA_TIME_LAST_UPDATE = new Date(now.setDate(now.getDate() - 1));
    }

    api.insertLogReportExportData(filterParameter);
    var spResult = api.getReportExportData({
        IN_IS_FULL_DOWNLOAD: filter.IN_IS_FULL_DOWNLOAD
        , IN_DELTA_TIME_LAST_UPDATE: filter.IN_DELTA_TIME_LAST_UPDATE
        , IN_HIERARCHY_LEVEL: filter.IN_HIERARCHY_LEVEL
        , IN_STATUS: validStatus[filter.IN_STATUS] || null
    });

    var outputFields = filter.SCOPE.toUpperCase() == 'ALL' ? defaultFields
        : filter.SCOPE.toUpperCase() == 'BUDGET'
            ? commonFields.concat(budgetFields)
            : commonFields.concat(kpiFields);
    if (spResult && spResult.length) {
        for (var i = 0; i < spResult.length; i++) {
            var elem = {};
            outputFields.forEach(function (field) {
                switch (field) {
                    case 'BUDGET':
                    case 'BUDGET_Q1':
                    case 'BUDGET_Q2':
                    case 'BUDGET_Q3':
                    case 'BUDGET_Q4':
                    case 'MNP_VALUE':
                    case 'MNP_VOLUME':
                    case 'MTP_VALUE':
                    case 'MTP_VOLUME':
                    case 'MIP_VALUE':
                    case 'MIP_VOLUME':
                    case 'LEAD_VOLUME_VALUE':
                    case 'LEAD_VOLUME_VOLUME':
                        elem[field] = Number(spResult[i][field]) || (Number(spResult[i][field]) == 0 ? 0 : null);
                        break;
                    default:
                        elem[field] = spResult[i][field] || null;
                        break;
                }
            });
            result.push(elem);
        }

    }

    if (filter.FORMAT === "CSV") {
        result = parseToCSV(result, filter, method, defaultFields, commonFields, budgetFields, kpiFields);
    }

    return result;
}

function getReportExportDataRegion(filter, method) {

    /**
     * Initialize variables
     * @type {[string,string,string]}
     */
    var scopeValues = ['ALL', 'KPI', 'BUDGET'];
    var result = [];

    var commonFields = [
        'HIERARCHY_LEVEL_ID'
        , 'CRM_ID'
    ];

    var budgetFields = [
        'PERCENTAGE_ALLOCATION'
        , 'REGION_ID'
        , 'REGION_DESC'
    ];

    if (!filter.SCOPE) {
        filter.SCOPE = 'ALL';
    }

    if (scopeValues.indexOf(filter.SCOPE.toUpperCase()) < 0) {
        throw ErrorLib.getErrors().CustomError("", "", "The parameter SCOPE is invalid");
    }

    var filterParameter = {
        IN_MODE: (filter.IN_IS_FULL_DOWNLOAD === 1 ? 1 : 2),
        IN_FILTER_CRITERIA: "SCOPE=" + filter.SCOPE
    };
    if (!filter.IN_IS_FULL_DOWNLOAD) {
        filter.IN_HIERARCHY_LEVEL = filter.IN_HIERARCHY_LEVEL.toUpperCase();
        if (!filter.IN_HIERARCHY_LEVEL) {
            throw ErrorLib.getErrors().CustomError("", "", "The parameter HIERARCHY_LEVEL is invalid");
        }


        filterParameter.IN_FILTER_CRITERIA += "&" + "HIERARCHY_LEVEL=" + filter.IN_HIERARCHY_LEVEL + "&" + "DELTA_TIME_LAST_UPDATE=" + filter.IN_DELTA_TIME_LAST_UPDATE;
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

    if (!(new Date(filter.IN_DELTA_TIME_LAST_UPDATE).valueOf())) {
        var now = new Date();

        /**
         * config.getConfigurationByName("deltaTimeLastUpdate")[0].VALUE === 24 hs
         *
         */

        filter.IN_DELTA_TIME_LAST_UPDATE = new Date(now.setDate(now.getDate() - 1));
    }

    api.insertLogReportExportData(filterParameter);
    var spResult = api.getReportExportDataRegion({
        IN_IS_FULL_DOWNLOAD: filter.IN_IS_FULL_DOWNLOAD
        , IN_DELTA_TIME_LAST_UPDATE: filter.IN_DELTA_TIME_LAST_UPDATE
        , IN_HIERARCHY_LEVEL: filter.IN_HIERARCHY_LEVEL
    });

    var outputFields = commonFields.concat(budgetFields);

    for (var i = 0; i < spResult.length; i++) {
        var elem = {};
        outputFields.forEach(function (field) {
            if (field == 'PERCENTAGE_ALLOCATION') {
                elem[field] = Number(spResult[i][field]) || (Number(spResult[i][field]) == 0 ? 0 : null);
            } else {
                elem[field] = spResult[i][field] || null;
            }
        });
        result.push(elem);
    }

    if (filter.FORMAT === "CSV") {
        result = parseToCSV(result, filter, method, null, commonFields, budgetFields, null);
    }

    return result;
}

function parseToCSV(rdo, filter, method, defaultHeaders, commonHeaders, budgetHeaders, kpiHeaders) {
    var outputHeaders = [];
    if (method == GET_REPORT_EXPORT_DATA) {
        //get the list of headers to use
        outputHeaders = defaultHeaders;

        if (filter.SCOPE.toUpperCase() != 'ALL') {
            outputHeaders = filter.SCOPE.toUpperCase() == 'BUDGET' ? commonHeaders.concat(budgetHeaders) : commonHeaders.concat(kpiHeaders);
        }
    }

    if (method == GET_REPORT_EXPORT_DATA_REGION) {
        //get the list of headers to use
        outputHeaders = commonHeaders.concat(budgetHeaders);
    }

    //return the output as CSV
    return utilLib.convertToCSV(outputHeaders, rdo);
}