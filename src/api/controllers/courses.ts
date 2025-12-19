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