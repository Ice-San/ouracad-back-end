import { Router } from "express";

import { getUsers, getUser, createUser } from "@controllers/users";

export default Router()
                    .get("/", getUsers)
                    .post("/details", getUser)
                    .post("/", createUser);