import { SQL } from "bun";

async function db () {
    const db_instance =  new SQL()
    await db_instance.connect();

    return db_instance;
}

export default db;
