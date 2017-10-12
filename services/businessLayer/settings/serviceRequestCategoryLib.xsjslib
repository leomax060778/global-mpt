/***************Import Library*******************/
$.import("mktgplanningtool.services.commonLib","mapper");
var mapper = $.mktgplanningtool.services.commonLib.mapper;
var ErrorLib = mapper.getErrors();
var dbCategory = mapper.getDataServiceRequest();
var dataCategory = mapper.getDataCategory();
/*************************************************/

function getServiceRequestCategory(){
	return dbCategory.getServiceRequestCategory();
}

function getCategoryByHierarchyLevelId(hierarchy_level_id){
	return dbCategory.getCategoryByHierarchyLevelId(hierarchy_level_id);
}

function insertServiceRequestCategory(data, userId) {
	//validate if exists another category with same name
	var objAllocationCat = dbCategory.getServiceRequestCategoryByName(data.NAME);
	if(objAllocationCat && objAllocationCat.length)
		throw ErrorLib.getErrors().CustomError("","AllocationCategoryService", "Cannot create the category beacause exists another with same name");

	var result = dbCategory.insertServiceRequestCategory(data.DESCRIPTION,
		data.NAME,
		userId);
	return result;
}

function deleteServiceRequestCategory(categoryId, userId, confirm) {

	if (!categoryId)
		throw ErrorLib.getErrors().CustomError("",
			"",
			"Category ID is not found");

	if (confirm) {
		dbCategory.deleteServiceRequestCategoryOptionLevelByCategory(categoryId, userId);
		return dbCategory.deleteServiceRequestCategory(categoryId, userId);
	}
	else {
		var countRegisters = dbCategory.checkInUseServiceRequestCategoryById(categoryId);
		if (countRegisters) {
			throw ErrorLib.getErrors().ConfirmDelete("",
				"AllocationCategoryService/handleDelete/checkInUseAllocationCategoryById",
				countRegisters);
		} else {
			return dbCategory.deleteServiceRequestCategory(categoryId, userId);
		}
	}
}

function updateServiceRequestCategory(data, userId) {
	return dbCategory.updateServiceRequestCategory(data.CATEGORY_ID, data.DESCRIPTION, data.NAME, userId);

}

