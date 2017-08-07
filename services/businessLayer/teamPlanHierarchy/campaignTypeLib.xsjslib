$.import("mktgplanningtool.services.commonLib", "mapper");
var mapper = $.mktgplanningtool.services.commonLib.mapper;
var dataCampaignType = mapper.getDataCampaignType();
/** ***********END INCLUDE LIBRARIES*************** */

function getAllCampaignType() {
	return dataCampaignType.getAllCampaignType();
}

function getCampaignTypeById(idCampaignType) {
	return dataCampaignType.getCampaignTypeById(idCampaignType);
}
