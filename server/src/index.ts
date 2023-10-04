'use strict';

//imports
import dotenv from "dotenv";
dotenv.config();
import { Request, Response } from "express";
import express  from "express";
import router from "./router";
import cors from "cors";
import "./db";


//instances

const app: express.Application = express();
const PORT: number = 4242;

// const mongoose = require('./db.js')

app.use(cors());
app.use(express.json());
app.use("/", router);

app.use((err: Error, req: Request, res: Response) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});