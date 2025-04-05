import { BunRoute } from "@utils/RouteConstructor";


class CategoriesRoute extends BunRoute<'/categories'> {
    get = async () => {
        return new Response();
    }
}

export default new CategoriesRoute({
    middlewares: [],
}).build();