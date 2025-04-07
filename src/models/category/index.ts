import { AbstractModelDB } from "models/model";

export class Category extends AbstractModelDB {
    static table_name = 'category';
    id: number | undefined;
    name: string | undefined;
    description: string | undefined;
    parent_category: number | undefined;
    created_at: Date | undefined;

    constructor({
        id,
        name,
        description,
        parent_category,
        created_at,
    }: {
        id?: number;
        name: string;
        description?: string;
        parent_category?: number;
        created_at?: Date;
    }) {
        super();
        this.id = id;
        this.name = name;
        this.description = description;
        this.parent_category = parent_category;
        this.created_at = created_at;
    }
}
