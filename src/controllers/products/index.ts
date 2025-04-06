import { BunRoute } from '@utils/RouteConstructor';
import { Product } from 'models/products';

class ProductsRoute extends BunRoute<'/products'> {
    get = async () => {
        return Response.json({
            products: await Product.select(),
            total: 0,
            offset: 0,
            limit: 0,
        }, {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}

export default new ProductsRoute({
    middlewares: [],
}).build();
