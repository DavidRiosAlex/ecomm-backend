import { StatusCodes } from "@utils/StatusCodes";
import type { Server } from "bun";

const rateLimitMap = new Map<string, { count: number; lastRequestTime: number }>();

export function RateLimiterMiddleware(request: Bun.BunRequest, server: Server): Response | void {
    const ip = server.requestIP(request);

    const rateLimit = 10;
    const rateLimitWindow = 60 * 1000;

    if (!ip) {
        return new Response("Malformed Request", StatusCodes.BAD_REQUEST);
    }

    const currentTime = Date.now();
    const rateLimitData = rateLimitMap.get(ip.address) || { count: 0, lastRequestTime: currentTime };

    const timeSinceLastRequest = currentTime - rateLimitData.lastRequestTime;
    if (timeSinceLastRequest > rateLimitWindow) {
        rateLimitData.count = 0;
        rateLimitData.lastRequestTime = currentTime;
    }
    rateLimitData.count++;
    rateLimitMap.set(ip.address, rateLimitData);

    if (rateLimitData.count > rateLimit) return new Response("Rate limit exceeded", StatusCodes.TOO_MANY_REQUESTS);

    return;
}