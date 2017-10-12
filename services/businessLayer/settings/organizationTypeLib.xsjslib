/***************Import Library*******************/
$.import("mktgplanningtool.services.commonLib","mapper");
var mapper = $.mktgplanningtool.services.commonLib.mapper;
var db = mapper.getdbHelper();
var ErrorLib = mapper.getErrors();
var dataOrganizationType = mapper.getDataOrganizationType();

/*************************************************/

var USER_NOT_FOUND = "The User can not be found.";
var ORGANIZATION_TYPE_ID_NOT_FOUND = "The Organization Type ID can not be found.";
var OBJECT_NOT_FOUND = "The object Organization Type can not be found";
/*************************************************/

function getAllOrganizationType(){
	return dataOrganizationType.getAllOrganizationType();
}

function getOrganizationTypeById(organizationTypeId, userId){
	if(!userId){
		throw ErrorLib.getErrors().CustomError("","organizationTypeService/handleGet/getOrganizationTypeById", USER_NOT_FOUND);
	}
	if(!organizationTypeId){
		throw ErrorLib.getErrors().CustomError("","organizationTypeService/handleGet/getOrganizationTypeById", ORGANIZATION_TYPE_ID_NOT_FOUND);
	}
		
	return dataOrganizationType.getOrganizationTypeById(organizationTypeId);
}

function insertOrganizationType(reqBody, userId){
	//Validate required data
	validateOrganizationType(reqBody, userId, "Insert");
	
	//******** Insert Organization Type ********//
	return dataOrganizationType.insertOrganizationType(reqBody, userId);
}

function updateOrganizationType(reqBody, userId){
	//Validate required data
	validateOrganizationType(reqBody, userId, "Update");
	
	//******** Update Organization Type ********//
	return dataOrganizationType.updateOrganizationType(reqBody, userId);
}

function deleteOrganizationType(reqBody, userId){
	if(!reqBody.ORGANIZATION_TYPE_ID){
		throw ErrorLib.getErrors().CustomError("","organizationTypeService/handleDelete/deleteOrganizationType", ORGANIZATION_TYPE_ID_NOT_FOUND);
	}
	
	if(!userId){
		throw ErrorLib.getErrors().CustomError("","organizationTypeService/handleDelete/deleteOrganizationType", USER_NOT_FOUND);
	}
	
	return dataOrganizationType.deleteOrganizationType(reqBody.ORGANIZATION_TYPE_ID, userId);
}

function validateOrganizationType(reqBody, userId, type){	
	var keys = [];
	var path = "";
	
	switch(type){
	case "Insert":
		keys = ["NAME"];
		path = "organizationTypeService/handlePost/insertOrganizationType";
		break;
	case "Update":
		keys = ["ORGANIZATION_TYPE_ID", "NAME"];
		path = "organizationTypeService/handlePut/updateOrganizationType";
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
	case 'ORGANIZATION_TYPE_ID':
		valid = !isNaN(value) && value > 0;
		break;
	case 'NAME':
		valid = value.length > 0 && value.length <= 255;
		break;
	}
	
	return valid;
}