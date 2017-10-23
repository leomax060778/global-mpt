/***************Import Library*******************/
$.import("mktgplanningtool.services.commonLib", "mapper");
var mapper = $.mktgplanningtool.services.commonLib.mapper;
var db = mapper.getdbHelper();
var ErrorLib = mapper.getErrors();
/*************************************************/
var spGetInterlockById = "GET_INTERLOCK_BY_ID";
var spGetInterlockEntity = "GET_ALL_INTERLOCK_ENTITY";
var spGetInterlockOrganizationType = "GET_ALL_INTERLOCK_ORGANIZATION_TYPE";
var spGetInterlockOrganizationTypeById = "GET_ORGANIZATION_TYPE_BY_ID";
var spGetInterlockStatus = "GET_INTERLOCK_STATUS";
var spGetInterlockOrganizationByIlId = "GET_INTERLOCK_ORGANIZATION_BY_IL_ID";
var spGetInterlockContactDataByInterlockId = "GET_INTERLOCK_CONTACT_DATA_BY_INTERLOCK_ID";
var spGetInterlockReport = "GET_INTERLOCK_REPORT";
var spGetInterlockMessageByInterlockId = "GET_INTERLOCK_MESSAGE_BY_INTERLOCK_ID";
var spGetInterlockByUserIdOriginId = "GET_INTERLOCK_BY_USER_ID_ORIGIN_ID";
var spGetInterlockByHash = "GET_INTERLOCK_BY_HASH";
var spGetInterlockContactDataByHash = "GET_INTERLOCK_CONTACT_DATA_BY_HASH";
var spGetInterlockCentralRegionContactByEmail = "GET_INTERLOCK_CENTRAL_REGION_CONTACT_DATA_BY_EMAIL";

var spInsertInterlock = "INS_INTERLOCK";
var spUpdateInterlock = "UPD_INTERLOCK";
var spInsertInterlockLogStatus = "INS_INTERLOCK_LOG_STATUS";
var spInsertInterlockRoute = "INS_INTERLOCK_ROUTE";
var spInsertInterlockRegion = "INS_INTERLOCK_REGION";
var spInsertInterlockSubregion = "INS_INTERLOCK_SUBREGION";
var spInsertInterlockContactData = "INS_INTERLOCK_CONTACT_DATA";
var spInsertInterlockRequestMessage = "INS_INTERLOCK_REQUEST_MESSAGE";

var spDeleteInterlockByIlId = "DEL_INTERLOCK_BY_IL_ID";
var spDeleteInterlockRouteByIlId = "DEL_INTERLOCK_GLOBAL_TEAM_BY_IL_ID";
var spDeleteInterlockRegionByIlId = "DEL_INTERLOCK_REGION_BY_IL_ID";
var spDeleteInterlockSubregionByIlId = "DEL_INTERLOCK_SUBREGION_BY_IL_ID";
var spDeleteInterlockContactDataById = "DEL_INTERLOCK_CONTACT_DATA";
var spDeleteInterlockRequestMessageById = "DEL_INTERLOCK_REQUEST_MESSAGE_BY_ID";

var spGetInterlockContactRegionCentralTeam = "GET_INTERLOCK_CENTRAL_REGION_CONTACT_DATA";

var spsetSendEmailContactData = "UPD_INTERLOCK_CONTACT_DATA";
var spUpdInterlockStatus = "UPD_INTERLOCK_STATUS";

var spUpdContactData = "UPD_HASH_CONTACT_DATA";

var INS_INTERLOCK_REQUEST_INTERLOCK_ORGANIZATION = "INS_INTERLOCK_REQUEST_INTERLOCK_ORGANIZATION";
var DEL_INTERLOCK_REQUEST_INTERLOCK_ORGANIZATION_BY_IL_ID = "DEL_INTERLOCK_REQUEST_INTERLOCK_ORGANIZATION_BY_IL_ID";
var GET_DEFAULT_INTERLOCK_CONFIGURATION = "GET_DEFAULT_INTERLOCK_CONFIGURATION";

/******************************************************/

/********** GET **********/
function getInterlockReport(isSA, userId) {
    var parameters = {
        in_user_id: userId,
        in_isSA: isSA
    };
    var result = db.extractArray(db.executeProcedureManual(spGetInterlockReport, parameters).out_result);
    return result;
}

function getInterlockByUserIdOriginId(userId, originId) {
    var params = {};
    params.in_user_id = userId;
    params.in_origin_id = originId;

    var rdo = db.executeProcedureManual(spGetInterlockByUserIdOriginId, params);
    var result = {};
    result.INTERLOCKS_FROM = db.extractArray(rdo.out_result_from);
    result.INTERLOCKS_TO = db.extractArray(rdo.out_result_to);
    result.CONTACTS = db.extractArray(rdo.out_contact_data);

    return result;
}

function getInterlockById(id) {
    if (id) {
        var rdo = db.executeProcedure(spGetInterlockById, {'in_interlock_request_id': id});

        var result = {};
        result.INTERLOCK = db.extractArray(rdo.out_result)[0];
        result.CONTACTS = db.extractArray(rdo.out_contact_data);

        return result;
    }
    return null;
}

function getInterlockEntity() {
    var rdo = db.executeProcedure(spGetInterlockEntity, {});
    return db.extractArray(rdo.out_interlock_entity);
}

function getInterlockOrganizationType() {
    var rdo = db.executeProcedure(spGetInterlockOrganizationType, {});
    return db.extractArray(rdo.out_interlock_organization_type);
}

function getInterlockOrganizationByIlId(il_id) {
    if (il_id) {
        var rdo = db.executeProcedure(spGetInterlockOrganizationByIlId, {'in_interlock_id': il_id});
        return db.extractArray(rdo.out_organization)[0];
    }
    return null
}

function getInterlockStatus() {
    var rdo = db.executeProcedure(spGetInterlockStatus, {});
    return db.extractArray(rdo.out_interlock);
}

/********** INSERT **********/

function insertInterlock(objInterlock, userId) {
    var params = {};
    params.in_entity_id = objInterlock.ENTITY_ID;
    params.in_organization_type_id = objInterlock.ORGANIZATION_TYPE_ID;
    params.in_requested_resource = objInterlock.REQUESTED_RESOURCE;
    params.in_requested_budget = objInterlock.REQUESTED_BUDGET;
    params.in_interlock_status_id = objInterlock.STATUS_ID;
    params.in_created_user_id = userId;

    params.in_entity_id_from = objInterlock.ENTITY_ID_FROM;
    params.in_organization_type_id_from = objInterlock.ORGANIZATION_TYPE_ID_FROM;
    params.in_comments = objInterlock.COMMENTS;

    var rdo = db.executeScalarManual(spInsertInterlock, params, 'out_result');
    return rdo;
}

function updateInterlock(objInterlock, userId) {
    var params = {};
    params.in_entity_id = objInterlock.ENTITY_ID;
    params.in_organization_type_id = objInterlock.ORGANIZATION_TYPE_ID;
    params.in_requested_resource = objInterlock.REQUESTED_RESOURCE;
    params.in_requested_budget = objInterlock.REQUESTED_BUDGET;
    params.in_interlock_status_id = objInterlock.STATUS_ID;
    params.in_interlock_request_id = objInterlock.INTERLOCK_REQUEST_ID;
    params.in_modified_user_id = userId;

    params.in_entity_id_from = objInterlock.ENTITY_ID_FROM;
    params.in_organization_type_id_from = objInterlock.ORGANIZATION_TYPE_ID_FROM;
    params.in_comments = objInterlock.COMMENTS;

    return db.executeScalarManual(spUpdateInterlock, params, 'out_result');
}

/**
 * @deprecated
 * @param parameters
 * @param userId
 * @returns {*}
 */
function insertInterlockRoute(parameters, userId) {
    var params = {};
    params.in_organization_id = parameters.ORGANIZATION_ID;
    params.in_interlock_request_id = parameters.INTERLOCK_REQUEST_ID;
    params.in_created_user_id = userId;

    var rdo = db.executeScalarManual(spInsertInterlockRoute, params, 'out_interlock_route_id');
    return rdo;
}

function insertInterlockRequestInterlockOrganization(parameters, userId) {
    var params = {};
    params.in_interlock_organization_id = parameters.ORGANIZATION_ID;
    params.in_interlock_organization_id_from = parameters.ORGANIZATION_ID_FROM;
    params.in_interlock_request_id = parameters.INTERLOCK_REQUEST_ID;
    params.in_created_user_id = userId;

    var rdo = db.executeScalarManual(INS_INTERLOCK_REQUEST_INTERLOCK_ORGANIZATION, params, 'out_id');
    return rdo;
}

function insertInterlockRegion(parameters, userId) {
    var params = {};
    params.in_organization_id = parameters.ORGANIZATION_ID;
    params.in_interlock_request_id = parameters.INTERLOCK_REQUEST_ID;
    params.in_created_user_id = userId;
    params.in_organization_id_from = parameters.ORGANIZATION_ID_FROM;

    var rdo = db.executeScalarManual(spInsertInterlockRegion, params, 'out_interlock_region_id');
    return rdo;
}

function insertInterlockSubregion(parameters, userId) {
    var params = {};
    params.in_organization_id = parameters.ORGANIZATION_ID;
    params.in_interlock_request_id = parameters.INTERLOCK_REQUEST_ID;
    params.in_created_user_id = userId;
    params.in_organization_id_from = parameters.ORGANIZATION_ID_FROM;
    var rdo = db.executeScalarManual(spInsertInterlockSubregion, params, 'out_interlock_subregion_id');
    return rdo;
}

function insertInterlockLogStatus(interlock_id, status_id, created_user_id, requesterEmail) {
    var params = {};
    params.in_interlock_request_id = interlock_id;
    params.in_interlock_status_id = status_id;
    params.in_created_user_id = created_user_id;
    params.in_requester_email = requesterEmail;

    return db.executeScalarManual(spInsertInterlockLogStatus, params, 'out_interlock_log_status_id');
}


function insertInterlockContactData(interlockId, listContactData, user_id) {
    try {
        for (var i = 0; i < listContactData.length; i++) {
            var email = listContactData[i].email;
            var hash = listContactData[i].hash;
            db.executeScalarManual(spInsertInterlockContactData,
                {'in_interlock_request_id': interlockId, 'in_email': email, 'in_hash': hash, 'in_user_id': user_id},
                'out_interlock_contact_data_id');
        }
        db.commit();
    } catch (e) {
        db.rollback();
    }
}


function insertInterlockMessage(interlockId, message, userId, senderId, origin) {


    return db.executeProcedureManual(spInsertInterlockRequestMessage, {
        "IN_INTERLOCK_REQUEST_ID": interlockId,
        "IN_MESSAGE": message,
        "IN_CREATED_USER_ID": userId,
        "IN_SENDER_ID": senderId,
        "IN_INTERLOCK_REQUEST_ORIGIN_ID": origin
    });
}

function getContactDataByInterlockId(interlockId) {
    var rdo = db.executeProcedure(spGetInterlockContactDataByInterlockId,
        {
            "in_interlock_id": interlockId
        });

    return db.extractArray(rdo.out_result);
}


/********** DELETE **********/
function deleteInterlock(interlockId, userId) {
    var params = {};
    params.in_il_id = interlockId;
    params.in_user_id = userId;

    var rdo = db.executeScalarManual(spDeleteInterlockByIlId, params, 'out_result');

    return rdo;
}

function deleteInterlockMessagesByInterlockId(interlockId, userId) {
    var params = {};
    params.in_interlock_request_id = interlockId;
    params.in_user_id = userId;

    var rdo = db.executeScalarManual(spDeleteInterlockRequestMessageById, params, 'out_result');
    return rdo;
}

function deleteInterlockContactDataByInterlockId(interlockId, userId) {
    var params = {};
    params.in_interlock_request_id = interlockId;
    params.in_user_id = userId;

    var rdo = db.executeScalarManual(spDeleteInterlockContactDataById, params, 'out_result');
    return rdo;
}

function deleteInterlockRouteByInterlockId(interlockId, userId) {
    var params = {};
    params.in_il_id = interlockId;
    params.in_user_id = userId;

    var rdo = db.executeScalarManual(spDeleteInterlockRouteByIlId, params, 'out_result');
    return rdo;
}

/**
 * deprecated
 * @param interlockId
 * @param userId
 * @returns {*}
 */
function deleteInterlockRouteByInterlockId(interlockId, userId) {
    var params = {};
    params.in_il_id = interlockId;
    params.in_user_id = userId;

    var rdo = db.executeScalarManual(spDeleteInterlockRouteByIlId, params, 'out_result');
    return rdo;
}

function deleteInterlockRouteByInterlockId(interlockId, userId) {
    var params = {};
    params.in_il_id = interlockId;
    params.in_user_id = userId;

    var rdo = db.executeScalarManual(DEL_INTERLOCK_REQUEST_INTERLOCK_ORGANIZATION_BY_IL_ID, params, 'out_result');
    return rdo;
}

function deleteInterlockRegionByInterlockId(interlockId, userId) {
    var params = {};
    params.in_il_id = interlockId;
    params.in_user_id = userId;

    var rdo = db.executeScalarManual(spDeleteInterlockRegionByIlId, params, 'out_result');
    return rdo;
}

function deleteInterlockSubregionByInterlockId(interlockId, userId) {
    var params = {};
    params.in_il_id = interlockId;
    params.in_user_id = userId;

    var rdo = db.executeScalarManual(spDeleteInterlockSubregionByIlId, params, 'out_result');
    return rdo;
}

/*Interlock contact data region / central teams*/
function getInterlockCentralRegionContacts(in_contact_type, in_contact_type_id) {
    var params = {};
    // params.in_contact_type = in_contact_type;
    // params.in_contact_type_id = in_contact_type_id;
    var rdo = db.executeProcedure(spGetInterlockContactRegionCentralTeam, params);
    return db.extractArray(rdo.out_result);
}

function setSentMailByHash(hash, userId) {
    var rdo = !hash && !userId ? null : db.executeScalarManual(spsetSendEmailContactData, {
        'in_hash': hash,
        'in_user_id': userId
    }, 'out_result');
    return rdo;
}

function getInterlockByHash(hash) {
    var params = {};
    params.in_hash = hash;
    var result = db.executeProcedure(spGetInterlockByHash, params);
    return db.extractArray(result.out_result)[0];
}

function setInterlockStatus(interlock_id, status_id, requesterEmail) {

    var rdo = !interlock_id && !status_id && !email ? null : db.executeScalarManual(spUpdInterlockStatus, {
        'in_interlock_id': interlock_id,
        'in_status_id': status_id,
        'in_email': requesterEmail
    }, 'out_result');
    return rdo;
}

function getInterlockContactDataByHash(hash) {
    var params = {};
    params.in_hash = hash;
    var result = db.executeProcedureManual(spGetInterlockContactDataByHash, params);
    var list = db.extractArray(result.out_result);
    if (list.length)
        return list[0];
    else
        return {};
}

function getRequestedUser(email) {
    var params = {};
    params.in_email = email;
    var result = db.executeProcedureManual(spGetInterlockCentralRegionContactByEmail, params);
    var list = db.extractArray(result.out_result);
    if (list.length)
        return list[0];
    else
        return {};
}

function deactivateInterlockHash(ilRequestId, userId) {
    var rdo = !ilRequestId && !userId ? null : db.executeScalarManual(spDeleteInterlockContactDataById, {
        'in_interlock_request_id': ilRequestId,
        'in_user_id': userId
    }, 'out_result');
    return rdo;
}

function deleteInterlockContactDataByIlId(ilRequestId, userId) {
    return deactivateInterlockHash(ilRequestId, userId);
}

function deleteInterlockRequestMessageByIlId(ilRequestId, userId) {
    var rdo = !ilRequestId && !userId ? null :
        db.executeScalarManual(spDeleteInterlockRequestMessageById,
            {'in_interlock_request_id': ilRequestId, 'in_user_id': userId},
            'out_result');
    return rdo;
}

function getInterlockUserId(interlock_id) {
    var params = {};
    params.in_interlock_id = interlock_id;
    var result = db.executeProcedureManual(spUpdInterlockStatus, params, 'out_result');
    var list = db.extractArray(result.out_result);
    if (list.length)
        return list[0].CREATED_USER_ID;
    else
        return null;
}

function getMessagesByInterlockRequest(interlockRequestId, autoCommit) {

    var params = {
        'in_interlock_request_id': interlockRequestId
    };
    var rdo;
    if (autoCommit) {
        rdo = db.executeProcedure(spGetInterlockMessageByInterlockId, params);
    } else {
        rdo = db.executeProcedureManual(spGetInterlockMessageByInterlockId, params);
    }

    return db.extractArray(rdo.out_result);

}

function updateContactData(interlockContactDataId, hash, modifiedUserId, autoCommit) {
    var params = {
        'in_interlock_contact_data_id': interlockContactDataId,
        'in_hash': hash,
        'in_modified_user_id': modifiedUserId
    };
    var rdo;
    if (autoCommit) {
        rdo = db.executeScalar(spUpdContactData, params, 'out_result');
    } else {
        rdo = db.executeScalarManual(spUpdContactData, params, 'out_result');
    }
    return rdo;

}

function getDefaultInterlockConfiguration() {
    var result = db.executeProcedureManual(GET_DEFAULT_INTERLOCK_CONFIGURATION, {});
    return db.extractArray(result.out_result);
}