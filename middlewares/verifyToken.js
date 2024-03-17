import { decodeJWT } from "../lib/jwt.js";

const verifyToken = async (req, res, next) => {
  let token = req.headers.authorization?.split(" ")?.[1] || null;

  if (!token) {
    return res.status(403).send({ message: "No token provided!" });
  }

  try {
    const decoded = await decodeJWT(token);
    req.userId = decoded.id;
    next();
  } catch (error) {
    console.log({ error });
    return res.status(401).send({ message: "Unauthorized!" });
  }
};

export default verifyToken;
