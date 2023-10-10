import express from "express";
import * as dotenv from "dotenv";
import { userRouter, spareRouter, specialRouter } from "./routes/index.js";
import ConnectDB from "./database/database.js";
// Add Authorization

// Create web server
const app = express();

app.use(express.json()); // Khai bao dinh dang du lieu ma express se lam viec
// Load .evn file: config file
dotenv.config();

// Basic routes: Root router
app.get("/", (req, res) => {
  res.send("Hello RESTful API.");
});

app.use("/users", userRouter); // localhost:9999/users
app.use("/sparses", spareRouter); // localhost:9999/products
app.use("/specials", specialRouter); // localhost:9999/products

const port = process.env.PORT || 8080;

app.listen(port, async () => {
  await ConnectDB();
  console.log(`Node RESTful API running on port ${port}`);
});
