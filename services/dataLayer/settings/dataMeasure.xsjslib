/***************Import Library*******************/
$.import("mktgplanningtool.services.commonLib","mapper");
var mapper = $.mktgplanningtool.services.commonLib.mapper;
var db = mapper.getdbHelper();
var ErrorLib = mapper.getErrors();
/*************************************************/
var spGET_ALL_MEASURE = "GET_ALL_MEASURE";
var GET_MEASURE_BY_SYMBOL = "GET_MEASURE_BY_SYMBOL";
/******************************************************/


function getAllMeasure(){
    var result =  db.extractArray((db.executeProcedure(spGET_ALL_MEASURE, {}, "out_result")).out_result);
	var rdo = {};
	rdo.results = result;
	return rdo;
}

function getMeasureBySymbol(symbol){
	var params = {
		'in_symbol' : symbol
	};
	var result = db.executeProcedureManual(GET_MEASURE_BY_SYMBOL, params);
	return db.extractArray(result.out_result)[0];
}