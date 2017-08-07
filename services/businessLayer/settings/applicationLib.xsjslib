/***************Import Library*******************/
$.import("mktgplanningtool.services.commonLib","mapper");
var mapper = $.mktgplanningtool.services.commonLib.mapper;
var ErrorLib = mapper.getErrors();
var dbApplication = mapper.getDataApplication();
var util = mapper.getUtil();
/*************************************************/

function getApplicationInfo() {
	return dbApplication.getApplicationInfo();
}