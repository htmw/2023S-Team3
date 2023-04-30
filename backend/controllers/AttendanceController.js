const {
    addAttendanceLog,
    getAttendanceLogs,
    add_attendance_table,
    getLatestAttendanceRecords
} = require("../data/Attendance");
module.exports = {
    postAttendanceLog: async function (req, res, next) {
        try {
            let result = await addAttendanceLog(
                req.body?.attendance_id,
                req.body?.user_name,
                req.body?.room_name
            );
            res.send(result);
        } catch (err) {
            res.next(err);
        }
    },
    getAttendanceLogs: async function (req, res, next) {
        try {
            let result = await getAttendanceLogs(req.query?.attendance_id);
            res.send(result);
        } catch (err) {
            res.next(err);
        }
    },
    postAttendance: async function (req, res, next) {
        try {
            let result = await add_attendance_table(
                req.body?.owner_name,
                req.body?.room_name
            );
            res.send(result);
        } catch (err) {
            console.log(err)
        }
    },
    getLatestAttendanceRecords: async function (req, res, next) {
        try {
            let result = await getLatestAttendanceRecords(
                req.query?.room_name
            );
            res.send(result);
        } catch (err) {
            res.next(err);
        }
    },
}