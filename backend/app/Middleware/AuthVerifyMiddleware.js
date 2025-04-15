import jwt from "jsonwebtoken";

export default (req, res, next) => {
  let Token = req.headers.token;
  jwt.verify(Token, "SecretKey12345678", (err, decoded) => {
    if (err) {
      res.status(401).json({ status: "unauthorized!" });
    } else {
      let email = decoded.data;
      req.headers.email = email;
      next();
    }
  });
};
