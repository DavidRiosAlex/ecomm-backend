import { BunRoute } from '@utils/RouteConstructor';

class ProductsRoute extends BunRoute<'/products'> {}

export default new ProductsRoute({
    middlewares: [],
}).build();
