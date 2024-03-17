import express from "express";
import {
  getSubject,
  getAllSubjects,
} from "../controllers/subject.controller.js";

const router = express.Router();

router.get("/all", async (_req, res) => {
  try {
    const subjects = await getAllSubjects();

    res.status(200).json(subjects);
  } catch (error) {
    res.status(500).json({ message: error.message, status: false });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const subject = await getSubject(id);

    res.status(200).json(subject);
  } catch (error) {
    res.status(500).json({ message: error.message, status: false });
  }
});

router.post("/search", async (req, res) => {
  try {
    const { subjectPartialOrFullName } = req.body;
    const subjects = await searchSubject(subjectPartialOrFullName);

    res.status(200).json(subjects);
  } catch (error) {
    res.status(500).json({ message: error.message, status: false });
  }
});

export default router;