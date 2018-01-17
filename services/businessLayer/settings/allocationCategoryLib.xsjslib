/***************Import Library*******************/
$.import("mktgplanningtool.services.commonLib","mapper");
var mapper = $.mktgplanningtool.services.commonLib.mapper;
var ErrorLib = mapper.getErrors();
var dbCategory = mapper.getDataCategory();
var dbCategoryOption = mapper.getDataOption();
var dataCategoryOptionLevel = mapper.getDataCategoryOptionLevel();
var util = mapper.getUtil();
var dbMeasure = mapper.getDataMeasure();
/*************************************************/

function getAllocationCategoryByName(name){
	return dbCategory.getAllocationCategoryByName(name);
}

function insertAllocationCategoryForUpload(name, description, measure_id, single_option_only, userId){
	return insertAllocationCategory({NAME: name, DESCRIPTION: description, MEASURE_ID: measure_id, SINGLE_OPTION_ONLY: single_option_only}, userId);
}

function insertAllocationCategory(data, userId) {

	//validate if exists another category with same name
	var objAllocationCat = dbCategory.getAllocationCategoryByName(data.NAME);
	if(objAllocationCat)
		throw ErrorLib.getErrors().CustomError("","AllocationCategoryService", "Cannot create the category beacause exists another with same name");

	var result = dbCategory.insertAllocationCategory(data.DESCRIPTION,
		data.NAME,
		data.MEASURE_ID,
		data.SINGLE_OPTION_ONLY ? 1 : 0,
		userId);
	return result;
}

function getAllocationCategory(){
	return dbCategory.getAllocationCategory();
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

function getCategoryOptionByHierarchyLevelId(hierarchy_level_id){
	var spResult = dbCategory.getCategoryOptionByHierarchyLevelId(hierarchy_level_id);
	var result = {};
    spResult.forEach(function(categoryOption){
        if(!result[categoryOption.CATEGORY_NAME]){
            result[categoryOption.CATEGORY_NAME] = {
                CATEGORY_NAME: categoryOption.CATEGORY_NAME,
                CATEGORY_ID: categoryOption.CATEGORY_ID
                , MAKE_CATEGORY_MANDATORY: categoryOption.MAKE_CATEGORY_MANDATORY
				, SINGLE_OPTION_ONLY: categoryOption.SINGLE_OPTION_ONLY
                ,OPTIONS: [{
                    OPTION_ID: categoryOption.OPTION_ID
                    , OPTION_NAME: categoryOption.OPTION_NAME
                    , CATEGORY_ID: categoryOption.CATEGORY_ID
                    , MAKE_CATEGORY_MANDATORY: categoryOption.MAKE_CATEGORY_MANDATORY
                    , SINGLE_OPTION_ONLY: categoryOption.SINGLE_OPTION_ONLY
                }]
            };
		} else {
            result[categoryOption.CATEGORY_NAME].OPTIONS.push({
                OPTION_ID: categoryOption.OPTION_ID
                , OPTION_NAME: categoryOption.OPTION_NAME
                , CATEGORY_ID: categoryOption.CATEGORY_ID
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
	return dbCategory.updateAllocationCategory(data.CATEGORY_ID,
		data.DESCRIPTION, data.NAME, data.MEASURE_ID, data.SINGLE_OPTION_ONLY ? 1 : 0,
		userId);
}


function deleteAllocationCategory(categoryId, userId, confirm){
    if (!categoryId)
        throw ErrorLib.getErrors().CustomError("",
            "AllocationCategoryService/handleDelete/deleteAllocationCategory",
            "Category ID is not found");

	if(confirm){
        dataCategoryOptionLevel.deleteAllocationCategoryOptionLevelByCategory(categoryId, userId);
        return dbCategory.deleteAllocationCategory(categoryId, userId);
	}

    var countRegisters = dataCategoryOptionLevel.checkInUseAllocationCategoryById(categoryId);
	if (countRegisters) {
        throw ErrorLib.getErrors().ConfirmDelete("",
            "AllocationCategoryService/handleDelete/checkInUseAllocationCategoryById",
            countRegisters);
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
	allocationCategoryList.forEach(function(allocationCategory){
		var ac = getAllocationCategoryByName(allocationCategory.in_categoryName);

		var measure = dbMeasure.getMeasureBySymbol(allocationCategory.in_measure);
		//if (!measure)
		//	throw ErrorLib.getErrors().CustomError("", "allocationCategoryService/handlePost/UPLOAD", "Measure is not found");

		if(!ac || !ac.CATEGORY_ID){
			categoryId = insertAllocationCategoryForUpload(allocationCategory.in_categoryName, allocationCategory.in_categoryDescription, measure.MEASURE_ID,
				allocationCategory.in_oneSelectionOnly, userId);
			allocationCategoryCreated++;
		} else {
			dbCategory.updateAllocationCategory(ac.CATEGORY_ID,
				allocationCategory.in_categoryDescription, allocationCategory.in_categoryName, measure.MEASURE_ID,
				allocationCategory.in_oneSelectionOnly ? 1 : 0, userId);
			allocationCategoryUpdated++;
		}
	});
	return {allocationCategoryCreated: allocationCategoryCreated, allocationCategoryUpdated: allocationCategoryUpdated};
}

function checkAllocationCategory(data){
	var allocationCategoryList = data.check;
	var allocationCategoryToUpdate = 0;
	var allocationCategoryToInsert = 0;
	allocationCategoryList.forEach(function(category){
		if(getAllocationCategoryByName(category.in_categoryName)){
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