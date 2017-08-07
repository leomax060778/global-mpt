/** *************Import Library****************** */
$.import("mktgplanningtool.services.commonLib", "mapper");
var mapper = $.mktgplanningtool.services.commonLib.mapper;
var data = mapper.getDataResource();
var ErrorLib = mapper.getErrors();
var util = mapper.getUtil();
/** ********************************************** */

function getAllResource() {
	return data.getAllResource();
}