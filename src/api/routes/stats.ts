import { Router } from "express";

import { addStats, getCourseStats, getStats } from "@controllers/stats";

export default Router()
                    .get("/", getStats)
                    .post("/specific", getCourseStats)
                    .post("/", addStats);