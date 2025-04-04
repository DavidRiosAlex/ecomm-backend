import { RateLimiterMiddleware } from "middlewares/rateLimiter";
import { BunRoute, type RequestContext } from "@utils/RouteConstructor";
import { APP_VERSION, RELEASE_VERSION_DATE } from "@configs/index";
import type { Server } from "bun";
import CSRFValidator from "@middlewares/csrfValidator";

class MainController extends BunRoute<'/'> {
    async get(request: Bun.BunRequest, server: Server, ctx: RequestContext) {
        return Response.json({ version: APP_VERSION, release_date: RELEASE_VERSION_DATE }, {
            status: 200,
        });
    }
}

export default new MainController({
    middlewares: [
        RateLimiterMiddleware,
        CSRFValidator,
    ]
}).build();
