import { sql } from "bun";


export class AbstractModelDB {
  static table_name: string;

    static async dropTable() {
        // Drop table if it exists
        await sql`DROP TABLE IF EXISTS ${sql(this.table_name)}`;
    }

    static async insert(data: Record<string, any>) {
        // Insert data into table
        await sql`INSERT INTO ${sql(this.table_name)} ${
            sql(data)
        }`;
    }
    static async update(data: Record<string, any>, condition: string) {
        // Update data in table
        await sql`UPDATE ${sql(this.table_name)} SET ${
            sql(data)
        } WHERE ${sql(condition)}`;
    }
    static async delete(condition: string) {
        // Delete data from table
        await sql`DELETE FROM ${sql(this.table_name)} WHERE ${sql(condition)}`;
    }
    static async select(condition?: string) {
        if (condition) {
            // Select data from table with condition
            return await sql`SELECT * FROM ${sql(this.table_name)} WHERE ${sql(condition)}`;
        } else {
            // Select all data from table
            return await sql`SELECT * FROM ${sql(this.table_name)}`;
        }
    }
}