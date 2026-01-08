import { Router } from "express";

import { getCourseStats, getStats } from "@controllers/stats";

export default Router()
                    .get("/", getStats)
                    .post("/specific", getCourseStats);