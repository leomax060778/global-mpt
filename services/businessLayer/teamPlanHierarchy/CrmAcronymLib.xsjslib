$.import("mktgplanningtool.services.commonLib","mapper");
var mapper = $.mktgplanningtool.services.commonLib.mapper;
var dataCrmAcronym = mapper.getDataCrmAcronym();
var ErrorLib = mapper.getErrors();


function insertUploadCrmAcronym(listUpload, userId){
	for(var i = 0; i < listUpload.length ; i++){
        var hl3_id = dataCrmAcronym.getHl3CrmAcronymByAcronym(listUpload.HL3).hl3_crm_acronym_id;
		if(!hl3_id){
			 hl3_id = dataCrmAcronym.insertHl3CrmAcronym(listUpload.HL3);
		}
        var hl4_id = dataCrmAcronym.getHl4CrmAcronymByAcronym(listUpload.HL4).hl4_crm_acronym_id;
        if(!hl4_id){
            hl4_id = dataCrmAcronym.insertHl4CrmAcronym(listUpload.HL4);
        }
        dataCrmAcronym.updateHl4_HL3_CrmAcronym(hl3_id,hl4_id, userId)
	}
}

/*********************HL4****************************/
function getAllHL4CrmAcronym() {
	return dataCrmAcronym.getAllHl4CrmAcronym();
}

function getHl4CrmAcronymById(hl4CrmAcronymId, userId) {
	if (!userId)
		throw ErrorLib.getErrors().BadRequest(
				"The Parameter userId is not found",
				"", userId);
	if (!hl4CrmAcronymId)
		throw ErrorLib.getErrors().BadRequest(
				"The Parameter hl4CrmAcronymId is not found",
				"", hl4CrmAcronymId);

	return dataCrmAcronym.getHl4CrmAcronymById(hl4CrmAcronymId);
}

function getHl4CrmAcronymByHL3Id(hl3CrmAcronymId){
	return dataCrmAcronym.getHl4CrmAcronymByHL3Id(hl3CrmAcronymId);
}

function getHl4CrmAcronymByHL3Acronym(hl3Acronym){
    return dataCrmAcronym.getHl4CrmAcronymByHL3Acronym(hl3Acronym);
}

function insertHl4CrmAcronym(reqBody, userId) {

		return dataCrmAcronym.insertHl4CrmAcronym(reqBody, userId);
}

function updateHl4CrmAcronym(reqBody, userId) {

		if (!existHl4CrmAcronym(reqBody.HL4_CRM_ACRONYM_ID, userId)) {
			throw ErrorLib.getErrors().CustomError("",
					"",
					"The object HL4 CrmAcronym doesn't exist");
		} else {
			return dataCrmAcronym.updateHl4CrmAcronym(reqBody, userId);
		}

}

function updateHl4ByHl3CrmAcronym(hl3_id,hl4_list, userId){
        return  dataCrmAcronym.updateHl4ByHl3CrmAcronym(hl3_id, hl4_list, userId);
}

function deleteHl4CrmAcronym(hl4CrmAcronymId, userId) {
	if (!userId)
		throw ErrorLib.getErrors().BadRequest(
				"The Parameter userId is not found",
				"", userId);
	if (!hl4CrmAcronymId)
		throw ErrorLib.getErrors().BadRequest(
				"The Parameter hl4CrmAcronymId is not found",
				"", hl4CrmAcronymId);
	if (!existHl4CrmAcronym(hl4CrmAcronymId, userId)) {
		throw ErrorLib.getErrors().CustomError("",
				"",
				"The object HL4 CrmAcronym doesn't exist");
	}

	return dataCrmAcronym.deleteHl4CrmAcronym(hl4CrmAcronymId, userId);
}


function insertUploadHL4CrmAcronym(listUpload, userId){
    for(var i = 0; i < listUpload.length ; i++){
        var hl4_id = dataCrmAcronym.getHl4CrmAcronymByAcronym(listUpload[i].crm_id).hl4_crm_acronym_id;
        if(!hl4_id){
            dataCrmAcronym.insertHl4CrmAcronym({ACRONYM: listUpload[i].crm_id, CRM_DESCRIPTION:listUpload[i].description}, userId);
        }else{
            dataCrmAcronym.updateHl4CrmAcronym({ACRONYM:listUpload[i].crm_id,CRM_DESCRIPTION:listUpload[i].description,
                HL4_CRM_ACRONYM_ID:hl4_id}, userId);
        }
    }
    return true;
}

function existHl4CrmAcronym(hl4CrmAcronymId, userId) {
	return getHl4CrmAcronymById(hl4CrmAcronymId, userId).length > 0;
}

/**************HL3****************************************/

function getAllHL3CrmAcronym() {
    return dataCrmAcronym.getAllHl3CrmAcronym();
}

function getHl3CrmAcronymById(hl3CrmAcronymId, userId) {
    if (!userId)
        throw ErrorLib.getErrors().BadRequest(
            "The Parameter userId is not found",
            "", userId);
    if (!hl3CrmAcronymId)
        throw ErrorLib.getErrors().BadRequest(
            "The Parameter hl3CrmAcronymId is not found",
            "", hl3CrmAcronymId);

    return dataCrmAcronym.getHl3CrmAcronymById(hl3CrmAcronymId);
}

function insertHl3CrmAcronym(reqBody, userId) {

        return dataCrmAcronym.insertHl3CrmAcronym(reqBody, userId);

}

function updateHl3CrmAcronym(reqBody, userId) {

        if (!existHl3CrmAcronym(reqBody.HL3_CRM_ACRONYM_ID, userId)) {
            throw ErrorLib.getErrors().CustomError("",
                "",
                "The object HL3 CrmAcronym doesn't exist");
        } else {
            return dataCrmAcronym.updateHl3CrmAcronym(reqBody, userId);
        }

}

function deleteHl3CrmAcronym(hl3CrmAcronymId, userId) {
    if (!userId)
        throw ErrorLib.getErrors().BadRequest(
            "The Parameter userId is not found",
            "", userId);
    if (!hl3CrmAcronymId)
        throw ErrorLib.getErrors().BadRequest(
            "The Parameter hl3CrmAcronymId is not found",
            "", hl3CrmAcronymId);
    if (!existHl3CrmAcronym(hl3CrmAcronymId, userId)) {
        throw ErrorLib.getErrors().CustomError("",
            "",
            "The object HL3 CrmAcronym doesn't exist");
    }

    return dataCrmAcronym.deleteHl3CrmAcronym(hl3CrmAcronymId, userId);
}

function existHl3CrmAcronym(hl3CrmAcronymId, userId) {
    return getHl3CrmAcronymById(hl3CrmAcronymId, userId).length > 0;
}

function insertUploadHL3CrmAcronym(listUpload, userId){

    for(var i = 0; i < listUpload.length ; i++){
        var hl3_id = dataCrmAcronym.getHl3CrmAcronymByAcronym(listUpload[i].crm_id).hl3_crm_acronym_id;
        if(!hl3_id){
            dataCrmAcronym.insertHl3CrmAcronym({ACRONYM: listUpload[i].crm_id, CRM_DESCRIPTION:listUpload[i].description}, userId);
        }else{
        	dataCrmAcronym.updateHl3CrmAcronym({ACRONYM:listUpload[i].crm_id,CRM_DESCRIPTION:listUpload[i].description,
				HL3_CRM_ACRONYM_ID:hl3_id}, userId);
		}
    }
    return true;
}
