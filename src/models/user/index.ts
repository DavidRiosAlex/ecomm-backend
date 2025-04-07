import { createAuthSession } from "@middlewares/authenticator";
import { Session } from "@models/session";
import { sql } from "bun";
import { AbstractModelDB } from "models/model";

interface IUser {
    id_user?: number;
    name: string;
    email: string;
    password: string;
    address?: string;
    phone?: string;
    created_at?: Date;
}

export class User extends AbstractModelDB {
    static table_name = 'users';
    id_user: number | undefined;
    name: string | undefined;
    email: string | undefined;
    password: string | undefined;
    address: string | undefined;
    phone: string | undefined;
    created_at: Date | undefined;

    constructor({
        id_user,
        name,
        email,
        password,
        address,
        phone,
        created_at,
    }: {
        id_user?: number;
        name: string;
        email: string;
        password: string;
        address?: string;
        phone?: string;
        created_at?: Date;
    }) {
        super();
        this.id_user = id_user;
        this.name = name;
        this.email = email;
        this.password = password;
        this.address = address;
        this.phone = phone;
        this.created_at = created_at;
    }

    async createSession() {
        if (!this.id_user) throw new Error("User should exist to create a session");

        // Check if user already has a session
        const session = createAuthSession(this.id_user);
        const expiration = 60 * 60 * 1000;
        await Session.insert({
            id_user: this.id_user,
            token: session,
            start_date: new Date().toISOString(),
            expiration_date: new Date(new Date().getTime() + expiration).toISOString(),
        })

        return {
            session
        };
    }

    static async selectByEmail(email: string) {
        const users = (await User.select<IUser>({ filters: {
            email,
        } })) as IUser[];

        // const users = await sql`SELECT * FROM ${sql(this.table_name)} WHERE email=${email}`;
        return new User(users[0]);
    }
}
