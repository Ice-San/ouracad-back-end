import client from "@/db/client";

export const userExists = async (email: string) => {
    const query: string = `SELECT email FROM view_all_users WHERE email = '${email}'`;
    const result = await client.query(query);
    
    return result.rows[0];
}