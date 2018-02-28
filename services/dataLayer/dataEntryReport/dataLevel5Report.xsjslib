$.import("mktgplanningtool.services.commonLib", "mapper");
var mapper = $.mktgplanningtool.services.commonLib.mapper;
var db = mapper.getdbHelper();
var ErrorLib = mapper.getErrors();
/*************END INCLUDE LIBRARIES****************/

// List of stored procedures
var GET_ALL_HL5_DE_REPORT = "GET_HL5_DE_REPORT";
var GET_HL5_FOR_PROCESSING_REPORT = "GET_HL5_FOR_PROCESSING_REPORT";
var GET_PROCESSING_REPORT_FOR_DOWNLOAD = "GET_PROCESSING_REPORT_FOR_DOWNLOAD";
var GET_ALL_HL5_CHANGED_FIELDS = "GET_ALL_HL5_CHANGED_FIELDS";
var spGetL5ChangedFieldsByHl5Id = "GET_HL5_CHANGED_FIELDS_BY_HL5_ID";
var spDelL5ChangedFieldsByHl5Id = "DEL_HL5_CRM_BINDING";
var UPD_PROCESSING_REPORT_EXPORT_DATA = "UPD_PROCESSING_REPORT_EXPORT_DATA";
var spMassDelL5ChangedFieldsByHl5Id = "DEL_MASS_HL5_CRM_BINDING";
var GET_REPORT_DELETION_REQUEST = "GET_REPORT_DELETION_REQUEST";

/*********** END LIST OF PROCEDURES ***************/

function getAllLevel5Report(userId) {
	var parameters = {};
	var result = db.executeProcedureManual(GET_ALL_HL5_DE_REPORT, {});
	var list = result['out_result'];
	var spResult = [];
	Object.keys(list).forEach(function(key) {
		spResult.push(list[key]);
	});
	return spResult;
}
function getAllL5CreateInCrmDEReportForDownload() {
    var data = db.executeProcedureManual(GET_PROCESSING_REPORT_FOR_DOWNLOAD, {in_object_type: 'CPG'});
    return db.extractArray(data.out_result);
}
function getAllHL5ChangedFields() {
    var data = db.executeProcedureManual(GET_ALL_HL5_CHANGED_FIELDS, {});
    return {
        out_hl5_changed_fields: db.extractArray(data.out_hl5_changed_fields),
        out_hl5: db.extractArray(data.out_hl5),
        out_hl5_category_options: db.extractArray(data.out_hl5_category_options),
        out_hl5_extra_fields: db.extractArray(data.out_hl5_extra_fields)
    };
}

function updateLevel5ReportForDownload(HL5_ID) {
	var data = db.executeProcedureManual(UPD_PROCESSING_REPORT_EXPORT_DATA, {IN_HL_ID:HL5_ID, IN_HIERARCHY_LEVEL: 'HL5'});
	return db.extractArray(data.out_result);
}

function getL5ChangedFieldsByHl5Id(id){
	if(id){
		var rdo = db.executeProcedureManual(spGetL5ChangedFieldsByHl5Id,{'in_hl5_id':id});
		return db.extractArray(rdo.out_hl5_changed_fields);
	}	
	return null;
}

function getL5ForProcessingReportByHl5Id(id){
    if(id){
        var result = {};
    	var rdo = db.executeProcedureManual(GET_HL5_FOR_PROCESSING_REPORT,{'in_hl5_id':id});
        result.hl5 = db.extractArray(rdo.out_result)[0];
        result.marketing_activity_id = db.extractArray(rdo.out_marketing_activity_id)[0];
        return result;
    }
    return null;
}

function deleteL5ChangedFieldsByHl5Id(id){
	if(id){
		var rdo = db.executeScalarManual(spDelL5ChangedFieldsByHl5Id,{'in_hl5_id':id}, 'out_result');
		return rdo;
	}	
	return null;
}
function massDeleteL5ChangedFieldsByHl5Id(ids) {
    if (id) {
        var rdo = db.executeScalarManual(spMassDelL5ChangedFieldsByHl5Id, {'in_hl5_ids': ids}, 'out_result');
        return rdo;
    }
    return null;
}


function getAllHL5DeletionRequest(level){
    var rdo = db.executeProcedureManual(GET_REPORT_DELETION_REQUEST, {'IN_LEVEL': level});
    return db.extractArray(rdo.out_result);
}