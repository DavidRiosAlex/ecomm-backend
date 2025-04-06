import db from "@utils/db/connection";
import { sql } from "bun";
import { AbstractModelDB } from "models/model";
import { readdir } from "node:fs/promises";
import path from "node:path";

interface IMigration {
    id: number;
    migration_name: string;
    migration_date: Date;
    executed_successfully: boolean;
}

export class Migration extends AbstractModelDB {
    static table_name = 'migrations';
    id: number | undefined;
    migration_name: string | undefined;
    migration_date: Date | undefined;
    executed_successfully: boolean | undefined;

    constructor({
        id,
        migration_name,
        migration_date,
        executed_successfully,
    }: Omit<IMigration, 'id'> & Partial<Pick<IMigration, 'id'>>) {
        super();
        this.id = id;
        this.migration_name = migration_name;
        this.migration_date = migration_date;
        this.executed_successfully = executed_successfully;
    }

    static async save() {}

    static async update() {}

    static async delete() {}

    private static async findMigrationNotExecuted() {
        const migrationsToExecute = [];
        
        await sql`CREATE TABLE IF NOT EXISTS ${sql(this.table_name)} (
            id SERIAL PRIMARY KEY,
            migration_name VARCHAR(255) NOT NULL,
            migration_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
            executed_successfully BOOLEAN NOT NULL DEFAULT FALSE
        )`;
        const migrations = await Migration.select();
        const migrationFiles = await readdir('./migrations/sql');

        for (const migration of migrationFiles) {
            const migrationStored: IMigration = migrations.find(
                (m: IMigration) => m.migration_name === migration
            );
            if (!migrationStored || (migrationStored && !migrationStored.executed_successfully)) {
                migrationsToExecute.push(migration);
                continue;
            }
        }

        return migrationsToExecute;
    }

    static executeMigrations = async () => {
        const migrationsToExecute = await Migration.findMigrationNotExecuted();

        for (const migration of migrationsToExecute) {
            const migrationPath = path.join(`migrations/sql/${migration}`);
            await sql.file(migrationPath);
            await Migration.insert({
                migration_name: migration,
                executed_successfully: true,
            })
        }
    }
}