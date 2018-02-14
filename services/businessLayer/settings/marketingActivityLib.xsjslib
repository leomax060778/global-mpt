$.import("mktgplanningtool.services.commonLib", "mapper");
var mapper = $.mktgplanningtool.services.commonLib.mapper;
var dataMarketingActivity = mapper.getDataMarketingActivity();
/** ***********END INCLUDE LIBRARIES*************** */


var MARKETING_ACTIVITY_EXISTS = "A marketing activity with that name already exists";

function getAllMarketingActivity() {
    return dataMarketingActivity.getAllMarketingActivity();
}

function insertMarketingActivity(data, userId) {
    if (existMarketingActivityByName(data)) {
        throw ErrorLib.getErrors().BadRequest("", "", MARKETING_ACTIVITY_EXISTS);
    }

    return dataMarketingActivity.insertMarketingActivity(
        data.IN_NAME
        , data.IN_DESCRIPTION || data.IN_NAME
        , userId);
}

function insertMarketingActivityForUpload(name, description, userId){
    return insertMarketingActivity({IN_NAME: name, IN_DESCRIPTION: description}, userId);
}

function existMarketingActivityByName(data) {
    var marketingActivity = dataMarketingActivity.getMarketingActivityByName(data.IN_NAME);
    return !!(marketingActivity && marketingActivity.MARKETING_ACTIVITY_ID != data.IN_MARKETING_ACTIVITY_ID);
}

function updateMarketingActivity(data, userId) {
    if (existMarketingActivityByName(data)) {
        throw ErrorLib.getErrors().BadRequest("", "", MARKETING_ACTIVITY_EXISTS);
    }

    return dataMarketingActivity.updateMarketingActivity(
        data.IN_MARKETING_ACTIVITY_ID
        , data.IN_NAME
        , data.IN_DESCRIPTION || data.IN_NAME
        , userId);
}

function deleteMarketingActivity(data, userId, confirm) {
    if(!data.MARKETING_ACTIVITY_IDS){
        data.MARKETING_ACTIVITY_IDS = [data.IN_MARKETING_ACTIVITY_ID];
    }

    data.MARKETING_ACTIVITY_IDS.forEach(function (marketingActivityId) {
        if (!marketingActivityId)
            throw ErrorLib.getErrors().CustomError("",
                "",
                "The MARKETING_ACTIVITY_ID is not found");
        if (confirm) {
            dataMarketingActivity.deleteMarketingActivity(marketingActivityId, userId);
        } else {
            var countRegisters = dataMarketingActivity.checkInUseMarketingActivityById(marketingActivityId);
            var retValue = 0;
            if (countRegisters > 0){
                throw ErrorLib.getErrors().ConfirmDelete("", "", countRegisters);
            }
            else {
                retValue = dataMarketingActivity.deleteMarketingActivity(marketingActivityId, userId);
            }
        }
    });
    return true;
}

function getByName(name){
    return dataMarketingActivity.getMarketingActivityByName(name);
}

function insertEntity(data, userId) {
    return insertMarketingActivity(data, userId);
}

function updateEntity(data, userId) {
    return updateMarketingActivity(data, userId);
}

