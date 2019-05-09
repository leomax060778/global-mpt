/***************Import Library*******************/
$.import("mktgplanningtool.services.commonLib","mapper");
var mapper = $.mktgplanningtool.services.commonLib.mapper;
var ErrorLib = mapper.getErrors();
var dbCategory = mapper.getDataCategory();
var dbCategoryOption = mapper.getDataOption();
var dataCategoryOptionLevel = mapper.getDataCategoryOptionLevel();
var dynamicFormLib = mapper.getDynamicFormLib();
var util = mapper.getUtil();
var dbMeasure = mapper.getDataMeasure();
var dataHl2 = mapper.getDataLevel2();
var hierarchyCategoryCountryLib = mapper.getHierarchyCategoryCountry();
var dataDynamicForm = mapper.getDataDynamicForm();
var dataUserRole = mapper.getDataUserRole();
/*************************************************/

var USE_CARRY_OVER_OPTION_VALUES = false;

var CATEGORY_TYPE = {
    COUNTRY: 1,
    OPTION: 2
};

var HIERARCHY_LEVEL = util.getHierarchyLevelEnum();

var PARENT_LEVEL_MAP = {
    1: 4,
    2: 1,
    3: 2,
    4: 5,
    5: 6,
    6: null
};

var OPTIONS_LIMIT_DEFAULT = 5;

function getAllocationCategoryByName(name){
    return dbCategory.getAllocationCategoryByName(name);
}

function insertAllocationCategoryForUpload(name, description, measure_id, single_option_only, categoryTypeId, userId){
    return insertAllocationCategory({NAME: name, DESCRIPTION: description, MEASURE_ID: measure_id, SINGLE_OPTION_ONLY: single_option_only, CATEGORY_TYPE_ID: categoryTypeId}, userId);
}

function insertAllocationCategory(data, userId) {
    //validate if exists another category with same name
    var objAllocationCat = dbCategory.getAllocationCategoryByName(data.NAME);
    if(objAllocationCat)
        throw ErrorLib.getErrors().CustomError("","AllocationCategoryService", "Cannot create the category beacause exists another with same name");

    if(Number(data.CATEGORY_TYPE_ID) == CATEGORY_TYPE.COUNTRY){
        //find and delete relationships for all other category with country type
        hierarchyCategoryCountryLib.deleteCountryCategoryOptionLevel(null, userId);
        dbCategory.deleteAllocationCountryCategory(0, userId);
    }

    var result = dbCategory.insertAllocationCategory(data.DESCRIPTION,
        data.NAME,
        data.MEASURE_ID,
        data.SINGLE_OPTION_ONLY ? 1 : 0,
        data.CATEGORY_TYPE_ID,
        userId);
    return result;
}

function getAllocationCategory(categoryType){
    var categoryTypeId = CATEGORY_TYPE[categoryType];
    return dbCategory.getAllocationCategory(categoryTypeId || 0);
}

function getAllocationCategoryType(){
    return dbCategory.getAllocationCategoryType();
}

//return Categories with filtering by enable = 1 or deleted = 0
function getAllAllocationCategory(){
    return dbCategory.getAllAllocationCategory();
}

function getAllocationCategoryById(id){
    return dbCategory.getAllocationCategoryById(id);

}

function getCategoryInUseByCategoryId(categoryId){
    return dbCategory.getCategoryInUseByCategoryId(categoryId);

}

function getCategoryOptionCarryOverByHierarchyLevelId(hierarchyLevelId, parentLevelId, userId){
    var hl2 = {};
    var filterInformation = {};
    var dynamicFormId = null;
    var spResult = null;
    var parsedResult = null;

    if(parentLevelId){
        switch(Number(hierarchyLevelId)){
            case 2:
                hl2 = dataHl2.getHl2ByHl4Id(parentLevelId);
                break;
            case 3:
                hl2 = dataHl2.getHl2ByHl5Id(parentLevelId);
                break;
            default:
                break;
        }
    }

    if(!hl2.HL2_ID){
        filterInformation.userId = userId;
        filterInformation.parentLevelId = parentLevelId;
        filterInformation.parentHierarchyLevelId = PARENT_LEVEL_MAP[hierarchyLevelId];

        dynamicFormId = dynamicFormLib.getDynamicFormIdForNewRecords(hierarchyLevelId, filterInformation);
        spResult = dbCategory.getPlanningCarryOverCategoriesByHierarchyLevelId(hierarchyLevelId, dynamicFormId || 0);
        parsedResult = parseCategoryOptions(spResult);
    }else{
        filterInformation.hl2Id = hl2.HL2_ID;
        dynamicFormId = dynamicFormLib.getDynamicFormIdForNewRecords(hierarchyLevelId, filterInformation);
        spResult = dbCategory.getExecutionCarryOverCategoriesByHierarchyLevelId(hierarchyLevelId, dynamicFormId || 0, parentLevelId);

        var carryOverOptions = parseCarryOverOptions(spResult.out_result_parent);
        var categoryOptions = parseCategoryOptions(spResult.out_result);

        parsedResult = carryOverOptions? parseCarryOverCategoryOption(categoryOptions, carryOverOptions, USE_CARRY_OVER_OPTION_VALUES) : categoryOptions;
    }

    return parsedResult;
}

/**
 * Function to parse all the selected options used for Carry Over by the Category ID.
 * @param carryOverOptions (!Array) Array of options selected.
 * @returns {Object} The options selected mapped by the Category ID.
 */
function parseCarryOverOptions(carryOverOptions){
    var result = null;
    if(carryOverOptions && carryOverOptions.length){
        result = {};
        carryOverOptions.forEach(function(categoryOption){
            if(!result[categoryOption.CATEGORY_ID]){
                result[categoryOption.CATEGORY_ID] = {};
                result[categoryOption.CATEGORY_ID].CATEGORY_ID = categoryOption.CATEGORY_ID;
                result[categoryOption.CATEGORY_ID].OPTIONS = [];
            }

            result[categoryOption.CATEGORY_ID].OPTIONS.push({
                ALLOCATION_CATEGORY_OPTION_LEVEL_ID: categoryOption.ALLOCATION_CATEGORY_OPTION_LEVEL_ID,
                OPTION_ID: categoryOption.OPTION_ID,
                AMOUNT: categoryOption.AMOUNT,
                AMOUNT_KPI: categoryOption.AMOUNT_KPI
            });
        });
    }

    return result;
}

/**
 * Function to parse all the category options assigned to L5/L6 with the selected options of its parents
 * @param arrayCategories (!Array) The array of the categories with its options
 * @param carryOverOptionsMap (!Object) JSON mapped by the CATEGORY_ID with the array of options selected.
 * @param prioritizeCarryOver (?Boolean) If the tool should prioritize the Carry Over amounts or the ones assigned by Default
 * @returns {Array} The array with all the categories for the current level and all the default/carry over options selected.
 */
function parseCarryOverCategoryOption(arrayCategories, carryOverOptionsMap, prioritizeCarryOver){
    var result = null;
    if(arrayCategories && arrayCategories.length){
        result = JSON.parse(JSON.stringify(arrayCategories));

        result.forEach(function (category) {
            if (carryOverOptionsMap[category.CATEGORY_ID] && carryOverOptionsMap[category.CATEGORY_ID].OPTIONS 
                && carryOverOptionsMap[category.CATEGORY_ID].OPTIONS.length
                && (Number(category.DEFAULT_TOTAL_AMOUNT) !== 100 || prioritizeCarryOver)) {

                //Reset All options to use only Carry Over information
                category.OPTIONS.forEach(function (option) {
                    option.AMOUNT = null;
                    option.AMOUNT_KPI = null;
                });
                
            	carryOverOptionsMap[category.CATEGORY_ID].OPTIONS.forEach(function (carryOverOption) {
                    if (carryOverOptionsMap[category.CATEGORY_ID]) {
                    	//Set Carry Over information
                        category.OPTIONS.forEach(function (option) {
                            if (Number(option.OPTION_ID) === Number(carryOverOption.OPTION_ID)) {
                                option.AMOUNT = carryOverOption.AMOUNT;
                                option.AMOUNT_KPI = carryOverOption.AMOUNT_KPI;
                            }
                        });
                    }
                });
            }
        });
    }

    return result;
}

function getHiddenCategoriesByHierarchyLevelId(hierarchyLevelId, parentLevelId, userId, budgetYearId){
    var hl2 = hierarchyLevelId === 2 && parentLevelId ? dataHl2.getHl2ByHl4Id(parentLevelId) : {};
    var parentHierarchyLevelId = null;
    var filterInformation = {};
    var dynamicFormId = null;
    var result = null;

    switch(Number(hierarchyLevelId)){
        case 2:
            //Level 5
            hl2 = parentLevelId ? dataHl2.getHl2ByHl4Id(parentLevelId) : {};
            parentHierarchyLevelId = PARENT_LEVEL_MAP[hierarchyLevelId];
            break;
        case 6:
            //Level 1
            parentLevelId = null;
            break;
        default:
            //L2-L3-L4
            parentHierarchyLevelId = PARENT_LEVEL_MAP[hierarchyLevelId];
            break;
    }

    if(!hl2.HL2_ID){
        filterInformation.userId = userId;
        filterInformation.parentLevelId = parentLevelId;
        filterInformation.parentHierarchyLevelId = parentHierarchyLevelId;
        filterInformation.budgetYearId = budgetYearId;

        dynamicFormId = dynamicFormLib.getDynamicFormIdForNewRecords(hierarchyLevelId, filterInformation);
    }else{
        filterInformation.hl2Id = hl2.HL2_ID;

        dynamicFormId = dynamicFormLib.getDynamicFormIdForNewRecords(hierarchyLevelId, filterInformation);
    }

    if(dynamicFormId){
        result = dbCategory.getHiddenCategoriesByHierarchyLevelId(hierarchyLevelId, dynamicFormId || 0)
    }

    return result? parseHiddenCategories(result) : null;
}

function parseHiddenCategories(arrayResult){
    var result = null;
    if(arrayResult && arrayResult.length){
        result = {};
        arrayResult.forEach(function(categoryOption){
            if (!result[categoryOption.CATEGORY_ID]) {
                result[categoryOption.CATEGORY_ID] = {
                    CATEGORY_NAME: categoryOption.CATEGORY_NAME,
                    CATEGORY_ID: categoryOption.CATEGORY_ID,
                    DEFAULT_TOTAL_AMOUNT: categoryOption.DEFAULT_BUDGET_PERCENTAGE? Number(categoryOption.DEFAULT_BUDGET_PERCENTAGE) : 0, //For validation purposes
                    MAKE_CATEGORY_MANDATORY: categoryOption.MAKE_CATEGORY_MANDATORY,
                    SINGLE_OPTION_ONLY: categoryOption.SINGLE_OPTION_ONLY,
                    CATEGORY_TYPE_ID: categoryOption.CATEGORY_TYPE_ID,
                    OPTIONS_LIMIT: categoryOption.OPTIONS_LIMIT || OPTIONS_LIMIT_DEFAULT,
                    OPTIONS: [{
                        OPTION_ID: categoryOption.OPTION_ID,
                        OPTION_NAME: categoryOption.OPTION_NAME,
                        CATEGORY_ID: categoryOption.CATEGORY_ID,
                        CATEGORY_OPTION_LEVEL_ID: categoryOption.ALLOCATION_CATEGORY_OPTION_LEVEL_ID || null,
                        MAKE_CATEGORY_MANDATORY: categoryOption.MAKE_CATEGORY_MANDATORY,
                        SINGLE_OPTION_ONLY: categoryOption.SINGLE_OPTION_ONLY,
                        DEFAULT_BUDGET_PERCENTAGE: categoryOption.DEFAULT_BUDGET_PERCENTAGE,
                        DEFAULT_KPI_PERCENTAGE: categoryOption.DEFAULT_KPI_PERCENTAGE,
                        AMOUNT: categoryOption.DEFAULT_BUDGET_PERCENTAGE || 0,
                        AMOUNT_KPI: categoryOption.DEFAULT_KPI_PERCENTAGE || 0
                    }]
                };
            } else {
                //For validation purposes
                if(categoryOption.DEFAULT_BUDGET_PERCENTAGE){
                    result[categoryOption.CATEGORY_ID].DEFAULT_TOTAL_AMOUNT =
                        Number(result[categoryOption.CATEGORY_ID].DEFAULT_TOTAL_AMOUNT) + Number(categoryOption.DEFAULT_BUDGET_PERCENTAGE);
                }
                //-
                result[categoryOption.CATEGORY_ID].OPTIONS.push({
                    OPTION_ID: categoryOption.OPTION_ID,
                    OPTION_NAME: categoryOption.OPTION_NAME,
                    CATEGORY_ID: categoryOption.CATEGORY_ID,
                    CATEGORY_OPTION_LEVEL_ID: categoryOption.ALLOCATION_CATEGORY_OPTION_LEVEL_ID || null,
                    MAKE_CATEGORY_MANDATORY: categoryOption.MAKE_CATEGORY_MANDATORY,
                    SINGLE_OPTION_ONLY: categoryOption.SINGLE_OPTION_ONLY,
                    AMOUNT: categoryOption.DEFAULT_BUDGET_PERCENTAGE || 0,
                    AMOUNT_KPI: categoryOption.DEFAULT_KPI_PERCENTAGE || 0
                });
            }
        });
    }

    return util.objectToArray(result);
}

function parseCategoryOptions(arrayCategoryOptions){
    var result = null;
    if(arrayCategoryOptions && arrayCategoryOptions.length){
        result = {};
        arrayCategoryOptions.forEach(function(categoryOption){
            if (!result[categoryOption.CATEGORY_NAME]) {
                result[categoryOption.CATEGORY_NAME] = {
                    CATEGORY_NAME: categoryOption.CATEGORY_NAME,
                    CATEGORY_ID: categoryOption.CATEGORY_ID,
                    MAKE_CATEGORY_MANDATORY: categoryOption.MAKE_CATEGORY_MANDATORY,
                    SINGLE_OPTION_ONLY: categoryOption.SINGLE_OPTION_ONLY,
                    CATEGORY_TYPE_ID: categoryOption.CATEGORY_TYPE_ID,
                    OPTIONS_LIMIT: categoryOption.OPTIONS_LIMIT || OPTIONS_LIMIT_DEFAULT,
                    DEFAULT_TOTAL_AMOUNT: categoryOption.DEFAULT_BUDGET_PERCENTAGE? Number(categoryOption.DEFAULT_BUDGET_PERCENTAGE) : 0, //For validation purposes
                    OPTIONS: [{
                        OPTION_ID: categoryOption.OPTION_ID,
                        OPTION_NAME: categoryOption.OPTION_NAME,
                        CATEGORY_ID: categoryOption.CATEGORY_ID,
                        CATEGORY_OPTION_LEVEL_ID: categoryOption.ALLOCATION_CATEGORY_OPTION_LEVEL_ID || null,
                        MAKE_CATEGORY_MANDATORY: categoryOption.MAKE_CATEGORY_MANDATORY,
                        SINGLE_OPTION_ONLY: categoryOption.SINGLE_OPTION_ONLY,
                        DEFAULT_BUDGET_PERCENTAGE: categoryOption.DEFAULT_BUDGET_PERCENTAGE,
                        DEFAULT_KPI_PERCENTAGE: categoryOption.DEFAULT_KPI_PERCENTAGE,
                        AMOUNT: categoryOption.DEFAULT_BUDGET_PERCENTAGE,
                        AMOUNT_KPI: categoryOption.DEFAULT_KPI_PERCENTAGE
                    }]
                };
            } else {
                //For validation purposes
                if(categoryOption.DEFAULT_BUDGET_PERCENTAGE){
                    result[categoryOption.CATEGORY_NAME].DEFAULT_TOTAL_AMOUNT =
                        Number(result[categoryOption.CATEGORY_NAME].DEFAULT_TOTAL_AMOUNT) + Number(categoryOption.DEFAULT_BUDGET_PERCENTAGE);
                }
                //-

                result[categoryOption.CATEGORY_NAME].OPTIONS.push({
                    OPTION_ID: categoryOption.OPTION_ID,
                    OPTION_NAME: categoryOption.OPTION_NAME,
                    CATEGORY_ID: categoryOption.CATEGORY_ID,
                    CATEGORY_OPTION_LEVEL_ID: categoryOption.ALLOCATION_CATEGORY_OPTION_LEVEL_ID || null,
                    MAKE_CATEGORY_MANDATORY: categoryOption.MAKE_CATEGORY_MANDATORY,
                    SINGLE_OPTION_ONLY: categoryOption.SINGLE_OPTION_ONLY,
                    AMOUNT: categoryOption.DEFAULT_BUDGET_PERCENTAGE,
                    AMOUNT_KPI: categoryOption.DEFAULT_KPI_PERCENTAGE
                });
            }
        });
    }

    return util.objectToArray(result);
}

function getCategoryOptionByHierarchyLevelId(hierarchy_level_id, hl4Id, fromEventRequest, fromDynamicForm){
    var hl2 = hl4Id ? dataHl2.getHl2ByHl4Id(hl4Id) : {};

    var spResult = dbCategory.getCategoryOptionByHierarchyLevelId(hierarchy_level_id, hl2.HL2_ID || 0, fromEventRequest || 0);

    var result = {};
    spResult.forEach(function(categoryOption){
        if(fromDynamicForm || (!categoryOption.HIDDEN)) {
            if (!result[categoryOption.CATEGORY_NAME]) {
                result[categoryOption.CATEGORY_NAME] = {
                    CATEGORY_NAME: categoryOption.CATEGORY_NAME,
                    CATEGORY_ID: categoryOption.CATEGORY_ID
                    , MAKE_CATEGORY_MANDATORY: categoryOption.MAKE_CATEGORY_MANDATORY
                    , SINGLE_OPTION_ONLY: categoryOption.SINGLE_OPTION_ONLY
                    , CATEGORY_TYPE_ID: categoryOption.CATEGORY_TYPE_ID
                    , OPTIONS_LIMIT: categoryOption.OPTIONS_LIMIT || OPTIONS_LIMIT_DEFAULT
                    , OPTIONS: [{
                        OPTION_ID: categoryOption.OPTION_ID
                        , OPTION_NAME: categoryOption.OPTION_NAME
                        , CATEGORY_ID: categoryOption.CATEGORY_ID
                        , CATEGORY_OPTION_LEVEL_ID: categoryOption.ALLOCATION_CATEGORY_OPTION_LEVEL_ID || null
                        , MAKE_CATEGORY_MANDATORY: categoryOption.MAKE_CATEGORY_MANDATORY
                        , SINGLE_OPTION_ONLY: categoryOption.SINGLE_OPTION_ONLY
                        , DEFAULT_BUDGET_PERCENTAGE: categoryOption.DEFAULT_BUDGET_PERCENTAGE
                        , DEFAULT_KPI_PERCENTAGE: categoryOption.DEFAULT_KPI_PERCENTAGE

                    }]
                };
            } else {
                result[categoryOption.CATEGORY_NAME].OPTIONS.push({
                    OPTION_ID: categoryOption.OPTION_ID
                    , OPTION_NAME: categoryOption.OPTION_NAME
                    , CATEGORY_ID: categoryOption.CATEGORY_ID
                    , CATEGORY_OPTION_LEVEL_ID: categoryOption.ALLOCATION_CATEGORY_OPTION_LEVEL_ID || null
                    , MAKE_CATEGORY_MANDATORY: categoryOption.MAKE_CATEGORY_MANDATORY
                    , SINGLE_OPTION_ONLY: categoryOption.SINGLE_OPTION_ONLY
                    , AMOUNT: categoryOption.DEFAULT_BUDGET_PERCENTAGE
                    , AMOUNT_KPI: categoryOption.DEFAULT_KPI_PERCENTAGE
                });
            }
        }
    });
    return util.objectToArray(result);
}

function getCategoryByHierarchyLevelId(hierarchy_level_id){
    var categories = JSON.parse(JSON.stringify(dbCategory.getCategoryByHierarchyLevelId(hierarchy_level_id)));

    categories.results.forEach(function(cat){
        cat.Options = getOptionByLevelByCategory(hierarchy_level_id, cat.CATEGORY_ID);
    });

    return categories;
}

function updateAllocationCategory(data, userId) {
    var objCategory = dbCategory.getAllocationCategoryByName(data.NAME);

    if(objCategory && data.CATEGORY_ID !== objCategory.CATEGORY_ID)
        throw ErrorLib.getErrors().CustomError("","", "Cannot update the category beacause exists another with same name.");

    if(Number(data.CATEGORY_TYPE_ID) == CATEGORY_TYPE.COUNTRY){
        dbCategory.deleteAllocationCountryCategory(data.CATEGORY_ID, userId);
    }

    return dbCategory.updateAllocationCategory(
        data.CATEGORY_ID
        , data.DESCRIPTION
        , data.NAME
        , data.MEASURE_ID
        , data.SINGLE_OPTION_ONLY ? 1 : 0
        , data.CATEGORY_TYPE_ID
        , userId);
}

function deleteAllocationCategory(categoryId, userId, confirm){
    if (!categoryId)
        throw ErrorLib.getErrors().CustomError("",
            "AllocationCategoryService/handleDelete/deleteAllocationCategory",
            "Category ID is not found");

    if(confirm){
        dataCategoryOptionLevel.deleteAllocationCategoryOptionLevelByCategory(categoryId, userId);
        hierarchyCategoryCountryLib.deleteCountryCategoryOptionLevel(null, userId);
        return dbCategory.deleteAllocationCategory(categoryId, userId);
    }

    var countRegisters = dataCategoryOptionLevel.checkInUseAllocationCategoryById(categoryId);
    var countAllocationCountryRegisters = hierarchyCategoryCountryLib.checkInUseAllocationCountryCategoryById(categoryId);
    if (countRegisters || countAllocationCountryRegisters) {
        throw ErrorLib.getErrors().ConfirmDelete("","",countRegisters);
    } else {
        return dbCategory.deleteAllocationCategory(categoryId, userId);
    }
}

function getOptionByLevelByCategory(hierarchy_level_id, allocation_category_id){
    return dbCategoryOption.getOptionByLevelByCategory(hierarchy_level_id, allocation_category_id);
}

function uploadAllocationCategory(data, userId) {
    var allocationCategoryList = data.batch;
    var allocationCategoryUpdated = 0;
    var allocationCategoryCreated = 0;
    var categoryId;
    var countriesCategory = {};
    allocationCategoryList.forEach(function(allocationCategory){
        var ac = {};

        var categoryTypeId = allocationCategory.in_category_type && allocationCategory.in_category_type.trim()
        && CATEGORY_TYPE[(allocationCategory.in_category_type.trim()).toUpperCase()]
            ? CATEGORY_TYPE[(allocationCategory.in_category_type.trim()).toUpperCase()]
            : CATEGORY_TYPE.OPTION;

        if(!countriesCategory.ALLOCATION_CATEGORY_ID && categoryTypeId == CATEGORY_TYPE.COUNTRY){
            countriesCategory = dbCategory.getCategoryByType(CATEGORY_TYPE.COUNTRY) || {};
        } else {
            ac = getAllocationCategoryByName(allocationCategory.in_categoryName) || {};
        }

        var measure = dbMeasure.getMeasureBySymbol(allocationCategory.in_measure);

        if(countriesCategory.ALLOCATION_CATEGORY_ID || ac.CATEGORY_ID){
            dbCategory.updateAllocationCategory(
                countriesCategory.ALLOCATION_CATEGORY_ID || ac.CATEGORY_ID
                , allocationCategory.in_categoryDescription
                , allocationCategory.in_categoryName
                , measure.MEASURE_ID
                , allocationCategory.in_oneSelectionOnly ? 1 : 0
                , categoryTypeId
                , userId);
            allocationCategoryUpdated++;
        } else {
            categoryId = insertAllocationCategoryForUpload(
                allocationCategory.in_categoryName
                , allocationCategory.in_categoryDescription
                , measure.MEASURE_ID
                , allocationCategory.in_oneSelectionOnly
                , categoryTypeId
                , userId
            );
            allocationCategoryCreated++;
        }
    });
    return {allocationCategoryCreated: allocationCategoryCreated, allocationCategoryUpdated: allocationCategoryUpdated};
}

function checkAllocationCategory(data){
    var allocationCategoryList = data.check;
    var allocationCategoryToUpdate = 0;
    var allocationCategoryToInsert = 0;
    var countriesCategory = {};
    allocationCategoryList.forEach(function(category){
        var categoryTypeId = category.in_category_type && category.in_category_type.trim()
        && CATEGORY_TYPE[(category.in_category_type.trim()).toUpperCase()]
            ? CATEGORY_TYPE[(category.in_category_type.trim()).toUpperCase()]
            : CATEGORY_TYPE.OPTION;

        if(!countriesCategory.ALLOCATION_CATEGORY_ID && categoryTypeId == CATEGORY_TYPE.COUNTRY){
            countriesCategory = dbCategory.getCategoryByType(CATEGORY_TYPE.COUNTRY) || {};
        }

        if(countriesCategory.ALLOCATION_CATEGORY_ID || getAllocationCategoryByName(category.in_categoryName)){
            allocationCategoryToUpdate++;
        } else {
            allocationCategoryToInsert++;
        }
    });

    return {allocationCategoryToCreate: allocationCategoryToInsert, allocationCategoryToUpdate: allocationCategoryToUpdate};
}

function getCategoryByProcessingReportExportKey(exportKey){
    return dbCategory.getCategoryByProcessingReportExportKey(exportKey);
}

function getCategoryType() {
    return CATEGORY_TYPE;
}