$.import("mktgplanningtool.services.commonLib", "mapper");
var mapper = $.mktgplanningtool.services.commonLib.mapper;
var db = mapper.getdbHelper();
var ErrorLib = mapper.getErrors();
/*************END INCLUDE LIBRARIES****************/
var spGetHLBySearch = "GET_HL_BY_SEARCH";

function getHLBySearch(parameters) {
	var params = {};
	params.IN_HL = parameters.HL;
	params.IN_SEARCH_STRING = parameters.SEARCH_STRING;
	params.IN_REGION_ID = parameters.REGION_ID;
	params.IN_SUBREGION_ID = parameters.SUBREGION_ID;
	params.IN_BUDGET_YEAR_ID = parameters.BUDGET_YEAR_ID;
	params.IN_LIMIT = parameters.LIMIT;
	params.IN_OFFSET = parameters.OFFSET;
	params.OUT_RESULT = '?';
	params.TOTAL_ROWS = '?';
	
	var object = {};
	var result = db.executeProcedure(spGetHLBySearch, params);
	
	object.result = db.extractArray(result.OUT_RESULT);
	object.total_rows = result.TOTAL_ROWS;
	
	return object;
}