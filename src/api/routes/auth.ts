import { Router } from "express";
import { signin, validation } from "@controllers/auth";

export default Router()
                    .post("/signin", signin)
                    .post("/validation", validation);