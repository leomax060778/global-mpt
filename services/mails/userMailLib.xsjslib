function parseNotifyPasswordRecovery(userObj, basicData, userName){
	var mailObj = {};
	
	mailObj.body = ' <p> Dear '+userName+' </p>  <p>Here is your username and token for your Marketing Planning Tool password recovery</p>  <p>Username: <span>'+userObj.USERNAME+'</span></p>  <p>Token: <span>'+userObj.TOKEN+'</span></p>  <p>To accept your new Password for Marketing Planning Tool, visit the homepage ('+basicData.APP_URL+') and enter your token in the login area.</p>';
	mailObj.subject = basicData.ENVIRONMENT+' Marketing Planning Tool - Password recovery';
	
	return mailObj;	
}

function parseNotifyCreateUser(userObj, basicData, userName){
	var mailObj = {};
	
	mailObj.body = ' <p> Dear '+userName+' </p>  <p>You have been granted user rights to the Marketing Planning Tool. Your login information is as follows:</p>  <p>User ID: <span>' + userObj.USERNAME + '</span></p>  <p>Password: <span>' + userObj.PASSWORD + '</span></p> <p>You may change your password after you logon to the Marketing Plan Tool. To logon to the Marketing Planning Tool use the following link ' + basicData.APP_URL + '.</p> <p>If you have any questions please contact the Site Administrator ' + basicData.SITE_ADMIN_ACCOUNT + '.</p> <p> Thank you</p>';
	mailObj.subject = basicData.ENVIRONMENT+' Marketing Planning Tool - Account Created';
	
	return mailObj;	
}

function parseNotifyCreateRequestAccess(basicData, requestAccessData){
// function parseNotifyCreateUser(userObj, basicData, userName){
	var mailObj = {};

	mailObj.body = ' <p> Dear ' + basicData.SITE_ADMIN_NAME + ' </p>  <p>The following user (' + requestAccessData.USER_NAME + ') ' + requestAccessData.FIRST_NAME + ' ' + requestAccessData.LAST_NAME + ' has requested access to the tool and it is pending for your review.</p>';
    mailObj.subject = basicData.ENVIRONMENT+' Marketing Planning Tool - Request Access Created';

	return mailObj;
}

function parseGeneralMail(data, basicData) {
    var mailObj = {};
    var subject = 'MPT - Processing Report Message';
    mailObj.subject = basicData.ENVIRONMENT !== "Production" ? basicData.ENVIRONMENT + ' ' + subject : subject;

    var body = '<p> Dear Collegue ' + data.ADDRESSEE_NAME + ',</p>';
    body += '<p>' + data.SENDER_NAME + ' has sent you the following message:</p>';
    body += '<p>' + data.MESSAGE + '</p>';
    body += '<p>Please replay to <a href="mailto:' + data.SENDER_EMAIL + '?subject= RE: ' + mailObj.subject + '">' + data.SENDER_NAME + '</a></p>';
    mailObj.body = body;

    return mailObj;
}
