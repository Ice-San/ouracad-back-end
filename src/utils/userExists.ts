import client from "@/db/client";

export const userExists = async (email: string) => {
    const query: string = `SELECT email FROM view_all_users WHERE email = '${email}'`;
    const result = await client.query(query);
    
    return result.rows[0];
}

export function splitNames(n: string) {
    const nameArray = n.split(" ");

    if (nameArray.length <= 1) {
        return {firstname: n, lastname: ""}
    }

    const firstname = nameArray[0];
    const lastname = nameArray.at(-1);

    return {firstname, lastname}
}