import { AbstractModelDB } from "models/model";

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
}
