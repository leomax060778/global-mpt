/** **** libs *********** */
$.import("mktgplanningtool.services.commonLib","mapper");
var mapper = $.mktgplanningtool.services.commonLib.mapper;

var organizationTypeLib = mapper.getOrganizationType();
var orgTypeInterlockOrgLib = mapper.getOrganizationTypeInterlockOrganization();

var httpUtil = mapper.getHttp();
var ErrorLib = mapper.getErrors();

/** *************************************** */

var getOrganizationTypeById = "GET_ORGANIZATION_TYPE_BY_ID";
var getAllOrganizationType = "GET_ALL_ORGANIZATION_TYPE";
var getOrgTypeForIntOrg = "GET_ORGANIZATION_TYPE_FOR_INTERLOCK_ORGANIZATION";
var getInterlockOrgByOrgType = "GET_INTERLOCK_ORGANIZATION_BY_ORGANIZATION_TYPE_ID";

var updInterlockOrganizationAsociation = "UPD_INTERLOCK_ORGANIZATION_BY_ORGANIZATION_TYPE";

function processRequest(){
	httpUtil.processRequest(handleGet,handlePost,handlePut,handleDelete,false,"",true);
}

function handleGet(parameters, userId){
	var rdo = {};
	
	if(parameters.length > 0){
		if(!parameters[0].value){
			throw ErrorLib.getErrors().BadRequest("","organizationTypeService/handleGet","invalid parameter value. Can not be null or empty");
		}
		
		switch(parameters[0].name){
			case getOrganizationTypeById:
				rdo = organizationTypeLib.getOrganizationTypeById(parameters[0].value, userId);
				break;
			case getAllOrganizationType:
				rdo = organizationTypeLib.getAllOrganizationType();
				break;
			case getOrgTypeForIntOrg:
				rdo = orgTypeInterlockOrgLib.getOrganizationTypeForInterlockOrganization();
				break;
			case getInterlockOrgByOrgType:
				rdo = orgTypeInterlockOrgLib.getInterlockOrganizationByOrganizationTypeId(parameters[0].value);
				break;
			default:
				throw ErrorLib.getErrors().BadRequest("","organizationTypeService/handleGet","invalid parameter name (can be: GET_ORGANIZATION_TYPE_BY_ID or GET_ALL_ORGANIZATION_TYPE)");
				break;
		}
	}else{
		throw ErrorLib.getErrors().BadRequest("","organizationTypeService/handleGet","The parameter could not be found (can be: GET_ORGANIZATION_TYPE_BY_ID or GET_ALL_ORGANIZATION_TYPE)");
	}
	
	httpUtil.handleResponse(rdo, httpUtil.OK, httpUtil.AppJson);
}

function handlePost(reqBody, userId){
	var rdo = organizationTypeLib.insertOrganizationType(reqBody, userId);		    	
	httpUtil.handleResponse(rdo, httpUtil.OK, httpUtil.AppJson);
}

function handlePut(reqBody, userId){
	var method = httpUtil.getUrlParameters().get("METHOD");
	
	var rdo;
	
	if(method){
		switch(method){
		case updInterlockOrganizationAsociation:
			var orgTypeId = httpUtil.getUrlParameters().get("ORGANIZATION_TYPE_ID");
			
			if(orgTypeId){
				rdo = orgTypeInterlockOrgLib.updateOrganizationTypeInterlockOrganizationByOrganizationTypeId(reqBody, orgTypeId, userId);
			}else{
				throw ErrorLib.getErrors().BadRequest("","organizationTypeService/handleGet","The parameter ORGANIZATION_TYPE_ID could not be found");
			}
			
			break;
		default:
			throw ErrorLib.getErrors().BadRequest("","organizationTypeService/handleGet","invalid method name (can be: UPD_INTERLOCK_ORGANIZATION_BY_ORGANIZATION_TYPE");
			break;
		}
	}else{
		rdo = organizationTypeLib.updateOrganizationType(reqBody, userId);
	}
	
	httpUtil.handleResponse(rdo, httpUtil.OK, httpUtil.AppJson);
}

function handleDelete(reqBody, userId){
	var rdo = organizationTypeLib.deleteOrganizationType(reqBody, userId);
	httpUtil.handleResponse(rdo, httpUtil.OK, httpUtil.AppJson);
}

processRequest();