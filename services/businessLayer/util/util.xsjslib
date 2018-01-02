$.import("mktgplanningtool.services.commonLib", "mapper");
var mapper = $.mktgplanningtool.services.commonLib.mapper;
var config = mapper.getDataConfig();
var userbl = mapper.getUser();
var dataCategoryOptionLevel = mapper.getDataCategoryOptionLevel();
var dataL6DER = mapper.getDataLevel6Report();
var dataL5DER = mapper.getDataLevel5Report();
var dataCategory = mapper.getDataCategory();
// var dataUtil = mapper.getDataUtil();
/** ***********END INCLUDE LIBRARIES*************** */
function validateIsNumber(value){
	return !isNaN(value);
}

function validateIsNatural(value){
	return (validateIsNumber(value) && value >= 0);
}

function validateIsEmail(value){
	var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	 return re.test(value);
}

function validateBudget(value){
	if(!value) return false;
	return value !== 0;
}

function validateIsSapEmail(email){
	var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@sap.com$/;
	return re.test(email);
}

/********************another options**********************************/
//Minimum 8 characters at least 1 Alphabet, 1 Number and 1 Special Character://
//	"^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$"

//	Minimum 8 characters at least 1 Uppercase Alphabet, 1 Lowercase Alphabet and 1 Number://
//	"^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$"

//	Minimum 8 characters at least 1 Uppercase Alphabet, 1 Lowercase Alphabet, 1 Number and 1 Special Character:
//  "^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,}"
//	
//  Minimum 8 and Maximum 10 characters at least 1 Uppercase Alphabet, 1 Lowercase Alphabet, 1 Number and 1 Special Character:
//	"^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,10}"
/**************************************************************************/
function validateIsPassword(value){
//Minimum 6 characters at least 1 Alphabet and 1 Number:
	var re = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;
	if(! re.test(value)){
		throw ErrorLib.getErrors()
		.CustomError("", "util/validateIsPassword",
				"The PASSWORD should have minimum 6 characters at least, 1 alphabet and 1 number.");
	};
	return true;
}

function validateIsDecimal(value){
	return isNumeric(value);
}

function validateLength(value, max, min, field){
	if(!field){
		field = "";
	}
	if(max)
		if(value.length > max) throw ErrorLib.getErrors()
		.CustomError("", "util/validateLength",
		"The "+field+" value should have between "+min+" and "+max+" characters");

	if(min)
		if(value.length < min) throw ErrorLib.getErrors()
		.CustomError("", "util/validateLength",
				"The "+field+" value should have between "+min+" and "+max+" characters");
		
		
	return true;
}

function validateIsString(value){
	return (typeof value == "string");
}

function objectToArray(object){
    var array = [];
    if(object){
        Object.keys(object).forEach(function(key) {
            array.push(object[key]);
        });
    }
    return array;
}

function extractObject(object) {
	var aux = {};
		if(object){
		Object.keys(object).forEach(function(key){
			aux[key] = object[key];
		});
	}
	return aux;
}

function validateDateEndMayorStart(dateStart,dateEnd)
{
	if(dateStart>dateEnd)
	{
		return true;
	}
	return false;
}

function isAdmin(userId){
	var isA = userbl.isAdmin(userId);
	return isA;
}

function isSuperAdmin(userId){
    var isSA = false;
    if (config.getApplySuperAdminToAllInitiatives()) {
        isSA = userbl.isSuperAdmin(userId);
    }
    return isSA;
}

function getMapCategoryOption(level){
	var mapCategoryOption = {};
	var sp_result = dataCategoryOptionLevel.getAllocationCategoryOptionLevelByLevelId(level);

	for (var i = 0; i < sp_result.length; i++) {
		var obj = sp_result[i];
		
		if(!mapCategoryOption[obj.CATEGORY_ID])
			mapCategoryOption[obj.CATEGORY_ID] = {};
		
		mapCategoryOption[obj.CATEGORY_ID][obj.OPTION_ID] = obj.CATEGORY_OPTION_LEVEL_ID

	}
	return mapCategoryOption;
}

function getMapAvailableCategoryOptionByLevel(level){
    var mapCategoryOption = {};
    var sp_result = dataCategoryOptionLevel.getAllocationCategoryOptionLevelByLevelId(level);

    for (var i = 0; i < sp_result.length; i++) {
        var obj = sp_result[i];
        if(Number(obj.ENABLED) && !Number(obj.DELETED)){
            if(!mapCategoryOption[obj.CATEGORY_ID])
                mapCategoryOption[obj.CATEGORY_ID] = {};

            mapCategoryOption[obj.CATEGORY_ID][obj.OPTION_ID] = obj.CATEGORY_OPTION_LEVEL_ID
		}
    }
    return mapCategoryOption;
}

function getAllocationOptionByCategoryAndLevelId(level, hlId){
	var mapCategoryOption = {};
	var sp_result = dataCategoryOptionLevel.getAllocationOptionByCategoryAndLevelId(level, hlId);
	for (var i = 0; i < sp_result.length; i++) {
		var obj = sp_result[i];

		if(!mapCategoryOption[obj.ALLOCATION_CATEGORY_ID])
			mapCategoryOption[obj.ALLOCATION_CATEGORY_ID] = [];

		mapCategoryOption[obj.ALLOCATION_CATEGORY_ID].push(obj);

	}
	return mapCategoryOption;
}

function getMapHl6ChangedFieldsByHl6Id(hl6_id){
	var mapFields = {};
	var sp_result = dataL6DER.getL6ChangedFieldsByHl6Id(hl6_id);
	for (var i = 0; i < sp_result.length; i++) {
		var obj = sp_result[i];

		if(!mapFields[obj.column_name])
			mapFields[obj.column_name] = {};

		mapFields[obj.column_name] = [obj.hl6_crm_binding_id];
	}
	return mapFields;
}

function getMapHl5ChangedFieldsByHl5Id(hl5_id){
	var mapFields = {};
	var sp_result = dataL5DER.getL5ChangedFieldsByHl5Id(hl5_id);
	for (var i = 0; i < sp_result.length; i++) {
		var obj = sp_result[i];

		if(!mapFields[obj.column_name])
			mapFields[obj.column_name] = {};

		mapFields[obj.column_name] = [obj.hl5_crm_binding_id];
	}
	return mapFields;
}

function getCategoryById(level, hlId){
	var mapFields = {};
	var sp_result = !hlId ? dataCategory.getCategoryById(level) : dataCategory.getCategoryByLevelHlId(level, hlId);
	
	for (var i = 0; i < sp_result.length; i++) {
		var obj = sp_result[i];

		if(!mapFields[obj.CATEGORY_ID])
			mapFields[obj.CATEGORY_ID] = {};

		mapFields[obj.CATEGORY_ID] = obj;
	}
	return mapFields;


}

/*function getHash() {
    return config.getHash();
}*/

function parseAssignedUsers(assignedUsers) {
    return assignedUsers.map(function (user) {
        return user.USER_ID || user.IN_USER_ID;
    });
}

function getHierarchyLevelEnum() {
    return {
        HL1: 6,
        HL2: 5,
        HL3: 4,
        HL4: 1,
        HL5: 2,
        HL6: 3
    }
}

/**
 *
 * @param statusId - status id (current level 4 status, level 5 status, level 6 status)
 * @param statusLevel - array with all the status by level
 * @param userId
 * @param {boolean} superAdmin
 * @returns {isSuperAdmin|boolean} - true if the user is super admin or if the status is different from Create in CRM or Update in CRM
 */
function getEnableEdit(statusId, statusLevel, userId, superAdmin) {
    superAdmin = superAdmin || isSuperAdmin(userId);
	//TODO: Super admin validation added because of SAP new requirements, refactor this
	return (superAdmin || (Number(statusId) !== statusLevel.CREATE_IN_CRM && Number(statusId) !== statusLevel.UPDATE_IN_CRM));
}