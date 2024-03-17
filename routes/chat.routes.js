import express from "express";
import {
  sendMessage,
  getMessages,
  getAllMessages,
} from "../controllers/chat.controller.js";

const router = express.Router();

router.post("/send", async (req, res) => {
  try {
    const { receiverId, message } = req.body;

    if (!receiverId || !message) {
      return res.status(400).json({ error: "Invalid data" });
    }

    const data = await sendMessage(req.userId, receiverId, message);

    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const receiverId = req.params.id;
    const messages = await getMessages(req.userId, receiverId);
    res.json(messages);
  } catch (error) {
    res.status(500).json({ error: error.message, status: false });
  }
});

router.get("/all", async (req, res) => {
  try {
    const data = await getAllMessages(req.userId);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message, status: false });
  }
});

export default router;