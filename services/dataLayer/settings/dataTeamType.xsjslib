/***************Import Library*******************/
$.import("mktgplanningtool.services.commonLib","mapper");
var mapper = $.mktgplanningtool.services.commonLib.mapper;
var db = mapper.getdbHelper();
var ErrorLib = mapper.getErrors();
/*************************************************/

var GET_ALL_TEAM_TYPE = "GET_ALL_TEAM_TYPE";

/****** GET ******/

function getAllTeamType(){
	var result = db.executeProcedureManual(GET_ALL_TEAM_TYPE, {});
	return db.extractArray(result.OUT_RESULT);
}