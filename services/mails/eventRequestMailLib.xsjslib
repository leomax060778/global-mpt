function parseApprovedEventRequest(data, basicData){
	var mailObj = {};
	mailObj.body = '<p>Dear Requestor</p>'
		+ '<p> Your Event Request has been approved and the related WBS ID: <a href="' + basicData.APP_URL + '#/TeamPlanHierarchy/Level5/edit/' + data.HL4_ID + '/' + data.HL5_ID + '">'+data.PATH+'</a> has been created.</p>';
	mailObj.subject = basicData.ENVIRONMENT+' MPT - Event Request has been approved';
	return mailObj;
}

function parseRejectedEventRequest(data, basicData){
	var mailObj = {};
	var mailBody = 'Your Event Request has been rejected';
    if(data.PATH){
        mailBody += ' and the related WBS ID: ' + data.PATH + ' has been deleted';
	}
	mailObj.body = '<p>Dear Requestor</p>'
		+ '<p> ' + mailBody + '.</p>';
	mailObj.subject = basicData.ENVIRONMENT+' MPT - Event Request has been rejected';
	return mailObj;
}