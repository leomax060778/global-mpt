/***************Import Library*******************/
$.import("mktgplanningtool.services.commonLib","mapper");
var mapper = $.mktgplanningtool.services.commonLib.mapper;
var ErrorLib = mapper.getErrors();
var dataCustomerDemographics = mapper.getDataCustomerDemographics();
/**********************************************************************/
/** MESSAGES **/

var NOTHING_TO_INSERT = "There is no Customer Demographics to make a relation";
var EVENT_REQUEST_NOT_EXIST = "The Event Request can not be found";
var USER_NOT_EXIST = "The User can not be found";

/** GET **/

function getAllCustomerDemographics(userId){
	return dataCustomerDemographics.getAllCustomerDemographics();
}

function getEventRequestCustomerDemographics(eventId){
	if(!eventId){
		throw ErrorLib.getErrors().CustomError("", "eventManagement/handleGet/getEventRequestCustomerDemographics", EVENT_REQUEST_NOT_EXIST);
	}
	
	return dataCustomerDemographics.getEventRequestCustomerDemographics(eventId);
}

/** INSERT **/

function insertEventRequestCustomerDemographics(arrayIds, eventId, userId){
	//Validate necessary data
	validateCustomerDemographics(arrayIds, eventId, userId, "Insert");
	
	//Build array with objects to perform the insert
	var table = [];
	arrayIds.forEach(function(customerDemographicsId){
		table.push({
			IN_EVENT_REQUEST_ID: eventId,
			IN_CUSTOMER_DEMOGRAPHICS_ID: customerDemographicsId,
			IN_CREATED_USER_ID: userId
		});
	});
	
	//Insert all the required relations
	return dataCustomerDemographics.insertEventRequestCustomerDemographics(table);
}

/** UPDATE **/

function updateEventRequestCustomerDemographics(arrayOriginalIds, arrayNewIds, eventId, userId){
	//Force number
	for(var i = 0; i < arrayOriginalIds.length; i++){
		arrayOriginalIds[i] = Number(arrayOriginalIds[i]);
	}
	for(var j = 0; j < arrayNewIds.length; j++){
		arrayNewIds[j] = Number(arrayNewIds[j]);
	}
	
	//Check for no changes
	if(!arrayOriginalIds.length && !arrayNewIds.length){
		return 1;
	}
	
	//Check for Delete All
	if(arrayOriginalIds.length && !arrayNewIds.length){
		return deleteEventRequestCustomerDemographics(arrayOriginalIds, eventId, userId);
	}
	
	//Check for Insert All
	if(!arrayOriginalIds.length && arrayNewIds.length){
		return insertEventRequestCustomerDemographics(arrayNewIds, eventId, userId);
	}
	
	//Update relations
	var idsToInsert = [];
	var idsToDelete = [];
	
	idsToInsert = arrayNewIds.filter( function( newId ) {
						return arrayOriginalIds.indexOf( newId ) < 0;
					});
	
	idsToDelete = arrayOriginalIds.filter( function( originalId ) {
		  				return arrayNewIds.indexOf( originalId ) < 0;
					});
	
	if(idsToInsert.length){
		insertEventRequestCustomerDemographics(idsToInsert, eventId, userId);
	}
	if(idsToDelete.length){
		deleteEventRequestCustomerDemographics(idsToDelete, eventId, userId);
	}
	return 1;
}

/** DELETE **/

function deleteEventRequestCustomerDemographics(arrayIds, eventId, userId){
	//Validate necessary data
	validateCustomerDemographics(arrayIds, eventId, userId, "Delete");
	
	//Build array with objects to perform the insert
	var table = [];
	arrayIds.forEach(function(customerDemographicsId){
		table.push({
			IN_EVENT_REQUEST_ID: eventId,
			IN_CUSTOMER_DEMOGRAPHICS_ID: customerDemographicsId,
			IN_MODIFIED_USER_ID: userId
		});
	});
	
	//Delete all the required relations
	return dataCustomerDemographics.deleteEventRequestCustomerDemographics(table);
}

/** VALIDATIONS **/

function validateCustomerDemographics(arrayIds, eventId, userId, type){
	var path;
	
	switch(type){
	case "Update":
		path = "eventManagement/handlePut/updateEventRequest";
		break;
	case "Insert":
		path = "eventManagement/handlePost/insertEventRequest";
		break;
	case "Delete":
		path = "eventManagement/handleDelete/deleteEventRequest";
		break;
	}
	
	if(!arrayIds || !arrayIds.length){
		throw ErrorLib.getErrors().CustomError("", path, NOTHING_TO_INSERT);
	}
	
	if(!eventId){
		throw ErrorLib.getErrors().CustomError("", path, EVENT_REQUEST_NOT_EXIST);
	}
	
	if(!userId){
		throw ErrorLib.getErrors().CustomError("", path, USER_NOT_EXIST);
	}
}	