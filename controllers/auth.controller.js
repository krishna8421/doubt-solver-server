import { encodeJWT } from "../lib/jwt.js";
import db from "../models/index.js";
import { comparePassword, hashPassword } from "../lib/bcrypt.js";

export const signup = async ({
  firstName,
  lastName,
  mobileNumber,
  email,
  password,
  strongSubject,
  university,
  course,
  branch,
}) => {
  const existingUser = await db.User.findOne({ email });

  if (existingUser) {
    return { message: "Email already exists", token: null };
  }

  const user = new db.User({
    firstName,
    lastName,
    mobileNumber,
    email,
    password: await hashPassword(password),
    strongSubject,
    university,
    course,
    branch,
  });

  const savedUser = await user.save();

  let token = await encodeJWT({ id: savedUser.id, email: savedUser.email });

  return {
    message: "User registered successfully!",
    token,
  };
};

export const login = async (email, password) => {
  const user = await db.User.findOne({
    email,
  });

  if (!user) {
    return {
      token: null,
      message: "User Not found. Please Register",
    };
  }

  let passwordIsValid = await comparePassword(password, user.password);

  if (!passwordIsValid) {
    return {
      token: null,
      message: "Invalid Password!",
    };
  }

  let token = await encodeJWT({ id: user.id, email: user.email });

  return {
    message: "User logged in successfully!",
    token: token,
  };
};
