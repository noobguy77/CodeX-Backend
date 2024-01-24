import jwt from "jsonwebtoken";


export const checkToken = (req, res, next) => {
  let token =
    req.cookies.token ||
    req.headers["x-access-token"] ||
    req.headers["authorization"] ||
    req.body.token;
  // Express headers are auto converted to lowercase
  //
  if (token) {
    if (token.startsWith("Bearer ")) {
      // Remove Bearer from string
      token = token.slice(7, token.length);
    }

    jwt.verify(token, process.env.secret, (err, decoded) => {
      if (err) {
        return res.json({
          success: false,
          message: "Token is not valid",
        });
      } else {
        if (decoded.isVerified || decoded.admin) {
          req.decoded = decoded;
          if(decoded.admin) {
            req.isAdmin = true;
          }
          next();
        } else {
          return res.json({
            success: false,
            message: "Please verify your account to continue",
          });
        }
      }
    });
  } else {
    return res.json({
      success: false,
      message: "Unauthorized Access",
    });
  }
};

export const checkTokenAdmin = (req, res, next) => {
  let token =
    req.cookies.token ||
    req.headers["x-access-token"] ||
    req.headers["authorization"] ||
    req.body.token;
  // Express headers are auto converted to lowercase
  // req.headers['x-access-token'] || req.headers['authorization'];
  if (token) {
    if (token.startsWith("Bearer ")) {
      // Remove Bearer from string
      token = token.slice(7, token.length);
    }

    jwt.verify(token, process.env.secret, (err, decoded) => {
      if (err) {
        return res.json({
          success: false,
          message: "Token is not valid",
        });
      } else {
        if (decoded.admin) {
          req.isAdmin = true;
          req.decoded = decoded;
          next();
        } else {
          return res.json({
            success: false,
            message: "Unauthorized Access",
          });
        }
      }
    });
  } else {
    return res.json({
      success: false,
      message: "Unauthorized Access",
    });
  }
};
export default {
  checkToken,
  checkTokenAdmin,
};
