import express from "express";
import { getUserDetails } from "../controllers/user.controller.js";

const router = express.Router();

router.get("/", async (req, res) => {
    try {
    
        const data = await getUserDetails(req.userId);
    
        res.status(200).send(data);
    } catch (error) {
        console.log({ error });
        res.status(500).send({ message: error.message, status: false });
    }
})

export default router;