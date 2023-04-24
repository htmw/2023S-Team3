const express = require("express");
const Routes = require("./router");
var cors = require("cors");
module.exports = class Server {
  constructor(port, originAddress) {
    this.app = express();
    this.port = port;
    this.initializeMiddleWares(originAddress);
    this.initializeRoutes();
  }
  initializeMiddleWares(originAddress) {
    this.app.use(
      cors({
        origin: originAddress,
        optionsSuccessStatus: 200,
      })
    );
    this.app.use(express.json());
  }
  initializeRoutes() {
    this.routes = new Routes(this.app);
  }
  start() {
    this.app.listen(this.port, () => {
        console.log("Server running at port: " + this.port);
    });
  }
};