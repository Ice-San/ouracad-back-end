import { getCourses } from "@controllers/courses";
import { Router } from "express";

export default Router()
                    .get("/", getCourses);