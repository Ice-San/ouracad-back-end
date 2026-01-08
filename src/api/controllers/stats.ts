import { Request, Response } from "express";

import client from "@db/client";

export const getStats = async (_req: Request, res: Response) => {
    try {
        const query: string = "SELECT * FROM get_all_stats()";
        const result = await client.query(query);
        const data = result.rows[0];

        if(!data) {
            res.status(400).send({
                status: 400,
                message: "Something went wrong before trying to get all stats"
            });
            return;
        }

        res.status(200).send({
            status: 200,
            message: "Get all stats was a success!",
            data
        });
    } catch (err) {
        console.error("Something went wrong:", err);
        res.status(400).send({
            status: 400,
            message: "Something went wrong when trying to get stats"
        });
    }
}

export const getCourseStats = async (req: Request, res: Response) => {
    const { courseName } = req.body;

    if(typeof courseName === "undefined") {
        res.status(400).send({
            status: 400,
            message: "Something went wrong when trying to get stats"
        });
        return;
    }

    if(typeof courseName !== "string") {
        res.status(400).send({
            status: 400,
            message: "Something went wrong when trying to get stats"
        });
        return;
    }

    try {
        const query: string = "SELECT * FROM get_course_stats($1)";
        const result = await client.query(query, [courseName]);
        const data = result.rows[0];

        if(!data) {
            res.status(400).send({
                status: 400,
                message: "Something went wrong before trying to get course stats"
            });
            return;
        }

        res.status(200).send({
            status: 200,
            message: "Get course stats was a success!",
            data
        });
    } catch (err) {
        console.error("Something went wrong:", err);
        res.status(400).send({
            status: 400,
            message: "Something went wrong when trying to get stats"
        });
    }
}

export const addStats = async (req: Request, res: Response) => {
    const { studentName, studentNumber, course, reason, customReason } = req.body;

    if(typeof studentName === "undefined" || typeof studentNumber === "undefined" || typeof course === "undefined" || typeof reason === "undefined" || typeof customReason === "undefined") {
        res.status(400).send({
            status: 400,
            message: "Something went wrong when trying to add a stats!"
        });
        return;
    }

    if(typeof studentName !== "string" || typeof studentNumber !== "number" || typeof course !== "string" || typeof reason !== "string" || typeof customReason !== "string") {
        res.status(400).send({
            status: 400,
            message: "Something went wrong when trying to add a stats!"
        });
        return;
    }

    try {
        const query: string = "SELECT * FROM add_stats($1, $2, $3, $4, $5)";
        const values = [
            studentName,
            studentNumber,
            course,
            reason,
            customReason
        ]
        const result = await client.query(query, values);
        const data = result.rows[0].add_stats;

        if(!data) {
            res.status(400).send({
                status: 400,
                message: "Something went wrong before trying to add a stats!"
            });
            return;
        }

        res.status(200).send({
            status: 200,
            message: "Status added with success!"
        });
    } catch (err) {
        console.error(err);
        res.status(400).send({
            status: 400,
            message: "Something went wrong when trying to add a stats!"
        });
    }
}