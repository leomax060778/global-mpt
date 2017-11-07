/***************Import Library*******************/
$.import("mktgplanningtool.services.commonLib","mapper");
var mapper = $.mktgplanningtool.services.commonLib.mapper;
var ErrorLib = mapper.getErrors();
var dbMO = mapper.getDataMarketingOrganization();
/*************************************************/

var hierarchyLevel = {
	'HL4' : 1,
	'HL5' : 2,
	'HL6' : 3
};

function getAllMarketingOrganization(){
	return dbMO.getAllMarketingOrganization();
}

function getAllMarketingOrganizationByLevelHlId(level, hlId){
	return dbMO.(hierarchyLevel[level.toUpperCase()], hlId);
}

function InsertMarketingOrganization(organization, userId){
	if(organization)
		return dbMO.InsertMarketingOrganization(organization.NAME, organization.CRM_KEY, userId, true);
	return ErrorLib.getErrors().BadRequest("","","Marketing Organization is empty");
}

function UpdateMarketingOrganization(organization, userId){
	if(organization)
		return dbMO.UpdateMarketingOrganization(organization.SALES_ORGANIZATION_ID, organization.NAME, organization.CRM_KEY, userId, true);
	return ErrorLib.getErrors().BadRequest("","","Marketing Organization is empty");
}

function DeleteMarketingOrganization(organization, userId){
	if(organization.SALES_ORGANIZATION_ID){
		if(dbMO.getMarketingOrganizationUses(organization.SALES_ORGANIZATION_ID))
            throw ErrorLib.getErrors().CustomError("",
                "marketingOrganizationServices/handleDelete/delMarketingOrganization/DeleteMarketingOrganization",
                "Cannot delete this marketing organization, it´s in use.");

        return dbMO.DeleteMarketingOrganization(organization.SALES_ORGANIZATION_ID, userId, true);
    }
	return ErrorLib.getErrors().BadRequest("","","Marketing Organization is empty");
}

function getMarketingOrganizationById(id){
	if(id)
		return dbMO.getMarketingOrganizationById(id);
	return ErrorLib.getErrors().BadRequest("","","Marketing Organization Id is empty");
}

function checkMarketingOrganization(data){
	var marketingOrganizationList = data.check;
	var marketingOrganizationToUpdate = 0;
	var marketingOrganizationToInsert = 0;
	marketingOrganizationList.forEach(function(marketingOrganization){
		if(dbMO.getMarketingOrganizationByName(marketingOrganization.in_name)){
			marketingOrganizationToUpdate++;
		} else {
			marketingOrganizationToInsert++;
		}
	});

	return {marketingOrganizationToCreate: marketingOrganizationToInsert, marketingOrganizationToUpdate: marketingOrganizationToUpdate};
}

function uploadMarketingOrganization(data, userId) {
	var marketingOrganizationList = data.batch;
	var marketingOrganizationUpdated = 0;
	var marketingOrganizationCreated = 0;
	var markOrgId;
	marketingOrganizationList.forEach(function(marketingOrganization){
		var mo = dbMO.getMarketingOrganizationByName(marketingOrganization.in_name);
		if(!mo || !mo.SALES_ORGANIZATION_ID){
			markOrgId = dbMO.InsertMarketingOrganization(
				marketingOrganization.in_name, marketingOrganization.in_crm_key, userId);
			marketingOrganizationCreated++;
		} else {
			dbMO.UpdateMarketingOrganization(
				mo.SALES_ORGANIZATION_ID, marketingOrganization.in_name, marketingOrganization.in_crm_key, userId);
			marketingOrganizationUpdated++;
		}
	});
	return {marketingOrganizationCreated: marketingOrganizationCreated,
		marketingOrganizationUpdated: marketingOrganizationUpdated};
}
