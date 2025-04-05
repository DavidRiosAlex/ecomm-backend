import { BunRoute } from "@utils/RouteConstructor";


class RegisterRoute extends BunRoute<'/register'> {
    get = async () => {
        return new Response();
    }
}

export default new RegisterRoute({
    middlewares: [],
}).build();