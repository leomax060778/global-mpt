/***************Import Library*******************/
$.import("mktgplanningtool.services.commonLib","mapper");
var mapper = $.mktgplanningtool.services.commonLib.mapper;
var ErrorLib = mapper.getErrors();
var dataHierarchyCategoryCountry = mapper.getDataHierarchyCategoryCountry();
var dbCategory = mapper.getDataCategory();

/*************************************************/
var ALLOCATION_COUNTRY_CATEGORY_OPTION_NOT_EXIST = "The Allocation Country Category option does not exist.";

var HIERARCHY_LEVEL = {
    HL5: 2,
    HL6: 3
};

var CATEGORY_TYPE = {
    COUNTRY: 1,
    OPTION: 2
};

function getAllHl1(budgetYearId){
	var result = dataHierarchyCategoryCountry.getAllHl1(budgetYearId);

	var hl2Object = {};
	
	//Loop HL2 list
	result.forEach(function(elem){
		//If the hl2Object does not have the HL1_ID key yet, then we initialize the object
		if(!hl2Object[elem.HL1_ACRONYM]){
			hl2Object[elem.HL1_ACRONYM] = {
					PATH: elem.HL1_PATH,
					CHILDREN: []
			};
		}
		//Push the HL2 children of the current HL1_ID
		hl2Object[elem.HL1_ACRONYM].CHILDREN.push({
			HL2_ID: elem.HL2_ID,
			PATH: elem.PATH
		});
	});
	
	//Return array of parsed objects
	return Object.keys(hl2Object).map(function(hl1Acronym){
		return hl2Object[hl1Acronym];
	});
}

function getCountryByHl2IdLevel(hl2Id, level, userId){
    if(!hl2Id){
    	throw ErrorLib.getErrors().CustomError("","", "The HL2 ID can not be found.");
    }
    if(!level){
    	throw ErrorLib.getErrors().CustomError("","", "The Hierarchy Level can not be found.");
    }
    if(!userId){
    	throw ErrorLib.getErrors().CustomError("","", "The User can not be found.");
    }
    
    var data = dataHierarchyCategoryCountry.getCountryByHl2IdLevel(hl2Id, HIERARCHY_LEVEL[level]);
    
    //Build result
    var result = {};
    
    result.AVAILABLES = data.AVAILABLES;
    result.ASSIGNED = data.ASSIGNED;  
    result.IN_PROCESSING_REPORT = (data.RESULT.length)? data.RESULT[0].IN_PROCESSING_REPORT: false;
    result.MAKE_CATEGORY_MANDATORY = (data.RESULT.length)? data.RESULT[0].MAKE_CATEGORY_MANDATORY: false;
    
	return result;
}

function uploadHierarchyCategoryCountry(reqBody, userId){
	//Validation
	validateData(reqBody, userId);
	
	return dataHierarchyCategoryCountry.uploadHierarchyCategoryCountry(reqBody, userId);
}

function validateData(reqBody, userId){
	if(!userId){
    	throw ErrorLib.getErrors().CustomError("","", "The User can not be found.");
    }
	
	var isValid = false;
    var errors = {};
    var BreakException = {};
    var keys = ['HL2_ID',
        'HIERARCHY_LEVEL',
        'OPTION_IDS',
        'IN_PROCESSING_REPORT',
        'MAKE_CATEGORY_MANDATORY'
    ];
    
    keys.forEach(function (key) {
        if (objNews[key] === null || objNews[key] === undefined) {
            errors[key] = null;
            throw BreakException;
        } else {
            // validate attribute type
            isValid = validateType(key, objNews[key]);
            if (!isValid) {
                errors[key] = objNews[key];
                throw BreakException;
            }
        }
    });
            
    return isValid;
}

//Check data types
function validateType(key, value) {
    var valid = true;
    switch (key) {
        case 'HL2_ID':
            valid = !isNaN(value) && value > 0;
            break;
        case 'HIERARCHY_LEVEL':
            valid = value.length > 0 && value.length <= 255;
            break;
        case 'OPTION_IDS':
            valid = value && value.length >= 0;
            break;
        case 'IN_PROCESSING_REPORT':
        case 'MAKE_CATEGORY_MANDATORY':
            valid = value !== null && value !== undefined;
            break;
    }
    return valid;
}

function updateCategoryCountryOptionLevel(data, userId) {
    var message;
    var countInsert = 0;
    var countriesCategory = dbCategory.getCategoryByType(CATEGORY_TYPE.COUNTRY) || {};

    if (!data || !data.HL2_ID || !data.HIERARCHY_LEVEL.length) {
        throw ErrorLib.getErrors().BadRequest();
    }

    if (data.OPTION_IDS.length) {
        for (var i = 0; i < data.OPTION_IDS.length; i++) {
            if (!existAllocationCategoryCountryOption(Number(data.OPTION_IDS[i]))) {
                throw ErrorLib.getErrors().CustomError("", "", ALLOCATION_COUNTRY_CATEGORY_OPTION_NOT_EXIST);
                break;
            }
        }
    }

    data.HIERARCHY_LEVEL.forEach(function (level) {

        var hierarchylevel = HIERARCHY_LEVEL[level.toUpperCase()];
        if (hierarchylevel)
        {
            var totalOptions = data.OPTION_IDS.length;

            var allocationOptions = data.OPTION_IDS.map(function (optionId) {
                return {in_allocation_country_category_option_id: Number(optionId)}
            });

            var optionToDelete = dataHierarchyCategoryCountry.getAllocationCountryCategoryOptionLevelToDelete(data.HL2_ID, hierarchylevel, allocationOptions, userId);
            var associationDeleteCount = 0;
            if (optionToDelete.length) {
                associationDeleteCount = dataHierarchyCategoryCountry.deleteAllocationCountryCategoryOptionLevel(data.HL2_ID, hierarchylevel, allocationOptions, userId);
            }

            if (associationDeleteCount !== optionToDelete.length) {
                message = "Some options could not be removed because they are in use";
            }

            var dataInserts = [];
            for (var i = 0; i < totalOptions; i++) {

                var allocationCountryOptionLevel = dataHierarchyCategoryCountry.getAllocationCountryOptionLevelByHl2AndLevelId(data.HL2_ID, HIERARCHY_LEVEL[level.toUpperCase()], data.OPTION_IDS[i]);

                if (allocationCountryOptionLevel && allocationCountryOptionLevel.ALLOCATION_COUNTRY_CATEGORY_OPTION_LEVEL_ID) {
                    dataHierarchyCategoryCountry.updateAllocationCountryCategoryOptionLevel(
                        countriesCategory.ALLOCATION_CATEGORY_ID,
                        hierarchylevel,
                        data.OPTION_IDS[i],
                        data.IN_PROCESSING_REPORT ? 1 : 0,
                        userId,
                        data.MAKE_CATEGORY_MANDATORY ? 1 : 0);

                    var reqBody = {
                        CATEGORY_ID: countriesCategory.ALLOCATION_CATEGORY_ID,
                        HIERARCHY_LEVEL_ID: hierarchylevel,
                        MAKE_CATEGORY_MANDATORY: data.MAKE_CATEGORY_MANDATORY ? 1 : 0,
                        IN_PROCESSING_REPORT: data.IN_PROCESSING_REPORT ? 1 : 0
                    };
                    dataHierarchyCategoryCountry.updateAllocationCountryOptionFlags(reqBody);

                } else {
                    var regId = dataHierarchyCategoryCountry.insertAllocationCountryCategoryOptionLevel(
                        countriesCategory.ALLOCATION_CATEGORY_ID,
                        data.OPTION_IDS[i],
                        hierarchylevel,
                        data.IN_PROCESSING_REPORT ? 1 : 0,
                        userId,
                        data.MAKE_CATEGORY_MANDATORY ? 1 : 0);

                    var objAux = {};
                    objAux.in_hl2_id = data.HL2_ID;
                    objAux.in_allocation_country_category_option_level_id = regId;
                    objAux.in_user_id = userId;
                    dataInserts.push(objAux);
                }
                ++countInsert;
            }
            if(dataInserts.length) {
                dataHierarchyCategoryCountry.insertAllocationCountryCategoryOptionLevelHl2(dataInserts);
            }
        }

    });

    if (message) {
        return {message: message};
    }

    return countInsert;
}

function existAllocationCategoryCountryOption(optionId) {
    return Object.keys(dataHierarchyCategoryCountry.getAllocationCountryCategoryOptionById(optionId)).length;
}

function deleteCountryCategoryOptionLevel(hl2Id, userId) {
    return dataHierarchyCategoryCountry.deleteCountryCategoryOptionLevel(hl2Id, userId);
}

function checkInUseAllocationCountryCategoryById(categoryId) {
    return dataHierarchyCategoryCountry.checkInUseAllocationCountryCategoryById(categoryId);
}
