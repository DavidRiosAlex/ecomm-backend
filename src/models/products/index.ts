import { AbstractModelDB } from "models/model";

export class Product extends AbstractModelDB {
    static table_name = 'product';
    id: number | undefined;
    category_id: number | undefined;
    name: string | undefined;
    image: string | undefined;
    description: string | undefined;
    price: number | undefined;
    stock: number | undefined;
    created_at: Date | undefined;
    updated_at: Date | undefined;

    constructor({
        id,
        category_id,
        name,
        image,
        description,
        price,
        stock,
        created_at,
        updated_at,
    }: {
        id?: number;
        category_id?: number;
        name: string;
        image?: string;
        description?: string;
        price: number;
        stock?: number;
        created_at?: Date;
        updated_at?: Date;
    }) {
        super();
        this.id = id;
        this.category_id = category_id;
        this.name = name;
        this.image = image;
        this.description = description;
        this.price = price;
        this.stock = stock ?? 0;
        this.created_at = created_at;
        this.updated_at = updated_at;
    }
}