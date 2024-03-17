import express from "express";
import cors from "cors";
import { connectDB, disconnectDB } from "./db/index.js";
import authRoutes from "./routes/auth.routes.js";
import doubtRoutes from "./routes/doubt.routes.js";
import userRoutes from "./routes/user.routes.js";
import verifyToken from "./middlewares/verifyToken.js";

const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/doubt", verifyToken, doubtRoutes);
app.use("/api/user", verifyToken, userRoutes);

app.get("/", (req, res) => {
  res.json({ message: "Welcome to Doubt Solver API." });
});

const main = async () => {
  try {
    app.listen(PORT, () => {
      connectDB();
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  } catch (error) {
    disconnectDB();
    console.error("Error starting server:", error);
  }
};

main();
