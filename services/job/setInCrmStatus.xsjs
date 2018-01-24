$.import("mktgplanningtool.services.commonLib", "mapper");
var mapper = $.mktgplanningtool.services.commonLib.mapper;
// var dataHl5 = mapper.getDataLevel5();
// var dataHl6 = mapper.getDataLevel6();

function setInCrmStatus() {
    // dataHl5.setInCrmStatus();
    // dataHl6.setInCrmStatus();

    try{
        var conn = $.db.getConnection();
        var updateHl5StatusQuery = 'call "MKTG_PLANNING_TOOL"."mktgplanningtool.db.procedures::UPD_HL5_STATUS_TO_IN_CRM"(?)';
        var updateHl6StatusQuery = 'call "MKTG_PLANNING_TOOL"."mktgplanningtool.db.procedures::UPD_HL6_STATUS_TO_IN_CRM"(?)';
        var pstmt = conn.prepareCall(updateHl5StatusQuery);
        pstmt.execute();

        pstmt = conn.prepareCall(updateHl6StatusQuery);
        pstmt.execute();

        conn.commit();
        conn.close();

    } catch (e) {
        conn.close();
    }
}