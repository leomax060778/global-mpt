/***************Import Library*******************/
$.import("mktgplanningtool.services.commonLib","mapper");
var mapper = $.mktgplanningtool.services.commonLib.mapper;
var dataSearch = mapper.getDataSearch();
var ErrorLib = mapper.getErrors();
/*************************************************/

function getHLBySearch(hl, searchString, regionId, subregionId){
	var searchResult = dataSearch.getHLBySearch(hl, searchString, regionId, subregionId);
	return searchResult;	
}