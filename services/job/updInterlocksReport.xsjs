function updateReportTable() {
	try{
		var conn = $.db.getConnection();
		var query = 'call "MKTG_PLANNING_TOOL"."mktgplanningtool.db.procedures::CV_INTERLOCK_REPORT_DATA"()';	
		var pstmt = conn.prepareCall(query);
		
		pstmt.execute();
		conn.commit();
		conn.close();
		
	} catch (e) {
		conn.close();
	}
}
