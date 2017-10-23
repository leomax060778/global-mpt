/***************Import Library*******************/
$.import("mktgplanningtool.services.commonLib","mapper");
var mapper = $.mktgplanningtool.services.commonLib.mapper;
var ErrorLib = mapper.getErrors();
var dbCategory = mapper.refactorL1_getDataCategory();
var dbCategoryOption = mapper.getDataOption();
var dataCategoryOptionLevel = mapper.getDataCategoryOptionLevel();
var util = mapper.getUtil();
/*************************************************/

function getAllocationCategoryByName(name){
	return dbCategory.getAllocationCategoryByName(name);
}

function insertAllocationCategory(data, userId) {

	//validate if exists another category with same name
	var objAllocationCat = dbCategory.getAllocationCategoryByName(data.NAME);
	if(objAllocationCat)
		throw ErrorLib.getErrors().CustomError("","AllocationCategoryService", "Cannot create the category beacause exists another with same name");

	var result = dbCategory.insertAllocationCategory(data.DESCRIPTION,
		data.NAME,
		data.MEASURE_ID,
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
                CATEGORY_ID: categoryOption.CATEGORY_ID,
                OPTIONS: [{
                    OPTION_ID: categoryOption.OPTION_ID
                    , OPTION_NAME: categoryOption.OPTION_NAME
                }]
            };
		} else {
            result[categoryOption.CATEGORY_NAME].OPTIONS.push({
                OPTION_ID: categoryOption.OPTION_ID
                , OPTION_NAME: categoryOption.OPTION_NAME
            });
		}
	});
    return util.objectToArray(result);
}

function updateAllocationCategory(data, userId) {
	return dbCategory.updateAllocationCategory(data.CATEGORY_ID,
		data.DESCRIPTION, data.NAME, data.MEASURE_ID,
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