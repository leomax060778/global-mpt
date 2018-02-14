$.import("mktgplanningtool.services.commonLib", "mapper");
var mapper = $.mktgplanningtool.services.commonLib.mapper;

/**
 *
 * @param HL {'HL4'|'HL5'|'HL6'}
 * @param hlId {'HL4_ID'|'HL5_ID'|'HL6_ID'} -
 * @param changedFields {Array}
 * @param changedOptions {Array}
 * @param hlList {Array}
 * @param changedExtraFields {Array}
 * @returns {object[]}
 */
function parseChangedFields(HL, hlId, changedFields, changedOptions, hlList, changedExtraFields) {
    var KEY_MAP = {
        HL4: {
            EXTERNAL_ID: "ACRONYM",
            DESCRIPTION: "HL4_CRM_DESCRIPTION",
            MARKETING_ORGANIZATION: "MKT_ORG_ID",
            DISTRIBUTION_RULE: "DIS_CHANNEL_ID",
            COST_CENTER: "COST_CENTER",
            EMPLOYEE: "SHOPPING_CART_APPROVER",

            /***********************Extra Fields************************/
            PARENT_PATH: "PARENT_PATH",
            BUDGET: "BUDGET",//HL4_FNC_BUDGET_TOTAL_MKT
            CAMPAIGN_DETAIL: "CAMPAIGN_DETAIL",//HL4_DETAILS
            BUSINESS_VALUE: "BUSINESS_VALUE"//HL4_BUSINESS_DETAILS
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
            COUNTRY: "COUNTRY_ID",
            EMPLOYEE: "EMPLOYEE_RESPONSIBLE_USER",
            COST_CENTER: "COST_CENTER_ID",
            MARKETING_ORGANIZATION: "SALES_ORGANIZATION_ID",

            /***********************Extra Fields************************/
            PARENT_PATH: "PARENT_PATH",
            BUDGET: "BUDGET",
            PLANNED_START_DATE: "PLANNED_START_DATE",
            PLANNED_END_DATE: "PLANNED_END_DATE",
            ACTUAL_START_DATE: "ACTUAL_START_DATE",
            ACTUAL_END_DATE: "ACTUAL_END_DATE",
            URL: "URL",
            STREET: "STREET",
            POSTAL_CODE: "POSTAL_CODE",
            REGION: "REGION",
            EVENT_OWNER: "EVENT_OWNER"
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
            COUNTRY: "COUNTRY_ID",
            EMPLOYEE: "EMPLOYEE_RESPONSIBLE_USER",
            COST_CENTER: "COST_CENTER_ID",
            MARKETING_ORGANIZATION: "SALES_ORGANIZATION_ID",

            /***********************Extra Fields************************/
            PARENT_PATH: "PARENT_PATH",
            BUDGET: "BUDGET",
            PLANNED_START_DATE: "PLANNED_START_DATE",
            PLANNED_END_DATE: "PLANNED_END_DATE",
            ACTUAL_START_DATE: "ACTUAL_START_DATE",
            ACTUAL_END_DATE: "ACTUAL_END_DATE",
            URL: "URL",
            STREET: "STREET",
            POSTAL_CODE: "POSTAL_CODE",
            REGION: "REGION",
            EVENT_OWNER: "EVENT_OWNER"
        }
    };
    var CATEGORY_PROCESSING_REPORT_EXPORT_KEYS = {
        SOLUTION: "SOLUTION",
        INDUSTRY: "INDUSTRY",
        MKTSEG: "SEGMENT",
        INTPLAN: "INTPLAN",
        BUYING_CLASSIFICATION: "BUYING_CLASSIFICATION",
        IMP: "IMP"
    };

    var EXTRA_FIELDS = [
        "PARENT_PATH",
        "BUDGET",
        "PLANNED_START_DATE",
        "PLANNED_END_DATE",
        "ACTUAL_START_DATE",
        "ACTUAL_END_DATE",
        "URL",
        "STREET",
        "POSTAL_CODE",
        "REGION",
        "EVENT_OWNER",
        "CAMPAIGN_DETAIL",
        "BUSINESS_VALUE",
        "HL4_FNC_BUDGET_TOTAL_MKT",
        "HL4_DETAILS",
        "HL4_BUSINESS_DETAILS"
    ];
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
                PERCENTAGE: Number(elem.AMOUNT) ? elem.AMOUNT : '',
                NAME: elem.OPTION_NAME,
                CRM_KEY: Number(elem.AMOUNT) ? elem.CRM_KEY : ''
            });
        }
        return accumulator;
    }, {});

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

    var changedExtraFieldsMap = changedFields.reduce(function (accumulator, elem) {
        accumulator[elem[hlId]] = accumulator[elem[hlId]] || {};
        var obj = accumulator[elem[hlId]];
        if (EXTRA_FIELDS.indexOf(elem.COLUMN_NAME) >= 0) {
            /**
             * The switch is needed deu to L4 changed fields have different names than L5/L6
             */
            switch (elem.COLUMN_NAME){
                case "HL4_FNC_BUDGET_TOTAL_MKT":
                    obj.BUDGET= true;
                    break;
                case "HL4_DETAILS":
                    obj.CAMPAIGN_DETAIL= true;
                    break;
                case "HL4_BUSINESS_DETAILS":
                    obj.BUSINESS_VALUE= true;
                    break;
                default:
                    obj[elem.COLUMN_NAME] = true;
            }
        } else {
            obj.EXTERNAL_ID = true;
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
    /**
     * This section guarantees that the extra fields are placed at the end of the download template
     */
    var extraExportData = changedExtraFields.reduce(function (accumulator, elem) {
        var obj = {};
        var includeRecordOnFinalData = false;
        var changedExtraFieldsMapForHl = changedExtraFieldsMap[elem[hlId]];
        obj.EXTERNAL_ID = elem.EXTERNAL_ID; //MANDATORY FIELD
        if (changedExtraFieldsMapForHl) {
            Object.keys(elem).forEach(function (key) {
                if(key != "EXTERNAL_ID"){
                    if (changedExtraFieldsMapForHl[KEY_MAP[HL][key]]) {
                        includeRecordOnFinalData = true;
                        obj[key] = elem[key];
                    }
                    else if (key !== 'HL4_ID' && key !== 'HL5_ID' && key !== 'HL6_ID') {
                        obj[key] = '';
                    }
                }
            });
        }
        if (includeRecordOnFinalData) {
            accumulator[elem[hlId]] = obj;
        }
        return accumulator;

    }, {});

    Object.keys(extraExportData).forEach(function (extraKey) {
        exportData[extraKey] = exportData[extraKey] || {};
        Object.keys(extraExportData[extraKey]).forEach(function (extraField) {
            exportData[extraKey][extraField] = extraExportData[extraKey][extraField]
        })
    });

    /************************************************************************************/
    //  Extracting values from object (Object.values() is not supported on the current JS version)
    return Object.keys(exportData).map(function (key) {
        return exportData[key]
    });
}