import db from "../models/index.js";
import { io, userSocketMap } from "../lib/socket.io.js";

export const sendMessage = async (senderId, receiverId, message) => {
  try {
    const newMessage = await db.Chat.create({
      senderId,
      receiverId,
      message,
    });
    const receiverSocketId = userSocketMap.get(receiverId);

    if (receiverSocketId) {
      io.to(receiverSocketId).emit("chat message", newMessage);
      return {
        status: true,
        message: "Message sent",
      };
    } else {
      console.log(`Socket not found for user ${receiverId}`);
      return {
        status: false,
        message: "Message sent, but user is not online",
      };
    }
  } catch (error) {
    console.error("Error sending message:", error);
    return {
      status: false,
      message: error.message,
    };
  }
};

export const getMessages = async (senderId, receiverId) => {
  try {
    const messages = await db.Chat.find({
      senderId: senderId,
      receiverId: receiverId,
    }).sort({ timestamp: "asc" });

    return {
      status: true,
      messages,
    };
  } catch (error) {
    console.error("Error getting messages:", error);
    return {
      status: false,
      message: error.message,
    };
  }
};

export const getAllMessages = async (userId) => {
  try {
    const messages = await db.Chat.find({
      $or: [{ senderId: userId }, { receiverId: userId }],
    }).sort({ timestamp: "asc" });

    const groupedMessages = messages.reduce((grouped, message) => {
      const key = message.senderId.toString() === userId.toString() ? message.receiverId.toString() : message.senderId.toString();
      if (!grouped[key]) {
        grouped[key] = [];
      }
      grouped[key].push(message);
      return grouped;
    }, {});

    return {
      status: true,
      messages: groupedMessages,
    };
  } catch (error) {
    console.error("Error getting messages:", error);
    return {
      status: false,
      message: error.message,
    };
  }
};