import { Request, Response, Router } from "express";

import client from "@/db/client";

import { splitNames, userExists } from "@/utils/userExists";

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

    const user = await userExists(email);
    
    if(!user) {
        const firstname = splitNames(username).firstname;
        const lastname = splitNames(username).lastname;

        const query: string = `SELECT * FROM create_user('${firstname}', '${lastname}', '${email}', '${password}', '${role}', '${course}')`;
        const result = await client.query(query);
        const data = result.rows[0];

        res.status(200).send({
            status: 200,
            message: 'User created!',
            data
        });
        return;
    }

    res.status(400).send({
        status: 400,
        message: 'User with that email already exists!'
    });
}