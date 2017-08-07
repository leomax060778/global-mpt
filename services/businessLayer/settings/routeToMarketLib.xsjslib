$.import("mktgplanningtool.services.commonLib", "mapper");
var mapper = $.mktgplanningtool.services.commonLib.mapper;
var dataRouteToMarket = mapper.getDataRouteToMarket();
/** ***********END INCLUDE LIBRARIES*************** */

function getAllRouteToMarket() {
	return dataRouteToMarket.getAllRouteToMarket();
}
