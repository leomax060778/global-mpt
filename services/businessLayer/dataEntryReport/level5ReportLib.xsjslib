$.import("mktgplanningtool.services.commonLib", "mapper");
var mapper = $.mktgplanningtool.services.commonLib.mapper;
var dataL5DER = mapper.getDataLevel5Report();
var dataHl5 = mapper.getDataLevel5();
var dataPath = mapper.getDataPath();
var ErrorLib = mapper.getErrors();
var util = mapper.getUtil();
var dataCategory = mapper.getDataCategory();
var dataCostCenter = mapper.getDataCostCenter();
var dataCampaignType = mapper.getDataCampaignType();
var dataCampaignSubType = mapper.getDataCampaignSubType();
var dataMarketingProgram = mapper.getDataMarketingProgram();
//var dataMarketingActivity = mapper.getDataMarketingActivity();
var dataBusinessOwner = mapper.getDataBusinessOwner();
var dbER = mapper.getDataEmployeeResponsible();
var dataObjective = mapper.getDataObjectives();
var dataRouteToMarket = mapper.getDataRouteToMarket();
var dataMarketingOrganization = mapper.getDataMarketingOrganization();
var dataCategoryOptionLevel = mapper.getDataCategoryOptionLevel();
var dataPriority = mapper.getDataPriority();
var utilReportLib = mapper.getUtilDEReport();
/** ***********END INCLUDE LIBRARIES*************** */


var HL5_STATUS = {
    IN_PROGRESS: 1,
    CREATE_IN_CRM: 2,
    IN_CRM: 3,
    UPDATE_IN_CRM: 4,
    EXCEED_BUDGET: 5,
    COMPLETE: 6,
    VALID_FOR_CRM: 7,
    IN_CRM_NEED_NEW_BUDGET_APPROVAL: 8,
    DELETION_REQUEST: 9,
    DELETED_IN_CRM: 10
};


function getAllL5DEReport(userId) {
    var hl5List = dataL5DER.getAllLevel5Report(userId);
    return hl5List;
}

function getAllL5CreateInCrmDEReportForDownload(userId) {
    return dataL5DER.getAllL5CreateInCrmDEReportForDownload(userId);
}
function getAllHL5ChangedFields(userId) {
    var data = dataL5DER.getAllHL5ChangedFields(userId);
    return utilReportLib.parseChangedFields("HL5", "HL5_ID", data.out_hl5_changed_fields, data.out_hl5_category_options, data.out_hl5, data.out_hl5_extra_fields);

}

function getL5ChangedFieldsByHl5Id(hl5Id, userId) {
    var data = {"hl5": [], "category": []};
    data.STATUS_FLAG = dataHl5.getHl5StatusByHl5Id(hl5Id).HL5_STATUS_DETAIL_ID == HL5_STATUS.DELETION_REQUEST;
    if( data.STATUS_DETAIL_ID !== HL5_STATUS.DELETION_REQUEST){
        var l5ReportFields = this.getProcessingReportFields();
        var changedFields = dataL5DER.getL5ChangedFieldsByHl5Id(hl5Id);
        var hl5Categories = dataCategoryOptionLevel.getAllocationCategory(hl5Id, 'hl5');
        var hl5CategoryOptions = util.getAllocationOptionByCategoryAndLevelId('hl5', hl5Id);
        var processingReportData = dataL5DER.getL5ForProcessingReportByHl5Id(hl5Id);

        var hl5 = processingReportData.hl5;
        Object.keys(l5ReportFields).forEach(function (field) {
            if (field == "CATEGORY") {
                hl5Categories.forEach(function (hl5Category) {
                    if (hl5Category.IN_PROCESSING_REPORT) {
                        var object = {};
                        object.option = [];
                        object.display_name = hl5Category.CATEGORY_NAME;
                        hl5CategoryOptions[hl5Category.CATEGORY_ID].forEach(function (hl5CategoryOption) {
                            if (hl5CategoryOption.AMOUNT != 0 || hl5CategoryOption.UPDATED) {
                                object.option.push({
                                    "option_name": hl5CategoryOption.OPTION_NAME,
                                    "value": hl5CategoryOption.AMOUNT,
                                    "changed": hl5CategoryOption.UPDATED
                                });
                            }
                        });
                        data.category.push(object);
                    }
                });

            } else {
                var object = {};
                object.display_name = l5ReportFields[field];
                switch (field) {
                    case "ACRONYM":
                        object.value = hl5.CRM_ID;
                        break;
                    case "CAMPAIGN_TYPE_ID":
                        object.value = hl5.CAMPAIGN_TYPE;
                        break;
                    case "CAMPAIGN_SUBTYPE_ID":
                        object.value = hl5.CAMPAIGN_SUB_TYPE;
                        break;
                    case "CAMPAIGN_OBJECTIVE_ID":
                        object.value = hl5.CAMPAIGN_OBJECTIVE;
                        break;
                    case "ROUTE_TO_MARKET_ID":
                        object.value = hl5.ROUTE_TO_MARKET;
                        break;
                    case "COST_CENTER_ID":
                        object.value = hl5.COST_CENTER_CODE;
                        break;
                    case "SALES_ORGANIZATION_ID":
                        if(hl5.SALES_ORGANIZATION_ID) {
                            var saleOrganization = dataMarketingOrganization.getMarketingOrganizationById(hl5.SALES_ORGANIZATION_ID)[0];
                            object.value = saleOrganization.NAME;
                        }
                        break;
                    case "MARKETING_ACTIVITY_ID":
                            object.value = hl5.MARKETING_ACTIVITY;
                        break;
                    case "SHOW_ON_DG_CALENDAR":
                        object.value = hl5.SHOW_ON_DG_CALENDAR ? "Yes" : "No";
                        break;
                    case "BUSINESS_OWNER_ID":
                        object.value = hl5.BUSINESS_OWNER;
                        break;
                    case "MARKETING_PROGRAM_ID":
                        object.value = hl5.MARKETING_PROGRAM;
                        break;
                    case "MARKETING_PROGRAM_DESC":
                        object.value = hl5.MARKETING_PROGRAM_DESCRIPTION;
                        break;
                    case "MARKETING_ACTIVITY_DESC":
                        object.value = hl5.MARKETING_ACTIVITY_DESCRIPTION;
                        break;
                    case "DISTRIBUTION_CHANNEL_DESC":
                        object.value = hl5.DISTRIBUTION_CHANNEL;
                        break;
                    case "PLANNED_START_DATE":
                        object.value = hl5.PLANNED_START_DATE;
                        break;
                    case "PLANNED_END_DATE":
                        object.value = hl5.PLANNED_END_DATE;
                        break;
                    case "ACTUAL_START_DATE":
                        object.value = hl5.ACTUAL_START_DATE;
                        break;
                    case "ACTUAL_END_DATE":
                        object.value = hl5.ACTUAL_END_DATE;
                        break;
                    case "PARENT_PATH":
                        object.value =  hl5.PARENT_PATH;
                        break;
                    case "PRIORITY_ID":
                        object.value = hl5.PRIORITY;
                        break;
                    case "COUNTRY_ID":
                        object.value = hl5.COUNTRY;
                        break;
                    default:
                        object.value = hl5[field];
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
                data.hl5.push(object);
            }
        });
        data.HL5_ID = hl5Id;
        data.CREATED_USER_ID = hl5.CREATED_USER_ID;
    }

    return data;
}

function deleteL5ChangedFieldsByHl5Id(hl5Id) {
    return dataL5DER.deleteL5ChangedFieldsByHl5Id(hl5Id);
}
function massDeleteL5ChangedFieldsByHl5Ids(hl5Ids) {
    return dataL5DER.massDeleteL5ChangedFieldsByHl5Id(hl5Ids);
}

function checkChangedField(changedFields, field, value) {
    var hasChanged = false;
    for (var i = 0; i < changedFields.length; i++) {
        hasChanged = changedFields[i].COLUMN_NAME == field;
        if (hasChanged) break;
    }
    return hasChanged;
}

function getProcessingReportFields(){
    return {
        "ACRONYM": "ID"
        , "HL5_CRM_DESCRIPTION": "Description"
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
        , "COUNTRY_ID": "Country"
        , "POSTAL_CODE": "Postal Code"
        , "REGION": "Region"
        , "EVENT_OWNER": "Event Owner"
        , "NUMBER_OF_PARTICIPANTS": "Number Of Participants"
        , "CATEGORY": ""
    };
}


function getAllHL5DeletionRequest(level){
    return dataL5DER.getAllHL5DeletionRequest(level);
}