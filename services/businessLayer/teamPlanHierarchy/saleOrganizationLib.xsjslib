$.import("mktgplanningtool.services.commonLib", "mapper");
var mapper = $.mktgplanningtool.services.commonLib.mapper;
var dataSaleOrganization = mapper.getDataSalesOrganization();
/** ***********END INCLUDE LIBRARIES*************** */

function getAllSaleOrganization() {
	return dataSaleOrganization.getAllSaleOrganization();
}
