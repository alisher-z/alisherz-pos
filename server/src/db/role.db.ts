import { Pool } from "pg";

export function getRole(user: string, password: string) {
    try {
        // console.log('pooled');
        return new Pool({
            user,
            password,
            host: 'localhost',
            database: 'alisherz_pos',
            port: 5432
        });
    } catch (error) {
        console.log('unable getting role!')
        console.log(error);
        return null;
    }
}