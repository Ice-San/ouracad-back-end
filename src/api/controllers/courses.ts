import { Request, Response } from "express";
import client from "@db/client";

export const getCourses = async (_req: Request, res: Response) => {
    try {
        const query = "SELECT * FROM get_all_courses()";
        const result = await client.query(query);
        const data = result.rows;

        if(!data) {
            res.status(400).send({
                status: 400,
                message: "Something went wrong when trying to get Courses!"
            });
            return;
        }

        res.status(200).send({
            status: 200,
            message: "Getting courses was a success!",
            data
        });
    } catch (err) {
        console.error(err);
        res.status(400).send({
            status: 400,
            message: "Something went wrong when trying to get Courses!"
        });
    }
}

export const getCourse = async (req: Request, res: Response) => {
    const { courseName } = req.body;

    if(typeof courseName === "undefined") {
        res.status(400).send({
            status: 400,
            message: "Something went wrong when trying to get a course!"
        });
        return;
    }

    if(typeof courseName !== "string") {
        res.status(400).send({
            status: 400,
            message: "Something went wrong when trying to get a course!"
        });
        return;
    }

    try {
        const query: string = "SELECT * FROM get_course($1)";
        const result = await client.query(query, [courseName]);
        const data = result.rows[0];

        if(!data) {
            res.status(400).send({
                status: 400,
                message: "Something went wrong before trying to get a course!"
            });
            return;
        }

        res.status(200).send({
            status: 200,
            message: "Get course was a success!",
            data
        });
    } catch (err) {
        console.error("Something went wrong:", err);
        res.status(400).send({
            status: 400,
            message: "Something went wrong when trying to get a course!"
        });
        return;
    }
}

export const updateCourse = async (req: Request, res: Response) => {
    const { oldName, newName, status } = req.body;

    if(typeof oldName === "undefined" || typeof newName === "undefined" || typeof status === "undefined") {
        res.status(400).send({
            status: 400,
            message: "Something went wrong when trying to update a user!"
        });
        return;
    }

    if(typeof oldName !== "string" || typeof newName !== "string" || typeof status !== "string") {
        res.status(400).send({
            status: 400,
            message: "Something went wrong when trying to update a user!"
        });
        return;
    }
    
    try {
        const query = "SELECT * FROM update_course($1, $2, $3)";
        const result = await client.query(query, [oldName, newName, status]);
        const data = result.rows[0];
        const { update_course } = data;

        if(!update_course) {
            res.status(400).send({
                status: 400,
                message: "Something went wrong when trying to update Courses!"
            });
            return;
        }

        if(!data) {
            res.status(400).send({
                status: 400,
                message: "Something went wrong when trying to update Courses!"
            });
            return;
        }

        res.status(200).send({
            status: 200,
            message: "Course updated with success!",
            data: {
                success: true
            }
        });
    } catch (err) {
        console.error(err);
        res.status(400).send({
            status: 400,
            message: "Something went wrong when trying to update Courses!"
        });
    }
}

export const deleteCourse = async (req: Request, res: Response) => {
    const { courseName } = req.body;

    if(typeof courseName === "undefined") {
        res.status(400).send({
            status: 400,
            message: "Something went wrong when trying to delete a course!"
        });
        return;
    }

    if(typeof courseName !== "string") {
        res.status(400).send({
            status: 400,
            message: "Something went wrong when trying to delete a course!"
        });
        return;
    }

    try {
        const query: string = "SELECT * FROM delete_course($1)";
        const result = await client.query(query, [courseName]);
        const data = result.rows[0].delete_course;

        if(!data) {
            res.status(400).send({
                status: 400,
                message: "Something went wrong before trying to delete a course!"
            });
            return;
        }

        res.status(200).send({
            status: 200,
            message: "Course was deleted successfully!",
            success: 1
        });
    } catch (err) {
        console.error("Something went wrong:", err);
        res.status(400).send({
            status: 400,
            message: "Something went wrong when trying to delete a course!"
        });
        return;
    }
}