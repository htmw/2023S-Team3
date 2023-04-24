require("dotenv").config({ path: __dirname + "/.env" });
const expressServer = require("./services/express-server");
const ConnectDB = require("./services/connectDB");
(async () => {
  let connectDB = new ConnectDB();
  let connectionEstablished = await connectDB.testConnection();
  if (connectionEstablished) {
    global.connection = connectDB.connection;
    let server = new expressServer(
      process.env.NODE_PORT,
      process.env.ORIGIN_ADDRESS
    );
    server.start();
  } else {
    console.log("Error while establishing connection.");
  }
})();