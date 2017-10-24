$.import("mktgplanningtool.services.commonLib", "mapper");
var mapper = $.mktgplanningtool.services.commonLib.mapper;
var dataMarketingProgram = mapper.getDataMarketingProgram();
/** ***********END INCLUDE LIBRARIES*************** */


var MARKETING_PROGRAM_EXISTS = "A marketing program with that name already exists";

function getAllMarketingProgram(idCampaignType) {
    return dataMarketingProgram.getAllMarketingProgram();
}

function insertMarketingProgram(payload, userId) {

    if (existMarketingProgramByName(payload)) {
        throw ErrorLib.getErrors().BadRequest("", "marketingProgramService/handlePost/insertMarketingProgram", MARKETING_PROGRAM_EXISTS);
    }

    return dataMarketingProgram.insertMarketingProgram(payload.IN_NAME, payload.IN_DESCRIPTION || payload.IN_NAME, userId);
}

function insertMarketingProgramForUpload(name, description, userId){
    return insertMarketingProgram({IN_NAME: name, IN_DESCRIPTION: description}, userId);
}

function existMarketingProgramByName(payload) {
    var marketingProgram = dataMarketingProgram.getMarketingProgramByName(payload.IN_NAME);
    return !!(marketingProgram && marketingProgram.MARKETING_PROGRAM_ID != payload.IN_MARKETING_PROGRAM_ID);

}

function updateMarketingProgram(campaignSubTypeData, userId) {
    if (existMarketingProgramByName(campaignSubTypeData)) {
        throw ErrorLib.getErrors().BadRequest("", "marketingProgramService/handlePost/insertMarketingProgram", MARKETING_PROGRAM_EXISTS);
    }

    return dataMarketingProgram.updateMarketingProgram(campaignSubTypeData.IN_MARKETING_PROGRAM_ID, campaignSubTypeData.IN_NAME, campaignSubTypeData.IN_DESCRIPTION || campaignSubTypeData.IN_NAME, userId);
}

function deleteMarketingProgram(marketingProgram, userId, confirm) {

    if (!marketingProgram.IN_MARKETING_PROGRAM_ID)
        throw ErrorLib.getErrors().CustomError("",
            "marketingProgramServices/handleDelete/deleteMarketingProgram",
            "The MARKETING_PROGRAM_ID is not found");
    if (confirm) {
        return dataMarketingProgram.deleteMarketingProgram(marketingProgram.IN_MARKETING_PROGRAM_ID, userId);
    } else {
        var countRegisters = dataMarketingProgram.checkInUseMarketingProgramById(marketingProgram.IN_MARKETING_PROGRAM_ID);
        var retValue = 0;
        if (countRegisters > 0)
            throw ErrorLib.getErrors().ConfirmDelete("",
                "marketingProgramServices/handleDelete/checkInUseMarketingProgramById",
                countRegisters);
        else
            retValue = dataMarketingProgram.deleteMarketingProgram(marketingProgram.IN_MARKETING_PROGRAM_ID, userId);

        return retValue;
    }
}

function checkMarketingProgram(data){
    var marketingProgramList = data.check;
    var marketingProgramToUpdate = 0;
    var marketingProgramToInsert = 0;
    marketingProgramList.forEach(function(marketingProgram){
        if(dataMarketingProgram.getMarketingProgramByName(marketingProgram.in_name)){
            marketingProgramToUpdate++;
        } else {
            marketingProgramToInsert++;
        }
    });

    return {marketingProgramToInsert: marketingProgramToInsert, marketingProgramToUpdate: marketingProgramToUpdate};
}

function uploadMarketingProgram(data, userId) {
    var marketingProgramList = data.batch;
    var marketingProgramUpdated = 0;
    var marketingProgramCreated = 0;
    var marketingProgramId;
    marketingProgramList.forEach(function(marketingProgram){
        var mp = dataMarketingProgram.getMarketingProgramByName(marketingProgram.in_name);

        if(!mp || !mp.MARKETING_PROGRAM_ID){
            marketingProgramId = insertMarketingProgramForUpload(marketingProgram.in_name, marketingProgram.in_description, userId);
            marketingProgramCreated++;
        } else {
            dataMarketingProgram.updateMarketingProgram(mp.MARKETING_PROGRAM_ID, marketingProgram.in_name
                , marketingProgram.in_description || marketingProgram.in_name, userId);
            marketingProgramUpdated++;
        }
    });
    return {marketingProgramCreated: marketingProgramCreated, marketingProgramUpdated: marketingProgramUpdated};
}