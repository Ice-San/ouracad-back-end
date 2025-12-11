import express from "express";
import cors from "cors";
import "dotenv/config";

import client from "@db/client";

import usersRoutes from '@routes/users';
import authRoutes from '@routes/auth';

import { middleware } from "@middleware/middleware";

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use("/auth", authRoutes);
app.use("/users", middleware, usersRoutes);

app.listen(port, () => {
    client;
    console.log(`Successfully connected at: http://localhost:${port}`);
});