/***************Import Library*******************/
$.import("mktgplanningtool.services.commonLib","mapper");
var mapper = $.mktgplanningtool.services.commonLib.mapper;
var db = mapper.getdbHelper();
var ErrorLib = mapper.getErrors();

var dataOrgTypeInterlockOrg = mapper.getDataOrganizationTypeInterlockOrganization();
var intOrganizationLib = mapper.getInterlockOrganization();
/*************************************************/

var USER_NOT_FOUND = "The User can not be found.";
var ORGANIZATION_TYPE_ID_NOT_FOUND = "The Organization Type ID can not be found.";
var OBJECT_NOT_FOUND = "The object Organization Type can not be found";
/*************************************************/

function mapInterlockOrganization(interlockOrganizationList){
	var map = {};
	interlockOrganizationList.forEach(function(intOrg){
		map[intOrg.INTERLOCK_ORGANIZATION_ID] = intOrg;
	});
	
	return map;
}

function getOrganizationTypeForInterlockOrganization(){
	var interlockOrganization = JSON.parse(JSON.stringify(intOrganizationLib.getAllInterlockOrganization()));
	var result = JSON.parse(JSON.stringify(dataOrgTypeInterlockOrg.getOrganizationTypeForInterlockOrganization()));
	
	if(result.INTERLOCK_ORGANIZATION.length === 0){
		interlockOrganization.forEach(function(intOrg){
			intOrg.SELECTED = false;
		});
	
		result.ORGANIZATION_TYPE.forEach(function(orgType){
			orgType.INTERLOCK_ORGANIZATION_COLLECTION = interlockOrganization || [];
		});
		
	}else{
		var mapIterlockOrg = mapInterlockOrganization(result.INTERLOCK_ORGANIZATION);
		interlockOrganization.forEach(function(intOrg){
			
			result.ORGANIZATION_TYPE.forEach(function(orgType){
				intOrg = mapIterlockOrg[intOrg.INTERLOCK_ORGANIZATION_ID]? mapIterlockOrg[intOrg.INTERLOCK_ORGANIZATION_ID]: intOrg;
				intOrg.SELECTED = mapIterlockOrg[intOrg.INTERLOCK_ORGANIZATION_ID] && mapIterlockOrg[intOrg.INTERLOCK_ORGANIZATION_ID].ORGANIZATION_TYPE_ID === orgType.ORGANIZATION_TYPE_ID;
				
				if(!orgType.INTERLOCK_ORGANIZATION_COLLECTION){
					orgType.INTERLOCK_ORGANIZATION_COLLECTION = [];
				}
				
				orgType.INTERLOCK_ORGANIZATION_COLLECTION.push(intOrg);
			});
			
		});
	}
	
	
	return result.ORGANIZATION_TYPE;
}

function getInterlockOrganizationByOrganizationTypeId(organizationTypeId){
	if(!organizationTypeId){
		throw ErrorLib.getErrors().CustomError("","organizationTypeService/handleGet/getInterlockOrganizationByOrganizationTypeId", ORGANIZATION_TYPE_ID_NOT_FOUND);
	}
	
	return dataOrgTypeInterlockOrg.getInterlockOrganizationByOrganizationTypeId(organizationTypeId);
}

//**************** UPDATE *******************//
function updateMasterTable(originalData, newDataList, userId, organizationTypeId){
	var originalDataToUpdate = newDataList;
	
	if(originalData && originalData.length > 0){
		
		var organizationMap = mapInterlockOrganization(originalData);

	    var insertMasterOriginalData = [];
	    var deleteMasterOriginalData = [];


	    //INSERT & DELETE
	    originalDataToUpdate.forEach(function (newData) {
	        if (!organizationMap[newData.INTERLOCK_ORGANIZATION_ID] && newData.SELECTED) {
	            insertMasterOriginalData.push(newData);
	        }else if(organizationMap[newData.INTERLOCK_ORGANIZATION_ID] && !newData.SELECTED){
	        	deleteMasterOriginalData.push(newData);
	        }
	    });

	    //ACTIONS
	    if (insertMasterOriginalData.length > 0) {
	    	insertMasterOriginalData.forEach(function(data){
	    		data.ORGANIZATION_TYPE_ID = organizationTypeId;
	    		
	    		insertOrganizationTypeInterlockOrganization(data, userId);
	    	});
	    }

	    if (deleteMasterOriginalData.length > 0) {
	    	deleteMasterOriginalData.forEach(function(data){
	    		data.ORGANIZATION_TYPE_ID = organizationTypeId;
	    		
	    		deleteOrganizationTypeInterlockOrganization(data, userId);
	    	});
	    }
	}else{
		
		originalDataToUpdate.forEach(function (newData) {
	        if (newData.SELECTED) {
	        	newData.ORGANIZATION_TYPE_ID = organizationTypeId;
	        	
	        	insertOrganizationTypeInterlockOrganization(newData, userId);
	        }
	    });
	}
	
    
	

    return 1;
}

function updateOrganizationTypeInterlockOrganizationByOrganizationTypeId(reqBody, organizationTypeId, userId){	
	var organizations = getInterlockOrganizationByOrganizationTypeId(organizationTypeId);
	
	var result = updateMasterTable(organizations, reqBody.INTERLOCK_ORGANIZATION_COLLECTION, userId, organizationTypeId);
	
	
	return result;
}

function insertOrganizationTypeInterlockOrganization(reqBody, userId){
	//Validate required data
	validateIds(reqBody, userId, "Insert");
	
	//******** Insert in Master Table ********//
	return dataOrgTypeInterlockOrg.insertOrganizationTypeInterlockOrganization(reqBody, userId);
}

function deleteOrganizationTypeInterlockOrganization(reqBody, userId){
	if(!reqBody.ORGANIZATION_TYPE_INTERLOCK_ORGANIZATION_ID){
		throw ErrorLib.getErrors().CustomError("","organizationTypeService/handleDelete/deleteOrganizationTypeInterlockOrganization", ORGANIZATION_TYPE_ID_NOT_FOUND);
	}
	
	if(!userId){
		throw ErrorLib.getErrors().CustomError("","organizationTypeService/handleDelete/deleteOrganizationTypeInterlockOrganization", USER_NOT_FOUND);
	}
	
	return dataOrgTypeInterlockOrg.deleteOrganizationTypeInterlockOrganization(reqBody.ORGANIZATION_TYPE_INTERLOCK_ORGANIZATION_ID, userId);
}

function validateIds(reqBody, userId, type){	
	var keys = [];
	var path = "";
	
	switch(type){
	case "Insert":
		keys = ["ORGANIZATION_TYPE_ID", "INTERLOCK_ORGANIZATION_ID"];
		path = "organizationTypeService/handlePost/insertOrganizationType";
		break;
	case "Update":
		keys = ["ORGANIZATION_TYPE_INTERLOCK_ORGANIZATION_ID", "ORGANIZATION_TYPE_ID", "INTERLOCK_ORGANIZATION_ID"];
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
	case 'ORGANIZATION_TYPE_INTERLOCK_ORGANIZATION_ID':
	case 'ORGANIZATION_TYPE_ID':
	case 'INTERLOCK_ORGANIZATION_ID':
		valid = !isNaN(value) && value > 0;
		break;
	}
	
	return valid;
}