import { Request, Response, Router } from "express";

import client from "@/db/client";

export const getUsers = async (req: Request, res: Response) => {
    const query: string = 'SELECT * FROM view_all_users';
    const result = await client.query(query);
    const data = result.rows;

    if(!data) {
        res.status(400).send({
            status: 400,
            message: 'Not found users!'
        });
        return;    
    }
    
    res.status(200).send({
        status: 200,
        message: 'Found users!',
        data
    });
}