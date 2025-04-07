import { sql, type SQLQuery } from "bun";

interface ISelectOptions {
    filters?: string | Record<string, any>;
    pagination?: {
        limit: number;
        offset: number;
    };
}

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
    static async select<T>({ filters, pagination }: ISelectOptions = {}): Promise<{ limit: number, offset: number, total: number, results: T[]} | T[]> {
        if (pagination) {
            const { limit, offset } = pagination;
            const [results, total] = await Promise.all([
                sql`SELECT * FROM ${sql(this.table_name)} ${
                    filters ? sql`WHERE ${sql(filters)}` : sql``
                } LIMIT ${limit} OFFSET ${offset}`,
                sql`SELECT COUNT(*) AS count FROM ${sql(this.table_name)} ${
                    filters ? sql`WHERE ${sql(filters)}` : sql``
                }`
            ]);
            return { limit, offset, total: total[0].count, results };
        } else {
            // Select all data from table
            const filter = Object.entries(filters || {}).reduce((acc, [key, value]) => {
                if (typeof value === 'string') {
                    acc.push(sql`${key}='${value}'`);
                } else if (typeof value === 'number') {
                    acc.push(`${key}=${value}`);
                } else if (Array.isArray(value)) {
                    acc.push(`${key} IN (${value.map(v => `'${v}'`).join(',')})`);
                } else {
                    acc.push(`${key}=${value}`);
                }
                return acc;
            }, [] as (string | SQLQuery)[]).join(' AND ');

            const where_statment = filter ? `WHERE ${filter}` : '';
            const results = await sql`SELECT * FROM ${sql(this.table_name)} ${sql(where_statment)}`;
            return results;
        }
    }
}