import express from "express";
import mongoose from "mongoose";
import "dotenv/config";
import router from "./routes/index.js";

if (!process.env.MDB_URI) {
  console.log("Please provide MDB_URI");
  process.exit();
}

const app = express();
const port = process.env.PORT || 8080;

app.use(express.json());
app.use(router);

mongoose.connect(process.env.MDB_URI).then(() => {
  console.log("MDB Connected Successfully");
  app.listen(port, () => console.log(`App listening on ${port}`));
});
