/***************Import Library*******************/
$.import("mktgplanningtool.services.commonLib","mapper");
var mapper = $.mktgplanningtool.services.commonLib.mapper;
var db = mapper.getdbHelper();
var ErrorLib = mapper.getErrors();
var dataInterlock = mapper.getDataInterLock();

var util = mapper.getUtil();
var businessLavel3 = mapper.getLevel3();
var businessLavel2 = mapper.getLevel2();

var blRegion = mapper.getRegion();
var blSubRegion =  mapper.getSubRegion();
var orgTypeInterlockOrgLib = mapper.getOrganizationTypeInterlockOrganization();

var mail = mapper.getMail();
var mailInterlock = mapper.getInterlockMail();

var config = mapper.getDataConfig();

var userbl = mapper.getUser();
/*************************************************/

var L3_MSG_INTERLOCK_ENTITY = "Interlock entity can not be found.";
var L3_MSG_INTERLOCK_REQ_RESOURCE = "Interlock request resource and budget can not be found.";
var L3_MSG_INTERLOCK_REQ_BUDGET = "Interlock request budget can not be found.";
var L3_MSG_INTERLOCK_ORGANIZATION = "Interlock organization can not be found.";
var L3_MSG_INTERLOCK_ORGANIZATION_TYPE = "Interlock organization type can not be found.";
/*************************************************/

var INTERLOCK_STATUS = {
		NO_RESPONSE: 1,
		APPROVED: 2,
		REJECTED: 3,
		MORE_INFO: 4
};

var CONTACT_TYPE = {
		REGIONAL : 1,
		CENTRAL : 2
};

var ORGANIZATION_TYPE = {
		GLOBAL_TEAM: "Central Teams",
		REGION: "Regions",
		SUB_REGION: "Market Unit"
};

var ORGANIZATION_TYPE_ID = {
		 "Central Teams": 1,
		 "Regions": 2,
		 "Market Unit": 3
};

var ORGANIZATION_RELATED_MAP = {
	"GLOBAL": 1,
	"REGION": 2,
	"SUBREGION": 3
};
/*************************************************/

function getInterlockReport(userId){

	var isSA = false;
	if (config.getApplySuperAdminToAllInitiatives()) {
		isSA = userbl.isSuperAdmin(userId) ? 1 : 0;
	}

	var interlockReport = dataInterlock.getInterlockReport(userId, isSA);
	return interlockReport;
}

function getInterlockByHash(hash,userId){
	if(!hash)
		throw ErrorLib.getErrors().BadRequest("The hash is not found","interlockServices/handleGet/getInterlockByHash", "The hash is not found");

	var rdo = dataInterlock.getInterlockByHash(hash);

	if(rdo == null)
		throw ErrorLib.getErrors().Forbidden();
	return rdo;
};

function getInterlockById(interlockId, userId){
	if(!userId){
		throw ErrorLib.getErrors().CustomError("","interlockService/handleGet/getInterlockById", "The user can not be found.");
	}
	if(!interlockId){
		throw ErrorLib.getErrors().CustomError("","interlockService/handleGet/getInterlockById", "The interlock Id can not be found.");
	}

	var result = JSON.parse(JSON.stringify(dataInterlock.getInterlockById(interlockId)));

	var contactMap = [];
	if(result.CONTACTS && result.CONTACTS.length > 0){
		result.CONTACTS.forEach(function(contact){
			contactMap.push(contact.EMAIL);
		});

		result.INTERLOCK.CONTACT_DATA = "";
		if(contactMap.length > 0){
			result.INTERLOCK.CONTACT_DATA = contactMap.join("; ");
		}
	}

	return result.INTERLOCK;
}

function parseInterlock(result){
	//Map all the contacts based on the Interlock Request that they belong
	var contactMap = {};

	if(result.CONTACTS && result.CONTACTS.length > 0){
		result.CONTACTS.forEach(function(contact){
			if(!contactMap[contact.INTERLOCK_REQUEST_ID]){
				contactMap[contact.INTERLOCK_REQUEST_ID] = [];
			}
			contactMap[contact.INTERLOCK_REQUEST_ID].push(contact.EMAIL);
		});


	}

	//Basic JSON to return
	var interlockMap = {
		INTERLOCK: {

		}
	};

	//Map all the Interlocks based on the "FROM" Organization Name
	var interlockFromMap = {};

	result.INTERLOCKS_FROM.forEach(function(interlockFrom){
		if(!interlockFromMap[interlockFrom.ORGANIZATION_NAME]){
			interlockFromMap[interlockFrom.ORGANIZATION_NAME] = interlockFrom;
		}
		result.INTERLOCKS_TO.forEach(function(interlockTo){
			interlockTo.CONTACT_DATA = "";
			if(contactMap[interlockTo.INTERLOCK_REQUEST_ID]){
				interlockTo.CONTACT_DATA = (contactMap[interlockTo.INTERLOCK_REQUEST_ID]).join("; ");
			};

			if(!interlockFromMap[interlockFrom.ORGANIZATION_NAME].ORGANIZATION_LIST){
				interlockFromMap[interlockFrom.ORGANIZATION_NAME].ORGANIZATION_LIST = [];
			}
			//Add all "TO" children
			if(interlockFrom.INTERLOCK_REQUEST_ID === interlockTo.INTERLOCK_REQUEST_ID){
				interlockFromMap[interlockFrom.ORGANIZATION_NAME].ORGANIZATION_LIST.push(interlockTo);
			}

		});
	});

	//Add The final structure to the Basic JSON
	result.INTERLOCKS_FROM.forEach(function(element){
		//delete interlock_id to avoid its utilization in any logic
		element.INTERLOCK_REQUEST_ID = null;

		if(!interlockMap.INTERLOCK.ORGANIZATION_LIST)
			interlockMap.INTERLOCK.ORGANIZATION_LIST = [];
		if(element.ORGANIZATION_LIST){
			interlockMap.INTERLOCK.ORGANIZATION_LIST.push(element);
		}
	});

	return interlockMap;
}

function getRequestInterlockByUserId(userId){
	if(!userId){
		throw ErrorLib.getErrors().CustomError("","interlockService/handleGet/getRequestInterlockByUserId", "The user can not be found.");
	}

	var result = JSON.parse(JSON.stringify(dataInterlock.getInterlockByUserIdOriginId(userId, config.getOriginMessageInterlock().requester)));

	return parseInterlock(result);
}

function getSendInterlockByUserId(userId){
	if(!userId){
		throw ErrorLib.getErrors().CustomError("","interlockService/handleGet/getSendInterlockByUserId", "The user can not be found.");
	}

	var result = JSON.parse(JSON.stringify(dataInterlock.getInterlockByUserIdOriginId(userId, config.getOriginMessageInterlock().moneyLender)));

	return parseInterlock(result);
}


function setInterlockStatus(interlockData,userId){
	var result = 0;
	try{

		if(interlockData.status_id == INTERLOCK_STATUS.NO_RESPONSE) {

			var interlockComplete = getInterlockById(interlockData.interlock_id, userId);


			if (interlockComplete && Object.keys(interlockComplete).length > 0) {
				var contactData = dataInterlock.getContactDataByInterlockId(interlockData.interlock_id);


				contactData.forEach(function (contactData) {
					var hash= config.getHash();

					var updNumber = dataInterlock.updateContactData(contactData.INTERLOCK_CONTACT_DATA_ID, hash, userId);

					if(updNumber <= 0 )
					throw ErrorLib.getErrors().CustomError("","","The Interlock Contact Data was not found");

					dataInterlock.setInterlockStatus(interlockData.interlock_id, interlockData.status_id,interlockComplete.REQUESTER_EMAIL);

					notifyInterlockResponse(contactData.EMAIL,hash);
				});
				dataInterlock.insertInterlockMessage(interlockData.interlock_id, interlockData.message, userId, userId,config.getOriginMessageInterlock().requester);
			}


		}else{
			var interlock = getInterlockByHash(interlockData.hash);

			var objContactData = dataInterlock.getInterlockContactDataByHash(interlockData.hash);
			if(interlock.INTERLOCK_STATUS_ID == INTERLOCK_STATUS.APPROVED || interlock.INTERLOCK_STATUS_ID == INTERLOCK_STATUS.REJECTED)
				throw ErrorLib.getErrors().CustomError("","interlockServices/handlePut/setInterlockStatus", "This Interlock is already " + interlock.STATUS + ".");

			if(interlockData.status_id == INTERLOCK_STATUS.MORE_INFO && !interlockData.message)
				throw ErrorLib.getErrors().CustomError("","interlockService/handlePost/setInterlockStatus", "Message cannot be empty.");

			var requesterEmail = getRequestedUserEmail(interlockData.hash);


			dataInterlock.setInterlockStatus(interlockData.interlock_id, interlockData.status_id, requesterEmail);
			if(interlockData.status_id == INTERLOCK_STATUS.REJECTED){
				dataInterlock.insertInterlockMessage(interlockData.interlock_id, interlockData.message, interlock.CREATED_USER_ID, objContactData.INTERLOCK_CONTACT_DATA_ID,config.getOriginMessageInterlock().moneyLender);
				notifyInterlockRejected(requesterEmail, interlockData.interlock_id, interlockData.message, interlock.REQUESTED_RESOURCE);
			}

			var objIl = dataInterlock.getInterlockByHash(interlockData.hash);
			if(!objIl)
				throw ErrorLib.getErrors().CustomError("","interlockService/handlePut/setInterlockStatus", "Interlock Data cannot be null or empty.");

			//save requester email
			dataInterlock.insertInterlockLogStatus(interlockData.interlock_id, interlockData.status_id, objIl.CREATED_USER_ID, requesterEmail);




			if(interlockData.status_id == INTERLOCK_STATUS.MORE_INFO) {
				//var contactData = dataInterlock.getInterlockContactDataByHash(interlockData.hash);
				var objContactData = dataInterlock.getInterlockContactDataByHash(interlockData.hash);

				result = dataInterlock.insertInterlockMessage(interlockData.interlock_id, interlockData.message, objIl.CREATED_USER_ID,objContactData.INTERLOCK_CONTACT_DATA_ID, config.getOriginMessageInterlock().moneyLender);
				//Send email to requester to notifiy about messages to review
				notifyRequester(requesterEmail,interlockData.interlock_id, objIl.REQUESTED_RESOURCE);
			} else {
				result = dataInterlock.deactivateInterlockHash(interlockData.interlock_id, objIl.CREATED_USER_ID);
			};
		}


		db.commit();
		return result;
	} catch(e) {
		db.rollback();
		throw e;
	} finally {
		db.closeConnection();
	}
}


function getRequestedUserEmail(hash){
	var email = "";
	var objContact = dataInterlock.getInterlockContactDataByHash(hash);
	if(objContact){
		email = objContact.EMAIL;
	}
	return email;
}

function getAllEntity(userId){
	return dataInterlock.getInterlockEntity();
}

function getAllOrganizationType(){
	return dataInterlock.getInterlockOrganizationType();
}

function getOrganizationListByOrganizationRelatedId(organizationRelatedId){
	var result;

	switch(organizationRelatedId){
		case ORGANIZATION_RELATED_MAP.GLOBAL:
			var globalMap = {};

			var orgTypes = JSON.parse(JSON.stringify(orgTypeInterlockOrgLib.getOrganizationTypeForInterlockOrganization()));

			orgTypes.forEach(function(organizationType){
				globalMap[organizationType.ORGANIZATION_TYPE_ID] = orgTypeInterlockOrgLib.getInterlockOrganizationByOrganizationTypeId(organizationType.ORGANIZATION_TYPE_ID);
			});

			result = globalMap;

			break;
		case ORGANIZATION_RELATED_MAP.REGION:
			result = blRegion.getAllRegions();

			break;
		case ORGANIZATION_RELATED_MAP.SUBREGION:
			result = blSubRegion.getAllSubRegions();

			break;
		default:
			result = [];

			break;
	}

	return result;
}

function getOrganizationForAllOrganizationType(){
	var map = {};

	map[ORGANIZATION_RELATED_MAP.GLOBAL] = getOrganizationListByOrganizationRelatedId(ORGANIZATION_RELATED_MAP.GLOBAL);
	map[ORGANIZATION_RELATED_MAP.REGION] = getOrganizationListByOrganizationRelatedId(ORGANIZATION_RELATED_MAP.REGION);
	map[ORGANIZATION_RELATED_MAP.SUBREGION] = getOrganizationListByOrganizationRelatedId(ORGANIZATION_RELATED_MAP.SUBREGION);

	return map;
}

function getOrganizations(_, userId){

	var result = getOrganizationForAllOrganizationType();

	return result;
}

function getContactData(data,contactType, map){
    data = JSON.parse(JSON.stringify(data));
    data.forEach(function(object){
        var id = object.REGION_ID || object.HL2_ID;
        object.contactData = map[contactType] && map[contactType][id] ? map[contactType][id] : [];
    });
    return data;
}

function getContactDataMap(){
    var spResult = dataInterlock.getInterlockCentralRegionContacts();
    var map = {};
    for(var i = 0; i<spResult.length; i++){
    	var contactData = spResult[i];
    	if(!map[contactData.CONTACT_TYPE])
            map[contactData.CONTACT_TYPE] = {};

    	if(!map[contactData.CONTACT_TYPE][contactData.CONTACT_TYPE_ID])
    		map[contactData.CONTACT_TYPE][contactData.CONTACT_TYPE_ID] = [];

        map[contactData.CONTACT_TYPE][contactData.CONTACT_TYPE_ID].push(contactData.EMAIL);
	}
	return map;
}

function insertInterlockRequest(reqBody, userId){
	//Set Origin to requester
	reqBody.ORIGIN = config.getOriginMessageInterlock().requester;

	//******** Insert Interlock Data********//
	var resultId = insertInterlock(reqBody, userId);

	return resultId;
}

function insertInterlockSend(reqBody, userId){
	//Set Status in Approved, the default for sending interlocks
	reqBody.STATUS_ID = INTERLOCK_STATUS.APPROVED;
	//Set Origin to Sender
	reqBody.ORIGIN = config.getOriginMessageInterlock().moneyLender;

	//******** Insert Interlock Data********//
	var resultId = insertInterlock(reqBody, userId);

	return resultId;
}

function insertInterlock(reqBody, userId){
	//Obtain Organization type id
	reqBody.ORGANIZATION_TYPE_ID = ORGANIZATION_TYPE_ID[reqBody.ORGANIZATION_TYPE];
	reqBody.ORGANIZATION_TYPE_ID_FROM = ORGANIZATION_TYPE_ID[reqBody.ORGANIZATION_TYPE_FROM];

	//Validate required data
	validateInterlock(reqBody, userId);

	//******** Insert Interlock ********//
	var resultId = dataInterlock.insertInterlock(reqBody, userId);

	if(resultId){
		reqBody.INTERLOCK_REQUEST_ID = resultId;

		//******** Insert Interlock Organization based on the Organization type ********//
		if(reqBody.ORGANIZATION_TYPE_FROM === reqBody.ORGANIZATION_TYPE){

			switch (reqBody.ORGANIZATION_TYPE) {
				case ORGANIZATION_TYPE.GLOBAL_TEAM:
					dataInterlock.insertInterlockRequestInterlockOrganization(reqBody, userId);
					break;
				case ORGANIZATION_TYPE.REGION:
					dataInterlock.insertInterlockRegion(reqBody, userId);
					break;
				case ORGANIZATION_TYPE.SUB_REGION:
					dataInterlock.insertInterlockSubregion(reqBody, userId);
					break;
			}
		}else{
			var orgTypeAux = JSON.parse(JSON.stringify(reqBody));

			orgTypeAux.ORGANIZATION_FROM = null;
			orgTypeAux.ORGANIZATION_ID_FROM = null;

			//throw JSON.stringify(orgTypeAux);

			switch (orgTypeAux.ORGANIZATION_TYPE) {
				case ORGANIZATION_TYPE.GLOBAL_TEAM:
					dataInterlock.insertInterlockRequestInterlockOrganization(orgTypeAux, userId);
					break;
				case ORGANIZATION_TYPE.REGION:
					dataInterlock.insertInterlockRegion(orgTypeAux, userId);
					break;
				case ORGANIZATION_TYPE.SUB_REGION:
					dataInterlock.insertInterlockSubregion(orgTypeAux, userId);
					break;
			}

			var orgTypeFromAux = JSON.parse(JSON.stringify(reqBody));

			orgTypeFromAux.ORGANIZATION = null;
			orgTypeFromAux.ORGANIZATION_ID = null;

			//throw JSON.stringify(orgTypeFromAux);

			switch (orgTypeFromAux.ORGANIZATION_TYPE_FROM) {
				case ORGANIZATION_TYPE.GLOBAL_TEAM:
					dataInterlock.insertInterlockRequestInterlockOrganization(orgTypeFromAux, userId);
					break;
				case ORGANIZATION_TYPE.REGION:
					dataInterlock.insertInterlockRegion(orgTypeFromAux, userId);
					break;
				case ORGANIZATION_TYPE.SUB_REGION:
					dataInterlock.insertInterlockSubregion(orgTypeFromAux, userId);
					break;
			}
		}

		//******** Insert Interlock Log Status ********//
		dataInterlock.insertInterlockLogStatus(resultId, reqBody.STATUS_ID, userId, "");

		//Obtain Contact data list
		var contactEmails = reqBody.CONTACT_DATA.split(";");
        var contactData = [];
        //Format array with the Contact data
        contactEmails.forEach(function (email) {
            contactData.push({'email': email, 'hash': getSYSUUID()});
        });

        //******** Insert Interlock Contact Data ********//
        dataInterlock.insertInterlockContactData(resultId, contactData, userId);

        //******** Insert Interlock Message *******//
        dataInterlock.insertInterlockMessage(reqBody.INTERLOCK_REQUEST_ID, reqBody.REQUESTED_RESOURCE, userId, userId, reqBody.ORIGIN);

        //Send notification Email to all Contact Data
        contactData.forEach(function (contact) {
            notifyInterlockEmail(contact.email, contact.hash);
            dataInterlock.setSentMailByHash(contact.hash, userId);
        });

	}

	return resultId;
}

function updateInterlock(reqBody, userId){
    //Obtain Organization type id
    reqBody.ORGANIZATION_TYPE_ID = ORGANIZATION_TYPE_ID[reqBody.ORGANIZATION_TYPE];
    reqBody.ORGANIZATION_TYPE_ID_FROM = ORGANIZATION_TYPE_ID[reqBody.ORGANIZATION_TYPE_FROM];


    //Validate required data
    validateInterlock(reqBody, userId);
    dataInterlock.updateInterlock(reqBody, userId);
    //Delete associated Interlock messages
    dataInterlock.deleteInterlockMessagesByInterlockId(reqBody.INTERLOCK_REQUEST_ID, userId);
    //Delete associated Interlock Contact Data
    dataInterlock.deleteInterlockContactDataByInterlockId(reqBody.INTERLOCK_REQUEST_ID, userId);
    //Delete associated Interlock Route
    dataInterlock.deleteInterlockRouteByInterlockId(reqBody.INTERLOCK_REQUEST_ID, userId);
    //Delete associated Interlock Region
    dataInterlock.deleteInterlockRegionByInterlockId(reqBody.INTERLOCK_REQUEST_ID, userId);
    //Delete associated Interlock Subregion
    dataInterlock.deleteInterlockSubregionByInterlockId(reqBody.INTERLOCK_REQUEST_ID, userId);

    //******** Insert Interlock Organization based on the Organization type ********//
    if (reqBody.ORGANIZATION_TYPE_FROM === reqBody.ORGANIZATION_TYPE) {
        switch (reqBody.ORGANIZATION_TYPE) {
            case ORGANIZATION_TYPE.GLOBAL_TEAM:
                dataInterlock.insertInterlockRequestInterlockOrganization(reqBody, userId);
                break;
            case ORGANIZATION_TYPE.REGION:
                dataInterlock.insertInterlockRegion(reqBody, userId);
                break;
            case ORGANIZATION_TYPE.SUB_REGION:
                dataInterlock.insertInterlockSubregion(reqBody, userId);
                break;
        }
    } else {
        var orgTypeAux = JSON.parse(JSON.stringify(reqBody));
        orgTypeAux.ORGANIZATION_FROM = null;
        orgTypeAux.ORGANIZATION_ID_FROM = null;
        //throw JSON.stringify(orgTypeAux);
        switch (orgTypeAux.ORGANIZATION_TYPE) {
            case ORGANIZATION_TYPE.GLOBAL_TEAM:
                dataInterlock.insertInterlockRequestInterlockOrganization(orgTypeAux, userId);
                break;
            case ORGANIZATION_TYPE.REGION:
                dataInterlock.insertInterlockRegion(orgTypeAux, userId);
                break;
            case ORGANIZATION_TYPE.SUB_REGION:
                dataInterlock.insertInterlockSubregion(orgTypeAux, userId);
                break;
        }
        var orgTypeFromAux = JSON.parse(JSON.stringify(reqBody));
        orgTypeFromAux.ORGANIZATION = null;
        orgTypeFromAux.ORGANIZATION_ID = null;
        //throw JSON.stringify(orgTypeFromAux);
        switch (orgTypeFromAux.ORGANIZATION_TYPE_FROM) {
            case ORGANIZATION_TYPE.GLOBAL_TEAM:
                dataInterlock.insertInterlockRequestInterlockOrganization(orgTypeFromAux, userId);
                break;
            case ORGANIZATION_TYPE.REGION:
                dataInterlock.insertInterlockRegion(orgTypeFromAux, userId);
                break;
            case ORGANIZATION_TYPE.SUB_REGION:
                dataInterlock.insertInterlockSubregion(orgTypeFromAux, userId);
                break;
        }
    }
    //******** Insert Interlock Log Status ********//
    dataInterlock.insertInterlockLogStatus(reqBody.INTERLOCK_REQUEST_ID, reqBody.STATUS_ID, userId, "");
    //Obtain Contact data list
    var contactEmails = reqBody.CONTACT_DATA.split(";");
    var contactData = [];
    //Format array with the Contact data
    contactEmails.forEach(function (email) {
        contactData.push({'email': email, 'hash': getSYSUUID()});
    });
    //******** Insert Interlock Contact Data ********//
    dataInterlock.insertInterlockContactData(reqBody.INTERLOCK_REQUEST_ID, contactData, userId);
    //******** Insert Interlock Message *******//
    dataInterlock.insertInterlockMessage(reqBody.INTERLOCK_REQUEST_ID, reqBody.REQUESTED_RESOURCE, userId, userId, config.getOriginMessageInterlock().requester);
    //Send notification Email to all Contact Data
    contactData.forEach(function (contact) {
        notifyInterlockEmail(contact.email, contact.hash);
        dataInterlock.setSentMailByHash(contact.hash, userId);
    });
    return reqBody.INTERLOCK_REQUEST_ID;
}


function getSYSUUID() {
    var conn = $.hdb.getConnection();

    try {

        // Delete any existing token for this user
        var spUserToken = conn.loadProcedure('MKTG_PLANNING_TOOL', 'mktgplanningtool.db.procedures::GET_SYSUUID');
        var result = spUserToken();
        conn.close();

        var spResult = result['out_result'];
        if (spResult != null && spResult.length > 0) {
            var rowResult = spResult[0];
            return rowResult['SYS_UNIQUE_NUMBER'];
        }

        return null;

    } catch (e) {
        conn.close();
        throw e;
    }
}

function notifyInterlockRejected(TO, interlockId, reason, description){
	var interlockObj = {};
	interlockObj.INTERLOCK_REQUEST_ID = interlockId;
	interlockObj.DESCRIPTION = description;
	interlockObj.REASON = reason;

	var basicData = {};
    basicData.APP_URL = config.getAppUrl();
    basicData.ENVIRONMENT = config.getMailEnvironment();

	var mailObj = mailInterlock.parseNotifyRejectedInterlock(interlockObj, basicData, "Colleague");

	var mailObject = mail.getJson([{"address": TO}], mailObj.subject, mailObj.body);
	//var mailObject = mail.getJson([{"address": "iberon@folderit.net"}], mailObj.subject, mailObj.body);  //For testing only

	mail.sendMail(mailObject,true)
}

function notifyRequester(requesterEmail,interlockId, description){
	var interlockObj = {};
	interlockObj.INTERLOCK_REQUEST_ID = interlockId;
	interlockObj.DESCRIPTION = description;

	var basicData = {};
    basicData.APP_URL = config.getAppUrl();
    basicData.ENVIRONMENT = config.getMailEnvironment();

	var mailObj = mailInterlock.parseNotifyRequester(interlockObj, basicData, "Colleague");

	var mailObject = mail.getJson([{"address": requesterEmail}], mailObj.subject, mailObj.body);
	//var mailObject = mail.getJson([{"address": "iberon@folderit.net"}], mailObj.subject, mailObj.body);  //For testing only

	mail.sendMail(mailObject,true);;

}

function resendRequestEmail(interlockId, userId) {

		var requestData = dataInterlock.getContactDataByInterlockId(interlockId);

		var mailsSent = 0;
		requestData.forEach(function(contactData){
			notifyInterlockEmail(contactData.EMAIL,contactData.HASH);
			dataInterlock.setSentMailByHash(contactData.HASH, userId);
			mailsSent++;
		});
		return (requestData.length - mailsSent);
}

function notifyInterlockEmail(TO,token){
	var interlockObj = {};
	interlockObj.TOKEN = token;

	var basicData = {};
    basicData.APP_URL = config.getAppUrl();
    basicData.ENVIRONMENT = config.getMailEnvironment();

	var mailObj = mailInterlock.parseNotifyInterlock(interlockObj, basicData, "Colleague");

	var mailObject = mail.getJson([{"address": TO}], mailObj.subject, mailObj.body);
	//var mailObject = mail.getJson([{"address": "iberon@folderit.net"}], mailObj.subject, mailObj.body);  //For testing only

	mail.sendMail(mailObject,true);
}

function notifyInterlockResponse(TO,token){
	var interlockObj = {};
	interlockObj.TOKEN = token;

	var basicData = {};
    basicData.APP_URL = config.getAppUrl();
    basicData.ENVIRONMENT = config.getMailEnvironment();

    var mailObj = mailInterlock.parseNotifyInterlockResponse(interlockObj, basicData, "Colleague");

	var mailObject = mail.getJson([{"address": TO}], mailObj.subject, mailObj.body);
	//var mailObject = mail.getJson([{"address": "iberon@folderit.net"}], mailObj.subject, mailObj.body);  //For testing only

	mail.sendMail(mailObject,true);
}

function getMessagesByInterlockRequest(interlockRequestId){
	return dataInterlock.getMessagesByInterlockRequest(interlockRequestId);
}

function saveInterlockRequestMessage(interlockId, message, userId){
	return dataInterlock.insertInterlockMessage(interlockId, message, userId);
}

function deleteInterlock(reqBody, userId){
	if(!reqBody.INTERLOCK_REQUEST_ID){
		throw ErrorLib.getErrors().CustomError("","interlockService/handleDelete/deleteInterlock", "The Interlock ID can not be found.");
	}

	if(!userId){
		throw ErrorLib.getErrors().CustomError("","interlockService/handleDelete/deleteInterlock", "The user can not be found.");
	}

	var result = dataInterlock.deleteInterlock(reqBody.INTERLOCK_REQUEST_ID, userId);

	if(result){
		//Delete all messages
		dataInterlock.deleteInterlockMessagesByInterlockId(reqBody.INTERLOCK_REQUEST_ID, userId);
		//Delete associated Interlock Contact Data
		dataInterlock.deleteInterlockContactDataByInterlockId(reqBody.INTERLOCK_REQUEST_ID, userId);
		//Delete associated Interlock Route
		dataInterlock.deleteInterlockRouteByInterlockId(reqBody.INTERLOCK_REQUEST_ID, userId);
		//Delete associated Interlock Region
		dataInterlock.deleteInterlockRegionByInterlockId(reqBody.INTERLOCK_REQUEST_ID, userId);
		//Delete associated Interlock Subregion
		dataInterlock.deleteInterlockSubregionByInterlockId(reqBody.INTERLOCK_REQUEST_ID, userId);
	}

	return result;
}

function validateInterlock(reqBody, userId){
	if(!userId){
		throw ErrorLib.getErrors().CustomError("","interlockService/handlePost/insertInterlockRequest", "The user can not be found.");
	}

	var isValid = false;
	var errors = {};
	var BreakException = {};
	var keys = [ 'ORGANIZATION_TYPE',
	             'ORGANIZATION_TYPE_ID',
	             'ENTITY',
	             'ENTITY_ID',
	             'ORGANIZATION',
	             'ORGANIZATION_ID',
	             'STATUS_ID',
	             'CONTACT_DATA',
	             'REQUESTED_RESOURCE',
	             'REQUESTED_BUDGET'
	             ];

	if (!reqBody)
		throw ErrorLib.getErrors().CustomError("",
				"interlockService/handlePost/insertInterlockRequest",
				"The object Request is not found");

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
					"interlockService/handlePost/insertInterlockRequest", e.toString());
		else
			throw ErrorLib.getErrors().CustomError("",
					"interlockService/handlePost/insertInterlockRequest",
					JSON.stringify(errors));
	}
	return isValid;
}

function validateType(key, value) {
	var valid = true;

	switch (key) {
	case 'INTERLOCK_ID':
	case 'ENTITY_ID':
	case 'ORGANIZATION_ID':
	case 'ORGANIZATION_TYPE_ID':
	case 'REQUESTED_BUDGET':
	case 'STATUS_ID':
		valid = !isNaN(value) && value > 0;
		break;
	case 'ORGANIZATION_TYPE':
		valid = value.length > 0 && value.length <= 255;
		break;
	case 'ENTITY':
		valid = value.length > 0 && value.length <= 255;
		break;
	case 'ORGANIZATION':
		valid = value.length > 0 && value.length <= 255;
		break;
	case 'CONTACT_DATA':
		valid = value.length > 0 && value.length <= 255;
		break;
	case 'REQUESTED_RESOURCE':
		valid = value.length > 0 && value.length <= 140;
		break;
	case 'REQUESTED_BUDGET':
		valid = !isNaN(value) && value > 0;
		break;
	}

	return valid;
}

function getInterlockDefaults(){
    var defaultInterlockConfiguration = dataInterlock.getDefaultInterlockConfiguration();

    var result = {};
    defaultInterlockConfiguration.forEach(function(item){
    	result[item.ORIGIN_TYPE] = item;
	});
    return result;
}
function getUnformattedInterlockDefaults(){
    return dataInterlock.getDefaultInterlockConfiguration();
}