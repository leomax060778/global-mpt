/****** libs ************/
$.import("mktgplanningtool.services.commonLib","mapper");
var mapper = $.mktgplanningtool.services.commonLib.mapper;
var http = mapper.getHttp();
var ErrorLib = mapper.getErrors();
var news = mapper.getNews();
var config = mapper.getDataConfig();

var GET_NEWS_UNREAD = "GET_NEWS_UNREAD";

/******************************************/
function processRequest() {
    http.processRequest(handleGet, handlePost, handlePut, handleDelete, false, config.getResourceIdByName('newsViewer'));
}

function handleGet(parameters, userId) {
    var res = {};
    if (parameters.length > 0) {
        if (parameters[0].name === GET_NEWS_UNREAD) {
            res = news.getNewsUnread(userId);
        }
    }
    else {
        throw ErrorLib.getErrors().BadRequest("", "",
            "invalid parameter name (can be: GET_NEWS_UNREAD)"
        );
    }

    return http.handleResponse(res, http.OK, http.AppJson);
}

function handlePost(newsBody, userId) {
	var res = {};
    if (newsBody.POST === "NEWS_READ") {
        res = news.newsRead(newsBody, userId);
    } else {
    	throw ErrorLib.getErrors().BadRequest("", "",
            "invalid body"
        );
    }
    return http.handleResponse(res, http.OK, http.AppJson);
}

function handlePut() {
	return http.notImplementedMethod();
}

function handleDelete() {
	return http.notImplementedMethod();
}

processRequest();

