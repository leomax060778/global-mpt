$.import("mktgplanningtool.services.commonLib", "mapper");
var mapper = $.mktgplanningtool.services.commonLib.mapper;
var util = mapper.getUtil();

var BASE_OBJECT_MAP = {
    HL4: {
        EXTERNAL_ID: "",
        DESCRIPTION: "",
        MARKETING_ORGANIZATION: "",
        DISTRIBUTION_RULE: "",
        COST_CENTER: "",
        EMPLOYEE: "",

        /***********************Extra Fields************************/
        PARENT_PATH: "",
        BUDGET: "",
        CAMPAIGN_DETAIL: "",
        BUSINESS_VALUE: "",
    },
    HL5: {
        EXTERNAL_ID: "",
        DESCRIPTION: "",
        OBJECTIVE: "",
        TYPE: "",
        SUB_TYPE: "",
        PRIORITY: "",
        DISTRIBUTION_RULE: "",
        MKT_PROGRAM_ID: "",
        MARKETING_ACTIVITYID: "",
        BUSINESS_OWNER: "",
        SHOW_CALENDAR: "",
        CERTIFICATION_LEVEL: "",
        ROUTE_TO_MARKET: "",
        BUYING_CLASSIFICATION: "",
        VENUE: "",
        NO_OF_PARTICIPANTS: "",
        PHONE_FOLLOWUP: "",
        CITY: "",
        COUNTRY: "",
        EMPLOYEE: "",
        COST_CENTER: "",
        MARKETING_ORGANIZATION: "",
        PARENT_PATH: "",
        BUDGET: "",
        PLANNED_START_DATE: "",
        PLANNED_END_DATE: "",
        ACTUAL_START_DATE: "",
        ACTUAL_END_DATE: "",
        URL: "",
        STREET: "",
        POSTAL_CODE: "",
        REGION: "",
        EVENT_OWNER: "",
        CAMPAIGN_DETAIL: "",
        BUSINESS_VALUE: ""
    },
    HL6: {
        EXTERNAL_ID: "",
        DESCRIPTION: "",
        OBJECTIVE: "",
        TYPE: "",
        SUB_TYPE: "",
        PRIORITY: "",
        DISTRIBUTION_RULE: "",
        MKT_PROGRAM_ID: "",
        MARKETING_ACTIVITYID: "",
        BUSINESS_OWNER: "",
        SHOW_CALENDAR: "",
        CERTIFICATION_LEVEL: "",
        ROUTE_TO_MARKET: "",
        BUYING_CLASSIFICATION: "",
        VENUE: "",
        NO_OF_PARTICIPANTS: "",
        PHONE_FOLLOWUP: "",
        CITY: "",
        COUNTRY: "",
        EMPLOYEE: "",
        COST_CENTER: "",
        MARKETING_ORGANIZATION: "",

        /***********************Extra Fields************************/
        PARENT_PATH: "",
        BUDGET: "",
        PLANNED_START_DATE: "",
        PLANNED_END_DATE: "",
        ACTUAL_START_DATE: "",
        ACTUAL_END_DATE: "",
        URL: "",
        STREET: "",
        POSTAL_CODE: "",
        REGION: "",
        EVENT_OWNER: "",
    }
};

var EXCLUDED_KEYS_MAP = {
    HL_ID: true,
    REGION_START_TIME: true,
    REGION_END_TIME: true
};
/** Object to map all percentages and include them as a sigle row in the final **/
var PERCENTAGE_COLUMNS = {};
var CATEGORY_KEY_COLUMNS = {};

/**
 *
 * @param HL {'HL4'|'HL5'|'HL6'}
 * @param hlId {'HL4_ID'|'HL5_ID'|'HL6_ID'} -
 * @param changedFields {Array}
 * @param changedOptions {Array}
 * @param hlList {Array}
 * @param latestCRMVersionValues {Array}
 * @param filter String
 * @returns {object[]}
 */
function parseChangedFields(HL, hlId, changedFields, changedOptions, hlList, latestCRMVersionValues, filter) {
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

    if (filter === "NO_DATES"){
        EXCLUDED_KEYS_MAP.ACTUAL_START_DATE = true;
        EXCLUDED_KEYS_MAP.ACTUAL_END_DATE = true;
        EXCLUDED_KEYS_MAP.PLANNED_START_DATE = true;
        EXCLUDED_KEYS_MAP.PLANNED_END_DATE = true;
    }

    var CATEGORY_PROCESSING_REPORT_EXPORT_KEYS = {
        SOLUTION: "SOLUTION",
        INDUSTRY: "INDUSTRY",
        MKTSEG: "SEGMENT",
        INTPLAN: "INTPLAN",
        BUYING_CLASSIFICATION: "BUYING_CLASSIFICATION",
        IMP: "IMP"
    };

    /** Map CRM Version values by the HL_ID **/
    var crmVersionMapByHLId = latestCRMVersionValues.reduce(function(accumulator, elem){
        accumulator[""+elem[HL+'_ID']] = elem;
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
        obj.HL_ID = ""+elem[hlId]; //Field to map with CRM Version
        var includeRecordOnFinalData = false;
        var changedFieldsForHl = changedFieldsMap[elem[hlId]];
        if (changedFieldsForHl) {
            Object.keys(elem).forEach(function (key) {
                var crmVersionObject = crmVersionMapByHLId[obj.HL_ID];
                if (changedFieldsForHl[KEY_MAP[HL][key]]) {
                    includeRecordOnFinalData = true;
                    obj[key] = elem[key];

                    if( obj[key] === null ||
                        obj[key] === '' &&
                        !!crmVersionObject && !!crmVersionObject[key]
                    ){
                        obj[key] = 'DELETED';
                    }
                }
                else if (key !== 'HL4_ID' && key !== 'HL5_ID' && key !== 'HL6_ID') {
                    obj[key] = '';
                }
                if(key === 'HL4_FNC_BUDGET_TOTAL_MKT' || key === 'BUDGET'){
                    obj[key] = util.numberToLocaleString(obj[key]);
                }
            });
        }

        obj.EXTERNAL_ID = elem.EXTERNAL_ID; //MANDATORY FIELD

        if (includeRecordOnFinalData) {
            accumulator[elem[hlId]] = obj;
        }

        return accumulator;

    }, {});

    return Object.keys(exportData).reduce(function (accumulator, key) {
        if(filter){
            if ( filter === "DATES") {
                addRows(HL, exportData[key], changedCategoryOptionsMap, accumulator);
            } else if (
                ( filter === "NO_DATES") &&
                (   (!exportData[key].ACTUAL_START_DATE || exportData[key].ACTUAL_START_DATE === "") &&
                    (!exportData[key].ACTUAL_END_DATE || exportData[key].ACTUAL_END_DATE === "") &&
                    (!exportData[key].PLANNED_START_DATE || exportData[key].PLANNED_START_DATE === "") &&
                    (!exportData[key].PLANNED_END_DATE || exportData[key].PLANNED_END_DATE === "")
                )
            ){
                addRows(HL, exportData[key], changedCategoryOptionsMap, accumulator);
            }
        } else {
            addRows(HL, exportData[key], changedCategoryOptionsMap, accumulator);
        }

        return accumulator;
    }, []);
}

function addRows(level, originalObject, changedCategoryOptionsMap, accumulator){
    var changedCategoryOptionsMapForHl = changedCategoryOptionsMap[originalObject.HL_ID];
    //Clone object and remove unnecessary keys
    var object = cloneAndParseObject(originalObject);

    if (changedCategoryOptionsMapForHl) {
        var maxSize = 0;
        var keys = [];
        var finalObject = null;

        //Calculate the max size of options selected for one Category
        Object.keys(changedCategoryOptionsMapForHl).forEach(function (catKey){
            if( catKey !== "BUYING_CLASSIFICATION"){
                keys.push(catKey);
                maxSize = maxSize < changedCategoryOptionsMapForHl[catKey].length ?
                    changedCategoryOptionsMapForHl[catKey].length : maxSize;
            }
        });

        if(maxSize === 0){
            accumulator.push(object);
        } else {
            //Insert a row as max options selected
            for(var i = 0; i < maxSize; i++){
                finalObject = JSON.parse(JSON.stringify(object));
                //Add all CRM_KEY and PERCENTAGE in one row
                var pushData = false;
                keys.forEach(function(key){
                    if(
                        changedCategoryOptionsMapForHl[key] &&
                        changedCategoryOptionsMapForHl[key][i] &&
                        changedCategoryOptionsMapForHl[key][i].PERCENTAGE !== "" &&
                        changedCategoryOptionsMapForHl[key][i].PERCENTAGE !== null
                    ){
                        if(key === 'IMP'){
                            finalObject["INTPLAN_NEW"] = changedCategoryOptionsMapForHl[key][i].CRM_KEY;
                            finalObject["INTPLAN_PER"] = changedCategoryOptionsMapForHl[key][i].PERCENTAGE;
                        } else {
                            //Create an individual version of the object for each category-option
                            finalObject[key + "_NEW"] = changedCategoryOptionsMapForHl[key][i].CRM_KEY;
                            finalObject[key + "_PER"] = changedCategoryOptionsMapForHl[key][i].PERCENTAGE;
                        }


                        pushData = true;
                    }
                });

                if(pushData){
                    //Add the object to the final list
                    accumulator.push(finalObject);
                }
            }
        }
    } else {
        accumulator.push(object);
    }
}

function parseDates(object) {
    object.REGION_START_TIME = object.REGION_START_TIME || '000000';
    object.REGION_END_TIME = object.REGION_END_TIME || '000000';

    var length = object.REGION_END_TIME.length;
    for (var i = 0; i < 6 - length; i++) {
        object.REGION_END_TIME = '0' + object.REGION_END_TIME;
    }

    length = object.REGION_START_TIME.length;
    for (var j = 0; j < 6 - length; j++) {
        object.REGION_START_TIME = '0' + object.REGION_START_TIME;
    }

    object.PLANNED_START_DATE = object.PLANNED_START_DATE ? object.PLANNED_START_DATE.replace(/[-T:]|(.\d\d\dZ)/g, "").split(' ')[0] + object.REGION_START_TIME : object.PLANNED_START_DATE;
    object.PLANNED_END_DATE = object.PLANNED_END_DATE ? object.PLANNED_END_DATE.replace(/[-T:]|(.\d\d\dZ)/g, "").split(' ')[0] + object.REGION_END_TIME : object.PLANNED_END_DATE;

    object.ACTUAL_START_DATE = object.ACTUAL_START_DATE ? object.ACTUAL_START_DATE.replace(/[-T:]|(.\d\d\dZ)/g, "").split(' ')[0] + object.REGION_START_TIME : object.ACTUAL_START_DATE;
    object.ACTUAL_END_DATE = object.ACTUAL_END_DATE ? object.ACTUAL_END_DATE.replace(/[-T:]|(.\d\d\dZ)/g, "").split(' ')[0] + object.REGION_END_TIME : object.ACTUAL_END_DATE;
}

function cloneAndParseObject(originalObject){
    //Parse Dates using the Region
    parseDates(originalObject);

    var obj = {}
    Object.keys(originalObject).forEach(function(key){
        if(!excludeKey(key)){
            obj[key] = originalObject[key];
        }
    });

    return obj;
}

/**
 * Checks for Keys that are not included in the final Processing Report Template
 * @param key (String): key of the object
 */
function excludeKey(key){
    return EXCLUDED_KEYS_MAP[key];
}
