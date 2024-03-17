import express from "express";
import { login, signup } from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/signup", async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      mobileNumber,
      email,
      password,
      strongSubject,
      university,
      course,
      branch,
    } = req.body;

    const data = await signup({
      firstName,
      lastName,
      mobileNumber,
      email,
      password,
      strongSubject,
      university,
      course,
      branch,
    });

    if (!data.token) {
      return res.status(401).send(data);
    }

    res.status(201).send(data);
  } catch (error) {
    console.log({ error });
    res.status(500).send({ message: error.message });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const data = await login(email, password);

    if (!data.token) {
      return res.status(401).send(data);
    }

    res.status(200).send(data);
  } catch (error) {
    console.log({ error });
    res.status(500).send({ message: error.message });
  }
});

export default router;
