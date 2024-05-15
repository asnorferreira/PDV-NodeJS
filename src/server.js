import express from "express";
import { router } from "./routes/index.js";
import { config } from "dotenv";
import cors from "cors";

config();

export const app = express();

app.use(cors());
app.use(express.json());
app.use(router);
