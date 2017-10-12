/***************Import Library*******************/
$.import("mktgplanningtool.services.commonLib","mapper");
var mapper = $.mktgplanningtool.services.commonLib.mapper;
var db = mapper.getdbHelper();
var ErrorLib = mapper.getErrors();
var dataInterlock = mapper.getDataInterlockOrganization();

/*************************************************/

var USER_NOT_FOUND = "The User can not be found.";
var INTERLOCK_ORGANIZATION_ID_NOT_FOUND = "The Interlock Organization ID can not be found.";
var OBJECT_NOT_FOUND = "The object Interlock Organization can not be found";
/*************************************************/

function getAllInterlockOrganization(){
	return dataInterlock.getAllInterlockOrganization();
}

function getInterlockOrganizationById(interlockOrganizationId, userId){
	if(!userId){
		throw ErrorLib.getErrors().CustomError("","interlockOrganizationService/handleGet/getInterlockOrganizationById", USER_NOT_FOUND);
	}
	if(!interlockOrganizationId){
		throw ErrorLib.getErrors().CustomError("","interlockOrganizationService/handleGet/getInterlockOrganizationById", INTERLOCK_ORGANIZATION_ID_NOT_FOUND);
	}
		
	return dataInterlock.getInterlockOrganizationById(interlockOrganizationId);
}

function insertInterlockOrganization(reqBody, userId){
	//Validate required data
	validateInterlockOrganization(reqBody, userId, "Insert");
	
	//******** Insert Interlock Organization ********//
	return dataInterlock.insertInterlockOrganization(reqBody, userId);
}

function updateInterlockOrganization(reqBody, userId){
	//Validate required data
	validateInterlockOrganization(reqBody, userId, "Update");
	
	//******** Update Interlock Organization ********//
	return dataInterlock.updateInterlockOrganization(reqBody, userId);
}

function deleteInterlockOrganization(reqBody, userId){
	if(!reqBody.INTERLOCK_ORGANIZATION_ID){
		throw ErrorLib.getErrors().CustomError("","interlockOrganizationService/handleDelete/deleteInterlockOrganization", INTERLOCK_ORGANIZATION_ID_NOT_FOUND);
	}
	
	if(!userId){
		throw ErrorLib.getErrors().CustomError("","interlockOrganizationService/handleDelete/deleteInterlockOrganization", USER_NOT_FOUND);
	}
	
	return dataInterlock.deleteInterlockOrganization(reqBody.INTERLOCK_ORGANIZATION_ID, userId);
}

function validateInterlockOrganization(reqBody, userId, type){	
	var keys = [];
	var path = "";
	
	switch(type){
	case "Insert":
		keys = ["NAME"];
		path = "interlockOrganizationService/handlePost/insertInterlockOrganization";
		break;
	case "Update":
		keys = ["INTERLOCK_ORGANIZATION_ID", "NAME"];
		path = "interlockOrganizationService/handlePut/updateInterlockOrganization";
		break;
	}
	
	if(!userId){
		throw ErrorLib.getErrors().CustomError("",path, USER_NOT_FOUND);
	}
	
	var isValid = false;
	var errors = {};
	var BreakException = {};

	if (!reqBody)
		throw ErrorLib.getErrors().CustomError("",
				path,
				OBJECT_NOT_FOUND);

	try {
		keys.forEach(function(key) {
			if (reqBody[key] === null || reqBody[key] === undefined) {
				errors[key] = null;
				throw BreakException;
			} else {
				// validate attribute type
				isValid = validateType(key, reqBody[key])
				if (!isValid) {
					errors[key] = reqBody[key];
					throw BreakException;
				}
			}
		});
		isValid = true;
	} catch (e) {
		if (e !== BreakException)
			throw ErrorLib.getErrors().CustomError("",
					path, e.toString());
		else
			throw ErrorLib.getErrors().CustomError("",
					path,
					JSON.stringify(errors));
	}
	return isValid;
}

function validateType(key, value) {
	var valid = true;
	
	switch (key) {
	case 'INTERLOCK_ORGANIZATION_ID':
		valid = !isNaN(value) && value > 0;
		break;
	case 'NAME':
		valid = value.length > 0 && value.length <= 255;
		break;
	}
	
	return valid;
}