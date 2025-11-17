import express from "express";
import cors from "cors";
import "dotenv/config";

import client from "./db/client";

import usersRoutes from './api/routes/users';

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use("/users", usersRoutes);

app.listen(port, () => {
    client;
    console.log(`Successfully connected at: http://localhost:${port}`);
});