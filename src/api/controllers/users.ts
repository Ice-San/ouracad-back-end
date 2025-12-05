import { Request, Response, Router } from "express";

import client from "@/db/client";

export const getUsers = async (req: Request, res: Response) => {
    const query: string = 'SELECT * FROM get_all_users()';
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

export const getUser = async (req: Request, res: Response) => {
    const { email } = req.params;
    
    if (!email) {
        res.status(400).send({
            status: 400,
            message: 'Email not found!'
        });
        return;
    }

    if (typeof email === "undefined") {
        res.status(400).send({
            status: 400,
            message: 'Something went wrong with email!'
        });
        return;
    }

    if (typeof email !== "string") {
        res.status(400).send({
            status: 400,
            message: 'Something went wrong with email!'
        });
        return;
    }

    const query: string = `SELECT * FROM get_user('${email}')`;
    const result = await client.query(query);
    const data = result.rows;

    if (!data) {
        res.status(400).send({
            status: 400,
            message: 'Email not found!'
        });
        return;
    }

    res.status(200).send({
        status: 200,
        message: 'Found user!',
        data
    });
}