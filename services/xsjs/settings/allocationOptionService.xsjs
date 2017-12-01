/****** libs ************/
$.import("mktgplanningtool.services.commonLib","mapper");
var mapper = $.mktgplanningtool.services.commonLib.mapper;
var httpUtil = mapper.getHttp();
var AllocationOptionLib = mapper.getAllocationOptionLib();
var AllocationCategoryLib = mapper.getAllocationCategoryLib();
var ErrorLib = mapper.getErrors();
var config = mapper.getDataConfig();
var permissions = mapper.getPermission();
/******************************************/

var hierarchyLevel = {
	'HL1' : 6,
	'HL2' : 5,
	'HL3' : 4,
	'HL4' : 1,
	'HL5' : 2,
	'HL6' : 3
};

function processRequest(){
	return httpUtil.processRequest(handleGet,handlePost,handlePut,handleDelete,false,"",true);
}


function handleGet(params,userId){
	var result = {};

	if(params.length > 1){
		var categoryId = params.get("CATEGORY_ID");
		var levelId = hierarchyLevel[params.get("LEVEL_ID")];
		//if(categoryId && levelId){
			if(!params.get("GET_ASSIGNED")){
				result.availables = AllocationOptionLib.getAvailableOptionByCategoryIdByLevelId(categoryId,levelId);
				result.assigned = AllocationOptionLib.getAssignedOptionByCategoryIdByLevelId(categoryId,levelId);
				var flags = AllocationOptionLib.getAllocationCategoryByCategoryIdLevelId(categoryId, levelId)[0];
				if(flags) {
					result.in_processing_report = flags.IN_PROCESSING_REPORT;
					result.in_show_copy_configuration_check_box = !!flags.SHOW_COPY_OPTION_TO_SEGMENTATION_CHECK_BOX;
                    result.in_make_category_mandatory = !!flags.MAKE_CATEGORY_MANDATORY;
				} else {
					result.in_processing_report = 0;
					result.in_show_copy_configuration_check_box = false;
                    result.in_make_category_mandatory = false;
				}
			} else {
				result.results = AllocationOptionLib.getAssignedOptionByCategoryIdByLevelId(categoryId,levelId, true);
			}

		//}
	}else{
		result = AllocationOptionLib.getAllocationOption();
	}

	return httpUtil.handleResponse(result,httpUtil.OK,httpUtil.AppJson);
}

function handlePost(reqBody,userId){
	var method = $.request.parameters.get("METHOD");

	var result;
	switch (method){
		case "UPLOAD":
			result = reqBody.check ? AllocationOptionLib.checkAllocationOption(reqBody, userId) : AllocationOptionLib.uploadAllocationOption(reqBody, userId);
			break;
		default:
			result = AllocationOptionLib.insertAllocationOption(reqBody, userId);
			break;
	}
	return httpUtil.handleResponse(result,httpUtil.OK,httpUtil.AppJson);
}

function handleDelete(reqBody, userId){
	var OPTION_ID = reqBody.ALLOCATION_OPTION_ID;
	var result = AllocationOptionLib.deleteAllocationOption(OPTION_ID, userId);
	return httpUtil.handleResponse(result,httpUtil.OK,httpUtil.AppJson);

}

function handlePut(reqBody, userId){

	var result = AllocationOptionLib.updateAllocationOption(reqBody, userId);
	return httpUtil.handleResponse(result,httpUtil.OK,httpUtil.AppJson);
}
processRequest();
