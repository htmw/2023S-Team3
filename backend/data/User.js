module.exports = {
  createUser: async function (email, username, password, confirmPassword, face) {
    let data = [];
    data = await new Promise((resolve, reject) => {
      connection.query(
        "call simply_online.create_user(?,?,?,?,?)",
        [email, username, password, confirmPassword, face],
        function (err, result) {
          if (err) {
            reject(err);
          } else {
            resolve(JSON.parse(JSON.stringify(result)));
          }
        }
      );
    });
    return data;
  },
  verifyUser: async function (email, password) {
    let data = [];
    data = await new Promise((resolve, reject) => {
      connection.query(
        "call simply_online.verify_user(?,?)",
        [email, password],
        function (err, result) {
          if (err) {
            reject(err);
          } else {
            resolve(JSON.parse(JSON.stringify(result)));
          }
        }
      );
    });
    return data;
  },
};