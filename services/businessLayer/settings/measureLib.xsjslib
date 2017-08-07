/***************Import Library*******************/
$.import("mktgplanningtool.services.commonLib","mapper");
var mapper = $.mktgplanningtool.services.commonLib.mapper;
var ErrorLib = mapper.getErrors();
var dbMeasure = mapper.getDataMeasure();
/*************************************************/


function getAllMeasure(){
	return dbMeasure.getAllMeasure();
}
