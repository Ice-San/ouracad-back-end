import { Router } from "express";

import { getUsers, getUser } from "../controllers/users";

export default Router()
                    .get("/", getUsers)
                    .get("/:email", getUser);