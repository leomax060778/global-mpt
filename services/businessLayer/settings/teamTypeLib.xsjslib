$.import("mktgplanningtool.services.commonLib", "mapper");
var mapper = $.mktgplanningtool.services.commonLib.mapper;
var util = mapper.getUtil();
var ErrorLib = mapper.getErrors();
var dataTeamType = mapper.getDataTeamType();
/** ***********END INCLUDE LIBRARIES*************** */

/****** GET ******/

function getAllTeamType(){
	return dataTeamType.getAllTeamType();
}