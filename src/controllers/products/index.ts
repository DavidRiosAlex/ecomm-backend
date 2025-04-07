import { BunRoute } from '@utils/RouteConstructor';
import { Product } from 'models/products';

class ProductsRoute extends BunRoute<'/products'> {
    get = async (req: Request) => {
        const url = new URL(req.url);
        const limit = parseInt(url.searchParams.get('limit') || '10', 10);
        const offset = parseInt(url.searchParams.get('offset') || '0', 10);

        const products = await Product.select({
            pagination: {
                limit,
                offset,
            }
        });

        return Response.json({
            products,
            offset,
            limit,
        }, {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}

export default new ProductsRoute({
    middlewares: [],
}).build();
