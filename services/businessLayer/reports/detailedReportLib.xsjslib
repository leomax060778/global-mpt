/***************Import Library*******************/
$.import("mktgplanningtool.services.commonLib","mapper");
var mapper = $.mktgplanningtool.services.commonLib.mapper;
var dataDetailedReport = mapper.getDataDetailedReport();
var ErrorLib = mapper.getErrors();
/*************************************************/

function getL4DetailedReport(){
	var detailedReport = dataDetailedReport.getL4DetailedReport();
	return detailedReport;	
}

function getL5DetailedReport(){
	var detailedReport = dataDetailedReport.getL5DetailedReport();
	return detailedReport;	
}