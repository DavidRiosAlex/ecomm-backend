import { AbstractModelDB } from "models/model";

export class Cart extends AbstractModelDB {
    static table_name = 'carrito';
    id_cart: number | undefined;
    id_user: number | undefined;
    id_session: number | undefined;
    created_date: Date | undefined;
    updated_at: Date | undefined;
    status: 'activo' | 'abandonado' | 'convertido' | undefined;

    constructor({
        id_cart,
        id_user,
        id_session,
        created_date,
        updated_at,
        status,
    }: {
        id_cart?: number;
        id_user?: number;
        id_session?: number;
        created_date?: Date;
        updated_at?: Date;
        status?: 'activo' | 'abandonado' | 'convertido';
    }) {
        super();
        this.id_cart = id_cart;
        this.id_user = id_user;
        this.id_session = id_session;
        this.created_date = created_date;
        this.updated_at = updated_at;
        this.status = status;
    }
}
