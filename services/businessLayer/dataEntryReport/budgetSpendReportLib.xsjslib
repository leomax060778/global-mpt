$.import("mktgplanningtool.services.commonLib", "mapper");
var mapper = $.mktgplanningtool.services.commonLib.mapper;
var ErrorLib = mapper.getErrors();
var util = mapper.getUtil();
var dataBudgetReport = mapper.getDataBudgetSpendReport();
var businessUser = mapper.getUser();
var mail = mapper.getMail();
var config = mapper.getDataConfig();
var dataHl5 = mapper.getDataLevel5();
var dataHl6 = mapper.getDataLevel6();
var dataBudgetSpendRequest = mapper.getDataBudgetSpendRequest();
var budgetSpendRequestLib = mapper.getBudgetSpendRequest();
var budgetReportMail = mapper.getBudgetSpendReportMailLib();

/** ***********END INCLUDE LIBRARIES*************** */

//Budget Spend Request Status map
var statusMap = {
    "Pending": 1,
    "Approved": 2,
    "Rejected": 4,
    "NoLongerRequested": 3
};

var BUDGET_SPEND_REQUEST_TYPE = {
    OWN_MONEY: 1
    , CO_FUNDING_EXTERNAL: 2
    , CO_FUNDING_INTERNAL: 3
};

//Budget Spend Request Origin map
var BUDGET_SPEND_REQUEST_ORIGIN = {
    BUDGET_REQUESTOR: 1,
    BUDGET_APPROVER: 2
};

var HIERARCHY_LEVEL = {
    HL2: 5,
    HL3: 4,
    HL4: 1,
    HL5: 2,
    HL6: 3
};
var HIERARCHY_LEVEL_BY_ID = {
    6: 'l1',
    5: 'l2',
    4: 'l3',
    1: 'l4',
    2: 'l5',
    3: 'l6'
};

function calculateBudgetInEuros(data) {
    var amount = data.BUDGET_SPEND_REQUEST_AMOUNT;
    var kEurAmount = (amount * data.CURRENCY_VALUE);
    return kEurAmount;
}

function completeCRMPath(array, key, setDisplayName, parse, userId) {
    var path = 'CRM-';
    var result = {};
    var idKey = key.indexOf('HL5') >= 0 ? 'HL5_ID' : 'HL6_ID';
    var acronymKey = key.indexOf('HL5') >= 0 ? 'HL5_ACRONYM' : 'HL6_ACRONYM';
    var budgetApproverEmails = [];
    var levelId = key.indexOf('HL5') >= 0 ? HIERARCHY_LEVEL.HL5 : HIERARCHY_LEVEL.HL6;
    var parsedBudgetApproverEmails = {};
    if(userId){
        budgetApproverEmails = levelId === HIERARCHY_LEVEL.HL5
            ? dataBudgetSpendRequest.getHl5BudgetApproverEmailByLevelIdUserId(statusMap.NoLongerRequested, userId, levelId)
            : dataBudgetSpendRequest.getHl6BudgetApproverEmailByLevelIdUserId(statusMap.NoLongerRequested, userId, levelId);
        budgetApproverEmails.forEach(function (budgetApprover) {
            if(parsedBudgetApproverEmails[budgetApprover.BUDGET_SPEND_REQUEST_ID]){
                parsedBudgetApproverEmails[budgetApprover.BUDGET_SPEND_REQUEST_ID].push(budgetApprover.EMAIL);
            } else {
                parsedBudgetApproverEmails[budgetApprover.BUDGET_SPEND_REQUEST_ID] = [budgetApprover.EMAIL];
            }
        });
    }

    array.forEach(function (data) {
        if (data.BUDGET_SPEND_REQUEST_AMOUNT) {
            data.BUDGET_SPEND_REQUEST_AMOUNT = (Number(data.BUDGET_SPEND_REQUEST_AMOUNT)).toFixed(2);
            data.BUDGET_SPEND_REQUEST_AMOUNT_KEUR = (data.CURRENCY_ABBREVIATION !== "EUR") ? "( " + calculateBudgetInEuros(data) + " K EUR )" : "";
            data.BUDGET_SPEND_REQUEST_AMOUNT = "" + data.BUDGET_SPEND_REQUEST_AMOUNT + " K " + data.CURRENCY_ABBREVIATION;
        } else if (data.BUDGET) {
            data.BUDGET = "" + parseFloat(data.BUDGET);
        }

        if(setDisplayName) {
            data.DISPLAY_NAME = data.BUDGET_SPEND_REQUEST_TYPE_DISPLAY_NAME + ' - ' + parseFloat(data.BUDGET) + ' (K EUR)';
        }

        if(parse){
            data.BUDGET_APPROVER_EMAIL = parsedBudgetApproverEmails[data.BUDGET_SPEND_REQUEST_ID] || [];
            if (result[data[idKey]]) {
                result[data[idKey]].CHILDREN.push(data);
            } else {
                result[data[idKey]] = {
                    ID: data[idKey],
                    PATH: data[key],
                    CHILDREN: [data]
                }
            }
        }
    });
    return parse ? util.objectToArray(result) : array;
}

function calcuteTotals(budgetSpendRequests){
    var totals = {
        OWN_MONEY: 0
        , CO_FUNDING_EXTERNAL: 0
        , CO_FUNDING_INTERNAL: 0
    };
    budgetSpendRequests.forEach(function (data) {
        totals = {
            OWN_MONEY: 0
            , CO_FUNDING_EXTERNAL: 0
            , CO_FUNDING_INTERNAL: 0
        };

        data.CHILDREN.forEach(function (request) {
            if (request.BUDGET_SPEND_REQUEST_STATUS_ID != statusMap.NoLongerRequested && request.BUDGET_SPEND_REQUEST_STATUS_ID != statusMap.Rejected) {
                switch (Number(request.BUDGET_SPEND_REQUEST_TYPE_ID)) {
                    case BUDGET_SPEND_REQUEST_TYPE.OWN_MONEY:
                        totals.OWN_MONEY += Number(request.BUDGET);
                        break;
                    case BUDGET_SPEND_REQUEST_TYPE.CO_FUNDING_EXTERNAL:
                        totals.CO_FUNDING_EXTERNAL += Number(request.BUDGET);
                        break;
                    case BUDGET_SPEND_REQUEST_TYPE.CO_FUNDING_INTERNAL:
                        totals.CO_FUNDING_INTERNAL += Number(request.BUDGET);
                        break;
                }
            }
        });

        data.TOTAL_OWN_MONEY = totals.OWN_MONEY;
        data.TOTAL_CO_FUNDING_EXTERNAL = totals.CO_FUNDING_EXTERNAL;
        data.TOTAL_CO_FUNDING_INTERNAL = totals.CO_FUNDING_INTERNAL;
    });

    return budgetSpendRequests;
}

/** GET **/

function getL5SpendBudgetReport(userId) {
    if (!userId) {
        throw ErrorLib.getErrors().BadRequest("The Parameter userId is not found",
            "budgetSpendReportService/handleGet/getL5SpendBudgetReport", userId);
    }

    var result = dataBudgetReport.getL5SpendBudgetReport(statusMap.NoLongerRequested, userId);
    result = JSON.parse(JSON.stringify(result));

    return calcuteTotals(completeCRMPath(result, "HL5_PATH", false, true, userId));
}

function getSpendBudgetReportByRequestorId(requestorId, level, budgetSpendRequestId) {
    if (!requestorId) {
        throw ErrorLib.getErrors().BadRequest("The Parameter requestorId is not found",
            "budgetSpendReportService/handleGet/getL5SpendBudgetReportByRequestorId", requestorId);
    }

    var result = level ? dataBudgetReport.getSpendBudgetReportByRequestorId(statusMap.NoLongerRequested, requestorId, level, budgetSpendRequestId) : [];
    result = JSON.parse(JSON.stringify(result));

    return completeCRMPath(result, level+"_PATH", false, true, requestorId);
}

function getL5SpendBudgetRequestByL5Id (l5Id, userId) {
    if (!userId) {
        throw ErrorLib.getErrors().BadRequest("The Parameter userId is not found",
            "budgetSpendReportService/handleGet/getL5SpendBudgetReportById", userId);
    }
    if (!l5Id) {
        throw ErrorLib.getErrors().BadRequest("The Parameter l5Id is not found",
            "budgetSpendReportService/handleGet/getL5SpendBudgetReportById", l5Id);
    }

    var result = dataBudgetReport.getL5SpendBudgetRequestByL5Id(l5Id, statusMap.NoLongerRequested, userId);
    result = JSON.parse(JSON.stringify(result));

    return completeCRMPath(result, "HL5_PATH", true, true);
}

function getL5SpendBudgetReportById(l5Id, budgetSpendRequestId, userId) {
    if (!userId) {
        throw ErrorLib.getErrors().BadRequest("The Parameter userId is not found",
            "budgetSpendReportService/handleGet/getL5SpendBudgetReportById", userId);
    }
    if (!l5Id) {
        throw ErrorLib.getErrors().BadRequest("The Parameter l5Id is not found",
            "budgetSpendReportService/handleGet/getL5SpendBudgetReportById", l5Id);
    }
    if (!budgetSpendRequestId) {
        throw ErrorLib.getErrors().BadRequest("The Parameter budgetSpendRequestId is not found",
            "budgetSpendReportService/handleGet/getL5SpendBudgetReportById", budgetSpendRequestId);
    }

    var excludedStatus = statusMap.NoLongerRequested;

    var result = dataBudgetReport.getL5SpendBudgetReportById(l5Id, budgetSpendRequestId, excludedStatus, userId);

    result = JSON.parse(JSON.stringify(result));
    result = completeCRMPath([result], "HL5_PATH", false, false)[0];
    var hl4Id = dataHl5.getHl5ById(l5Id).HL4_ID;
    result.PARENT_REMAINING_BUDGET = dataHl5.getHl5RemainingBudgetByHl4Id(hl4Id, dataHl5.getHl5TotalBudgetByHl4Id(hl4Id));
    return result;
}

function getL6SpendBudgetReport(userId) {
    if (!userId) {
        throw ErrorLib.getErrors().BadRequest("The Parameter userId is not found",
            "budgetSpendReportService/handleGet/getL6SpendBudgetReport", userId);
    }

    var result = dataBudgetReport.getL6SpendBudgetReport(statusMap.NoLongerRequested, userId);
    result = JSON.parse(JSON.stringify(result));
    return calcuteTotals(completeCRMPath(result, "HL6_PATH", false, true, userId));
}

function getL6SpendBudgetRequestByL6Id (l6Id, userId) {
    if (!userId) {
        throw ErrorLib.getErrors().BadRequest("The Parameter userId is not found",
            "budgetSpendReportService/handleGet/getL6SpendBudgetReportById", userId);
    }
    if (!l6Id) {
        throw ErrorLib.getErrors().BadRequest("The Parameter l6Id is not found",
            "budgetSpendReportService/handleGet/getL6SpendBudgetReportById", l6Id);
    }

    var result = dataBudgetReport.getL6SpendBudgetRequestByL6Id(l6Id, statusMap.NoLongerRequested, userId);
    result = JSON.parse(JSON.stringify(result));

    return completeCRMPath(result, "HL6_PATH", true, true);
}

function getL6SpendBudgetReportById(l6Id, budgetSpendRequestId, userId) {
    if (!userId) {
        throw ErrorLib.getErrors().BadRequest("The Parameter userId is not found",
            "budgetSpendReportService/handleGet/getL6SpendBudgetReportById", userId);
    }
    if (!l6Id) {
        throw ErrorLib.getErrors().BadRequest("The Parameter l6Id is not found",
            "budgetSpendReportService/handleGet/getL6SpendBudgetReportById", l6Id);
    }
    if (!budgetSpendRequestId) {
        throw ErrorLib.getErrors().BadRequest("The Parameter budgetSpendRequestId is not found",
            "budgetSpendReportService/handleGet/getL6SpendBudgetReportById", budgetSpendRequestId);
    }

    var excludedStatus = statusMap.NoLongerRequested;

    var result = dataBudgetReport.getL6SpendBudgetReportById(l6Id, budgetSpendRequestId, excludedStatus, userId);
    result = JSON.parse(JSON.stringify(result));
    // return completeCRMPath([result], "HL6_PATH", false, false)[0];

    result = completeCRMPath([result], "HL6_PATH", false, false)[0];
    var hl5Id = dataHl6.getHl6ById(l6Id).HL5_ID;
    result.PARENT_REMAINING_BUDGET = dataHl6.getHl6RemainingBudgetByHl5Id(hl5Id, dataHl6.getHl6TotalBudgetByHl5Id(hl5Id));
    return result;
}

/** POST **/

//Insert Old Spend Budget Request Status in the Log table
function insertBudgetSpendRequestStatusLog(reqBody) {
    return dataBudgetReport.insertBudgetSpendRequestStatusLog(reqBody);
}

//Send Email with Budget Spend Request Information
function sendBudgetSpendRequestInformationByEmail(reqBody, userId, budgetSpendRequestList) {
	 var budgetSpendRequestData = [];
    var fromApprover = budgetSpendRequestList && budgetSpendRequestList.length;


	    if (!reqBody.BUDGET_SPEND_REQUEST_ID) {
	        throw ErrorLib.getErrors().BadRequest("The parameter reqBody.BUDGET_SPEND_REQUEST_ID is not found",
	            "budgetSpendReportService/handlePost/sendBudgetSpendRequestInformationByEmail", reqBody.BUDGET_SPEND_REQUEST_ID);
	    }

	    if (reqBody.HL5_ID) {
	        budgetSpendRequestData = getL5SpendBudgetReportById(reqBody.HL5_ID, reqBody.BUDGET_SPEND_REQUEST_ID, userId);
	    } else if (reqBody.HL6_ID) {
	        budgetSpendRequestData = getL6SpendBudgetReportById(reqBody.HL6_ID, reqBody.BUDGET_SPEND_REQUEST_ID, userId);
	    } else {
	        throw ErrorLib.getErrors().BadRequest("Can be HL5_ID or HL6_ID ",
	            "budgetSpendReportService/handlePost/sendBudgetSpendRequestInformationByEmail", "The parameter HL_ID is not found");
	    }

	    if (!reqBody.NOTE) {
	        throw ErrorLib.getErrors().BadRequest("The parameter reqBody.NOTE is not found",
	            "budgetSpendReportService/handlePost/sendBudgetSpendRequestInformationByEmail", reqBody.NOTE);
	    }

	    var basicData = {};
	    basicData.APP_URL = config.getAppUrl();
	    basicData.ENVIRONMENT = config.getMailEnvironment();

        var bsrMailObj = budgetReportMail.parseBudgetSpendReport(reqBody, budgetSpendRequestData, budgetSpendRequestList, basicData, "Colleague", fromApprover);

	    var mailObject = mail.getJson(reqBody.RECIPIENTS, bsrMailObj.subject, bsrMailObj.body);
	   
	    mail.sendMail(mailObject, true);
	    return 1;
}

/** PUT **/

// Approve Budget Spend Request
function approveBudgetSpendRequest(reqBody, userId) {
    var result;
    var arrayData = [];
    var arrayLogs = [];
    var arrayReqBody = [];
    var params = {};
    var logParams = {};
    var mailObject = {};
    var arrToMail = [];

    if (!reqBody.length) {
        arrayData.push(reqBody);
    } else {
        arrayData = reqBody;
    }

    try {
        arrayData.forEach(function (eachReqBody) {
            //General validations
            validateUpdateBasicData(eachReqBody, userId);
            var oldStatus = dataBudgetReport.getBudgetSpendRequestStatusById(eachReqBody.BUDGET_SPEND_REQUEST_ID);

            //Status validation
            if (!validateStatus(oldStatus.BUDGET_SPEND_REQUEST_STATUS_ID)) {
                throw ErrorLib.getErrors().BadRequest("The Status can not be changed",
                    "budgetSpendReportService/handlePut/approveBudgetSpendRequest", eachReqBody.BUDGET_SPEND_REQUEST_ID);
            }

            userId = userId || 1; //1 when come from other budget approver

            //Insert Log
            var budgetSpendRequest = {};
            if(eachReqBody.HASH)
                budgetSpendRequest = dataBudgetSpendRequest.getBudgetSpendRequestByHash(eachReqBody.HASH);

            logParams.in_budget_spend_request_id = eachReqBody.BUDGET_SPEND_REQUEST_ID;
            logParams.in_status_id = Number(oldStatus.BUDGET_SPEND_REQUEST_STATUS_ID);
            logParams.in_created_user_id = userId;
            logParams.in_other_budget_approver_id = budgetSpendRequest.OTHER_BUDGET_APPROVER_ID || null;

            arrayLogs.push(logParams);

            //Update Status
            params.in_budget_spend_request_id = eachReqBody.BUDGET_SPEND_REQUEST_ID;
            params.in_status_id = statusMap.Approved;
            params.in_user_id = userId;

            arrayReqBody.push(params);

            if(!eachReqBody.HL5_ID || !eachReqBody.HL6_ID){
                var hl5Id;
                var hl6Id;
                if(budgetSpendRequest.HIERARCHY_LEVEL_ID == HIERARCHY_LEVEL.HL5) {
                    hl5Id = budgetSpendRequest.HL_ID;
                } else {
                    hl6Id = budgetSpendRequest.HL_ID;
                }
            }

            var requestor = dataBudgetSpendRequest.getRequestorEmailByBudgetSpendRequestId(eachReqBody.BUDGET_SPEND_REQUEST_ID);

            mailObject = {
                BUDGET_SPEND_REQUEST_ID: eachReqBody.BUDGET_SPEND_REQUEST_ID
                ,HL5_ID: eachReqBody.HL5_ID || eachReqBody.L5_ID || hl5Id || undefined
                ,HL6_ID: eachReqBody.HL6_ID || eachReqBody.L6_ID || hl6Id || undefined
                ,RECIPIENTS: [{address: requestor.EMAIL}]
                ,HEADER: 'Dear Requestor,'
                ,NOTE: 'Your Budget Request is now Approved.'
                ,FOOTER: 'The message is FYI Only, requiring no response.'
            };

            var hl5budgetSpendRequestList = getSpendBudgetReportByRequestorId(requestor.REQUESTOR_ID, 'HL5', eachReqBody.BUDGET_SPEND_REQUEST_ID);
            var hl6budgetSpendRequestList = getSpendBudgetReportByRequestorId(requestor.REQUESTOR_ID, 'HL6', eachReqBody.BUDGET_SPEND_REQUEST_ID);
            var budgetSpendRequestList = hl5budgetSpendRequestList.concat(hl6budgetSpendRequestList);

            //throw JSON.stringify(budgetSpendRequestList);

            var objToMail = {
                mailObject: mailObject, budgetSpendRequestList: budgetSpendRequestList
            };
            arrToMail.push(objToMail);
            //sendBudgetSpendRequestInformationByEmail(mailObject, userId, budgetSpendRequestList);
        });

        //throw JSON.stringify({arrayReqBody: arrayReqBody, arrayLogs: arrayLogs, arrToMail: arrToMail});

        //Update Status
        result = dataBudgetReport.approveBudgetSpendRequest(arrayReqBody);

        if(result)
        {
            //Insert Log
            insertBudgetSpendRequestStatusLog(arrayLogs);

            //sendBudgetSpendRequestInformationByEmail(mailObject, userId, budgetSpendRequestList);
            sendBudgetSpendRequestEmail(arrToMail, userId);
        }
        else
            throw ErrorLib.getErrors().CustomError("Could not change status",
                "budgetSpendReportService/handlePut/approveBudgetSpendRequest", eachReqBody.BUDGET_SPEND_REQUEST_ID);


    } catch (e) {
        throw ErrorLib.getErrors().CustomError("",
            "budgetSpendReportService/handlePut/approveBudgetSpendRequest", e.toString());
    }
    return result;

}

function sendBudgetSpendRequestEmail(arrToMail, userId){
    arrToMail.forEach(function(elem){
        sendBudgetSpendRequestInformationByEmail(elem.mailObject, userId, elem.budgetSpendRequestList);
    });
}

// Reject Budget Spend Request
function rejectBudgetSpendRequest(reqBody, userId) {
    var result;

    var arrayData = [];
    var arrayLogs = [];
    var arrayMessages = [];
    var arrayReqBody = [];

    var params = {};
    var logParams = {};
    var messageParams = {};
    var mailObject = {};
    var arrToMail = [];

    if (!reqBody.length) {
        arrayData.push(reqBody);
    } else {
        arrayData = reqBody;
    }

    try {

        arrayData.forEach(function (eachReqBody) {
            validateUpdateBasicData(eachReqBody, userId);
            if (!validateMessage(eachReqBody)) {
                throw ErrorLib.getErrors().BadRequest("The Parameter MESSAGE is not found",
                    "budgetSpendReportService/handlePut/rejectBudgetSpendRequest", eachReqBody.MESSAGE);
            }

            var oldStatus = dataBudgetReport.getBudgetSpendRequestStatusById(eachReqBody.BUDGET_SPEND_REQUEST_ID);

            userId = userId || 1; //1 when come from other budget approver

            //Insert Log
            var budgetSpendRequest = {};
            if(eachReqBody.HASH)
                budgetSpendRequest = dataBudgetSpendRequest.getBudgetSpendRequestByHash(eachReqBody.HASH);

            logParams.in_budget_spend_request_id = eachReqBody.BUDGET_SPEND_REQUEST_ID;
            logParams.in_status_id = Number(oldStatus.BUDGET_SPEND_REQUEST_STATUS_ID);
            logParams.in_created_user_id = userId;
            logParams.in_other_budget_approver_id = budgetSpendRequest.OTHER_BUDGET_APPROVER_ID || null;

            arrayLogs.push(logParams);

            //Insert Message
            messageParams.in_budget_spend_request_id = eachReqBody.BUDGET_SPEND_REQUEST_ID;
            messageParams.in_message = eachReqBody.MESSAGE;
            messageParams.in_budget_spend_request_origin_id = BUDGET_SPEND_REQUEST_ORIGIN.BUDGET_APPROVER;
            messageParams.in_user_id = userId;

            arrayMessages.push(messageParams);

            //Update Status
            params.in_budget_spend_request_id = eachReqBody.BUDGET_SPEND_REQUEST_ID;
            params.in_status_id = statusMap.Rejected;
            params.in_user_id = userId;

            arrayReqBody.push(params);

            if(!eachReqBody.HL5_ID || !eachReqBody.HL6_ID){

                var hl5Id;
                var hl6Id;
                if(budgetSpendRequest.HIERARCHY_LEVEL_ID == HIERARCHY_LEVEL.HL5) {
                    hl5Id = budgetSpendRequest.HL_ID;
                } else {
                    hl6Id = budgetSpendRequest.HL_ID;
                }
            }

            var requestor = dataBudgetSpendRequest.getRequestorEmailByBudgetSpendRequestId(eachReqBody.BUDGET_SPEND_REQUEST_ID);

            mailObject = {
                BUDGET_SPEND_REQUEST_ID: eachReqBody.BUDGET_SPEND_REQUEST_ID
                ,HL5_ID: eachReqBody.HL5_ID || eachReqBody.L5_ID || hl5Id || null
                ,HL6_ID: eachReqBody.HL6_ID || eachReqBody.L6_ID || hl6Id || null
                ,RECIPIENTS: [{address: dataBudgetSpendRequest.getRequestorEmailByBudgetSpendRequestId(eachReqBody.BUDGET_SPEND_REQUEST_ID).EMAIL}]
                ,HEADER: 'Dear Requestor,'
                ,NOTE: 'Your Budget Request is now Rejected.'
                ,FOOTER: 'The message is FYI Only, requiring no response.'
                ,REJECTION_REASON: eachReqBody.MESSAGE
            };

            var hl5budgetSpendRequestList = getSpendBudgetReportByRequestorId(requestor.REQUESTOR_ID, 'HL5', eachReqBody.BUDGET_SPEND_REQUEST_ID);
            var hl6budgetSpendRequestList = getSpendBudgetReportByRequestorId(requestor.REQUESTOR_ID, 'HL6', eachReqBody.BUDGET_SPEND_REQUEST_ID);
            var budgetSpendRequestList = hl5budgetSpendRequestList.concat(hl6budgetSpendRequestList);
            var objToMail = {
                mailObject: mailObject, budgetSpendRequestList: budgetSpendRequestList
            };
            arrToMail.push(objToMail);

        });

        //Update Status
        result = dataBudgetReport.rejectBudgetSpendRequest(arrayReqBody);

        if(result)
        {
            //Insert Log
            insertBudgetSpendRequestStatusLog(arrayLogs);

            //Insert Message
            dataBudgetReport.insertBudgetSpendRequestMessage(arrayMessages);

            sendBudgetSpendRequestEmail(arrToMail, userId);
        }
        else
            throw ErrorLib.getErrors().CustomError("Could not change status",
                "budgetSpendReportService/handlePut/approveBudgetSpendRequest", eachReqBody.BUDGET_SPEND_REQUEST_ID);


    } catch (e) {
        throw ErrorLib.getErrors().CustomError("",
            "budgetSpendReportService/handlePut/approveBudgetSpendRequest", e.toString());
    }
    return result;
}

// Delete Budget Spend Request
function deleteBudgetSpendRequest(reqBody, userId) {
    var result;

    var arrayData = [];
    var arrayLogs = [];
    var arrayMessages = [];
    var arrayReqBody = [];

    var params = {};
    var logParams = {};
    var messageParams = {};
    if (reqBody) {
        if (!reqBody.length) {
            arrayData.push(reqBody);
        } else {
            arrayData = reqBody;
        }

        try {

            arrayData.forEach(function (eachReqBody) {
                validateUpdateBasicData(eachReqBody, userId);
                if (!validateMessage(eachReqBody)) {
                    throw ErrorLib.getErrors().BadRequest("The Parameter MESSAGE is not found",
                        "budgetSpendReportService/handlePut/deleteBudgetSpendRequest", eachReqBody.MESSAGE);
                }

                var oldStatus = dataBudgetReport.getBudgetSpendRequestStatusById(eachReqBody.BUDGET_SPEND_REQUEST_ID);

                userId = userId || 1; //1 when come from other budget approver

                var budgetSpendRequest = {};
                if(eachReqBody.HASH)
                    budgetSpendRequest = dataBudgetSpendRequest.getBudgetSpendRequestByHash(eachReqBody.HASH);

                //Insert Log
                logParams.in_budget_spend_request_id = eachReqBody.BUDGET_SPEND_REQUEST_ID;
                logParams.in_status_id = Number(oldStatus.BUDGET_SPEND_REQUEST_STATUS_ID);
                logParams.in_created_user_id = userId;
                logParams.in_other_budget_approver_id = budgetSpendRequest.OTHER_BUDGET_APPROVER_ID || null;

                arrayLogs.push(logParams);

                //Insert Message
                messageParams.in_budget_spend_request_id = eachReqBody.BUDGET_SPEND_REQUEST_ID;
                messageParams.in_message = eachReqBody.MESSAGE;
                messageParams.in_budget_spend_request_origin_id = BUDGET_SPEND_REQUEST_ORIGIN.BUDGET_APPROVER;
                messageParams.in_user_id = userId;

                arrayMessages.push(messageParams);

                //Update Status
                params.in_budget_spend_request_id = eachReqBody.BUDGET_SPEND_REQUEST_ID;
                params.in_status_id = statusMap.NoLongerRequested;
                params.in_user_id = userId;

                arrayReqBody.push(params);
            });

            //Update Status
            result = dataBudgetReport.deleteBudgetSpendRequest(arrayReqBody);

        } catch (e) {
            throw ErrorLib.getErrors().CustomError("",
                "budgetSpendReportService/handlePut/deleteBudgetSpendRequest", e.toString());
        }
    }
    return result;
}

/** VALIDATION * */

// Validation of Budget Spend Request ID, user ID and user access
function validateUpdateBasicData(reqBody, userId) {
    if (!reqBody.BUDGET_SPEND_REQUEST_ID) {
        throw ErrorLib.getErrors().BadRequest("The Parameter BUDGET_SPEND_REQUEST_ID is not found",
            "budgetSpendReportService/handlePut/approveBudgetSpendRequest", reqBody.BUDGET_SPEND_REQUEST_ID);
    }
    if (!userId) {
        if (!reqBody.HASH)
            throw ErrorLib.getErrors().BadRequest("The Parameter userId is not found",
                "budgetSpendReportService/handlePut/approveBudgetSpendRequest", userId);
        else {
            var budgetSpendRequest = dataBudgetSpendRequest.getBudgetSpendRequestByHash(reqBody.HASH);
            if (budgetSpendRequest.BUDGET_SPEND_REQUEST_ID != reqBody.BUDGET_SPEND_REQUEST_ID)
                throw ErrorLib.getErrors().BadRequest("The Hash parameter does not match the budget spend request",
                    "budgetSpendReportService/handlePut/validateUpdateBasicData", userId);
        }
    }
    else{
        // Obtain HL2 based on the Budget Spend Request ID
        var relatedHL2 = dataBudgetReport.getHL2ByBudgetSpendRequestId(reqBody.BUDGET_SPEND_REQUEST_ID);

        if (relatedHL2 && Object.keys(relatedHL2).length === 0) {
            throw ErrorLib.getErrors().BadRequest(reqBody.BUDGET_SPEND_REQUEST_ID,
                "/getHL2ByBudgetSpendRequestId", "The Team related with the 'Budget Spend Request' could not be found");
        }

        // Verify if the user is in the Budget Approver list of the associated L2
        if (!businessUser.validateHL2BudgetApproverByUserId(relatedHL2.HL2_ID, userId)) {
            throw ErrorLib.getErrors().BadRequest(userId,
                "budgetSpendReportService/handlePut/approveBudgetSpendRequest", "The User is not an associated Budget Approver");
        }
    }
}

function validateMessage(reqBody) {
    return (reqBody.MESSAGE && reqBody.MESSAGE.length > 0);
}

function validateStatus(status) {
    return (Number(status) !== statusMap.NoLongerRequested);
}

function getSpendBudgetReportByHash(hash) {
    if (!hash) {
        throw ErrorLib.getErrors().BadRequest("The Parameter Hash is not found",
            "budgetSpendReportService/handleGet/getSpendBudgetReportByHash", hash);
    }

    var budgetSpendRequest = dataBudgetSpendRequest.getBudgetSpendRequestByHash(hash);
    var excludedStatus = statusMap.NoLongerRequested;
    var hlId = budgetSpendRequest.HL_ID;
    var result;
    if(budgetSpendRequest.HIERARCHY_LEVEL_ID == HIERARCHY_LEVEL.HL5) {
        result = getL5SpendBudgetReportById(hlId, budgetSpendRequest.BUDGET_SPEND_REQUEST_ID, excludedStatus, null);
    } else {
        result = getL6SpendBudgetReportById(hlId, budgetSpendRequest.BUDGET_SPEND_REQUEST_ID, excludedStatus, null);
    }

    if(result.BUDGET_SPEND_REQUEST_STATUS_ID == statusMap.NoLongerRequested)
        throw ErrorLib.getErrors().BadRequest("The budget spend request`s status is No Longer Requested",
            "budgetSpendReportService/handleGet/getSpendBudgetReportByHash", "");

    return result;
}

function sendBudgetApproversDailyNotification() {
    var busdgetRequestList = JSON.parse(JSON.stringify(dataBudgetReport.getBudgetSpendRequestForNotification()));
    var basicData = {
        APP_URL: config.getAppUrl(),
        ENVIRONMENT: config.getMailEnvironment()
    };

    var emailDetail = {};
    busdgetRequestList.forEach(function(bsr){
        if(bsr.BUDGET_APPROVER_EMAIL && bsr.BUDGET_APPROVER_NAME){
            if(emailDetail[bsr.BUDGET_APPROVER_ID] &&
                emailDetail[bsr.BUDGET_APPROVER_ID].BUDGET_APPROVER_EMAIL == bsr.BUDGET_APPROVER_EMAIL){
                emailDetail[bsr.BUDGET_APPROVER_ID].budgetRequestList.push({
                    CRM_ID: bsr.CRM_ID,
                    BUDGET_RESOURCE: bsr.BUDGET_RESOURCE,
                    BUDGET: bsr.BUDGET,
                    HASH: bsr.HASH,
                    HL_ID: bsr.HL_ID,
                    LEVEL: HIERARCHY_LEVEL_BY_ID[bsr.HIERARCHY_LEVEL_ID],
                    BUDGET_SPEND_REQUEST_ID: bsr.BUDGET_SPEND_REQUEST_ID
                });
            } else {
                emailDetail[bsr.BUDGET_APPROVER_ID] = {
                    BUDGET_APPROVER_EMAIL: bsr.BUDGET_APPROVER_EMAIL,
                    BUDGET_APPROVER_NAME: bsr.BUDGET_APPROVER_NAME,
                    IS_MPT_USER: bsr.IS_MPT_USER,
                    budgetRequestList: [{
                        CRM_ID: bsr.CRM_ID,
                        BUDGET_RESOURCE: bsr.BUDGET_RESOURCE,
                        BUDGET: bsr.BUDGET,
                        HASH: bsr.HASH,
                        HL_ID: bsr.HL_ID,
                        LEVEL: HIERARCHY_LEVEL_BY_ID[bsr.HIERARCHY_LEVEL_ID],
                        BUDGET_SPEND_REQUEST_ID: bsr.BUDGET_SPEND_REQUEST_ID
                    }]
                }
            }
        }
    });
    
    emailDetail = util.objectToArray(emailDetail);

    emailDetail.forEach(function(elem){
        var parsedMail = budgetReportMail.parseBudgetSpendRRequestForDailyNotification(elem, basicData);
        var mailObject = mail.getJson(parsedMail.budgetApproverEmail, parsedMail.subject, parsedMail.body);
        mail.sendMail(mailObject, true);
    });

    return true;
}