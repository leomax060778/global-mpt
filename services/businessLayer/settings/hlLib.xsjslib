/***************Import Library*******************/
$.import("mktgplanningtool.services.commonLib","mapper");
var mapper = $.mktgplanningtool.services.commonLib.mapper;
var dataHl = mapper.getDataHl();
var ErrorLib = mapper.getErrors();
var util = mapper.getUtil();
/*************************************************/

function getAllHl(userId){
    var hl = dataHl.getAllHl();
    return hl;
};