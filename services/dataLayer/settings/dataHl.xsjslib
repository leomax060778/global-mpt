/***************Import Library*******************/
$.import("mktgplanningtool.services.commonLib","mapper");
var mapper = $.mktgplanningtool.services.commonLib.mapper;
var db = mapper.getdbHelper();
var ErrorLib = mapper.getErrors();
/*************************************************/
var spGetAllHl = "GET_ALL_HIERARCHY_LEVEL";
/******************************************************/

function getAllHl(){
    var rdo = db.executeProcedure(spGetAllHl, {});
    return db.extractArray(rdo.out_result);
};