import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import flash from "express-flash";
import session from "express-session";

import { Auth, Task, Tag } from "./routes";
import { connectDb } from "./config/mongodb";
import { corsOptions } from "./config/corsOptions";
import { passport } from "./config/passport";

dotenv.config();

connectDb();

const app = express();

const PORT = process.env.PORT || 5000;

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(flash());
app.use(session({
  secret: process.env.SESSION_SECRET!,
  resave: false,
  saveUninitialized: false,
}));
app.use(passport.initialize());
app.use(passport.session());

app.use("/auth", Auth);
app.use("/task", Task);
app.use("/tag", Tag);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default app;
