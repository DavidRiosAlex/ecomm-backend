// NOTE: do not update this class, ask for help if you need to update it.

import type { Server } from "bun";
import { StatusCodes } from "./StatusCodes";

type RequestContextTokens = 'csrf'
export interface RequestContext {
    [key: string]: any;
    tokens: Record<RequestContextTokens, string>;
    i18n?: {
        t: (key: string, options?: Record<string, any>) => string;
    };
}

type ConstructorHandler<T extends string> = (req: Bun.BunRequest<T>, server: Server, ctx: RequestContext) => Response | Promise<Response>;

interface BunRouteConstructor { 
    middlewares: ((request: Bun.BunRequest, server: Server, ctx: RequestContext) => (Response | void) | Promise<Response | void>)[];
}

/**
 * BunRoute
 * 
 * A utility class for creating and managing HTTP route handlers in Bun applications.
 * This class provides a structured way to define route handlers for different HTTP methods
 * (GET, POST, PUT, DELETE) and supports middleware integration.
 * 
 * Key features:
 * - Middleware support: Execute middleware functions before route handlers
 * - HTTP method handlers: Override get/post/put/delete methods to handle respective requests
 * - Automatic handler binding: Properly binds this context when building routes
 * - Error handling: Middleware can short-circuit the request chain by returning a Response
 * 
 * Usage:
 * 1. Extend this class to implement specific route handlers
 * 2. Override methods for the HTTP verbs you need to support
 * 3. Add any necessary middleware functions
 * 4. Use the build() method to create a Bun-compatible route definition
 * 
 * The middleware pattern allows for separation of concerns by executing
 * common functionality (like authentication, logging, etc.) before route handlers.
 * Each middleware can either:
 * - Continue the chain by returning void/undefined
 * - Break the chain by returning a Response (useful for auth failures, etc.)
 * 
 * @template T A string type parameter representing the route path pattern
 */

export class BunRoute <T extends string>{
    private middlewares: BunRouteConstructor["middlewares"] = [];
    constructor({
        middlewares = [],
    }: BunRouteConstructor) {
        this.middlewares = middlewares;
    }

    async get(request: Bun.BunRequest, server: Server, ctx: RequestContext): Promise<Response> {
        return new Response('Method not implemented.', StatusCodes.METHOD_NOT_ALLOWED);
    }
    async post(request: Bun.BunRequest, server: Server, ctx: RequestContext): Promise<Response> {
        return new Response('Method not implemented.', StatusCodes.METHOD_NOT_ALLOWED);
    }
    async put(request: Bun.BunRequest, server: Server, ctx: RequestContext): Promise<Response> {
        return new Response('Method not implemented.', StatusCodes.METHOD_NOT_ALLOWED);
    }
    async delete(req: Bun.BunRequest<T>, server: Server, ctx: RequestContext): Promise<Response> {
        return new Response('Method not implemented.', StatusCodes.METHOD_NOT_ALLOWED);
    }

    private buildMethod(method?: ConstructorHandler<T>): Bun.RouterTypes.RouteHandler<T> | undefined {
        if (!method) return undefined;
        return async (request: Bun.BunRequest, server: Server): Promise<Response> => {
            let err: Response | void = undefined;
            const ctx: RequestContext = {
                tokens: {
                    csrf: ''
                },

            };
            for (const middleware of this.middlewares) {
                err = await middleware(request, server, ctx);
                if (err) {
                    break;
                }
            }
            if (err) {
                return err;
            }
            return method(request, server, ctx);
        }
    }

    /**
     * Builds a Bun-compatible route configuration object.
     * 
     * This method:
     * 1. Binds each HTTP method handler (GET, POST, PUT, DELETE) to the current instance
     * 2. Wraps each handler with middleware execution logic
     * 3. Creates a route configuration object that can be used with Bun's router
     * 
     * Each HTTP method will only be included in the resulting configuration if it has been
     * implemented (overridden) in the child class. Methods that use the default implementation
     * throwing "Method not implemented" will be excluded from the route configuration.
     * 
     * The wrapped handlers will:
     * - Execute all registered middleware in sequence before the handler
     * - Pass a shared context object between middleware and the handler
     * - Short-circuit execution if any middleware returns a Response
     * 
     * @returns {Bun.RouterTypes.RouteValue<T>} A Bun-compatible route configuration object
     *         containing handlers for implemented HTTP methods
     */
    public build(): Bun.RouterTypes.RouteValue<T> {
        const GET = this.get ? this.buildMethod(this.get.bind(this)) : undefined;
        const POST = this.post ? this.buildMethod(this.post.bind(this)) : undefined;
        const PUT = this.put ? this.buildMethod(this.put.bind(this)) : undefined;
        const DELETE = this.delete ? this.buildMethod(this.delete.bind(this)) : undefined;
        return {
            GET,
            POST,
            PUT,
            DELETE,
        }
    }
}