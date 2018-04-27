/***************Import Library*******************/
$.import("mktgplanningtool.services.commonLib","mapper");
var mapper = $.mktgplanningtool.services.commonLib.mapper;
var ErrorLib = mapper.getErrors();
var dataEventManagement = mapper.getDataEventManagement();
var eventRequestCategoryOption = mapper.getEventRequestCategoryOption();
var customerDemographicsLib = mapper.getCustomerDemographicsLib();
var util = mapper.getUtil();
var dataDesType = mapper.getDataDesType();
var level5Lib = mapper.getLevel5();
var mail = mapper.getMail();
/**********************************************************************/

/** MESSAGES **/

var USER_NOT_FOUND = "The User can not be found.";
var OBJECT_NOT_FOUND = "The object Event Request can not be found";
var EVENT_REQUEST_ID_NOT_FOUND = "The Event Request ID can not be found.";
var CATEGORY_NOT_EMPTY = "Category cannot be empty.";
var CATEGORY_NOT_VALID = "Category is not valid.";
var CATEGORY_TOTAL_PERCENTAGE = "Category total percentage should be equal to 100%.";
var CATEGORY_OPTION_NOT_VALID = "Option is not valid.";
var INVALID_EVENT_REQUEST_STATUS = "Invalid Event Request Status.";
var INVALID_EVENT_APPROVER = "Invalid Event Approver.";

var EVENT_REQUEST_STATUS = {
    PENDING: 1,
    APPROVED: 2,
    REJECTED: 3
};

/** GET **/

function getAllEventManagement(userId) {
    var isSuperAdmin = util.isSuperAdmin(userId) ? 1 : 0;
	var eventRequests = dataEventManagement.getAllEventRequest(userId, isSuperAdmin);
	var result = {};

    for(var i = 0; i < eventRequests.length; i++){
    	var event = eventRequests[i];

    	result[event.HL4_ID] = result[event.HL4_ID] || {
    		ID: event.HL4_ID
			, PATH: event.HL4_CRM_ID
			, CHILDREN: []
		};

    	var children = {
            EVENT_REQUEST_ID: event.EVENT_REQUEST_ID
            , EVENT_REQUEST_STATUS_ID: event.EVENT_REQUEST_STATUS_ID
            , STATUS_NAME: event.STATUS_NAME
            , HL4_ID: event.HL4_ID
            , HL5_ID: event.HL5_ID
            , NAME: event.NAME
            , START_DATE: event.START_DATE
            , ENABLE_L5_DELETION: !!event.ENABLE_L5_DELETION
            , IS_EVENT_APPROVER: !!event.IS_EVENT_APPROVER
        };

        children = setPermission(children);

        result[event.HL4_ID].CHILDREN.push(children);
	}

    return util.objectToArray(result);
}

function getAllEventRequestApproved(){
    var result = JSON.parse(JSON.stringify(dataEventManagement.getAllEventRequestApproved()));

    var customerDemographics = {};
    var eventCategories = {};

    var maxLength = result.EVENT_REQUEST_CATEGORIES_COLLECTION.length > result.EVENT_REQUEST_CUSTOMER_DEMOGRAPHICS_COLLECTION.length ?
        result.EVENT_REQUEST_CATEGORIES_COLLECTION.length :
        result.EVENT_REQUEST_CUSTOMER_DEMOGRAPHICS_COLLECTION.length;

    var customerCollection = result.EVENT_REQUEST_CUSTOMER_DEMOGRAPHICS_COLLECTION;
    var categoriesCollection = result.EVENT_REQUEST_CATEGORIES_COLLECTION;

    for(var i = 0; i < maxLength; i++){

        //Map all Customer Demographics by its Event Request ID
        if(customerCollection[i]){
            if(!customerDemographics[customerCollection[i].EVENT_REQUEST_ID]){
                customerDemographics[customerCollection[i].EVENT_REQUEST_ID] = "";
            }else{
                customerDemographics[customerCollection[i].EVENT_REQUEST_ID] += ", ";
            }

            customerDemographics[customerCollection[i].EVENT_REQUEST_ID] = customerDemographics[customerCollection[i].EVENT_REQUEST_ID] + customerCollection[i].NAME;
        }

        //Map all Categories by its Event Request ID
        if(categoriesCollection[i]){
            if(!eventCategories[categoriesCollection[i].EVENT_REQUEST_ID]){
                eventCategories[categoriesCollection[i].EVENT_REQUEST_ID] = {};
            }
            var keyName = "Category_"+ categoriesCollection[i].CATEGORY_NAME + "_" + categoriesCollection[i].OPTION_NAME;

            eventCategories[categoriesCollection[i].EVENT_REQUEST_ID][keyName] = categoriesCollection[i].PERCENTAGE;
        }
    }

    result.EVENT_REQUEST_COLLECTION.forEach(function(eventRequest){
        //Assign to all Event Requests its corresponding Customer Demographics
        eventRequest.CUSTOMER_DEMOGRAPHICS = customerDemographics[eventRequest.EVENT_REQUEST_ID] || "";

        //Assign to all Event Requests its corresponding Categories
        if(eventCategories[eventRequest.EVENT_REQUEST_ID]){
            Object.keys(eventCategories[eventRequest.EVENT_REQUEST_ID]).forEach(function(key){
                eventRequest[key] = eventCategories[eventRequest.EVENT_REQUEST_ID][key];
            });
        }
    });

    return result.EVENT_REQUEST_COLLECTION;
}

function getAllEventRequestReport(hl1Id, hl2Id, hl3Id, userId){
    var result = JSON.parse(JSON.stringify(dataEventManagement.getAllEventRequestReport(hl1Id, hl2Id, hl3Id)));

    var customerDemographics = {};
    var eventCategories = {};

    var maxLength = result.EVENT_REQUEST_CATEGORIES_COLLECTION.length > result.EVENT_REQUEST_CUSTOMER_DEMOGRAPHICS_COLLECTION.length ?
        result.EVENT_REQUEST_CATEGORIES_COLLECTION.length :
        result.EVENT_REQUEST_CUSTOMER_DEMOGRAPHICS_COLLECTION.length;

    var customerCollection = result.EVENT_REQUEST_CUSTOMER_DEMOGRAPHICS_COLLECTION;
    var categoriesCollection = result.EVENT_REQUEST_CATEGORIES_COLLECTION;

    for(var i = 0; i < maxLength; i++){

        //Map all Customer Demographics by its Event Request ID
        if(customerCollection[i]){
            if(!customerDemographics[customerCollection[i].EVENT_REQUEST_ID]){
                customerDemographics[customerCollection[i].EVENT_REQUEST_ID] = "";
            }else{
                customerDemographics[customerCollection[i].EVENT_REQUEST_ID] += ", ";
            }

            customerDemographics[customerCollection[i].EVENT_REQUEST_ID] = customerDemographics[customerCollection[i].EVENT_REQUEST_ID] + customerCollection[i].NAME;
        }

        //Map all Categories by its Event Request ID
        if(categoriesCollection[i]){
            if(!eventCategories[categoriesCollection[i].EVENT_REQUEST_ID]){
                eventCategories[categoriesCollection[i].EVENT_REQUEST_ID] = {};
            }
            var keyName = "Category_"+ categoriesCollection[i].CATEGORY_NAME + "_" + categoriesCollection[i].OPTION_NAME;

            eventCategories[categoriesCollection[i].EVENT_REQUEST_ID][keyName] = categoriesCollection[i].PERCENTAGE;
        }
    }

    var treeResult = {};

    result.EVENT_REQUEST_COLLECTION.forEach(function(eventRequest){
        //Assign to all Event Requests its corresponding Customer Demographics
        eventRequest.CUSTOMER_DEMOGRAPHICS = customerDemographics[eventRequest.EVENT_REQUEST_ID] || "";

        //Assign to all Event Requests its corresponding Categories
        if(eventCategories[eventRequest.EVENT_REQUEST_ID]){
            Object.keys(eventCategories[eventRequest.EVENT_REQUEST_ID]).forEach(function(key){
                eventRequest[key] = eventCategories[eventRequest.EVENT_REQUEST_ID][key];
            });
        }

        //Building the Tree Object with HL4 as parents
        treeResult[eventRequest.HL4_ID] = treeResult[eventRequest.HL4_ID] || {
                ID: eventRequest.HL4_ID
                , PATH: eventRequest.HL4_CRM_ID
                , CHILDREN: []
            };

        var children = eventRequest;

        children = setPermission(children);

        treeResult[eventRequest.HL4_ID].CHILDREN.push(children);
    });

    return treeResult;
}

function getEventRequestById(event_request_id){
    if (!event_request_id)
        throw ErrorLib.getErrors().BadRequest("", "", EVENT_REQUEST_ID_NOT_FOUND);

    var eventRequest = JSON.parse(JSON.stringify(dataEventManagement.getEventRequestById(event_request_id)));
    eventRequest.CATEGORIES = getEventRequestCategoryOptions(event_request_id);
    eventRequest.CUSTOMER_DEMOGRAPHICS = getEventRequestCustomerDemographicsIds(event_request_id);
    
    return eventRequest;
}

function getEventRequestCategoryOptions(event_request_id) {
    return eventRequestCategoryOption.getEventRequestCategoryOptions(event_request_id);
}

function getEventRequestCustomerDemographicsIds(event_request_id) {
    var objects = getEventRequestCustomerDemographics(event_request_id);
    var result = [];
    objects.forEach(function(elem){
    	result.push(elem.CUSTOMER_DEMOGRAPHICS_ID);
    });
    return result;
}

function getEventRequestCustomerDemographics(event_request_id) {
    return customerDemographicsLib.getEventRequestCustomerDemographics(event_request_id);
}

function getPathHl1Hl2Hl3(budgetYear, regionId){
    return dataEventManagement.getPathHl1Hl2Hl3(budgetYear, regionId);
}

function getAllHl4ByFilter(hl1_id, hl2_id, hl3_id) {
	return dataEventManagement.getAllHl4ByFilter(hl1_id, hl2_id, hl3_id);
}

/** INSERT **/
function insertEventRequest(reqBody, userId){
	validateEventRequest(reqBody, userId, "Insert");
    var desType = {AUTOMATIC_APPROVAL: 0};
    if(Number(reqBody.DES_TYPE_ID)) {
        desType = dataDesType.getDesTypeById(reqBody.DES_TYPE_ID || 0);
    }
    reqBody.EVENT_REQUEST_STATUS_ID = Number(desType.AUTOMATIC_APPROVAL) ? EVENT_REQUEST_STATUS.APPROVED : EVENT_REQUEST_STATUS.PENDING;
    reqBody.EVENT_REQUEST_ID = dataEventManagement.insertEventRequest(reqBody, userId);
	completeInsertEventRequest(reqBody, userId, Number(desType.AUTOMATIC_APPROVAL));
	return reqBody.EVENT_REQUEST_ID;
}

function completeInsertEventRequest(reqBody, userId, isApproved){
	/** INSERT CUSTOMER DEMOGRAPHICS **/
	//If there is Customer Demographics selected
	if(reqBody.CUSTOMER_DEMOGRAPHICS && reqBody.CUSTOMER_DEMOGRAPHICS.length){
		//Insert Customer demographics.
		customerDemographicsLib.insertEventRequestCustomerDemographics(reqBody.CUSTOMER_DEMOGRAPHICS, reqBody.EVENT_REQUEST_ID, userId);
	}
    insertEventRequestCategoryOption(reqBody, userId);

	if(isApproved) {
        changeStatus('APPROVED', reqBody.EVENT_REQUEST_ID, userId, isApproved);
    }

    return 1;
}

function insertEventRequestCategoryOption(reqBody, userId){
    if(reqBody.CATEGORIES && reqBody.CATEGORIES.length){
        //Insert categories.
        eventRequestCategoryOption.insertEventRequestCategoryOption(reqBody, userId);
    }
    return true;
}

/** UPDATE **/
function updateEventRequest(reqBody, userId){
	validateEventRequest(reqBody, userId, "Update");
    var desType = {AUTOMATIC_APPROVAL: 0};
    if(Number(reqBody.DES_TYPE_ID)) {
        desType = dataDesType.getDesTypeById(reqBody.DES_TYPE_ID || 0);
    }
    reqBody.EVENT_REQUEST_STATUS_ID = Number(desType.AUTOMATIC_APPROVAL) ? EVENT_REQUEST_STATUS.APPROVED : EVENT_REQUEST_STATUS.PENDING;
	var result = dataEventManagement.updateEventRequest(reqBody, userId);
	completeUpdateEventRequest(reqBody, userId, Number(desType.AUTOMATIC_APPROVAL));
	return result;
}

/*********** COMPLETE UPDATE ***********/
function completeUpdateEventRequest(reqBody, userId, isApproved){
	var customerDemographics = getEventRequestCustomerDemographicsIds(reqBody.EVENT_REQUEST_ID);

	/** UPDATE CUSTOMER DEMOGRAPHICS **/
	customerDemographicsLib.updateEventRequestCustomerDemographics
		(customerDemographics, reqBody.CUSTOMER_DEMOGRAPHICS, reqBody.EVENT_REQUEST_ID, userId);

	updateEventRequestCategoryOption(reqBody, userId);

    if(isApproved && !Number(reqBody.HL5_ID)) {
        changeStatus('APPROVED', reqBody.EVENT_REQUEST_ID, userId, isApproved);
    }

    return 1;
}

function updateEventRequestCategoryOption(reqBody, userId){
    if(reqBody.CATEGORIES && reqBody.CATEGORIES.length){
        //Insert categories.
        eventRequestCategoryOption.updateEventRequestCategoryOption(reqBody, userId);
    }
    return true;
}

function changeStatus(method, eventRequestId, userId, isAutomaticApproval){
    if(!EVENT_REQUEST_STATUS[method.toUpperCase()]){
        throw ErrorLib.getErrors().BadRequest("", "", INVALID_EVENT_REQUEST_STATUS);
    }

    if(!Number(eventRequestId)){
        throw ErrorLib.getErrors().BadRequest("", "", EVENT_REQUEST_ID_NOT_FOUND);
    }

    if(!isAutomaticApproval) {
        var eventApprover = dataEventManagement.getEventApproverByEventRequestIdUserId(eventRequestId, userId);

        if(!eventApprover){
            throw ErrorLib.getErrors().BadRequest("", "", INVALID_EVENT_APPROVER);
        }

        dataEventManagement.updateEventRequestStatus(eventRequestId, EVENT_REQUEST_STATUS[method.toUpperCase()], userId);
    }

    switch (method.toUpperCase()) {
        case 'APPROVED':
            createRelatedMarketingTactic(eventRequestId, userId);
            break;
        case 'REJECTED':
            deleteRelatedMarketingTactic(eventRequestId, userId);
            break;
    }

    return 1;
}

function createRelatedMarketingTactic(eventRequestId, userId){
    var eventRquest = getEventRequestById(eventRequestId);
    var hl5Id = level5Lib.createFromEventRequest(eventRquest);
    dataEventManagement.updateEventRequestHl5Id(eventRequestId, hl5Id, userId);
    mail.sendEventRequestApprovedNotification(hl5Id, eventRquest.CREATED_USER_ID);
    return 1;
}

function deleteRelatedMarketingTactic(eventRequestId, userId) {
    var eventRquest = dataEventManagement.getEventRequestById(eventRequestId);
    if(eventRquest.HL5_ID){
        level5Lib.deleteHl5({HL5_ID: eventRquest.HL5_ID}, userId, null, true, true);
    }
    mail.sendEventRequestRejectedNotification(eventRquest.HL5_ID, eventRquest.CREATED_USER_ID);
    return 1;
}

function setPermission(children) {
    switch (children.EVENT_REQUEST_STATUS_ID) {
        case EVENT_REQUEST_STATUS.APPROVED:
            children.ENABLE_APPROVE = false;
            children.ENABLE_REJECT = true;
            children.ENABLE_EDIT = false;
            children.ENABLE_EDIT_L5 = true;
            break;
        case EVENT_REQUEST_STATUS.REJECTED:
            children.ENABLE_APPROVE = true;
            children.ENABLE_REJECT = false;
            children.ENABLE_EDIT = false;
            children.ENABLE_EDIT_L5 = false;
            break;
        default:
            children.ENABLE_APPROVE = true;
            children.ENABLE_REJECT = true;
            children.ENABLE_EDIT = true;
            children.ENABLE_EDIT_L5 = false;
    }
    return children
}

/** VALIDATIONS **/

function validateEventRequestDataType(reqBody, type) {
    var keys = [];
    var isValid = false;
    var errors = {};
    var BreakException = {};

    keys = [
        "NAME",
        "EVENT_REQUEST_STATUS_ID",
        "HL4_ID",
        "OBJECTIVE_ID",
        "CAMPAIGN_TYPE_ID",
        "CAMPAIGN_SUB_TYPE_ID"
    ];
    var path;

    if (type === "Update") {
        path = "";
        keys.push("EVENT_REQUEST_ID");
    } else {
        path = "";
    }

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

function validateEventRequest(reqBody, userId, type){
	var isValid = false;
	if(!userId){
		throw ErrorLib.getErrors().CustomError("","", USER_NOT_FOUND);
	}

    var isValid = validateEventRequestDataType(reqBody, type) && validateCategoryOption(reqBody);

	return isValid;
}

function validateCategoryOption(data) {
    if (!data.CATEGORIES)
        throw ErrorLib.getErrors().CustomError("", "", CATEGORY_NOT_EMPTY);

    return isCategoryOptionComplete(data);
}

function isCategoryOptionComplete(data) {
    var categoryOptionComplete = false;
    for (var i = 0; i < data.CATEGORIES.length; i++) {
        var eventRequestCategory = data.CATEGORIES[i];
        var percentagePerOption = 0;
        if (!eventRequestCategory.CATEGORY_ID || !Number(eventRequestCategory.CATEGORY_ID))
            throw ErrorLib.getErrors().CustomError("", "", CATEGORY_NOT_VALID);

        if (!eventRequestCategory.OPTIONS.length)
            percentagePerOption = 100;

        eventRequestCategory.OPTIONS.forEach(function (option) {
            if (!option.OPTION_ID || !Number(option.OPTION_ID))
                throw ErrorLib.getErrors().CustomError("", "", CATEGORY_OPTION_NOT_VALID);

            if (!(option.PERCENTAGE)){
                return;
            }

            if ((parseFloat(option.PERCENTAGE) && !Number(option.PERCENTAGE)) || Number(option.PERCENTAGE) > 100 || Number(option.PERCENTAGE) < 0)
                throw ErrorLib.getErrors().CustomError("", "", "Option value is not valid (actual value " + option.PERCENTAGE + ")");

            percentagePerOption = percentagePerOption + Number(option.PERCENTAGE);
        });


        if (!Number(eventRequestCategory.MAKE_CATEGORY_MANDATORY) && (percentagePerOption === 0 || percentagePerOption === 100)) {
            categoryOptionComplete = true;
            break;
        } else if (!percentagePerOption || percentagePerOption !== 100){
            throw ErrorLib.getErrors().CustomError("", "", CATEGORY_TOTAL_PERCENTAGE);
        } else {
            categoryOptionComplete = true;
        }
    }
    return categoryOptionComplete;
}

function validateType(key, value) {
	var valid = true;
	
	switch (key) {
	case 'EVENT_REQUEST_ID':
	case 'EVENT_REQUEST_STATUS_ID':
	case 'HL4_ID':
	case 'OBJECTIVE_ID':
	case 'CAMPAIGN_TYPE_ID':
	case 'CAMPAIGN_SUB_TYPE_ID':
	case 'DES_TYPE_ID':
		valid = !isNaN(value) && value > 0;
		break;
	case 'NAME':
		valid = value.length > 0 && value.length <= 255;
		break;
	}
	
	return valid;
}

function insertEventApprover(level,hlId, eventApprovers, userId){
    var data = eventApprovers.map(function(eventApprover){
        var object = {
            in_user_id: userId,
            in_event_approver_id: eventApprover.USER_ID
        };
        object['IN_' + level.toUpperCase() + '_ID'] = hlId;
        return object;
    });

    return dataEventManagement.insertEventApprover(level, data);
}

function updateEventApprover(level,hlId, eventApprovers, userId){
    deleteEventApprover(level, hlId);
    return insertEventApprover(level,hlId, eventApprovers, userId);
}

function deleteEventApprover(level,hlId){
    return dataEventManagement.deleteEventApprover(level, hlId);
}

function getEventApproverByHlId(level, hlId, parentId) {
    return dataEventManagement.getEventApproverByHlId(level, hlId, parentId);
}

function deleteEventApproverByHlIdUserId(level,data) {
    return dataEventManagement.deleteEventApproverByHlIdUserId(level, data);
}