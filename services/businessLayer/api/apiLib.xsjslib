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

function getReportExportData(filter) {
    var scopeValues = ['ALL', 'KPI', 'BUDGET'];
    var result = [];

    var commonFiels = [
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
    ];

    if(!filter.SCOPE){
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
    var spResult = api.getReportExportData({
        IN_IS_FULL_DOWNLOAD: filter.IN_IS_FULL_DOWNLOAD
        , IN_DELTA_TIME_LAST_UPDATE: filter.IN_DELTA_TIME_LAST_UPDATE
        , IN_HIERARCHY_LEVEL: filter.IN_HIERARCHY_LEVEL
    });

    if (spResult && spResult.length && filter.SCOPE.toUpperCase() != 'ALL') {
        var outputFields = filter.SCOPE.toUpperCase() == 'BUDGET' ? budgetFields : kpiFields;

        for (var i = 0; i < spResult.length; i++) {
            var elem = {};
            commonFiels.forEach(function (field) {
                elem[field] = spResult[i][field];
            });

            outputFields.forEach(function (field) {
                elem[field] = spResult[i][field];
            });
            result.push(elem);
        }

    } else {
        result = spResult;
    }

    return result;
}