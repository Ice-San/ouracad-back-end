import { Client } from "pg";

const {
    DB_USER,
    DB_PASSWORD,
    DB_HOST,
    DB_PORT,
    DB_DATABASE
} = process.env;

const client = new Client({
    user: DB_USER,
    password: DB_PASSWORD,
    host: DB_HOST,
    port: Number(DB_PORT),
    database: DB_DATABASE
});

client
        .connect()
        .then(() => console.log("Database connected successfully!"))
        .catch(err => console.error("Something went wrong! :(" + err.stack));

export default client;