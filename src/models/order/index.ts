import { AbstractModelDB } from "models/model";

export class Order extends AbstractModelDB {
    static table_name = 'orden';
    id_orden: number | undefined;
    id_user: number | undefined;
    carrito_id: number | undefined;
    created_at: Date | undefined;
    total: number | undefined;
    status: 'pendiente' | 'enviado' | 'entregado' | 'cancelado' | undefined;
    address_envio: string | undefined;
    payment_method: string | undefined;

    constructor({
        id_orden,
        id_user,
        carrito_id,
        created_at,
        total,
        status,
        address_envio,
        payment_method,
    }: {
        id_orden?: number;
        id_user?: number;
        carrito_id?: number;
        created_at?: Date;
        total: number;
        status?: 'pendiente' | 'enviado' | 'entregado' | 'cancelado';
        address_envio: string;
        payment_method: string;
    }) {
        super();
        this.id_orden = id_orden;
        this.id_user = id_user;
        this.carrito_id = carrito_id;
        this.created_at = created_at;
        this.total = total;
        this.status = status;
        this.address_envio = address_envio;
        this.payment_method = payment_method;
    }
}
