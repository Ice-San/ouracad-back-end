import { Router } from "express";

import { getStats } from "@controllers/stats";

export default Router()
                    .get("/", getStats);