const {
  postJoinRoom,
  postCreateRoom
} = require("../controllers/RoomController");
const {
  postAttendance,
  getLatestAttendanceRecords,
  getAttendanceLogs,
  postAttendanceLog
} = require("../controllers/AttendanceController")
module.exports = {
  setRoutes(app) {
    app.post("/joinRoom", postJoinRoom);
    app.post("/createRoom", postCreateRoom);
    app.post("/startAttendance", postAttendance);
    app.get("/latestAttendance", getLatestAttendanceRecords);
    app.post("/attendanceLog", postAttendanceLog);
    app.get("/attendanceLogs", getAttendanceLogs);
  }
};