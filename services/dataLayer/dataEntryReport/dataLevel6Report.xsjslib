$.import("mktgplanningtool.services.commonLib", "mapper");
var mapper = $.mktgplanningtool.services.commonLib.mapper;
var db = mapper.getdbHelper();
var ErrorLib = mapper.getErrors();
/*************END INCLUDE LIBRARIES****************/

// List of stored procedures
var GET_ALL_HL6_DE_REPORT = "GET_HL6_DE_REPORT";
var spGetL6ChangedFieldsByHl6Id = "GET_HL6_CHANGED_FIELDS_BY_HL6_ID";
var GET_PROCESSING_REPORT_FOR_DOWNLOAD = "GET_PROCESSING_REPORT_FOR_DOWNLOAD";
var GET_ALL_HL6_CHANGED_FIELDS = "GET_ALL_HL6_CHANGED_FIELDS";
var spDelL6ChangedFieldsByHl6Id = "DEL_HL6_CRM_BINDING";
var GET_HL6_FOR_PROCESSING_REPORT = "GET_HL6_FOR_PROCESSING_REPORT";
var UPD_PROCESSING_REPORT_EXPORT_DATA = "UPD_PROCESSING_REPORT_EXPORT_DATA";
var spMassDelL6ChangedFieldsByHl6Id = "DEL_MASS_HL6_CRM_BINDING";
var GET_REPORT_DELETION_REQUEST = "GET_REPORT_DELETION_REQUEST";

/*********** END LIST OF PROCEDURES ***************/

function getAllLevel6Report(userId) {
	var data = db.executeProcedureManual(GET_ALL_HL6_DE_REPORT, {});
    return db.extractArray(data.out_result);
}
function getAllL6CreateInCrmDEReportForDownload() {
    var data = db.executeProcedureManual(GET_PROCESSING_REPORT_FOR_DOWNLOAD, {in_object_type: 'CPT'});
    return db.extractArray(data.out_result);
}
function getAllHL6ChangedFields() {
    var data = db.executeProcedureManual(GET_ALL_HL6_CHANGED_FIELDS, {});
    return {
        out_hl6_changed_fields: db.extractArray(data.out_hl6_changed_fields),
        out_hl6: db.extractArray(data.out_hl6),
        out_hl6_category_options: db.extractArray(data.out_hl6_category_options),
        out_hl6_extra_fields: db.extractArray(data.out_hl6_extra_fields)
    };
}

function updateLevel6ReportForDownload(HL6_ID) {
	var data = db.executeProcedureManual(UPD_PROCESSING_REPORT_EXPORT_DATA, {IN_HL_ID:HL6_ID, IN_HIERARCHY_LEVEL: 'HL6'});
	return db.extractArray(data.out_result);
}

function getL6ForProcessingReportByHl6Id(id){
	if(id){
		var result = {};
		var rdo = db.executeProcedureManual(GET_HL6_FOR_PROCESSING_REPORT,{'in_hl6_id':id});
		result.hl6 = db.extractArray(rdo.out_result)[0];
		result.marketing_activity_id = db.extractArray(rdo.out_marketing_activity_id)[0];
		return result;
	}
	return null;
}

function getL6ChangedFieldsByHl6Id(id){
	if(id){
		var rdo = db.executeProcedureManual(spGetL6ChangedFieldsByHl6Id,{'in_hl6_id':id});
		return db.extractArray(rdo.out_hl6_changed_fields);
	}	
	return null;
}

function deleteL6ChangedFieldsByHl6Id(id){
	if(id){
		
		var rdo = db.executeScalarManual(spDelL6ChangedFieldsByHl6Id,{'in_hl6_id':id}, 'out_result');
		return rdo;
	}	
	return null;
}

function massDeleteL6ChangedFieldsByHl6Id(ids) {
    if (id) {
        var rdo = db.executeScalarManual(spMassDelL6ChangedFieldsByHl6Id, {'in_hl6_ids': ids}, 'out_result');
        return rdo;
    }
    return null;
}

function getAllHL6DeletionRequest(level){
    var rdo = db.executeProcedureManual(GET_REPORT_DELETION_REQUEST, {'IN_LEVEL': level});
    return db.extractArray(rdo.out_result);
}