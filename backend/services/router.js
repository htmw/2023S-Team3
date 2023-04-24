const {
  postJoinRoom,
  postCreateRoom
} = require("../controllers/RoomController");
module.exports = class Routes {
  constructor(app) {
    app.post("/joinRoom", postJoinRoom);
    app.post("/createRoom", postCreateRoom);
  }
};