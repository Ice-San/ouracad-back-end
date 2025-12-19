import { Router } from "express";

import { getUsers, getUser, createUser, deleteUser } from "@controllers/users";

export default Router()
                    .get("/", getUsers)
                    .post("/details", getUser)
                    .post("/", createUser)
                    .delete("/", deleteUser);