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
        const query: string = `SELECT * FROM get_user($1)`;
        const result = await client.query(query, [email]);
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

export const updateUser = async (req: Request, res: Response) => {
    const { email, firstName, lastName, course, role, status } = req.body;

    if(typeof email === "undefined" || typeof firstName === "undefined" || typeof lastName === "undefined" || typeof course === "undefined" || typeof role === "undefined" || typeof status === "undefined") {
        res.status(400).send({
            status: 400,
            message: "Something went wrong when trying to update a User!"
        });
        return;
    }

    if(typeof email !== "string" || typeof firstName !== "string" || typeof lastName !== "string" || typeof course !== "string" || typeof role !== "string" || typeof status !== "string") {
        res.status(400).send({
            status: 400,
            message: "Something went wrong when trying to update a User!"
        });
        return;
    }

    try {
        const query: string = "SELECT * FROM update_user($1, $2, $3, $4, $5, $6)";
        const values: string[] = [email, firstName, lastName, course, role, status];
        const result = await client.query(query, values);
        const data = result.rows[0];

        if(!data) {
            res.status(400).send({
                status: 400,
                message: "Something went wrong before trying to update an user!"
            });
            return;
        }

        res.status(200).send({
            status: 200,
            message: "User was updated successfully!",
            success: 1
        });
    } catch(err) {
        console.error("Something went wrong:", err);
        res.status(400).send({
            status: 400,
            message: "Something went wrong when trying to update an user!"
        });
    }
}

export const deleteUser = async (req: Request, res: Response) => {
    const { email } = req.body;

    if(typeof email === "undefined") {
        res.status(400).send({
            status: 400, 
            message: "Something went wrong when trying to delete a User!"
        });
        return;
    }

    if(typeof email !== "string") {
        res.status(400).send({
            status: 400,
            message: "Something went wrong when trying to delete a User!"
        });
        return;
    }

    try {
        const query = "SELECT * FROM delete_user($1)";
        const result = await client.query(query, [email]);
        const data = result.rows[0].delete_user;

        if(!data) {
            res.status(400).send({
                status: 400,
                message: "Something went wrong when trying to delete a User!"
            });
            return;
        }

        res.status(200).send({
            status: 200,
            message: "User was deleted with success!",
            data: {
                success: true
            }
        });
    } catch (err) {
        console.error("Something went wrong:", err);
        res.status(400).send({
            status: 400,
            message: "Something went wrong when trying to delete a User!"
        });
    }
}