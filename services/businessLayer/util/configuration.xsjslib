/****** libs ************/
$.import("mktgplanningtool.services.commonLib","mapper");
var mapper = $.mktgplanningtool.services.commonLib.mapper;
var ErrorLib = mapper.getErrors();
var config = mapper.getDataConfig();
/******************************************/

function getConfigurationByName(name){
	return config.getConfigurationByName(name);
}
