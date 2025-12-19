import { Request, Response } from "express";

import client from "@db/client";

import { generateToken } from "@helpers/generateToken";

export const signin = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    if (typeof email === "undefined" || typeof password === "undefined") {
        res.status(400).send({
            status: 400,
            message: "Something went wrong!"
        });
        return;
    }

    if (typeof email !== "string" || typeof password !== "string") {
        res.status(400).send({
            status: 400,
            message: "Something went wrong!"
        });
        return;
    }

    try {
        const query = `SELECT * FROM sign_in($1, $2)`;
        const result = await client.query(query, [email, password]);
        const data = result.rows[0];

        if(!data) {
            res.status(400).send({
                status: 400,
                message: 'Email or Password doesn\'t matches!'
            });
        }

        const { user_id } = data;
        const token = generateToken({ userId: user_id });

        res.status(200).send({
            status: 200,
            message: "Successfully logged!",
            data: {
                token
            }
        });
    } catch (err) {
        console.error('Something went wrong:', err);
        res.status(400).send({
            status: 400,
            message: 'Something went wrong!'
        });
    }
}