/****** libs ************/
$.import("mktgplanningtool.services.commonLib","mapper");
var mapper = $.mktgplanningtool.services.commonLib.mapper;
var http = mapper.getHttp();
var ErrorLib = mapper.getErrors();
var news = mapper.getNews();

/******************************************/
function processRequest() {
    http.processRequest(handleGet, handlePost, handlePut, handleDelete);
}

function handleGet() {
    return http.notImplementedMethod();
}

function handlePost(newsBody, userId) {
    var res = {};

    if (newsBody.POST === "NEWS_READ") {
        res = news.newsRead(newsBody, userId);
    } else {
        throw ErrorLib.getErrors().BadRequest(
            "",
            "",
            "invalid POST)"
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