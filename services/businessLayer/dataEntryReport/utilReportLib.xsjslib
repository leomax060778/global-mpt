$.import("mktgplanningtool.services.commonLib", "mapper");
var mapper = $.mktgplanningtool.services.commonLib.mapper;

/**
 *
 * @param HL {'HL4'|'HL5'|'HL6'}
 * @param hlId {'HL4_ID'|'HL5_ID'|'HL6_ID'} -
 * @param changedFields {Array}
 * @param changedOptions {Array}
 * @param hlList {Array}
 * @returns {object[]}
 */
function parseChangedFields(HL, hlId, changedFields, changedOptions, hlList) {
    var KEY_MAP = {
        HL4: {
            EXTERNAL_ID: "ACRONYM",
            DESCRIPTION: "HL4_CRM_DESCRIPTION",
            MARKETING_ORGANIZATION: "MKT_ORG_ID",
            DISTRIBUTION_RULE: "DIS_CHANNEL_ID"
        }, HL5: {
            EXTERNAL_ID: "ACRONYM",
            DESCRIPTION: "HL5_CRM_DESCRIPTION",
            OBJECTIVE: "CAMPAIGN_OBJECTIVE_ID",
            TYPE: "CAMPAIGN_TYPE_ID",
            SUB_TYPE: "CAMPAIGN_SUBTYPE_ID",
            PRIORITY: "PRIORITY_ID",
            DISTRIBUTION_RULE: "DISTRIBUTION_CHANNEL_ID",
            MKT_PROGRAM_ID: "MARKETING_PROGRAM_ID",
            MARKETING_ACTIVITYID: "MARKETING_ACTIVITY_ID",
            BUSINESS_OWNER: "BUSINESS_OWNER_ID",
            SHOW_CALENDAR: "SHOW_ON_DG_CALENDAR",
            CERTIFICATION_LEVEL: "", //empty
            ROUTE_TO_MARKET: "ROUTE_TO_MARKET_ID",
            BUYING_CLASSIFICATION: "", //todo
            VENUE: "VENUE",
            NO_OF_PARTICIPANTS: "NUMBER_OF_PARTICIPANTS",
            PHONE_FOLLOWUP: "", //empty
            CITY: "CITY",
            COUNTRY: "COUNTRY",
            EMPLOYEE: "EMPLOYEE_RESPONSIBLE_USER",
            COST_CENTER: "COST_CENTER_ID",
            MARKETING_ORGANIZATION: "SALES_ORGANIZATION_ID"
        }, HL6: {
            EXTERNAL_ID: "ACRONYM",
            DESCRIPTION: "HL6_CRM_DESCRIPTION",
            OBJECTIVE: "CAMPAIGN_OBJECTIVE_ID",
            TYPE: "CAMPAIGN_TYPE_ID",
            SUB_TYPE: "CAMPAIGN_SUBTYPE_ID",
            PRIORITY: "PRIORITY_ID",
            DISTRIBUTION_RULE: "DISTRIBUTION_CHANNEL_ID",
            MKT_PROGRAM_ID: "MARKETING_PROGRAM_ID",
            MARKETING_ACTIVITYID: "MARKETING_ACTIVITY_ID",
            BUSINESS_OWNER: "BUSINESS_OWNER_ID",
            SHOW_CALENDAR: "SHOW_ON_DG_CALENDAR",
            CERTIFICATION_LEVEL: "", //empty
            ROUTE_TO_MARKET: "ROUTE_TO_MARKET_ID",
            BUYING_CLASSIFICATION: "",
            VENUE: "VENUE",
            NO_OF_PARTICIPANTS: "NUMBER_OF_PARTICIPANTS",
            PHONE_FOLLOWUP: "", //empty
            CITY: "CITY",
            COUNTRY: "COUNTRY",
            EMPLOYEE: "EMPLOYEE_RESPONSIBLE_USER",
            COST_CENTER: "COST_CENTER_ID",
            MARKETING_ORGANIZATION: "SALES_ORGANIZATION_ID"
        }
    };
    var CATEGORY_PROCESSING_REPORT_EXPORT_KEYS = {
        SOLUTION: "SOLUTION",
        INDUSTRY: "INDUSTRY",
        SEGMENT: "SEGMENT",
        INTPLAN: "INTPLAN",
        BUYING_CLASSIFICATION: "BUYING_CLASSIFICATION"

    };
    /**
     * Map of the following structure
     * {
                         *    hl_id1: {
                         *         CRM_COLUMN_NAME: EXCEL_COLUMN_NAME,
                         *         CRM_COLUMN_NAME2: EXCEL_COLUMN_NAME2
                         *    },
                         *    hl_id2: ...
                         * }
     * @type {*}
     */
    var changedFieldsMap = changedFields.reduce(function (accumulator, elem) {
        accumulator[elem[hlId]] = accumulator[elem[hlId]] || {};
        var obj = accumulator[elem[hlId]];
        obj[elem.COLUMN_NAME] = true;
        return accumulator;
    }, {});

    /**
     * Map of the following structure
     * {
                         *    hl_id1: {
                         *          category_export_key: [
                         *              {
                         *                name: name,
                         *                percentage: percentage
                         *              },
                         *              ...
                         *          ],
                         *          category_export_key2: ...
                         *
                         *    },
                         *    hl_id2: ...
                         * }
     * @type {*}
     */
    var changedCategoryOptionsMap = changedOptions.reduce(function (accumulator, elem) {
        if (CATEGORY_PROCESSING_REPORT_EXPORT_KEYS[elem.PROCESSING_REPORT_EXPORT_KEY]) {
            accumulator[elem[hlId]] = accumulator[elem[hlId]] || {};
            var obj = accumulator[elem[hlId]];
            var categoryProcessingReportExportKey = CATEGORY_PROCESSING_REPORT_EXPORT_KEYS[elem.PROCESSING_REPORT_EXPORT_KEY];
            obj[categoryProcessingReportExportKey] = obj[categoryProcessingReportExportKey] || [];
            obj[categoryProcessingReportExportKey].push({
                PERCENTAGE: elem.AMOUNT,
                NAME: elem.OPTION_NAME,
                CRM_KEY: elem.CRM_KEY
            });
        }
        return accumulator;
    }, {});

    /**
     * Map of the following structure:
     *
     * {
                         *    hl_id1: {
                         *          EXCEL_COLUMN_NAME: Value1,
                         *          EXCEL_COLUMN_NAME2: Value2
                         *    },
                         *    hl_id2: ...
                         *
                         * }
     */
    var exportData = hlList.reduce(function (accumulator, elem) {
        var obj = {};
        var includeRecordOnFinalData = false;
        var changedFieldsForHl = changedFieldsMap[elem[hlId]];
        var changedCategoryOptionsMapForHl = changedCategoryOptionsMap[elem[hlId]];
        if (changedFieldsForHl) {
            Object.keys(elem).forEach(function (key) {
                if (changedFieldsForHl[KEY_MAP[HL][key]]) {
                    includeRecordOnFinalData = true;
                    obj[key] = elem[key];
                }
                else if (key !== 'HL4_ID' && key !== 'HL5_ID' && key !== 'HL6_ID') {
                    obj[key] = '';
                }
            });
        }
        obj.EXTERNAL_ID = elem.EXTERNAL_ID; //MANDATORY FIELD
        if (changedCategoryOptionsMapForHl) {
            Object.keys(changedCategoryOptionsMapForHl).forEach(function (categoryExportKey) {
                changedCategoryOptionsMapForHl[categoryExportKey].forEach(function (option, index) {
                    if (categoryExportKey === "BUYING_CLASSIFICATION") {
                        includeRecordOnFinalData = true;
                        obj.BUYING_CLASSIFICATION = elem.BUYING_CLASSIFICATION;
                    } else {
                        includeRecordOnFinalData = true;
                        var suffix = index ? index : '';
                        obj[categoryExportKey + "_NEW" + suffix] = option.CRM_KEY;
                        obj[categoryExportKey + "_PER" + suffix] = option.PERCENTAGE;
                    }
                });
            });
        }
        if (includeRecordOnFinalData) {
            accumulator[elem[hlId]] = obj;
        }
        return accumulator;

    }, {});

    //  Extracting values from object (Object.values() is not supported on the current JS version)
    return Object.keys(exportData).map(function (key) {
        return exportData[key]
    });
}