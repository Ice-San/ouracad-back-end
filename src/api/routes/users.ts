import { Router } from "express";

import { getUsers, getUser, createUser, deleteUser, updateUser } from "@controllers/users";

export default Router()
                    .get("/", getUsers)
                    .post("/details", getUser)
                    .post("/", createUser)
                    .put("/", updateUser)
                    .delete("/", deleteUser);