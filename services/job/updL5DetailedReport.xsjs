function updateReportTable() {

	try {
		var conn = $.db.getConnection();
		var query = 'call "MKTG_PLANNING_TOOL"."mktgplanningtool.db.procedures::CV_L5_DETAILED_REPORT_DATA"()';
		var pstmt = conn.prepareCall(query);

		pstmt.execute();
		conn.commit();
		conn.close();

	} catch (e) {
		// handleResponse({"code": $.net.http.INTERNAL_SERVER_ERROR,
		// "errors":{"INTERNAL_SERVER_ERROR": e.toString()}},
		// $.net.http.INTERNAL_SERVER_ERROR);
	}
}