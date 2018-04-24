function parseApprovedEventRequest(data, basicData){
	var mailObj = {};
	mailObj.body = '<p>Dear Requestor</p>'
		+ '<p> Your Event Request has been approved and the related WBS ID: <a href="' + basicData.APP_URL + '#/TeamPlanHierarchy/Level5/edit/' + data.HL4_ID + '/' + data.HL5_ID + '">'+data.PATH+'</a> has been created.</p>';
	mailObj.subject = basicData.ENVIRONMENT+' MPT - Event Request has been approved';
	return mailObj;
}

function parseRejectedEventRequest(data, basicData){
	var mailObj = {};
	mailObj.body = '<p>Dear Requestor</p>'
		+ '<p> Your Event Request has been rejected and the related WBS ID: ' + data.PATH + ' has been deleted.</p>';
	mailObj.subject = basicData.ENVIRONMENT+' MPT - Event Request has been rejected';
	return mailObj;
}