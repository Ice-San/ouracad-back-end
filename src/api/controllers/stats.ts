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