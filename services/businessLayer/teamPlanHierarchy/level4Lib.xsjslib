/***************Import Library*******************/
$.import("mktgplanningtool.services.commonLib", "mapper");
var mapper = $.mktgplanningtool.services.commonLib.mapper;
var dataHl4 = mapper.getDataLevel4();
var dataHl3 = mapper.getDataLevel3();
var dataExOut = mapper.getDataExpectedOutcome();
var dataPartner = mapper.getDataPartner();
var dataCurrency = mapper.getDataCurrency();
var dataPath = mapper.getDataPath();
var budgetYear = mapper.getBudgetYear();
/*************************************************/


var dataCategory = mapper.getDataCategory();
var dataOption = mapper.getDataOption();
var dataCategoryOptionLevel = mapper.getDataCategoryOptionLevel();

/*************************************************/
var partnerLib = mapper.getPartner();
var expectedOutcomesLib = mapper.getExpectedOutcomes();
var level4DER = mapper.getLevel4DEReport();
var dataL4Report = mapper.getDataLevel4Report();
var level5Lib = mapper.getLevel5();
var db = mapper.getdbHelper();
var dbUserRole = mapper.getDataUserRole();
var dbUser = mapper.getDataUser();
var ErrorLib = mapper.getErrors();
var util = mapper.getUtil();
var userbl = mapper.getUser();
var level3BL = mapper.getLevel3();
var userBL = mapper.getUser();
var mail = mapper.getMail();
var businessError = mapper.getLogError();
var pathBL = mapper.getPath();
var config = mapper.getDataConfig();
/*************************************************/

var levelCampaign = "Initiative/Campaign";
var L3_MSG_INITIATIVE_NOT_FOUND = "The Initiative/Campaign can not be found.";
var L3_MSG_USER_NOT_FOUND = "The User can not be found.";
var L3_MSG_NO_PRIVILEGE = "Not enough privilege to do this action.";
var L3_MSG_CANNOT_DEL_STATUS = "Cannot delete this selected Initiative/Campaign, because the status doesn´t allow it.";
var L3_MSG_INITIATIVE_CANT_DEL_CHILD = "The selected Initiative/Campaign can not be deleted because has childs.";
var L3_MSG_INITIATIVE_DETAIL = "The Initiative/Campaign details can not be null or empty.";
var L3_MSG_INITIATIVE_BUSINESS = "The Initiative/Campaign business value can not be null or empty.";
var L3_MSG_INITIATIVE_ACRONYM = "The Initiative/Campaign acronym can not be null or empty.";
var L3_MSG_INITIATIVE_IN_CRM = "Cannot modified CRM ID if already exists in CRM.";
var L3_MSG_INITIATIVE_EXISTS = "Another Initiative/Campaign with the same acronym already exists on this plan.";
var L3_MSG_INITIATIVE_ACRONYM_LENGTH = "The Initiative/Campaign Acronym length must be 3 characters.";
var L3_MSG_INITIATIVE_CRM_DESCRIPTION = "The Initiative/Campaign CRM description can not be null or empty.";
var L3_MSG_INITIATIVE_BUDGET_DATA = "The Initiative/Campaign Budget data can not be found.";
var L3_MSG_INITIATIVE_BUDGET_VALUE = "The Initiative/Campaign Budget value must be greater than zero.";
var L3_MSG_INITIATIVE_CURRENCY = "The Initiative/Campaign Currency can not be found.";
var L3_MSG_INITIATIVE_BUDGET_SPEND = "The Initiative/Campaign Budget spend must be set.";
var L3_MSG_INITIATIVE_BUDGET_SPEND_PERCENT = "The Initiative/Campaign Budget Spend must be 100%.";
var L3_MSG_INITIATIVE_MY_BUDGET = " The Initiative/Campaign in My Budget can not be found.";
var L3_MSG_INITIATIVE_BUDGET_PERCENT = "The Initiative/Campaign in My Budget percentage should be less than or equal to 100%.";
var L3_MSG_INITIATIVE_SALES_OTHER = "The Initiative/Campaign in Sales Other has not attributes.";
var L3_CAMPAIGN_FORECASTING_KPIS_DETAILS = "Campaign Forecasting / KPIS details amount value is not valid.";
var L3_CAMPAIGN_FORECASTING_KPIS_DETAILS_EURO = "Campaign Forecasting / KPIS details euro value is not valid.";
var L3_CAMPAIGN_FORECASTING_KPIS_NOT_VALID = "Campaign Forecasting / KPIS is not valid.";
var L3_CAMPAIGN_FORECASTING_KPIS_VOLUME = "Campaign Forecasting / KPIS volume must be equal or lower than available volume.";
var L3_CAMPAIGN_FORECASTING_KPIS_VALUE = "Campaign Forecasting / KPIS value must be equal or lower than available value.";
var L3_PARTNER_TYPE_NOT_VALID = "Partner type is not valid.";
var L3_PARTNER_NAME_NOT_FOUND = "Partner name can not be found.";
var L3_PARTNER_REGION_NOT_VALID = "Partner region is not valid.";
var L3_PARTNER_VALUE_NOT_VALID = "Partner value is not valid.";
var L3_CATEGORY_NOT_EMPTY = "Category cannot be empty.";
var L3_CATEGORY_INCORRECT_NUMBER = "Incorrect number of categories.";
var L3_CATEGORY_OPTIONS_NOT_EMPTY = "Category Options cannot be empty.";
var L3_CATEGORY_OPTIONS_INCORRECT_NUMBER = "Incorrect number of options.";
var L3_CATEGORY_OPTION_NOT_VALID = "Option is not valid.";
var L3_CATEGORY_NOT_VALID = "Category is not valid.";
var L3_CATEGORY_TOTAL_PERCENTAGE = "Category total percentage should be less than or equal to 100%.";
var L3_CATEGORY_OPTION = "Error while trying to save Option.";
var L3_CATEGORY_OPTION_NOT_VALID = "Option or User is not valid.";
var L3_MSG_INITIATIVE_COULDNT_CHAGE_STATUS = "Your records was saved as \"In progress\".  Please review your record for incomplete fields and/or pending budget approvals.";
var L3_CAMPAIGN_FORECASTING_KPIS_COMMENT = "Please enter a comment to explain expected outcomes as you didn't select any Campaign type.";
var L3_NOT_IMPLEMENT_EXECUTION_LEVEL = "This PROGRAMS/CAMPAIGNS does not implement execution level.";
var L4_ID_NOT_FOUND = "The HL4 ID could not be found.";

var HL4_STATUS = {
    IN_PROGRESS: 1,
    CREATE_IN_CRM: 2,
    IN_CRM: 3,
    UPDATE_IN_CRM: 4,
    EXCEED_BUDGET: 5,
    COMPLETE: 6
};

var HIERARCHY_LEVEL = {
    HL1: 6,
    HL2: 5,
    HL3: 4,
    HL4: 1,
    HL5: 2,
    HL6: 3
};

/** ****************END CONSTANTS***************** */

function getHl4(id) {
    var spResult = dataHl4.getHl4(id);
    var result = [];
    spResult.out_result.forEach(function (hl4) {
        var aux = {};
        aux = util.extractObject(hl4);
        aux.CRM_ID = hl4.CRM_ID;
        aux.HL4_TOTAL = hl4.HL4_BUDGET;
        aux.TOTAL_HL5 = hl4.TOTAL_HL5;
        aux.QUANTITY_HL5_OUT_BUDGET = hl4.QUANTITY_HL5_OUT_BUDGET;
        aux.ALLOCATED = hl4.ALLOCATED;
        aux.REMAINING = hl4.REMAINING;
        result.push(aux);
    });

    var responseObj = {
        "results": result,
        "total_budget": spResult.out_total_budget,
        "remaining_budget": spResult.out_remaining_budget,
        "out_total_allocated": spResult.out_total_allocated
    };

    responseObj.budget_year = budgetYear.getBudgetYearByLevelParent(4, id, true);
    return responseObj;
}

function getHL4CarryOverById(hl4Id, userId){
    if (!hl4Id){
        throw ErrorLib.getErrors().BadRequest("The HL4 ID could not be found.", "hl4Services/handleGet/getHl5", L4_ID_NOT_FOUND);
    }

    return dataHl4.getHL4CarryOverById(hl4Id);
}

function getParentRemainingBudgetByParentId(hl3Id) {
    return dataHl3.getHl3RemainingBudgetByHl3Id(hl3Id)
}

function getImplementExecutionLevel(hl4Id) {
    if (!dataHl4.getImplementExecutionLevel(hl4Id))
        throw ErrorLib.getErrors().BadRequest("PROGRAMS/CAMPAIGNS does not implement execution level.", "hl4Services/handleGet/getHl5", L3_NOT_IMPLEMENT_EXECUTION_LEVEL);

    return 1;
}

function getHl4ById(id) {
    if (!id)
        throw ErrorLib.getErrors().BadRequest("The Parameter ID is not found", "hl4Services/handleGet/getHl4ById", L3_MSG_INITIATIVE_NOT_FOUND);

    var objHl4 = parseObject(dataHl4.getHl4ById(id));
    var hl4 = {
        "hl4": objHl4,
        "expectedOutcomes": getExpectedOutcomesByHl4Id(id, objHl4.in_hl3_id),
        "hl4_category": getHl4CategoryOption(id)
    };

    return hl4;
}

function getUserById(id) {
    if (!id)
        throw ErrorLib.getErrors().BadRequest("The Parameter ID is not found", "userServices/handleGet/getUserById", L3_MSG_USER_NOT_FOUND);
    return dbUser.getUserById(id);

}

function getLevel4ForSearch(budgetYearId, regionId, subRegionId, limit, offset, userSessionID) {
    var defaultBudgetYear = budgetYear.getDefaultBudgetYear();
    var results = dataHl4.getLevel4ForSearch(budgetYearId || defaultBudgetYear.BUDGET_YEAR_ID, regionId || 0, subRegionId || 0, limit || -1, offset || 0, userSessionID, util.isSuperAdmin(userSessionID) ? 1 : 0);
    return results;
}

function getHl4ByBudgetYear(hl4Id){
    return dataHl4.getHl4ByBudgetYear(hl4Id || null);
}

function insertHl4(data, userId) {
    var hl4_id = 0;
    try {
        var transactionOk = true;

        var hl4_category_option = true;
        var hl4_expected_outcomes = true;
        var hl4_expected_outcomes_detail = true;

        var validationResult = validateHl4(data, userId);
        data.hl4.in_hl4_status_detail_id = validationResult.statusId;

        if (data.hl4.in_hl4_status_detail_id > 0) {

            data.hl4.in_created_user_id = userId;
            data.hl4.in_is_send_mail = 0;
            data.hl4.in_read_only = 0;

            /********************refactor 03/11/2016*****************************/

            data.hl4.in_hl4_fnc_budget_total_mkt = Number(data.hl4.in_hl4_fnc_budget_total_mkt);
            data.hl4.in_in_budget = checkBudgetStatus(data.hl4.in_hl3_id, hl4_id, Number(data.hl4.in_hl4_fnc_budget_total_mkt));

            /*************************************************/

            data.hl4.in_user_id_send_mail = 1;

            var hl4 = {
                in_acronym: data.hl4.in_acronym,
                in_hl4_crm_description: data.hl4.in_hl4_crm_description,
                in_hl4_details: data.hl4.in_hl4_details,
                in_hl4_business_details: data.hl4.in_hl4_business_details,
                in_hl4_fnc_budget_total_mkt: data.hl4.in_hl4_fnc_budget_total_mkt,
                in_hl3_id: data.hl4.in_hl3_id,
                in_is_hl4: data.hl4.in_is_hl4,
                in_hl4_parent_id: data.hl4.in_hl4_parent_id,
                in_created_user_id: data.hl4.in_created_user_id,
                in_is_send_mail: data.hl4.in_is_send_mail,
                in_read_only: data.hl4.in_read_only,
                in_user_id_send_mail: data.hl4.in_user_id_send_mail = 1,
                in_in_budget: data.hl4.in_in_budget,
                in_hl4_status_detail_id: data.hl4.in_hl4_status_detail_id,
                in_shopping_cart_approver: data.hl4.SHOPPING_CART_APPROVER || null,
                in_cost_center: data.hl4.COST_CENTER || null,
                in_mkt_org_id: data.hl4.in_mkt_org_id,
                in_dis_channel_id: data.hl4.in_dis_channel_id
            };

            hl4_id = dataHl4.insertHl4(hl4);

            if (hl4_id > 0) {
                var mapCOL = util.getMapCategoryOption('hl4');//Set Map for Category Option Level

                insertInCrmBinding(validationResult.crmBindingChangedFields, validationResult.crmBindingChangedFieldsUpdate, hl4_id);

                pathBL.insParentPath('hl4', hl4_id, data.hl4.in_hl3_id, userId);

                data.hl4.in_hl4_id = hl4_id;

                setHl4Status(hl4_id, data.hl4.in_hl4_status_detail_id, userId);

                var outcome = {};
                outcome.in_created_user_id = userId;
                outcome.in_hl4_id = hl4_id;
                outcome.in_comments = data.hl4_expected_outcomes.in_comments || "";
                var hl4_expected_outcomes_id = dataExOut.insertHl4ExpectedOutcomes(outcome);
                hl4_expected_outcomes = (hl4_expected_outcomes_id > 0);
                if (hl4_expected_outcomes) {
                    var arrL4Kpi = [];
                    data.hl4_expected_outcomes.hl4_expected_outcomes_detail.forEach(function (expectedOutcomeDetail) {
                        if (hl4_expected_outcomes) {
                            var objL4Kpi = {};
                            objL4Kpi.in_created_user_id = userId;
                            objL4Kpi.in_hl4_expected_outcomes_id = hl4_expected_outcomes_id;
                            objL4Kpi.in_amount_value = Number(expectedOutcomeDetail.in_amount_value);
                            objL4Kpi.in_euro_value = Number(expectedOutcomeDetail.in_euro_value);
                            objL4Kpi.in_outcomes_id = dataExOut.getExpectedOutcomeLevelByLevelAndOptionId(HIERARCHY_LEVEL.HL4, expectedOutcomeDetail.in_outcomes_id).EXPECTED_OUTCOME_LEVEL_ID;
                            arrL4Kpi.push(objL4Kpi);
                        }
                    });
                    if(arrL4Kpi.length)
                        dataExOut.insertHl4ExpectedOutcomesDetail(arrL4Kpi);
                }

                var categoryOptionBulk = [];
                data.hl4_category.forEach(function (hl4Category) {
                    if (hl4Category) {
                        hl4Category.hl4_category_option.forEach(function (hl4CategoryOption) {
                            hl4CategoryOption.in_created_user_id = userId;
                            hl4CategoryOption.in_amount = hl4CategoryOption.in_amount || 0;
                            hl4CategoryOption.in_updated = hl4Category.in_in_processing_report && hl4CategoryOption.in_amount ? 1 : 0;
                            hl4Category.categoryOptionLevelId = mapCOL[hl4Category.in_category_id][hl4CategoryOption.in_option_id];
                            categoryOptionBulk.push({
                                in_id: hl4_id
                                , in_category_option_level_id: hl4Category.categoryOptionLevelId
                                , in_amount: hl4CategoryOption.in_amount
                                , in_created_user_id: userId
                                , in_updated: hl4CategoryOption.in_updated
                            });
                        });
                    }
                });
                dataCategoryOptionLevel.insertCategoryOption(categoryOptionBulk, 'hl4');

                transactionOk = !!hl4_id && hl4_expected_outcomes
                    && hl4_expected_outcomes_detail && hl4_category_option;
                if (transactionOk) {
                    db.commit();
                } else {
                    db.rollback();
                    deleteHl4({'in_hl4_id': hl4_id, 'in_user_id': userId}, userId, true);
                    hl4_id = null;
                }
            }
            dataL4Report.updateLevel4ReportForDownload(hl4_id); //Update Processing Report Export Data
            return hl4_id;
        }
    } catch (e) {
        db.rollback();
        deleteHl4({'in_hl4_id': hl4_id, 'in_user_id': userId}, userId, true);
        throw e;
    }
}

function insertInCrmBinding(crmBindingChangedFields, crmBindingChangedFieldsUpdate, hl4Id){
    if(hl4Id){
        for(var i = 0; i < crmBindingChangedFields.length; i++){
            crmBindingChangedFields[i].in_hl4_id = hl4Id;
        }
        for(var j = 0; j < crmBindingChangedFieldsUpdate.length; j++){
            crmBindingChangedFieldsUpdate[j].in_hl4_id = hl4Id;
        }
    }

    if (crmBindingChangedFields.length)
        dataHl4.insertHl4CRMBinding(crmBindingChangedFields);

    if (crmBindingChangedFieldsUpdate.length)
        dataHl4.updateHl4CRMBinding(crmBindingChangedFieldsUpdate);
}

function updateHl4(data, userId) {
    if (!data.hl4.in_hl4_id)
        throw ErrorLib.getErrors().CustomError("", "hl4Services/handlePost/updateHl4", L3_MSG_INITIATIVE_NOT_FOUND);

    if (!util.validateIsNumber(data.hl4.in_hl4_id))
        throw ErrorLib.getErrors().CustomError("", "hl4Services/handlePost/updateHl4", L3_MSG_INITIATIVE_NOT_FOUND);

    if (!userId)
        throw ErrorLib.getErrors().CustomError("", "hl4Services/handlePost/updateHl4", L3_MSG_USER_NOT_FOUND);

    try {

        var hl4_id = null;
        var transactionOk = true;
        var hl4_category = true;
        var hl4_category_option = true;
        var hl4_expected_outcomes = true;
        var hl4_expected_outcomes_detail = true;

        var validationResult = validateHl4(data, userId);

        data.hl4.in_hl4_status_detail_id = validationResult.statusId;

        if (data.hl4.in_hl4_status_detail_id > 0) {
            data.hl4.in_user_id = userId;
            data.hl4.in_is_send_mail = 0;
            data.hl4.in_read_only = 0;

            data.hl4.in_user_id_send_mail = 1;

            var hl4 = {};
            hl4.in_hl4_id = data.hl4.in_hl4_id;
            hl4.in_acronym = data.hl4.in_acronym;
            hl4.in_hl4_crm_description = data.hl4.in_hl4_crm_description;
            hl4.in_hl4_details = data.hl4.in_hl4_details;
            hl4.in_hl4_business_details = data.hl4.in_hl4_business_details;
            hl4.in_hl4_status_detail_id = data.hl4.in_hl4_status_detail_id;
            hl4.in_is_send_mail = data.hl4.in_is_send_mail;
            hl4.in_user_id_send_mail = data.hl4.in_user_id_send_mail;
            hl4.in_hl4_parent_id = data.hl4.in_hl4_parent_id;
            hl4.in_read_only = data.hl4.in_read_only;
            hl4.in_is_annual_plan = data.hl4.in_is_annual_plan;
            hl4.in_shopping_cart_approver = data.hl4.SHOPPING_CART_APPROVER || null;
            hl4.in_cost_center = data.hl4.COST_CENTER || null;
            hl4.in_mkt_org_id = data.hl4.in_mkt_org_id;
            hl4.in_dis_channel_id = data.hl4.in_dis_channel_id;
            hl4.in_user_id = userId;

            /********************REFACTOR*************************/
            data.hl4.in_in_budget = checkBudgetStatus(Number(data.hl4.in_hl3_id), data.hl4.in_hl4_id, Number(data.in_hl4_fnc_budget_total_mkt));
            hl4.in_HL4_FNC_BUDGET_TOTAL_MKT = data.hl4.in_hl4_fnc_budget_total_mkt;
            /**********************************************************/

            hl4_id = data.hl4.in_hl4_id;
            var deleteParameters = {"in_hl4_id": hl4_id, "in_user_id": userId};
            var objHL4 = dataHl4.getHl4ById(data.hl4.in_hl4_id);

            var hl4RowsUpdated = dataHl4.updateHl4(hl4);
            if (hl4RowsUpdated > 0) {
                var mapCOL = util.getMapCategoryOption('hl4');//Set Map for Category Option Level
                insertInCrmBinding(validationResult.crmBindingChangedFields, validationResult.crmBindingChangedFieldsUpdate);
                if (objHL4.HL4_FNC_BUDGET_TOTAL_MKT != hl4.in_HL4_FNC_BUDGET_TOTAL_MKT) {
                    level5Lib.checkBudgetStatus(hl4);
                }
                var hl4FncRowsUpdated = true;

                dataExOut.deleteHl4ExpectedOutcomesDetail(deleteParameters);
                dataExOut.deleteHl4ExpectedOutcomes(deleteParameters);
                var outcome = {};
                outcome.in_created_user_id = userId;
                outcome.in_hl4_id = hl4_id;
                outcome.in_comments = data.hl4_expected_outcomes.in_comments || "";
                var hl4_expected_outcomes_id = dataExOut.insertHl4ExpectedOutcomes(outcome);
                hl4_expected_outcomes = (hl4_expected_outcomes_id > 0);
                if (hl4_expected_outcomes) {
                    var arrL4Kpi = [];
                    data.hl4_expected_outcomes.hl4_expected_outcomes_detail.forEach(function (expectedOutcomeDetail) {
                        if (hl4_expected_outcomes) {
                            var objL4Kpi = {};
                            objL4Kpi.in_created_user_id = userId;
                            objL4Kpi.in_hl4_expected_outcomes_id = hl4_expected_outcomes_id;
                            objL4Kpi.in_amount_value = Number(expectedOutcomeDetail.in_amount_value);
                            objL4Kpi.in_euro_value = Number(expectedOutcomeDetail.in_euro_value);
                            objL4Kpi.in_outcomes_id = dataExOut.getExpectedOutcomeLevelByLevelAndOptionId(HIERARCHY_LEVEL.HL4, expectedOutcomeDetail.in_outcomes_id).EXPECTED_OUTCOME_LEVEL_ID;
                            arrL4Kpi.push(objL4Kpi);
                        }
                    });
                    if(arrL4Kpi.length)
                        dataExOut.insertHl4ExpectedOutcomesDetail(arrL4Kpi);
                }

                var categoryOptionBulk = [];
                data.hl4_category.forEach(function (hl4Category) {
                    hl4Category.hl4_category_option.forEach(function (hl4CategoryOption) {
                        hl4CategoryOption.in_amount = hl4CategoryOption.in_amount || 0;
                        hl4CategoryOption.in_updated = hl4CategoryOption.in_updated || 0;
                        hl4Category.categoryOptionLevelId = mapCOL[hl4Category.in_category_id][hl4CategoryOption.in_option_id];
                        categoryOptionBulk.push({
                            in_category_option_level_id: hl4Category.categoryOptionLevelId
                            , in_amount: hl4CategoryOption.in_amount
                            , in_user_id: userId
                            , in_updated: hl4CategoryOption.in_updated
                            , in_hl4_id: hl4_id
                        });
                    });
                });
                dataCategoryOptionLevel.updateCategoryOption(categoryOptionBulk, 'hl4');

                transactionOk = !!hl4RowsUpdated && !!hl4FncRowsUpdated && hl4_expected_outcomes && hl4_expected_outcomes_detail && hl4_category && hl4_category_option;
                if (transactionOk) {
                    db.commit();
                } else {
                    db.rollback();
                    return null;
                }
            } else {
                db.rollback();
                return null;
            }

            dataL4Report.updateLevel4ReportForDownload(hl4_id); //Update Processing Report Export Data
            return data;
        }
    } catch (e) {
        db.rollback();
        throw e;
    } finally {
        db.closeConnection();
    }
}

function deleteHl4(hl4, userId, rollBack) {
    if (!hl4.in_hl4_id && !rollBack)
        throw ErrorLib.getErrors().CustomError("", "hl4Services/handlePost/deleteHl4", L3_MSG_INITIATIVE_NOT_FOUND);

    if (!rollBack && !util.validateIsNumber(hl4.in_hl4_id))
        throw ErrorLib.getErrors().CustomError("", "hl4Services/handlePost/deleteHl4", L3_MSG_INITIATIVE_NOT_FOUND);

    var userRoleId = Number(dbUserRole.getUserRoleByUserId(userId)[0].ROLE_ID);
    if (!rollBack && userRoleId !== 1 && userRoleId !== 2)
        throw ErrorLib.getErrors().CustomError("", "hl4Services/handlePost/deleteHl4", L3_MSG_NO_PRIVILEGE);

    var hl4StatusId = !rollBack ? Number(dataHl4.getHl4StatusByHl4Id(hl4.in_hl4_id).HL4_STATUS_DETAIL_ID) : 0;
    if (!rollBack && userRoleId !== 1 && (hl4StatusId !== HL4_STATUS.IN_CRM && hl4StatusId !== HL4_STATUS.UPDATE_IN_CRM))
        throw ErrorLib.getErrors().CustomError("", "hl4Services/handlePost/deleteHl4", L3_MSG_CANNOT_DEL_STATUS);


    if (!rollBack && dataHl4.getCountHl4Childrens(hl4.in_hl4_id) > 0)
        throw ErrorLib.getErrors().CustomError("", "hl4Services/handlePost/deleteHl4", L3_MSG_INITIATIVE_CANT_DEL_CHILD);

    try {
        hl4.in_user_id = userId;
        var transactionOk = true;
        var hl4_id = hl4.in_hl4_id;
        dataExOut.deleteHl4ExpectedOutcomesDetail(hl4);
        dataExOut.deleteHl4ExpectedOutcomes(hl4);

        level4DER.deleteL4ChangedFieldsByHl4Id(hl4_id);

        dataCategoryOptionLevel.deleteCategoryOption(hl4_id, userId, 'HL4');
        dataHl4.deleteHl4(hl4);
        dataPath.delParentPath('hl4', hl4_id);
        dataL4Report.updateLevel4ReportForDownload(hl4_id); //Update Processing Report Export Data
        db.commit();
    } catch (e) {
        db.rollback();
        throw e;
    } finally {
        db.closeConnection();
    }

    return hl4;
}

function validateHl4(data, userId) {
    var existInCrm = 0;
    if (!data)
        throw ErrorLib.getErrors().CustomError("", "hl4Services/handlePost/insertHl4", L3_MSG_INITIATIVE_NOT_FOUND);

    if (!data.hl4.in_hl4_details)
        throw ErrorLib.getErrors().CustomError("", "hl4Services/handlePost/insertHl4", L3_MSG_INITIATIVE_DETAIL);

    if (!data.hl4.in_hl4_business_details)
        throw ErrorLib.getErrors().CustomError("", "hl4Services/handlePost/insertHl4", L3_MSG_INITIATIVE_BUSINESS);

    if (!data.hl4.in_acronym)
        throw ErrorLib.getErrors().CustomError("", "hl4Services/handlePost/insertHl4", L3_MSG_INITIATIVE_ACRONYM);

    // Validate whether Acronym already exists or not

    if (existsHl4inPlan(data.hl4))
        throw ErrorLib.getErrors().CustomError("", "hl4Services/handlePost/insertHl4", L3_MSG_INITIATIVE_EXISTS);

    // end validate Acronym

    if (data.hl4.in_acronym.length !== 3)
        throw ErrorLib.getErrors().CustomError("", "hl4Services/handlePost/insertHl4", L3_MSG_INITIATIVE_ACRONYM_LENGTH);

    if (!data.hl4.in_hl4_crm_description)
        throw ErrorLib.getErrors().CustomError("", "hl4Services/handlePost/insertHl4", L3_MSG_INITIATIVE_CRM_DESCRIPTION);

    if (data.hl4.in_hl4_fnc_budget_total_mkt < 0)
        throw ErrorLib.getErrors().CustomError("", "hl4Services/handlePost/insertHl4", L3_MSG_INITIATIVE_BUDGET_VALUE);

    if (data.SHOPPING_CART_APPROVER && !/[id]\d{6}/gi.test(data.SHOPPING_CART_APPROVER)) {
        throw ErrorLib.getErrors().CustomError("Shopping cart approver is invalid", "", "");
    }
    if (data.COST_CENTER && !/\d+/gi.test(data.COST_CENTER)) {
        throw ErrorLib.getErrors().CustomError("Cost Center approver is invalid", "", "");
    }
    if (data.MKT_ORG_ID && data.MKT_ORG_ID <= 0) {
        throw ErrorLib.getErrors().CustomError("Sale Organization is invalid", "", "");
    }
    if (data.DIS_CHANNEL_ID && data.DIS_CHANNEL_ID <= 0) {
        throw ErrorLib.getErrors().CustomError("Distribution Channel is invalid", "", "");
    }
    if (data.hl4_expected_outcomes) {
        var totalAvailable = expectedOutcomesLib.getExpectedOutcomeTotalAvailableByHlIdLevelId(data.hl4.in_hl3_id, 'HL4', data.hl4.in_hl4_id);

        if (!data.hl4_expected_outcomes.hl4_expected_outcomes_detail.length && !data.hl4_expected_outcomes.in_comments)
            throw ErrorLib.getErrors().CustomError("", "hl4Services/handlePost/insertHl4", L3_CAMPAIGN_FORECASTING_KPIS_COMMENT);

        data.hl4_expected_outcomes.hl4_expected_outcomes_detail.forEach(function (hl4ExpectedOutcomesDetail) {
            /*if (hl4ExpectedOutcomesDetail.in_amount_value != 0 && !Number(hl4ExpectedOutcomesDetail.in_amount_value))
                throw ErrorLib.getErrors().CustomError("", "hl4Services/handlePost/insertHl4", L3_CAMPAIGN_FORECASTING_KPIS_DETAILS);
            if (!hl4ExpectedOutcomesDetail.in_euro_value || !Number(hl4ExpectedOutcomesDetail.in_euro_value))
                throw ErrorLib.getErrors().CustomError("", "hl4Services/handlePost/insertHl4", L3_CAMPAIGN_FORECASTING_KPIS_DETAILS_EURO);*/
            if (!hl4ExpectedOutcomesDetail.in_outcomes_id || !Number(hl4ExpectedOutcomesDetail.in_outcomes_id))
                throw ErrorLib.getErrors().CustomError("", "hl4Services/handlePost/insertHl4", L3_CAMPAIGN_FORECASTING_KPIS_NOT_VALID);

            if(totalAvailable && totalAvailable[hl4ExpectedOutcomesDetail.in_outcomes_type_id] && totalAvailable[hl4ExpectedOutcomesDetail.in_outcomes_type_id][hl4ExpectedOutcomesDetail.in_outcomes_id]) {
                if (Number(hl4ExpectedOutcomesDetail.in_amount_value) > totalAvailable[hl4ExpectedOutcomesDetail.in_outcomes_type_id][hl4ExpectedOutcomesDetail.in_outcomes_id].VOLUME_AVAILABLE_TO_ALLOCATE)
                    throw ErrorLib.getErrors().CustomError("", "hl4Services/handlePost/insertHl4", L3_CAMPAIGN_FORECASTING_KPIS_VOLUME);

                if (Number(hl4ExpectedOutcomesDetail.in_euro_value) > totalAvailable[hl4ExpectedOutcomesDetail.in_outcomes_type_id][hl4ExpectedOutcomesDetail.in_outcomes_id].VALUE_AVAILABLE_TO_ALLOCATE)
                    throw ErrorLib.getErrors().CustomError("", "hl4Services/handlePost/insertHl4", L3_CAMPAIGN_FORECASTING_KPIS_VALUE);
            }
        });
    }

    if (!data.hl4_category)
        throw ErrorLib.getErrors().CustomError("", "hl4Services/handlePost/insertHl4", L3_CATEGORY_NOT_EMPTY);

    if (!data.hl4.in_hl4_id && data.hl4_category.length !== dataCategory.getAllocationCategoryCountByHlId('hl4'))
        throw ErrorLib.getErrors().CustomError("", "hl4Services/handlePost/insertHl4", L3_CATEGORY_INCORRECT_NUMBER);

    var categoryOptionComplete = isCategoryOptionComplete(data);

    var statusId = null;
    var crmFieldsHasChangedResult = crmFieldsHaveChanged(data, categoryOptionComplete, userId);
    var crmFieldsHasChanged = crmFieldsHasChangedResult.crmFieldsHaveChanged;
    if (data.hl4.in_hl4_id) {
        existInCrm = dataHl4.existsInCrm(data.hl4.in_hl4_id);

        var objHL4 = dataHl4.getHl4ById(data.hl4.in_hl4_id);
        if (existInCrm && data.hl4.in_acronym.toUpperCase() != objHL4.ACRONYM.toUpperCase()) {
            throw ErrorLib.getErrors().CustomError("", "hl4Services/handlePost/insertHl4", L3_MSG_INITIATIVE_IN_CRM);

        }
        var categoryHasChanged = categoryChanged(data, existInCrm);


        if (!crmFieldsHasChanged && !categoryHasChanged)
            statusId = data.hl4.in_hl4_status_detail_id;
        else
            statusId = HL4_STATUS.IN_PROGRESS;
    } else {
        statusId = HL4_STATUS.IN_PROGRESS;
    }
    return {
        statusId: statusId
        , isComplete: categoryOptionComplete
        , crmBindingChangedFields: crmFieldsHasChangedResult.crmBindingChangedFields
        , crmBindingChangedFieldsUpdate: crmFieldsHasChangedResult.crmBindingChangedFieldsUpdate
    };
}

//TODO:09/01/2017
function categoryChanged(data, existInCrm) {
    var optionChange = false;
    //obtain the CATEGORY options in bd
    var hl4_categoryBD = getHl4CategoryOption(data.hl4.in_hl4_id);
    var optionChange = CompareCategories(data.hl4_category, hl4_categoryBD, existInCrm);
    return optionChange;
}


/***************************************/
//Verify if mount of option change
//Option1: option from UI
//Option2: option from DB
function CompareOptions(Option1, Option2, existInCrm) {
    var hasChanged = false;
    if (Number(Option1.in_amount) === Number(Option2.in_amount)) {
        hasChanged = false;
        Option1.in_updated = Option2.in_updated;
    } else {
        Option1.in_updated = 1;
        hasChanged = true;

        if (Number(Option1.in_amount) && Option2.in_updated) {
            return hasChanged;
        }

        if ((!Number(Option1.in_amount) && !Number(Option2.in_amount)) ||
            (!Number(Option1.in_amount) && Number(Option2.in_amount) && !existInCrm)
        ) {
            Option1.in_updated = 0;
            hasChanged = false;
        }
    }
    return hasChanged;
}

function getOptionFromList(listOptions, OptionId) {
    for (var i = 0; i < listOptions.length; i++) {
        var option = listOptions[i];

        if (option.in_option_id === OptionId) {
            return option;
        }
    }
    return null;
}

function CompareListOptions(ListOption1, ListOption2, existInCrm) {
    var flag = false;
    for (var i = 0; i < ListOption1.length; i++) {
        var option = ListOption1[i];

        flag = CompareOptions(option, getOptionFromList(ListOption2, option.in_option_id), existInCrm) || flag;
    }
    return flag;
}

function getCategoryFromList(listCategory, categoryId) {
    for (var i = 0; i < listCategory.length; i++) {
        var category = listCategory[i];

        if (category.in_category_id === categoryId) {
            return category;
        }
    }
    return null;
}

function CompareCategoryOption(Category1, Category1_id, ListCategories, existInCrm) {
    var Category2 = getCategoryFromList(ListCategories, Category1_id);
    return CompareListOptions(Category1.hl4_category_option, Category2.hl4_category_option, existInCrm)
}

function CompareCategories(ListCategories1, ListCategories2, existInCrm) {
    var flag = false;
    var categories = util.getCategoryById('hl4');
    for (var i = 0; i < ListCategories1.length; i++) {
        var category = ListCategories1[i];
        if (categories[category.in_category_id].IN_PROCESSING_REPORT)
            flag = CompareCategoryOption(category, category.in_category_id, ListCategories2, existInCrm) || flag;
    }
    return flag;
}


function isMyBudgetComplete(hl4_budget) {
    var hl4MyBudgetKeys = Object.keys(hl4_budget);
    var myBudgetTotalPercentage = 0;
    var myBudgetComplete = false;
    var percentage = 0;
    hl4MyBudgetKeys.forEach(function (hl4MyBudgetKey) {
        if (hl4_budget[hl4MyBudgetKey] && hl4_budget[hl4MyBudgetKey].length) {
            hl4_budget[hl4MyBudgetKey].forEach(function (myBudget) {
                if (hl4MyBudgetKey == "regions") {
                    if (!myBudget.in_region_id || !Number(myBudget.in_region_id))
                        throw ErrorLib.getErrors().CustomError("", "hl4Services/handlePost/insertHl4", levelCampaign + " in My Budget " + hl4MyBudgetKey + " can not be found.");
                } else if (hl4MyBudgetKey == "routes") {
                    if (!myBudget.in_route_id || !Number(myBudget.in_route_id))
                        throw ErrorLib.getErrors().CustomError("", "hl4Services/handlePost/insertHl4", levelCampaign + " in My Budget " + hl4MyBudgetKey + " can not be found.");
                }
                if (!myBudget.PERCENTAGE && !Number(myBudget.in_percentage) && myBudget.in_percentage != 0)
                    throw ErrorLib.getErrors().CustomError("", "hl4Services/handlePost/insertHl4", levelCampaign + " in My Budget " + hl4MyBudgetKey + " can not be found.");
                percentage = myBudget.in_percentage;

                if (myBudget.PERCENTAGE)
                    percentage = myBudget.PERCENTAGE;

                myBudgetTotalPercentage = myBudgetTotalPercentage + Number(percentage);
            });
        }
    });



    if (myBudgetTotalPercentage > 100)
        throw ErrorLib.getErrors().CustomError("", "hl4Services/handlePost/insertHl4", L3_MSG_INITIATIVE_BUDGET_PERCENT);
    if (myBudgetTotalPercentage < 100)
        myBudgetTotalPercentage = 0;

    myBudgetComplete = !!myBudgetTotalPercentage;

    return myBudgetComplete;
}

function isCategoryOptionComplete(data) {
    var categoryOptionComplete = false;
    for (var i = 0; i < data.hl4_category.length; i++) {
        var hl4Category = data.hl4_category[i];
        var percentagePerOption = 0;
        if (!hl4Category.in_category_id || !Number(hl4Category.in_category_id))
            throw ErrorLib.getErrors().CustomError("", "hl4Services/handlePost/insertHl4", L3_CATEGORY_NOT_VALID);

        if (!hl4Category.hl4_category_option.length)
            percentagePerOption = 100;

        if (!data.hl4.in_hl4_id && hl4Category.hl4_category_option.length !== dataOption.getAllocationOptionCountByCategoryIdLevelId(hl4Category.in_category_id, 'hl4'))
            throw ErrorLib.getErrors().CustomError("", "hl4Services/handlePost/insertHl4", L3_CATEGORY_OPTIONS_INCORRECT_NUMBER);

        hl4Category.hl4_category_option.forEach(function (option) {
            if (!option.in_option_id || !Number(option.in_option_id))
                throw ErrorLib.getErrors().CustomError("", "hl4Services/handlePost/insertHl4", L3_CATEGORY_OPTION_NOT_VALID);
            if ((parseFloat(option.in_amount) && !Number(option.in_amount)) || Number(option.in_amount) > 100 || Number(option.in_amount) < 0)
                throw ErrorLib.getErrors().CustomError("", "hl4Services/handlePost/insertHl4", "Option value is not valid (actual value " + option.in_amount + ")");

            percentagePerOption = percentagePerOption + Number(option.in_amount);

        });
        if (percentagePerOption > 100) {
            throw ErrorLib.getErrors().CustomError("", "hl4Services/handlePost/insertHl4", L3_CATEGORY_TOTAL_PERCENTAGE);
        } else if (percentagePerOption < 100) {
            categoryOptionComplete = false;
            break;
        } else {
            categoryOptionComplete = true;
        }
    }
    return categoryOptionComplete;
}

function validateSaleOthers(others) {
    var keys = ['in_description', 'in_amount'];
    var valid = true;
    if (others) {
        others.forEach(function (obj) {
            keys.forEach(function (key) {
                if (obj[key] === null || obj[key] === undefined) {
                    throw ErrorLib.getErrors().CustomError("", "hl4Services/handlePost/insertHl4"
                        , L3_MSG_INITIATIVE_SALES_OTHER);
                } else {
                    // validate attribute type
                    if (key === "in_description")
                        valid = obj[key].length > 0;
                    else if (key === "in_amount") {
                        if (Number(obj[key]) !== 0)
                            valid = Number(obj[key]);
                    }

                    if (!valid)
                        throw ErrorLib.getErrors().CustomError("", "hl4Services/handlePost/insertHl4"
                            , "The " + levelCampaign + " in Sales Other " + obj.in_description + " amount (" + obj.in_amount + ") is invalid ");
                }
            });
        });
    }
    return valid;
}


function getLevel4ByAcronym(acronym, hl2_id) {
    return dataHl4.getHl4ByAcronym(acronym, hl2_id);
}

function existsHl4inPlan(objHL4) {
    var hl3 = dataHl3.getLevel3ById(objHL4.in_hl3_id);
    var hl4 = getLevel4ByAcronym(objHL4.in_acronym, hl3.HL2_ID);
    return !!(hl4.HL4_ID && Number(hl4.HL4_ID) !== Number(objHL4.in_hl4_id));
}

function existsInCrm(objHL4, data) {
    var existInCrm = dataHl4.existsInCrm(objHL4.in_hl4_id);
    // TODO: data.hl4.in_acronym != hl4.ACRONYM
    if (existInCrm && data.hl4.in_acronym != objHL4.ACRONYM)
        throw ErrorLib.getErrors().CustomError("", "hl4Services/handlePost/insertHl4", L3_MSG_INITIATIVE_IN_CRM);

}

function checkBudgetStatus(objHl3, hl4_id, new_hl4_budget) {
    if (!hl4_id) hl4_id = 0;
    if (Number(objHl3) && (new_hl4_budget || new_hl4_budget == 0)) {
        var objHl = {};
        objHl.IN_HL3_ID = Number(objHl3) ? objHl3 : objHl3.IN_HL3_ID;
        objHl.IN_HL4_ID = hl4_id;

        var hl3 = dataHl3.getLevel3ById(objHl.IN_HL3_ID);

        var hl3AllocatedBudget = dataHl3.getHl3AllocatedBudget(objHl.IN_HL3_ID, hl4_id);
        return (Number(hl3.HL3_FNC_BUDGET_TOTAL) - Number(hl3AllocatedBudget) - Number(new_hl4_budget)) >= 0 ? 1 : 0;
    } else {
        var result = {};
        result.out_result = 0;
        //lists of hl4 changed to send email to client
        result.emailListInBudget = [];
        result.emailListOutBudget = [];

        var resultHl4;

        if(Number(objHl3)){
        	resultHl4 = dataHl4.getHl4(objHl3);// GET_HL4_BY_HL3_ID
        }else{
        	resultHl4 = dataHl4.getHl4(objHl3.IN_HL3_ID);// GET_HL4_BY_HL3_ID
        }

        if (resultHl4) {
            var total = 0;

            for (var i = 0; i < resultHl4.out_result.length; i++) {
                if (objHl3.IN_HL3_FNC_BUDGET_TOTAL < total + parseFloat(resultHl4.out_result[i].HL4_BUDGET)) {
                    dataHl4.updateHl4BudgetStatus(resultHl4.out_result[i].HL4_ID, 0);
                    //store hl4id and users to be send email when register change to in budget
                    result.emailListOutBudget.push(resultHl4.out_result[i]);
                } else {
                    dataHl4.updateHl4BudgetStatus(resultHl4.out_result[i].HL4_ID, 1);
                    total = total + parseFloat(resultHl4.out_result[i].HL4_BUDGET);
                    //store hl4id and users to be send email when register change to in budget
                    result.emailListInBudget.push(resultHl4.out_result[i]);
                }
            }
            result.out_result = resultHl4.out_result.length;
        }
        return result;
    }
}

/* Function to set HL4 status */
function setHl4Status(hl4_id, status_id, userId) {
    var updateOK = null;
    if (hl4_id && status_id && userId) {
        var changeHL4tatus = dataHl4.changeStatusHl4(hl4_id, status_id, userId).out_result_hl4;
        var insertHL4LogStatus = dataHl4.insertHl4LogStatus(hl4_id, status_id, userId);
        if (!!changeHL4tatus && !!insertHL4LogStatus) {
            updateOK = changeHL4tatus;
            if (HL4_STATUS.IN_CRM == status_id) {
                if (level4DER.deleteL4ChangedFieldsByHl4Id(hl4_id) !== null) {
                    resetHl4CategoryOptionUpdated(hl4_id, userId);
                    db.commit();
                } else {
                    updateOK = false;
                    db.rollback();
                }
            } else {
                db.commit();
            }
        } else {
            updateOK = false;
            db.rollback();
        }
    }
    dataL4Report.updateLevel4ReportForDownload(hl4_id);
    return updateOK;
}
function resetHl4CategoryOptionUpdated(hl4Id, userId) {
    dataCategoryOptionLevel.resetHl4CategoryOptionUpdated(hl4Id, 'hl4', userId);

    /*var hl4Categories = dataHl4.getHl4Category(hl4Id);
     hl4Categories.forEach(function(hl4Category){
     dataHl4.resetHl4CategoryOptionUpdated(hl4Id, userId);
     });*/
    return true;
}

/* Set HL4 status to In CRM */
function setHl4StatusInCRM(hl4_id, userId) {
    var hl4Ids = [];
    if(!(hl4_id.constructor === Array)){
        hl4Ids.push(hl4_id);
    } else {
        hl4Ids = hl4_id;
    }
    for(var i = 0; i < hl4Ids.length; i++){
        setHl4Status(hl4Ids[i], HL4_STATUS.IN_CRM, userId);
    }
    return 1;
}

function changeHl4StatusOnDemand(hl4_id, userId) {
    var hl4_category = getHl4CategoryOption(hl4_id);

    var isComplete = isCategoryOptionComplete({
            hl4_category: hl4_category,
            hl4: {in_hl4_id: hl4_id}
        });

    if (!isComplete)
        throw ErrorLib.getErrors().CustomError("", "hl4Services/handlePut/changeHl4Status", L3_MSG_INITIATIVE_COULDNT_CHAGE_STATUS);

    var existInCrm = dataHl4.existsInCrm(hl4_id);

    var statusId = existInCrm ? HL4_STATUS.UPDATE_IN_CRM
        : HL4_STATUS.CREATE_IN_CRM;

    return setHl4Status(hl4_id, statusId, userId);
}

function getSYSUUID() {
    var conn = $.hdb.getConnection();

    try {

        // Delete any existing token for this user
        var spUserToken = conn.loadProcedure('MKTG_PLANNING_TOOL', 'mktgplanningtool.db.procedures::GET_SYSUUID');
        var result = spUserToken();
        conn.close();

        var spResult = result['out_result'];
        if (spResult != null && spResult.length > 0) {
            var rowResult = spResult[0];
            return rowResult['SYS_UNIQUE_NUMBER'];
        }

        return null;

    } catch (e) {
        conn.close();
        throw e;
    }
}

function getHl4CategoryOption(hl4Id) {
    var hl4Categories = dataCategoryOptionLevel.getAllocationCategory(hl4Id, 'hl4');
    var allocationOptions = util.getAllocationOptionByCategoryAndLevelId('hl4', hl4Id);
    var result = [];
    hl4Categories.forEach(function (catgory) {
        var aux = util.extractObject(catgory);
        var hl4Category = {};
        aux["hl4_category_option"] = allocationOptions[aux.CATEGORY_ID];

        hl4Category.hl4_category_option = [];
        Object.keys(aux).forEach(function (key) {
            if (key === "hl4_category_option") {
                for (var i = 0; i < aux[key].length; i++) {
                    var option = {};
                    Object.keys(aux[key][i]).forEach(function (auxKey) {
                        option["in_" + auxKey.toLowerCase()] = aux[key][i][auxKey];
                    });
                    hl4Category.hl4_category_option.push(option);
                }
            } else {
                hl4Category["in_" + key.toLowerCase()] = aux[key];
            }
        });
        result.push(hl4Category);
    });
    return result;
}

/**
 * @deprecated
 * @param parameters
 @returns {}
 */
function getHl4MyBudgetByHl4Id(id) {
    var aux = {};
    /*var myBudgets = dataHl4.getHl4MyBudgetByHl4Id(id);
    var hl4MyBudgetKeys = Object.keys(myBudgets);
    var myBudgetTotalPercentage = 0;
    hl4MyBudgetKeys.forEach(function (hl4MyBudgetKey) {
        aux["in_" + hl4MyBudgetKey.toLowerCase()] = myBudgets[hl4MyBudgetKey];
        myBudgets[hl4MyBudgetKey].forEach(function (myBudget) {
            myBudgetTotalPercentage = myBudgetTotalPercentage + Number(myBudget.PERCENTAGE);
        });
    });
    aux.total = myBudgetTotalPercentage;*/
    return aux;
}

/**
 * @deprecated
 * @param parameters
 @returns {}
 */
function getHl4SalesByHl4Id(id, currencyValue) {
    var aux = {};
    /*var sales = dataHl4.getHl4SalesByHl4Id(id);
    var hl4SalesKeys = Object.keys(sales);
    var totalAmount = 0;
    hl4SalesKeys.forEach(function (hl4SalesKey) {
        sales[hl4SalesKey] = JSON.parse(JSON.stringify(sales[hl4SalesKey]));
        aux["in_" + hl4SalesKey.toLowerCase()] = sales[hl4SalesKey];
        sales[hl4SalesKey].forEach(function (sale) {
            sale.AMOUNT = (Number(sale.AMOUNT) * Number(currencyValue)).toFixed(2);
            totalAmount = totalAmount + Number(sale.AMOUNT);
        });
    });
    aux.total = totalAmount;*/
    return aux;
}

function crmFieldsHaveChanged(data, isComplete, userId) {
    var crmFieldsHaveChanged = false;
    var crmBindingChangedFields = [];
    var crmBindingChangedFieldsUpdate = [];
    if (!isComplete)
        return {crmFieldsHaveChanged: true, crmBindingChangedFields: crmBindingChangedFields, crmBindingChangedFieldsUpdate: crmBindingChangedFieldsUpdate};
    var l4ReportFields = level4DER.getProcessingReportFields();
    var deReportDisplayName = l4ReportFields.deReportDisplayName;
    var crmBindingFields = l4ReportFields.crmBindingFields;

    /*var crmBindingFields = {
        "hl4": ["ACRONYM",
            "HL4_CRM_DESCRIPTION",
            "HL4_DETAILS",
            "HL4_BUSINESS_DETAILS",
            "PARENT_PATH"]
    };
    var deReportDisplayName = {
        "ACRONYM": "Acronym",
        "HL4_CRM_DESCRIPTION": "CRM description",
        "HL4_DETAILS": "Initiative/Campaign details",
        "HL4_BUSINESS_DETAILS": "Business value",
        "HL4_FNC_BUDGET_TOTAL_MKT": "Budget",
        "PARENT_PATH": "Parent"
    };*/

    if (!data.hl4.in_hl4_id) {
        Object.keys(crmBindingFields).forEach(function (object) {
            crmBindingFields[object].forEach(function (field) {
                var parameters = {
                    "in_hl4_id": data.hl4.in_hl4_id,
                    "in_column_name": field,
                    "in_changed": 1,
                    "in_user_id": userId,
                    "in_display_name": deReportDisplayName[field]
                };
                crmBindingChangedFields.push(parameters);
            });
        });
    } else {
        var oldHl4 = dataHl4.getHl4ById(data.hl4.in_hl4_id);
        var existInCrm = dataHl4.existsInCrm(data.hl4.in_hl4_id);
        var l4CrmBindigFields = level4DER.getL4CrmBindingFieldsByHl4Id(data.hl4.in_hl4_id);

        Object.keys(crmBindingFields).forEach(function (object) {
            crmBindingFields[object].forEach(function (field) {
                var oldParentPath = '';
                var parentPath = '';
                if (field == "PARENT_PATH") {
                    oldParentPath = dataPath.getCrmParentPathByIdLevelId('hl4', data.hl4.in_hl4_id)[0].PARENT_PATH;
                    parentPath = pathBL.getPathByLevelParentForCrm('hl4', data.hl4.in_hl3_id);
                }
                var parameters = {
                    "in_hl4_id": data.hl4.in_hl4_id,
                    "in_column_name": field,
                    "in_changed": 1,
                    "in_user_id": userId,
                    "in_display_name": deReportDisplayName[field]
                };

                var fieldChanged = field == 'HL4_FNC_BUDGET_TOTAL_MKT' ? Number(oldHl4[field]) != Number(data[object]['in_' + field.toLowerCase()]) : oldHl4[field] != data[object]['in_' + field.toLowerCase()];

                if (!existInCrm || fieldChanged || oldParentPath != parentPath) {

                    if (oldParentPath) {
                        if (oldParentPath != parentPath) {
                            pathBL.updParentPath('hl4', data.hl4.in_hl4_id, parentPath, userId);
                        }
                    } else {
                        pathBL.insParentPath('hl4', data.hl4.in_hl4_id, data.hl4.in_hl3_id, userId);
                    }

                    var in_hl4_crm_binding_id = l4CrmBindigFields[field] ? l4CrmBindigFields[field].HL4_CRM_BINDING_ID : null;
                    if (in_hl4_crm_binding_id) {
                        parameters.in_hl4_crm_binding_id = in_hl4_crm_binding_id;
                        crmBindingChangedFieldsUpdate.push(parameters);
                    } else {
                        crmBindingChangedFields.push(parameters);
                    }
                    crmFieldsHaveChanged = true;
                }
            });
        });
    }
    return {crmFieldsHaveChanged: crmFieldsHaveChanged, crmBindingChangedFields: crmBindingChangedFields, crmBindingChangedFieldsUpdate: crmBindingChangedFieldsUpdate};
}

function parseObject(data) {
    if (Array.isArray(data)) {
        var collection = [];
        data.forEach(function (obj) {
            var object = {};
            Object.keys(obj).forEach(function (key) {
                object["in_" + key.toLowerCase()] = obj[key];
            });
            collection.push(object);
        });
        return collection;
    } else {
        var object = {};
        Object.keys(data).forEach(function (key) {
            object["in_" + key.toLowerCase()] = data[key];
        });
        return object;
    }

}
//event is "Created" or "Updated"
function notifyChangeByEmail(data, userId, event) {

    var Hl3Id = data.hl4.in_hl3_id;
    var HL3 = level3BL.getLevel3ById(Hl3Id);
    var ownerId = HL3.CREATED_USER_ID;
    var Owner = userBL.getUserById(ownerId);
    var user = userBL.getUserById(userId);
    var path = pathBL.getPathByLevelParentToCRM('hl4', Hl3Id);

    var body = ' <p> Dear Colleague </p>  <p>The User : ' + userBL.getUserById(userId).USER_NAME + ' has set the Initiative/Campaign ' + path + ' for you.</p>  <p>Click on the ' + config.getAppUrl() + ' to review</p>';
    var mailObject = mail.getJson([{
        "address": Owner[0].EMAIL
    }], "Marketing Planning Tool - Level 4 " + event, body);

    var rdo = mail.sendMail(mailObject, true);


}

function sendProcessingReportEmail(hl4Id) {
    var objHl3 = {};
    var appUrl = config.getAppUrl();

    var hl4 = dataHl4.getHl4ById(hl4Id);
    var hl3 = dataHl3.getLevel3ById(hl4.HL3_ID);

    var hl3OwnerEmail = getUserById(hl3.CREATED_USER_ID).EMAIL;

    var body = '<p> Dear Colleague </p>';
    body += '<p>An initiative has been created in CRM.</p><br>';
    body += '<p>' + appUrl + '/TeamPlanHierarchy/Level3/edit/' + hl4.HL3_ID + '/' + hl4Id + '</p>';


    var mailObject = mail.getJson([{
        "address": hl3OwnerEmail
    }], "Marketing Planning Tool - Interlock Process", body);

    mail.sendMail(mailObject, true);
}

function checkPermission(userSessionID, method, hl4Id) {
    if (((method && method == "GET_BY_HL3_ID") || !method) && !util.isSuperAdmin(userSessionID)) {
        var hl4 = dataHl4.getHl4ById(hl4Id);
        var usersL3 = userbl.getUserByHl3Id(hl4.HL3_ID).users_in;
        var users = usersL3.find(function (user) {
            return user.USER_ID == userSessionID
        });
        if (!users) {
            throw ErrorLib.getErrors().CustomError("", "level3/handlePermission", "User hasn´t permission for this resource.");
        }
    }
}

function getExpectedOutcomesByHl4Id(hl4Id, hl3Id){
    return expectedOutcomesLib.getExpectedOutcomesByHl4Id(hl4Id, hl3Id);
}