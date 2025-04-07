import { AbstractModelDB } from "models/model";

export class Session extends AbstractModelDB {
    static table_name = 'sessions';
    id_session: number | undefined;
    id_user: number | undefined;
    token: string | undefined;
    start_date: Date | undefined;
    expiration_date: Date | undefined;
    status: 'activa' | 'expirada' | undefined;

    constructor({
        id_session,
        id_user,
        token,
        start_date,
        expiration_date,
        status,
    }: {
        id_session?: number;
        id_user?: number;
        token: string;
        start_date?: Date;
        expiration_date?: Date;
        status?: 'activa' | 'expirada';
    }) {
        super();
        this.id_session = id_session;
        this.id_user = id_user;
        this.token = token;
        this.start_date = start_date;
        this.expiration_date = expiration_date;
        this.status = status;
    }
}
