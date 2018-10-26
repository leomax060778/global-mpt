/****** libs ************/
$.import("mktgplanningtool.services.commonLib","mapper");
var mapper = $.mktgplanningtool.services.commonLib.mapper;
var httpUtil = mapper.getHttp();
var config = mapper.getDataConfig();
var apiLib = mapper.getApiCSD();
/******************************************/

function requestToApiCsd(method, route, leadsForm) {
	try{
		var destPackage = "mktgplanningtool.services.xsjs.utils";
		var destName = "csdApi";

        var user = config.getCsdUser();
        var pass = config.getCsdPassword();
        var encode = $.util.codec.encodeBase64(user+':'+pass);
	    // setup the HTTP connection
	    var dest = $.net.http.readDestination(destPackage, destName);
	    var client = new $.net.http.Client();
	    // send a POST request to the resource on the server we want to reroute
	    var req = new $.web.WebRequest(method,route);
	    req.headers.set("Content-Type","application/json");
	    //req.headers.set("Authorization", "Basic bXRwdXNlcjptdHB1c2VyMSM=");
	    req.headers.set("Authorization", "Basic "+encode);
	    // set the content of the original request as request body
	    //Please do not change neither "project" nor "requestorID" values
	    req.setBody(JSON.stringify(leadsForm));
	 
	    // send the request and fetch the response
	    client.request(req, dest);
	    var response = client.getResponse();
	    var body = response.body ? response.body.asString() : "no data";
	    //$.response.status = $.net.http.OK;
	    // return the response
	    //$.response.contentType = "application/json";
	    //$.response.setBody(body);
	} catch (e) {
		// return the error as JSON for debugging
		
	     var errorResponse = {"error": e.toString()};
	     //$.response.status = $.net.http.INTERNAL_SERVER_ERROR;
	     //$.response.contentType = "application/json";
	     //$.response.setBody(JSON.stringify(errorResponse));
	}
	
	return response.body.asString();
}

function createLeadsFormInCsd(data){
	var leadsForm = {
	        project: "Campaign Service Desk",
	        summary: data.SUMMARY,
	        requestorId: "mtpuser",
	        region: data.REGION,
	        marketUnit: data.MARKET_UNIT,
	        country: data.COUNTRY,
	        campaignId: data.HL4_CRM_ID,
	        numberOfRecords: data.NUMBER_OF_RECORDS,
	        includesCrmId: data.INCLUDES_CRM_ID,
	        specialNotes: data.SPECIAL_NOTES
	};

    var rdo = apiLib.requestToApiCsd($.net.http.POST, "/leadsUploadService", leadsForm);

   httpUtil.handleResponse(rdo, httpUtil.OK, httpUtil.AppJson);
    
}

var data = {
    SUMMARY: "Creating issue with custom REST API Test fede - Test API",
    REGION: "APJ",
    MARKET_UNIT: "India",
	COUNTRY: "India",
    HL4_CRM_ID: "CRM-IN18",
    NUMBER_OF_RECORDS: "200",
    INCLUDES_CRM_ID: "No CRM IDs provided",
    SPECIAL_NOTES: "test notes pka 10 - Test"
};

createLeadsFormInCsd(data);

//CSD API Response
/*
 * {"id":56104,"key":"SAP-20721","self":"https://csd-demo.sap-srs.projects.epam.com/rest/api/2/issue/SAP-20721","status":"Open","summary":"Creating issue with custom REST API Test pka 10 - Test CSD API","region":"LAC","marketUnit":"LAC South","country":"Argentina","campaignId":"","numberOfRecords":666,"includesCrmId":"No CRM IDs provided"}
 */