/** **** libs *********** */
$.import("mktgplanningtool.services.commonLib", "mapper");
var mapper = $.mktgplanningtool.services.commonLib.mapper;
var dataDesType = mapper.getDataDesType();
/** *************************************** */


var DES_TYPE_EXISTS = "The DES Type already exists.";
var DES_TYPE_DATA = "No data found.";
var DES_TYPE_NAME = "DES Type Name is missing.";
var DES_TYPE_ID_MISS= "DES Type ID is missing.";
var DES_TYPE_USER_MISS = "User is missing.";


function getDesType() {
    return dataDesType.getDesType();
}

function getDesTypeById(desTypeId) {
    if(!Number(desTypeId)){
        throw ErrorLib.getErrors().CustomError("", "", DES_TYPE_ID_MISS);
    }
    return dataDesType.getDesTypeById(desTypeId);
}

function getDesTypeForLegacyRecords(hierarchyLevelId){
    return dataDesType.getDesTypeForLegacyRecords(hierarchyLevelId);
}

function getParentIdsByDesTypeId(desTypeId){
    if(!desTypeId){
        throw ErrorLib.getErrors().CustomError("", "Parameter desTypeId not found.", DES_TYPE_ID_MISS);
    }

    return dataDesType.getParentIdsByDesTypeId(desTypeId);
}

function validateDesType(data) {

    // TODO Validate DES Type

    if(!data) {
        throw ErrorLib.getErrors().CustomError("", "", DES_TYPE_DATA);
    }

    if(!data.NAME || !data.NAME.trim()) {
        throw ErrorLib.getErrors().CustomError("", "", DES_TYPE_NAME);
    }
    var desType = dataDesType.getDesTypeByName(data.NAME.trim());
    if(desType && desType.DES_TYPE_ID != data.DES_TYPE_ID){
        throw ErrorLib.getErrors().CustomError("", "", DES_TYPE_EXISTS);
    }

    return true;
}

function insertDesType(data, userId) {
    validateDesType(data);
    return dataDesType.insertDesType(
        data.NAME.trim(),
        Number(data.AUTOMATIC_APPROVAL),
        userId);
}

function updateDesType(data, userId) {
    validateDesType(data);
    return dataDesType.updateDesType(
        data.DES_TYPE_ID,
        data.NAME.trim(),
        Number(data.AUTOMATIC_APPROVAL),
        userId);
}

function deleteDesType(desTypeId, userId) {
    if(!Number(desTypeId)){
        throw ErrorLib.getErrors().CustomError("", "", DES_TYPE_ID_MISS);
    }

    if(!Number(userId)){
        throw ErrorLib.getErrors().CustomError("", "", DES_TYPE_USER_MISS);
    }

    return dataDesType.deleteDesType(desTypeId, userId);
}

function insertEntity(data, userId) {
	data = parser(data);
    return insertDesType(data, userId);
}

function updateEntity(data, userId) {
	data = parser(data);
    return updateDesType(data, userId);
}

function parser(data) {
	if(!data.NAME || !data.NAME.trim()){
		data.NAME = data.IN_NAME;
	}
	if(!data.DES_TYPE_ID){
		data.DES_TYPE_ID = data.IN_DES_TYPE_ID;
	}
	if(data.AUTOMATIC_APPROVAL == undefined || data.AUTOMATIC_APPROVAL == null){
		data.AUTOMATIC_APPROVAL = data.IN_AUTOMATIC_APPROVAL;
	}
	
	return data;
}