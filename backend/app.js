import express from "express";
import cors from "cors";
import expressMongoSanitize from "express-mongo-sanitize";
import hpp from "hpp";
import helmet from "helmet";
import xss from "xss-clean";
import ratLimit from "express-rate-limit";
import mongoose from "mongoose";

import router from "./app/Routes/api.js";

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(expressMongoSanitize());
app.use(helmet());
app.use(hpp());
app.use(xss());

app.use(
  cors({
    credentials: true,
    origin: "http://localhost:8000",
  })
);

mongoose
  .connect(
    "mongodb+srv://azizulhakim68178:azizulhakim68178@cluster0.ixnio.mongodb.net/inventory-website",
    { autoIndex: true }
  )
  .then(() => {
    console.log("Database is connected");
  })
  .catch((error) => {
    console.log("Database is not connected");
    console.log(error);
    process.exit(1);
  });

const limiter = ratLimit({ windowMs: 20 * 60 * 1000, max: 3000 });
app.use(limiter);

app.use("/api", router);

export default app;
