const { createUser, verifyUser } = require("../data/User");
var jwt = require("jsonwebtoken");
module.exports = {
  postCreateUser: async function (req, res, next) {
    try {
      let result = await createUser(
        req.body?.email,
        req.body?.username,
        req.body?.password,
        req.body?.confirmPassword,
        req.body?.face
      );
      res.send(result);
    } catch (err) {
      res.send({
        errorMessage: err.sqlMessage,
      });
    }
  },
  postLogin: async function (req, res, next) {
    try {
      let result = await verifyUser(req.body?.email, req.body?.password);
      const data = result[0][0];
      data.time = Date();
      if (data?.user_found) {
        const token = jwt.sign(data, process.env.JWT_SECRET_KEY);
        res.send({ token });
      } else {
        res.send(data);
      }
    } catch (err) {
      res.send({
        errorMessage: err.sqlMessage,
      });
    }
  },
  postValidateToken: async function (req, res, next) {
    res.send({ isValid: true });
  },
};