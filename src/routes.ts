import {
    ProductsRoute,
    MainRoute,
    LoginRoute,
    CategoriesRoute,
    RegisterRoute
} from "./controllers";
console.log(MainRoute);
export const routes: Record<string, Bun.RouterTypes.RouteValue<string> > = {
    '/api': {
        GET: MainRoute.GET,
    },
    '/api/products': ProductsRoute,
    '/api/categories': CategoriesRoute,
    '/api/login': LoginRoute,
    '/api/register': RegisterRoute,
}
