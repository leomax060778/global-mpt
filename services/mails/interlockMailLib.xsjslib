function parseNotifyInterlock(interlockObj, basicData,  userName){
	var mailObj = {};
	mailObj.body = '<p> '+userName+'</p>';
	mailObj.body += '<p>An interlock request has been created and needs your approval. Please follow the link: </p>';
	mailObj.body += '<p>' + basicData.APP_URL + '/#InterlockManagement/' + interlockObj.TOKEN + '</p> <p> Thank you </p>';
	
	mailObj.subject = basicData.ENVIRONMENT+' Marketing Planning Tool - Interlock Process';
	return mailObj;
}

function parseNotifyInterlockResponse(interlockObj, basicData,  userName){
	var mailObj = {};
	mailObj.body = '<p> Dear '+userName+' </p>';
	mailObj.body += '<p>An interlock request has been sent and needs your approval. Please follow the link: </p>';
	mailObj.body += '<p>' + basicData.APP_URL + '/#InterlockManagement/' + interlockObj.TOKEN + '</p>';
	
	mailObj.subject = basicData.ENVIRONMENT+' Marketing Planning Tool - Interlock Process';
	return mailObj;
}

function parseNotifyRequester(interlockObj, basicData,  userName){
	var mailObj = {};
	
	mailObj.body = '<p>A request for more information has been submitted to your interlock request. </p>';
	mailObj.body += '<p>Please follow the link: ';

	var idInterlockDescription = interlockObj.INTERLOCK_REQUEST_ID +' - '+interlockObj.DESCRIPTION;
	
	mailObj.body += basicData.APP_URL + '/#InterlockProcess and review messages history for	Interlock Request '+idInterlockDescription+'</p>';
		
	mailObj.subject = basicData.ENVIRONMENT+' Marketing Planning Tool -  The Interlock Request has been responded';
	return mailObj;
}

function parseNotifyRejectedInterlock(interlockObj, basicData,  userName){
	var mailObj = {};
	
	mailObj.body = '<p> '+userName+'</p>';
	mailObj.body = '<p>Your Interlock Request has been Rejected. </p>';
	mailObj.body += '<p>Reason:</p>';
	mailObj.body += '<p>'+interlockObj.REASON+'</p>';
	mailObj.body += '<p>Please follow the link: ';

	var idInterlockDescription = interlockObj.INTERLOCK_REQUEST_ID +' - '+interlockObj.DESCRIPTION;
	
	mailObj.body += basicData.APP_URL + '/#InterlockProcess and review messages history for	Interlock Request '+idInterlockDescription+'</p>';
		
	mailObj.subject = basicData.ENVIRONMENT+' Marketing Planning Tool -  The Interlock Request has been rejected';
	return mailObj;
}

