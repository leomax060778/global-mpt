$.import("mktgplanningtool.services.commonLib", "mapper");
var mapper = $.mktgplanningtool.services.commonLib.mapper;
var dataL6DER = mapper.getDataLevel6Report();
var dataPath = mapper.getDataPath();
var dataCampaignType = mapper.getDataCampaignType();
var dataCategory = mapper.getDataCategory();
var dataCampaignSubType = mapper.getDataCampaignSubType();
var dataRouteToMarket = mapper.getDataRouteToMarket();
var dataMarketingOrganization = mapper.getDataMarketingOrganization();
var dataCostCenter = mapper.getDataCostCenter();
var dataMarketingProgram = mapper.getDataMarketingProgram();
var dataBusinessOwner = mapper.getDataBusinessOwner();
var ErrorLib = mapper.getErrors();
var util = mapper.getUtil();
var dataPriority = mapper.getDataPriority();
var dataCategoryOptionLevel = mapper.getDataCategoryOptionLevel();
var utilReportLib = mapper.getUtilDEReport();

/** ***********END INCLUDE LIBRARIES*************** */

function getAllL6DEReport(userId) {
    var hl6List = dataL6DER.getAllLevel6Report(userId);
    return hl6List;
}

function getAllL6CreateInCrmDEReportForDownload(userId) {
    return dataL6DER.getAllL6CreateInCrmDEReportForDownload(userId);
}

function getAllHL6ChangedFields(userId) {
    var data = dataL6DER.getAllHL6ChangedFields(userId);
    return utilReportLib.parseChangedFields("HL6", "HL6_ID", data.out_hl6_changed_fields, data.out_hl6_category_options, data.out_hl6);
}

function getL6ChangedFieldsByHl6Id(hl6Id, userId) {
    var l6ReportFields = this.getProcessingReportFields();
    var data = {
        "hl6": []
        , "category": []
    };
    var changedFields = dataL6DER.getL6ChangedFieldsByHl6Id(hl6Id);
    var hl6Categories = dataCategoryOptionLevel.getAllocationCategory(hl6Id, 'hl6');

    var hl6CategoryOptions = util.getAllocationOptionByCategoryAndLevelId('hl6', hl6Id);
    var processingReportData = dataL6DER.getL6ForProcessingReportByHl6Id(hl6Id);

    var hl6 = processingReportData.hl6;
    var costCenter;
    Object.keys(l6ReportFields).forEach(function (field) {
        if (field == "CATEGORY") {
            hl6Categories.forEach(function (hl6Category) {
                if (hl6Category.IN_PROCESSING_REPORT) {
                    var object = {};
                    object.option = [];
                    object.display_name = hl6Category.CATEGORY_NAME;
                    hl6CategoryOptions[hl6Category.CATEGORY_ID].forEach(function (hl6CategoryOption) {
                        if (hl6CategoryOption.AMOUNT != 0 || hl6CategoryOption.UPDATED) {
                            object.option.push({
                                "option_name": hl6CategoryOption.OPTION_NAME,
                                "value": hl6CategoryOption.AMOUNT,
                                "changed": hl6CategoryOption.UPDATED
                            });
                        }
                    });
                    data.category.push(object);
                }
            });
        } else {
            var object = {};
            object.display_name = l6ReportFields[field];
            switch (field) {
                case "ACRONYM":
                    object.value = hl6.CRM_ID;
                    break;
                case "DISTRIBUTION_CHANNEL_ID":
                    object.value = hl6.DISTRIBUTION_CHANNEL;
                    break;
                case "CAMPAIGN_TYPE_ID":
                    object.value = hl6.CAMPAIGN_TYPE;
                    break;
                case "CAMPAIGN_SUBTYPE_ID":
                    object.value = hl6.CAMPAIGN_SUB_TYPE;
                    break;
                case "CAMPAIGN_OBJECTIVE_ID":
                    object.value = hl6.CAMPAIGN_OBJECTIVE;
                    break;
                case "ROUTE_TO_MARKET_ID":
                    object.value = hl6.ROUTE_TO_MARKET;
                    break;
                case "COST_CENTER_ID":
                    object.value = hl6.COST_CENTER_CODE;
                    break;
                case "SALES_ORGANIZATION_ID":
                    object.value = hl6.SALE_ORGANIZATION;
                    break;

                case "MARKETING_ACTIVITY_ID":
                    if (processingReportData.marketing_activity_id) {
                        object.value = processingReportData.marketing_activity_id.CRM_ID;
                    }
                    break;
                case "SHOW_ON_DG_CALENDAR":
                    object.value = hl6.SHOW_ON_DG_CALENDAR ? "Yes" : "No";
                    break;
                case "BUSINESS_OWNER_ID":
                    object.value = hl6.BUSINESS_OWNER;
                    break;
                case "MARKETING_PROGRAM_DESC":
                    object.value = hl6.MARKETING_PROGRAM_DESCRIPTION;
                    break;
                case "MARKETING_ACTIVITY_DESC":
                    object.value = hl6.MARKETING_ACTIVITY;
                    break;
                case "DISTRIBUTION_CHANNEL_DESC":
                    object.value = hl6.DISTRIBUTION_CHANNEL;
                    break;
                case "COST_CENTER_RESP_PERS":
                    if (hl6['COST_CENTER_ID']) {
                        costCenter = dataCostCenter.getCostCenterById(hl6['COST_CENTER_ID']);
                        object.value = costCenter.EMPLOYEE_RESPONSIBLE_DESCRIPTION;
                    }
                    break;
                case "PLANNED_START_DATE":
                    object.value = hl6.PLANNED_START_DATE;
                    break;
                case "PLANNED_END_DATE":
                    object.value = hl6.PLANNED_END_DATE;
                    break;
                case "ACTUAL_START_DATE":
                    object.value = hl6.ACTUAL_START_DATE;
                    break;
                case "ACTUAL_END_DATE":
                    object.value = hl6.ACTUAL_END_DATE;
                    break;
                case "PARENT_PATH":
                    object.value = hl6.PARENT_PATH;
                    break;
                case "PRIORITY_ID":
                    object.value = hl6.PRIORITY;
                    break;
                default:
                    object.value = hl6[field];
                    break;
            }
            object.type = field == "PLANNED_START_DATE" ||
            field == "PLANNED_END_DATE" ||
            field == "ACTUAL_START_DATE" ||
            field == "ACTUAL_END_DATE" ? "DATE" : undefined;

            var fieldToCheck = field == "DISTRIBUTION_CHANNEL_DESC" ? "DISTRIBUTION_CHANNEL_ID"
                : field == "MARKETING_PROGRAM_DESC" ? "MARKETING_PROGRAM_ID"
                    : field == "MARKETING_ACTIVITY_DESC" ? "MARKETING_ACTIVITY_ID"
                        : field;

            object.changed = checkChangedField(changedFields, fieldToCheck);
            data.hl6.push(object);
        }
    });
    data.HL6_ID = hl6Id;
    data.CREATED_USER_ID = hl6.CREATED_USER_ID;
    return data;
}

function deleteL6ChangedFieldsByHl6Id(hl6Id) {
    return dataL6DER.deleteL6ChangedFieldsByHl6Id(hl6Id);
}

function massDeleteL6ChangedFieldsByHl6Ids(hl6Ids) {
    return dataL6DER.massDeleteL6ChangedFieldsByHl6Id(hl6Ids);
}

function checkChangedField(changedFields, field, value) {
    var hasChanged = false;
    for (var i = 0; i < changedFields.length; i++) {
        hasChanged = changedFields[i].COLUMN_NAME == field;

        if (hasChanged) break;
    }
    return hasChanged;
}

function getProcessingReportFields() {
    return {
        "ACRONYM": "ID"
        , "HL6_CRM_DESCRIPTION": "Description"
        , "CAMPAIGN_OBJECTIVE_ID": "Objective"
        , "CAMPAIGN_TYPE_ID": "Type"
        , "CAMPAIGN_SUBTYPE_ID": "Sub-Type"
        , "MARKETING_PROGRAM_ID": "Marketing Program ID"
        , "MARKETING_PROGRAM_DESC": "Marketing Program Desc"
        , "MARKETING_ACTIVITY_ID": "Marketing Activity ID"
        , "MARKETING_ACTIVITY_DESC": "Marketing Activity Desc"
        , "PARENT_PATH": "Parent"
        , "PRIORITY_ID": "Priority"
        , "SHOW_ON_DG_CALENDAR": "Show on calendar"
        , "PLANNED_START_DATE": "Planned Start"
        , "PLANNED_END_DATE": "Planned End"
        , "ACTUAL_START_DATE": "Actual Start"
        , "ACTUAL_END_DATE": "Actual End"
        , "SALES_ORGANIZATION_ID": "Marketing Organization"
        , "DISTRIBUTION_CHANNEL_ID": "Distribution Channel"
        , "DISTRIBUTION_CHANNEL_DESC": "Distribution Channel Desc"
        , "COST_CENTER_ID": "Cost Center"
        , "EMPLOYEE_RESPONSIBLE_USER": "Employee Responsible"
        , "BUSINESS_OWNER_ID": "Business Owner"
        , "ROUTE_TO_MARKET_ID": "Route to Market"
        , "BUDGET": "Budget"
        , "URL": "Event URL"
        , "VENUE": "Venue"
        , "STREET": "Street"
        , "CITY": "City"
        , "COUNTRY": "Country"
        , "POSTAL_CODE": "Postal Code"
        , "REGION": "Region"
        , "EVENT_OWNER": "Event Owner"
        , "NUMBER_OF_PARTICIPANTS": "Number Of Participants"
        , "CATEGORY": ""
    };
}