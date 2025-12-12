import { Request, Response, Router } from "express";

import client from "@db/client";

import { splitNames } from "@helpers/splitNames";

export const getUsers = async (req: Request, res: Response) => {
    try {
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
    } catch (err) {
        console.error('Something went wrong:', err);
        res.status(400).send({
            status: 400,
            message: 'Something went wrong!'
        });
    }
}

export const getUser = async (req: Request, res: Response) => {
    const { email } = req.body;
    
    if (!email) {
        res.status(400).send({
            status: 400,
            message: 'Not found!'
        });
        return;
    }

    if (typeof email === "undefined") {
        res.status(400).send({
            status: 400,
            message: 'Something went wrong!'
        });
        return;
    }

    if (typeof email !== "string") {
        res.status(400).send({
            status: 400,
            message: 'Something went wrong!'
        });
        return;
    }

    try {
        const query: string = `SELECT * FROM get_user('${email}')`;
        const result = await client.query(query);
        const data = result.rows;

        if (!data) {
            res.status(400).send({
                status: 400,
                message: 'Not found!'
            });
            return;
        }

        res.status(200).send({
            status: 200,
            message: 'Found user!',
            data
        });
    } catch (err) {
        console.error('Something went wrong:', err);
        res.status(400).send({
            status: 400,
            message: 'Something went wrong!'
        });
    }
}

export const createUser = async (req: Request, res: Response) => {
    const { username, email, password, role, course } = req.body;

    if (!username || !email || !password) {
        res.status(400).send({
            status: 400,
            message: 'Somenthing went wrong!'
        });
        return;
    }

    if (typeof username === "undefined" || typeof email === "undefined" || typeof password === "undefined") {
        res.status(400).send({
            status: 400,
            message: 'Somenthing went wrong!'
        });
        return;
    }

    if (typeof username !== "string" || typeof email !== "string" || typeof password !== "string") {
        res.status(400).send({
            status: 400,
            message: 'Somenthing went wrong!'
        });
        return;
    }

    try {
        const { firstName, lastName } = splitNames(username);

        const query: string = `SELECT * FROM create_user($1, $2, $3, $4, $5, $6)`;
        const values = [
          firstName,
          lastName,
          email,
          password,
          role,
          course.toUpperCase()
        ];
        const result = await client.query(query, values);
        const data = result.rows[0].create_user;

        if(data < 1) {
            res.status(400).send({
                status: 400,
                message: 'User already exists!',
                exists: true
            });
            return;
        }

        res.status(200).send({
            status: 200,
            message: 'User created!'
        });
        return;
    } catch (err) {
        console.error('Something went wrong:', err);
        res.status(400).send({
            status: 400,
            message: 'Something went wrong!'
        });
    }
}