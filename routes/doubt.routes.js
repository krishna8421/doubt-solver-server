import express from "express";
import {
  askDoubt,
  getDoubt,
  getAllDoubts,
  getSolversList,
  acceptDoubtRequest,
} from "../controllers/doubt.controller.js";

const router = express.Router();

router.post("/ask", async (req, res) => {
  try {
    const { userId, subjectId, question } = req.body;

    const data = await askDoubt(userId, subjectId, question);

    res.status(200).send(data);
  } catch (error) {
    console.log({ error });
    res.status(500).send({ message: error.message, status: false });
  }
});

router.post("/all", async (req, res) => {
  try {
    const data = await getAllDoubts(req.userId);

    res.status(200).send(data);
  } catch (error) {
    console.log({ error });
    res.status(500).send({ message: error.message, status: false });
  }
});

router.post("/:id", async (req, res) => {
  const doubtId = req.params?.id;

  if (!doubtId) {
    return res.status(400).send({ message: "Invalid doubt id", status: false });
  }

  try {
    const data = await getDoubt(doubtId);

    res.status(200).send(data);
  } catch (error) {
    console.log({ error });
    res.status(500).send({ message: error.message, status: false });
  }
});

router.post("/solvers-list", async (req, res) => {
  try {
    const { subjectId } = req.body;

    const data = await getSolversList(subjectId);

    res.status(200).send(data);
  } catch (error) {
    console.log({ error });
    res.status(500).send({ message: error.message, status: false });
  }
});

router.post("/accept-request", async (req, res) => {
  try {
    const { doubtId } = req.body;

    const data = await acceptDoubtRequest(req.userId, doubtId);

    res.status(200).send(data);
  } catch (error) {
    console.log({ error });
    res.status(500).send({ message: error.message, status: false });
  }
});

export default router;
