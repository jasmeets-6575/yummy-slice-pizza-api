import express from "express";
import { connectDB } from "./db/connect";
import * as dotenv from "dotenv";
import { json } from "body-parser";
import { notFound } from "./middleware/not-found";
import { errorHandlerMiddleware } from "./middleware/error-handler";
import "express-async-errors"
import morgan from "morgan"
dotenv.config();
const app = express();

// middleware
app.use(morgan("tiny"))
app.use(json());

app.get("/", (req, res) => {
  res.send("e-commerce-api");
});

app.use(notFound);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 3001;
const mongo_url: string | undefined = process.env.MONGO_URL;
const start = async () => {
  try {
    if (mongo_url) {
      await connectDB(mongo_url);
      app.listen(port, () =>
        console.log(`Server is listening on port ${port}...`)
      );
    }
  } catch (error) {}
};
start();
