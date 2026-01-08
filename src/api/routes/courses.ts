import { Router } from "express";

import { deleteCourse, getCourse, getCourses, updateCourse } from "@controllers/courses";

export default Router()
                    .get("/", getCourses)
                    .post("/details", getCourse)
                    .put("/", updateCourse)
                    .delete("/", deleteCourse);