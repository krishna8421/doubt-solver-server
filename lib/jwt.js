import config from "../config/auth.config.js";
import jwt from "jsonwebtoken";

export const decodeJWT = async (token) => {
    return jwt.verify(token, config.secret);
};

export const encodeJWT = async (id, maxAge = config.jwtExpiration) => {
  return jwt.sign({id}, config.secret, {
    expiresIn: maxAge,
  });
};
