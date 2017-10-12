/***************Import Library*******************/
$.import("mktgplanningtool.services.commonLib", "mapper");
var mapper = $.mktgplanningtool.services.commonLib.mapper;
var ErrorLib = mapper.getErrors();
var dataPriority = mapper.getDataPriority();

/*************************************************/


function getAllPriority() {
    return dataPriority.getAllPriority();
}

function insertPriority(description, crmKey, userId) {
    return dataPriority.insertPriority(description, crmKey, userId);
}


function updatePriority(priority_id, name, crmKey, userId) {
    return dataPriority.updatePriority(priority_id, name, crmKey, userId);
}

function deletePriority(priority_id, userId) {
    return dataPriority.deletePriority(priority_id, userId);
}
