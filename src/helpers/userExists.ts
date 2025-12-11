import client from "@db/client";

export const userExists = async (email: string) => {
    const query: string = 'SELECT * FROM user_exists($1)';
    const result = await client.query(query, [email]);
    
    return result.rows[0];
}