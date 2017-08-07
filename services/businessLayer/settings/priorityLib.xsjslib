/***************Import Library*******************/
$.import("mktgplanningtool.services.commonLib","mapper");
var mapper = $.mktgplanningtool.services.commonLib.mapper;
var ErrorLib = mapper.getErrors();
var dataPriority = mapper.getDataPriority();
/*************************************************/


function getAllPriority(){
	return dataPriority.getAllPriority();
}
