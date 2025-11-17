import { Router } from "express";

import { getUsers } from "../controllers/users";

export default Router()
                    .get("/", getUsers);