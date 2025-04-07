import {
    ProductsRoute,
    MainRoute,
    LoginRoute,
    CategoriesRoute,
    RegisterRoute,
    UsersRoute
} from "./controllers";


export const routes: Record<string, Bun.RouterTypes.RouteValue<string> > = {
    '/api': MainRoute,
    '/api/products': ProductsRoute,
    '/api/categories': CategoriesRoute,
    '/api/login': LoginRoute,
    '/api/register': RegisterRoute,
    '/api/users': UsersRoute,
}
