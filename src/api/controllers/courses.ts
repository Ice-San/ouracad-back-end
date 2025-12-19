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
        })
    } catch (err) {
        console.error(err);
        res.status(400).send({
            status: 400,
            message: "Something went wrong when trying to get Courses!"
        });
    }
}