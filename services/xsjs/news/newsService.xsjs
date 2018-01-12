/****** libs ************/
$.import("mktgplanningtool.services.commonLib","mapper");
var mapper = $.mktgplanningtool.services.commonLib.mapper;
var http = mapper.getHttp();
var ErrorLib = mapper.getErrors();
var news = mapper.getNews();
var config = mapper.getDataConfig();

var GET_NEWS_BY_ID = "GET_NEWS_BY_ID";
var GET_ALL_NEWS = "GET_ALL_NEWS";
var GET_NEWS_BY_STATUS = "GET_NEWS_BY_STATUS";
var GET_NEWS_BY_YEAR = "GET_NEWS_BY_YEAR";
var GET_NEWS_BY_STATUS_YEAR = "GET_NEWS_BY_STATUS_YEAR";
var GET_NEWS_UNREAD = "GET_NEWS_UNREAD";

var GET_ALL_NEWS_STATUS = "GET_ALL_NEWS_STATUS";

/******************************************/
function processRequest() {
    http.processRequest(handleGet, handlePost, handlePut, handleDelete, false, config.getResourceIdByName('newsManager'));
}

function handleGet(parameters, userId) {
    var res = {};
    if (parameters.length > 0) {
        if (parameters[0].name === GET_NEWS_BY_ID) {
            res = news.getNewsById(parameters[0].value, userId);

        }
        else if (parameters[0].name === GET_ALL_NEWS) {
            res = news.getAllNews(userId);

        }
        else if (parameters[0].name === GET_NEWS_BY_STATUS) {
            res = news.getNewsByStatus(parameters[0].value, userId);

        }
        else if (parameters[0].name === GET_NEWS_BY_YEAR) {
            res = news.getNewsByYear(parameters[0].value, userId);

        }
        else if (parameters[0].name === GET_NEWS_BY_STATUS_YEAR) {
            res = news.getNewsByStatusYear(parameters[1].value, parameters[2].value);

        }
        else if (parameters[0].name === GET_ALL_NEWS_STATUS) {
            res = news.getAllNewsStatus();

        }
    }
    else {
        throw ErrorLib.getErrors().BadRequest(
            "",
            "",
            "invalid parameter name (can be: GET_NEWS_BY_ID, GET_ALL_NEWS, GET_ALL_NEWS_BY_STATUS, GET_ALL_NEWS_BY_YEAR or GET_ALL_NEWS_BY_STATUS_YEAR)"
        );
    }

    return http.handleResponse(res, http.OK, http.AppJson);
}

function handlePost(newsBody, userId) {
    var res = news.insertNews(newsBody, userId);
    return http.handleResponse(res, http.OK, http.AppJson);
}

function handlePut(newsBody, userId) {
    var res = {};
    if (newsBody.UPDATE === "NEWS_STATUS") {
        res = news.updateNewsStatus(newsBody, userId);
    } else if (newsBody.UPDATE === "NEWS") {
        res = news.updateNews(newsBody, userId);
    } else {
        throw ErrorLib.getErrors().BadRequest(
            "",
            "",
            "newsBody is invalid"
        );
    }
    return http.handleResponse(res, http.OK, http.AppJson);
}

function handleDelete(newsBody, userId) {
    var res = news.deleteNews(newsBody.NEWS_ID, userId);
    return http.handleResponse(res, http.OK, http.AppJson);

}

processRequest();