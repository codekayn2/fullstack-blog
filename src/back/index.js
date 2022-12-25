import express from "express";
import multer from "multer";
import cors from "cors"

import mongoose from "mongoose";

import {
  registerValidation,
  loginValidation,
  postCreateValidations,
} from "./validations.js";
import { checkAuth, handleValidationsErrors } from "./utils/index.js";

import { UserControler, PostControler } from "./controlers/index.js";

mongoose
  .connect(
    "mongodb+srv://codekayn:codekayn2005@cluster0.862uq94.mongodb.net/blog?retryWrites=true&w=majority"
  )
  .then(() => console.log("DB Ok"))
  .catch((err) => console.log("DB error", err));

const app = express();

const storage = multer.diskStorage({
  destination: (_, __, cb) => {
    cb(null, "uploads");
  },
  filename: (_, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

app.use(express.json());
app.use(cors())
app.use("/uploads", express.static("uploads"));

app.post(
  "/auth/login",
  loginValidation,
  handleValidationsErrors,
  UserControler.login
);
app.post(
  "/auth/register",
  registerValidation,
  handleValidationsErrors,
  UserControler.register
);
app.get("/auth/me", checkAuth, UserControler.getMe);

app.post("/upload", checkAuth, upload.single("image"), (req, res) => {
  res.json({
    url: `/uploads/${req.file.originalname}`,
  });
});

app.get("/tags", PostControler.getLastTags);

app.get("/posts", PostControler.getAll);
app.get("/posts/tags", PostControler.getLastTags);
app.get("/posts/:id", PostControler.getOne);
app.post(
  "/posts",
  checkAuth,
  postCreateValidations,
  handleValidationsErrors,
  PostControler.create
);
app.delete("/posts/:id", checkAuth, PostControler.remove);
app.patch(
  "/posts/:id",
  checkAuth,
  postCreateValidations,
  handleValidationsErrors,
  PostControler.update
);

app.listen(4444, (err) => {
  if (err) {
    return console.error(err);
  }
  console.log("Server ok");
});
