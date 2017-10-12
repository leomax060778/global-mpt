/***************Import Library*******************/
$.import("mktgplanningtool.services.commonLib","mapper");
var mapper = $.mktgplanningtool.services.commonLib.mapper;
var db = mapper.getdbHelper();
var ErrorLib = mapper.getErrors();
var dataInterlock = mapper.getDataInterlockEntity();

/*************************************************/

var USER_NOT_FOUND = "The User can not be found.";
var INTERLOCK_ENTITY_ID_NOT_FOUND = "The Interlock Entity ID can not be found.";
var OBJECT_NOT_FOUND = "The object Interlock Entity can not be found";
/*************************************************/

function getAllInterlockEntity(){
	return dataInterlock.getAllInterlockEntity();
}

function getInterlockEntityById(interlockEntityId, userId){
	if(!userId){
		throw ErrorLib.getErrors().CustomError("","interlockEntityService/handleGet/getInterlockEntityById", USER_NOT_FOUND);
	}
	if(!interlockEntityId){
		throw ErrorLib.getErrors().CustomError("","interlockEntityService/handleGet/getInterlockEntityById", INTERLOCK_ENTITY_ID_NOT_FOUND);
	}
		
	return dataInterlock.getInterlockEntityById(interlockEntityId);
}

function insertInterlockEntity(reqBody, userId){
	//Validate required data
	validateInterlockEntity(reqBody, userId, "Insert");
	
	//******** Insert Interlock Entity ********//
	return dataInterlock.insertInterlockEntity(reqBody, userId);
}

function updateInterlockEntity(reqBody, userId){
	//Validate required data
	validateInterlockEntity(reqBody, userId, "Update");
	
	//******** Update Interlock Entity ********//
	return dataInterlock.updateInterlockEntity(reqBody, userId);
}

function deleteInterlockEntity(reqBody, userId){
	if(!reqBody.INTERLOCK_ENTITY_ID){
		throw ErrorLib.getErrors().CustomError("","interlockEntityService/handleDelete/deleteInterlockEntity", INTERLOCK_ENTITY_ID_NOT_FOUND);
	}
	
	if(!userId){
		throw ErrorLib.getErrors().CustomError("","interlockEntityService/handleDelete/deleteInterlockEntity", USER_NOT_FOUND);
	}
	
	return dataInterlock.deleteInterlockEntity(reqBody.INTERLOCK_ENTITY_ID, userId);
}

function validateInterlockEntity(reqBody, userId, type){	
	var keys = [];
	var path = "";
	
	switch(type){
	case "Insert":
		keys = ["NAME"];
		path = "interlockEntityService/handlePost/insertInterlockEntity";
		break;
	case "Update":
		keys = ["INTERLOCK_ENTITY_ID", "NAME"];
		path = "interlockEntityService/handlePut/updateInterlockEntity";
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
	case 'INTERLOCK_ENTITY_ID':
		valid = !isNaN(value) && value > 0;
		break;
	case 'NAME':
		valid = value.length > 0 && value.length <= 255;
		break;
	}
	
	return valid;
}