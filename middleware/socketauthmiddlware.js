const jwt = require("jsonwebtoken");
const socketauthmiddle = (io) =>
  io.use((socket, next) => {
    try {
      const token = socket.handshake.query.token;
      if (token) {
        jwt.verify(token, process.env.jwt_key, (err, decodedToken) => {
          if (err) {
            console.log(err);
          } else {
            console.log(decodedToken);
            next();
          }
        });
      } else {
        next(new Error("missing socket auth token"));
      }
    } catch (err) {
      console.log(err);
    }
  });
module.exports = socketauthmiddle;
