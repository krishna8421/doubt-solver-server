import { app } from "./lib/app.js";

import { connectDB, disconnectDB } from "./db/index.js";
import authRoutes from "./routes/auth.routes.js";
import doubtRoutes from "./routes/doubt.routes.js";
import userRoutes from "./routes/user.routes.js";
import subjectRoutes from "./routes/subject.routes.js";
import chatRoutes from "./routes/chat.routes.js";
import verifyToken from "./middlewares/verifyToken.js";

const PORT = process.env.PORT || 8080;

app.use("/api/auth", authRoutes);
app.use("/api/doubt", verifyToken, doubtRoutes);
app.use("/api/user", verifyToken, userRoutes);
app.use("/api/subject", subjectRoutes);
app.use("/api/chat", verifyToken, chatRoutes);

app.get("/", (_req, res) => {
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
