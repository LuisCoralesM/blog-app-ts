/**
 * npx ts-node src/index.ts
 * npm start
 */
import express, { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import cors from "cors";
// import cookieParser from "cookie-parser";

const prisma = new PrismaClient();

import router from "./routes";

// Set app and port
const app = express();
const port = process.env.PORT || 5500;

app.use(cors());
// app.use(cookieParser());

// Use json
app.use(express.json());

app.get("/status", async (req: Request, res: Response) => {
  try {
    return res.status(200).json({ count: await prisma.user.count() });
  } catch (error) {
    return res.json({ message: error });
  }
});

// Routes
app.use("/", router);

// If not fitting route was found, send error
app.use((req: Request, res: Response) => {
  return res.sendStatus(404);
});

// Run app
app.listen(port, () => {
  console.log("The API is running on http://localhost:" + port);
});
