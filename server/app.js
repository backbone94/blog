import express from "express";
import mongoose from "mongoose";
import config from "./config";
import hpp from "hpp";
import helmet from "helmet";
import cors from "cors";
import path from "path";

// Routes
import categoryRoutes from "./routes/api/category";
import folderRoutes from "./routes/api/folder";
import userRoutes from "./routes/api/user";
import authRoutes from "./routes/api/auth";
import postRoutes from "./routes/api/post";
import commentRoutes from "./routes/api/comment";

import morgan from "morgan";

const app = express();
const { MONGO_URI } = config;

const prod = process.env.NODE_ENV === "production";

app.use(hpp());
app.use(helmet());

app.use(cors({ origin: true, credentials: true }));
app.use(morgan("dev"));

app.use(express.json());

mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connecting Success!!"))
  .catch((e) => console.log(e));

// use routes
app.get("/");
app.use("/api/category", categoryRoutes);
app.use("/api/folder", folderRoutes);
app.use("/api/post", postRoutes);
app.use("/api/user", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/comment", commentRoutes);

if (prod) {
  app.use(express.static(path.join(__dirname, "../client/build")));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../client/build", "index.html"));
  });
}
export default app;
