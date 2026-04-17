// import { QueryResult } from "pg";
// import { DBQueryError, DBQueryResult } from "./result.db";

// export async function attempt(value: Promise<QueryResult>) {
//     try {
//         return new DBQueryResult({
//             success: await value
//         });
//     } catch (e) {
//         console.log(e);
//         return new DBQueryResult({
//             error: e as DBQueryError
//         });
//     }
// }