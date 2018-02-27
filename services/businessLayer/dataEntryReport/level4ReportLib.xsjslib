$.import("mktgplanningtool.services.commonLib", "mapper");
var mapper = $.mktgplanningtool.services.commonLib.mapper;
var dataL4DER = mapper.getDataLevel4Report();
var dataHl4 = mapper.getDataLevel4();
var dataCategory = mapper.getDataCategory();
var dataCategoryOptionLevel = mapper.getDataCategoryOptionLevel();
var dataPath = mapper.getDataPath();
var ErrorLib = mapper.getErrors();
var util = mapper.getUtil();
var utilReportLib = mapper.getUtilDEReport();

/** ***********END INCLUDE LIBRARIES*************** */

var HL4_STATUS = {
    IN_PROGRESS: 1,
    CREATE_IN_CRM: 2,
    IN_CRM: 3,
    UPDATE_IN_CRM: 4,
    EXCEED_BUDGET: 5,
    COMPLETE: 6,
    VALID_FOR_CRM: 7,
    DELETION_REQUEST: 9,
    DELETED_IN_CRM: 10
};

function getAllL4DEReport(userId) {
    var hl4List = dataL4DER.getAllLevel4Report(userId);
    return hl4List;
}

function getAllL4CreateInCrmDEReportForDownload(userId) {
    return dataL4DER.getAllL4CreateInCrmDEReportForDownload(userId);
}

function getAllHL4ChangedFields(userId) {
    var data = dataL4DER.getAllHL4ChangedFields(userId);
    return utilReportLib.parseChangedFields("HL4", "HL4_ID", data.out_hl4_changed_fields, data.out_hl4_category_options, data.out_hl4);
}

function getL4CrmBindingFieldsByHl4Id(hl4Id) {
    var sp_result = dataL4DER.getL4ChangedFieldsByHl4Id(hl4Id);
    var mapL4CrmBindignFields = {};
    for (var i = 0; i < sp_result.length; i++) {
        var obj = sp_result[i];
        mapL4CrmBindignFields[obj.COLUMN_NAME] = {};
        mapL4CrmBindignFields[obj.COLUMN_NAME].HL4_CRM_BINDING_ID = obj.ID
    }
    return mapL4CrmBindignFields;
}

function getL4ChangedFieldsByHl4Id(hl4Id, userId) {
        var data = {"hl4": [], "category": []};
        data.STATUS_FLAG = dataHl4.getHl4StatusByHl4Id(hl4Id).HL4_STATUS_DETAIL_ID == HL4_STATUS.DELETION_REQUEST;
        if(dataHl4.getHl4StatusByHl4Id(hl4Id).HL4_STATUS_DETAIL_ID !== HL4_STATUS.DELETION_REQUEST){
            var l4ReportFields = this.getProcessingReportFields().deReportDisplayName;

            var changedFields = dataL4DER.getL4ChangedFieldsByHl4Id(hl4Id);
            var hl4 = dataHl4.getHl4ById(hl4Id);
            var path = dataPath.getPathByLevelParent(4, hl4['HL3_ID'])[0];
            var parentPath = path.CRM_ID;
            var hl4Categories = dataCategoryOptionLevel.getAllocationCategory(hl4Id, 'hl4');
            var hl4Options = util.getAllocationOptionByCategoryAndLevelId('hl4', hl4Id);

            Object.keys(l4ReportFields).forEach(function (field) {
                if (field == "CATEGORY") {
                    hl4Categories.forEach(function (hl4Category) {
                        //var actualCategory = dataCategory.getCategoryById(hl4Category.CATEGORY_ID);
                        if (hl4Category.IN_PROCESSING_REPORT) {
                            var object = {};
                            object.option = [];
                            object.display_name = hl4Category.CATEGORY_NAME;
                            hl4Options[hl4Category.CATEGORY_ID].forEach(function (hl4CategoryOption) {
                                if (hl4CategoryOption.AMOUNT != 0 || hl4CategoryOption.UPDATED) {
                                    object.option.push({
                                        "option_name": hl4CategoryOption.OPTION_NAME,
                                        "value": hl4CategoryOption.AMOUNT,
                                        "changed": hl4CategoryOption.UPDATED
                                    });
                                }
                            });
                            data.category.push(object);
                        }
                    });
                } else {
                    var object = {};
                    object.display_name = l4ReportFields[field];
                    // When Acronym/ID display the CRM path for L4 entry

                    switch (field) {
                        case 'ACRONYM':
                            object.value = hl4['CRM_ID'];//CRM_ACRONYM + "-" + path.L2_ACRONYM + path.BUDGET_YEAR + "-" + hl4['ACRONYM'];
                            break;
                        case 'PARENT_PATH':
                            object.value = parentPath;
                            break;
                        case 'MKT_ORG_ID':
                            object.value = hl4.MARKETING_ORGANIZATION;
                            break;
                        case 'DIS_CHANNEL_ID':
                            object.value = hl4.DISTRIBUTION_CHANNEL;
                            break;
                        default:
                            object.value = hl4[field];
                            break;
                    }
                    object.changed = checkChangedField(changedFields, field);
                    data.hl4.push(object);
                }
                ;
            });
            data.HL4_ID = hl4Id;
            data.CREATED_USER_ID = hl4.CREATED_USER_ID;
        }
        return data;
}

function deleteL4ChangedFieldsByHl4Id(hl4Id) {
    try {
        return dataL4DER.deleteL4ChangedFieldsByHl4Id(hl4Id);
    } catch (e) {
        throw ErrorLib.getErrors().CustomError("",
            "level4ReportServices/handleGet/deleteL4ChangedFieldsByHl4Id", e.toString());
    }
}
function massDeleteL4ChangedFieldsByHl4Ids(hl4Ids) {
    return dataL4DER.massDeleteL4ChangedFieldsByHl4Id(hl4Ids);
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
    var processingReportFields = {
        deReportDisplayName: {
            "ACRONYM": "ID",
            "HL4_CRM_DESCRIPTION": "CRM Description",
            "HL4_DETAILS": "Initiative/Campaign Details",
            "HL4_BUSINESS_DETAILS": "Business Value",
            "HL4_FNC_BUDGET_TOTAL_MKT": "Budget",
            "PARENT_PATH": "Parent",
            "MKT_ORG_ID": "Marketing Organization",
            "DIS_CHANNEL_ID": "Distribution Channel",
            "SHOPPING_CART_APPROVER": "Shopping Cart Approver",
            "COST_CENTER": "Cost Center",
            "CATEGORY": ""
        },
        crmBindingFields: {hl4: [], hl4_fnc: []}
    };

    Object.keys(processingReportFields.deReportDisplayName).forEach(function (field) {
        processingReportFields.crmBindingFields.hl4.push(field);
    });

    return processingReportFields
}