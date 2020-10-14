$.import("mktgplanningtool.services.commonLib", "mapper");
var mapper = $.mktgplanningtool.services.commonLib.mapper;
var dataL5Legacy = mapper.getDataLevel5Legacy();
var ErrorLib = mapper.getErrors();
var dataConfig = mapper.getDataConfig();
var utilLib = mapper.getUtil();
var desTypeLib = mapper.getDesTypeLib();

/** *********** MESSAGES *************** **/

var L5_MSG_ID_NOT_FOUND = "The Marketing Tactic Legacy ID can not be found.";
var L5_MSG_USER_ID_NOT_FOUND = "The User ID can not be found";
var L5_IS_INVALID = "The HL5 is not related with the HL4";
var HIERARCHY_LEVEL_MAP = utilLib.getHierarchyLevelEnum();

var ORGANIZATION_TYPE = {
    REGIONAL: 1,
    CENTRAL: 2,
    OTHER: 3
};

/** *********** GET *************** **/

function getHl5LegacyById(hl5LegacyId, hl4Id, userId){
	if(!hl5LegacyId){
		throw ErrorLib.getErrors().BadRequest("The Parameter HL5 Legacy ID is not found", "level5LegacyService/handleGet/getHl5LegacyById", L5_MSG_ID_NOT_FOUND);
	}
	
	if(!userId){
		throw ErrorLib.getErrors().BadRequest("The Parameter User ID is not found", "level5LegacyService/handleGet/getHl5LegacyById", L5_MSG_USER_ID_NOT_FOUND);
	}

	var result = JSON.parse(JSON.stringify(dataL5Legacy.getHl5LegacyById(hl5LegacyId)));

	if(result){
        result.BUDGET_EUROS = (Number(result.BUDGET)).toFixed(2);
        result.BUDGET = (Number(result.BUDGET) * Number(result.CURRENCY_VALUE)).toFixed(2);
        result.CATEGORIES = getHl5LegacyCategoryOption(hl5LegacyId);
        result.BUDGET_DISTRIBUTION = getHl5LegacyBudgetDistributionByHl5LegacyId(hl5LegacyId);
        result.DES_TYPE_COLLECTION = desTypeLib.getDesType();
    }

	if(!!hl4Id && Number(result.HL4_ID) !== Number(hl4Id)){
        throw ErrorLib.getErrors().BadRequest("", "level5LegacyService/handleGet/getHl5LegacyById", ""); // Don't have a message defined
    }


	return result;
}

function getHl5LegacyCategoryOption(hl5LegacyId){
    return parseCategories(dataL5Legacy.getHl5LegacyCategoryOption(hl5LegacyId));
}

function getHl5LegacyBudgetDistributionByHl5LegacyId(hl5LegacyId){
    if(!hl5LegacyId){
        throw ErrorLib.getErrors().BadRequest("the parameter hl5LegacyId can not be found.", "level5LegacyService/handleGet/getHl5LegacyBudgetDistributionByHl5LegacyId", L5_MSG_ID_NOT_FOUND);
    }

    return dataL5Legacy.getHl5LegacyBudgetDistributionByHl5LegacyId(hl5LegacyId);
}

/** *********** UPDATE *************** **/

function updateHl5Legacy(reqBody, userId){
    validateUpdateHl5Legacy(reqBody, userId);

    var result = dataL5Legacy.updateHl5Legacy(reqBody, userId);
    
    /** Update KPIs **/
	updateKPIComments(reqBody, userId);
	/** Update Attributes **/
	updateCategoryOption(reqBody, userId);
	/** Update Budget Distribution **/
	updateBudgetDistribution(reqBody, userId);

    return result;
}

function updateBudgetDistribution(data, userId) {
    if (data.BUDGET_DISTRIBUTION) {
        dataL5Legacy.hardDeleteHl5LegacyBudget(data.HL5_LEGACY_ID, userId);

        if(!data.ALLOW_BUDGET_ZERO){
            var arrBudgetDistribution = [];
            data.BUDGET_DISTRIBUTION.forEach(function (budget) {
                arrBudgetDistribution.push({
                    in_hl5_legacy_id: data.HL5_LEGACY_ID,
                    in_organization_id: budget.ORGANIZATION_ID,
                    in_percentage: budget.PERCENTAGE,
                    in_organization_type: budget.ORGANIZATION_TYPE,
                    in_created_user_id: userId
                });
            });
            if (arrBudgetDistribution.length > 0) {
                dataL5Legacy.insertBudgetDistribution(arrBudgetDistribution);
            }
        }
    }
}

function updateKPIComments(reqBody, userId){
    dataL5Legacy.deleteKPIComments(reqBody.HL5_LEGACY_ID, userId);
    return dataL5Legacy.insertKPIComments(reqBody, userId);
}

function updateCategoryOption(reqBody, userId){
    var insertBulk = [];
    var updateBulk = [];

    reqBody.CATEGORIES.forEach(function (category) {
            category.OPTIONS.forEach(function (option) {
                if(option.HL5_LEGACY_ID){
                    updateBulk.push({
                        in_category_option_level_id: option.CATEGORY_OPTION_LEVEL_ID,
                        in_category_option_id: option.CATEGORY_OPTION_ID,
                        in_amount: Number(option.AMOUNT) || 0,
                        in_modified_user_id: userId,
                        in_hl_id: reqBody.HL5_LEGACY_ID
                    });
                }else{
                    insertBulk.push({
                        in_category_option_level_id: option.CATEGORY_OPTION_LEVEL_ID,
                        in_amount: Number(option.AMOUNT) || 0,
                        in_created_user_id: userId,
                        in_hl_id: reqBody.HL5_LEGACY_ID
                    });
                }

            });
    });

    if(updateBulk.length){
        dataL5Legacy.updateAllocationCategoryOption(updateBulk);
    }

    if(insertBulk.length){
        dataL5Legacy.insertAllocationCategoryOption(insertBulk);
    }
}

/** *********** VALIDATIONS *************** **/

function validateUpdateHl5Legacy(reqBody, userId){
    if(!userId){
        throw ErrorLib.getErrors().BadRequest("The Parameter User ID is not found", "level5LegacyService/handlePut/updateHl5Legacy", L5_MSG_USER_ID_NOT_FOUND);
    }

    if(!reqBody.HL5_LEGACY_ID){
        throw ErrorLib.getErrors().BadRequest("The Parameter HL5 Legacy ID is not found", "level5LegacyService/handlePut/updateHl5Legacy", L5_MSG_ID_NOT_FOUND);
    }
}

/** *********** UTILS *************** **/

function parseCategories(arrayCategories){
    var result = {};

    arrayCategories.forEach(function (categoryOption) {
        if (!result[categoryOption.CATEGORY_NAME]) {
            result[categoryOption.CATEGORY_NAME] = {
                CATEGORY_ID: categoryOption.CATEGORY_ID,
                CATEGORY_NAME: categoryOption.CATEGORY_NAME,
                MAKE_CATEGORY_MANDATORY: categoryOption.MAKE_CATEGORY_MANDATORY || 0,
                SINGLE_OPTION_ONLY: categoryOption.SINGLE_OPTION_ONLY || 0,
                CATEGORY_TYPE_ID: categoryOption.CATEGORY_TYPE_ID,
                OPTIONS_LIMIT: categoryOption.OPTIONS_LIMIT || OPTIONS_LIMIT_DEFAULT,
                OPTIONS: []
            }
        }

        result[categoryOption.CATEGORY_NAME].OPTIONS.push({
            HL5_LEGACY_ID: categoryOption.HL5_LEGACY_ID,
            OPTION_ID: categoryOption.OPTION_ID,
            OPTION_NAME: categoryOption.OPTION_NAME,
            CATEGORY_ID: categoryOption.CATEGORY_ID,
            SINGLE_OPTION_ONLY: categoryOption.SINGLE_OPTION_ONLY || 0,
            CATEGORY_OPTION_LEVEL_ID: categoryOption.CATEGORY_OPTION_LEVEL_ID,
            AMOUNT: categoryOption.AMOUNT,
            CATEGORY_OPTION_ID: categoryOption.CATEGORY_OPTION_ID,
            AMOUNT_VALUE :  Number(categoryOption.AMOUNT_VALUE),
            SELECTED : !!Number(categoryOption.AMOUNT_VALUE)
        });
    });

    return utilLib.objectToArray(result);
}

function completeDesTypeParents(reqBody){
    var parentInformation = null;

    if(reqBody.DES_TYPE_ID){
        parentInformation = desTypeLib.getParentIdsByDesTypeId(reqBody.DES_TYPE_ID);
        if(parentInformation && Object.keys(parentInformation).length){
            reqBody.CAMPAIGN_OBJECTIVE_ID = parentInformation.OBJECTIVE_ID;
            reqBody.CAMPAIGN_TYPE_ID = parentInformation.CAMPAIGN_TYPE_ID;
            reqBody.CAMPAIGN_SUBTYPE_ID = parentInformation.CAMPAIGN_SUB_TYPE_ID;
        } else{
            reqBody.CAMPAIGN_OBJECTIVE_ID = null;
            reqBody.CAMPAIGN_TYPE_ID = null;
            reqBody.CAMPAIGN_SUBTYPE_ID = null;
        }
    }else{
        reqBody.CAMPAIGN_OBJECTIVE_ID = null;
        reqBody.CAMPAIGN_TYPE_ID = null;
        reqBody.CAMPAIGN_SUBTYPE_ID = null;
    }
}