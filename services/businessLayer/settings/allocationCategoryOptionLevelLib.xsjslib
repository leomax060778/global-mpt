/***************Import Library*******************/
$.import("mktgplanningtool.services.commonLib","mapper");
var mapper = $.mktgplanningtool.services.commonLib.mapper;
var ErrorLib = mapper.getErrors();
var dataCategoryOptionLevel = mapper.getDataCategoryOptionLevel();
var blSegmentation = mapper.getSegmentation();
var AllocationOptionLib = mapper.getAllocationOptionLib();
var allocationCategory = mapper.getAllocationCategoryLib();
var dataCategory = mapper.getDataCategory();
var dataOption = mapper.getDataOption();
var util = mapper.getUtil();
/*************************************************/
var HIERARCHY_LEVEL = {
    HL1: 6,
    HL2: 5,
	HL3: 4,
	HL4: 1,
	HL5: 2,
	HL6: 3
};

var ALLOCATION_CATEGORY_NOT_EXIST = "The Allocation category does not exist.";
var ALLOCATION_OPTION_NOT_EXIST = "The Allocation option does not exist.";

function existAllocationCategory(categoryId){
    return Object.keys(dataCategory.getAllocationCategoryById(categoryId)).length;
}

function existAllocationOption(optionId){
    return Object.keys(dataOption.getAllocationOptionById(optionId)).length;
}

function updateCategoryOptionLevel(data, userId) {
    var message;
    if(!data || !data.IN_CATEGORY_ID || !data.IN_LEVEL.length){
    	throw ErrorLib.getErrors().BadRequest();
    }

    if(!existAllocationCategory(data.IN_CATEGORY_ID)){
        throw ErrorLib.getErrors().CustomError("", "allocationCategoryOptionLevelService/handlePut/updateCategoryOptionLevel", ALLOCATION_CATEGORY_NOT_EXIST);
    }
    
    if(typeof data.IN_LEVEL === "string"){
    	data.IN_LEVEL= [data.IN_LEVEL];
    }
    
    if(data.IN_OPTION_LIST.length){
    	for(var i = 0; i < data.IN_OPTION_LIST.length; i++){
    		if(!existAllocationOption(Number(data.IN_OPTION_LIST[i]))){
		        throw ErrorLib.getErrors().CustomError("", "allocationCategoryOptionLevelService/handlePut/updateCategoryOptionLevel", ALLOCATION_OPTION_NOT_EXIST);
		        break;
		    }
    	}
    }

	data.IN_LEVEL.forEach(function(level){

		var hierarchylevel = HIERARCHY_LEVEL[level.toUpperCase()];

        if(hierarchylevel){
            var optionIds = [];
            var categoryOptionToMessage = [];
            var countInsert = 0;
            var totalOptions = data.IN_OPTION_LIST.length;
            var allocationOptions = data.IN_OPTION_LIST.map(function (optionId) {
                return {in_allocation_option_id: optionId}
            });
            var optionToDelete = dataCategoryOptionLevel.getAllocationCategoryOptionLevelToDelete(data.IN_CATEGORY_ID, hierarchylevel, allocationOptions, userId);

            var associationDeleteCount = 0;
            if (optionToDelete.length){
                associationDeleteCount = dataCategoryOptionLevel.deleteAllocationCATEGORYOptionLevel(data.IN_CATEGORY_ID, hierarchylevel, allocationOptions, userId);
            }
            if (associationDeleteCount !== optionToDelete.length){
                message = "Some options could not be removed because they are in use";
            }

            for(var i = 0; i < totalOptions; i++){
                var categoryOptionLevel = dataCategoryOptionLevel.getAllocationOptionLevelByCategoryAndLevelId(data.IN_CATEGORY_ID, level, data.IN_OPTION_LIST[i]);

                var categoryOptionLevelInfo = dataCategoryOptionLevel.getAllocationCategoryOptionByOptionIdLevelId(level, data.IN_OPTION_LIST[i]);

                if(categoryOptionLevelInfo && Number(categoryOptionLevelInfo.CATEGORY_ID) !== Number(data.IN_CATEGORY_ID)){
                    optionIds.push(data.IN_OPTION_LIST[i]);
                    categoryOptionToMessage.push({
                        CATEGORY_ID: categoryOptionLevelInfo.CATEGORY_ID
                        , OPTION_ID: data.IN_OPTION_LIST[i]})
                }

                if(categoryOptionLevel && categoryOptionLevel.ALLOCATION_CATEGORY_OPTION_LEVEL_ID){
                    dataCategoryOptionLevel.updateAllocationCategoryOptionLevel(
                        data.IN_CATEGORY_ID,
                        hierarchylevel,
                        data.IN_OPTION_LIST[i],
                        data.IN_PROCESSING_REPORT,
                        userId,
                        data.IN_MAKE_CATEGORY_MANDATORY);
                    
                    //Update Make Category Mandatory and In Processing Report flags to avoid duplicated registers
                    var reqBody = {
                    		CATEGORY_ID: data.IN_CATEGORY_ID,
                    		HIERARCHY_LEVEL_ID: hierarchylevel,
                    		MAKE_CATEGORY_MANDATORY: data.IN_MAKE_CATEGORY_MANDATORY,
                    		IN_PROCESSING_REPORT: data.IN_PROCESSING_REPORT
                    };
                    dataCategoryOptionLevel.updateAllocationOptionFlags(reqBody);
              
                } else {
                    dataCategoryOptionLevel.insertAllocationCATEGORYOptionLevel(
                        data.IN_CATEGORY_ID,
                        data.IN_OPTION_LIST[i],
                        hierarchylevel,
                        data.IN_PROCESSING_REPORT,
                        userId,
                        data.IN_MAKE_CATEGORY_MANDATORY);
                }

                ++countInsert;
            }
            if(data.IN_UPDATE_SEGMENTATION_CATEGORY && hierarchylevel == HIERARCHY_LEVEL.HL5)
                blSegmentation.updateSegmentationCategoryOptionByAllocationCategoryId(data.IN_CATEGORY_ID, allocationOptions, optionToDelete, userId);

            if(totalOptions != countInsert)
                throw ErrorLib.getErrors().CustomError("",
                    "categoryOptionLevelServices/handlePut/updateCategoryOptionLevel",
                    "Could not complete the process.");

            if(optionIds.length){
                var stringMessage = "Selected options are already associated in the current level as follows: \n";
                if(categoryOptionToMessage){
                    var allCategory = allocationCategory.getCategoryByHierarchyLevelId(hierarchylevel).results;
                    var allOptions = AllocationOptionLib.getAllocationOption();
                    categoryOptionToMessage.forEach(function(level){

                        var category = allCategory.filter(function (elem) {
                            return Number(elem.CATEGORY_ID) === Number(level.CATEGORY_ID);
                        });

                        var option = allOptions.filter(function (elem) {
                            return Number(elem.ALLOCATION_OPTION_ID === level.OPTION_ID);
                        });

                        if(category.length && option.length) {
                            stringMessage = stringMessage + category[0].NAME + " / " + option[0].NAME + "\n";
                        }
                    });
                }

                var error = ErrorLib.getErrors().AcronymError("", "", stringMessage);
                error.data = optionIds;
                error.message = 'Allocation Option assignment error.';
                error.name = 'Allocation Option assignment error.';
                throw error;
            }
        }
	});
    if (message){
        return {message: message};
    }
    return (data.IN_LEVEL.length * data.IN_OPTION_LIST.length);
}

function getHlCategoryOptionByLevelHlId(level, hlId) {
    var categoryOptionList = dataCategoryOptionLevel.getHlCategoryOptionByLevelHlId(level, hlId);
    var result = {};
    categoryOptionList.forEach(function (categoryOption) {
        if(!result[categoryOption.CATEGORY_NAME]) {
            result[categoryOption.CATEGORY_NAME] = {
                CATEGORY_ID: categoryOption.CATEGORY_ID,
                CATEGORY_NAME: categoryOption.CATEGORY_NAME,
                MAKE_CATEGORY_MANDATORY: categoryOption.MAKE_CATEGORY_MANDATORY || 0,
                SINGLE_OPTION_ONLY: categoryOption.SINGLE_OPTION_ONLY || 0,
                OPTIONS: [{
                    OPTION_ID: categoryOption.OPTION_ID,
                    OPTION_NAME: categoryOption.OPTION_NAME,
                    CATEGORY_OPTION_LEVEL_ID: categoryOption.CATEGORY_OPTION_LEVEL_ID,
                    AMOUNT: categoryOption.AMOUNT,
                    CATEGORY_OPTION_ID: categoryOption.CATEGORY_OPTION_ID
                }]
            }
        } else {
            result[categoryOption.CATEGORY_NAME].OPTIONS.push({
                OPTION_ID: categoryOption.OPTION_ID,
                OPTION_NAME: categoryOption.OPTION_NAME,
                CATEGORY_OPTION_LEVEL_ID: categoryOption.CATEGORY_OPTION_LEVEL_ID,
                AMOUNT: categoryOption.AMOUNT,
                CATEGORY_OPTION_ID: categoryOption.CATEGORY_OPTION_ID
            });
        }
    });
    return util.objectToArray(result);
}