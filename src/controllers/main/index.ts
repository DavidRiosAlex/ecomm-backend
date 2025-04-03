import { RateLimiterMiddleware } from "@utils/rateLimiter";
import { BunRoute, type RequestContext } from "@utils/RouteConstructor";
import type { Server } from "bun";

class MainController extends BunRoute<'/'> {
    async get(request: Bun.BunRequest, server: Server, ctx: RequestContext) {
        return Response.json({ date: new Date().toISOString(), role: ctx.role });
    }
}

export default new MainController({
    middlewares: [
        RateLimiterMiddleware,
    ]
}).build();
