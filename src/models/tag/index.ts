import { AbstractModelDB } from "models/model";

export class Tag extends AbstractModelDB {
    static table_name = 'tag';
    name: string | undefined;
    description: string | undefined;

    constructor({
        name,
        description,
    }: {
        name: string;
        description?: string;
    }) {
        super();
        this.name = name;
        this.description = description;
    }
}
