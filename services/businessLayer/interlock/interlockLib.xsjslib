/***************Import Library*******************/
$.import("mktgplanningtool.services.commonLib", "mapper");
var mapper = $.mktgplanningtool.services.commonLib.mapper;
var db = mapper.getdbHelper();
var ErrorLib = mapper.getErrors();
var dataInterlock = mapper.getDataInterLock();
var organizationTypeLib = mapper.getOrganizationType();
var interlockEntityLib = mapper.getInterlockEntity();
var util = mapper.getUtil();
var businessLavel3 = mapper.getLevel3();
var businessLavel2 = mapper.getLevel2();

var blRegion = mapper.getRegion();
var blSubRegion = mapper.getSubRegion();
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
    REGIONAL: 1,
    CENTRAL: 2
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

var INTERLOCK_TYPE = config.getInterlockType();

/*************************************************/

function getInterlockReport(userId) {

    var isSA = false;
    if (config.getApplySuperAdminToAllInitiatives()) {
        isSA = userbl.isSuperAdmin(userId) ? 1 : 0;
    }

    var interlockReport = JSON.parse(JSON.stringify(dataInterlock.getInterlockReport(isSA, userId)));

    interlockReport.forEach(function (interlockRequest) {
    	//if(Number(interlockRequest.REQUESTED_BUDGET)){
    		interlockRequest.REQUESTED_BUDGET = util.numberToLocaleString(interlockRequest.REQUESTED_BUDGET);
    	//}
    });

    return interlockReport;
}

function getInterlockByHash(hash, userId) {
    if (!hash)
        throw ErrorLib.getErrors().BadRequest("The hash is not found", "interlockServices/handleGet/getInterlockByHash", "The hash is not found");

    var rdo = dataInterlock.getInterlockByHash(hash);

    if (rdo == null)
        throw ErrorLib.getErrors().Forbidden();
    return rdo;
}

function getInterlockById(interlockId, userId) {
    if (!userId) {
        throw ErrorLib.getErrors().CustomError("", "interlockService/handleGet/getInterlockById", "The user can not be found.");
    }
    if (!interlockId) {
        throw ErrorLib.getErrors().CustomError("", "interlockService/handleGet/getInterlockById", "The interlock Id can not be found.");
    }

    var result = JSON.parse(JSON.stringify(dataInterlock.getInterlockById(interlockId)));

    
    var Interlock = JSON.parse(JSON.stringify(result.INTERLOCK));
    Interlock.ASSOCIATED_CONTACTS = JSON.parse(JSON.stringify(result.CONTACTS));
    Interlock.AVAILABLE_CONTACTS = JSON.parse(JSON.stringify(result.AVAILABLE_CONTACTS));



    return Interlock;
}

function getRequestInterlockByEmail(email, userId) {
    if (!userId) {
        throw ErrorLib.getErrors().CustomError("", "interlockService/handleGet/getRequestInterlockByEmail", "The user can not be found.");
    }

    var result = JSON.parse(JSON.stringify(dataInterlock.getRequestInterlockByEmail(email, INTERLOCK_TYPE.REQUEST_MONEY)));

    return parseInterlock(result);
}

function parseInterlock(result) {
    //Map all the contacts based on the Interlock Request that they belong
    var contactMap = {};

    if (result.CONTACTS && result.CONTACTS.length > 0) {
        result.CONTACTS.forEach(function (contact) {
            if (!contactMap[contact.INTERLOCK_REQUEST_ID]) {
                contactMap[contact.INTERLOCK_REQUEST_ID] = [];
            }
            contactMap[contact.INTERLOCK_REQUEST_ID].push(contact.EMAIL);
        });


    }

    //Basic JSON to return
    var interlockMap = {
        INTERLOCK: {}
    };

    //Map all the Interlocks based on the "FROM" Organization Name
    var interlockFromMap = {};

    result.INTERLOCKS_FROM.forEach(function (interlockFrom) {
        if (!interlockFromMap[interlockFrom.ORGANIZATION_NAME]) {
            interlockFromMap[interlockFrom.ORGANIZATION_NAME] = interlockFrom;
        }
        result.INTERLOCKS_TO.forEach(function (interlockTo) {
            interlockTo.CONTACT_DATA = "";
            if (contactMap[interlockTo.INTERLOCK_REQUEST_ID]) {
                interlockTo.CONTACT_DATA = (contactMap[interlockTo.INTERLOCK_REQUEST_ID]).join("; ");
            }
            ;

            if (!interlockFromMap[interlockFrom.ORGANIZATION_NAME].ORGANIZATION_LIST) {
                interlockFromMap[interlockFrom.ORGANIZATION_NAME].ORGANIZATION_LIST = [];
            }
            //Add all "TO" children
            if (interlockFrom.INTERLOCK_REQUEST_ID === interlockTo.INTERLOCK_REQUEST_ID) {
                interlockFromMap[interlockFrom.ORGANIZATION_NAME].ORGANIZATION_LIST.push(interlockTo);
            }

        });
    });

    //Add The final structure to the Basic JSON
    result.INTERLOCKS_FROM.forEach(function (element) {
        //delete interlock_id to avoid its utilization in any logic
        element.INTERLOCK_REQUEST_ID = null;

        if (!interlockMap.INTERLOCK.ORGANIZATION_LIST)
            interlockMap.INTERLOCK.ORGANIZATION_LIST = [];
        if (element.ORGANIZATION_LIST) {
            interlockMap.INTERLOCK.ORGANIZATION_LIST.push(element);
        }
    });

    if(interlockMap.INTERLOCK.ORGANIZATION_LIST) {
        interlockMap.INTERLOCK.ORGANIZATION_LIST = interlockMap.INTERLOCK.ORGANIZATION_LIST.filter(function (elem) {
            return !!elem.ORGANIZATION_LIST.length
        });
    }

    return interlockMap;
}

function getRequestInterlockByUserId(userId) {
    if (!userId) {
        throw ErrorLib.getErrors().CustomError("", "interlockService/handleGet/getRequestInterlockByUserId", "The user can not be found.");
    }

    var result = JSON.parse(JSON.stringify(dataInterlock.getInterlockByUserIdOriginId(userId, INTERLOCK_TYPE.REQUEST_MONEY)));

    return parseInterlock(result);
}

function getSendInterlockByUserId(userId) {
    if (!userId) {
        throw ErrorLib.getErrors().CustomError("", "interlockService/handleGet/getSendInterlockByUserId", "The user can not be found.");
    }

    var result = JSON.parse(JSON.stringify(dataInterlock.getInterlockByUserIdOriginId(userId, INTERLOCK_TYPE.REGION_SPEND)));

    return parseInterlock(result);
}

function setInterlockStatus(interlockData, userId) {
    var result = 0;
    try {

        if (interlockData.status_id == INTERLOCK_STATUS.NO_RESPONSE) {

            var interlockComplete = getInterlockById(interlockData.interlock_id, userId);


            if (interlockComplete && Object.keys(interlockComplete).length > 0) {
                var contactData = dataInterlock.getContactDataByInterlockId(interlockData.interlock_id);


                contactData.forEach(function (contactData) {
                    var hash = config.getHash();

                    var updNumber = dataInterlock.updateContactData(contactData.INTERLOCK_CONTACT_DATA_ID, hash, userId);

                    if (updNumber <= 0)
                        throw ErrorLib.getErrors().CustomError("", "", "The Interlock Contact Data was not found");

                    dataInterlock.setInterlockStatus(interlockData.interlock_id, interlockData.status_id, interlockComplete.REQUESTER_EMAIL);

                    notifyInterlockResponse(contactData.EMAIL, hash);
                });
                dataInterlock.insertInterlockMessage(interlockData.interlock_id, interlockData.message, userId);
            }


        } else {
            var interlock = getInterlockByHash(interlockData.hash);

            var objContactData = dataInterlock.getInterlockContactDataByHash(interlockData.hash);
            if (interlock.INTERLOCK_STATUS_ID == INTERLOCK_STATUS.APPROVED || interlock.INTERLOCK_STATUS_ID == INTERLOCK_STATUS.REJECTED)
                throw ErrorLib.getErrors().CustomError("", "interlockServices/handlePut/setInterlockStatus", "This Interlock is already " + interlock.STATUS + ".");

            if (interlockData.status_id == INTERLOCK_STATUS.MORE_INFO && !interlockData.message)
                throw ErrorLib.getErrors().CustomError("", "interlockService/handlePost/setInterlockStatus", "Message cannot be empty.");

            var requesterEmail = getRequestedUserEmail(interlockData.hash);


            dataInterlock.setInterlockStatus(interlockData.interlock_id, interlockData.status_id, requesterEmail);
            if (interlockData.status_id == INTERLOCK_STATUS.REJECTED) {
                dataInterlock.insertInterlockMessage(interlockData.interlock_id, interlockData.message, interlock.CREATED_USER_ID, objContactData.INTERLOCK_CONTACT_DATA_ID);
                notifyInterlockRejected(requesterEmail, interlockData.interlock_id, interlockData.message, interlock.REQUESTED_RESOURCE);
            }

            var objIl = dataInterlock.getInterlockByHash(interlockData.hash);
            if (!objIl)
                throw ErrorLib.getErrors().CustomError("", "interlockService/handlePut/setInterlockStatus", "Interlock Data cannot be null or empty.");

            //save requester email
            dataInterlock.insertInterlockLogStatus(interlockData.interlock_id, interlockData.status_id, objIl.CREATED_USER_ID, requesterEmail);


            if (interlockData.status_id == INTERLOCK_STATUS.MORE_INFO) {
                //var contactData = dataInterlock.getInterlockContactDataByHash(interlockData.hash);
                var objContactData = dataInterlock.getInterlockContactDataByHash(interlockData.hash);

                result = dataInterlock.insertInterlockMessage(interlockData.interlock_id, interlockData.message, objIl.CREATED_USER_ID, objContactData.INTERLOCK_CONTACT_DATA_ID);
                //Send email to requester to notifiy about messages to review
                notifyRequester(requesterEmail, interlockData.interlock_id, objIl.REQUESTED_RESOURCE);
            } else {
                result = dataInterlock.deactivateInterlockHash(interlockData.interlock_id, objIl.CREATED_USER_ID);
            }
            ;
        }


        db.commit();
        return result;
    } catch (e) {
        db.rollback();
        throw e;
    } finally {
        db.closeConnection();
    }
}

function getRequestedUserEmail(hash) {
    var email = "";
    var objContact = dataInterlock.getInterlockContactDataByHash(hash);
    if (objContact) {
        email = objContact.EMAIL;
    }
    return email;
}

function getAllEntity(userId) {
    return dataInterlock.getInterlockEntity();
}

function getAllOrganizationType() {
    return dataInterlock.getInterlockOrganizationType();
}

function getOrganizationListByOrganizationRelatedId(organizationRelatedId) {
    var result;

    switch (organizationRelatedId) {
        case ORGANIZATION_RELATED_MAP.GLOBAL:
            var globalMap = {};

            var orgTypes = JSON.parse(JSON.stringify(orgTypeInterlockOrgLib.getOrganizationTypeForInterlockOrganization()));

            orgTypes.forEach(function (organizationType) {
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

function getOrganizationForAllOrganizationType() {
    var map = {};

    map[ORGANIZATION_RELATED_MAP.GLOBAL] = getOrganizationListByOrganizationRelatedId(ORGANIZATION_RELATED_MAP.GLOBAL);
    map[ORGANIZATION_RELATED_MAP.REGION] = getOrganizationListByOrganizationRelatedId(ORGANIZATION_RELATED_MAP.REGION);
    map[ORGANIZATION_RELATED_MAP.SUBREGION] = getOrganizationListByOrganizationRelatedId(ORGANIZATION_RELATED_MAP.SUBREGION);

    return map;
}

function getContactData(data, contactType, map) {
    data = JSON.parse(JSON.stringify(data));
    data.forEach(function (object) {
        var id = object.REGION_ID || object.HL2_ID;
        object.contactData = map[contactType] && map[contactType][id] ? map[contactType][id] : [];
    });
    return data;
}

function getContactDataMap() {
    var spResult = dataInterlock.getInterlockCentralRegionContacts();
    var map = {};
    for (var i = 0; i < spResult.length; i++) {
        var contactData = spResult[i];
        if (!map[contactData.CONTACT_TYPE])
            map[contactData.CONTACT_TYPE] = {};

        if (!map[contactData.CONTACT_TYPE][contactData.CONTACT_TYPE_ID])
            map[contactData.CONTACT_TYPE][contactData.CONTACT_TYPE_ID] = [];

        map[contactData.CONTACT_TYPE][contactData.CONTACT_TYPE_ID].push(contactData.EMAIL);
    }
    return map;
}

function insertInterlockRequest(reqBody, userId) {
    //Set Origin to requester
    reqBody.INTERLOCK_TYPE_ID = INTERLOCK_TYPE.REQUEST_MONEY;

    //******** Insert Interlock Data********//
    var resultId = insertInterlock(reqBody, userId);

    return resultId;
}

function insertInterlockSend(reqBody, userId) {
    //Set Status in Approved, the default for sending interlocks
    reqBody.STATUS_ID = INTERLOCK_STATUS.APPROVED;
    //Set Origin to Sender
    // reqBody.ORIGIN = config.getOriginMessageInterlock().moneyLender;
    reqBody.INTERLOCK_TYPE_ID = INTERLOCK_TYPE.REGION_SPEND;
    //******** Insert Interlock Data********//
    var resultId = insertInterlock(reqBody, userId);

    return resultId;
}

function insertInterlock(reqBody, userId) {
	
    //Validate required data
    validateInterlock(reqBody, userId);

    //******** Insert Interlock ********//
    var resultId = dataInterlock.insertInterlock(reqBody, userId);

    if (resultId) {
        reqBody.INTERLOCK_REQUEST_ID = resultId;

        //******** Insert Interlock From and To relations ********//
        var interlockOrganizationTypeFromId = dataInterlock.insertInterlockOrganizationTypeFrom(reqBody, userId);
        var interlockOrganizationTypeToId = dataInterlock.insertInterlockOrganizationTypeTo(reqBody, userId);

        if (!interlockOrganizationTypeFromId || !interlockOrganizationTypeToId) {
            throw ErrorLib.getErrors().CustomError("", "interlockService/handlePost/insertInterlock", "The Interlock Organization relation can not be done.");
        }

        //******** Insert Interlock Log Status ********//
        dataInterlock.insertInterlockLogStatus(resultId, reqBody.STATUS_ID, userId, "");

        //Obtain Contact data list
        var contactEmails = reqBody.ASSOCIATED_CONTACTS;
        var contactData = [];
        //Format array with the Contact data
        contactEmails.forEach(function (email) {
            contactData.push({'email': email.EMAIL, 'hash': getSYSUUID()});
        });

        //******** Insert Interlock Contact Data ********//
        dataInterlock.insertInterlockContactData(resultId, contactData, userId);

        //******** Insert Interlock Message *******//
        dataInterlock.insertInterlockMessage(reqBody.INTERLOCK_REQUEST_ID, reqBody.REQUESTED_RESOURCE, userId);

        //Send notification Email to all Contact Data
        contactData.forEach(function (contact) {
            notifyInterlockEmail(contact.email, contact.hash);
            dataInterlock.setSentMailByHash(contact.hash, userId);
        });

    }

    return resultId;
}

function updateInterlock(reqBody, userId) {
    //Obtain Organization type id
    reqBody.ORGANIZATION_TYPE_ID = ORGANIZATION_TYPE_ID[reqBody.ORGANIZATION_TYPE];
    reqBody.ORGANIZATION_TYPE_ID_FROM = ORGANIZATION_TYPE_ID[reqBody.ORGANIZATION_TYPE_FROM];

    //Validate required data
    validateInterlock(reqBody, userId);
    dataInterlock.updateInterlock(reqBody, userId);
    dataInterlock.updateInterlockOrganizationTypeFrom(reqBody, userId);
    dataInterlock.updateInterlockOrganizationTypeTo(reqBody, userId);
    //Delete associated Interlock Contact Data
    dataInterlock.deleteHardInterlockContactDataByInterlockId(reqBody.INTERLOCK_REQUEST_ID);

    //******** Insert Interlock Log Status ********//
    dataInterlock.insertInterlockLogStatus(reqBody.INTERLOCK_REQUEST_ID, reqBody.STATUS_ID, userId, "");
    //Obtain Contact data list
    var contactEmails = reqBody.ASSOCIATED_CONTACTS;//reqBody.CONTACT_DATA.split(";");
    var contactData = [];
    //Format array with the Contact data
    contactEmails.forEach(function (email) {
        contactData.push({'email': email.EMAIL, 'hash': getSYSUUID()});
    });

    //******** Insert Interlock Contact Data ********//
    dataInterlock.insertInterlockContactData(reqBody.INTERLOCK_REQUEST_ID, contactData, userId);

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

function notifyInterlockRejected(TO, interlockId, reason, description) {
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

    mail.sendMail(mailObject, true)
}

function notifyRequester(requesterEmail, interlockId, description) {
    var interlockObj = {};
    interlockObj.INTERLOCK_REQUEST_ID = interlockId;
    interlockObj.DESCRIPTION = description;

    var basicData = {};
    basicData.APP_URL = config.getAppUrl();
    basicData.ENVIRONMENT = config.getMailEnvironment();

    var mailObj = mailInterlock.parseNotifyRequester(interlockObj, basicData, "Colleague");

    var mailObject = mail.getJson([{"address": requesterEmail}], mailObj.subject, mailObj.body);
    //var mailObject = mail.getJson([{"address": "iberon@folderit.net"}], mailObj.subject, mailObj.body);  //For testing only

    mail.sendMail(mailObject, true);

}

function resendRequestEmail(interlockId, userId) {

    var requestData = dataInterlock.getContactDataByInterlockId(interlockId);

    var mailsSent = 0;
    requestData.forEach(function (contactData) {
        notifyInterlockEmail(contactData.EMAIL, contactData.HASH);
        dataInterlock.setSentMailByHash(contactData.HASH, userId);
        mailsSent++;
    });
    return (requestData.length - mailsSent);
}

function notifyInterlockEmail(TO, token) {
    var interlockObj = {};
    interlockObj.TOKEN = token;

    var basicData = {};
    basicData.APP_URL = config.getAppUrl();
    basicData.ENVIRONMENT = config.getMailEnvironment();

    var mailObj = mailInterlock.parseNotifyInterlock(interlockObj, basicData, "Colleague");

    var mailObject = mail.getJson([{"address": TO}], mailObj.subject, mailObj.body);
    //var mailObject = mail.getJson([{"address": "iberon@folderit.net"}], mailObj.subject, mailObj.body);  //For testing only

    mail.sendMail(mailObject, true);
}

function notifyInterlockResponse(TO, token) {
    var interlockObj = {};
    interlockObj.TOKEN = token;

    var basicData = {};
    basicData.APP_URL = config.getAppUrl();
    basicData.ENVIRONMENT = config.getMailEnvironment();

    var mailObj = mailInterlock.parseNotifyInterlockResponse(interlockObj, basicData, "Colleague");

    var mailObject = mail.getJson([{"address": TO}], mailObj.subject, mailObj.body);
    //var mailObject = mail.getJson([{"address": "iberon@folderit.net"}], mailObj.subject, mailObj.body);  //For testing only

    mail.sendMail(mailObject, true);
}

function getMessagesByInterlockRequest(interlockRequestId) {
    return dataInterlock.getMessagesByInterlockRequest(interlockRequestId);
}

function saveInterlockRequestMessage(interlockId, message, userId) {
    return dataInterlock.insertInterlockMessage(interlockId, message, userId);
}

function deleteInterlock(reqBody, userId) {
    if (!reqBody.INTERLOCK_REQUEST_ID) {
        throw ErrorLib.getErrors().CustomError("", "interlockService/handleDelete/deleteInterlock", "The Interlock ID can not be found.");
    }

    if (!userId) {
        throw ErrorLib.getErrors().CustomError("", "interlockService/handleDelete/deleteInterlock", "The user can not be found.");
    }

    //Delete all messages
    dataInterlock.deleteInterlockMessagesByInterlockId(reqBody.INTERLOCK_REQUEST_ID, userId);
    //Delete associated Interlock Contact Data
    dataInterlock.deleteInterlockContactDataByInterlockId(reqBody.INTERLOCK_REQUEST_ID, userId);

    dataInterlock.deleteInterlockOrganizationTypeFrom(reqBody.INTERLOCK_REQUEST_ID, userId);

    dataInterlock.deleteInterlockOrganizationTypeTo(reqBody.INTERLOCK_REQUEST_ID, userId);

    return dataInterlock.deleteInterlock(reqBody.INTERLOCK_REQUEST_ID, userId);
}

function validateInterlock(reqBody, userId) {
    if (!userId) {
        throw ErrorLib.getErrors().CustomError("", "interlockService/handlePost/insertInterlockRequest", "The user can not be found.");
    }

    var isValid = false;
    var errors = {};
    var BreakException = {};
    var keys = [
        'STATUS_ID',
        'REQUESTED_RESOURCE',
        'REQUESTED_BUDGET'
    ];

    if (!reqBody)
        throw ErrorLib.getErrors().CustomError("",
            "interlockService/handlePost/insertInterlockRequest",
            "The object Request is not found");

    try {
        keys.forEach(function (key) {
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
    }

    return valid;
}

function getInterlockDefaults() {
    var result = {};
    var organizationTypeList = JSON.parse(JSON.stringify(organizationTypeLib.getAllOrganizationType()));
    var interlockEntities = JSON.parse(JSON.stringify(interlockEntityLib.getAllInterlockEntity()));
    var interlockDefaultConfiguration = JSON.parse(JSON.stringify(dataInterlock.getDefaultInterlockConfiguration()));

    interlockDefaultConfiguration.defaultConfiguration.forEach(function (interlockType) {
        result[interlockType.INTERLOCK_TYPE] = {
            INTERLOCK_TYPE_ID: interlockType.INTERLOCK_TYPE_ID,
            ENTITY_FROM: {},
            ENTITY_TO: {},
            ORGANIZATION_TYPE_FROM: {},
            ORGANIZATION_TYPE_TO: {},
            ORGANIZATIONS: getOrganizationForAllOrganizationType()
        };

        if (!!Number(interlockType.ENABLE_DEFAULT_SELECTION)) {
            interlockEntities.forEach(function (elem) {
                interlockDefaultConfiguration.entityFrom.forEach(function (entity) {
                    if (entity.INTERLOCK_TYPE_ID == interlockType.INTERLOCK_TYPE_ID && elem.INTERLOCK_ENTITY_ID == entity.ENTITY_ID) {
                        result[interlockType.INTERLOCK_TYPE].ENTITY_FROM[elem.INTERLOCK_ENTITY_ID] =
                            {
                                INTERLOCK_ENTITY_ID: elem.INTERLOCK_ENTITY_ID,
                                NAME: elem.NAME.trim()
                            };
                    }
                });
            });
            interlockEntities.forEach(function (elem) {
                interlockDefaultConfiguration.entityTo.forEach(function (entity) {
                    if (entity.INTERLOCK_TYPE_ID == interlockType.INTERLOCK_TYPE_ID && elem.INTERLOCK_ENTITY_ID == entity.ENTITY_ID) {
                        result[interlockType.INTERLOCK_TYPE].ENTITY_TO[elem.INTERLOCK_ENTITY_ID] =
                            {
                                INTERLOCK_ENTITY_ID: elem.INTERLOCK_ENTITY_ID,
                                NAME: elem.NAME.trim()
                            };
                    }
                });
            });
            organizationTypeList.forEach(function (elem) {
                interlockDefaultConfiguration.organizationTypeFrom.forEach(function (entity) {
                    if (entity.INTERLOCK_TYPE_ID == interlockType.INTERLOCK_TYPE_ID && elem.ORGANIZATION_TYPE_ID == entity.ORGANIZATION_TYPE_ID) {
                        result[interlockType.INTERLOCK_TYPE].ORGANIZATION_TYPE_FROM[elem.ORGANIZATION_TYPE_ID] =
                            {
                                ORGANIZATION_TYPE_ID: elem.ORGANIZATION_TYPE_ID,
                                NAME: elem.NAME.trim(),
                                ORGANIZATION_RELATED_ID: elem.ORGANIZATION_RELATED_ID
                            };
                    }
                });
            });
            organizationTypeList.forEach(function (elem) {
                interlockDefaultConfiguration.organizationTypeTo.forEach(function (entity) {
                    if (entity.INTERLOCK_TYPE_ID == interlockType.INTERLOCK_TYPE_ID && elem.ORGANIZATION_TYPE_ID == entity.ORGANIZATION_TYPE_ID) {
                        result[interlockType.INTERLOCK_TYPE].ORGANIZATION_TYPE_TO[elem.ORGANIZATION_TYPE_ID] =
                            {
                                ORGANIZATION_TYPE_ID: elem.ORGANIZATION_TYPE_ID,
                                NAME: elem.NAME.trim(),
                                ORGANIZATION_RELATED_ID: elem.ORGANIZATION_RELATED_ID
                            };
                    }
                });
            });
        } else {
            interlockEntities.forEach(function (elem) {
                        result[interlockType.INTERLOCK_TYPE].ENTITY_FROM[elem.INTERLOCK_ENTITY_ID] =
                            {
                                INTERLOCK_ENTITY_ID: elem.INTERLOCK_ENTITY_ID,
                                NAME: elem.NAME.trim()
                            };
            });
            interlockEntities.forEach(function (elem) {
                        result[interlockType.INTERLOCK_TYPE].ENTITY_TO[elem.INTERLOCK_ENTITY_ID] =
                            {
                                INTERLOCK_ENTITY_ID: elem.INTERLOCK_ENTITY_ID,
                                NAME: elem.NAME.trim()
                            };
            });
            organizationTypeList.forEach(function (elem) {
                        result[interlockType.INTERLOCK_TYPE].ORGANIZATION_TYPE_FROM[elem.ORGANIZATION_TYPE_ID] =
                            {
                                ORGANIZATION_TYPE_ID: elem.ORGANIZATION_TYPE_ID,
                                NAME: elem.NAME.trim(),
                                ORGANIZATION_RELATED_ID: elem.ORGANIZATION_RELATED_ID
                            };
            });
            organizationTypeList.forEach(function (elem) {
                        result[interlockType.INTERLOCK_TYPE].ORGANIZATION_TYPE_TO[elem.ORGANIZATION_TYPE_ID] =
                            {
                                ORGANIZATION_TYPE_ID: elem.ORGANIZATION_TYPE_ID,
                                NAME: elem.NAME.trim(),
                                ORGANIZATION_RELATED_ID: elem.ORGANIZATION_RELATED_ID
                            };
            });
        }
        result[interlockType.INTERLOCK_TYPE].ENTITY_FROM = util.objectToArray(result[interlockType.INTERLOCK_TYPE].ENTITY_FROM);
        result[interlockType.INTERLOCK_TYPE].ENTITY_TO = util.objectToArray(result[interlockType.INTERLOCK_TYPE].ENTITY_TO);
        result[interlockType.INTERLOCK_TYPE].ORGANIZATION_TYPE_FROM = util.objectToArray(result[interlockType.INTERLOCK_TYPE].ORGANIZATION_TYPE_FROM);
        result[interlockType.INTERLOCK_TYPE].ORGANIZATION_TYPE_TO = util.objectToArray(result[interlockType.INTERLOCK_TYPE].ORGANIZATION_TYPE_TO);
    });

    return util.objectToArray(result);
}

function getUnformattedInterlockDefaults() {
    var result = {};
    var organizationTypeList = JSON.parse(JSON.stringify(organizationTypeLib.getAllOrganizationType()));
    var interlockEntities = JSON.parse(JSON.stringify(interlockEntityLib.getAllInterlockEntity()));
    var interlockDefaultConfiguration = JSON.parse(JSON.stringify(dataInterlock.getDefaultInterlockConfiguration()));
    interlockDefaultConfiguration.defaultConfiguration.forEach(function (interlockType) {
        result[interlockType.INTERLOCK_TYPE] = {
            INTERLOCK_TYPE: interlockType.INTERLOCK_TYPE,
            INTERLOCK_TYPE_ID: interlockType.INTERLOCK_TYPE_ID,
            INTERLOCK_DEFAULT_CONFIGURATION_ID: interlockType.INTERLOCK_DEFAULT_CONFIGURATION_ID,
            INTERLOCK_DEFAULTS: {
                ENABLE_DEFAULT_SELECTION: interlockType.ENABLE_DEFAULT_SELECTION,
                ENTITY_FROM: {},
                ENTITY_TO: {},
                ORGANIZATION_TYPE_FROM: {},
                ORGANIZATION_TYPE_TO: {}
            }
        };
        if(!!Number(interlockType.ENABLE_DEFAULT_SELECTION)){
        interlockEntities.forEach(function (elem) {
            if (!interlockDefaultConfiguration.entityFrom || !interlockDefaultConfiguration.entityFrom.length) {
                result[interlockType.INTERLOCK_TYPE].INTERLOCK_DEFAULTS.ENTITY_FROM[elem.INTERLOCK_ENTITY_ID] =
                    {
                        INTERLOCK_ENTITY_ID: elem.INTERLOCK_ENTITY_ID,
                        NAME: elem.NAME,
                        SELECTED: false
                    }
            } else {
                interlockDefaultConfiguration.entityFrom.forEach(function (entity) {
                    if (entity.INTERLOCK_TYPE_ID == interlockType.INTERLOCK_TYPE_ID) {
                        if (!result[interlockType.INTERLOCK_TYPE].INTERLOCK_DEFAULTS.ENTITY_FROM[elem.INTERLOCK_ENTITY_ID]) {
                            result[interlockType.INTERLOCK_TYPE].INTERLOCK_DEFAULTS.ENTITY_FROM[elem.INTERLOCK_ENTITY_ID] =
                                {
                                    INTERLOCK_ENTITY_ID: elem.INTERLOCK_ENTITY_ID,
                                    NAME: elem.NAME,
                                    SELECTED: elem.INTERLOCK_ENTITY_ID == entity.ENTITY_ID
                                }
                        } else {
                            var object = result[interlockType.INTERLOCK_TYPE].INTERLOCK_DEFAULTS.ENTITY_FROM[elem.INTERLOCK_ENTITY_ID];
                            object.SELECTED = object.SELECTED || (elem.INTERLOCK_ENTITY_ID == entity.ENTITY_ID);
                            result[interlockType.INTERLOCK_TYPE].INTERLOCK_DEFAULTS.ENTITY_FROM[elem.INTERLOCK_ENTITY_ID] = object;
                        }
                    }
                });
            }
        });
        interlockEntities.forEach(function (elem) {
            if (!interlockDefaultConfiguration.entityTo || !interlockDefaultConfiguration.entityTo.length) {
                result[interlockType.INTERLOCK_TYPE].INTERLOCK_DEFAULTS.ENTITY_TO[elem.INTERLOCK_ENTITY_ID] =
                    {
                        INTERLOCK_ENTITY_ID: elem.INTERLOCK_ENTITY_ID,
                        NAME: elem.NAME,
                        SELECTED: false
                    }
            } else {
                interlockDefaultConfiguration.entityTo.forEach(function (entity) {
                    if (entity.INTERLOCK_TYPE_ID == interlockType.INTERLOCK_TYPE_ID) {
                        if (!result[interlockType.INTERLOCK_TYPE].INTERLOCK_DEFAULTS.ENTITY_TO[elem.INTERLOCK_ENTITY_ID]) {
                            result[interlockType.INTERLOCK_TYPE].INTERLOCK_DEFAULTS.ENTITY_TO[elem.INTERLOCK_ENTITY_ID] =
                                {
                                    INTERLOCK_ENTITY_ID: elem.INTERLOCK_ENTITY_ID,
                                    NAME: elem.NAME,
                                    SELECTED: elem.INTERLOCK_ENTITY_ID == entity.ENTITY_ID
                                }
                        } else {
                            var object = result[interlockType.INTERLOCK_TYPE].INTERLOCK_DEFAULTS.ENTITY_TO[elem.INTERLOCK_ENTITY_ID];
                            object.SELECTED = object.SELECTED || (elem.INTERLOCK_ENTITY_ID == entity.ENTITY_ID);
                            result[interlockType.INTERLOCK_TYPE].INTERLOCK_DEFAULTS.ENTITY_TO[elem.INTERLOCK_ENTITY_ID] = object;
                        }
                    }
                });
            }
        });
        organizationTypeList.forEach(function (elem) {
            if (!interlockDefaultConfiguration.organizationTypeFrom || !interlockDefaultConfiguration.organizationTypeFrom.length) {
                result[interlockType.INTERLOCK_TYPE].INTERLOCK_DEFAULTS.ORGANIZATION_TYPE_FROM[elem.ORGANIZATION_TYPE_ID] =
                    {
                        ORGANIZATION_TYPE_ID: elem.ORGANIZATION_TYPE_ID,
                        NAME: elem.NAME,
                        SELECTED: false
                    }
            } else {
                interlockDefaultConfiguration.organizationTypeFrom.forEach(function (entity) {
                    if (entity.INTERLOCK_TYPE_ID == interlockType.INTERLOCK_TYPE_ID) {
                        if (!result[interlockType.INTERLOCK_TYPE].INTERLOCK_DEFAULTS.ORGANIZATION_TYPE_FROM[elem.ORGANIZATION_TYPE_ID]) {
                            result[interlockType.INTERLOCK_TYPE].INTERLOCK_DEFAULTS.ORGANIZATION_TYPE_FROM[elem.ORGANIZATION_TYPE_ID] =
                                {
                                    ORGANIZATION_TYPE_ID: elem.ORGANIZATION_TYPE_ID,
                                    NAME: elem.NAME,
                                    SELECTED: elem.ORGANIZATION_TYPE_ID == entity.ORGANIZATION_TYPE_ID
                                }
                        } else {
                            var object = result[interlockType.INTERLOCK_TYPE].INTERLOCK_DEFAULTS.ORGANIZATION_TYPE_FROM[elem.ORGANIZATION_TYPE_ID];
                            object.SELECTED = object.SELECTED || (elem.ORGANIZATION_TYPE_ID == entity.ORGANIZATION_TYPE_ID);
                            result[interlockType.INTERLOCK_TYPE].INTERLOCK_DEFAULTS.ORGANIZATION_TYPE_FROM[elem.ORGANIZATION_TYPE_ID] = object;
                        }
                    }
                });
            }
        });
        organizationTypeList.forEach(function (elem) {
            if (!interlockDefaultConfiguration.organizationTypeTo || !interlockDefaultConfiguration.organizationTypeTo.length) {
                result[interlockType.INTERLOCK_TYPE].INTERLOCK_DEFAULTS.ORGANIZATION_TYPE_TO[elem.ORGANIZATION_TYPE_ID] =
                    {
                        ORGANIZATION_TYPE_ID: elem.ORGANIZATION_TYPE_ID,
                        NAME: elem.NAME,
                        SELECTED: false
                    }
            } else {
                interlockDefaultConfiguration.organizationTypeTo.forEach(function (entity) {
                    if (entity.INTERLOCK_TYPE_ID == interlockType.INTERLOCK_TYPE_ID) {
                        if (!result[interlockType.INTERLOCK_TYPE].INTERLOCK_DEFAULTS.ORGANIZATION_TYPE_TO[elem.ORGANIZATION_TYPE_ID]) {
                            result[interlockType.INTERLOCK_TYPE].INTERLOCK_DEFAULTS.ORGANIZATION_TYPE_TO[elem.ORGANIZATION_TYPE_ID] =
                                {
                                    ORGANIZATION_TYPE_ID: elem.ORGANIZATION_TYPE_ID,
                                    NAME: elem.NAME,
                                    SELECTED: elem.ORGANIZATION_TYPE_ID == entity.ORGANIZATION_TYPE_ID
                                }
                        } else {
                            var object = result[interlockType.INTERLOCK_TYPE].INTERLOCK_DEFAULTS.ORGANIZATION_TYPE_TO[elem.ORGANIZATION_TYPE_ID];
                            object.SELECTED = object.SELECTED || (elem.ORGANIZATION_TYPE_ID == entity.ORGANIZATION_TYPE_ID);
                            result[interlockType.INTERLOCK_TYPE].INTERLOCK_DEFAULTS.ORGANIZATION_TYPE_TO[elem.ORGANIZATION_TYPE_ID] = object;
                        }
                    }
                });
            }
        });
    } else {
            interlockEntities.forEach(function (elem) {
                result[interlockType.INTERLOCK_TYPE].INTERLOCK_DEFAULTS.ENTITY_FROM[elem.INTERLOCK_ENTITY_ID] =
                    {
                        INTERLOCK_ENTITY_ID: elem.INTERLOCK_ENTITY_ID,
                        NAME: elem.NAME,
                        SELECTED: false
                    };
            });
            interlockEntities.forEach(function (elem) {
                result[interlockType.INTERLOCK_TYPE].INTERLOCK_DEFAULTS.ENTITY_TO[elem.INTERLOCK_ENTITY_ID] =
                    {
                        INTERLOCK_ENTITY_ID: elem.INTERLOCK_ENTITY_ID,
                        NAME: elem.NAME,
                        SELECTED: false
                    };
            });
            organizationTypeList.forEach(function (elem) {
                result[interlockType.INTERLOCK_TYPE].INTERLOCK_DEFAULTS.ORGANIZATION_TYPE_FROM[elem.ORGANIZATION_TYPE_ID] =
                    {
                        ORGANIZATION_TYPE_ID: elem.ORGANIZATION_TYPE_ID,
                        NAME: elem.NAME,
                        SELECTED: false
                    };
            });
            organizationTypeList.forEach(function (elem) {
                result[interlockType.INTERLOCK_TYPE].INTERLOCK_DEFAULTS.ORGANIZATION_TYPE_TO[elem.ORGANIZATION_TYPE_ID] =
                    {
                        ORGANIZATION_TYPE_ID: elem.ORGANIZATION_TYPE_ID,
                        NAME: elem.NAME,
                        SELECTED: false
                    };
            });
        }
        result[interlockType.INTERLOCK_TYPE].INTERLOCK_DEFAULTS.ENTITY_FROM = util.objectToArray(result[interlockType.INTERLOCK_TYPE].INTERLOCK_DEFAULTS.ENTITY_FROM);
        result[interlockType.INTERLOCK_TYPE].INTERLOCK_DEFAULTS.ENTITY_TO = util.objectToArray(result[interlockType.INTERLOCK_TYPE].INTERLOCK_DEFAULTS.ENTITY_TO);
        result[interlockType.INTERLOCK_TYPE].INTERLOCK_DEFAULTS.ORGANIZATION_TYPE_FROM = util.objectToArray(result[interlockType.INTERLOCK_TYPE].INTERLOCK_DEFAULTS.ORGANIZATION_TYPE_FROM);
        result[interlockType.INTERLOCK_TYPE].INTERLOCK_DEFAULTS.ORGANIZATION_TYPE_TO = util.objectToArray(result[interlockType.INTERLOCK_TYPE].INTERLOCK_DEFAULTS.ORGANIZATION_TYPE_TO);
    });
    return util.objectToArray(result);
}

function updateInterlockDefaults(reqBody, userId) {
    var interlockEntityFrom = [];
    var interlockEntityTo = [];
    var interlockOrganizationTypeFrom = [];
    var interlockOrganizationTypeTo = [];
    var interlock = [];
    reqBody.forEach(function (configurationType) {
        dataInterlock.deleteInterlockDefaultEntityConfigurationFromByInterlockTypeId(configurationType.INTERLOCK_TYPE_ID, userId);
        dataInterlock.deleteInterlockDefaultEntityConfigurationToByInterlockTypeId(configurationType.INTERLOCK_TYPE_ID, userId);
        dataInterlock.deleteInterlockDefaultOrganizationConfigurationFromByInterlockTypeId(configurationType.INTERLOCK_TYPE_ID, userId);
        dataInterlock.deleteInterlockDefaultOrganizationConfigurationToByInterlockTypeId(configurationType.INTERLOCK_TYPE_ID, userId);

        if (!!Number(configurationType.ENABLE_DEFAULT_SELECTION)) {
            interlockEntityFrom = configurationType.ENTITY_FROM.map(function (entityId) {
                return {
                    in_entity_id: entityId
                    , in_interlock_type_id: configurationType.INTERLOCK_TYPE_ID
                    , in_created_user_id: userId
                }
            });

            interlockEntityTo = configurationType.ENTITY_TO.map(function (entityId) {
                return {
                    in_entity_id: entityId
                    , in_interlock_type_id: configurationType.INTERLOCK_TYPE_ID
                    , in_created_user_id: userId
                }
            });

            interlockOrganizationTypeFrom = configurationType.ORGANIZATION_TYPE_FROM.map(function (organizationTypeId) {
                return {
                    in_organization_type_id: organizationTypeId
                    , in_interlock_type_id: configurationType.INTERLOCK_TYPE_ID
                    , in_created_user_id: userId
                }
            });

            interlockOrganizationTypeTo = configurationType.ORGANIZATION_TYPE_TO.map(function (organizationTypeId) {
                return {
                    in_organization_type_id: organizationTypeId
                    , in_interlock_type_id: configurationType.INTERLOCK_TYPE_ID
                    , in_created_user_id: userId
                }
            });

            if (interlockEntityFrom.length)
                dataInterlock.inssertInterlockDefaultEntityConfigurationFrom(interlockEntityFrom);

            if (interlockEntityTo.length)
                dataInterlock.inssertInterlockDefaultEntityConfigurationTo(interlockEntityTo);

            if (interlockOrganizationTypeFrom.length)
                dataInterlock.inssertInterlockDefaultOrganizationConfigurationFrom(interlockOrganizationTypeFrom);

            if (interlockOrganizationTypeTo.length)
                dataInterlock.inssertInterlockDefaultOrganizationConfigurationTo(interlockOrganizationTypeTo);
        }

        interlock.push({
            in_interlock_default_configuration_id: configurationType.INTERLOCK_DEFAULT_CONFIGURATION_ID,
            in_enable_default_selection: configurationType.ENABLE_DEFAULT_SELECTION,
            in_interlock_type_id: configurationType.INTERLOCK_TYPE_ID,
            in_user_id: userId
        });
    });

    if (interlock.length)
        dataInterlock.updInterlockDefaults(interlock, userId);

    return true;
}

/**************CONTACT DATA**************************/
function getContactDataByOrgRelatedAndOrgId(ORGANIZATION_RELATED_ID, ORGANIZATION_ID) {

    return dataInterlock.getContactDataByOrgRelatedAndOrgId(ORGANIZATION_RELATED_ID, ORGANIZATION_ID);
}

function updateContactDataByOrgRelatedAndOrgId(data, userId) {
    var contactDataList = data.ASSOCIATED_CONTACTS;
    var organizationRelatedId = data.ORGANIZATION_RELATED_ID;
    var organizationId = data.ORGANIZATION_ID;

    if (contactDataList) {
        dataInterlock.deleteContactData(organizationRelatedId, organizationId);
        contactDataList.forEach(function (cd) {
            dataInterlock.insertContactData(organizationRelatedId, organizationId, cd.CONTACT_DATA_ID, userId);
        })
    }
    return true;
}

/****************************************************/