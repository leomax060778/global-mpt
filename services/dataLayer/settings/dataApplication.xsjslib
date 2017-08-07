/***************Import Library*******************/
$.import("mktgplanningtool.services.commonLib","mapper");
var mapper = $.mktgplanningtool.services.commonLib.mapper;
var db = mapper.getdbHelper();
/*************************************************/
var spGET_APPLICATION_INFO = "GET_APPLICATION_INFO";
/******************************************************/

function getApplicationInfo(){
    var result = db.executeProcedure(spGET_APPLICATION_INFO,{});
    return db.extractArray(result['out_result'])[0];
}
