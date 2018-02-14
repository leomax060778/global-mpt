$.import("mktgplanningtool.services.commonLib", "mapper");
var mapper = $.mktgplanningtool.services.commonLib.mapper;
var db = mapper.getdbHelper();
var ErrorLib = mapper.getErrors();
/*************END INCLUDE LIBRARIES****************/
var spGetHLBySearch = "GET_HL_BY_SEARCH";

function getHLBySearch(hl, searchString, regionId, subregionId) {
	var params = {};
	params.IN_HL = hl;
	params.IN_SEARCH_STRING = searchString;
	params.IN_REGION_ID = regionId;
	params.IN_SUBREGION_ID = subregionId;
	params.OUT_RESULT = '?';
	
	var result = db.extractArray(db.executeProcedure(spGetHLBySearch, params).OUT_RESULT);
	return result;
}