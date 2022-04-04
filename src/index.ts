import express from "express";

import { Request, Response, NextFunction } from 'express';

const app = express();
const port = 5500;

app.use(express.json());

// If not fitting route was found, send error
app.use((req: Request, res: Response) => {
    return res.sendStatus(404);
});

app.listen(port, () => {
    console.log("The API is running on http://localhost:" + port);
});