/***************Import Library*******************/
$.import("mktgplanningtool.services.commonLib","mapper");
var mapper = $.mktgplanningtool.services.commonLib.mapper;
var db = mapper.getdbHelper();
var ErrorLib = mapper.getErrors();
/*************************************************/

/***************SPs******************************/
var GET_SYSUUID = "GET_SYSUUID";
/*************************************************/

function getHash(name){
    var rdo = db.extractArray(db.executeProcedure(GET_SYSUUID, {}).out_result);

    if(rdo.length)
        return rdo[0].SYS_UNIQUE_NUMBER;

    return null;
}