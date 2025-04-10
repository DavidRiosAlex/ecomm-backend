import type { Server } from "bun";
import type { RequestContext } from "@utils/RouteConstructor";
import { APP_SECRET_CSRF } from "@configs/index";
import { StatusCodes } from "@utils/StatusCodes";

const CSRFValidator = (request: Bun.BunRequest, server: Server, ctx: RequestContext): Response | void => {
    if (request.method === 'GET') {
        const csrfGenerated = Bun.CSRF.generate(APP_SECRET_CSRF, {
            expiresIn: 3600000 // 1 hour
        });
        ctx.tokens.csrf =  csrfGenerated;
    } else {
        const csrfHeader = request.headers.get('X-CSRF-Token');

        if (!csrfHeader) {
            return new Response('CSRF token is missing', StatusCodes.FORBIDDEN);
        }
        const validCSRF = Bun.CSRF.verify(csrfHeader, {
            secret: APP_SECRET_CSRF,
        });
        if (!validCSRF) {
            return new Response('Invalid CSRF token', StatusCodes.FORBIDDEN);
        }
        ctx.tokens.csrf = csrfHeader;
    }
}

export default CSRFValidator;
