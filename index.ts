import express from "express";
import dotenv from "dotenv";

import { Auth, Task } from "./routes";
import { connectDb } from "./config/mongodb";

dotenv.config();

connectDb();

const app = express();

const PORT = process.env.PORT || 5000;

app.use(express.json());

app.use("/auth", Auth);
app.use("/task", Task);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
