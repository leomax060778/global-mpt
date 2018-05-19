/***************Import Library*******************/
$.import("mktgplanningtool.services.commonLib","mapper");
var mapper = $.mktgplanningtool.services.commonLib.mapper;
var ErrorLib = mapper.getErrors();
var dbCategory = mapper.getDataCategory();
var dbCategoryOption = mapper.getDataOption();
var dataCategoryOptionLevel = mapper.getDataCategoryOptionLevel();
var util = mapper.getUtil();
var dbMeasure = mapper.getDataMeasure();
var dataHl2 = mapper.getDataLevel2();
var hierarchyCategoryCountryLib = mapper.getHierarchyCategoryCountry();
/*************************************************/

var CATEGORY_TYPE = {
	COUNTRY: 1,
	OPTION: 2
};

var HIERARCHY_LEVEL = util.getHierarchyLevelEnum();

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

function getCategoryOptionByHierarchyLevelId(hierarchy_level_id, hl4Id, fromEventRequest){
    var hl2 = hl4Id ? dataHl2.getHl2ByHl4Id(hl4Id) : {};
	var spResult = dbCategory.getCategoryOptionByHierarchyLevelId(hierarchy_level_id, hl2.HL2_ID || 0, fromEventRequest || 0);
	
	var result = {};
    spResult.forEach(function(categoryOption){
        if(!result[categoryOption.CATEGORY_NAME]){
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
            });
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