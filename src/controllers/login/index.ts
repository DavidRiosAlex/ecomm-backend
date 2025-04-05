import { BunRoute } from "@utils/RouteConstructor";


class LoginRoute extends BunRoute<'/login'> {
    get = async () => {
        return new Response();
    }
}

export default new LoginRoute({
    middlewares: [],
}).build();