import { getCourses, updateCourse } from "@controllers/courses";
import { Router } from "express";

export default Router()
                    .get("/", getCourses)
                    .put("/", updateCourse);