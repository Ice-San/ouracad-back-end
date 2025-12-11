import { Router } from "express";
import { signin } from "@controllers/auth";

export default Router()
                    .post("/signin", signin);