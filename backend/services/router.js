const {
  postJoinRoom,
  postCreateRoom,
} = require("../controllers/RoomController");

const {
  postAttendance,
  getLatestAttendanceRecords,
  getAttendanceLogs,
  postAttendanceLog,
} = require("../controllers/AttendanceController");

const {
  postCreateUser,
  postLogin,
  postValidateToken,
} = require("../controllers/UserController");
const authenticator = require("./authenticator");
module.exports = {
  setRoutes(app) {
    app.post("/login", postLogin);
    app.post("/createUser", postCreateUser);
    app.post("/joinRoom", authenticator, postJoinRoom);
    app.post("/createRoom", authenticator, postCreateRoom);
    app.post("/startAttendance", authenticator, postAttendance);
    app.get("/latestAttendance", authenticator, getLatestAttendanceRecords);
    app.post("/attendanceLog", authenticator, postAttendanceLog);
    app.get("/attendanceLogs", authenticator, getAttendanceLogs);
    app.post("/validateToken", authenticator, postValidateToken);
  },
};
