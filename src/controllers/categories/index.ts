import { BunRoute } from "@utils/RouteConstructor";
import { Category } from "models/category";

class CategoriesRoute extends BunRoute<'/categories'> {
    get = async (req: Request) => {
        const url = new URL(req.url);
        const limit = parseInt(url.searchParams.get('limit') || '10', 10);
        const offset = parseInt(url.searchParams.get('offset') || '0', 10);

        const categories = await Category.select({
            pagination: {
                limit,
                offset,
            }
        });

        return Response.json(categories, {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}

export default new CategoriesRoute({
    middlewares: [],
}).build();