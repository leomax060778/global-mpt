/***************Import Library*******************/
$.import("mktgplanningtool.services.commonLib","mapper");
var mapper = $.mktgplanningtool.services.commonLib.mapper;
var ErrorLib = mapper.getErrors();
var dataDataProtection = mapper.getDataDataProtection();
var userLib = mapper.getUser();
var config = mapper.getDataConfig();

/** MESSAGES **/

var USER_NOT_FOUND = "The User can not be found.";
var OBJECT_NOT_FOUND = "The object User Data Protection can not be found.";
var INVALID_DATA_PROTECTION_STATUS = "Invalid User Data Protection Status.";
var CAN_NOT_UPDATE = "The Data Protection Request can not be updated.";

/** STATUS LIST **/

var USER_DATA_PROTECTION_STATUS = {
    PENDING: 1,
    APPROVED: 2,
    REJECTED: 3
};

/** GET **/

function getAllUserDataProtection() {
    return dataDataProtection.getAllUserDataProtection();
}

function getUserDataProtectionById(dataProtectionId) {
    return dataDataProtection.getUserDataProtectionById(dataProtectionId);
}


/** INSERT **/

function insertUserDataProtection(userId, userSession){
	if(!userId || !userSession){
        throw ErrorLib.getErrors().CustomError("","userService/HandlePut/updateUser",USER_NOT_FOUND);
	}
	
	return dataDataProtection.insertUserDataProtection(userId, userSession);
}

/** UPDATE **/

function updateUserDataProtectionStatus(status, userDataProtectionId, userSession){
	return dataDataProtection.updateUserDataProtectionStatus(USER_DATA_PROTECTION_STATUS[status], userDataProtectionId, userSession);
}

function updateDataProtectionStatus(reqBody, userSession){
	//Validations
	validateDataProtection(reqBody, userSession);
	
	//Update the Status assigned for the User Data Protection
	var result = updateUserDataProtectionStatus(reqBody.STATUS, reqBody.USER_DATA_PROTECTION_ID, userSession);
	
	//If succeed, then we proceed editing the User, based on the Status selected.
	if(result){
		switch(reqBody.STATUS){
		case "REJECTED":
			//Remove Data Protection Enabled from User
			updateRejectedDataProtection(reqBody.USER_ID, userSession);
			break;
		case "APPROVED":
			//Replace all information by the default Mask
			updateApprovedDataProtection(reqBody, userSession);
			break;
		default:
			throw ErrorLib.getErrors().CustomError("","userService/HandlePut/updateDataProtectionStatus", INVALID_DATA_PROTECTION_STATUS);
			break;
		}
	}
	
	return result;
}

function updateRejectedDataProtection(userId, userSession){
	return userLib.updateDataProtection(false, userId, userSession);
}

function updateApprovedDataProtection(reqBody, userSession){
	//Validation
	validateApproveDataProtection(reqBody, userSession);
	var mask = config.getDataProtectionMask();

    //Budget Spend Approver
    replaceBudgetSpendApprover(reqBody.EMAIL, userSession);
    //Interlock Contact Data
    replaceContactData(reqBody.EMAIL, userSession);
	
	var result = applyDataProtectionMask(reqBody.USER_ID, userSession);
	
	if(result){
		//L4, L5 and L6 Shopping Cart Approver
		maskShoppingCartApprover(reqBody.USER_NAME, mask, userSession);
		
		//L4, L5 and L6 Employee Responsible
		maskEmployeeResponsible(reqBody.USER_NAME, mask, userSession);

		//Interlock Contact data email list
		maskInterlockContactData(reqBody.EMAIL, mask, userSession);

	}
	
	return result;
}

function maskShoppingCartApprover(userName, mask, userSession){
	return dataDataProtection.maskShoppingCartApprover(userName, mask, userSession);
}

function maskEmployeeResponsible(userName, mask, userSession){
	return dataDataProtection.maskEmployeeResponsible(userName, mask, userSession);
}

function maskInterlockContactData(userEmail, mask, userSession){
	var result = dataDataProtection.maskInterlockContactData(userEmail, mask, userSession);

	updateInterlockReportData();

	return result;
}

function updateInterlockReportData(){
	return dataDataProtection.updateInterlockReportData();
}

function replaceBudgetSpendApprover(userEmail, userSession) {
    return dataDataProtection.replaceBudgetSpendApprover(userEmail, userSession);
}

function replaceContactData(userEmail, userSession) {
    return dataDataProtection.replaceContactData(userEmail, userSession);
}

function applyDataProtectionMask(userId, userSession){
	if(!userId || !userSession){
	       throw ErrorLib.getErrors().CustomError("","dataProtectionService/HandlePut/updateApprovedDataProtection", USER_NOT_FOUND);
	}
	
	var result = userLib.updateUserWithMask(userId, userSession);
		
	return result;
}

/** VALIDATIONS **/

function validateDataProtection(reqBody, userSession){
	if(!reqBody || !reqBody.STATUS){
		 throw ErrorLib.getErrors().CustomError("","userService/HandlePut/updateDataProtectionStatus",INVALID_DATA_PROTECTION_STATUS);
	}
	
	if(!reqBody.USER_ID || !userSession){
       throw ErrorLib.getErrors().CustomError("","userService/HandlePut/updateDataProtectionStatus",USER_NOT_FOUND);
	}
	
	if(!reqBody.USER_DATA_PROTECTION_ID){
       throw ErrorLib.getErrors().CustomError("","userService/HandlePut/updateDataProtectionStatus",OBJECT_NOT_FOUND);
	}
	
	var originalObject = getUserDataProtectionById(reqBody.USER_DATA_PROTECTION_ID);
	
	if(Number(originalObject.USER_DATA_PROTECTION_STATUS_ID) !== USER_DATA_PROTECTION_STATUS.PENDING){
		throw ErrorLib.getErrors().CustomError("","userService/HandlePut/updateDataProtectionStatus", CAN_NOT_UPDATE);
	}
}

function validateApproveDataProtection(reqBody, userSession){
	if(!reqBody.USER_ID || !userSession){
	       throw ErrorLib.getErrors().CustomError("","userService/HandlePut/updateDataProtectionStatus",USER_NOT_FOUND);
	}
	
	var keys = [];
    var isValid = false;
    var errors = {};
    var BreakException = {};

    keys = ["USER_NAME","EMAIL"];
    
    var path = "userService/HandlePut/updateApprovedDataProtection";

    if (!reqBody) {
        throw ErrorLib.getErrors().CustomError("", path, OBJECT_NOT_FOUND);
    }

    try {
        keys.forEach(function (key) {
            if (reqBody[key] === null || reqBody[key] === undefined) {
                errors[key] = null;
                throw BreakException;
            } else {
                // validate attribute type
                isValid = validateType(key, reqBody[key]);

                if (!isValid) {
                    errors[key] = reqBody[key];
                    throw BreakException;
                }
            }
        });

        isValid = true;

    } catch (e) {
        if (e !== BreakException) {
            throw ErrorLib.getErrors().CustomError("", path, e.toString());
        }

        else {
            throw ErrorLib.getErrors().CustomError("", path, JSON.stringify(errors));
        }
    }

    return isValid;
}

function validateType(key, value) {
	var valid = true;
	
	switch (key) {
	case 'USER_NAME':
	case 'EMAIL':
		valid = value.length > 0 && value.length <= 255;
		break;
	}
	
	return valid;
}